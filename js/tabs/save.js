// ==========================================================================
// TAB: FILE SAVE
// The one place to load the game's save file. The save is read once, in the
// browser, then a summary lets the player pick what to update: progress ticks
// (added on top, nothing unticked) and caught fish, the day in the Today tab
// (shared with the co-op room), the Journal snapshot (also read by Secret
// Notes and Today), and the farm layout in the Farm tab. Predictions always
// follow the last save. Other tabs only link here; the Farm tab hands over
// save files it was given.
// ==========================================================================

import { t, nm, isEn } from '../lib/i18n.js';
import { ico } from '../lib/icons.js';
import { progress } from '../lib/progress.js';
import { KEYS, loadJSON, saveJSON } from '../lib/storage.js';
import { setCaughtFish, setFishingSeason } from './fishing.js';
import { applySaveDay } from './today.js';
import { applySaveFarm, farmPlanIsReplaceable } from './farm.js';
import { applySavePredict } from './predictor.js';
import { JOURNAL_SCHEMA, isStale } from '../lib/journal-schema.js';
import { coop } from '../sync/coop.js';
import { gzip64, gunzip64 } from '../lib/gzip.js';
import { showToast } from '../lib/ui.js';

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// pendingSave: the save read but not applied yet; summary: its HTML;
// lastDone / lastError: the outcome of the last read or sync, shown on top
let pendingSave = null, summary = '', lastDone = '', lastError = '';

// The button other tabs show instead of their own file picker
export const saveTabLink = (label = 'Nạp file save', cls = 'btn btn--green') =>
  `<button class="${cls}" type="button" data-action="goto-save">${cls.startsWith('link') ? '' : ico('save')} ${t(label)}</button>`;

function newKeys(domain, keys) { return keys.filter(k => !progress.has(domain, k)); }

const SEASON_VI = { spring: 'Mùa Xuân', summer: 'Mùa Hạ', fall: 'Mùa Thu', winter: 'Mùa Đông' };
const DOW_VI = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'];
const dayText = d => isEn
  ? `${t(DOW_VI[(d.day - 1) % 7])}, ${t(SEASON_VI[d.season])} ${d.day}, Year ${d.year}`
  : `${DOW_VI[(d.day - 1) % 7]}, ngày ${d.day} ${SEASON_VI[d.season]}, năm ${d.year}`;
const when = at => new Date(at).toLocaleString(isEn ? 'en-US' : 'vi-VN');

