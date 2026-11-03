// ==========================================================================
// PREDICTION: DESERT FESTIVAL (DesertFestival.SetupFestivalDay, ReceiveMakeOver)
// Spring 15-17: the two villager shops each day, the three racing snails,
// each player's free "Cactis" and Emily's makeover outfit.
// Ported from stardew-predictor (MIT), outfit lists included; the cactus
// sprite sheet (assets/predict/free_cactuses.png) is from it as well.
// ==========================================================================

import { CSRandom, rngOf, seedOf, toInt32, dateOf, today, table, esc } from './core.js';
import { npcTag } from './npc.js';
import { t } from '../lib/i18n.js';

// Outfits: [hat, shirt, pants]; a piece may be [name, dye color]
const MAKEOVER = {
  Male: [
  ["Dark Ballcap", "Skeleton Shirt", ["Tight Pants", "#dfd5b7"]],
  ["Dinosaur Hat", "Red Striped Shirt", "Dinosaur Pants"],
  ["Hair Bone", "Caveman Shirt", "Grass Skirt"],
  ["Santa Hat", "Fancy Red Blouse", ["Shorts", "#8bff63"]],
  ["Cat Ears", ["Short Jacket", "Red"], ["Genie Pants", "#e8d888"]],
  ["Goggles", "Circuitboard Shirt", ["Baggy Pants", "#3c633e"]],
  ["(No Hat)", "Shirt – ID (S)1089", ["Farmer Pants", "#9658d3"]],
  ["Joja Cap", "Shirt – ID (S)1105", ["Farmer Pants", "#2e55b7"]],
  ["Beanie", "Skull Shirt", ["Farmer Pants", "#282828"]],
  ["(No Hat)", "Gray Suit", ["Farmer Pants", "#989b92"]],
  ["Laurel Wreath Crown", "Toga Shirt", ["Skirt", "#f7f5cd"]],
  ["Straw Hat", "Yellow Suit", ["Farmer Pants", "#f2bd02"]],
  ["Gnome's Cap", "Green Tunic", ["Skirt", "#297216"]],
  ["Cowboy Hat", "Excavator Shirt", ["Farmer Pants", "#a86f01"]],
  ["Good Ol' Cap", "Brown Overalls", ["Farmer Pants", "#824e01"]],
  ["(No Hat)", "Black Leather Jacket", ["Baggy Pants", "#303030"]],
  ["(No Hat)", "Shirt – ID (S)1099", ["Farmer Pants", "#353535"]],
  ["(No Hat)", "Store Owner's Jacket", ["Farmer Pants", "#25562a"]],
  ["Delicate Bow", "Shirt – ID (S)1092", ["Skirt", "#f25769"]],
  ["(No Hat)", "Shirt – ID (S)1088", ["Shorts", "#63dd8d"]],
  ["(No Hat)", "Sailor Shirt", ["Shorts", "#465aa3"]],
  ["(No Hat)", "Dark Shirt", ["Tight Pants", "#515151"]],
  ["Totem Mask", ["Fake Muscles Shirt", "#f9ae89"], ["Shorts", "#128c17"]],
  ["(No Hat)", ["Crop Tank Top (M)", "#ffebcb"], ["Farmer Pants", "#683535"]],
  ["(No Hat)", ["Basic Pullover (M)", "#ffc600"], ["Relaxed Fit Shorts", "#5997d1"]],
  ["Mouse Ears", "Shirt – ID (S)1066", ["Shorts", "#b7a3a3"]],
  ["Propeller Hat", "Jester Shirt", ["Farmer Pants", "#02b8e0"]],
  ["(No Hat)", "Crab Cake Shirt", ["Farmer Pants", "#bf2116"]],
  ["Sou'wester", "Rain Coat", ["Relaxed Fit Pants", "#ffa902"]],
  ["(No Hat)", "Camo Shirt", ["Relaxed Fit Pants", "#6b3f17"]],
  ["(No Hat)", ["Collared Shirt", "#63ccb9"], ["Farmer Pants", "#e2ac5a"]],
  ["Hard Hat", "Oil Stained Shirt", ["Relaxed Fit Pants", "#638460"]],
  ["Party Hat", "Happy Shirt", ["Farmer Pants", "#e21b1b"]],
  ["(No Hat)", "White Gi", ["Simple Dress", "#fcd7ab"]],
  ["(No Hat)", "Trash Can Shirt", ["Shorts", "#757575"]],
  ["(No Hat)", ["Turtleneck Sweater", "#38c3ff"], ["Farmer Pants", "#632f18"]],
  ["Pageboy Cap", "Mayoral Suspenders", ["Farmer Pants", "#702616"]],
  ["(No Hat)", "Retro Rainbow Shirt", ["Farmer Pants", "#ad2b69"]],
  ["(No Hat)", "Shirt – ID (S)1031", ["Skirt", "#a5836a"]],
  ["(No Hat)", "Green Overalls", ["Farmer Pants", "#3043e8"]],
  ["(No Hat)", "Shirt – ID (S)1074", ["Relaxed Fit Pants", "#ba0505"]],
  ["(No Hat)", "Shirt – ID (S)1116", ["Farmer Pants", "#ffb547"]],
  ["(No Hat)", "Shirt – ID (S)1126", ["Baggy Pants", "#6a36d8"]],
  ["(No Hat)", "Tunnelers Jersey", ["Relaxed Fit Shorts", "#514b41"]],
  ["Official Cap", "Officer Uniform", ["Farmer Pants", "#35345b"]],
  ["(No Hat)", ["Dark Striped Shirt", "#ffffff"], ["Baggy Pants", "#333333"]],
  ["(No Hat)", ["Basic Pullover (M)", "#9fff72"], ["Tight Pants", "#97ff72"]]
  ],
  Female: [
  ["Dark Ballcap", "Skeleton Shirt", ["Tight Pants", "#dfd5b7"]],
  ["Dinosaur Hat", "Red Striped Shirt", "Dinosaur Pants"],
  ["Spotted Headscarf", "Classy Top (F)", ["Dress", "#8e0101"]],
  ["Hair Bone", "Caveman Shirt", "Grass Skirt"],
  ["Santa Hat", "Fancy Red Blouse", ["Shorts", "#8bff63"]],
  ["Cat Ears", ["Short Jacket", "Red"], ["Genie Pants", "#e8d888"]],
  ["Goggles", "Circuitboard Shirt", ["Baggy Pants", "#3c633e"]],
  ["(No Hat)", "Shirt – ID (S)1089", ["Farmer Pants", "#9658d3"]],
  ["Joja Cap", "Shirt – ID (S)1105", ["Farmer Pants", "#2e55b7"]],
  ["Logo Cap", "Sugar Shirt", ["Skirt", "#f9acba"]],
  ["Laurel Wreath Crown", "Toga Shirt", ["Skirt", "#f7f5cd"]],
  ["(No Hat)", "Shirt – ID (S)1072", ["Simple Dress", "#698ec6"]],
  ["Daisy", "Shirt – ID (S)1118", ["Skirt", "#5da4f7"]],
  ["Straw Hat", ["Green Buttoned Vest", "Red"], ["Skirt", "#1e9647"]],
  ["Gnome's Cap", "Green Tunic", ["Skirt", "#297216"]],
  ["Cowboy Hat", "Excavator Shirt", ["Farmer Pants", "#a86f01"]],
  ["Good Ol' Cap", "Brown Overalls", ["Farmer Pants", "#824e01"]],
  ["(No Hat)", "Shirt – ID (S)1099", ["Farmer Pants", "#353535"]],
  ["(No Hat)", "Store Owner's Jacket", ["Farmer Pants", "#25562a"]],
  ["Watermelon Band", "Shirt – ID (S)1106", ["Skirt", "#53d1ab"]],
  ["Delicate Bow", "Shirt – ID (S)1092", ["Skirt", "#f25769"]],
  ["(No Hat)", "Shirt – ID (S)1088", ["Shorts", "#63dd8d"]],
  ["(No Hat)", "Shirt – ID (S)1103", ["Skirt", "#35373a"]],
  ["(No Hat)", "Sailor Shirt", ["Shorts", "#465aa3"]],
  ["(No Hat)", "Shirt – ID (S)1050", ["Pleated Skirt", "#fc9298"]],
  ["(No Hat)", ["Crop Tank Top (M)", "#ffebcb"], ["Farmer Pants", "#683535"]],
  ["(No Hat)", ["Basic Pullover (M)", "#ffc600"], ["Relaxed Fit Shorts", "#5997d1"]],
  ["(No Hat)", ["High-Waisted Shirt", "#1da362"], ["Pleated Skirt", "#1da362"]],
  ["(No Hat)", ["Tube Top", "#97ff72"], ["Tight Pants", "#97ff72"]],
  ["Mouse Ears", "Shirt – ID (S)1066", ["Shorts", "#b7a3a3"]],
  ["(No Hat)", "Slime Shirt", ["Simple Dress", "#39cc2c"]],
  ["Propeller Hat", "Jester Shirt", ["Farmer Pants", "#02b8e0"]],
  ["(No Hat)", "Crab Cake Shirt", ["Farmer Pants", "#bf2116"]],
  ["Sou'wester", "Rain Coat", ["Relaxed Fit Pants", "#ffa902"]],
  ["(No Hat)", "Camo Shirt", ["Relaxed Fit Pants", "#6b3f17"]],
  ["(No Hat)", ["Sailor Shirt", "#d13e3e"], ["Pleated Skirt", "#d13e3e"]],
  ["(No Hat)", "White Gi", ["Simple Dress", "#fcd7ab"]],
  ["(No Hat)", "Trash Can Shirt", ["Shorts", "#757575"]],
  ["(No Hat)", ["Turtleneck Sweater", "#38c3ff"], ["Farmer Pants", "#632f18"]],
  ["Pageboy Cap", "Mayoral Suspenders", ["Farmer Pants", "#702616"]],
  ["(No Hat)", "Shirt – ID (S)1086", ["Dress", "#964361"]],
  ["(No Hat)", "Shirt – ID (S)1031", ["Skirt", "#a5836a"]],
  ["(No Hat)", "Green Overalls", ["Farmer Pants", "#3043e8"]],
  ["(No Hat)", "Shirt – ID (S)1074", ["Relaxed Fit Pants", "#ba0505"]],
  ["(No Hat)", "Shirt – ID (S)1051", ["Relaxed Fit Shorts", "#dd4457"]],
  ["(No Hat)", "Tunnelers Jersey", ["Relaxed Fit Shorts", "#514b41"]],
  ["Official Cap", "Officer Uniform", ["Farmer Pants", "#35345b"]],
  ["(No Hat)", ["Dark Striped Shirt", "#ffffff"], ["Baggy Pants", "#333333"]]
  ]
};
const TOGA = ['Laurel Wreath Crown', 'Toga Shirt', ['Skirt', '#f7f5cd']];
const VENDORS = new Set(['Abigail', 'Caroline', 'Clint', 'Demetrius', 'Elliott', 'Emily', 'Evelyn', 'George', 'Gus', 'Haley', 'Harvey', 'Jas', 'Jodi', 'Alex',
  'Kent', 'Leah', 'Marnie', 'Maru', 'Pam', 'Penny', 'Pierre', 'Robin', 'Sam', 'Sebastian', 'Shane', 'Vincent', 'Leo']);
