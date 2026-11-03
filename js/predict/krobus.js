// ==========================================================================
// PREDICTION: KROBUS'S SHOP IN THE SEWERS (Sewer.getShadowShopStock)
// Besides his fixed stock, Krobus sells one random fish on Wednesdays
// (200g) and one random cooked dish on Saturdays (random price). Ported
// from stardew-predictor's predictKrobus() (MIT).
// ==========================================================================

import { rngOf, hashString, dateLabel, today, weekStart, table } from './core.js';
import { P_OBJECTS } from '../../data/predictor-data.js';
import { randomItems, gold, matcher, foundLine } from './shop-helpers.js';
import { itemTag } from '../lib/item-lookup.js';
import { t } from '../lib/i18n.js';

// The two random items of the week starting on `start` (a Monday):
// [{ day, name, qty, price }] for Wednesday and Saturday
export function krobusStock(ctx, start) {
  const wed = start + 2, sat = start + 5;
  let rng = rngOf(ctx, wed + ctx.dayAdjust, ctx.gameID / 2);
  const fish = randomItems(rng, 'objects', 698, 708, true, true)[0].name;
  rng = rngOf(ctx, sat + ctx.dayAdjust, ctx.gameID / 2);
  // Bread is rolled apart, at the odds of one dish among 51
  const bread = rngOf(ctx, hashString('krobus_bread'), sat + ctx.dayAdjust).NextDouble() < 0.0196078431;
  const dish = bread ? P_OBJECTS['216'][0] : randomItems(rng, 'objects', 194, 244, true, true)[0].name;
  return [{ day: wed, name: fish, qty: 5, price: 200 }, { day: sat, name: dish, qty: 5, price: 10 * rng.Next(5, 51) }];
}

const row = (ctx, s) => ({ cls: s.day < today(ctx) ? 'is-past' : s.day === today(ctx) ? 'is-today' : '', cells: [dateLabel(s.day), itemTag(s.name), s.qty, gold(s.price)] });

export default {
  id: 'krobus', name: 'Cửa hàng Krobus', nameEn: "Krobus's Shop", icon: 'portrait:krobus',
  intro: 'Món ngẫu nhiên Krobus bán trong Cống ngầm: một loại cá vào Thứ Tư (200g) và một món ăn nấu sẵn vào Thứ Bảy (giá ngẫu nhiên), mỗi món 5 cái. Các món cố định khác không hiện ở đây.',
  introEn: "Krobus's random items in the Sewers: one fish on Wednesdays (200g) and one cooked dish on Saturdays (random price), 5 of each. His fixed stock is not shown here.",
  nav: { step: 7, big: 112, start: ctx => weekStart(today(ctx)), stepLabel: 'Tuần trước', nextLabel: 'Tuần sau' },
  search: {
    placeholder: 'Tìm món trong 2 năm tới...',
    run(ctx, query) {
      const match = matcher(query), rows = [];
      const from = weekStart(today(ctx));
      for (let start = from; start < from + 224; start += 7) {
        for (const s of krobusStock(ctx, start)) if (match(s.name)) rows.push(row(ctx, s));
      }
      return foundLine(rows.length) + (rows.length ? table([t('Ngày'), t('Món'), t('Số lượng'), t('Giá')], rows) : '');
    }
  },
  render(ctx, start) {
    return table([t('Ngày'), t('Món'), t('Số lượng'), t('Giá')], krobusStock(ctx, start).map(s => row(ctx, s)));
  }
};
