// ==========================================================================
// STARDEW VALLEY WIKI - MAIN CONTROLLER
// Owns shared state (active tab, search, quick toggles, completion sets) and
// one delegated listener per event type. Each tab module in js/tabs/ renders
// its own section and declares the actions it handles:
//
//   { id, toggles, render(app), detail?(app, id), detailType?, actions?,
//     onEnter?(app), onLeave?(app) }
//
// Markup triggers an action with data-action="name" plus data-* arguments.
// ==========================================================================

import { KEYS, loadSet, saveSet } from './lib/storage.js';
import { Sfx } from './lib/audio.js';
import { startSeasonParticles } from './lib/particles.js';
import { showToast, openModal, initModals, initImageFallbacks } from './lib/ui.js';

import recipesTab from './tabs/recipes.js';
import itemsTab from './tabs/items.js';
import npcsTab from './tabs/npcs.js';
import questsTab from './tabs/quests.js';
import bundlesTab from './tabs/bundles.js';
import museumTab from './tabs/museum.js';
import plannerTab from './tabs/planner.js';
import trackerTab from './tabs/tracker.js';

const SEASON_NAMES = { spring: 'Mùa Xuân 🌸', summer: 'Mùa Hạ ☀️', fall: 'Mùa Thu 🍁', winter: 'Mùa Đông ❄️' };
const SEARCH_DEBOUNCE_MS = 150;

export class StardewWikiApp {
  constructor() {
    this.tabs = [recipesTab, itemsTab, npcsTab, questsTab, bundlesTab, museumTab, plannerTab, trackerTab];
    this.tabById = new Map(this.tabs.map(t => [t.id, t]));
    this.tabByDetailType = new Map(this.tabs.filter(t => t.detailType).map(t => [t.detailType, t]));

    this.currentTab = 'recipes';
    this.searchQuery = '';
    this.filters = Object.fromEntries(this.tabs.map(t => [t.id, 'all']));
    this.toggles = { v16: false, unfinished: false, buffs: false };

    this.completedRecipes = loadSet(KEYS.completedRecipes);
    this.completedQuests = loadSet(KEYS.completedQuests);
    this.season = localStorage.getItem(KEYS.season) || 'spring';
    this.sfx = new Sfx();

    this.actions = {
      ...this.coreActions(),
      ...Object.assign({}, ...this.tabs.map(t => t.actions || {}))
    };
  }

  init() {
    initModals();
    initImageFallbacks();
    this.applySeason(this.season);
    startSeasonParticles(document.getElementById('seasonCanvas'), () => this.season);
    this.bindDelegates();
    this.updateAudioButton();
    this.tabs.forEach(t => t.init?.(this));
    this.switchTab(this.currentTab);
    this.refreshBadges();
  }

