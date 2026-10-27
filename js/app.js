// ==========================================================================
// STARDEW VALLEY WIKI - MAIN CONTROLLER APPLICATION
// ==========================================================================

import { RECIPES_DATA } from '../data/recipes-data.js';
import { QUESTS_DATA } from '../data/quests-data.js';
import { ITEMS_DATA } from '../data/items-data.js';
import { NPCS_DATA, CALENDAR_EVENTS } from '../data/npcs-data.js';
import { calculator } from './calculator.js';

class StardewWikiApp {
  constructor() {
    this.recipes = RECIPES_DATA;
    this.quests = QUESTS_DATA;
    this.items = ITEMS_DATA;
    this.npcs = NPCS_DATA;
    this.calendarEvents = CALENDAR_EVENTS || {};
    
    this.currentTab = 'recipes';
    this.recipeFilter = 'all';
    this.questFilter = 'all';
    this.itemFilter = 'all';
    this.npcFilter = 'all';
    this.simTime = 12; // 12:00 PM default
    this.simSeason = 'spring';
    this.simWeather = 'sunny';
    this.simDay = 6; // Default to Day 6 (Saturday / Thứ Bảy)
    this.simPlaying = false;
    this.simInterval = null;
    this.searchQuery = '';
    this.showOnlyV16 = false;
    this.showOnlyUnfinished = false;
    this.showOnlyBuffs = false;
    this.revealedSpoilers = new Set();
    
    // LocalStorage Keys
    this.COMPLETED_RECIPES_KEY = 'stardew_wiki_completed_recipes';
    this.COMPLETED_QUESTS_KEY = 'stardew_wiki_completed_quests';
    this.SEASON_KEY = 'stardew_wiki_season';
    this.AUDIO_KEY = 'stardew_wiki_audio_enabled';

    this.completedRecipes = this.loadSet(this.COMPLETED_RECIPES_KEY);
    this.completedQuests = this.loadSet(this.COMPLETED_QUESTS_KEY);
    this.currentSeason = localStorage.getItem(this.SEASON_KEY) || 'spring';
    this.audioEnabled = localStorage.getItem(this.AUDIO_KEY) !== 'false';

    this.audioCtx = null;
    this.initAudioContext();
  }

