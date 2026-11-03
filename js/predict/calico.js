// ==========================================================================
// PREDICTION: CALICO JACK (Minigames.CalicoJack)
// At the Casino table each game of a day is seeded by how many games were
// played that day, so the best move for game 1, 2, 3... is known ahead.
// Luck is unknown, so "super bust" wins are only marked as likely.
// Ported from stardew-predictor (MIT).
// ==========================================================================

import { rngOf, dateLabel, today, table } from './core.js';
import { t, isEn } from '../lib/i18n.js';

const GAMES = 30;
const times = n => (isEn ? `${n} time${n === 1 ? '' : 's'}` : `${n} lần`);

// Best play for one game: { hand, advice, superBust }
export function calicoGame(ctx, day, game) {
  const rng = rngOf(ctx, game, day, ctx.gameID);
  const dealerStart = rng.Next(1, 12) + rng.Next(1, 10);
  const c1 = rng.Next(1, 12), c2 = rng.Next(1, 10);
  // Pre-roll enough numbers to replay the hand with different choices
  const roll = Array.from({ length: 60 }, () => rng.NextDouble());
  let total = c1 + c2, r = 0, hit = 0;
  const choices = [];
  while (total < 21) {
    choices.push({ total, r, hits: hit++ });
    let next = Math.floor(9 * roll[r++] + 1);
    const distance = 21 - total;
    if (distance > 1 && distance < 6 && roll[r++] < 1 / distance) next = roll[r++] < 0.5 ? distance : distance - 1;
    total += next;
  }
  const hand = `${c1} + ${c2}`;
  if (total === 21) return { hand, result: 'win', advice: `${t('Rút thêm')} ${times(hit)} ${t('để được 21')}` };
  // Busting: stand at an earlier step instead, and see what the dealer draws
  let best = { hand, result: 'loss', advice: t('Thua (không tránh được)') };
  let superBust = '';
  for (const c of choices) {
    let dealer = dealerStart;
    r = c.r;
    superBust = '';
    while (dealer < 18 || dealer < c.total) {
      let next = Math.floor(9 * roll[r++] + 1);
      const distance = 21 - dealer;
      let autoBust = false;
      if (c.total === 20) autoBust = roll[r++] < 0.5;
      else if (c.total === 19) autoBust = roll[r++] < 0.25;
      else if (c.total === 18) autoBust = roll[r++] < 0.1;
      if (autoBust) next = Math.floor(distance + 3 * roll[r++] + 1);
      const chance = Math.max(0.0005, 0.001 + ctx.dailyLuck / 20 + ctx.luckLevel * 0.002);
      const sb = roll[r++];
      if (sb < 0.0005) { next = 999; superBust = t('Chắc chắn nhà cái "siêu quắc", thắng gấp 3'); }
      else if (sb < chance) { next = 999; superBust = t('Có thể nhà cái "siêu quắc", thắng gấp 3'); }
      dealer += next;
    }
    if (dealer > 21) {
      best = { hand, result: 'win', advice: c.hits === 0 ? `${t('Dừng ngay ở')} ${c.total}` : `${t('Rút thêm')} ${times(c.hits)}, ${t('dừng ở')} ${c.total}` };
      best.superBust = superBust;
      return best;
    }
    if (dealer === c.total && best.result === 'loss') best = { hand, result: 'tie', advice: `${t('Hòa')}: ${t('rút thêm')} ${times(c.hits)}, ${t('dừng ở')} ${c.total}` };
  }
  best.superBust = superBust;
  return best;
}

const LABEL = { win: ['tag--green', 'Thắng'], tie: ['', 'Hòa'], loss: ['tag--red', 'Thua'] };

export default {
  id: 'calico', name: 'Calico Jack', nameEn: 'Calico Jack', icon: 'calico_egg',
  intro: 'Bàn Calico Jack trong Sòng bạc (Sa mạc Calico): cách chơi tốt nhất cho từng ván trong ngày, đếm từ ván đầu tiên bạn chơi hôm đó. Quá 21 là thua; "siêu quắc" phụ thuộc vận may nên chỉ là khả năng.',
  introEn: 'The Calico Jack table in the Casino (Calico Desert): the best play for each game of the day, counted from your first game that day. Over 21 loses; a "super bust" depends on luck, so it is only a possibility.',
  figure: { src: ['assets/predict/casino.png'], alt: 'Sòng bạc ở Sa mạc Calico', caption: 'Sòng bạc của Ông Qi ở Sa mạc Calico: bàn Calico Jack ở góc dưới bên trái.' },
  nav: { step: 1, big: 7, start: ctx => today(ctx), min: 1, stepLabel: 'Hôm trước', nextLabel: 'Hôm sau', bigLabel: 'Tuần trước', bigNextLabel: 'Tuần sau' },
  render(ctx, day) {
    const rows = [];
    for (let g = 1; g <= GAMES; g++) {
      const x = calicoGame(ctx, day, g);
      const [cls, label] = LABEL[x.result];
      rows.push([g, x.hand, `<span class="tag ${cls}">${t(label)}</span> ${x.advice}${x.superBust ? `<br><small>${x.superBust}</small>` : ''}`]);
    }
    return `<p class="journal-sub">${dateLabel(day)}</p>${table([t('Ván'), t('Bài đầu'), t('Cách chơi tốt nhất')], rows)}`;
  }
};