async function readSaveFile(app, file, preread = null) {
  lastDone = ''; lastError = '';
  try {
    const [{ parseSave, readFarmSave, readSaveDay }, { readSaveProgress }, text] = await Promise.all([
      import('../lib/farm-save.js'), import('../lib/save-progress.js'), preread ?? file.text()]);
    const root = parseSave(text);   // parsed once, read several ways
    const res = readSaveProgress(root);
    const day = readSaveDay(root);
    let farm = null;
    try { farm = readFarmSave(root); } catch { /* a save without a farm: skip that part */ }
    let journal = null;
    try { journal = (await import('../lib/save-journal.js')).readJournal(root); } catch (e) { console.warn('[journal]', e); }
    let predict = null;
    try { predict = (await import('../predict/context.js')).readPredictContext(root); } catch (e) { console.warn('[predict]', e); }
    pendingSave = { res, day, farm, journal, predict };

    const add = { recipes: newKeys('recipes', res.recipes), quests: newKeys('quests', res.quests), bundles: newKeys('bundles', res.bundles), museum: newKeys('museum', res.museum) };
    const row = (icon, label, found, fresh) => `
      <li><span>${ico(icon)} ${t(label)}</span><strong>${found}</strong><span class="muted">${fresh === null ? '' : fresh ? `+${fresh} ${t('mới')}` : t('đã có đủ')}</span></li>`;
    const replaceable = farmPlanIsReplaceable();
    const farmCount = farm ? farm.objects.length + Object.keys(farm.ground).length : 0;
    summary = `
      <p>${ico('save')} <strong data-no-i18n>${esc(file?.name || '')}</strong> · ${t('Nông trại')} <strong data-no-i18n>${esc(res.farmName || '?')}</strong> · ${t('người chơi')} <strong data-no-i18n>${esc(res.playerName || '?')}</strong></p>
      <p class="muted">${t('Chọn phần muốn cập nhật rồi bấm Đồng bộ.')}</p>

      <label class="save-sync__part"><input type="checkbox" class="px-check" id="syncProgress" checked>
        <span><strong>${ico('tracker')} ${t('Tiến Độ & Hoàn Thành')}</strong></span></label>
      <ul class="save-sync__list">
        ${row('cooking', 'Công thức, công trình & nâng cấp', res.recipes.length, add.recipes.length)}
        ${row('quests', 'Nhiệm vụ đã hoàn thành', res.quests.length, add.quests.length)}
        ${row('bundles', 'Ô gói Nhà Cộng Đồng đã nộp', res.bundles.length, add.bundles.length)}
        ${row('museum', 'Món đã quyên góp Bảo Tàng', res.museum.length, add.museum.length)}
        ${row('fish', 'Loài cá đã câu được', `${res.fish.caught} / ${res.fish.total}`, null)}
        ${row('save', 'Hồ sơ nhân vật (cấp kỹ năng, nghề)', res.players.map(pl => `${esc(pl.name)}: ${pl.skills.map(x => x.level).join('/')}`).join(' · '), null)}
      </ul>
      ${res.unmatchedBundles.length ? `<p class="muted">${ico('warn')} ${t('Một số gói (bản Remix) không có trong dữ liệu của trang nên được bỏ qua')}: ${res.unmatchedBundles.join(', ')}</p>` : ''}
      <p class="muted">${t('Chỉ thêm dấu tick mới, không bỏ tick nào bạn đã đánh dấu. Nhiệm vụ được suy ra từ cờ và sự kiện trong file save; Tượng Lewis Vàng và các bức tượng bí ẩn không để lại dấu vết nên vẫn cần tự đánh dấu.')}</p>

      <label class="save-sync__part"><input type="checkbox" class="px-check" id="syncToday" checked>
        <span><strong>${ico('calendar')} ${t('Hôm Nay')}:</strong> ${dayText(day)}
        ${coop.code ? `<span class="muted">(${t('chia sẻ với phòng Co-op')})</span>` : ''}</span></label>

      ${journal ? `
      <label class="save-sync__part"><input type="checkbox" class="px-check" id="syncJournal" checked>
        <span><strong>${ico('story')} ${t('Sổ Tay Nông Trại')}:</strong> ${t('tình bạn, túi & rương, máy móc, mùa vụ, vật nuôi, diệt quái, Hoàn Hảo')}</span></label>` : ''}

      ${farm ? `
      <label class="save-sync__part"><input type="checkbox" class="px-check" id="syncFarm" ${replaceable ? 'checked' : ''}>
        <span><strong>${ico('farm')} ${t('Nông Trại')}:</strong> ${farmCount} ${t('công trình, đồ vật và ô đất')}
        ${replaceable ? '' : `<span class="muted">· ${t('sẽ thay thiết kế bạn đang vẽ (có thể Hoàn tác ở tab Nông Trại)')}</span>`}
        ${farm.warning ? `<span class="muted">· ${farm.warning}</span>` : ''}</span></label>` : ''}

      <div class="btn-row">
        <button class="btn btn--green" type="button" data-action="save-progress-apply">${ico('check')} ${t('Đồng bộ')}</button>
        <button class="btn btn--ghost" type="button" data-action="save-cancel">${t('Hủy')}</button>
      </div>
      ${res.fish.missing.length ? `
        <h3 class="save-sync__sub">${ico('fish')} ${t('Cá chưa câu được')} (${res.fish.missing.length})</h3>
        <div class="save-sync__fish">
          ${res.fish.missing.map(f => `<span class="tag" title="${f.location || ''}"><img src="${f.imageUrl}" alt="" class="pixel-img"> ${nm(f)}</span>`).join('')}
        </div>` : ''}`;
  } catch (e) {
    console.error('[save]', e);
    pendingSave = null;
    lastError = e.userMessage || t('Không đọc được file save này');
    app.showToast(`${ico('warn')} ${lastError}`);
  }
  if (app.currentTab === 'save') app.render(); else app.switchTab('save');
  window.scrollTo({ top: document.getElementById('tab-save')?.offsetTop - 80 || 0, behavior: 'smooth' });
}

