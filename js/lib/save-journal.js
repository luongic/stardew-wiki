// ==========================================================================
// FARM JOURNAL FROM A SAVE FILE
// A read-only summary of the player's world for the Journal tab: friendships,
// what is in the backpack and every chest, machines at work, growing crops,
// farm animals, quests, collections, stats, Marlon's monster goals and the
// Perfection breakdown. Co-op saves give one entry per player (`players`);
// chests, machines, crops and animals are shared by the whole farm.
// Names are the game's English item names; the tab shows them translated.
// ==========================================================================

import { kids, kid, text, xsiType, cleanId, location } from './farm-save.js';
import { OBJECT_NAMES, OBJECT_KINDS } from '../../data/item-ids.js';
import { MONSTER_GOALS, PERFECTION_VILLAGERS, DATABLE, STARDROPS, SHIPPED_CATEGORIES } from '../../data/journal-data.js';
import { MUSEUM_ITEMS } from '../../data/museum-data.js';

const num = (el, name) => Number(text(el, name)) || 0;
const dict = el => kids(el, 'item').map(i => [kid(i, 'key')?.textContent.trim(), kid(i, 'value')]);
const vec = el => ({ x: Math.round(num(el, 'X')), y: Math.round(num(el, 'Y')) });
const QUALITY = ['', 'silver', 'gold', '', 'iridium'];

// One stack of items: { name (English), id, stack, quality }
function itemOf(el) {
  const name = text(el, 'name') || text(el, 'Name');
  if (!name) return null;
  return { name, id: cleanId(text(el, 'itemId') || text(el, 'parentSheetIndex')), stack: num(el, 'stack') || 1, quality: QUALITY[num(el, 'quality')] || '' };
}
const itemsIn = el => kids(el, 'Item').map(itemOf).filter(Boolean);

// Every location of the save with a readable label, building interiors included
function locations(root) {
  const out = [];
  for (const loc of kids(kid(root, 'locations'), 'GameLocation')) {
    const name = text(loc, 'name');
    out.push({ el: loc, id: name, label: name });
    for (const b of kids(kid(loc, 'buildings'), 'Building')) {
      const indoors = kid(b, 'indoors');
      if (indoors) out.push({ el: indoors, id: `${name}/${text(b, 'buildingType')}@${num(b, 'tileX')},${num(b, 'tileY')}`, label: text(b, 'buildingType'), parent: name });
    }
  }
  return out;
}

function readFriends(player) {
  const friends = {};
  for (const [name, v] of dict(kid(player, 'friendshipData'))) {
    const f = kid(v, 'Friendship');
    if (!f) continue;
    friends[name] = { points: num(f, 'Points'), giftsWeek: num(f, 'GiftsThisWeek'), giftsToday: num(f, 'GiftsToday'), talked: text(f, 'TalkedToToday') === 'true', status: text(f, 'Status') || 'Friendly' };
  }
  return friends;
}

const norm = s => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
const museumOf = new Map(MUSEUM_ITEMS.map(m => [norm(m.nameEn), m.id]));

// Marlon's goals from the player's own kill counts
function readGoals(player) {
  const killed = new Map(dict(kid(kid(player, 'stats'), 'specificMonstersKilled')).map(([k, v]) => [k, Number(v?.textContent) || 0]));
  const count = names => [...killed].filter(([k]) => names.some(n => k === n || k.startsWith(`${n} `))).reduce((a, [, v]) => a + v, 0);
  return MONSTER_GOALS.map(g => ({ id: g.id, killed: count(g.monsters) }));
}

// Quest log: story quests by id, Help Wanted quests by their own title
function readQuests(player) {
  return kids(kid(player, 'questLog'), 'Quest').map(q => ({
    id: text(q, 'id'), type: (xsiType(q) || 'Quest').replace(/Quest$/, '') || 'Basic',
    title: text(q, '_questTitle'), goal: text(q, '_currentObjective'), npc: text(q, 'npcName') || text(q, 'target'),
    money: num(q, 'moneyReward'), daysLeft: num(q, 'daysLeft'), done: text(q, 'completed') === 'true'
  }));
}

// Artifacts and minerals this player has found, with the museum ones not yet donated
function readFound(player, donated) {
  const found = [];
  for (const [field, kind] of [['archaeologyFound', 'artifact'], ['mineralsFound', 'mineral']]) {
    for (const [k, v] of dict(kid(player, field))) {
      const id = cleanId(k), name = OBJECT_NAMES[id] || '';
      const museum = museumOf.get(norm(name));
      if (museum) found.push({ id, name, kind, count: Number(kids(kid(v, 'ArrayOfInt') || v, 'int')[0]?.textContent) || 1, museum, donated: donated.has(museum) });
    }
  }
  return found;
}

