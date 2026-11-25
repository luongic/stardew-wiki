// ==========================================================================
// TAB: NHÀ CỘNG ĐỒNG (COMMUNITY CENTER BUNDLES)
// A branch map (Community Center -> rooms -> Junimo bundle bags) on top, and
// the in-game style item slots of the selected room below. Ticking a slot
// marks that item as turned in; a bundle is done once `required` slots are.
// With a save loaded, slots still to fill show whether the item is already in
// a backpack, chest or fridge, and where.
// ==========================================================================

import { altName, t, isEn } from '../lib/i18n.js';
import { COMMUNITY_UPGRADES, COMMUNITY_NEEDS } from '../../data/community-upgrades-data.js';
import { itemTag } from '../lib/item-lookup.js';
import { loadJSON, KEYS } from '../lib/storage.js';
import { CC_ROOMS } from '../../data/bundles-data.js';
import { progress } from '../lib/progress.js';
import { emptyState, matches, pixelIcon } from '../lib/templates.js';
import { ico } from '../lib/icons.js';
import { ownedFinder, ownedTotal, ownedRow } from '../lib/owned.js';
import { saveTabLink } from './save.js';

const BUNDLES = CC_ROOMS.flatMap(room => room.bundles.map(b => ({ ...b, roomId: room.id })));
const bundleById = new Map(BUNDLES.map(b => [b.id, b]));
const roomById = new Map(CC_ROOMS.map(r => [r.id, r]));

// Done slots are stored as "bundleId:itemIndex"
const slotKey = (bundleId, idx) => `${bundleId}:${idx}`;

const VALID_SLOTS = new Set(BUNDLES.flatMap(b => b.items.map((_, i) => slotKey(b.id, i))));