function applySave(app) {
  if (!pendingSave) return;
  const { res, day, farm, journal, predict } = pendingSave;
  const checked = id => document.getElementById(id)?.checked;
  const done = [];
  if (checked('syncProgress')) {
    let n = 0;
    for (const [domain, keys] of [['recipes', res.recipes], ['quests', res.quests], ['bundles', res.bundles], ['museum', res.museum]]) {
      for (const k of newKeys(domain, keys)) { progress.setFlag(domain, k, true, 'bulk'); n++; }
    }
    setCaughtFish(res.fish.caughtEn);
    saveJSON(KEYS.profiles, { farmName: res.farmName, at: Date.now(), players: res.players });
    done.push(`${n} ${t('mục tiến độ')}`);
  }
  if (checked('syncToday')) {
    const shared = applySaveDay(day);
    setFishingSeason(day.season);
    done.push(`${t('ngày')} ${day.day} ${SEASON_VI[day.season]}${shared ? ` (${t('đã chia sẻ')})` : ''}`);
  }
  if (journal && checked('syncJournal')) {
    saveJSON(KEYS.journal, { ...journal, day, farmName: res.farmName, at: Date.now(), schema: JOURNAL_SCHEMA });
    done.push(t('sổ tay'));
  }
  // Predictions only read the save (Game ID, counters): always kept up to date
  if (predict) applySavePredict(predict);
  if (farm && checked('syncFarm')) {
    applySaveFarm(farm);
    done.push(t('nông trại'));
  }
  pendingSave = null; summary = '';
  if (coop.code) {
    shareWithRoom(res.farmName);
    done.push(t('chia sẻ với phòng Co-op'));
  }
  lastDone = done.join(' · ') || t('không có gì');
  app.sfx.play('complete');
  app.render();
  app.showToast(`${ico('check')} ${t('Đã đồng bộ từ file save')}: ${lastDone}`);
}

// ---------- Sharing the save with the co-op room ----------
// The parts of the save each device keeps for itself (the ticks and the day
// already go through the room on their own). The room keeps the latest; a
// device takes it when it is newer than what it read itself.
const SHARED_PARTS = { profiles: KEYS.profiles, journal: KEYS.journal, predict: KEYS.predict, fish: KEYS.fishCaught };
// { stamp, name, at, mine }: the room's share this device already has
const ROOM_SAVE = 'stardew_wiki_room_save';
const roomSave = () => loadJSON(ROOM_SAVE, null);
const stampOf = e => `${e.by}:${e.at}`;

async function shareWithRoom(farmName) {
  try {
    const data = Object.fromEntries(Object.entries(SHARED_PARTS).map(([k, key]) => [k, loadJSON(key, null)]));
    await coop.shareSave(await gzip64(JSON.stringify(data)), farmName,
      entry => saveJSON(ROOM_SAVE, { stamp: stampOf(entry), name: entry.name, at: entry.at, mine: true }));
    if (window.app?.currentTab === 'save') render();
  } catch (e) {
    console.warn('[co-op] share save', e);
    showToast(`${ico('warn')} ${t('Chưa chia sẻ được dữ liệu save với phòng Co-op')}`);
  }
}

coop.onSharedSave(async e => {
  const stamp = stampOf(e);
  if (roomSave()?.stamp === stamp || typeof e.z !== 'string') return;
  // This device read a newer save itself: keep it
  const local = Math.max(loadJSON(KEYS.journal, null)?.at || 0, loadJSON(KEYS.profiles, null)?.at || 0);
  if (e.at <= local) { saveJSON(ROOM_SAVE, { stamp, name: e.name, at: e.at, mine: true }); return; }
  try {
    const data = JSON.parse(await gunzip64(e.z));
    for (const [k, key] of Object.entries(SHARED_PARTS)) {
      if (data[k] == null) continue;
      if (k === 'fish') setCaughtFish(data.fish);
      else if (k === 'predict') applySavePredict(data.predict);
      else saveJSON(key, data[k]);
    }
    if (data.journal?.day) setFishingSeason(data.journal.day.season);
    saveJSON(ROOM_SAVE, { stamp, name: e.name, at: e.at, mine: false });
    window.app?.render();
    showToast(`${ico('members')} ${t('Đã nhận dữ liệu save từ phòng Co-op')}: <span data-no-i18n>${esc(e.name)}</span> · ${when(e.at)}`);
  } catch (err) { console.warn('[co-op] shared save', err); }
});

