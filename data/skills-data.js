// ==========================================================================
// STARDEW VALLEY WIKI - KỸ NĂNG & NGHỀ (SKILLS & PROFESSIONS)
// Dùng để hiện hồ sơ nhân vật sau khi nạp file save. Tên và mô tả nghề theo
// bản Việt hóa Stardew Valley Viethoa (Kou & Luxanna); mốc kinh nghiệm theo
// Official Stardew Valley Wiki.
// ==========================================================================

// Order matches <experiencePoints> in the save: farming, fishing, foraging, mining, combat
export const SKILLS = [
  { id: 'farming', name: 'Trồng trọt', nameEn: 'Farming', icon: 'assets/icons/skill_farming.png', field: 'farmingLevel', xp: 0, mastery: 0, masteryName: 'Bậc thầy Nông nghiệp' },
  { id: 'fishing', name: 'Câu cá', nameEn: 'Fishing', icon: 'assets/icons/skill_fishing.png', field: 'fishingLevel', xp: 1, mastery: 1, masteryName: 'Bậc thầy Câu cá' },
  { id: 'foraging', name: 'Hái lượm', nameEn: 'Foraging', icon: 'assets/icons/skill_foraging.png', field: 'foragingLevel', xp: 2, mastery: 2, masteryName: 'Bậc thầy Hái lượm' },
  { id: 'mining', name: 'Khai khoáng', nameEn: 'Mining', icon: 'assets/icons/skill_mining.png', field: 'miningLevel', xp: 3, mastery: 3, masteryName: 'Bậc thầy Khai khoáng' },
  { id: 'combat', name: 'Chiến đấu', nameEn: 'Combat', icon: 'assets/icons/skill_combat.png', field: 'combatLevel', xp: 4, mastery: 4, masteryName: 'Bậc thầy Chiến đấu' }
];

// Total experience needed to reach level 1..10
export const LEVEL_XP = [100, 380, 770, 1300, 2150, 3300, 4800, 6900, 10000, 15000];

// Mastery (1.6): earned after every skill reaches 10; total needed for mastery level 1..5
export const MASTERY_XP = [10000, 25000, 45000, 70000, 100000];

