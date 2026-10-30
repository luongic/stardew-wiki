// ==========================================================================
// FARM SAVE READER
// Reads a Stardew Valley save file (the XML file named like "Farm_123456789"
// in the save folder) entirely in the browser and turns the Farm location
// into the planner's format: buildings, objects (machines, sprinklers,
// fences, debris), trees, tilled soil with crops, paths and grass.
// Nothing is uploaded anywhere.
// ==========================================================================

import { t } from './i18n.js';

const FARM_TYPES = ['Tiêu chuẩn', 'Ven sông', 'Rừng', 'Đồi núi', 'Hoang dã', 'Bốn góc', 'Bãi biển', 'Đồng cỏ'];

const BUILDINGS = {
  'Farmhouse': 'farmhouse', 'Greenhouse': 'greenhouse', 'Shipping Bin': 'shipping_bin', 'Pet Bowl': 'pet_bowl',
  'Coop': 'coop', 'Big Coop': 'big_coop', 'Deluxe Coop': 'deluxe_coop', 'Barn': 'barn', 'Big Barn': 'big_barn', 'Deluxe Barn': 'deluxe_barn',
  'Shed': 'shed', 'Big Shed': 'big_shed', 'Silo': 'silo', 'Well': 'well', 'Stable': 'stable', 'Fish Pond': 'fish_pond',
  'Slime Hutch': 'slime_hutch', 'Mill': 'mill', 'Junimo Hut': 'junimo_hut', 'Earth Obelisk': 'earth_obelisk', 'Water Obelisk': 'water_obelisk',
  'Desert Obelisk': 'desert_obelisk', 'Island Obelisk': 'island_obelisk', 'Gold Clock': 'gold_clock'
};

const OBJECTS = {
  'Sprinkler': 'sprinkler', 'Quality Sprinkler': 'quality_sprinkler', 'Iridium Sprinkler': 'iridium_sprinkler',
  'Scarecrow': 'scarecrow', 'Deluxe Scarecrow': 'deluxe_scarecrow', 'Rarecrow': 'scarecrow', 'Bee House': 'bee_house',
  'Keg': 'keg', 'Preserves Jar': 'preserves_jar', 'Cask': 'cask', 'Cheese Press': 'cheese_press', 'Mayonnaise Machine': 'mayonnaise_machine',
  'Loom': 'loom', 'Oil Maker': 'oil_maker', 'Furnace': 'furnace', 'Crystalarium': 'crystalarium', 'Seed Maker': 'seed_maker',
  'Fish Smoker': 'fish_smoker', 'Dehydrator': 'dehydrator', 'Worm Bin': 'worm_bin', 'Deluxe Worm Bin': 'worm_bin', 'Geode Crusher': 'geode_crusher',
  'Chest': 'chest', 'Big Chest': 'big_chest', 'Stone Chest': 'chest', 'Big Stone Chest': 'big_chest', 'Hopper': 'hopper', 'Auto-Grabber': 'auto_grabber',
  'Mini-Obelisk': 'mini_obelisk', 'Farm Computer': 'farm_computer', 'Torch': 'torch', 'Lightning Rod': 'lightning_rod', 'Solar Panel': 'solar_panel',
  'Mushroom Log': 'mushroom_log', 'Tapper': 'tapper', 'Heavy Tapper': 'heavy_tapper',
  'Stone': 'stone', 'Weeds': 'weeds', 'Twig': 'twig'
};
// Fence item ids (Data/Objects): wood, stone, iron, gate, hardwood
const FENCES = { '322': 'wood_fence', '323': 'stone_fence', '324': 'iron_fence', '325': 'gate', '298': 'hardwood_fence' };
// Flooring ids (Data/FloorsAndPaths)
const FLOORS = ['wood_floor', 'stone_floor', 'weathered_floor', 'crystal_floor', 'straw_floor', 'gravel_path', 'wood_path', 'crystal_path',
  'cobblestone_path', 'stepping_stone_path', 'brick_floor', 'rustic_plank_floor', 'stone_walkway_floor'];
