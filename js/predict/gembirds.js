// ==========================================================================
// PREDICTION: GEM BIRDS ON GINGER ISLAND (IslandGemBird.GetBirdTypeForLocation)
// Which colour of Gem Bird sits in each part of the island, for the Gem
// Bird Shrine puzzle. Fixed for the whole save. Ported from
// stardew-predictor by MouseyPounds (MIT).
// ==========================================================================

import { rngOf, table } from './core.js';
import { itemTag } from '../lib/item-lookup.js';
import { t } from '../lib/i18n.js';

// IslandGemBird.GemBirdType, with the gem each colour stands for
const BIRDS = [['Green', 'Xanh lá', 'Emerald'], ['Blue', 'Xanh dương', 'Aquamarine'], ['Red', 'Đỏ', 'Ruby'],
  ['Purple', 'Tím', 'Amethyst'], ['Brown', 'Nâu', 'Topaz']];
const PLACES = ['Bắc (Khu Khai Quật / Núi Lửa)', 'Nam (Bến Tàu / Khu Nghỉ Dưỡng)', 'Đông (Rừng Rậm)', 'Tây (Nông Trại Đảo)'];

// Bird (index in BIRDS) for North, South, East, West (Utility.Shuffle)
export function gemBirds(ctx) {
  const birds = [0, 1, 2, 3, 4];
  const rng = rngOf(ctx, ctx.gameID);
  for (let i = birds.length; i > 1;) {
    const j = rng.Next(i--);
    [birds[i], birds[j]] = [birds[j], birds[i]];
  }
  return birds.slice(0, PLACES.length);
}
export const birdName = i => BIRDS[i][0];

export default {
  id: 'gembirds', name: 'Chim Đá Quý', nameEn: 'Gem Birds', icon: 'item_prismatic_shard',
  intro: 'Màu chim đá quý ở từng khu của Đảo Gừng, cho câu đố Đền Thờ Chim Đá Quý (ở khu Bắc). Thứ tự này cố định cho cả save.',
  introEn: 'The colour of Gem Bird in each part of Ginger Island, for the Gem Bird Shrine puzzle (Island North). The order is fixed for the whole save.',
  figure: { src: ['assets/predict/gem_birds_shrine.png'], alt: 'Đền thờ Chim Đá Quý trên Đảo Gừng', caption: 'Đền thờ Chim Đá Quý trong rừng rậm phía đông Đảo Gừng: đặt đúng viên đá quý lên bệ của từng hướng.' },
  render(ctx) {
    return table([t('Hướng (Khu vực)'), t('Loại chim')], gemBirds(ctx).map((b, i) =>
      [t(PLACES[i]), `${t(BIRDS[b][1])} (${itemTag(BIRDS[b][2])})`]));
  }
};
