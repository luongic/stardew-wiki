// ==========================================================================
// TAB: TIẾN ĐỘ & HOÀN THÀNH (PROGRESS TRACKER + BACKUP)
// ==========================================================================

import { RECIPES_DATA } from '../../data/recipes-data.js';
import { QUESTS_DATA } from '../../data/quests-data.js';
import { planner } from './planner.js';
import { progress } from '../lib/progress.js';
import { bundleProgress } from './bundles.js';
import { museumProgress } from './museum.js';

const BACKUP_VERSION = 3;

// Every recipe and quest falls into exactly one card, so the cards add up to
// the tab badges.
const GROUPS = [
  { icon: '🍳', label: 'Món Ăn Đã Nấu Thành Công', unit: 'món', kind: 'recipe',
    test: r => r.category === 'cooking' },
  { icon: '🔨', label: 'Đồ Thủ Công Đã Chế Tạo', unit: 'đồ', kind: 'recipe',
    test: r => r.category === 'crafting' },
  { icon: '🏗️', label: 'Luyện Kim, Công Trình & Nâng Cấp', unit: 'mục', kind: 'recipe',
    test: r => r.category !== 'cooking' && r.category !== 'crafting' },
  { icon: '📖', label: 'Nhiệm Vụ Cốt Truyện Đã Xong', unit: 'xong', kind: 'quest',
    test: q => q.category === 'story' },
  { icon: '🔮', label: 'Nhiệm Vụ Ẩn & Bí Mật Đã Khám Phá', unit: 'xong', kind: 'quest',
    test: q => q.category === 'secret_hidden' },
  { icon: '🌴', label: 'Đảo Gừng, Đơn Hàng Lớn & Bản 1.6', unit: 'xong', kind: 'quest',
    test: q => q.category !== 'story' && q.category !== 'secret_hidden' },
  { icon: '🎁', label: 'Gói Nhà Cộng Đồng Đã Hoàn Thành', unit: 'gói',
    measure: () => bundleProgress.totals() },
  { icon: '🏛️', label: 'Món Đã Quyên Góp Cho Bảo Tàng', unit: 'món',
    measure: () => museumProgress.totals() }
];

function measure(app, g) {
  if (g.measure) return g.measure();
  const source = g.kind === 'recipe' ? RECIPES_DATA : QUESTS_DATA;
  const doneSet = g.kind === 'recipe' ? app.completedRecipes : app.completedQuests;
  const all = source.filter(g.test);
  return { done: all.filter(x => doneSet.has(x.id)).length, total: all.length };
}

function statCard(app, g) {
  const { done, total } = measure(app, g);
  const pct = total ? Math.round((done / total) * 100) : 0;
  return `
    <div class="stat-card">
      <div class="stat-card__icon" aria-hidden="true">${g.icon}</div>
      <div class="stat-card__value">${pct}%</div>
      <div class="stat-card__label">${g.label}</div>
      <div class="stat-card__sub">${done} / ${total} ${g.unit}</div>
      <div class="progress" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="${g.label}">
        <div class="progress__fill" style="--pct: ${pct}%"></div>
      </div>
    </div>`;
}

function exportProgress(app) {
  const backup = {
    version: BACKUP_VERSION,
    date: new Date().toISOString(),
    completedRecipes: Array.from(app.completedRecipes),
    completedQuests: Array.from(app.completedQuests),
    plannedItems: planner.items,
    gatheredMaterials: planner.gathered,
    bundleSlots: Array.from(bundleProgress.done),
    museumDonated: Array.from(museumProgress.donated)
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `stardew_wiki_progress_backup_${backup.date.slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  app.showToast('Đã tải xuống file sao lưu tiến độ!');
}

// Accepts this version and older exports (v1 had no gatheredMaterials, v2 no
// bundles/museum); missing sections are restored as empty.
// Unknown ids are dropped so a stale backup can't inflate the counts.
async function importProgress(app, file) {
  let data;
  try {
    data = JSON.parse(await file.text());
  } catch (e) {
    app.showToast('⚠️ File không phải JSON hợp lệ');
    return;
  }
  if (!data || !Array.isArray(data.completedRecipes) || !Array.isArray(data.completedQuests)) {
    app.showToast('⚠️ File không đúng định dạng sao lưu của Cẩm Nang');
    return;
  }

  const recipeIds = new Set(RECIPES_DATA.map(r => r.id));
  const questIds = new Set(QUESTS_DATA.map(q => q.id));
  const recipes = data.completedRecipes.filter(id => recipeIds.has(id));
  const quests = data.completedQuests.filter(id => questIds.has(id));
  const when = data.date ? new Date(data.date).toLocaleString('vi-VN') : 'không rõ ngày';

  if (!confirm(`Khôi phục bản sao lưu (${when})?\n• ${recipes.length} công thức • ${quests.length} nhiệm vụ\nTiến độ hiện tại sẽ bị thay thế.`)) return;

  progress.replace('recipes', recipes);
  progress.replace('quests', quests);
  progress.replace('planner', planner.validItems(data.plannedItems));
  progress.replace('gathered', planner.validGathered(data.gatheredMaterials));
  progress.replace('bundles', bundleProgress.validKeys(Array.isArray(data.bundleSlots) ? data.bundleSlots : []));
  progress.replace('museum', museumProgress.validKeys(Array.isArray(data.museumDonated) ? data.museumDonated : []));
  app.sfx.play('complete');
  app.showToast('📤 Đã khôi phục tiến độ từ file sao lưu!');
}

export default {
  id: 'tracker',
  toggles: [],

  render(app) {
    document.getElementById('statsGrid').innerHTML = GROUPS.map(g => statCard(app, g)).join('');
  },

  actions: {
    'export-progress': (app) => exportProgress(app),
    'import-progress': () => document.getElementById('importFileInput').click(),
    'import-file': (app, el) => {
      const file = el.files?.[0];
      el.value = ''; // allow choosing the same file again
      if (file) importProgress(app, file);
    },
    'reset-progress': (app) => {
      if (!confirm('CẢNH BÁO: Thao tác này sẽ đặt lại toàn bộ tiến độ đã hoàn thành về 0. Bạn có chắc không?')) return;
      for (const domain of ['recipes', 'quests', 'bundles', 'museum']) progress.replace(domain, []);
      app.showToast('Đã xóa dữ liệu tiến độ');
    }
  }
};
