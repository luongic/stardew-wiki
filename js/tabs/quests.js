// ==========================================================================
// TAB: HƯỚNG DẪN NHIỆM VỤ (QUESTS)
// ==========================================================================

import { QUESTS_DATA } from '../../data/quests-data.js';
import { emptyState, v16Badge, modalHeader, matches } from '../lib/templates.js';

const questById = new Map(QUESTS_DATA.map(q => [q.id, q]));
const revealed = new Set();

const isV16 = q => !!q.version16 || q.category === 'version16';

function cardHtml(q, done) {
  const open = !q.hidden || revealed.has(q.id);
  const blur = open ? '' : 'is-spoiler';
  return `
    <article class="card ${done ? 'is-done' : ''}">
      <header class="card__head">
        <div class="card__title-row">
          <div class="icon-box is-broken"><span class="icon-box__emoji" aria-hidden="true">${q.giverIcon || '📜'}</span></div>
          <div>
            <h3 class="card__title">${q.name}</h3>
            <div class="card__sub">
              ${q.nameEn}
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
          <span class="muted">👤 <strong>Giao bởi:</strong> ${q.giver}</span>
          ${q.hidden ? `<button class="btn btn--purple btn--sm" type="button" data-action="toggle-spoiler" data-id="${q.id}">👁️ ${open ? 'Ẩn Spoilers' : 'Xem Spoilers'}</button>` : ''}
        </div>

        <p class="card__desc ${blur}">${q.desc}</p>

        <div class="inset-box ${blur}">
          <div class="section-label">👣 Hướng dẫn từng bước:</div>
          <ol class="step-list">${q.steps.map(s => `<li>${s}</li>`).join('')}</ol>
        </div>

        <div class="callout callout--green callout--compact">🎁 <strong>Phần thưởng:</strong> ${q.reward}</div>
        <div class="source-tag"><strong>🔓 Điều kiện mở khóa:</strong> ${q.unlockCondition}</div>
      </div>

      <footer class="card__foot">
        <button class="btn btn--ghost" type="button" data-action="open-detail" data-type="quest" data-id="${q.id}">🔍 Chi Tiết & Mẹo Độc</button>
        <span class="muted">${done ? '✅ Đã hoàn thành' : '⏳ Đang thực hiện'}</span>
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
      : emptyState('📜', 'Không tìm thấy nhiệm vụ nào!', 'Hãy kiểm tra từ khóa hoặc chuyển sang tab nhiệm vụ khác.');
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
        icon: `<div class="icon-box icon-box--lg is-broken"><span class="icon-box__emoji" aria-hidden="true">${q.giverIcon || '📜'}</span></div>`,
        title: q.name,
        sub: `${q.nameEn} • Giao bởi: ${q.giver}`
      })}
      <p class="detail-lead">${q.desc}</p>
      <div class="inset-box">
        <h4 class="inset-box__title">👣 Hướng dẫn chi tiết từng bước:</h4>
        <ol class="step-list step-list--lg">${q.steps.map(s => `<li>${s}</li>`).join('')}</ol>
      </div>
      <div class="callout callout--green">🎁 <strong>Phần thưởng:</strong> ${q.reward}</div>
      ${q.tips ? `<div class="callout callout--tip">💡 <strong>Mẹo chuyên gia:</strong> ${q.tips}</div>` : ''}`;
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
