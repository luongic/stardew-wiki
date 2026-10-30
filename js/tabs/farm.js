// ==========================================================================
// TAB: NÔNG TRẠI (FARM PLANNER)
// A tile-exact plan of the farm. The palette on the left holds buildings,
// sprinklers, crops, trees, fences, paths and machines: drag one onto the
// map (or pick it and click / drag to paint). Placement follows the game's
// rules: every map tile is buildable, tillable, walk-only or blocked.
// A save file can be imported to show the player's real farm.
//
// Drawing happens on a 1280x1040 canvas (16 px per tile, 1 px per game
// pixel) scaled up with CSS, so the pixel art stays crisp at every zoom.
// ==========================================================================

import { FARM_MAPS, FARM_ITEMS, FARM_GROUPS } from '../../data/farm-data.js';
import { RECIPES_DATA } from '../../data/recipes-data.js';
import { loadJSON, saveJSON, KEYS } from '../lib/storage.js';
import { ico } from '../lib/icons.js';
import { t, nm } from '../lib/i18n.js';
import { openModal, closeModal } from '../lib/ui.js';

const TILE = 16;
const MAP = FARM_MAPS.standard;
const itemById = new Map(FARM_ITEMS.map(i => [i.id, i]));
const BASE_ZOOMS = [0.5, 1, 1.5, 2, 3];
let ZOOMS = BASE_ZOOMS;
const UNDO_LIMIT = 60;

// Crafting / building costs, matched by English name
const recipeByEn = new Map(RECIPES_DATA.map(r => [r.nameEn, r]));
const RECIPE_ALIAS = { 'Wood Fence': 'Fence', 'Shipping Bin': 'Shipping Bin', 'Cabin': 'Cabin' };
const recipeFor = item => recipeByEn.get(item.nameEn) || recipeByEn.get(RECIPE_ALIAS[item.nameEn]);

// ==========================================
// STATE
// objects: [{ t, x, y }] buildings, machines, fences, trees, debris (x/y = top-left tile)
// ground:  { "x,y": "farmland" | "crop_parsnip" | "wood_path" | "grass" }
// ==========================================
const freshPlan = () => ({ v: 1, map: MAP.id, objects: MAP.defaults.map(o => ({ ...o })), ground: {} });
let plan = loadJSON(KEYS.farm, null) || freshPlan();
const undoStack = [];
const redoStack = [];

const ui = {
  tool: null,          // selected palette item id, 'erase', or null (select / move)
  group: 'buildings',
  hover: null,         // { x, y } tile under the pointer
  selected: null,      // index into plan.objects
  drag: null,          // active pointer gesture
  zoom: 1,
  showGrid: false,
  showRanges: false,
  rangeAlpha: loadJSON(KEYS.farmView, {}).rangeAlpha ?? 0.3,   // how strongly ranges are shaded
  paletteDrag: null,   // item being dragged from the palette
  highlight: [],       // tiles to point out (from the Journal tab)
  message: ''
};

const key = (x, y) => `${x},${y}`;
const cell = (x, y) => (x < 0 || y < 0 || x >= MAP.w || y >= MAP.h ? '#' : MAP.grid[y][x]);
const canBuild = (x, y) => 'TB'.includes(cell(x, y));
const canTill = (x, y) => 'Tt'.includes(cell(x, y));

function save() { saveJSON(KEYS.farm, plan); }

function snapshot() {
  undoStack.push(JSON.stringify(plan));
  if (undoStack.length > UNDO_LIMIT) undoStack.shift();
  redoStack.length = 0;
  delete plan.source;   // edited by hand: no longer a plain copy of a save
}

function restore(json) { plan = JSON.parse(json); ui.selected = null; save(); draw(); renderSide(); }

// ==========================================
// OCCUPANCY
// ==========================================
let occ = null;   // Map "x,y" -> object index
function buildOcc() {
  occ = new Map();
  plan.objects.forEach((o, i) => {
    const it = itemById.get(o.t) || itemById.get('other');
    const w = o.w || it.w, h = o.h || it.h;
    for (let dy = 0; dy < h; dy++) for (let dx = 0; dx < w; dx++) occ.set(key(o.x + dx, o.y + dy), i);
  });
}
const sizeOf = o => { const it = itemById.get(o.t) || itemById.get('other'); return { w: o.w || it.w, h: o.h || it.h }; };

// Can `item` go with its top-left at (x, y)? `ignore` = index of an object being moved
function fits(item, x, y, ignore = -1) {
  if (item.kind === 'ground' || item.kind === 'crop') {
    if (occ.has(key(x, y)) && occ.get(key(x, y)) !== ignore) return false;
    // Soil and crops need tillable ground; paths and grass go on any usable tile
    return item.till ? canTill(x, y) : canBuild(x, y) || canTill(x, y);
  }
  for (let dy = 0; dy < item.h; dy++) for (let dx = 0; dx < item.w; dx++) {
    const cx = x + dx, cy = y + dy;
    const o = occ.get(key(cx, cy));
    if (o !== undefined && o !== ignore) return false;
    if (item.kind === 'building' ? !canBuild(cx, cy) : !(canBuild(cx, cy) || canTill(cx, cy))) return false;
  }
  return true;
}

