// ==========================================================================
// PREDICTIONS: SHARED BITS FOR "OPEN N TIMES" LISTS
// Geodes, mystery boxes and prize tickets all depend on how many the
// player already opened (a per-player count in the save). This holds what
// the three share: pages of 20, the per-player starting page, row classes,
// small marks and the search over the next 200.
// Logic ported from stardew-predictor by MouseyPounds (MIT License).
// ==========================================================================

import { esc, table, toInt32 } from './core.js';
import { t } from '../lib/i18n.js';
import { ico } from '../lib/icons.js';
import { itemTag, itemName } from '../lib/item-lookup.js';

export const PAGE = 20, SEARCH_RANGE = 200;

// nav.start(ctx, opts) starts at the chosen player's page (or the player last
// shown by that module). As in stardew-predictor, changing player keeps the
// current page; "Hiện tại" then jumps to that player's page.
const lastPlayer = {};
export function playerOf(ctx, id, opts) {
  const p = Math.max(0, Math.min(Number(opts?.player) || 0, (ctx.names?.length || 1) - 1));
  lastPlayer[id] = p;
  return p;
}
export const countOf = (ctx, field, player) => Number(ctx[field]?.[player]) || 0;
export const navFor = (id, field) => ({
  step: PAGE, big: 100, min: 0,
  start: (ctx, opts) => PAGE * Math.floor(countOf(ctx, field, opts?.player ?? lastPlayer[id] ?? 0) / PAGE),
  stepLabel: '20 trước', nextLabel: '20 sau', bigLabel: '100 trước', bigNextLabel: '100 sau'
});

// (int)UniqueMultiplayerID / 2 as a seed part (0 without players, like the original)
export const mpHalf = (ctx, player) => (ctx.mpIds?.length ? toInt32(ctx.mpIds[player] ?? ctx.mpIds[0]) / 2 : 0);

// The next one to open is highlighted like "today"
export const rowClass = (n, done) => (n === done + 1 ? 'is-today' : n <= done ? 'is-past' : '');

// Results that are not one item: shown with a translated label
const GENERIC = {
  'Mystery Hat': 'Mũ ngẫu nhiên', 'Mystery Shirt': 'Áo ngẫu nhiên', 'Mystery Wallpaper': 'Giấy dán tường ngẫu nhiên',
  'Seasonal Seeds': 'Hạt giống theo mùa'
};
export const displayName = en => (GENERIC[en] ? t(GENERIC[en]) : itemName(en));
export function nameTag(en, extra = '', cls = '') {
  if (!GENERIC[en]) return itemTag(en, extra, cls);
  return `<span class="item-tag ${cls}" title="${esc(en)}"><span>${t(GENERIC[en])}</span>${extra}</span>`;
}
export const qtyText = q => (q > 1 ? ` ×${q}` : '');
// A small icon with a tooltip
export const mark = (icon, title) => ` <span title="${esc(t(title))}">${ico(icon)}</span>`;

// Case-insensitive match on the English name (regular expression, as in the
// original) or on the shown name without accents
const fold = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd').toLowerCase();
export function matcher(query) {
  let re = null;
  try { re = new RegExp(query, 'i'); } catch { /* not a valid pattern: plain text */ }
  const q = fold(query);
  return en => (re ? re.test(en) : fold(en).includes(q)) || fold(displayName(en)).includes(q);
}

// Search the next SEARCH_RANGE counts (from the current count, like the
// original). `resultsAt(n)` returns the English result per column.
export function searchTable(ctx, { query, done, cols, resultsAt, unit, itemExtra = () => '' }) {
  const match = matcher(query);
  const start = Math.max(1, done), end = start + SEARCH_RANGE;
  const found = {};
  let count = 0;
  for (let n = start; n < end; n++) {
    resultsAt(n).forEach((en, c) => {
      if (!match(en)) return;
      (found[en] ||= cols.map(() => []))[c].push(n);
      count++;
    });
  }
  const keys = Object.keys(found).sort();
  const cell = list => (!list.length ? '<span class="predict-none">—</span>'
    : list.slice(0, 5).join(', ') + (list.length > 5 ? `<span title="${list.join(', ')}">, ...</span>` : ''));
  return `<p class="muted">${t('Kết quả tìm')} "${esc(query)}" · ${SEARCH_RANGE} ${t(unit)} ${t('tiếp theo')}</p>
    ${keys.length ? table([t('Món'), ...cols], keys.map(en => [nameTag(en, itemExtra(en)), ...found[en].map(cell)])) : ''}
    <p class="muted">${t('Tìm thấy')} ${count} ${t('lần')}, ${keys.length} ${t('món')}</p>`;
}
