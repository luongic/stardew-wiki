// ==========================================================================
// STARDEW VALLEY WIKI - MAIN CONTROLLER APPLICATION
// ==========================================================================

import { RECIPES_DATA } from '../data/recipes-data.js';
import { QUESTS_DATA } from '../data/quests-data.js';
import { ITEMS_DATA } from '../data/items-data.js';
import { calculator } from './calculator.js';

class StardewWikiApp {
  constructor() {
    this.recipes = RECIPES_DATA;
    this.quests = QUESTS_DATA;
    this.items = ITEMS_DATA;
    
    this.currentTab = 'recipes';
    this.recipeFilter = 'all';
    this.questFilter = 'all';
    this.itemFilter = 'all';
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
    const toolbar = document.getElementById('toolbarPanel');

    if (tab === 'recipes') {
      if (toolbar) toolbar.style.display = 'block';
      if (recipeFilters) recipeFilters.style.display = 'flex';
      if (itemFilters) itemFilters.style.display = 'none';
      if (questFilters) questFilters.style.display = 'none';
    } else if (tab === 'items') {
      if (toolbar) toolbar.style.display = 'block';
      if (recipeFilters) recipeFilters.style.display = 'none';
      if (itemFilters) itemFilters.style.display = 'flex';
      if (questFilters) questFilters.style.display = 'none';
    } else if (tab === 'quests') {
      if (toolbar) toolbar.style.display = 'block';
      if (recipeFilters) recipeFilters.style.display = 'none';
      if (itemFilters) itemFilters.style.display = 'none';
      if (questFilters) questFilters.style.display = 'flex';
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
                  <img src="${r.imageUrl}" alt="${r.name}" class="pixel-art-icon" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
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
                    <span>${ing.name} <small style="color: #7d654c;">(${ing.nameEn || ''})</small></span>
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
              <img src="${it.imageUrl}" alt="${it.name}" class="pixel-art-icon" loading="lazy" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📦</text></svg>';">
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
          <h4 style="font-family: var(--font-heading); color: var(--wood-light); font-size: 1rem; margin-bottom: 10px;">🌾 Danh sách nguyên liệu cần:</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
            ${r.ingredients.map(ing => `
              <li style="display: flex; justify-content: space-between; font-weight: 500;">
                <span>${ing.name} <small style="color: #6e523b;">(${ing.nameEn || ''})</small></span>
                <span class="ing-count">x${ing.count}</span>
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
