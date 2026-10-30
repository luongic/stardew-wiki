// ==========================================================================
// SITE UPDATES
// Registers the service worker (sw.js) that keeps the site cached for fast,
// offline visits. When a new version has been downloaded in the background:
//   - an important version (version.json "important": true) shows a popup
//     with what changed and an "Update now" button;
//   - a minor one is applied quietly the next time the site is opened or
//     reloaded.
// Updating only swaps the site's files: progress, notes and farm plans stay.
// ==========================================================================

import { openModal, closeModal } from './ui.js';
import { t } from './i18n.js';
import { ico } from './icons.js';

const LOCAL = ['localhost', '127.0.0.1'].includes(location.hostname);
let waiting = null;

async function latestInfo() {
  try {
    const res = await fetch(`version.json?t=${Date.now()}`, { cache: 'no-store' });
    return res.ok ? res.json() : null;
  } catch { return null; }
}

async function currentInfo() {
  try {
    // Answered by the running service worker (or the file itself without one)
    const res = await fetch('version.json?current', { cache: 'no-store' });
    return res.ok ? res.json() : null;
  } catch { return null; }
}

function showUpdate(info) {
  const body = document.getElementById('updateBody');
  if (!body) return;
  body.innerHTML = `
    <p>${t('Cẩm Nang vừa có bản cập nhật quan trọng. Tiến độ, ghi chú và thiết kế nông trại của bạn vẫn được giữ nguyên.')}</p>
    ${info?.notes?.length ? `<ul class="update-notes">${info.notes.map(n => `<li>${ico('sparkle')} ${n}</li>`).join('')}</ul>` : ''}
    <div class="btn-row">
      <button class="btn btn--green" type="button" data-action="update-now">${ico('download')} ${t('Cập nhật ngay')}</button>
      <button class="btn btn--ghost" type="button" data-close-modal>${t('Để sau')}</button>
    </div>
    <p class="muted">${t('Phiên bản')} ${info?.version || ''}</p>`;
  openModal('updateModal');
}

// `atStart`: found while the page is still loading; a minor update is then
// applied straight away (one quick reload) instead of waiting for every tab to close
async function onWaiting(worker, atStart = false) {
  waiting = worker;
  const info = await latestInfo();
  if (info?.important) showUpdate(info);
  else if (atStart) worker.postMessage('SKIP_WAITING');
}

export function applyUpdate() {
  if (!waiting) { location.reload(); return; }
  closeModal(document.getElementById('updateModal'));
  waiting.postMessage('SKIP_WAITING');
}

export async function initUpdates() {
  const info = await currentInfo();
  const label = document.getElementById('siteVersion');
  if (label && info?.version) label.textContent = `${t('Phiên bản')} ${info.version}`;

  // Local development serves files straight from disk unless ?sw is in the URL
  if (!('serviceWorker' in navigator) || (LOCAL && !new URLSearchParams(location.search).has('sw'))) return;
  // A first visit also gets a controller (clients.claim): only reload when an
  // older version was running, i.e. after "Update now" or a minor update
  const hadController = !!navigator.serviceWorker.controller;
  let reloading = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (reloading || !hadController) return;
    reloading = true;
    location.reload();
  });
  try {
    const reg = await navigator.serviceWorker.register('sw.js');
    if (reg.waiting && navigator.serviceWorker.controller) onWaiting(reg.waiting, true);
    reg.addEventListener('updatefound', () => {
      const nw = reg.installing;
      nw?.addEventListener('statechange', () => {
        if (nw.state === 'installed' && navigator.serviceWorker.controller) onWaiting(nw);
      });
    });
    // Images shown before the worker took control were not cached: hand them over
    navigator.serviceWorker.ready.then(r => {
      const urls = performance.getEntriesByType('resource').map(e => e.name).filter(u => u.startsWith(location.origin));
      r.active?.postMessage({ type: 'CACHE_URLS', urls });
    });
    // Look for a new version when the visitor comes back to the tab, at most hourly
    let last = Date.now();
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && Date.now() - last > 3600e3) { last = Date.now(); reg.update().catch(() => {}); }
    });
  } catch (e) {
    console.warn('[updates]', e);
  }
}
