// ==========================================================================
// TAB: ĐẢO GỪNG (GINGER ISLAND)
// A guide to the island: getting there, what Golden Walnuts buy and where all
// 130 are, each area, island crops and fish, and the people. Walnuts found
// come from the save (Journal snapshot) and can also be ticked by hand.
// The data loads the first time the tab opens.
// ==========================================================================

import { FISH, FISH_LOCATIONS } from '../../data/fish-data.js';
import { QUESTS_DATA } from '../../data/quests-data.js';
import { NPCS_DATA } from '../../data/npcs-data.js';
import { ico } from '../lib/icons.js';
import { t, nm, isEn } from '../lib/i18n.js';
import { loadJSON, saveJSON, KEYS } from '../lib/storage.js';
import { matches } from '../lib/templates.js';
import { itemTag } from '../lib/item-lookup.js';
import { saveTabLink } from './save.js';

const SECTIONS = [
  { id: 'start', name: 'Đến đảo', icon: 'portrait:willy' },
  { id: 'walnuts', name: 'Óc Chó Vàng', icon: 'golden_walnut' },
  { id: 'areas', name: 'Khu vực', icon: 'pin' },
  { id: 'farm', name: 'Nông sản & cá', icon: 'crops' },
  { id: 'people', name: 'Nhân vật & nhiệm vụ', icon: 'members' }
];
const ISLAND_LOCS = ['island', 'pirate_cove', 'volcano'];

const ui = { section: 'start', hideFound: false, open: null, ...loadJSON(KEYS.islandView, {}) };
// Walnut keys ticked by hand (all of that spot counts as found)
let ticked = new Set(loadJSON(KEYS.walnuts, []));

const tx = (x, f) => (isEn ? x[`${f}En`] : x[f]) || x[f] || '';
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const bar = (have, total) => `<div class="skill-bar"><span style="width:${Math.min(100, (have / total) * 100)}%"></span></div>`;
const npcById = new Map(NPCS_DATA.map(n => [n.id, n]));

// ---------- Data, loaded on first visit ----------
let data = null, loading = null;
function need(app) {
  if (data) return data;
  loading ||= Promise.all([import('../../data/island-data.js'), import('../../data/island-guide.js')])
    .then(([a, b]) => { data = { ...a, ...b }; render(app); })
    .catch(e => { console.error('[island]', e); loading = null; });
  return null;
}

// ---------- Walnut progress: save snapshot + hand ticks ----------
const journal = () => loadJSON(KEYS.journal, null);
function progress() {
  const d = journal();
  const w = d?.walnuts;
  const fromSave = x => !w ? 0 : x.kind === 'tracker' ? (w.tracker.includes(x.key) ? x.n : 0)
    : x.kind === 'coconut' ? (w.coconut ? 1 : 0) : Math.min(x.n, w.limited[x.key] || 0);
  const got = x => ticked.has(x.key) ? x.n : fromSave(x);
  const total = data.WALNUTS.reduce((a, x) => a + x.n, 0);
  const counted = data.WALNUTS.reduce((a, x) => a + got(x), 0);
  return { d, w, got, total, found: Math.max(counted, w?.found || 0), upgrades: new Set(d?.island?.upgrades || []) };
}

function saveLine(p) {
  return p.d
    ? `<p class="muted">${ico('save')} ${t('Tiến độ lấy từ file save của nông trại')} <strong data-no-i18n>${esc(p.d.farmName || '?')}</strong> ${t('và các ô bạn tự đánh dấu.')} ${saveTabLink('Nạp lại file save', 'link-btn')}</p>`
    : `<p class="muted">${ico('save')} ${t('Bấm ô vuông để đánh dấu quả đã tìm, hoặc nạp file save để tự điền.')} ${saveTabLink('Nạp file save', 'link-btn')}</p>`;
}

// ---------- Sections ----------
function startHtml() {
  return `
    <ol class="island-steps">
      ${data.ISLAND_STEPS.map(s => `
        <li class="island-step">
          <div class="island-step__icon">${ico(s.icon)}</div>
          <div>
            <h3>${esc(tx(s, 'title'))}</h3>
            <p data-no-i18n>${esc(tx(s, 'text'))}</p>
            ${s.items ? `<div class="island-tags">${s.items.map(([en, n]) => itemTag(en, ` <strong>×${n}</strong>`)).join('')}</div>` : ''}
          </div>
        </li>`).join('')}
    </ol>
    <h3 class="journal-sub">${ico('chest')} ${t('Nên mang theo')}</h3>
    <ul class="island-pack">
      ${data.ISLAND_PACK.map(p => `<li>${itemTag(p.item)} <span class="muted" data-no-i18n>${esc(tx(p, 'note'))}</span></li>`).join('')}
    </ul>`;
}

