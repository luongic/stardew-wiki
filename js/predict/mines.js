// ==========================================================================
// PREDICTION: SPECIAL MINE LEVELS (MineShaft.chooseLevelType, loadLevel)
// Mushroom levels (81-119), monster and slime infestations, quarry levels
// in the Mines, and the Skull Cavern levels that may turn out to be
// dinosaur levels (the map is chosen first, so these are only possible).
// Ported from stardew-predictor by MouseyPounds (MIT).
// ==========================================================================

import { rngOf, calendar, today, monthStart, esc } from './core.js';
import { ico } from '../lib/icons.js';
import { t } from '../lib/i18n.js';

// { mushroom, monster, slime, quarry, dino } level lists for a day
export function minesOn(ctx, day) {
  const d = day + ctx.dayAdjust, half = ctx.gameID / 2;
  const out = { mushroom: [], monster: [], slime: [], quarry: [], dino: [] };
  for (let level = 1; level < 120; level++) {
    if (level % 5 === 0) continue;   // elevator floors
    // Infestation overrides the mushroom roll, so it is checked first
    let rng = rngOf(ctx, d, half, level * 100);
    if (rng.NextDouble() < 0.044 && level % 40 > 5 && level % 40 < 30 && level % 40 !== 19) {
      (rng.NextDouble() < 0.5 ? out.monster : out.slime).push(level);
      continue;
    } else if (rng.NextDouble() < 0.044 && ctx.quarryUnlocked && level % 40 > 1) {
      rng.NextDouble();
      out.quarry.push(level);
      continue;
    }
    // Lighting rolls come first; their results do not matter here
    rng = rngOf(ctx, d, half, d, level, 4 * level);
    if (!ctx.hardmodeMines && rng.NextDouble() < 0.3 && level > 2) rng.NextDouble();
    rng.NextDouble();
    if (rng.NextDouble() < 0.035 && level > 80) out.mushroom.push(level);
  }
  // Skull Cavern levels 7-500 (the game's dino check needs mine level > 126)
  for (let level = 127; level < 621; level++) {
    const rng = rngOf(ctx, d, half, level * 100);
    if (rng.NextDouble() < 0.044) {
      rng.NextDouble();
      if (rng.NextDouble() < 0.5) out.dino.push(level - 120);
    }
  }
  return out;
}

const KINDS = [
  ['mushroom', 'item_purple_mushroom', 'Tầng Nấm'],
  ['monster', 'steel_smallsword', 'Tầng nhiễm quái'],
  ['slime', 'monster_green_slime', 'Tầng nhiễm Slime'],
  ['quarry', 'monster_haunted_skull', 'Tầng mỏ đá'],
  ['dino', 'item_dinosaur_egg', 'Có thể là Tầng Tiền Sử (Hang Đầu Lâu)']
];

// More than 5 levels: the first 4, the rest in the tooltip
const levels = list => list.length > 5
  ? `<span title="${esc(`${t('Tất cả')}: ${list.join(', ')}`)}">${list.slice(0, 4).join(', ')}, …</span>`
  : list.join(', ');

export default {
  id: 'mines', name: 'Tầng đặc biệt', nameEn: 'Mine Levels', icon: 'mines',
  intro: 'Các tầng đặc biệt mỗi ngày. Hầm Mỏ: Tầng Nấm (tầng 81-119), tầng nhiễm quái, tầng nhiễm Slime và tầng mỏ đá (khi đã mở Mỏ Đá). Hang Đầu Lâu: các tầng có thể là Tầng Tiền Sử (chưa chắc, vì bản đồ tầng được chọn trước).',
  introEn: 'Special levels each day. The Mines: mushroom levels (81-119), monster and slime infestations, and quarry levels (once the Quarry is open). Skull Cavern: levels that may be dinosaur levels (not guaranteed, the map is picked first).',
  nav: { step: 28, big: 112, start: ctx => monthStart(today(ctx)) },
  render(ctx, start) {
    const cal = calendar(ctx, start, day => {
      const r = minesOn(ctx, day);
      const lines = KINDS.filter(([k]) => r[k].length).map(([k, icon, label]) =>
        `<span class="${k === 'dino' ? 'predict-none' : 'predict-hit'}" title="${t(label)}">${ico(icon)} ${levels(r[k])}</span>`);
      return lines.length ? lines.join('') : '<span class="predict-none">—</span>';
    });
    const legend = KINDS.map(([, icon, label]) => `${ico(icon)} ${t(label)}`).join(' · ');
    return `${cal}<p class="muted">${legend}</p>`;
  }
};
