// ==========================================================================
// WEAPON STATS AFTER THE FORGE
// The save keeps a weapon's base stats; the game adds the forged gems and the
// innate enchantments while playing. This works the result out with the
// Official Stardew Valley Wiki "Forge" page:
//   Ruby +10% damage, Aquamarine +4.6% crit chance, Jade +10 crit power,
//   Topaz +1 defense, Amethyst +1 weight per level, Emerald +2/+3/+2 speed;
//   innate Attack +1-5 (+3 damage each), Crit. Chance x1.02/1.04/1.06,
//   Crit. Power +25/50/75, Defense +1-2, Weight -1-5, Speed +1 per level.
// Stats are in the units the game shows (speed and weight as on the tooltip).
// ==========================================================================

import { t } from './i18n.js';

// Gems forged into a weapon (count toward the 3 forges)
export const GEMS = {
  Ruby: ['Hồng Ngọc', 'Sát thương +10% mỗi cấp'], Aquamarine: ['Ngọc Xanh Biển', 'Tỉ lệ chí mạng +4,6% mỗi cấp'],
  Jade: ['Ngọc Bích', 'Sức mạnh chí mạng +10 mỗi cấp'], Topaz: ['Hoàng Ngọc', 'Phòng thủ +1 mỗi cấp'],
  Amethyst: ['Thạch Anh Tím', 'Trọng lượng +1 mỗi cấp'], Emerald: ['Ngọc Lục Bảo', 'Tốc độ +2, +3, +2 qua từng cấp']
};
// Innate enchantments (Mines weapons, Dragon Tooth at the Forge)
export const INNATE = {
  Attack: ['Tấn công', 'Sát thương +3 mỗi cấp'], Crit: ['Tỉ lệ chí mạng', 'Tỉ lệ chí mạng x1,02 mỗi cấp'],
  CritPower: ['Sức mạnh chí mạng', 'Sức mạnh chí mạng +25 mỗi cấp'], Defense: ['Phòng thủ', 'Phòng thủ +1 mỗi cấp'],
  WeaponSpeed: ['Tốc độ', 'Tốc độ +1 mỗi cấp'], Lightweight: ['Nhẹ', 'Trọng lượng -1 mỗi cấp'],
  SlimeGatherer: ['Nhặt Nhớt Slime', 'Slime rơi thêm Chất Nhờn'], SlimeSlayer: ['Diệt Slime', 'Sát thương lên Slime +33% + 1']
};
// Prismatic Shard enchantments for weapons
export const MAGIC = {
  Artful: ['Khéo Léo', 'Hồi chiêu đòn đặc biệt giảm 50%'], BugKiller: ['Diệt Bọ', 'Gấp đôi sát thương lên sâu, ruồi, bọ, nhện, cua đá'],
  Crusader: ['Thập Tự Quân', '+50% sát thương lên xác ướp, ma, bộ xương, linh hồn hư không'], Vampiric: ['Hút Máu', '9% cơ hội hồi máu khi hạ quái'],
  Haymaker: ['Cắt Cỏ', 'Cắt cỏ dại ra thêm Sợi, có cơ hội ra Cỏ Khô']
};
export const MAX_FORGES = 3;
const EMERALD = [0, 2, 5, 7];

export const forgeCount = ench => (ench || []).filter(([k]) => GEMS[k]).reduce((n, [, l]) => n + l, 0);

// Base stats of a weapon from its data entry (data/weapons-data.js)
export function baseStats(w) {
  return {
    min: w.damage?.[0] ?? 0, max: w.damage?.[1] ?? 0, speed: w.mods.speed || 0, critChance: (w.crit || 0) * 100,
    critPower: w.mods.critPower || 0, defense: w.mods.defense || 0, weight: w.mods.weight || 0
  };
}

// The stats with forged gems and innate enchantments, plus what each one added
export function forgedStats(w, ench = []) {
  const s = { ...baseStats(w) }, lvl = k => ench.filter(([c]) => c === k).reduce((a, [, l]) => a + l, 0);
  const ruby = lvl('Ruby'), atk = lvl('Attack');
  s.min = Math.floor(s.min * (1 + 0.1 * ruby)) + 3 * atk;
  s.max = Math.floor(s.max * (1 + 0.1 * ruby)) + 3 * atk;
  s.critChance = s.critChance * (1 + 0.02 * lvl('Crit')) + 4.6 * lvl('Aquamarine');
  s.critPower += 10 * lvl('Jade') + 25 * lvl('CritPower');
  s.speed += EMERALD[Math.min(3, lvl('Emerald'))] + lvl('WeaponSpeed');
  s.defense += lvl('Topaz') + lvl('Defense');
  s.weight += lvl('Amethyst') - lvl('Lightweight');
  return s;
}

const ROWS = [
  ['dmg', 'Sát thương', s => `${s.min}-${s.max}`, s => s.min + s.max],
  ['speed', 'Tốc độ', s => signed(s.speed), s => s.speed],
  ['critChance', 'Tỉ lệ chí mạng', s => `${round1(s.critChance)}%`, s => s.critChance],
  ['critPower', 'Sức mạnh chí mạng', s => signed(s.critPower), s => s.critPower],
  ['defense', 'Phòng thủ', s => signed(s.defense), s => s.defense],
  ['weight', 'Trọng lượng', s => signed(s.weight), s => s.weight]
];
const round1 = n => Math.round(n * 10) / 10;
const signed = n => (n > 0 ? `+${n}` : `${n}`);

// Table: stat | base | after forging (changed rows highlighted)
export function compareTable(w, ench) {
  const a = baseStats(w), b = forgedStats(w, ench);
  return `
    <table class="weapon-compare">
      <thead><tr><th>${t('Chỉ số')}</th><th>${t('Gốc')}</th><th>${t('Sau rèn & bùa chú')}</th></tr></thead>
      <tbody>${ROWS.map(([id, label, show, val]) => {
        const up = val(b) - val(a);
        return `<tr class="${up > 0.001 ? 'is-up' : up < -0.001 ? 'is-down' : ''}"><td>${t(label)}</td><td>${show(a)}</td><td><strong>${show(b)}</strong></td></tr>`;
      }).join('')}</tbody>
    </table>`;
}

// One line per enchantment: name, level, effect
export function enchantList(ench = []) {
  const line = (cls, lvl) => {
    const [name, effect] = GEMS[cls] || INNATE[cls] || MAGIC[cls] || (cls === 'GalaxySoul' ? ['Linh Hồn Ngân Hà', 'Đủ 3 cấp thì thành vũ khí Vô Cực'] : [cls, '']);
    const kind = GEMS[cls] ? 'Đá quý' : INNATE[cls] ? 'Bẩm sinh' : MAGIC[cls] ? 'Mảnh Ngũ Sắc' : '';
    return `<li>${kind ? `<span class="tag">${t(kind)}</span> ` : ''}<strong>${t(name)}</strong>${lvl > 1 || GEMS[cls] ? ` ${t('cấp')} ${lvl}` : ''}${effect ? ` <span class="muted">· ${t(effect)}</span>` : ''}</li>`;
  };
  return ench.length ? `<ul class="weapon-ench">${ench.map(([c, l]) => line(c, l)).join('')}</ul>` : `<p class="muted">${t('Chưa rèn, chưa có bùa chú.')}</p>`;
}
