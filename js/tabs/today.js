// ==========================================================================
// TAB: HÔM NAY (TODAY)
// One screen for a given in-game day: birthdays (with loved gifts),
// festivals, the Traveling Cart, the Queen of Sauce recipe, shops that are
// closed, and the crops that can still be planted before the season ends.
// The day is chosen here, or read from a save file.
// ==========================================================================

import { NPCS_DATA, CALENDAR_EVENTS } from '../../data/npcs-data.js';
import { PLACES } from '../../data/places-data.js';
import { RECIPES_DATA } from '../../data/recipes-data.js';
import { ITEMS_DATA } from '../../data/items-data.js';
import { ico } from '../lib/icons.js';
import { t, nm } from '../lib/i18n.js';
import { loadJSON, saveJSON, KEYS } from '../lib/storage.js';
import { fishAvailable } from './fishing.js';

const SEASONS = ['spring', 'summer', 'fall', 'winter'];
const SEASON_VI = { spring: 'Mùa Xuân', summer: 'Mùa Hạ', fall: 'Mùa Thu', winter: 'Mùa Đông' };
const SEASON_SHORT = { spring: 'Xuân', summer: 'Hạ', fall: 'Thu', winter: 'Đông' };
const DOW = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'];
const dowOf = day => (day - 1) % 7;

let state = { season: 'spring', day: 1, year: 1, ...loadJSON(KEYS.today, {}) };
const save = () => saveJSON(KEYS.today, state);

// Day n days after the chosen one (wraps across seasons and years)
function shift(d, n) {
  let idx = SEASONS.indexOf(d.season) * 28 + d.day - 1 + n;
  let year = d.year + Math.floor(idx / 112);
  idx = ((idx % 112) + 112) % 112;
  return { season: SEASONS[Math.floor(idx / 28)], day: (idx % 28) + 1, year: Math.max(1, year) };
}

// ---------- Birthdays ----------
const birthdaysOn = (season, day) => NPCS_DATA.filter(n => n.birthday?.season === season && n.birthday?.day === day);

// ---------- Queen of Sauce: "(Ngày 7 Mùa Hè, Năm 1)" in recipe sources ----------
const TV_SEASON = { 'Xuân': 'spring', 'Hè': 'summer', 'Hạ': 'summer', 'Thu': 'fall', 'Đông': 'winter' };
const tvRecipes = RECIPES_DATA.flatMap(r => [...(r.source || '').matchAll(/Queen of Sauce \(Ngày (\d+) Mùa (Xuân|Hè|Hạ|Thu|Đông), Năm (\d)\)/g)]
  .map(m => ({ recipe: r, day: Number(m[1]), season: TV_SEASON[m[2]], year: Number(m[3]) })));

// ---------- Crops: seeds whose location reads "Gieo ra X sau N ngày" ----------
const SEASON_WORD = { spring: 'Xuân', summer: 'Hạ', fall: 'Thu', winter: 'Đông' };
const seeds = ITEMS_DATA.filter(i => i.category === 'seeds').map(i => {
  const m = (i.location || '').match(/Gieo ra (.+?) sau (\d+) ngày/);
  const price = (i.location || '').match(/Pierre \(([\d.]+)g\)/);
  return m && { seed: i, crop: m[1], days: Number(m[2]), price: price ? price[1] : null };
}).filter(Boolean);
const cropByName = new Map(ITEMS_DATA.filter(i => ['crops', 'fruits'].includes(i.category)).map(i => [i.name.replace(/\s*\(.*\)$/, ''), i]));

// ---------- Rendering ----------
const card = (icon, title, body) => `
  <section class="today-card">
    <h3 class="today-card__title">${ico(icon)} ${t(title)}</h3>
    ${body}
  </section>`;

function dateLabel(d) {
  return `${DOW[dowOf(d.day)]}, ${t('ngày')} ${d.day} ${SEASON_VI[d.season]}, ${t('năm')} ${d.year}`;
}

function birthdayCard(d) {
  const today = birthdaysOn(d.season, d.day);
  const soon = [];
  for (let i = 1; i <= 7; i++) {
    const n = shift(d, i);
    for (const npc of birthdaysOn(n.season, n.day)) soon.push({ npc, in: i, d: n });
  }
  const gifts = npc => (npc.gifts?.loved || []).filter(g => g.icon).slice(0, 6).map(g =>
    `<img src="${g.icon}" alt="" title="${g.name}" class="pixel-img today-gift">`).join('');
  return card('birthday', 'Sinh nhật', `
    ${today.length ? today.map(npc => `
      <div class="today-bday">
        <img src="${npc.avatar}" alt="" class="today-face pixel-img">
        <div>
          <strong>${nm(npc)}</strong> <span class="tag tag--red">${t('Hôm nay')}</span>
          <p class="muted">${t('Quà tặng hôm nay được tính gấp 8 lần. Họ rất thích')}:</p>
          <div class="today-gifts">${gifts(npc)}</div>
        </div>
      </div>`).join('') : `<p class="muted">${t('Hôm nay không có ai sinh nhật.')}</p>`}
    ${soon.length ? `
      <ul class="today-list">
        ${soon.map(s => `<li><img src="${s.npc.avatar}" alt="" class="pixel-img"> <strong>${nm(s.npc)}</strong>
          <span class="muted">${s.in === 1 ? t('ngày mai') : `${t('sau')} ${s.in} ${t('ngày')}`} (${s.d.day} ${SEASON_SHORT[s.d.season]})</span></li>`).join('')}
      </ul>` : ''}`);
}

