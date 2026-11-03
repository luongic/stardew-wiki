// ==========================================================================
// PREDICTION: PRIZE TICKET MACHINE (PrizeTicketMenu.getPrizeItem)
// The prize machine in Lewis' house gives a fixed list for the first 22
// tickets (choices decided by one roll per player), then a 9-prize cycle.
// The count is per player. Ported from stardew-predictor (MIT).
// ==========================================================================

import { rngOf, seedOfBig, CSRandom, table } from './core.js';
import { t } from '../lib/i18n.js';
import { PAGE, playerOf, countOf, navFor, rowClass, nameTag, qtyText, searchTable } from './crack-helpers.js';

// The player's one roll: seeded by Game ID and multiplayer id, same for every prize
const rollOf = (ctx, player) => (ctx.mpIds?.length
  ? new CSRandom(seedOfBig(ctx, ctx.gameID, ctx.mpIds[player] ?? ctx.mpIds[0]))
  : rngOf(ctx, ctx.gameID, 0)).NextDouble();

// Prize for the Nth ticket: [English name, quantity]
export function prizeAt(ctx, n, roll) {
  const level = n - 1;
  const of = list => list[Math.floor(roll * list.length)];
  switch (level) {
    case 0: return ['Raccoon Seeds', 12];
    case 1: return [roll < 0.5 ? 'Peach Sapling' : 'Orange Sapling', 1];
    case 2: return roll < 0.5 ? ['Mixed Seeds', 10] : ['Mixed Flower Seeds', 15];
    case 3: return ['Mystery Box', 3];
    case 4: case 15: return ['Stardrop Tea', 1];
    case 5: return ['Blue Pinstripe Bed', 1];
    case 6: return [of(['Quality Sprinkler', 'Preserves Jar', 'Mushroom Log']), 4];
    case 7: return [roll < 0.5 ? 'Apple Sapling' : 'Pomegranate Sapling', 1];
    case 8: return ['Friendship 101', 1];
    case 9: return [['Cherry Bomb', 20], ['Bomb', 12], ['Mega Bomb', 6]][Math.floor(3 * roll)];
    case 10: return ['Sports Cap', 1];
    case 11: return [roll < 0.5 ? 'Fish Smoker' : 'Dehydrator', 1];
    case 12: return [roll < 0.5 ? 'Artifact Trove' : 'Mystery Box', 4];
    case 13: return [of(['House Plant (1)', 'House Plant (2)', 'House Plant (3)']), 1];
    case 14: return [of(['Stardew Valley Almanac', 'Bait And Bobber', "Woodcutter's Weekly", 'Mining Monthly', 'Combat Quarterly']), 1];
    case 16: return ['Cow Decal', 1];
    case 17: return ['Omni Geode', 8];
    case 18: return [roll < 0.5 ? 'Bee House' : 'Keg', 4];
    case 19: return ['Diamond', 5];
    case 20: return ['Mystery Box', 5];
    case 21: return ['Magic Rock Candy', 1];
  }
  // After that: a 9-prize cycle, each cycle with its own roll
  const rng = rngOf(ctx, ctx.gameID, level - level % 9);
  const pick = list => list[rng.Next(list.length)];
  switch (level % 9) {
    case 1: return ['Fairy Dust', rng.Next(1, 3)];
    case 2: return [pick(['Iridium Bar', 'Spicy Eel', 'Triple Shot Espresso', 'Crab Cakes', 'Artifact Trove']), 5];
    case 3: return [pick(['House Plant (1)', 'House Plant (2)', 'House Plant (3)']), 1];
    case 4: return ['Stardrop Tea', 1];
    case 5: return ['Treasure Chest', 1];
    case 6: return ['Iridium Sprinkler', 1];
    case 7: return [pick(['Fancy House Plant (1)', 'Fancy House Plant (2)', 'Fancy House Plant (3)', 'Pig Painting']), 1];
    case 8: return rng.Next(2) === 0 ? ['Bomb', 15] : ['Mega Bomb', 8];
    default: return ['Mystery Box', 5];
  }
}

export default {
  id: 'prize', name: 'Máy đổi vé thưởng', nameEn: 'Prize Tickets', icon: 'prize_ticket',
  intro: 'Phần thưởng của máy đổi Vé Thưởng trong nhà Lewis, theo số vé bạn đã đổi. Số vé tính riêng từng người chơi.',
  introEn: "Rewards from the prize ticket machine in Lewis' house, by how many tickets you have claimed. The count is kept per player.",
  nav: navFor('prize', 'ticketPrizesClaimed'),
  players: true,
  search: {
    placeholder: 'Tìm phần thưởng (VD: Stardrop Tea)...',
    run(ctx, query, opts) {
      const player = playerOf(ctx, 'prize', opts), roll = rollOf(ctx, player);
      return searchTable(ctx, {
        query, done: countOf(ctx, 'ticketPrizesClaimed', player), cols: [t('Phần thưởng')], unit: 'vé',
        resultsAt: n => [prizeAt(ctx, n, roll)[0]]
      });
    }
  },
  render(ctx, offset, opts) {
    const player = playerOf(ctx, 'prize', opts), roll = rollOf(ctx, player);
    const done = countOf(ctx, 'ticketPrizesClaimed', player);
    const rows = [];
    for (let g = 1; g <= PAGE; g++) {
      const n = offset + g, [item, qty] = prizeAt(ctx, n, roll);
      rows.push({ cls: rowClass(n, done), cells: [String(n), nameTag(item, '', item === 'Magic Rock Candy' ? 'is-rare' : '') + qtyText(qty)] });
    }
    return table([t('Thứ'), t('Phần thưởng')], rows);
  }
};