// ==========================================
// EDITING
// ==========================================
function placeAt(item, x, y) {
  if (!fits(item, x, y)) return false;
  if (item.kind === 'ground' || item.kind === 'crop') {
    plan.ground[key(x, y)] = item.id;
    return true;
  }
  if (item.unique) {
    const old = plan.objects.findIndex(o => o.t === item.id);
    if (old >= 0) plan.objects.splice(old, 1);
  }
  plan.objects.push({ t: item.id, x, y });
  // A building or object sits on plain ground: clear soil/paths underneath
  if (item.kind === 'building') {
    for (let dy = 0; dy < item.h; dy++) for (let dx = 0; dx < item.w; dx++) delete plan.ground[key(x + dx, y + dy)];
  } else {
    const g = plan.ground[key(x, y)];
    if (g && (g === 'farmland' || g.startsWith('crop_'))) delete plan.ground[key(x, y)];
  }
  buildOcc();
  return true;
}

function eraseAt(x, y) {
  const i = occ.get(key(x, y));
  if (i !== undefined) { plan.objects.splice(i, 1); buildOcc(); ui.selected = null; return true; }
  if (plan.ground[key(x, y)]) { delete plan.ground[key(x, y)]; return true; }
  return false;
}

function removeSelected() {
  if (ui.selected === null) return;
  snapshot();
  plan.objects.splice(ui.selected, 1);
  ui.selected = null;
  buildOcc(); save(); draw(); renderSide();
}

// Tiles on the line between two tiles, so a fast drag leaves no gaps
function lineTiles(a, b) {
  const out = [];
  const n = Math.max(Math.abs(b.x - a.x), Math.abs(b.y - a.y), 1);
  for (let i = 0; i <= n; i++) out.push({ x: Math.round(a.x + ((b.x - a.x) * i) / n), y: Math.round(a.y + ((b.y - a.y) * i) / n) });
  return out;
}
const rectTiles = (a, b) => {
  const out = [];
  for (let y = Math.min(a.y, b.y); y <= Math.max(a.y, b.y); y++) for (let x = Math.min(a.x, b.x); x <= Math.max(a.x, b.x); x++) out.push({ x, y });
  return out;
};
const paints = item => item && (item.kind === 'ground' || item.kind === 'crop' || item.kind === 'fence' || (item.kind === 'object' && item.w === 1));

// ==========================================
// RANGES (sprinklers, scarecrows, Junimo huts, bee houses)
// ==========================================
function rangeTiles(item, x, y) {
  const r = item.range;
  if (!r) return [];
  const out = [];
  if (r.shape === 'cross') return [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]];
  const cx = item.kind === 'building' ? x + 1 : x, cy = item.kind === 'building' ? y + 1 : y;
  for (let dy = -r.r; dy <= r.r; dy++) for (let dx = -r.r; dx <= r.r; dx++) {
    if (!dx && !dy && item.kind !== 'building') continue;
    if (r.shape === 'circle' && Math.hypot(dx, dy) >= r.r + 1) continue;
    if (r.shape === 'diamond' && Math.abs(dx) + Math.abs(dy) > r.r) continue;
    out.push([cx + dx, cy + dy]);
  }
  return out;
}

function wateredSet() {
  const s = new Set();
  for (const o of plan.objects) {
    const it = itemById.get(o.t);
    if (it?.range && it.id.includes('sprinkler')) for (const [x, y] of rangeTiles(it, o.x, o.y)) s.add(key(x, y));
  }
  return s;
}

// ==========================================
// IMAGES
// ==========================================
const images = new Map();
function img(src) {
  if (!images.has(src)) {
    const im = new Image();
    im.onload = () => draw();
    im.src = src;
    images.set(src, im);
  }
  const im = images.get(src);
  return im.complete && im.naturalWidth ? im : null;
}

// ==========================================
// DRAWING
// ==========================================
let ctx = null, octx = null;

function drawGround(g, x, y) {
  const px = x * TILE, py = y * TILE;
  if (g === 'farmland' || g.startsWith('crop_')) {
    ctx.fillStyle = '#6b4325'; ctx.fillRect(px, py, TILE, TILE);
    ctx.fillStyle = '#7d5230'; ctx.fillRect(px + 1, py + 1, TILE - 2, TILE - 2);
    ctx.fillStyle = '#5e3a20'; ctx.fillRect(px + 3, py + 5, 4, 1); ctx.fillRect(px + 9, py + 10, 4, 1);
    if (g.startsWith('crop_')) {
      const im = img(itemById.get(g)?.icon);
      if (im) ctx.drawImage(im, px + 1, py + 1, TILE - 2, TILE - 2);
    }
    return;
  }
  if (g === 'grass') {
    // Tufts of blades over the ground, like the game's grass
    for (const [a, b] of [[1, 3], [8, 1], [4, 9], [11, 8]]) {
      ctx.fillStyle = '#2f7a2f';
      ctx.fillRect(px + a, py + b + 2, 4, 4);
      ctx.fillStyle = '#6abe30';
      ctx.fillRect(px + a, py + b + 1, 1, 4); ctx.fillRect(px + a + 2, py + b, 1, 5); ctx.fillRect(px + a + 4, py + b + 2, 1, 3);
      ctx.fillStyle = '#9ad94a';
      ctx.fillRect(px + a + 2, py + b, 1, 2);
    }
    return;
  }
  const im = img(itemById.get(g)?.icon);
  if (im) ctx.drawImage(im, px, py, TILE, TILE);
}

function drawObject(o, alpha = 1) {
  const it = itemById.get(o.t) || itemById.get('other');
  const { w, h } = sizeOf(o);
  const px = o.x * TILE, py = o.y * TILE;
  ctx.globalAlpha = alpha;
  if (it.sprite) {
    const im = img(it.sprite);
    if (im) {
      const dw = it.kind === 'tree' ? 48 : w * TILE;
      const dh = (im.naturalHeight * dw) / im.naturalWidth;
      ctx.drawImage(im, px + (w * TILE - dw) / 2, py + h * TILE - dh, dw, dh);
    }
  } else {
    const im = img(it.icon);
    if (im) ctx.drawImage(im, px, py, w * TILE, h * TILE);
  }
  ctx.globalAlpha = 1;
}