  // ==========================================
  // DELEGATED EVENTS
  // ==========================================
  bindDelegates() {
    const dispatch = (e) => {
      const el = e.target.closest('[data-action]');
      if (!el) return;
      // Inputs fire their action on change/input, not on the click that toggles them
      const isField = el.matches('input, select, textarea');
      if (e.type === 'click' && isField) return;
      if (e.type !== 'click' && !isField) return;
      const handler = this.actions[el.dataset.action];
      if (handler) handler(this, el, e);
    };
    document.addEventListener('click', dispatch);
    document.addEventListener('change', dispatch);
    document.addEventListener('input', (e) => {
      if (e.target.matches('input[type="range"][data-action]')) dispatch(e);
    });

    // Cards that open a detail view are focusable; Enter/Space activates them
    document.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[data-action][role="button"]')) {
        e.preventDefault();
        e.target.click();
      }
    });

    let searchTimer = null;
    document.getElementById('searchInput')?.addEventListener('input', (e) => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        this.render();
      }, SEARCH_DEBOUNCE_MS);
    });
  }

  coreActions() {
    return {
      'switch-tab': (app, el) => {
        app.switchTab(el.dataset.tab);
        app.sfx.play('click');
      },
      'set-season': (app, el) => {
        app.applySeason(el.dataset.season);
        app.sfx.play('click');
        showToast(`Đã chuyển sang không gian ${SEASON_NAMES[el.dataset.season]}!`);
      },
      'toggle-audio': (app) => {
        app.sfx.setEnabled(!app.sfx.enabled);
        app.updateAudioButton();
        app.sfx.play('click');
        showToast(app.sfx.enabled ? 'Đã bật hiệu ứng âm thanh' : 'Đã tắt âm thanh');
      },
      'filter': (app, el) => {
        const group = el.closest('[data-filter-group]');
        group.querySelectorAll('[data-action="filter"]').forEach(b => b.classList.toggle('is-active', b === el));
        app.filters[group.dataset.filterGroup] = el.dataset.value;
        app.sfx.play('click');
        app.render();
      },
      'quick-toggle': (app, el) => {
        app.toggles[el.dataset.toggle] = el.checked;
        app.render();
      },
      'open-detail': (app, el) => {
        app.openDetail(el.dataset.type, el.dataset.id);
        app.sfx.play('click');
      },
      'open-modal': (app, el) => {
        openModal(el.dataset.modal);
        app.sfx.play('click');
      }
    };
  }

  // ==========================================
  // TABS & RENDERING
  // ==========================================
  switchTab(tabId) {
    const next = this.tabById.get(tabId);
    if (!next) return;
    if (tabId !== this.currentTab) this.tabById.get(this.currentTab)?.onLeave?.(this);
    this.currentTab = tabId;

    document.querySelectorAll('[data-action="switch-tab"]').forEach(btn => {
      const on = btn.dataset.tab === tabId;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on);
    });
    document.querySelectorAll('.tab-panel').forEach(sec => {
      sec.hidden = sec.id !== `tab-${tabId}`;
    });

    // Toolbar: only the filter group and quick toggles this tab understands
    const toolbar = document.getElementById('toolbarPanel');
    const hasFilters = !!document.querySelector(`[data-filter-group="${tabId}"]`);
    toolbar.hidden = !hasFilters;
    document.querySelectorAll('[data-filter-group]').forEach(g => {
      g.hidden = g.dataset.filterGroup !== tabId;
    });
    const toggles = next.toggles || [];
    document.querySelectorAll('[data-toggle-wrap]').forEach(w => {
      w.hidden = !toggles.includes(w.dataset.toggleWrap);
    });
    document.getElementById('quickToggles').hidden = toggles.length === 0;

    next.onEnter?.(this);
    this.render();
  }

  render() {
    this.tabById.get(this.currentTab)?.render(this);
  }

  openDetail(type, id) {
    const tab = this.tabByDetailType.get(type);
    const html = tab?.detail(this, id);
    if (!html) return;
    document.getElementById('modalBody').innerHTML = html;
    openModal('detailModal');
  }

  // ==========================================
  // SHARED STATE HELPERS
  // ==========================================
  toggleCompleted(kind, id) {
    const set = kind === 'recipe' ? this.completedRecipes : this.completedQuests;
    if (set.has(id)) {
      set.delete(id);
      this.sfx.play('uncheck');
    } else {
      set.add(id);
      this.sfx.play('complete');
      showToast(kind === 'recipe' ? '⭐ Đã đánh dấu hoàn thành công thức!' : '🏆 Đã hoàn thành nhiệm vụ!');
    }
    this.saveProgress();
    this.render();
  }

  saveProgress() {
    saveSet(KEYS.completedRecipes, this.completedRecipes);
    saveSet(KEYS.completedQuests, this.completedQuests);
    this.refreshBadges();
  }

  refreshBadges() {
    this.tabs.forEach(t => t.badge?.(this));
  }

  applySeason(season) {
    this.season = season;
    document.documentElement.dataset.season = season;
    localStorage.setItem(KEYS.season, season);
    document.querySelectorAll('[data-action="set-season"]').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.season === season);
    });
  }

  updateAudioButton() {
    const btn = document.getElementById('audioToggleBtn');
    if (btn) btn.textContent = this.sfx.enabled ? '🔊 Âm Thanh: Bật' : '🔇 Âm Thanh: Tắt';
  }

  showToast(message) {
    showToast(message);
  }
}
