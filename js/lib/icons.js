// ==========================================================================
// ICON REGISTRY
// Every icon on the site comes from here, so the whole UI shares one look:
// in-game art (assets/icons, assets/portraits) for things that exist in the
// game, and hand-drawn 9x9 pixel glyphs (assets/pixel-*.svg) for abstract
// symbols. Change an icon site-wide by editing one line.
//
//   ico('energy')             -> <img> for a registry name
//   ico('item_pumpkin')       -> any assets/icons/<name>.png (e.g. data keys)
//   ico('portrait:wizard')    -> assets/portraits/<name>.png
//   <i data-icon="spring"></i> in static HTML is swapped by hydrateIcons()
// ==========================================================================

const px = n => `assets/pixel-${n}.svg`;
const game = n => `assets/icons/${n}.png`;
const face = n => `assets/portraits/${n}.png`;

export const ICONS = {
  // Seasons & sound
  spring: game('ing_daffodil'), summer: game('ing_sunflower'), fall: game('item_pumpkin'), winter: game('crystal_fruit'),
  sound: px('sound'), mute: px('mute'),

  // Tabs
  recipes: game('fried_egg'), items: game('stardew_valley_almanac'), npcs: px('members'), quests: game('dwarf_scroll_i'),
  bundles: px('bundle'), museum: game('golden_mask'), mines: game('item_copper_pickaxe'), planner: game('chest'), tracker: game('stardrop'),

  // Recipe categories
  cooking: game('complete_breakfast'), crafting: game('sprinkler'), smelting: game('furnace'), bait: game('craft_bait'),
  farmhouse: game('farmhouse_upgrade_1'), buildings: game('bldg_barn_1'), magical: game('magic_earth_obelisk'),
  toolUpgrades: game('tool_copper_upgrades'), weapons: game('forge_infinity_blade'), v16: px('sparkle'),

  // Item & museum groups
  tools: game('item_pickaxe'), crops: game('item_parsnip'), fruits: game('item_apple'), fish: game('item_sardine'),
  minerals: game('item_diamond'), animal: game('large_brown_egg'), forage: game('item_morel'),
  artifacts: game('item_ancient_doll'), gems: game('item_diamond'), geodes: game('omni_geode'),

  // Quest categories
  story: game('dwarf_scroll_ii'), secret: game('book_of_mysteries'), ginger: game('parrot_egg'),
  specialOrders: game('price_catalogue'), quests16: game('mystic_tree_seed'),

  // Villager categories & gift tastes
  bachelorette: face('abigail'), bachelor: face('sebastian'), town: face('lewis'), special: face('wizard'),
  marriage: px('ring'), friend: px('members'),
  loved: px('health'), liked: 'assets/pixel-heart.svg', disliked: px('broken'), hated: px('hate'), hearts: px('health'),

  // Stats & labels
  energy: px('energy'), health: px('health'), money: game('gold_coin'), pin: px('pin'), calendar: px('calendar'),
  season: px('calendar'), tip: px('tip'), search: px('search'), warn: px('warn'), question: px('question'),
  eye: px('eye'), lock: px('lock'), unlock: px('unlock'), check: px('check'), hourglass: px('hourglass'),
  clock: px('clock'), gift: game('treasure_chest'), birthday: game('pink_cake'), festival: game('star_shards'),
  ingredients: game('wheat'), source: game('stardew_valley_almanac'), uses: game('complete_breakfast'),
  steps: px('steps'), giver: px('guest'), residence: game('farmhouse_upgrade_1'), job: game('item_axe'),
  sunny: px('sun'), rainy: px('rain'), storm: px('storm'), snowy: px('snow'), play: px('play'), pause: px('pause'),
  saloon: game('beer'), fishing: game('item_fishing_rod_bamboo'), sparkle: px('sparkle'),

  // Progress & backup
  save: px('save'), download: px('download'), upload: px('upload'), trash: game('tool_trashcan_upgrades'),
  medal: game('item_golden_relic'),

  // Guides & misc
  steam: px('gamepad'), oracle: px('crystal'), dice: px('dice'), scale: px('scale'), skull: game('prehistoric_skull'),
  luck: game('ing_rabbits_foot'), bestLuck: game('stardrop'), wiki: px('globe'), box: px('box'), letter: px('letter'),
  copy: px('copy'), crown: px('crown'), members: px('members'), guest: px('guest'), signin: px('signin'),
  signout: px('signout'), junimo: game('magic_junimo_hut'), key: game('rusty_key'), house: game('farmhouse_upgrade_1'),
  coffee: game('coffee'), note: px('note')
};

export function iconSrc(name) {
  if (ICONS[name]) return ICONS[name];
  if (name.startsWith('portrait:')) return face(name.slice(9));
  return game(name);
}

// Pixel glyphs render at whole-pixel multiples (.pixel-icon); game art and
// portraits scale with the text (.game-icon).
export function ico(name, extra = '') {
  const src = iconSrc(name);
  const cls = src.includes('/pixel-') ? 'pixel-icon' : 'game-icon';
  return `<img src="${src}" alt="" class="${cls} pixel-img${extra ? ` ${extra}` : ''}" aria-hidden="true">`;
}

export function hydrateIcons(root = document) {
  root.querySelectorAll('i[data-icon]').forEach(el => {
    el.insertAdjacentHTML('beforebegin', ico(el.dataset.icon, el.className));
    el.remove();
  });
}