function draw() {
  if (!ctx) return;
  buildOcc();
  const bg = img(MAP.bg);
  ctx.clearRect(0, 0, MAP.w * TILE, MAP.h * TILE);
  if (bg) ctx.drawImage(bg, 0, 0);
  for (const [k, g] of Object.entries(plan.ground)) { const [x, y] = k.split(',').map(Number); drawGround(g, x, y); }
  // Draw from the top row down so nearer things overlap farther ones
  const order = plan.objects.map((o, i) => i).sort((a, b) => {
    const A = plan.objects[a], B = plan.objects[b];
    return (A.y + sizeOf(A).h) - (B.y + sizeOf(B).h) || A.x - B.x;
  });
  for (const i of order) drawObject(plan.objects[i]);
  drawOverlay();
}

function tint(x, y, color) { octx.fillStyle = color; octx.fillRect(x * TILE, y * TILE, TILE, TILE); }

// Range colours: blue for sprinklers, magenta for scarecrows, Junimo huts, bee houses (both stand out on the orange soil)
const WATER = [70, 140, 255];
const GUARD = [220, 60, 200];
const isWater = it => it.id.includes('sprinkler');

// Shade a set of tiles and outline its outer edge so the boundary is easy to read
function shadeArea(tiles, [r, g, b], alpha) {
  const set = new Set(tiles.map(([x, y]) => key(x, y)));
  octx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
  for (const [x, y] of tiles) octx.fillRect(x * TILE, y * TILE, TILE, TILE);
  octx.fillStyle = `rgba(${r},${g},${b},${Math.min(1, alpha * 2 + 0.25)})`;
  for (const [x, y] of tiles) {
    const px = x * TILE, py = y * TILE;
    if (!set.has(key(x, y - 1))) octx.fillRect(px, py, TILE, 1);
    if (!set.has(key(x, y + 1))) octx.fillRect(px, py + TILE - 1, TILE, 1);
    if (!set.has(key(x - 1, y))) octx.fillRect(px, py, 1, TILE);
    if (!set.has(key(x + 1, y))) octx.fillRect(px + TILE - 1, py, 1, TILE);
  }
}

function drawOverlay() {
  if (!octx) return;
  octx.clearRect(0, 0, MAP.w * TILE, MAP.h * TILE);
  if (ui.showGrid) {
    octx.fillStyle = 'rgba(0,0,0,0.12)';
    for (let x = 1; x < MAP.w; x++) octx.fillRect(x * TILE, 0, 1, MAP.h * TILE);
    for (let y = 1; y < MAP.h; y++) octx.fillRect(0, y * TILE, MAP.w * TILE, 1);
  }
  if (ui.showRanges) {
    // Scarecrows / huts / bee houses first, merged into one area; sprinklers on top
    const guarded = new Map();
    for (const o of plan.objects) {
      const it = itemById.get(o.t);
      if (it?.range && !isWater(it)) for (const t of rangeTiles(it, o.x, o.y)) guarded.set(key(...t), t);
    }
    shadeArea([...guarded.values()], GUARD, ui.rangeAlpha * 0.6);
    shadeArea([...wateredSet()].map(k => k.split(',').map(Number)), WATER, ui.rangeAlpha);
  }
  if (ui.selected !== null && plan.objects[ui.selected]) {
    const o = plan.objects[ui.selected]; const { w, h } = sizeOf(o);
    octx.strokeStyle = '#ffe066'; octx.lineWidth = 2;
    octx.strokeRect(o.x * TILE + 1, o.y * TILE + 1, w * TILE - 2, h * TILE - 2);
    const it = itemById.get(o.t);
    if (it?.range) shadeArea(rangeTiles(it, o.x, o.y), isWater(it) ? WATER : GUARD, ui.rangeAlpha);
  }
  // Ghost of the item being placed, green if it fits and red if not
  const item = ghostItem();
  if (item && ui.hover) {
    const { x, y } = ghostOrigin(item);
    const ok = fits(item, x, y, ui.drag?.moving ?? -1);
    for (let dy = 0; dy < item.h; dy++) for (let dx = 0; dx < item.w; dx++) tint(x + dx, y + dy, ok ? 'rgba(80,220,80,0.35)' : 'rgba(240,60,60,0.45)');
    if (item.range) shadeArea(rangeTiles(item, x, y), isWater(item) ? WATER : GUARD, ui.rangeAlpha);
    const im = img(item.sprite || item.icon);
    if (im && item.kind !== 'ground' && item.kind !== 'crop') {
      octx.globalAlpha = 0.75;
      if (item.sprite) {
        const dw = item.kind === 'tree' ? 48 : item.w * TILE;
        const dh = (im.naturalHeight * dw) / im.naturalWidth;
        octx.drawImage(im, x * TILE + (item.w * TILE - dw) / 2, (y + item.h) * TILE - dh, dw, dh);
      } else octx.drawImage(im, x * TILE, y * TILE, item.w * TILE, item.h * TILE);
      octx.globalAlpha = 1;
    }
  }
  if (ui.tool === 'erase' && ui.hover) {
    octx.strokeStyle = '#ff5050'; octx.lineWidth = 2;
    octx.strokeRect(ui.hover.x * TILE + 1, ui.hover.y * TILE + 1, TILE - 2, TILE - 2);
  }
  // Shift-drag rectangle preview
  if (ui.drag?.rect && ui.hover) for (const p of rectTiles(ui.drag.start, ui.hover)) tint(p.x, p.y, 'rgba(255,255,255,0.25)');
  // Tiles pointed out from the Journal tab: a thick gold frame around each
  for (const h of ui.highlight) {
    octx.strokeStyle = '#2b1408'; octx.lineWidth = 4; octx.strokeRect(h.x * TILE - 3, h.y * TILE - 3, TILE + 6, TILE + 6);
    octx.strokeStyle = '#ffcd38'; octx.lineWidth = 2; octx.strokeRect(h.x * TILE - 3, h.y * TILE - 3, TILE + 6, TILE + 6);
  }
}