// What each mastery gives, by skill (`mastery` id above). From the Official
// Stardew Valley Wiki, "Mastery Cave" > Masteries, version 1.6.
// kind: 'tool' (given at the pillar), 'recipe' (crafting recipe) or 'perk'.
export const MASTERY_REWARDS = {
  0: [
    { kind: 'tool', en: 'Iridium Scythe', name: 'Liềm Iridium', icon: 'assets/icons/item_iridium_scythe.png',
      text: 'Thu hoạch được mọi loại cây trồng, cắt cỏ khô rất tốt.', textEn: "Can be used to harvest any crops. It's also excellent at gathering hay." },
    { kind: 'recipe', en: 'Statue of Blessings', name: 'Tượng Phước Lành', icon: 'assets/icons/statue_of_blessings.png',
      text: 'Chạm vào tượng mỗi ngày nhận một phước lành khác nhau.', textEn: 'Touching the statue gives a unique blessing every day.' },
    { kind: 'perk', en: 'Golden Animal Cracker', name: 'Bánh thú Vàng', icon: 'assets/icons/x_golden_animal_cracker.png',
      text: 'Bắt đầu tìm được Bánh thú Vàng: cho vật nuôi ăn thì sản phẩm tăng gấp đôi vĩnh viễn (trừ heo).', textEn: "You can now find Golden Animal Crackers, which permanently double a farm animal's produce. Doesn't work on pigs." }
  ],
  1: [
    { kind: 'tool', en: 'Advanced Iridium Rod', name: 'Cần câu Iridium Cao Cấp', icon: 'assets/icons/item_advanced_iridium_rod.png',
      text: 'Gắn được cùng lúc hai phao câu.', textEn: 'Use in the water to catch fish. Up to two bobbers can be attached at once.' },
    { kind: 'recipe', en: 'Challenge Bait', name: 'Mồi thử thách', icon: 'assets/icons/challenge_bait.png',
      text: 'Câu "hoàn hảo" được gấp ba số cá; mỗi lần cá thoát khỏi thanh câu thì số cá giảm.', textEn: 'A "perfect" catch yields triple the fish. Each time a fish escapes the fishing bar, the catch is reduced.' },
    { kind: 'perk', en: 'Golden Treasure Chests', name: 'Rương kho báu Vàng', icon: 'assets/icons/treasure_chest.png',
      text: 'Khi câu cá có thể gặp Rương kho báu Vàng.', textEn: 'You can now encounter Golden Fishing Treasure Chests.' }
  ],
  2: [
    { kind: 'recipe', en: 'Mystic Tree Seed', name: 'Hạt Cây Kỳ bí', icon: 'assets/icons/mystic_tree_seed.png',
      text: 'Trồng ra một loại cây đặc biệt.', textEn: 'This can be planted to grow a special tree.' },
    { kind: 'recipe', en: 'Treasure Totem', name: 'Vật tổ Kho báu', icon: 'assets/icons/x_treasure_totem.png',
      text: 'Dùng trên đất đào được để gọi ra một vòng điểm kho báu.', textEn: 'Use on diggable terrain to summon a ring of treasure spots.' },
    { kind: 'perk', en: 'Golden Mystery Box', name: 'Hộp Kỳ bí Vàng', icon: 'assets/icons/x_golden_mystery_box.png',
      text: 'Bắt đầu tìm được Hộp Kỳ bí Vàng, chứa đồ tốt hơn.', textEn: 'You can now find Golden Mystery Boxes, which contain superior items.' }
  ],
  3: [
    { kind: 'recipe', en: 'Statue Of The Dwarf King', name: 'Tượng Vua người Lùn', icon: 'assets/icons/statue_of_the_dwarf_king.png',
      text: 'Mỗi ngày chọn một trong hai năng lực khai khoáng.', textEn: 'Choose from two mining-related powers each day.' },
    { kind: 'recipe', en: 'Heavy Furnace', name: 'Lò nung năng suất', icon: 'assets/icons/heavy_furnace.png',
      text: 'Hiệu quả hơn lò nung thường: mỗi lần dùng 25 quặng và 3 than.', textEn: "It's more efficient than a regular furnace. Requires 25 pieces of ore and 3 coal per use." },
    { kind: 'perk', en: 'Double gems', name: 'Gấp đôi đá quý', icon: 'assets/icons/diamond.png',
      text: 'Đá có chứa đá quý cho gấp đôi số đá quý.', textEn: 'Gem-bearing rocks now grant twice the gems.' }
  ],
  4: [
    { kind: 'recipe', en: 'Anvil', name: 'Đe', icon: 'assets/icons/anvil.png',
      text: 'Rèn lại trang sức (trinket) để đổi ngẫu nhiên chỉ số; mỗi lần tốn 3 Thỏi Iridium.', textEn: 'Allows you to re-forge trinkets, randomizing their stats. Costs 3 iridium bars per use.' },
    { kind: 'recipe', en: 'Mini-Forge', name: 'Lò rèn cỡ nhỏ', icon: 'assets/icons/mini_forge.png',
      text: 'Dùng lò rèn của Người Lùn ngay tại nhà.', textEn: 'Now, you can use a dwarvish forge from the convenience of your home.' },
    { kind: 'perk', en: 'Trinket slot', name: 'Ô trang sức', icon: 'assets/trinkets/fairy_box.png',
      text: 'Mở thêm một ô trang bị cho trang sức (trinket), tìm được khi phiêu lưu và cho năng lực đặc biệt.', textEn: 'Unlocks a new equipment slot for trinkets. Trinkets can be found while adventuring and grant special powers.' }
  ]
};

