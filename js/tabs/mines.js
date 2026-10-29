// ==========================================================================
// TAB: HẦM MỎ (MINES, SKULL CAVERN, VOLCANO DUNGEON, QUARRY MINE)
// Left: a pixel mine shaft drawn to scale, one coloured band per zone, with
// markers for treasure chests, fishing ponds and other milestone floors.
// Right: one card per zone listing ores, gems, geodes, monsters (and what
// they drop), fish and other finds.
// ==========================================================================

import { MINE_AREAS } from '../../data/mines-data.js';
import { emptyState, matches } from '../lib/templates.js';
import { ico } from '../lib/icons.js';

const areaById = new Map(MINE_AREAS.map(a => [a.id, a]));

const THEMES = {
  earth: 'Đất đá', ice: 'Băng giá', lava: 'Dung nham', dark: 'Bóng tối',
  desert: 'Sa mạc', volcano: 'Núi lửa', quarry: 'Mỏ đá'
};

const SECTIONS = [
  { key: 'ores', label: 'Quặng & Đá', icon: 'item_copper_ore' },
  { key: 'gems', label: 'Đá quý & Khoáng sản', icon: 'gems' },
  { key: 'geodes', label: 'Hộp Geode', icon: 'geodes' },
  { key: 'fish', label: 'Cá trong hồ ngầm', icon: 'fish' },
  { key: 'other', label: 'Vật phẩm & Điểm đặc biệt', icon: 'sparkle' }
];

const MILESTONE_ICONS = { chest: 'gift', fish: 'fish', special: 'sparkle' };

// Several milestones on one floor (e.g. chest + fishing pond on 20) share a marker
const byFloor = list => [...list.reduce((map, m) => map.set(m.floor, [...(map.get(m.floor) || []), m]), new Map())];

const floorLabel = ([a, b]) => (b === null || b === undefined ? `Tầng ${a}+` : a === b ? `Tầng ${a}` : `Tầng ${a}–${b}`);
const itemText = it => [it.name, it.nameEn, it.note];
const monsterText = m => [m.name, m.nameEn, m.note, m.floors, ...(m.drops || [])];

function currentArea(app) {
  return areaById.get(app.filters.mines) || MINE_AREAS[0];
}

// A milestone belongs to the zone whose range holds its floor, or the last
// zone (e.g. floor 120 after the 80-119 lava zone).
function milestonesFor(area, zone) {
  const zones = area.zones;
  return (area.milestones || []).filter(m => {
    const home = zones.find(z => m.floor >= z.floors[0] && (z.floors[1] == null || m.floor <= z.floors[1]))
      || zones[zones.length - 1];
    return home === zone;
  });
}

// ==========================================
// SHAFT DIAGRAM
// ==========================================
function shaftHtml(area) {
  const max = area.floorMax;
  if (!max) {
    // Endless (Skull Cavern): equal bands, then an open bottom
    return `
      <div class="shaft shaft--endless">
        ${area.zones.map(z => `
          <button class="shaft__band shaft__band--${z.theme}" type="button" data-action="mine-zone" data-zone="${z.id}">
            <span class="shaft__band-label">${floorLabel(z.floors)}</span>
          </button>`).join('')}
        <div class="shaft__abyss">${ico('skull')} Không đáy</div>
      </div>`;
  }

  const pct = f => ((f - 1) / max) * 100;
  const ticks = [];
  for (let f = 5; f <= max; f += 5) {
    ticks.push(`<span class="shaft__tick ${f % 10 === 0 ? 'shaft__tick--major' : ''}" style="--at: ${pct(f)}%">${f % 10 === 0 ? f : ''}</span>`);
  }
  return `
    <div class="shaft" style="--floors: ${max}">
      <div class="shaft__column">
        ${area.zones.map(z => {
          const end = z.floors[1] ?? max;
          return `
            <button class="shaft__band shaft__band--${z.theme}" type="button" data-action="mine-zone" data-zone="${z.id}"
                    style="--from: ${pct(z.floors[0])}%; --to: ${pct(end + 1)}%" title="${floorLabel(z.floors)} • ${z.name}">
              <span class="shaft__band-label">${z.name}</span>
            </button>`;
        }).join('')}
        ${ticks.join('')}
        ${byFloor(area.milestones || []).map(([floor, list]) => `
          <span class="shaft__marker" style="--at: ${pct(floor)}%"
                title="${list.map(m => `Tầng ${floor}: ${m.label}${m.reward ? ` (${m.reward.name})` : ''}`).join('\n')}">
            ${list.map(m => ico(m.reward?.icon || MILESTONE_ICONS[m.type] || 'sparkle')).join('')}
          </span>`).join('')}
      </div>
      <div class="shaft__legend">
        <span>${ico('gift')} Rương</span>
        <span>${ico('fish')} Hồ cá</span>
        <span class="shaft__legend-tick">Vạch: thang máy mỗi 5 tầng</span>
      </div>
    </div>`;
}

// ==========================================
// ZONE CARDS
// ==========================================
function chip(it, q) {
  const hit = q && matches(q, ...itemText(it));
  return `
    <span class="mine-item ${hit ? 'is-hit' : ''}" title="${it.nameEn || ''}${it.note ? ` • ${it.note}` : ''}">
      ${it.icon ? ico(it.icon) : ''}
      <span class="mine-item__name">${it.name}</span>
      ${it.note ? `<span class="mine-item__note">${it.note}</span>` : ''}
    </span>`;
}

