// ==========================================================================
// TAB: TỪ ĐIỂN VẬT PHẨM (ITEMS ENCYCLOPEDIA, GROUPED BY CATEGORY)
// ==========================================================================

import { altName, isEn, t, nm } from '../lib/i18n.js';
import { ITEMS_DATA } from '../../data/items-data.js';
import { RECIPES_DATA } from '../../data/recipes-data.js';
import { EXTRA_ITEMS } from '../../data/extra-items.js';
import { emptyState, v16Badge, wikiLink, modalHeader, matches, signed } from '../lib/templates.js';
import { ico } from '../lib/icons.js';
import { relationsHtml } from '../lib/relations.js';
import { loadJSON, KEYS } from '../lib/storage.js';
import { OBJECT_NAMES } from '../../data/item-ids.js';
import { saveTabLink } from './save.js';
import { WEAPONS, WEAPON_TYPES } from '../../data/weapons-data.js';
import { TRINKETS, TRINKETS_INTRO } from '../../data/trinkets-data.js';
import { labeledContainers } from './journal.js';
import { compareTable, enchantList, forgeCount, MAX_FORGES } from '../lib/weapon-stats.js';
import { isStale } from '../lib/journal-schema.js';

const itemById = new Map(ITEMS_DATA.map(it => [it.id, it]));
const weaponId = w => `weapon:${w.nameEn.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
const weaponById = new Map(WEAPONS.map(w => [weaponId(w), w]));
const weaponNames = new Set(WEAPONS.map(w => w.nameEn));
const trinketId = x => `trinket:${x.nameEn.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
const trinketById = new Map(TRINKETS.map(x => [trinketId(x), x]));

// ---------- Weapons and rings the farm has (from the last save) ----------
// Every copy: { spot (where to find it), slot (backpack), ench, parts, worn: 'left'|'right', who, inside (combined ring) }
function ownedCopies(nameEn) {
  const d = loadJSON(KEYS.journal, null);
  if (!d?.players) return null;
  const out = [];
  for (const s of labeledContainers(d)) for (const it of s.items) {
    if (it.name === nameEn) out.push({ spot: s.spot, s, slot: s.kind === 'backpack' ? it.slot : undefined, ench: it.ench || [], parts: it.parts });
    else if (it.parts?.includes(nameEn)) out.push({ spot: s.spot, s, inside: it.parts });
  }
  d.players.forEach(p => (p.rings || []).forEach((r, i) => {
    if (!r) return;
    const hand = i ? 'right' : 'left';
    if (r.name === nameEn) out.push({ worn: hand, who: p.name, parts: r.parts });
    else if (r.parts?.includes(nameEn)) out.push({ worn: hand, who: p.name, inside: r.parts });
  }));
  d.players.forEach(p => (p.trinkets || []).forEach(x => { if (x.name === nameEn) out.push({ worn: 'trinket', who: p.name }); }));
  return out;
}
const needsReload = () => { const d = loadJSON(KEYS.journal, null); return !!d && (isStale(d) || !d.players?.[0]?.rings); };
const handName = h => (h === 'left' ? 'tay trái' : h === 'trinket' ? 'ô trang sức' : 'tay phải');
function copyLabel(c) {
  if (c.worn) return `${ico('rings')} <strong>${t('Đang đeo')}</strong> · <span data-no-i18n>${esc(c.who)}</span> (${t(handName(c.worn))})${c.inside ? ` · ${t('trong Nhẫn Ghép')}` : ''}`;
  const bar = c.slot !== undefined && c.slot < 12 ? ` · ${t('trên thanh công cụ')}` : '';
  return `${ico(c.s.kind === 'backpack' ? 'guest' : 'chest')} <span data-no-i18n>${c.spot}</span>${bar}${c.inside ? ` · ${t('trong Nhẫn Ghép')}` : ''}${c.s.where === 'Farm' && c.s.x !== undefined
    ? ` <button class="link-btn" type="button" data-action="journal-map" data-x="${c.s.x}" data-y="${c.s.y}">${t('Bản đồ')}</button>` : ''}`;
}
// Card tag: worn / owned / not yet
function ownedTag(copies) {
  if (!copies) return '';
  if (!copies.length) return `<span class="tag is-dim">${ico('box')} ${t('Chưa có')}</span>`;
  const worn = copies.find(c => c.worn);
  return worn ? `<span class="tag tag--green">${ico('rings')} ${t('Đang đeo')} · <span data-no-i18n>${esc(worn.who)}</span></span>`
    : `<span class="tag tag--green">${ico('check')} ${t('Đã có')}${copies.length > 1 ? ` ×${copies.length}` : ''}</span>`;
}
function ownedBox(copies, weapon) {
  if (!copies) return `<div class="inset-box"><p class="muted">${ico('save')} ${t('Nạp file save để biết bạn đã có món này chưa và nó đang nằm ở đâu.')} ${saveTabLink('Nạp file save', 'link-btn')}</p></div>`;
  const reload = needsReload() ? `<p class="muted">${ico('warn')} ${t('Nạp lại file save để xem đủ (nhẫn đang đeo, bùa chú vũ khí).')} ${saveTabLink('Nạp lại file save', 'link-btn')}</p>` : '';
  if (!copies.length) return `<div class="inset-box"><h4 class="inset-box__title">${ico('box')} ${t('Chưa có trong túi đồ, rương hay trên người ai.')}</h4>${reload}</div>`;
  return `
    <div class="inset-box">
      <h4 class="inset-box__title">${ico('check')} ${t('Bạn đang có')} ${copies.length} ${t('cái')}:</h4>
      ${reload}
      ${weapon && weapon.type !== 'slingshot' ? copies.map((c, i) => `
        <div class="weapon-copy">
          <p>${copies.length > 1 ? `<strong>#${i + 1}</strong> ` : ''}${copyLabel(c)} <span class="tag ${forgeCount(c.ench) >= MAX_FORGES ? 'tag--green' : ''}">${t('Đã rèn')} ${forgeCount(c.ench)}/${MAX_FORGES}</span></p>
          <div class="weapon-copy__grid">
            <div><h5>${t('Rèn & phù phép')}</h5>${enchantList(c.ench)}</div>
            <div><h5>${t('So với chỉ số gốc')}</h5>${compareTable(weapon, c.ench)}</div>
          </div>
        </div>`).join('') : `<ul class="bullet-list">${copies.map(c => `<li>${copyLabel(c)}</li>`).join('')}</ul>`}
      ${weapon ? `<p class="muted">${t('Game không lưu món đang cầm trên tay; vũ khí trong túi đồ là đang mang theo (12 ô đầu là thanh công cụ). Chỉ số sau rèn được tính theo công thức của wiki, có thể lệch 1 do làm tròn.')}</p>` : ''}
    </div>`;
}
const extraById = new Map(EXTRA_ITEMS.map(it => [it.id, it]));
const PLACEHOLDER = 'assets/pixel-box.svg';

// ---------- Books read (from the last save) ----------
// The game counts each read in the player's stats under the book's id
// (Book_Speed, SkillBook_0...). Skill books give experience every time;
// a power book unlocks on the first read, later reads give experience.
const BOOK_IDS = {
  ...Object.fromEntries(Object.entries(OBJECT_NAMES).filter(([k]) => /^(Book_|SkillBook_)/.test(k)).map(([k, v]) => [v, k])),
  'Ways Of The Wild': 'Book_WildSeeds', 'Horse The Book': 'Book_Horse'
};
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// null without a save; otherwise book -> [{ name, n }] for every player
function bookReads() {
  const players = (loadJSON(KEYS.journal, null)?.players || []).filter(p => p.stats);
  if (!players.length) return null;
  return it => BOOK_IDS[it.nameEn] ? players.map(p => ({ name: players.length > 1 ? p.name : '', n: p.stats[BOOK_IDS[it.nameEn]] || 0 })) : null;
}

function readTags(reads) {
  return reads.map(r => `<span class="tag ${r.n ? 'tag--green' : 'is-dim'}">${ico('books')} ${r.name ? `<strong data-no-i18n>${esc(r.name)}:</strong> ` : ''}${r.n ? `Đã đọc ×${r.n}` : 'Chưa đọc'}</span>`).join('');
}

// "Đã học 8/24" per player, under the Books heading
function booksSummary(reads) {
  if (!reads) return `<p class="muted">${ico('books')} Nạp file save để xem những sách đã đọc và số lần đọc. ${saveTabLink('Nạp file save', 'btn btn--green btn--sm')}</p>`;
  const books = ITEMS_DATA.filter(it => it.category === 'books' && BOOK_IDS[it.nameEn]);
  const per = books.map(reads);
  const names = per[0] || [];
  return `<div class="pill-row">${names.map((p, i) => {
    const read = per.filter(r => r[i].n > 0).length;
    const times = per.reduce((a, r) => a + r[i].n, 0);
    return `<span class="tag ${read === books.length ? 'tag--green' : 'tag--gold'}">${ico('books')} ${p.name ? `<strong data-no-i18n>${esc(p.name)}:</strong> ` : ''}Đã học ${read}/${books.length} sách · ${times} lần đọc</span>`;
  }).join('')}</div>`;
}

const GROUPS = [
  { category: 'tools', icon: 'tools', title: 'Công Cụ Lao Động, Khai Thác & Vũ Khí',
    desc: 'Búa, rìu, cuốc đất, xẻng mỏ/cuốc chim, cần câu, bình tưới, liềm cắt cỏ, dụng cụ chăn nuôi và các thần binh huyền thoại.' },
  { category: 'crops', icon: 'crops', title: 'Nông Sản & Cây Trồng Các Mùa',
    desc: 'Tất cả các loại rau củ quả và hoa gieo trồng 4 mùa Xuân, Hạ, Thu, Đông (1.6) và cây đa mùa trong Nhà Kính.' },
  { category: 'seeds', icon: 'seeds', title: 'Hạt Giống & Cây Non',
    desc: 'Hạt giống từng mùa, hạt hỗn hợp, cây ăn quả non và hạt của các loại cây rừng.' },
  { category: 'fruits', icon: 'fruits', title: 'Trái Cây & Vườn Cây Ăn Quả',
    desc: 'Các loại quả ngọt mọng nước từ vườn cây ăn quả thung lũng, quả mọng hoang dã và trái cây nhiệt đới Đảo Gừng.' },
  { category: 'forage', icon: 'forage', title: 'Thu Nhặt Hoang Dã & Thảo Dược Thiên Nhiên',
    desc: 'Rau rừng, nấm, thảo mộc 4 mùa, tảo và các loại vỏ ốc, san hô dọc bờ biển.' },
  { category: 'fish', icon: 'fish', title: 'Các Loại Cá & Thủy Sản Toàn Diện',
    desc: 'Cá biển đại dương, cá sông suối, cá hồ núi, cá hang sâu mỏ quặng, cá huyền thoại tối thượng và hải sản bẫy lồng.' },
  { category: 'animal_products', icon: 'animal', title: 'Sản Phẩm Động Vật & Chăn Nuôi',
    desc: 'Các loại trứng, sữa, lông cừu, lông vịt, chân thỏ và nấm cục Truffle siêu đắt giá.' },
  { category: 'artisan', icon: 'artisan', title: 'Hàng Thủ Công',
    desc: 'Rượu, nước ép, mứt, dưa muối, phô mai, mật ong, vải và các sản phẩm từ máy móc trên nông trại.' },
  { category: 'minerals', icon: 'minerals', title: 'Khoáng Sản, Đá Quý & Quặng Kim Loại',
    desc: 'Đá quý, khoáng thạch trong hốc tinh (Geode), quặng luyện kim và các khoáng sản cho Bảo Tàng.' },
  { category: 'artifacts', icon: 'artifacts', title: 'Cổ Vật, Di Vật & Hóa Thạch Tiền Sử',
    desc: 'Những món đồ khảo cổ kỳ bí được chôn vùi dưới lòng đất hàng triệu năm để hoàn thành bảo tàng Gunther.' },
  { category: 'resources', icon: 'resources', title: 'Tài Nguyên, Đồ Rơi & Rác',
    desc: 'Gỗ, đá, đất sét, thỏi kim loại, tinh chất, đồ rơi từ quái vật và rác câu được.' },
  { category: 'rings', icon: 'rings', title: 'Nhẫn',
    desc: 'Nhẫn tăng chỉ số, hút đồ, phát sáng và nhẫn hiếm từ Hang Đầu Lâu.' },
  { category: 'books', icon: 'books', title: 'Sách',
    desc: 'Sách kỹ năng và sách mở khoá năng lực vĩnh viễn (bản 1.6), mua ở Người bán sách hoặc tìm thấy trong game.' }
];
const groupByCat = new Map(GROUPS.map(g => [g.category, g]));

const isEdible = it => it.energy !== null && it.energy > 0;
// Negative-edibility items (Pufferfish, Goby...) can be eaten but drain energy
const isHarmful = it => it.energy !== null && it.energy < 0;
const price = it => it.priceText || (it.sellPrice > 0 ? `${it.sellPrice.toLocaleString()}g` : 'Không bán');

function cardHtml(it, reads) {
  const read = it.category === 'books' && reads?.(it);
  return `
    <article class="card card--clickable" role="button" tabindex="0"
             data-action="open-detail" data-type="item" data-id="${it.id}">
      <header class="card__head">
        <div class="card__title-row">
          <div class="icon-box"><img src="${it.imageUrl}" alt="${it.name}" class="pixel-img" data-fallback="${PLACEHOLDER}" loading="lazy"></div>
          <div>
            <h3 class="card__title">${it.name}</h3>
            <div class="card__sub">${altName(it)} ${v16Badge(it.version16)}</div>
          </div>
        </div>
      </header>

      <div class="card__body">
        <div class="pill-row">
          <span class="tag">${it.subCategory}</span>
          ${it.season ? `<span class="tag tag--blue">${ico('season')} ${it.season}</span>` : ''}
          <span class="tag tag--gold">${ico('money')} ${price(it)}</span>
          ${isEdible(it) ? `<span class="tag tag--green">${ico('energy')} +${it.energy}</span>` : ''}
          ${isHarmful(it) ? `<span class="tag tag--red">${ico('energy')} ${it.energy}</span>` : ''}
        </div>
        ${read ? `<div class="pill-row">${readTags(read)}</div>` : ''}
        ${it.category === 'rings' ? `<div class="pill-row">${ownedTag(ownedCopies(it.nameEn))}</div>` : ''}

        <p class="card__desc">${it.desc}</p>

        <div class="info-row">${ico('pin')}<span><strong>Tìm thấy:</strong> ${it.location}</span></div>
        ${it.lovedBy?.length ? `
          <div class="info-row info-row--red">${ico('loved')}
            <span><strong>Thích:</strong> ${it.lovedBy.slice(0, 3).join(', ')}${it.lovedBy.length > 3 ? ` (+${it.lovedBy.length - 3})` : ''}</span>
          </div>` : ''}
        ${it.usedIn?.length ? `
          <div class="info-row info-row--green">${ico('uses')}<span><strong>Dùng:</strong> ${it.usedIn[0]}</span></div>` : ''}
      </div>

      <footer class="card__foot card__foot--end">
        <span class="btn btn--ghost btn--sm" aria-hidden="true">${ico('search')} Xem Chi Tiết</span>
      </footer>
    </article>`;
}

// Items outside the dictionary (seen in the Predictor tab): name, description, price and the wiki's facts
function extraDetail(it) {
  // The wiki's generic furniture line is not a description
  const en = it.descEn === "This furniture can't be placed outdoors." ? '' : it.descEn;
  const desc = (isEn ? en : it.desc) || en || it.desc;
  return `
    ${modalHeader({
      icon: `<div class="icon-box icon-box--lg"><img src="${it.imageUrl || PLACEHOLDER}" alt="${it.name}" class="pixel-img" data-fallback="${PLACEHOLDER}"></div>`,
      title: isEn ? it.nameEn : it.name,
      sub: `${isEn ? it.name : it.nameEn} • <b>${t(it.kind)}</b>`,
      extra: wikiLink(it.nameEn, 'Xem bài viết chi tiết trên Official Stardew Valley Wiki', it.wikiFile)
    })}
    ${desc ? `<p class="detail-lead">${desc}</p>` : ''}
    <div class="spec-grid">
      <div class="spec spec--gold">
        <div class="spec__label">${ico('money')} ${t('GIÁ BÁN CƠ BẢN')}</div>
        <div class="spec__value">${it.sellPrice > 0 ? `${it.sellPrice.toLocaleString()}g` : t('Không thể bán')}</div>
      </div>
    </div>
    ${it.info?.length ? `
      <div class="inset-box">
        <h4 class="inset-box__title">${ico('wiki')} ${t('Thông tin theo Official Stardew Valley Wiki')}:</h4>
        <ul class="bullet-list" lang="en">${it.info.map(([k, v]) => `<li><strong>${k}:</strong> ${v}</li>`).join('')}</ul>
      </div>` : ''}
    ${relationsHtml(it.nameEn)}`;
}

// ---------- Weapons ----------
const weaponName = w => (isEn ? w.nameEn : w.name);
const modTags = w => [
  w.mods.speed ? `${t('Tốc độ')} ${signed(w.mods.speed)}` : '', w.mods.defense ? `${t('Phòng thủ')} ${signed(w.mods.defense)}` : '',
  w.mods.weight ? `${t('Trọng lượng')} ${signed(w.mods.weight)}` : '',
  w.mods.critPower ? `${t('Sức mạnh chí mạng')} ${signed(w.mods.critPower)}` : ''
].filter(Boolean).map(x => `<span class="tag">${x}</span>`).join('');

function weaponCard(w) {
  return `
    <article class="card card--clickable weapon-card" role="button" tabindex="0" data-action="open-detail" data-type="item" data-id="${weaponId(w)}">
      <header class="card__head">
        <div class="card__title-row">
          <div class="icon-box"><img src="${w.icon}" alt="" class="pixel-img" loading="lazy" data-fallback="${PLACEHOLDER}"></div>
          <div>
            <h3 class="card__title">${weaponName(w)}</h3>
            <div class="card__sub">${isEn ? w.name : w.nameEn}${w.level ? ` · ${t('Cấp')} ${w.level}` : ''}</div>
          </div>
        </div>
      </header>
      <div class="card__body">
        <div class="pill-row">
          <span class="tag tag--red">${ico('weapons')} ${w.damage ? `${w.damage[0]}-${w.damage[1]}` : t('Tùy loại đạn')}</span>
          ${w.crit !== null ? `<span class="tag tag--gold">${t('Chí mạng')} ${Math.round(w.crit * 1000) / 10}%</span>` : ''}
          ${modTags(w)}
          ${ownedTag(ownedCopies(w.nameEn))}
        </div>
        <p class="card__desc">${esc(isEn ? w.descEn : w.desc)}</p>
        <div class="info-row">${ico('pin')}<span>${esc((isEn ? w.whereEn : w.where).join(' · '))}</span></div>
      </div>
    </article>`;
}

function weaponsHtml(list, only) {
  if (!list.length) return '';
  return `
    <section class="group" id="group-weapons">
      <header class="group__head">
        <div class="group__title-row">
          <h3 class="group__title">${ico('weapons')} ${t('Vũ Khí')}</h3>
          <span class="badge badge--gold">${list.length} ${t('vũ khí')}</span>
        </div>
        <p class="group__desc">${t('Vũ khí không tốn năng lượng và không nâng cấp ở thợ rèn; tìm thấy trong Hầm Mỏ, mua ở Hội Thám Hiểm hoặc nhặt từ quái. Ở Lò Rèn Núi Lửa có thể rèn đá quý (tối đa 3 lần) và phù phép. Theo Official Stardew Valley Wiki.')}</p>
        ${loadJSON(KEYS.journal, null) ? '' : `<p class="muted">${ico('save')} ${t('Nạp file save để biết vũ khí nào đã có, nằm ở đâu và đã rèn những gì.')} ${saveTabLink('Nạp file save', 'link-btn')}</p>`}
      </header>
      ${Object.entries(WEAPON_TYPES).map(([type, g]) => {
        const items = list.filter(w => w.type === type);
        if (!items.length) return '';
        return `
          <div class="weapon-type">
            <h4 class="weapon-type__title"><img src="${g.icon}" alt="" class="pixel-img"> ${nm(g)} <span class="badge">${items.length}</span></h4>
            <p class="group__desc">${esc(isEn ? g.descEn : g.desc)}</p>
            <div class="content-grid">${items.map(weaponCard).join('')}</div>
          </div>`;
      }).join('')}
    </section>`;
}

function weaponDetail(w) {
  const g = WEAPON_TYPES[w.type];
  return `
    ${modalHeader({
      icon: `<div class="icon-box icon-box--lg"><img src="${w.icon}" alt="" class="pixel-img" data-fallback="${PLACEHOLDER}"></div>`,
      title: weaponName(w),
      sub: `${isEn ? w.name : w.nameEn} • <b>${nm(g)}</b>${w.level ? ` • ${t('Cấp')} ${w.level}` : ''}`,
      extra: wikiLink(w.nameEn, 'Xem bài viết chi tiết trên Official Stardew Valley Wiki', w.nameEn.replace(/ /g, '_'))
    })}
    <p class="detail-lead">${esc(isEn ? w.descEn : w.desc)}</p>
    <div class="spec-grid">
      <div class="spec spec--red"><div class="spec__label">${ico('weapons')} ${t('SÁT THƯƠNG')}</div><div class="spec__value">${w.damage ? `${w.damage[0]}-${w.damage[1]}` : t('Tùy loại đạn')}</div></div>
      <div class="spec spec--gold"><div class="spec__label">${t('TỈ LỆ CHÍ MẠNG')}</div><div class="spec__value">${w.crit !== null ? `${Math.round(w.crit * 1000) / 10}%` : '-'}</div></div>
      <div class="spec spec--blue"><div class="spec__label">${ico('money')} ${t('MUA / BÁN')}</div><div class="spec__value">${w.buy ? `${w.buy.toLocaleString()}g` : '-'} / ${w.sell ? `${w.sell.toLocaleString()}g` : '-'}</div></div>
    </div>
    ${modTags(w) ? `<div class="pill-row">${modTags(w)}</div>` : ''}
    <div class="inset-box">
      <h4 class="inset-box__title">${ico('pin')} ${t('Nơi tìm thấy')}:</h4>
      <ul class="bullet-list">${(isEn ? w.whereEn : w.where).map(x => `<li>${esc(x)}</li>`).join('')}</ul>
    </div>
    <p class="muted">${esc(isEn ? g.descEn : g.desc)}</p>
    ${ownedBox(ownedCopies(w.nameEn), w)}`;
}

// ---------- Trinkets (1.6, after Combat Mastery) ----------
const tName = x => (isEn ? x.nameEn : x.name);
function trinketCard(x) {
  return `
    <article class="card card--clickable" role="button" tabindex="0" data-action="open-detail" data-type="item" data-id="${trinketId(x)}">
      <header class="card__head">
        <div class="card__title-row">
          <div class="icon-box"><img src="${x.icon}" alt="" class="pixel-img" loading="lazy" data-fallback="${PLACEHOLDER}"></div>
          <div><h3 class="card__title">${tName(x)}</h3><div class="card__sub">${isEn ? x.name : x.nameEn} ${v16Badge(true)}</div></div>
        </div>
      </header>
      <div class="card__body">
        <div class="pill-row">
          <span class="tag tag--gold">${ico('money')} 1,000g</span>
          ${x.reforge ? `<span class="tag">${t('Rèn lại')}: ${isEn ? x.reforgeEn : x.reforge}</span>` : `<span class="tag is-dim">${t('Không rèn lại được')}</span>`}
          ${ownedTag(ownedCopies(x.nameEn))}
        </div>
        <p class="card__desc">"${esc(isEn ? x.descEn : x.desc)}"</p>
        <p class="card__desc">${esc(isEn ? x.howEn : x.how)}</p>
      </div>
    </article>`;
}
function trinketsHtml(list) {
  if (!list.length) return '';
  return `
    <section class="group" id="group-trinkets">
      <header class="group__head">
        <div class="group__title-row">
          <h3 class="group__title">${ico('rings')} ${t('Trang Sức (Trinket)')}</h3>
          <span class="badge badge--gold">${list.length} ${t('vật phẩm')}</span>
        </div>
        <p class="group__desc">${esc(isEn ? TRINKETS_INTRO.textEn : TRINKETS_INTRO.text)}</p>
        <p class="group__desc">${esc(isEn ? TRINKETS_INTRO.anvilEn : TRINKETS_INTRO.anvil)}</p>
      </header>
      <div class="content-grid">${list.map(trinketCard).join('')}</div>
    </section>`;
}
function trinketDetail(x) {
  const tb = x.table;
  return `
    ${modalHeader({
      icon: `<div class="icon-box icon-box--lg"><img src="${x.icon}" alt="" class="pixel-img" data-fallback="${PLACEHOLDER}"></div>`,
      title: `${tName(x)} ${v16Badge(true, 'Bản 1.6 Mới')}`,
      sub: `${isEn ? x.name : x.nameEn} • <b>${t('Trang Sức (Trinket)')}</b>`,
      extra: wikiLink(x.nameEn, 'Xem bài viết chi tiết trên Official Stardew Valley Wiki', x.nameEn.replace(/ /g, '_'))
    })}
    <p class="detail-lead">"${esc(isEn ? x.descEn : x.desc)}"</p>
    <div class="spec-grid">
      <div class="spec spec--gold"><div class="spec__label">${ico('money')} ${t('GIÁ BÁN CƠ BẢN')}</div><div class="spec__value">1,000g</div></div>
      <div class="spec spec--blue"><div class="spec__label">${t('RÈN LẠI Ở ĐE RÈN')}</div><div class="spec__value">${x.reforge ? (isEn ? x.reforgeEn : x.reforge) : t('Không rèn lại được')}</div></div>
    </div>
    <div class="inset-box"><h4 class="inset-box__title">${ico('wiki')} ${t('Cách hoạt động')}:</h4><p>${esc(isEn ? x.howEn : x.how)}</p></div>
    ${tb ? `<div class="predict-table-wrap"><table class="predict-table"><thead><tr>${(isEn ? tb.headEn : tb.head).map(h => `<th>${h}</th>`).join('')}</tr></thead>
      <tbody>${(isEn ? tb.rowsEn : tb.rows).map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>` : ''}
    <div class="inset-box"><h4 class="inset-box__title">${ico('pin')} ${t('Nơi tìm thấy')}:</h4><p>${esc(isEn ? x.sourceEn : x.source)}</p></div>
    ${ownedBox(ownedCopies(x.nameEn))}`;
}

export default {
  id: 'items',
  search: true,
  detailType: 'item',
  toggles: ['v16', 'buffs'],

  render(app) {
    const container = document.getElementById('itemsContainer');
    const filter = app.filters.items;
    const q = app.searchQuery;

    const list = ITEMS_DATA.filter(it => {
      if (weaponNames.has(it.nameEn)) return false;   // shown with the weapons
      if (filter !== 'all' && it.category !== filter) return false;
      if (app.toggles.v16 && !it.version16) return false;
      if (app.toggles.buffs && !isEdible(it) && !it.buffs?.length) return false;
      if (q) return matches(q, it.name, it.nameEn, it.subCategory, it.location, it.desc, it.tips, it.lovedBy, it.usedIn);
      return true;
    });

    const trinkets = (filter === 'all' || filter === 'trinkets') && !app.toggles.v16 && !app.toggles.buffs
      ? TRINKETS.filter(x => !q || matches(q, x.name, x.nameEn, x.desc, x.how)) : [];
    const weapons = (filter === 'all' || filter === 'weapons') && !app.toggles.v16 && !app.toggles.buffs
      ? WEAPONS.filter(w => !q || matches(q, w.name, w.nameEn, w.where, w.whereEn, WEAPON_TYPES[w.type].name)) : [];
    if (!list.length && !weapons.length && !trinkets.length) {
      // Dishes and crafted goods live in the Recipes tab: point there when they match
      const recipeHits = q ? RECIPES_DATA.filter(r => matches(q, r.name, r.nameEn)).length : 0;
      container.innerHTML = emptyState('search', 'Không tìm thấy vật phẩm nào khớp với tìm kiếm!',
        'Hãy thử tìm từ khóa khác (VD: Rìu, Cuốc, Cá huyền thoại, Kim cương, Dâu tây, 1.6...)') +
        (recipeHits ? `<p class="empty-state__more"><button class="btn btn--blue" type="button" data-action="switch-tab" data-tab="recipes">${ico('recipes')} Xem ${recipeHits} công thức khớp ở tab Công Thức</button></p>` : '');
      return;
    }

    const reads = list.some(it => it.category === 'books') ? bookReads() : null;
    container.innerHTML = weaponsHtml(weapons, filter === 'weapons') + trinketsHtml(trinkets) + GROUPS.map(grp => {
      const items = list.filter(it => it.category === grp.category);
      if (!items.length) return '';
      return `
        <section class="group" id="group-${grp.category}">
          <header class="group__head">
            <div class="group__title-row">
              <h3 class="group__title">${ico(grp.icon)} ${grp.title}</h3>
              <span class="badge badge--gold">${items.length} vật phẩm</span>
            </div>
            <p class="group__desc">${grp.desc}</p>
            ${grp.category === 'books' ? booksSummary(reads) : ''}
          </header>
          <div class="content-grid">${items.map(it => cardHtml(it, reads)).join('')}</div>
        </section>`;
    }).join('');
  },

  badge() {
    document.getElementById('itemTabBadge').textContent = ITEMS_DATA.filter(it => !weaponNames.has(it.nameEn)).length + WEAPONS.length + TRINKETS.length;
  },

  detail(app, id) {
    if (weaponById.has(id)) return weaponDetail(weaponById.get(id));
    if (trinketById.has(id)) return trinketDetail(trinketById.get(id));
    const it = itemById.get(id);
    if (!it) return extraById.has(id) ? extraDetail(extraById.get(id)) : '';
    const page = it.wikiFile ? it.wikiFile.replace('.png', '') : undefined;
    const read = it.category === 'books' && bookReads()?.(it);
    return `
      ${modalHeader({
        icon: `<div class="icon-box icon-box--lg"><img src="${it.imageUrl}" alt="${it.name}" class="pixel-img" data-fallback="${PLACEHOLDER}"></div>`,
        title: `${it.name} ${v16Badge(it.version16, 'Bản 1.6 Mới')}`,
        sub: `${altName(it)} • <span>${groupByCat.get(it.category)?.title || ''}</span> • <b>${it.subCategory}</b>`,
        extra: wikiLink(it.nameEn, 'Xem bài viết chi tiết trên Official Stardew Valley Wiki', page)
      })}
      <p class="detail-lead">${it.desc}</p>
      ${read ? `<div class="pill-row">${readTags(read)}</div>` : ''}
      ${it.category === 'rings' ? ownedBox(ownedCopies(it.nameEn)) : ''}

      <div class="spec-grid">
        <div class="spec spec--gold">
          <div class="spec__label">${ico('money')} GIÁ BÁN CƠ BẢN</div>
          <div class="spec__value">${it.priceText || (it.sellPrice > 0 ? `${it.sellPrice.toLocaleString()}g` : 'Không thể bán')}</div>
        </div>
        <div class="spec spec--teal">
          <div class="spec__label">${ico('energy')} PHỤC HỒI NĂNG LƯỢNG / MÁU</div>
          <div class="spec__value">${it.energy !== null && it.energy !== 0 ? `${ico('energy')} ${signed(it.energy)} | ${ico('health')} ${signed(it.health)}` : 'Không ăn được'}</div>
        </div>
        <div class="spec spec--blue">
          <div class="spec__label">${ico('season')} MÙA VỤ XUẤT HIỆN</div>
          <div class="spec__value">${it.season || 'Quanh năm'}</div>
        </div>
      </div>

      <div class="inset-box">
        <h4 class="inset-box__title">${ico('pin')} Nơi tìm thấy & Cách thu hoạch:</h4>
        <p>${it.location}</p>
      </div>

      ${it.usedIn?.length ? `
        <div class="callout callout--green">
          <h4 class="callout__title">${ico('uses')} Dùng trong công thức & Mục đích:</h4>
          <ul class="bullet-list">${it.usedIn.map(u => `<li>${u}</li>`).join('')}</ul>
        </div>` : ''}

      ${it.tips ? `
        <div class="callout callout--tip">
          <strong>${ico('tip')} Mẹo chuyên gia & Chiến lược khai thác:</strong>
          <p>${it.tips}</p>
        </div>` : ''}
      ${relationsHtml(it.nameEn)}`;
  }
};