// Villagers busy elsewhere on each festival day
const BUSY = [
  ['Abigail', 'Caroline', 'Elliott', 'Gus', 'Alex', 'Leah', 'Pierre', 'Sam', 'Sebastian', 'Haley'],
  ['Haley', 'Clint', 'Demetrius', 'Maru', 'Pam', 'Penny', 'Robin', 'Leo'],
  ['Evelyn', 'George', 'Jas', 'Jodi', 'Kent', 'Marnie', 'Shane', 'Vincent']
];
const RACERS = ['Speed Rooster', 'King Sting', 'Shoebiscuit', 'Escar-go', 'Cactus Crawler'];

export function desertFestival(ctx, year) {
  const vendors = [[], []], racers = [[], [], []];
  for (let d = 0; d < 3; d++) {
    const day = 112 * (year - 1) + 15 + d;
    const pool = ctx.characters.filter(c => VENDORS.has(c) && !(c === 'Kent' && year < 2) && !(c === 'Leo' && !ctx.leoMoved) && !BUSY[d].includes(c));
    const rng = rngOf(ctx, day, ctx.gameID / 2);
    for (let k = 0; k < d; k++) for (let m = 0; m < 2; m++) pool.splice(rng.Next(pool.length), 1);
    for (let i = 0; i < 2; i++) { const n = rng.Next(pool.length); vendors[i].push(pool[n]); pool.splice(n, 1); }
    const racerPool = [0, 1, 2, 3, 4];
    for (let i = 0; i < 3; i++) { const n = rng.Next(racerPool.length); racers[d].push(RACERS[racerPool[n]]); racerPool.splice(n, 1); }
  }
  const players = ctx.mpIds.map((id, p) => {
    const crng = new CSRandom(seedOf(ctx, toInt32(BigInt(id) + BigInt(year))));
    const cactus = [crng.Next(24), crng.Next(24), crng.Next(16)];
    const list = MAKEOVER[ctx.genders?.[p] === 'Male' ? 'Male' : 'Female'];
    const outfits = [0, 1, 2].map(d => {
      const day = 112 * (year - 1) + 15 + d;
      let rng = rngOf(ctx, day, ctx.gameID / 2, year);
      if (rng.NextDouble() < 0.75) rng = rngOf(ctx, day, ctx.gameID / 2, year, toInt32(id));
      let outfit = list[Math.floor(rng.NextDouble() * list.length)];
      if (d === 1 && rngOf(ctx, day, ctx.gameID / 2).NextDouble() < 0.03) outfit = TOGA;
      return outfit;
    });
    return { name: ctx.names[p], cactus, outfits };
  });
  return { vendors, racers, players };
}

