// ==========================================================================
// TAB: FILE SAVE
// The one place to load the game's save file. The save is read once, in the
// browser, then a summary lets the player pick what to update: progress ticks
// (added on top, nothing unticked) and caught fish, the day in the Today tab
// (shared with the co-op room), the Journal snapshot (also read by Secret
// Notes and Today), and the farm layout in the Farm tab. Predictions always
// follow the last save. Other tabs only link here; the Farm tab hands over
// save files it was given.
// ==========================================================================

import { t, nm, isEn } from '../lib/i18n.js';
import { ico } from '../lib/icons.js';
import { progress } from '../lib/progress.js';
import { KEYS, loadJSON, saveJSON } from '../lib/storage.js';
import { setCaughtFish, setFishingSeason } from './fishing.js';
import { applySaveDay } from './today.js';
import { applySaveFarm, farmPlanIsReplaceable } from './farm.js';
import { applySavePredict } from './predictor.js';
import { JOURNAL_SCHEMA, isStale } from '../lib/journal-schema.js';
import { coop } from '../sync/coop.js';

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// pendingSave: the save read but not applied yet; summary: its HTML;
// lastDone / lastError: the outcome of the last read or sync, shown on top
let pendingSave = null, summary = '', lastDone = '', lastError = '';

// The button other tabs show instead of their own file picker
export const saveTabLink = (label = 'Nạp file save', cls = 'btn btn--green') =>
  `<button class="${cls}" type="button" data-action="goto-save">${cls.startsWith('link') ? '' : ico('save')} ${t(label)}</button>`;

function newKeys(domain, keys) { return keys.filter(k => !progress.has(domain, k)); }

const SEASON_VI = { spring: 'Mùa Xuân', summer: 'Mùa Hạ', fall: 'Mùa Thu', winter: 'Mùa Đông' };
const DOW_VI = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'];
const dayText = d => isEn
  ? `${t(DOW_VI[(d.day - 1) % 7])}, ${t(SEASON_VI[d.season])} ${d.day}, Year ${d.year}`
  : `${DOW_VI[(d.day - 1) % 7]}, ngày ${d.day} ${SEASON_VI[d.season]}, năm ${d.year}`;
const when = at => new Date(at).toLocaleString(isEn ? 'en-US' : 'vi-VN');

