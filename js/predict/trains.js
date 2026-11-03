// ==========================================================================
// PREDICTION: TRAINS (Railroad.DayUpdate)
// A train passes on about one day in five, at a set time; railroad opens
// on day 31 (Summer 3, Year 1). Ported from stardew-predictor (MIT).
// ==========================================================================

import { rngOf, calendar, today, monthStart } from './core.js';
import { t } from '../lib/i18n.js';

// Train time on a day, as "HH:MM" (24h), or null
export function trainOn(ctx, day) {
  if (day < 31) return null;
  const rng = rngOf(ctx, day + ctx.dayAdjust, ctx.gameID / 2);
  if (rng.NextDouble() >= 0.2) return null;
  let time = rng.Next(900, 1800);
  time -= time % 10;
  const h = Math.floor(time / 100), m = time % 100;
  return m < 60 ? `${h}:${String(m).padStart(2, '0')}` : null;
}

export default {
  id: 'train', name: 'Tàu hỏa', nameEn: 'Trains', icon: 'item_coal',
  intro: 'Giờ tàu chạy qua Đường Ray (phía bắc Thị trấn). Tàu đi qua có thể làm rơi than, đá quý, hốc đá... dọc đường ray. Đường ray mở từ ngày 3 Mùa Hạ năm 1.',
  introEn: 'Train times at the Railroad (north of town). Passing trains can drop coal, gems, geodes and more along the tracks. The railroad opens on Summer 3, Year 1.',
  nav: { step: 28, big: 112, start: ctx => monthStart(today(ctx)) },
  render(ctx, start) {
    return calendar(ctx, start, day => {
      if (day < 31) return `<span class="predict-none">${t('Chưa mở')}</span>`;
      const time = trainOn(ctx, day);
      return time ? `<span class="predict-hit">${t('Tàu lúc')} ${time}</span>` : '<span class="predict-none">—</span>';
    });
  }
};
