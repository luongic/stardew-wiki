// ==========================================================================
// STARDEW VALLEY WIKI - CRAFTING PLANNER & MATERIAL CALCULATOR
// ==========================================================================

import { RECIPES_DATA } from '../data/recipes-data.js';

class CraftingCalculator {
  constructor() {
    this.storageKey = 'stardew_wiki_planner';
    this.gatheredKey = 'stardew_wiki_gathered_materials';
    this.plannedItems = this.loadPlan();
    this.gatheredMaterials = this.loadGathered();
    this.recipeMap = new Map(RECIPES_DATA.map(r => [r.id, r]));
  }

  loadPlan() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error('Lỗi đọc kế hoạch từ localStorage', e);
      return {};
    }
  }

  savePlan() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.plannedItems));
    } catch (e) {
      console.error('Lỗi lưu kế hoạch vào localStorage', e);
    }
  }

  loadGathered() {
    try {
      const data = localStorage.getItem(this.gatheredKey);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }

  saveGathered() {
    try {
      localStorage.setItem(this.gatheredKey, JSON.stringify(this.gatheredMaterials));
    } catch (e) {
      console.error('Lỗi lưu vật phẩm đã gom', e);
    }
  }

  addItem(recipeId, count = 1) {
    if (!this.recipeMap.has(recipeId)) return;
    this.plannedItems[recipeId] = (this.plannedItems[recipeId] || 0) + count;
    this.savePlan();
    this.render();
  }

  removeItem(recipeId) {
    delete this.plannedItems[recipeId];
    this.savePlan();
    this.render();
  }

  setCount(recipeId, count) {
    if (count <= 0) {
      this.removeItem(recipeId);
    } else {
      this.plannedItems[recipeId] = count;
      this.savePlan();
      this.render();
    }
  }

  clearPlan() {
    this.plannedItems = {};
    this.gatheredMaterials = {};
    this.savePlan();
    this.saveGathered();
    this.render();
  }

  toggleGathered(matName) {
    this.gatheredMaterials[matName] = !this.gatheredMaterials[matName];
    this.saveGathered();
    this.render();
  }

  calculateMaterials() {
    const materials = {};
    for (const [recipeId, qty] of Object.entries(this.plannedItems)) {
      const recipe = this.recipeMap.get(recipeId);
      if (!recipe || !recipe.ingredients) continue;

      recipe.ingredients.forEach(ing => {
        const key = ing.name;
        if (!materials[key]) {
          materials[key] = {
            name: ing.name,
            nameEn: ing.nameEn || '',
            count: 0,
            gathered: !!this.gatheredMaterials[key]
          };
        }
        materials[key].count += ing.count * qty;
      });
    }
    return materials;
  }

  getTotalPlannedItemsCount() {
    return Object.values(this.plannedItems).reduce((acc, curr) => acc + curr, 0);
  }

  render() {
    const plannedListEl = document.getElementById('plannedItemsList');
    const rawMaterialsGridEl = document.getElementById('rawMaterialsGrid');
    const plannerCountBadge = document.getElementById('plannerBadge');

    if (plannerCountBadge) {
      const total = this.getTotalPlannedItemsCount();
      plannerCountBadge.textContent = total > 0 ? total : '0';
    }

    if (!plannedListEl || !rawMaterialsGridEl) return;

    const plannedKeys = Object.keys(this.plannedItems);

    if (plannedKeys.length === 0) {
      plannedListEl.innerHTML = `
        <div style="text-align: center; padding: 36px 12px; color: var(--text-muted);">
          <div style="font-size: 2.2rem; margin-bottom: 8px;">🎒</div>
          <p style="font-weight: 500;">Chưa có món nào trong Kế Hoạch Chế Tạo.</p>
          <p style="font-size: 0.88rem; margin-top: 4px;">Hãy duyệt qua các công thức nấu ăn hoặc chế tạo và nhấn nút <strong>"+ Thêm vào kế hoạch"</strong>!</p>
        </div>
      `;
      rawMaterialsGridEl.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 36px 12px; color: var(--text-muted);">
          <p>Danh sách nguyên liệu sẽ tự động tổng hợp khi bạn thêm món cần chế biến.</p>
        </div>
      `;
      return;
    }

    // Render Planned Items
    plannedListEl.innerHTML = plannedKeys.map(recipeId => {
      const recipe = this.recipeMap.get(recipeId);
      if (!recipe) return '';
      const count = this.plannedItems[recipeId];

      return `
        <div class="planned-item-row">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 38px; height: 38px; background: #fff; border: 1.5px solid var(--parchment-border); border-radius: 6px; display: flex; align-items: center; justify-content: center; padding: 2px; flex-shrink: 0; overflow: hidden;">
              ${recipe.imageUrl ? `
                <img src="${recipe.imageUrl}" alt="${recipe.name}" class="pixel-art-icon" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <span class="fallback-emoji" style="display: none; font-size: 1.2rem;">${recipe.icon || '📦'}</span>
              ` : `
                <span class="fallback-emoji" style="font-size: 1.2rem;">${recipe.icon || '📦'}</span>
              `}
            </div>
            <div>
              <div style="font-weight: 700; color: var(--wood-dark); font-size: 0.95rem;">${recipe.name}</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">${recipe.nameEn}</div>
            </div>
          </div>
          <div class="qty-controls">
            <button class="qty-btn" data-action="dec" data-id="${recipe.id}">-</button>
            <span class="qty-num">${count}</span>
            <button class="qty-btn" data-action="inc" data-id="${recipe.id}">+</button>
            <button class="qty-btn" style="background: #e74c3c; margin-left: 6px;" data-action="del" data-id="${recipe.id}">✕</button>
          </div>
        </div>
      `;
    }).join('');

    // Attach Event Handlers to Qty Controls
    plannedListEl.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.currentTarget.dataset.action;
        const id = e.currentTarget.dataset.id;
        const currentCount = this.plannedItems[id] || 0;

        if (action === 'inc') this.setCount(id, currentCount + 1);
        if (action === 'dec') this.setCount(id, currentCount - 1);
        if (action === 'del') this.removeItem(id);
      });
    });

    // Render Raw Materials Breakdown
    const materials = this.calculateMaterials();
    const matList = Object.values(materials);

    rawMaterialsGridEl.innerHTML = matList.map(mat => {
      const isDone = mat.gathered;
      return `
        <div class="material-card ${isDone ? 'gathered' : ''}" data-mat="${mat.name}">
          <div>
            <div style="font-weight: 600; font-size: 0.9rem; color: ${isDone ? '#27ae60' : 'var(--wood-dark)'}; ${isDone ? 'text-decoration: line-through;' : ''}">
              ${mat.name}
            </div>
            <div style="font-size: 0.78rem; color: var(--text-muted);">${mat.nameEn}</div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="ing-count" style="font-size: 0.95rem;">x${mat.count}</span>
            <input type="checkbox" class="toggle-checkbox" ${isDone ? 'checked' : ''} data-mat="${mat.name}" title="Đánh dấu đã gom đủ">
          </div>
        </div>
      `;
    }).join('');

    // Attach Gathered Checkbox Listeners
    rawMaterialsGridEl.querySelectorAll('.toggle-checkbox').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const mat = e.currentTarget.dataset.mat;
        this.toggleGathered(mat);
      });
    });
  }
}

export const calculator = new CraftingCalculator();
