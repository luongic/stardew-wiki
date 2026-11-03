// ==========================================================================
// PREDICTION: TRAVELING CART (ShopBuilder.GetShopStock, Data/Shops)
// The cart in Cindersap Forest on Fridays and Sundays, plus the boat at the
// Night Market (Winter 15-17) and the cart at the Desert Festival (Spring
// 15-17): 10 random basic items, one furniture, and a few extra slots with
// their own odds. Ported from stardew-predictor's predictCart_1_6() (MIT).
// ==========================================================================

import { rngOf, hashString, dateOf, dateLabel, today, weekStart, table } from './core.js';
import { P_OBJECTS } from '../../data/predictor-data.js';
import { randomItems, gold, none, matcher, foundLine } from './shop-helpers.js';
import { itemTag } from '../lib/item-lookup.js';
import { t } from '../lib/i18n.js';

const SKILL_BOOKS = ['Stardew Valley Almanac', 'Bait And Bobber', "Woodcutter's Weekly", 'Mining Monthly', 'Combat Quarterly'];
const RARE = new Set(['Rare Seed', 'Red Cabbage Seeds', 'Rarecrow (Snowman)', 'Coffee Bean', 'Red Fez', 'Joja Catalogue', 'Junimo Catalogue', 'Retro Catalogue', 'Tea Set', ...SKILL_BOOKS]);

// The cart days of the week starting on `start` (a Monday): [{ day, place }]
export function cartDays(start) {
  const days = [];
  const dayOfYear = (start - 1) % 112;
  // Week 3 of Spring / Winter opens with the Desert Festival / Night Market (days 15-17)
  if (dayOfYear === 14) [0, 1, 2].forEach(k => days.push({ day: start + k, place: 'desert' }));
  if (dayOfYear === 98) [0, 1, 2].forEach(k => days.push({ day: start + k, place: 'boat' }));
  days.push({ day: start + 4, place: 'forest' }, { day: start + 6, place: 'forest' });
  return days;
}

// The stock on day number `day`: a list of slots { key, name, qty, price }
// (name null = nothing in that slot; note = slot not possible yet)
export function cartStock(ctx, day) {
  const d = day + ctx.dayAdjust;
  const rng = rngOf(ctx, d, ctx.gameID / 2);
  const synced = key => rngOf(ctx, hashString(key), ctx.gameID, d).NextDouble();
  const out = [];
  let seenRareSeed = false;
  randomItems(rng, 'objects', 2, 789, true, true, true, 10).forEach((item, i) => {
    if (item.name === 'Rare Seed') seenRareSeed = true;
    const price = Math.max(rng.Next(1, 11) * 100, rng.Next(3, 6) * item.price);
    out.push({ key: `basic${i + 1}`, name: item.name, qty: rng.NextDouble() < 0.1 ? 5 : 1, price });
  });
  // Year 1 guarantee: Red Cabbage Seeds once the countdown read from the save reaches 0
  if (ctx.originalGuarantee >= 0) {
    const visits = ctx.originalGuarantee - Math.floor(d / 7) - Math.floor((d + 2) / 7) - (d >= 99) - (d >= 100) - (d >= 101);
    if (visits === 0) {
      const price = Math.max(rng.Next(1, 11) * 100, rng.Next(3, 6) * P_OBJECTS['485'][3]);
      out.push({ key: 'guarantee', name: P_OBJECTS['485'][0], qty: rng.NextDouble() < 0.1 ? 5 : 1, price });
    } else {
      out.push({ key: 'guarantee', name: null, visits });
    }
  }
  const furniture = randomItems(rng, 'furniture', 0, 1612, true, true)[0];
  out.push({ key: 'furniture', name: furniture.name, qty: 1, price: rng.Next(1, 11) * 250 });
  const season = dateOf(day).seasonIndex;
  if (season < 2) {
    out.push(seenRareSeed ? { key: 'seasonal', name: null } : { key: 'seasonal', name: 'Rare Seed', qty: rng.NextDouble() < 0.1 ? 5 : 1, price: 1000 });
  } else {
    out.push(synced('cart_rarecrow') < 0.4 ? { key: 'seasonal', name: 'Rarecrow (Snowman)', qty: 1, price: 4000 } : { key: 'seasonal', name: null });
  }
  if (season > 1) out.push(synced('cart_coffee_bean') < 0.25 ? { key: 'coffee', name: 'Coffee Bean', qty: 1, price: 2500 } : { key: 'coffee', name: null });
  else out.push({ key: 'coffee', note: 'fallwinter' });
  out.push(synced('cart_fez') < 0.1 ? { key: 'fez', name: 'Red Fez', qty: 1, price: 8000 } : { key: 'fez', name: null });
  // stardew-predictor shows the Joja Catalogue only after the Community Center is restored
  if (ctx.ccComplete) out.push(synced('cart_jojaCatalogue') < 0.1 ? { key: 'cat1', name: 'Joja Catalogue', qty: 1, price: 30000 } : { key: 'cat1', name: null });
  else out.push({ key: 'cat1', note: 'cc' });
  if (ctx.ccComplete || ctx.jojaComplete) out.push(synced('cart_junimoCatalogue') < 0.1 ? { key: 'cat2', name: 'Junimo Catalogue', qty: 1, price: 70000 } : { key: 'cat2', name: null });
  else out.push({ key: 'cat2', note: 'cc' });
  out.push(synced('cart_retroCatalogue') < 0.1 ? { key: 'cat3', name: 'Retro Catalogue', qty: 1, price: 110000 } : { key: 'cat3', name: null });
  // Tea Set from Year 25: the original tests the week's first day (its browse offset)
  if (weekStart(day) - 1 + ctx.dayAdjust >= 2688) out.push(synced('teaset') < 0.05 ? { key: 'tea', name: 'Tea Set', qty: Infinity, price: 1000000 } : { key: 'tea', name: null });
  else out.push({ key: 'tea', note: 'y25' });
  out.push(synced('travelerSkillBook') < 0.05 ? { key: 'book', name: SKILL_BOOKS[rng.Next(SKILL_BOOKS.length)], qty: 1, price: 6000 } : { key: 'book', name: null });
  return out;
}

