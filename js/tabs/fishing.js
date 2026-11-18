// ==========================================================================
// TAB: CÂU CÁ (WHAT CAN I CATCH NOW?)
// Filters the fish collection by season, weather, time of day and place.
// Fish already caught can be ticked here (or filled in from a save file)
// and hidden, to see what is left for the Master Angler goal.
// ==========================================================================

import { FISH, FISH_LOCATIONS, FISH_DIFFICULTY, FISH_BEHAVIORS } from '../../data/fish-data.js';
import { ITEMS_DATA } from '../../data/items-data.js';
import { BAITS, TACKLES, GEAR_INTRO } from '../../data/fishing-gear-data.js';
import { ico } from '../lib/icons.js';
import { t, nm, isEn } from '../lib/i18n.js';
import { loadJSON, saveJSON, KEYS } from '../lib/storage.js';
import { matches, modalHeader, wikiLink } from '../lib/templates.js';
import { placeView } from '../lib/place-view.js';
import { closeModal } from '../lib/ui.js';
import { saveTabLink } from './save.js';

const itemByEn = new Map(ITEMS_DATA.map(i => [i.nameEn, i]));
const SEASONS = ['spring', 'summer', 'fall', 'winter'];
const SEASON_SHORT = { spring: 'Xuân', summer: 'Hạ', fall: 'Thu', winter: 'Đông', all: 'Cả năm' };

const ui = { season: 'spring', weather: 'any', hour: null, loc: 'all', legendary: false, hideCaught: false, sort: 'default', view: 'fish', ...loadJSON(KEYS.fishingView, {}) };
let caught = new Set(loadJSON(KEYS.fishCaught, []));

const hourLabel = h => `${String(Math.floor(h) % 24).padStart(2, '0')}:${h % 1 ? '30' : '00'}`;
const inTime = (f, hour) => hour === null || f.time.some(([a, b]) => hour >= a && hour < b);
const inWeather = (f, w) => w === 'any' || f.weather === 'any' || f.weather === w;

// Exported for the Today tab: fish catchable with these conditions
// (season 'all' keeps every season)
export function fishAvailable({ season, weather = 'any', hour = null, loc = 'all' }) {
  return FISH.filter(f => (season === 'all' || f.seasons.includes(season)) && inWeather(f, weather) && inTime(f, hour) && (loc === 'all' || f.loc.includes(loc)));
}

// Called after reading a save file: show the fish of the save's season
export function setFishingSeason(season) {
  if (!SEASONS.includes(season)) return;
  ui.season = season;
  saveJSON(KEYS.fishingView, ui);
}

// Called after reading a save file: replace the caught list
export function setCaughtFish(namesEn) {
  caught = new Set(namesEn);
  saveJSON(KEYS.fishCaught, [...caught]);
}

// Difficulty bands (the site's own grouping of the game's 15-110 scale)
const LEVELS = [[90, 'Rất khó', 'very-hard'], [70, 'Khó', 'hard'], [40, 'Trung bình', 'medium'], [0, 'Dễ', 'easy']];
const levelOf = d => LEVELS.find(([min]) => d >= min);
function difficultyHtml(f) {
  const d = FISH_DIFFICULTY[f.en];
  if (!d) return `<p class="fish-card__row muted">${ico('fishing')} ${t('Bắt bằng Lồng bẫy cua, không có mini-game câu')}</p>`;
  const [score, kind] = d, [, label, cls] = levelOf(score), b = FISH_BEHAVIORS[kind];
  return `
    <p class="fish-card__row fish-diff" title="${t(b.desc)}">${ico('fishing')} ${t('Độ khó')} <strong>${score}</strong>
      <span class="fish-diff__bar fish-diff--${cls}"><span style="width:${Math.min(100, (score / 110) * 100)}%"></span></span>
      <span class="tag fish-diff__tag fish-diff--${cls}">${t(label)}</span> · ${t('Kiểu')}: <strong>${nm(b)}</strong></p>`;
}

// ---------- Bait & tackle ----------
const gearById = new Map([...BAITS, ...TACKLES].map(g => [g.id, g]));
const gearName = g => (isEn ? g.en : g.name);
const RARE = new Set(['Ice Pip', 'Mutant Carp']);   // named by the wiki for the Curiosity Lure (with Legend)

