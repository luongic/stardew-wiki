// ==========================================================================
// PREDICTION: GARBAGE CANS (GameLocation.TryGetGarbageItem, Data/GarbageCans)
// What each town garbage can gives on the first search of the day, with the
// worst daily luck. Rare finds (Garbage Hat, Trash Catalogue) need 20 / 50
// cans searched. Ported from stardew-predictor by MouseyPounds (MIT).
// ==========================================================================

import { rngOf, CSRandom, seedOf, hashString, calendar, dateOf, today, monthStart } from './core.js';
import { itemTag } from '../lib/item-lookup.js';
import { P_OBJECTS } from '../../data/predictor-data.js';
import { t } from '../lib/i18n.js';

// Cans in the original's order: [game id, short English name, Vietnamese label]
const CANS = [
  ['JodiAndKent', 'Jodi', 'Nhà Jodi'], ['EmilyAndHaley', 'Emily', 'Nhà Emily'], ['Mayor', 'Mayor', 'Nhà Thị trưởng'],
  ['Museum', 'Museum', 'Bảo Tàng'], ['Blacksmith', 'Clint', 'Lò Rèn'], ['Saloon', 'Saloon', 'Quán Rượu'],
  ['Evelyn', 'George', 'Nhà George'], ['JojaMart', 'Joja', 'JojaMart']
];
const FALLBACK = ['153', '216', '403', '309', '310', '311', 'SEASON', '168', '167', '170', '171', '172'];
export const DISH = 'Dish of the Day';

// Utility.getRandomItemFromSeason, as the garbage cans use it
export function randomItemFromSeason(ctx, rng, season) {
  const items = ['Topaz', 'Amethyst', 'Cave Carrot', 'Quartz', 'Earth Crystal', 'Seaweed', 'Joja Cola', 'Green Algae', 'Red Mushroom'];
  if (ctx.deepestMineLevel > 40) items.push('Aquamarine', 'Jade', 'Diamond', 'Frozen Tear', 'Purple Mushroom');
  if (ctx.deepestMineLevel > 80) items.push('Ruby', 'Emerald', 'Fire Quartz');
  if (ctx.desertUnlocked) items.push('Coconut', 'Cactus Fruit', 'Sandfish', 'Scorpion Carp');
  if (ctx.hasFurnaceRecipe) items.push('Copper Bar', 'Iron Bar', 'Gold Bar', 'Refined Quartz');
  items.push(...[
    ['Wild Horseradish', 'Daffodil', 'Leek', 'Dandelion', 'Anchovy', 'Sardine', 'Bream', 'Largemouth Bass',
      'Smallmouth Bass', 'Carp', 'Catfish', 'Sunfish', 'Herring', 'Eel', 'Seaweed', 'Joja Cola', 'Flounder'],
    ['Pufferfish', 'Tuna', 'Bream', 'Largemouth Bass', 'Rainbow Trout', 'Carp', 'Pike', 'Sunfish',
      'Red Mullet', 'Octopus', 'Red Snapper', 'Super Cucumber', 'Spice Berry', 'Grape', 'Sweet Pea', 'Flounder'],
    ['Common Mushroom', 'Wild Plum', 'Hazelnut', 'Blackberry', 'Anchovy', 'Sardine', 'Bream', 'Largemouth Bass',
      'Smallmouth Bass', 'Salmon', 'Walleye', 'Carp', 'Catfish', 'Eel', 'Red Snapper', 'Sea Cucumber', 'Super Cucumber', 'Midnight Carp'],
    ['Winter Root', 'Crystal Fruit', 'Snow Yam', 'Crocus', 'Tuna', 'Sardine', 'Bream', 'Largemouth Bass',
      'Walleye', 'Perch', 'Pike', 'Red Mullet', 'Herring', 'Red Snapper', 'Squid', 'Sea Cucumber', 'Midnight Carp']
  ][season]);
  return items[rng.Next(items.length)];
}

