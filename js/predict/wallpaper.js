// ==========================================================================
// PREDICTION: WALLPAPER AND FLOORING OF THE DAY (Data/Shops)
// Pierre's General Store and JojaMart each sell one random wallpaper and
// one random flooring every day. Ported from stardew-predictor's
// predictWallpaper() (MIT).
// ==========================================================================

import { rngOf, dateLabel, today, weekStart, table } from './core.js';
import { P_WALLPAPER_EQUIV } from '../../data/predictor-data.js';
import { randomWallFloor } from './shop-helpers.js';
import { itemTag } from '../lib/item-lookup.js';
import { t } from '../lib/i18n.js';

// The wallpaper and floor numbers (1-based, as on the wiki) on day number
// `day`, for Pierre and for Joja. `closed`: shop closed that day.
// Wallpapers: ids 0-111 in the game (21 never sold) plus 9 in MoreWalls;
// floors: 0-55 at Pierre, 0-39 at Joja (the shuffle runs over ids up to
// 77 and 87, as stardew-predictor does).
export function wallpaperStock(ctx, day) {
  const roll = (floorMax, floorExtra) => {
    const rng = rngOf(ctx, day + ctx.dayAdjust, ctx.gameID / 2);
    const wall = randomWallFloor(rng, 0, 111, 9, { 21: true })[0];
    const floor = 1 + randomWallFloor(rng, 0, floorMax, floorExtra)[0];
    return { wall: wall + 1, equiv: P_WALLPAPER_EQUIV[wall] || null, floor };
  };
  const weekDay = (day - 1) % 7;
  return {
    day,
    pierre: ctx.ccComplete || weekDay !== 2 ? roll(55, 22) : { closed: true },
    joja: !ctx.ccComplete ? roll(39, 48) : { closed: true }
  };
}

function cell(s) {
  if (s.closed) return `<span class="predict-none">${t('Đóng cửa')}</span>`;
  return `${t('Giấy dán tường')} #${s.wall}<br>${t('Sàn')} #${s.floor}${s.equiv ? `<br><span class="muted" title="${t('Món tương đương (lỗi cũ trước bản 1.4)')}">= </span>${itemTag(s.equiv)}` : ''}`;
}

export default {
  id: 'wallpaper', name: 'Giấy dán tường & sàn', nameEn: 'Wallpaper & Flooring', icon: 'farm_wood_floor',
  intro: 'Mẫu giấy dán tường và sàn nhà ngẫu nhiên bán mỗi ngày ở Cửa hàng Tạp hóa Pierre và JojaMart. Số thứ tự giống trên wiki. Pierre nghỉ Thứ Tư cho đến khi khôi phục Trung tâm Cộng đồng; JojaMart đóng cửa sau đó.',
  introEn: "The random wallpaper and flooring sold each day at Pierre's General Store and JojaMart, numbered as on the wiki. Pierre is closed on Wednesdays until the Community Center is restored; JojaMart closes after that.",
  nav: { step: 7, big: 112, start: ctx => weekStart(today(ctx)), stepLabel: 'Tuần trước', nextLabel: 'Tuần sau' },
  render(ctx, start) {
    const rows = [];
    for (let day = start; day < start + 7; day++) {
      const s = wallpaperStock(ctx, day);
      rows.push({ cls: day < today(ctx) ? 'is-past' : day === today(ctx) ? 'is-today' : '', cells: [dateLabel(day), cell(s.pierre), cell(s.joja)] });
    }
    return table([t('Ngày'), t('Cửa hàng Pierre'), 'JojaMart'], rows);
  }
};
