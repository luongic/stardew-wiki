// ==========================================================================
// PREDICTIONS: THE LIST SHOWN IN THE PREDICTOR TAB
// Each module: { id, name, nameEn, icon, intro, introEn?, nav?, players?,
//   search?: { placeholder, run(ctx, query, opts) }, render(ctx, offset, opts) }
// `nav`: { step, big?, start(ctx, opts), min? } browses by `offset` (a day number
// for calendars, a count for geodes and boxes...).
// ==========================================================================

import weather from './weather.js';
import trains from './trains.js';
import night from './night.js';
import cart from './cart.js';
import krobus from './krobus.js';
import sandy from './sandy.js';
import bookseller from './bookseller.js';
import wallpaper from './wallpaper.js';
import geodes from './geodes.js';
import mystery from './mystery.js';
import prize from './prize.js';
import mines from './mines.js';
import minechest from './minechest.js';
import trash from './trash.js';
import enchant from './enchant.js';
import statue from './statue.js';
import raccoon from './raccoon.js';
import gembirds from './gembirds.js';
import crane from './crane.js';
import calico from './calico.js';
import desert from './desert.js';
import winterstar from './winterstar.js';

export const PREDICTIONS = [weather, trains, night, cart, krobus, sandy, bookseller, wallpaper, geodes, mystery, prize, mines, minechest,
  trash, enchant, statue, raccoon, gembirds, crane, calico, desert, winterstar];