// Point out tiles (a chest, a machine...) and scroll the map to the first one
export function focusFarmTiles(tiles) {
  ui.highlight = tiles;
  requestAnimationFrame(() => {
    const vp = document.getElementById('farmViewport');
    const stage = document.getElementById('farmStage');
    if (!vp || !stage || !tiles.length) return;
    if (ui.zoom < 1.5) { ui.zoom = ZOOMS.find(z => z >= 1.5) || ui.zoom; applyZoom(false); }
    const { x, y } = tiles[0];
    vp.scrollLeft = ((x + 0.5) / MAP.w) * stage.offsetWidth - vp.clientWidth / 2;
    vp.scrollTop = ((y + 0.5) / MAP.h) * stage.offsetHeight - vp.clientHeight / 2;
    vp.scrollIntoView({ block: 'center', behavior: 'smooth' });
    drawOverlay();
  });
}

function ghostItem() {
  if (ui.drag?.moving !== undefined && ui.drag.moving !== null) return itemById.get(plan.objects[ui.drag.moving]?.t);
  const id = ui.paletteDrag || ui.tool;
  return id && id !== 'erase' ? itemById.get(id) : null;
}
// Buildings are held by their middle so they land where the pointer is
function ghostOrigin(item) {
  if (ui.drag?.moving !== undefined && ui.drag.moving !== null) return { x: ui.hover.x - ui.drag.offX, y: ui.hover.y - ui.drag.offY };
  return item.w > 1 || item.h > 1 ? { x: ui.hover.x - Math.floor(item.w / 2), y: ui.hover.y - (item.h - 1) } : ui.hover;
}

// ==========================================
// SIDE PANELS
// ==========================================
function paletteHtml() {
  const items = FARM_ITEMS.filter(i => i.group === ui.group);
  return `
    <div class="farm-groups">
      ${FARM_GROUPS.map(g => `
        <button class="farm-group ${g.id === ui.group ? 'is-active' : ''}" type="button" data-action="farm-group" data-group="${g.id}" title="${g.name}">
          ${ico(g.icon)}<span>${g.name}</span>
        </button>`).join('')}
    </div>
    <div class="farm-items">
      ${items.map(i => `
        <button class="farm-item ${ui.tool === i.id ? 'is-active' : ''}" type="button" data-farm-item="${i.id}" title="${nm(i)}${i.w > 1 || i.h > 1 ? ` (${i.w}×${i.h})` : ''}">
          <img src="${i.icon || i.sprite}" alt="" class="pixel-img" draggable="false">
          <span>${nm(i)}</span>
        </button>`).join('')}
    </div>`;
}

function stats() {
  const counts = new Map();
  for (const o of plan.objects) counts.set(o.t, (counts.get(o.t) || 0) + 1);
  let soil = 0, crops = 0;
  const watered = wateredSet();
  let wateredSoil = 0;
  for (const [k, g] of Object.entries(plan.ground)) {
    if (g === 'farmland' || g.startsWith('crop_')) { soil++; if (watered.has(k)) wateredSoil++; }
    if (g.startsWith('crop_')) crops++;
    counts.set(g, (counts.get(g) || 0) + 1);
  }
  // Materials for everything that has a recipe (machines, fences, paths, buildings)
  const mats = new Map();
  for (const [id, n] of counts) {
    const it = itemById.get(id);
    const r = it && recipeFor(it);
    if (!r || it.id === 'farmhouse' || it.id === 'greenhouse') continue;
    const yieldN = r.yield || 1;
    for (const ing of r.ingredients || []) {
      const cur = mats.get(ing.name) || { name: ing.name, iconUrl: ing.iconUrl, count: 0 };
      cur.count += Math.ceil(n / yieldN) * ing.count;
      mats.set(ing.name, cur);
    }
  }
  return { counts, soil, crops, wateredSoil, mats: [...mats.values()].sort((a, b) => b.count - a.count) };
}