// What each tab takes from the save, and whether it has it yet
function usesHtml() {
  const profiles = loadJSON(KEYS.profiles, null);
  const journal = loadJSON(KEYS.journal, null);
  const predict = loadJSON(KEYS.predict, null);
  const synced = !!profiles?.players?.length;
  const uses = [
    { tab: 'tracker', icon: 'tracker', name: 'Tiến Độ & Hoàn Thành', what: 'Hồ sơ nhân vật: kỹ năng, nghề, Thành thạo, trang bị', ok: synced },
    { tab: 'recipes', icon: 'recipes', name: 'Công Thức Chế Biến', what: 'Đánh dấu món đã nấu, đồ đã chế tạo, công trình đã xây', ok: synced },
    { tab: 'quests', icon: 'quests', name: 'Hướng Dẫn Nhiệm Vụ', what: 'Đánh dấu nhiệm vụ đã xong', ok: synced },
    { tab: 'bundles', icon: 'bundles', name: 'Nhà Cộng Đồng', what: 'Đánh dấu ô gói đã nộp', ok: synced },
    { tab: 'museum', icon: 'museum', name: 'Bảo Tàng', what: 'Đánh dấu món đã quyên góp', ok: synced },
    { tab: 'fishing', icon: 'fishing', name: 'Câu Cá', what: 'Cá đã câu được, mùa hiện tại', ok: synced },
    { tab: 'today', icon: 'calendar', name: 'Hôm Nay', what: 'Ngày trong game, quà tuần này', ok: !!journal?.day },
    { tab: 'journal', icon: 'story', name: 'Sổ Tay Nông Trại', what: 'Tình bạn, rương, máy móc, sự kiện tim, Óc Chó Vàng, Ông Nội...', ok: !!journal },
    { tab: 'secretnotes', icon: 'secret_note', name: 'Mật Thư', what: 'Mật thư đã đọc và đã thực hiện', ok: !!journal?.players?.some(p => p.notesSeen) },
    { tab: 'predictor', icon: 'oracle', name: 'Dự Đoán', what: 'Game ID và các bộ đếm của save', ok: predict?.source === 'save' },
    { tab: 'farm', icon: 'farm', name: 'Nông Trại', what: 'Sơ đồ nông trại (khi chọn khi đồng bộ)', ok: null }
  ];
  return `
    <h3 class="journal-sub">${ico('members')} ${t('Các tab dùng file save')}</h3>
    <div class="save-uses">
      ${uses.map(u => `
        <button class="save-use ${u.ok ? 'is-done' : ''}" type="button" data-action="switch-tab" data-tab="${u.tab}">
          <span class="save-use__icon">${ico(u.icon)}</span>
          <span class="save-use__text"><strong>${t(u.name)}</strong><span class="muted">${t(u.what)}</span></span>
          ${u.ok === null ? '' : u.ok ? `<span class="tag tag--green">${ico('check')} ${t('Đã có')}</span>` : `<span class="tag">${t('Chưa có')}</span>`}
        </button>`).join('')}
    </div>`;
}

function roomHtml() {
  const r = roomSave();
  if (!coop.code) return `<p class="muted">${ico('members')} ${t('Vào phòng Co-op để dữ liệu save tự có trên máy khác và trên máy của bạn chơi chung.')}</p>`;
  if (!r) return `<p class="muted">${ico('members')} ${t('Phòng Co-op')} <strong data-no-i18n>${coop.code}</strong>: ${t('nạp file save để chia sẻ cho cả phòng.')}</p>`;
  return `<p class="muted">${ico('members')} ${t('Phòng Co-op')} <strong data-no-i18n>${coop.code}</strong>: ${r.mine
    ? t('đã chia sẻ với cả phòng')
    : `${t('nhận từ')} <strong data-no-i18n>${esc(r.name)}</strong> (${when(r.at)})`}</p>`;
}