async function readSaveFile(app, file, preread = null) {
  lastDone = ''; lastError = '';
  try {
    const [{ parseSave, readFarmSave, readSaveDay }, { readSaveProgress }, text] = await Promise.all([
      import('../lib/farm-save.js'), import('../lib/save-progress.js'), preread ?? file.text()]);
    const root = parseSave(text);   // parsed once, read several ways
    const res = readSaveProgress(root);
    const day = readSaveDay(root);
    let farm = null;
    try { farm = readFarmSave(root); } catch { /* a save without a farm: skip that part */ }
    let journal = null;
    try { journal = (await import('../lib/save-journal.js')).readJournal(root); } catch (e) { console.warn('[journal]', e); }
    let predict = null;
    try { predict = (await import('../predict/context.js')).readPredictContext(root); } catch (e) { console.warn('[predict]', e); }
    pendingSave = { res, day, farm, journal, predict };

    const add = { recipes: newKeys('recipes', res.recipes), quests: newKeys('quests', res.quests), bundles: newKeys('bundles', res.bundles), museum: newKeys('museum', res.museum) };
    const row = (icon, label, found, fresh) => `
      <li><span>${ico(icon)} ${t(label)}</span><strong>${found}</strong><span class="muted">${fresh === null ? '' : fresh ? `+${fresh} ${t('mới')}` : t('đã có đủ')}</span></li>`;
    const replaceable = farmPlanIsReplaceable();
    const farmCount = farm ? farm.objects.length + Object.keys(farm.ground).length : 0;
    summary = `
      <p>${ico('save')} <strong data-no-i18n>${esc(file?.name || '')}</strong> · ${t('Nông trại')} <strong data-no-i18n>${esc(res.farmName || '?')}</strong> · ${t('người chơi')} <strong data-no-i18n>${esc(res.playerName || '?')}</strong></p>
      <p class="muted">${t('Chọn phần muốn cập nhật rồi bấm Đồng bộ.')}</p>

      <label class="save-sync__part"><input type="checkbox" class="px-check" id="syncProgress" checked>
        <span><strong>${ico('tracker')} ${t('Tiến Độ & Hoàn Thành')}</strong></span></label>
      <ul class="save-sync__list">
        ${row('cooking', 'Công thức, công trình & nâng cấp', res.recipes.length, add.recipes.length)}
        ${row('quests', 'Nhiệm vụ đã hoàn thành', res.quests.length, add.quests.length)}
        ${row('bundles', 'Ô gói Nhà Cộng Đồng đã nộp', res.bundles.length, add.bundles.length)}
        ${row('museum', 'Món đã quyên góp Bảo Tàng', res.museum.length, add.museum.length)}
        ${row('fish', 'Loài cá đã câu được', `${res.fish.caught} / ${res.fish.total}`, null)}
        ${row('save', 'Hồ sơ nhân vật (cấp kỹ năng, nghề)', res.players.map(pl => `${esc(pl.name)}: ${pl.skills.map(x => x.level).join('/')}`).join(' · '), null)}
      </ul>
      ${res.unmatchedBundles.length ? `<p class="muted">${ico('warn')} ${t('Một số gói (bản Remix) không có trong dữ liệu của trang nên được bỏ qua')}: ${res.unmatchedBundles.join(', ')}</p>` : ''}
      <p class="muted">${t('Chỉ thêm dấu tick mới, không bỏ tick nào bạn đã đánh dấu. Nhiệm vụ được suy ra từ cờ và sự kiện trong file save; Tượng Lewis Vàng và các bức tượng bí ẩn không để lại dấu vết nên vẫn cần tự đánh dấu.')}</p>

      <label class="save-sync__part"><input type="checkbox" class="px-check" id="syncToday" checked>
        <span><strong>${ico('calendar')} ${t('Hôm Nay')}:</strong> ${dayText(day)}
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
        <button class="btn btn--ghost" type="button" data-action="save-cancel">${t('Hủy')}</button>
      </div>
      ${res.fish.missing.length ? `
        <h3 class="save-sync__sub">${ico('fish')} ${t('Cá chưa câu được')} (${res.fish.missing.length})</h3>
        <div class="save-sync__fish">
          ${res.fish.missing.map(f => `<span class="tag" title="${f.location || ''}"><img src="${f.imageUrl}" alt="" class="pixel-img"> ${nm(f)}</span>`).join('')}
        </div>` : ''}`;
  } catch (e) {
    console.error('[save]', e);
    pendingSave = null;
    lastError = e.userMessage || t('Không đọc được file save này');
    app.showToast(`${ico('warn')} ${lastError}`);
  }
  if (app.currentTab === 'save') app.render(); else app.switchTab('save');
  window.scrollTo({ top: document.getElementById('tab-save')?.offsetTop - 80 || 0, behavior: 'smooth' });
}

function applySave(app) {
  if (!pendingSave) return;
  const { res, day, farm, journal, predict } = pendingSave;
  const checked = id => document.getElementById(id)?.checked;
  const done = [];
  if (checked('syncProgress')) {
    let n = 0;
    for (const [domain, keys] of [['recipes', res.recipes], ['quests', res.quests], ['bundles', res.bundles], ['museum', res.museum]]) {
      for (const k of newKeys(domain, keys)) { progress.setFlag(domain, k, true, 'bulk'); n++; }
    }
    setCaughtFish(res.fish.caughtEn);
    saveJSON(KEYS.profiles, { farmName: res.farmName, at: Date.now(), players: res.players });
    done.push(`${n} ${t('mục tiến độ')}`);
  }
  if (checked('syncToday')) {
    const shared = applySaveDay(day);
    setFishingSeason(day.season);
    done.push(`${t('ngày')} ${day.day} ${SEASON_VI[day.season]}${shared ? ` (${t('đã chia sẻ')})` : ''}`);
  }
  if (journal && checked('syncJournal')) {
    saveJSON(KEYS.journal, { ...journal, day, farmName: res.farmName, at: Date.now(), schema: JOURNAL_SCHEMA });
    done.push(t('sổ tay'));
  }
  // Predictions only read the save (Game ID, counters): always kept up to date
  if (predict) applySavePredict(predict);
  if (farm && checked('syncFarm')) {
    applySaveFarm(farm);
    done.push(t('nông trại'));
  }
  pendingSave = null; summary = '';
  lastDone = done.join(' · ') || t('không có gì');
  app.sfx.play('complete');
  app.render();
  app.showToast(`${ico('check')} ${t('Đã đồng bộ từ file save')}: ${lastDone}`);
}

