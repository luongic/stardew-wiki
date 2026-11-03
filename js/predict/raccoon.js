// ==========================================================================
// PREDICTION: MR. RACCOON'S REQUESTS (Raccoon._activateMrRaccoon,
// Raccoon.addNextIngredient, Raccoon.getBundleReward)
// The two items the raccoons ask for each time and the reward for it.
// Some requests depend on the season they are asked in, so all four are
// listed when they differ. Ported from stardew-predictor (MIT).
// ==========================================================================

import { rngOf, table, seasonName } from './core.js';
import { itemTag } from '../lib/item-lookup.js';
import { ico } from '../lib/icons.js';
import { P_OBJECTS } from '../../data/predictor-data.js';
import { t } from '../lib/i18n.js';

const PAGE = 10;
const N = id => P_OBJECTS[id][0];
const SMOKED = [
  ['136', '132', '700', '702', '156', '267', '706'],
  ['136', '132', '700', '702', '156', '267', '706', '138', '701', '146', '130'],
  ['136', '132', '700', '702', '156', '701', '269', '139', '139'],
  ['136', '132', '700', '702', '156', '146', '130', '141', '269']
];
const FRUIT = [
  ['90', '634', '638', '400', '88'],
  ['90', '258', '260', '635', '636', '88', '396'],
  ['90', '613', '282', '637', '410', '88', '406'],
  ['90', '414', '414', '88', 'Powdermelon', 'Powdermelon']
];
const MUSHROOMS = [['422', '404', '257'], ['422', '404'], ['422', '404', '281'], ['422', '404']];
const VEGGIES = [
  ['190', '188', '250', '192', '16', '22', 'Carrot', 'Carrot'],
  ['270', '264', '256', '78', 'SummerSquash', 'SummerSquash'],
  ['Broccoli', 'Broccoli', '278', '272', '276'],
  ['416', '412', '78']
];
const MIXED = ['Moss_10', '110_1', '168_5', '766_99', '767_20', '535_8', '536_5', '537_3', '393_4', '397_2', '684_20', '72_1', '68_3', '156_3'];

// An item: { name (English, may be "Smoked X", "Dried X", "X Jelly"...) or
// seasons: [4 names], qty }. Rewards may also be { special: 'unshipped' }.
// Returns { request: [item, item], reward: item } for request number `row` (1-based)
export function raccoonAt(ctx, row) {
  const fed = row - 1;
  const rng = [0, 1, 2, 3].map(() => {
    const r = rngOf(ctx, ctx.gameID, fed * 377);
    for (let i = 0; i < 10; i++) r.Next();
    return r;
  });
  const all = fn => [0, 1, 2, 3].map(fn);
  const pickTwo = (lists, a, b) => {
    const prev = [];
    const first = all(s => { const i = rng[s].Next(lists[s].length); prev[s] = i; return a(N(lists[s][i])); });
    const second = all(s => { let i = prev[s]; while (i === prev[s]) i = rng[s].Next(lists[s].length); return b(N(lists[s][i])); });
    return [{ seasons: first, qty: 1 }, { seasons: second, qty: 1 }];
  };
  let which;
  if (fed < 5) which = fed % 5;
  else { which = rng[0].Next(5); for (let s = 1; s < 4; s++) rng[s].Next(); }
  let request;
  switch (which) {
    case 0: {
      const list = ['722', '721', '716', '719', '723', '718', '372'];
      const first = { name: N(list[rng[0].Next(list.length)]), qty: 5 };
      for (let s = 1; s < 4; s++) rng[s].Next();
      request = [first, { seasons: all(s => `Smoked ${N(SMOKED[s][rng[s].Next(SMOKED[s].length)])}`), qty: 1 }];
      break;
    }
    case 1: request = pickTwo(FRUIT, n => `Dried ${n}`, n => `${n} Jelly`); break;
    case 2: {
      const first = { seasons: all(s => `Dried ${N(MUSHROOMS[s][rng[s].Next(MUSHROOMS[s].length)])}`), qty: 1 };
      const list = ['Egg (Any)', 'Cave Carrot', 'White Algae'];
      request = [first, { name: list[rng[0].Next(list.length)], qty: 5 }];
      break;
    }
    case 3: request = pickTwo(VEGGIES, n => `${n} Juice`, n => `Pickled ${n}`); break;
    default: {
      let i = rng[0].Next(MIXED.length);
      const prev = i;
      const [a, qa] = MIXED[i].split('_');
      while (i === prev) i = rng[0].Next(MIXED.length);
      const [b, qb] = MIXED[i].split('_');
      request = [{ name: N(a), qty: Number(qa) }, { name: N(b), qty: Number(qb) }];
    }
  }
  // The reward comes after feeding, so it uses the row number
  let reward;
  switch (row) {
    case 1: reward = { name: 'Raccoon Seeds', qty: 25 }; break;
    case 2: reward = { name: 'Raccoon Journal', qty: 1 }; break;
    case 3: reward = { name: 'Raccoon Hat', qty: 1 }; break;
    case 4: reward = { name: 'Fairy Dust', qty: 7 }; break;
    case 5: reward = { name: 'Jungle Tank', qty: 1 }; break;
    default: {
      const r = rngOf(ctx, ctx.gameID, row * 377);
      for (let i = 0; i < 10; i++) r.Next();
      reward = [{ name: 'Fairy Dust', qty: 7 }, { name: 'Book Of Stars', qty: 1 }, { special: 'unshipped' },
        { name: 'Stardrop Tea', qty: 1 }, { name: 'Raccoon Seeds', qty: 25 }][r.Next(5)];
    }
  }
  // Seasonal lists that came out the same in every season collapse to one item
  for (const x of request) if (x.seasons && x.seasons.every(n => n === x.seasons[0])) { x.name = x.seasons[0]; delete x.seasons; }
  return { request, reward };
}