  loadSet(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? new Set(JSON.parse(data)) : new Set();
    } catch (e) {
      return new Set();
    }
  }

  saveSet(key, setObj) {
    try {
      localStorage.setItem(key, JSON.stringify(Array.from(setObj)));
    } catch (e) {
      console.error('Lỗi lưu dữ liệu', e);
    }
  }

  init() {
    this.applySeason(this.currentSeason);
    this.initSeasonParticles();
    this.bindEvents();
    this.render();
    this.updateStats();
    calculator.render();
  }

  // ==========================================
  // WEB AUDIO SYNTHESIZER (STARDEW SFX)
  // ==========================================
  initAudioContext() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      this.audioCtx = new AudioContextClass();
    }
  }

  playTone(type = 'click') {
    if (!this.audioEnabled || !this.audioCtx) return;
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    if (type === 'click') {
      // Wood block clack
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.08);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.09);
    } else if (type === 'complete') {
      // Stardew Junimo pickup bloop chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
      osc.frequency.setValueAtTime(1046.50, now + 0.24); // C6
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
      osc.start(now);
      osc.stop(now + 0.46);
    } else if (type === 'uncheck') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.1);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.11);
    }
  }

  // ==========================================
  // SEASON PARTICLES ENGINE (SPRING/SUMMER/FALL/WINTER)
  // ==========================================
  applySeason(season) {
    this.currentSeason = season;
    document.body.setAttribute('data-season', season);
    localStorage.setItem(this.SEASON_KEY, season);

    document.querySelectorAll('.season-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.season === season);
    });
  }

  initSeasonParticles() {
    const canvas = document.getElementById('seasonCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = 38;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speedX: (Math.random() - 0.5) * 1.5,
        speedY: 0.8 + Math.random() * 1.6,
        size: 4 + Math.random() * 7,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 2,
        opacity: 0.3 + Math.random() * 0.6
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;

        if (this.currentSeason === 'spring') {
          // Cherry blossom petals
          ctx.fillStyle = '#ffb7c5';
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (this.currentSeason === 'summer') {
          // Fireflies / pollen glow
          ctx.fillStyle = '#f9ca24';
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#f9ca24';
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.45, 0, Math.PI * 2);
          ctx.fill();
        } else if (this.currentSeason === 'fall') {
          // Autumn orange/brown maple leaves
          ctx.fillStyle = Math.random() > 0.5 ? '#e67e22' : '#d35400';
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 1.2, p.size * 0.7, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (this.currentSeason === 'winter') {
          // Snowflakes
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }

  // ==========================================
  // EVENT BINDINGS
  // ==========================================
  bindEvents() {
    // Navigation Tabs
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.dataset.tab;
        this.switchTab(tab);
        this.playTone('click');
      });
    });

    // Season Switches
    document.querySelectorAll('.season-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const season = e.currentTarget.dataset.season;
        this.applySeason(season);
        this.playTone('click');
        this.showToast(`Đã chuyển sang không gian ${this.getSeasonName(season)}!`);
      });
    });

    // Audio Toggle
    const audioBtn = document.getElementById('audioToggleBtn');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        this.audioEnabled = !this.audioEnabled;
        localStorage.setItem(this.AUDIO_KEY, this.audioEnabled);
        audioBtn.textContent = this.audioEnabled ? '🔊 Âm Thanh: Bật' : '🔇 Âm Thanh: Tắt';
        if (this.audioEnabled) this.playTone('click');
        this.showToast(this.audioEnabled ? 'Đã bật hiệu ứng âm thanh' : 'Đã tắt âm thanh');
      });
      audioBtn.textContent = this.audioEnabled ? '🔊 Âm Thanh: Bật' : '🔇 Âm Thanh: Tắt';
    }

    // Search Box with Debounce
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        this.render();
      });
    }

    // Filter Chips for Recipes
    document.querySelectorAll('#recipeFilters .filter-chip-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('#recipeFilters .filter-chip-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.recipeFilter = e.currentTarget.dataset.filter;
        this.playTone('click');
        this.render();
      });
    });

    // Filter Chips for Items (Divided by Title / Group)
    document.querySelectorAll('#itemFilters .filter-chip-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('#itemFilters .filter-chip-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.itemFilter = e.currentTarget.dataset.filter;
        this.playTone('click');
        this.render();
      });
    });

    // Filter Chips for Quests
    document.querySelectorAll('#questFilters .filter-chip-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('#questFilters .filter-chip-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.questFilter = e.currentTarget.dataset.filter;
        this.playTone('click');
        this.render();
      });
    });

    // Filter Chips for NPCs
    document.querySelectorAll('#npcFilters .filter-chip-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('#npcFilters .filter-chip-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.npcFilter = e.currentTarget.dataset.filter;
        this.playTone('click');
        this.render();
      });
    });

    // NPC Schedule Simulator: Season Buttons
    document.querySelectorAll('#simSeasonBtns .sim-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('#simSeasonBtns .sim-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.simSeason = e.currentTarget.dataset.season;
        this.playTone('click');
        this.renderCalendarGrid(true);
        this.updateSimDateDisplay();
        this.render();
      });
    });

    // NPC Schedule Simulator: Weather Buttons
    document.querySelectorAll('#simWeatherBtns .sim-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('#simWeatherBtns .sim-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.simWeather = e.currentTarget.dataset.weather;
        this.playTone('click');
        this.render();
      });
    });

    // NPC Schedule Simulator: Time Slider
    const simTimeSlider = document.getElementById('simTimeSlider');
    const simTimeDisplay = document.getElementById('simTimeDisplay');
    if (simTimeSlider) {
      simTimeSlider.addEventListener('input', (e) => {
        this.simTime = parseFloat(e.target.value);
        if (simTimeDisplay) {
          simTimeDisplay.textContent = this.formatSimHour(this.simTime);
        }
        document.querySelectorAll('.quick-time-btn').forEach(b => {
          b.classList.toggle('active', Math.abs(parseFloat(b.dataset.time) - this.simTime) < 0.25);
        });
        this.render();
      });
    }

    // NPC Schedule Simulator: Quick Time Buttons
    document.querySelectorAll('.quick-time-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.quick-time-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.simTime = parseFloat(e.currentTarget.dataset.time);
        if (simTimeSlider) simTimeSlider.value = this.simTime;
        if (simTimeDisplay) simTimeDisplay.textContent = this.formatSimHour(this.simTime);
        this.playTone('click');
        this.render();
      });
    });

    // NPC Schedule Simulator: Play/Pause Button
    const simPlayBtn = document.getElementById('simPlayBtn');
    if (simPlayBtn) {
      simPlayBtn.addEventListener('click', () => {
        this.toggleSimPlay();
      });
    }

    // Steam FAQ Modal
    const openSteamFaqBtn = document.getElementById('openSteamFaqBtn');
    const steamModal = document.getElementById('steamModal');
    const closeSteamModalBtn = document.getElementById('closeSteamModalBtn');
    const gotItSteamBtn = document.getElementById('gotItSteamBtn');

    if (openSteamFaqBtn && steamModal) {
      openSteamFaqBtn.addEventListener('click', () => {
        steamModal.style.display = 'flex';
        this.playTone('click');
      });
    }
    if (closeSteamModalBtn && steamModal) {
      closeSteamModalBtn.addEventListener('click', () => {
        steamModal.style.display = 'none';
      });
    }
    if (gotItSteamBtn && steamModal) {
      gotItSteamBtn.addEventListener('click', () => {
        steamModal.style.display = 'none';
        this.playTone('click');
      });
    }
    if (steamModal) {
      steamModal.addEventListener('click', (e) => {
        if (e.target === steamModal) {
          steamModal.style.display = 'none';
        }
      });
    }

    // Weather & Luck Modal Listeners
    const openWeatherLuckBtn = document.getElementById('openWeatherLuckBtn');
    const weatherLuckModal = document.getElementById('weatherLuckModal');
    const closeWeatherLuckModalBtn = document.getElementById('closeWeatherLuckModalBtn');
    const gotItWeatherLuckBtn = document.getElementById('gotItWeatherLuckBtn');

    if (openWeatherLuckBtn && weatherLuckModal) {
      openWeatherLuckBtn.addEventListener('click', () => {
        weatherLuckModal.style.display = 'flex';
        this.playTone('click');
      });
    }
    if (closeWeatherLuckModalBtn && weatherLuckModal) {
      closeWeatherLuckModalBtn.addEventListener('click', () => {
        weatherLuckModal.style.display = 'none';
      });
    }
    if (gotItWeatherLuckBtn && weatherLuckModal) {
      gotItWeatherLuckBtn.addEventListener('click', () => {
        weatherLuckModal.style.display = 'none';
        this.playTone('click');
      });
    }
    if (weatherLuckModal) {
      weatherLuckModal.addEventListener('click', (e) => {
        if (e.target === weatherLuckModal) {
          weatherLuckModal.style.display = 'none';
        }
      });
    }

    // Quick Toggles
    const v16Toggle = document.getElementById('v16Toggle');
    if (v16Toggle) {
      v16Toggle.addEventListener('change', (e) => {
        this.showOnlyV16 = e.target.checked;
        this.render();
      });
    }

    const unfinishedToggle = document.getElementById('unfinishedToggle');
    if (unfinishedToggle) {
      unfinishedToggle.addEventListener('change', (e) => {
        this.showOnlyUnfinished = e.target.checked;
        this.render();
      });
    }

    const buffToggle = document.getElementById('buffToggle');
    if (buffToggle) {
      buffToggle.addEventListener('change', (e) => {
        this.showOnlyBuffs = e.target.checked;
        this.render();
      });
    }

    // Clear Planner Button
    const clearPlannerBtn = document.getElementById('clearPlannerBtn');
    if (clearPlannerBtn) {
      clearPlannerBtn.addEventListener('click', () => {
        if (confirm('Bạn có chắc muốn xóa toàn bộ kế hoạch chế biến hiện tại?')) {
          calculator.clearPlan();
          this.playTone('click');
          this.showToast('Đã dọn sạch Kế Hoạch Chế Tạo');
        }
      });
    }

    // Modal Close
    const modalBackdrop = document.getElementById('detailModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    if (modalCloseBtn && modalBackdrop) {
      modalCloseBtn.addEventListener('click', () => {
        modalBackdrop.classList.remove('open');
      });
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) {
          modalBackdrop.classList.remove('open');
        }
      });
    }

    // Global ESC key to close any active modal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const detailModal = document.getElementById('detailModal');
        if (detailModal) detailModal.classList.remove('open');
        const steamModal = document.getElementById('steamModal');
        if (steamModal) steamModal.style.display = 'none';
        const weatherLuckModal = document.getElementById('weatherLuckModal');
        if (weatherLuckModal) weatherLuckModal.style.display = 'none';
      }
    });

    // Export & Reset Progress Buttons in Tracker
    const exportBtn = document.getElementById('exportProgressBtn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.exportProgress());
    }

    const resetBtn = document.getElementById('resetProgressBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('CẢNH BÁO: Thao tác này sẽ đặt lại toàn bộ tiến độ đã hoàn thành về 0. Bạn có chắc không?')) {
          this.completedRecipes.clear();
          this.completedQuests.clear();
          this.saveSet(this.COMPLETED_RECIPES_KEY, this.completedRecipes);
          this.saveSet(this.COMPLETED_QUESTS_KEY, this.completedQuests);
          this.render();
          this.updateStats();
          this.showToast('Đã xóa dữ liệu tiến độ');
        }
      });
    }
  }

  getSeasonName(season) {
    const names = { spring: 'Mùa Xuân 🌸', summer: 'Mùa Hạ ☀️', fall: 'Mùa Thu 🍁', winter: 'Mùa Đông ❄️' };
    return names[season] || season;
  }

  switchTab(tab) {
    this.currentTab = tab;
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tab);
    });

    document.querySelectorAll('.tab-content-section').forEach(sec => {
      sec.style.display = 'none';
    });

    const activeSec = document.getElementById(`tab-${tab}`);
    if (activeSec) activeSec.style.display = 'block';

    // Show/hide relevant toolbar filters
    const recipeFilters = document.getElementById('recipeFilters');
    const itemFilters = document.getElementById('itemFilters');
    const questFilters = document.getElementById('questFilters');
    const npcFilters = document.getElementById('npcFilters');
    const toolbar = document.getElementById('toolbarPanel');

    if (tab === 'recipes') {
      if (toolbar) toolbar.style.display = 'block';
      if (recipeFilters) recipeFilters.style.display = 'flex';
      if (itemFilters) itemFilters.style.display = 'none';
      if (questFilters) questFilters.style.display = 'none';
      if (npcFilters) npcFilters.style.display = 'none';
    } else if (tab === 'items') {
      if (toolbar) toolbar.style.display = 'block';
      if (recipeFilters) recipeFilters.style.display = 'none';
      if (itemFilters) itemFilters.style.display = 'flex';
      if (questFilters) questFilters.style.display = 'none';
      if (npcFilters) npcFilters.style.display = 'none';
    } else if (tab === 'npcs') {
      if (toolbar) toolbar.style.display = 'block';
      if (recipeFilters) recipeFilters.style.display = 'none';
      if (itemFilters) itemFilters.style.display = 'none';
      if (questFilters) questFilters.style.display = 'none';
      if (npcFilters) npcFilters.style.display = 'flex';
    } else if (tab === 'quests') {
      if (toolbar) toolbar.style.display = 'block';
      if (recipeFilters) recipeFilters.style.display = 'none';
      if (itemFilters) itemFilters.style.display = 'none';
      if (questFilters) questFilters.style.display = 'flex';
      if (npcFilters) npcFilters.style.display = 'none';
    } else {
      if (toolbar) toolbar.style.display = 'none';
    }

    if (tab === 'planner') {
      calculator.render();
    } else if (tab === 'tracker') {
      this.updateStats();
    } else {
      this.render();
    }
  }

  // ==========================================
  // COMPLETION TOGGLES
  // ==========================================
  toggleRecipeDone(recipeId) {
    if (this.completedRecipes.has(recipeId)) {
      this.completedRecipes.delete(recipeId);
      this.playTone('uncheck');
    } else {
      this.completedRecipes.add(recipeId);
      this.playTone('complete');
      this.showToast('⭐ Đã đánh dấu hoàn thành công thức!');
    }
    this.saveSet(this.COMPLETED_RECIPES_KEY, this.completedRecipes);
    this.render();
    this.updateStats();
  }

  toggleQuestDone(questId) {
    if (this.completedQuests.has(questId)) {
      this.completedQuests.delete(questId);
      this.playTone('uncheck');
    } else {
      this.completedQuests.add(questId);
      this.playTone('complete');
      this.showToast('🏆 Đã hoàn thành nhiệm vụ!');
    }
    this.saveSet(this.COMPLETED_QUESTS_KEY, this.completedQuests);
    this.render();
    this.updateStats();
  }

  toggleSpoiler(questId) {
    if (this.revealedSpoilers.has(questId)) {
      this.revealedSpoilers.delete(questId);
    } else {
      this.revealedSpoilers.add(questId);
    }
    this.render();
  }

  // ==========================================
  // RENDER MAIN GRIDS
  // ==========================================
  render() {
    if (this.currentTab === 'recipes') {
      this.renderRecipes();
    } else if (this.currentTab === 'items') {
      this.renderItems();
    } else if (this.currentTab === 'npcs') {
      this.renderNpcs();
    } else if (this.currentTab === 'quests') {
      this.renderQuests();
    }
  }

  renderRecipes() {
    const grid = document.getElementById('recipesGrid');
    if (!grid) return;

    let filtered = this.recipes.filter(r => {
      // Category filter
      if (this.recipeFilter !== 'all') {
        if (this.recipeFilter === 'cooking' && r.category !== 'cooking') return false;
        if (this.recipeFilter === 'crafting' && r.category !== 'crafting') return false;
        if (this.recipeFilter === 'smelting' && r.category !== 'smelting') return false;
        if (this.recipeFilter === 'bait' && r.category !== 'bait' && !r.id.includes('bait') && !r.subCategory?.includes('mồi')) return false;
        if (this.recipeFilter === 'farmhouse' && r.category !== 'farmhouse') return false;
        if (this.recipeFilter === 'buildings' && r.category !== 'buildings') return false;
        if (this.recipeFilter === 'magical_buildings' && r.category !== 'magical_buildings') return false;
        if (this.recipeFilter === 'tools' && r.category !== 'tools') return false;
        if (this.recipeFilter === 'weapons' && r.category !== 'weapons') return false;
        if (this.recipeFilter === 'version16' && !r.version16) return false;
      }

      // Quick Toggles
      if (this.showOnlyV16 && !r.version16) return false;
      if (this.showOnlyUnfinished && this.completedRecipes.has(r.id)) return false;
      if (this.showOnlyBuffs && (!r.buffs || r.buffs.length === 0)) return false;

      // Search Filter
      if (this.searchQuery) {
        const query = this.searchQuery;
        const matchName = r.name.toLowerCase().includes(query);
        const matchEn = r.nameEn.toLowerCase().includes(query);
        const matchDesc = r.desc?.toLowerCase().includes(query);
        const matchIng = r.ingredients?.some(i => i.name.toLowerCase().includes(query) || i.nameEn?.toLowerCase().includes(query));
        const matchSource = r.source?.toLowerCase().includes(query);
        return matchName || matchEn || matchDesc || matchIng || matchSource;
      }

      return true;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: #fff;">
          <div style="font-size: 3rem; margin-bottom: 12px;">🔍</div>
          <h3 style="font-family: var(--font-heading); font-size: 1.4rem;">Không tìm thấy công thức nào phù hợp!</h3>
          <p style="color: #f7edd2; margin-top: 6px;">Hãy thử tìm từ khóa khác hoặc tắt bớt các bộ lọc đang chọn.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(r => {
      const isCompleted = this.completedRecipes.has(r.id);

      return `
        <div class="stardew-card ${isCompleted ? 'completed' : ''}" data-id="${r.id}">
          <div class="card-header">
            <div class="card-icon-title">
              <div class="item-icon-box">
                ${r.imageUrl ? `
                  <img src="${r.imageUrl}" alt="${r.name}" class="pixel-art-icon" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                  <span class="fallback-emoji" style="display: none;">${r.icon || '📦'}</span>
                ` : `
                  <span class="fallback-emoji">${r.icon || '📦'}</span>
                `}
              </div>
              <div class="item-name-group">
                <div class="item-title">${r.name}</div>
                <div class="item-sub">${r.nameEn} ${r.version16 ? '<span class="v16-badge">1.6 Mới</span>' : ''}</div>
              </div>
            </div>
            <div class="card-actions-top">
              <button class="check-done-btn" data-id="${r.id}" title="${isCompleted ? 'Hủy đánh dấu' : 'Đánh dấu đã hoàn thành'}">✓</button>
            </div>
          </div>

          <div class="card-body">
            <div class="card-desc">${r.desc}</div>

            <div class="ingredients-box">
              <div class="section-label">🌾 Nguyên liệu cần:</div>
              <ul class="ingredients-list">
                ${r.ingredients.map(ing => `
                  <li class="ingredient-item">
                    <div class="ing-left">
                      <div class="ing-icon-wrap">
                        <img src="${ing.iconUrl || 'assets/icons/ing_wood.png'}" alt="${ing.name}" class="ing-icon" onerror="this.parentElement.style.display='none';">
                      </div>
                      <span class="ing-name-text">
                        ${ing.name}
                        ${ing.nameEn && !ing.name.toLowerCase().includes(ing.nameEn.toLowerCase()) ? `<small class="ing-sub">(${ing.nameEn})</small>` : ''}
                      </span>
                    </div>
                    <span class="ing-count">x${ing.count}</span>
                  </li>
                `).join('')}
              </ul>
            </div>

            ${r.buffs && r.buffs.length > 0 ? `
              <div>
                <div class="section-label">⚡ Chỉ số tăng cường (Buffs):</div>
                <div class="buffs-container">
                  ${r.buffs.map(b => {
                    let pillClass = '';
                    if (b.stat.includes('Speed') || b.stat.includes('Tốc độ')) pillClass = 'speed';
                    if (b.stat.includes('Luck') || b.stat.includes('May mắn')) pillClass = 'luck';
                    if (b.stat.includes('Kháng') || b.stat.includes('MÁY') || b.stat.includes('BẢO')) pillClass = 'special';
                    return `<span class="buff-pill ${pillClass}"><strong>${b.stat}:</strong> ${b.value} (${b.duration})</span>`;
                  }).join('')}
                </div>
              </div>
            ` : ''}

            <div class="stats-row">
              ${r.sellPrice ? `<div class="stat-item">💰 Bán: <span class="stat-val">${r.sellPrice}g</span></div>` : ''}
              ${r.energy ? `<div class="stat-item">⚡ Năng lượng: <span class="stat-val">+${r.energy}</span></div>` : ''}
              ${r.health ? `<div class="stat-item">❤️ Máu: <span class="stat-val">+${r.health}</span></div>` : ''}
            </div>

            <div class="source-tag">
              <strong>📖 Nguồn học:</strong> ${r.source}
            </div>
          </div>

          <div class="card-footer">
            <button class="btn-secondary view-detail-btn" data-id="${r.id}" data-type="recipe">🔍 Chi tiết & Mẹo</button>
            <button class="btn-add-planner" data-id="${r.id}">+ Kế Hoạch Chế Tạo</button>
          </div>
        </div>
      `;
    }).join('');

    // Attach Event Handlers
    grid.querySelectorAll('.check-done-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = e.currentTarget.dataset.id;
        this.toggleRecipeDone(id);
      });
    });

    grid.querySelectorAll('.btn-add-planner').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        calculator.addItem(id, 1);
        this.playTone('click');
        this.showToast('Đã thêm vào Kế Hoạch Chế Tạo 🎒');
      });
    });

    grid.querySelectorAll('.view-detail-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        this.openDetailModal(id, 'recipe');
      });
    });
  }

  // ==========================================
  // RENDER ITEMS ENCYCLOPEDIA (DIVIDED BY TITLE)
  // ==========================================
  renderItems() {
    const container = document.getElementById('itemsContainer');
    if (!container) return;

    const GROUPS = [
      {
        category: 'tools',
        title: '🛠️ Công Cụ Lao Động, Khai Thác & Vũ Khí',
        desc: 'Búa, rìu, cuốc đất, xẻng mỏ/cuốc chim, cần câu, bình tưới, liềm cắt cỏ, dụng cụ chăn nuôi và các thần binh huyền thoại.'
      },
      {
        category: 'crops',
        title: '🌾 Nông Sản & Cây Trồng Các Mùa',
        desc: 'Tất cả các loại rau củ quả gieo trồng 4 mùa Xuân, Hạ, Thu, Đông (1.6) và cây đa mùa trong Nhà Kính.'
      },
      {
        category: 'fruits',
        title: '🍎 Trái Cây & Vườn Cây Ăn Quả',
        desc: 'Các loại quả ngọt mọng nước từ vườn cây ăn quả thung lũng, quả mọng hoang dã và trái cây nhiệt đới Đảo Gừng.'
      },
      {
        category: 'fish',
        title: '🐟 Các Loại Cá & Thủy Sản Toàn Diện',
        desc: 'Cá biển đại dương, cá sông suối, cá hồ núi, cá hang sâu mỏ quặng, cá huyền thoại tối thượng và hải sản bẫy lồng.'
      },
      {
        category: 'minerals',
        title: '💎 Khoáng Sản, Đá Quý & Quặng Kim Loại',
        desc: 'Mảnh lăng kính Prismatic Shard, kim cương, hồng ngọc, ngọc bích, khoáng thạch hầm mỏ và các loại quặng luyện kim.'
      },
      {
        category: 'animal_products',
        title: '🥚 Sản Phẩm Động Vật & Chăn Nuôi',
        desc: 'Các loại trứng gà, trứng vịt, trứng khủng long, sữa tươi, phô mai, lông cừu và nấm cục Truffle siêu đắt giá.'
      },
      {
        category: 'forage',
        title: '🍄 Thu Nhặt Hoang Dã & Thảo Dược Thiên Nhiên',
        desc: 'Rau rừng, nấm quý mộc hương, thảo mộc 4 mùa và các loại vỏ ốc, san hô dọc bờ biển triều cường.'
      },
      {
        category: 'artifacts',
        title: '🏺 Cổ Vật, Di Vật & Hóa Thạch Tiền Sử',
        desc: 'Những món đồ khảo cổ kỳ bí được chôn vùi dưới lòng đất hàng triệu năm để hoàn thành bảo tàng Gunther.'
      }
    ];

    let filtered = this.items.filter(it => {
      // Category filter
      if (this.itemFilter !== 'all' && it.category !== this.itemFilter) return false;

      // Quick Toggles
      if (this.showOnlyV16 && !it.version16) return false;
      if (this.showOnlyBuffs && (it.energy === null || it.energy <= 0) && (!it.buffs || it.buffs.length === 0)) return false;

      // Search query
      if (this.searchQuery) {
        const q = this.searchQuery;
        const matchName = it.name.toLowerCase().includes(q);
        const matchEn = it.nameEn.toLowerCase().includes(q);
        const matchSub = it.subCategory?.toLowerCase().includes(q);
        const matchLoc = it.location?.toLowerCase().includes(q);
        const matchDesc = it.desc?.toLowerCase().includes(q);
        const matchTips = it.tips?.toLowerCase().includes(q);
        const matchLoved = it.lovedBy?.some(npc => npc.toLowerCase().includes(q));
        const matchUsed = it.usedIn?.some(u => u.toLowerCase().includes(q));
        return matchName || matchEn || matchSub || matchLoc || matchDesc || matchTips || matchLoved || matchUsed;
      }

      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 60px 20px; color: #fff;">
          <div style="font-size: 3rem; margin-bottom: 12px;">🔍</div>
          <h3 style="font-family: var(--font-heading); font-size: 1.4rem;">Không tìm thấy vật phẩm nào khớp với tìm kiếm!</h3>
          <p style="color: #f7edd2; margin-top: 6px;">Hãy thử tìm từ khóa khác (VD: Rìu, Cuốc, Cá huyền thoại, Kim cương, Dâu tây, 1.6...)</p>
        </div>
      `;
      return;
    }

    let html = '';
    GROUPS.forEach(grp => {
      const groupItems = filtered.filter(it => it.category === grp.category);
      if (groupItems.length === 0) return;

      const icon = grp.title.slice(0, 2);
      const heading = grp.title.slice(2).trim();

      html += `
        <div class="item-group-section" id="group-${grp.category}">
          <div class="item-group-header">
            <div class="item-group-title-row">
              <div class="item-group-title-left">
                <span class="item-group-icon">${icon}</span>
                <h3 class="item-group-heading">${heading}</h3>
              </div>
              <span class="item-group-badge">${groupItems.length} vật phẩm</span>
            </div>
            <p class="item-group-desc">${grp.desc}</p>
          </div>
          <div class="content-grid">
            ${groupItems.map(it => this.createItemCardHtml(it)).join('')}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    // Attach card click handlers
    container.querySelectorAll('.item-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        this.openDetailModal(id, 'item');
        this.playTone('click');
      });
    });

    container.querySelectorAll('.view-detail-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = e.currentTarget.dataset.id;
        this.openDetailModal(id, 'item');
        this.playTone('click');
      });
    });
  }

  createItemCardHtml(it) {
    return `
      <div class="stardew-card item-card" data-id="${it.id}" style="cursor: pointer;">
        <div class="card-header">
          <div class="card-icon-title">
            <div class="item-icon-box">
              <img src="${it.imageUrl}" alt="${it.name}" class="pixel-art-icon" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📦</text></svg>';">
            </div>
            <div class="item-name-group">
              <div class="item-title">${it.name}</div>
              <div class="item-sub">
                ${it.nameEn}
                ${it.version16 ? '<span class="v16-badge" style="margin-left: 4px;">1.6 Mới</span>' : ''}
              </div>
            </div>
          </div>
        </div>

        <div class="card-body">
          <div class="item-meta-badges">
            <span class="recipe-sub-pill">${it.subCategory}</span>
            ${it.season ? `<span class="item-season-badge">🗓️ ${it.season}</span>` : ''}
            <span class="item-stat-pill stat-price-pill">
              🪙 ${it.sellPrice > 0 ? it.sellPrice.toLocaleString() + 'g' : 'Không bán'}
            </span>
            ${it.energy !== null && it.energy > 0 ? `
              <span class="item-stat-pill stat-energy-pill">
                ⚡ +${it.energy}
              </span>
            ` : ''}
          </div>

          <p class="recipe-desc" style="font-size: 0.92rem; line-height: 1.45; margin-bottom: 8px;">
            ${it.desc}
          </p>

          <div class="item-info-row">
            <span class="row-icon">📍</span>
            <span style="font-size: 0.85rem; color: #5d4037;"><strong>Tìm thấy:</strong> ${it.location}</span>
          </div>

          ${it.lovedBy && it.lovedBy.length > 0 ? `
            <div class="item-info-row">
              <span class="row-icon">❤️</span>
              <span style="font-size: 0.85rem; color: #c0392b;"><strong>Thích:</strong> ${it.lovedBy.slice(0, 3).join(', ')}${it.lovedBy.length > 3 ? ` (+${it.lovedBy.length - 3})` : ''}</span>
            </div>
          ` : ''}

          ${it.usedIn && it.usedIn.length > 0 ? `
            <div class="item-info-row">
              <span class="row-icon">🍳</span>
              <span style="font-size: 0.85rem; color: #27ae60;"><strong>Dùng:</strong> ${it.usedIn[0]}</span>
            </div>
          ` : ''}
        </div>

        <div class="card-footer" style="margin-top: auto; padding: 12px 18px; border-top: 1px dashed var(--parchment-border); display: flex; justify-content: flex-end;">
          <button class="view-detail-btn" data-id="${it.id}">
            🔍 Xem Chi Tiết
          </button>
        </div>
      </div>
    `;
  }

  // ==========================================
  // NPC RENDERING & REALTIME SIMULATOR
  // ==========================================
  parseScheduleTime(timeStr) {
    if (!timeStr) return 0;
    const match = timeStr.trim().match(/(\d+):?(\d*)\s*(AM|PM)/i);
    if (!match) return 0;
    let hour = parseInt(match[1], 10);
    const min = match[2] ? parseInt(match[2], 10) / 60 : 0;
    const isPM = match[3].toUpperCase() === 'PM';
    if (isPM && hour < 12) hour += 12;
    if (!isPM && hour === 12) hour = 0;
    if (hour < 6) hour += 24; // Handle 12am-2am late night
    return hour + min;
  }

  formatSimHour(hour) {
    let displayHour = Math.floor(hour);
    let min = Math.round((hour - displayHour) * 60);
    let minStr = min < 10 ? '0' + min : '' + min;

    let period = 'AM';
    let h12 = displayHour;
    if (h12 >= 24) {
      h12 -= 24;
      period = 'AM';
    } else if (h12 >= 12) {
      if (h12 > 12) h12 -= 12;
      period = 'PM';
    }
    let h12Str = h12 < 10 ? '0' + h12 : '' + h12;
    if (h12 === 0) h12Str = '12';

    let phase = '';
    if (hour < 12) phase = 'Buổi Sáng';
    else if (hour < 14) phase = 'Buổi Trưa';
    else if (hour < 18) phase = 'Buổi Chiều';
    else if (hour < 22) phase = 'Buổi Tối';
    else phase = 'Đêm Muộn';

    return `${h12Str}:${minStr} ${period} (${phase})`;
  }

  setSimDay(day) {
    day = Math.max(1, Math.min(28, day));
    this.simDay = day;
    this.updateSimDateDisplay();
    this.render();
  }

  getSimDayOfWeek(day = this.simDay) {
    return (day - 1) % 7; // 0: Thứ Hai, ..., 5: Thứ Bảy, 6: Chủ Nhật
  }

  getSimDayName(day = this.simDay) {
    const names = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'];
    return names[this.getSimDayOfWeek(day)];
  }

  getSimDayKey(day = this.simDay) {
    const keys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    return keys[this.getSimDayOfWeek(day)];
  }

  renderCalendarGrid(force = false) {
    const grid = document.getElementById('stardewCalendarGrid');
    if (!grid) return;

    // Fast-path: if already rendered for this season and not forced, only update active highlight
    if (!force && grid.children.length === 28 && grid.dataset.season === this.simSeason) {
      grid.querySelectorAll('.cal-day-cell').forEach(cell => {
        const cellDay = parseInt(cell.dataset.day, 10);
        cell.classList.toggle('active', cellDay === this.simDay);
      });
      return;
    }

    grid.dataset.season = this.simSeason;
    let html = '';

    for (let day = 1; day <= 28; day++) {
      const dowName = this.getSimDayName(day);
      const isActive = (day === this.simDay);

      // Check NPC birthdays in this season
      const bdayNpcs = this.npcs.filter(n => n.birthday && n.birthday.season === this.simSeason && n.birthday.day === day);

      // Check festival event in this season
      const evt = this.calendarEvents[this.simSeason]?.[day];
      const isFest = evt && evt.type === 'festival';
      const hasBday = bdayNpcs.length > 0;

      const classes = ['cal-day-cell'];
      if (isActive) classes.push('active');
      if (hasBday) classes.push('has-bday');
      if (isFest) classes.push('has-fest');

      let tooltipParts = [`Ngày ${day} (${dowName})`];
      if (hasBday) {
        const names = bdayNpcs.map(n => `Sinh nhật ${n.name}`).join(', ');
        tooltipParts.push(`🎂 ${names}`);
      }
      if (isFest) {
        tooltipParts.push(`${evt.icon || '🎉'} ${evt.name}`);
      }

      let contentMarkup = '';
      if (hasBday) {
        bdayNpcs.forEach(n => {
          contentMarkup += `
            <div class="cal-bday-wrap" title="Sinh nhật ${n.name} (${n.nameEn || ''})">
              <img src="${n.avatar}" alt="${n.name}" class="cal-avatar-img" loading="lazy" />
              <span class="cal-cake-badge" title="Sinh nhật">🎂</span>
            </div>
          `;
        });
      }

      if (isFest) {
        contentMarkup += `<span class="cal-fest-badge" title="${evt.name}">${evt.icon || '🎉'}</span>`;
      }

      html += `
        <button class="${classes.join(' ')}"
                data-day="${day}"
                type="button"
                title="${tooltipParts.join(' • ')}"
                aria-label="Ngày ${day} (${dowName})">
          <span class="cal-day-num">${day}</span>
          ${contentMarkup}
        </button>
      `;
    }

    grid.innerHTML = html;

    // Attach click listeners to day cells
    grid.querySelectorAll('.cal-day-cell').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetDay = parseInt(e.currentTarget.dataset.day, 10);
        this.setSimDay(targetDay);
        this.playTone('click');
      });
    });
  }

  updateSimDateDisplay() {
    const simDayTitle = document.getElementById('simDayTitle');
    const simWeekTag = document.getElementById('simWeekTag');
    const simEventBanner = document.getElementById('simEventBanner');
    const simEventIcon = document.getElementById('simEventIcon');
    const simEventText = document.getElementById('simEventText');

    const dowName = this.getSimDayName(this.simDay);
    const weekNum = Math.ceil(this.simDay / 7);

    if (simDayTitle) {
      simDayTitle.textContent = `Ngày ${this.simDay} (${dowName})`;
    }
    if (simWeekTag) {
      simWeekTag.textContent = `Tuần ${weekNum}`;
    }

    // Update active highlight on 4x7 calendar grid
    document.querySelectorAll('#stardewCalendarGrid .cal-day-cell').forEach(cell => {
      const cellDay = parseInt(cell.dataset.day, 10);
      cell.classList.toggle('active', cellDay === this.simDay);
    });

    // Check calendar events and NPC birthdays for current simulated day
    const bdayNpcs = this.npcs.filter(n => n.birthday && n.birthday.season === this.simSeason && n.birthday.day === this.simDay);
    const evt = this.calendarEvents[this.simSeason]?.[this.simDay];

    if (simEventBanner && simEventIcon && simEventText) {
      if (evt && evt.type === 'festival') {
        simEventBanner.style.display = 'flex';
        simEventIcon.textContent = evt.icon || '🎉';
        simEventText.textContent = `${evt.name} - ${evt.time} (${evt.loc}) - ${evt.desc || ''}`;
      } else if (bdayNpcs.length > 0) {
        simEventBanner.style.display = 'flex';
        simEventIcon.textContent = '🎂';
        const names = bdayNpcs.map(n => n.name).join(' & ');
        simEventText.textContent = `Hôm nay là Sinh nhật ${names}! (Tặng quà yêu thích x8 điểm tình bạn ❤️ - 640 điểm)`;
      } else if (evt && evt.type === 'birthday') {
        simEventBanner.style.display = 'flex';
        simEventIcon.textContent = '🎂';
        simEventText.textContent = `Hôm nay là Sinh nhật ${evt.name}! (Tặng quà x8 điểm tình bạn ❤️)`;
      } else {
        simEventBanner.style.display = 'none';
      }
    }
  }

  getNpcLocationAt(npc, targetHour, weather = 'sunny', season = this.simSeason, day = this.simDay) {
    const dayKey = this.getSimDayKey(day);

    let scheduleList = null;
    if (weather === 'rainy' && npc.schedule.rainy && npc.schedule.rainy.length > 0) {
      scheduleList = npc.schedule.rainy;
    } else if (npc.schedule[dayKey] && npc.schedule[dayKey].length > 0) {
      scheduleList = npc.schedule[dayKey];
    } else {
      scheduleList = npc.schedule.sunny || [];
    }
      
    if (!scheduleList || scheduleList.length === 0) {
      return {
        time: 'Cả ngày',
        location: npc.schedule.overview || npc.residence,
        locationShort: npc.residence
      };
    }

    const parsed = scheduleList.map(item => ({
      ...item,
      h: this.parseScheduleTime(item.time)
    })).sort((a, b) => a.h - b.h);

    if (targetHour < parsed[0].h) {
      return {
        time: 'Sáng sớm',
        location: `Ở tại phòng ngủ nghỉ ngơi (${npc.residence})`,
        locationShort: 'Phòng ngủ / Nhà riêng'
      };
    }

    let current = parsed[0];
    for (const item of parsed) {
      if (item.h <= targetHour) {
        current = item;
      } else {
        break;
      }
    }

    return {
      time: current.time,
      location: current.location,
      locationShort: current.locationShort || current.location
    };
  }

  toggleSimPlay() {
    const playBtn = document.getElementById('simPlayBtn');
    const simTimeSlider = document.getElementById('simTimeSlider');
    const simTimeDisplay = document.getElementById('simTimeDisplay');

    if (this.simPlaying) {
      clearInterval(this.simInterval);
      this.simPlaying = false;
      if (playBtn) {
        playBtn.textContent = '▶️ Chạy Tự Động';
        playBtn.classList.remove('playing');
      }
    } else {
      this.simPlaying = true;
      if (playBtn) {
        playBtn.textContent = '⏸️ Tạm Dừng';
        playBtn.classList.add('playing');
      }
      this.simInterval = setInterval(() => {
        this.simTime += 0.5;
        if (this.simTime > 26) this.simTime = 6;
        if (simTimeSlider) simTimeSlider.value = this.simTime;
        if (simTimeDisplay) simTimeDisplay.textContent = this.formatSimHour(this.simTime);
        document.querySelectorAll('.quick-time-btn').forEach(b => {
          b.classList.toggle('active', Math.abs(parseFloat(b.dataset.time) - this.simTime) < 0.25);
        });
        this.renderNpcs();
      }, 1000);
    }
  }

  renderNpcs() {
    const grid = document.getElementById('npcsGrid');
    if (!grid) return;

    this.renderCalendarGrid();
    this.updateSimDateDisplay();

    const currentHour = this.simTime;
    const weather = this.simWeather;
    const season = this.simSeason;

    let filtered = this.npcs.filter(npc => {
      // Filter by category or birthday season
      if (this.npcFilter !== 'all') {
        if (this.npcFilter === 'bachelorette' && npc.category !== 'bachelorette') return false;
        if (this.npcFilter === 'bachelor' && npc.category !== 'bachelor') return false;
        if (this.npcFilter === 'town' && npc.category !== 'town') return false;
        if (this.npcFilter === 'special' && npc.category !== 'special') return false;
        if (this.npcFilter === 'spring' && npc.birthday.season !== 'spring') return false;
        if (this.npcFilter === 'summer' && npc.birthday.season !== 'summer') return false;
        if (this.npcFilter === 'fall' && npc.birthday.season !== 'fall') return false;
        if (this.npcFilter === 'winter' && npc.birthday.season !== 'winter') return false;
      }

      // Filter by Search Query
      if (this.searchQuery) {
        const q = this.searchQuery;
        const matchName = npc.name.toLowerCase().includes(q) || npc.nameEn.toLowerCase().includes(q);
        const matchGifts = npc.gifts.loved.some(g => g.name.toLowerCase().includes(q));
        const matchLoc = npc.residence.toLowerCase().includes(q) || npc.occupation.toLowerCase().includes(q);
        const matchBday = `${npc.birthday.seasonText} ${npc.birthday.day}`.toLowerCase().includes(q);
        return matchName || matchGifts || matchLoc || matchBday;
      }

      return true;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: #fff;">
          <div style="font-size: 3rem; margin-bottom: 12px;">🔍</div>
          <h3 style="font-family: var(--font-heading); font-size: 1.4rem;">Không tìm thấy Dân Làng / NPC nào phù hợp!</h3>
          <p style="color: #f7edd2; margin-top: 6px;">Hãy thử tìm từ khóa khác hoặc bấm nút 'Tất Cả Dân Làng'.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(npc => this.createNpcCardHtml(npc, currentHour, weather, season)).join('');

    // Attach click events
    grid.querySelectorAll('.npc-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const npcId = e.currentTarget.dataset.id;
        this.openDetailModal(npcId, 'npc');
      });
    });
  }

  createNpcCardHtml(npc, currentHour, weather, season) {
    const curLoc = this.getNpcLocationAt(npc, currentHour, weather, season, this.simDay);
    const categoryLabels = {
      bachelorette: '💍 Độc Thân Nữ',
      bachelor: '🎩 Độc Thân Nam',
      town: '🏡 Dân Làng Pelican',
      special: '✨ Đặc Biệt'
    };

    const isBdayToday = (npc.birthday.season === this.simSeason && npc.birthday.day === this.simDay);
    const dowName = this.getSimDayName(this.simDay);

    return `
      <div class="stardew-card npc-card" data-id="${npc.id}" style="cursor: pointer;">
        <div class="card-header">
          <div class="card-icon-title">
            <div class="npc-portrait-box">
              <img src="${npc.avatar}" alt="${npc.name}" class="npc-portrait-img" onerror="this.src='assets/portraits/abigail.png';">
            </div>
            <div class="item-name-group">
              <div class="item-title" style="font-size: 1.35rem;">${npc.name}</div>
              <div class="item-sub" style="font-size: 0.95rem;">
                ${npc.nameEn}
                <span class="recipe-sub-pill" style="margin-left: 6px; font-size: 0.75rem;">${categoryLabels[npc.category] || npc.categoryTitle}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="card-body">
          <div class="item-meta-badges" style="margin-bottom: 10px; display: flex; flex-wrap: wrap; gap: 6px; align-items: center;">
            ${isBdayToday ? `
              <span class="birthday-live-badge">
                🎂 HÔM NAY SINH NHẬT! (+x8 Tim)
              </span>
            ` : `
              <span class="npc-bday-badge">
                🎂 ${npc.birthday.seasonText} Ngày ${npc.birthday.day}
              </span>
            `}
            <span class="recipe-sub-pill" style="background: #eef2f7; color: #2c3e50; border-color: #cbd5e0;">
              📍 ${npc.residence.split('(')[0].trim()}
            </span>
          </div>

          <!-- Live Realtime Location -->
          <div class="npc-live-loc-banner">
            <div class="live-dot-pulse"></div>
            <div class="live-loc-content">
              <div class="live-time-tag">${dowName} • ${curLoc.time} (${curLoc.locationShort}):</div>
              <div class="live-loc-desc">${curLoc.location}</div>
            </div>
          </div>

          <!-- Loved Gifts Preview -->
          <div class="npc-gifts-section">
            <div class="npc-gift-header">
              <span style="color: #c0392b;">❤️ Quà Cực Thích (+80đ):</span>
            </div>
            <div class="gift-pills-list">
              ${npc.gifts.loved.slice(0, 4).map(g => `
                <span class="gift-pill" title="${g.name}">
                  ${g.icon ? `<img src="${g.icon}" class="gift-pill-icon" alt="" onerror="this.style.display='none';">` : '🎁'}
                  <span>${g.name.split('(')[0].trim()}</span>
                </span>
              `).join('')}
              ${npc.gifts.loved.length > 4 ? `
                <span class="gift-pill" style="color: var(--wood-light); font-weight: bold;">+${npc.gifts.loved.length - 4}</span>
              ` : ''}
            </div>
          </div>

          <p class="recipe-desc" style="font-size: 0.92rem; line-height: 1.45; margin-top: 6px; margin-bottom: 0;">
            ${npc.desc}
          </p>
        </div>

        <div class="card-footer" style="margin-top: auto; padding: 10px 16px; border-top: 1px dashed var(--parchment-border); display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 0.85rem; color: var(--wood-light); font-weight: bold;">
            ${npc.marriageable ? '💍 Có Thể Kết Hôn' : '🤝 Bạn Bè'}
          </span>
          <button class="view-detail-btn" data-id="${npc.id}" style="padding: 4px 12px; font-size: 0.9rem;">
            📜 Lịch Trình & Sự Kiện
          </button>
        </div>
      </div>
    `;
  }

  renderQuests() {
    const grid = document.getElementById('questsGrid');
    if (!grid) return;

    let filtered = this.quests.filter(q => {
      // Category Filter
      if (this.questFilter !== 'all') {
        if (this.questFilter === 'story' && q.category !== 'story') return false;
        if (this.questFilter === 'secret_hidden' && q.category !== 'secret_hidden') return false;
        if (this.questFilter === 'ginger_island' && q.category !== 'ginger_island') return false;
        if (this.questFilter === 'special_orders' && q.category !== 'special_orders') return false;
        if (this.questFilter === 'version16' && q.category !== 'version16') return false;
      }

      // Quick Toggles
      if (this.showOnlyV16 && !q.version16) return false;
      if (this.showOnlyUnfinished && this.completedQuests.has(q.id)) return false;

      // Search Query
      if (this.searchQuery) {
        const query = this.searchQuery;
        const matchName = q.name.toLowerCase().includes(query);
        const matchEn = q.nameEn.toLowerCase().includes(query);
        const matchGiver = q.giver.toLowerCase().includes(query);
        const matchDesc = q.desc.toLowerCase().includes(query);
        const matchReward = q.reward.toLowerCase().includes(query);
        const matchSteps = q.steps.some(s => s.toLowerCase().includes(query));
        return matchName || matchEn || matchGiver || matchDesc || matchReward || matchSteps;
      }

      return true;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: #fff;">
          <div style="font-size: 3rem; margin-bottom: 12px;">📜</div>
          <h3 style="font-family: var(--font-heading); font-size: 1.4rem;">Không tìm thấy nhiệm vụ nào!</h3>
          <p style="color: #f7edd2; margin-top: 6px;">Hãy kiểm tra từ khóa hoặc chuyển sang tab nhiệm vụ khác.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(q => {
      const isCompleted = this.completedQuests.has(q.id);
      const isRevealed = this.revealedSpoilers.has(q.id) || !q.hidden;

      return `
        <div class="stardew-card quest-card ${isCompleted ? 'completed' : ''}" data-id="${q.id}">
          <div class="card-header">
            <div class="card-icon-title">
              <div class="item-icon-box">${q.giverIcon || '📜'}</div>
              <div class="item-name-group">
                <div class="item-title">${q.name}</div>
                <div class="item-sub">
                  ${q.nameEn} 
                  ${q.hidden ? '<span style="background: #9b59b6; color: white; padding: 1px 6px; border-radius: 8px; font-size: 0.72rem; font-weight: bold;">Ẩn / Bí Mật</span>' : ''}
                  ${q.version16 ? '<span class="v16-badge">1.6 Mới</span>' : ''}
                </div>
              </div>
            </div>
            <div class="card-actions-top">
              <button class="check-done-btn" data-id="${q.id}" title="${isCompleted ? 'Hủy đánh dấu' : 'Đánh dấu đã hoàn thành'}">✓</button>
            </div>
          </div>

          <div class="card-body">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 0.85rem; color: var(--text-muted);">
                👤 <strong>Giao bởi:</strong> ${q.giver}
              </span>
              ${q.hidden ? `
                <button class="spoiler-toggle-btn" data-id="${q.id}">
                  ${isRevealed ? '👁️ Ẩn Spoilers' : '👁️ Xem Spoilers'}
                </button>
              ` : ''}
            </div>

            <div class="card-desc ${!isRevealed ? 'spoiler-blurred' : ''}">
              ${q.desc}
            </div>

            <div class="quest-steps-box ${!isRevealed ? 'spoiler-blurred' : ''}">
              <div class="section-label">👣 Hướng dẫn từng bước:</div>
              <ol class="quest-steps-list">
                ${q.steps.map(step => `<li>${step}</li>`).join('')}
              </ol>
            </div>

            <div class="quest-reward-banner">
              🎁 <strong>Phần thưởng:</strong> ${q.reward}
            </div>

            <div class="source-tag">
              <strong>🔓 Điều kiện mở khóa:</strong> ${q.unlockCondition}
            </div>
          </div>

          <div class="card-footer">
            <button class="btn-secondary view-detail-btn" data-id="${q.id}" data-type="quest">🔍 Chi Tiết & Mẹo Độc</button>
            <span style="font-size: 0.82rem; color: #7f8c8d;">${isCompleted ? '✅ Đã hoàn thành' : '⏳ Đang thực hiện'}</span>
          </div>
        </div>
      `;
    }).join('');

    // Attach Event Handlers
    grid.querySelectorAll('.check-done-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = e.currentTarget.dataset.id;
        this.toggleQuestDone(id);
      });
    });

    grid.querySelectorAll('.spoiler-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        this.toggleSpoiler(id);
      });
    });

    grid.querySelectorAll('.view-detail-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        this.openDetailModal(id, 'quest');
      });
    });
  }

  // ==========================================
  // DETAIL MODAL DIALOG
  // ==========================================
  openDetailModal(id, type) {
    const modal = document.getElementById('detailModal');
    const modalBody = document.getElementById('modalBody');
    if (!modal || !modalBody) return;

    if (type === 'recipe') {
      const r = this.recipes.find(item => item.id === id);
      if (!r) return;

      modalBody.innerHTML = `
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
          <div style="width: 74px; height: 74px; background: #fff; border: 2.5px solid var(--parchment-border); border-radius: 14px; display: flex; align-items: center; justify-content: center; padding: 6px; overflow: hidden; flex-shrink: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
            ${r.imageUrl ? `
              <img src="${r.imageUrl}" alt="${r.name}" style="width: 100%; height: 100%; object-fit: contain; image-rendering: pixelated; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.25));" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
              <span class="fallback-emoji" style="display: none; font-size: 2.5rem;">${r.icon || '📦'}</span>
            ` : `
              <span class="fallback-emoji" style="font-size: 2.5rem;">${r.icon || '📦'}</span>
            `}
          </div>
          <div>
            <h2 style="font-family: var(--font-heading); color: var(--wood-dark); font-size: 1.8rem; line-height: 1.2;">${r.name}</h2>
            <div style="color: var(--text-muted); font-size: 1rem; margin-top: 2px;">
              ${r.nameEn} • ${r.subCategory}
            </div>
            ${r.nameEn ? `
              <a href="https://stardewvalleywiki.com/${encodeURIComponent(r.nameEn.split('(')[0].trim().replace(/\s+/g, '_'))}" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 4px; font-size: 0.85rem; color: #2980b9; text-decoration: underline; margin-top: 4px; font-weight: 500;">
                🌐 Tra cứu ảnh gốc & Dữ liệu trên Official Wiki ↗
              </a>
            ` : ''}
          </div>
        </div>

        <p style="font-size: 1.05rem; line-height: 1.6; color: #3d2714; margin-bottom: 20px;">
          ${r.desc}
        </p>

        <div style="background: #f7eed8; border: 1.5px solid var(--parchment-border); border-radius: 10px; padding: 16px; margin-bottom: 20px;">
          <h4 style="font-family: var(--font-heading); color: var(--wood-light); font-size: 1.15rem; margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">🌾 Danh sách nguyên liệu cần:</h4>
          <ul class="ingredients-list" style="gap: 8px;">
            ${r.ingredients.map(ing => `
              <li class="ingredient-item" style="padding: 4px 0; border-bottom: 1px dashed rgba(212, 188, 148, 0.4);">
                <div class="ing-left">
                  <div class="ing-icon-wrap" style="width: 28px; height: 28px;">
                    <img src="${ing.iconUrl || 'assets/icons/ing_wood.png'}" alt="${ing.name}" class="ing-icon" onerror="this.parentElement.style.display='none';">
                  </div>
                  <span class="ing-name-text" style="font-size: 1.05rem;">
                    ${ing.name}
                    ${ing.nameEn && !ing.name.toLowerCase().includes(ing.nameEn.toLowerCase()) ? `<small class="ing-sub">(${ing.nameEn})</small>` : ''}
                  </span>
                </div>
                <span class="ing-count" style="font-size: 0.95rem; padding: 2px 10px;">x${ing.count}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        ${r.tips ? `
          <div style="background: #fff8e1; border-left: 4px solid #f39c12; padding: 12px 16px; border-radius: 6px; margin-bottom: 20px;">
            <strong style="color: #d35400;">💡 Mẹo chơi & Tác dụng đặc biệt:</strong>
            <p style="margin-top: 4px; font-size: 0.95rem; color: #5d4037;">${r.tips}</p>
          </div>
        ` : ''}

        <div style="display: flex; gap: 12px; margin-top: 24px;">
          <button class="btn-add-planner" style="padding: 10px 20px; font-size: 1rem;" data-modal-id="${r.id}">
            + Thêm vào Kế Hoạch Chế Tạo
          </button>
        </div>
      `;

      modalBody.querySelector('.btn-add-planner')?.addEventListener('click', () => {
        calculator.addItem(r.id, 1);
        this.playTone('click');
        this.showToast('Đã thêm vào Kế Hoạch Chế Tạo 🎒');
      });

    } else if (type === 'quest') {
      const q = this.quests.find(item => item.id === id);
      if (!q) return;

      modalBody.innerHTML = `
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
          <div style="font-size: 3rem; background: #fff; border: 2px solid var(--parchment-border); border-radius: 14px; width: 70px; height: 70px; display: flex; align-items: center; justify-content: center;">
            ${q.giverIcon || '📜'}
          </div>
          <div>
            <h2 style="font-family: var(--font-heading); color: var(--wood-dark); font-size: 1.8rem; line-height: 1.2;">${q.name}</h2>
            <div style="color: var(--text-muted); font-size: 1rem;">${q.nameEn} • Giao bởi: ${q.giver}</div>
          </div>
        </div>

        <p style="font-size: 1.05rem; line-height: 1.6; color: #3d2714; margin-bottom: 16px;">
          ${q.desc}
        </p>

        <div style="background: #f7eed8; border: 1.5px solid var(--parchment-border); border-radius: 10px; padding: 16px; margin-bottom: 20px;">
          <h4 style="font-family: var(--font-heading); color: var(--wood-light); font-size: 1rem; margin-bottom: 12px;">👣 Hướng dẫn chi tiết từng bước:</h4>
          <ol style="padding-left: 20px; display: flex; flex-direction: column; gap: 8px; font-size: 0.98rem; line-height: 1.5;">
            ${q.steps.map(s => `<li>${s}</li>`).join('')}
          </ol>
        </div>

        <div style="background: #eafaf1; border-left: 4px solid #2ecc71; padding: 12px 16px; border-radius: 6px; margin-bottom: 16px; font-size: 0.95rem; color: #27ae60;">
          🎁 <strong>Phần thưởng:</strong> ${q.reward}
        </div>

        ${q.tips ? `
          <div style="background: #fff8e1; border-left: 4px solid #f39c12; padding: 12px 16px; border-radius: 6px; font-size: 0.95rem; color: #5d4037;">
            💡 <strong>Mẹo chuyên gia:</strong> ${q.tips}
          </div>
        ` : ''}
      `;
    } else if (type === 'item') {
      const it = this.items.find(item => item.id === id);
      if (!it) return;

      const wikiUrlName = it.wikiFile ? it.wikiFile.replace('.png', '') : encodeURIComponent(it.nameEn.split('(')[0].trim().replace(/\s+/g, '_'));

      modalBody.innerHTML = `
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
          <div style="width: 74px; height: 74px; background: #fff; border: 2.5px solid var(--parchment-border); border-radius: 14px; display: flex; align-items: center; justify-content: center; padding: 6px; overflow: hidden; flex-shrink: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
            <img src="${it.imageUrl}" alt="${it.name}" style="width: 100%; height: 100%; object-fit: contain; image-rendering: pixelated; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.25));">
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <h2 style="font-family: var(--font-heading); color: var(--wood-dark); font-size: 1.8rem; line-height: 1.2;">${it.name}</h2>
              ${it.version16 ? '<span class="v16-badge">Bản 1.6 Mới</span>' : ''}
            </div>
            <div style="color: var(--text-muted); font-size: 1rem; margin-top: 2px;">
              ${it.nameEn} • ${it.categoryTitle} • <span style="font-weight: 600; color: var(--wood-light);">${it.subCategory}</span>
            </div>
            <a href="https://stardewvalleywiki.com/${wikiUrlName}" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 4px; font-size: 0.85rem; color: #2980b9; text-decoration: underline; margin-top: 4px; font-weight: 500;">
              🌐 Xem bài viết chi tiết trên Official Stardew Valley Wiki ↗
            </a>
          </div>
        </div>

        <p style="font-size: 1.05rem; line-height: 1.6; color: #3d2714; margin-bottom: 20px;">
          ${it.desc}
        </p>

        <!-- Quick Specs Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 20px;">
          <div style="background: #fdf6e2; border: 1.5px solid var(--parchment-border); border-radius: 8px; padding: 10px 14px;">
            <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">🪙 GIÁ BÁN CƠ BẢN</div>
            <div style="font-size: 1.15rem; font-weight: bold; color: #b7791f; margin-top: 2px;">
              ${it.sellPrice > 0 ? it.sellPrice.toLocaleString() + 'g' : 'Không thể bán'}
            </div>
          </div>
          <div style="background: #e6fffa; border: 1.5px solid #81e6d9; border-radius: 8px; padding: 10px 14px;">
            <div style="font-size: 0.8rem; color: #234e52; font-weight: 600;">⚡ PHỤC HỒI NĂNG LƯỢNG / MÁU</div>
            <div style="font-size: 1.1rem; font-weight: bold; color: #2c7a7b; margin-top: 2px;">
              ${it.energy !== null && it.energy !== 0 ? `⚡ +${it.energy} | ❤️ +${it.health}` : 'Không ăn được'}
            </div>
          </div>
          <div style="background: #ebf8ff; border: 1.5px solid #bee3f8; border-radius: 8px; padding: 10px 14px;">
            <div style="font-size: 0.8rem; color: #2b6cb0; font-weight: 600;">🌸 MÙA VỤ XUẤT HIỆN</div>
            <div style="font-size: 1rem; font-weight: bold; color: #2b6cb0; margin-top: 2px;">
              ${it.season || 'Quanh năm'}
            </div>
          </div>
        </div>

        <!-- Location / How to Get -->
        <div style="background: #f7eed8; border: 1.5px solid var(--parchment-border); border-radius: 10px; padding: 14px 16px; margin-bottom: 16px;">
          <h4 style="font-family: var(--font-heading); color: var(--wood-light); font-size: 1rem; margin-bottom: 6px;">📍 Nơi tìm thấy & Cách thu hoạch:</h4>
          <p style="font-size: 0.96rem; color: var(--text-main); line-height: 1.5;">${it.location}</p>
        </div>

        <!-- Loved by Gifts -->
        ${it.lovedBy && it.lovedBy.length > 0 ? `
          <div style="background: #fff5f5; border: 1.5px solid #feb2b2; border-radius: 10px; padding: 14px 16px; margin-bottom: 16px;">
            <h4 style="font-family: var(--font-heading); color: #c53030; font-size: 1rem; margin-bottom: 6px;">❤️ Món quà yêu thích tuyệt đối của:</h4>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              ${it.lovedBy.map(npc => `<span style="background: #fed7d7; color: #9b2c2c; padding: 3px 10px; border-radius: 12px; font-weight: 600; font-size: 0.88rem;">${npc}</span>`).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Used in Recipes & Bundles -->
        ${it.usedIn && it.usedIn.length > 0 ? `
          <div style="background: #f0fff4; border: 1.5px solid #9ae6b4; border-radius: 10px; padding: 14px 16px; margin-bottom: 16px;">
            <h4 style="font-family: var(--font-heading); color: #22543d; font-size: 1rem; margin-bottom: 6px;">🍳 Dùng trong công thức & Mục đích:</h4>
            <ul style="padding-left: 20px; font-size: 0.95rem; line-height: 1.5; color: #276749;">
              ${it.usedIn.map(u => `<li>${u}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        <!-- Tips & Strategy -->
        ${it.tips ? `
          <div style="background: #fff8e1; border-left: 4px solid #f39c12; padding: 14px 16px; border-radius: 6px; font-size: 0.95rem; color: #5d4037;">
            💡 <strong>Mẹo chuyên gia & Chiến lược khai thác:</strong>
            <p style="margin-top: 4px; line-height: 1.5;">${it.tips}</p>
          </div>
        ` : ''}
      `;
    } else if (type === 'npc') {
      const npc = this.npcs.find(item => item.id === id);
      if (!npc) return;

      const categoryLabels = {
        bachelorette: '💍 Độc Thân Nữ (Có thể kết hôn)',
        bachelor: '🎩 Độc Thân Nam (Có thể kết hôn)',
        town: '🏡 Dân Làng Pelican',
        special: '✨ Nhân Vật Đặc Biệt'
      };

      const dowName = this.getSimDayName(this.simDay);
      const curLoc = this.getNpcLocationAt(npc, this.simTime, this.simWeather, this.simSeason, this.simDay);

      modalBody.innerHTML = `
        <div style="display: flex; align-items: center; gap: 18px; margin-bottom: 20px;">
          <div class="npc-portrait-box" style="width: 84px; height: 84px; border-width: 3px;">
            <img src="${npc.avatar}" alt="${npc.name}" class="npc-portrait-img" onerror="this.src='assets/portraits/abigail.png';">
          </div>
          <div>
            <h2 style="font-family: var(--font-heading); color: var(--wood-dark); font-size: 1.85rem; line-height: 1.2;">
              ${npc.name}
            </h2>
            <div style="color: var(--text-muted); font-size: 1.05rem; margin-top: 2px;">
              ${npc.nameEn} • <span class="recipe-sub-pill">${categoryLabels[npc.category] || npc.categoryTitle}</span>
            </div>
            <a href="https://stardewvalleywiki.com/${encodeURIComponent(npc.nameEn.split('(')[0].trim().replace(/\s+/g, '_'))}" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 4px; font-size: 0.85rem; color: #2980b9; text-decoration: underline; margin-top: 4px; font-weight: 500;">
              🌐 Xem trang bách khoa chính thức trên Official Wiki ↗
            </a>
          </div>
        </div>

        <p style="font-size: 1.05rem; line-height: 1.6; color: #3d2714; margin-bottom: 18px;">
          ${npc.desc}
        </p>

        <!-- Profile Quick Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 10px; margin-bottom: 18px;">
          <div style="background: #fff8e1; border: 1.5px solid #f39c12; border-radius: 8px; padding: 10px 14px;">
            <div style="font-size: 0.8rem; color: #d35400; font-weight: 700;">🎂 SINH NHẬT</div>
            <div style="font-size: 1.05rem; font-weight: bold; color: var(--wood-dark); margin-top: 2px;">
              ${npc.birthday.seasonText} Ngày ${npc.birthday.day}
            </div>
          </div>
          <div style="background: #eef2f7; border: 1.5px solid #cbd5e0; border-radius: 8px; padding: 10px 14px;">
            <div style="font-size: 0.8rem; color: #2c3e50; font-weight: 700;">🏡 NƠI CƯ NGỤ</div>
            <div style="font-size: 1rem; font-weight: bold; color: var(--wood-dark); margin-top: 2px;">
              ${npc.residence}
            </div>
          </div>
          <div style="background: #f0fff4; border: 1.5px solid #9ae6b4; border-radius: 8px; padding: 10px 14px;">
            <div style="font-size: 0.8rem; color: #22543d; font-weight: 700;">💼 NGHỀ NGHIỆP / VAI TRÒ</div>
            <div style="font-size: 0.95rem; font-weight: bold; color: #276749; margin-top: 2px;">
              ${npc.occupation}
            </div>
          </div>
        </div>

        <!-- Live Status Right Now -->
        <div style="background: #fdfaf3; border: 2px solid #27ae60; border-radius: 10px; padding: 12px 16px; margin-bottom: 20px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <div class="live-dot-pulse"></div>
            <strong style="color: #1e8449; font-size: 0.95rem;">VỊ TRÍ THEO THỜI ĐIỂM CHỌN (${dowName}, Ngày ${this.simDay} - ${this.formatSimHour(this.simTime)}):</strong>
          </div>
          <div style="font-size: 1rem; color: var(--text-main); font-weight: bold;">
            📍 ${curLoc.locationShort}
          </div>
          <div style="font-size: 0.92rem; color: #555; margin-top: 2px;">
            ${curLoc.location}
          </div>
        </div>

        <!-- Gift Preferences Section -->
        <div style="background: #fdf6e2; border: 1.5px solid var(--parchment-border); border-radius: 10px; padding: 16px; margin-bottom: 20px;">
          <h3 style="font-family: var(--font-heading); color: var(--wood-dark); font-size: 1.2rem; margin-bottom: 12px;">🎁 Sở Thích Tặng Quà & Điểm Tình Bạn:</h3>

          <!-- Loved Gifts -->
          <div style="margin-bottom: 12px;">
            <div style="font-weight: 700; color: #c0392b; font-size: 0.95rem; margin-bottom: 6px;">
              ❤️ Cực kỳ yêu thích (+80 điểm tình bạn):
            </div>
            <div class="gift-pills-list">
              ${npc.gifts.loved.map(g => `
                <span class="gift-pill" style="border-color: #f5b7b1;">
                  ${g.icon ? `<img src="${g.icon}" class="gift-pill-icon" alt="" onerror="this.style.display='none';">` : '🎁'}
                  <span>${g.name}</span>
                </span>
              `).join('')}
            </div>
          </div>

          <!-- Liked Gifts -->
          ${npc.gifts.liked && npc.gifts.liked.length > 0 ? `
            <div style="margin-bottom: 12px;">
              <div style="font-weight: 700; color: #27ae60; font-size: 0.95rem; margin-bottom: 6px;">
                👍 Thích (+45 điểm tình bạn):
              </div>
              <div class="gift-pills-list">
                ${npc.gifts.liked.map(g => `
                  <span class="gift-pill" style="border-color: #a9dfbf;">
                    ${g.icon ? `<img src="${g.icon}" class="gift-pill-icon" alt="" onerror="this.style.display='none';">` : '👍'}
                    <span>${g.name}</span>
                  </span>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Disliked Gifts -->
          ${npc.gifts.disliked && npc.gifts.disliked.length > 0 ? `
            <div style="margin-bottom: 10px;">
              <div style="font-weight: 700; color: #d35400; font-size: 0.95rem; margin-bottom: 6px;">
                👎 Không thích (-20 điểm tình bạn):
              </div>
              <div class="gift-pills-list">
                ${npc.gifts.disliked.map(g => `
                  <span class="gift-pill" style="background: #fef9e7; color: #7f8c8d;">
                    <span>${g.name}</span>
                  </span>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Hated Gifts -->
          ${npc.gifts.hated && npc.gifts.hated.length > 0 ? `
            <div>
              <div style="font-weight: 700; color: #7f1d1d; font-size: 0.95rem; margin-bottom: 6px;">
                ❌ Ghét cay ghét đắng (-40 điểm tình bạn - Tuyệt đối không tặng!):
              </div>
              <div class="gift-pills-list">
                ${npc.gifts.hated.map(g => `
                  <span class="gift-pill" style="background: #fee2e2; color: #991b1b; border-color: #fca5a5;">
                    <span>${g.name}</span>
                  </span>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Full Daily Schedule -->
        <div style="background: #fff; border: 1.5px solid var(--parchment-border); border-radius: 10px; padding: 16px; margin-bottom: 20px;">
          <h3 style="font-family: var(--font-heading); color: var(--wood-dark); font-size: 1.2rem; margin-bottom: 6px;">⏰ Lịch Trình Di Chuyển Cụ Thể (Daily Schedule):</h3>
          <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 14px;">${npc.schedule.overview || 'Lịch trình di chuyển theo từng mốc thời gian trong ngày:'}</p>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
            <!-- Sunny Schedule -->
            <div style="background: #fffdf9; border: 1px solid var(--parchment-border); border-radius: 8px; padding: 12px;">
              <div style="font-weight: 700; color: #b7791f; font-size: 0.95rem; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
                <span>☀️</span> Lịch Trình Ngày Thường (Trời Nắng)
              </div>
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; font-size: 0.9rem;">
                ${(npc.schedule.sunny || []).map(s => `
                  <li style="border-bottom: 1px dashed rgba(212, 188, 148, 0.4); padding-bottom: 6px;">
                    <strong style="color: var(--wood-dark);">${s.time}:</strong> ${s.location}
                  </li>
                `).join('')}
              </ul>
            </div>

            <!-- Rainy Schedule -->
            <div style="background: #f0f7ff; border: 1px solid #c3dafe; border-radius: 8px; padding: 12px;">
              <div style="font-weight: 700; color: #2b6cb0; font-size: 0.95rem; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
                <span>🌧️</span> Lịch Trình Ngày Mưa (Rainy Days)
              </div>
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; font-size: 0.9rem;">
                ${(npc.schedule.rainy || []).map(s => `
                  <li style="border-bottom: 1px dashed #bee3f8; padding-bottom: 6px;">
                    <strong style="color: #2c5282;">${s.time}:</strong> ${s.location}
                  </li>
                `).join('')}
              </ul>
            </div>

            <!-- Day of Week Specific Schedules (Saturday, Sunday, Friday, Tuesday, etc.) -->
            ${[
              { key: 'saturday', title: '🎣 Lịch Trình Thứ Bảy (Cuối Tuần)', bg: '#fef9e7', border: '#f9e79f', text: '#b7950b' },
              { key: 'sunday', title: '☀️ Lịch Trình Chủ Nhật', bg: '#fefde8', border: '#fef08a', text: '#a16207' },
              { key: 'friday', title: '🍻 Lịch Trình Tối Thứ Sáu (Saloon Night)', bg: '#f5f3ff', border: '#ddd6fe', text: '#6d28d9' },
              { key: 'tuesday', title: '🏃‍♀️ Lịch Trình Thứ Ba (Lớp Aerobic / Bác Sĩ)', bg: '#ecfdf5', border: '#a7f3d0', text: '#047857' },
              { key: 'wednesday', title: '📚 Lịch Trình Thứ Tư (Tiệm Nghỉ / Thư Viện)', bg: '#fff7ed', border: '#fed7aa', text: '#c2410c' },
              { key: 'thursday', title: '🩺 Lịch Trình Thứ Năm', bg: '#f0fdfa', border: '#99f6e4', text: '#0f766e' },
              { key: 'monday', title: '🛍️ Lịch Trình Thứ Hai', bg: '#f8fafc', border: '#e2e8f0', text: '#475569' }
            ].filter(d => npc.schedule[d.key] && npc.schedule[d.key].length > 0).map(d => `
              <div style="background: ${d.bg}; border: 1px solid ${d.border}; border-radius: 8px; padding: 12px;">
                <div style="font-weight: 700; color: ${d.text}; font-size: 0.95rem; margin-bottom: 8px;">
                  ${d.title}
                </div>
                <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; font-size: 0.9rem;">
                  ${npc.schedule[d.key].map(s => `
                    <li style="border-bottom: 1px dashed rgba(0,0,0,0.1); padding-bottom: 6px;">
                      <strong style="color: var(--wood-dark);">${s.time}:</strong> ${s.location}
                    </li>
                  `).join('')}
                </ul>
              </div>
            `).join('')}
          </div>

          <!-- Special Schedules -->
          ${npc.schedule.special && npc.schedule.special.length > 0 ? `
            <div style="margin-top: 14px; background: #faf5ff; border: 1px solid #e9d8fd; border-radius: 8px; padding: 12px;">
              <div style="font-weight: 700; color: #6b46c1; font-size: 0.95rem; margin-bottom: 6px;">
                🌟 Các Ngày Đặc Biệt & Ngoại Lệ:
              </div>
              <ul style="padding-left: 20px; font-size: 0.9rem; color: #553c9a; line-height: 1.5;">
                ${npc.schedule.special.map(sp => `
                  <li><strong>${sp.condition}:</strong> ${sp.desc}</li>
                `).join('')}
              </ul>
            </div>
          ` : ''}
        </div>

        <!-- Heart Events Timeline -->
        ${npc.heartEvents && npc.heartEvents.length > 0 ? `
          <div style="background: #fff5f5; border: 1.5px solid #feb2b2; border-radius: 10px; padding: 16px;">
            <h3 style="font-family: var(--font-heading); color: #c53030; font-size: 1.2rem; margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
              <span>💖</span> Chuỗi Sự Kiện Tim Tình Bạn (Heart Events):
            </h3>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${npc.heartEvents.map(he => `
                <div style="background: #fff; border: 1px solid #fecaca; border-radius: 8px; padding: 10px 14px;">
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                    <span style="background: #e11d48; color: #fff; font-weight: 700; font-size: 0.8rem; padding: 2px 8px; border-radius: 12px;">
                      ${he.hearts} TIM
                    </span>
                    <strong style="color: var(--wood-dark); font-size: 0.95rem;">📍 ${he.location}</strong>
                  </div>
                  <p style="font-size: 0.92rem; color: #4a5568; line-height: 1.45; margin: 0;">
                    ${he.desc}
                  </p>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      `;
    }

    modal.classList.add('open');
  }

  // ==========================================
  // PROGRESS & STATS SUMMARY
  // ==========================================
  updateStats() {
    const totalCooking = this.recipes.filter(r => r.category === 'cooking').length;
    const doneCooking = this.recipes.filter(r => r.category === 'cooking' && this.completedRecipes.has(r.id)).length;
    const cookingPercent = Math.round((doneCooking / totalCooking) * 100);

    const totalCrafting = this.recipes.filter(r => r.category === 'crafting').length;
    const doneCrafting = this.recipes.filter(r => r.category === 'crafting' && this.completedRecipes.has(r.id)).length;
    const craftingPercent = Math.round((doneCrafting / totalCrafting) * 100);

    const totalStoryQuests = this.quests.filter(q => q.category === 'story').length;
    const doneStoryQuests = this.quests.filter(q => q.category === 'story' && this.completedQuests.has(q.id)).length;
    const storyPercent = Math.round((doneStoryQuests / totalStoryQuests) * 100);

    const totalHiddenQuests = this.quests.filter(q => q.category !== 'story').length;
    const doneHiddenQuests = this.quests.filter(q => q.category !== 'story' && this.completedQuests.has(q.id)).length;
    const hiddenPercent = Math.round((doneHiddenQuests / totalHiddenQuests) * 100);

    // Update DOM
    const updateEl = (id, val, text, barId, percent) => {
      const valEl = document.getElementById(id);
      if (valEl) valEl.textContent = `${percent}%`;
      const textEl = document.getElementById(`${id}-sub`);
      if (textEl) textEl.textContent = text;
      const barEl = document.getElementById(barId);
      if (barEl) barEl.style.width = `${percent}%`;
    };

    updateEl('cookingStat', cookingPercent, `${doneCooking} / ${totalCooking} món`, 'cookingBar', cookingPercent);
    updateEl('craftingStat', craftingPercent, `${doneCrafting} / ${totalCrafting} đồ`, 'craftingBar', craftingPercent);
    updateEl('storyStat', storyPercent, `${doneStoryQuests} / ${totalStoryQuests} xong`, 'storyBar', storyPercent);
    updateEl('hiddenStat', hiddenPercent, `${doneHiddenQuests} / ${totalHiddenQuests} xong`, 'hiddenBar', hiddenPercent);

    // Badges in Header Tabs
    const recipeBadge = document.getElementById('recipeTabBadge');
    if (recipeBadge) recipeBadge.textContent = `${doneCooking + doneCrafting}/${this.recipes.length}`;

    const itemBadge = document.getElementById('itemTabBadge');
    if (itemBadge) itemBadge.textContent = `${this.items.length}`;

    const questBadge = document.getElementById('questTabBadge');
    if (questBadge) questBadge.textContent = `${doneStoryQuests + doneHiddenQuests}/${this.quests.length}`;
  }

  // ==========================================
  // TOAST NOTIFICATIONS
  // ==========================================
  showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>✨</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  // ==========================================
  // EXPORT / IMPORT PROGRESS
  // ==========================================
  exportProgress() {
    const backup = {
      completedRecipes: Array.from(this.completedRecipes),
      completedQuests: Array.from(this.completedQuests),
      plannedItems: calculator.plannedItems,
      date: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stardew_wiki_progress_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('Đã tải xuống file sao lưu tiến độ!');
  }
}

// Instantiate and initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new StardewWikiApp();
  app.init();
  window.app = app;
});