// Profession ids as stored in the save. `from`: the level-5 profession it follows
export const PROFESSIONS = {
  0: { skill: 'farming', level: 5, name: "Quản trại", nameEn: 'Rancher', desc: "Sản phẩm từ Động vật tăng thêm 20% giá trị." },
  1: { skill: 'farming', level: 5, name: "Dân cày", nameEn: 'Tiller', desc: "Nông sản tăng thêm 10% giá trị." },
  2: { skill: 'farming', level: 10, from: 0, name: "Chủ trại", nameEn: 'Coopmaster', desc: "Làm thân với gia cầm nhanh hơn. Thời gian ấp trứng giảm đi một nửa." },
  3: { skill: 'farming', level: 10, from: 0, name: "Người chăn cừu", nameEn: 'Shepherd', desc: "Làm thân với gia súc nhanh hơn. Cừu mọc lông nhanh hơn." },
  4: { skill: 'farming', level: 10, from: 1, name: "Nghệ nhân", nameEn: 'Artisan', desc: "Đồ thủ công (rượu, phô mai, dầu,...) tăng thêm 40% giá trị." },
  5: { skill: 'farming', level: 10, from: 1, name: "Nhà nông nghiệp", nameEn: 'Agriculturist', desc: "Mọi loại cây trồng sinh trưởng nhanh hơn 10%." },
  6: { skill: 'fishing', level: 5, name: "Dân câu", nameEn: 'Fisher', desc: "Cá tăng thêm 25% giá trị." },
  7: { skill: 'fishing', level: 5, name: "Thợ bẫy", nameEn: 'Trapper', desc: "Giảm lượng nguyên liệu cần để chế tạo bẫy cua." },
  8: { skill: 'fishing', level: 10, from: 6, name: "Thợ câu", nameEn: 'Angler', desc: "Cá tăng thêm 50% giá trị." },
  9: { skill: 'fishing', level: 10, from: 6, name: "Hải tặc", nameEn: 'Pirate', desc: "Cơ hội tìm thấy kho báu tăng gấp đôi." },
  10: { skill: 'fishing', level: 10, from: 7, name: "Thủy thủ", nameEn: 'Mariner', desc: "Bẫy cua sẽ không còn lọt rác nữa." },
  11: { skill: 'fishing', level: 10, from: 7, name: "Bậc thầy mồi chài", nameEn: 'Luremaster', desc: "Bẫy cua sẽ không cần bỏ mồi nữa." },
  12: { skill: 'foraging', level: 5, name: "Kiểm lâm", nameEn: 'Forester', desc: "Cây cho thêm 25% gỗ." },
  13: { skill: 'foraging', level: 5, name: "Dân hái lượm", nameEn: 'Gatherer', desc: "Có cơ hội nhận được gấp đôi sản phẩm hái lượm." },
  14: { skill: 'foraging', level: 10, from: 12, name: "Thợ đốn gỗ", nameEn: 'Lumberjack', desc: "Mọi loại cây đều có khả năng rớt gỗ cứng." },
  15: { skill: 'foraging', level: 10, from: 12, name: "Người thu nhựa", nameEn: 'Tapper', desc: "Nhựa cây tăng thêm 25% giá trị." },
  16: { skill: 'foraging', level: 10, from: 13, name: "Nhà thực vật", nameEn: 'Botanist', desc: "Sản phẩm hái lượm luôn đạt chất lượng cao nhất." },
  17: { skill: 'foraging', level: 10, from: 13, name: "Điều tra viên", nameEn: 'Tracker', desc: "Thể hiện vị trí những sản vật hái lượm." },
  18: { skill: 'mining', level: 5, name: "Thợ mỏ", nameEn: 'Miner', desc: "+1 quặng ở mỗi vỉa quặng." },
  19: { skill: 'mining', level: 5, name: "Nhà địa chất", nameEn: 'Geologist', desc: "Đá quý có khả năng xuất hiện theo cặp." },
  20: { skill: 'mining', level: 10, from: 18, name: "Thợ rèn", nameEn: 'Blacksmith', desc: "Thanh kim loại tăng thêm 50% giá trị." },
  21: { skill: 'mining', level: 10, from: 18, name: "Thợ thăm dò", nameEn: 'Prospector', desc: "Cơ hội tìm thấy than tăng gấp đôi." },
  22: { skill: 'mining', level: 10, from: 19, name: "Thợ đào mỏ", nameEn: 'Excavator', desc: "Cơ hội tìm thấy tinh thạch tăng gấp đôi." },
  23: { skill: 'mining', level: 10, from: 19, name: "Chuyên gia đá quý", nameEn: 'Gemologist', desc: "Đá quý tăng thêm 30% giá trị." },
  24: { skill: 'combat', level: 5, name: "Đấu sĩ", nameEn: 'Fighter', desc: "Mọi đòn đánh gây thêm 10% sát thương." },
  25: { skill: 'combat', level: 5, name: "Trinh sát", nameEn: 'Scout', desc: "Cơ hội ra đòn chí mạng tăng thêm 50%." },
  26: { skill: 'combat', level: 10, from: 24, name: "Bạo nhân", nameEn: 'Brute', desc: "Gây thêm 15% sát thương." },
  27: { skill: 'combat', level: 10, from: 24, name: "Hộ vệ", nameEn: 'Defender', desc: "+25 điểm sinh lực." },
  28: { skill: 'combat', level: 10, from: 25, name: "Đặc công", nameEn: 'Acrobat', desc: "Thời gian hồi phục đòn tuyệt chiêu giảm một nửa." },
  29: { skill: 'combat', level: 10, from: 25, name: "Liều mạng", nameEn: 'Desperado', desc: "Đòn chí mạng sẽ triệt hạ đối thủ." }
};
