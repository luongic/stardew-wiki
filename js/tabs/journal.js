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
import { MONSTER_GOALS, PERFECTION, STARDROPS, STAT_GROUPS, RARECROWS } from '../../data/journal-data.js';
import { QUEST_INFO, ACHIEVEMENTS } from '../../data/save-data.js';
import { MUSEUM_ITEMS } from '../../data/museum-data.js';
import { ico } from '../lib/icons.js';
import { t, nm, isEn } from '../lib/i18n.js';
import { loadJSON, KEYS } from '../lib/storage.js';
import { matches } from '../lib/templates.js';
import { focusFarmTiles } from './farm.js';
import { OBJECT_NAMES } from '../../data/item-ids.js';
import { itemTag } from '../lib/item-lookup.js';
import { isStale, staleNotice } from '../lib/journal-schema.js';

const SECTIONS = [
  { id: 'friends', name: 'Tình bạn', icon: 'loved' },
  { id: 'quests', name: 'Nhiệm vụ', icon: 'quests' },
  { id: 'storage', name: 'Túi & Rương', icon: 'chest' },
  { id: 'machines', name: 'Máy móc', icon: 'keg' },
  { id: 'crops', name: 'Mùa vụ', icon: 'crops' },
  { id: 'animals', name: 'Vật nuôi', icon: 'animal' },
  { id: 'collection', name: 'Bộ sưu tập', icon: 'museum' },
  { id: 'stats', name: 'Thống kê', icon: 'steps' },
  { id: 'monsters', name: 'Diệt quái', icon: 'skull' },
  { id: 'perfection', name: 'Hoàn Hảo', icon: 'tracker' }
];
const SEASONS = ['spring', 'summer', 'fall', 'winter'];
const SEASON_WORD = { spring: 'Xuân', summer: 'Hạ', fall: 'Thu', winter: 'Đông' };

const ui = { section: 'friends', friendFilter: 'all', search: '', hints: false, player: 0 };

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
const reloadHint = () => `<p class="muted">${ico('upload')} ${t('Nạp lại file save ở tab Tiến Độ để xem mục này.')}</p>`;

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
  if (!d.animals.length) return `<p class="muted">${t('Chưa có vật nuôi nào trong save.')}</p>`;
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
    </div>`;
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

const RENDER = { friends: friendsHtml, quests: questsHtml, storage: storageHtml, machines: machinesHtml, crops: cropsHtml, animals: animalsHtml,
  collection: collectionHtml, stats: statsHtml, monsters: monstersHtml, perfection: perfectionHtml };

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
    ${isStale(d) ? staleNotice() : ''}
    <p class="muted journal-meta">${t('Nông trại')} <strong data-no-i18n>${d.farmName || '?'}</strong> · ${t('cập nhật')} ${new Date(d.at).toLocaleString('vi-VN')}
      <button class="link-btn" type="button" data-action="import-save-progress">${t('Nạp lại file save')}</button></p>
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
    'journal-hints': (app, el) => { ui.hints = el.checked; render(); },
    'journal-map': (app, el) => {
      app.switchTab('farm');
      focusFarmTiles([{ x: Number(el.dataset.x), y: Number(el.dataset.y) }]);
    }
  }
};
