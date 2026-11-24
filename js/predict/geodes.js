// ==========================================================================
// PREDICTION: CRACKING GEODES (Utility.getTreasureFromGeode)
// What Clint gives for the Nth geode a player opens, for every geode type
// at once (Geode, Frozen, Magma, Omni, Artifact Trove, Golden Coconut).
// The count is per player and shared by all types; seeded by the count,
// Game ID and the player's id (1.6). Ported from stardew-predictor (MIT).
// ==========================================================================

import { rngOf, table } from './core.js';
import { t } from '../lib/i18n.js';
import { ico } from '../lib/icons.js';
import { P_OBJECTS, P_GEODE_CONTENTS } from '../../data/predictor-data.js';
import { itemTag } from '../lib/item-lookup.js';
import { PAGE, playerOf, countOf, navFor, mpHalf, rowClass, nameTag, qtyText, mark, searchTable, savedFarm, firstTable } from './crack-helpers.js';

const N = id => P_OBJECTS[id][0];
const pick = (list, roll) => N(list[Math.floor(roll * list.length)]);
const TYPES = ['Geode', 'Frozen Geode', 'Magma Geode', 'Omni Geode', 'Artifact Trove', 'Golden Coconut'];

// The Nth geode for a player: item and quantity per type, plus the
// Qi Beans / Golden Helmet chances
export function geodeAt(ctx, n, player) {
  const item = ['Stone', 'Stone', 'Stone', 'Stone'], qty = [1, 1, 1, 1];
  const mp = mpHalf(ctx, player);
  // Troves and coconuts roll their item where the others do the ore check,
  // so they need their own generator with the same warm-up
  const rng = rngOf(ctx, n, ctx.gameID / 2, mp), trove = rngOf(ctx, n, ctx.gameID / 2, mp);
  for (let k = 0; k < 2; k++) {
    const warm = rng.Next(1, 10);
    trove.Next();
    for (let j = 0; j < warm; j++) { rng.NextDouble(); trove.NextDouble(); }
  }
  const beans = rng.NextDouble() < 0.1, beansTrove = trove.NextDouble() < 0.1;
  const c = trove.NextDouble();
  item.push(pick(P_GEODE_CONTENTS[275], c)); qty.push(1);
  const hat = c < 0.05;
  const roll = Math.floor(trove.NextDouble() * P_GEODE_CONTENTS[791].length);
  item.push(N(P_GEODE_CONTENTS[791][roll])); qty.push(roll === 2 || roll === 3 || roll === 6 ? 5 : 1);

  if (rng.NextDouble() < 0.5) {
    // Minerals and artifacts
    const next = rng.NextDouble();
    item[0] = pick(P_GEODE_CONTENTS[535], next);
    item[1] = pick(P_GEODE_CONTENTS[536], next);
    item[2] = pick(P_GEODE_CONTENTS[537], next);
    item[3] = next < 0.008 && n > 15 ? N('74') : N(P_GEODE_CONTENTS[749][rng.Next(P_GEODE_CONTENTS[749].length)]);
  } else {
    // Ores, coal, clay...
    let q = rng.Next(3) * 2 + 1;
    if (rng.NextDouble() < 0.1) q = 10;
    if (rng.NextDouble() < 0.01) q = 20;
    if (rng.NextDouble() < 0.5) {
      const r = rng.Next(4);
      if (r < 2) { item.fill(N('390'), 0, 4); qty.fill(q, 0, 4); }
      else if (r === 2) item.fill(N('330'), 0, 4);
      else { item[0] = N('86'); item[1] = N('84'); item[2] = N('82'); item[3] = N(String(82 + rng.Next(3) * 2)); }
    } else {
      const next = rng.NextDouble();
      const deep = ctx.deepestMineLevel || 0;
      item[0] = N(['378', deep > 25 ? '380' : '378', '382'][Math.floor(next * 3)]);
      item[1] = N(['378', '380', '382', deep > 75 ? '384' : '380'][Math.floor(next * 4)]);
      const r = Math.floor(next * 5);
      item[2] = item[3] = N(['378', '380', '382', '384', '386'][r]);
      qty[0] = qty[1] = q;
      qty[2] = qty[3] = r === 4 ? Math.floor(q / 2 + 1) : q;
    }
  }
  return { item, qty, beans, beansTrove, hat };
}

