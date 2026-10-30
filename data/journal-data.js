// ==========================================================================
// STARDEW VALLEY WIKI - SỔ TAY NÔNG TRẠI (dữ liệu tra cứu)
// Mục tiêu diệt quái của Hội Mạo Hiểm Giả và cách tính Hoàn Hảo, theo
// Official Stardew Valley Wiki (Adventurer's Guild, Qi's Walnut Room).
// ==========================================================================

// Marlon's goals. `monsters`: names as counted in the save (stats.specificMonstersKilled)
export const MONSTER_GOALS = [
  { id: 'slimes', name: 'Xà-lam', nameEn: 'Slimes', goal: 1000, reward: 'Nhẫn Dụ Xà-lam', rewardEn: 'Slime Charmer Ring', icon: 'monster_green_slime',
    monsters: ['Green Slime', 'Frost Jelly', 'Sludge', 'Tiger Slime'] },
  { id: 'void', name: 'Hồn Hư không', nameEn: 'Void Spirits', goal: 150, reward: 'Nhẫn Hoang dã', rewardEn: 'Savage Ring', icon: 'monster_shadow_brute',
    monsters: ['Shadow Guy', 'Shadow Shaman', 'Shadow Brute', 'Shadow Sniper'] },
  { id: 'bats', name: 'Dơi', nameEn: 'Bats', goal: 200, reward: 'Nhẫn Ma cà rồng', rewardEn: 'Vampire Ring', icon: 'monster_bat',
    monsters: ['Bat', 'Frost Bat', 'Lava Bat', 'Iridium Bat'] },
  { id: 'skeletons', name: 'Xương khô', nameEn: 'Skeletons', goal: 50, reward: 'Mặt nạ Đầu lâu', rewardEn: 'Skeleton Mask', icon: 'monster_skeleton',
    monsters: ['Skeleton', 'Skeleton Mage'] },
  { id: 'insects', name: 'Côn trùng hang', nameEn: 'Cave Insects', goal: 80, reward: 'Mũ Đầu côn trùng', rewardEn: 'Insect Head', icon: 'monster_bug',
    monsters: ['Bug', 'Fly', 'Grub', 'Mutant Fly', 'Mutant Grub', 'Armored Bug'] },
  { id: 'duggies', name: 'Duggy', nameEn: 'Duggies', goal: 30, reward: 'Mũ Bảo hộ', rewardEn: 'Hard Hat', icon: 'monster_duggy',
    monsters: ['Duggy', 'Magma Duggy'] },
  { id: 'dust', name: 'Tinh linh Bụi', nameEn: 'Dust Sprites', goal: 500, reward: 'Nhẫn Kẻ trộm', rewardEn: "Burglar's Ring", icon: 'monster_dust_sprite',
    monsters: ['Dust Spirit'] },
  { id: 'crabs', name: 'Cua đá', nameEn: 'Rock Crabs', goal: 60, reward: 'Nhẫn Mai cua', rewardEn: 'Crabshell Ring', icon: 'monster_rock_crab',
    monsters: ['Rock Crab', 'Lava Crab', 'Iridium Crab'] },
  { id: 'mummies', name: 'Xác ướp', nameEn: 'Mummies', goal: 100, reward: 'Mũ Bí ẩn', rewardEn: 'Arcane Hat', icon: 'monster_mummy',
    monsters: ['Mummy'] },
  { id: 'rex', name: 'Khủng long Ớt', nameEn: 'Pepper Rex', goal: 50, reward: 'Mũ Hiệp sĩ', rewardEn: "Knight's Helmet", icon: 'monster_pepper_rex',
    monsters: ['Pepper Rex'] },
  { id: 'serpents', name: 'Mãng xà', nameEn: 'Serpents', goal: 250, reward: 'Nhẫn Bom cháy', rewardEn: 'Napalm Ring', icon: 'monster_serpent',
    monsters: ['Serpent', 'Royal Serpent'] },
  { id: 'magma', name: 'Ma trơi núi lửa', nameEn: 'Magma Sprites', goal: 150, reward: 'Số điện thoại của Marlon', rewardEn: "Marlon's phone number", icon: 'monster_magma_sprite',
    monsters: ['Magma Sprite', 'Magma Sparker'] }
];