// Crops by the item they harvest
const CROPS = {
  24: 'parsnip', 190: 'cauliflower', 192: 'potato', 248: 'garlic', 250: 'kale', 188: 'green_bean', 400: 'strawberry', 252: 'rhubarb',
  591: 'tulip', 597: 'blue_jazz', 433: 'coffee_bean', 271: 'unmilled_rice', 258: 'blueberry', 254: 'melon', 260: 'hot_pepper', 256: 'tomato',
  264: 'radish', 266: 'red_cabbage', 304: 'hops', 262: 'wheat', 270: 'corn', 421: 'sunflower', 593: 'summer_spangle', 376: 'poppy',
  268: 'starfruit', 832: 'pineapple', 830: 'taro_root', 276: 'pumpkin', 282: 'cranberries', 272: 'eggplant', 274: 'artichoke', 284: 'beet',
  278: 'bok_choy', 280: 'yam', 398: 'grape', 300: 'amaranth', 595: 'fairy_rose', 454: 'ancient_fruit', 417: 'sweet_gem_berry', 889: 'qi_fruit',
  815: 'tea_leaves', Carrot: 'carrot', SummerSquash: 'summer_squash', Broccoli: 'broccoli', Powdermelon: 'powdermelon'
};
const WILD_TREES = { 1: 'oak_tree', 2: 'maple_tree', 3: 'pine_tree' };
const FRUIT_TREES = { 628: 'cherry_tree', 629: 'apricot_tree', 630: 'orange_tree', 631: 'peach_tree', 632: 'pomegranate_tree', 633: 'apple_tree', 69: 'banana_tree', 835: 'mango_tree' };
const CLUMPS = { 600: 'large_stump', 602: 'large_log', 672: 'boulder', 752: 'boulder', 754: 'boulder', 756: 'boulder', 758: 'boulder' };

// ---------- XML helpers (direct children only: buildings contain whole indoor locations) ----------
export const kids = (el, name) => (el ? [...el.children].filter(c => c.localName === name) : []);
export const kid = (el, name) => kids(el, name)[0] || null;
export const text = (el, name) => kid(el, name)?.textContent?.trim() ?? '';
const num = (el, name) => Number(text(el, name)) || 0;
export const xsiType = el => el.getAttribute('xsi:type') || el.getAttributeNS('http://www.w3.org/2001/XMLSchema-instance', 'type') || '';
const vec = el => ({ x: Math.round(num(el, 'X')), y: Math.round(num(el, 'Y')) });
export const cleanId = id => String(id).replace(/^\(\w+\)/, '');
// Game locations of a save, e.g. location(root, 'Farm')
export const location = (root, type) => kids(kid(root, 'locations'), 'GameLocation').find(l => xsiType(l) === type) || null;

function fail(msg) { const e = new Error(msg); e.userMessage = msg; throw e; }

// Checks the file is a main save file and returns its <SaveGame> element
export function parseSave(xml) {
  if (!/^\s*(<\?xml[^>]*>\s*)?<SaveGame/.test(xml.slice(0, 500))) {
    fail(t('Đây không phải file save chính. Hãy chọn file có tên giống thư mục save (VD: Farm_123456789), không phải file SaveGameInfo.'));
  }
  const doc = new DOMParser().parseFromString(xml, 'application/xml');
  if (doc.querySelector('parsererror')) fail(t('File save bị lỗi hoặc không đầy đủ.'));
  return doc.documentElement;
}

// The in-game date of a save: { season, day, year }
export function readSaveDay(root) {
  const season = text(root, 'currentSeason').toLowerCase();
  return {
    season: ['spring', 'summer', 'fall', 'winter'].includes(season) ? season : 'spring',
    day: Math.min(28, Math.max(1, Number(text(root, 'dayOfMonth')) || 1)),
    year: Math.max(1, Number(text(root, 'year')) || 1)
  };
}

