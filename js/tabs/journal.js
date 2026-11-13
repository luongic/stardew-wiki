// ==========================================================================
// TAB: SỔ TAY NÔNG TRẠI (FARM JOURNAL)
// What the last save file says about the player's world, read-only:
// friendships and gifts on hand, quests, items in the backpack and chests,
// machines, growing crops, farm animals, collections, stats, Marlon's monster
// goals and Perfection. In co-op the personal parts switch between players.
// Only things the player has already seen in game are shown; hints that
// could spoil (where the missing Stardrops are) stay behind a toggle.
// ==========================================================================

import { NPCS_DATA } from '../../data/npcs-data.js';
import { ITEMS_DATA } from '../../data/items-data.js';
import { RECIPES_DATA } from '../../data/recipes-data.js';
import { FARM_ITEMS } from '../../data/farm-data.js';
import { MONSTER_GOALS, PERFECTION, STARDROPS, STAT_GROUPS, RARECROWS, WALLET } from '../../data/journal-data.js';
import { dateLabel } from '../predict/core.js';
import { QUEST_INFO, ACHIEVEMENTS } from '../../data/save-data.js';
import { MUSEUM_ITEMS } from '../../data/museum-data.js';
import { ico } from '../lib/icons.js';
import { t, nm, isEn } from '../lib/i18n.js';
import { loadJSON, KEYS } from '../lib/storage.js';
import { matches } from '../lib/templates.js';
import { focusFarmTiles } from './farm.js';
import { OBJECT_NAMES } from '../../data/item-ids.js';
import { itemTag, itemInfo } from '../lib/item-lookup.js';
import { isStale, staleNotice } from '../lib/journal-schema.js';
import { saveTabLink } from './save.js';

const SECTIONS = [
  { id: 'friends', name: 'Tình bạn', icon: 'loved' },
  { id: 'events', name: 'Sự kiện tim', icon: 'x_bouquet' },
  { id: 'quests', name: 'Nhiệm vụ', icon: 'quests' },
  { id: 'orders', name: 'Đơn hàng đặc biệt', icon: 'specialOrders' },
  { id: 'storage', name: 'Túi & Rương', icon: 'chest' },
  { id: 'machines', name: 'Máy móc', icon: 'keg' },
  { id: 'crops', name: 'Mùa vụ', icon: 'crops' },
  { id: 'animals', name: 'Vật nuôi', icon: 'animal' },
  { id: 'collection', name: 'Bộ sưu tập', icon: 'museum' },
  { id: 'wallet', name: 'Ví đặc biệt', icon: 'rusty_key' },
  { id: 'island', name: 'Đảo Gừng', icon: 'golden_walnut' },
  { id: 'grandpa', name: 'Ông nội', icon: 'x_statue_of_perfection' },
  { id: 'stats', name: 'Thống kê', icon: 'steps' },
  { id: 'monsters', name: 'Diệt quái', icon: 'skull' },
  { id: 'perfection', name: 'Hoàn Hảo', icon: 'tracker' }
];
const SEASONS = ['spring', 'summer', 'fall', 'winter'];
const SEASON_WORD = { spring: 'Xuân', summer: 'Hạ', fall: 'Thu', winter: 'Đông' };

const ui = { section: 'friends', friendFilter: 'all', eventFilter: 'all', search: '', hints: false, walnutHints: false, player: 0 };

// ---------- names & icons for the game's English names ----------
const byEn = new Map();
for (const x of [...FARM_ITEMS, ...RECIPES_DATA, ...ITEMS_DATA]) if (x.nameEn && !byEn.has(x.nameEn.toLowerCase())) byEn.set(x.nameEn.toLowerCase(), x);
const clean = s => String(s || '').replace(/\s*\([^)]*\)\s*$/, '');
// "Egg (White)" -> Egg, "Large Egg (Brown)" -> Large Egg...
const info = en => { const s = String(en).toLowerCase(), base = s.replace(/\s*\(.*\)$/, ''); return byEn.get(s) || byEn.get(base) || byEn.get(base.replace(/^(large |big )/, '')); };
const itemName = en => { const x = info(en); return x ? (isEn ? x.nameEn : clean(x.name)) : en; };
const itemIcon = en => { const x = info(en); return x?.imageUrl || x?.icon || x?.sprite || 'assets/pixel-box.svg'; };
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const img = (src, cls = '') => `<img src="${src}" alt="" class="pixel-img ${cls}" loading="lazy" data-fallback="hide">`;

const PLACE = { Farm: 'Nông trại', FarmHouse: 'Nhà chính', Greenhouse: 'Nhà kính', Cellar: 'Hầm rượu', IslandWest: 'Nông trại Đảo Gừng',
  IslandNorth: 'Bắc Đảo Gừng', IslandSouth: 'Nam Đảo Gừng', IslandEast: 'Đông Đảo Gừng', IslandSouthEast: 'Đông Nam Đảo Gừng',
  IslandFarmHouse: 'Nhà trên Đảo Gừng', Cabin: 'Nhà nhỏ', backpack: 'Túi đồ' };
const place = s => {
  if (s.kind === 'backpack' && s.owner) return `${t('Túi của')} ${s.owner}`;
  const label = PLACE[s.label] || PLACE[s.where] || itemName(s.label || s.where);
  return s.parent && s.parent !== 'Farm' ? `${label} (${PLACE[s.parent] || s.parent})` : label;
};
// Farm animal pictures and the days a baby needs to grow up (Data/FarmAnimals)
const ANIMAL_ART = { 'White Chicken': 3, 'Brown Chicken': 3, 'Blue Chicken': 3, 'Void Chicken': 3, 'Golden Chicken': 3, Duck: 5, Rabbit: 6, Dinosaur: 0,
  'White Cow': 5, 'Brown Cow': 5, Goat: 5, Sheep: 4, Pig: 10, Ostrich: 7 };
const animalImg = type => `assets/icons/animal_${type.toLowerCase().replace(/ /g, '_')}.png`;

