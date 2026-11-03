// ==========================================================================
// PREDICTION: SANDY'S SHIRT OF THE DAY (GameLocation.sandyShopStock)
// Sandy's shop at the Oasis sells one random shirt each day, for 1,000g.
// Ported from stardew-predictor's predictSandy() (MIT).
// ==========================================================================

import { rngOf, dateLabel, today, weekStart, table } from './core.js';
import { randomItems, matcher, foundLine } from './shop-helpers.js';
import { itemTag } from '../lib/item-lookup.js';
import { t } from '../lib/i18n.js';

// Shirts tailoring cannot make (thanks to @sicarious, via stardew-predictor):
// character creator options, and four only sold at the Oasis
const CC_SHIRTS = [1019, 1022, 1023, 1040, 1041, 1043, 1045, 1046, 1049, 1054, 1056, 1060, 1076, 1080, 1082, 1084, 1087, 1090, 1108, 1109, 1110];
const OASIS_SHIRTS = [1118, 1119, 1120, 1121];

// The shirt on day number `day`: { day, name, id, oasis, creator (option number or 0) }
export function sandyShirt(ctx, day) {
  const rng = rngOf(ctx, day + ctx.dayAdjust, ctx.gameID / 2);
  const shirt = randomItems(rng, 'shirts', 1000, 1126, true, true)[0];
  const id = Number(shirt.id);
  return { day, name: shirt.name, id: shirt.id, oasis: OASIS_SHIRTS.includes(id), creator: !OASIS_SHIRTS.includes(id) && CC_SHIRTS.includes(id) ? id - 999 : 0 };
}

function row(ctx, s) {
  const note = s.oasis ? t('Chỉ bán ở Ốc đảo') : s.creator ? `${t('Lựa chọn khi tạo nhân vật')} ${s.creator}` : '';
  return {
    cls: s.day < today(ctx) ? 'is-past' : s.day === today(ctx) ? 'is-today' : '',
    cells: [dateLabel(s.day), `${itemTag(s.name, '', note ? 'is-rare' : '')}<br><span class="muted">ID: (S)${s.id}</span>`,
      note ? `<span class="muted">${note}. ${t('Không may được bằng Máy may.')}</span>` : '']
  };
}
const HEAD = () => [t('Ngày'), t('Áo'), t('Ghi chú')];

export default {
  id: 'sandy', name: 'Áo của Sandy', nameEn: "Sandy's Shirts", icon: 'portrait:sandy',
  intro: 'Cửa hàng của Sandy ở Ốc đảo bán một chiếc áo ngẫu nhiên mỗi ngày, giá 1.000g. Áo được đánh dấu là áo không may được bằng Máy may.',
  introEn: "Sandy's shop at the Oasis sells one random shirt each day for 1,000g. Highlighted shirts cannot be made by tailoring.",
  nav: { step: 7, big: 112, start: ctx => weekStart(today(ctx)), stepLabel: 'Tuần trước', nextLabel: 'Tuần sau' },
  search: {
    placeholder: 'Tìm áo trong 2 năm tới...',
    run(ctx, query) {
      const match = matcher(query), rows = [];
      const from = weekStart(today(ctx));
      for (let day = from; day < from + 224; day++) {
        const s = sandyShirt(ctx, day);
        if (match(s.name)) rows.push(row(ctx, s));
      }
      return foundLine(rows.length) + (rows.length ? table(HEAD(), rows) : '');
    }
  },
  render(ctx, start) {
    const rows = [];
    for (let day = start; day < start + 7; day++) rows.push(row(ctx, sandyShirt(ctx, day)));
    return table(HEAD(), rows);
  }
};
