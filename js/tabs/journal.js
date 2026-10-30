// ==========================================================================
// TAB: SỔ TAY NÔNG TRẠI (FARM JOURNAL)
// What the last save file says about the player's world, read-only:
// friendships and gifts on hand, items in the backpack and chests, machines,
// growing crops, farm animals, Marlon's monster goals and Perfection.
// Only things the player has already seen in game are shown; hints that
// could spoil (where the missing Stardrops are) stay behind a toggle.
// ==========================================================================

import { NPCS_DATA } from '../../data/npcs-data.js';
import { ITEMS_DATA } from '../../data/items-data.js';
import { RECIPES_DATA } from '../../data/recipes-data.js';
import { FARM_ITEMS } from '../../data/farm-data.js';
import { MONSTER_GOALS, PERFECTION, STARDROPS } from '../../data/journal-data.js';
import { ico } from '../lib/icons.js';
import { t, nm, isEn } from '../lib/i18n.js';
import { loadJSON, KEYS } from '../lib/storage.js';
import { matches } from '../lib/templates.js';
import { focusFarmTiles } from './farm.js';
import { OBJECT_NAMES } from '../../data/item-ids.js';

const SECTIONS = [
  { id: 'friends', name: 'Tình bạn', icon: 'loved' },
  { id: 'storage', name: 'Túi & Rương', icon: 'chest' },
  { id: 'machines', name: 'Máy móc', icon: 'keg' },
  { id: 'crops', name: 'Mùa vụ', icon: 'crops' },
  { id: 'animals', name: 'Vật nuôi', icon: 'animal' },
  { id: 'monsters', name: 'Diệt quái', icon: 'skull' },
  { id: 'perfection', name: 'Hoàn Hảo', icon: 'tracker' }
];
const SEASONS = ['spring', 'summer', 'fall', 'winter'];
const SEASON_WORD = { spring: 'Xuân', summer: 'Hạ', fall: 'Thu', winter: 'Đông' };

const ui = { section: 'friends', friendFilter: 'all', search: '', hints: false };

// ---------- names & icons for the game's English names ----------
const byEn = new Map();
for (const x of [...FARM_ITEMS, ...RECIPES_DATA, ...ITEMS_DATA]) if (x.nameEn && !byEn.has(x.nameEn.toLowerCase())) byEn.set(x.nameEn.toLowerCase(), x);
const clean = s => String(s || '').replace(/\s*\([^)]*\)\s*$/, '');
// "Egg (White)" -> Egg, "Large Egg (Brown)" -> Large Egg...
const info = en => { const s = String(en).toLowerCase(), base = s.replace(/\s*\(.*\)$/, ''); return byEn.get(s) || byEn.get(base) || byEn.get(base.replace(/^(large |big )/, '')); };
const itemName = en => { const x = info(en); return x ? (isEn ? x.nameEn : clean(x.name)) : en; };
const itemIcon = en => { const x = info(en); return x?.imageUrl || x?.icon || x?.sprite || 'assets/pixel-box.svg'; };
const img = (src, cls = '') => `<img src="${src}" alt="" class="pixel-img ${cls}" loading="lazy" data-fallback="hide">`;

const PLACE = { Farm: 'Nông trại', FarmHouse: 'Nhà chính', Greenhouse: 'Nhà kính', Cellar: 'Hầm rượu', IslandWest: 'Nông trại Đảo Gừng',
  IslandNorth: 'Bắc Đảo Gừng', IslandSouth: 'Nam Đảo Gừng', IslandEast: 'Đông Đảo Gừng', IslandSouthEast: 'Đông Nam Đảo Gừng',
  IslandFarmHouse: 'Nhà trên Đảo Gừng', Cabin: 'Nhà nhỏ', backpack: 'Túi đồ' };
const place = s => {
  const label = PLACE[s.label] || PLACE[s.where] || itemName(s.label || s.where);
  return s.parent && s.parent !== 'Farm' ? `${label} (${PLACE[s.parent] || s.parent})` : label;
};
const ANIMALS = { 'White Chicken': 'Gà trắng', 'Brown Chicken': 'Gà nâu', 'Blue Chicken': 'Gà xanh', 'Void Chicken': 'Gà Hư không', 'Golden Chicken': 'Gà Vàng',
  Duck: 'Vịt', Rabbit: 'Thỏ', Dinosaur: 'Khủng long', 'White Cow': 'Bò trắng', 'Brown Cow': 'Bò nâu', Goat: 'Dê', Sheep: 'Cừu', Pig: 'Heo', Ostrich: 'Đà điểu' };

