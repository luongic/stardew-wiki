// ==========================================================================
// TAB: NHÀ CỘNG ĐỒNG (COMMUNITY CENTER BUNDLES)
// A branch map (Community Center -> rooms -> Junimo bundle bags) on top, and
// the in-game style item slots of the selected room below. Ticking a slot
// marks that item as turned in; a bundle is done once `required` slots are.
// ==========================================================================

import { CC_ROOMS } from '../../data/bundles-data.js';
import { progress } from '../lib/progress.js';
import { emptyState, matches } from '../lib/templates.js';

const BUNDLES = CC_ROOMS.flatMap(room => room.bundles.map(b => ({ ...b, roomId: room.id })));
const bundleById = new Map(BUNDLES.map(b => [b.id, b]));
const roomById = new Map(CC_ROOMS.map(r => [r.id, r]));

// Done slots are stored as "bundleId:itemIndex"
const slotKey = (bundleId, idx) => `${bundleId}:${idx}`;

const VALID_SLOTS = new Set(BUNDLES.flatMap(b => b.items.map((_, i) => slotKey(b.id, i))));

export const bundleProgress = {
  get done() { return progress.set('bundles'); },
  // Drop slot keys that no longer exist (e.g. from an old backup)
  validKeys(keys) { return keys.filter(k => VALID_SLOTS.has(k)); },
  doneCount(b) { return b.items.filter((_, i) => this.done.has(slotKey(b.id, i))).length; },
  isBundleDone(b) { return this.doneCount(b) >= b.required; },
  isRoomDone(room) { return room.bundles.every(b => this.isBundleDone(b)); },
  totals() {
    return { done: BUNDLES.filter(b => this.isBundleDone(b)).length, total: BUNDLES.length };
  }
};

// --- Pixel Junimo bundle bag (original 12x12 sprite, recoloured per bundle) ---
const BAG = [
  '....####....',
  '...#tttt#...',
  '....#tt#....',
  '...#oooo#...',
  '..#hoooood#.',
  '.#hooooood#.',
  '.#oooooood#.',
  '.#oooooood#.',
  '.#oooooddd#.',
  '..#ooodddd#.',
  '...#dddd#...',
  '....####....'
];
const BAG_COLORS = {
  green: ['#6abe30', '#3f8a1d'],
  purple: ['#9a62d0', '#6a3a9e'],
  orange: ['#e8822a', '#b0561a'],
  yellow: ['#f2c230', '#c08f12'],
  red: ['#d64532', '#99261a'],
  blue: ['#5b9be0', '#2f66a8'],
  teal: ['#3fb5a3', '#22806f']
};

function bagSvg(color) {
  const [fill, shade] = BAG_COLORS[color] || BAG_COLORS.green;
  const paint = { '#': '#2b1408', t: '#ffcd38', o: fill, d: shade, h: 'rgba(255,255,255,0.55)' };
  let rects = '';
  BAG.forEach((row, y) => [...row].forEach((ch, x) => {
    if (paint[ch]) rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${paint[ch]}"/>`;
  }));
  return `<svg class="bag" viewBox="0 0 12 12" shape-rendering="crispEdges" aria-hidden="true">${rects}</svg>`;
}

const QUALITY = {
  silver: { label: 'Bạc', cls: 'q-silver' },
  gold: { label: 'Vàng', cls: 'q-gold' },
  iridium: { label: 'Iridium', cls: 'q-iridium' }
};

// ==========================================
// BRANCH MAP
// ==========================================
function treeHtml(selected) {
  const t = bundleProgress.totals();
  return `
    <div class="cc-tree">
      <div class="cc-root">
        <span class="cc-root__icon" aria-hidden="true">🏚️</span>
        <div>
          <div class="cc-root__title">Nhà Cộng Đồng Pelican</div>
          <div class="cc-root__sub">${t.done}/${t.total} gói đã hoàn thành</div>
        </div>
      </div>
      <div class="cc-branches">
        ${CC_ROOMS.map(room => {
          const doneBundles = room.bundles.filter(b => bundleProgress.isBundleDone(b)).length;
          const cls = ['cc-room'];
          if (bundleProgress.isRoomDone(room)) cls.push('is-done');
          if (selected === room.id) cls.push('is-selected');
          return `
            <div class="${cls.join(' ')}">
              <button class="cc-room__node" type="button" data-action="cc-room" data-room="${room.id}">
                <span class="cc-room__icon" aria-hidden="true">${room.icon}</span>
                <span class="cc-room__name">${room.name}</span>
                <span class="cc-room__count">${doneBundles}/${room.bundles.length}</span>
              </button>
              <div class="cc-room__bundles">
                ${room.bundles.map(b => `
                  <button class="cc-bag ${bundleProgress.isBundleDone(b) ? 'is-done' : ''}" type="button"
                          data-action="cc-bundle" data-bundle="${b.id}" title="${b.nameEn}">
                    ${bagSvg(b.color)}
                    <span class="cc-bag__name">${b.name}</span>
                    <span class="cc-bag__count">${Math.min(bundleProgress.doneCount(b), b.required)}/${b.required}</span>
                  </button>`).join('')}
              </div>
            </div>`;
        }).join('')}
      </div>
    </div>`;
}

