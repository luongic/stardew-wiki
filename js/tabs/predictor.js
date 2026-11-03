// ==========================================================================
// TAB: DỰ ĐOÁN (PREDICTOR)
// Many things in Stardew Valley come from random numbers seeded with the
// Game ID, so they can be worked out ahead: trains, weather, night events,
// what the Traveling Cart sells, geode contents and more. Each kind of
// prediction is a module in js/predict/ (see js/predict/index.js); this tab
// shows one at a time with browsing (previous / next month, etc.).
// Numbers come from the last save file, or from a Game ID typed by hand.
// ==========================================================================

import { PREDICTIONS } from '../predict/index.js';
import { manualContext } from '../predict/context.js';
import { dateLabel, today, esc } from '../predict/core.js';
import { ico } from '../lib/icons.js';
import { t, nm, isEn } from '../lib/i18n.js';
import { loadJSON, saveJSON, KEYS } from '../lib/storage.js';

const SEASONS_VI = ['Xuân', 'Hạ', 'Thu', 'Đông'];
const view = { id: 'train', offset: null, player: 0, query: '', manual: false, ...loadJSON(KEYS.predictView, {}) };
const saveView = () => saveJSON(KEYS.predictView, { id: view.id, player: view.player });

export const predictContext = () => loadJSON(KEYS.predict, null);
const current = () => PREDICTIONS.find(p => p.id === view.id) || PREDICTIONS[0];

// Called by the save import (Progress tab)
export function applySavePredict(ctx) {
  saveJSON(KEYS.predict, ctx);
  view.offset = null;
  view.query = '';
}

function sourceHtml(ctx) {
  const d = ctx ? today(ctx) : 1;
  return `
    <div class="predict-source">
      ${ctx ? `<p>${ico('save')} ${ctx.source === 'save' ? t('Từ file save') : t('Nhập tay')}: <strong>Game ID ${esc(ctx.gameID)}</strong> · ${dateLabel(d)}
        ${ctx.source === 'save' && ctx.names?.length ? ` · <span data-no-i18n>${ctx.names.map(esc).join(', ')}</span>` : ''}</p>` : `<p>${t('Nạp file save (một lần ở tab Tiến Độ) hoặc nhập Game ID để xem dự đoán.')}</p>`}
      <div class="predict-source__actions">
        <button class="btn btn--green btn--sm" type="button" data-action="import-save-progress">${ico('upload')} ${ctx ? t('Nạp lại file save') : t('Nạp file save')}</button>
        <button class="btn btn--ghost btn--sm" type="button" data-action="predict-manual">${ico('dice')} ${t('Nhập Game ID')}</button>
      </div>
      ${view.manual || !ctx ? `
        <form class="predict-manual" data-predict-form>
          <label>Game ID <input class="coop-input" name="gameID" inputmode="numeric" pattern="[0-9]+" required value="${ctx?.gameID ?? ''}"></label>
          <label>${t('Ngày')} <input class="coop-input today-num" name="day" type="number" min="1" max="28" value="${ctx ? ((d - 1) % 28) + 1 : 1}"></label>
          <label>${t('Mùa')} <select class="coop-input" name="season">${SEASONS_VI.map((s, i) => `<option value="${i}" ${ctx && Math.floor((d - 1) / 28) % 4 === i ? 'selected' : ''}>${t(`Mùa ${s}`)}</option>`).join('')}</select></label>
          <label>${t('Năm')} <input class="coop-input today-num" name="year" type="number" min="1" max="99" value="${ctx ? Math.floor((d - 1) / 112) + 1 : 1}"></label>
          <button class="btn btn--blue btn--sm" type="submit">${t('Dự đoán')}</button>
          <p class="muted">${t('Game ID là dãy số sau tên file save (VD: Farm_123456789 thì Game ID là 123456789). Nhập tay thì không biết số hốc đá đã đập, khu vực đã mở... nên tính như lúc mới chơi.')}</p>
        </form>` : ''}
    </div>`;
}

