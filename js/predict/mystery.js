// ==========================================================================
// PREDICTION: MYSTERY BOXES (Utility.getTreasureFromGeode, 1.6 boxes)
// What the Nth Mystery Box or Golden Mystery Box a player opens gives. The
// count is per player and shared by both kinds; golden boxes roll a little
// differently once the Farming Mastery perk is unlocked, so they get two
// columns. Ported from stardew-predictor (MIT).
// ==========================================================================

import { rngOf, table } from './core.js';
import { t } from '../lib/i18n.js';
import { P_OBJECTS } from '../../data/predictor-data.js';
import { itemTag } from '../lib/item-lookup.js';
import { PAGE, playerOf, countOf, navFor, mpHalf, rowClass, nameTag, qtyText, mark, searchTable } from './crack-helpers.js';

const N = id => P_OBJECTS[id][0];
// Cork Bobber / Dressed Spinner need Fishing 6, else the box gives Dish O' The Sea x2
const SKILL = 'Chỉ ra khi kỹ năng Câu cá từ 6 trở lên, nếu không sẽ ra'; 

// One box: c = 0 Mystery Box, 1 Golden (no mastery), 2 Golden (Farming Mastery)
function boxAt(ctx, n, player, c) {
  const rareMod = c === 0 ? 1 : 2;
  const extraBookChance = ctx.gotMysteryBook ? 0 : 0.0004 * n;
  const rng = rngOf(ctx, n, ctx.gameID / 2, mpHalf(ctx, player));
  for (let k = 0; k < 2; k++) {
    const warm = rng.Next(1, 10);
    for (let j = 0; j < warm; j++) rng.NextDouble();
  }
  let item = null, qty = 1, skill = false;
  const one = list => N(list[rng.Next(list.length)]);
  if (n > 10 || c > 0) {
    if (c === 2 && rng.NextDouble() < 0.005) item = 'Golden Animal Cracker';
    else if (c > 0 && rng.NextDouble() < 0.005) item = 'Auto-Petter';
    else if (rng.NextDouble() < 0.002 * rareMod) item = N('279');
    else if (rng.NextDouble() < 0.004 * rareMod) item = N('74');
    else if (rng.NextDouble() < 0.008 * rareMod) item = N('166');
    else if (rng.NextDouble() < 0.01 * rareMod + extraBookChance) item = ctx.gotMysteryBook ? one(['PurpleBook', 'Book_Mystery']) : N('Book_Mystery');
    else if (rng.NextDouble() < 0.01 * rareMod) item = one(['797', '373']);
    else if (rng.NextDouble() < 0.01 * rareMod) item = 'Mystery Hat';
    else if (rng.NextDouble() < 0.01 * rareMod) item = 'Mystery Shirt';
    else if (rng.NextDouble() < 0.01 * rareMod) item = 'Mystery Wallpaper';
    else if (rng.NextDouble() < 0.1 || c > 0) {
      switch (rng.Next(15)) {
        case 0: item = N('288'); qty = 5; break;
        case 1: item = N('253'); qty = 3; break;
        case 2:
          // Only at Fishing level 6+
          if (rng.NextDouble() < 0.5) { item = one(['687', '695']); skill = true; } else { item = N('242'); qty = 2; }
          break;
        case 3: item = N('204'); qty = 2; break;
        case 4: item = N('369'); qty = 20; break;
        case 5: item = N('466'); qty = 20; break;
        case 6: item = N('773'); qty = 2; break;
        case 7: item = N('688'); qty = 3; break;
        case 8: item = N(String(rng.Next(628, 634))); break;
        case 9: item = 'Seasonal Seeds'; qty = 20; break;
        case 10: item = rng.NextDouble() < 0.5 ? 'Ossified Blade' : one(['533', '534']); break;
        case 11: item = N('621'); break;
        case 12: item = 'Mystery Box'; qty = rng.Next(3, 5); break;
        case 13: item = N(`SkillBook_${rng.Next(5)}`); break;
        case 14: item = 'Raccoon Seeds'; qty = 8; break;
      }
    }
  }
  // The first 10 boxes, or nothing rare rolled
  if (!item) {
    switch (rng.Next(14)) {
      case 0: item = N('395'); qty = 3; break;
      case 1: item = N('287'); qty = 5; break;
      case 2: item = 'Seasonal Seeds'; qty = 8; break;
      case 3: item = N(String(rng.Next(727, 734))); break;
      case 4: { let roll = 217; while (roll === 217) roll = rng.Next(194, 240); item = N(String(roll)); break; }
      case 5: item = N('709'); qty = 10; break;
      case 6: item = N('369'); qty = 10; break;
      case 7: item = N('466'); qty = 10; break;
      case 8: item = N('688'); break;
      case 9: item = N('689'); break;
      case 10: item = N('770'); qty = 10; break;
      case 11: item = 'Mixed Flower Seeds'; qty = 10; break;
      case 12:
        if (rng.NextDouble() < 0.4) {
          const r = rng.Next(4);
          item = r === 0 ? N('525') : r === 1 ? N('529') : r === 2 ? N('888') : N(String(rng.Next(531, 533)));
        } else { item = 'Mystery Box'; qty = 2; }
        break;
      case 13: item = N('690'); break;
      default: item = N('382');
    }
  }
  return { item, qty, skill };
}

