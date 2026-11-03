// ==========================================================================
// PREDICTION: MINE CHESTS (MineShaft.GetReplacementChestItem)
// The treasure chest on every 10th floor of the Mines (1.6, remixed
// rewards off) holds one item picked from a short list by the Game ID,
// so it is the same for the whole save. Ported from stardew-predictor (MIT).
// ==========================================================================

import { CSRandom, seedOfBig, table } from './core.js';
import { itemTag } from '../lib/item-lookup.js';
import { P_BOOTS, P_WEAPONS, P_OBJECTS } from '../../data/predictor-data.js';
import { t } from '../lib/i18n.js';

const B = id => P_BOOTS[id], W = id => P_WEAPONS[id], O = id => P_OBJECTS[id][0];
// Floor -> possible items (English names), in the game's order
const CHOICES = {
  10: [B(506), B(507), W(12), W(17), W(22), W(31)],
  20: [W(11), W(24), W(20), O('517'), O('519')],
  30: [null],
  40: [W(32)],
  50: [B(509), B(510), B(508), W(1), W(43)],
  60: [W(21), W(44), W(6), W(18), W(27)],
  70: [W(33)],
  80: [B(512), B(511), W(10), W(7), W(46), W(19)],
  90: [W(8), W(52), W(45), W(5), W(60)],
  100: ['Stardrop'],
  110: [B(514), B(878), W(50), W(28)],
  120: ['Skull Key']
};

// [{ floor, item (English name, or null for floor 30: no chest) }]
export function mineChests(ctx) {
  const out = [];
  for (let floor = 10; floor <= 120; floor += 10) {
    const rng = new CSRandom(seedOfBig(ctx, BigInt(ctx.gameID) * 512n, floor));
    const list = CHOICES[floor];
    const item = list[rng.Next(list.length)];
    out.push({ floor, item });
  }
  return out;
}

export default {
  id: 'minechest', name: 'Rương Hầm Mỏ', nameEn: 'Mine Chests', icon: 'treasure_chest',
  intro: 'Vật phẩm trong rương báu ở các tầng chia hết cho 10 của Hầm Mỏ. Mỗi save chỉ có một kết quả cố định cho từng tầng (khi không bật tùy chọn đổi ngẫu nhiên phần thưởng hầm mỏ).',
  introEn: 'The item in the treasure chest on every 10th floor of the Mines. Each save has one fixed result per floor (unless the remixed mine rewards option is on).',
  render(ctx) {
    return table([t('Tầng'), t('Vật phẩm trong rương')], mineChests(ctx).map(({ floor, item }) =>
      [String(floor), item ? itemTag(item) : `<span class="predict-none">${t('(Không có rương)')}</span>`]));
  }
};
