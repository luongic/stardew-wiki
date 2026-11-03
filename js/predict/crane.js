// ==========================================================================
// PREDICTION: CRANE GAME AT THE MOVIE THEATER (MovieTheater.addRandomNPCs)
// On about one day in four someone is already playing the crane game.
// Ported from stardew-predictor (MIT).
// ==========================================================================

import { rngOf, calendar, today, monthStart } from './core.js';
import { t } from '../lib/i18n.js';

// Game1.Date.TotalDays does not include today, hence the - 1
export const craneBusy = (ctx, day) => rngOf(ctx, ctx.gameID, day + ctx.dayAdjust - 1).NextDouble() < 0.25;

export default {
  id: 'crane', name: 'Máy gắp thú', nameEn: 'Crane Game', icon: 'movie_ticket',
  intro: 'Máy gắp thú trong Rạp Chiếu Phim. Có ngày đã có người chơi máy nên bạn không chơi được.',
  introEn: 'The crane game in the Movie Theater. On some days someone is already playing it, so you can\'t.',
  nav: { step: 28, big: 112, start: ctx => monthStart(today(ctx)) },
  render(ctx, start) {
    return calendar(ctx, start, day => craneBusy(ctx, day)
      ? `<span class="predict-none">${t('Có người đang chơi')}</span>`
      : `<span class="predict-hit">${t('Chơi được')}</span>`);
  }
};