function statusHtml() {
  const profiles = loadJSON(KEYS.profiles, null);
  const journal = loadJSON(KEYS.journal, null);
  const predict = loadJSON(KEYS.predict, null);
  if (!profiles && !journal && predict?.source !== 'save') {
    return `<p class="muted">${ico('upload')} ${t('Chưa nạp file save nào trên trình duyệt này.')}</p>`;
  }
  const farmName = journal?.farmName || profiles?.farmName;
  const names = (journal?.players || profiles?.players || []).map(p => p.name).filter(Boolean);
  const at = Math.max(journal?.at || 0, profiles?.at || 0);
  return `
    ${isStale(journal) ? `<p class="callout callout--tip">${ico('warn')} ${t('Trang vừa được cập nhật và đọc được thêm thông tin từ file save. Hãy nạp lại file save một lần để xem đầy đủ.')}</p>` : ''}
    <div class="save-current">
      <p>${ico('farm')} ${t('Nông trại')} <strong data-no-i18n>${esc(farmName || '?')}</strong>
        ${names.length ? ` · ${ico('members')} <span data-no-i18n>${names.map(esc).join(', ')}</span>` : ''}</p>
      ${journal?.day ? `<p>${ico('calendar')} ${dayText(journal.day)}</p>` : ''}
      ${predict?.source === 'save' ? `<p>${ico('oracle')} Game ID <strong data-no-i18n>${esc(predict.gameID)}</strong></p>` : ''}
      ${at ? `<p class="muted">${t('Nạp lúc')} ${when(at)}</p>` : ''}
      ${roomHtml()}
    </div>
    <button class="link-btn" type="button" data-action="save-forget">${t('Xóa dữ liệu save khỏi trình duyệt')}</button>`;
}

// ---------- Remembering the save file ----------
// Browsers never let a page open the file picker in a folder of its choosing
// (%AppData%\StardewValley\Saves...). Chrome and Edge's File System Access API
// gets close: the picker remembers the folder of the last save picked, and the
// file or folder handle, kept in IndexedDB, lets "Read again" reload the save
// after playing, with one permission click. Other browsers use plain inputs.
// Except on Windows: that API refuses every file under %AppData% ("contains
// system files"), which is exactly where the saves are, while plain inputs
// open them fine.
const pickerBlocked = /Windows/i.test(navigator.userAgent);
const canPick = !pickerBlocked && typeof window.showOpenFilePicker === 'function';
const canPickDir = !pickerBlocked && typeof window.showDirectoryPicker === 'function';
const LAST_FARM = 'stardew_wiki_save_farm';
let lastHandle = null;
// Farms found in a picked folder, waiting for the player to choose one
let choices = [];

function idb(mode, fn) {
  return new Promise((resolve, reject) => {
    const open = indexedDB.open('stardew_wiki_files', 1);
    open.onupgradeneeded = () => open.result.createObjectStore('handles');
    open.onerror = () => reject(open.error);
    open.onsuccess = () => {
      try {
        const tx = open.result.transaction('handles', mode);
        const req = fn(tx.objectStore('handles'));
        tx.oncomplete = () => resolve(req?.result);
        tx.onerror = () => reject(tx.error);
      } catch (e) { reject(e); }
    };
  });
}
const keepHandle = h => { lastHandle = h; idb('readwrite', st => st.put(h, 'save')).catch(() => {}); };
const dropHandle = () => { lastHandle = null; idb('readwrite', st => st.delete('save')).catch(() => {}); };
const lastFarm = () => { try { return localStorage.getItem(LAST_FARM); } catch { return null; } };

