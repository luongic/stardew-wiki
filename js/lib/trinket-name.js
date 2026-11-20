// ==========================================================================
// TRINKET NAMES IN THE SAVE
// The save names a trinket by its internal id ("IceRod", "IridiumSpur"), not
// by the English name the site uses ("Ice Rod", "Golden Spur").
// ==========================================================================

import { TRINKETS } from '../../data/trinkets-data.js';

const squash = s => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
// Internal ids that differ from the English name
const ALIAS = { iridiumspur: 'Golden Spur', magichairdye: 'Magic Hair Gel' };
const BY_ID = new Map(TRINKETS.map(x => [squash(x.nameEn), x.nameEn]));

export const trinketNameEn = raw => ALIAS[squash(raw)] || BY_ID.get(squash(raw)) || raw;

// The rolled stats a trinket keeps in <descriptionSubstitutionTemplates>, in order
export const TRINKET_STATS = {
  'Fairy Box': [['Cấp', 'Level', '']],
  'Golden Spur': [['Tăng tốc', 'Speed buff', ' s']],
  'Ice Rod': [['Bắn mỗi', 'Fires every', ' s'], ['Đóng băng', 'Freezes for', ' s']],
  'Magic Quiver': [['Bắn mỗi', 'Fires every', ' s'], ['Sát thương tối thiểu', 'Min damage', ''], ['Sát thương tối đa', 'Max damage', '']],
  'Parrot Egg': [['Cấp', 'Level', '']]
};
