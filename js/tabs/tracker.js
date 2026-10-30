// ==========================================================================
// TAB: TIẾN ĐỘ & HOÀN THÀNH (PROGRESS TRACKER + BACKUP)
// ==========================================================================

import { t } from '../lib/i18n.js';
import { RECIPES_DATA } from '../../data/recipes-data.js';
import { QUESTS_DATA } from '../../data/quests-data.js';
import { planner } from './planner.js';
import { progress } from '../lib/progress.js';
import { bundleProgress } from './bundles.js';
import { museumProgress } from './museum.js';
import { ico } from '../lib/icons.js';
import { KEYS, loadJSON } from '../lib/storage.js';
import { restoreNote } from '../sync/notes-ui.js';
import { openModal, closeModal } from '../lib/ui.js';
import { nm } from '../lib/i18n.js';
import { setCaughtFish } from './fishing.js';
import { applySaveDay } from './today.js';
import { applySaveFarm, farmPlanIsReplaceable } from './farm.js';
import { coop } from '../sync/coop.js';
import { SKILLS, LEVEL_XP, MASTERY_XP, PROFESSIONS } from '../../data/skills-data.js';
import { saveJSON } from '../lib/storage.js';

const BACKUP_VERSION = 3;

// Every recipe and quest falls into exactly one card, so the cards add up to
// the tab badges.
const GROUPS = [
  { icon: 'cooking', label: 'Món Ăn Đã Nấu Thành Công', unit: 'món', kind: 'recipe',
    test: r => r.category === 'cooking' },
  { icon: 'crafting', label: 'Đồ Thủ Công Đã Chế Tạo', unit: 'đồ', kind: 'recipe',
    test: r => r.category === 'crafting' },
  { icon: 'smelting', label: 'Luyện Kim, Công Trình & Nâng Cấp', unit: 'mục', kind: 'recipe',
    test: r => r.category !== 'cooking' && r.category !== 'crafting' },
  { icon: 'story', label: 'Nhiệm Vụ Cốt Truyện Đã Xong', unit: 'xong', kind: 'quest',
    test: q => q.category === 'story' },
  { icon: 'secret', label: 'Nhiệm Vụ Ẩn & Bí Mật Đã Khám Phá', unit: 'xong', kind: 'quest',
    test: q => q.category === 'secret_hidden' },
  { icon: 'ginger', label: 'Đảo Gừng, Đơn Hàng Lớn & Bản 1.6', unit: 'xong', kind: 'quest',
    test: q => q.category !== 'story' && q.category !== 'secret_hidden' },
  { icon: 'bundles', label: 'Gói Nhà Cộng Đồng Đã Hoàn Thành', unit: 'gói',
    measure: () => bundleProgress.totals() },
  { icon: 'museum', label: 'Món Đã Quyên Góp Cho Bảo Tàng', unit: 'món',
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
      <div class="stat-card__icon" aria-hidden="true">${ico(g.icon)}</div>
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
    museumDonated: Array.from(museumProgress.donated),
    note: loadJSON(KEYS.note, { text: '' }).text
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `stardew_wiki_progress_backup_${backup.date.slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  app.showToast(`${ico('download')} Đã tải xuống file sao lưu tiến độ!`);
}

// Accepts this version and older exports (v1 had no gatheredMaterials, v2 no
// bundles/museum); missing sections are restored as empty.
// Unknown ids are dropped so a stale backup can't inflate the counts.
async function importProgress(app, file) {
  let data;
  try {
    data = JSON.parse(await file.text());
  } catch (e) {
    app.showToast(`${ico('warn')} File không phải JSON hợp lệ`);
    return;
  }
  if (!data || !Array.isArray(data.completedRecipes) || !Array.isArray(data.completedQuests)) {
    app.showToast(`${ico('warn')} File không đúng định dạng sao lưu của Cẩm Nang`);
    return;
  }

  const recipeIds = new Set(RECIPES_DATA.map(r => r.id));
  const questIds = new Set(QUESTS_DATA.map(q => q.id));
  const recipes = data.completedRecipes.filter(id => recipeIds.has(id));
  const quests = data.completedQuests.filter(id => questIds.has(id));
  const when = data.date ? new Date(data.date).toLocaleString('vi-VN') : 'không rõ ngày';

  if (!confirm(t(`Khôi phục bản sao lưu (${when})?\n• ${recipes.length} công thức • ${quests.length} nhiệm vụ\nTiến độ hiện tại sẽ bị thay thế.`))) return;

  progress.replace('recipes', recipes);
  progress.replace('quests', quests);
  progress.replace('planner', planner.validItems(data.plannedItems));
  progress.replace('gathered', planner.validGathered(data.gatheredMaterials));
  progress.replace('bundles', bundleProgress.validKeys(Array.isArray(data.bundleSlots) ? data.bundleSlots : []));
  restoreNote(data.note);
  progress.replace('museum', museumProgress.validKeys(Array.isArray(data.museumDonated) ? data.museumDonated : []));
  app.sfx.play('complete');
  app.showToast(`${ico('upload')} Đã khôi phục tiến độ từ file sao lưu!`);
}

// ==========================================
// PLAYER PROFILE (from the last save read): skills, professions, mastery
// ==========================================
let profileIndex = 0;
const fmt = n => Number(n || 0).toLocaleString('vi-VN');

function skillCard(sk, p) {
  const { level, xp } = p.skills[sk.xp] || { level: 0, xp: 0 };
  const prev = level ? LEVEL_XP[level - 1] : 0;
  const next = LEVEL_XP[level];
  const pct = level >= 10 ? 100 : Math.max(0, Math.min(100, ((xp - prev) / (next - prev)) * 100));
  const profs = p.professions.map(id => PROFESSIONS[id]).filter(pr => pr?.skill === sk.id).sort((a, b) => a.level - b.level);
  const missing = [5, 10].filter(lv => level >= lv && !profs.some(pr => pr.level === lv));
  return `
    <article class="skill-card ${level >= 10 ? 'is-max' : ''}">
      <header class="skill-card__head">
        <img src="${sk.icon}" alt="" class="pixel-img skill-card__icon">
        <div>
          <h3 class="skill-card__name">${nm(sk)}</h3>
          <div class="skill-pips" aria-label="${t('Cấp')} ${level}/10">${Array.from({ length: 10 }, (_, i) => `<span class="${i < level ? 'is-on' : ''} ${i === 4 || i === 9 ? 'is-big' : ''}"></span>`).join('')}</div>
        </div>
        <strong class="skill-card__level">${level}</strong>
      </header>
      <div class="skill-bar" title="${fmt(xp)} XP"><span style="width:${pct}%"></span></div>
      <p class="skill-card__xp muted">${level >= 10 ? `${t('Cấp tối đa')} · ${fmt(xp)} XP` : `${fmt(xp)} / ${fmt(next)} XP · ${t('còn')} ${fmt(next - xp)} XP ${t('tới cấp')} ${level + 1}`}</p>
      ${profs.map(pr => `
        <div class="skill-prof"><span class="tag tag--gold">${t('Cấp')} ${pr.level}</span> <strong>${nm(pr)}</strong>
          <p class="muted">${pr.desc}</p></div>`).join('')}
      ${missing.map(lv => `<p class="muted">${ico('warn')} ${t('Chưa chọn nghề cấp')} ${lv} (${t('chọn khi đi ngủ')})</p>`).join('')}
      ${level < 5 ? `<p class="muted">${t('Chọn nghề ở cấp 5 và cấp 10.')}</p>` : ''}
      ${p.masteryClaimed.includes(sk.mastery) ? `<p class="skill-card__mastery">${ico('sparkle')} ${t(sk.masteryName)}</p>` : ''}
    </article>`;
}

function masteryCard(p) {
  const allMax = p.skills.every(s => s.level >= 10);
  const lv = MASTERY_XP.filter(x => p.masteryXp >= x).length;
  const prev = lv ? MASTERY_XP[lv - 1] : 0;
  const next = MASTERY_XP[lv];
  const pct = lv >= 5 ? 100 : ((p.masteryXp - prev) / (next - prev)) * 100;
  return `
    <article class="skill-card skill-card--mastery">
      <header class="skill-card__head">
        <img src="assets/icons/skill_mastery.png" alt="" class="pixel-img skill-card__icon">
        <div><h3 class="skill-card__name">${t('Thành thạo (Mastery)')}</h3>
          <p class="muted">${p.masteryClaimed.length}/5 ${t('kỹ năng đã nhận thưởng')}</p></div>
        <strong class="skill-card__level">${lv}</strong>
      </header>
      ${allMax || p.masteryXp ? `
        <div class="skill-bar skill-bar--mastery"><span style="width:${Math.max(0, Math.min(100, pct))}%"></span></div>
        <p class="skill-card__xp muted">${lv >= 5 ? `${t('Đã đạt tối đa')} · ${fmt(p.masteryXp)} XP` : `${fmt(p.masteryXp)} / ${fmt(next)} XP ${t('tới bậc')} ${lv + 1}`}</p>`
      : `<p class="muted">${t('Mở khi cả 5 kỹ năng đạt cấp 10: kinh nghiệm kiếm thêm sau đó tính vào Thành thạo, dùng để nhận thưởng ở Hang Thành Thạo.')}</p>`}
    </article>`;
}

function profileHtml() {
  const data = loadJSON(KEYS.profiles, null);
  if (!data?.players?.length) {
    return `
      <section class="panel profile profile--empty">
        <h2 class="panel__title">${ico('save')} ${t('Hồ sơ nhân vật')}</h2>
        <p class="muted">${t('Nạp file save để xem cấp độ Trồng trọt, Câu cá, Hái lượm, Khai khoáng, Chiến đấu, nghề đã chọn và độ Thành thạo của nhân vật.')}</p>
        <button class="btn btn--green" type="button" data-action="import-save-progress">${ico('upload')} ${t('Nạp file save')}</button>
      </section>`;
  }
  const players = data.players;
  const p = players[Math.min(profileIndex, players.length - 1)];
  const mine = p.deepestMine > 120 ? `${t('Hang Đầu Lâu tầng')} ${p.deepestMine - 120}` : `${t('Hầm Mỏ tầng')} ${p.deepestMine}`;
  const stat = (icon, label, value) => `<span class="tag">${ico(icon)} ${t(label)}: <strong>${value}</strong></span>`;
  return `
    <section class="panel profile">
      <div class="profile__head">
        <h2 class="panel__title">${ico('save')} ${t('Hồ sơ nhân vật')}</h2>
        ${players.length > 1 ? `<div class="seg">${players.map((pl, i) => `<button class="seg-btn ${pl === p ? 'is-active' : ''}" type="button" data-action="profile-player" data-i="${i}" data-no-i18n>${ico(i ? 'guest' : 'crown')} ${pl.name}</button>`).join('')}</div>` : ''}
        <span class="muted">${t('Nông trại')} <strong data-no-i18n>${data.farmName || '?'}</strong> · ${t('cập nhật')} ${new Date(data.at).toLocaleString('vi-VN')}</span>
      </div>
      <div class="profile__stats">
        ${stat('money', 'Tiền', `${fmt(p.money)}g`)}
        ${stat('medal', 'Tổng thu nhập', `${fmt(p.earned)}g`)}
        ${stat('calendar', 'Ngày đã chơi', fmt(p.daysPlayed))}
        ${stat('clock', 'Giờ chơi', fmt(p.hoursPlayed))}
        ${stat('mines', 'Sâu nhất', mine)}
        ${stat('health', 'Máu', p.maxHealth)}
        ${stat('energy', 'Năng lượng', p.maxStamina)}
        ${stat('fish', 'Cá đã câu', fmt(p.fishCaught))}
        ${stat('skull', 'Quái đã hạ', fmt(p.monstersKilled))}
        ${p.walnuts ? stat('golden_walnut', 'Óc Chó Vàng', `${p.walnuts}/130`) : ''}
        ${p.qiGems ? stat('sparkle', 'Đá Qi', fmt(p.qiGems)) : ''}
      </div>
      <div class="skill-grid">
        ${SKILLS.map(sk => skillCard(sk, p)).join('')}
        ${masteryCard(p)}
      </div>
    </section>`;
}

// ==========================================
// ONE SAVE FILE FOR EVERY TAB
// The save is read once, in the browser, then a summary lets the player pick
// what to update: progress ticks (added on top, nothing unticked) and caught
// fish, the day in the Today tab (shared with the co-op room), and the farm
// layout in the Farm tab. Today's and the Farm tab's save buttons come here.
// ==========================================
let pendingSave = null;

function newKeys(domain, keys) { return keys.filter(k => !progress.has(domain, k)); }

const SEASON_VI = { spring: 'Mùa Xuân', summer: 'Mùa Hạ', fall: 'Mùa Thu', winter: 'Mùa Đông' };
const DOW_VI = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'];

async function readSaveFile(app, file, preread = null) {
  try {
    const [{ parseSave, readFarmSave, readSaveDay }, { readSaveProgress }, text] = await Promise.all([
      import('../lib/farm-save.js'), import('../lib/save-progress.js'), preread ?? file.text()]);
    const root = parseSave(text);   // parsed once, read three ways
    const res = readSaveProgress(root);
    const day = readSaveDay(root);
    let farm = null;
    try { farm = readFarmSave(root); } catch { /* a save without a farm: skip that part */ }
    let journal = null;
    try { journal = (await import('../lib/save-journal.js')).readJournal(root); } catch (e) { console.warn('[journal]', e); }
    pendingSave = { res, day, farm, journal };

    const add = { recipes: newKeys('recipes', res.recipes), quests: newKeys('quests', res.quests), bundles: newKeys('bundles', res.bundles), museum: newKeys('museum', res.museum) };
    const row = (icon, label, found, fresh) => `
      <li><span>${ico(icon)} ${t(label)}</span><strong>${found}</strong><span class="muted">${fresh === null ? '' : fresh ? `+${fresh} ${t('mới')}` : t('đã có đủ')}</span></li>`;
    const replaceable = farmPlanIsReplaceable();
    const farmCount = farm ? farm.objects.length + Object.keys(farm.ground).length : 0;
    document.getElementById('saveSyncBody').innerHTML = `
      <p>${t('Nông trại')} <strong data-no-i18n>${res.farmName || '?'}</strong> · ${t('người chơi')} <strong data-no-i18n>${res.playerName || '?'}</strong></p>

      <label class="save-sync__part"><input type="checkbox" class="px-check" id="syncProgress" checked>
        <span><strong>${ico('tracker')} ${t('Tiến Độ & Hoàn Thành')}</strong></span></label>
      <ul class="save-sync__list">
        ${row('cooking', 'Công thức, công trình & nâng cấp', res.recipes.length, add.recipes.length)}
        ${row('quests', 'Nhiệm vụ đã hoàn thành', res.quests.length, add.quests.length)}
        ${row('bundles', 'Ô gói Nhà Cộng Đồng đã nộp', res.bundles.length, add.bundles.length)}
        ${row('museum', 'Món đã quyên góp Bảo Tàng', res.museum.length, add.museum.length)}
        ${row('fish', 'Loài cá đã câu được', `${res.fish.caught} / ${res.fish.total}`, null)}
        ${row('save', 'Hồ sơ nhân vật (cấp kỹ năng, nghề)', res.players.map(pl => `${pl.name}: ${pl.skills.map(x => x.level).join('/')}`).join(' · '), null)}
      </ul>
      ${res.unmatchedBundles.length ? `<p class="muted">${ico('warn')} ${t('Một số gói (bản Remix) không có trong dữ liệu của trang nên được bỏ qua')}: ${res.unmatchedBundles.join(', ')}</p>` : ''}
      <p class="muted">${t('Chỉ thêm dấu tick mới, không bỏ tick nào bạn đã đánh dấu. Nhiệm vụ được suy ra từ cờ và sự kiện trong file save; Tượng Lewis Vàng và các bức tượng bí ẩn không để lại dấu vết nên vẫn cần tự đánh dấu.')}</p>

      <label class="save-sync__part"><input type="checkbox" class="px-check" id="syncToday" checked>
        <span><strong>${ico('calendar')} ${t('Hôm Nay')}:</strong> ${DOW_VI[(day.day - 1) % 7]}, ${t('ngày')} ${day.day} ${SEASON_VI[day.season]}, ${t('năm')} ${day.year}
        ${coop.code ? `<span class="muted">(${t('chia sẻ với phòng Co-op')})</span>` : ''}</span></label>

      ${journal ? `
      <label class="save-sync__part"><input type="checkbox" class="px-check" id="syncJournal" checked>
        <span><strong>${ico('story')} ${t('Sổ Tay Nông Trại')}:</strong> ${t('tình bạn, túi & rương, máy móc, mùa vụ, vật nuôi, diệt quái, Hoàn Hảo')}</span></label>` : ''}

      ${farm ? `
      <label class="save-sync__part"><input type="checkbox" class="px-check" id="syncFarm" ${replaceable ? 'checked' : ''}>
        <span><strong>${ico('farm')} ${t('Nông Trại')}:</strong> ${farmCount} ${t('công trình, đồ vật và ô đất')}
        ${replaceable ? '' : `<span class="muted">· ${t('sẽ thay thiết kế bạn đang vẽ (có thể Hoàn tác ở tab Nông Trại)')}</span>`}
        ${farm.warning ? `<span class="muted">· ${farm.warning}</span>` : ''}</span></label>` : ''}

      <div class="btn-row">
        <button class="btn btn--green" type="button" data-action="save-progress-apply">${ico('check')} ${t('Đồng bộ')}</button>
      </div>
      ${res.fish.missing.length ? `
        <h3 class="save-sync__sub">${ico('fish')} ${t('Cá chưa câu được')} (${res.fish.missing.length})</h3>
        <div class="save-sync__fish">
          ${res.fish.missing.map(f => `<span class="tag" title="${f.location || ''}"><img src="${f.imageUrl}" alt="" class="pixel-img"> ${nm(f)}</span>`).join('')}
        </div>` : ''}`;
    openModal('saveSyncModal');
  } catch (e) {
    console.error('[save]', e);
    app.showToast(`${ico('warn')} ${e.userMessage || t('Không đọc được file save này')}`);
  }
}

function applySave(app) {
  if (!pendingSave) return;
  const { res, day, farm, journal } = pendingSave;
  const checked = id => document.getElementById(id)?.checked;
  const done = [];
  if (checked('syncProgress')) {
    let n = 0;
    for (const [domain, keys] of [['recipes', res.recipes], ['quests', res.quests], ['bundles', res.bundles], ['museum', res.museum]]) {
      for (const k of newKeys(domain, keys)) { progress.setFlag(domain, k, true, 'bulk'); n++; }
    }
    setCaughtFish(res.fish.caughtEn);
    saveJSON(KEYS.profiles, { farmName: res.farmName, at: Date.now(), players: res.players });
    profileIndex = 0;
    done.push(`${n} ${t('mục tiến độ')}`);
  }
  if (checked('syncToday')) {
    const shared = applySaveDay(day);
    done.push(`${t('ngày')} ${day.day} ${SEASON_VI[day.season]}${shared ? ` (${t('đã chia sẻ')})` : ''}`);
  }
  if (journal && checked('syncJournal')) {
    saveJSON(KEYS.journal, { ...journal, day, farmName: res.farmName, at: Date.now() });
    done.push(t('sổ tay'));
  }
  if (farm && checked('syncFarm')) {
    applySaveFarm(farm);
    done.push(t('nông trại'));
  }
  pendingSave = null;
  closeModal(document.getElementById('saveSyncModal'));
  app.sfx.play('complete');
  app.render();
  app.showToast(`${ico('check')} ${t('Đã đồng bộ từ file save')}: ${done.join(' · ') || t('không có gì')}`);
}

// The Farm tab hands over save files it was given
document.addEventListener('save-file', e => window.app && readSaveFile(window.app, e.detail.file, e.detail.text));

export default {
  id: 'tracker',
  toggles: [],

  render(app) {
    document.getElementById('profileBoard').innerHTML = profileHtml();
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
    'import-save-progress': () => document.getElementById('saveProgressInput').click(),
    'save-progress-file': (app, el) => {
      const file = el.files?.[0];
      el.value = '';
      if (file) readSaveFile(app, file);
    },
    'save-progress-apply': (app) => applySave(app),
    'profile-player': (app, el) => { profileIndex = Number(el.dataset.i); app.render(); },
    'reset-progress': (app) => {
      if (!confirm(t('CẢNH BÁO: Thao tác này sẽ đặt lại toàn bộ tiến độ đã hoàn thành về 0. Bạn có chắc không?'))) return;
      for (const domain of ['recipes', 'quests', 'bundles', 'museum']) progress.replace(domain, []);
      app.showToast('Đã xóa dữ liệu tiến độ');
    }
  }
};
