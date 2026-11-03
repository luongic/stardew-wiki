// ==========================================================================
// PLACE VIEW: A PICTURE OF A PLACE AND ITS SPOT ON THE WORLD MAP
// Used by the fishing place popup and the Mines tab. `place`: { photo, map
// (a data/map-data.js map id), x, y (pixels of that map image) }.
// ==========================================================================

import { MAPS } from '../../data/map-data.js';
import { ico } from './icons.js';
import { t, nm } from './i18n.js';

// Tall maps (the desert) are narrowed so the picture stays about 320px high
export function placeView(place, alt = '') {
  const map = MAPS.find(m => m.id === place.map);
  return `
    <div class="place-view">
      ${place.photo ? `
      <figure class="place-view__photo">
        <img src="${place.photo}" alt="${alt}" class="pixel-img" loading="lazy" data-fallback="hide">
        <figcaption class="muted">${t('Ảnh: Official Stardew Valley Wiki.')}</figcaption>
      </figure>` : ''}
      ${map ? `
      <figure class="place-view__map">
        <div class="place-view__mapbox"${map.h > map.w ? ` style="max-width:${Math.round((320 * map.w) / map.h)}px"` : ''}>
          <img src="${map.img}" alt="${nm(map)}" class="pixel-img" loading="lazy">
          <span class="place-view__pin" style="left:${(place.x / map.w) * 100}%;top:${(place.y / map.h) * 100}%" aria-hidden="true"></span>
        </div>
        <figcaption class="muted">${ico('pin')} ${t('Vị trí trên bản đồ')} ${nm(map)}</figcaption>
      </figure>` : ''}
    </div>`;
}
