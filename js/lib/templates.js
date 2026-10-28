import { ico } from './icons.js';

// ==========================================================================
// SHARED MARKUP SNIPPETS
// ==========================================================================

export const FALLBACK_ICON = 'assets/icons/ing_wood.png';

// Hand-drawn pixel icons in assets/ (pixel-check.svg, ...) used instead of
// emoji where a glyph should match the pixel UI
// In-game item art from assets/icons/, sized to sit inline with text
export const gameIcon = name => ico(name);

export const pixelIcon = name => ico(name);

export const signed = n => (n > 0 ? `+${n}` : `${n}`);

export function v16Badge(on, label = '1.6 Mới') {
  return on ? `<span class="badge badge--v16">${label}</span>` : '';
}

// Square framed icon. Shows the emoji when there is no image or it fails.
// Framed item picture; if the image is missing or fails, shows a registry icon
export function iconBox(src, fallback = 'box', alt = '', size = '') {
  const cls = `icon-box${size ? ` icon-box--${size}` : ''}${src ? '' : ' is-broken'}`;
  return `
    <div class="${cls}">
      ${src ? `<img src="${src}" alt="${alt}" class="pixel-img" data-fallback="emoji" loading="lazy">` : ''}
      <span class="icon-box__emoji" aria-hidden="true">${ico(fallback)}</span>
    </div>`;
}

export function ingredientList(ingredients, modifier = '') {
  return `
    <ul class="ing-list ${modifier}">
      ${ingredients.map(ing => `
        <li class="ing-row">
          <span class="ing-row__left">
            <span class="ing-icon"><img src="${ing.iconUrl || FALLBACK_ICON}" alt="" class="pixel-img" data-fallback="hide" loading="lazy"></span>
            <span>
              ${ing.name}
              ${ing.nameEn && !ing.name.toLowerCase().includes(ing.nameEn.toLowerCase()) ? `<small class="muted">(${ing.nameEn})</small>` : ''}
            </span>
          </span>
          <span class="count-chip">x${ing.count}</span>
        </li>`).join('')}
    </ul>`;
}

export function emptyState(icon, title, hint) {
  return `
    <div class="empty-state">
      <div class="empty-state__icon" aria-hidden="true">${ico(icon)}</div>
      <h3>${title}</h3>
      <p>${hint}</p>
    </div>`;
}

export function wikiLink(nameEn, label, page) {
  const slug = page || encodeURIComponent(nameEn.split('(')[0].trim().replace(/\s+/g, '_'));
  return `<a class="wiki-link" href="https://stardewvalleywiki.com/${slug}" target="_blank" rel="noopener">${ico('wiki')} ${label} ↗</a>`;
}

export function modalHeader({ icon, title, sub, extra = '' }) {
  return `
    <div class="detail-head">
      ${icon}
      <div>
        <h2 class="detail-head__title">${title}</h2>
        <div class="detail-head__sub">${sub}</div>
        ${extra}
      </div>
    </div>`;
}

export function matches(query, ...fields) {
  return fields.some(f => {
    if (!f) return false;
    if (Array.isArray(f)) return f.some(x => typeof x === 'string' && x.toLowerCase().includes(query));
    return f.toLowerCase().includes(query);
  });
}