// The site's suggestion for one fish, from its difficulty, behavior and what each item does (wiki)
export function suggestGear(f) {
  const d = FISH_DIFFICULTY[f.en];
  if (!d) return { bait: ['deluxe', 'targeted'], tackle: [], why: 'Lồng bẫy cua: Mồi Cao Cấp cho cá chất lượng bạc; Mồi Chỉ Định tăng cơ hội ra đúng loài này.' };
  const [score, kind] = d;
  if (f.legendary) return { bait: ['deluxe', 'challenge'], tackle: ['curiosity', 'trap'], why: 'Cá huyền thoại: Mồi Tò Mò tăng cơ hội cá hiếm, Phao Hút giữ tiến độ khi cá vùng ra. Mồi Cao Cấp nới rộng thanh câu; tay vững thì Mồi Thử Thách có thể ra tới 3 con.' };
  if (RARE.has(f.en)) return { bait: ['deluxe', 'targeted'], tackle: ['curiosity', 'trap'], why: 'Cá hiếm xuất hiện: Mồi Tò Mò và Mồi Chỉ Định giúp gặp nó, Phao Hút bù cho độ khó cao.' };
  if (score >= 70) return { bait: ['deluxe', 'targeted'], tackle: ['trap', 'cork'], why: 'Cá khó: thanh câu rộng hơn (Mồi Cao Cấp, Phao Nút Chai) và thanh tiến độ tụt chậm hơn (Phao Hút).' };
  if (kind === 'dart') return { bait: ['wild', 'targeted'], tackle: ['trap', 'cork'], why: 'Cá giật cục hay vọt khỏi thanh câu: Phao Hút và Phao Nút Chai bù lại; Lưỡi Câu Có Ngạnh kém hiệu quả với kiểu này.' };
  if (score < 40) return { bait: ['wild', 'targeted'], tackle: ['barbed', 'quality'], why: 'Cá dễ: Lưỡi Câu Có Ngạnh hợp nhất với cá chậm, yếu; Phao Chất Lượng nâng chất lượng cá. Mồi Dân Dã có cơ hội ra 2 con.' };
  if (kind === 'smooth') return { bait: ['wild', 'targeted'], tackle: ['barbed', 'cork'], why: 'Cá di chuyển đều: Lưỡi Câu Có Ngạnh bám theo tốt, Phao Nút Chai cho thanh câu rộng hơn.' };
  return { bait: ['wild', 'targeted'], tackle: ['cork', 'trap'], why: 'Độ khó vừa phải: Phao Nút Chai và Phao Hút giúp câu hoàn hảo dễ hơn.' };
}

const gearIcon = id => { const g = gearById.get(id); return `<button class="fish-gear__item" type="button" data-action="fish-gear-open" data-id="${id}" title="${esc(gearName(g))}"><img src="${g.icon}" alt="${esc(gearName(g))}" class="pixel-img"></button>`; };
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function gearRow(f) {
  const g = suggestGear(f);
  return `<p class="fish-card__row fish-gear" title="${esc(t(g.why))}">${ico('tools')} ${t('Nên dùng')}: ${g.bait.map(gearIcon).join('')}${g.tackle.length ? `<span class="fish-gear__sep"></span>${g.tackle.map(gearIcon).join('')}` : ''}</p>
    <p class="fish-card__note muted fish-gear__why">${t(g.why)}</p>`;
}

function gearCard(g) {
  return `
    <article class="fish-gear-card" id="gear-${g.id}">
      <header><img src="${g.icon}" alt="" class="pixel-img"><div><h3>${gearName(g)}</h3>${isEn ? '' : `<p class="muted">${g.en}</p>`}</div></header>
      <p class="fish-gear-card__desc">"${esc(isEn ? g.descEn : g.desc)}"</p>
      <p>${esc(isEn ? g.noteEn : g.note)}</p>
      <p class="muted">${ico('chest')} ${esc(isEn ? g.getEn : g.get)}</p>
    </article>`;
}

function gearHtml() {
  return `
    <h3 class="journal-sub"><img src="assets/icons/deluxe_bait.png" alt="" class="pixel-img game-icon"> ${t('Mồi câu')}</h3>
    <p class="muted">${esc(isEn ? GEAR_INTRO.baitEn : GEAR_INTRO.bait)}</p>
    <div class="fish-gear-grid">${BAITS.map(gearCard).join('')}</div>
    <h3 class="journal-sub"><img src="assets/icons/cork_bobber.png" alt="" class="pixel-img game-icon"> ${t('Đồ câu (phao, mồi giả, lưỡi câu)')}</h3>
    <p class="muted">${esc(isEn ? GEAR_INTRO.tackleEn : GEAR_INTRO.tackle)}</p>
    <div class="fish-gear-grid">${TACKLES.map(gearCard).join('')}</div>
    <p class="muted">${t('Theo Official Stardew Valley Wiki (trang Bait và Tackle). Gợi ý cho từng loài cá ở danh sách cá là của trang, dựa trên độ khó, kiểu di chuyển và tác dụng của từng món.')}</p>`;
}

const timeText = f => f.time.map(([a, b]) => (a === 6 && b === 26 ? t('Cả ngày') : `${hourLabel(a)} – ${hourLabel(b)}`)).join(', ');
const weatherText = { sun: 'Trời nắng', rain: 'Trời mưa', any: 'Mọi thời tiết' };

