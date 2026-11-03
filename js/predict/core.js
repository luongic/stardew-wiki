// ==========================================================================
// PREDICTIONS: SHARED CORE
// Stardew Valley decides cart stock, geode contents, trains and more with
// seeded random numbers, so the same Game ID always gives the same results.
// This core rebuilds the game's generator (C# System.Random) and the 1.6
// seeding (xxHash32 over the seed parts, Utility.CreateRandomSeed).
// Logic ported from stardew-predictor by MouseyPounds (MIT License):
//   https://github.com/MouseyPounds/stardew-predictor
// ==========================================================================

import { t, isEn } from '../lib/i18n.js';

// ---------- C# System.Random (reference source, mscorlib/system/random.cs) ----------
const INT_MIN = -2147483648, INT_MAX = 2147483647, MBIG = INT_MAX, MSEED = 161803398;

export class CSRandom {
  constructor(seed) {
    seed = Math.imul(1, parseInt(seed));   // force a 32-bit integer
    this.seedArray = new Array(56).fill(0);
    let mj = MSEED - (seed === INT_MIN ? INT_MAX : Math.abs(seed));
    this.seedArray[55] = mj;
    let mk = 1;
    for (let i = 1; i < 55; i++) {
      const ii = (21 * i) % 55;
      this.seedArray[ii] = mk;
      mk = mj - mk;
      if (mk < 0) mk += MBIG;
      mj = this.seedArray[ii];
    }
    for (let k = 1; k < 5; k++) {
      for (let i = 1; i < 56; i++) {
        this.seedArray[i] -= this.seedArray[1 + (i + 30) % 55];
        if (this.seedArray[i] > INT_MAX) this.seedArray[i] -= 4294967296;
        else if (this.seedArray[i] < INT_MIN) this.seedArray[i] += 4294967296;
        if (this.seedArray[i] < 0) this.seedArray[i] += MBIG;
      }
    }
    this.inext = 0;
    this.inextp = 21;
  }

  internalSample() {
    let a = this.inext, b = this.inextp;
    if (++a >= 56) a = 1;
    if (++b >= 56) b = 1;
    let ret = this.seedArray[a] - this.seedArray[b];
    if (ret === MBIG) ret--;
    if (ret < 0) ret += MBIG;
    this.seedArray[a] = ret;
    this.inext = a;
    this.inextp = b;
    return ret;
  }

  sample() { return this.internalSample() * (1.0 / MBIG); }

  largeRangeSample() {
    let result = this.internalSample();
    if (this.internalSample() % 2 === 0) result = -result;
    return (result + (INT_MAX - 1)) / (2 * INT_MAX - 1);
  }

  // Next() -> [0, INT_MAX); Next(max) -> [0, max); Next(min, max) -> [min, max)
  Next(a, b) {
    if (b !== undefined) {
      const min = a ?? 0, range = b - min;
      if (min > b) throw new Error(`Argument out of range: ${min} > ${b}`);
      return Math.floor((range <= INT_MAX ? this.sample() : this.largeRangeSample()) * range) + min;
    }
    if (a !== undefined) {
      if (a < 0) throw new Error(`Argument out of range: ${a} < 0`);
      return Math.floor(this.sample() * a);
    }
    return this.internalSample();
  }

  NextDouble() { return this.sample(); }
}

// ---------- xxHash32 (seed 0), as used by Utility.GetDeterministicHashCode ----------
const P1 = 2654435761, P2 = 2246822519, P3 = 3266489917, P4 = 668265263, P5 = 374761393;
const rotl = (x, r) => (x << r) | (x >>> (32 - r));
const u32 = (b, i) => (b[i] | (b[i + 1] << 8) | (b[i + 2] << 16) | (b[i + 3] << 24)) >>> 0;

export function xxh32(bytes, seed = 0) {
  const len = bytes.length;
  let i = 0, h;
  if (len >= 16) {
    let v1 = (seed + P1 + P2) >>> 0, v2 = (seed + P2) >>> 0, v3 = seed >>> 0, v4 = (seed - P1) >>> 0;
    const round = (v, x) => Math.imul(rotl((v + Math.imul(x, P2)) >>> 0, 13), P1) >>> 0;
    for (; i <= len - 16; i += 16) {
      v1 = round(v1, u32(bytes, i)); v2 = round(v2, u32(bytes, i + 4));
      v3 = round(v3, u32(bytes, i + 8)); v4 = round(v4, u32(bytes, i + 12));
    }
    h = (rotl(v1, 1) + rotl(v2, 7) + rotl(v3, 12) + rotl(v4, 18)) >>> 0;
  } else {
    h = (seed + P5) >>> 0;
  }
  h = (h + len) >>> 0;
  for (; i <= len - 4; i += 4) h = Math.imul(rotl((h + Math.imul(u32(bytes, i), P3)) >>> 0, 17), P4) >>> 0;
  for (; i < len; i++) h = Math.imul(rotl((h + Math.imul(bytes[i], P5)) >>> 0, 11), P1) >>> 0;
  h ^= h >>> 15; h = Math.imul(h, P2) >>> 0;
  h ^= h >>> 13; h = Math.imul(h, P3) >>> 0;
  h ^= h >>> 16;
  return h >>> 0;
}