function walnutsHtml() {
  const p = progress();
  const left = data.ISLAND_UPGRADES.filter(u => !p.upgrades.has(u.flag));
  const cost = data.ISLAND_UPGRADES.reduce((a, u) => a + u.cost, 0);
  const q = ui.search;
  return `
    <div class="perfection-total">
      <strong>${p.found}/${p.total}</strong> ${ico('golden_walnut')}
      ${bar(p.found, p.total)}
    </div>
    ${saveLine(p)}
    <h3 class="journal-sub">${ico('golden_walnut')} ${t('Óc Chó Vàng dùng để làm gì?')}</h3>
    <ul class="island-uses">
      <li>${ico('ginger')} <span>${t(`Đổi cho các con vẹt để mở 11 nâng cấp trên đảo, tổng cộng ${cost} quả (xem bảng dưới).`)}</span></li>
      ${data.WALNUT_USES.map(u => `<li>${ico(u.icon)} <span data-no-i18n>${esc(tx(u, 'text'))}</span></li>`).join('')}
    </ul>
    <h3 class="journal-sub">${ico('ginger')} ${t('Nâng cấp trên đảo')}${p.d ? `: ${data.ISLAND_UPGRADES.length - left.length}/${data.ISLAND_UPGRADES.length}` : ''}</h3>
    <div class="goal-list">
      ${data.ISLAND_UPGRADES.map(u => {
        const done = p.upgrades.has(u.flag);
        return `
        <div class="goal-row ${done ? 'is-done' : ''}">
          <div class="goal-row__body">
            <div class="goal-row__head"><strong>${nm(u)}</strong> <span>${done ? `${ico('check')} ${t('Đã mua')}` : `${u.cost} ${ico('golden_walnut')}`}</span></div>
            <p class="goal-row__reward" data-no-i18n>${esc(tx(u, 'desc'))}</p>
          </div>
        </div>`;
      }).join('')}
    </div>
    <h3 class="journal-sub">${ico('pin')} ${t('Tìm 130 quả ở đâu?')}</h3>
    <div class="island-walnut-tools">
      <label class="toggle"><input type="checkbox" class="px-check" data-action="island-hide" ${ui.hideFound ? 'checked' : ''}> <span>${t('Ẩn quả đã tìm')}</span></label>
    </div>
    ${data.WALNUT_AREAS.map(area => {
      const all = data.WALNUTS.filter(x => x.area === area.id);
      const list = all.filter(x => (!ui.hideFound || p.got(x) < x.n) && (!q || matches(q, x.name, x.nameEn, x.hint, x.hintEn)));
      if (!list.length) return '';
      const have = all.reduce((a, x) => a + p.got(x), 0), n = all.reduce((a, x) => a + x.n, 0);
      return `
        <details class="walnut-area" id="walnuts-${area.id}" ${q || ui.open === area.id ? 'open' : ''}>
          <summary><strong>${nm(area)}</strong> <span class="muted">${have}/${n}</span></summary>
          <ul class="walnut-list island-walnuts">
            ${list.map(x => {
              const g = p.got(x), done = g >= x.n;
              return `<li class="${done ? 'is-done' : ''}">
                <button class="fish-card__tick" type="button" data-action="island-tick" data-key="${x.key}" aria-pressed="${done}" title="${t('Đánh dấu đã tìm')}">${done ? ico('check') : ''}</button>
                <div><strong>${nm(x)}</strong> <span class="muted">${x.n > 1 ? `${g}/${x.n} ${t('quả')}` : `1 ${t('quả')}`}</span>
                ${tx(x, 'hint') ? `<p class="muted" data-no-i18n>${esc(tx(x, 'hint'))}</p>` : ''}</div></li>`;
            }).join('')}
          </ul>
        </details>`;
    }).join('') || `<p class="muted">${t('Không có quả nào khớp.')}</p>`}
    <p class="muted">${t('Nguồn: cách đếm theo stardew-checkup (MouseyPounds), gợi ý theo Official Stardew Valley Wiki.')}</p>`;
}

