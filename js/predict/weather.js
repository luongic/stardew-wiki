// ==========================================================================
// PREDICTION: WEATHER IN TOWN (Data/LocationContexts, getDayOfGreenRainThisSummer)
// Rain in Spring and Fall, Summer storms and the Green Rain day. "Sun" can
// still turn out windy (or snowy in Winter), "Rain" can become a storm.
// Ported from stardew-predictor (MIT).
// ==========================================================================

import { rngOf, hashString, calendar, dateOf, today, monthStart } from './core.js';
import { ico } from '../lib/icons.js';
import { t } from '../lib/i18n.js';

const GREEN_RAIN_DAYS = [5, 6, 7, 14, 15, 16, 18, 23];
// Day of the year (1-112) -> festival: no rain on those days
const FESTIVALS = { 13: 'Lễ hội Trứng', 24: 'Vũ hội Hoa', 39: 'Luau', 48: 'Câu cá Hồi', 49: 'Câu cá Hồi', 56: 'Sứa Ánh trăng', 72: 'Hội chợ Stardew',
  83: 'Đêm Hội Ma', 92: 'Lễ hội Băng', 96: 'Lễ hội Mực', 97: 'Lễ hội Mực', 99: 'Chợ Đêm', 100: 'Chợ Đêm', 101: 'Chợ Đêm', 109: 'Ngôi sao Mùa đông' };

// 'Sun' | 'Rain' | 'Storm' | 'Green Rain' | festival name
export function weatherOn(ctx, day) {
  const { seasonIndex, year, day: dom } = dateOf(day);
  if (day === 1 || day === 2 || day === 4 || dom === 1) return 'Sun';
  if (day === 3) return 'Rain';
  if (FESTIVALS[((day - 1) % 112) + 1]) return FESTIVALS[((day - 1) % 112) + 1];
  if (seasonIndex === 0 || seasonIndex === 2) {
    return rngOf(ctx, hashString('location_weather'), ctx.gameID, day - 1).NextDouble() < 0.183 ? 'Rain' : 'Sun';
  }
  if (seasonIndex === 1) {
    const greenRain = GREEN_RAIN_DAYS[rngOf(ctx, year * 777, ctx.gameID).Next(GREEN_RAIN_DAYS.length)];
    const rng = rngOf(ctx, day - 1, ctx.gameID / 2, hashString('summer_rain_chance'));
    if (dom === greenRain) return 'Green Rain';
    if (dom % 13 === 0) return 'Storm';
    return rng.NextDouble() < 0.12 + 0.003 * (dom - 1) ? 'Rain' : 'Sun';
  }
  return 'Sun';
}

const LABEL = { Sun: ['sunny', 'Nắng'], Rain: ['rainy', 'Mưa'], Storm: ['storm', 'Giông bão'], 'Green Rain': ['rainy', 'Mưa Xanh'] };

export default {
  id: 'weather', name: 'Thời tiết', nameEn: 'Weather', icon: 'rainy',
  intro: 'Thời tiết ở Thị trấn theo từng ngày. "Nắng" vẫn có thể thành có gió (hoặc tuyết vào Mùa Đông), "Mưa" có thể thành giông bão. Ngày lễ hội không bao giờ mưa.',
  introEn: 'Weather in town each day. "Sun" can still turn windy (or snowy in Winter) and "Rain" can become a storm. It never rains on festival days.',
  nav: { step: 28, big: 112, start: ctx => monthStart(today(ctx)) },
  render(ctx, start) {
    return calendar(ctx, start, day => {
      const w = weatherOn(ctx, day);
      const [icon, label] = LABEL[w] || ['festival', w];
      return `<span class="${w === 'Sun' ? 'predict-none' : 'predict-hit'}">${ico(icon)} ${t(label)}</span>`;
    });
  }
};
