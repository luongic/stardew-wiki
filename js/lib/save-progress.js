// ==========================================================================
// PROGRESS FROM A SAVE FILE
// Reads the main player's progress from a Stardew Valley save and maps it
// onto this site's checklists:
//   recipes  - dishes cooked, items crafted, buildings built, house and tool
//              upgrades, forged weapons owned
//   bundles  - Community Center slots turned in (rooms already completed
//              count as fully done)
//   museum   - pieces donated to Gunther
// It also lists the fish never caught, for the Master Angler goal.
// Everything is matched by English name; the game's numeric item ids are
// turned into names with data/item-ids.js.
// ==========================================================================

import { parseSave, kids, kid, text, xsiType, cleanId, location } from './farm-save.js';
import { OBJECT_NAMES } from '../../data/item-ids.js';
import { RECIPES_DATA } from '../../data/recipes-data.js';
import { CC_ROOMS } from '../../data/bundles-data.js';
import { MUSEUM_ITEMS } from '../../data/museum-data.js';
import { ITEMS_DATA } from '../../data/items-data.js';

// "Large Egg (White)", "Cookies", "Wild Horseradish" -> comparable keys
const norm = s => String(s || '').toLowerCase().replace(/\(.*?\)/g, '').replace(/[^a-z0-9]/g, '');
const nameOf = id => OBJECT_NAMES[cleanId(id)] || '';
const ALIASES = { cookie: 'cookies', cranberries: 'cranberries' };
const same = (a, b) => { const x = norm(a), y = norm(b); return x === y || ALIASES[x] === y || ALIASES[y] === x || x + 's' === y || y + 's' === x; };

// <item><key><string>K</string></key><value><int>V</int></value></item> -> [[K, V]]
const dict = el => kids(el, 'item').map(i => [kid(i, 'key')?.textContent.trim(), kid(i, 'value')]);

const ROOM_MAIL = { crafts_room: 'ccCraftsRoom', pantry: 'ccPantry', fish_tank: 'ccFishTank', boiler_room: 'ccBoilerRoom', bulletin_board: 'ccBulletin', vault: 'ccVault' };
const TOOL_LEVELS = ['', 'Copper Tool Upgrades', 'Steel Tool Upgrades', 'Gold Tool Upgrades', 'Iridium Tool Upgrades'];
// A bigger building means the smaller one was built first
const BUILT_BEFORE = { 'Big Coop': ['Coop'], 'Deluxe Coop': ['Coop', 'Big Coop'], 'Big Barn': ['Barn'], 'Deluxe Barn': ['Barn', 'Big Barn'], 'Big Shed': ['Shed'] };