// A place name that opens its popup (picture + where it is on the map)
const locLink = l => FISH_LOCATIONS[l].photo
  ? `<button class="link-btn fish-loc-link" type="button" data-action="open-detail" data-type="fishloc" data-id="${l}">${nm(FISH_LOCATIONS[l])}</button>`
  : nm(FISH_LOCATIONS[l]);

function locDetail(id) {
  const l = FISH_LOCATIONS[id];
  if (!l?.photo) return '';
  const here = FISH.filter(f => f.loc.includes(id));
  return `
    ${modalHeader({
      icon: `<div class="icon-box icon-box--lg">${ico('pin')}</div>`,
      title: nm(l),
      sub: `${isEn ? l.name : l.nameEn} • ${here.length} ${t('loài cá')}`,
      extra: wikiLink(l.nameEn, 'Xem bài viết chi tiết trên Official Stardew Valley Wiki', l.wiki)
    })}
    ${placeView(l, nm(l))}
    <h4 class="journal-sub">${ico('fish')} ${t('Cá câu được ở đây')}</h4>
    <div class="fish-place__list">
      ${here.map(f => { const it = itemByEn.get(f.en); return `<span class="tag ${caught.has(f.en) ? 'tag--green' : ''}">${it ? `<img src="${it.imageUrl}" alt="" class="pixel-img">` : ''} ${it ? nm(it) : f.en}</span>`; }).join('')}
    </div>
    <button class="btn btn--blue btn--sm" type="button" data-action="fish-loc-pick" data-loc="${id}">${ico('fishing')} ${t('Lọc theo địa điểm này')}</button>`;
}

function cardHtml(f) {
  const it = itemByEn.get(f.en);
  const done = caught.has(f.en);
  return `
    <article class="fish-card ${done ? 'is-caught' : ''}">
      <button class="fish-card__tick" type="button" data-action="fish-caught" data-fish="${f.en}" aria-pressed="${done}" title="${t('Đánh dấu đã câu được')}">${done ? ico('check') : ''}</button>
      <img src="${it?.imageUrl}" alt="" class="pixel-img fish-card__img">
      <div class="fish-card__body">
        <h3 class="fish-card__name">${it ? nm(it) : f.en}${f.legendary ? ` <span class="tag tag--gold">${t('Huyền thoại')}</span>` : ''}</h3>
        <p class="fish-card__row">${ico('pin')} ${f.loc.map(locLink).join(', ')}</p>
        <p class="fish-card__row">${ico('clock')} ${timeText(f)} · ${f.weather === 'any' ? `${ico('sunny')}${ico('rainy')}` : ico(f.weather === 'rain' ? 'rainy' : 'sunny')} ${t(weatherText[f.weather])}</p>
        <p class="fish-card__row">${ico('season')} ${f.seasons.length === 4 ? t('Quanh năm') : f.seasons.map(s => t(SEASON_SHORT[s])).join(', ')}${it?.sellPrice ? ` · ${ico('money')} ${it.sellPrice}g` : ''}</p>
        ${difficultyHtml(f)}
        ${gearRow(f)}
        ${f.note ? `<p class="fish-card__note muted">${f.note}</p>` : ''}
      </div>
    </article>`;
}