// ---------- Robin's Community Upgrades (after the Community Center) ----------
const fmtG = n => `${n.toLocaleString(isEn ? 'en-US' : 'vi-VN')}g`;
function upgradeState(u, c) {
  if (!c) return null;
  if (c[u.id]) return ['tag--green', t('Đã xây xong')];
  const prev = u.after && !c[u.after];
  if (c.daysLeft > 0 && !prev && (u.id === 'pam' ? true : c.pam)) return ['tag--gold', `${t('Robin đang xây')} · ${t(`Còn ${c.daysLeft} ngày`)}`];
  if (prev) return ['', t('Cần xong lần 1 trước')];
  const ready = c.cc && c.houseLevel >= 3;
  return [ready ? 'tag--gold' : '', ready ? t('Mua được ở chỗ Robin') : t('Chưa đủ điều kiện')];
}
function upgradesHtml(find) {
  const d = loadJSON(KEYS.journal, null), c = d?.community;
  const tx = (x, f) => (isEn ? x[`${f}En`] : x[f]);
  const need = c ? `
    <ul class="cc-upgrade__needs">
      <li class="${c.cc ? 'is-ok' : ''}">${ico(c.cc ? 'check' : 'warn')} ${t('Hoàn thành Nhà Cộng Đồng hoặc dự án Joja')}</li>
      <li class="${c.houseLevel >= 3 ? 'is-ok' : ''}">${ico(c.houseLevel >= 3 ? 'check' : 'warn')} ${t('Nhà nâng cấp tối đa')}: ${t('cấp')} ${c.houseLevel}/3</li>
    </ul>` : `<p class="muted">${ico('save')} ${t('Nạp file save để xem bạn đã đủ điều kiện và đã xây chưa.')} ${saveTabLink('Nạp file save', 'link-btn')}</p>`;
  return `
    <section class="cc-upgrades">
      <h2 class="cc-upgrades__title">${ico('farm')} ${t('Nâng cấp Cộng đồng (Robin)')}</h2>
      <p>${tx(COMMUNITY_NEEDS, 'text')}</p>
      ${need}
      ${COMMUNITY_UPGRADES.map(u => {
        const st = upgradeState(u, c);
        return `
        <article class="cc-upgrade ${c?.[u.id] ? 'is-done' : ''}">
          <header class="cc-upgrade__head"><h3>${tx(u, 'name')}</h3>${st ? `<span class="tag ${st[0]}">${st[1]}</span>` : ''}</header>
          <div class="cc-upgrade__cost">
            <span class="tag">${ico('money')} <strong>${fmtG(u.gold)}</strong></span>
            ${u.items.map(([en, n]) => {
              const have = find ? ownedTotal(find({ nameEn: en })) : null;
              return itemTag(en, ` × ${n.toLocaleString(isEn ? 'en-US' : 'vi-VN')}${have !== null ? ` <span class="tag ${have >= n ? 'tag--green' : 'tag--gold'}" title="${t('Đang có / cần')}">${have}/${n}</span>` : ''}`);
            }).join('')}
            <span class="tag">${ico('hourglass')} ${t(`${u.days} ngày`)}</span>
          </div>
          <p><strong>${t('Công trình được nâng cấp')}:</strong> ${tx(u, 'builds')}</p>
          ${u.shortcuts ? `<ol class="cc-upgrade__list">${u.shortcuts.map(x => `<li>${isEn ? x[1] : x[0]}${x[2] ? `
            <div class="cc-upgrade__pair"><figure><img src="assets/community/${x[2]}_before.png" alt="" class="pixel-img" loading="lazy"><figcaption>${t('Trước')}</figcaption></figure>
              <figure><img src="assets/community/${x[2]}_after.png" alt="" class="pixel-img" loading="lazy"><figcaption>${t('Sau')}</figcaption></figure></div>` : ''}</li>`).join('')}</ol>` : ''}
          ${u.pics ? `<div class="cc-upgrade__pics">${u.pics.map(([src, vi, en]) => `<figure><img src="${src}" alt="" class="pixel-img" loading="lazy"><figcaption>${isEn ? en : vi}</figcaption></figure>`).join('')}</div>` : ''}
          <ul class="cc-upgrade__notes">${u.notes.map(x => `<li>${isEn ? x[1] : x[0]}</li>`).join('')}</ul>
        </article>`;
      }).join('')}
      <p class="muted">${t("Nguồn và ảnh: Official Stardew Valley Wiki (Carpenter's Shop, Trailer).")}</p>
    </section>`;
}

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
// ITEMS ALREADY OWNED (from the last save)
// ==========================================
function ownedHtml(b, find) {
  const rows = b.items
    .map((item, idx) => ({ item, spots: bundleProgress.done.has(slotKey(b.id, idx)) ? [] : find(item) }))
    .filter(r => r.spots.length);
  if (!rows.length) return '';
  return `
    <div class="owned-box">
      <div class="owned-box__title">${ico('chest')} Đã có trong túi &amp; rương (theo file save):</div>
      <ul>
        ${rows.map(({ item, spots }) => ownedRow(item, spots, item.count)).join('')}
      </ul>
    </div>`;
}

// ==========================================
// BRANCH MAP
// ==========================================
function treeHtml(selected) {
  const t = bundleProgress.totals();
  return `
    <div class="cc-tree">
      <div class="cc-root">
        <span class="cc-root__icon" aria-hidden="true">${ico('junimo')}</span>
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
                <span class="cc-room__icon" aria-hidden="true">${ico(room.icon)}</span>
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
function slotHtml(b, item, idx, query, find) {
  const done = bundleProgress.done.has(slotKey(b.id, idx));
  const have = !done && find ? ownedTotal(find(item)) : 0;
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
        ${have ? `<span class="slot__have ${have >= item.count ? 'is-enough' : ''}" title="Đang có ${have} trong túi/rương">${ico('chest')}</span>` : ''}
        <span class="slot__tick" aria-hidden="true">✓</span>
      </span>
      <span class="slot__name">${item.name}</span>
      ${item.source ? `<span class="slot__source">${item.source}</span>` : ''}
    </button>`;
}

