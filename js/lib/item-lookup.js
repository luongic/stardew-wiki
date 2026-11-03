// ==========================================================================
// ITEM LOOKUP BY ENGLISH NAME
// Save files and the predictions name items in English. This finds the
// site's entry for such a name (recipes, items, museum pieces, farm
// objects), so they can be shown with the Vietnamese name and an icon.
// ==========================================================================

import { ITEMS_DATA } from '../../data/items-data.js';
import { RECIPES_DATA } from '../../data/recipes-data.js';
import { FARM_ITEMS } from '../../data/farm-data.js';
import { MUSEUM_ITEMS } from '../../data/museum-data.js';
import { isEn } from './i18n.js';

const byEn = new Map();
for (const x of [...FARM_ITEMS, ...RECIPES_DATA, ...ITEMS_DATA, ...MUSEUM_ITEMS]) {
  if (x.nameEn && !byEn.has(x.nameEn.toLowerCase())) byEn.set(x.nameEn.toLowerCase(), x);
}
const clean = s => String(s || '').replace(/\s*\([^)]*\)\s*$/, '');

// "Egg (White)" -> Egg, "Large Egg (Brown)" -> Large Egg...
export function itemInfo(en) {
  const s = String(en).toLowerCase(), base = s.replace(/\s*\(.*\)$/, '');
  return byEn.get(s) || byEn.get(base) || byEn.get(base.replace(/^(large |big )/, ''));
}
export const itemName = en => { const x = itemInfo(en); return x ? (isEn ? x.nameEn : clean(x.name)) : en; };
export const itemIcon = en => { const x = itemInfo(en); return x?.imageUrl || x?.icon || x?.sprite || ''; };

// An item as a small tag: icon (when the site has one) + name; `extra` goes after the name
export function itemTag(en, extra = '', cls = '') {
  const src = itemIcon(en);
  const known = !!itemInfo(en);
  return `<span class="item-tag ${cls}" title="${String(en).replace(/"/g, '&quot;')}">${src ? `<img src="${src}" alt="" class="pixel-img" loading="lazy" data-fallback="hide">` : ''}<span${known ? '' : ' data-no-i18n'}>${itemName(en)}</span>${extra}</span>`;
}
