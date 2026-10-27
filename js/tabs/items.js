// ==========================================================================
// TAB: TỪ ĐIỂN VẬT PHẨM (ITEMS ENCYCLOPEDIA, GROUPED BY CATEGORY)
// ==========================================================================

import { ITEMS_DATA } from '../../data/items-data.js';
import { emptyState, v16Badge, wikiLink, modalHeader, matches, signed } from '../lib/templates.js';

const itemById = new Map(ITEMS_DATA.map(it => [it.id, it]));
const PLACEHOLDER = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📦</text></svg>';

const GROUPS = [
  { category: 'tools', icon: '🛠️', title: 'Công Cụ Lao Động, Khai Thác & Vũ Khí',
    desc: 'Búa, rìu, cuốc đất, xẻng mỏ/cuốc chim, cần câu, bình tưới, liềm cắt cỏ, dụng cụ chăn nuôi và các thần binh huyền thoại.' },
  { category: 'crops', icon: '🌾', title: 'Nông Sản & Cây Trồng Các Mùa',
    desc: 'Tất cả các loại rau củ quả gieo trồng 4 mùa Xuân, Hạ, Thu, Đông (1.6) và cây đa mùa trong Nhà Kính.' },
  { category: 'fruits', icon: '🍎', title: 'Trái Cây & Vườn Cây Ăn Quả',
    desc: 'Các loại quả ngọt mọng nước từ vườn cây ăn quả thung lũng, quả mọng hoang dã và trái cây nhiệt đới Đảo Gừng.' },
  { category: 'fish', icon: '🐟', title: 'Các Loại Cá & Thủy Sản Toàn Diện',
    desc: 'Cá biển đại dương, cá sông suối, cá hồ núi, cá hang sâu mỏ quặng, cá huyền thoại tối thượng và hải sản bẫy lồng.' },
  { category: 'minerals', icon: '💎', title: 'Khoáng Sản, Đá Quý & Quặng Kim Loại',
    desc: 'Mảnh lăng kính Prismatic Shard, kim cương, hồng ngọc, ngọc bích, khoáng thạch hầm mỏ và các loại quặng luyện kim.' },
  { category: 'animal_products', icon: '🥚', title: 'Sản Phẩm Động Vật & Chăn Nuôi',
    desc: 'Các loại trứng gà, trứng vịt, trứng khủng long, sữa tươi, phô mai, lông cừu và nấm cục Truffle siêu đắt giá.' },
  { category: 'forage', icon: '🍄', title: 'Thu Nhặt Hoang Dã & Thảo Dược Thiên Nhiên',
    desc: 'Rau rừng, nấm quý mộc hương, thảo mộc 4 mùa và các loại vỏ ốc, san hô dọc bờ biển triều cường.' },
  { category: 'artifacts', icon: '🏺', title: 'Cổ Vật, Di Vật & Hóa Thạch Tiền Sử',
    desc: 'Những món đồ khảo cổ kỳ bí được chôn vùi dưới lòng đất hàng triệu năm để hoàn thành bảo tàng Gunther.' }
];

const isEdible = it => it.energy !== null && it.energy > 0;
// Negative-edibility items (Pufferfish, Goby...) can be eaten but drain energy
const isHarmful = it => it.energy !== null && it.energy < 0;
const price = it => (it.sellPrice > 0 ? `${it.sellPrice.toLocaleString()}g` : 'Không bán');

function cardHtml(it) {
  return `
    <article class="card card--clickable" role="button" tabindex="0"
             data-action="open-detail" data-type="item" data-id="${it.id}">
      <header class="card__head">
        <div class="card__title-row">
          <div class="icon-box"><img src="${it.imageUrl}" alt="${it.name}" class="pixel-img" data-fallback="${PLACEHOLDER}" loading="lazy"></div>
          <div>
            <h3 class="card__title">${it.name}</h3>
            <div class="card__sub">${it.nameEn} ${v16Badge(it.version16)}</div>
          </div>
        </div>
      </header>

      <div class="card__body">
        <div class="pill-row">
          <span class="tag">${it.subCategory}</span>
          ${it.season ? `<span class="tag tag--blue">🗓️ ${it.season}</span>` : ''}
          <span class="tag tag--gold">🪙 ${price(it)}</span>
          ${isEdible(it) ? `<span class="tag tag--green">⚡ +${it.energy}</span>` : ''}
          ${isHarmful(it) ? `<span class="tag tag--red">⚡ ${it.energy}</span>` : ''}
        </div>

        <p class="card__desc">${it.desc}</p>

        <div class="info-row"><span aria-hidden="true">📍</span><span><strong>Tìm thấy:</strong> ${it.location}</span></div>
        ${it.lovedBy?.length ? `
          <div class="info-row info-row--red"><span aria-hidden="true">❤️</span>
            <span><strong>Thích:</strong> ${it.lovedBy.slice(0, 3).join(', ')}${it.lovedBy.length > 3 ? ` (+${it.lovedBy.length - 3})` : ''}</span>
          </div>` : ''}
        ${it.usedIn?.length ? `
          <div class="info-row info-row--green"><span aria-hidden="true">🍳</span><span><strong>Dùng:</strong> ${it.usedIn[0]}</span></div>` : ''}
      </div>

      <footer class="card__foot card__foot--end">
        <span class="btn btn--ghost btn--sm" aria-hidden="true">🔍 Xem Chi Tiết</span>
      </footer>
    </article>`;
}