function sideHtml() {
  const s = stats();
  const sel = ui.selected !== null ? plan.objects[ui.selected] : null;
  const selItem = sel && (itemById.get(sel.t) || itemById.get('other'));
  const tool = ui.tool && ui.tool !== 'erase' ? itemById.get(ui.tool) : null;
  const rows = [...s.counts].filter(([id]) => itemById.has(id) && id !== 'farmland').sort((a, b) => b[1] - a[1]);
  return `
    <div class="farm-card">
      <h3 class="farm-card__title">${ico('tip')} ${t('Đang chọn')}</h3>
      ${tool ? `<p class="farm-tool"><img src="${tool.icon || tool.sprite}" alt="" class="pixel-img"> <strong>${nm(tool)}</strong>${tool.w > 1 ? ` <span class="muted">${tool.w}×${tool.h} ${t('ô')}</span>` : ''}</p>
        <p class="muted">${paints(tool) ? t('Bấm hoặc kéo để vẽ. Giữ Shift khi kéo để tô cả vùng chữ nhật.') : t('Bấm vào bản đồ để đặt. Ô xanh là đặt được, ô đỏ là không.')}</p>`
      : ui.tool === 'erase' ? `<p class="farm-tool">${ico('trash')} <strong>${t('Cục tẩy')}</strong></p><p class="muted">${t('Bấm hoặc kéo để xoá đồ vật, ô đất, lối đi.')}</p>`
      : `<p class="muted">${t('Kéo một món từ bảng bên trái thả vào nông trại, hoặc bấm chọn rồi bấm lên bản đồ. Bấm vào đồ đã đặt để chọn, kéo để di chuyển.')}</p>`}
      ${selItem ? `
        <div class="farm-selected">
          <span>${ico('check')} <strong>${nm(selItem)}</strong> <span class="muted">(${sel.x}, ${sel.y})</span></span>
          <button class="btn btn--ghost btn--sm" type="button" data-action="farm-delete">${ico('trash')} ${t('Xoá')}</button>
        </div>` : ''}
      <p class="farm-hover muted" id="farmHover">&nbsp;</p>
    </div>

    <div class="farm-card">
      <h3 class="farm-card__title">${ico('crops')} ${t('Thống kê')}</h3>
      <ul class="farm-stats">
        <li><span>${t('Ô đất đã cuốc')}</span><strong>${s.soil}</strong></li>
        <li><span>${t('Ô có cây trồng')}</span><strong>${s.crops}</strong></li>
        <li><span>${t('Ô đất được tưới tự động')}</span><strong>${s.wateredSoil} / ${s.soil}</strong></li>
        ${rows.slice(0, 12).map(([id, n]) => `<li><span><img src="${itemById.get(id).icon || itemById.get(id).sprite}" alt="" class="pixel-img"> ${nm(itemById.get(id))}</span><strong>${n}</strong></li>`).join('')}
      </ul>
    </div>

    ${s.mats.length ? `
    <div class="farm-card">
      <h3 class="farm-card__title">${ico('ingredients')} ${t('Nguyên liệu cần')}</h3>
      <p class="muted">${t('Tổng nguyên liệu để chế tạo / xây mọi thứ trên bản đồ (trừ nhà chính và nhà kính).')}</p>
      <ul class="farm-stats">
        ${s.mats.slice(0, 14).map(m => `<li><span>${m.iconUrl ? `<img src="${m.iconUrl}" alt="" class="pixel-img">` : ''} ${m.name}</span><strong>${m.count.toLocaleString()}</strong></li>`).join('')}
      </ul>
    </div>` : ''}`;
}

function renderSide() {
  const pal = document.getElementById('farmPalette');
  const side = document.getElementById('farmSide');
  if (pal) pal.innerHTML = paletteHtml();
  if (side) side.innerHTML = sideHtml();
  document.querySelectorAll('[data-action="farm-tool"]').forEach(b => b.classList.toggle('is-active', b.dataset.tool === (ui.tool || 'select')));
  const g = document.getElementById('farmGridToggle'); if (g) g.checked = ui.showGrid;
  const r = document.getElementById('farmRangeToggle'); if (r) r.checked = ui.showRanges;
  const a = document.getElementById('farmRangeAlpha');
  if (a) { a.value = Math.round(ui.rangeAlpha * 100); document.getElementById('farmRangeAlphaLabel').textContent = `${a.value}%`; }
  const z = document.getElementById('farmZoomLabel'); if (z) z.textContent = `x${Math.round(ui.zoom * 100) / 100}`;
}

function hoverText() {
  const el = document.getElementById('farmHover');
  if (!el) return;
  if (!ui.hover) { el.innerHTML = '&nbsp;'; return; }
  const { x, y } = ui.hover;
  const c = cell(x, y);
  const what = { T: t('Xây và cuốc được'), B: t('Chỉ xây được'), t: t('Chỉ cuốc được'), '.': t('Chỉ đi qua'), '#': t('Không dùng được') }[c];
  const i = occ.get(key(x, y));
  const o = i !== undefined ? itemById.get(plan.objects[i].t) : null;
  const g = plan.ground[key(x, y)];
  el.textContent = `(${x}, ${y}) · ${what}${o ? ` · ${nm(o)}` : ''}${g ? ` · ${nm(itemById.get(g))}` : ''}`;
}

// ==========================================
// ZOOM
// ==========================================
function applyZoom(keepCenter = true) {
  const vp = document.getElementById('farmViewport');
  const stage = document.getElementById('farmStage');
  if (!vp || !stage) return;
  const cx = (vp.scrollLeft + vp.clientWidth / 2) / (stage.offsetWidth || 1);
  const cy = (vp.scrollTop + vp.clientHeight / 2) / (stage.offsetHeight || 1);
  stage.style.width = `${MAP.w * TILE * ui.zoom}px`;
  stage.style.height = `${MAP.h * TILE * ui.zoom}px`;
  if (keepCenter) {
    vp.scrollLeft = cx * stage.offsetWidth - vp.clientWidth / 2;
    vp.scrollTop = cy * stage.offsetHeight - vp.clientHeight / 2;
  }
  renderSide();
}

// "Fit" fills the viewport width; the other levels are fixed scales above it
function fitZoom() {
  const vp = document.getElementById('farmViewport');
  if (!vp || !vp.clientWidth) return 1;
  const fit = Math.floor((vp.clientWidth / (MAP.w * TILE)) * 100) / 100;
  ZOOMS = [...new Set([fit, ...BASE_ZOOMS.filter(z => z > fit)])];
  return fit;
}

// ==========================================
// POINTER INPUT
// ==========================================
function tileAt(ev) {
  const stage = document.getElementById('farmStage');
  const r = stage.getBoundingClientRect();
  const x = Math.floor(((ev.clientX - r.left) / r.width) * MAP.w);
  const y = Math.floor(((ev.clientY - r.top) / r.height) * MAP.h);
  return x >= 0 && y >= 0 && x < MAP.w && y < MAP.h ? { x, y } : null;
}