const ANIMALS = { 'White Chicken': 'Gà trắng', 'Brown Chicken': 'Gà nâu', 'Blue Chicken': 'Gà xanh', 'Void Chicken': 'Gà Hư không', 'Golden Chicken': 'Gà Vàng',
  Duck: 'Vịt', Rabbit: 'Thỏ', Dinosaur: 'Khủng long', 'White Cow': 'Bò trắng', 'Brown Cow': 'Bò nâu', Goat: 'Dê', Sheep: 'Cừu', Pig: 'Heo', Ostrich: 'Đà điểu' };

function data() { return loadJSON(KEYS.journal, null); }

// Players of the save (snapshots from before co-op support hold only the host)
const playersOf = d => d.players?.length ? d.players
  : [{ name: '', friends: d.friends || {}, goals: d.goals || [], quests: null }];
const me = d => { const ps = playersOf(d); return ps[Math.min(ui.player, ps.length - 1)]; };
// Every backpack, chest, fridge and grabber of the save
const containers = d => [...(d.players || []).map(p => ({ ...p.backpack, owner: d.players.length > 1 ? p.name : '' })), ...d.storage];
// The same containers, each with a spot a player can walk to. The game has no
// chest numbers, so chests are numbered per place, row by row from the
// top-left, next to their tile (used by the Community Center tab).
export function labeledContainers(d) {
  if (!d?.storage) return [];
  const no = new Map(), byPlace = new Map();
  for (const s of d.storage) if (s.kind === 'chest') (byPlace.get(s.where) || byPlace.set(s.where, []).get(s.where)).push(s);
  for (const list of byPlace.values()) list.sort((a, b) => a.y - b.y || a.x - b.x).forEach((s, i) => no.set(s, i + 1));
  const tile = s => s.x !== undefined ? ` (${s.x}, ${s.y})` : '';
  const spot = s => s.kind === 'backpack' ? t(place(s))
    : s.kind === 'fridge' || /fridge/i.test(s.name) ? `${t('Tủ lạnh')} · ${t(place(s))}`
    : s.kind === 'grabber' ? `${t('Máy Gom Tự Động')} · ${t(place(s))}${tile(s)}`
    : `${t('Rương')} #${no.get(s)} · ${t(place(s))}${tile(s)}`;
  return containers(d).map(s => ({ ...s, spot: spot(s) }));
}
const reloadHint = () => `<p class="muted">${ico('upload')} ${t('Nạp lại file save ở tab File Save để xem mục này.')}</p>`;