function areasHtml() {
  const p = progress();
  return `
    <figure class="island-map">
      <img src="assets/maps/ginger_island.png" alt="${t('Bản đồ Đảo Gừng')}" class="pixel-img" loading="lazy">
      <p><button class="link-btn" type="button" data-action="switch-tab" data-tab="map">${t('Mở trong tab Bản Đồ')}</button></p>
    </figure>
    <div class="island-areas">
      ${data.ISLAND_AREAS.map(a => {
        const list = data.WALNUTS.filter(x => a.walnuts.includes(x.area));
        const have = list.reduce((s, x) => s + p.got(x), 0), n = list.reduce((s, x) => s + x.n, 0);
        return `
        <article class="island-area">
          <h3>${ico(a.icon)} ${nm(a)}</h3>
          <p data-no-i18n>${esc(tx(a, 'text'))}</p>
          <div class="island-tags">${(isEn ? a.sightsEn : a.sights).map(s => `<span class="tag" data-no-i18n>${esc(s)}</span>`).join('')}</div>
          <div class="island-area__foot">
            <button class="btn btn--ghost btn--sm" type="button" data-action="island-area-walnuts" data-area="${a.walnuts[0]}">${ico('golden_walnut')} ${have}/${n} ${t('Óc Chó ở đây')}</button>
            ${a.mines ? `<button class="btn btn--blue btn--sm" type="button" data-action="map-go" data-tab="mines" data-filter="volcano">${ico('mines')} ${t('Chi tiết từng tầng ở tab Hầm Mỏ')}</button>` : ''}
          </div>
        </article>`;
      }).join('')}
    </div>`;
}

function farmHtml() {
  const fish = FISH.filter(f => f.loc.some(l => ISLAND_LOCS.includes(l)));
  return `
    <p class="callout callout--tip">${ico('crops')} ${t('Nông Trại Đảo ở Tây Đảo Gừng trồng được mọi loại cây quanh năm, không cần theo mùa.')}</p>
    <h3 class="journal-sub">${ico('seeds')} ${t('Cây trồng của đảo')}</h3>
    <div class="goal-list">
      ${data.ISLAND_CROPS.map(c => `
        <div class="goal-row">
          <div class="goal-row__body">
            <div class="goal-row__head">${itemTag(c.item)}${c.grows ? ` <span>→ ${itemTag(c.grows)}</span>` : ''}</div>
            <p class="goal-row__reward" data-no-i18n>${esc(tx(c, 'from'))}${tx(c, 'note') ? ` · ${esc(tx(c, 'note'))}` : ''}</p>
          </div>
        </div>`).join('')}
    </div>
    <h3 class="journal-sub">${ico('x_golden_coconut')} ${t('Dừa Vàng')}</h3>
    <p>${t('Rung cây dừa trên đảo thỉnh thoảng rơi Dừa Vàng. Mang tới Clint ở Lò Rèn để mở; quả đầu tiên luôn có 1 Óc Chó Vàng. Bên trong có thể là:')}</p>
    <div class="island-tags">${data.COCONUT_ITEMS.map(en => itemTag(en)).join('')}</div>
    <h3 class="journal-sub">${ico('fish')} ${t('Cá câu được trên đảo')}</h3>
    <div class="island-tags">${fish.map(f => itemTag(f.en, ` <span class="muted">· ${f.loc.filter(l => ISLAND_LOCS.includes(l)).map(l => nm(FISH_LOCATIONS[l])).join(', ')}</span>`)).join('')}</div>
    <p class="muted">${t('Câu cá ở bất kỳ đâu trên đảo còn có thể ra Óc Chó Vàng (tối đa 5 quả).')}
      <button class="link-btn" type="button" data-action="switch-tab" data-tab="fishing">${t('Xem giờ và mùa ở tab Câu Cá')}</button></p>
    <h3 class="journal-sub">${ico('cooking')} ${t('Món ăn từ nông sản đảo')}</h3>
    <div class="island-tags">${data.ISLAND_DISHES.map(en => itemTag(en)).join('')}</div>`;
}

