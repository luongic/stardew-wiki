// ==========================================================================
// PREDICTIONS: WHAT THE SAVE FILE TELLS THEM
// Everything the predictions need from a save (Game ID, days played, how
// many geodes each player cracked, unlocked areas...), read once when a save
// is loaded and kept in the browser. Without a save, a context can also be
// made from a Game ID typed by hand (defaults as in stardew-predictor).
// Ported from stardew-predictor's parseSummary() (MIT License).
// ==========================================================================

import { kids, kid, text, xsiType, cleanId } from '../lib/farm-save.js';
import { P_OBJECTS } from '../../data/predictor-data.js';
import { CSRandom } from './core.js';

const DEFAULT_CHARACTERS = ['George', 'Evelyn', 'Alex', 'Haley', 'Emily', 'Vincent', 'Sam', 'Jodi', 'Kent', 'Clint', 'Lewis', 'Pierre', 'Abigail',
  'Caroline', 'Gus', 'Penny', 'Pam', 'Harvey', 'Elliott', 'Demetrius', 'Robin', 'Maru', 'Sebastian', 'Linus', 'Wizard', 'Jas', 'Marnie', 'Shane',
  'Leah', 'Dwarf', 'Krobus', 'Sandy', 'Willy', 'Leo'];
// Geode results that are never museum donations (so never "needed")
const NOT_DONATIONS = ['Coal', 'Clay', 'Stone', 'Copper Ore', 'Iron Ore', 'Gold Ore', 'Iridium Ore', 'Golden Pumpkin', 'Treasure Chest', 'Pearl',
  'Banana Sapling', 'Mango Sapling', 'Pineapple Seeds', 'Taro Tuber', 'Mahogany Seed', 'Fossilized Skull', 'Treasure Appraisal Guide'];
// Not villagers: pets, monsters and shopkeepers that never visit the island
const IGNORE = new Set(['Child', 'Horse', 'Cat', 'Dog', 'Fly', 'Grub', 'GreenSlime', 'Gunther', 'Marlon', 'Bouncer', 'Mister Qi', 'Henchman',
  'Birdie', 'Fizz', 'Pet', 'Raccoon', 'Bat', 'Truffle Crab']);

// A context from a Game ID alone: worst-case luck, nothing unlocked
export function manualContext(gameID, daysPlayed = 1) {
  const ctx = {
    source: 'manual', gameID: Number(gameID), daysPlayed: Math.max(1, Number(daysPlayed) || 1), dayAdjust: 0, version: '1.6',
    names: ['?'], genders: [], mpIds: [], geodesCracked: [0], mysteryBoxesOpened: [0], ticketPrizesClaimed: [0], timesEnchanted: [0], trashCansChecked: [0],
    deepestMineLevel: 0, timesFedRaccoons: 0, visitsUntilY1Guarantee: -1, dailyLuck: -0.1, luckLevel: 0,
    quarryUnlocked: false, desertUnlocked: false, greenhouseUnlocked: false, theaterUnlocked: false, ccComplete: false, jojaComplete: false,
    hasFurnaceRecipe: false, hasSpecialCharm: false, leoMoved: false, hasGarbageBook: false, gotMysteryBook: false,
    hardmodeMines: false, qiCropsActive: false, useLegacyRandom: false, characters: [...DEFAULT_CHARACTERS], donated: [...NOT_DONATIONS]
  };
  return finish(ctx);
}

// The cart's guaranteed Red Cabbage in year 1: the visit count it started from
function finish(ctx) {
  ctx.originalGuarantee = -1;
  if (ctx.visitsUntilY1Guarantee >= 0) {
    const day = ctx.daysPlayed + ctx.dayAdjust;
    ctx.originalGuarantee = ctx.visitsUntilY1Guarantee + Math.floor(day / 7) + Math.floor((day + 2) / 7) + (day >= 99) + (day >= 100) + (day >= 101);
  } else if (ctx.visitsUntilY1Guarantee === -99) {
    // Not rolled yet (a brand new save): the game rolls it from the Game ID
    ctx.originalGuarantee = new CSRandom(12 * ctx.gameID).Next(2, 31);
  }
  ctx.dailyLuck = Math.min(0.1, Math.max(-0.1, ctx.dailyLuck));
  if (ctx.hasSpecialCharm) ctx.dailyLuck += 0.025;
  return ctx;
}

const statsOf = farmer => new Map(kids(kid(kid(farmer, 'stats'), 'Values'), 'item').map(i => [text(kid(i, 'key'), 'string') || kid(i, 'key')?.textContent.trim(), Number(kid(i, 'value')?.textContent) || 0]));

