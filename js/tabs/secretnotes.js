// ==========================================================================
// TAB: MẬT THƯ (SECRET NOTES & JOURNAL SCRAPS)
// The 27 Secret Notes and the 11 Journal Scraps of Ginger Island. Notes the
// player has read (from the last save file) are shown in full with their
// solution; the others stay hidden behind "Xem Spoilers", like hidden quests.
// ==========================================================================

import { SECRET_NOTES } from '../../data/secret-notes-data.js';
import { ico } from '../lib/icons.js';
import { t, isEn } from '../lib/i18n.js';
import { loadJSON, KEYS } from '../lib/storage.js';
import { OBJECT_NAMES } from '../../data/item-ids.js';
import { itemTag } from '../lib/item-lookup.js';
import { npcTag } from '../predict/npc.js';

const ui = { filter: 'all', player: 0 };
const revealed = new Set();
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const GROUPS = [
  { id: 'notes', name: 'Mật thư', icon: 'secret_note', test: n => n.id < 1000, label: n => `${t('Mật thư')} #${n.id}` },
  { id: 'scraps', name: 'Mảnh nhật ký Đảo Gừng', icon: 'journal_scrap', test: n => n.id >= 1000, label: n => `${t('Mảnh nhật ký')} #${n.id - 1000}` }
];

// Players and the notes each has read, from the last save (null: no save yet)
function players() {
  const j = loadJSON(KEYS.journal, null);
  return j?.players?.length ? j.players : null;
}

function cardHtml(n, group, seen) {
  const read = seen?.has(n.id);
  const open = read || revealed.has(n.id);
  const text = isEn ? (n.textEn || n.text) : (n.text || n.textEn);
  const solution = isEn ? n.solutionEn : n.solution;
  const hint = isEn ? n.hintEn : n.hint;
  // Gifts the note adds to the gift log, grouped by villager
  const reveals = new Map();
  for (const [who, id] of n.reveals || []) (reveals.get(who) || reveals.set(who, []).get(who)).push(OBJECT_NAMES[id] || id);
  return `
    <article class="card note-card ${read ? 'is-done' : ''}">
      <header class="card__head">
        <div class="card__title-row">
          <div class="icon-box">${ico(group.icon)}</div>
          <div>
            <h3 class="card__title">${group.label(n)}</h3>
            <div class="card__sub">${seen ? (read ? `<span class="tag tag--green">${ico('check')} ${t('Đã đọc')}</span>` : `<span class="tag">${t('Chưa đọc')}</span>`) : ''}</div>
          </div>
        </div>
        ${read ? '' : `<button class="btn btn--purple btn--sm" type="button" data-action="note-spoiler" data-id="${n.id}">${ico('eye')} ${t(open ? 'Ẩn Spoilers' : 'Xem Spoilers')}</button>`}
      </header>
      ${open ? `
      <div class="card__body">
        ${n.image ? `<img src="${n.image}" alt="${esc(group.label(n))}" class="pixel-img note-card__img" loading="lazy">` : ''}
        ${text ? `<p class="note-card__text" data-no-i18n>${esc(text)}</p>` : ''}
        ${solution ? `<div class="callout callout--tip"><strong>${ico('tip')} ${t('Lời giải')}:</strong> <span data-no-i18n>${esc(solution)}</span></div>` : ''}
        ${hint ? `<div class="callout callout--tip"><strong>${ico('tip')} ${t('Gợi ý')}:</strong> <span data-no-i18n>${esc(hint)}</span></div>` : ''}
        ${reveals.size ? `
          <div class="callout callout--green note-card__gifts">
            <strong>${ico('gift')} ${t('Đọc mẩu này sẽ mở khóa trong Sổ quà tặng')}:</strong>
            ${[...reveals].map(([who, items]) => `<div>${npcTag(who)} ${items.map(en => itemTag(en)).join('')}</div>`).join('')}
          </div>` : ''}
      </div>` : `<div class="card__body"><p class="muted">${ico('lock')} ${t('Nội dung đang ẩn để tránh spoil.')}</p></div>`}
    </article>`;
}

function render() {
  const el = document.getElementById('secretNotesBoard');
  if (!el) return;
  const ps = players();
  const p = ps?.[Math.min(ui.player, ps.length - 1)];
  // Older journal snapshots only kept counts: ask for the save again
  const seen = p?.notesSeen ? new Set(p.notesSeen) : null;
  const shown = n => ui.filter === 'all' || !seen || (ui.filter === 'read' ? seen.has(n.id) : !seen.has(n.id));
  const chip = (id, label) => `<button class="chip ${ui.filter === id ? 'is-active' : ''}" type="button" data-action="note-filter" data-filter="${id}">${t(label)}</button>`;
  el.innerHTML = `
    ${seen ? `
      ${ps.length > 1 ? `<div class="journal-players">${ico('members')} ${ps.map((x, i) => `<button class="chip ${x === p ? 'is-active' : ''}" type="button" data-action="note-player" data-index="${i}" data-no-i18n>${esc(x.name)}</button>`).join('')}</div>` : ''}
      <div class="journal-filters">${chip('all', 'Tất cả')}${chip('read', 'Đã đọc')}${chip('unread', 'Chưa đọc')}</div>`
    : `<p class="${ps ? 'callout callout--tip' : 'muted'}">${ico(ps ? 'warn' : 'upload')} ${ps
        ? t('File save bạn nạp trước đây được đọc bằng bản cũ của trang, chưa có danh sách mật thư đã đọc. Hãy nạp lại file save một lần.')
        : t('Nạp file save ở tab Tiến Độ để biết mẩu nào bạn đã đọc. Chưa có save thì mọi mẩu đều ẩn sau nút Xem Spoilers.')}
        <button class="link-btn" type="button" data-action="import-save-progress">${t('Nạp file save')}</button></p>`}
    ${GROUPS.map(g => {
      const all = SECRET_NOTES.filter(g.test);
      const list = all.filter(shown);
      return `
        <h3 class="journal-sub">${ico(g.icon)} ${t(g.name)}${seen ? `: ${all.filter(n => seen.has(n.id)).length}/${all.length}` : ` (${all.length})`}</h3>
        <div class="content-grid note-grid">${list.map(n => cardHtml(n, g, seen)).join('') || `<p class="muted">${t('Không có mẩu nào.')}</p>`}</div>`;
    }).join('')}`;
}

export default {
  id: 'secretnotes',
  toggles: [],
  render,
  actions: {
    'note-spoiler': (app, el) => {
      const id = Number(el.dataset.id);
      if (revealed.has(id)) revealed.delete(id); else revealed.add(id);
      render();
    },
    'note-filter': (app, el) => { ui.filter = el.dataset.filter; render(); },
    'note-player': (app, el) => { ui.player = Number(el.dataset.index) || 0; render(); }
  }
};
