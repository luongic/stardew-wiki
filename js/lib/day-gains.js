// ==========================================================================
// GAINS BETWEEN TWO SAVES
// A save only keeps running totals, so what a day brought is the difference
// between two saves: the one just read and an earlier one, either the _old
// copy the game keeps beside it (the save before) or what this site read
// last time. Players are matched by name.
// ==========================================================================

const SEASONS = ['spring', 'summer', 'fall', 'winter'];
export const dayIndex = d => (d.year - 1) * 112 + SEASONS.indexOf(d.season) * 28 + d.day;

// now / before: { day, players (readPlayers) }; source: 'old' | 'last'
// -> { from, to, source, at, players: [{ name, skills: [{ xp, from, to }], mastery, earned, fish, monsters }] }
// or null when `before` isn't an earlier day
export function dayGains(now, before, source) {
  if (!before?.day || !before.players?.length || dayIndex(before.day) >= dayIndex(now.day)) return null;
  const players = now.players.map(p => {
    const b = before.players.find(x => x.name === p.name);
    if (!b) return null;
    return {
      name: p.name,
      skills: p.skills.map((s, i) => ({ xp: Math.max(0, s.xp - (b.skills[i]?.xp || 0)), from: b.skills[i]?.level || 0, to: s.level })),
      mastery: Math.max(0, (p.masteryXp || 0) - (b.masteryXp || 0)),
      earned: Math.max(0, (p.earned || 0) - (b.earned || 0)),
      fish: Math.max(0, (p.fishCaught || 0) - (b.fishCaught || 0)),
      monsters: Math.max(0, (p.monstersKilled || 0) - (b.monstersKilled || 0))
    };
  }).filter(Boolean);
  return players.length ? { from: before.day, to: now.day, source, at: Date.now(), players } : null;
}