// Everything the farm owns, by English name: [{ total, places: [{ s, stack }] }]
export function inventory(d) {
  const map = new Map();
  for (const s of containers(d)) for (const it of s.items) {
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
  const friends = me(d).friends;
  const rows = NPCS_DATA.map(npc => {
    const key = npc.nameEn === 'Wizard (M. Rasmodius)' ? 'Wizard' : npc.nameEn === 'Mayor Lewis' ? 'Lewis' : npc.nameEn;
    return { npc, f: friends[key] || friends[npc.nameEn] };
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
    <p class="muted">${t('Đang có')} ${inv.length} ${t('loại đồ trong')} ${containers(d).filter(s => s.items.length).length} ${t('chỗ chứa')}. ${t('Bấm "Xem trên bản đồ" để thấy rương ở tab Nông Trại.')}</p>
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
  if (!d.animals.length) return `<p class="muted">${t('Chưa có vật nuôi nào trong save.')}</p>${fishPondsHtml(d)}`;
  return `
    <div class="journal-grid">
      ${d.animals.sort((a, b) => a.where.localeCompare(b.where) || b.friendship - a.friendship).map(a => `
        <article class="journal-card animal-card">
          ${a.type in ANIMAL_ART ? (() => {
            const left = ANIMAL_ART[a.type] - a.age;
            return `<div class="animal-card__art ${left > 0 ? 'is-baby' : ''}"><img src="${animalImg(a.type)}" alt="" class="pixel-img" loading="lazy" data-fallback="hide"></div>
              ${left > 0 ? `<span class="tag animal-card__baby">${t(`Con non, còn ${left} ngày nữa trưởng thành`)}</span>` : ''}`;
          })() : ''}
          <h3 class="journal-card__title" data-no-i18n>${a.name}</h3>
          <p class="muted">${t(ANIMALS[a.type] || a.type)} · ${t(place({ label: a.where }))} · ${a.age} ${t('ngày tuổi')}</p>
          <div class="hearts hearts--5" title="${a.friendship}/1000">${Array.from({ length: 5 }, (_, i) => `<span class="${i < a.hearts ? 'is-on' : ''}"></span>`).join('')}</div>
          <div class="skill-bar" title="${t('Độ vui')}"><span style="width:${Math.round((a.happiness / 255) * 100)}%"></span></div>
          <p class="friend-card__row">${a.pet ? `${ico('check')} ${t('Đã vuốt ve hôm nay')}` : `${ico('warn')} ${t('Chưa vuốt ve hôm nay')}`}</p>
          ${a.produce ? `<p class="friend-card__row">${img(itemIcon(a.produce))} ${itemName(a.produce)}</p>` : ''}
        </article>`).join('')}
    </div>
    ${fishPondsHtml(d)}`;
}

// Fish ponds: how full each is and what the next population quest asks for
function fishPondsHtml(d) {
  if (!d.fishPonds) return '';
  return `
    <h3 class="journal-sub">${ico('bldg_fish_pond')} ${t('Bể nuôi cá')}: ${d.fishPonds.length}</h3>
    ${d.fishPonds.length ? `<div class="journal-grid">
      ${d.fishPonds.map(p => {
        const fish = OBJECT_NAMES[p.fish] || p.fish;
        return `
        <article class="journal-card pond-card">
          <h3 class="journal-card__title">${itemTag(fish)}</h3>
          <p class="goal-row__head"><span>${t('Số cá')}</span> <strong>${p.count}/${p.max}</strong></p>
          ${bar(p.count, Math.max(1, p.max))}
          ${p.asked ? `<p class="friend-card__row">${ico('quests')} ${t('Cá muốn')}: ${itemTag(p.need, ` ×${p.needCount}`)} <span class="muted">${t('để bể chứa thêm cá')}</span></p>` : ''}
          ${!p.asked && p.count >= p.max && p.max >= 10 ? `<p class="friend-card__row">${ico('check')} ${t('Bể đã đầy tối đa')}</p>` : ''}
          ${p.output ? `<p class="friend-card__row">${ico('gift')} ${t('Có sản phẩm để lấy')}: ${itemTag(p.output, p.outputStack > 1 ? ` ×${p.outputStack}` : '')}</p>` : ''}
          <button class="link-btn" type="button" data-action="journal-map" data-x="${p.x + 2}" data-y="${p.y + 2}">${ico('map')} ${t('Xem trên bản đồ nông trại')}</button>
        </article>`;
      }).join('')}
    </div>` : `<p class="muted">${t('Chưa có bể nuôi cá nào. Robin xây Bể nuôi cá với 5.000g, 200 Đá, 5 Rong biển và 5 Tảo xanh.')}</p>`}`;
}

// Reward of a monster goal: the item (icon, opens its popup) or Marlon's phone number
const rewardHtml = g => g.id === 'magma'
  ? `<span class="item-tag"><img src="assets/icons/x_telephone.png" alt="" class="pixel-img">${isEn ? g.rewardEn : g.reward}</span>`
  : itemTag(g.rewardEn);

function monstersHtml(d) {
  return `
    <p class="muted">${t('Mục tiêu trên tường Hội Mạo Hiểm Giả. Đạt đủ số lượng thì gặp Gil để nhận thưởng.')}</p>
    <div class="goal-list">
      ${MONSTER_GOALS.map(g => {
        const k = me(d).goals.find(x => x.id === g.id)?.killed || 0;
        const done = k >= g.goal;
        return `
        <div class="goal-row ${done ? 'is-done' : ''}">
          ${img(`assets/icons/${g.icon}.png`, 'goal-row__icon')}
          <div class="goal-row__body">
            <div class="goal-row__head"><strong>${nm(g)}</strong> <span>${Math.min(k, g.goal)}/${g.goal}</span></div>
            <div class="skill-bar"><span style="width:${Math.min(100, (k / g.goal) * 100)}%"></span></div>
            <p class="goal-row__reward">${ico('gift')} ${rewardHtml(g)}${done ? ` · ${ico('check')} ${t('Hoàn thành')}` : ''}</p>
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
      <p class="muted">${t('Tính như tượng Theo Dõi Hoàn Hảo trong Phòng Óc Chó của Ông Qi. Phần đồ đã giao bán là ước tính.')}${(d.players?.length || 0) > 1 ? ` ${t('Chơi chung: mỗi mục lấy người chơi cao nhất.')}` : ''}</p>
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

// ---------- Quests ----------
const QUEST_TYPES = { ItemDelivery: 'Giao hàng', SlayMonster: 'Diệt quái', Fishing: 'Câu cá', ResourceCollection: 'Thu thập', Socialize: 'Giao lưu',
  Crafting: 'Chế tạo', LostItem: 'Tìm đồ thất lạc', Building: 'Xây dựng', ItemHarvest: 'Thu hoạch', Location: 'Khám phá', Basic: 'Nhiệm vụ' };
const npcOf = en => NPCS_DATA.find(n => n.nameEn === en || n.nameEn === `Mayor ${en}` || (en === 'Wizard' && n.nameEn.startsWith('Wizard')));

function questsHtml(d) {
  const list = me(d).quests;
  if (!list) return reloadHint();
  if (!list.length) return `<p class="muted">${t('Nhật ký nhiệm vụ đang trống.')}</p>`;
  return `
    <p class="muted">${t('Nhật ký nhiệm vụ lúc lưu game. Nhiệm vụ có hướng dẫn trên trang thì bấm để xem cách làm.')}</p>
    <div class="journal-grid">
      ${list.map(q => {
        const info = QUEST_INFO[q.id];
        const title = (isEn ? info?.nameEn : info?.name) || q.title || t(QUEST_TYPES[q.type] || 'Nhiệm vụ');
        const goal = isEn ? '' : (q.goal || info?.goal || '');
        const npc = q.npc && npcOf(q.npc);
        return `
        <article class="journal-card quest-card ${q.done ? 'is-done' : ''}">
          <h3 class="journal-card__title">${npc ? img(npc.avatar, 'friend-card__face') : ico('quests')} <span${info ? '' : ' data-no-i18n'}>${title}</span></h3>
          ${goal.length > 2 ? `<p data-no-i18n>${goal}</p>` : ''}
          <p class="friend-card__row">
            ${q.done ? `<span class="tag tag--green">${ico('check')} ${t('Đã hoàn thành')}</span>` : ''}
            ${q.money ? `<span class="tag tag--gold">${ico('money')} ${q.money.toLocaleString('vi-VN')}g</span>` : ''}
            ${q.daysLeft > 0 ? `<span class="tag">${ico('hourglass')} ${t(`Còn ${q.daysLeft} ngày`)}</span>` : ''}
            ${npc ? `<span class="tag">${ico('giver')} ${nm(npc)}</span>` : ''}
          </p>
          ${info?.site ? `<button class="btn btn--ghost" type="button" data-action="open-detail" data-type="quest" data-id="${info.site}">${ico('search')} ${t('Xem hướng dẫn')}</button>` : ''}
        </article>`;
      }).join('')}
    </div>`;
}

// ---------- Collections ----------
// Power books (stats Book_*); two items-data names differ from the game's
const BOOK_NAMES = { Book_WildSeeds: 'Ways Of The Wild', Book_Horse: 'Horse The Book' };
const POWER_BOOKS = Object.keys(OBJECT_NAMES).filter(k => k.startsWith('Book_'));
const museumById = new Map(MUSEUM_ITEMS.map(m => [m.id, m]));
const bar = (have, total) => `<div class="skill-bar"><span style="width:${Math.min(100, (have / total) * 100)}%"></span></div>`;

// Stardrops this player has eaten (the missing ones stay behind the hint toggle)
function stardropsHtml(p) {
  if (!p.stardrops) return '';
  const found = STARDROPS.filter(s => p.stardrops.includes(s.flag));
  const missing = STARDROPS.length - found.length;
  return `
    <h3 class="journal-sub">${ico('stardrop')} ${t('Stardrop đã dùng')}: ${found.length}/${STARDROPS.length}</h3>
    <div class="stardrop-list">
      ${found.map(s => `<span class="tag tag--green">${ico('stardrop')} ${nm(s)}</span>`).join('') || `<span class="muted">${t('Chưa có Stardrop nào.')}</span>`}
      ${missing ? `<span class="tag is-dim">${ico('question')} ${t(`Còn ${missing} Stardrop chưa tìm`)}</span>` : ''}
    </div>
    ${missing ? `<p class="muted">${t('Nơi tìm các Stardrop còn lại nằm ở mục Hoàn Hảo (bật "Hiện gợi ý").')}</p>` : ''}`;
}

// The 8 Rarecrows: placed on a map, kept in a chest or backpack, or not found yet
function rarecrowsHtml(d) {
  if (!d.rarecrows) return '';
  const inv = inventory(d);
  const stored = id => [...inv.values()].filter(e => e.name === 'Rarecrow').flatMap(e => e.places).filter(x => x.s.items.some(i => i.name === 'Rarecrow' && i.id === id));
  const rows = RARECROWS.map(r => ({ r, placed: d.rarecrows.filter(x => x.id === r.id), kept: stored(r.id) }));
  const have = rows.filter(x => x.placed.length || x.kept.length).length;
  return `
    <h3 class="journal-sub">${ico('rarecrow_1')} ${t('Bù nhìn Quý hiếm')}: ${have}/8</h3>
    <p class="muted">${t('Đặt đủ 8 loại trên nông trại để nhận thư kèm công thức Bù nhìn Cao cấp.')}</p>
    <div class="rarecrow-grid">
      ${rows.map(({ r, placed, kept }) => {
        const got = placed.length || kept.length;
        return `
        <article class="journal-card rarecrow-card ${got ? 'is-done' : ''}">
          <img src="assets/icons/rarecrow_${r.n}.png" alt="" class="pixel-img rarecrow-card__img ${got ? '' : 'is-dim'}" loading="lazy">
          <div>
            <h4>${t('Bù nhìn Quý hiếm')} #${r.n}</h4>
            ${placed.map(x => `<span class="tag tag--green">${ico('pin')} ${t(place(x))} (${x.x}, ${x.y})
              ${x.where === 'Farm' ? `<button class="link-btn" type="button" data-action="journal-map" data-x="${x.x}" data-y="${x.y}">${t('Xem trên bản đồ')}</button>` : ''}</span>`).join('')}
            ${kept.map(x => `<span class="tag">${ico(x.s.kind === 'backpack' ? 'guest' : 'chest')} ${t(place(x.s))}${x.s.x !== undefined ? ` (${x.s.x}, ${x.s.y})` : ''}</span>`).join('')}
            ${got ? '' : `<span class="tag is-dim">${t('Chưa có')}</span>`}
            <p class="muted">${isEn ? r.sourceEn : r.source}</p>
          </div>
        </article>`;
      }).join('')}
    </div>`;
}

function collectionHtml(d) {
  const p = me(d);
  if (!p.found) return reloadHint();
  const inv = inventory(d);
  const missing = p.found.filter(f => !f.donated);
  const fish = [...p.fishRecords].sort((a, b) => b.count - a.count);
  const earned = new Set(p.achievements);
  const achs = Object.entries(ACHIEVEMENTS);
  const bookName = id => BOOK_NAMES[id] || OBJECT_NAMES[id];
  return `
    <h3 class="journal-sub">${ico('museum')} ${t('Bảo Tàng')}: ${d.donated}/95</h3>
    ${bar(d.donated, 95)}
    ${missing.length ? `
      <p class="muted">${t('Đã tìm thấy nhưng chưa quyên góp cho Gunther:')}</p>
      <div class="storage-list">
        ${missing.map(f => {
          const m = museumById.get(f.museum), have = inv.get(f.name.toLowerCase());
          return `
          <article class="storage-row">
            ${img(m.icon, 'storage-row__icon')}
            <div class="storage-row__body">
              <div><strong>${nm(m)}</strong> <span class="tag">${t(f.kind === 'artifact' ? 'Cổ vật' : 'Khoáng sản')}</span></div>
              <div class="storage-row__places">${have ? have.places.map(x => `<span class="tag">${ico(x.s.kind === 'backpack' ? 'guest' : 'chest')} ${t(place(x.s))}${x.s.x !== undefined && x.s.kind !== 'fridge' ? ` (${x.s.x}, ${x.s.y})` : ''} · ${x.stack}
                ${x.s.where === 'Farm' && x.s.x !== undefined ? `<button class="link-btn" type="button" data-action="journal-map" data-x="${x.s.x}" data-y="${x.s.y}">${t('Xem trên bản đồ')}</button>` : ''}</span>`).join('')
                : `<span class="muted">${t('Không còn trong túi hay rương')}</span>`}</div>
            </div>
          </article>`;
        }).join('')}
      </div>` : `<p>${ico('check')} ${t('Mọi món đã tìm thấy đều đã quyên góp.')}</p>`}

    ${stardropsHtml(p)}
    ${rarecrowsHtml(d)}

    <h3 class="journal-sub">${ico('books')} ${t('Sách năng lực')}: ${p.books.length}/${POWER_BOOKS.length}</h3>
    <div class="book-grid">
      ${POWER_BOOKS.map(id => `<span class="tag ${p.books.includes(id) ? 'tag--green' : 'is-dim'}" title="${p.books.includes(id) ? t('Đã đọc') : t('Chưa đọc')}">${img(itemIcon(bookName(id)))} ${itemName(bookName(id))}</span>`).join('')}
    </div>

    <div class="journal-grid">
      <article class="journal-card">
        <h3 class="journal-card__title">${ico('source')} ${t('Sách thất lạc (Thư viện)')}</h3>
        <p><strong>${d.world.lostBooks}/21</strong></p>${bar(d.world.lostBooks, 21)}
      </article>
      <article class="journal-card">
        <h3 class="journal-card__title">${ico('note')} ${t('Mẩu giấy bí mật')}</h3>
        <p><strong>${p.notes}/25</strong>${p.scraps ? ` · ${t('Mảnh nhật ký Đảo Gừng')}: <strong>${p.scraps}/11</strong>` : ''}</p>${bar(p.notes, 25)}
      </article>
    </div>

    <h3 class="journal-sub">${ico('fish')} ${t('Kỷ lục câu cá')}: ${fish.length} ${t('loại')}</h3>
    <div class="fish-records">
      ${fish.map(f => {
        const en = OBJECT_NAMES[f.id];
        return `<div class="fish-record">${img(itemIcon(en))} <span>${itemName(en)}</span> <span class="tag">x${f.count}</span>${f.size ? ` <span class="muted">${t('Lớn nhất')} ${f.size} in (${Math.round(f.size * 2.54)} cm)</span>` : ''}</div>`;
      }).join('')}
    </div>

    <h3 class="journal-sub">${ico('medal')} ${t('Thành tựu')}: ${achs.filter(([id]) => earned.has(Number(id))).length}/${achs.length}</h3>
    <div class="goal-list goal-list--achievements">
      ${achs.sort(([a], [b]) => earned.has(Number(b)) - earned.has(Number(a))).map(([id, a]) => `
        <div class="goal-row ${earned.has(Number(id)) ? 'is-done' : 'is-dim'}">
          <div class="goal-row__body">
            <div class="goal-row__head"><strong>${isEn ? a.nameEn : a.name}</strong> ${earned.has(Number(id)) ? ico('check') : ''}</div>
            <p class="muted">${isEn ? a.descEn : a.desc}</p>
          </div>
        </div>`).join('')}
    </div>`;
}

// ---------- Stats ----------
function statsHtml(d) {
  const p = me(d);
  if (!p.stats) return reloadHint();
  const v = Object.fromEntries(Object.entries(p.stats).map(([k, n]) => [k.toLowerCase(), n]));
  return `
    <div class="journal-grid">
      ${STAT_GROUPS.map(g => `
        <article class="journal-card">
          <h3 class="journal-card__title">${ico(g.icon)} ${nm(g)}</h3>
          <ul class="stat-list">
            ${g.stats.filter(([k]) => v[k]).map(([k, vi, en]) => `<li><span>${isEn ? en : vi}</span> <strong>${v[k].toLocaleString('vi-VN')}</strong></li>`).join('') || `<li class="muted">${t('Chưa có số liệu')}</li>`}
          </ul>
        </article>`).join('')}
    </div>`;
}

// ---------- Lists that load the first time their section opens ----------
const LAZY = { events: () => import('../../data/heart-events-data.js'), island: () => import('../../data/island-data.js'), orders: () => import('../../data/special-orders-data.js') };
const lazy = {};
function need(id) {
  if (lazy[id]?.data) return lazy[id].data;
  lazy[id] ||= { p: LAZY[id]().then(m => { lazy[id].data = m; render(); }).catch(e => { console.error('[journal]', id, e); delete lazy[id]; }) };
  return null;
}
const loadingHtml = () => `<p class="muted">${ico('hourglass')} ${t('Đang tải...')}</p>`;
const tx = (x, f) => (isEn ? x[`${f}En`] : x[f]) || x[f] || '';
const daysPlayedOf = day => day ? (day.year - 1) * 112 + SEASONS.indexOf(day.season) * 28 + day.day : 0;

// ---------- Heart events ----------
function eventsHtml(d) {
  const data = need('events');
  if (!data) return loadingHtml();
  const p = me(d);
  if (!p.events) return reloadHint();
  const seen = new Set(p.events);
  const cards = Object.entries(data.HEART_EVENTS).map(([who, all]) => {
    const f = p.friends[who];
    if (!f) return null;
    // 14-heart events only matter for the spouse
    const list = all.filter(e => e.h < 14 || f.status === 'Married');
    const hearts = Math.floor(f.points / 250);
    const rows = list.map(e => ({ e, seen: e.ids.some(id => seen.has(String(id))), ready: hearts >= e.h }));
    return { who, f, hearts, rows, npc: npcOf(who), missing: rows.filter(r => !r.seen).length, ready: rows.filter(r => !r.seen && r.ready).length };
  }).filter(c => c && c.rows.length);
  const total = cards.reduce((a, c) => a + c.rows.length, 0), missing = cards.reduce((a, c) => a + c.missing, 0), ready = cards.reduce((a, c) => a + c.ready, 0);
  let list = cards;
  if (ui.eventFilter === 'ready') list = cards.filter(c => c.ready);
  if (ui.eventFilter === 'missing') list = cards.filter(c => c.missing);
  list.sort((a, b) => b.ready - a.ready || b.hearts - a.hearts);
  const chip = (id, label) => `<button class="chip ${ui.eventFilter === id ? 'is-active' : ''}" type="button" data-action="journal-events" data-filter="${id}">${t(label)}</button>`;
  return `
    <p class="notes-done">${ico('x_bouquet')} ${t('Đã xem')} <strong>${total - missing}/${total}</strong> ${t('sự kiện tim của những người bạn đã gặp')} · <strong>${ready}</strong> ${t('sự kiện đủ tim để xem ngay')}</p>
    <div class="journal-filters">${chip('all', 'Tất cả')}${chip('ready', 'Xem được ngay')}${chip('missing', 'Còn sự kiện chưa xem')}</div>
    <p class="muted">${t('Theo danh sách sự kiện đã xem trong file save. Sự kiện 14 tim chỉ hiện với người bạn đã cưới.')}</p>
    <div class="journal-grid">
      ${list.map(c => `
        <article class="journal-card event-card">
          <header class="friend-card__head">
            ${c.npc ? img(c.npc.avatar, 'friend-card__face') : ''}
            <div>
              <h3>${c.npc ? nm(c.npc) : `<span data-no-i18n>${esc(c.who)}</span>`}</h3>
              <p class="muted">${c.hearts} ${t('tim')} · ${t('đã xem')} ${c.rows.length - c.missing}/${c.rows.length}</p>
            </div>
          </header>
          <ul class="event-list">
            ${c.rows.map(({ e, seen: s, ready: r }) => `
              <li class="${s ? 'is-done' : r ? 'is-ready' : 'is-locked'}">
                <div class="event-list__head"><span class="tag ${s ? 'tag--green' : r ? 'tag--gold' : ''}">${e.h} ${t('tim')}</span>
                  <strong data-no-i18n>${esc(tx(e, 'name'))}</strong>
                  ${s ? `${ico('check')}` : r ? `<span class="tag tag--gold">${t('Xem được ngay')}</span>` : `<span class="muted">${t(`Cần ${e.h} tim`)}</span>`}</div>
                ${s ? '' : `<p data-no-i18n>${ico('map')} ${esc(tx(e, 'where'))}${tx(e, 'when') ? ` · ${esc(tx(e, 'when'))}` : ''}</p>
                  ${tx(e, 'note') ? `<p class="muted" data-no-i18n>${esc(tx(e, 'note'))}</p>` : ''}`}
              </li>`).join('')}
          </ul>
        </article>`).join('') || `<p class="muted">${t('Không có ai khớp bộ lọc.')}</p>`}
    </div>
    <p class="muted">${t('Nguồn: mã sự kiện theo stardew-checkup (MouseyPounds), điều kiện theo Official Stardew Valley Wiki.')}</p>`;
}

// ---------- Special orders ----------
function ordersHtml(d) {
  const data = need('orders');
  if (!data) return loadingHtml();
  const o = d.orders;
  if (!o) return reloadHint();
  const done = new Set(o.done), active = new Map(o.active.map(a => [a.key, a])), board = new Set(o.board.map(b => b.key));
  const group = (id, title, icon, intro) => {
    const list = data.SPECIAL_ORDERS.filter(x => x.board === id);
    return `
      <h3 class="journal-sub">${ico(icon)} ${t(title)}: ${list.filter(x => done.has(x.id)).length}/${list.length}</h3>
      <p class="muted">${t(intro)}</p>
      <div class="journal-grid">
        ${list.map(x => {
          const npc = npcOf(x.giver), a = active.get(x.id);
          return `
          <article class="journal-card quest-card ${done.has(x.id) ? 'is-done' : ''}">
            <h3 class="journal-card__title">${npc ? img(npc.avatar, 'friend-card__face') : ico(icon)} <span data-no-i18n>${esc(tx(x, 'name'))}</span></h3>
            <p class="friend-card__row">
              ${done.has(x.id) ? `<span class="tag tag--green">${ico('check')} ${t('Đã hoàn thành')}</span>` : ''}
              ${a ? `<span class="tag tag--gold">${ico('hourglass')} ${t('Đang làm')} · ${t('hạn')} ${dateLabel(a.due)}</span>` : board.has(x.id) ? `<span class="tag tag--gold">${ico('quests')} ${t('Đang có trên bảng')}</span>` : ''}
              ${x.days ? `<span class="tag">${ico('hourglass')} ${t(`${x.days} ngày`)}</span>` : ''}
              ${x.repeat ? `<span class="tag">${t('Lặp lại được')}</span>` : ''}
            </p>
            <p data-no-i18n>${esc(tx(x, 'task'))}</p>
            ${tx(x, 'needs') ? `<p class="muted" data-no-i18n>${ico('lock')} ${esc(tx(x, 'needs'))}</p>` : ''}
            <p class="friend-card__row">${ico('gift')} <span data-no-i18n>${esc(tx(x, 'reward'))}</span></p>
            ${x.rewardItems?.some(itemInfo) ? `<div class="friend-card__gifts">${x.rewardItems.filter(itemInfo).map(en => itemTag(en)).join('')}</div>` : ''}
            ${x.site ? `<button class="btn btn--ghost" type="button" data-action="open-detail" data-type="quest" data-id="${x.site}">${ico('search')} ${t('Xem hướng dẫn')}</button>` : ''}
          </article>`;
        }).join('')}
      </div>`;
  };
  return `
    ${group('town', 'Bảng đơn hàng thị trấn', 'specialOrders', 'Bảng cạnh cửa tiệm Pierre, mở từ ngày 2 Mùa Thu năm 1. Mỗi thứ Hai có đơn mới; mỗi lần chỉ nhận một đơn.')}
    ${group('qi', 'Đơn hàng của Mr. Qi', 'qi_gem', 'Trong Phòng Óc Chó của Mr. Qi trên Đảo Gừng (cần 100 Óc chó Vàng). Phần thưởng là Ngọc Qi.')}
    <p class="muted">${t('Nguồn: mã đơn theo stardew-checkup (MouseyPounds), nội dung theo Official Stardew Valley Wiki.')}</p>`;
}

// ---------- Special items & powers ----------
function walletHtml(d) {
  const p = me(d);
  if (!p.wallet) return reloadHint();
  const have = new Set(p.wallet);
  return `
    <p class="notes-done">${ico('rusty_key')} ${t('Đã có')} <strong>${have.size}/${WALLET.length}</strong> ${t('món đặc biệt và năng lực')}</p>
    <p class="muted">${t('Như trang Đồ đặc biệt & Năng lực trong Bộ sưu tập của game. Chìa khóa và sách dịch dùng chung cả nông trại.')}</p>
    <div class="journal-grid">
      ${WALLET.map(w => `
        <article class="journal-card wallet-card ${have.has(w.id) ? 'is-done' : 'is-dim'}">
          <h3 class="journal-card__title">${ico(w.icon)} ${nm(w)}</h3>
          <p class="friend-card__row">${have.has(w.id) ? `<span class="tag tag--green">${ico('check')} ${t('Đã có')}</span>` : `<span class="tag">${t('Chưa có')}</span>`}</p>
          <p data-no-i18n>${esc(tx(w, 'how'))}</p>
        </article>`).join('')}
    </div>`;
}

// ---------- Ginger Island: walnuts and upgrades ----------
function islandHtml(d) {
  const data = need('island');
  if (!data) return loadingHtml();
  const w = d.walnuts;
  if (!w) return reloadHint();
  const got = x => x.kind === 'tracker' ? (w.tracker.includes(x.key) ? x.n : 0) : x.kind === 'coconut' ? (w.coconut ? 1 : 0) : Math.min(x.n, w.limited[x.key] || 0);
  const total = data.WALNUTS.reduce((a, x) => a + x.n, 0);
  const found = w.found;
  const bought = new Set(d.island.upgrades);
  const left = data.ISLAND_UPGRADES.filter(u => !bought.has(u.flag));
  const milestone = (n, label) => `<li class="${found >= n ? 'is-done' : ''}">${found >= n ? ico('check') : ico('lock')} ${t(label)} <span class="muted">(${Math.min(found, n)}/${n})</span></li>`;
  return `
    ${d.island.open ? '' : `<p class="callout callout--tip">${ico('lock')} ${t('Chưa tới được Đảo Gừng. Sau khi hoàn thành Nhà Cộng Đồng (hoặc Joja), sửa thuyền của Willy với 200 Gỗ Cứng, 5 Thỏi Iridium và 5 Pin.')}</p>`}
    <div class="perfection-total">
      <strong>${found}/${total}</strong> ${ico('golden_walnut')}
      ${bar(found, total)}
      <ul class="journal-hints">${milestone(10, 'Leo tin tưởng (10 quả)')}${milestone(100, 'Mở Phòng Óc Chó của Mr. Qi (100 quả)')}${milestone(total, 'Tìm đủ mọi Óc chó Vàng')}</ul>
      ${found < total ? `<p class="muted">${t(`Vẹt Vàng Joja nhặt hộ số còn lại với giá ${((total - found) * 10000).toLocaleString('vi-VN')}g.`)}</p>` : w.parrot ? `<p class="muted">${t('Đã dùng Vẹt Vàng Joja.')}</p>` : ''}
    </div>
    <h3 class="journal-sub">${ico('ginger')} ${t('Nâng cấp trên đảo')}: ${data.ISLAND_UPGRADES.length - left.length}/${data.ISLAND_UPGRADES.length}
      ${left.length ? `<span class="muted">· ${t(`còn ${left.reduce((a, u) => a + u.cost, 0)} quả để mua hết`)}</span>` : ''}</h3>
    <div class="goal-list">
      ${data.ISLAND_UPGRADES.map(u => `
        <div class="goal-row ${bought.has(u.flag) ? 'is-done' : ''}">
          <div class="goal-row__body">
            <div class="goal-row__head"><strong>${nm(u)}</strong> <span>${bought.has(u.flag) ? `${ico('check')} ${t('Đã mua')}` : `${u.cost} ${ico('golden_walnut')}`}</span></div>
            <p class="goal-row__reward" data-no-i18n>${esc(tx(u, 'desc'))}</p>
          </div>
        </div>`).join('')}
    </div>
    <h3 class="journal-sub">${ico('golden_walnut')} ${t('Óc chó Vàng theo khu vực')}</h3>
    <label class="toggle"><input type="checkbox" class="px-check" data-action="journal-walnut-hints" ${ui.walnutHints ? 'checked' : ''}> <span>${t('Hiện gợi ý chỗ tìm những quả còn thiếu')}</span></label>
    ${data.WALNUT_AREAS.map(area => {
      const list = data.WALNUTS.filter(x => x.area === area.id);
      if (!list.length) return '';
      const have = list.reduce((a, x) => a + got(x), 0), all = list.reduce((a, x) => a + x.n, 0);
      return `
        <details class="walnut-area" ${d.island.open && have < all ? 'open' : ''}>
          <summary><strong>${nm(area)}</strong> <span class="muted">${have}/${all}</span></summary>
          <ul class="walnut-list">
            ${list.map(x => {
              const g = got(x);
              return `<li class="${g >= x.n ? 'is-done' : ''}">${g >= x.n ? ico('check') : ico('golden_walnut')} <strong>${nm(x)}</strong>${x.n > 1 ? ` <span class="muted">${g}/${x.n}</span>` : ''}
                ${g < x.n && ui.walnutHints && tx(x, 'hint') ? `<p class="muted" data-no-i18n>${esc(tx(x, 'hint'))}</p>` : ''}</li>`;
            }).join('')}
          </ul>
        </details>`;
    }).join('')}
    <p class="muted">${t('Nguồn: cách đếm theo stardew-checkup (MouseyPounds), gợi ý theo Official Stardew Valley Wiki.')}</p>
    <button class="btn btn--blue btn--sm" type="button" data-action="switch-tab" data-tab="island">${ico('ginger')} ${t('Hướng dẫn đầy đủ ở tab Đảo Gừng')}</button>`;
}

// ---------- Grandpa's evaluation (Utility.getGrandpaScore) ----------
function grandpaHtml(d) {
  const g = me(d).grandpa;
  if (!g) return reloadHint();
  const m = g.money, fmt = n => n.toLocaleString('vi-VN');
  const cc = g.ccDone || g.ccRooms >= 6;
  const rows = [
    ...[[5e4, 1], [1e5, 1], [2e5, 1], [3e5, 1], [5e5, 1], [1e6, 2]].map(([n, pts]) => [pts, m >= n, `Tổng thu nhập ${fmt(n)}g`, m < n ? `còn ${fmt(n - m)}g` : '']),
    [1, g.achievements.includes(5), 'Thành tựu "Bộ Sưu Tập Hoàn Chỉnh" (quyên góp đủ Bảo Tàng)'],
    [1, g.achievements.includes(26), 'Thành tựu "Bậc Thầy Câu Cá" (câu đủ mọi loài cá)'],
    [1, g.achievements.includes(34), 'Thành tựu "Giao Hàng Toàn Diện" (giao bán đủ mọi món)'],
    [1, cc, 'Hoàn thành Nhà Cộng Đồng', g.joja ? 'không thể: đã là hội viên Joja' : cc ? '' : `${g.ccRooms}/6 ${t('khu')}`],
    [2, g.ccDone, 'Dự lễ khánh thành Nhà Cộng Đồng', g.joja ? 'không thể: đã là hội viên Joja' : ''],
    [1, g.rustyKey, 'Có Chìa khóa Gỉ (mở Cống Ngầm)'],
    [1, g.skullKey, 'Có Chìa khóa Đầu lâu (tầng 120 Hầm Mỏ)'],
    [1, g.married && g.house >= 2, 'Đã kết hôn và nâng nhà lên cấp 2', `${g.married ? t('đã kết hôn') : t('chưa kết hôn')} · ${t('nhà cấp')} ${g.house}`],
    [1, g.friends8 >= 5, '5 người bạn từ 8 tim', `${Math.min(g.friends8, 5)}/5`],
    [1, g.friends8 >= 10, '10 người bạn từ 8 tim', `${Math.min(g.friends8, 10)}/10`],
    [1, g.level >= 15, 'Cấp nông dân 15', `${g.level}/15`],
    [1, g.level >= 25, 'Cấp nông dân 25', `${g.level}/25`],
    [1, g.petLove >= 999, 'Thú cưng thương bạn hết mức']
  ];
  const points = rows.reduce((a, [pts, ok]) => a + (ok ? pts : 0), 0);
  const candles = points >= 12 ? 4 : points >= 8 ? 3 : points >= 4 ? 2 : 1;
  const next = [4, 8, 12].find(n => n > points);
  const now = daysPlayedOf(d.day), evalDay = 225;
  return `
    <div class="perfection-total grandpa-total">
      <div class="grandpa-candles" title="${candles}/4">${[1, 2, 3, 4].map(i => `<span class="${i <= candles ? 'is-lit' : ''}">${ico('farm_torch')}</span>`).join('')}</div>
      <strong>${points}/21 ${t('điểm')} · ${candles} ${t('nến')}</strong>
      ${bar(points, 21)}
      <p class="muted">${next ? t(`Thêm ${next - points} điểm nữa để được ${candles + 1} nến.`) : t('Đủ 4 nến: Ông nội tặng Tượng Hoàn Hảo.')}</p>
      <p class="muted">${d.grandpaScore
        ? t(`Ông nội đã chấm ${d.grandpaScore} nến. Đặt 1 Kim cương lên điện thờ để được chấm lại.`)
        : now && now < evalDay ? t(`Ông nội sẽ chấm vào sáng ngày 1 Mùa Xuân năm 3, còn ${evalDay - now} ngày.`) : t('Ông nội chấm vào sáng ngày 1 Mùa Xuân năm 3.')}
        ${t('Điểm tính cho người chơi đang chọn.')}</p>
    </div>
    <div class="goal-list">
      ${rows.map(([pts, ok, label, extra]) => `
        <div class="goal-row ${ok ? 'is-done' : ''}">
          <div class="goal-row__body">
            <div class="goal-row__head"><strong>${ok ? ico('check') : ''} ${t(label)}</strong> <span>${ok ? '' : extra ? `<span class="muted">${t(extra)}</span> · ` : ''}+${pts}</span></div>
          </div>
        </div>`).join('')}
    </div>
    <p class="muted">${t('Nguồn: cách tính theo stardew-checkup (MouseyPounds) và Official Stardew Valley Wiki (Grandpa).')}</p>`;
}

const RENDER = { friends: friendsHtml, quests: questsHtml, storage: storageHtml, machines: machinesHtml, crops: cropsHtml, animals: animalsHtml,
  collection: collectionHtml, stats: statsHtml, monsters: monstersHtml, perfection: perfectionHtml,
  events: eventsHtml, orders: ordersHtml, wallet: walletHtml, island: islandHtml, grandpa: grandpaHtml };

function render() {
  const el = document.getElementById('journalBoard');
  if (!el) return;
  const d = data();
  if (!d) {
    el.innerHTML = `
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${ico('save')}</div>
        <h3>${t('Chưa có dữ liệu từ file save')}</h3>
        <p>${t('Nạp file save một lần ở tab File Save để xem tình bạn, đồ trong rương, máy móc, mùa vụ, vật nuôi, mục tiêu diệt quái và Hoàn Hảo.')}</p>
        ${saveTabLink()}
      </div>`;
    return;
  }
  el.innerHTML = `
    ${isStale(d) ? staleNotice() : ''}
    <p class="muted journal-meta">${t('Nông trại')} <strong data-no-i18n>${d.farmName || '?'}</strong> · ${t('cập nhật')} ${new Date(d.at).toLocaleString('vi-VN')}
      ${saveTabLink('Nạp lại file save', 'link-btn')}</p>
    ${playersOf(d).length > 1 ? `<div class="journal-players">${ico('members')} ${playersOf(d).map((p, i) => `<button class="chip ${me(d) === p ? 'is-active' : ''}" type="button" data-action="journal-player" data-index="${i}" data-no-i18n>${p.name}</button>`).join('')}
      <span class="muted">${t('Tình bạn, túi đồ, nhiệm vụ, bộ sưu tập và thống kê là của từng người.')}</span></div>` : ''}
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
    'journal-player': (app, el) => { ui.player = Number(el.dataset.index) || 0; render(); },
    // From other tabs: open the journal on one section
    'journal-open': (app, el) => { ui.section = el.dataset.section; app.switchTab('journal'); app.sfx.play('click'); },
    'journal-friends-gifts': app => { ui.section = 'friends'; ui.friendFilter = 'gifts'; app.switchTab('journal'); app.sfx.play('click'); },
    'journal-hints': (app, el) => { ui.hints = el.checked; render(); },
    'journal-events': (app, el) => { ui.eventFilter = el.dataset.filter; render(); },
    'journal-walnut-hints': (app, el) => { ui.walnutHints = el.checked; render(); },
    'journal-map': (app, el) => {
      app.switchTab('farm');
      focusFarmTiles([{ x: Number(el.dataset.x), y: Number(el.dataset.y) }]);
    }
  }
};
