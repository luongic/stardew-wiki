// ==========================================================================
// TAB: TỪ ĐIỂN VẬT PHẨM (ITEMS ENCYCLOPEDIA, GROUPED BY CATEGORY)
// ==========================================================================

import { altName } from '../lib/i18n.js';
import { ITEMS_DATA } from '../../data/items-data.js';
import { emptyState, v16Badge, wikiLink, modalHeader, matches, signed } from '../lib/templates.js';
import { ico } from '../lib/icons.js';

const itemById = new Map(ITEMS_DATA.map(it => [it.id, it]));
const PLACEHOLDER = 'assets/pixel-box.svg';

const GROUPS = [
  { category: 'tools', icon: 'tools', title: 'Công Cụ Lao Động, Khai Thác & Vũ Khí',
    desc: 'Búa, rìu, cuốc đất, xẻng mỏ/cuốc chim, cần câu, bình tưới, liềm cắt cỏ, dụng cụ chăn nuôi và các thần binh huyền thoại.' },
  { category: 'crops', icon: 'crops', title: 'Nông Sản & Cây Trồng Các Mùa',
    desc: 'Tất cả các loại rau củ quả và hoa gieo trồng 4 mùa Xuân, Hạ, Thu, Đông (1.6) và cây đa mùa trong Nhà Kính.' },
  { category: 'seeds', icon: 'seeds', title: 'Hạt Giống & Cây Non',
    desc: 'Hạt giống từng mùa, hạt hỗn hợp, cây ăn quả non và hạt của các loại cây rừng.' },
  { category: 'fruits', icon: 'fruits', title: 'Trái Cây & Vườn Cây Ăn Quả',
    desc: 'Các loại quả ngọt mọng nước từ vườn cây ăn quả thung lũng, quả mọng hoang dã và trái cây nhiệt đới Đảo Gừng.' },
  { category: 'forage', icon: 'forage', title: 'Thu Nhặt Hoang Dã & Thảo Dược Thiên Nhiên',
    desc: 'Rau rừng, nấm, thảo mộc 4 mùa, tảo và các loại vỏ ốc, san hô dọc bờ biển.' },
  { category: 'fish', icon: 'fish', title: 'Các Loại Cá & Thủy Sản Toàn Diện',
    desc: 'Cá biển đại dương, cá sông suối, cá hồ núi, cá hang sâu mỏ quặng, cá huyền thoại tối thượng và hải sản bẫy lồng.' },
  { category: 'animal_products', icon: 'animal', title: 'Sản Phẩm Động Vật & Chăn Nuôi',
    desc: 'Các loại trứng, sữa, lông cừu, lông vịt, chân thỏ và nấm cục Truffle siêu đắt giá.' },
  { category: 'artisan', icon: 'artisan', title: 'Hàng Thủ Công',
    desc: 'Rượu, nước ép, mứt, dưa muối, phô mai, mật ong, vải và các sản phẩm từ máy móc trên nông trại.' },
  { category: 'minerals', icon: 'minerals', title: 'Khoáng Sản, Đá Quý & Quặng Kim Loại',
    desc: 'Đá quý, khoáng thạch trong hốc tinh (Geode), quặng luyện kim và các khoáng sản cho Bảo Tàng.' },
  { category: 'artifacts', icon: 'artifacts', title: 'Cổ Vật, Di Vật & Hóa Thạch Tiền Sử',
    desc: 'Những món đồ khảo cổ kỳ bí được chôn vùi dưới lòng đất hàng triệu năm để hoàn thành bảo tàng Gunther.' },
  { category: 'resources', icon: 'resources', title: 'Tài Nguyên, Đồ Rơi & Rác',
    desc: 'Gỗ, đá, đất sét, thỏi kim loại, tinh chất, đồ rơi từ quái vật và rác câu được.' },
  { category: 'rings', icon: 'rings', title: 'Nhẫn',
    desc: 'Nhẫn tăng chỉ số, hút đồ, phát sáng và nhẫn hiếm từ Hang Đầu Lâu.' },
  { category: 'books', icon: 'books', title: 'Sách',
    desc: 'Sách kỹ năng và sách mở khoá năng lực vĩnh viễn (bản 1.6), mua ở Người bán sách hoặc tìm thấy trong game.' }
];
const groupByCat = new Map(GROUPS.map(g => [g.category, g]));

const isEdible = it => it.energy !== null && it.energy > 0;
// Negative-edibility items (Pufferfish, Goby...) can be eaten but drain energy
const isHarmful = it => it.energy !== null && it.energy < 0;
const price = it => it.priceText || (it.sellPrice > 0 ? `${it.sellPrice.toLocaleString()}g` : 'Không bán');