export const boxesAt = (ctx, n, player) => [0, 1, 2].map(c => boxAt(ctx, n, player, c));

const head = () => [itemTag('Mystery Box'), `${itemTag('Golden Mystery Box')}<br><small>(${t('chưa có Tinh thông Trồng trọt')})</small>`,
  `${itemTag('Golden Mystery Box')}<br><small>(${t('có Tinh thông Trồng trọt')})</small>`];

export default {
  id: 'mystery', name: 'Hộp bí ẩn', nameEn: 'Mystery Boxes', icon: 'mystery_box',
  intro: 'Hộp Bí Ẩn và Hộp Bí Ẩn Vàng thứ N mà Clint mở cho bạn sẽ ra gì. Số hộp đã mở tính chung hai loại và riêng từng người chơi. Hộp Vàng ra khác đi khi đã mở khóa Tinh thông Trồng trọt nên có hai cột.',
  introEn: 'What your Nth Mystery Box or Golden Mystery Box opened by Clint gives. The count is shared by both kinds and kept per player. Golden boxes roll differently once the Farming Mastery perk is unlocked, hence two columns.',
  nav: navFor('mystery', 'mysteryBoxesOpened'),
  players: true,
  search: {
    placeholder: 'Tìm món (VD: Prismatic Shard)...',
    run(ctx, query, opts) {
      const player = playerOf(ctx, 'mystery', opts);
      return searchTable(ctx, {
        query, done: countOf(ctx, 'mysteryBoxesOpened', player), cols: head(), unit: 'hộp',
        resultsAt: n => boxesAt(ctx, n, player).map(b => b.item),
        itemExtra: en => (en === 'Cork Bobber' || en === 'Dressed Spinner' ? mark('skill_fishing', SKILL) : '')
      });
    }
  },
  render(ctx, offset, opts) {
    const player = playerOf(ctx, 'mystery', opts);
    const done = countOf(ctx, 'mysteryBoxesOpened', player);
    const rows = [];
    for (let g = 1; g <= PAGE; g++) {
      const n = offset + g;
      rows.push({
        cls: rowClass(n, done),
        cells: [String(n), ...boxesAt(ctx, n, player).map(b => {
          const rare = ['Prismatic Shard', 'Golden Animal Cracker', 'Auto-Petter', 'Book of Mysteries', 'Magic Rock Candy'].includes(b.item);
          return nameTag(b.item, '', rare ? 'is-rare' : '') + qtyText(b.qty) + (b.skill ? mark('skill_fishing', SKILL) : '');
        })]
      });
    }
    return table([t('Thứ'), ...head()], rows) + `<p class="muted">${mark('skill_fishing', SKILL)} ${t(SKILL)} ${itemTag(N('242'))} ×2.</p>`;
  }
};