// What each tab takes from the save, and whether it has it yet
function usesHtml() {
  const profiles = loadJSON(KEYS.profiles, null);
  const journal = loadJSON(KEYS.journal, null);
  const predict = loadJSON(KEYS.predict, null);
  const synced = !!profiles?.players?.length;
  const uses = [
    { tab: 'tracker', icon: 'tracker', name: 'Tiến Độ & Hoàn Thành', what: 'Hồ sơ nhân vật: kỹ năng, nghề, Thành thạo, trang bị', ok: synced },
    { tab: 'recipes', icon: 'recipes', name: 'Công Thức Chế Biến', what: 'Đánh dấu món đã nấu, đồ đã chế tạo, công trình đã xây', ok: synced },
    { tab: 'quests', icon: 'quests', name: 'Hướng Dẫn Nhiệm Vụ', what: 'Đánh dấu nhiệm vụ đã xong', ok: synced },
    { tab: 'bundles', icon: 'bundles', name: 'Nhà Cộng Đồng', what: 'Đánh dấu ô gói đã nộp', ok: synced },
    { tab: 'museum', icon: 'museum', name: 'Bảo Tàng', what: 'Đánh dấu món đã quyên góp', ok: synced },
    { tab: 'fishing', icon: 'fishing', name: 'Câu Cá', what: 'Cá đã câu được, mùa hiện tại', ok: synced },
    { tab: 'today', icon: 'calendar', name: 'Hôm Nay', what: 'Ngày trong game, quà tuần này', ok: !!journal?.day },
    { tab: 'journal', icon: 'story', name: 'Sổ Tay Nông Trại', what: 'Tình bạn, rương, máy móc, sự kiện tim, Óc Chó Vàng, Ông Nội...', ok: !!journal },
    { tab: 'secretnotes', icon: 'secret_note', name: 'Mật Thư', what: 'Mật thư đã đọc và đã thực hiện', ok: !!journal?.players?.some(p => p.notesSeen) },
    { tab: 'predictor', icon: 'oracle', name: 'Dự Đoán', what: 'Game ID và các bộ đếm của save', ok: predict?.source === 'save' },
    { tab: 'farm', icon: 'farm', name: 'Nông Trại', what: 'Sơ đồ nông trại (khi chọn khi đồng bộ)', ok: null }
  ];
  return `
    <h3 class="journal-sub">${ico('members')} ${t('Các tab dùng file save')}</h3>
    <div class="save-uses">
      ${uses.map(u => `
        <button class="save-use ${u.ok ? 'is-done' : ''}" type="button" data-action="switch-tab" data-tab="${u.tab}">
          <span class="save-use__icon">${ico(u.icon)}</span>
          <span class="save-use__text"><strong>${t(u.name)}</strong><span class="muted">${t(u.what)}</span></span>
          ${u.ok === null ? '' : u.ok ? `<span class="tag tag--green">${ico('check')} ${t('Đã có')}</span>` : `<span class="tag">${t('Chưa có')}</span>`}
        </button>`).join('')}
    </div>`;
}