// "Smoked Salmon" -> Salmon tag + "(hun khói)"...
const FORMS = [[/^Smoked (.+)$/, 'hun khói'], [/^Dried (.+)$/, 'sấy khô'], [/^(.+) Jelly$/, 'mứt'], [/^(.+) Juice$/, 'nước ép'], [/^Pickled (.+)$/, 'muối chua']];
function tagOf(en) {
  if (en === 'Egg (Any)') return `${itemTag('Egg')} ${t('(trứng bất kỳ)')}`;
  for (const [re, label] of FORMS) {
    const m = en.match(re);
    if (m) return itemTag(m[1], ` (${t(label)})`);
  }
  return itemTag(en);
}
function itemCells(x) {
  if (x.special === 'unshipped') return [`${t('Món chưa từng bán kế tiếp')}<br>${t('hoặc')} ${itemTag('Mystery Box')}`, `1<br>${t('hoặc')} 5`];
  if (x.seasons) return [x.seasons.map((n, s) => `<span class="predict-hit">${ico(['spring', 'summer', 'fall', 'winter'][s])} ${seasonName(s)}: ${tagOf(n)}</span>`).join(''), String(x.qty)];
  return [tagOf(x.name), String(x.qty)];
}

export default {
  id: 'raccoon', name: 'Gấu Mèo', nameEn: 'Raccoon Requests', icon: 'raccoon_icon',
  intro: 'Hai món Gia đình Gấu Mèo (Gốc Cây Khổng Lồ, Rừng Cindersap) yêu cầu mỗi lần và phần thưởng nhận được. Một số yêu cầu tùy theo mùa lúc được hỏi nên có thể liệt kê đủ bốn mùa.',
  introEn: 'The two items the Raccoon family (Giant Stump, Cindersap Forest) asks for each time and the reward you get. Some requests depend on the season they are asked in, so all four seasons may be listed.',
  nav: { step: PAGE, big: 50, min: 0, start: ctx => PAGE * Math.floor((ctx.timesFedRaccoons || 0) / PAGE),
    stepLabel: '10 lần trước', nextLabel: '10 lần sau', bigLabel: '50 lần trước', bigNextLabel: '50 lần sau' },
  render(ctx, offset) {
    const fedSoFar = ctx.timesFedRaccoons || 0, rows = [];
    for (let g = 1; g <= PAGE; g++) {
      const row = offset + g, { request, reward } = raccoonAt(ctx, row);
      rows.push({ cls: row - 1 === fedSoFar ? 'is-today' : row - 1 < fedSoFar ? 'is-past' : '',
        cells: [row.toLocaleString('en-US'), ...itemCells(request[0]), ...itemCells(request[1]), ...itemCells(reward)] });
    }
    // The Giant Stump after it is repaired (picture: Official Stardew Valley Wiki)
    const figure = `<figure class="predict-figure">
      <img src="assets/predict/giant_stump.png" alt="${t('Gốc Cây Khổng Lồ của Gia đình Gấu Mèo ở Rừng Cindersap')}" class="pixel-img" loading="lazy" data-fallback="hide">
      <figcaption class="muted">${t('Gốc Cây Khổng Lồ của Gia đình Gấu Mèo ở Rừng Cindersap. Ảnh: Official Stardew Valley Wiki.')}</figcaption>
    </figure>`;
    return figure + table([t('Lần'), t('Món thứ nhất'), t('SL'), t('Món thứ hai'), t('SL'), t('Phần thưởng'), t('SL')], rows);
  }
};