// ---------- Finding the save inside a folder ----------
// Saves/Farm_123456789/Farm_123456789 is the save; SaveGameInfo and the _old
// copies sit beside it. The player may pick the Saves folder, one farm's
// folder or StardewValley itself: the site finds the save files in it.
// A found save: { farm, file, modified }
const isSave = (name, folder) => name === folder && /_\d+$/.test(folder);
const goesDown = name => name === 'Saves' || /_\d+$/.test(name);
const found = file => ({ farm: file.name, file, modified: file.lastModified });

// A folder input or a list of files with their paths (Saves/Farm_1/Farm_1)
const savesFromList = files => files
  .filter(f => { const parts = f.webkitRelativePath.split('/'); return parts.length >= 2 && isSave(parts.at(-1), parts.at(-2)); })
  .map(found);

// A folder handle (Chrome / Edge picker or drop)
async function savesFromDir(dir, depth = 0) {
  const out = [];
  for await (const [name, h] of dir.entries()) {
    if (h.kind === 'file' && isSave(name, dir.name)) out.push(found(await h.getFile()));
    else if (h.kind === 'directory' && depth < 2 && goesDown(name)) out.push(...await savesFromDir(h, depth + 1));
  }
  return out;
}

// A dropped folder in browsers without handles (webkitGetAsEntry)
async function savesFromEntry(dir, depth = 0) {
  const kids = await new Promise((resolve, reject) => {
    const reader = dir.createReader(), all = [];
    const next = () => reader.readEntries(batch => { if (batch.length) { all.push(...batch); next(); } else resolve(all); }, reject);
    next();
  });
  const out = [];
  for (const k of kids) {
    if (k.isFile && isSave(k.name, dir.name)) out.push(found(await new Promise((res, rej) => k.file(res, rej))));
    else if (k.isDirectory && depth < 2 && goesDown(k.name)) out.push(...await savesFromEntry(k, depth + 1));
  }
  return out;
}

function readFound(app, c) {
  choices = [];
  try { localStorage.setItem(LAST_FARM, c.farm); } catch { /* storage blocked */ }
  readSaveFile(app, c.file);
}

// One save: read it. Several: list them (newest first), unless `prefer`
// asks for the farm read last time ("Read again" on a folder).
function useSaves(app, list, prefer = false) {
  list.sort((a, b) => b.modified - a.modified);
  lastDone = ''; lastError = '';
  const again = prefer && list.find(c => c.farm === lastFarm());
  if (again || list.length === 1) return readFound(app, again || list[0]);
  choices = list;
  if (!list.length) lastError = t('Không thấy file save nào trong thư mục này. Hãy chọn thư mục Saves hoặc thư mục của nông trại (tên dạng TenNongTrai_123456789).');
  if (app.currentTab === 'save') app.render(); else app.switchTab('save');
}

async function pickSave(app) {
  if (!canPick) { document.getElementById('saveProgressInput').click(); return; }
  try {
    // id: the picker keeps its own last folder; startIn: the last save or folder
    const [h] = await window.showOpenFilePicker({ id: 'stardew-save', ...(lastHandle ? { startIn: lastHandle } : {}) });
    keepHandle(h);
    readFound(app, found(await h.getFile()));
  } catch (e) {
    if (e.name === 'AbortError') return;   // picker closed
    console.warn('[save picker]', e);
    app.showToast(`${ico('warn')} ${e.message}`);
  }
}

async function pickFolder(app) {
  if (!canPickDir) { document.getElementById('saveFolderInput').click(); return; }
  try {
    const dir = await window.showDirectoryPicker({ id: 'stardew-saves', mode: 'read', ...(lastHandle ? { startIn: lastHandle } : {}) });
    keepHandle(dir);
    useSaves(app, await savesFromDir(dir));
  } catch (e) {
    if (e.name === 'AbortError') return;
    console.warn('[save folder]', e);
    app.showToast(`${ico('warn')} ${e.message}`);
  }
}

async function reopenSave(app) {
  const h = lastHandle;
  if (!h) return;
  try {
    const opts = { mode: 'read' };
    if ((await h.queryPermission?.(opts)) !== 'granted' && (await h.requestPermission?.(opts)) !== 'granted') return;
    if (h.kind === 'directory') useSaves(app, await savesFromDir(h), true);
    else readFound(app, found(await h.getFile()));
  } catch (e) {
    console.warn('[save reopen]', e);
    dropHandle();
    app.showToast(`${ico('warn')} ${t('Không mở lại được file lần trước, hãy chọn lại file save.')}`);
    app.render();
  }
}

