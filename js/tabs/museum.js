// ==========================================================================
// TAB: BẢO TÀNG (MUSEUM DONATIONS FOR GUNTHER)
// Display-case tiles light up once donated; reward milestones track the
// counts Gunther checks (total, artifacts, minerals, specific sets).
// ==========================================================================

import { MUSEUM_ITEMS, MUSEUM_REWARDS } from '../../data/museum-data.js';
import { progress } from '../lib/progress.js';
import { emptyState, matches, pixelIcon } from '../lib/templates.js';
import { ico } from '../lib/icons.js';

const itemById = new Map(MUSEUM_ITEMS.map(it => [it.id, it]));
const ARTIFACTS = MUSEUM_ITEMS.filter(it => it.type === 'artifact');
const MINERALS = MUSEUM_ITEMS.filter(it => it.type === 'mineral');

// Display groups in shelf order; minerals split by the data's `group` label
const GROUPS = [...new Set(MUSEUM_ITEMS.map(it => it.group))];
const GROUP_ICONS = { 'Cổ vật': 'artifacts', 'Đá quý': 'gems', 'Khoáng thạch': 'geodes' };

export const museumProgress = {
  get donated() { return progress.set('museum'); },
  validKeys(ids) { return ids.filter(id => itemById.has(id)); },
  count(list) { return list.filter(it => this.donated.has(it.id)).length; },
  totals() { return { done: this.count(MUSEUM_ITEMS), total: MUSEUM_ITEMS.length }; }
};

// A reward can need a count, a specific set of items, or both (e.g. Drum
// Block: 3 artifacts including the Rare Disc). Progress is counted over the
// whole requirement so the chip reads naturally.
function rewardProgress(r) {
  const ids = r.items || [];
  const haveItems = ids.filter(id => museumProgress.donated.has(id)).length;
  if (r.kind === 'items') return { have: haveItems, need: ids.length, done: haveItems === ids.length };

  const pool = r.kind === 'artifacts' ? ARTIFACTS : r.kind === 'minerals' ? MINERALS : MUSEUM_ITEMS;
  const haveCount = Math.min(museumProgress.count(pool), r.count);
  return {
    have: haveCount,
    need: r.count,
    done: haveCount >= r.count && haveItems === ids.length
  };
}

function rewardCondition(r) {
  const names = (r.items || []).map(id => itemById.get(id)?.name || id).join(', ');
  if (r.kind === 'items') return `Quyên góp: ${names}`;
  const what = r.kind === 'artifacts' ? 'Cổ vật' : r.kind === 'minerals' ? 'Khoáng sản' : 'món bất kỳ';
  return `Quyên góp ${r.count} ${what}${names ? ` (phải gồm: ${names})` : ''}`;
}

function meter(label, done, total, mod = '') {
  const plain = label.replace(/<[^>]+>/g, '').trim();
  const pct = total ? Math.round((done / total) * 100) : 0;
  return `
    <div class="museum-meter ${mod}">
      <div class="museum-meter__head"><span>${label}</span><strong>${done}/${total}</strong></div>
      <div class="progress" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="${plain}">
        <div class="progress__fill" style="--pct: ${pct}%"></div>
      </div>
    </div>`;
}

function tile(it) {
  const on = museumProgress.donated.has(it.id);
  return `
    <button class="case-tile ${on ? 'is-donated' : ''}" type="button" data-action="museum-toggle" data-id="${it.id}"
            aria-pressed="${on}" title="${it.nameEn} • ${it.source}">
      <span class="case-tile__pedestal">
        <img src="${it.icon}" alt="" class="pixel-img" loading="lazy" data-fallback="hide">
        <span class="case-tile__tick" aria-hidden="true">✓</span>
      </span>
      <span class="case-tile__name">${it.name}</span>
      <span class="case-tile__source">${it.source}</span>
    </button>`;
}

const museumTab = {
  id: 'museum',
  toggles: ['unfinished'],

  render(app) {
    const t = museumProgress.totals();
    document.getElementById('museumSummary').innerHTML = `
      ${meter(`${ico('museum')} Tổng số món đã quyên góp`, t.done, t.total, 'museum-meter--main')}
      ${meter(`${ico('artifacts')} Cổ vật`, museumProgress.count(ARTIFACTS), ARTIFACTS.length)}
      ${meter(`${ico('gems')} Khoáng sản`, museumProgress.count(MINERALS), MINERALS.length)}`;

    document.getElementById('museumRewards').innerHTML = MUSEUM_REWARDS.map(r => {
      const { have, need, done: got } = rewardProgress(r);
      return `
        <li class="reward ${got ? 'is-done' : ''}">
          <span class="reward__state" aria-hidden="true">${pixelIcon(got ? 'check' : 'lock')}</span>
          ${r.icon ? `<span class="ing-icon ing-icon--md"><img src="${r.icon}" alt="" class="pixel-img" data-fallback="hide" loading="lazy"></span>` : ''}
          <span class="reward__text">
            <strong>${r.reward}</strong>
            <span class="muted">${rewardCondition(r)}</span>
          </span>
          <span class="count-chip">${have}/${need}</span>
        </li>`;
    }).join('');

    const filter = app.filters.museum;
    const q = app.searchQuery;
    const list = MUSEUM_ITEMS.filter(it => {
      if (filter !== 'all' && it.type !== filter) return false;
      if (app.toggles.unfinished && museumProgress.donated.has(it.id)) return false;
      if (q) return matches(q, it.name, it.nameEn, it.source, it.group);
      return true;
    });

    document.getElementById('museumCases').innerHTML = list.length
      ? GROUPS.map(g => {
        const items = list.filter(it => it.group === g);
        if (!items.length) return '';
        const all = MUSEUM_ITEMS.filter(it => it.group === g);
        return `
          <section class="case">
            <header class="case__head">
              <h3 class="case__title">${ico(GROUP_ICONS[g] || 'box')} ${g}</h3>
              <span class="badge badge--gold">${museumProgress.count(all)}/${all.length}</span>
            </header>
            <div class="case__grid">${items.map(tile).join('')}</div>
          </section>`;
      }).join('')
      : emptyState('museum', 'Không có món nào khớp!', 'Thử từ khóa khác hoặc tắt bộ lọc "Chưa Hoàn Thành".');
  },

  badge() {
    const t = museumProgress.totals();
    document.getElementById('museumTabBadge').textContent = `${t.done}/${t.total}`;
  },

  actions: {
    'museum-toggle': (app, el) => {
      const id = el.dataset.id;
      if (progress.toggle('museum', id)) {
        app.sfx.play('complete');
        app.showToast(`${ico('museum')} Đã quyên góp ${itemById.get(id).name} cho Gunther!`);
      } else {
        app.sfx.play('uncheck');
      }
    }
  }
};

export default museumTab;
