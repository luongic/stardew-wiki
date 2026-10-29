// ==========================================================================
// PLAYER NOTES
// Each player keeps one note (max 1000 characters) for "where I left off".
// Solo it lives in localStorage; inside a co-op room it also syncs to
// rooms/{code}/notes/{uid}, and teammates' notes are shown read-only.
// ==========================================================================

import { coop, NOTE_MAX } from './coop.js';
import { KEYS, loadJSON, saveJSON } from '../lib/storage.js';
import { openModal } from '../lib/ui.js';
import { ico } from '../lib/icons.js';

const SEEN_KEY = 'stardew_wiki_notes_seen';
const SAVE_DELAY_MS = 1200;

let local = loadJSON(KEYS.note, { text: '', t: 0 });
let saveTimer = null;
let saveState = 'idle'; // idle | typing | saved

coop.localNote = () => local.text;

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function timeAgo(ms) {
  if (!ms) return '';
  const s = Math.max(0, Math.round((Date.now() - ms) / 1000));
  if (s < 60) return 'vừa xong';
  if (s < 3600) return `${Math.floor(s / 60)} phút trước`;
  if (s < 86400) return `${Math.floor(s / 3600)} giờ trước`;
  return `${Math.floor(s / 86400)} ngày trước`;
}

const noteTime = n => n?.t?.toMillis?.() || 0;

// Teammates' notes, only for people still in the room, newest first
function teammateNotes() {
  const members = coop.room?.members || {};
  return Object.entries(coop.notes)
    .filter(([uid, n]) => uid !== coop.user?.uid && members[uid] && n.text?.trim())
    .map(([uid, n]) => ({ uid, ...n, name: members[uid].name || n.name, at: noteTime(n) }))
    .sort((a, b) => b.at - a.at);
}

function hasUnread() {
  const seen = Number(localStorage.getItem(SEEN_KEY) || 0);
  return teammateNotes().some(n => n.at > seen);
}

function markSeen() {
  localStorage.setItem(SEEN_KEY, String(Date.now()));
}

// My note from the room wins when it is newer than this device's copy
// (written on another device), as long as I'm not typing right now.
function adoptRemoteOwnNote() {
  const mine = coop.user && coop.notes[coop.user.uid];
  const box = document.getElementById('noteText');
  if (!mine || noteTime(mine) <= local.t || document.activeElement === box) return;
  local = { text: mine.text || '', t: noteTime(mine) };
  saveJSON(KEYS.note, local);
  if (box) box.value = local.text;
  renderCounter();
}

function renderCounter() {
  const el = document.getElementById('noteCount');
  if (!el) return;
  const n = (document.getElementById('noteText')?.value ?? local.text).length;
  el.textContent = `${n}/${NOTE_MAX}`;
  el.classList.toggle('is-full', n >= NOTE_MAX);
}

function renderSaveState() {
  const el = document.getElementById('noteSaved');
  if (!el) return;
  const where = coop.code ? `phòng ${coop.code}` : 'máy này';
  el.innerHTML = saveState === 'typing'
    ? `${ico('hourglass')} Đang lưu…`
    : `${ico('check')} Đã lưu vào ${where}${local.t ? ` · ${timeAgo(local.t)}` : ''}`;
}

function renderTeam() {
  const el = document.getElementById('noteTeam');
  if (!el) return;
  if (!coop.code) {
    el.innerHTML = `<p class="muted">${ico('junimo')} Vào phòng Co-op để chia sẻ ghi chú với đồng đội và xem ghi chú của họ.</p>`;
    return;
  }
  const notes = teammateNotes();
  el.innerHTML = notes.length
    ? notes.map(n => `
        <article class="team-note">
          <header class="team-note__head">
            <span>${ico('guest')} <strong>${esc(n.name)}</strong></span>
            <span class="muted">${timeAgo(n.at)}</span>
          </header>
          <p class="team-note__text">${esc(n.text)}</p>
        </article>`).join('')
    : '<p class="muted">Đồng đội chưa viết ghi chú nào.</p>';
}

function renderHeroDot() {
  document.getElementById('notesBtn')?.classList.toggle('has-unread', !!coop.code && hasUnread());
}

function render() {
  adoptRemoteOwnNote();
  renderCounter();
  renderSaveState();
  renderTeam();
  renderHeroDot();
}

function save(text) {
  local = { text: text.slice(0, NOTE_MAX), t: Date.now() };
  saveJSON(KEYS.note, local);
  coop.saveNote(local.text);
  saveState = 'saved';
  renderSaveState();
}

// Used by backup import: replaces this player's note (and shares it if in a room)
export function restoreNote(text) {
  if (typeof text !== 'string') return;
  save(text);
  const box = document.getElementById('noteText');
  if (box) box.value = local.text;
  renderCounter();
}

export const notesUi = {
  init() {
    document.getElementById('noteText').value = local.text;
    document.getElementById('noteText').maxLength = NOTE_MAX;

    document.getElementById('noteText').addEventListener('input', (e) => {
      saveState = 'typing';
      renderCounter();
      renderSaveState();
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => save(e.target.value), SAVE_DELAY_MS);
    });
    // Leaving the box saves straight away instead of waiting for the timer
    document.getElementById('noteText').addEventListener('blur', (e) => {
      if (saveState !== 'typing') return;
      clearTimeout(saveTimer);
      save(e.target.value);
    });

    coop.onChange(() => {
      render();
      // Reading teammates' notes while the popup is open counts as seen
      if (!document.getElementById('notesModal').hidden) { markSeen(); renderHeroDot(); }
    });
    render();
    setInterval(() => { renderSaveState(); renderTeam(); }, 30000);
  },

  actions: {
    'notes-open': () => {
      render();
      openModal('notesModal');
      markSeen();
      renderHeroDot();
    }
  }
};
