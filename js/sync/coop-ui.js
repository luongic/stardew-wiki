// ==========================================================================
// CO-OP ROOM PANEL
// Hero button + popup to create/join/leave a room, see who is in it, the
// sync status and the latest changes. The popup shell is rebuilt only when
// switching between "not in a room" and "in a room", so typing in its inputs
// is never interrupted by a sync update; live parts update in place.
// ==========================================================================

import { coop, coopAvailable } from './coop.js';
import { openModal } from '../lib/ui.js';
import { RECIPES_DATA } from '../../data/recipes-data.js';
import { QUESTS_DATA } from '../../data/quests-data.js';
import { CC_ROOMS } from '../../data/bundles-data.js';
import { MUSEUM_ITEMS } from '../../data/museum-data.js';

const recipeName = new Map(RECIPES_DATA.map(r => [r.id, r.name]));
const questName = new Map(QUESTS_DATA.map(q => [q.id, q.name]));
const museumName = new Map(MUSEUM_ITEMS.map(m => [m.id, m.name]));
const bundleById = new Map(CC_ROOMS.flatMap(r => r.bundles).map(b => [b.id, b]));

const STATUS = {
  idle: { label: 'Chưa vào phòng', cls: 'idle' },
  connecting: { label: 'Đang kết nối…', cls: 'pending' },
  synced: { label: 'Đã đồng bộ', cls: 'ok' },
  pending: { label: 'Đang gửi thay đổi…', cls: 'pending' },
  offline: { label: 'Mất mạng: thay đổi sẽ tự gửi khi có mạng lại', cls: 'offline' },
  error: { label: 'Lỗi', cls: 'error' }
};

function timeAgo(ms) {
  if (!ms) return '';
  const s = Math.max(0, Math.round((Date.now() - ms) / 1000));
  if (s < 60) return 'vừa xong';
  if (s < 3600) return `${Math.floor(s / 60)} phút trước`;
  if (s < 86400) return `${Math.floor(s / 3600)} giờ trước`;
  return `${Math.floor(s / 86400)} ngày trước`;
}