function paintTile(item, p) {
  if (ui.tool === 'erase') return eraseAt(p.x, p.y);
  return placeAt(item, p.x, p.y);
}

function bindBoard() {
  const stage = document.getElementById('farmStage');
  const vp = document.getElementById('farmViewport');

  stage.addEventListener('pointerdown', (ev) => {
    if (ev.button !== 0) return;
    ui.highlight = [];
    const p = tileAt(ev);
    if (!p) return;
    ui.hover = p;
    const item = ui.tool && ui.tool !== 'erase' ? itemById.get(ui.tool) : null;
    if (ui.tool === 'erase' || (item && paints(item))) {
      snapshot();
      ui.drag = { paint: true, last: p, start: p, rect: ev.shiftKey, changed: false };
      if (!ev.shiftKey) ui.drag.changed = paintTile(item, p);
    } else if (item) {
      snapshot();
      const o = ghostOrigin(item);
      if (placeAt(item, o.x, o.y)) { save(); renderSide(); } else undoStack.pop();
    } else {
      // Select / move an object, or pan the map
      const i = occ.get(key(p.x, p.y));
      if (i !== undefined) {
        ui.selected = i;
        const o = plan.objects[i];
        ui.drag = { moving: i, offX: p.x - o.x, offY: p.y - o.y, start: p, moved: false };
      } else {
        ui.selected = null;
        ui.drag = { pan: true, sx: ev.clientX, sy: ev.clientY, left: vp.scrollLeft, top: vp.scrollTop };
      }
      renderSide();
    }
    stage.setPointerCapture(ev.pointerId);
    draw();
  });

  stage.addEventListener('pointermove', (ev) => {
    if (ui.drag?.pan) {
      vp.scrollLeft = ui.drag.left - (ev.clientX - ui.drag.sx);
      vp.scrollTop = ui.drag.top - (ev.clientY - ui.drag.sy);
      return;
    }
    const p = tileAt(ev);
    const changedTile = !p || !ui.hover || p.x !== ui.hover.x || p.y !== ui.hover.y;
    ui.hover = p;
    if (!changedTile) return;
    if (ui.drag?.paint && p && !ui.drag.rect) {
      const item = itemById.get(ui.tool);
      for (const q of lineTiles(ui.drag.last, p)) ui.drag.changed = paintTile(item, q) || ui.drag.changed;
      ui.drag.last = p;
      draw();
    } else if (ui.drag?.moving !== undefined && p) {
      ui.drag.moved = true;
      drawOverlay();
    } else drawOverlay();
    hoverText();
  });

  const end = (ev) => {
    const d = ui.drag;
    ui.drag = null;
    if (!d) return;
    if (d.paint) {
      if (d.rect && ui.hover) {
        const item = itemById.get(ui.tool);
        for (const q of rectTiles(d.start, ui.hover)) d.changed = paintTile(item, q) || d.changed;
      }
      if (d.changed) save(); else undoStack.pop();
      draw(); renderSide();
    } else if (d.moving !== undefined && d.moved && ui.hover) {
      const o = plan.objects[d.moving];
      const it = itemById.get(o.t) || itemById.get('other');
      const nx = ui.hover.x - d.offX, ny = ui.hover.y - d.offY;
      if (fits({ ...it, ...sizeOf(o) }, nx, ny, d.moving)) {
        snapshot();
        o.x = nx; o.y = ny;
        save();
      }
      draw(); renderSide();
    }
    if (ev?.pointerId !== undefined && stage.hasPointerCapture(ev.pointerId)) stage.releasePointerCapture(ev.pointerId);
  };
  stage.addEventListener('pointerup', end);
  stage.addEventListener('pointercancel', end);
  stage.addEventListener('pointerleave', () => { if (!ui.drag) { ui.hover = null; drawOverlay(); hoverText(); } });

  vp.addEventListener('wheel', (ev) => {
    if (!ev.ctrlKey && !ev.metaKey) return;
    ev.preventDefault();
    zoomStep(ev.deltaY < 0 ? 1 : -1);
  }, { passive: false });

  // Drag straight from the palette onto the map
  const pal = document.getElementById('farmPalette');
  pal.addEventListener('pointerdown', (ev) => {
    const btn = ev.target.closest('[data-farm-item]');
    if (!btn || ev.button !== 0) return;
    ev.preventDefault();
    ui.tool = btn.dataset.farmItem;
    ui.paletteDrag = ui.tool;
    ui.selected = null;
    renderSide();
    const move = (e) => {
      const r = stage.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX < r.right && e.clientY >= r.top && e.clientY < r.bottom;
      ui.hover = inside ? tileAt(e) : null;
      drawOverlay(); hoverText();
    };
    const up = (e) => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      const item = itemById.get(ui.paletteDrag);
      ui.paletteDrag = null;
      const p = (() => {
        const r = stage.getBoundingClientRect();
        return e.clientX >= r.left && e.clientX < r.right && e.clientY >= r.top && e.clientY < r.bottom ? tileAt(e) : null;
      })();
      if (item && p) {
        ui.hover = p;
        snapshot();
        const o = ghostOrigin(item);
        if (placeAt(item, o.x, o.y)) save(); else { undoStack.pop(); flash(t('Không đặt được ở đây')); }
      }
      draw(); renderSide();
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  });
}

let flashTimer = null;
function flash(msg) {
  const el = document.getElementById('farmFlash');
  if (!el) return;
  el.textContent = msg; el.hidden = false;
  clearTimeout(flashTimer);
  flashTimer = setTimeout(() => { el.hidden = true; }, 1600);
}

