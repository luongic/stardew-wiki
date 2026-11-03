// ==========================================================================
// PREDICTION: THE BOOKSELLER (Utility.getDaysOfBooksellerThisSeason, Data/Shops)
// Marcello's bookshop comes to Pelican Town on two days each season. Only
// the randomly chosen books are listed: the Book of Stars, the skill books,
// a random book from year 3 and an extra Woodcutter's Weekly. Ported from
// stardew-predictor's predictBookseller() (MIT).
// ==========================================================================

import { rngOf, hashString, dateOf, dateLabel, today, monthStart, table } from './core.js';
import { gold, none, matcher, foundLine } from './shop-helpers.js';
import { itemTag } from '../lib/item-lookup.js';
import { t } from '../lib/i18n.js';

const SKILL_BOOKS = ['Stardew Valley Almanac', 'Bait And Bobber', "Woodcutter's Weekly", 'Mining Monthly', 'Combat Quarterly'];
const RANDOM_BOOKS = ['The Alleyway Buffet', "The Art O' Crabbing", 'Dwarvish Safety Manual', 'Jewels Of The Sea', 'Raccoon Journal', "Woody's Secret",
  'Jack Be Nimble, Jack Be Thick', 'Friendship 101', 'Monster Compendium', 'Mapping Cave Systems', 'Treasure Appraisal Guide'];
const POSSIBLE_DAYS = [[11, 12, 21, 22, 25], [9, 12, 18, 25, 27], [4, 7, 8, 9, 12, 19, 22, 25], [5, 11, 12, 19, 22, 24]];

// The two visit days (day numbers) of the month starting on `start`
export function booksellerDays(ctx, start) {
  const { seasonIndex, year } = dateOf(start);
  const possible = POSSIBLE_DAYS[seasonIndex];
  const i = rngOf(ctx, year * 11, ctx.gameID, seasonIndex).Next(possible.length);
  return [possible[i], possible[Math.floor((i + possible.length / 2) % possible.length)]].sort((a, b) => a - b).map(d => start + d - 1);
}

// The random books on day number `day`: slots { key, name, price } (name null = none)
export function booksellerStock(ctx, day) {
  const d = day + ctx.dayAdjust;
  const rng = rngOf(ctx, d, ctx.gameID / 2);
  const synced = key => rngOf(ctx, hashString(key), ctx.gameID, d).NextDouble();
  const left = SKILL_BOOKS.slice();
  const out = [];
  out.push({ key: 'stars', name: synced('purplebookSale') < 0.25 ? 'Book Of Stars' : null, price: 15000 });
  out.push({ key: 'skill1', name: synced('thirdBookSale') < 0.6 ? left.splice(rng.Next(left.length), 1)[0] : null, price: 10000 });
  out.push({ key: 'skill2', name: synced('secondBookSale') < 0.8 ? left.splice(rng.Next(left.length), 1)[0] : null, price: 8000 });
  out.push({ key: 'skill3', name: left.splice(rng.Next(left.length), 1)[0], price: 5000 });
  out.push({ key: 'y3', name: dateOf(day).year >= 3 ? RANDOM_BOOKS[rng.Next(RANDOM_BOOKS.length)] : null, price: 20000 });
  out.push({ key: 'extra', name: synced('bookExtraForaging') < 0.33 ? "Woodcutter's Weekly" : null, price: 8000 });
  return out;
}

const LABELS = { stars: 'Sách Sao', skill1: 'Sách kỹ năng 1', skill2: 'Sách kỹ năng 2', skill3: 'Sách kỹ năng 3', y3: 'Sách ngẫu nhiên (từ năm 3)', extra: 'Sách thêm' };
const cell = s => (s.name ? `${itemTag(s.name, '', s.key === 'stars' || s.key === 'y3' ? 'is-rare' : '')}<span class="muted">${gold(s.price)}</span>` : none());

export default {
  id: 'book', name: 'Người bán sách', nameEn: 'Bookseller', icon: 'book_of_stars',
  intro: 'Hai ngày mỗi mùa Người bán sách ghé Thị trấn Pelican, và các cuốn sách được chọn ngẫu nhiên hôm đó. Sách luôn có bán (như Danh mục Giá) hoặc mở theo điều kiện khác không hiện ở đây.',
  introEn: 'The two days each season when the Bookseller visits Pelican Town, and the books picked at random on those days. Books that are always sold (like the Price Catalogue) or unlocked by other conditions are not shown.',
  figure: { src: ['assets/predict/bookseller.png'], alt: 'Quầy của người bán sách', caption: 'Người bán sách ghé Thị trấn 2 lần mỗi mùa, dựng quầy phía trên JojaMart (bên kia sông).' },
  nav: { step: 28, big: 112, start: ctx => monthStart(today(ctx)) },
  search: {
    placeholder: 'Tìm sách trong 2 năm tới...',
    run(ctx, query) {
      const match = matcher(query), rows = [];
      const from = monthStart(today(ctx));
      for (let start = from; start < from + 224; start += 28) {
        for (const day of booksellerDays(ctx, start)) {
          for (const s of booksellerStock(ctx, day)) {
            if (s.name && match(s.name)) rows.push({ cls: day < today(ctx) ? 'is-past' : day === today(ctx) ? 'is-today' : '', cells: [dateLabel(day), cell(s)] });
          }
        }
      }
      return foundLine(rows.length) + (rows.length ? table([t('Ngày'), t('Sách')], rows) : '');
    }
  },
  render(ctx, start) {
    const days = booksellerDays(ctx, start);
    const stocks = days.map(day => booksellerStock(ctx, day));
    const head = [t('Ô hàng'), ...days.map(day => `${dateLabel(day)}${day === today(ctx) ? ` (${t('Hôm nay')})` : ''}`)];
    return table(head, stocks[0].map((s, i) => [t(LABELS[s.key]), ...stocks.map(st => cell(st[i]))]));
  }
};
