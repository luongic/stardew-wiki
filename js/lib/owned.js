// ==========================================================================
// ITEMS ALREADY OWNED (from the last save)
// Finds an item of this site's checklists (Community Center slots, museum
// pieces) in the backpacks, chests, fridges and grabbers of the last save
// read, with a spot a player can walk to (see labeledContainers).
// ==========================================================================

import { loadJSON, KEYS } from './storage.js';
import { ico } from './icons.js';
import { OBJECT_NAMES } from '../../data/item-ids.js';
import { labeledContainers } from '../tabs/journal.js';

const Q_RANK = { silver: 1, gold: 2, iridium: 3 };
// Matched by item id where the save's name differs: eggs/milk named by colour
// or size, artisan goods named after their fruit ("Grape Wine"), which must
// not catch look-alikes such as River Jelly, and the two Strange Dolls.
const SAVE_IDS = {
  'Large Egg': ['174'], 'Large Brown Egg': ['182'], 'Large Goat Milk': ['438'], Jelly: ['344'], Wine: ['348'], Honey: ['340'],
  'Strange Doll (green)': ['126'], 'Strange Doll (yellow)': ['127']
};
const holds = (item, it) => SAVE_IDS[item.nameEn] ? SAVE_IDS[item.nameEn].includes(it.id) : it.name === item.nameEn || OBJECT_NAMES[it.id] === item.nameEn;

// null without a save; otherwise item ({ nameEn, quality? }) ->
// [{ s (container with .spot), n }] of stacks good enough, biggest first
export function ownedFinder() {
  const spots = labeledContainers(loadJSON(KEYS.journal, null));
  if (!spots.length) return null;
  return item => {
    const need = Q_RANK[item.quality] || 0;
    return spots.map(s => ({ s, n: s.items.filter(it => (Q_RANK[it.quality] || 0) >= need && holds(item, it)).reduce((a, it) => a + it.stack, 0) }))
      .filter(x => x.n > 0)
      .sort((a, b) => b.n - a.n);
  };
}

export const ownedTotal = spots => spots.reduce((a, x) => a + x.n, 0);

const spotIcon = s => ico(s.kind === 'backpack' ? 'guest' : s.kind === 'fridge' ? 'cooking' : 'chest');

// One line of an "already owned" list: the item, how many of `need`, and each spot
export function ownedRow(item, spots, need = 1) {
  const have = ownedTotal(spots);
  return `
    <li>
      <img src="${item.icon}" alt="" class="pixel-img" loading="lazy" data-fallback="hide">
      <strong>${item.name}</strong>
      <span class="tag ${have >= need ? 'tag--green' : 'tag--gold'}" title="Đang có / cần">${have}/${need}</span>
      ${spots.map(({ s, n }) => `<span class="tag">${spotIcon(s)} ${s.spot} · ${n}${s.where === 'Farm' && s.x !== undefined
        ? ` <button class="link-btn" type="button" data-action="journal-map" data-x="${s.x}" data-y="${s.y}">Bản đồ</button>` : ''}</span>`).join('')}
    </li>`;
}