// Takes the save's text, or its <SaveGame> element when already parsed
export function readFarmSave(xml) {
  const root = typeof xml === 'string' ? parseSave(xml) : xml;
  const farm = location(root, 'Farm');
  if (!farm) fail(t('Không tìm thấy nông trại trong file save.'));

  const whichFarm = Number(text(root, 'whichFarm')) || 0;
  const farmName = text(kid(root, 'player'), 'farmName');
  const objects = [];
  const ground = {};
  const seen = new Set();
  const addObj = (type, x, y, extra = {}) => {
    const k = `${x},${y}`;
    if (seen.has(k) && !extra.w) return;
    seen.add(k);
    objects.push({ t: type, x, y, ...extra });
  };

  // Buildings (1.6 saves list the farmhouse, greenhouse, shipping bin and pet bowl here too)
  for (const b of kids(kid(farm, 'buildings'), 'Building')) {
    const type = text(b, 'buildingType');
    const id = BUILDINGS[type] || (/cabin/i.test(type) ? 'cabin' : null);
    if (!id) continue;
    if (type === 'Greenhouse' && text(b, 'isUnderConstruction') === 'true') continue;
    objects.push({ t: id, x: num(b, 'tileX'), y: num(b, 'tileY'), w: num(b, 'tilesWide') || undefined, h: num(b, 'tilesHigh') || undefined });
  }

  // Objects: machines, sprinklers, fences, debris
  for (const item of kids(kid(farm, 'objects'), 'item')) {
    const { x, y } = vec(kid(kid(item, 'key'), 'Vector2'));
    const o = kid(kid(item, 'value'), 'Object');
    if (!o) continue;
    const name = text(o, 'name');
    const itemId = cleanId(text(o, 'itemId') || text(o, 'parentSheetIndex'));
    if (xsiType(o) === 'Fence') {
      addObj(text(o, 'isGate') === 'true' ? 'gate' : FENCES[itemId] || FENCES[text(o, 'whichType') === '2' ? '323' : '322'] || 'wood_fence', x, y);
    } else if (OBJECTS[name]) addObj(OBJECTS[name], x, y);
    else if (/Rarecrow/.test(name)) addObj('scarecrow', x, y);
    else if (/stone/i.test(name) && text(o, 'type') === 'Litter') addObj('stone', x, y);
    else if (/weeds/i.test(name)) addObj('weeds', x, y);
    else if (name !== 'Artifact Spot' && name !== 'Seed Spot') addObj('other', x, y, { name });
  }

  // Terrain: tilled soil (+crop), trees, fruit trees, grass, paths
  for (const item of kids(kid(farm, 'terrainFeatures'), 'item')) {
    const { x, y } = vec(kid(kid(item, 'key'), 'Vector2'));
    const f = kid(kid(item, 'value'), 'TerrainFeature');
    if (!f) continue;
    const type = xsiType(f);
    const k = `${x},${y}`;
    if (type === 'HoeDirt') {
      const crop = kid(f, 'crop');
      const harvest = crop && cleanId(text(crop, 'indexOfHarvest'));
      ground[k] = crop && CROPS[harvest] && text(crop, 'dead') !== 'true' ? `crop_${CROPS[harvest]}` : 'farmland';
    } else if (type === 'Tree') {
      const tree = WILD_TREES[cleanId(text(f, 'treeType'))];
      if (tree && num(f, 'growthStage') >= 5) addObj(tree, x, y);
      else if (tree) addObj('sapling', x, y);
    } else if (type === 'FruitTree') {
      const tree = FRUIT_TREES[cleanId(text(f, 'treeId') || text(f, 'indexOfFruit'))];
      addObj(tree || 'apple_tree', x, y);
    } else if (type === 'Grass') {
      ground[k] = 'grass';
    } else if (type === 'Flooring') {
      const which = text(f, 'whichFloor');
      ground[k] = FLOORS[Number(which)] || 'gravel_path';
    } else if (type === 'Bush') {
      addObj('bush', x, y);
    }
  }

  // Big debris: stumps, logs, boulders (2x2)
  for (const c of kids(kid(farm, 'resourceClumps'), 'ResourceClump')) {
    const id = CLUMPS[cleanId(text(c, 'parentSheetIndex'))] || 'boulder';
    const { x, y } = vec(kid(c, 'tile'));
    objects.push({ t: id, x, y });
  }
  for (const b of kids(kid(farm, 'largeTerrainFeatures'), 'LargeTerrainFeature')) {
    if (xsiType(b) !== 'Bush') continue;
    const { x, y } = vec(kid(b, 'tilePosition'));
    addObj('bush', x, y);
  }

  // Soil under a building or object is not shown in game either
  for (const o of objects) delete ground[`${o.x},${o.y}`];

  const warning = whichFarm !== 0
    ? `${t('File save dùng bản đồ')} "${FARM_TYPES[whichFarm] || t('khác')}". ${t('Hiện mới có bản đồ Tiêu chuẩn nên vị trí có thể lệch.')}`
    : '';
  return { farmName, whichFarm, objects, ground, warning };
}
