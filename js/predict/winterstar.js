// ==========================================================================
// PREDICTION: FEAST OF THE WINTER STAR SECRET GIFTS
// (Utility.GetRandomWinterStarParticipant): who each player gives a gift
// to, and who gives one to them. The gift itself depends on where the
// giver stood before the festival, so only the possible gifts are listed.
// Ported from stardew-predictor (MIT).
// ==========================================================================

import { CSRandom, seedOfBig, dateOf, today, table, esc } from './core.js';
import { npcTag } from './npc.js';
import { itemTag } from '../lib/item-lookup.js';
import { t } from '../lib/i18n.js';

const PARTICIPANTS = ['Abigail', 'Caroline', 'Clint', 'Demetrius', 'Willy', 'Elliott', 'Emily', 'Evelyn', 'George', 'Gus', 'Haley', 'Harvey', 'Jas', 'Jodi',
  'Alex', 'Kent', 'Leah', 'Lewis', 'Linus', 'Marlon', 'Marnie', 'Maru', 'Pam', 'Penny', 'Pierre', 'Robin', 'Sam', 'Sebastian', 'Shane', 'Vincent'];
const GIFTS = {
  Clint: ['Iridium Bar', 'Gold Bar (5)', 'Geode (5)', 'Frozen Geode (5)', 'Magma Geode (5)'],
  Marnie: ['Egg (12)'],
  Robin: ['Wood (99)', 'Stone (50)', 'Hardwood (25)'],
  Willy: ['Warp Totem: Beach (25)', 'Dressed Spinner', 'Magnet'],
  Evelyn: ['Cookie'],
  Jas: ['Clay', 'Ancient Doll', 'Rainbow Shell', 'Geode', 'Frozen Geode', 'Magma Geode'],
  Vincent: ['Clay', 'Ancient Doll', 'Rainbow Shell', 'Geode', 'Frozen Geode', 'Magma Geode'],
  Leo: ['Clay', 'Ancient Doll', 'Rainbow Shell', 'Geode', 'Frozen Geode', 'Magma Geode'],
  DEFAULT: ['Pumpkin Pie', 'Poppyseed Muffin', 'Blackberry Cobbler', 'Glow Ring', 'Deluxe Speed-Gro (10)', 'Purple Mushroom', 'Nautilus Shell', 'Wine', 'Beer',
    'Tea Set', 'Pink Cake', 'Ruby', 'Emerald', 'Jade']
};

// One roll: Marlon (can't socialize) and year-1 Kent (not home yet) are dropped and rerolled
function pick(rng, list, year) {
  const npcs = list.slice();
  for (;;) {
    const i = rng.Next(npcs.length);
    if (npcs[i] === 'Marlon' || (year === 1 && npcs[i] === 'Kent')) npcs.splice(i, 1);
    else return npcs[i];
  }
}

export function secretSanta(ctx, year, player) {
  const list = ctx.leoMoved ? [...PARTICIPANTS, 'Leo'] : PARTICIPANTS;
  const seed = () => new CSRandom(seedOfBig(ctx, BigInt(Math.floor(ctx.gameID / 2)), year, ctx.mpIds[player] ?? 0));
  const giveTo = pick(seed(), list, year);
  // The game rerolls with the same seed for the giver, without the first pick
  const getFrom = pick(seed(), list.filter(n => n !== giveTo), year);
  return { giveTo, getFrom };
}

const gift = s => { const m = s.match(/^(.+?) \((\d+)\)$/); return m ? itemTag(m[1], ` <small>x${m[2]}</small>`) : itemTag(s); };

export default {
  id: 'winterstar', name: 'Ngôi sao Mùa đông', nameEn: 'Winter Star', icon: 'festival',
  intro: 'Lễ hội Ngôi sao Mùa đông (25 Mùa Đông): người bạn cần tặng quà bí mật và người sẽ tặng quà cho bạn. Bạn được báo trước một tuần qua thư; quà nhận được là một trong các món bên dưới.',
  introEn: 'Feast of the Winter Star (Winter 25): who you give a secret gift to and who gives one to you. You learn it by mail a week before; the gift you receive is one of those listed.',
  nav: { step: 1, start: ctx => dateOf(today(ctx)).year - 1, min: 0, stepLabel: 'Năm trước', nextLabel: 'Năm sau' },
  render(ctx, offset) {
    const year = offset + 1, now = dateOf(today(ctx)).year;
    const cls = year < now ? 'is-past' : year === now ? 'is-today' : '';
    const players = ctx.mpIds.length ? ctx.mpIds.map((_, i) => i) : [0];
    return `<p class="journal-sub">${t('Năm')} ${year}</p>` + table([t('Người chơi'), t('Tặng quà cho'), t('Nhận quà từ'), t('Quà có thể nhận')], players.map(p => {
      const { giveTo, getFrom } = secretSanta(ctx, year, p);
      return { cls, cells: [`<span data-no-i18n>${esc(ctx.names[p] || '?')}</span>`, npcTag(giveTo), npcTag(getFrom), (GIFTS[getFrom] || GIFTS.DEFAULT).slice().sort().map(gift).join('')] };
    }));
  }
};
