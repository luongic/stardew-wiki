// ==========================================================================
// PREDICTION: FORGE ENCHANTMENTS (BaseEnchantment.GetEnchantmentFromItem)
// The enchantment each tool or weapon gets at the Volcano Forge, by how
// many times this player has enchanted. The result also depends on the
// enchantment the item already has. Ported from stardew-predictor (MIT).
// ==========================================================================

import { CSRandom, seedOf, seedOfBig } from './core.js';
import { table, esc } from './core.js';
import { t } from '../lib/i18n.js';
import { itemTag } from '../lib/item-lookup.js';
import { ico } from '../lib/icons.js';

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

// ==========================================
// THE PLAYER'S WEAPONS AND TOOLS (from the save)
// Enchantments are saved by class name: RubyEnchantment, SwiftToolEnchantment...
// ==========================================
// Gems forged into a weapon (up to 3 in all) and the stat each one raises per level
const GEMS = {
  Ruby: ['Hồng Ngọc', 'Sát thương +10%'], Aquamarine: ['Ngọc Xanh Biển', 'Tỉ lệ chí mạng +4.6%'], Jade: ['Ngọc Bích', 'Sức mạnh chí mạng +10%'],
  Topaz: ['Hoàng Ngọc', 'Phòng thủ +1'], Amethyst: ['Thạch Anh Tím', 'Đánh văng'], Emerald: ['Ngọc Lục Bảo', 'Tốc độ']
};
// Innate enchantments (weapons from the Mines, Dragon Tooth at the Forge)
const INNATE = {
  Attack: 'Sát thương', Crit: 'Tỉ lệ chí mạng', CritPower: 'Sức mạnh chí mạng', Defense: 'Phòng thủ', WeaponSpeed: 'Tốc độ', Lightweight: 'Nhẹ tay',
  SlimeGatherer: 'Nhặt Nhớt Slime', SlimeSlayer: 'Diệt Slime'
};
const MAX_FORGES = 3;
// SwiftTool -> Swift, BugKiller -> Bug Killer
const prismatic = cls => cls.replace(/Tool$/, '').replace(/([a-z])([A-Z])/g, '$1 $2');

// As the game's tooltip shows it: half the saved value, clubs (type 2) counted from -8
const speedOf = st => Math.trunc((st.kind === 2 ? st.speed + 8 : st.speed) / 2);

function gearCard(g) {
  const gems = g.ench.filter(([k]) => GEMS[k]);
  const forged = gems.reduce((n, [, l]) => n + l, 0);
  const galaxy = g.ench.find(([k]) => k === 'GalaxySoul');
  const innate = g.ench.filter(([k]) => INNATE[k]);
  const magic = g.ench.filter(([k]) => !GEMS[k] && !INNATE[k] && k !== 'GalaxySoul');
  const st = g.stats;
  const line = (label, body) => `<li><span class="muted">${t(label)}:</span> ${body}</li>`;
  return `
    <div class="gear-card">
      <div class="gear-card__head">${itemTag(g.name)}
        ${g.weapon ? `<span class="gear-forges ${forged >= MAX_FORGES ? 'is-full' : ''}">${t('Đã rèn')} ${forged}/${MAX_FORGES}</span>` : ''}</div>
      <ul class="gear-card__list">
        ${g.weapon ? line('Rèn đá quý', gems.length ? gems.map(([k, l]) => `<strong>${t(GEMS[k][0])} x${l}</strong> (${t(GEMS[k][1])}${l > 1 ? ` ${t('mỗi lần')}` : ''})`).join(', ') : t('Chưa rèn')) : ''}
        ${line('Phù phép (Mảnh Ngũ Sắc)', magic.length ? magic.map(([k]) => `<strong>${nameOf(prismatic(k))}</strong>`).join(', ') : t('Chưa có'))}
        ${innate.length ? line('Bùa chú bẩm sinh', innate.map(([k, l]) => `${t(INNATE[k])}${l > 1 ? ` ${t('cấp')} ${l}` : ''}`).join(', ')) : ''}
        ${galaxy ? line('Linh Hồn Ngân Hà', `${galaxy[1]}/3${galaxy[1] >= 3 ? ` (${t('đã thành vũ khí Vô Cực')})` : ''}`) : ''}
        ${st ? line('Chỉ số hiện tại', [
          `${t('Sát thương')} ${st.min}-${st.max}`, speedOf(st) ? `${t('Tốc độ')} ${speedOf(st) > 0 ? '+' : ''}${speedOf(st)}` : '',
          `${t('Chí mạng')} ${Math.round(st.crit * 1000) / 10}%`, `${t('Sức mạnh chí mạng')} x${Math.round(st.critMult * 100) / 100}`,
          `${t('Đánh văng')} ${Math.round(st.knockback * 100) / 100}`, st.defense ? `${t('Phòng thủ')} +${st.defense}` : '', st.area ? `${t('Tầm đánh')} +${st.area}` : ''
        ].filter(Boolean).join(' · ')) : ''}
      </ul>
    </div>`;
}

