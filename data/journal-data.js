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
  { id: 'insects', name: 'Côn trùng hang', nameEn: 'Cave Insects', goal: 80, reward: 'Đầu Côn trùng', rewardEn: 'Insect Head', icon: 'monster_bug',
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

// Fun stats (player.stats): the save key, lowercased, -> label. Grouped as on the
// game's Collections > Stats page; keys not listed here are not shown.
export const STAT_GROUPS = [
  { id: 'farm', name: 'Nông trại', nameEn: 'Farming', icon: 'crops', stats: [
    ['daysplayed', 'Ngày đã chơi', 'Days played'], ['seedssown', 'Hạt giống đã gieo', 'Seeds sown'], ['dirthoed', 'Ô đất đã cuốc', 'Soil tiles hoed'],
    ['cropsshipped', 'Nông sản đã giao bán', 'Crops shipped'], ['itemsshipped', 'Vật phẩm đã giao bán', 'Items shipped'],
    ['chickeneggslayed', 'Trứng gà', 'Chicken eggs laid'], ['duckeggslayed', 'Trứng vịt', 'Duck eggs laid'], ['cowmilkproduced', 'Sữa bò', 'Cow milk'],
    ['goatmilkproduced', 'Sữa dê', 'Goat milk'], ['sheepwoolproduced', 'Lông cừu', 'Sheep wool'], ['rabbitwoolproduced', 'Lông thỏ', 'Rabbit wool'],
    ['trufflesfound', 'Nấm cục tìm được', 'Truffles found'], ['cheesemade', 'Phô mai đã làm', 'Cheese made'], ['goatcheesemade', 'Phô mai dê đã làm', 'Goat cheese made'],
    ['preservesmade', 'Mứt và dưa muối đã làm', 'Preserves made'], ['beveragesmade', 'Đồ uống đã ủ', 'Beverages made'],
    ['itemscrafted', 'Đồ đã chế tạo', 'Items crafted'], ['itemscooked', 'Món đã nấu', 'Dishes cooked']] },
  { id: 'nature', name: 'Hái lượm & Câu cá', nameEn: 'Foraging & Fishing', icon: 'forage', stats: [
    ['itemsforaged', 'Đồ hái lượm', 'Items foraged'], ['treeschopped', 'Cây đã đốn', 'Trees chopped'], ['stumpschopped', 'Gốc cây đã chặt', 'Stumps chopped'],
    ['wildtreesplanted', 'Cây rừng đã trồng', 'Wild trees planted'], ['mossharvested', 'Rêu đã thu', 'Moss harvested'], ['weedseliminated', 'Cỏ dại đã dọn', 'Weeds cleared'],
    ['cavecarrotsfound', 'Cà rốt hang tìm được', 'Cave carrots found'], ['timesfished', 'Lần quăng câu', 'Times fished'], ['fishcaught', 'Cá đã câu', 'Fish caught'],
    ['precisefishcaught', 'Cá câu hoàn hảo', 'Perfect catches'], ['fishingtreasures', 'Rương kho báu khi câu', 'Fishing treasures']] },
  { id: 'mines', name: 'Hầm mỏ & Chiến đấu', nameEn: 'Mining & Combat', icon: 'mines', stats: [
    ['rockscrushed', 'Đá đã đập', 'Rocks crushed'], ['stonegathered', 'Đá thu được', 'Stone gathered'], ['copperfound', 'Quặng đồng', 'Copper ore'],
    ['ironfound', 'Quặng sắt', 'Iron ore'], ['goldfound', 'Quặng vàng', 'Gold ore'], ['iridiumfound', 'Quặng iridium', 'Iridium ore'],
    ['diamondsfound', 'Kim cương', 'Diamonds'], ['prismaticshardsfound', 'Mảnh Lăng kính', 'Prismatic shards'], ['otherpreciousgemsfound', 'Đá quý khác', 'Other gems'],
    ['mysticstonescrushed', 'Đá Huyền bí đã đập', 'Mystic stones crushed'], ['geodescracked', 'Hốc đá đã đập', 'Geodes cracked'],
    ['monsterskilled', 'Quái đã hạ', 'Monsters slain'], ['slimeskilled', 'Xà-lam đã hạ', 'Slimes slain'], ['timesunconscious', 'Lần bất tỉnh', 'Times passed out']] },
  { id: 'town', name: 'Thị trấn', nameEn: 'Town life', icon: 'npcs', stats: [
    ['stepstaken', 'Bước chân', 'Steps taken'], ['giftsgiven', 'Quà đã tặng', 'Gifts given'], ['questscompleted', 'Nhiệm vụ đã xong', 'Quests completed'],
    ['billboardquestsdone', 'Việc ở bảng tin đã làm', 'Help Wanted done'], ['notesfound', 'Mẩu giấy bí mật', 'Secret notes found'],
    ['artifactspotsdug', 'Ô cổ vật đã đào', 'Artifact spots dug'], ['trashcanschecked', 'Thùng rác đã lục', 'Trash cans checked'],
    ['piecesoftrashrecycled', 'Rác đã tái chế', 'Trash recycled'], ['mysteryboxesopened', 'Hộp Bí ẩn đã mở', 'Mystery boxes opened'],
    ['ticketprizesclaimed', 'Giải thưởng vé đã nhận', 'Prize tickets claimed'], ['goldentagsturnedin', 'Thẻ Vàng đã nộp', 'Golden tags turned in']] }
];

// The 8 Rarecrows (big craftable ids) and where to get them (Official Stardew Valley Wiki: Rarecrow).
// Placing all 8 on the farm brings a letter with the Deluxe Scarecrow recipe.
export const RARECROWS = [
  { n: 1, id: '110', source: 'Mua ở Hội chợ Stardew Valley với 800 sao.', sourceEn: 'Bought at the Stardew Valley Fair for 800 star tokens.' },
  { n: 2, id: '113', source: 'Mua ở Đêm Hội Ma (Spirit\'s Eve) với 5.000g.', sourceEn: "Bought at Spirit's Eve for 5,000g." },
  { n: 3, id: '126', source: 'Mua ở Sòng bạc với 10.000 Xu Qi.', sourceEn: 'Bought at the Casino for 10,000 Qi Coins.' },
  { n: 4, id: '136', source: 'Đôi khi có ở Xe hàng rong vào Mùa Thu hoặc Đông (4.000g), hoặc mua ở Lễ hội Băng (5.000g).', sourceEn: 'Sometimes at the Traveling Cart in Fall or Winter (4,000g), or at the Festival of Ice (5,000g).' },
  { n: 5, id: '137', source: 'Mua ở Vũ hội Hoa với 2.500g.', sourceEn: 'Bought at the Flower Dance for 2,500g.' },
  { n: 6, id: '138', source: 'Mua của Người Lùn với 2.500g.', sourceEn: 'Bought from the Dwarf for 2,500g.' },
  { n: 7, id: '139', source: 'Quyên góp 20 cổ vật (không tính khoáng sản) cho Bảo Tàng; sau đó mua thêm được ở Chợ Đêm.', sourceEn: 'Donate 20 artifacts (minerals do not count) to the Museum; later also sold at the Night Market.' },
  { n: 8, id: '140', source: 'Quyên góp 40 món cho Bảo Tàng; sau đó mua thêm được ở Chợ Đêm.', sourceEn: 'Donate 40 items to the Museum; later also sold at the Night Market.' }
];

// Special items & powers (Collections > Special Items & Powers, Data/Powers). How the save
// tells each one: a mail flag, a seen event or a stat. `host`: shared, the host's flag counts.
// From stardew-checkup by MouseyPounds (MIT License); sources: Official Stardew Valley Wiki.
export const WALLET = [
  { id: 'RustyKey', flag: 'HasRustyKey', host: true, icon: 'rusty_key', name: 'Chìa khóa Gỉ', nameEn: 'Rusty Key',
    how: 'Quyên góp 60 món cho Bảo Tàng; Gunther trao chìa mở Cống Ngầm.', howEn: 'Donate 60 items to the Museum; Gunther gives the key to the Sewers.' },
  { id: 'SkullKey', flag: 'HasSkullKey', host: true, icon: 'skull_key', name: 'Chìa khóa Đầu lâu', nameEn: 'Skull Key',
    how: 'Xuống tới tầng 120 của Hầm Mỏ; mở Hang Đầu Lâu và máy Junimo Kart.', howEn: 'Reach floor 120 of the Mines; opens Skull Cavern and Junimo Kart.' },
  { id: 'DwarvishTranslationGuide', flag: 'HasDwarvishTranslationGuide', host: true, icon: 'dwarvish_translation_guide', name: 'Sách dịch tiếng Người Lùn', nameEn: 'Dwarvish Translation Guide',
    how: 'Quyên góp đủ 4 Cuộn Giấy Người Lùn cho Bảo Tàng; nói chuyện được với Người Lùn.', howEn: 'Donate all 4 Dwarf Scrolls to the Museum; lets you talk to the Dwarf.' },
  { id: 'ClubCard', flag: 'HasClubCard', icon: 'wallet_club_card', name: 'Thẻ Hội viên', nameEn: 'Club Card',
    how: 'Làm theo chuỗi gợi ý của Mr. Qi bắt đầu từ Mật thư #22 (đường hầm ở Trạm Xe Buýt); mở Sòng bạc ở Sa Mạc.', howEn: "Follow Mr. Qi's trail that starts with Secret Note #22 (the Bus Stop tunnel); opens the Casino in the desert." },
  { id: 'SpecialCharm', flag: 'HasSpecialCharm', icon: 'luck', name: 'Bùa May mắn', nameEn: 'Special Charm',
    how: 'Làm theo Mật thư #20 (cách làm ở tab Mật Thư); tăng vận may mỗi ngày.', howEn: 'Follow Secret Note #20 (see the Secret Notes tab); raises daily luck.' },
  { id: 'MagnifyingGlass', flag: 'HasMagnifyingGlass', icon: 'wallet_magnifying_glass', name: 'Kính lúp', nameEn: 'Magnifying Glass',
    how: 'Nhiệm vụ "Bí ẩn Mùa Đông" (từ Mùa Đông năm 1); nhặt được Mật thư.', howEn: 'The "A Winter Mystery" quest (from Winter, year 1); lets you find Secret Notes.' },
  { id: 'DarkTalisman', flag: 'HasDarkTalisman', icon: 'wallet_dark_talisman', name: 'Bùa Hắc ám', nameEn: 'Dark Talisman',
    how: 'Nhiệm vụ Bùa Hắc ám: tìm bùa trong Hang Bọ Đột Biến (qua Cống Ngầm); mở đường tới Đầm lầy Phù thủy.', howEn: "The Dark Talisman quest: find it in the Mutant Bug Lair (through the Sewers); opens the way to the Witch's Swamp." },
  { id: 'MagicInk', flag: 'HasMagicInk', icon: 'wallet_magic_ink', name: 'Mực Phép thuật', nameEn: 'Magic Ink',
    how: 'Nhiệm vụ "Goblin Phiền toái" ở Đầm lầy Phù thủy; Phù thủy mở việc xây công trình phép.', howEn: 'The Goblin Problem quest in the Witch\'s Swamp; the Wizard can then build magic buildings.' },
  { id: 'KeyToTheTown', flag: 'HasTownKey', icon: 'wallet_key_to_the_town', name: 'Chìa khóa Thị trấn', nameEn: 'Key To The Town',
    how: 'Mua ở Phòng Óc Chó của Mr. Qi với 20 Ngọc Qi; vào mọi nhà bất kỳ giờ nào.', howEn: "Bought in Qi's Walnut Room for 20 Qi Gems; enter any building at any hour." },
  { id: 'ForestMagic', flag: 'canReadJunimoText', icon: 'wallet_forest_magic', name: 'Phép Rừng', nameEn: 'Forest Magic',
    how: 'Uống thuốc của Phù thủy (nhiệm vụ Gặp Phù thủy); đọc được chữ Junimo ở Nhà Cộng Đồng.', howEn: "Drink the Wizard's potion (Meet the Wizard); read the Junimos' writing." },
  { id: 'BearPaw', event: '2120303', icon: 'wallet_bears_knowledge', name: 'Kiến thức của Gấu', nameEn: "Bear's Knowledge",
    how: 'Mật thư #23: mang Siro Phong cho chú gấu ở Rừng Bí Mật; Mâm xôi đen và Mâm xôi hồng bán giá gấp 3.', howEn: 'Secret Note #23: bring Maple Syrup to the bear in the Secret Woods; Blackberries and Salmonberries sell for 3x.' },
  { id: 'SpringOnionMastery', event: '3910979', icon: 'wallet_spring_onion_mastery', name: 'Bậc thầy Hành Xuân', nameEn: 'Spring Onion Mastery',
    how: 'Xem sự kiện 8 tim chung của Jas và Vincent (mục Sự kiện tim); Hành Xuân bán giá gấp 5.', howEn: "See Jas and Vincent's shared 8-heart event (Heart events section); Spring Onions sell for 5x." },
  { id: 'Mastery_Farming', stat: 'mastery_0', icon: 'skill_mastery', name: 'Thành Thạo Trồng trọt', nameEn: 'Farming Mastery',
    how: 'Lên cấp 10 mọi kỹ năng, tới Hang Thành Thạo rồi đủ điểm Thành Thạo để mở.', howEn: 'Max every skill, then earn Mastery points and claim it in the Mastery Cave.' },
  { id: 'Mastery_Fishing', stat: 'mastery_1', icon: 'skill_mastery', name: 'Thành Thạo Câu cá', nameEn: 'Fishing Mastery', how: 'Như trên.', howEn: 'As above.' },
  { id: 'Mastery_Foraging', stat: 'mastery_2', icon: 'skill_mastery', name: 'Thành Thạo Hái lượm', nameEn: 'Foraging Mastery', how: 'Như trên.', howEn: 'As above.' },
  { id: 'Mastery_Mining', stat: 'mastery_3', icon: 'skill_mastery', name: 'Thành Thạo Khai khoáng', nameEn: 'Mining Mastery', how: 'Như trên.', howEn: 'As above.' },
  { id: 'Mastery_Combat', stat: 'mastery_4', icon: 'skill_mastery', name: 'Thành Thạo Chiến đấu', nameEn: 'Combat Mastery', how: 'Như trên.', howEn: 'As above.' }
];