const LABELS = {
  guarantee: 'Bảo đảm năm 1', furniture: 'Nội thất', seasonal: 'Hàng theo mùa', coffee: 'Hạt cà phê', fez: 'Mũ Fez Đỏ',
  cat1: 'Danh mục 1', cat2: 'Danh mục 2', cat3: 'Danh mục 3', tea: 'Bộ ấm trà (năm 25)', book: 'Sách kỹ năng'
};
const NOTES = { fallwinter: 'Chỉ có vào Mùa Thu hoặc Mùa Đông', cc: 'Chỉ có sau khi khôi phục Trung tâm Cộng đồng', y25: 'Chỉ có từ năm 25' };
const PLACES = { forest: 'Rừng Cindersap', boat: 'Thuyền Chợ Đêm', desert: 'Lễ hội Sa mạc' };

const qtyText = q => (q === Infinity ? '∞' : q > 1 ? `×${q}` : '');
function itemCell(slot) {
  if (slot.note) return `<span class="predict-none">${t(NOTES[slot.note])}</span>`;
  if (!slot.name) {
    if (slot.visits > 0) return `<span class="predict-none">${t(`Còn ${slot.visits} lần ghé`)}</span>`;
    if (slot.visits < 0) return `<span class="predict-none">${t('Đã qua')}</span>`;
    return none();
  }
  const q = qtyText(slot.qty);
  return `${itemTag(slot.name, '', RARE.has(slot.name) ? 'is-rare' : '')}<span class="muted">${q ? `${q} · ` : ''}${gold(slot.price)}</span>`;
}

export default {
  id: 'cart', name: 'Xe hàng rong', nameEn: 'Traveling Cart', icon: 'item_rare_seed',
  intro: 'Hàng của xe hàng rong ở Rừng Cindersap (Thứ Sáu và Chủ Nhật), cùng thuyền ở Chợ Đêm (15-17 Mùa Đông) và xe ở Lễ hội Sa mạc (15-17 Mùa Xuân). Mỗi lần có 10 món cơ bản, 1 món nội thất và vài ô đặc biệt có tỉ lệ riêng.',
  introEn: 'Stock of the Traveling Cart in Cindersap Forest (Fridays and Sundays), plus the boat at the Night Market (Winter 15-17) and the cart at the Desert Festival (Spring 15-17). Each visit has 10 basic items, 1 furniture and a few special slots with their own odds.',
  nav: { step: 7, big: 112, start: ctx => weekStart(today(ctx)), stepLabel: 'Tuần trước', nextLabel: 'Tuần sau' },
  search: {
    placeholder: 'Tìm món trong 2 năm tới...',
    run(ctx, query) {
      const match = matcher(query), rows = [];
      const from = weekStart(today(ctx));
      for (let start = from; start < from + 224; start += 7) {
        for (const { day, place } of cartDays(start)) {
          for (const slot of cartStock(ctx, day)) {
            if (slot.name && match(slot.name)) rows.push([`${dateLabel(day)}<br><span class="muted">${t(PLACES[place])}</span>`, itemCell(slot)]);
          }
        }
      }
      return foundLine(rows.length) + (rows.length ? table([t('Ngày'), t('Món')], rows) : '');
    }
  },
  render(ctx, start) {
    const days = cartDays(start);
    const stocks = days.map(({ day }) => cartStock(ctx, day));
    const head = [t('Ô hàng'), ...days.map(({ day, place }) => `${dateLabel(day)}${day === today(ctx) ? ` (${t('Hôm nay')})` : ''}<br>${t(PLACES[place])}`)];
    const rows = stocks[0].map((slot, i) => {
      const label = slot.key.startsWith('basic') ? `${t('Món')} ${slot.key.slice(5)}` : t(LABELS[slot.key]);
      return [label, ...stocks.map(s => itemCell(s[i]))];
    });
    return table(head, rows);
  }
};
