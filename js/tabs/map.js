// ==========================================================================
// TAB: BẢN ĐỒ (MAP)
// The game's own map art, scaled by whole numbers only so every map pixel
// stays a crisp square. Drag to pan, wheel / buttons / pinch to zoom.
// Hotspots and villager portraits live in an overlay positioned from map
// coordinates, so they keep their size at any zoom level.
// ==========================================================================

import { altName } from '../lib/i18n.js';
import { MAPS, LOCATION_RULES } from '../../data/map-data.js';
import { PLACES } from '../../data/places-data.js';
import { NPCS_DATA } from '../../data/npcs-data.js';
import { getNpcLocation, simSnapshot, setSimHour, formatSimHour } from './npcs.js';
import { ico } from '../lib/icons.js';

const mapById = new Map(MAPS.map(m => [m.id, m]));
const npcById = new Map(NPCS_DATA.map(n => [n.id, n]));
const KIND_LABELS = { shop: 'Cửa hàng', home: 'Nhà dân', landmark: 'Địa danh', area: 'Khu vực' };
const MAX_ZOOM_STEPS = 6;

// Home of each villager: from the places data, else from their residence text
const homeOf = new Map();
for (const [id, p] of Object.entries(PLACES)) for (const r of p.residents || []) if (!homeOf.has(r)) homeOf.set(r, id);
for (const n of NPCS_DATA) if (!homeOf.has(n.id)) homeOf.set(n.id, matchPlace(n.residence));

function matchPlace(text) {
  for (const [re, id] of LOCATION_RULES) if (id !== 'home' && re.test(text || '')) return id;
  return null;
}

function placeFor(npc, loc) {
  const text = `${loc.locationShort || ''} ${loc.location || ''}`;
  for (const [re, id] of LOCATION_RULES) {
    if (re.test(text)) return { id: id === 'home' ? homeOf.get(npc.id) : id, approx: id === 'home' };
  }
  return { id: homeOf.get(npc.id), approx: true };
}

// Map-only spots (e.g. the Secret Woods statue) carry their own name/desc
const place = (id, spot) => PLACES[id] || spot || { name: id, kind: 'landmark' };
const spotById = id => view.map.spots.find(s => s.id === id);

// ==========================================
// VIEW STATE
// ==========================================
const view = {
  map: MAPS[0],
  zoom: 1,       // current scale of the map image
  levels: [1],   // allowed scales: whole numbers, plus a "fit" level for maps larger than the viewport
  level: 0,
  x: 0,          // translation of the map's top-left corner, in screen px
  y: 0,
  selected: null,
  showNpcs: true
};

function viewport() { return document.getElementById('mapViewport'); }

function zoomLevels() {
  const vp = viewport();
  const fit = Math.min(vp.clientWidth / view.map.w, (window.innerHeight * 0.72) / view.map.h);
  if (fit >= 1) {
    const base = Math.floor(vp.clientWidth / view.map.w) || 1;
    return Array.from({ length: MAX_ZOOM_STEPS }, (_, i) => base + i);
  }
  // Larger than the viewport: start fitted, then native and whole multiples
  return [fit, 1, 2, 3];
}

function clampPan() {
  const vp = viewport();
  const w = view.map.w * view.zoom;
  const h = view.map.h * view.zoom;
  // Centre the map when it is smaller than the viewport, else keep it covering
  view.x = w <= vp.clientWidth ? (vp.clientWidth - w) / 2 : Math.min(0, Math.max(vp.clientWidth - w, view.x));
  view.y = h <= vp.clientHeight ? (vp.clientHeight - h) / 2 : Math.min(0, Math.max(vp.clientHeight - h, view.y));
}

