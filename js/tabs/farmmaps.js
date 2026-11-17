// ==========================================================================
// TAB: CÁC LOẠI NÔNG TRẠI (FARM MAPS)
// The eight farm maps a new game can start on, translated from the Official
// Stardew Valley Wiki "Farm Maps" page, with the wiki's own pictures. A skill
// filter helps pick the map that fits a play style; a chart compares how much
// land each map has. The data loads the first time the tab opens.
// ==========================================================================

import { ico } from '../lib/icons.js';
import { t, nm, isEn } from '../lib/i18n.js';
import { loadJSON, saveJSON, KEYS } from '../lib/storage.js';

const DIR = 'assets/farm-maps/';
const ui = { skill: 'all', ...loadJSON(KEYS.farmMapsView, {}) };
const tx = (x, f) => (isEn ? x[`${f}En`] : x[f]) || x[f] || '';
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const num = n => n.toLocaleString(isEn ? 'en-US' : 'vi-VN');

let data = null, loading = null;
function need() {
  if (data) return data;
  loading ||= import('../../data/farm-maps-data.js').then(m => { data = m; render(); })
    .catch(e => { console.error('[farmmaps]', e); loading = null; });
  return null;
}

const skillTag = (id, cls = '') => {
  const s = data.SKILLS[id];
  return `<span class="tag farmmap-skill ${cls}"><img src="${s.icon}" alt="" class="pixel-img" loading="lazy" data-fallback="hide"> ${nm(s)}</span>`;
};

function card(m) {
  const big = `${DIR}${m.image}`;
  return `
    <article class="farmmap-card" id="farmmap-${m.id}">
      <header class="farmmap-card__head">
        <img src="${DIR}${m.icon}" alt="" class="pixel-img farmmap-card__icon" loading="lazy">
        <div>
          <h3>${nm(m)}</h3>
          <p class="muted">${isEn ? '' : `${esc(m.nameEn)} · `}${t('Từ bản')} ${m.since}</p>
        </div>
      </header>
      <a class="farmmap-card__map" href="${big}" target="_blank" rel="noopener" title="${t('Mở ảnh lớn')}">
        <img src="${big}" alt="${esc(nm(m))}" class="pixel-img" loading="lazy">
      </a>
      <div class="farmmap-card__skills">${m.skills.map(s => skillTag(s)).join('')}${m.hard ? `<span class="tag tag--red">${t('Không hợp người mới')}</span>` : ''}</div>
      <p class="farmmap-card__summary"><strong data-no-i18n>${esc(tx(m, 'summary'))}</strong></p>
      <p class="farmmap-card__tiles">${ico('crops')} ${t('Ô cuốc được')}: <strong>${num(m.tillable)}</strong> · ${ico('house')} ${t('Ô chỉ xây được')}: <strong>${num(m.buildable)}</strong></p>
      <ul class="farmmap-card__points" data-no-i18n>${(isEn ? m.pointsEn : m.points).map(p => `<li>${esc(p)}</li>`).join('')}</ul>
      ${m.quarry ? `<button class="link-btn" type="button" data-action="farmmaps-quarry">${t('Xem tỉ lệ sinh của mỏ đá')}</button>` : ''}
    </article>`;
}

// Land on each map: tillable and buildable-only tiles, as bars against the biggest total
function compareHtml() {
  const max = Math.max(...data.FARM_MAPS.map(m => m.tillable + m.buildable));
  return `
    <div class="farmmap-compare">
      ${data.FARM_MAPS.map(m => `
        <button class="farmmap-compare__row" type="button" data-action="farmmaps-jump" data-id="${m.id}">
          <span class="farmmap-compare__name"><img src="${DIR}${m.icon}" alt="" class="pixel-img"> ${nm(m)}</span>
          <span class="farmmap-compare__bar">
            <span class="is-till" style="width:${(m.tillable / max) * 100}%" title="${t('Ô cuốc được')}: ${num(m.tillable)}"></span><span class="is-build" style="width:${(m.buildable / max) * 100}%" title="${t('Ô chỉ xây được')}: ${num(m.buildable)}"></span>
          </span>
          <span class="farmmap-compare__num">${num(m.tillable)} + ${num(m.buildable)}</span>
        </button>`).join('')}
      <p class="muted farmmap-compare__legend"><span class="farmmap-swatch is-till"></span> ${t('Ô cuốc được (trồng trọt)')} <span class="farmmap-swatch is-build"></span> ${t('Ô không cuốc được nhưng xây được')}</p>
    </div>`;
}