function gearHtml(ctx, player) {
  if (ctx.source !== 'save') return '';
  if (!ctx.gear) return `<p class="muted">${t('Nạp lại file save để xem vũ khí và dụng cụ của bạn đã được rèn, phù phép những gì.')}</p>`;
  const mine = ctx.gear.filter(g => g.owner === player), stored = ctx.gear.filter(g => g.owner === -1);
  const sort = list => [...list].sort((a, b) => b.weapon - a.weapon || b.ench.length - a.ench.length);
  const group = (title, list) => list.length ? `<h4 class="journal-sub">${t(title)} (${list.length})</h4><div class="gear-grid">${sort(list).map(gearCard).join('')}</div>` : '';
  return `
    <details class="gear-box" open>
      <summary>${ico('forge_enchantments')} ${t('Vũ khí & dụng cụ của bạn')} · ${t('Đã phù phép')} ${(ctx.timesEnchanted?.[player] || 0).toLocaleString('en-US')} ${t('lần')}</summary>
      <p class="muted">${t('Đọc từ file save. Chỉ số hiện tại đã gồm phần tăng từ đá quý và bùa chú bẩm sinh. Mỗi vũ khí rèn đá quý được tối đa 3 lần; dụng cụ chỉ phù phép được, không rèn được. Chỉ liệt kê dụng cụ đã có bùa chú.')}</p>
      ${group('Trong túi đồ', mine)}${group('Trong rương và nơi khác', stored)}
      ${mine.length + stored.length ? '' : `<p class="muted">${t('Không thấy vũ khí nào trong file save.')}</p>`}
    </details>`;
}

export default {
  id: 'enchant', name: 'Phù phép ở Lò Rèn', nameEn: 'Forge Enchantments', icon: 'forge_enchantments',
  intro: 'Bùa chú nhận được khi phù phép vũ khí và dụng cụ ở Lò Rèn Núi Lửa (Đảo Gừng), theo số lần người chơi này đã phù phép. Kết quả đầu là khi món đồ chưa có bùa chú; nếu đã có thì là một trong hai kết quả sau (di chuột vào (...) để xem từng trường hợp).',
  introEn: 'The enchantment a weapon or tool gets at the Volcano Forge (Ginger Island), by how many times this player has enchanted. The first result is for an item with no enchantment; otherwise it is one of the other two (hover (...) for each case).',
  figure: { src: ['assets/predict/forge.png'], alt: 'Giao diện Lò Rèn trong Hầm Núi Lửa', caption: 'Lò Rèn ở Hầm Núi Lửa (Đảo Gừng): đặt công cụ hoặc vũ khí bên trái, Mảnh Ngũ Sắc bên phải để phù phép.' },
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
    return gearHtml(ctx, player) + table([t('Lần phù phép'), ...TOOLS.map(([label]) => t(label))], rows);
  }
};
