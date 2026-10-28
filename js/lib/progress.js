// ==========================================================================
// PROGRESS STORE
// The single place every tick, untick and planner count goes through. It
// persists to localStorage (same keys as before, so existing progress loads)
// and emits one change event per item, which is what the co-op sync layer
// forwards to the shared room.
//
// Domains:
//   flags  - recipes, quests, bundles ("bundleId:slotIndex"), museum,
//            gathered (ingredient names ticked in the planner)
//   counts - planner (recipe id -> how many to make)
//
// Events: { domain, key, value, delta? }, origin
//   value is a boolean for flags and the new count for planner; delta is set
//   when a count changed relatively (+1/-1), so sync can merge concurrent
//   clicks instead of overwriting them.
//   origin is 'local' for this user's actions, 'remote' for changes applied
//   from the room, 'bulk' for import/reset.
// ==========================================================================

import { KEYS, loadJSON, saveJSON, loadSet, saveSet } from './storage.js';

export const FLAG_DOMAINS = ['recipes', 'quests', 'bundles', 'museum', 'gathered'];
export const DOMAINS = [...FLAG_DOMAINS, 'planner'];

const SET_KEYS = {
  recipes: KEYS.completedRecipes,
  quests: KEYS.completedQuests,
  bundles: KEYS.bundles,
  museum: KEYS.museum
};

class ProgressStore {
  constructor() {
    this.flags = {};
    for (const [domain, key] of Object.entries(SET_KEYS)) this.flags[domain] = loadSet(key);
    // Gathered materials were saved as { name: true|false }
    const gathered = loadJSON(KEYS.gathered, {});
    this.flags.gathered = new Set(Object.keys(gathered).filter(k => gathered[k] === true));
    this.planner = Object.fromEntries(
      Object.entries(loadJSON(KEYS.planner, {})).filter(([, n]) => Number.isInteger(n) && n > 0)
    );
    this.listeners = new Set();
  }

  // ---------- reads ----------
  has(domain, key) { return this.flags[domain].has(key); }
  set(domain) { return this.flags[domain]; }
  count(key) { return this.planner[key] || 0; }
  plannedEntries() { return Object.entries(this.planner); }

  snapshot() {
    return {
      ...Object.fromEntries(FLAG_DOMAINS.map(d => [d, Array.from(this.flags[d])])),
      planner: { ...this.planner }
    };
  }

  // ---------- writes ----------
  setFlag(domain, key, on, origin = 'local') {
    const set = this.flags[domain];
    if (set.has(key) === on) return false;
    if (on) set.add(key); else set.delete(key);
    this.persist(domain);
    this.emit({ domain, key, value: on }, origin);
    return true;
  }

  toggle(domain, key) {
    const on = !this.has(domain, key);
    this.setFlag(domain, key, on);
    return on;
  }

  addCount(key, delta) {
    const next = Math.max(0, this.count(key) + delta);
    this.writeCount(key, next);
    this.emit({ domain: 'planner', key, value: next, delta }, 'local');
  }

  setCount(key, n, origin = 'local') {
    const next = Math.max(0, n);
    if (next === this.count(key)) return;
    this.writeCount(key, next);
    this.emit({ domain: 'planner', key, value: next }, origin);
  }

  writeCount(key, n) {
    if (n > 0) this.planner[key] = n; else delete this.planner[key];
    this.persist('planner');
  }

  // Replace a whole domain (backup import, reset, clear plan). Emits one
  // event per item that actually changed so a shared room sees each of them.
  replace(domain, values, origin = 'bulk') {
    if (domain === 'planner') {
      const keys = new Set([...Object.keys(this.planner), ...Object.keys(values)]);
      for (const key of keys) this.setCount(key, values[key] || 0, origin);
      return;
    }
    const next = new Set(values);
    for (const key of Array.from(this.flags[domain])) if (!next.has(key)) this.setFlag(domain, key, false, origin);
    for (const key of next) this.setFlag(domain, key, true, origin);
  }

  persist(domain) {
    if (domain === 'planner') saveJSON(KEYS.planner, this.planner);
    else if (domain === 'gathered') saveJSON(KEYS.gathered, Object.fromEntries([...this.flags.gathered].map(k => [k, true])));
    else saveSet(SET_KEYS[domain], this.flags[domain]);
  }

  // ---------- events ----------
  subscribe(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  emit(change, origin) {
    for (const fn of this.listeners) fn(change, origin);
  }
}

export const progress = new ProgressStore();
