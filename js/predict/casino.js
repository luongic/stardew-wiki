// ==========================================================================
// GUIDE: MR. QI'S CASINO SHOP (Calico Desert)
// Not a prediction: the shop list and prices are fixed. Shown next to
// Calico Jack, the one Casino game whose results can be worked out ahead.
// Items, stock and prices from the Official Stardew Valley Wiki ("Casino",
// "Statue Of Endless Fortune", "Magnet", "Scarecrow"), version 1.6.
// ==========================================================================

import { table } from './core.js';
import { ico } from '../lib/icons.js';
import { t, isEn } from '../lib/i18n.js';

const fmt = n => n.toLocaleString(isEn ? 'en-US' : 'vi-VN');
const A = 'assets/casino/', I = 'assets/icons/';
// stock: null = unlimited
const SHOP = [
  { en: 'Rarecrow #3', vi: 'Bù nhìn hiếm #3', icon: `${I}rarecrow_3.png`, price: 10000, stock: null, pick: true,
    note: 'Bù nhìn hiếm duy nhất chỉ bán ở đây. Gom đủ 8 cái thì nhận công thức Bù nhìn Cao cấp.', noteEn: 'The only place to get this rarecrow. Collect all 8 for the Deluxe Scarecrow recipe.' },
  { en: 'Top Hat', vi: 'Mũ chóp cao', icon: `${A}top_hat.png`, price: 8000, stock: null,
    note: 'Mũ thời trang ("món kinh điển của quý ông").', noteEn: '"A gentleman\'s classic."' },
  { en: 'Modern Double Bed', vi: 'Giường đôi hiện đại', icon: `${A}modern_double_bed.png`, price: 8000, stock: null,
    note: 'Nội thất: giường đôi kiểu hiện đại.', noteEn: 'Furniture: a modern double bed.' },
  { en: "'Primal Motion'", vi: "Tranh 'Primal Motion'", icon: `${A}primal_motion.png`, price: 5000, stock: null, note: 'Tranh treo tường.', noteEn: 'Wall painting.' },
  { en: "'Burnt Offering'", vi: "Tranh 'Burnt Offering'", icon: `${I}burnt_offering.png`, price: 4000, stock: null, note: 'Tranh treo tường.', noteEn: 'Wall painting.' },
  { en: "'Highway 89'", vi: "Tranh 'Highway 89'", icon: `${A}highway_89.png`, price: 4000, stock: null, note: 'Tranh treo tường.', noteEn: 'Wall painting.' },
  { en: "'Spires'", vi: "Tranh 'Spires'", icon: `${A}spires.png`, price: 3000, stock: null, note: 'Tranh treo tường.', noteEn: 'Wall painting.' },
  { en: 'Warp Totem: Farm', vi: 'Cọc dịch chuyển: Nông trại', icon: `${I}warp_totem_farm.png`, price: 1000, stock: 20,
    note: 'Dịch chuyển về nhà, dùng một lần. Tự chế rẻ hơn nhiều (1 Gỗ cứng, 1 Mật ong, 20 Sợi).', noteEn: 'Warps you home, single use. Crafting it is far cheaper (1 Hardwood, 1 Honey, 20 Fiber).' },
  { en: 'Magnet', vi: 'Nam châm', icon: `${A}magnet.png`, price: 1000, stock: 20,
    note: 'Mồi câu tăng cơ hội ra rương kho báu (30% thay vì 15%), cá ít cắn hơn. Willy bán 1.000g sau Câu cá cấp 9, hoặc tự chế 3 cái từ 1 Thỏi Sắt.', noteEn: 'Bait that raises the treasure chest chance (30% instead of 15%); fish bite less. Willy sells it for 1,000g from Fishing level 9, or craft 3 from 1 Iron Bar.' },
  { en: 'Hardwood Fence', vi: 'Hàng rào Gỗ cứng', icon: `${I}farm_hardwood_fence.png`, price: 100, stock: 20,
    note: 'Loại hàng rào bền nhất. Tự chế từ Gỗ cứng rẻ hơn.', noteEn: 'The most durable fence. Crafting it from Hardwood is cheaper.' },
  { en: 'Fireworks (Red)', vi: 'Pháo hoa (Đỏ)', icon: `${I}x_fireworks_red.png`, price: 200, stock: 20, note: 'Pháo hoa để ăn mừng (bản 1.6).', noteEn: 'Fireworks for celebrations (1.6).' },
  { en: 'Fireworks (Purple)', vi: 'Pháo hoa (Tím)', icon: `${I}x_fireworks_purple.png`, price: 200, stock: 20, note: 'Pháo hoa để ăn mừng (bản 1.6).', noteEn: 'Fireworks for celebrations (1.6).' },
  { en: 'Fireworks (Green)', vi: 'Pháo hoa (Xanh lá)', icon: `${I}x_fireworks_green.png`, price: 200, stock: 20, note: 'Pháo hoa để ăn mừng (bản 1.6).', noteEn: 'Fireworks for celebrations (1.6).' },
  { en: 'Wallpaper', vi: 'Giấy dán tường', icon: `${A}wallpaper_137.png`, price: 10000, stock: null, note: 'Mẫu giấy dán tường riêng của sòng bạc (bản 1.6).', noteEn: 'A Casino-only wallpaper (1.6).' },
  { en: 'Wallpaper', vi: 'Giấy dán tường', icon: `${A}wallpaper_138.png`, price: 100000, stock: null, note: 'Mẫu giấy dán tường đắt nhất cửa hàng (bản 1.6).', noteEn: 'The priciest wallpaper in the shop (1.6).' },
  { en: 'Flooring', vi: 'Sàn nhà', icon: `${A}flooring_65.png`, price: 100000, stock: null, note: 'Mẫu sàn riêng của sòng bạc (bản 1.6).', noteEn: 'A Casino-only flooring (1.6).' }
];