function zoomStep(step) {
  const i = ZOOMS.indexOf(ui.zoom);
  ui.zoom = ZOOMS[Math.max(0, Math.min(ZOOMS.length - 1, (i < 0 ? 0 : i) + step))];
  applyZoom();
}

// ==========================================
// EXPORT / IMPORT
// ==========================================
function exportPng(app) {
  const c = document.createElement('canvas');
  c.width = MAP.w * TILE; c.height = MAP.h * TILE;
  const g = c.getContext('2d');
  g.drawImage(document.getElementById('farmCanvas'), 0, 0);
  const a = document.createElement('a');
  a.download = 'nong-trai-stardew.png';
  a.href = c.toDataURL('image/png');
  a.click();
  app.showToast(`${ico('download')} ${t('Đã tải ảnh nông trại')}`);
}

// ---------- Ready-made layouts ----------
const STYLE_ICON = { starter: 'item_parsnip', farming: 'crops', ranch: 'animal', mining: 'minerals', fishing: 'fish', all: 'tracker' };
let presetsCache = null;
const loadPresets = async () => (presetsCache ||= (await import('../../data/farm-presets.js')).FARM_PRESETS);

async function openPresets() {
  const presets = await loadPresets();
  document.getElementById('farmPresetBody').innerHTML = `
    <p class="muted">${t('Bố cục mẫu cho bản đồ Tiêu chuẩn, xếp theo lối chơi. Nạp mẫu sẽ thay bản đồ hiện tại (bấm Hoàn tác để quay lại), rồi bạn chỉnh tiếp tuỳ ý.')}</p>
    <div class="preset-grid">
      ${presets.map(pr => {
        const machines = pr.objects.length;
        return `
        <article class="preset-card">
          <img src="${pr.thumb}" alt="" class="preset-card__img" loading="lazy">
          <div class="preset-card__body">
            <h3 class="preset-card__title">${ico(STYLE_ICON[pr.style] || 'farm')} ${nm(pr)}</h3>
            <p class="preset-card__level" title="${t('Mức độ')}: ${pr.level}/5">${ico('festival').repeat(pr.level)} <span class="muted">${machines} ${t('món đã đặt')}</span></p>
            <p class="preset-card__desc">${pr.desc}</p>
            <button class="btn btn--green btn--sm" type="button" data-action="farm-preset-load" data-preset="${pr.id}">${ico('check')} ${t('Dùng mẫu này')}</button>
          </div>
        </article>`;
      }).join('')}
    </div>`;
  openModal('farmPresetModal');
}

async function loadPreset(app, id) {
  const pr = (await loadPresets()).find(p => p.id === id);
  if (!pr) return;
  snapshot();
  const ground = {};
  for (const [g, x, y, w, h] of pr.ground) for (let dy = 0; dy < h; dy++) for (let dx = 0; dx < w; dx++) ground[key(x + dx, y + dy)] = g;
  plan = { v: 1, map: MAP.id, objects: [...MAP.defaults.map(o => ({ ...o })), ...pr.objects.map(([type, x, y]) => ({ t: type, x, y }))], ground };
  ui.selected = null;
  save(); draw(); renderSide();
  closeModal(document.getElementById('farmPresetModal'));
  app.sfx.play('complete');
  app.showToast(`${ico('check')} ${t('Đã nạp mẫu')}: ${nm(pr)}`);
}

// ---------- Plan files (JSON) to share a layout ----------
const PLAN_FORMAT = 'stardew-wiki-farm';

