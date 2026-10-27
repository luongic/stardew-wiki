// ==========================================================================
// SHARED UI: toasts, modal dialogs and broken-image fallbacks
// ==========================================================================

const MAX_TOASTS = 3;

export function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  // Rapid clicks would stack toasts over the content; keep only the newest few
  while (container.children.length >= MAX_TOASTS) container.firstElementChild.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span aria-hidden="true">✨</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// --- Modals ---------------------------------------------------------------
// Every dialog is a .modal element toggled with the `hidden` attribute. Focus
// moves into the dialog on open and returns to the trigger on close.

const openStack = [];

export function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal || !modal.hidden) return;
  modal.hidden = false;
  openStack.push({ modal, returnFocus: document.activeElement });
  modal.querySelector('.modal-close-btn')?.focus();
}

export function closeModal(modal = openStack.at(-1)?.modal) {
  if (!modal) return;
  modal.hidden = true;
  const idx = openStack.findIndex(entry => entry.modal === modal);
  if (idx !== -1) {
    const [entry] = openStack.splice(idx, 1);
    entry.returnFocus?.focus?.();
  }
}

export function initModals() {
  document.addEventListener('click', (e) => {
    const closer = e.target.closest('[data-close-modal]');
    if (closer) {
      closeModal(closer.closest('.modal'));
      return;
    }
    // Click on the dimmed backdrop itself, not on the dialog box
    if (e.target.classList?.contains('modal')) closeModal(e.target);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && openStack.length) closeModal();
  });
}

// --- Image fallbacks --------------------------------------------------------
// `error` does not bubble, so listen in the capture phase. Each <img> states
// how to degrade through data-fallback instead of an inline onerror handler:
//   hide    -> mark the wrapper broken; CSS hides it
//   emoji   -> mark the wrapper broken; CSS swaps in the sibling emoji
//   <url>   -> swap the src once

export function initImageFallbacks() {
  document.addEventListener('error', (e) => {
    const img = e.target;
    if (!(img instanceof HTMLImageElement) || !img.dataset.fallback) return;
    const mode = img.dataset.fallback;
    if (mode === 'hide' || mode === 'emoji') {
      img.parentElement?.classList.add('is-broken');
    } else if (!img.dataset.fellBack) {
      img.dataset.fellBack = '1';
      img.src = mode;
    }
  }, true);
}