function readPerfection(player, root, built, goals, friends) {
  const mail = new Set(kids(kid(player, 'mailReceived'), 'string').map(s => s.textContent.trim()));
  const shipped = dict(kid(player, 'basicShipped')).map(([k]) => cleanId(k)).filter(id => {
    const [type, cat] = OBJECT_KINDS[id] || [];
    return type === 'Basic' && SHIPPED_CATEGORIES.includes(cat);
  }).length;
  const fishKinds = dict(kid(player, 'fishCaught')).map(([k]) => cleanId(k)).filter(id => (OBJECT_KINDS[id] || [])[0] === 'Fish').length;
  const skillSum = ['farmingLevel', 'fishingLevel', 'foragingLevel', 'miningLevel', 'combatLevel', 'luckLevel'].reduce((a, f) => a + num(player, f), 0);
  return {
    shipped, fish: fishKinds,
    friends: PERFECTION_VILLAGERS.filter(n => (friends[n]?.points || 0) >= (DATABLE.includes(n) ? 2000 : 2500)).length,
    obelisks: ['Earth Obelisk', 'Water Obelisk', 'Desert Obelisk', 'Island Obelisk'].filter(o => built.includes(o)).length,
    clock: built.includes('Gold Clock') ? 1 : 0,
    slayer: goals.filter((g, i) => g.killed >= MONSTER_GOALS[i].goal).length,
    level: Math.min(25, Math.floor(skillSum / 2)),
    stardrops: STARDROPS.filter(s => mail.has(s.flag)).length,
    stardropFlags: STARDROPS.filter(s => mail.has(s.flag)).map(s => s.flag),
    cooking: dict(kid(player, 'recipesCooked')).filter(([, v]) => Number(v?.textContent) > 0).length,
    crafting: dict(kid(player, 'craftingRecipes')).filter(([k, v]) => k !== 'Wedding Ring' && Number(v?.textContent) > 0).length,
    walnuts: num(root, 'goldenWalnutsFound')
  };
}

function readPlayer(player, root, built, donated) {
  const friends = readFriends(player);
  const goals = readGoals(player);
  const stats = Object.fromEntries(dict(kid(kid(player, 'stats'), 'Values')).map(([k, v]) => [k, Number(v?.textContent) || 0]));
  const notes = kids(kid(player, 'secretNotesSeen'), 'int').map(i => Number(i.textContent));
  return {
    name: text(player, 'name'),
    friends, goals,
    backpack: { where: 'backpack', kind: 'backpack', items: itemsIn(kid(player, 'items')) },
    mailbox: kids(kid(player, 'mailbox'), 'string').length,
    quests: readQuests(player),
    stats,
    books: Object.keys(stats).filter(k => k.startsWith('Book_') && stats[k] > 0),
    achievements: kids(kid(player, 'achievements'), 'int').map(i => Number(i.textContent)),
    found: readFound(player, donated),
    // Fish caught: [how many, biggest size in inches]
    fishRecords: dict(kid(player, 'fishCaught')).map(([k, v]) => {
      const [count, size] = kids(kid(v, 'ArrayOfInt') || v, 'int').map(i => Number(i.textContent));
      return { id: cleanId(k), count: count || 0, size: size > 0 ? size : 0 };
    }).filter(f => OBJECT_NAMES[f.id]),
    notes: notes.filter(n => n < 1000).length,
    scraps: notes.filter(n => n >= 1000).length,
    perfection: readPerfection(player, root, built, goals, friends)
  };
}