// Finds on a day: [{ can (index in CANS), item (English), stack, rare }], sorted like the original
export function trashOn(ctx, day) {
  const d = day + ctx.dayAdjust, checked = ctx.trashCansChecked?.[0] || 0;
  const luck = 0.2 + ctx.dailyLuck + (ctx.hasGarbageBook ? 0.2 : 0);
  const synced = key => new CSRandom(seedOf(ctx, hashString(key), ctx.gameID, d));
  const finds = [];
  CANS.forEach(([id], can) => {
    const rng = rngOf(ctx, d, ctx.gameID / 2, 777 + hashString(id));
    // The game warms the generator up twice
    for (let w = 0; w < 2; w++) { const n = rng.Next(0, 100); for (let i = 0; i < n; i++) rng.NextDouble(); }
    let item = '', stack = 1, rare = false;
    const base = rng.NextDouble() < luck;
    if (checked >= 20 && rng.NextDouble() < 0.002) { rare = true; item = 'Garbage Hat'; }
    else if (checked >= 50 && rng.NextDouble() < 0.002) { rare = true; item = 'Trash Catalogue'; }
    if (!item) {
      if (ctx.qiCropsActive && rng.NextDouble() < 0.25) item = 'Qi Bean';
      else if (base) {
        if (can === 4) {
          if (rng.NextDouble() < 0.2 + ctx.dailyLuck) {
            item = ['Copper Ore', 'Iron Ore', 'Coal'][rng.Next(3)];
            stack = rng.Next(1, 5);
          }
        } else if (can === 6) {
          if (rng.NextDouble() < 0.2 + ctx.dailyLuck) item = 'Cookie';
        } else if (can === 7) {
          if (synced('garbage_joja').NextDouble() < 0.2) {
            if (ctx.theaterUnlocked) item = rng.Next(4) > 0 ? 'Corn' : 'Movie Ticket';
            else if (!ctx.ccComplete) item = 'Joja Cola';
          }
        } else if (can === 3) {
          if (synced('garbage_museum_535').NextDouble() < 0.2 + ctx.dailyLuck) {
            item = synced('garbage_museum_749').NextDouble() < 0.05 ? 'Omni Geode' : 'Geode';
          }
        } else if (can === 5) {
          if (synced('garbage_saloon_dish').NextDouble() < 0.2 + ctx.dailyLuck) item = DISH;
        }
      }
    }
    // The fallback list every can shares
    if (!item) {
      const mega = checked >= 20 && rng.NextDouble() < 0.01;
      if (mega || base) {
        const roll = FALLBACK[rng.Next(mega ? 7 : FALLBACK.length)];
        item = roll === 'SEASON' ? randomItemFromSeason(ctx, rng, dateOf(day).seasonIndex) : P_OBJECTS[roll][0];
      }
    }
    if (item) finds.push({ can, item, stack, rare });
  });
  return finds.sort((a, b) => (a.rare - b.rare) || (CANS[a.can][1] < CANS[b.can][1] ? -1 : 1));
}

export default {
  id: 'trash', name: 'Thùng rác', nameEn: 'Garbage Cans', icon: 'tool_trashcan_upgrades',
  intro: 'Đồ tìm được trong các thùng rác ở Thị trấn (lần lục đầu tiên trong ngày), tính với may mắn thấp nhất nên ngày may mắn có thể được nhiều hơn. Dòng in đậm là đồ hiếm (Mũ Thùng Rác, Catalogue Rác).',
  introEn: 'What the town garbage cans give on the first search of the day, assuming the worst daily luck (a lucky day can give more). Bold lines are rare finds (Garbage Hat, Trash Catalogue).',
  nav: { step: 28, big: 112, start: ctx => monthStart(today(ctx)) },
  render(ctx, start) {
    return calendar(ctx, start, day => {
      const finds = trashOn(ctx, day);
      if (!finds.length) return '<span class="predict-none">—</span>';
      return finds.map(f => {
        const what = f.item === DISH ? t('Món đặc biệt trong ngày') : itemTag(f.item, f.stack > 1 ? ` x${f.stack}` : '');
        const line = `<span class="predict-hit">${t(CANS[f.can][2])}: ${what}</span>`;
        return f.rare ? `<strong>${line}</strong>` : line;
      }).join('');
    });
  }
};