const head = () => TYPES.map(en => itemTag(en));

// Museum pieces a geode or trove can give (Golden Coconuts give none)
const MUSEUM_POOL = [...new Set([535, 536, 537, 749, 275].flatMap(k => P_GEODE_CONTENTS[k]).map(N).concat(N('74')))];

// Pieces not donated yet and not in any backpack or chest: the first geode
// of each type (from the next one) that gives them
function missingHtml(ctx, player, done) {
  const farm = savedFarm(ctx);
  const want = MUSEUM_POOL.filter(en => !ctx.donated.includes(en) && !farm?.held.has(en));
  const head3 = `<h3 class="journal-sub">${ico('museum')} ${t('Món chưa có')}: ${want.length}</h3>`;
  if (!want.length) return `${head3}<p class="muted">${t('Đã tặng hoặc đang giữ mọi món Bảo tàng mà hốc đá có thể ra.')}</p>`;
  return `${head3}
    <p class="muted">${t('Món Bảo tàng chưa tặng và không có trong túi hay rương nào, cùng hốc đá thứ mấy sẽ ra (tính từ hốc tiếp theo; số nhỏ là còn bao nhiêu hốc nữa).')}
      ${farm ? '' : t('Nạp file save để bỏ qua những món đang có trong rương.')}</p>
    ${firstTable({ want, done, cols: head().slice(0, 5), unit: 'hốc đá', resultsAt: n => geodeAt(ctx, n, player).item.slice(0, 5) })}`;
}
const NEED = 'Cần tặng Bảo tàng', BEANS = 'Có thể ra Đậu Qi (khi có Thử thách Cây Qi)', HAT = 'Có thể ra Mũ Bảo Hiểm Vàng (nếu chưa có)';

export default {
  id: 'geode', name: 'Đập hốc đá', nameEn: 'Geodes', icon: 'omni_geode',
  intro: 'Clint đập hốc đá thứ N của bạn sẽ ra gì, cho mọi loại hốc đá (Rương Cổ Vật, Dừa Vàng cũng tính). Số hốc đá đã đập tính chung mọi loại và riêng từng người chơi. Món chưa tặng Bảo tàng được tô xanh.',
  introEn: 'What Clint gives for your Nth geode, for every geode type (Artifact Troves and Golden Coconuts included). The count is shared by all types and kept per player. Items not yet donated to the Museum are highlighted green.',
  nav: navFor('geode', 'geodesCracked'),
  players: true,
  search: {
    placeholder: 'Tìm món (VD: Prismatic Shard)...',
    run(ctx, query, opts) {
      const player = playerOf(ctx, 'geode', opts);
      return searchTable(ctx, {
        query, done: countOf(ctx, 'geodesCracked', player), cols: head(), unit: 'hốc đá',
        resultsAt: n => geodeAt(ctx, n, player).item,
        itemExtra: en => (ctx.donated.includes(en) ? '' : mark('portrait:gunther', NEED))
      });
    }
  },
  render(ctx, offset, opts) {
    const player = playerOf(ctx, 'geode', opts);
    const done = countOf(ctx, 'geodesCracked', player);
    const rows = [];
    for (let g = 1; g <= PAGE; g++) {
      const n = offset + g, r = geodeAt(ctx, n, player);
      rows.push({
        cls: rowClass(n, done),
        cells: [String(n), ...r.item.map((en, c) => {
          // Golden Coconut items are never museum pieces
          const isNeed = c < 5 && !ctx.donated.includes(en);
          const marks = (c === 5 && r.hat ? mark('crown', HAT) : '') + ((c >= 4 ? r.beansTrove : r.beans) ? mark('item_qi_bean', BEANS) : '');
          return nameTag(en, '', isNeed ? 'is-need' : '') + qtyText(r.qty[c]) + marks;
        })]
      });
    }
    return table([t('Thứ'), ...head()], rows) +
      `<p class="muted">${mark('item_qi_bean', BEANS)} ${t(BEANS)}. ${mark('crown', HAT)} ${t(HAT)}.</p>` +
      missingHtml(ctx, player, done);
  }
};
