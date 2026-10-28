// ==========================================================================
// CO-OP ROOM SYNC (Firebase Auth + Cloud Firestore)
//
// Data model: the room holds the CURRENT state of each item, never a history,
// so its size is bounded by the number of tickable items (~500 entries,
// ~30 KB), however long people play.
//
//   rooms/{code}                    { host, createdAt, members: { uid: {name, joinedAt, lastSeen} } }
//   rooms/{code}/progress/{domain}  { [itemKey]: { v: bool, t, by } }     flag domains
//   rooms/{code}/progress/planner   { [recipeId]: { n: number, t, by } }  counts
//
// Merging is per item: two players changing different items never overwrite
// each other. Unticking writes v:false (a tombstone) instead of deleting, so
// a device that was offline can't resurrect it. Planner +1/-1 use Firestore's
// increment(), so simultaneous clicks add up instead of colliding.
//
// Offline: Firestore's persistent cache (IndexedDB) queues writes across
// reloads and replays them on reconnect, then delivers everyone else's
// changes. No hand-written history merge is needed.
//
// The Firebase SDK is loaded from the CDN only when co-op is used, so the
// rest of the site pays nothing for it.
// ==========================================================================

import { FIREBASE_CONFIG } from './firebase-config.js';
import { progress, DOMAINS, FLAG_DOMAINS } from '../lib/progress.js';

const SDK = 'https://www.gstatic.com/firebasejs/13.1.0';
const ROOM_KEY = 'stardew_wiki_coop_room';
const NAME_KEY = 'stardew_wiki_coop_name';
const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // no I/L/O/0/1 look-alikes
const LAST_SEEN_EVERY_MS = 2 * 60 * 1000;

// `?emulator` runs against the local Firebase emulators (see README)
const USE_EMULATOR = new URLSearchParams(location.search).has('emulator');

export const coopAvailable = USE_EMULATOR || !!FIREBASE_CONFIG?.apiKey;

class CoopRoom {
  constructor() {
    this.fb = null;            // loaded SDK modules
    this.user = null;
    this.code = null;
    this.room = null;          // latest room doc data
    this.remote = {};          // domain -> latest field map from Firestore
    this.status = 'idle';      // idle | connecting | synced | pending | offline | error
    this.error = '';
    this.unsubs = [];
    this.pending = new Map();  // domain -> Map(key -> write) awaiting flush
    this.listeners = new Set();
    this.lastSeenAt = 0;

    progress.subscribe((change, origin) => {
      if (origin !== 'remote' && this.code) this.queueWrite(change);
    });
    window.addEventListener('online', () => this.notify());
    window.addEventListener('offline', () => this.setStatus('offline'));
  }

  get name() { return localStorage.getItem(NAME_KEY) || ''; }
  set name(v) { localStorage.setItem(NAME_KEY, v.trim().slice(0, 24)); }
  get savedCode() { return localStorage.getItem(ROOM_KEY); }
  get isGoogle() { return !!this.user?.providerData?.some(p => p.providerId === 'google.com'); }

  onChange(fn) { this.listeners.add(fn); }
  notify() { for (const fn of this.listeners) fn(this); }
  setStatus(s, error = '') { this.status = s; this.error = error; this.notify(); }

  // ---------- SDK & auth ----------
  async load() {
    if (this.fb) return this.fb;
    const [app, auth, fs] = await Promise.all([
      import(`${SDK}/firebase-app.js`),
      import(`${SDK}/firebase-auth.js`),
      import(`${SDK}/firebase-firestore.js`)
    ]);
    const config = USE_EMULATOR
      ? { apiKey: 'demo-key', authDomain: 'localhost', projectId: 'demo-stardew', appId: 'demo-app' }
      : FIREBASE_CONFIG;
    const fbApp = app.initializeApp(config);
    const authInst = auth.getAuth(fbApp);
    const db = fs.initializeFirestore(fbApp, {
      localCache: fs.persistentLocalCache({ tabManager: fs.persistentMultipleTabManager() })
    });
    if (USE_EMULATOR) {
      auth.connectAuthEmulator(authInst, 'http://127.0.0.1:9099', { disableWarnings: true });
      fs.connectFirestoreEmulator(db, '127.0.0.1', 8080);
    }
    this.fb = { ...auth, ...fs, auth: authInst, db };
    return this.fb;
  }

  async ensureUser() {
    const fb = await this.load();
    await fb.auth.authStateReady();
    if (!fb.auth.currentUser) await fb.signInAnonymously(fb.auth);
    this.user = fb.auth.currentUser;
    return this.user;
  }