function navHtml(p, ctx, offset, opts) {
  const nav = p.nav;
  if (!nav) return '';
  const btn = (to, label, disabled) => `<button class="btn btn--ghost btn--sm" type="button" data-action="predict-go" data-offset="${to}" ${disabled ? 'disabled' : ''}>${label}</button>`;
  const min = nav.min ?? 1;
  return `
    <div class="predict-nav">
      ${nav.big ? btn(offset - nav.big, `« ${t(nav.bigLabel || 'Năm trước')}`, offset - nav.big < min) : ''}
      ${btn(offset - nav.step, `‹ ${t(nav.stepLabel || 'Tháng trước')}`, offset - nav.step < min)}
      ${btn(nav.start(ctx, opts), t('Hiện tại'), false)}
      ${btn(offset + nav.step, `${t(nav.nextLabel || 'Tháng sau')} ›`, false)}
      ${nav.big ? btn(offset + nav.big, `${t(nav.bigNextLabel || 'Năm sau')} »`, false) : ''}
    </div>`;
}

function render() {
  const el = document.getElementById('predictorBoard');
  if (!el) return;
  const ctx = predictContext();
  const p = current();
  let body = '';
  if (ctx) {
    const opts = { player: Math.min(view.player, (ctx.names?.length || 1) - 1), query: view.query };
    const offset = view.offset ?? p.nav?.start(ctx, opts) ?? 0;
    try {
      body = view.query && p.search ? p.search.run(ctx, view.query, opts) : p.render(ctx, offset, opts);
    } catch (e) {
      console.error('[predict]', p.id, e);
      body = `<p class="text-red">${ico('warn')} ${t('Không tính được dự đoán này.')}</p>`;
    }
    body = `
      ${p.players && (ctx.names?.length || 0) > 1 ? `<div class="journal-players">${ico('members')} ${ctx.names.map((n, i) => `<button class="chip ${opts.player === i ? 'is-active' : ''}" type="button" data-action="predict-player" data-index="${i}" data-no-i18n>${esc(n || '?')}</button>`).join('')}</div>` : ''}
      ${p.search ? `<form class="journal-search" data-predict-search>${ico('search')}<input type="search" class="coop-input" name="q" value="${esc(view.query)}" placeholder="${t(p.search.placeholder)}">
        <button class="btn btn--blue btn--sm" type="submit">${t('Tìm')}</button>${view.query ? `<button class="btn btn--ghost btn--sm" type="button" data-action="predict-clear">${t('Xóa tìm kiếm')}</button>` : ''}</form>` : ''}
      ${view.query && p.search ? '' : navHtml(p, ctx, offset, opts)}
      <div class="predict-out">${body}</div>`;
  }
  el.innerHTML = `
    ${sourceHtml(ctx)}
    <div class="journal-tabs predict-tabs">
      ${PREDICTIONS.map(x => `<button class="chip ${x === p ? 'is-active' : ''}" type="button" data-action="predict-tab" data-id="${x.id}">${ico(x.icon)} ${nm(x)}</button>`).join('')}
    </div>
    <h3 class="journal-sub">${ico(p.icon)} ${nm(p)}</h3>
    <p class="muted predict-intro">${isEn && p.introEn ? p.introEn : t(p.intro)}</p>
    ${body}`;
}

function onSubmit(e) {
  const form = e.target;
  if (form.matches?.('[data-predict-form]')) {
    e.preventDefault();
    const f = new FormData(form);
    const days = (Number(f.get('year')) - 1) * 112 + Number(f.get('season')) * 28 + Number(f.get('day'));
    const old = predictContext();
    // Same game: keep what the save said, only move the date
    const ctx = old && old.gameID === Number(f.get('gameID')) ? { ...old, daysPlayed: days } : manualContext(f.get('gameID'), days);
    saveJSON(KEYS.predict, ctx);
    view.manual = false; view.offset = null;
    render();
  } else if (form.matches?.('[data-predict-search]')) {
    e.preventDefault();
    view.query = new FormData(form).get('q').trim();
    render();
  }
}

export default {
  id: 'predictor',
  toggles: [],
  init() { document.addEventListener('submit', onSubmit); },
  render,
  actions: {
    'predict-tab': (app, el) => { view.id = el.dataset.id; view.offset = null; view.query = ''; saveView(); render(); app.sfx.play('click'); },
    'predict-go': (app, el) => { view.offset = Number(el.dataset.offset); render(); },
    'predict-player': (app, el) => { view.player = Number(el.dataset.index) || 0; saveView(); render(); },
    'predict-manual': () => { view.manual = !view.manual; render(); },
    'predict-clear': () => { view.query = ''; render(); }
  }
};