function festivalCard(d) {
  const evt = CALENDAR_EVENTS[d.season]?.[d.day];
  const todays = evt?.type === 'festival' ? evt : null;
  let next = null;
  for (let i = 1; i <= 112 && !next; i++) {
    const n = shift(d, i); const e = CALENDAR_EVENTS[n.season]?.[n.day];
    if (e?.type === 'festival' && !e.passive) next = { e, in: i, d: n };
  }
  return card('festival', 'Lễ hội', `
    ${todays ? `
      <div class="today-fest">
        ${ico(todays.icon)} <div><strong>${todays.name}</strong>
        <p class="muted">${todays.time || ''}${todays.loc ? ` · ${todays.loc}` : ''}</p>
        <p>${todays.desc || ''}</p></div>
      </div>` : `<p class="muted">${t('Hôm nay không có lễ hội.')}</p>`}
    ${next ? `<p>${ico('calendar')} ${t('Lễ hội tiếp theo')}: <strong>${next.e.name}</strong> · ${next.d.day} ${SEASON_SHORT[next.d.season]} (${t('sau')} ${next.in} ${t('ngày')})</p>` : ''}`);
}

function townCard(d) {
  const dow = dowOf(d.day);
  const evt = CALENDAR_EVENTS[d.season]?.[d.day];
  const festivalToday = evt?.type === 'festival' && !evt.passive;
  const lines = [];
  // Traveling Cart: Fridays and Sundays, plus the Night Market and Desert Festival
  const cart = dow === 4 || dow === 6 || (d.season === 'winter' && d.day >= 15 && d.day <= 17) || (d.season === 'spring' && d.day >= 15 && d.day <= 17);
  lines.push(cart
    ? `${ico('item_rare_seed')} <span><strong>${t('Xe Đẩy Du Mục có mặt')}</strong> ${t('ở Rừng Cindersap, 6:00 – 20:00. Tìm Hạt Giống Hiếm, nguyên liệu gói Nhà Cộng Đồng còn thiếu.')}</span>`
    : `${ico('item_rare_seed')} <span class="muted">${t('Xe Đẩy Du Mục chỉ đến vào Thứ Sáu và Chủ Nhật.')}</span>`);
  // Queen of Sauce: a new recipe every Sunday, a rerun on Wednesday
  if (dow === 6) {
    const yr = d.year % 2 === 1 ? 1 : 2;
    const tv = tvRecipes.filter(x => x.season === d.season && x.day === d.day && (d.year >= 3 || x.year === yr));
    lines.push(`${ico('cooking')} <span><strong>Queen of Sauce</strong>: ${tv.length
      ? tv.map(x => `<button class="link-btn" type="button" data-action="open-detail" data-type="recipe" data-id="${x.recipe.id}">${nm(x.recipe)}</button>${d.year >= 3 ? ` (${t('năm')} ${x.year})` : ''}`).join(', ')
      : t('không có công thức mới')}. ${t('Bật TV để học công thức.')}</span>`);
  } else if (dow === 2) {
    lines.push(`${ico('cooking')} <span>Queen of Sauce: ${t('phát lại một công thức cũ ngẫu nhiên.')}</span>`);
  }
  // Shops closed today
  const closed = Object.values(PLACES).filter(p => p.kind === 'shop' && p.closed && p.closed.includes(DOW[dow]));
  for (const p of closed) lines.push(`${ico('lock')} <span><strong>${nm(p)}</strong> ${t('đóng cửa')}: <span class="muted">${p.closed}</span></span>`);
  if (festivalToday) lines.push(`${ico('lock')} <span>${t('Ngày lễ hội: phần lớn cửa hàng trong thị trấn đóng cửa cho tới khi lễ hội kết thúc.')}</span>`);
  return card('saloon', 'Thị trấn hôm nay', `<ul class="today-lines">${lines.map(l => `<li>${l}</li>`).join('')}</ul>`);
}