  // Link Google to the current (usually anonymous) account so the uid, and
  // with it room membership, is kept. If that Google account was already used
  // before, switch to it and rejoin the current room.
  async linkGoogle() {
    const fb = await this.load();
    await this.ensureUser();
    const provider = new fb.GoogleAuthProvider();
    try {
      const cred = await fb.linkWithPopup(fb.auth.currentUser, provider);
      this.user = cred.user;
    } catch (e) {
      if (e.code !== 'auth/credential-already-in-use') throw e;
      const code = this.code;
      await this.stop();
      const cred = await fb.signInWithPopup(fb.auth, provider);
      this.user = cred.user;
      if (code) await this.join(code, 'merge');
    }
    if (!this.name && this.user.displayName) this.name = this.user.displayName;
    if (this.code) await this.touchMember();
    this.notify();
  }

  // ---------- rooms ----------
  roomRef(code = this.code) { return this.fb.doc(this.fb.db, 'rooms', code); }
  domainRef(domain, code = this.code) { return this.fb.doc(this.fb.db, 'rooms', code, 'progress', domain); }

  memberEntry() {
    const now = this.fb.serverTimestamp();
    return { name: this.name || 'Nông dân', joinedAt: this.room?.members?.[this.user.uid]?.joinedAt || now, lastSeen: now };
  }

  async create() {
    this.setStatus('connecting');
    try {
      const fb = await this.load();
      await this.ensureUser();
      let code;
      for (let i = 0; i < 5 && !code; i++) {
        const c = randomCode();
        if (!(await fb.getDoc(this.roomRef(c))).exists()) code = c;
      }
      if (!code) throw new Error('Không tạo được mã phòng, hãy thử lại.');
      await fb.setDoc(this.roomRef(code), {
        host: this.user.uid,
        createdAt: fb.serverTimestamp(),
        members: { [this.user.uid]: this.memberEntry() }
      });
      // The host's current progress becomes the room's starting point
      await this.uploadLocal(code, null);
      await this.start(code);
    } catch (e) {
      this.fail(e);
    }
  }

  // mode 'merge': add my ticks/plan for items the room has never recorded
  // (anything the room already has an opinion on, including an untick, wins).
  // mode 'room': discard my local progress and take the room's.
  async join(rawCode, mode = 'merge') {
    const code = String(rawCode || '').trim().toUpperCase();
    this.setStatus('connecting');
    try {
      const fb = await this.load();
      await this.ensureUser();
      const snap = await fb.getDoc(this.roomRef(code));
      if (!snap.exists()) throw new Error('Không tìm thấy phòng với mã này.');
      this.room = snap.data();
      const members = this.room.members || {};
      if (!members[this.user.uid] && Object.keys(members).length >= 8) throw new Error('Phòng đã đủ 8 người.');
      await fb.setDoc(this.roomRef(code), { members: { [this.user.uid]: this.memberEntry() } }, { merge: true });

      const existing = {};
      await Promise.all(DOMAINS.map(async d => {
        const s = await fb.getDoc(this.domainRef(d, code));
        existing[d] = s.exists() ? s.data() : {};
      }));
      if (mode === 'room') {
        for (const d of FLAG_DOMAINS) progress.replace(d, [], 'remote');
        progress.replace('planner', {}, 'remote');
      } else {
        await this.uploadLocal(code, existing);
      }
      await this.start(code);
    } catch (e) {
      this.fail(e);
    }
  }

  // Upload local progress; with `existing`, only items the room lacks
  async uploadLocal(code, existing) {
    const fb = this.fb;
    const snap = progress.snapshot();
    const writes = [];
    for (const d of FLAG_DOMAINS) {
      const fields = {};
      for (const key of snap[d]) if (!existing || !(key in existing[d])) fields[key] = this.entry({ v: true });
      if (Object.keys(fields).length) writes.push(fb.setDoc(this.domainRef(d, code), fields, { merge: true }));
    }
    const plan = {};
    for (const [key, n] of Object.entries(snap.planner)) if (!existing || !(key in existing.planner)) plan[key] = this.entry({ n });
    if (Object.keys(plan).length) writes.push(fb.setDoc(this.domainRef('planner', code), plan, { merge: true }));
    await Promise.all(writes);
  }

  entry(value) {
    return { ...value, t: this.fb.serverTimestamp(), by: this.user.uid };
  }