function exportJson(app) {
  const data = {
    format: PLAN_FORMAT,
    version: 1,
    map: MAP.id,
    exported: new Date().toISOString(),
    site: 'https://luongic.github.io/stardew-wiki/',
    objects: plan.objects.map(({ t: type, x, y, w, h }) => ({ t: type, x, y, ...(w ? { w } : {}), ...(h ? { h } : {}) })),
    ground: plan.ground
  };
  const blob = new Blob([JSON.stringify(data, null, 1)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `nong-trai-stardew-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  app.showToast(`${ico('download')} ${t('Đã tải file thiết kế nông trại (JSON)')}`);
}

// Accepts only what the planner understands; anything else is dropped
function readPlanJson(text) {
  const data = JSON.parse(text);
  if (!data || data.format !== PLAN_FORMAT || !Array.isArray(data.objects) || typeof data.ground !== 'object') {
    const e = new Error('bad plan'); e.userMessage = t('File JSON này không phải thiết kế nông trại của Cẩm Nang.'); throw e;
  }
  const inMap = (x, y) => Number.isInteger(x) && Number.isInteger(y) && x >= -2 && y >= -2 && x < MAP.w + 2 && y < MAP.h + 2;
  let dropped = 0;
  const objects = data.objects.filter(o => {
    const ok = o && itemById.has(o.t) && inMap(o.x, o.y);
    if (!ok) dropped++;
    return ok;
  }).map(o => ({ t: o.t, x: o.x, y: o.y, ...(Number.isInteger(o.w) && o.w > 0 && o.w <= 20 ? { w: o.w } : {}), ...(Number.isInteger(o.h) && o.h > 0 && o.h <= 20 ? { h: o.h } : {}) }));
  const ground = {};
  for (const [k, g] of Object.entries(data.ground || {})) {
    const [x, y] = k.split(',').map(Number);
    const it = itemById.get(g);
    if (it && (it.kind === 'ground' || it.kind === 'crop') && inMap(x, y)) ground[key(x, y)] = g; else dropped++;
  }
  return { objects, ground, dropped };
}

// Called by the save import (Progress tab) with readFarmSave()'s result
export function applySaveFarm(res) {
  snapshot();
  plan = { v: 1, map: MAP.id, source: 'save', objects: res.objects, ground: res.ground };
  ui.selected = null;
  save(); draw(); renderSide();
  if (res.warning) flash(res.warning);
}

// True when the current plan is safe to overwrite with a save's farm:
// nothing beyond the starting buildings, or it came from a save already
export function farmPlanIsReplaceable() {
  return plan.source === 'save' || (plan.objects.length <= MAP.defaults.length && !Object.keys(plan.ground).length);
}

// JSON layouts open here; a game save goes through the shared save import
async function importFile(app, file) {
  try {
    const text = await file.text();
    if (!/^\s*\{/.test(text.slice(0, 200))) {
      document.dispatchEvent(new CustomEvent('save-file', { detail: { file, text } }));
      return;
    }
    const res = readPlanJson(text);
    snapshot();
    plan = { v: 1, map: MAP.id, objects: res.objects, ground: res.ground };
    ui.selected = null;
    save(); draw(); renderSide();
    app.showToast(`${ico('check')} ${t('Đã mở file thiết kế nông trại')} (${res.objects.length + Object.keys(res.ground).length})`);
    if (res.dropped) flash(`${t('Bỏ qua')} ${res.dropped} ${t('mục không hợp lệ')}`);
  } catch (e) {
    console.error('[farm]', e);
    app.showToast(`${ico('warn')} ${e.userMessage || (e instanceof SyntaxError ? t('File JSON bị lỗi.') : t('Không đọc được file này'))}`);
  }
}

// ==========================================
// TAB
// ==========================================
let bound = false;

const farmTab = {
  id: 'farm',
  toggles: [],

  init() {
    const canvas = document.getElementById('farmCanvas');
    const overlay = document.getElementById('farmOverlay');
    canvas.width = overlay.width = MAP.w * TILE;
    canvas.height = overlay.height = MAP.h * TILE;
    ctx = canvas.getContext('2d'); octx = overlay.getContext('2d');
    ctx.imageSmoothingEnabled = false; octx.imageSmoothingEnabled = false;
    document.addEventListener('keydown', (e) => {
      if (document.getElementById('tab-farm')?.hidden || e.target.matches('textarea, input:not([type="checkbox"]):not([type="range"])')) return;
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === 'z') { e.preventDefault(); (e.shiftKey ? farmTab.actions['farm-redo'] : farmTab.actions['farm-undo'])(); }
      else if (e.key === 'Escape') { ui.tool = null; ui.selected = null; draw(); renderSide(); }
      else if ((e.key === 'Delete' || e.key === 'Backspace') && ui.selected !== null) { e.preventDefault(); removeSelected(); }
    });
    document.getElementById('farmSaveInput').addEventListener('change', (e) => {
      const f = e.target.files?.[0];
      if (f) importFile(window.app, f);
      e.target.value = '';
    });
  },

  onEnter() {
    if (!bound) {
      bound = true;
      bindBoard();
      // Small screens open at half size rather than a tiny whole-farm view
      ui.zoom = Math.max(fitZoom(), 0.5);
      applyZoom(false);
      // Open on the farmhouse corner, where most players start building
      const vp = document.getElementById('farmViewport');
      const house = plan.objects.find(o => o.t === 'farmhouse') || { x: 59, y: 12 };
      vp.scrollLeft = house.x * TILE * ui.zoom - vp.clientWidth / 2;
      vp.scrollTop = house.y * TILE * ui.zoom - vp.clientHeight / 3;
    }
  },

  render() { draw(); renderSide(); },

  actions: {
    'farm-group': (app, el) => { ui.group = el.dataset.group; renderSide(); },
    'farm-tool': (app, el) => {
      ui.tool = el.dataset.tool === 'select' ? null : el.dataset.tool;
      ui.selected = null; draw(); renderSide();
    },
    'farm-zoom': (app, el) => { if (el.dataset.step === 'fit') { ui.zoom = fitZoom(); applyZoom(); } else zoomStep(Number(el.dataset.step)); },
    'farm-grid': (app, el) => { ui.showGrid = el.checked; drawOverlay(); },
    'farm-ranges': (app, el) => { ui.showRanges = el.checked; drawOverlay(); },
    'farm-range-alpha': (app, el) => {
      ui.rangeAlpha = Number(el.value) / 100;
      saveJSON(KEYS.farmView, { rangeAlpha: ui.rangeAlpha });
      const label = document.getElementById('farmRangeAlphaLabel'); if (label) label.textContent = `${el.value}%`;
      drawOverlay();
    },
    'farm-undo': () => { if (undoStack.length) { redoStack.push(JSON.stringify(plan)); restore(undoStack.pop()); } },
    'farm-redo': () => { if (redoStack.length) { undoStack.push(JSON.stringify(plan)); restore(redoStack.pop()); } },
    'farm-delete': () => removeSelected(),
    'farm-clear': (app) => {
      if (!confirm(t('Xoá mọi thứ trên bản đồ, chỉ giữ nhà chính, nhà kính và thùng chuyển hàng?'))) return;
      snapshot(); plan = freshPlan(); ui.selected = null; save(); draw(); renderSide();
      app.showToast(`${ico('trash')} ${t('Đã làm trống nông trại')}`);
    },
    'farm-export': (app) => exportPng(app),
    'farm-export-json': (app) => exportJson(app),
    'farm-presets': () => openPresets(),
    'farm-preset-load': (app, el) => loadPreset(app, el.dataset.preset),
    'farm-import': () => document.getElementById('farmSaveInput').click()
  }
};

export default farmTab;
