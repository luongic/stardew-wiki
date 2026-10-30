// ==========================================================================
// LOCALSTORAGE HELPERS
// Every read tolerates blocked storage or corrupt JSON and falls back to the
// default, so a bad value never stops the app from booting.
// ==========================================================================

export const KEYS = {
  completedRecipes: 'stardew_wiki_completed_recipes',
  completedQuests: 'stardew_wiki_completed_quests',
  season: 'stardew_wiki_season',
  audio: 'stardew_wiki_audio_enabled',
  planner: 'stardew_wiki_planner',
  gathered: 'stardew_wiki_gathered_materials',
  bundles: 'stardew_wiki_bundles',
  museum: 'stardew_wiki_museum',
  note: 'stardew_wiki_note',
  farm: 'stardew_wiki_farm',
  farmView: 'stardew_wiki_farm_view',
  today: 'stardew_wiki_today',
  fishingView: 'stardew_wiki_fishing_view',
  fishCaught: 'stardew_wiki_fish_caught',
  profiles: 'stardew_wiki_profiles',
  journal: 'stardew_wiki_journal'
};

export function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

export function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Lỗi lưu dữ liệu', key, e);
  }
}

export function loadSet(key) {
  const arr = loadJSON(key, []);
  return new Set(Array.isArray(arr) ? arr : []);
}

export function saveSet(key, set) {
  saveJSON(key, Array.from(set));
}