// GetDeterministicHashCode(string) and (params int[]): the hash cast to a signed int
export const hashString = s => xxh32(new TextEncoder().encode(s)) | 0;
export const hashInts = (...values) => xxh32(new Uint8Array(new Int32Array(values).buffer)) | 0;

// A 64-bit multiplayer id cast to int, as the game does ((int)UniqueMultiplayerID)
export const toInt32 = big => Number(BigInt.asIntN(32, BigInt(big)));

// ---------- Seeds (Utility.CreateRandomSeed) ----------
// `ctx.useLegacyRandom`: the save option that keeps pre-1.6 seeding
export function seedOf(ctx, a, b = 0, c = 0, d = 0, e = 0) {
  const m = x => x % 2147483647;
  if (ctx.useLegacyRandom) return Math.floor((m(a) + m(b) + m(c) + m(d) + m(e)) % 2147483647);
  return hashInts(m(a), m(b), m(c), m(d), m(e));
}
export const rngOf = (ctx, ...parts) => new CSRandom(seedOf(ctx, ...parts));
// Same, for parts that are 64-bit (multiplayer ids, gameID * 512...). The game's
// CreateRandomSeed takes doubles, so big ids lose precision exactly like a JS Number.
export function seedOfBig(ctx, ...parts) {
  return seedOf(ctx, ...parts.map(p => Number(p)));
}

// ---------- Dates: day 1 = Spring 1, Year 1 (stats.DaysPlayed) ----------
export const SEASONS = ['spring', 'summer', 'fall', 'winter'];
const SEASON_VI = ['Xuân', 'Hạ', 'Thu', 'Đông'];
const SEASON_EN = ['Spring', 'Summer', 'Fall', 'Winter'];
const DOW_VI = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
const DOW_EN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function dateOf(dayNumber) {
  const i = dayNumber - 1;
  return { day: (i % 28) + 1, seasonIndex: Math.floor(i / 28) % 4, season: SEASONS[Math.floor(i / 28) % 4], year: Math.floor(i / 112) + 1, dow: i % 7 };
}
export const seasonName = idx => (isEn ? SEASON_EN : SEASON_VI)[idx];
export const dowName = idx => (isEn ? DOW_EN : DOW_VI)[idx];
// "Thu 6, Năm 2" / "Fall 6, Year 2"
export function dateLabel(dayNumber) {
  const d = dateOf(dayNumber);
  return isEn ? `${SEASON_EN[d.seasonIndex]} ${d.day}, Y${d.year}` : `${d.day} ${SEASON_VI[d.seasonIndex]}, năm ${d.year}`;
}
// The first day of the month containing `dayNumber` (28-day months)
export const monthStart = dayNumber => 28 * Math.floor((dayNumber - 1) / 28) + 1;
export const weekStart = dayNumber => 7 * Math.floor((dayNumber - 1) / 7) + 1;
// Today in the context: days played plus the multiplayer adjustment
export const today = ctx => ctx.daysPlayed + (ctx.dayAdjust || 0);
export const when = (ctx, day) => (day < today(ctx) ? 'is-past' : day === today(ctx) ? 'is-today' : 'is-future');

// ---------- Rendering helpers shared by the prediction modules ----------
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// A month calendar (4 weeks). `cell(dayNumber)` returns the inner HTML of a day.
export function calendar(ctx, start, cell) {
  const d = dateOf(start);
  // Already in the current language: keep the page translator off ("Thu" is both Thursday and Fall)
  let html = `<table class="predict-cal"><caption data-no-i18n>${seasonName(d.seasonIndex)} · ${isEn ? 'Year' : 'Năm'} ${d.year}</caption>
    <thead data-no-i18n><tr>${[0, 1, 2, 3, 4, 5, 6].map(i => `<th>${dowName(i)}</th>`).join('')}</tr></thead><tbody>`;
  for (let w = 0; w < 4; w++) {
    html += '<tr>';
    for (let k = 0; k < 7; k++) {
      const day = start + w * 7 + k;
      // data-dow: the weekday shown next to the date when phones list the days one per row
      html += `<td class="${when(ctx, day)}" data-dow="${dowName(k)}"><span class="predict-cal__date">${dateOf(day).day}</span><div class="predict-cal__cell">${cell(day)}</div></td>`;
    }
    html += '</tr>';
  }
  return `${html}</tbody></table>`;
}

// A table: `head` is a list of column titles, `rows` a list of lists of cell HTML
export function table(head, rows, cls = '') {
  return `<div class="predict-table-wrap" data-hint="${t('Vuốt ngang để xem thêm cột')}"><table class="predict-table ${cls}">
    <thead><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead>
    <tbody>${rows.map(r => `<tr${r.cls ? ` class="${r.cls}"` : ''}>${(r.cells || r).map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
