// ==========================================================================
// PREDICTIONS: VILLAGERS BY THEIR SAVE NAME
// "Lewis", "Wizard"... -> portrait + name in the current language.
// ==========================================================================

import { NPCS_DATA } from '../../data/npcs-data.js';
import { nm } from '../lib/i18n.js';
import { esc } from './core.js';

const byKey = new Map(NPCS_DATA.map(n => [n.nameEn === 'Wizard (M. Rasmodius)' ? 'Wizard' : n.nameEn === 'Mayor Lewis' ? 'Lewis' : n.nameEn, n]));

export const npcInfo = key => byKey.get(key);
export function npcTag(key) {
  const n = byKey.get(key);
  if (!n) return `<span class="item-tag" data-no-i18n>${esc(key)}</span>`;
  return `<span class="item-tag"><img src="${n.avatar}" alt="" class="pixel-img" loading="lazy" data-fallback="hide">${nm(n)}</span>`;
}