function statusHtml() {
  const profiles = loadJSON(KEYS.profiles, null);
  const journal = loadJSON(KEYS.journal, null);
  const predict = loadJSON(KEYS.predict, null);
  if (!profiles && !journal && predict?.source !== 'save') {
    return `<p class="muted">${ico('upload')} ${t('Chưa nạp file save nào trên trình duyệt này.')}</p>`;
  }
  const farmName = journal?.farmName || profiles?.farmName;
  const names = (journal?.players || profiles?.players || []).map(p => p.name).filter(Boolean);
  const at = Math.max(journal?.at || 0, profiles?.at || 0);
  return `
    ${isStale(journal) ? `<p class="callout callout--tip">${ico('warn')} ${t('Trang vừa được cập nhật và đọc được thêm thông tin từ file save. Hãy nạp lại file save một lần để xem đầy đủ.')}</p>` : ''}
    <div class="save-current">
      <p>${ico('farm')} ${t('Nông trại')} <strong data-no-i18n>${esc(farmName || '?')}</strong>
        ${names.length ? ` · ${ico('members')} <span data-no-i18n>${names.map(esc).join(', ')}</span>` : ''}</p>
      ${journal?.day ? `<p>${ico('calendar')} ${dayText(journal.day)}</p>` : ''}
      ${predict?.source === 'save' ? `<p>${ico('oracle')} Game ID <strong data-no-i18n>${esc(predict.gameID)}</strong></p>` : ''}
      ${at ? `<p class="muted">${t('Nạp lúc')} ${when(at)}</p>` : ''}
    </div>
    <button class="link-btn" type="button" data-action="save-forget">${t('Xóa dữ liệu save khỏi trình duyệt')}</button>`;
}

function render() {
  const el = document.getElementById('saveBoard');
  if (!el) return;
  el.innerHTML = `
    ${lastError ? `<p class="callout callout--red">${ico('warn')} ${esc(lastError)}</p>` : ''}
    ${lastDone ? `<p class="callout callout--green">${ico('check')} ${t('Đã đồng bộ từ file save')}: ${lastDone}</p>` : ''}
    ${summary ? `<section class="panel save-sync">
      <h2 class="panel__title">${ico('save')} ${t('Tiến độ trong file save')}</h2>
      ${summary}</section>` : ''}
    <section class="panel">
      <h2 class="panel__title">${ico('save')} ${t('File save đang dùng')}</h2>
      ${statusHtml()}
      ${usesHtml()}
    </section>`;
}

function bindDrop(app) {
  const zone = document.getElementById('saveDrop');
  if (!zone) return;
  const on = e => { e.preventDefault(); zone.classList.add('is-over'); };
  const off = () => zone.classList.remove('is-over');
  zone.addEventListener('dragenter', on);
  zone.addEventListener('dragover', on);
  zone.addEventListener('dragleave', off);
  zone.addEventListener('drop', e => {
    e.preventDefault(); off();
    const file = e.dataTransfer?.files?.[0];
    if (file) readSaveFile(app, file);
  });
}

// The Farm tab hands over save files it was given
document.addEventListener('save-file', e => window.app && readSaveFile(window.app, e.detail.file, e.detail.text));

export default {
  id: 'save',
  toggles: [],
  init(app) { bindDrop(app); },
  render,
  actions: {
    'goto-save': (app) => { app.switchTab('save'); app.sfx.play('click'); window.scrollTo({ top: 0, behavior: 'smooth' }); },
    'import-save-progress': (app) => {
      if (app.currentTab !== 'save') app.switchTab('save');
      document.getElementById('saveProgressInput').click();
    },
    'save-progress-file': (app, el) => {
      const file = el.files?.[0];
      el.value = '';   // allow choosing the same file again
      if (file) readSaveFile(app, file);
    },
    'save-progress-apply': (app) => applySave(app),
    'save-cancel': (app) => { pendingSave = null; summary = ''; app.render(); },
    'save-forget': (app) => {
      if (!confirm(t('Xóa thông tin đọc từ file save (hồ sơ, sổ tay, dự đoán) khỏi trình duyệt? Các dấu tick tiến độ vẫn được giữ.'))) return;
      for (const k of [KEYS.profiles, KEYS.journal, KEYS.predict]) { try { localStorage.removeItem(k); } catch { /* storage blocked */ } }
      lastDone = ''; app.render();
      app.showToast(t('Đã xóa dữ liệu save'));
    }
  }
};
