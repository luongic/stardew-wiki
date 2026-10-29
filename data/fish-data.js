// ==========================================================================
// STARDEW VALLEY WIKI - CÁ (FISHING)
// Khi nào và ở đâu câu được từng loài cá (theo Official Stardew Valley Wiki).
//   loc     : mã địa điểm (xem FISH_LOCATIONS)
//   time    : các khung giờ [bắt đầu, kết thúc], 6 = 6:00, 26 = 2:00 sáng
//   seasons : mùa câu được ở địa điểm chính
//   weather : 'sun' (trời nắng), 'rain' (trời mưa) hoặc 'any'
//   note    : ngoại lệ (VI)
// Tên, hình và giá lấy từ data/items-data.js qua nameEn.
// ==========================================================================

export const FISH_LOCATIONS = {
  ocean: { name: 'Biển (Bãi Biển)', nameEn: 'Ocean' },
  river_town: { name: 'Sông thị trấn', nameEn: 'Town River' },
  river_forest: { name: 'Sông Rừng Cindersap', nameEn: 'Forest River' },
  lake: { name: 'Hồ trên Núi', nameEn: 'Mountain Lake' },
  pond: { name: 'Ao Rừng Cindersap', nameEn: 'Forest Pond' },
  waterfall: { name: 'Thác Rừng Cindersap', nameEn: 'Forest Waterfalls' },
  secret_woods: { name: 'Rừng Bí Mật', nameEn: 'Secret Woods' },
  sewers: { name: 'Cống Ngầm', nameEn: 'The Sewers' },
  bug_lair: { name: 'Hang Bọ Đột Biến', nameEn: 'Mutant Bug Lair' },
  swamp: { name: 'Đầm Lầy Phù Thủy', nameEn: "Witch's Swamp" },
  desert: { name: 'Sa Mạc Calico', nameEn: 'Calico Desert' },
  mines: { name: 'Hầm Mỏ (tầng 20, 60, 100)', nameEn: 'The Mines' },
  night_market: { name: 'Tàu ngầm Chợ Đêm', nameEn: 'Night Market Submarine' },
  island: { name: 'Đảo Gừng', nameEn: 'Ginger Island' },
  pirate_cove: { name: 'Hang Hải Tặc (Đảo Gừng)', nameEn: 'Pirate Cove' },
  volcano: { name: 'Núi Lửa (Đảo Gừng)', nameEn: 'Volcano' },
  crabpot_ocean: { name: 'Lồng bẫy cua: nước mặn', nameEn: 'Crab Pot: ocean' },
  crabpot_fresh: { name: 'Lồng bẫy cua: nước ngọt', nameEn: 'Crab Pot: freshwater' }
};

const ALL = ['spring', 'summer', 'fall', 'winter'];
const ANY = [[6, 26]];
const RIVER = ['river_town', 'river_forest'];

