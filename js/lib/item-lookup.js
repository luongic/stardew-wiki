// ==========================================================================
// ITEM LOOKUP BY ENGLISH NAME
// Save files and the predictions name items in English. This finds the
// site's entry for such a name (items, extra items, recipes, museum pieces,
// farm objects), so they can be shown with the Vietnamese name, an icon and,
// when the site has a page for it, a click that opens the detail popup.
// ==========================================================================

import { ITEMS_DATA } from '../../data/items-data.js';
import { RECIPES_DATA } from '../../data/recipes-data.js';
import { FARM_ITEMS } from '../../data/farm-data.js';
import { MUSEUM_ITEMS } from '../../data/museum-data.js';
import { EXTRA_ITEMS, FURNITURE_VI } from '../../data/extra-items.js';
import { CLOTHES } from '../../data/save-data.js';
import { isEn } from './i18n.js';

// English name -> { x: entry, type: detail popup type or null }. Earlier lists win.
const byEn = new Map();
const add = (list, type) => {
  for (const x of list) if (x.nameEn && !byEn.has(x.nameEn.toLowerCase())) byEn.set(x.nameEn.toLowerCase(), { x, type });
};
add(ITEMS_DATA, 'item');
add(EXTRA_ITEMS, 'item');
add(RECIPES_DATA, 'recipe');
add(MUSEUM_ITEMS, null);
add(FARM_ITEMS, null);

// Names the game data spells differently from the site
const ALIASES = { 'l. goat milk': 'large goat milk', 'piã±a colada': 'piña colada', 'horse: the book': 'horse the book', 'raccoon journal': 'ways of the wild',
  cookie: 'cookies' };
const clean = s => String(s || '').replace(/\s*\([^)]*\)\s*$/, '');
const squash = s => String(s).replace(/[^A-Za-z0-9]/g, '');

function find(en) {
  let s = String(en).toLowerCase();
  s = ALIASES[s] || s;
  const base = s.replace(/\s*\(.*\)$/, '');
  return byEn.get(s) || byEn.get(ALIASES[base] || base) || byEn.get(base.replace(/^(large |big )/, ''));
}

// "Egg (White)" -> Egg, "Large Egg (Brown)" -> Large Egg, "House Plant (3)" -> House Plant...
export const itemInfo = en => find(en)?.x;
export function itemName(en) {
  const x = itemInfo(en);
  if (x) return isEn ? x.nameEn : clean(x.name);
  // Furniture and shirts: no page here, but the Vietnamese name is known
  const vi = !isEn && (FURNITURE_VI[squash(en)] || FURNITURE_VI[squash(clean(en))] || CLOTHES[squash(en)] || CLOTHES[squash(clean(en))]);
  return vi || en;
}
export const itemIcon = en => { const x = itemInfo(en); return x?.imageUrl || x?.icon || x?.sprite || ''; };

// An item as a small tag: icon (when the site has one) + name; `extra` goes after the name.
// Items with a page on the site open their detail popup when clicked.
export function itemTag(en, extra = '', cls = '') {
  const hit = find(en);
  const src = itemIcon(en);
  const name = itemName(en);
  const inner = `${src ? `<img src="${src}" alt="" class="pixel-img" loading="lazy" data-fallback="hide">` : ''}<span${name === en ? ' data-no-i18n' : ''}>${name}</span>${extra}`;
  const title = String(en).replace(/"/g, '&quot;');
  return hit?.type
    ? `<button type="button" class="item-tag item-tag--link ${cls}" title="${title}" data-action="open-detail" data-type="${hit.type}" data-id="${hit.x.id}">${inner}</button>`
    : `<span class="item-tag ${cls}" title="${title}">${inner}</span>`;
}