function describe(a) {
  switch (a.domain) {
    case 'recipes': return `${a.v ? 'hoàn thành' : 'bỏ đánh dấu'} công thức ${recipeName.get(a.key) || a.key}`;
    case 'quests': return `${a.v ? 'hoàn thành' : 'bỏ đánh dấu'} nhiệm vụ ${questName.get(a.key) || a.key}`;
    case 'museum': return `${a.v ? 'quyên góp' : 'bỏ quyên góp'} ${museumName.get(a.key) || a.key}`;
    case 'gathered': return `${a.v ? 'đã gom' : 'bỏ gom'} ${a.key}`;
    case 'planner': return `đặt kế hoạch ${recipeName.get(a.key) || a.key}: ${typeof a.n === 'number' ? Math.max(0, a.n) : '?'} món`;
    case 'bundles': {
      const [bundleId, idx] = a.key.split(':');
      const b = bundleById.get(bundleId);
      const item = b?.items[Number(idx)];
      return `${a.v ? 'nộp' : 'bỏ nộp'} ${item?.name || a.key} vào ${b?.name || 'gói'}`;
    }
    default: return a.key;
  }
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// ---------- shells ----------
function outsideShell() {
  return `
    <p class="coop-intro">Chơi co-op? Tạo một phòng rồi gửi mã cho bạn bè. Mọi dấu tick, ô gói, bảo tàng và kế hoạch sẽ đồng bộ giữa mọi người, kể cả khi có người đang offline.</p>
    <label class="coop-field">
      <span>Tên của bạn trong phòng</span>
      <input id="coopName" class="coop-input" maxlength="24" placeholder="VD: Nông dân Lương" value="${esc(coop.name)}">
    </label>
    <div class="coop-split">
      <section class="coop-card">
        <h3 class="coop-card__title">✨ Tạo phòng mới</h3>
        <p class="muted">Tiến độ hiện tại trên máy bạn sẽ là điểm bắt đầu của phòng.</p>
        <button class="btn btn--green" type="button" data-action="coop-create">Tạo phòng</button>
      </section>
      <section class="coop-card">
        <h3 class="coop-card__title">🚪 Vào phòng</h3>
        <input id="coopCode" class="coop-input coop-input--code" maxlength="6" placeholder="MÃ PHÒNG" autocomplete="off" spellcheck="false">
        <label class="coop-radio"><input type="radio" name="coopMode" value="merge" checked> Gộp tiến độ của mình vào phòng</label>
        <label class="coop-radio"><input type="radio" name="coopMode" value="room"> Dùng tiến độ của phòng (bỏ tiến độ trên máy này)</label>
        <button class="btn btn--blue" type="button" data-action="coop-join">Vào phòng</button>
      </section>
    </div>
    <div class="coop-status" id="coopStatus"></div>
    <div class="coop-google" id="coopGoogle"></div>`;
}

function insideShell() {
  return `
    <div class="coop-room">
      <div>
        <div class="muted">Mã phòng: gửi cho bạn bè để cùng vào</div>
        <div class="coop-code" id="coopCodeView"></div>
      </div>
      <button class="btn btn--ghost" type="button" data-action="coop-copy">📋 Sao chép mã</button>
    </div>
    <div class="coop-status" id="coopStatus"></div>
    <div class="coop-split">
      <section class="coop-card">
        <h3 class="coop-card__title">👥 Thành viên</h3>
        <ul class="coop-members" id="coopMembers"></ul>
        <label class="coop-field coop-field--inline">
          <span>Tên của bạn</span>
          <input id="coopName" class="coop-input" maxlength="24" value="${esc(coop.name)}" data-action="coop-rename">
        </label>
      </section>
      <section class="coop-card">
        <h3 class="coop-card__title">🕒 Hoạt động gần đây</h3>
        <ul class="coop-activity" id="coopActivity"></ul>
      </section>
    </div>
    <div class="coop-google" id="coopGoogle"></div>
    <div class="modal__foot">
      <button class="btn btn--danger" type="button" data-action="coop-leave">Rời phòng</button>
    </div>`;
}

// ---------- live parts ----------
function renderStatus() {
  const el = document.getElementById('coopStatus');
  if (!el) return;
  const s = STATUS[coop.status] || STATUS.idle;
  if (coop.status === 'idle' && !coop.error) { el.innerHTML = ''; return; }
  el.innerHTML = `<span class="coop-dot coop-dot--${s.cls}"></span> ${s.label}${coop.error ? `: ${esc(coop.error)}` : ''}`;
}

function renderMembers() {
  const el = document.getElementById('coopMembers');
  if (!el || !coop.room) return;
  const members = Object.entries(coop.room.members || {})
    .sort(([, a], [, b]) => (a.joinedAt?.toMillis?.() || 0) - (b.joinedAt?.toMillis?.() || 0));
  el.innerHTML = members.map(([uid, m]) => `
    <li class="coop-member">
      <span>${uid === coop.room.host ? '👑' : '🧑‍🌾'} ${esc(m.name)}${uid === coop.user?.uid ? ' <span class="muted">(bạn)</span>' : ''}</span>
      <span class="muted">${timeAgo(m.lastSeen?.toMillis?.())}</span>
    </li>`).join('');
}

function renderActivity() {
  const el = document.getElementById('coopActivity');
  if (!el) return;
  const names = coop.room?.members || {};
  const items = coop.recentActivity();
  el.innerHTML = items.length
    ? items.map(a => `
        <li class="coop-act">
          <span><strong>${esc(names[a.by]?.name || 'Ai đó')}</strong> ${esc(describe(a))}</span>
          <span class="muted">${timeAgo(a.at)}</span>
        </li>`).join('')
    : '<li class="muted">Chưa có thay đổi nào.</li>';
}

function renderGoogle() {
  const el = document.getElementById('coopGoogle');
  if (!el) return;
  el.innerHTML = coop.isGoogle
    ? `✅ Đã liên kết Google${coop.user?.email ? ` (${esc(coop.user.email)})` : ''}: dùng cùng phòng trên nhiều thiết bị.`
    : `<button class="btn btn--ghost btn--sm" type="button" data-action="coop-google">🔗 Liên kết Google</button>
       <span class="muted">Tuỳ chọn: để dùng cùng phòng trên điện thoại và máy tính.</span>`;
}

function renderHeroButton() {
  const btn = document.getElementById('coopBtn');
  if (!btn) return;
  btn.hidden = !coopAvailable;
  const s = STATUS[coop.status] || STATUS.idle;
  btn.querySelector('.coop-btn__label').textContent = coop.code ? `Phòng ${coop.code}` : 'Co-op';
  btn.querySelector('.coop-dot').className = `coop-dot coop-dot--${coop.code ? s.cls : 'idle'}`;
}

let shellMode = null;

function render() {
  renderHeroButton();
  const body = document.getElementById('coopBody');
  if (!body) return;
  const mode = coop.code ? 'inside' : 'outside';
  if (mode !== shellMode) {
    body.innerHTML = mode === 'inside' ? insideShell() : outsideShell();
    shellMode = mode;
  }
  const codeView = document.getElementById('coopCodeView');
  if (codeView) codeView.textContent = coop.code;
  renderStatus();
  renderMembers();
  renderActivity();
  renderGoogle();
}

function readName() {
  const v = document.getElementById('coopName')?.value.trim();
  if (v) coop.name = v;
  return coop.name;
}

export const coopUi = {
  init() {
    coop.onChange(render);
    render();
    // Relative times ("3 phút trước") stay fresh while the popup is open
    setInterval(() => { renderMembers(); renderActivity(); }, 30000);
    coop.resume();
  },

  actions: {
    'coop-open': () => {
      render();
      openModal('coopModal');
    },
    'coop-create': async (app) => {
      if (!readName()) return app.showToast('Hãy nhập tên của bạn trước');
      await coop.create();
      if (coop.code) app.showToast(`✨ Đã tạo phòng ${coop.code}`);
    },
    'coop-join': async (app) => {
      if (!readName()) return app.showToast('Hãy nhập tên của bạn trước');
      const code = document.getElementById('coopCode')?.value;
      const mode = document.querySelector('input[name="coopMode"]:checked')?.value || 'merge';
      if (!code || code.trim().length !== 6) return app.showToast('Mã phòng gồm 6 ký tự');
      if (mode === 'room' && !confirm('Tiến độ trên máy này sẽ được thay bằng tiến độ của phòng. Tiếp tục?')) return;
      await coop.join(code, mode);
      if (coop.code) app.showToast(`🚪 Đã vào phòng ${coop.code}`);
    },
    'coop-leave': async (app) => {
      if (!confirm('Rời phòng? Tiến độ đã đồng bộ vẫn được giữ trên máy này.')) return;
      await coop.leave();
      app.showToast('Đã rời phòng');
    },
    'coop-copy': async (app) => {
      try {
        await navigator.clipboard.writeText(coop.code);
        app.showToast('📋 Đã sao chép mã phòng');
      } catch {
        app.showToast(`Mã phòng: ${coop.code}`);
      }
    },
    'coop-rename': (app, el) => {
      if (el.value.trim()) coop.rename(el.value);
    },
    'coop-google': async (app) => {
      try {
        await coop.linkGoogle();
        app.showToast('✅ Đã liên kết Google');
      } catch (e) {
        coop.fail(e);
      }
    }
  }
};
