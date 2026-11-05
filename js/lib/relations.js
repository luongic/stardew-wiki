// ==========================================================================
// ITEM RELATIONS
// What an item is linked to across the site, for its detail popup: the
// recipes it goes into (cooking, crafting, buildings, tools), how it is
// made, Community Center bundles that ask for it, villagers who love or like
// it as a gift, and whether the Museum takes it. Built once from the data
// files, matched by English name.
// ==========================================================================

import { RECIPES_DATA } from '../../data/recipes-data.js';
import { CRAFT_EXTRA } from '../../data/craft-extra.js';
import { CC_ROOMS } from '../../data/bundles-data.js';
import { NPCS_DATA } from '../../data/npcs-data.js';
import { MUSEUM_ITEMS } from '../../data/museum-data.js';
import { itemTag } from './item-lookup.js';
import { ico } from './icons.js';
import { t, nm } from './i18n.js';

const low = s => String(s || '').trim().toLowerCase();
const index = () => new Map();
const push = (map, en, v) => { const k = low(en); if (k) (map.get(k) || map.set(k, []).get(k)).push(v); };

const usedIn = index(), bundles = index(), gifts = index();
const recipeOf = new Map(), craftOf = new Map();
for (const r of RECIPES_DATA) {
  if (!recipeOf.has(low(r.nameEn))) recipeOf.set(low(r.nameEn), r);
  for (const i of r.ingredients || []) push(usedIn, i.nameEn, { recipe: r, count: i.count });
}
for (const r of CRAFT_EXTRA) {
  craftOf.set(low(r.nameEn), r);
  for (const [en, n] of r.ing) push(usedIn, en, { craft: r, count: n });
}
// A bundle can list the same item twice (Construction: 99 Wood twice): one line, counts added
for (const room of CC_ROOMS) for (const b of room.bundles || []) for (const it of b.items || []) {
  const same = bundles.get(low(it.nameEn))?.find(x => x.b === b && x.it.quality === it.quality);
  if (same) same.count += it.count || 1;
  else push(bundles, it.nameEn, { room, b, it, count: it.count || 1 });
}
for (const npc of NPCS_DATA) for (const level of ['loved', 'liked']) for (const g of npc.gifts?.[level] || []) {
  const en = (g.name.match(/\(([^)]+)\)\s*$/) || [])[1];
  if (en) push(gifts, en, { npc, level });
}
const museum = new Set(MUSEUM_ITEMS.map(m => low(m.nameEn)));

const COOKING = new Set(['cooking']);
const QUALITY = { silver: 'chất lượng Bạc', gold: 'chất lượng Vàng', iridium: 'chất lượng Iridium' };
const recipeTag = (r, extra = '') => `<button type="button" class="item-tag item-tag--link" data-action="open-detail" data-type="recipe" data-id="${r.id}">
  ${r.imageUrl ? `<img src="${r.imageUrl}" alt="" class="pixel-img" loading="lazy" data-fallback="hide">` : ''}<span>${nm(r)}</span>${extra}</button>`;
const npcTag = npc => `<button type="button" class="item-tag item-tag--link" data-action="open-detail" data-type="npc" data-id="${npc.id}">
  <img src="${npc.avatar}" alt="" class="pixel-img" loading="lazy" data-fallback="hide"><span>${nm(npc)}</span></button>`;
const need = n => (n > 1 ? ` <span class="muted">×${n}</span>` : '');
const box = (cls, icon, title, body) => `
  <div class="callout ${cls} relation-box">
    <h4 class="callout__title">${ico(icon)} ${t(title)}</h4>
    <div class="pill-row">${body}</div>
  </div>`;

// The "Related" part of an item popup ('' when nothing links to it)
export function relationsHtml(nameEn) {
  const k = low(nameEn);
  const parts = [];

  // How it is made
  const recipe = recipeOf.get(k), craft = craftOf.get(k);
  if (recipe) parts.push(box('callout--blue', COOKING.has(recipe.category) ? 'cooking' : 'crafting', COOKING.has(recipe.category) ? 'Nấu từ' : 'Chế tạo từ',
    `${recipeTag(recipe, ` <span class="muted">${t('xem công thức')}</span>`)} ${(recipe.ingredients || []).map(i => itemTag(i.nameEn, need(i.count))).join('')}`));
  else if (craft) parts.push(box('callout--blue', 'crafting', 'Chế tạo từ',
    `${craft.ing.map(([en, n]) => itemTag(en, need(n))).join('')}${craft.qty ? ` <span class="muted">→ ${t(`ra ${craft.qty} cái`)}</span>` : ''}`));

  // What it goes into
  const uses = usedIn.get(k) || [];
  const cook = uses.filter(u => u.recipe && COOKING.has(u.recipe.category));
  const make = uses.filter(u => !(u.recipe && COOKING.has(u.recipe.category)));
  if (cook.length) parts.push(box('callout--green', 'cooking', `Dùng để nấu (${cook.length} món)`, cook.map(u => recipeTag(u.recipe, need(u.count))).join('')));
  if (make.length) parts.push(box('callout--green', 'crafting', `Dùng để chế tạo (${make.length} món)`,
    make.map(u => u.recipe ? recipeTag(u.recipe, need(u.count)) : itemTag(u.craft.nameEn, need(u.count))).join('')));

  // Community Center bundles
  const inBundles = bundles.get(k) || [];
  if (inBundles.length) parts.push(box('callout--purple', 'bundles', 'Gói Nhà Cộng Đồng cần',
    inBundles.map(({ room, b, it, count }) => `<span class="item-tag">${ico(room.icon)}<span>${nm(b)} <span class="muted">· ${nm(room)}</span></span>${need(count)}${it.quality ? ` <span class="muted">(${t(QUALITY[it.quality] || it.quality)})</span>` : ''}</span>`).join('')));

  // Gifts
  const fans = gifts.get(k) || [];
  const loved = fans.filter(f => f.level === 'loved'), liked = fans.filter(f => f.level === 'liked');
  if (loved.length) parts.push(box('callout--red', 'loved', 'Món quà rất thích của', loved.map(f => npcTag(f.npc)).join('')));
  if (liked.length) parts.push(box('callout--red', 'gift', 'Món quà thích của', liked.map(f => npcTag(f.npc)).join('')));

  if (museum.has(k)) parts.push(box('callout--tip', 'museum', 'Bảo Tàng', `<span>${t('Quyên góp được cho Bảo Tàng của Gunther.')}</span>`));

  return parts.length ? `<h4 class="relation-head">${ico('search')} ${t('Liên quan')}</h4>${parts.join('')}` : '';
}