function bundleCard(b, query, find) {
  const done = bundleProgress.doneCount(b);
  const complete = done >= b.required;
  const optional = b.items.length > b.required;
  return `
    <article class="bundle ${complete ? 'is-done' : ''}" id="bundle-${b.id}">
      <header class="bundle__head">
        ${bagSvg(b.color)}
        <div class="bundle__titles">
          <h3 class="bundle__title">${b.name}</h3>
          <div class="muted">${altName(b)}</div>
        </div>
        <div class="bundle__progress">
          <span class="badge ${complete ? 'badge--green' : 'badge--gold'}">${complete ? '✓ Hoàn thành' : `${done}/${b.required}`}</span>
          ${optional ? `<span class="muted">Chọn ${b.required} trong ${b.items.length} món</span>` : ''}
        </div>
      </header>
      <div class="bundle__slots">
        ${b.items.map((item, idx) => slotHtml(b, item, idx, query, find)).join('')}
      </div>
      ${find && !complete ? ownedHtml(b, find) : ''}
      ${b.reward ? `
        <footer class="bundle__reward">
          <span class="bundle__reward-label">${ico('gift')} Phần thưởng:</span>
          ${b.reward.icon ? `<span class="ing-icon"><img src="${b.reward.icon}" alt="" class="pixel-img" data-fallback="hide" loading="lazy"></span>` : ''}
          <span>${b.reward.name}${b.reward.count > 1 ? ` x${b.reward.count}` : ''}</span>
        </footer>` : ''}
    </article>`;
}

function roomHeader(room) {
  const done = bundleProgress.isRoomDone(room);
  return `
    <header class="room-head ${done ? 'is-done' : ''}">
      <h3 class="room-head__title">${ico(room.icon)} ${room.name} <small class="muted">${altName(room)}</small></h3>
      <div class="room-head__reward">${pixelIcon(done ? 'check' : 'lock')} <strong>Hoàn thành phòng:</strong> ${room.reward}</div>
    </header>`;
}

const bundlesTab = {
  id: 'bundles',
  search: true,
  toggles: ['unfinished'],

  init() {
    document.getElementById('bundleRoomChips').innerHTML = `
      <button class="chip" type="button" data-action="filter" data-value="all">Tất Cả Phòng</button>
      ${CC_ROOMS.map(r => `<button class="chip" type="button" data-action="filter" data-value="${r.id}">${ico(r.icon)} ${r.name}</button>`).join('')}`;
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
    const find = ownedFinder();
    const html = rooms.map(room => {
      const bundles = room.bundles
        .filter(b => !app.toggles.unfinished || !bundleProgress.isBundleDone(b))
        .filter(b => !q || matches(q, b.name, b.nameEn, b.items.flatMap(i => [i.name, i.nameEn, i.source])))
        .map(b => bundleCard({ ...b, roomId: room.id }, q, find));
      if (!bundles.length) return '';
      return `<section class="room">${roomHeader(room)}<div class="bundle-grid">${bundles.join('')}</div></section>`;
    }).join('');

    const hint = find ? '' : `<p class="muted cc-owned-hint">${ico('chest')} Nạp file save để xem món nào chưa nộp đã có sẵn trong túi đồ hay rương, và nằm ở đâu. ${saveTabLink('Nạp file save', 'btn btn--green btn--sm')}</p>`;
    document.getElementById('ccRooms').innerHTML = hint + (html
      || emptyState('bundles', 'Không có gói nào khớp!', 'Thử từ khóa khác hoặc tắt bộ lọc "Chưa Hoàn Thành".'));
    document.getElementById('ccUpgrades').innerHTML = q ? '' : upgradesHtml(find);
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
      if (!wasDone && bundleProgress.isBundleDone(b)) app.showToast(`${ico('bundles')} Hoàn thành ${b.name}!`);
    }
  }
};

export default bundlesTab;