// One cactus: top, middle and bottom from the 8-wide sprite sheet (16px tiles shown at 48px)
const cactusHtml = parts => `<span class="predict-cactus">${parts.map((n, i) =>
  `<span style="background-position:${-48 * (n % 8)}px ${-48 * Math.floor(n / 8) - 144 * i}px"></span>`).join('')}</span>`;
const piece = p => Array.isArray(p) ? `${esc(p[0])} <span class="predict-swatch" style="color:${esc(p[1])}">■</span>` : esc(p === '(No Hat)' ? '' : p);
const outfitHtml = o => `<span data-no-i18n>${o.map(piece).filter(Boolean).join('<br>')}</span>`;

export default {
  id: 'desert', name: 'Lễ hội Sa mạc', nameEn: 'Desert Festival', icon: 'calico_egg',
  intro: 'Lễ hội Sa mạc (15-17 Mùa Xuân, cần mở Xe buýt): hai dân làng mở quầy mỗi ngày, ba chú ốc đua, cây "Cactis" miễn phí và bộ đồ Emily trang điểm cho từng người chơi.',
  introEn: 'Desert Festival (Spring 15-17, bus repaired): the two villager shops each day, the three racing snails, each player\'s free "Cactis" and Emily\'s makeover outfit.',
  nav: { step: 1, start: ctx => dateOf(today(ctx)).year - 1 + (dateOf(today(ctx)).seasonIndex > 0 || dateOf(today(ctx)).day > 17 ? 1 : 0), min: 0, stepLabel: 'Năm trước', nextLabel: 'Năm sau' },
  render(ctx, offset) {
    const year = offset + 1;
    const f = desertFestival(ctx, year);
    const head = ['', `15 ${t('Mùa Xuân')}`, `16 ${t('Mùa Xuân')}`, `17 ${t('Mùa Xuân')}`];
    const rows = [
      [t('Quầy hàng 1'), ...f.vendors[0].map(npcTag)],
      [t('Quầy hàng 2'), ...f.vendors[1].map(npcTag)],
      [t('Ốc đua'), ...f.racers.map(r => `<span data-no-i18n>${r.join('<br>')}</span>`)],
      ...f.players.map(p => [`${t('Bộ đồ trang điểm')}<br><strong data-no-i18n>${esc(p.name)}</strong>`, ...p.outfits.map(outfitHtml)])
    ];
    return `<p class="journal-sub">${t('Năm')} ${year}</p>${table(head, rows)}
      <h4 class="journal-sub">${t('Cây "Cactis" miễn phí')}</h4>
      <div class="predict-cacti">${f.players.map(p => `<div>${cactusHtml(p.cactus)}<span data-no-i18n>${esc(p.name)}</span></div>`).join('')}</div>`;
  }
};