function resetView() {
  view.levels = zoomLevels();
  view.level = 0;
  view.zoom = view.levels[0];
  view.x = 0;
  view.y = 0;
  const vp = viewport();
  // At least ~60% of the screen tall on narrow phones, so there is room to zoom in and pan
  const natural = view.map.h * view.zoom + 2;
  const height = Math.round(Math.min(window.innerHeight * 0.72, Math.max(natural, Math.min(window.innerHeight * 0.6, 480))));
  vp.style.height = `${height}px`;
  // Open at the smallest level that fills the viewport's height, so phones
  // don't start on a thin strip of map between empty bands
  const fill = view.levels.findIndex(z => view.map.h * z >= height * 0.9);
  view.level = fill === -1 ? view.levels.length - 1 : fill;
  view.zoom = view.levels[view.level];
  // Centre on the middle of the map
  view.x = (vp.clientWidth - view.map.w * view.zoom) / 2;
  view.y = (height - view.map.h * view.zoom) / 2;
  clampPan();
}

// Step through the zoom levels, keeping the map point under (cx, cy) in place
function zoomTo(level, cx, cy) {
  const lvl = Math.max(0, Math.min(view.levels.length - 1, level));
  if (lvl === view.level) return;
  view.level = lvl;
  const next = view.levels[lvl];
  const vp = viewport();
  cx ??= vp.clientWidth / 2;
  cy ??= vp.clientHeight / 2;
  const mx = (cx - view.x) / view.zoom;
  const my = (cy - view.y) / view.zoom;
  view.zoom = next;
  view.x = cx - mx * next;
  view.y = cy - my * next;
  clampPan();
  paint();
}

// ==========================================
// RENDERING
// ==========================================
function paint() {
  const img = document.getElementById('mapImg');
  img.style.transform = `translate(${view.x}px, ${view.y}px) scale(${view.zoom})`;
  const at = (x, y) => `left: ${view.x + x * view.zoom}px; top: ${view.y + y * view.zoom}px`;

  document.getElementById('mapSpots').innerHTML = view.map.spots.map(s => {
    const p = place(s.id, s);
    return `
      <button class="map-spot map-spot--${p.kind || 'landmark'} ${view.selected === s.id ? 'is-selected' : ''}" type="button"
              data-action="map-spot" data-id="${s.id}" style="${at(s.x, s.y)}" title="${p.name}">
        <span class="map-spot__pin"></span>
        <span class="map-spot__label">${p.name}</span>
      </button>`;
  }).join('');

  document.getElementById('mapNpcs').innerHTML = view.showNpcs ? npcLayer(at) : '';
  document.getElementById('mapZoomLabel').textContent = view.zoom < 1 ? 'Vừa' : `x${view.zoom}`;
}

function npcsByPlace() {
  const ctx = simSnapshot();
  const groups = new Map();
  for (const npc of NPCS_DATA) {
    if (!npc.schedule) continue;
    const loc = getNpcLocation(npc, ctx);
    const where = placeFor(npc, loc);
    if (!where.id) continue;
    if (!groups.has(where.id)) groups.set(where.id, []);
    groups.get(where.id).push({ npc, loc, approx: where.approx });
  }
  return groups;
}

// Portraits stack in a row above the hotspot they are at. Zoomed out, each
// place shows one portrait and a "+N" count so the map stays readable.
function npcLayer(at) {
  const groups = npcsByPlace();
  const compact = view.zoom < 2;
  return view.map.spots.map(s => {
    const list = groups.get(s.id);
    if (!list) return '';
    const shown = compact ? list.slice(0, 1) : list;
    return `
      <div class="map-npcs" style="${at(s.x, s.y)}">
        ${compact && list.length > 1 ? `<span class="map-npcs__more">+${list.length - 1}</span>` : ''}
        ${shown.map(({ npc, loc }) => `
          <button class="map-npc" type="button" data-action="map-spot" data-id="${s.id}"
                  title="${npc.name}: ${(loc.location || '').replace(/<[^>]+>/g, '')}">
            <img src="${npc.avatar}" alt="${npc.name}" class="pixel-img">
          </button>`).join('')}
      </div>`;
  }).join('');
}

