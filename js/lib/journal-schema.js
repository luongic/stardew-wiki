// ==========================================================================
// JOURNAL SNAPSHOT VERSION
// The save import keeps a snapshot of the save for the Journal, Secret Notes
// and Today tabs. When a site update starts reading something new from the
// save, bump JOURNAL_SCHEMA: tabs then ask to load the save again instead of
// silently showing less than they could.
//   2: secret notes seen (ids)   3: secret notes done, stardrops, rarecrows
// ==========================================================================

import { ico } from './icons.js';
import { t } from './i18n.js';

export const JOURNAL_SCHEMA = 4;

export const isStale = j => !!j && (j.schema || 0) < JOURNAL_SCHEMA;

// The notice shown above a tab that reads an outdated snapshot
export const staleNotice = () => `
  <p class="callout callout--tip stale-notice">${ico('warn')} ${t('Trang vừa được cập nhật và đọc được thêm thông tin từ file save. Hãy nạp lại file save một lần để xem đầy đủ.')}
    <button class="link-btn" type="button" data-action="goto-save">${t('Nạp lại file save')}</button></p>`;