function quarryHtml() {
  const head = isEn ? data.QUARRY_HEAD_EN : data.QUARRY_HEAD;
  return `
    <details class="farmmap-quarry" id="farmmapQuarry" ${ui.quarry ? 'open' : ''}>
      <summary>${ico('item_copper_pickaxe')} ${t('Tỉ lệ sinh của mỏ đá (Đồi Cao và Bốn Góc), theo cấp Khai Khoáng')}</summary>
      <div class="predict-table-wrap"><table class="predict-table">
        <thead><tr><th>${t('Cấp')}</th>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead>
        <tbody>${data.QUARRY_RATES.map(([lv, ...r]) => `<tr><td>${lv}</td>${r.map(v => `<td>${v ? `${num(v)}%` : '0%'}</td>`).join('')}</tr>`).join('')}</tbody>
      </table></div>
    </details>`;
}

function render() {
  const el = document.getElementById('farmMapsBoard');
  if (!el) return;
  if (!need()) { el.innerHTML = `<p class="muted">${ico('hourglass')} ${t('Đang tải...')}</p>`; return; }
  const list = ui.skill === 'all' ? data.FARM_MAPS : data.FARM_MAPS.filter(m => m.skills.includes(ui.skill));
  const chip = (id, label, icon) => `<button class="chip ${ui.skill === id ? 'is-active' : ''}" type="button" data-action="farmmaps-skill" data-skill="${id}">${icon ? `<img src="${icon}" alt="" class="pixel-img game-icon">` : ''} ${label}</button>`;
  el.innerHTML = `
    <div class="farmmap-intro">
      <figure class="farmmap-intro__fig">
        <img src="${DIR}farm_map_selection.png" alt="${t('Màn hình chọn loại nông trại khi tạo nhân vật')}" class="pixel-img" loading="lazy">
        <figcaption class="muted">${t('Chọn loại nông trại ở khung bên phải khi tạo nhân vật.')}</figcaption>
      </figure>
      <div>
        <p data-no-i18n>${esc(tx(data.FARM_MAPS_INTRO, 'text'))}</p>
        <ul>${(isEn ? data.FARM_MAPS_INTRO.notesEn : data.FARM_MAPS_INTRO.notes).map(n => `<li data-no-i18n>${esc(n)}</li>`).join('')}</ul>
      </div>
    </div>

    <h3 class="journal-sub">${ico('scale')} ${t('So sánh diện tích đất')}</h3>
    ${compareHtml()}

    <h3 class="journal-sub">${ico('farm')} ${t('Chọn theo lối chơi')}</h3>
    <div class="journal-tabs">
      ${chip('all', t('Tất cả'))}
      ${Object.entries(data.SKILLS).map(([id, s]) => chip(id, nm(s), s.icon)).join('')}
    </div>
    <div class="farmmap-grid">${list.map(card).join('')}</div>
    ${quarryHtml()}
    <p class="muted farmmap-credit">${t('Nội dung dịch và hình ảnh từ')} <a href="https://stardewvalleywiki.com/Farm_Maps" target="_blank" rel="noopener">Official Stardew Valley Wiki: Farm Maps</a> (CC BY-NC-SA 3.0).</p>`;
}

const persist = () => saveJSON(KEYS.farmMapsView, { skill: ui.skill });

export default {
  id: 'farmmaps',
  toggles: [],
  render,
  actions: {
    'farmmaps-skill': (app, el) => { ui.skill = el.dataset.skill; persist(); render(); app.sfx.play('click'); },
    'farmmaps-jump': (app, el) => {
      if (ui.skill !== 'all') { ui.skill = 'all'; persist(); render(); }
      document.getElementById(`farmmap-${el.dataset.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    'farmmaps-quarry': () => {
      ui.quarry = true;
      const d = document.getElementById('farmmapQuarry');
      if (d) { d.open = true; d.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    }
  }
};