export default {
  id: 'items',
  detailType: 'item',
  toggles: ['v16', 'buffs'],

  render(app) {
    const container = document.getElementById('itemsContainer');
    const filter = app.filters.items;
    const q = app.searchQuery;

    const list = ITEMS_DATA.filter(it => {
      if (filter !== 'all' && it.category !== filter) return false;
      if (app.toggles.v16 && !it.version16) return false;
      if (app.toggles.buffs && !isEdible(it) && !it.buffs?.length) return false;
      if (q) return matches(q, it.name, it.nameEn, it.subCategory, it.location, it.desc, it.tips, it.lovedBy, it.usedIn);
      return true;
    });

    if (!list.length) {
      container.innerHTML = emptyState('🔍', 'Không tìm thấy vật phẩm nào khớp với tìm kiếm!',
        'Hãy thử tìm từ khóa khác (VD: Rìu, Cuốc, Cá huyền thoại, Kim cương, Dâu tây, 1.6...)');
      return;
    }

    container.innerHTML = GROUPS.map(grp => {
      const items = list.filter(it => it.category === grp.category);
      if (!items.length) return '';
      return `
        <section class="group" id="group-${grp.category}">
          <header class="group__head">
            <div class="group__title-row">
              <h3 class="group__title"><span aria-hidden="true">${grp.icon}</span> ${grp.title}</h3>
              <span class="badge badge--gold">${items.length} vật phẩm</span>
            </div>
            <p class="group__desc">${grp.desc}</p>
          </header>
          <div class="content-grid">${items.map(cardHtml).join('')}</div>
        </section>`;
    }).join('');
  },

  badge() {
    document.getElementById('itemTabBadge').textContent = ITEMS_DATA.length;
  },

  detail(app, id) {
    const it = itemById.get(id);
    if (!it) return '';
    const page = it.wikiFile ? it.wikiFile.replace('.png', '') : undefined;
    return `
      ${modalHeader({
        icon: `<div class="icon-box icon-box--lg"><img src="${it.imageUrl}" alt="${it.name}" class="pixel-img" data-fallback="${PLACEHOLDER}"></div>`,
        title: `${it.name} ${v16Badge(it.version16, 'Bản 1.6 Mới')}`,
        sub: `${it.nameEn} • ${it.categoryTitle} • <b>${it.subCategory}</b>`,
        extra: wikiLink(it.nameEn, 'Xem bài viết chi tiết trên Official Stardew Valley Wiki', page)
      })}
      <p class="detail-lead">${it.desc}</p>

      <div class="spec-grid">
        <div class="spec spec--gold">
          <div class="spec__label">🪙 GIÁ BÁN CƠ BẢN</div>
          <div class="spec__value">${it.sellPrice > 0 ? `${it.sellPrice.toLocaleString()}g` : 'Không thể bán'}</div>
        </div>
        <div class="spec spec--teal">
          <div class="spec__label">⚡ PHỤC HỒI NĂNG LƯỢNG / MÁU</div>
          <div class="spec__value">${it.energy !== null && it.energy !== 0 ? `⚡ ${signed(it.energy)} | ❤️ ${signed(it.health)}` : 'Không ăn được'}</div>
        </div>
        <div class="spec spec--blue">
          <div class="spec__label">🌸 MÙA VỤ XUẤT HIỆN</div>
          <div class="spec__value">${it.season || 'Quanh năm'}</div>
        </div>
      </div>

      <div class="inset-box">
        <h4 class="inset-box__title">📍 Nơi tìm thấy & Cách thu hoạch:</h4>
        <p>${it.location}</p>
      </div>

      ${it.lovedBy?.length ? `
        <div class="callout callout--red">
          <h4 class="callout__title">❤️ Món quà yêu thích tuyệt đối của:</h4>
          <div class="pill-row">${it.lovedBy.map(n => `<span class="tag tag--red">${n}</span>`).join('')}</div>
        </div>` : ''}

      ${it.usedIn?.length ? `
        <div class="callout callout--green">
          <h4 class="callout__title">🍳 Dùng trong công thức & Mục đích:</h4>
          <ul class="bullet-list">${it.usedIn.map(u => `<li>${u}</li>`).join('')}</ul>
        </div>` : ''}

      ${it.tips ? `
        <div class="callout callout--tip">
          <strong>💡 Mẹo chuyên gia & Chiến lược khai thác:</strong>
          <p>${it.tips}</p>
        </div>` : ''}`;
  }
};
