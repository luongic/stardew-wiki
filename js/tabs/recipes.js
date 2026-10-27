// ==========================================================================
// TAB: CÔNG THỨC CHẾ BIẾN (RECIPES)
// ==========================================================================

import { RECIPES_DATA } from '../../data/recipes-data.js';
import { iconBox, ingredientList, emptyState, v16Badge, wikiLink, modalHeader, matches, signed } from '../lib/templates.js';
import { planner } from './planner.js';

const recipeById = new Map(RECIPES_DATA.map(r => [r.id, r]));

function passesFilter(r, filter) {
  if (filter === 'all') return true;
  if (filter === 'version16') return !!r.version16;
  // Bait-making gear lives under several categories, so match it loosely
  if (filter === 'bait') return r.category === 'bait' || r.id.includes('bait') || !!r.subCategory?.includes('mồi');
  return r.category === filter;
}

function buffClass(stat) {
  if (stat.includes('Speed') || stat.includes('Tốc độ')) return 'buff--speed';
  if (stat.includes('Luck') || stat.includes('May mắn')) return 'buff--luck';
  if (stat.includes('Kháng') || stat.includes('MÁY') || stat.includes('BẢO')) return 'buff--special';
  return '';
}

function cardHtml(r, done) {
  return `
    <article class="card ${done ? 'is-done' : ''}">
      <header class="card__head">
        <div class="card__title-row">
          ${iconBox(r.imageUrl, r.icon, r.name)}
          <div>
            <h3 class="card__title">${r.name}</h3>
            <div class="card__sub">${r.nameEn} ${v16Badge(r.version16)}</div>
          </div>
        </div>
        <button class="check-btn" type="button" data-action="toggle-recipe" data-id="${r.id}"
                aria-pressed="${done}" title="${done ? 'Hủy đánh dấu' : 'Đánh dấu đã hoàn thành'}">✓</button>
      </header>

      <div class="card__body">
        <p class="card__desc">${r.desc}</p>

        <div class="inset-box">
          <div class="section-label">🌾 Nguyên liệu cần:</div>
          ${ingredientList(r.ingredients)}
        </div>

        ${r.buffs?.length ? `
          <div>
            <div class="section-label">⚡ Chỉ số tăng cường (Buffs):</div>
            <div class="pill-row">
              ${r.buffs.map(b => `<span class="buff ${buffClass(b.stat)}"><strong>${b.stat}:</strong> ${b.value} (${b.duration})</span>`).join('')}
            </div>
          </div>` : ''}

        <div class="stat-row">
          ${r.sellPrice ? `<span class="stat">💰 Bán: <b>${r.sellPrice}g</b></span>` : ''}
          ${r.energy ? `<span class="stat">⚡ Năng lượng: <b>${signed(r.energy)}</b></span>` : ''}
          ${r.health ? `<span class="stat">❤️ Máu: <b>${signed(r.health)}</b></span>` : ''}
        </div>

        <div class="source-tag"><strong>📖 Nguồn học:</strong> ${r.source}</div>
      </div>

      <footer class="card__foot">
        <button class="btn btn--ghost" type="button" data-action="open-detail" data-type="recipe" data-id="${r.id}">🔍 Chi tiết & Mẹo</button>
        <button class="btn btn--green" type="button" data-action="planner-add" data-id="${r.id}">+ Kế Hoạch Chế Tạo</button>
      </footer>
    </article>`;
}

export default {
  id: 'recipes',
  detailType: 'recipe',
  toggles: ['v16', 'unfinished', 'buffs'],

  render(app) {
    const grid = document.getElementById('recipesGrid');
    const filter = app.filters.recipes;
    const q = app.searchQuery;

    const list = RECIPES_DATA.filter(r => {
      if (!passesFilter(r, filter)) return false;
      if (app.toggles.v16 && !r.version16) return false;
      if (app.toggles.unfinished && app.completedRecipes.has(r.id)) return false;
      if (app.toggles.buffs && !r.buffs?.length) return false;
      if (q) {
        return matches(q, r.name, r.nameEn, r.desc, r.source,
          r.ingredients?.flatMap(i => [i.name, i.nameEn]));
      }
      return true;
    });

    grid.innerHTML = list.length
      ? list.map(r => cardHtml(r, app.completedRecipes.has(r.id))).join('')
      : emptyState('🔍', 'Không tìm thấy công thức nào phù hợp!', 'Hãy thử tìm từ khóa khác hoặc tắt bớt các bộ lọc đang chọn.');
  },

  // Counts every recipe category, so the badge moves for smelting, buildings,
  // tools and so on, not only cooking and crafting.
  badge(app) {
    const done = RECIPES_DATA.filter(r => app.completedRecipes.has(r.id)).length;
    document.getElementById('recipeTabBadge').textContent = `${done}/${RECIPES_DATA.length}`;
  },

  detail(app, id) {
    const r = recipeById.get(id);
    if (!r) return '';
    return `
      ${modalHeader({
        icon: iconBox(r.imageUrl, r.icon, r.name, 'lg'),
        title: r.name,
        sub: `${r.nameEn} • ${r.subCategory}`,
        extra: r.nameEn ? wikiLink(r.nameEn, 'Tra cứu ảnh gốc & Dữ liệu trên Official Wiki') : ''
      })}
      <p class="detail-lead">${r.desc}</p>
      <div class="inset-box">
        <h4 class="inset-box__title">🌾 Danh sách nguyên liệu cần:</h4>
        ${ingredientList(r.ingredients, 'ing-list--lg')}
      </div>
      ${r.tips ? `
        <div class="callout callout--tip">
          <strong>💡 Mẹo chơi & Tác dụng đặc biệt:</strong>
          <p>${r.tips}</p>
        </div>` : ''}
      <div class="detail-actions">
        <button class="btn btn--green btn--lg" type="button" data-action="planner-add" data-id="${r.id}">+ Thêm vào Kế Hoạch Chế Tạo</button>
      </div>`;
  },

  actions: {
    'toggle-recipe': (app, el) => app.toggleCompleted('recipe', el.dataset.id),
    'planner-add': (app, el) => {
      planner.add(el.dataset.id);
      app.sfx.play('click');
      app.showToast('Đã thêm vào Kế Hoạch Chế Tạo 🎒');
    }
  }
};

