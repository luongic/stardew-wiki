// ==========================================================================
// PREDICTION: MASTERY STATUES (Object.CheckForActionOnBlessedStatue,
// ChooseFromIconsMenu, GameLocation.tryAddPrismaticButterfly)
// The daily blessing of the Statue of Blessings (one result if it rains,
// one if not) and the two choices of the Statue of the Dwarf King. With
// the Butterfly blessing, each player's Prismatic Butterfly appears on a
// set map. Ported from stardew-predictor by MouseyPounds (MIT).
// ==========================================================================

import { rngOf, CSRandom, seedOfBig, calendar, today, monthStart, esc } from './core.js';
import { ico } from '../lib/icons.js';
import { t } from '../lib/i18n.js';

export const BLESSINGS = ['Speed', 'Luck', 'Energy', 'Waters', 'Friendship', 'Fangs', 'Butterfly'];
const BLESSINGS_VI = ['Tốc độ', 'May mắn', 'Năng lượng', 'Tưới nước', 'Tình bạn', 'Nanh vuốt', 'Bướm'];
export const DWARF = ['+1 Ore', 'Ladders', 'Coal', 'Bomb Immunity', 'Geodes'];
const DWARF_VI = ['+1 Quặng', 'Thang', 'Than', 'Miễn nhiễm bom', 'Geode'];
export const MAPS = ['Forest', 'Town', 'Beach', 'Mountain', 'Secret Woods', 'Bus Stop', 'Backwoods'];
const MAPS_VI = ['Rừng Cindersap', 'Thị trấn', 'Bãi Biển', 'Núi', 'Khu Rừng Bí Mật', 'Trạm Xe Buýt', 'Rừng Sau Núi'];

// { rain, noRain (indexes in BLESSINGS), butterfly: [{ player, map, shard }] | null, dwarf: [a, b] }
export function statuesOn(ctx, day) {
  const rng = rngOf(ctx, day, ctx.gameID / 2, day * 777);
  for (let j = 0; j < 8; j++) rng.Next();
  const roll = rng.NextDouble();
  const rain = Math.floor(roll * 6), noRain = Math.floor(roll * 7);
  let butterfly = null;
  if (noRain === 6) {
    // The same seed is used for the shard chance and the map
    butterfly = (ctx.mpIds || []).map((id, player) => {
      const seed = seedOfBig(ctx, day, BigInt(Math.floor(ctx.gameID)) / 2n, BigInt(id) % 10000n);
      const shard = new CSRandom(seed).NextDouble() < 0.05 + ctx.dailyLuck;
      return { player, map: new CSRandom(seed).Next(MAPS.length), shard };
    });
  }
  const d = rngOf(ctx, day * 77, ctx.gameID);
  const a = d.Next(5);
  let b = a;
  while (b === a) b = d.Next(5);
  return { rain, noRain, butterfly, dwarf: [a, b] };
}

export default {
  id: 'statue', name: 'Tượng Thành Thạo', nameEn: 'Mastery Statues', icon: 'statue_of_blessings',
  intro: 'Tượng Phước Lành: phước lành trong ngày, có hai kết quả tùy trời mưa hay không (ngày lễ hội tính như ngày mưa). Phước lành Bướm chỉ có khi không mưa: di chuột vào (...) để xem Bướm Ngũ Sắc của từng người chơi xuất hiện ở bản đồ nào. Tượng Vua người Lùn: hai lựa chọn của ngày.',
  introEn: 'Statue of Blessings: the blessing of the day, with two results depending on whether it rains (festival days count as rain). The Butterfly blessing only happens without rain: hover (...) to see which map each player\'s Prismatic Butterfly appears on. Statue of the Dwarf King: the two choices of the day.',
  nav: { step: 28, big: 112, start: ctx => monthStart(today(ctx)) },
  render(ctx, start) {
    const cal = calendar(ctx, start, day => {
      const s = statuesOn(ctx, day);
      let extra = '';
      if (s.butterfly) {
        const tip = s.butterfly.length
          ? s.butterfly.map(b => `${ctx.names?.[b.player] || '?'}: ${t(MAPS_VI[b.map])}${b.shard ? ` (${t('có Mảnh Ngũ Sắc')})` : ''}`).join('\n')
          : t('(Không có người chơi)');
        extra = ` <span class="predict-note" title="${esc(tip)}">(...)</span>`;
      }
      return `<span class="predict-none">${ico('rainy')} ${t(BLESSINGS_VI[s.rain])}</span>
        <span class="predict-hit">${ico('sunny')} ${t(BLESSINGS_VI[s.noRain])}${extra}</span>
        <span class="predict-hit">${ico('statue_of_the_dwarf_king')} ${t(DWARF_VI[s.dwarf[0]])} / ${t(DWARF_VI[s.dwarf[1]])}</span>`;
    });
    const legend = `${ico('rainy')} ${t('Khi mưa')} · ${ico('sunny')} ${t('Khi không mưa')} · ${ico('statue_of_the_dwarf_king')} ${t('Tượng Vua người Lùn (2 lựa chọn)')}`;
    return `${cal}<p class="muted">${legend}</p>`;
  }
};
