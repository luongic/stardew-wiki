// ==========================================================================
// TAB: HƯỚNG DẪN NHIỆM VỤ (QUESTS)
// ==========================================================================

import { altName } from '../lib/i18n.js';
import { QUESTS_DATA } from '../../data/quests-data.js';
import { emptyState, v16Badge, modalHeader, matches, pixelIcon } from '../lib/templates.js';
import { ico } from '../lib/icons.js';

const questById = new Map(QUESTS_DATA.map(q => [q.id, q]));

// Who (or what) hands out each quest: the villager's portrait when there is
// one, otherwise the item the quest revolves around.
const GIVER_ICONS = {
  introductions: 'portrait:lewis', how_to_win_friends: 'letter', getting_started: 'item_parsnip',
  raising_animals: 'portrait:robin', explore_the_mines: 'portrait:marlon', deeper_in_the_mines: 'item_pickaxe',
  to_the_bottom: 'rusty_key', robins_lost_axe: 'item_axe', jodis_request: 'item_cauliflower',
  mayors_shorts: 'portrait:lewis', blackberry_basket: 'item_blackberry', a_winter_mystery: 'search',
  pam_is_thirsty: 'pale_ale', fish_casserole: 'portrait:jodi', dark_talisman: 'portrait:wizard',
  goblin_problem: 'void_mayonnaise', the_mysterious_qi: 'portrait:mr_qi', qis_challenge: 'portrait:mr_qi',
  cryptic_note_100: 'letter', pirates_wife: 'portrait:birdie', solid_gold_lewis: 'item_golden_relic',
  secret_dolls_statues: 'strange_doll_green', special_charm_luck: 'ing_rabbits_foot', bears_knowledge: 'bear_statue',
  mermaid_flute_puzzle: 'flute_block', gem_birds_shrine: 'parrot_egg', community_cleanup: 'portrait:linus',
  prismatic_jelly: 'portrait:wizard', ectoplasm: 'ghost_crystal', the_strong_stuff: 'item_potato',
  qis_crop: 'portrait:mr_qi', danger_in_the_mines: 'mega_bomb', raccoon_family_tree: 'mystic_tree_seed',
  mastery_cave_pillars: 'statue_of_blessings'
};
const giverIcon = q => GIVER_ICONS[q.id] || 'quests';
const revealed = new Set();

const isV16 = q => !!q.version16 || q.category === 'version16';

function cardHtml(q, done) {
  const open = !q.hidden || revealed.has(q.id);
  const blur = open ? '' : 'is-spoiler';
  return `
    <article class="card ${done ? 'is-done' : ''}">
      <header class="card__head">
        <div class="card__title-row">
          <div class="icon-box">${ico(giverIcon(q))}</div>
          <div>
            <h3 class="card__title">${q.name}</h3>
            <div class="card__sub">
              ${altName(q)}
              ${q.hidden ? '<span class="badge badge--purple">Ẩn / Bí Mật</span>' : ''}
              ${v16Badge(isV16(q))}
            </div>
          </div>
        </div>
        <button class="check-btn" type="button" data-action="toggle-quest" data-id="${q.id}"
                aria-pressed="${done}" title="${done ? 'Hủy đánh dấu' : 'Đánh dấu đã hoàn thành'}">✓</button>
      </header>

      <div class="card__body">
        <div class="split-row">
          <span class="muted">${ico('giver')} <strong>Giao bởi:</strong> ${q.giver}</span>
          ${q.hidden ? `<button class="btn btn--purple btn--sm" type="button" data-action="toggle-spoiler" data-id="${q.id}">${ico('eye')} ${open ? 'Ẩn Spoilers' : 'Xem Spoilers'}</button>` : ''}
        </div>

        <p class="card__desc ${blur}">${q.desc}</p>

        <div class="inset-box ${blur}">
          <div class="section-label">${ico('steps')} Hướng dẫn từng bước:</div>
          <ol class="step-list">${q.steps.map(s => `<li>${s}</li>`).join('')}</ol>
        </div>

        <div class="callout callout--green callout--compact">${ico('gift')} <strong>Phần thưởng:</strong> ${q.reward}</div>
        <div class="source-tag"><strong>${ico('unlock')} Điều kiện mở khóa:</strong> ${q.unlockCondition}</div>
      </div>

      <footer class="card__foot">
        <button class="btn btn--ghost" type="button" data-action="open-detail" data-type="quest" data-id="${q.id}">${ico('search')} Chi Tiết & Mẹo Độc</button>
        <span class="muted">${done ? `${pixelIcon('check')} Đã hoàn thành` : `${pixelIcon('hourglass')} Đang thực hiện`}</span>
      </footer>
    </article>`;
}

export default {
  id: 'quests',
  detailType: 'quest',
  toggles: ['v16', 'unfinished'],

  render(app) {
    const grid = document.getElementById('questsGrid');
    const filter = app.filters.quests;
    const query = app.searchQuery;

    const list = QUESTS_DATA.filter(q => {
      if (filter !== 'all' && q.category !== filter) return false;
      if (app.toggles.v16 && !isV16(q)) return false;
      if (app.toggles.unfinished && app.completedQuests.has(q.id)) return false;
      if (query) return matches(query, q.name, q.nameEn, q.giver, q.desc, q.reward, q.steps);
      return true;
    });

    grid.innerHTML = list.length
      ? list.map(q => cardHtml(q, app.completedQuests.has(q.id))).join('')
      : emptyState('quests', 'Không tìm thấy nhiệm vụ nào!', 'Hãy kiểm tra từ khóa hoặc chuyển sang tab nhiệm vụ khác.');
  },

  badge(app) {
    const done = QUESTS_DATA.filter(q => app.completedQuests.has(q.id)).length;
    document.getElementById('questTabBadge').textContent = `${done}/${QUESTS_DATA.length}`;
  },

  detail(app, id) {
    const q = questById.get(id);
    if (!q) return '';
    return `
      ${modalHeader({
        icon: `<div class="icon-box icon-box--lg">${ico(giverIcon(q))}</div>`,
        title: q.name,
        sub: `${altName(q)} • Giao bởi: ${q.giver}`
      })}
      <p class="detail-lead">${q.desc}</p>
      <div class="inset-box">
        <h4 class="inset-box__title">${ico('steps')} Hướng dẫn chi tiết từng bước:</h4>
        <ol class="step-list step-list--lg">${q.steps.map(s => `<li>${s}</li>`).join('')}</ol>
      </div>
      <div class="callout callout--green">${ico('gift')} <strong>Phần thưởng:</strong> ${q.reward}</div>
      ${q.tips ? `<div class="callout callout--tip">${ico('tip')} <strong>Mẹo chuyên gia:</strong> ${q.tips}</div>` : ''}`;
  },

  actions: {
    'toggle-quest': (app, el) => app.toggleCompleted('quest', el.dataset.id),
    'toggle-spoiler': (app, el) => {
      const id = el.dataset.id;
      if (revealed.has(id)) revealed.delete(id);
      else revealed.add(id);
      app.render();
    }
  }
};