export const FISH = [
  // ---- Ocean ----
  { en: 'Albacore', loc: ['ocean'], time: [[6, 11], [18, 26]], seasons: ['fall', 'winter'], weather: 'any' },
  { en: 'Anchovy', loc: ['ocean'], time: ANY, seasons: ['spring', 'fall'], weather: 'any' },
  { en: 'Eel', loc: ['ocean'], time: [[16, 26]], seasons: ['spring', 'fall'], weather: 'rain' },
  { en: 'Flounder', loc: ['ocean', 'island'], time: [[6, 20]], seasons: ['spring', 'summer'], weather: 'any' },
  { en: 'Halibut', loc: ['ocean'], time: [[6, 11], [19, 26]], seasons: ['spring', 'summer', 'winter'], weather: 'any' },
  { en: 'Herring', loc: ['ocean'], time: ANY, seasons: ['spring', 'winter'], weather: 'any' },
  { en: 'Octopus', loc: ['ocean', 'island'], time: [[6, 13]], seasons: ['summer'], weather: 'any', note: 'Đảo Gừng quanh năm; tàu ngầm Chợ Đêm (15-17 Đông).' },
  { en: 'Pufferfish', loc: ['ocean', 'island'], time: [[12, 16]], seasons: ['summer'], weather: 'sun', note: 'Đảo Gừng quanh năm khi trời nắng.' },
  { en: 'Red Mullet', loc: ['ocean'], time: [[6, 19]], seasons: ['summer', 'winter'], weather: 'any' },
  { en: 'Red Snapper', loc: ['ocean'], time: [[6, 19]], seasons: ['summer', 'fall'], weather: 'rain', note: 'Mùa Đông nếu dùng Vật Tổ Mưa.' },
  { en: 'Sardine', loc: ['ocean'], time: [[6, 19]], seasons: ['spring', 'fall', 'winter'], weather: 'any' },
  { en: 'Sea Cucumber', loc: ['ocean'], time: [[6, 19]], seasons: ['fall', 'winter'], weather: 'any', note: 'Cũng có ở tàu ngầm Chợ Đêm.' },
  { en: 'Squid', loc: ['ocean'], time: [[18, 26]], seasons: ['winter'], weather: 'any', note: 'Câu cả ngày trong Lễ Hội Mực (12-13 Đông).' },
  { en: 'Super Cucumber', loc: ['ocean', 'island'], time: [[18, 26]], seasons: ['summer', 'fall'], weather: 'any', note: 'Đảo Gừng quanh năm; tàu ngầm Chợ Đêm.' },
  { en: 'Tilapia', loc: ['ocean', 'island'], time: [[6, 14]], seasons: ['summer', 'fall'], weather: 'any', note: 'Đảo Gừng quanh năm.' },
  { en: 'Tuna', loc: ['ocean', 'island'], time: [[6, 19]], seasons: ['summer', 'winter'], weather: 'any', note: 'Đảo Gừng quanh năm.' },
  { en: 'Crimsonfish', loc: ['ocean'], time: ANY, seasons: ['summer'], weather: 'any', legendary: true, note: 'Cuối cầu tàu phía đông Bãi Biển, cần câu cá cấp 5.' },
  // ---- Rivers ----
  { en: 'Bream', loc: RIVER, time: [[18, 26]], seasons: ALL, weather: 'any' },
  { en: 'Catfish', loc: [...RIVER, 'secret_woods', 'swamp'], time: [[6, 24]], seasons: ['spring', 'fall'], weather: 'rain', note: 'Rừng Bí Mật và Đầm Phù Thủy: Xuân, Hạ, Thu khi mưa.' },
  { en: 'Dorado', loc: ['river_forest'], time: [[6, 19]], seasons: ['summer'], weather: 'any' },
  { en: 'Pike', loc: [...RIVER, 'pond'], time: ANY, seasons: ['summer', 'winter'], weather: 'any' },
  { en: 'Rainbow Trout', loc: [...RIVER, 'lake'], time: [[6, 19]], seasons: ['summer'], weather: 'sun', note: 'Câu cả ngày, mọi thời tiết trong giải Trout Derby (20-21 Hạ).' },
  { en: 'Salmon', loc: RIVER, time: [[6, 19]], seasons: ['fall'], weather: 'any' },
  { en: 'Shad', loc: RIVER, time: [[9, 26]], seasons: ['spring', 'summer', 'fall'], weather: 'rain' },
  { en: 'Smallmouth Bass', loc: ['river_town', 'pond'], time: ANY, seasons: ['spring', 'fall'], weather: 'any' },
  { en: 'Sunfish', loc: RIVER, time: [[6, 19]], seasons: ['spring', 'summer'], weather: 'sun' },
  { en: 'Tiger Trout', loc: RIVER, time: [[6, 19]], seasons: ['fall', 'winter'], weather: 'any' },
  { en: 'Walleye', loc: [...RIVER, 'lake', 'pond'], time: [[12, 26]], seasons: ['fall'], weather: 'rain', note: 'Mùa Đông nếu dùng Vật Tổ Mưa.' },
  { en: 'Lingcod', loc: [...RIVER, 'lake'], time: ANY, seasons: ['winter'], weather: 'any' },
  { en: 'Perch', loc: [...RIVER, 'lake', 'pond'], time: ANY, seasons: ['winter'], weather: 'any' },
  { en: 'Chub', loc: ['river_forest', 'lake'], time: ANY, seasons: ALL, weather: 'any' },
  { en: 'Goby', loc: ['waterfall'], time: ANY, seasons: ALL, weather: 'any' },
  { en: 'Angler', loc: ['river_town'], time: ANY, seasons: ['fall'], weather: 'any', legendary: true, note: 'Trên cây cầu gỗ phía bắc thị trấn (gần JojaMart), cần câu cá cấp 3.' },
  { en: 'Glacierfish', loc: ['river_forest'], time: ANY, seasons: ['winter'], weather: 'any', legendary: true, note: 'Mũi nam Đảo Mũi Tên ở Rừng Cindersap, cần câu cá cấp 6.' },
  // ---- Mountain lake & ponds ----
  { en: 'Bullhead', loc: ['lake'], time: ANY, seasons: ALL, weather: 'any' },
  { en: 'Carp', loc: ['lake', 'secret_woods', 'sewers', 'bug_lair'], time: ANY, seasons: ['spring', 'summer', 'fall'], weather: 'any', note: 'Rừng Bí Mật, Cống Ngầm, Hang Bọ: quanh năm.' },
  { en: 'Largemouth Bass', loc: ['lake'], time: [[6, 19]], seasons: ALL, weather: 'any' },
  { en: 'Midnight Carp', loc: ['lake', 'pond', 'island'], time: [[22, 26]], seasons: ['fall', 'winter'], weather: 'any', note: 'Sông Đảo Gừng quanh năm.' },
  { en: 'Sturgeon', loc: ['lake'], time: [[6, 19]], seasons: ['summer', 'winter'], weather: 'any' },
  { en: 'Legend', loc: ['lake'], time: ANY, seasons: ['spring'], weather: 'rain', legendary: true, note: 'Gần khúc gỗ chìm ở Hồ trên Núi, cần câu cá cấp 10.' },
  { en: 'Woodskip', loc: ['secret_woods'], time: ANY, seasons: ALL, weather: 'any' },
  // ---- Special places ----
  { en: 'Ghostfish', loc: ['mines'], time: ANY, seasons: ALL, weather: 'any', note: 'Tầng 20 và 60.' },
  { en: 'Stonefish', loc: ['mines'], time: ANY, seasons: ALL, weather: 'any', note: 'Tầng 20.' },
  { en: 'Ice Pip', loc: ['mines'], time: ANY, seasons: ALL, weather: 'any', note: 'Tầng 60.' },
  { en: 'Lava Eel', loc: ['mines', 'volcano'], time: ANY, seasons: ALL, weather: 'any', note: 'Tầng 100 Hầm Mỏ, miệng Núi Lửa.' },
  { en: 'Sandfish', loc: ['desert'], time: [[6, 20]], seasons: ALL, weather: 'any' },
  { en: 'Scorpion Carp', loc: ['desert'], time: [[6, 20]], seasons: ALL, weather: 'any' },
  { en: 'Mutant Carp', loc: ['sewers'], time: ANY, seasons: ALL, weather: 'any', legendary: true },
  { en: 'Slimejack', loc: ['bug_lair'], time: ANY, seasons: ALL, weather: 'any' },
  { en: 'Void Salmon', loc: ['swamp'], time: ANY, seasons: ALL, weather: 'any' },
  { en: 'Blobfish', loc: ['night_market'], time: [[17, 26]], seasons: ['winter'], weather: 'any', note: 'Chỉ 15-17 Đông.' },
  { en: 'Midnight Squid', loc: ['night_market'], time: [[17, 26]], seasons: ['winter'], weather: 'any', note: 'Chỉ 15-17 Đông.' },
  { en: 'Spook Fish', loc: ['night_market'], time: [[17, 26]], seasons: ['winter'], weather: 'any', note: 'Chỉ 15-17 Đông.' },
  { en: 'Blue Discus', loc: ['island'], time: ANY, seasons: ALL, weather: 'any', note: 'Sông Đảo Gừng.' },
  { en: 'Lionfish', loc: ['island'], time: ANY, seasons: ALL, weather: 'any', note: 'Biển Đảo Gừng.' },
  { en: 'Stingray', loc: ['pirate_cove'], time: ANY, seasons: ALL, weather: 'any' },
  // ---- Crab pots (any time, any weather, all year) ----
  { en: 'Lobster', loc: ['crabpot_ocean'], time: ANY, seasons: ALL, weather: 'any', crabpot: true },
  { en: 'Crab', loc: ['crabpot_ocean'], time: ANY, seasons: ALL, weather: 'any', crabpot: true },
  { en: 'Shrimp', loc: ['crabpot_ocean'], time: ANY, seasons: ALL, weather: 'any', crabpot: true },
  { en: 'Cockle', loc: ['crabpot_ocean'], time: ANY, seasons: ALL, weather: 'any', crabpot: true },
  { en: 'Mussel', loc: ['crabpot_ocean'], time: ANY, seasons: ALL, weather: 'any', crabpot: true },
  { en: 'Oyster', loc: ['crabpot_ocean'], time: ANY, seasons: ALL, weather: 'any', crabpot: true },
  { en: 'Clam', loc: ['crabpot_ocean'], time: ANY, seasons: ALL, weather: 'any', crabpot: true },
  { en: 'Crayfish', loc: ['crabpot_fresh'], time: ANY, seasons: ALL, weather: 'any', crabpot: true },
  { en: 'Snail', loc: ['crabpot_fresh'], time: ANY, seasons: ALL, weather: 'any', crabpot: true },
  { en: 'Periwinkle', loc: ['crabpot_fresh'], time: ANY, seasons: ALL, weather: 'any', crabpot: true }
];