function infoHtml(id) {
  if (!id) {
    return `<p class="muted">${ico('pin')} Bấm vào một địa điểm trên bản đồ để xem giờ mở cửa, ai sống ở đó và ai đang có mặt.</p>`;
  }
  const p = place(id, spotById(id));
  const here = (npcsByPlace().get(id) || []);
  const residents = (p.residents || []).map(r => npcById.get(r)).filter(Boolean);
  return `
    <div class="place">
      <header class="place__head">
        ${p.icon ? `<span class="place__icon">${ico(p.icon)}</span>` : ''}
        <div>
          <h3 class="place__title">${p.name}</h3>
          <div class="muted">${altName(p)} · ${KIND_LABELS[p.kind] || ''}</div>
        </div>
      </header>
      ${p.desc ? `<p>${p.desc}</p>` : ''}
      ${p.hours ? `<div class="place__row">${ico('clock')} <strong>Giờ mở cửa:</strong> ${p.hours}</div>` : ''}
      ${p.closed ? `<div class="place__row">${ico('lock')} <strong>Nghỉ:</strong> ${p.closed}</div>` : ''}
      ${p.owner ? `<div class="place__row">${ico('giver')} <strong>Chủ:</strong> ${p.owner}</div>` : ''}
      ${p.sells ? `<div class="place__row">${ico('money')} <strong>Bán:</strong> ${p.sells}</div>` : ''}
      ${residents.length ? `
        <div class="place__group">
          <div class="section-label">${ico('residence')} Sống tại đây</div>
          <div class="place__faces">${residents.map(n => `<span class="place__face" title="${n.name}"><img src="${n.avatar}" alt="" class="pixel-img">${n.name}</span>`).join('')}</div>
        </div>` : ''}
      <div class="place__group">
        <div class="section-label">${ico('clock')} Đang có mặt (${simSnapshot().dayName}, ${formatSimHour(simSnapshot().hour)})</div>
        ${here.length
          ? `<ul class="place__here">${here.map(({ npc, loc, approx }) => `
              <li><img src="${npc.avatar}" alt="" class="pixel-img"> <strong>${npc.name}</strong>
                <span class="muted">${loc.location}${approx ? ' (ở nhà)' : ''}</span></li>`).join('')}</ul>`
          : '<p class="muted">Không có dân làng nào ở đây lúc này.</p>'}
      </div>
      ${p.link ? `<button class="btn btn--blue btn--sm" type="button" data-action="map-go" data-tab="${p.link.tab}" data-filter="${p.link.filter || ''}">${ico(p.link.tab)} Xem chi tiết trong tab liên quan</button>` : ''}
    </div>`;
}

function renderControls() {
  const s = simSnapshot();
  document.getElementById('mapTime').textContent = `${s.dayName}, ngày ${s.day} · ${formatSimHour(s.hour)}`;
  document.getElementById('mapTimeSlider').value = s.hour;
  document.getElementById('mapNpcToggle').checked = view.showNpcs;
}