export function readJournal(root) {
  const locs = locations(root);
  const storage = [];   // { where, x, y, items, kind }
  const machines = [];  // { name, product, minutes, ready, where, x, y }
  const crops = [];     // { harvest, days, where, x, y, dead, regrow }
  const animals = [];   // { name, type, hearts, happiness, age, where, produce }

  for (const loc of locs) {
    for (const item of kids(kid(loc.el, 'objects'), 'item')) {
      const { x, y } = vec(kid(kid(item, 'key'), 'Vector2'));
      const o = kid(kid(item, 'value'), 'Object');
      if (!o) continue;
      const name = text(o, 'name');
      if (xsiType(o) === 'Chest' && /chest|fridge/i.test(name)) {
        storage.push({ where: loc.id, label: loc.label, parent: loc.parent, x, y, kind: 'chest', name, items: itemsIn(kid(o, 'items')) });
        continue;
      }
      const held = kid(o, 'heldObject');
      // An Auto-Grabber keeps what it collects in a little chest
      if (held && xsiType(held) === 'Chest') {
        const items = itemsIn(kid(held, 'items'));
        if (items.length) storage.push({ where: loc.id, label: loc.label, parent: loc.parent, x, y, kind: 'grabber', name, items });
        continue;
      }
      if (held && held.getAttribute('xsi:nil') !== 'true' && text(held, 'name')) {
        machines.push({ name, product: text(held, 'name'), productId: cleanId(text(held, 'itemId')), minutes: num(o, 'minutesUntilReady'), ready: text(o, 'readyForHarvest') === 'true', where: loc.id, label: loc.label, parent: loc.parent, x, y });
      }
    }
    // The kitchen fridge
    const fridge = kid(loc.el, 'fridge');
    if (fridge && kid(fridge, 'items')) storage.push({ where: loc.id, label: loc.label, kind: 'fridge', name: 'Fridge', items: itemsIn(kid(fridge, 'items')) });

    for (const item of kids(kid(loc.el, 'terrainFeatures'), 'item')) {
      const f = kid(kid(item, 'value'), 'TerrainFeature');
      const crop = f && xsiType(f) === 'HoeDirt' && kid(f, 'crop');
      if (!crop) continue;
      const { x, y } = vec(kid(kid(item, 'key'), 'Vector2'));
      const phases = kids(kid(crop, 'phaseDays'), 'int').map(i => Number(i.textContent));
      const phase = num(crop, 'currentPhase'), day = num(crop, 'dayOfCurrentPhase');
      const full = text(crop, 'fullGrown') === 'true';
      let days = 0;
      const last = phases.length - 1;   // the final "99999" phase is the grown crop
      if (full) days = day;              // a regrowing crop counts down to its next harvest
      else if (phase < last) days = phases.slice(phase, last).reduce((a, b) => a + b, 0) - day;
      // Wild ginger / spring onions have no harvest index, only a forage kind
      const forage = text(crop, 'forageCrop') === 'true' ? (text(crop, 'whichForageCrop') === '2' ? 'Ginger' : 'Spring Onion') : '';
      crops.push({ harvest: cleanId(text(crop, 'indexOfHarvest')) || forage, days: Math.max(0, days), where: loc.id, label: loc.label, x, y,
        dead: text(crop, 'dead') === 'true', watered: num(f, 'state') === 1, regrow: Number(text(crop, 'regrowAfterHarvest') || -1) > 0 || full });
    }

    for (const a of [...kids(kid(loc.el, 'animals'), 'item').map(i => kid(kid(i, 'value'), 'FarmAnimal')), ...kids(kid(loc.el, 'Animals'), 'FarmAnimal')]) {
      if (!a) continue;
      animals.push({ name: text(a, 'name'), type: text(a, 'type'), hearts: Math.floor(num(a, 'friendshipTowardFarmer') / 200), friendship: num(a, 'friendshipTowardFarmer'),
        happiness: num(a, 'happiness'), age: num(a, 'age'), pet: text(a, 'wasPet') === 'true', produce: OBJECT_NAMES[cleanId(text(a, 'currentProduce'))] || '',
        where: loc.parent ? loc.label : loc.id });
    }
  }

  // ---------- Players (host first, then the farmhands who have joined) ----------
  const farm = locs.find(l => l.id === 'Farm');
  const built = kids(kid(farm?.el, 'buildings'), 'Building').map(b => text(b, 'buildingType'));
  const donated = new Set(kids(kid(location(root, 'LibraryMuseum'), 'museumPieces'), 'item')
    .map(i => museumOf.get(norm(OBJECT_NAMES[cleanId(text(i, 'value'))]))).filter(Boolean));
  const players = [kid(root, 'player'), ...kids(kid(root, 'farmhands'), 'Farmer').filter(f => text(f, 'name'))]
    .map(p => readPlayer(p, root, built, donated));

  // Perfection counts the best player in each category; obelisks, the clock and walnuts are shared
  const perfection = { ...players[0].perfection };
  for (const p of players.slice(1)) {
    for (const [k, v] of Object.entries(p.perfection)) if (typeof v === 'number' && v > perfection[k]) {
      perfection[k] = v;
      if (k === 'stardrops') perfection.stardropFlags = p.perfection.stardropFlags;
    }
  }

  return {
    storage, machines, crops, animals, players, perfection,
    donated: donated.size,
    world: { weather: text(root, 'weatherForTomorrow') || 'Sun', luck: Number(text(root, 'dailyLuck')) || 0, lostBooks: num(root, 'lostBooksFound'), walnuts: num(root, 'goldenWalnutsFound') }
  };
}
