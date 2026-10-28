// ==========================================================================
// TAB: KẾ HOẠCH & TÍNH NGUYÊN LIỆU (CRAFTING PLANNER)
// Planned recipe counts and the "already gathered" ticks persist separately,
// and both travel in the progress backup (see tracker.js).
// ==========================================================================

import { RECIPES_DATA } from '../../data/recipes-data.js';
import { progress } from '../lib/progress.js';
import { iconBox, FALLBACK_ICON } from '../lib/templates.js';

const recipeById = new Map(RECIPES_DATA.map(r => [r.id, r]));

// Thin view over the progress store: counts live in progress.planner and
// gathered ingredients in progress.flags.gathered.
class Planner {
  get items() { return Object.fromEntries(progress.plannedEntries()); }
  get gathered() { return Object.fromEntries([...progress.set('gathered')].map(k => [k, true])); }

  add(id, count = 1) {
    if (recipeById.has(id)) progress.addCount(id, count);
  }

  step(id, delta) { progress.addCount(id, delta); }
  remove(id) { progress.setCount(id, 0); }

  clear() {
    progress.replace('planner', {});
    progress.replace('gathered', []);
  }

  toggleGathered(name) { progress.toggle('gathered', name); }

  // Sanitise backup data before it replaces the store
  validItems(items = {}) {
    return Object.fromEntries(
      Object.entries(items).filter(([id, n]) => recipeById.has(id) && Number.isInteger(n) && n > 0)
    );
  }

  validGathered(gathered = {}) {
    return Object.keys(gathered).filter(k => gathered[k] === true);
  }

  total() {
    return progress.plannedEntries().reduce((a, [, n]) => a + n, 0);
  }

  materials() {
    const mats = {};
    for (const [id, qty] of progress.plannedEntries()) {
      for (const ing of recipeById.get(id)?.ingredients || []) {
        mats[ing.name] ??= {
          name: ing.name,
          nameEn: ing.nameEn || '',
          iconUrl: ing.iconUrl || FALLBACK_ICON,
          count: 0,
          gathered: progress.has('gathered', ing.name)
        };
        mats[ing.name].count += ing.count * qty;
      }
    }
    return Object.values(mats);
  }
}

export const planner = new Planner();

function plannedRow(r, count) {
  return `
    <div class="planned-row">
      <div class="planned-row__info">
        ${iconBox(r.imageUrl, r.icon, r.name, 'sm')}
        <div>
          <div class="planned-row__name">${r.name}</div>
          <div class="muted">${r.nameEn}</div>
        </div>
      </div>
      <div class="qty">
        <button class="qty__btn" type="button" data-action="planner-step" data-id="${r.id}" data-step="-1" aria-label="Giảm">-</button>
        <span class="qty__num">${count}</span>
        <button class="qty__btn" type="button" data-action="planner-step" data-id="${r.id}" data-step="1" aria-label="Tăng">+</button>
        <button class="qty__btn qty__btn--danger" type="button" data-action="planner-remove" data-id="${r.id}" aria-label="Xóa">✕</button>
      </div>
    </div>`;
}

function materialCard(m) {
  return `
    <label class="material ${m.gathered ? 'is-done' : ''}">
      <span class="material__info">
        <span class="ing-icon ing-icon--md"><img src="${m.iconUrl}" alt="" class="pixel-img" data-fallback="hide" loading="lazy"></span>
        <span>
          <span class="material__name">${m.name}</span>
          ${m.nameEn && !m.name.toLowerCase().includes(m.nameEn.toLowerCase()) ? `<span class="muted">${m.nameEn}</span>` : ''}
        </span>
      </span>
      <span class="material__right">
        <span class="count-chip">x${m.count}</span>
        <input type="checkbox" class="px-check" data-action="planner-gathered" data-mat="${m.name}"
               ${m.gathered ? 'checked' : ''} title="Đánh dấu đã gom đủ">
      </span>
    </label>`;
}

export default {
  id: 'planner',
  toggles: [],

  badge() {
    document.getElementById('plannerBadge').textContent = planner.total();
  },

  render() {
    const listEl = document.getElementById('plannedItemsList');
    const matsEl = document.getElementById('rawMaterialsGrid');
    const ids = Object.keys(planner.items).filter(id => recipeById.has(id));

    if (!ids.length) {
      listEl.innerHTML = `
        <div class="panel-empty">
          <div class="panel-empty__icon" aria-hidden="true">🎒</div>
          <p><strong>Chưa có món nào trong Kế Hoạch Chế Tạo.</strong></p>
          <p>Hãy duyệt qua các công thức nấu ăn hoặc chế tạo và nhấn nút <strong>"+ Kế Hoạch Chế Tạo"</strong>!</p>
        </div>`;
      matsEl.innerHTML = `<div class="panel-empty panel-empty--wide"><p>Danh sách nguyên liệu sẽ tự động tổng hợp khi bạn thêm món cần chế biến.</p></div>`;
      return;
    }

    listEl.innerHTML = ids.map(id => plannedRow(recipeById.get(id), planner.items[id])).join('');
    matsEl.innerHTML = planner.materials().map(materialCard).join('');
  },

  actions: {
    'planner-step': (app, el) => {
      const id = el.dataset.id;
      planner.step(id, Number(el.dataset.step));
      app.sfx.play('click');
    },
    'planner-remove': (app, el) => {
      planner.remove(el.dataset.id);
      app.sfx.play('uncheck');
    },
    'planner-gathered': (app, el) => planner.toggleGathered(el.dataset.mat),
    'planner-clear': (app) => {
      if (!confirm('Bạn có chắc muốn xóa toàn bộ kế hoạch chế biến hiện tại?')) return;
      planner.clear();
      app.sfx.play('click');
      app.showToast('Đã dọn sạch Kế Hoạch Chế Tạo');
    }
  }
};