function cropsCard(d) {
  const left = 28 - d.day;   // days of growth possible before the season changes
  const word = SEASON_WORD[d.season];
  // Outdoors only: "all year" seeds (cactus, taro, ancient...) need pots, the island or the greenhouse
  const list = seeds.filter(s => s.days <= left && s.seed.subCategory === 'Hạt Giống' && (s.seed.season || '').split(/,\s*/).includes(word))
    .sort((a, b) => b.days - a.days);
  return card('crops', 'Còn kịp trồng', `
    <p class="muted">${left > 0 ? `${t('Còn')} ${left} ${t('ngày tới cuối mùa. Những hạt giống dưới đây gieo hôm nay sẽ kịp thu hoạch:')}` : t('Hôm nay là ngày cuối mùa: cây trồng ngoài trời sẽ héo vào ngày mai (trừ cây đa mùa).')}</p>
    ${d.season === 'winter' && left > 0 ? `<p class="muted">${t('Mùa Đông chỉ trồng được Hạt giống Mùa Đông và Dưa Tuyết ngoài trời; Nhà Kính trồng được mọi thứ.')}</p>` : ''}
    <div class="today-crops">
      ${list.map(s => {
        const crop = cropByName.get(s.crop);
        return `<button class="today-crop" type="button" data-action="open-detail" data-type="item" data-id="${s.seed.id}" title="${nm(s.seed)}">
          <img src="${crop?.imageUrl || s.seed.imageUrl}" alt="" class="pixel-img">
          <span>${crop ? nm(crop) : s.crop}</span>
          <small>${s.days} ${t('ngày')}${s.price ? ` · ${s.price}g` : ''}</small>
        </button>`;
      }).join('') || `<p class="muted">${t('Không còn loại hạt nào kịp lớn trong mùa này.')}</p>`}
    </div>`);
}

function fishCard(d) {
  const list = fishAvailable({ season: d.season, weather: 'any', hour: null });
  return card('fish', 'Câu cá', `
    <p>${t('Có')} <strong>${list.length}</strong> ${t('loài cá câu được trong mùa này.')}
      <button class="link-btn" type="button" data-action="switch-tab" data-tab="fishing">${t('Xem theo giờ, thời tiết và địa điểm')}</button></p>`);
}

function render() {
  const el = document.getElementById('todayBoard');
  if (!el) return;
  const d = state;
  el.innerHTML = `
    <div class="today-pick">
      <div class="seg">
        ${SEASONS.map(s => `<button class="seg-btn ${s === d.season ? 'is-active' : ''}" type="button" data-action="today-season" data-season="${s}">${ico(s)} ${SEASON_SHORT[s]}</button>`).join('')}
      </div>
      <div class="today-pick__day">
        <button class="btn btn--ghost btn--sm" type="button" data-action="today-step" data-step="-1" aria-label="${t('Ngày trước')}">−</button>
        <label>${t('Ngày')} <input type="number" class="coop-input today-num" min="1" max="28" value="${d.day}" data-action="today-day"></label>
        <button class="btn btn--ghost btn--sm" type="button" data-action="today-step" data-step="1" aria-label="${t('Ngày sau')}">+</button>
        <label>${t('Năm')} <input type="number" class="coop-input today-num" min="1" max="99" value="${d.year}" data-action="today-year"></label>
      </div>
      <button class="btn btn--blue btn--sm" type="button" data-action="today-from-save">${ico('upload')} ${t('Lấy ngày từ file save')}</button>
      <input type="file" id="todaySaveInput" data-action="today-save-file" hidden>
    </div>
    <h3 class="today-date">${ico('calendar')} ${dateLabel(d)}</h3>
    <div class="today-grid">
      ${birthdayCard(d)}
      ${festivalCard(d)}
      ${townCard(d)}
      ${cropsCard(d)}
      ${fishCard(d)}
    </div>`;
}

function setDay(next) {
  state = { ...state, ...next };
  state.day = Math.min(28, Math.max(1, Number(state.day) || 1));
  state.year = Math.max(1, Number(state.year) || 1);
  save(); render();
}

async function fromSave(app, file) {
  try {
    const { parseSave, text } = await import('../lib/farm-save.js');
    const root = parseSave(await file.text());
    const season = text(root, 'currentSeason').toLowerCase();
    setDay({ season: SEASONS.includes(season) ? season : 'spring', day: Number(text(root, 'dayOfMonth')) || 1, year: Number(text(root, 'year')) || 1 });
    app.showToast(`${ico('calendar')} ${t('Đã lấy ngày từ file save')}`);
  } catch (e) {
    app.showToast(`${ico('warn')} ${e.userMessage || t('Không đọc được file save này')}`);
  }
}

export default {
  id: 'today',
  toggles: [],
  render,
  actions: {
    'today-season': (app, el) => setDay({ season: el.dataset.season }),
    'today-step': (app, el) => setDay(shift(state, Number(el.dataset.step))),
    'today-day': (app, el) => setDay({ day: el.value }),
    'today-year': (app, el) => setDay({ year: el.value }),
    'today-from-save': () => document.getElementById('todaySaveInput').click(),
    'today-save-file': (app, el) => { const f = el.files?.[0]; el.value = ''; if (f) fromSave(app, f); }
  }
};