function filtered(app) {
  const q = app.searchQuery;
  let list = fishAvailable(ui);
  if (ui.legendary) list = list.filter(f => f.legendary);
  if (ui.hideCaught) list = list.filter(f => !caught.has(f.en));
  if (q) list = list.filter(f => { const it = itemByEn.get(f.en); return matches(q, it?.name, f.en, f.note, ...f.loc.map(l => FISH_LOCATIONS[l].name)); });
  // Crab pot catches (no difficulty) go last either way
  const score = f => FISH_DIFFICULTY[f.en]?.[0];
  if (ui.sort === 'easy') list = [...list].sort((a, b) => (score(a) ?? 999) - (score(b) ?? 999));
  if (ui.sort === 'hard') list = [...list].sort((a, b) => (score(b) ?? -1) - (score(a) ?? -1));
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
      ${saveTabLink('Nạp từ file save', 'link-btn')}`;
  if (grid) grid.innerHTML = list.map(cardHtml).join('') || `<p class="muted">${t('Không có loài cá nào khớp với bộ lọc.')}</p>`;
}

function render(app) {
  const el = document.getElementById('fishingBoard');
  if (!el) return;
  const views = `<div class="seg fish-views">${[['fish', ico('fish'), 'Danh sách cá'], ['gear', '<img src="assets/icons/cork_bobber.png" alt="" class="game-icon pixel-img" aria-hidden="true">', 'Mồi & đồ câu']].map(([v, i, l]) =>
    `<button class="seg-btn ${ui.view === v ? 'is-active' : ''}" type="button" data-action="fish-view" data-view="${v}">${i} ${t(l)}</button>`).join('')}</div>`;
  if (ui.view === 'gear') { el.innerHTML = views + gearHtml(); return; }
  el.innerHTML = `${views}
    <div class="fish-filters">
      <div class="seg">${[[false, ico('fish'), 'Tất cả cá'], [true, `<img src="${itemByEn.get('Legend')?.imageUrl}" alt="" class="game-icon pixel-img" aria-hidden="true">`, 'Cá huyền thoại']].map(([on, i, l]) =>
        `<button class="seg-btn ${ui.legendary === on ? 'is-active' : ''}" type="button" data-action="fish-legendary" data-on="${on}">${i} ${t(l)}</button>`).join('')}</div>
      <div class="seg">${[...SEASONS, 'all'].map(s => `<button class="seg-btn ${ui.season === s ? 'is-active' : ''}" type="button" data-action="fish-season" data-season="${s}">${ico(s === 'all' ? 'season' : s)} ${t(SEASON_SHORT[s])}</button>`).join('')}</div>
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
      <select class="coop-input fish-loc" data-action="fish-sort" aria-label="${t('Sắp xếp')}">
        ${[['default', 'Thứ tự mặc định'], ['easy', 'Dễ câu trước'], ['hard', 'Khó câu trước']].map(([k, l]) => `<option value="${k}" ${ui.sort === k ? 'selected' : ''}>${t(l)}</option>`).join('')}
      </select>
      <label class="toggle"><input type="checkbox" class="px-check" data-action="fish-hide" ${ui.hideCaught ? 'checked' : ''}> <span>${t('Ẩn cá đã câu được')}</span></label>
    </div>
    <details class="fish-diff-help">
      <summary>${ico('fishing')} ${t('Độ khó và kiểu di chuyển của cá là gì?')}</summary>
      <p>${t('Độ khó (từ 15 đến 110) quyết định cá vùng vẫy mạnh cỡ nào trong mini-game câu cá: số càng cao, cá càng hay đổi hướng và lao nhanh. Độ khó cũng cộng thêm kinh nghiệm Câu Cá: mỗi con được (chất lượng + 1) x 3 + độ khó / 3 điểm.')}</p>
      <p class="muted">${t('Mức Dễ / Trung bình / Khó / Rất khó là cách chia của trang: dưới 40, 40-69, 70-89, từ 90 trở lên.')}</p>
      <ul>${Object.values(FISH_BEHAVIORS).map(b => `<li><strong>${nm(b)}</strong>: ${t(b.desc)}</li>`).join('')}</ul>
      <p class="muted">${t('Theo Official Stardew Valley Wiki (trang Fish và Fishing).')}</p>
    </details>
    <p class="fish-summary" id="fishSummary"></p>
    <div class="fish-grid" id="fishGrid"></div>`;
  renderList(app);
}

const persist = (app) => { saveJSON(KEYS.fishingView, ui); render(app); };

export default {
  id: 'fishing',
  search: true,
  toggles: [],
  render,
  detailType: 'fishloc',
  detail: (app, id) => locDetail(id),
  actions: {
    'fish-season': (app, el) => { ui.season = el.dataset.season; persist(app); },
    // Legendary: open every season, weather, hour and place so all five show
    'fish-legendary': (app, el) => {
      ui.legendary = el.dataset.on === 'true';
      if (ui.legendary) Object.assign(ui, { season: 'all', weather: 'any', hour: null, loc: 'all' });
      persist(app);
    },
    'fish-weather': (app, el) => { ui.weather = el.dataset.weather; persist(app); },
    'fish-anytime': (app, el) => { ui.hour = el.checked ? null : 12; persist(app); },
    'fish-hour': (app, el) => { ui.hour = Number(el.value); saveJSON(KEYS.fishingView, ui); renderList(app); },
    'fish-loc': (app, el) => { ui.loc = el.value; persist(app); },
    'fish-loc-pick': (app, el) => { ui.loc = el.dataset.loc; closeModal(document.getElementById('detailModal')); persist(app); },
    'fish-hide': (app, el) => { ui.hideCaught = el.checked; persist(app); },
    'fish-sort': (app, el) => { ui.sort = el.value; persist(app); },
    'fish-view': (app, el) => { ui.view = el.dataset.view; persist(app); },
    'fish-gear-open': (app, el) => {
      ui.view = 'gear'; persist(app);
      const card = document.getElementById(`gear-${el.dataset.id}`);
      card?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card?.classList.add('is-flash'); setTimeout(() => card?.classList.remove('is-flash'), 1500);
    },
    'fish-caught': (app, el) => {
      const en = el.dataset.fish;
      if (caught.has(en)) caught.delete(en); else { caught.add(en); app.sfx.play('complete'); }
      saveJSON(KEYS.fishCaught, [...caught]);
      renderList(app);
    }
  }
};