export function readPredictContext(root) {
  const host = kid(root, 'player');
  const farmers = [host, ...kids(kid(root, 'farmhands'), 'Farmer').filter(f => text(f, 'name') || text(f, 'userID'))];
  const stats = farmers.map(statsOf);
  const stat = key => stats.map(s => s.get(key) || 0);
  const mail = new Set(kids(kid(host, 'mailReceived'), 'string').map(s => s.textContent.trim()));
  const events = new Set(kids(kid(host, 'eventsSeen'), 'int').concat(kids(kid(host, 'eventsSeen'), 'string')).map(e => e.textContent.trim()));
  const locations = kids(kid(root, 'locations'), 'GameLocation');

  // Museum donations, by English name
  const donated = new Set(NOT_DONATIONS);
  const museum = locations.find(l => xsiType(l) === 'LibraryMuseum');
  for (const item of kids(kid(museum, 'museumPieces'), 'item')) {
    const o = P_OBJECTS[cleanId(kid(item, 'value')?.textContent.trim())];
    if (o) donated.add(o[0]);
  }

  // Villagers in location order (as Utility.getAllCharacters() walks them)
  const friendship = new Map(kids(kid(host, 'friendshipData'), 'item').map(i => [kid(i, 'key')?.textContent.trim(), text(kid(kid(i, 'value'), 'Friendship'), 'Status')]));
  const desertUnlocked = mail.has('ccVault'), leoMoved = mail.has('leoMoved');
  const characters = [];
  for (const loc of locations) {
    for (const group of loc.getElementsByTagName('characters')) {
      for (const npc of group.getElementsByTagName('NPC')) {
        const who = text(npc, 'name'), type = xsiType(npc);
        if (IGNORE.has(type) || IGNORE.has(who)) continue;
        if (who === 'Leo' && !leoMoved) continue;
        if (who === 'Krobus' && (friendship.get('Krobus') || 'Unmet') === 'Unmet') continue;
        if (who === 'Sandy' && !desertUnlocked) continue;
        characters.push(who);
      }
    }
  }

  const ctx = {
    source: 'save', gameID: Number(text(root, 'uniqueIDForThisGame')), version: text(root, 'gameVersion') || '1.6',
    daysPlayed: stats[0].get('daysPlayed') || 1, dayAdjust: 0,
    names: farmers.map(f => text(f, 'name')), genders: farmers.map(f => text(f, 'gender') || 'Female'), mpIds: farmers.map(f => text(f, 'UniqueMultiplayerID') || '0'),
    geodesCracked: stat('geodesCracked'), mysteryBoxesOpened: stat('MysteryBoxesOpened'), ticketPrizesClaimed: stat('ticketPrizesClaimed'),
    timesEnchanted: stat('timesEnchanted'), trashCansChecked: stat('trashCansChecked'),
    deepestMineLevel: Number(text(host, 'deepestMineLevel')) || 0, timesFedRaccoons: Number(text(root, 'timesFedRaccoons')) || 0,
    visitsUntilY1Guarantee: kid(root, 'visitsUntilY1Guarantee') ? Number(text(root, 'visitsUntilY1Guarantee')) : -1,
    // Luck is rolled each night and cannot be predicted: assume the worst, like stardew-predictor
    dailyLuck: -0.1, luckLevel: 0,
    quarryUnlocked: mail.has('ccCraftsRoom'), desertUnlocked, greenhouseUnlocked: mail.has('ccPantry'),
    theaterUnlocked: mail.has('ccMovieTheater') && !mail.has('ccMovieTheaterJoja'),
    ccComplete: events.has('191393'), jojaComplete: events.has('502261'),
    hasFurnaceRecipe: kids(kid(host, 'craftingRecipes'), 'item').some(i => kid(i, 'key')?.textContent.trim() === 'Furnace'),
    hasSpecialCharm: mail.has('HasSpecialCharm'), leoMoved, hasGarbageBook: (stats[0].get('Book_Trash') || 0) > 0,
    gotMysteryBook: mail.has('GotMysteryBook'), hardmodeMines: Number(text(root, 'minesDifficulty')) > 0,
    qiCropsActive: kids(kid(root, 'specialOrders'), 'SpecialOrder').some(o => /DROP_QI_BEANS/.test(text(o, 'specialRule'))),
    useLegacyRandom: text(root, 'useLegacyRandom') === 'true',
    characters, donated: [...donated]
  };
  return finish(ctx);
}
