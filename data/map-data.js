// ==========================================================================
// STARDEW VALLEY WIKI - TỌA ĐỘ BẢN ĐỒ (MAP HOTSPOTS)
// Mỗi bản đồ là ảnh gốc từ game (Official Wiki). Tọa độ x/y tính theo pixel
// của chính ảnh đó (bản đồ thung lũng: 400x244, đúng như menu bản đồ trong
// game). Thông tin chi tiết từng địa điểm nằm trong data/places-data.js.
// ==========================================================================

export const MAPS = [
  {
    "id": "valley",
    "name": "Thung Lũng Stardew",
    "nameEn": "Stardew Valley",
    "icon": "spring",
    "img": "assets/maps/valley.png",
    "w": 400,
    "h": 244,
    "spots": [
      { "id": "desert", "x": 34, "y": 22 },
      { "id": "bus_stop", "x": 178, "y": 80 },
      { "id": "railroad", "x": 226, "y": 24 },
      { "id": "spa", "x": 200, "y": 29 },
      { "id": "carpenter", "x": 233, "y": 53 },
      { "id": "linus_tent", "x": 249, "y": 41 },
      { "id": "mountain_lake", "x": 281, "y": 56 },
      { "id": "mines_entrance", "x": 291, "y": 40 },
      { "id": "adventurers_guild", "x": 303, "y": 44 },
      { "id": "quarry", "x": 335, "y": 57 },
      { "id": "farm", "x": 125, "y": 113 },
      { "id": "ranch", "x": 142, "y": 137 },
      { "id": "leah_cottage", "x": 150, "y": 154 },
      { "id": "cindersap_forest", "x": 102, "y": 168 },
      { "id": "secret_woods", "x": 74, "y": 100 },
      { "id": "wizard_tower", "x": 72, "y": 139 },
      { "id": "sewer", "x": 142, "y": 203 },
      { "id": "playground", "x": 211, "y": 76 },
      { "id": "community_center", "x": 247, "y": 80 },
      { "id": "clinic", "x": 229, "y": 114 },
      { "id": "pierre", "x": 239, "y": 114 },
      { "id": "town_square", "x": 230, "y": 127 },
      { "id": "saloon", "x": 237, "y": 131 },
      { "id": "alex_house", "x": 253, "y": 122 },
      { "id": "pam_trailer", "x": 266, "y": 128 },
      { "id": "sam_house", "x": 205, "y": 144 },
      { "id": "haley_house", "x": 218, "y": 146 },
      { "id": "mayor_manor", "x": 254, "y": 142 },
      { "id": "jojamart", "x": 289, "y": 111 },
      { "id": "blacksmith", "x": 283, "y": 142 },
      { "id": "museum", "x": 295, "y": 148 },
      { "id": "beach", "x": 263, "y": 191 },
      { "id": "elliott_cabin", "x": 280, "y": 188 },
      { "id": "fish_shop", "x": 271, "y": 207 },
      { "id": "tide_pools", "x": 304, "y": 196 }
    ]
  },
  {
    "id": "ginger_island",
    "name": "Đảo Gừng",
    "nameEn": "Ginger Island",
    "icon": "parrot_egg",
    "img": "assets/maps/ginger_island.png",
    "w": 486,
    "h": 351,
    "spots": [
      { "id": "ginger_island", "x": 235, "y": 172 },
      { "id": "volcano", "x": 240, "y": 108 },
      { "id": "island_trader", "x": 205, "y": 92 },
      { "id": "qi_walnut_room", "x": 160, "y": 128 }
    ]
  },
  {
    "id": "desert",
    "name": "Sa Mạc Calico",
    "nameEn": "Calico Desert",
    "icon": "item_cactus_fruit",
    "img": "assets/maps/desert.png",
    "w": 800,
    "h": 960,
    "spots": [
      { "id": "desert", "x": 420, "y": 380 },
      { "id": "oasis", "x": 150, "y": 770 },
      { "id": "skull_cavern", "x": 135, "y": 80 }
    ]
  },
  {
    "id": "secret_woods",
    "name": "Rừng Bí Mật",
    "nameEn": "Secret Woods",
    "icon": "ing_hardwood",
    "img": "assets/maps/secret_woods.png",
    "w": 2878,
    "h": 1536,
    "spots": [
      { "id": "secret_woods", "x": 2700, "y": 690 },
      { "id": "sw_statue", "x": 440, "y": 330, "name": "Tượng Lão Sư Cannoli", "nameEn": "Old Master Cannoli", "kind": "landmark", "icon": "item_sweet_gem_berry",
        "desc": "Đặt một Quả Ngọc Ngọt (Sweet Gem Berry) vào tượng để nhận một Stardrop." },
      { "id": "sw_pond", "x": 570, "y": 1100, "name": "Ao Rừng Bí Mật", "nameEn": "Secret Woods Pond", "kind": "landmark", "icon": "item_woodskip",
        "desc": "Nơi câu được Cá Gỗ (Woodskip)." },
      { "id": "sw_stumps", "x": 1300, "y": 400, "name": "Gốc Cây Lớn", "nameEn": "Large Stumps", "kind": "landmark", "icon": "ing_hardwood",
        "desc": "Các gốc cây lớn mọc lại mỗi ngày; chặt bằng Rìu Đồng trở lên để lấy Gỗ Cứng (Hardwood)." }
    ]
  }
];