function data() { return loadJSON(KEYS.journal, null); }

// Everything the player owns, by English name: [{ total, places: [{ s, stack }] }]
function inventory(d) {
  const map = new Map();
  for (const s of d.storage) for (const it of s.items) {
    const k = it.name.toLowerCase();
    const e = map.get(k) || { name: it.name, total: 0, places: [] };
    e.total += it.stack;
    e.places.push({ s, stack: it.stack, quality: it.quality });
    map.set(k, e);
  }
  return map;
}

// ---------- sections ----------
function friendsHtml(d) {
  const owned = inventory(d);
  const day = d.day || { season: 'spring', day: 1 };
  const rows = NPCS_DATA.map(npc => {
    const key = npc.nameEn === 'Wizard (M. Rasmodius)' ? 'Wizard' : npc.nameEn === 'Mayor Lewis' ? 'Lewis' : npc.nameEn;
    return { npc, f: d.friends[key] || d.friends[npc.nameEn] };
  }).filter(r => r.f);
  let list = rows;
  if (ui.friendFilter === 'gifts') list = rows.filter(r => r.f.giftsWeek < 2 && r.f.status !== 'Married');
  if (ui.friendFilter === 'talk') list = rows.filter(r => !r.f.talked);
  list.sort((a, b) => b.f.points - a.f.points);
  const filter = (id, label) => `<button class="chip ${ui.friendFilter === id ? 'is-active' : ''}" type="button" data-action="journal-friends" data-filter="${id}">${t(label)}</button>`;
  return `
    <div class="journal-filters">${filter('all', 'Tất cả')}${filter('gifts', 'Chưa tặng đủ quà tuần này')}${filter('talk', 'Chưa nói chuyện hôm nay')}</div>
    <p class="muted">${t('Theo thời điểm lưu game. Mỗi tuần tặng tối đa 2 món (không tính sinh nhật). Quà gợi ý là những món họ rất thích mà bạn đang có trong túi hoặc rương.')}</p>
    <div class="journal-grid">
      ${list.map(({ npc, f }) => {
        const max = f.status === 'Married' ? 14 : 10;
        const hearts = Math.min(max, Math.floor(f.points / 250));
        const loved = (npc.gifts?.loved || []).map(g => ({ g, en: (g.name.match(/\(([^)]+)\)\s*$/) || [])[1] })).filter(x => x.en && owned.has(x.en.toLowerCase()));
        const bday = npc.birthday?.season === day.season && npc.birthday.day >= day.day && npc.birthday.day - day.day <= 7;
        return `
        <article class="journal-card friend-card">
          <header class="friend-card__head">
            ${img(npc.avatar, 'friend-card__face')}
            <div>
              <h3>${nm(npc)} ${f.status !== 'Friendly' ? `<span class="tag tag--red">${t({ Dating: 'Đang hẹn hò', Engaged: 'Đã đính hôn', Married: 'Đã kết hôn', Divorced: 'Đã ly hôn' }[f.status] || f.status)}</span>` : ''}</h3>
              <div class="hearts" title="${f.points} ${t('điểm')}">${Array.from({ length: max }, (_, i) => `<span class="${i < hearts ? 'is-on' : ''}"></span>`).join('')}</div>
            </div>
          </header>
          <p class="friend-card__row">${ico('gift')} ${t('Quà tuần này')}: <strong>${f.giftsWeek}/2</strong> · ${f.talked ? `${ico('check')} ${t('Đã nói chuyện')}` : `${ico('warn')} ${t('Chưa nói chuyện')}`}</p>
          ${bday ? `<p class="friend-card__row">${ico('birthday')} <strong>${npc.birthday.day === day.day ? t('Sinh nhật hôm nay!') : `${t('Sinh nhật ngày')} ${npc.birthday.day}`}</strong></p>` : ''}
          ${loved.length ? `<div class="friend-card__gifts"><span class="muted">${t('Có sẵn để tặng')}:</span> ${loved.slice(0, 6).map(x => `<span class="tag" title="${x.g.name}">${img(x.g.icon)} ${owned.get(x.en.toLowerCase()).total}</span>`).join('')}</div>` : ''}
        </article>`;
      }).join('') || `<p class="muted">${t('Không có ai khớp bộ lọc.')}</p>`}
    </div>`;
}

