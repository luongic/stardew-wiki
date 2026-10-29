// ==========================================================================
// TAB: CÂU CÁ (WHAT CAN I CATCH NOW?)
// Filters the fish collection by season, weather, time of day and place.
// Fish already caught can be ticked here (or filled in from a save file)
// and hidden, to see what is left for the Master Angler goal.
// ==========================================================================

import { FISH, FISH_LOCATIONS } from '../../data/fish-data.js';
import { ITEMS_DATA } from '../../data/items-data.js';
import { ico } from '../lib/icons.js';
import { t, nm } from '../lib/i18n.js';
import { loadJSON, saveJSON, KEYS } from '../lib/storage.js';
import { matches } from '../lib/templates.js';

const itemByEn = new Map(ITEMS_DATA.map(i => [i.nameEn, i]));
const SEASONS = ['spring', 'summer', 'fall', 'winter'];
const SEASON_SHORT = { spring: 'Xuân', summer: 'Hạ', fall: 'Thu', winter: 'Đông' };

const ui = { season: 'spring', weather: 'any', hour: null, loc: 'all', hideCaught: false, ...loadJSON(KEYS.fishingView, {}) };
let caught = new Set(loadJSON(KEYS.fishCaught, []));

const hourLabel = h => `${String(Math.floor(h) % 24).padStart(2, '0')}:${h % 1 ? '30' : '00'}`;
const inTime = (f, hour) => hour === null || f.time.some(([a, b]) => hour >= a && hour < b);
const inWeather = (f, w) => w === 'any' || f.weather === 'any' || f.weather === w;

// Exported for the Today tab: fish catchable with these conditions
export function fishAvailable({ season, weather = 'any', hour = null, loc = 'all' }) {
  return FISH.filter(f => f.seasons.includes(season) && inWeather(f, weather) && inTime(f, hour) && (loc === 'all' || f.loc.includes(loc)));
}

// Called after reading a save file: replace the caught list
export function setCaughtFish(namesEn) {
  caught = new Set(namesEn);
  saveJSON(KEYS.fishCaught, [...caught]);
}

const timeText = f => f.time.map(([a, b]) => (a === 6 && b === 26 ? t('Cả ngày') : `${hourLabel(a)} – ${hourLabel(b)}`)).join(', ');
const weatherText = { sun: 'Trời nắng', rain: 'Trời mưa', any: 'Mọi thời tiết' };

function cardHtml(f) {
  const it = itemByEn.get(f.en);
  const done = caught.has(f.en);
  return `
    <article class="fish-card ${done ? 'is-caught' : ''}">
      <button class="fish-card__tick" type="button" data-action="fish-caught" data-fish="${f.en}" aria-pressed="${done}" title="${t('Đánh dấu đã câu được')}">${done ? ico('check') : ''}</button>
      <img src="${it?.imageUrl}" alt="" class="pixel-img fish-card__img">
      <div class="fish-card__body">
        <h3 class="fish-card__name">${it ? nm(it) : f.en}${f.legendary ? ` <span class="tag tag--gold">${t('Huyền thoại')}</span>` : ''}</h3>
        <p class="fish-card__row">${ico('pin')} ${f.loc.map(l => nm(FISH_LOCATIONS[l])).join(', ')}</p>
        <p class="fish-card__row">${ico('clock')} ${timeText(f)} · ${f.weather === 'any' ? `${ico('sunny')}${ico('rainy')}` : ico(f.weather === 'rain' ? 'rainy' : 'sunny')} ${t(weatherText[f.weather])}</p>
        <p class="fish-card__row">${ico('season')} ${f.seasons.length === 4 ? t('Quanh năm') : f.seasons.map(s => t(SEASON_SHORT[s])).join(', ')}${it?.sellPrice ? ` · ${ico('money')} ${it.sellPrice}g` : ''}</p>
        ${f.note ? `<p class="fish-card__note muted">${f.note}</p>` : ''}
      </div>
    </article>`;
}

function filtered(app) {
  const q = app.searchQuery;
  let list = fishAvailable(ui);
  if (ui.hideCaught) list = list.filter(f => !caught.has(f.en));
  if (q) list = list.filter(f => { const it = itemByEn.get(f.en); return matches(q, it?.name, f.en, f.note, ...f.loc.map(l => FISH_LOCATIONS[l].name)); });
  return list;
}