// The save folder of the player's system, and how to get there
function savePath() {
  const ua = navigator.userAgent;
  if (/Android|iPhone|iPad/i.test(ua)) return null;
  if (/Windows/i.test(ua)) return { path: '%AppData%\\StardewValley\\Saves', how: ['Bấm Chọn file save, dán đường dẫn vào ô "File name" (Tên tệp) rồi nhấn Enter.'] };
  if (/Mac/i.test(ua)) return { path: '~/.config/StardewValley/Saves', how: [
    'Trong hộp chọn file (hoặc Finder > Go > Go to Folder) nhấn Cmd + Shift + G, dán đường dẫn rồi nhấn Enter.',
    'Thư mục .config bị ẩn: nhấn Cmd + Shift + . (dấu chấm) để hiện thư mục ẩn.',
    'Bản mua trên Mac App Store lưu trong thư mục riêng của ứng dụng, thường là ~/Library/Containers/(Stardew Valley)/Data/.config/StardewValley/Saves.'] };
  return { path: '~/.config/StardewValley/Saves', how: ['Trong hộp chọn file nhấn Ctrl + L, dán đường dẫn rồi nhấn Enter.'] };
}

function quickHtml() {
  const sp = savePath();
  const again = lastHandle && (lastHandle.kind === 'directory' ? (lastFarm() || lastHandle.name) : lastHandle.name);
  return `
    ${again ? `<button class="btn btn--blue" type="button" data-action="save-reopen">${ico('save')} ${t('Đọc lại')} <strong data-no-i18n>${esc(again)}</strong></button>
      <p class="muted">${t('Chơi xong, lưu game rồi bấm Đọc lại để cập nhật, không cần chọn lại file.')}</p>` : ''}
    ${sp ? `<p class="save-path">${t('Thư mục save')}: <code data-no-i18n>${sp.path}</code>
      <button class="btn btn--ghost btn--sm" type="button" data-action="save-copy-path" data-path="${sp.path}">${ico('copy')} ${t('Chép')}</button></p>
      ${sp.how.map(h => `<p class="muted">${t(h)}</p>`).join('')}
      ${canPick ? `<p class="muted">${t('Từ lần sau hộp chọn file sẽ tự mở ở thư mục này.')}</p>` : ''}` : ''}`;
}

// The farms found in a picked folder
function choicesHtml() {
  if (!choices.length) return '';
  return `
    <section class="panel">
      <h2 class="panel__title">${ico('farm')} ${t('Chọn nông trại')}</h2>
      <p class="muted">${t('Thư mục này có')} ${choices.length} ${t('file save, mới nhất ở trên.')}</p>
      <div class="save-choices">
        ${choices.map((c, i) => `
          <button class="save-use" type="button" data-action="save-choose" data-i="${i}">
            <span class="save-use__icon">${ico('save')}</span>
            <span class="save-use__text"><strong data-no-i18n>${esc(c.farm.replace(/_(\d+)$/, ''))}</strong>
              <span class="muted">Game ID ${c.farm.match(/_(\d+)$/)?.[1] || '?'} · ${t('lưu lúc')} ${when(c.modified)}</span></span>
          </button>`).join('')}
      </div>
    </section>`;
}

function render() {
  const quick = document.getElementById('saveQuick');
  if (quick) quick.innerHTML = quickHtml();
  const el = document.getElementById('saveBoard');
  if (!el) return;
  el.innerHTML = `
    ${lastError ? `<p class="callout callout--red">${ico('warn')} ${esc(lastError)}</p>` : ''}
    ${choicesHtml()}
    ${lastDone ? `<p class="callout callout--green">${ico('check')} ${t('Đã đồng bộ từ file save')}: ${lastDone}</p>` : ''}
    ${summary ? `<section class="panel save-sync">
      <h2 class="panel__title">${ico('save')} ${t('Tiến độ trong file save')}</h2>
      ${summary}</section>` : ''}
    <section class="panel">
      <h2 class="panel__title">${ico('save')} ${t('File save đang dùng')}</h2>
      ${statusHtml()}
      ${usesHtml()}
    </section>`;
}