function storageHtml(d) {
  const inv = [...inventory(d).values()];
  const q = ui.search.trim();
  return `
    <label class="journal-search">${ico('search')}<input type="search" class="coop-input" data-journal-search value="${q.replace(/"/g, '&quot;')}" placeholder="${t('Tìm món trong túi và rương (VD: Gỗ, Đá Iridium, Hoa...)')}"></label>
    <p class="muted">${t('Đang có')} ${inv.length} ${t('loại đồ trong')} ${d.storage.filter(s => s.items.length).length} ${t('chỗ chứa')}. ${t('Bấm "Xem trên bản đồ" để thấy rương ở tab Nông Trại.')}</p>
    ${storageListHtml(d)}`;
}

function storageListHtml(d) {
  const inv = [...inventory(d).values()];
  const q = ui.search.trim();
  const hits = q ? inv.filter(e => matches(q.toLowerCase(), e.name, itemName(e.name))) : inv;
  hits.sort((a, b) => b.total - a.total);
  return `
    <div class="storage-list" id="storageList">
      ${hits.slice(0, 120).map(e => `
        <article class="storage-row">
          ${img(itemIcon(e.name), 'storage-row__icon')}
          <div class="storage-row__body">
            <strong>${itemName(e.name)}</strong> <span class="tag tag--gold">x${e.total.toLocaleString('vi-VN')}</span>
            <div class="storage-row__places">
              ${e.places.map(p => `<span class="tag">${ico(p.s.kind === 'backpack' ? 'guest' : p.s.kind === 'fridge' ? 'cooking' : 'chest')} ${t(place(p.s))}${p.s.x !== undefined && p.s.kind !== 'fridge' ? ` (${p.s.x}, ${p.s.y})` : ''} · ${p.stack}${p.quality ? ` (${t({ silver: 'bạc', gold: 'vàng', iridium: 'iridium' }[p.quality])})` : ''}
                ${p.s.where === 'Farm' && p.s.x !== undefined ? `<button class="link-btn" type="button" data-action="journal-map" data-x="${p.s.x}" data-y="${p.s.y}">${t('Xem trên bản đồ')}</button>` : ''}</span>`).join('')}
            </div>
          </div>
        </article>`).join('') || `<p class="muted">${t('Không tìm thấy món này trong túi hay rương.')}</p>`}
    </div>`;
}

const timeLeft = m => {
  if (m <= 0) return t('Đã xong');
  if (m < 60) return `${m} ${t('phút')}`;
  if (m < 1440) return `~${Math.round(m / 60)} ${t('giờ')}`;
  return `~${Math.round(m / 1440)} ${t('ngày')}`;
};

function machinesHtml(d) {
  if (!d.machines.length) return `<p class="muted">${t('Không có máy nào đang chạy lúc lưu game.')}</p>`;
  const groups = new Map();
  for (const m of d.machines) (groups.get(m.name) || groups.set(m.name, []).get(m.name)).push(m);
  const ready = d.machines.filter(m => m.ready || m.minutes <= 0).length;
  return `
    <p>${ico('check')} <strong>${ready}</strong> ${t('máy đã xong, chờ lấy sản phẩm')} · ${d.machines.length - ready} ${t('máy đang chạy')}. <span class="muted">${t('Thời gian còn lại tính theo giờ trong game.')}</span></p>
    <div class="journal-grid">
      ${[...groups].sort((a, b) => b[1].length - a[1].length).map(([name, list]) => `
        <article class="journal-card">
          <h3 class="journal-card__title">${img(itemIcon(name))} ${itemName(name)} <span class="tag">${list.length}</span></h3>
          <ul class="machine-list">
            ${list.sort((a, b) => a.minutes - b.minutes).slice(0, 30).map(m => `
              <li>${img(itemIcon(m.product))} ${itemName(m.product)}
                <span class="${m.ready || m.minutes <= 0 ? 'tag tag--green' : 'muted'}">${m.ready ? t('Đã xong') : timeLeft(m.minutes)}</span>
                <span class="muted">${t(place(m))}</span>
                ${m.where === 'Farm' ? `<button class="link-btn" type="button" data-action="journal-map" data-x="${m.x}" data-y="${m.y}">${t('Bản đồ')}</button>` : ''}</li>`).join('')}
          </ul>
        </article>`).join('')}
    </div>`;
}