// The list alone, so dragging the time slider doesn't rebuild the slider
function renderList(app) {
  const list = filtered(app);
  const sum = document.getElementById('fishSummary');
  const grid = document.getElementById('fishGrid');
  const hour = document.getElementById('fishHourLabel');
  if (hour) hour.textContent = ui.hour === null ? '' : hourLabel(ui.hour);
  if (sum) sum.innerHTML = `${ico('fish')} <strong>${list.length}</strong> ${t('loài khớp bộ lọc')} · ${t('Đã câu')} <strong>${caught.size} / ${FISH.length}</strong>
      <button class="link-btn" type="button" data-action="switch-tab" data-tab="tracker">${t('Nạp từ file save')}</button>`;
  if (grid) grid.innerHTML = list.map(cardHtml).join('') || `<p class="muted">${t('Không có loài cá nào khớp với bộ lọc.')}</p>`;
}

function render(app) {
  const el = document.getElementById('fishingBoard');
  if (!el) return;
  el.innerHTML = `
    <div class="fish-filters">
      <div class="seg">${SEASONS.map(s => `<button class="seg-btn ${ui.season === s ? 'is-active' : ''}" type="button" data-action="fish-season" data-season="${s}">${ico(s)} ${t(SEASON_SHORT[s])}</button>`).join('')}</div>
      <div class="seg">${[['any', 'storm', 'Mọi thời tiết'], ['sun', 'sunny', 'Trời nắng'], ['rain', 'rainy', 'Trời mưa']].map(([w, i, l]) =>
        `<button class="seg-btn ${ui.weather === w ? 'is-active' : ''}" type="button" data-action="fish-weather" data-weather="${w}">${ico(i)} ${t(l)}</button>`).join('')}</div>
      <label class="fish-time">
        <input type="checkbox" class="px-check" data-action="fish-anytime" ${ui.hour === null ? 'checked' : ''}> <span>${t('Cả ngày')}</span>
        <input type="range" class="px-range" min="6" max="25.5" step="0.5" value="${ui.hour ?? 12}" data-action="fish-hour" ${ui.hour === null ? 'disabled' : ''} aria-label="${t('Giờ trong ngày')}">
        <strong id="fishHourLabel"></strong>
      </label>
      <select class="coop-input fish-loc" data-action="fish-loc" aria-label="${t('Địa điểm')}">
        <option value="all">${t('Mọi địa điểm')}</option>
        ${Object.entries(FISH_LOCATIONS).map(([k, l]) => `<option value="${k}" ${ui.loc === k ? 'selected' : ''}>${nm(l)}</option>`).join('')}
      </select>
      <label class="toggle"><input type="checkbox" class="px-check" data-action="fish-hide" ${ui.hideCaught ? 'checked' : ''}> <span>${t('Ẩn cá đã câu được')}</span></label>
    </div>
    <p class="fish-summary" id="fishSummary"></p>
    <div class="fish-grid" id="fishGrid"></div>`;
  renderList(app);
}

const persist = (app) => { saveJSON(KEYS.fishingView, ui); render(app); };

export default {
  id: 'fishing',
  toggles: [],
  render,
  actions: {
    'fish-season': (app, el) => { ui.season = el.dataset.season; persist(app); },
    'fish-weather': (app, el) => { ui.weather = el.dataset.weather; persist(app); },
    'fish-anytime': (app, el) => { ui.hour = el.checked ? null : 12; persist(app); },
    'fish-hour': (app, el) => { ui.hour = Number(el.value); saveJSON(KEYS.fishingView, ui); renderList(app); },
    'fish-loc': (app, el) => { ui.loc = el.value; persist(app); },
    'fish-hide': (app, el) => { ui.hideCaught = el.checked; persist(app); },
    'fish-caught': (app, el) => {
      const en = el.dataset.fish;
      if (caught.has(en)) caught.delete(en); else { caught.add(en); app.sfx.play('complete'); }
      saveJSON(KEYS.fishCaught, [...caught]);
      renderList(app);
    }
  }
};