  async start(code) {
    const fb = this.fb;
    await this.stop(false);
    this.code = code;
    localStorage.setItem(ROOM_KEY, code);
    this.setStatus('connecting');

    this.unsubs.push(fb.onSnapshot(this.roomRef(), { includeMetadataChanges: true }, snap => {
      if (!snap.exists()) return this.fail(new Error('Phòng không còn tồn tại.'));
      this.room = snap.data();
      if (!this.room.members?.[this.user.uid] && !snap.metadata.hasPendingWrites) {
        // Removed from the room (or left from another tab)
        this.stop();
        return;
      }
      this.updateStatus(snap.metadata);
    }, e => this.fail(e)));

    for (const domain of DOMAINS) {
      this.unsubs.push(fb.onSnapshot(this.domainRef(domain), { includeMetadataChanges: true }, snap => {
        const data = snap.exists() ? snap.data() : {};
        this.remote[domain] = data;
        this.applyRemote(domain, data);
        this.updateStatus(snap.metadata);
      }, e => this.fail(e)));
    }
    this.touchMember();
  }

  async stop(notify = true) {
    this.unsubs.forEach(u => u());
    this.unsubs = [];
    this.remote = {};
    if (notify) {
      this.code = null;
      this.room = null;
      localStorage.removeItem(ROOM_KEY);
      this.setStatus('idle');
    }
  }

  // Leaving keeps the last synced progress on this device
  async leave() {
    const fb = this.fb;
    const code = this.code;
    await this.stop();
    if (fb && code) {
      fb.updateDoc(this.roomRef(code), { [`members.${this.user.uid}`]: fb.deleteField() }).catch(() => {});
    }
  }

  async resume() {
    if (!coopAvailable || !this.savedCode) return;
    try {
      await this.ensureUser();
      await this.start(this.savedCode);
    } catch (e) {
      this.fail(e);
    }
  }

  // ---------- sync ----------
  applyRemote(domain, data) {
    for (const [key, entry] of Object.entries(data)) {
      if (domain === 'planner') {
        if (typeof entry?.n === 'number') progress.setCount(key, Math.max(0, entry.n), 'remote');
      } else if (typeof entry?.v === 'boolean') {
        progress.setFlag(domain, key, entry.v, 'remote');
      }
    }
  }

  // Changes are batched per tick: one merged write per domain, however many
  // items changed (an import touches hundreds).
  queueWrite({ domain, key, value, delta }) {
    if (!this.pending.has(domain)) this.pending.set(domain, new Map());
    const map = this.pending.get(domain);
    if (domain === 'planner' && delta !== undefined) {
      const prev = map.get(key);
      map.set(key, { delta: (prev?.delta || 0) + delta });
    } else {
      map.set(key, domain === 'planner' ? { n: value } : { v: value });
    }
    if (!this.flushQueued) {
      this.flushQueued = true;
      queueMicrotask(() => this.flush());
    }
  }

  flush() {
    this.flushQueued = false;
    const fb = this.fb;
    if (!fb || !this.code) return;
    for (const [domain, map] of this.pending) {
      const fields = {};
      for (const [key, w] of map) {
        fields[key] = 'delta' in w ? this.entry({ n: fb.increment(w.delta) }) : this.entry(w);
      }
      // Not awaited: offline, the promise only settles once the server acks
      fb.setDoc(this.domainRef(domain), fields, { merge: true }).catch(e => this.fail(e));
    }
    this.pending.clear();
    this.setStatus(navigator.onLine ? 'pending' : 'offline');
    if (Date.now() - this.lastSeenAt > LAST_SEEN_EVERY_MS) this.touchMember();
  }

  touchMember() {
    if (!this.fb || !this.code) return;
    this.lastSeenAt = Date.now();
    return this.fb.setDoc(this.roomRef(), { members: { [this.user.uid]: this.memberEntry() } }, { merge: true })
      .catch(e => this.fail(e));
  }

  rename(name) {
    this.name = name;
    if (this.code) this.touchMember();
    this.notify();
  }

  updateStatus(meta) {
    if (!navigator.onLine) this.setStatus('offline');
    else if (meta.hasPendingWrites) this.setStatus('pending');
    else if (meta.fromCache) this.setStatus('connecting');
    else this.setStatus('synced');
  }

  fail(e) {
    console.error('[co-op]', e);
    const msg = e?.code === 'permission-denied'
      ? 'Không có quyền truy cập phòng này.'
      : e?.code === 'auth/popup-closed-by-user' ? 'Đã đóng cửa sổ đăng nhập.' : (e?.message || String(e));
    this.setStatus('error', msg);
  }

  // Latest changes across all domains, newest first, straight from the
  // per-item timestamps: no separate activity log to store.
  recentActivity(limit = 12) {
    const out = [];
    for (const [domain, data] of Object.entries(this.remote)) {
      for (const [key, e] of Object.entries(data)) {
        if (e?.t?.toMillis) out.push({ domain, key, ...e, at: e.t.toMillis() });
      }
    }
    return out.sort((a, b) => b.at - a.at).slice(0, limit);
  }
}

function randomCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return Array.from(bytes, b => CODE_ALPHABET[b % CODE_ALPHABET.length]).join('');
}

export const coop = new CoopRoom();