function cardHtml(it) {
  return `
    <article class="card card--clickable" role="button" tabindex="0"
             data-action="open-detail" data-type="item" data-id="${it.id}">
      <header class="card__head">
        <div class="card__title-row">
          <div class="icon-box"><img src="${it.imageUrl}" alt="${it.name}" class="pixel-img" data-fallback="${PLACEHOLDER}" loading="lazy"></div>
          <div>
            <h3 class="card__title">${it.name}</h3>
            <div class="card__sub">${altName(it)} ${v16Badge(it.version16)}</div>
          </div>
        </div>
      </header>

      <div class="card__body">
        <div class="pill-row">
          <span class="tag">${it.subCategory}</span>
          ${it.season ? `<span class="tag tag--blue">${ico('season')} ${it.season}</span>` : ''}
          <span class="tag tag--gold">${ico('money')} ${price(it)}</span>
          ${isEdible(it) ? `<span class="tag tag--green">${ico('energy')} +${it.energy}</span>` : ''}
          ${isHarmful(it) ? `<span class="tag tag--red">${ico('energy')} ${it.energy}</span>` : ''}
        </div>

        <p class="card__desc">${it.desc}</p>

        <div class="info-row">${ico('pin')}<span><strong>Tìm thấy:</strong> ${it.location}</span></div>
        ${it.lovedBy?.length ? `
          <div class="info-row info-row--red">${ico('loved')}
            <span><strong>Thích:</strong> ${it.lovedBy.slice(0, 3).join(', ')}${it.lovedBy.length > 3 ? ` (+${it.lovedBy.length - 3})` : ''}</span>
          </div>` : ''}
        ${it.usedIn?.length ? `
          <div class="info-row info-row--green">${ico('uses')}<span><strong>Dùng:</strong> ${it.usedIn[0]}</span></div>` : ''}
      </div>

      <footer class="card__foot card__foot--end">
        <span class="btn btn--ghost btn--sm" aria-hidden="true">${ico('search')} Xem Chi Tiết</span>
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
      container.innerHTML = emptyState('search', 'Không tìm thấy vật phẩm nào khớp với tìm kiếm!',
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
              <h3 class="group__title">${ico(grp.icon)} ${grp.title}</h3>
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
        sub: `${altName(it)} • <span>${groupByCat.get(it.category)?.title || ''}</span> • <b>${it.subCategory}</b>`,
        extra: wikiLink(it.nameEn, 'Xem bài viết chi tiết trên Official Stardew Valley Wiki', page)
      })}
      <p class="detail-lead">${it.desc}</p>

      <div class="spec-grid">
        <div class="spec spec--gold">
          <div class="spec__label">${ico('money')} GIÁ BÁN CƠ BẢN</div>
          <div class="spec__value">${it.priceText || (it.sellPrice > 0 ? `${it.sellPrice.toLocaleString()}g` : 'Không thể bán')}</div>
        </div>
        <div class="spec spec--teal">
          <div class="spec__label">${ico('energy')} PHỤC HỒI NĂNG LƯỢNG / MÁU</div>
          <div class="spec__value">${it.energy !== null && it.energy !== 0 ? `${ico('energy')} ${signed(it.energy)} | ${ico('health')} ${signed(it.health)}` : 'Không ăn được'}</div>
        </div>
        <div class="spec spec--blue">
          <div class="spec__label">${ico('season')} MÙA VỤ XUẤT HIỆN</div>
          <div class="spec__value">${it.season || 'Quanh năm'}</div>
        </div>
      </div>

      <div class="inset-box">
        <h4 class="inset-box__title">${ico('pin')} Nơi tìm thấy & Cách thu hoạch:</h4>
        <p>${it.location}</p>
      </div>

      ${it.lovedBy?.length ? `
        <div class="callout callout--red">
          <h4 class="callout__title">${ico('loved')} Món quà yêu thích tuyệt đối của:</h4>
          <div class="pill-row">${it.lovedBy.map(n => `<span class="tag tag--red">${n}</span>`).join('')}</div>
        </div>` : ''}

      ${it.usedIn?.length ? `
        <div class="callout callout--green">
          <h4 class="callout__title">${ico('uses')} Dùng trong công thức & Mục đích:</h4>
          <ul class="bullet-list">${it.usedIn.map(u => `<li>${u}</li>`).join('')}</ul>
        </div>` : ''}

      ${it.tips ? `
        <div class="callout callout--tip">
          <strong>${ico('tip')} Mẹo chuyên gia & Chiến lược khai thác:</strong>
          <p>${it.tips}</p>
        </div>` : ''}`;
  }
};
