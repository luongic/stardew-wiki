// ==========================================================================
// PREDICTION: NIGHT EVENTS (Utility.pickFarmEvent)
// Fairy, Witch, Meteorite, Stone Owl and Strange Capsule while you sleep.
// The game rolls them at 6am the next morning; a day here shows the night
// that follows it. Night 30 (Summer 2, Y1) is always the earthquake. Ported from stardew-predictor (MIT).
// ==========================================================================

import { rngOf, calendar, dateOf, today, monthStart } from './core.js';
import { ico } from '../lib/icons.js';
import { t } from '../lib/i18n.js';

// { event: key or null, windstorm: bool } for the night after `day`
export function nightEvent(ctx, day) {
  if (day + ctx.dayAdjust === 30) return { event: 'earthquake', windstorm: false };
  const rng = rngOf(ctx, day + 1 + ctx.dayAdjust, ctx.gameID / 2);
  for (let i = 0; i < 10; i++) rng.NextDouble();
  let windstorm = false;
  // With the greenhouse repaired there is an extra roll for the windstorm that fells the big tree
  if (ctx.greenhouseUnlocked) windstorm = rng.NextDouble() < 0.1;
  const next = rng.NextDouble();
  if (!ctx.greenhouseUnlocked) windstorm = next < 0.1;
  const { seasonIndex, year } = dateOf(day);
  let event = null;
  if (next < 0.01 && seasonIndex < 3) event = 'fairy';
  else if (rng.NextDouble() < 0.01 && day + 1 + ctx.dayAdjust > 20) event = 'witch';
  else if (rng.NextDouble() < 0.01 && day + 1 + ctx.dayAdjust > 5) event = 'meteor';
  else if (rng.NextDouble() < 0.005) event = 'owl';
  else if (rng.NextDouble() < 0.008 && year > 1) event = 'capsule';
  return { event, windstorm };
}

export const NIGHT_EVENTS = {
  earthquake: ['warn', 'Động đất (mở đường lên Núi)'], fairy: ['ing_fairy_rose', 'Tiên Mùa Màng'], witch: ['skull', 'Phù thủy'],
  meteor: ['meteorite', 'Thiên thạch'], owl: ['stone_owl', 'Cú Đá'], capsule: ['question', 'Viên nang Lạ']
};

export default {
  id: 'night', name: 'Sự kiện đêm', nameEn: 'Night Events', icon: 'meteorite',
  intro: 'Sự kiện xảy ra trên nông trại trong đêm của mỗi ngày (bạn thấy khi đi ngủ). Tiên Mùa Màng làm lớn một vùng cây, Phù thủy biến một chuồng thành chuồng hư không, Thiên thạch để lại đá thiên thạch. Biểu tượng gốc cây: đêm có thể có bão làm đổ cây lớn ở Rừng Cindersap.',
  introEn: 'Farm events during the night of each day (you see them when you go to bed). The Crop Fairy grows an area of crops, the Witch turns a coop into a void coop, a Meteorite leaves a large rock. Stump icon: the night may bring the storm that fells the big tree in Cindersap Forest.',
  nav: { step: 28, big: 112, start: ctx => monthStart(today(ctx)) },
  render(ctx, start) {
    return calendar(ctx, start, day => {
      const { event, windstorm } = nightEvent(ctx, day);
      const [icon, label] = NIGHT_EVENTS[event] || [];
      return `${event ? `<span class="predict-hit">${ico(icon)} ${t(label)}</span>` : '<span class="predict-none">—</span>'}${windstorm ? `<span class="predict-note" title="${t('Có thể là đêm bão làm đổ cây lớn')}">${ico('farm_large_stump')}</span>` : ''}`;
    });
  }
};