function cropsHtml(d) {
  if (!d.crops.length) return `<p class="muted">${t('Không có cây trồng nào lúc lưu game.')}</p>`;
  const day = d.day || { season: 'spring', day: 1 };
  const left = 28 - day.day;
  const next = SEASON_WORD[SEASONS[(SEASONS.indexOf(day.season) + 1) % 4]];
  const groups = new Map();
  for (const c of d.crops) {
    const k = `${c.where}|${c.harvest}`;
    (groups.get(k) || groups.set(k, []).get(k)).push(c);
  }
  return `
    <p class="muted"><span>${t(`Còn ${left} ngày tới cuối mùa (theo ngày trong save).`)}</span> <span>${t('Nhà kính và Đảo Gừng không bị đổi mùa.')}</span></p>
    <div class="journal-grid">
      ${[...groups].map(([k, list]) => {
        const c0 = list[0];
        const en = OBJECT_NAMES[c0.harvest] || c0.harvest || '?';
        const it = info(en);
        const readyNow = list.filter(c => c.days === 0 && !c.dead).length;
        const dead = list.filter(c => c.dead).length;
        const dry = list.filter(c => !c.watered && !c.dead && c.days > 0).length;
        const soonest = Math.min(...list.filter(c => !c.dead).map(c => c.days));
        const outdoors = c0.where === 'Farm';
        const seasons = it?.season || '';
        const dies = outdoors && !seasons.includes(next) && seasons !== 'Quanh năm' && list.some(c => !c.dead && c.days > left);
        return `
        <article class="journal-card">
          <h3 class="journal-card__title">${img(itemIcon(en))} ${itemName(en)} <span class="tag">${list.length} ${t('ô')}</span></h3>
          <p class="muted">${t(place(c0))}</p>
          ${readyNow ? `<p>${ico('check')} <strong>${readyNow}</strong> ${t('ô thu hoạch được ngay')}</p>` : ''}
          ${Number.isFinite(soonest) && soonest > 0 ? `<p>${ico('clock')} ${t(`Sớm nhất còn ${soonest} ngày`)}</p>` : ''}
          ${dry ? `<p>${ico('rainy')} ${dry} ${t('ô chưa tưới')}</p>` : ''}
          ${dead ? `<p class="text-red">${ico('hated')} ${dead} ${t('ô cây đã chết')}</p>` : ''}
          ${dies ? `<p class="text-red">${ico('warn')} ${t('Một số cây không kịp thu hoạch trước khi hết mùa')}</p>` : ''}
        </article>`;
      }).join('')}
    </div>`;
}

function animalsHtml(d) {
  if (!d.animals.length) return `<p class="muted">${t('Chưa có vật nuôi nào trong save.')}</p>`;
  return `
    <div class="journal-grid">
      ${d.animals.sort((a, b) => a.where.localeCompare(b.where) || b.friendship - a.friendship).map(a => `
        <article class="journal-card animal-card">
          <h3 class="journal-card__title" data-no-i18n>${a.name}</h3>
          <p class="muted">${t(ANIMALS[a.type] || a.type)} · ${t(place({ label: a.where }))} · ${a.age} ${t('ngày tuổi')}</p>
          <div class="hearts hearts--5" title="${a.friendship}/1000">${Array.from({ length: 5 }, (_, i) => `<span class="${i < a.hearts ? 'is-on' : ''}"></span>`).join('')}</div>
          <div class="skill-bar" title="${t('Độ vui')}"><span style="width:${Math.round((a.happiness / 255) * 100)}%"></span></div>
          <p class="friend-card__row">${a.pet ? `${ico('check')} ${t('Đã vuốt ve hôm nay')}` : `${ico('warn')} ${t('Chưa vuốt ve hôm nay')}`}</p>
          ${a.produce ? `<p class="friend-card__row">${img(itemIcon(a.produce))} ${itemName(a.produce)}</p>` : ''}
        </article>`).join('')}
    </div>`;
}

function monstersHtml(d) {
  return `
    <p class="muted">${t('Mục tiêu trên tường Hội Mạo Hiểm Giả. Đạt đủ số lượng thì gặp Gil để nhận thưởng.')}</p>
    <div class="goal-list">
      ${MONSTER_GOALS.map(g => {
        const k = d.goals.find(x => x.id === g.id)?.killed || 0;
        const done = k >= g.goal;
        return `
        <div class="goal-row ${done ? 'is-done' : ''}">
          ${img(`assets/icons/${g.icon}.png`, 'goal-row__icon')}
          <div class="goal-row__body">
            <div class="goal-row__head"><strong>${nm(g)}</strong> <span>${Math.min(k, g.goal)}/${g.goal}</span></div>
            <div class="skill-bar"><span style="width:${Math.min(100, (k / g.goal) * 100)}%"></span></div>
            <p class="muted">${ico('gift')} ${isEn ? g.rewardEn : g.reward}${done ? ` · ${ico('check')} ${t('Hoàn thành')}` : ''}</p>
          </div>
        </div>`;
      }).join('')}
    </div>`;
}

