// ==========================================================================
// PREDICTION: FORGE ENCHANTMENTS (BaseEnchantment.GetEnchantmentFromItem)
// The enchantment each tool or weapon gets at the Volcano Forge, by how
// many times this player has enchanted. The result also depends on the
// enchantment the item already has. Ported from stardew-predictor (MIT).
// ==========================================================================

import { CSRandom, seedOf, seedOfBig } from './core.js';
import { table, esc } from './core.js';
import { t } from '../lib/i18n.js';

const PAGE = 20;
// Tool -> [Vietnamese label, enchantments in the game's order]
const TOOLS = [
  ['Vũ khí', ['Artful', 'Bug Killer', 'Vampiric', 'Crusader', 'Haymaker']],
  ['Cuốc chim', ['Powerful', 'Efficient', 'Swift']],
  ['Rìu', ['Powerful', 'Shaving', 'Efficient', 'Swift']],
  ['Cuốc', ['Reaching', 'Generous', 'Archaeologist', 'Efficient', 'Swift']],
  ['Bình tưới', ['Reaching', 'Bottomless', 'Efficient']],
  ['Cần câu', ['Master', 'Auto Hook', 'Preserving', 'Efficient']],
  ['Chảo đãi', ['Reaching', 'Generous', 'Archaeologist', 'Fisher']]
];
export const ENCHANT_VI = {
  Artful: 'Khéo Léo', 'Bug Killer': 'Diệt Bọ', Vampiric: 'Hút Máu', Crusader: 'Thập Tự Quân', Haymaker: 'Cắt Cỏ',
  Powerful: 'Mạnh Mẽ', Efficient: 'Hiệu Quả', Swift: 'Nhanh Nhẹn', Shaving: 'Bào Gỗ', Reaching: 'Vươn Xa',
  Generous: 'Hào Phóng', Archaeologist: 'Nhà Khảo Cổ', Bottomless: 'Không Đáy', Master: 'Bậc Thầy',
  'Auto Hook': 'Tự Giật Cần', Preserving: 'Tiết Kiệm Mồi', Fisher: 'Ngư Phủ'
};

// For the n-th enchantment (1-based) of a player: per tool
// { none, next: [if it already has the "none" result, otherwise], byCurrent: [[current, a, b]...] }
export function enchantAt(ctx, n, player = 0) {
  const id = ctx.mpIds?.[player];
  const rng = new CSRandom(id ? seedOfBig(ctx, n - 1, ctx.gameID, id) : seedOf(ctx, n - 1, ctx.gameID, 0));
  const r = rng.NextDouble();
  return TOOLS.map(([, list]) => {
    const roll = Math.floor(r * list.length), roll2 = Math.floor(r * (list.length - 1)), roll3 = Math.floor(r * (list.length - 2));
    const second = list[roll2 < roll ? roll2 : roll2 + 1];
    const third = list[roll3 < roll2 ? roll3 : roll3 + 2];
    const byCurrent = list.map((cur, e) => {
      const i = roll2 + (e <= roll2 ? 1 : 0);
      let j = roll3 + (e <= roll3 ? 1 : 0);
      if (i === j) { j++; if (e === j) j++; }
      return [cur, list[i], list[j]];
    });
    return { none: list[roll], second, third, byCurrent };
  });
}

const nameOf = en => t(ENCHANT_VI[en] || en);

export default {
  id: 'enchant', name: 'Phù phép ở Lò Rèn', nameEn: 'Forge Enchantments', icon: 'forge_enchantments',
  intro: 'Bùa chú nhận được khi phù phép vũ khí và dụng cụ ở Lò Rèn Núi Lửa (Đảo Gừng), theo số lần người chơi này đã phù phép. Kết quả đầu là khi món đồ chưa có bùa chú; nếu đã có thì là một trong hai kết quả sau (di chuột vào (...) để xem từng trường hợp).',
  introEn: 'The enchantment a weapon or tool gets at the Volcano Forge (Ginger Island), by how many times this player has enchanted. The first result is for an item with no enchantment; otherwise it is one of the other two (hover (...) for each case).',
  players: true,
  nav: { step: PAGE, big: 100, min: 0, start: (ctx, opts) => PAGE * Math.floor((ctx.timesEnchanted?.[opts?.player ?? 0] || 0) / PAGE),
    stepLabel: '20 lần trước', nextLabel: '20 lần sau', bigLabel: '100 lần trước', bigNextLabel: '100 lần sau' },
  render(ctx, offset, opts = {}) {
    const player = opts.player || 0, done = ctx.timesEnchanted?.[player] || 0;
    const rows = [];
    for (let g = 1; g <= PAGE; g++) {
      const n = offset + g;
      const cells = enchantAt(ctx, n, player).map((x, c) => {
        const tip = [`${t(TOOLS[c][0])} (${n})`, `${t('Chưa có')} → ${nameOf(x.none)}`,
          ...x.byCurrent.map(([cur, a, b]) => `${nameOf(cur)} → ${nameOf(a)} ${t('hoặc')} ${nameOf(b)}`)].join('\n');
        return `<strong>${nameOf(x.none)}</strong>, ${nameOf(x.second)}<br>${t('hoặc')} ${nameOf(x.third)} <span class="predict-note" title="${esc(tip)}">(...)</span>`;
      });
      rows.push({ cls: n === done + 1 ? 'is-today' : n <= done ? 'is-past' : '', cells: [n.toLocaleString('en-US'), ...cells] });
    }
    return table([t('Lần phù phép'), ...TOOLS.map(([label]) => t(label))], rows);
  }
};