function monsterRow(m, q) {
  const hit = q && matches(q, ...monsterText(m));
  return `
    <li class="monster ${hit ? 'is-hit' : ''}">
      <span class="monster__sprite">${m.icon ? ico(m.icon) : ico('skull')}</span>
      <span class="monster__info">
        <span class="monster__name">${m.name}${m.floors ? ` <span class="muted">· tầng ${m.floors}</span>` : ''}</span>
        ${m.drops?.length ? `<span class="monster__drops">Rơi: ${m.drops.join(', ')}</span>` : ''}
        ${m.note ? `<span class="muted">${m.note}</span>` : ''}
      </span>
    </li>`;
}

function zoneCard(area, z, q) {
  const milestones = milestonesFor(area, z);
  const sections = SECTIONS
    .filter(s => z[s.key]?.length)
    .map(s => `
      <div class="zone__section">
        <h4 class="zone__section-title">${ico(s.icon)} ${s.label}</h4>
        <div class="mine-items">${z[s.key].map(it => chip(it, q)).join('')}</div>
      </div>`).join('');

  return `
    <article class="zone zone--${z.theme}" id="zone-${z.id}">
      <header class="zone__head">
        <div>
          <div class="zone__floors">${floorLabel(z.floors)}</div>
          <h3 class="zone__title">${z.name} <small>${z.nameEn}</small></h3>
        </div>
        <span class="badge">${THEMES[z.theme] || z.theme}</span>
      </header>
      <div class="zone__body">
        ${z.desc ? `<p class="zone__desc">${z.desc}</p>` : ''}
        ${milestones.length ? `
          <div class="zone__section">
            <h4 class="zone__section-title">${ico('sparkle')} Tầng đặc biệt</h4>
            <ul class="milestones">
              ${milestones.map(m => `
                <li class="milestone">
                  <span class="milestone__floor">Tầng ${m.floor}</span>
                  ${ico(m.reward?.icon || MILESTONE_ICONS[m.type] || 'sparkle')}
                  <span>${m.label}${m.reward ? `: <strong>${m.reward.name}</strong>` : ''}</span>
                </li>`).join('')}
            </ul>
          </div>` : ''}
        ${sections}
        ${z.monsters?.length ? `
          <div class="zone__section">
            <h4 class="zone__section-title">${ico('skull')} Quái vật & Vật phẩm rơi</h4>
            <ul class="monsters">${z.monsters.map(m => monsterRow(m, q)).join('')}</ul>
          </div>` : ''}
      </div>
    </article>`;
}

function zoneMatches(z, q) {
  return matches(q, z.name, z.nameEn, z.desc,
    ...SECTIONS.flatMap(s => (z[s.key] || []).flatMap(itemText)),
    ...(z.monsters || []).flatMap(monsterText));
}

const minesTab = {
  id: 'mines',
  toggles: [],

  init() {
    document.getElementById('mineAreaChips').innerHTML = MINE_AREAS.map(a =>
      `<button class="chip" type="button" data-action="filter" data-value="${a.id}">${ico(a.icon)} ${a.name}</button>`).join('');
  },

  render(app) {
    const area = currentArea(app);
    const q = app.searchQuery;
    document.querySelectorAll('[data-filter-group="mines"] [data-action="filter"]').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.value === area.id);
    });

    document.getElementById('mineIntro').innerHTML = `
      <div class="mine-intro">
        <span class="mine-intro__icon">${ico(area.icon)}</span>
        <div>
          <h2 class="panel__title">${area.name} <small class="muted">${area.nameEn}</small></h2>
          <p>${area.desc || ''}</p>
          <div class="mine-intro__facts">
            ${area.location ? `<span>${ico('pin')} <strong>Vị trí:</strong> ${area.location}</span>` : ''}
            ${area.unlock ? `<span>${ico('unlock')} <strong>Mở khoá:</strong> ${area.unlock}</span>` : ''}
            <span>${ico('calendar')} <strong>Số tầng:</strong> ${area.floorMax ? area.floorMax : 'không giới hạn'}</span>
          </div>
        </div>
      </div>`;

    document.getElementById('mineShaft').innerHTML = shaftHtml(area);

    // Searching looks across every area so "where does X drop?" works
    const areas = q ? MINE_AREAS : [area];
    const html = areas.map(a => {
      const zones = a.zones.filter(z => !q || zoneMatches(z, q));
      if (!zones.length) return '';
      return `
        ${q ? `<h3 class="mine-area-title">${ico(a.icon)} ${a.name}</h3>` : ''}
        ${zones.map(z => zoneCard(a, z, q)).join('')}`;
    }).join('');

    document.getElementById('mineZones').innerHTML = html
      || emptyState('search', 'Không tìm thấy vật phẩm hay quái vật nào khớp!', 'Thử từ khóa khác, ví dụ: Kim cương, Slime, Quặng vàng.');
  },

  actions: {
    'mine-zone': (app, el) => {
      const card = document.getElementById(`zone-${el.dataset.zone}`);
      if (!card) return;
      app.sfx.play('click');
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      card.classList.add('is-flash');
      setTimeout(() => card.classList.remove('is-flash'), 900);
    }
  }
};

export default minesTab;