function bindDrop(app) {
  const zone = document.getElementById('saveDrop');
  if (!zone) return;
  const on = e => { e.preventDefault(); zone.classList.add('is-over'); };
  const off = () => zone.classList.remove('is-over');
  zone.addEventListener('dragenter', on);
  zone.addEventListener('dragover', on);
  zone.addEventListener('dragleave', off);
  zone.addEventListener('drop', e => {
    e.preventDefault(); off();
    // Both must be asked for right away, before anything waits
    const item = e.dataTransfer?.items?.[0];
    const handle = canPick ? item?.getAsFileSystemHandle?.() : null;
    const entry = item?.webkitGetAsEntry?.();
    const file = e.dataTransfer?.files?.[0];
    const plain = () => {
      if (entry?.isDirectory) savesFromEntry(entry).then(list => useSaves(app, list)).catch(err => console.warn('[save drop]', err));
      else if (file) readFound(app, found(file));
    };
    if (handle) {
      // Chrome / Edge: keep the dropped file or folder for "Read again"; when
      // the browser refuses a handle for that folder, read it the plain way
      handle.then(async h => {
        if (!h) return plain();
        keepHandle(h);
        if (h.kind === 'directory') useSaves(app, await savesFromDir(h));
        else readFound(app, found(await h.getFile()));
      }).catch(err => { console.warn('[save drop]', err); plain(); });
    } else {
      plain();
    }
  });
}

// The Farm tab hands over save files it was given
document.addEventListener('save-file', e => window.app && readSaveFile(window.app, e.detail.file, e.detail.text));

export default {
  id: 'save',
  toggles: [],
  init(app) {
    bindDrop(app);
    if (canPick || canPickDir) idb('readonly', st => st.get('save')).then(h => { lastHandle = h || null; if (h && app.currentTab === 'save') render(); }).catch(() => {});
  },
  render,
  actions: {
    'goto-save': (app) => { app.switchTab('save'); app.sfx.play('click'); window.scrollTo({ top: 0, behavior: 'smooth' }); },
    'import-save-progress': (app) => {
      if (app.currentTab !== 'save') app.switchTab('save');
      pickSave(app);
    },
    'save-reopen': (app) => reopenSave(app),
    'save-pick-folder': (app) => {
      if (app.currentTab !== 'save') app.switchTab('save');
      pickFolder(app);
    },
    'save-folder-files': (app, el) => {
      const files = [...(el.files || [])];
      el.value = '';
      if (files.length) useSaves(app, savesFromList(files));
    },
    'save-choose': (app, el) => { const c = choices[Number(el.dataset.i)]; if (c) readFound(app, c); },
    'save-copy-path': async (app, el) => {
      try { await navigator.clipboard.writeText(el.dataset.path); app.showToast(`${ico('check')} ${t('Đã chép đường dẫn')}`); }
      catch { app.showToast(el.dataset.path); }
    },
    'save-progress-file': (app, el) => {
      const file = el.files?.[0];
      el.value = '';   // allow choosing the same file again
      if (file) readFound(app, found(file));
    },
    'save-progress-apply': (app) => applySave(app),
    'save-cancel': (app) => { pendingSave = null; summary = ''; app.render(); },
    'save-forget': (app) => {
      if (!confirm(t('Xóa thông tin đọc từ file save (hồ sơ, sổ tay, dự đoán) khỏi trình duyệt? Các dấu tick tiến độ vẫn được giữ.'))) return;
      for (const k of [KEYS.profiles, KEYS.journal, KEYS.predict, ROOM_SAVE]) { try { localStorage.removeItem(k); } catch { /* storage blocked */ } }
      dropHandle();
      try { localStorage.removeItem(LAST_FARM); } catch { /* storage blocked */ }
      lastDone = ''; app.render();
      app.showToast(t('Đã xóa dữ liệu save'));
    }
  }
};
