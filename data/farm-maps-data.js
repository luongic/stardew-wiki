// ==========================================================================
// STARDEW VALLEY WIKI - CÁC LOẠI NÔNG TRẠI (FARM MAPS)
// Translated from the Official Stardew Valley Wiki, "Farm Maps" (version 1.6):
// https://stardewvalleywiki.com/Farm_Maps (CC BY-NC-SA 3.0). The pictures in
// assets/farm-maps/ are the wiki's own files.
// skills: farming, fishing, foraging, mining, combat, multiplayer
// tillable / buildable: tiles that can be hoed / built on but not hoed
// ==========================================================================

export const FARM_MAPS_INTRO = {
  text: 'Có tám loại nông trại để chọn trong Stardew Valley. Mỗi loại có bố cục riêng, mang lại lợi ích khác nhau và hợp với những kỹ năng nhất định. Chỉ chọn được một loại khi bắt đầu game mới và không đổi được sau đó.',
  textEn: 'There are eight different Farm Maps to choose from in Stardew Valley. Each map features a unique layout of the Farm, offering different benefits and favoring specific skills. Only one map can be chosen when starting a new game, and cannot be changed once selected.',
  notes: [
    'Nông Trại Tiêu Chuẩn có nhiều đất nhất để trồng trọt và nuôi gia súc. Bảy loại còn lại ít đất trồng hơn nhưng có lợi thế riêng.',
    'Bên trong nhà chính được trang trí theo chủ đề của loại nông trại (nội thất, giấy dán tường, sàn). Bên ngoài nhà thì giống nhau ở mọi loại.',
    'Loại nào cũng có một căn nhà bỏ hoang, sau này sửa thành Nhà Kính. Sửa xong có thể dời Nhà Kính ở Tiệm Mộc hoặc Tháp Pháp Sư.'
  ],
  notesEn: [
    'The Standard Farm offers the most space to plant crops and raise animals. The other seven farms lack farming area, but offer special perks.',
    'The interior of the farmhouse is decorated to match the theme of the chosen map (furniture, wallpaper, flooring). The exterior of the house is the same regardless of map choice.',
    "There is an abandoned building on all maps which can later be turned into the Greenhouse. Once repaired, it can be moved at the Carpenter's Shop or the Wizard's Tower."
  ]
};

export const SKILLS = {
  farming: { name: 'Trồng trọt', nameEn: 'Farming', icon: 'assets/icons/skill_farming.png' },
  fishing: { name: 'Câu cá', nameEn: 'Fishing', icon: 'assets/icons/skill_fishing.png' },
  foraging: { name: 'Hái lượm', nameEn: 'Foraging', icon: 'assets/icons/skill_foraging.png' },
  mining: { name: 'Khai khoáng', nameEn: 'Mining', icon: 'assets/icons/skill_mining.png' },
  combat: { name: 'Chiến đấu', nameEn: 'Combat', icon: 'assets/icons/skill_combat.png' },
  multiplayer: { name: 'Chơi co-op', nameEn: 'Multiplayer', icon: 'assets/pixel-members.svg' }
};

