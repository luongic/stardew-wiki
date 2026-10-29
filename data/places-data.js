// ==========================================================================
// STARDEW VALLEY WIKI - THÔNG TIN ĐỊA ĐIỂM (PLACES)
// Nguồn: stardewvalleywiki.com (bản 1.6) - giờ mở cửa / ngày nghỉ lấy từ
// infobox của từng trang địa điểm.
// "icon": khoá file assets/icons/<key>.png, hoặc "portrait:<npc>" dùng
// assets/portraits/<npc>.png. "residents": id NPC trong data/npcs-data.js.
// ==========================================================================

export const PLACES = {
  "pierre": {
    "name": "Tiệm Tạp Hoá Pierre",
    "nameEn": "Pierre's General Store",
    "kind": "shop",
    "icon": "portrait:pierre",
    "hours": "9:00 – 17:00 (toà nhà mở 9:00 – 21:00)",
    "closed": "Thứ Tư (chỉ khi Trung Tâm Cộng Đồng chưa được khôi phục)",
    "owner": "Pierre",
    "residents": ["pierre", "caroline", "abigail"],
    "sells": "Hạt giống theo mùa, cây ăn quả, phân bón, nguyên liệu nấu ăn, nâng cấp ba lô, quà tặng.",
    "desc": "Cửa hàng tạp hoá trung tâm Thị Trấn Pelican, nơi mua hạt giống chính. Gia đình Pierre, Caroline và Abigail sống ngay trong cửa hàng.",
    "link": { "tab": "items" }
  },
  "jojamart": {
    "name": "JojaMart",
    "nameEn": "JojaMart",
    "kind": "shop",
    "icon": "joja_cola",
    "hours": "9:00 – 23:00",
    "closed": "Đóng cửa vĩnh viễn sau khi người chơi hoàn thành Trung Tâm Cộng Đồng (toà nhà thành Rạp Chiếu Phim)",
    "owner": "Morris",
    "residents": [],
    "sells": "Hạt giống (giá cao hơn Pierre), Joja Cola, thẻ thành viên Joja và Đơn Phát Triển Cộng Đồng Joja.",
    "desc": "Siêu thị của tập đoàn Joja do Morris quản lý, Shane làm thu ngân. Mua thẻ thành viên Joja sẽ mở tuyến Joja thay cho các gói Trung Tâm Cộng Đồng.",
    "link": { "tab": "bundles" }
  },
  "blacksmith": {
    "name": "Lò Rèn",
    "nameEn": "Blacksmith",
    "kind": "shop",
    "icon": "portrait:clint",
    "hours": "9:00 – 16:00",
    "closed": "Thứ Sáu sau khi Trung Tâm Cộng Đồng được khôi phục; đóng lúc 10:30 ngày 16 Đông",
    "owner": "Clint",
    "residents": ["clint"],
    "sells": "Quặng đồng/sắt/vàng, than; nâng cấp công cụ; đập geode.",
    "desc": "Xưởng rèn của Clint ở phía đông thị trấn. Mang quặng và thỏi kim loại tới để nâng cấp công cụ (mất 2 ngày) hoặc nhờ đập geode lấy khoáng vật.",
    "link": { "tab": "museum" }
  },
  "carpenter": {
    "name": "Tiệm Mộc Của Robin",
    "nameEn": "Carpenter's Shop",
    "kind": "shop",
    "icon": "portrait:robin",
    "hours": "9:00 – 17:00",
    "closed": "Thứ Ba; Thứ Sáu đóng lúc 16:00",
    "owner": "Robin",
    "residents": ["robin", "demetrius", "maru", "sebastian"],
    "sells": "Gỗ, đá, công thức đồ gỗ, nội thất; xây/nâng cấp chuồng trại, nâng cấp nhà.",
    "desc": "Nhà kiêm cửa hàng của Robin ở khu Núi, phía bắc thị trấn. Đây là nơi đặt xây chuồng, kho, giếng và nâng cấp nhà nông trại.",
    "link": { "tab": "npcs" }
  },
  "fish_shop": {
    "name": "Tiệm Cá Của Willy",
    "nameEn": "Fish Shop",
    "kind": "shop",
    "icon": "portrait:willy",
    "hours": "9:00 – 17:00",
    "closed": "Thứ Bảy không mưa (toà nhà vẫn mở nhưng không bán hàng)",
    "owner": "Willy",
    "residents": ["willy"],
    "sells": "Cần câu, mồi câu, phao câu, bẫy cua, sách câu cá.",
    "desc": "Cửa hàng đồ câu của Willy ở cầu tàu Bãi Biển. Willy cũng tặng cần câu tre đầu tiên và mở rộng hồ cá.",
    "link": { "tab": "npcs" }
  },
  "ranch": {
    "name": "Trang Trại Của Marnie",
    "nameEn": "Marnie's Ranch",
    "kind": "shop",
    "icon": "portrait:marnie",
    "hours": "9:00 – 16:00 (toà nhà mở 9:00 – 18:00)",
    "closed": "Thứ Hai, Thứ Ba (toà nhà vẫn vào được)",
    "owner": "Marnie",
    "residents": ["marnie", "shane", "jas"],
    "sells": "Vật nuôi, cỏ khô, xô vắt sữa, kéo cắt lông, máy ấp, bộ phận nhà thú cưng, nội thất.",
    "desc": "Trang trại chăn nuôi của Marnie ở Rừng Cindersap, phía nam nông trại. Marnie sống cùng cháu Jas và cháu trai Shane.",
    "link": { "tab": "npcs" }
  },
  "saloon": {
    "name": "Quán Rượu Stardrop",
    "nameEn": "The Stardrop Saloon",
    "kind": "shop",
    "icon": "portrait:gus",
    "hours": "12:00 – 24:00",
    "owner": "Gus",
    "residents": ["gus"],
    "sells": "Món ăn, đồ uống, công thức nấu ăn (thay đổi theo ngày).",
    "desc": "Quán rượu của Gus ở trung tâm thị trấn, nơi dân làng tụ tập buổi tối. Có máy chơi game Journey of the Prairie King và Junimo Kart.",
    "link": { "tab": "recipes" }
  },
  "clinic": {
    "name": "Phòng Khám Của Harvey",
    "nameEn": "Harvey's Clinic",
    "kind": "shop",
    "icon": "portrait:harvey",
    "hours": "9:00 – 15:00",
    "closed": "Hầu hết ngày lễ hội (trừ Lễ Hội Sa Mạc, Trout Derby, SquidFest, Chợ Đêm, Điệu Nhảy Sứa Ánh Trăng)",
    "owner": "Harvey",
    "residents": ["harvey"],
    "sells": "Thuốc hồi năng lượng và thuốc hồi máu.",
    "desc": "Phòng khám cạnh Tiệm Pierre; Harvey sống ở căn hộ tầng trên. Maru làm y tá vào Thứ Ba và Thứ Năm.",
    "link": { "tab": "npcs" }
  },
  "museum": {
    "name": "Bảo Tàng & Thư Viện",
    "nameEn": "Museum",
    "kind": "landmark",
    "icon": "portrait:gunther",
    "hours": "8:00 – 18:00",
    "closed": "Các ngày lễ hội ở thị trấn",
    "owner": "Gunther",
    "residents": ["gunther"],
    "desc": "Nơi quyên góp cổ vật và khoáng vật để nhận thưởng; Gunther cũng đập geode giúp. Sách Bị Thất Lạc tìm được được trưng bày ở thư viện.",
    "link": { "tab": "museum" }
  },
  "community_center": {
    "name": "Trung Tâm Cộng Đồng",
    "nameEn": "Community Center",
    "kind": "landmark",
    "icon": "place_junimo",
    "hours": "Luôn mở",
    "residents": [],
    "desc": "Toà nhà bỏ hoang ở phía bắc thị trấn, nơi các Junimo sinh sống. Hoàn thành các gói quà ở đây để khôi phục từng phòng và mở khoá phần thưởng.",
    "link": { "tab": "bundles" }
  },
  "wizard_tower": {
    "name": "Tháp Phù Thuỷ",
    "nameEn": "Wizard's Tower",
    "kind": "shop",
    "icon": "portrait:wizard",
    "hours": "6:00 – 23:00",
    "owner": "Phù Thuỷ (Wizard)",
    "residents": ["wizard"],
    "sells": "Công trình phép thuật: Tháp Bia Đá, Lều Junimo, Đồng Hồ Vàng... (sau nhiệm vụ Sách Ma Thuật).",
    "desc": "Ngọn tháp của Phù Thuỷ Rasmodius ở phía tây Rừng Cindersap. Ông giúp người chơi đọc được tiếng Junimo để bắt đầu khôi phục Trung Tâm Cộng Đồng.",
    "link": { "tab": "npcs" }
  },
  "adventurers_guild": {
    "name": "Hội Mạo Hiểm Giả",
    "nameEn": "Adventurer's Guild",
    "kind": "shop",
    "icon": "portrait:marlon",
    "hours": "14:00 – 2:00",
    "owner": "Marlon",
    "residents": ["marlon"],
    "sells": "Vũ khí, giày, nhẫn, bom, nhận thưởng mục tiêu diệt quái.",
    "desc": "Hội của Marlon và Gil ngay cạnh lối vào Hầm Mỏ. Diệt đủ quái theo mục tiêu để nhận thưởng; Marlon cũng chuộc lại đồ khi bạn ngất trong hầm.",
    "link": { "tab": "mines", "filter": "mines" }
  },
  "mines_entrance": {
    "name": "Lối Vào Hầm Mỏ",
    "nameEn": "The Mines",
    "kind": "area",
    "icon": "area_the_mines",
    "closed": "Bị đá lở chặn từ ngày 1 – 4 Xuân năm 1",
    "residents": ["dwarf"],
    "desc": "Cửa hầm mỏ 120 tầng ở khu Núi. Người Lùn sống ở hang phía đông lối vào (đập tảng đá bằng cuốc thép hoặc bom) và bán bom, hàng hoá cho người chơi.",
    "link": { "tab": "mines", "filter": "mines" }
  },
  "quarry": {
    "name": "Mỏ Đá",
    "nameEn": "Quarry",
    "kind": "area",
    "icon": "ing_stone",
    "closed": "Cần sửa cầu (gói Bảng Tin hoặc Joja) mới vào được",
    "residents": [],
    "desc": "Khu đá ở phía đông khu Núi, mỗi ngày mọc lại đá, quặng và geode. Có Hầm Mỏ Đá (Quarry Mine) với quái vật và nhiều quặng.",
    "link": { "tab": "mines", "filter": "quarry_mine" }
  },
  "railroad": {
    "name": "Đường Ray",
    "nameEn": "Railroad",
    "kind": "area",
    "icon": "item_coal",
    "closed": "Mở sau ngày 3 Hè năm 1 (động đất dọn đường)",
    "residents": [],
    "desc": "Ga tàu phía bắc khu Núi. Tàu chạy qua thỉnh thoảng làm rơi than, geode và gỗ; có lối vào Nhà Tắm Suối Nước Nóng và Đỉnh Núi (Summit, mở ở cuối game).",
    "link": { "tab": "items" }
  },
  "spa": {
    "name": "Nhà Tắm Suối Nước Nóng",
    "nameEn": "Spa (Bathhouse)",
    "kind": "landmark",
    "icon": "green_tea",
    "hours": "Cả ngày",
    "residents": [],
    "desc": "Nhà tắm ở khu Đường Ray. Ngâm mình trong bể sẽ hồi dần năng lượng và máu.",
    "link": { "tab": "npcs" }
  },
  "bus_stop": {
    "name": "Trạm Xe Buýt",
    "nameEn": "Bus Stop",
    "kind": "landmark",
    "icon": "warp_totem_desert",
    "hours": "Xe buýt chạy 10:00 – 17:00",
    "closed": "Xe buýt hỏng cho tới khi hoàn thành gói Kho Bạc hoặc mua 'Sửa xe buýt' của Joja",
    "residents": [],
    "desc": "Nối nông trại với Thị Trấn Pelican. Sau khi sửa xe, Pam lái xe buýt đưa bạn tới Sa Mạc Calico (vé 500g).",
    "link": { "tab": "bundles" }
  },
  "farm": {
    "name": "Nông Trại",
    "nameEn": "The Farm",
    "kind": "area",
    "icon": "warp_totem_farm",
    "residents": [],
    "desc": "Nông trại ông nội để lại cho bạn, nơi trồng trọt, chăn nuôi và đặt máy móc. Có nhà, thùng giao hàng và hang động (nấm hoặc dơi).",
    "link": { "tab": "items" }
  },
  "greenhouse": {
    "name": "Nhà Kính",
    "nameEn": "Greenhouse",
    "kind": "landmark",
    "icon": "item_ancient_fruit",
    "closed": "Đổ nát cho tới khi hoàn thành Phòng Thủ Công (Pantry) hoặc mua của Joja",
    "residents": [],
    "desc": "Nhà kính trên nông trại; mọi cây trồng ở đây phát triển quanh năm bất kể mùa. Có thể trồng cả cây ăn quả bên trong.",
    "link": { "tab": "bundles" }
  },
  "cindersap_forest": {
    "name": "Rừng Cindersap",
    "nameEn": "Cindersap Forest",
    "kind": "area",
    "icon": "ing_wood",
    "residents": [],
    "desc": "Khu rừng rộng phía nam nông trại với sông, hồ câu cá và nhiều đồ hái lượm. Có Trang Trại Marnie, nhà Leah, Tháp Phù Thuỷ và Nhà Bỏ Hoang.",
    "link": { "tab": "items" }
  },
  "secret_woods": {
    "name": "Khu Rừng Bí Mật",
    "nameEn": "Secret Woods",
    "kind": "area",
    "icon": "ing_hardwood",
    "closed": "Lối vào bị khúc gỗ lớn chặn, cần rìu thép trở lên",
    "residents": [],
    "desc": "Khu rừng ẩn ở góc tây bắc Rừng Cindersap. Có 6 gốc cây lớn cho gỗ cứng mỗi ngày, nấm, cá Woodskip và tượng Old Master Cannoli.",
    "link": { "tab": "items" }
  },
  "mountain_lake": {
    "name": "Hồ Trên Núi",
    "nameEn": "Mountain Lake",
    "kind": "area",
    "icon": "warp_totem_mountains",
    "residents": [],
    "desc": "Hồ lớn ở khu Núi, gần Tiệm Mộc và lối vào Hầm Mỏ. Nơi câu cá Bass Miệng Lớn và Cá Tầm (Sturgeon).",
    "link": { "tab": "items" }
  },
  "beach": {
    "name": "Bãi Biển",
    "nameEn": "The Beach",
    "kind": "area",
    "icon": "warp_totem_beach",
    "residents": [],
    "desc": "Bãi biển phía nam thị trấn với Tiệm Cá của Willy và nhà Elliott. Nhặt vỏ sò, san hô; câu cá biển; cầu phía đông cần sửa bằng 300 gỗ.",
    "link": { "tab": "items" }
  },
  "tide_pools": {
    "name": "Vũng Thuỷ Triều",
    "nameEn": "Tide Pools",
    "kind": "area",
    "icon": "item_coral",
    "closed": "Cần sửa cây cầu (300 gỗ) ở phía đông Bãi Biển",
    "residents": [],
    "desc": "Phần phía đông Bãi Biển, qua cây cầu gãy. Nhặt san hô, nhím biển, vỏ cầu vồng và hải sâm.",
    "link": { "tab": "items" }
  },
  "mayor_manor": {
    "name": "Dinh Thị Trưởng",
    "nameEn": "Mayor's Manor",
    "kind": "home",
    "icon": "portrait:lewis",
    "hours": "Mở cửa đón khách 8:30 – 22:00",
    "residents": ["lewis"],
    "desc": "Nhà của Thị Trưởng Lewis ở phía nam thị trấn. Lewis giao nhiều nhiệm vụ và quản lý bảng tin.",
    "link": { "tab": "quests" }
  },
  "town_square": {
    "name": "Quảng Trường Thị Trấn",
    "nameEn": "Pelican Town Square",
    "kind": "landmark",
    "icon": "ing_daffodil",
    "residents": [],
    "desc": "Trung tâm Thị Trấn Pelican, trước Tiệm Pierre. Bảng tin nhiệm vụ đặt cạnh cửa tiệm và nhiều lễ hội diễn ra tại đây.",
    "link": { "tab": "quests" }
  },
  "graveyard": {
    "name": "Nghĩa Trang",
    "nameEn": "Graveyard",
    "kind": "landmark",
    "icon": "monster_ghost",
    "hours": "Luôn mở",
    "residents": [],
    "desc": "Nghĩa trang nhỏ cạnh Tiệm Pierre. Vào Lễ Hội Ma (Spirit's Eve) và trong cốt truyện, đây là nơi Abigail hay lui tới.",
    "link": { "tab": "npcs" }
  },
  "playground": {
    "name": "Sân Chơi",
    "nameEn": "Playground",
    "kind": "landmark",
    "icon": "portrait:vincent",
    "residents": [],
    "desc": "Sân chơi phía bắc thị trấn, gần Trung Tâm Cộng Đồng. Jas và Vincent thường chơi ở đây.",
    "link": { "tab": "npcs" }
  },
  "trailer": {
    "name": "Nhà Di Động",
    "nameEn": "Trailer",
    "kind": "home",
    "aliasOf": "pam_trailer",
    "icon": "portrait:penny",
    "residents": [],
    "desc": "Nhà di động của Pam và Penny bên bờ sông thị trấn (xem pam_trailer).",
    "link": { "tab": "npcs" }
  },
  "pam_trailer": {
    "name": "Nhà Di Động Của Pam",
    "nameEn": "Trailer",
    "kind": "home",
    "icon": "portrait:pam",
    "hours": "Mở cửa đón khách 9:00 – 20:00",
    "residents": ["pam", "penny"],
    "desc": "Nhà di động nhỏ của Pam và con gái Penny bên bờ sông thị trấn. Sau một sự kiện tim của Penny, có thể nâng cấp thành nhà gỗ.",
    "link": { "tab": "npcs" }
  },
  "sewer": {
    "name": "Cống Ngầm",
    "nameEn": "The Sewers",
    "kind": "area",
    "icon": "rusty_key",
    "hours": "Luôn mở",
    "closed": "Cần Chìa Khoá Gỉ (quyên góp 60 hiện vật cho Bảo Tàng)",
    "residents": [],
    "desc": "Hệ thống cống dưới thị trấn, vào bằng nắp cống phía nam. Krobus mở cửa hàng ở đây; còn có lối vào Hang Đột Biến (Mutant Bug Lair).",
    "link": { "tab": "museum" }
  },
  "krobus_sewer": {
    "name": "Cửa Hàng Của Krobus",
    "nameEn": "Krobus' Shop",
    "kind": "shop",
    "icon": "portrait:krobus",
    "hours": "Luôn mở (kể cả ngày lễ hội)",
    "owner": "Krobus",
    "residents": ["krobus"],
    "sells": "Tinh Chất Hư Không, Tinh Chất Mặt Trời, Trứng Hư Không, Stardrop (một lần), Quyền Trượng Hồi Hương, Mặt Dây Bóng Ma Hư Không, hàng xoay vòng theo ngày.",
    "desc": "Krobus, một bóng ma thân thiện, sống và buôn bán trong Cống Ngầm. Vào Thứ Sáu Krobus im lặng nhưng vẫn bán hàng.",
    "link": { "tab": "npcs" }
  },
  "abandoned_house": {
    "name": "Nhà Bỏ Hoang (Chuột Đội Mũ)",
    "nameEn": "Abandoned House",
    "kind": "shop",
    "icon": "place_hat_mouse",
    "hours": "Cả ngày",
    "residents": [],
    "sells": "Mũ (mở dần theo thành tựu đạt được).",
    "desc": "Căn nhà đổ nát ở góc tây nam Rừng Cindersap, nơi Chuột Đội Mũ bán mũ. Mở cửa sau khi đạt thành tựu đầu tiên.",
    "link": { "tab": "items" }
  },
  "leah_cottage": {
    "name": "Nhà Của Leah",
    "nameEn": "Leah's Cottage",
    "kind": "home",
    "icon": "portrait:leah",
    "hours": "Mở cửa đón khách 10:00 – 18:00",
    "residents": ["leah"],
    "desc": "Căn nhà gỗ nhỏ của nghệ sĩ Leah ở Rừng Cindersap, phía nam nông trại.",
    "link": { "tab": "npcs" }
  },
  "sam_house": {
    "name": "Số 1 Đường Willow",
    "nameEn": "1 Willow Lane",
    "kind": "home",
    "icon": "portrait:jodi",
    "hours": "Mở cửa đón khách 9:00 – 20:00",
    "residents": ["jodi", "kent", "sam", "vincent"],
    "desc": "Nhà của Jodi, chồng Kent (về từ năm 2) và hai con Sam, Vincent ở phía tây nam thị trấn.",
    "link": { "tab": "npcs" }
  },
  "haley_house": {
    "name": "Số 2 Đường Willow",
    "nameEn": "2 Willow Lane",
    "kind": "home",
    "icon": "portrait:haley",
    "hours": "Mở cửa đón khách 9:00 – 20:00",
    "residents": ["emily", "haley"],
    "desc": "Nhà của hai chị em Emily và Haley, cạnh nhà Jodi. Có máy may của Emily (sau khi xem sự kiện).",
    "link": { "tab": "npcs" }
  },
  "alex_house": {
    "name": "Số 1 Đường Ven Sông",
    "nameEn": "1 River Road",
    "kind": "home",
    "icon": "portrait:alex",
    "hours": "Mở cửa đón khách 8:00 – 20:00",
    "residents": ["george", "evelyn", "alex"],
    "desc": "Nhà của ông bà George, Evelyn và cháu Alex, cạnh Tiệm Pierre.",
    "link": { "tab": "npcs" }
  },
  "elliott_cabin": {
    "name": "Nhà Gỗ Của Elliott",
    "nameEn": "Elliott's Cabin",
    "kind": "home",
    "icon": "portrait:elliott",
    "hours": "Mở cửa đón khách 10:00 – 18:00",
    "residents": ["elliott"],
    "desc": "Căn nhà gỗ ven Bãi Biển, nơi nhà văn Elliott sống và viết sách.",
    "link": { "tab": "npcs" }
  },
  "linus_tent": {
    "name": "Lều Của Linus",
    "nameEn": "Tent",
    "kind": "home",
    "icon": "portrait:linus",
    "hours": "Mở cửa đón khách 6:00 – 2:00",
    "residents": ["linus"],
    "desc": "Chiếc lều của Linus ở khu Núi, phía bắc Tiệm Mộc. Linus sống tự do và kiếm ăn ngoài thiên nhiên.",
    "link": { "tab": "npcs" }
  },
  "harvey_apartment": {
    "name": "Căn Hộ Của Harvey",
    "nameEn": "Harvey's Room",
    "kind": "home",
    "icon": "portrait:harvey",
    "residents": [],
    "desc": "Căn hộ của Harvey ở tầng trên Phòng Khám (cư dân tính ở mục Phòng Khám). Đầy máy bay mô hình và radio.",
    "link": { "tab": "npcs" }
  },
  "movie_theater": {
    "name": "Rạp Chiếu Phim",
    "nameEn": "Movie Theater",
    "kind": "landmark",
    "icon": "movie_ticket",
    "hours": "9:00 – 21:00",
    "closed": "Hầu hết ngày lễ hội; chỉ có sau khi hoàn thành Trung Tâm Cộng Đồng hoặc mua dự án của Joja",
    "residents": [],
    "sells": "Vé xem phim, đồ ăn vặt.",
    "desc": "Rạp chiếu phim thay thế Trung Tâm Cộng Đồng hoặc JojaMart. Mời dân làng đi xem phim để tăng tình cảm.",
    "link": { "tab": "npcs" }
  },
  "desert": {
    "name": "Sa Mạc Calico",
    "nameEn": "Calico Desert",
    "kind": "area",
    "icon": "magic_desert_obelisk",
    "closed": "Đi được sau khi sửa xe buýt (gói Kho Bạc hoặc Joja)",
    "residents": ["sandy"],
    "desc": "Sa mạc xa ở phía tây bắc, luôn nắng. Có cửa hàng Oasis của Sandy, Thương Nhân Sa Mạc, Sòng Bạc của Ông Qi và Hang Đầu Lâu.",
    "link": { "tab": "mines", "filter": "skull_cavern" }
  },
  "oasis": {
    "name": "Ốc Đảo (Oasis)",
    "nameEn": "Oasis",
    "kind": "shop",
    "icon": "portrait:sandy",
    "hours": "9:00 – 23:50",
    "closed": "Các ngày Lễ Hội Sa Mạc; ngày 15 Thu sau 13:00",
    "owner": "Sandy",
    "residents": [],
    "sells": "Hạt giống hiếm (khế, củ cải đường, ngô...), quần áo, món theo ngày; lối vào Sòng Bạc ở phòng sau.",
    "desc": "Cửa hàng của Sandy ở Sa Mạc Calico. Sau khi có Thẻ Thành Viên Câu Lạc Bộ, phòng sau dẫn tới Sòng Bạc của Ông Qi (9:00 – 23:50).",
    "link": { "tab": "items" }
  },
  "skull_cavern": {
    "name": "Hang Đầu Lâu",
    "nameEn": "Skull Cavern",
    "kind": "area",
    "icon": "skull_key",
    "closed": "Cần Chìa Khoá Đầu Lâu (tầng 120 Hầm Mỏ)",
    "residents": [],
    "desc": "Hầm mỏ không đáy ở góc tây nam sa mạc với quặng iridium và quái mạnh. Uống may mắn và mang bom để xuống thật sâu.",
    "link": { "tab": "mines", "filter": "skull_cavern" }
  },
  "ginger_island": {
    "name": "Đảo Gừng",
    "nameEn": "Ginger Island",
    "kind": "area",
    "icon": "magic_island_obelisk",
    "closed": "Đi thuyền của Willy sau khi sửa thuyền (cần 200 gỗ cứng, 5 thỏi iridium, 5 cục pin)",
    "residents": ["leo", "birdie", "professor_snail"],
    "desc": "Hòn đảo nhiệt đới phía nam. Thu thập Quả Óc Chó Vàng để mở khoá nông trại đảo, khu nghỉ dưỡng và nhiều bí mật; Leo, Birdie và Giáo Sư Ốc Sên sống ở đây (Leo chuyển lên Núi khi đủ 6 tim).",
    "link": { "tab": "mines", "filter": "volcano" }
  },
  "island_trader": {
    "name": "Thương Nhân Trên Đảo",
    "nameEn": "Island Trader",
    "kind": "shop",
    "icon": "place_island_trader",
    "hours": "Luôn mở",
    "residents": [],
    "sells": "Đổi vật phẩm nhiệt đới (dừa, chuối, xoài, đá...) lấy nội thất, công thức, đồ hiếm.",
    "desc": "Quầy đổi hàng ở phía Bắc Đảo Gừng. Không dùng tiền mà trao đổi vật phẩm.",
    "link": { "tab": "items" }
  },
  "volcano": {
    "name": "Hầm Núi Lửa",
    "nameEn": "Volcano Dungeon",
    "kind": "area",
    "icon": "item_cinder_shard",
    "closed": "Cần mở lối ở Bắc Đảo Gừng (Quả Óc Chó Vàng)",
    "residents": [],
    "desc": "Hầm ngục 10 tầng trong núi lửa ở Đảo Gừng. Có Người Lùn Núi Lửa bán hàng và Lò Rèn phù phép vũ khí ở đỉnh.",
    "link": { "tab": "mines", "filter": "volcano" }
  },
  "qi_walnut_room": {
    "name": "Phòng Óc Chó Của Ông Qi",
    "nameEn": "Qi's Walnut Room",
    "kind": "shop",
    "icon": "qi_gem",
    "hours": "Luôn mở",
    "owner": "Ông Qi",
    "residents": ["mr_qi"],
    "sells": "Đổi Ngọc Qi lấy vật phẩm đặc biệt; nhận Nhiệm Vụ Đặc Biệt của Qi.",
    "desc": "Căn phòng bí mật ở Đảo Gừng, mở khi tìm đủ 100 Quả Óc Chó Vàng. Ông Qi giao các thử thách khó để nhận Ngọc Qi.",
    "link": { "tab": "quests" }
  }
};