export function readSaveProgress(xml) {
  const root = parseSave(xml);
  const player = kid(root, 'player');
  const mail = new Set(kids(kid(player, 'mailReceived'), 'string').map(s => s.textContent.trim()));

  // ---------- Recipes ----------
  const recipes = new Set();
  const markRecipe = (pred) => RECIPES_DATA.forEach(r => { if (pred(r)) recipes.add(r.id); });
  const cooked = dict(kid(player, 'recipesCooked')).filter(([, v]) => Number(v?.textContent) > 0).map(([k]) => nameOf(k));
  for (const name of cooked) markRecipe(r => r.category === 'cooking' && same(r.nameEn, name));
  const crafted = dict(kid(player, 'craftingRecipes')).filter(([, v]) => Number(v?.textContent) > 0).map(([k]) => k);
  for (const name of crafted) markRecipe(r => !['cooking', 'buildings', 'magical_buildings', 'farmhouse', 'tools'].includes(r.category) && same(r.nameEn, name));

  const farm = location(root, 'Farm');
  const built = new Set(kids(kid(farm, 'buildings'), 'Building').map(b => text(b, 'buildingType')));
  for (const b of [...built]) (BUILT_BEFORE[b] || []).forEach(x => built.add(x));
  for (const b of built) markRecipe(r => ['buildings', 'magical_buildings'].includes(r.category) && same(r.nameEn, b));

  const house = Number(text(player, 'houseUpgradeLevel')) || 0;
  markRecipe(r => r.category === 'farmhouse' && Number((r.nameEn.match(/Upgrade (\d)/) || [])[1]) <= house);

  // Tools in the backpack: the best upgrade level reached
  const items = kids(kid(player, 'items'), 'Item');
  let toolLevel = 0;
  for (const it of items) {
    if (['Axe', 'Pickaxe', 'Hoe', 'WateringCan'].includes(xsiType(it))) toolLevel = Math.max(toolLevel, Number(text(it, 'upgradeLevel')) || 0);
  }
  for (let lv = 1; lv <= toolLevel; lv++) markRecipe(r => r.category === 'tools' && r.nameEn === TOOL_LEVELS[lv]);
  const trashLevel = Number(text(player, 'trashCanLevel')) || 0;
  if (trashLevel > 0) markRecipe(r => r.category === 'tools' && /trash can/i.test(r.nameEn));
  const owned = new Set(items.map(it => norm(text(it, 'name'))));
  markRecipe(r => r.category === 'weapons' && owned.has(norm(r.nameEn)));

  // ---------- Community Center ----------
  const bundles = new Set();
  const cc = location(root, 'CommunityCenter');
  const slots = new Map(dict(kid(cc, 'bundles')).map(([k, v]) => [k, kids(kid(v, 'ArrayOfBoolean'), 'boolean').map(b => b.textContent.trim() === 'true')]));
  const allBundles = CC_ROOMS.flatMap(room => room.bundles.map(b => ({ room, b })));
  const unmatchedBundles = [];
  for (const [k, v] of dict(kid(root, 'bundleData'))) {
    const index = k.split('/')[1];
    const f = (v?.textContent || '').split('/');
    const hit = allBundles.find(({ b }) => same(b.nameEn, `${f[0]} Bundle`) || same(b.nameEn, f[0]));
    if (!hit) { unmatchedBundles.push(f[0]); continue; }
    const done = slots.get(index) || [];
    const list = (f[2] || '').trim().split(/\s+/);
    for (let i = 0; i * 3 < list.length; i++) {
      if (!done[i]) continue;
      const id = list[i * 3];
      const name = id === '-1' ? 'gold' : nameOf(id);
      let j = hit.b.items.findIndex((it, n) => !bundles.has(`${hit.b.id}:${n}`) && (id === '-1' ? /g$|gold/i.test(it.nameEn) : same(it.nameEn, name)));
      if (j < 0 && hit.b.items.length === list.length / 3) j = i;
      if (j >= 0) bundles.add(`${hit.b.id}:${j}`);
    }
  }
  // Rooms finished in the game: every slot of every bundle in them
  for (const room of CC_ROOMS) {
    if (!mail.has(ROOM_MAIL[room.id])) continue;
    for (const b of room.bundles) b.items.forEach((it, i) => bundles.add(`${b.id}:${i}`));
  }

  // ---------- Museum ----------
  const museum = new Set();
  const lib = location(root, 'LibraryMuseum');
  for (const [, v] of kids(kid(lib, 'museumPieces'), 'item').map(i => [null, kid(i, 'value')])) {
    const name = nameOf(v?.textContent.trim());
    const m = MUSEUM_ITEMS.find(x => same(x.nameEn, name));
    if (m) museum.add(m.id);
  }

  // ---------- Fish ----------
  const caught = new Set(dict(kid(player, 'fishCaught')).map(([k]) => norm(nameOf(k))));
  // Fish collection: every fish incl. crab pot catches; the Extended Family legends don't count
  const fish = ITEMS_DATA.filter(i => i.category === 'fish' && !i.subCategory?.includes('Extended Family'));
  const missingFish = fish.filter(f => !caught.has(norm(f.nameEn)));

  return {
    farmName: text(player, 'farmName'),
    playerName: text(player, 'name'),
    recipes: [...recipes],
    bundles: [...bundles],
    museum: [...museum],
    fish: { caught: fish.length - missingFish.length, total: fish.length, missing: missingFish, caughtEn: fish.filter(f => caught.has(norm(f.nameEn))).map(f => f.nameEn) },
    unmatchedBundles
  };
}