const icon = src => `<img src="${src}" alt="" class="pixel-img casino-shop__icon" loading="lazy" data-fallback="hide">`;
const qi = n => `${fmt(n)} ${t('xu Qi')}`;

export default {
  id: 'casino', name: 'Cửa hàng xu Qi', nameEn: 'Qi Coin shop', icon: 'wallet_club_card', static: true,
  intro: 'Cửa hàng trong Sòng bạc của Ông Qi (Sa mạc Calico, đi qua cửa sau tiệm Oasis của Sandy). Danh sách món và giá cố định nên không cần dự đoán; xu Qi kiếm nhanh nhất bằng Calico Jack.',
  introEn: "The shop in Mr. Qi's Casino (Calico Desert, through the back door of Sandy's Oasis). Items and prices are fixed, so there is nothing to predict; Calico Jack is the fastest way to earn Qi coins.",
  figure: { src: [`${A}casino_building.png`], alt: 'Sòng bạc ở Sa mạc Calico', caption: 'Sòng bạc của Ông Qi: quầy cửa hàng ở góc trên bên phải.' },
  render(ctx, _offset, opts = {}) {
    const i = opts.player || 0;
    const have = ctx?.source === 'save' ? `
      <p class="notes-done">${ico('wallet_club_card')} <span data-no-i18n>${ctx.names[i] || '?'}</span>:
        ${ctx.clubCard?.[i] ? `${t('đã có Thẻ Hội viên')} · <strong>${qi(ctx.clubCoins?.[i] || 0)}</strong>` : t('chưa có Thẻ Hội viên')}</p>` : '';
    const rows = SHOP.map(x => [
      `${icon(x.icon)} <strong data-no-i18n>${isEn ? x.en : x.vi}</strong>${x.pick ? ` <span class="tag tag--gold">${t('Nên mua')}</span>` : ''}`,
      `<strong>${qi(x.price)}</strong><br><small class="muted">≈ ${fmt(x.price * 10)}g</small>`,
      x.stock ? `${x.stock}` : t('Không giới hạn'),
      `<span data-no-i18n>${isEn ? x.noteEn : x.note}</span>`
    ]);
    return `
      ${have}
      <h4 class="journal-sub">${ico('quests')} ${t('Cách vào và đổi xu')}</h4>
      <ol class="casino-steps">
        <li>${t('Làm chuỗi nhiệm vụ "Ông Qi Bí Ẩn" để nhận Thẻ Hội viên: bắt đầu bằng cách đặt 1 Pin Năng Lượng vào hộp điện trong Đường hầm cạnh Trạm xe buýt; xong 5 bước thì thẻ nằm trong đống củi cạnh nhà bạn. Không có thẻ thì người bảo vệ chặn cửa.')}</li>
        <li>${t('Sòng bạc mở từ 9:00 đến 23:50, cửa ở phòng sau tiệm Oasis của Sandy.')}</li>
        <li>${t('Máy cạnh Ông Qi đổi 1.000g ra 100 xu Qi (10g một xu). Xu Qi không đổi ngược lại ra tiền được.')}</li>
        <li>${t('Chơi Calico Jack: bàn trái cược 100 xu, bàn phải cược 1.000 xu. Máy kéo xèng không dự đoán được.')}
          <button class="link-btn" type="button" data-action="predict-tab" data-id="calico">${t('Mở dự đoán Calico Jack')}</button></li>
      </ol>
      <h4 class="journal-sub">${ico('money')} ${t('Hàng trong cửa hàng')}</h4>
      ${table([t('Món'), t('Giá'), t('Số lượng'), t('Ghi chú')], rows, 'casino-shop')}
      <p class="muted">${t('Giá quy ra vàng tính theo tỉ lệ đổi 10g một xu Qi. Từ bản 1.6 một số món có số lượng giới hạn.')}</p>
      <h4 class="journal-sub">${icon(`${A}statue_of_endless_fortune.png`)} ${t('Tượng Vận May Vô Tận')}</h4>
      <p>${t('Người đứng cạnh chậu cây ở góc trên bên phải bán Tượng Vận May Vô Tận với giá 1.000.000g (trả bằng vàng, không phải xu Qi), mua bao nhiêu cũng được.')}</p>
      <ul class="casino-steps">
        <li>${t('Ngày thường: mỗi ngày tạo ra một trong bốn món với tỉ lệ ngang nhau: Kim cương, Thỏi Iridium, Hốc tinh Toàn năng hoặc Thỏi Vàng.')}</li>
        <li>${t('Ngày sinh nhật dân làng: tạo ra một món người đó yêu thích (chất lượng thường), nếu bạn đã gặp người đó.')}</li>
        <li>${t('Không lấy thì hôm sau món cũ bị thay bằng món mới. Đây là một trong những cách dễ nhất để có Thỏi Iridium.')}</li>
      </ul>
      <p class="muted">${t('Nguồn: Official Stardew Valley Wiki (Casino, Statue Of Endless Fortune, Magnet, Scarecrow).')}</p>`;
  }
};