// Schedule locations are free text; these rules map them to a place id.
// First match wins, so specific places come before generic ones. "home"
// means: the NPC's own residence (bedroom, living room, front yard...).
export const LOCATION_RULES = [
  [/sa mạc|oasis|calico/i, "oasis"],
  [/phòng hạt nhân|walnut/i, "qi_walnut_room"],
  [/đảo gừng/i, "ginger_island"],
  [/cống ngầm|sewer/i, "sewer"],
  [/tháp pháp sư|tháp phù thủy|wizard/i, "wizard_tower"],
  [/hội thám hiểm|adventurer/i, "adventurers_guild"],
  [/hầm mỏ|hang mỏ|cửa vào hang/i, "mines_entrance"],
  [/lều linus/i, "linus_tent"],
  [/hồ núi|hồ mountain|mountain lake|vách đá núi|khu vực núi/i, "mountain_lake"],
  [/spa|nhà tắm/i, "spa"],
  [/xe buýt/i, "bus_stop"],
  [/jojamart/i, "jojamart"],
  [/saloon|quán rượu/i, "saloon"],
  [/phòng khám|bệnh viện|harvey/i, "clinic"],
  [/tiệm rèn|lò rèn|clint/i, "blacksmith"],
  [/bảo tàng|thư viện|quầy kem/i, "museum"],
  [/xưởng|robin|demetrius|maru|tầng hầm|phòng thí nghiệm|sunroom/i, "carpenter"],
  [/pierre|abigail|caroline|yoba|aerobic/i, "pierre"],
  [/dinh thự|lewis/i, "mayor_manor"],
  [/trailer|xe kéo|rơ-moóc/i, "pam_trailer"],
  [/haley|emily|2 willow/i, "haley_house"],
  [/willow lane|nhà sam|nhà jodi|phòng ngủ sam|cạnh nhà jodi/i, "sam_house"],
  [/river road|alex|evelyn|george/i, "alex_house"],
  [/elliott|chòi biển|cabin bãi biển/i, "elliott_cabin"],
  [/tiệm cá|cầu cảng|willy/i, "fish_shop"],
  [/bãi biển/i, "beach"],
  [/leah/i, "leah_cottage"],
  [/marnie|chuồng gà|đồng cỏ/i, "ranch"],
  [/rừng cindersap|hồ rừng|bờ sông rừng/i, "cindersap_forest"],
  [/nông trại/i, "farm"],
  [/sân chơi|công viên|đài phun nước|bồn hoa/i, "playground"],
  [/quảng trường|thị trấn|đường làng|nghĩa trang|bờ sông/i, "town_square"],
  [/phòng ngủ|phòng khách|sân trước|đang về nhà|bếp/i, "home"]
];