// ==========================================
// INPUT: drag to pan, wheel / pinch to zoom
// ==========================================
function bindViewport() {
  const vp = viewport();
  const pointers = new Map();
  let pinchStart = null;
  let dragged = false;

  vp.addEventListener('pointerdown', (e) => {
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    dragged = false;
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      pinchStart = { dist: Math.hypot(a.x - b.x, a.y - b.y), zoom: view.zoom };
    }
  });

  vp.addEventListener('pointermove', (e) => {
    const prev = pointers.get(e.pointerId);
    if (!prev) return;
    const cur = { x: e.clientX, y: e.clientY };
    pointers.set(e.pointerId, cur);
    if (pointers.size === 2 && pinchStart) {
      const [a, b] = [...pointers.values()];
      const target = pinchStart.zoom * Math.hypot(a.x - b.x, a.y - b.y) / pinchStart.dist;
      const rect = vp.getBoundingClientRect();
      // Snap to the allowed level closest to the pinch
      const lvl = view.levels.reduce((best, z, i) => (Math.abs(z - target) < Math.abs(view.levels[best] - target) ? i : best), 0);
      zoomTo(lvl, (a.x + b.x) / 2 - rect.left, (a.y + b.y) / 2 - rect.top);
      return;
    }
    const dx = cur.x - prev.x;
    const dy = cur.y - prev.y;
    if (!dragged && Math.hypot(dx, dy) < 3) return;
    if (!dragged) vp.setPointerCapture(e.pointerId);
    dragged = true;
    view.x += dx;
    view.y += dy;
    clampPan();
    paint();
  });

  const end = (e) => {
    pointers.delete(e.pointerId);
    if (pointers.size < 2) pinchStart = null;
  };
  vp.addEventListener('pointerup', end);
  vp.addEventListener('pointercancel', end);

  // A drag must not also count as a click on the spot it ended on
  vp.addEventListener('click', (e) => {
    if (dragged) { e.stopPropagation(); e.preventDefault(); dragged = false; }
  }, true);

  vp.addEventListener('wheel', (e) => {
    e.preventDefault();
    const rect = vp.getBoundingClientRect();
    zoomTo(view.level + (e.deltaY < 0 ? 1 : -1), e.clientX - rect.left, e.clientY - rect.top);
  }, { passive: false });

  window.addEventListener('resize', () => {
    if (!document.getElementById('tab-map').hidden) { resetView(); paint(); }
  });
}

function loadMap(id) {
  view.map = mapById.get(id) || MAPS[0];
  view.selected = null;
  const img = document.getElementById('mapImg');
  const ready = () => { resetView(); paint(); };
  if (img.getAttribute('src') !== view.map.img) {
    img.onload = ready;
    img.src = view.map.img;
  }
  img.style.width = `${view.map.w}px`;
  img.style.height = `${view.map.h}px`;
  if (img.complete && img.naturalWidth) ready();
}

const mapTab = {
  id: 'map',
  toggles: [],

  init() {
    document.getElementById('mapChips').innerHTML = MAPS.map(m =>
      `<button class="chip" type="button" data-action="filter" data-value="${m.id}">${ico(m.icon)} ${m.name}</button>`).join('');
    bindViewport();
    document.getElementById('mapTimeSlider').addEventListener('input', (e) => {
      setSimHour(parseFloat(e.target.value));
      renderControls();
      paint();
      document.getElementById('mapInfo').innerHTML = infoHtml(view.selected);
    });
    document.getElementById('mapNpcToggle').addEventListener('change', (e) => {
      view.showNpcs = e.target.checked;
      paint();
    });
  },

  onEnter(app) {
    // The tab was hidden, so its size is only known now
    requestAnimationFrame(() => this.render(app));
  },

  render(app) {
    const id = mapById.has(app.filters.map) ? app.filters.map : MAPS[0].id;
    document.querySelectorAll('[data-filter-group="map"] [data-action="filter"]').forEach(b => {
      b.classList.toggle('is-active', b.dataset.value === id);
    });
    renderControls();
    if (id !== view.map.id || !document.getElementById('mapImg').getAttribute('src')) loadMap(id);
    else { resetViewIfNeeded(); paint(); }
    document.getElementById('mapInfo').innerHTML = infoHtml(view.selected);
  },

  actions: {
    'map-spot': (app, el) => {
      view.selected = el.dataset.id;
      app.sfx.play('click');
      paint();
      document.getElementById('mapInfo').innerHTML = infoHtml(view.selected);
    },
    'map-zoom': (app, el) => {
      if (el.dataset.step === 'reset') { resetView(); paint(); return; }
      zoomTo(view.level + Number(el.dataset.step));
    },
    'map-go': (app, el) => {
      if (el.dataset.filter) app.filters[el.dataset.tab] = el.dataset.filter;
      app.switchTab(el.dataset.tab);
      window.scrollTo({ top: document.getElementById('toolbarPanel').offsetTop - 10, behavior: 'smooth' });
    }
  }
};

// First paint after the tab becomes visible: the viewport had no size before
function resetViewIfNeeded() {
  if (viewport().clientWidth && view.levels.join() !== zoomLevels().join()) resetView();
}

export default mapTab;