// ==========================================
// BUNDLE CARDS (IN-GAME STYLE SLOTS)
// ==========================================
function slotHtml(b, item, idx, query) {
  const done = bundleProgress.done.has(slotKey(b.id, idx));
  const q = item.quality && QUALITY[item.quality];
  const hit = query && matches(query, item.name, item.nameEn, item.source);
  return `
    <button class="slot ${done ? 'is-done' : ''} ${hit ? 'is-hit' : ''}" type="button"
            data-action="cc-item" data-bundle="${b.id}" data-idx="${idx}" aria-pressed="${done}"
            title="${item.nameEn}${item.source ? ` • ${item.source}` : ''}">
      <span class="slot__frame">
        <img src="${item.icon}" alt="" class="pixel-img" loading="lazy" data-fallback="hide">
        ${item.count > 1 ? `<span class="slot__count">${item.count}</span>` : ''}
        ${q ? `<span class="slot__quality ${q.cls}" title="Chất lượng ${q.label}">★</span>` : ''}
        <span class="slot__tick" aria-hidden="true">✓</span>
      </span>
      <span class="slot__name">${item.name}</span>
      ${item.source ? `<span class="slot__source">${item.source}</span>` : ''}
    </button>`;
}

function bundleCard(b, query) {
  const done = bundleProgress.doneCount(b);
  const complete = done >= b.required;
  const optional = b.items.length > b.required;
  return `
    <article class="bundle ${complete ? 'is-done' : ''}" id="bundle-${b.id}">
      <header class="bundle__head">
        ${bagSvg(b.color)}
        <div class="bundle__titles">
          <h3 class="bundle__title">${b.name}</h3>
          <div class="muted">${b.nameEn}</div>
        </div>
        <div class="bundle__progress">
          <span class="badge ${complete ? 'badge--green' : 'badge--gold'}">${complete ? '✓ Hoàn thành' : `${done}/${b.required}`}</span>
          ${optional ? `<span class="muted">Chọn ${b.required} trong ${b.items.length} món</span>` : ''}
        </div>
      </header>
      <div class="bundle__slots">
        ${b.items.map((item, idx) => slotHtml(b, item, idx, query)).join('')}
      </div>
      ${b.reward ? `
        <footer class="bundle__reward">
          <span class="bundle__reward-label">🎁 Phần thưởng:</span>
          ${b.reward.icon ? `<span class="ing-icon"><img src="${b.reward.icon}" alt="" class="pixel-img" data-fallback="hide" loading="lazy"></span>` : ''}
          <span>${b.reward.name}${b.reward.count > 1 ? ` x${b.reward.count}` : ''}</span>
        </footer>` : ''}
    </article>`;
}

function roomHeader(room) {
  const done = bundleProgress.isRoomDone(room);
  return `
    <header class="room-head ${done ? 'is-done' : ''}">
      <h3 class="room-head__title"><span aria-hidden="true">${room.icon}</span> ${room.name} <small class="muted">${room.nameEn}</small></h3>
      <div class="room-head__reward">${done ? '✅' : '🔒'} <strong>Hoàn thành phòng:</strong> ${room.reward}</div>
    </header>`;
}

const bundlesTab = {
  id: 'bundles',
  toggles: ['unfinished'],

  init() {
    document.getElementById('bundleRoomChips').innerHTML = `
      <button class="chip" type="button" data-action="filter" data-value="all">Tất Cả Phòng</button>
      ${CC_ROOMS.map(r => `<button class="chip" type="button" data-action="filter" data-value="${r.id}">${r.icon} ${r.name}</button>`).join('')}`;
  },

  render(app) {
    const selected = app.filters.bundles;
    const q = app.searchQuery;
    document.getElementById('ccTree').innerHTML = treeHtml(selected);
    document.querySelectorAll('[data-filter-group="bundles"] [data-action="filter"]').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.value === selected);
    });

    // Searching looks across every room so "which bundle needs X?" works
    const rooms = q || selected === 'all' ? CC_ROOMS : CC_ROOMS.filter(r => r.id === selected);
    const html = rooms.map(room => {
      const bundles = room.bundles
        .filter(b => !app.toggles.unfinished || !bundleProgress.isBundleDone(b))
        .filter(b => !q || matches(q, b.name, b.nameEn, b.items.flatMap(i => [i.name, i.nameEn, i.source])))
        .map(b => bundleCard({ ...b, roomId: room.id }, q));
      if (!bundles.length) return '';
      return `<section class="room">${roomHeader(room)}<div class="bundle-grid">${bundles.join('')}</div></section>`;
    }).join('');

    document.getElementById('ccRooms').innerHTML = html
      || emptyState('🎁', 'Không có gói nào khớp!', 'Thử từ khóa khác hoặc tắt bộ lọc "Chưa Hoàn Thành".');
  },

  badge() {
    const t = bundleProgress.totals();
    document.getElementById('bundleTabBadge').textContent = `${t.done}/${t.total}`;
  },

  actions: {
    'cc-room': (app, el) => {
      app.filters.bundles = el.dataset.room;
      app.sfx.play('click');
      app.render();
    },
    'cc-bundle': (app, el) => {
      const b = bundleById.get(el.dataset.bundle);
      app.filters.bundles = b.roomId;
      app.sfx.play('click');
      app.render();
      const card = document.getElementById(`bundle-${b.id}`);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.add('is-flash');
        setTimeout(() => card.classList.remove('is-flash'), 900);
      }
    },
    'cc-item': (app, el) => {
      const b = bundleById.get(el.dataset.bundle);
      const key = slotKey(b.id, Number(el.dataset.idx));
      const wasDone = bundleProgress.isBundleDone(b);
      app.sfx.play(progress.toggle('bundles', key) ? 'complete' : 'uncheck');
      if (!wasDone && bundleProgress.isBundleDone(b)) app.showToast(`🎁 Hoàn thành ${b.name}!`);
    }
  }
};

export default bundlesTab;