function peopleHtml() {
  const quests = QUESTS_DATA.filter(q => q.category === 'ginger_island');
  return `
    <div class="island-people">
      ${data.ISLAND_PEOPLE.map(p => {
        const npc = npcById.get(p.npc);
        return `
        <article class="island-person">
          <img src="assets/portraits/${p.npc}.png" alt="" class="pixel-img island-person__face" loading="lazy" data-fallback="hide">
          <div>
            <h3>${npc ? `<button class="link-btn" type="button" data-action="open-detail" data-type="npc" data-id="${p.npc}">${nm(p)}</button>` : nm(p)}</h3>
            <p data-no-i18n>${esc(tx(p, 'text'))}</p>
          </div>
        </article>`;
      }).join('')}
    </div>
    <h3 class="journal-sub">${ico('quests')} ${t('Nhiệm vụ trên đảo')}</h3>
    <div class="island-tags">
      ${quests.map(q => `<button class="item-tag item-tag--link" type="button" data-action="open-detail" data-type="quest" data-id="${q.id}">${ico('ginger')} <span>${nm(q)}</span></button>`).join('')}
    </div>
    <h3 class="journal-sub">${ico('qi_gem')} ${t('Đơn hàng của Ông Qi')}</h3>
    <p class="muted">${t('Bảng đơn hàng trong Phòng Óc Chó, trả thưởng bằng Ngọc Qi.')}
      <button class="link-btn" type="button" data-action="switch-tab" data-tab="journal">${t('Xem đơn đang nhận ở tab Sổ Tay')}</button></p>
    <div class="goal-list" id="islandQiOrders">${qiOrdersHtml()}</div>`;
}

// Qi's board comes from the special-orders data (also used by the Journal)
let orders = null;
function qiOrdersHtml() {
  if (!orders) {
    import('../../data/special-orders-data.js').then(m => {
      orders = m.SPECIAL_ORDERS.filter(o => o.board === 'qi');
      const el = document.getElementById('islandQiOrders');
      if (el) el.innerHTML = qiOrdersHtml();
    }).catch(e => console.error('[island] orders', e));
    return `<p class="muted">${ico('hourglass')} ${t('Đang tải...')}</p>`;
  }
  return orders.map(o => `
    <div class="goal-row">
      <div class="goal-row__body">
        <div class="goal-row__head"><strong>${nm(o)}</strong> <span>${ico('qi_gem')} <span data-no-i18n>${esc(tx(o, 'reward'))}</span></span></div>
        <p class="goal-row__reward" data-no-i18n>${esc(tx(o, 'task'))}</p>
      </div>
    </div>`).join('');
}

const RENDER = { start: startHtml, walnuts: walnutsHtml, areas: areasHtml, farm: farmHtml, people: peopleHtml };

function render(app) {
  const el = document.getElementById('islandBoard');
  if (!el) return;
  if (!need(app)) { el.innerHTML = `<p class="muted">${ico('hourglass')} ${t('Đang tải...')}</p>`; return; }
  // The search bar looks through the walnut spots
  ui.search = app.searchQuery;
  if (ui.search && ui.section !== 'walnuts') ui.section = 'walnuts';
  el.innerHTML = `
    <div class="journal-tabs">
      ${SECTIONS.map(s => `<button class="chip ${ui.section === s.id ? 'is-active' : ''}" type="button" data-action="island-section" data-section="${s.id}">${ico(s.icon)} ${t(s.name)}</button>`).join('')}
    </div>
    <div class="island-body">${(RENDER[ui.section] || startHtml)()}</div>`;
}

const persist = () => saveJSON(KEYS.islandView, { section: ui.section, hideFound: ui.hideFound });

export default {
  id: 'island',
  search: true,
  toggles: [],
  render,
  actions: {
    'island-section': (app, el) => { ui.section = el.dataset.section; ui.open = null; persist(); render(app); },
    'island-hide': (app, el) => { ui.hideFound = el.checked; persist(); render(app); },
    'island-area-walnuts': (app, el) => {
      ui.section = 'walnuts'; ui.open = el.dataset.area; persist(); render(app);
      document.getElementById(`walnuts-${el.dataset.area}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    'island-tick': (app, el) => {
      const key = el.dataset.key;
      if (ticked.has(key)) ticked.delete(key); else { ticked.add(key); app.sfx.play('complete'); }
      saveJSON(KEYS.walnuts, [...ticked]);
      ui.open = data.WALNUTS.find(x => x.key === key)?.area || ui.open;
      render(app);
    }
  }
};