function perfectionHtml(d) {
  const p = d.perfection;
  const rows = PERFECTION.map(c => {
    const have = Math.min(c.total, p[c.id] || 0);
    return { c, have, score: (have / c.total) * c.weight };
  });
  const total = rows.reduce((a, r) => a + r.score, 0);
  const missingDrops = STARDROPS.filter(s => !p.stardropFlags.includes(s.flag));
  return `
    <div class="perfection-total">
      <strong>${Math.floor(total)}%</strong>
      <div class="skill-bar skill-bar--mastery"><span style="width:${total}%"></span></div>
      <p class="muted">${t('Tính như tượng Theo Dõi Hoàn Hảo trong Phòng Óc Chó của Ông Qi (người chơi chính). Phần đồ đã giao bán là ước tính.')}</p>
    </div>
    <div class="goal-list">
      ${rows.map(({ c, have, score }) => `
        <div class="goal-row ${have >= c.total ? 'is-done' : ''}">
          <div class="goal-row__body">
            <div class="goal-row__head"><strong>${nm(c)}</strong> <span>${have}/${c.total} · ${score.toFixed(1)}/${c.weight}%</span></div>
            <div class="skill-bar"><span style="width:${(have / c.total) * 100}%"></span></div>
          </div>
        </div>`).join('')}
    </div>
    <h3 class="journal-sub">${ico('tracker')} Stardrop: ${p.stardrops}/7</h3>
    ${missingDrops.length ? `
      <label class="toggle"><input type="checkbox" class="px-check" data-action="journal-hints" ${ui.hints ? 'checked' : ''}> <span>${t('Hiện gợi ý nơi tìm Stardrop còn thiếu')}</span></label>
      ${ui.hints ? `<ul class="journal-hints">${missingDrops.map(s => `<li>${ico('sparkle')} ${nm(s)}</li>`).join('')}</ul>` : ''}` : `<p>${ico('check')} ${t('Đã tìm đủ 7 Stardrop!')}</p>`}`;
}

const RENDER = { friends: friendsHtml, storage: storageHtml, machines: machinesHtml, crops: cropsHtml, animals: animalsHtml, monsters: monstersHtml, perfection: perfectionHtml };

function render() {
  const el = document.getElementById('journalBoard');
  if (!el) return;
  const d = data();
  if (!d) {
    el.innerHTML = `
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${ico('save')}</div>
        <h3>${t('Chưa có dữ liệu từ file save')}</h3>
        <p>${t('Nạp file save một lần ở tab Tiến Độ để xem tình bạn, đồ trong rương, máy móc, mùa vụ, vật nuôi, mục tiêu diệt quái và Hoàn Hảo.')}</p>
        <button class="btn btn--green" type="button" data-action="import-save-progress">${ico('upload')} ${t('Nạp file save')}</button>
      </div>`;
    return;
  }
  el.innerHTML = `
    <p class="muted journal-meta">${t('Nông trại')} <strong data-no-i18n>${d.farmName || '?'}</strong> · ${t('cập nhật')} ${new Date(d.at).toLocaleString('vi-VN')}
      <button class="link-btn" type="button" data-action="import-save-progress">${t('Nạp lại file save')}</button></p>
    <div class="journal-tabs">
      ${SECTIONS.map(s => `<button class="chip ${ui.section === s.id ? 'is-active' : ''}" type="button" data-action="journal-section" data-section="${s.id}">${ico(s.icon)} ${t(s.name)}</button>`).join('')}
    </div>
    <div class="journal-body" id="journalBody">${RENDER[ui.section](d)}</div>`;
}

let searchTimer = null;

// Live search while typing (the app's delegate only reacts to `change` on text fields)
function onSearch(e) {
  if (!e.target.matches?.('[data-journal-search]')) return;
  ui.search = e.target.value;
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    const list = document.getElementById('storageList');
    const d = data();
    if (list && d) list.outerHTML = storageListHtml(d);
  }, 150);
}

export default {
  id: 'journal',
  toggles: [],
  init() { document.addEventListener('input', onSearch); },
  render,
  actions: {
    'journal-section': (app, el) => { ui.section = el.dataset.section; render(); },
    'journal-friends': (app, el) => { ui.friendFilter = el.dataset.filter; render(); },
    'journal-hints': (app, el) => { ui.hints = el.checked; render(); },
    'journal-map': (app, el) => {
      app.switchTab('farm');
      focusFarmTiles([{ x: Number(el.dataset.x), y: Number(el.dataset.y) }]);
    }
  }
};