export const FARM_MAPS = [
  {
    id: 'standard', name: 'Nông Trại Tiêu Chuẩn', nameEn: 'Standard Farm', icon: 'standard_farm_map_icon.png', image: 'standard_farm.png',
    skills: ['farming'], tillable: 3427, buildable: 235, since: '1.0',
    summary: 'Nhiều đất trồng nhất, hợp để trồng trọt và nuôi gia súc.',
    summaryEn: 'The most farmland, ideal for crops and animals.',
    points: [
      'Phần lớn bản đồ là đất trồng, lý tưởng cho cây trồng và vật nuôi.',
      'Khoảng đất trồng liền mạch hình chữ nhật lớn nhất là 63 x 31 (1953 ô).',
      'Có 3427 ô cuốc được, cộng 235 ô không cuốc được nhưng xây được.'
    ],
    pointsEn: [
      'The majority of this map is farming land, ideal for crops and animals.',
      'The biggest contiguous (tillable) rectangular area is 63 x 31 (1953) tiles.',
      'The number of tillable tiles on this map is 3427, with 235 non-tillable but buildable tiles.'
    ]
  },
  {
    id: 'riverland', name: 'Nông Trại Ven Sông', nameEn: 'Riverland Farm', icon: 'riverland_farm_map_icon.png', image: 'riverlands_farm.png',
    skills: ['fishing'], tillable: 1578, buildable: 516, since: '1.1',
    summary: 'Nhiều sông nước, câu cá ngay tại nhà.',
    summaryEn: 'Lots of water: fish right at home.',
    points: [
      'Sông nước làm diện tích đất trồng giảm đáng kể.',
      'Người chơi bắt đầu với một Lò Hun Cá.',
      'Câu cá rất đáng trên nông trại này: 70% số lần câu ra cá sông của Thị Trấn Pelican, 30% ra cá của Rừng Cindersap.',
      'Có điểm bong bóng cá ngẫu nhiên, điều mà các loại nông trại khác không có.',
      'Có 1578 ô cuốc được, cộng 516 ô không cuốc được nhưng xây được.',
      '6 bụi cây chặt được bằng Rìu đã nâng cấp (từ Rìu Đồng trở lên).'
    ],
    pointsEn: [
      'Water significantly decreases the overall farming area.',
      'Players start with a Fish Smoker.',
      'Fishing is viable on this farm: 70% of the time players catch town river fish (found in Pelican Town), 30% of the time forest fish (found in Cindersap Forest).',
      'Random Bubble Spots are enabled on this map, unlike for all other Farm Maps.',
      'The number of tillable tiles on this map is 1578, with 516 non-tillable but buildable tiles.',
      '6 bushes can be chopped down with an upgraded Axe (copper or better).'
    ]
  },
  {
    id: 'forest', name: 'Nông Trại Rừng', nameEn: 'Forest Farm', icon: 'forest_farm_map_icon.png', image: 'forest_farm.png',
    skills: ['foraging'], tillable: 1413, buildable: 1490, since: '1.1',
    summary: 'Gốc cây lớn cho Gỗ Cứng mỗi ngày, nhiều đồ hái lượm.',
    summaryEn: 'Renewable Large Stumps for Hardwood and plenty of forage.',
    points: [
      'Viền nông trại là cây cối và bụi rậm, giống Rừng Bí Mật.',
      'Có nhiều bụi cây, kể cả bụi ra quả mọng. 16 bụi cây chặt được bằng Rìu đã nâng cấp (từ Rìu Đồng trở lên).',
      'Các khoảng trống phía tây mọc lại 8 Gốc Cây Lớn (cho Gỗ Cứng), đồ hái lượm theo mùa, và loại cỏ dại đặc biệt luôn rơi Hạt Giống Hỗn Hợp.',
      'Đồ hái lượm mỗi mùa (mỗi loại 25%): Xuân có Bồ Công Anh, Tỏi Tây, Nấm Morel, Cải Ngựa Dại; Hạ có Nấm Thường, Nho, Quả Gia Vị, Đậu Hoa; Thu có Nấm Mồng Gà, Nấm Thường, Nấm Tím, Nấm Đỏ.',
      'Khi câu cá: 5% số lần ra Cá Woodskip (cộng thêm độ may mắn trong ngày; may mắn từ -0,05 trở xuống thì không câu được, may mắn tối đa với Bùa Đặc Biệt thì 17,5%). Phần còn lại, 45% ra cá ao và sông của Rừng Cindersap, còn lại toàn rác.',
      'Thêm ao và bãi cỏ làm giảm diện tích đất trồng.',
      'Có 1413 ô cuốc được, cộng 1490 ô không cuốc được nhưng xây được.'
    ],
    pointsEn: [
      'The farm border is made of trees and foliage, just like in the Secret Woods.',
      'Many bushes can be found on this map, including berry bushes. 16 bushes can be chopped down with an upgraded Axe (copper or better).',
      'The western clearings spawn 8 renewable Large Stumps (Hardwood), seasonal forage items, and unique Weeds that always drop Mixed Seeds.',
      'Forage (25% each): Spring Dandelion, Leek, Morel, Wild Horseradish; Summer Common Mushroom, Grape, Spice Berry, Sweet Pea; Fall Chanterelle, Common Mushroom, Purple Mushroom, Red Mushroom.',
      'When fishing: 5% of the time (plus daily Luck) players catch Woodskip (none at luck -0.05 or below, 17.5% at maximum luck with the Special Charm). 45% of the rest of the time pond and river fish from Cindersap Forest; otherwise only trash.',
      'Additional ponds and grass areas decrease the overall farming area.',
      'The number of tillable tiles on this map is 1413, with 1490 non-tillable but buildable tiles.'
    ]
  },
  {
    id: 'hilltop', name: 'Nông Trại Đồi Cao', nameEn: 'Hill-top Farm', icon: 'hilltop_farm_map_icon.png', image: 'hilltop_farm.png',
    skills: ['mining'], tillable: 1648, buildable: 930, since: '1.1', quarry: true,
    summary: 'Mỏ đá riêng sinh quặng và hốc đá mỗi ngày.',
    summaryEn: 'A private quarry that spawns ore and geodes every day.',
    points: [
      'Đồi cao phía tây nam sinh Đá, mạch quặng và hốc đá (geode) tùy cấp Khai Khoáng của người chơi.',
      'Mỗi ngày nông trại thử sinh vài mạch: mạch đầu chắc chắn có, mỗi mạch sau có 75% cơ hội của mạch trước; một lần thất bại là dừng trong ngày. Mỏ đã dọn sạch sinh trung bình 2,4 mạch mỗi ngày. Ô đã có vật thì không sinh gì.',
      'Luôn có 15% cơ hội sinh điểm cổ vật. Hốc đá: dưới cấp 5 luôn là Hốc Đá thường; cấp 5 đến 7 chia đều Hốc Đá và Hốc Đá Băng; từ cấp 8 chia đều cả ba loại (thêm Hốc Đá Magma).',
      'Luôn có thể ra mạch Đồng; từ cấp 4 có thêm Sắt, cấp 7 có Vàng, cấp 10 có Iridium; còn lại là Đá.',
      'Lối vào khu mỏ có thể bị chặn bởi Gốc Cây Lớn, Khúc Gỗ Lớn hoặc Tảng Đá Lớn; phải có Rìu hoặc Cuốc Chim bằng Thép mới phá được.',
      'Thêm vách đá và một con suối làm giảm diện tích đất trồng. 2 bụi cây chặt được bằng Rìu đã nâng cấp.',
      'Khi câu cá: 50% ra cá sông của Rừng Cindersap, 50% chỉ ra rác.',
      'Có 1648 ô cuốc được, cộng 930 ô không cuốc được nhưng xây được.'
    ],
    pointsEn: [
      "The southwest hill-top spawns Stones, Ore nodes, and Geode nodes depending on the player's Mining level.",
      'Each day the farm attempts to spawn several nodes. The first node has a 100% chance to spawn, and each subsequent node has 75% the chance of the last; once one fails, no more attempts that day. A cleared quarry averages 2.4 nodes per day. If something is already on the tile, nothing spawns.',
      'There is always a 15% chance to spawn an artifact spot. Geodes: below Mining 5 always a Geode Node; 5 to 7 an equal chance of Geode or Frozen Geode; 8 and up an equal chance of each (plus Magma Geode).',
      'There is always a chance of a Copper node; Iron from Mining 4, Gold from 7, Iridium from 10; otherwise Stone.',
      'The mining area may be blocked by a Large Stump, a Large Log, or a Boulder until the Axe or Pickaxe is upgraded to steel.',
      'Additional cliffs and a stream decrease the overall farming area. 2 bushes can be chopped down with an upgraded Axe.',
      'When fishing: 50% forest river fish (Cindersap Forest river), 50% only trash.',
      'The number of tillable tiles on this map is 1648, with 930 non-tillable but buildable tiles.'
    ]
  },
  {
    id: 'wilderness', name: 'Nông Trại Hoang Dã', nameEn: 'Wilderness Farm', icon: 'wilderness_farm_map_icon.png', image: 'wilderness_farm.png',
    skills: ['combat'], tillable: 2131, buildable: 444, since: '1.1',
    summary: 'Quái vật xuất hiện ban đêm, có Golem Iridium riêng.',
    summaryEn: 'Monsters at night, with Iridium Golems exclusive to it.',
    points: [
      'Quái vật xuất hiện vào ban đêm (mạnh dần theo cấp Chiến Đấu). Quái trên nông trại chỉ cho 1/3 kinh nghiệm Chiến Đấu.',
      'Bản đồ này sinh nhiều Golem Hoang Dã hơn các nông trại khác nếu bật tùy chọn "sinh quái vật trên nông trại".',
      'Chỉ có ở nông trại này: từ cấp Chiến Đấu 9, Golem Iridium có 50% cơ hội xuất hiện, có thể rơi Quặng Iridium và các hạt giống thường lấy từ điểm hạt giống.',
      'Khi câu cá: 35% ra cá hồ của Vùng Núi, 65% chỉ ra rác.',
      'Thêm vách đá và ao làm giảm diện tích đất trồng.',
      'Có 2131 ô cuốc được, cộng 444 ô không cuốc được nhưng xây được.'
    ],
    pointsEn: [
      "Monsters spawn at night (scales with the player's Combat level). Monsters on the farm give 1/3 of normal Combat experience.",
      'This map can spawn more Wilderness Golems than other farms if the "spawn monsters on the farm" option is enabled.',
      'Exclusive to this farm map, at Combat level 9 or higher, Iridium Golems have a 50% chance to spawn. They can drop Iridium Ore and seeds normally obtained from Seed Spots.',
      'When fishing: 35% lake fish (The Mountain lake), 65% only trash.',
      'Additional cliffs and ponds decrease the overall farming area.',
      'The number of tillable tiles on this map is 2131, with 444 non-tillable but buildable tiles.'
    ]
  },
  {
    id: 'four_corners', name: 'Nông Trại Bốn Góc', nameEn: 'Four Corners Farm', icon: 'four_corners_farm_map_icon.png', image: 'four_corners_farm.png',
    skills: ['multiplayer'], tillable: 2952, buildable: 562, since: '1.4', quarry: true,
    summary: 'Bốn khu riêng, mỗi khu giống một loại nông trại khác: hợp chơi co-op.',
    summaryEn: 'Four areas, each like another farm map: made for co-op.',
    points: [
      'Đất trồng bị vách đá chia làm bốn khu riêng, mỗi khu gợi nhớ một loại nông trại khác.',
      'Góc trên trái giống Nông Trại Rừng: một bãi cỏ nhỏ có Gốc Cây Lớn, cỏ dại ở đây có thể thành loại đặc biệt luôn rơi Hạt Giống Hỗn Hợp.',
      'Góc trên phải giống Nông Trại Tiêu Chuẩn: nhiều đất trồng nhất.',
      'Góc dưới trái có một cái ao: 50% số lần câu ra cá sông của Rừng Cindersap.',
      'Góc dưới phải giống Nông Trại Đồi Cao: một mỏ đá nhỏ sinh Đá, mạch quặng và hốc đá tùy cấp Khai Khoáng.',
      'Thêm vách đá và ao làm giảm diện tích đất trồng.',
      'Có 2952 ô cuốc được, cộng 562 ô không cuốc được nhưng xây được.'
    ],
    pointsEn: [
      'The farming area is split by cliffs into four distinct areas, each reminiscent of some of the other Farm Maps.',
      'Top left: Forest Farm. A small grassy area with a Large Stump; weeds here can turn into the unique ones that always drop Mixed Seeds.',
      'Top right: Standard Farm. This quadrant has the most farming space.',
      'Bottom left: a pond. Players have a 50% chance of catching forest river fish (Cindersap Forest river).',
      "Bottom right: Hill-top Farm. A small quarry that spawns Rocks, Ore and Geode nodes depending on the player's Mining level.",
      'Additional cliffs and ponds decrease the overall farming area.',
      'The number of tillable tiles on this map is 2952, with 562 non-tillable but buildable tiles.'
    ]
  },
  {
    id: 'beach', name: 'Nông Trại Bãi Biển', nameEn: 'Beach Farm', icon: 'beach_farm_map_icon.png', image: 'beach_farm.png',
    skills: ['foraging', 'fishing'], tillable: 2700, buildable: 1928, since: '1.5', hard: true,
    summary: 'Hái lượm và câu cá biển tốt, nhưng vòi tưới không chạy trên cát.',
    summaryEn: "Great foraging and ocean fishing, but sprinklers don't work in sand.",
    points: [
      'Hái lượm và câu cá tốt, nhiều đất trống. Thỉnh thoảng có thùng tiếp tế trôi dạt vào bờ.',
      'Mọc cả đồ hái lượm của rừng lẫn của bãi biển. Đồ hái lượm bãi biển theo mùa mọc quanh năm.',
      'Vòi tưới không hoạt động trên đất cát. Chỉ có một mảng 202 ô không phải cát liền nhau (10 x 20 cộng 2) đặt được vòi tưới; muốn dùng hết phải dọn cây và Khúc Gỗ Lớn (cần Rìu Thép trở lên). Thêm 28 ô không phải cát rải rác, phần lớn quanh các ao.',
      'Dành cho "người chơi lâu năm", không nên chọn làm nông trại đầu tiên: cách quen thuộc là mở rộng ruộng và chế thật nhiều Vòi Tưới Xịn sẽ không dùng được ở đây.',
      'Các khoảng trống lớn dùng để xây Chuồng Gia Súc, Chuồng Gia Cầm, Ao Cá hoặc Nhà Kho. Cỏ mọc được trên đất cát.',
      'Có nhiều bụi cây, vài bụi ra quả mọng. 15 bụi cây chặt được bằng Rìu đã nâng cấp (từ Rìu Đồng trở lên).',
      'Khi câu cá: 15% ra Rong Biển; 5,1% ra một trong Hàu, San Hô, Trai, Sò (bằng nhau); 52,73% ra cá biển (như ở Bãi Biển); 27,17% ra rác.',
      'Có 2700 ô cuốc được, cộng 1928 ô không cuốc được nhưng xây được.'
    ],
    pointsEn: [
      'Good foraging and fishing, and a lot of open space. Sometimes, supply crates wash up on shore.',
      'Both forest and beach foragables may spawn. Season-specific beach foragables can spawn year-round.',
      "Sprinklers don't work in the sandy soil. There is a contiguous patch of 202 non-sandy tiles (10x20 plus 2) where sprinklers can be placed; using it fully requires clearing the trees and large logs (steel axe or better). There are 28 additional non-sandy tiles scattered around the map (mostly around ponds).",
      'Intended for "seasoned players", not as a first farm. A typical strategy of increasing crop fields and crafting large quantities of quality sprinklers won\'t work on this farm.',
      'Large open areas can be used to build Barns, Coops, Fish Ponds, or Sheds. Grass can grow on sandy soil.',
      'There are several bushes on this map, with multiple able to yield berries. 15 bushes can be chopped down with an upgraded Axe (copper or better).',
      'When fishing: 15% Seaweed; 5.1% one of Oyster, Coral, Mussel or Cockle (equal chances); 52.73% ocean fish (found at The Beach); 27.17% trash.',
      'The number of tillable tiles on this map is 2700, with 1928 non-tillable but buildable tiles.'
    ]
  },
  {
    id: 'meadowlands', name: 'Nông Trại Đồng Cỏ', nameEn: 'Meadowlands Farm', icon: 'meadowlands_farm_map_icon.png', image: 'meadowlands_farm.png',
    skills: ['farming'], tillable: 2066, buildable: 2141, since: '1.6',
    summary: 'Hợp nuôi gia súc: có sẵn chuồng gà, 2 con gà và cỏ xanh dai.',
    summaryEn: 'Made for animals: a Coop, two chickens and chewy blue grass.',
    points: [
      'Có loại cỏ xanh dai (blue grass) mà vật nuôi rất thích.',
      'Bắt đầu với một Chuồng Gia Cầm và hai con gà (tên đặt ngẫu nhiên).',
      'Thay vì nhận 15 Hạt Củ Cải Trắng từ Thị Trưởng Lewis, người chơi nhận 15 Cỏ Khô từ một người giấu tên.',
      'Khi câu ở sông hoặc ao lớn: 40% ra cá ao của Rừng Cindersap, 60% ra rác.',
      'Có 2066 ô cuốc được, cộng khoảng 2141 ô không cuốc được nhưng xây được.'
    ],
    pointsEn: [
      'Has a chewy blue grass that animals love.',
      'Players start with a Coop and two chickens. The chickens are randomly named.',
      'Instead of receiving 15 Parsnip Seeds from Mayor Lewis, the player instead receives 15 pieces of Hay from an unknown source.',
      'When fishing from the river or a large pond: 40% forest pond fish (Cindersap Forest pond), 60% trash.',
      'The number of tillable tiles on this map is 2066, with about 2141 non-tillable but buildable tiles.'
    ]
  }
];

// Hill-top and Four Corners quarry: what each spawn attempt gives, by Mining level
export const QUARRY_HEAD = ['Đá', 'Điểm cổ vật', 'Hốc Đá', 'Hốc Đá Băng', 'Hốc Đá Magma', 'Đồng', 'Sắt', 'Vàng', 'Iridium'];
export const QUARRY_HEAD_EN = ['Stone', 'Artifact Spot', 'Geode', 'Frozen Geode', 'Magma Geode', 'Copper', 'Iron', 'Gold', 'Iridium'];
export const QUARRY_RATES = [
  ['0-3', 60.44, 15, 6.72, 0, 0, 17.85, 0, 0, 0],
  ['4', 51.37, 15, 5.71, 0, 0, 15.17, 12.75, 0, 0],
  ['5-6', 51.37, 15, 2.85, 2.85, 0, 15.17, 12.75, 0, 0],
  ['7', 46.23, 15, 2.57, 2.57, 0, 13.66, 11.48, 8.5, 0],
  ['8-9', 46.23, 15, 1.71, 1.71, 1.71, 13.66, 11.48, 8.5, 0],
  ['10+', 45.77, 15, 1.7, 1.7, 1.7, 13.52, 11.36, 8.42, 0.85]
];