// The 34 villagers counted by "Great Friends" (save names)
export const PERFECTION_VILLAGERS = ['Abigail', 'Alex', 'Caroline', 'Clint', 'Demetrius', 'Dwarf', 'Elliott', 'Emily', 'Evelyn', 'George',
  'Gus', 'Haley', 'Harvey', 'Jas', 'Jodi', 'Kent', 'Krobus', 'Leah', 'Leo', 'Lewis', 'Linus', 'Marnie', 'Maru', 'Pam', 'Penny', 'Pierre',
  'Robin', 'Sam', 'Sandy', 'Sebastian', 'Shane', 'Vincent', 'Willy', 'Wizard'];
// Datable villagers count as maxed at 8 hearts, everyone else at 10
export const DATABLE = ['Abigail', 'Alex', 'Elliott', 'Emily', 'Haley', 'Harvey', 'Leah', 'Maru', 'Penny', 'Sam', 'Sebastian', 'Shane'];

// Mail flags left by each Stardrop
export const STARDROPS = [
  { flag: 'CF_Fair', name: 'Hội Chợ Thung Lũng (2.000 sao)', nameEn: 'Stardew Valley Fair (2,000 tokens)' },
  { flag: 'CF_Mines', name: 'Rương ở tầng 100 Hầm Mỏ', nameEn: 'Mines floor 100 chest' },
  { flag: 'CF_Spouse', name: 'Vợ/chồng hoặc bạn ở chung đạt 12,5 tim', nameEn: 'Spouse or roommate at 12.5 hearts' },
  { flag: 'CF_Sewer', name: 'Mua của Krobus (20.000g)', nameEn: 'Bought from Krobus (20,000g)' },
  { flag: 'CF_Statue', name: 'Tượng Lão Sư Cannoli (Dâu ngọc Ngọt ngào)', nameEn: 'Old Master Cannoli (Sweet Gem Berry)' },
  { flag: 'CF_Fish', name: 'Thư của Willy sau thành tựu Bậc Thầy Câu Cá', nameEn: "Willy's letter after Master Angler" },
  { flag: 'museumComplete', name: 'Quyên góp đủ 95 món cho Bảo Tàng', nameEn: 'All 95 museum donations' }
];

// Perfection Tracker categories (weight in %, amount required)
export const PERFECTION = [
  { id: 'shipped', name: 'Nông sản & đồ thu nhặt đã giao bán', nameEn: 'Produce & Forage Shipped', weight: 15, total: 154 },
  { id: 'obelisks', name: 'Trụ dịch chuyển trên nông trại', nameEn: 'Obelisks on Farm', weight: 4, total: 4 },
  { id: 'clock', name: 'Đồng hồ Hoàng kim trên nông trại', nameEn: 'Golden Clock on Farm', weight: 10, total: 1 },
  { id: 'slayer', name: 'Hoàn thành mọi mục tiêu diệt quái', nameEn: 'Monster Slayer Hero', weight: 10, total: 12 },
  { id: 'friends', name: 'Tình bạn tối đa với mọi dân làng', nameEn: 'Great Friends', weight: 11, total: 34 },
  { id: 'level', name: 'Cấp nông dân (mọi kỹ năng cấp 10)', nameEn: 'Farmer Level', weight: 5, total: 25 },
  { id: 'stardrops', name: 'Tìm đủ Stardrop', nameEn: 'Found All Stardrops', weight: 10, total: 7 },
  { id: 'cooking', name: 'Món đã nấu', nameEn: 'Cooking Recipes Made', weight: 10, total: 81 },
  { id: 'crafting', name: 'Đồ đã chế tạo', nameEn: 'Crafting Recipes Made', weight: 10, total: 149 },
  { id: 'fish', name: 'Cá đã câu', nameEn: 'Fish Caught', weight: 10, total: 72 },
  { id: 'walnuts', name: 'Óc Chó Vàng đã tìm', nameEn: 'Golden Walnuts found', weight: 5, total: 130 }
];

// Shipping collection: item categories counted in the "Items Shipped" tab
export const SHIPPED_CATEGORIES = [-75, -79, -80, -81, -5, -6, -18, -26, -27, -14, -17, -23, -15, -16];
