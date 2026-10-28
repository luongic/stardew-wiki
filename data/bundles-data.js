// ==========================================================================
// STARDEW VALLEY WIKI - DỮ LIỆU GÓI ĐỒ TRUNG TÂM CỘNG ĐỒNG (COMMUNITY CENTER BUNDLES)
// Gói tiêu chuẩn (không phải Remixed) bản 1.6 + Gói Bị Thất Lạc ở JojaMart bỏ hoang
// Nguồn: stardewvalleywiki.com/Bundles — màu gói theo biểu tượng Bundle <Màu>.png trên wiki
// ==========================================================================

export const CC_ROOMS = [
  {
    "id": "crafts_room",
    "name": "Phòng Thủ Công",
    "nameEn": "Crafts Room",
    "icon": "ing_wood",
    "reward": "Sửa cây cầu dẫn tới Mỏ Đá (Quarry)",
    "rewardEn": "Bridge to the Quarry repaired",
    "bundles": [
      {
        "id": "spring_foraging",
        "name": "Gói Hái Lượm Mùa Xuân",
        "nameEn": "Spring Foraging Bundle",
        "color": "green",
        "required": 4,
        "reward": {
          "name": "Hạt giống Xuân hỗn hợp (Spring Seeds)",
          "count": 30,
          "icon": "assets/icons/spring_seeds.png"
        },
        "items": [
          {
            "name": "Cải ngựa dại",
            "nameEn": "Wild Horseradish",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_wild_horseradish.png",
            "source": "Hái lượm mùa Xuân"
          },
          {
            "name": "Thủy tiên vàng",
            "nameEn": "Daffodil",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/ing_daffodil.png",
            "source": "Hái lượm mùa Xuân; mua ở Lễ hội Khiêu vũ Hoa"
          },
          {
            "name": "Tỏi tây",
            "nameEn": "Leek",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_leek.png",
            "source": "Hái lượm mùa Xuân"
          },
          {
            "name": "Bồ công anh",
            "nameEn": "Dandelion",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_dandelion.png",
            "source": "Hái lượm mùa Xuân; mua ở Lễ hội Khiêu vũ Hoa"
          }
        ]
      },
      {
        "id": "summer_foraging",
        "name": "Gói Hái Lượm Mùa Hè",
        "nameEn": "Summer Foraging Bundle",
        "color": "yellow",
        "required": 3,
        "reward": {
          "name": "Hạt giống Hè hỗn hợp (Summer Seeds)",
          "count": 30,
          "icon": "assets/icons/summer_seeds.png"
        },
        "items": [
          {
            "name": "Nho",
            "nameEn": "Grape",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_grape.png",
            "source": "Hái lượm mùa Hè; trồng mùa Thu"
          },
          {
            "name": "Quả mọng cay",
            "nameEn": "Spice Berry",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/spice_berry.png",
            "source": "Hái lượm mùa Hè; Hang Nông Trại (dơi)"
          },
          {
            "name": "Hoa đậu thơm",
            "nameEn": "Sweet Pea",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/ing_sweet_pea.png",
            "source": "Hái lượm mùa Hè"
          }
        ]
      },
      {
        "id": "fall_foraging",
        "name": "Gói Hái Lượm Mùa Thu",
        "nameEn": "Fall Foraging Bundle",
        "color": "orange",
        "required": 4,
        "reward": {
          "name": "Hạt giống Thu hỗn hợp (Fall Seeds)",
          "count": 30,
          "icon": "assets/icons/fall_seeds.png"
        },
        "items": [
          {
            "name": "Nấm thường",
            "nameEn": "Common Mushroom",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/ing_common_mushroom.png",
            "source": "Hái lượm mùa Thu; Rừng Bí Mật; Hang Nông Trại (nấm)"
          },
          {
            "name": "Mận rừng",
            "nameEn": "Wild Plum",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/ing_wild_plum.png",
            "source": "Hái lượm mùa Thu; Hang Nông Trại (dơi)"
          },
          {
            "name": "Hạt phỉ",
            "nameEn": "Hazelnut",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/ing_hazelnut.png",
            "source": "Hái lượm mùa Thu"
          },
          {
            "name": "Mâm Xôi Đen",
            "nameEn": "Blackberry",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_blackberry.png",
            "source": "Hái lượm mùa Thu (mùa mâm xôi 8–11 Thu)"
          }
        ]
      },
      {
        "id": "winter_foraging",
        "name": "Gói Hái Lượm Mùa Đông",
        "nameEn": "Winter Foraging Bundle",
        "color": "teal",
        "required": 4,
        "reward": {
          "name": "Hạt giống Đông hỗn hợp (Winter Seeds)",
          "count": 30,
          "icon": "assets/icons/winter_seeds.png"
        },
        "items": [
          {
            "name": "Củ mùa đông",
            "nameEn": "Winter Root",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/winter_root.png",
            "source": "Cuốc đất / điểm cổ vật mùa Đông; Slime xanh tầng 41–79"
          },
          {
            "name": "Quả pha lê",
            "nameEn": "Crystal Fruit",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/crystal_fruit.png",
            "source": "Hái lượm mùa Đông; Dust Sprite tầng 41–79"
          },
          {
            "name": "Khoai tuyết",
            "nameEn": "Snow Yam",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/snow_yam.png",
            "source": "Cuốc đất / điểm cổ vật mùa Đông"
          },
          {
            "name": "Hoa nghệ tây",
            "nameEn": "Crocus",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/ing_crocus.png",
            "source": "Hái lượm mùa Đông"
          }
        ]
      },
      {
        "id": "construction",
        "name": "Gói Xây Dựng",
        "nameEn": "Construction Bundle",
        "color": "red",
        "required": 4,
        "reward": {
          "name": "Lò than (Charcoal Kiln)",
          "count": 1,
          "icon": "assets/icons/charcoal_kiln.png"
        },
        "items": [
          {
            "name": "Gỗ",
            "nameEn": "Wood",
            "count": 99,
            "quality": null,
            "icon": "assets/icons/ing_wood.png",
            "source": "Chặt cây bằng Rìu; mua ở tiệm Robin"
          },
          {
            "name": "Gỗ",
            "nameEn": "Wood",
            "count": 99,
            "quality": null,
            "icon": "assets/icons/ing_wood.png",
            "source": "Chặt cây bằng Rìu; mua ở tiệm Robin"
          },
          {
            "name": "Đá",
            "nameEn": "Stone",
            "count": 99,
            "quality": null,
            "icon": "assets/icons/ing_stone.png",
            "source": "Đập đá bằng Cuốc chim; mua ở tiệm Robin"
          },
          {
            "name": "Gỗ cứng",
            "nameEn": "Hardwood",
            "count": 10,
            "quality": null,
            "icon": "assets/icons/ing_hardwood.png",
            "source": "Chặt gốc/khúc gỗ lớn bằng Rìu nâng cấp; cây Gụ"
          }
        ]
      },
      {
        "id": "exotic_foraging",
        "name": "Gói Hái Lượm Kỳ Lạ",
        "nameEn": "Exotic Foraging Bundle",
        "color": "purple",
        "required": 5,
        "reward": {
          "name": "Mùa Thu Bội Thu (Autumn's Bounty)",
          "count": 5,
          "icon": "assets/icons/autumns_bounty.png"
        },
        "items": [
          {
            "name": "Dừa",
            "nameEn": "Coconut",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_coconut.png",
            "source": "Hái lượm ở Sa Mạc; tiệm Oasis"
          },
          {
            "name": "Quả xương rồng",
            "nameEn": "Cactus Fruit",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_cactus_fruit.png",
            "source": "Hái lượm ở Sa Mạc; tiệm Oasis"
          },
          {
            "name": "Cà rốt hang",
            "nameEn": "Cave Carrot",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/cave_carrot.png",
            "source": "Mỏ: đập thùng hoặc cuốc đất"
          },
          {
            "name": "Nấm đỏ",
            "nameEn": "Red Mushroom",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/red_mushroom.png",
            "source": "Mỏ; Rừng Bí Mật (Hè/Thu); Hang Nông Trại (nấm)"
          },
          {
            "name": "Nấm tím",
            "nameEn": "Purple Mushroom",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_purple_mushroom.png",
            "source": "Mỏ; Hang Nông Trại (nấm)"
          },
          {
            "name": "Siro cây phong",
            "nameEn": "Maple Syrup",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/ing_maple_syrup.png",
            "source": "Gắn Máy chiết nhựa vào cây Phong"
          },
          {
            "name": "Nhựa cây sồi",
            "nameEn": "Oak Resin",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/ing_oak_resin.png",
            "source": "Gắn Máy chiết nhựa vào cây Sồi"
          },
          {
            "name": "Nhựa thông",
            "nameEn": "Pine Tar",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/ing_pine_tar.png",
            "source": "Gắn Máy chiết nhựa vào cây Thông"
          },
          {
            "name": "Nấm Morel",
            "nameEn": "Morel",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_morel.png",
            "source": "Rừng Bí Mật mùa Xuân; Hang Nông Trại (nấm)"
          }
        ]
      }
    ]
  },
  {
    "id": "pantry",
    "name": "Phòng Chứa Thức Ăn",
    "nameEn": "Pantry",
    "icon": "item_parsnip",
    "reward": "Sửa Nhà Kính (Greenhouse) trên nông trại",
    "rewardEn": "Greenhouse restored",
    "bundles": [
      {
        "id": "spring_crops",
        "name": "Gói Nông Sản Mùa Xuân",
        "nameEn": "Spring Crops Bundle",
        "color": "green",
        "required": 4,
        "reward": {
          "name": "Phân tăng tốc (Speed-Gro)",
          "count": 20,
          "icon": "assets/icons/speed_gro.png"
        },
        "items": [
          {
            "name": "Củ Cải Vàng",
            "nameEn": "Parsnip",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_parsnip.png",
            "source": "Trồng mùa Xuân"
          },
          {
            "name": "Đậu xanh",
            "nameEn": "Green Bean",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/green_bean.png",
            "source": "Trồng mùa Xuân"
          },
          {
            "name": "Súp Lơ Trắng",
            "nameEn": "Cauliflower",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_cauliflower.png",
            "source": "Trồng mùa Xuân"
          },
          {
            "name": "Khoai Tây",
            "nameEn": "Potato",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_potato.png",
            "source": "Trồng mùa Xuân"
          }
        ]
      },
      {
        "id": "summer_crops",
        "name": "Gói Nông Sản Mùa Hè",
        "nameEn": "Summer Crops Bundle",
        "color": "yellow",
        "required": 4,
        "reward": {
          "name": "Bình tưới chất lượng (Quality Sprinkler)",
          "count": 1,
          "icon": "assets/icons/quality_sprinkler.png"
        },
        "items": [
          {
            "name": "Cà Chua",
            "nameEn": "Tomato",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_tomato.png",
            "source": "Trồng mùa Hè"
          },
          {
            "name": "Ớt Cay Đỏ",
            "nameEn": "Hot Pepper",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_hot_pepper.png",
            "source": "Trồng mùa Hè"
          },
          {
            "name": "Việt quất",
            "nameEn": "Blueberry",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_blueberry.png",
            "source": "Trồng mùa Hè"
          },
          {
            "name": "Dưa Gang",
            "nameEn": "Melon",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_melon.png",
            "source": "Trồng mùa Hè"
          }
        ]
      },
      {
        "id": "fall_crops",
        "name": "Gói Nông Sản Mùa Thu",
        "nameEn": "Fall Crops Bundle",
        "color": "orange",
        "required": 4,
        "reward": {
          "name": "Nhà nuôi ong (Bee House)",
          "count": 1,
          "icon": "assets/icons/bee_house.png"
        },
        "items": [
          {
            "name": "Bắp Ngô",
            "nameEn": "Corn",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_corn.png",
            "source": "Trồng mùa Hè / Thu"
          },
          {
            "name": "Cà Tím",
            "nameEn": "Eggplant",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_eggplant.png",
            "source": "Trồng mùa Thu"
          },
          {
            "name": "Bí Ngô",
            "nameEn": "Pumpkin",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_pumpkin.png",
            "source": "Trồng mùa Thu"
          },
          {
            "name": "Khoai lang",
            "nameEn": "Yam",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/yam.png",
            "source": "Trồng mùa Thu; Duggy tầng 6–29"
          }
        ]
      },
      {
        "id": "quality_crops",
        "name": "Gói Nông Sản Chất Lượng",
        "nameEn": "Quality Crops Bundle",
        "color": "teal",
        "required": 3,
        "reward": {
          "name": "Hũ ngâm (Preserves Jar)",
          "count": 1,
          "icon": "assets/icons/preserves_jar.png"
        },
        "items": [
          {
            "name": "Củ Cải Vàng",
            "nameEn": "Parsnip",
            "count": 5,
            "quality": "gold",
            "icon": "assets/icons/item_parsnip.png",
            "source": "Trồng mùa Xuân (chất lượng vàng)"
          },
          {
            "name": "Dưa Gang",
            "nameEn": "Melon",
            "count": 5,
            "quality": "gold",
            "icon": "assets/icons/item_melon.png",
            "source": "Trồng mùa Hè (chất lượng vàng)"
          },
          {
            "name": "Bí Ngô",
            "nameEn": "Pumpkin",
            "count": 5,
            "quality": "gold",
            "icon": "assets/icons/item_pumpkin.png",
            "source": "Trồng mùa Thu (chất lượng vàng)"
          },
          {
            "name": "Bắp Ngô",
            "nameEn": "Corn",
            "count": 5,
            "quality": "gold",
            "icon": "assets/icons/item_corn.png",
            "source": "Trồng mùa Hè / Thu (chất lượng vàng)"
          }
        ]
      },
      {
        "id": "animal",
        "name": "Gói Vật Nuôi",
        "nameEn": "Animal Bundle",
        "color": "red",
        "required": 5,
        "reward": {
          "name": "Máy ép phô mai (Cheese Press)",
          "count": 1,
          "icon": "assets/icons/cheese_press.png"
        },
        "items": [
          {
            "name": "Sữa bò lớn",
            "nameEn": "Large Milk",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_large_milk.png",
            "source": "Bò (quan hệ cao)"
          },
          {
            "name": "Trứng nâu lớn",
            "nameEn": "Large Brown Egg",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/large_brown_egg.png",
            "source": "Gà nâu"
          },
          {
            "name": "Trứng lớn",
            "nameEn": "Large Egg",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_large_egg.png",
            "source": "Gà trắng"
          },
          {
            "name": "Sữa dê lớn",
            "nameEn": "Large Goat Milk",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/large_goat_milk.png",
            "source": "Dê"
          },
          {
            "name": "Len",
            "nameEn": "Wool",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_wool.png",
            "source": "Cừu, Thỏ"
          },
          {
            "name": "Trứng vịt",
            "nameEn": "Duck Egg",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_duck_egg.png",
            "source": "Vịt"
          }
        ]
      },
      {
        "id": "artisan",
        "name": "Gói Thủ Công Nghệ Nhân",
        "nameEn": "Artisan Bundle",
        "color": "purple",
        "required": 6,
        "reward": {
          "name": "Thùng ủ (Keg)",
          "count": 1,
          "icon": "assets/icons/keg.png"
        },
        "items": [
          {
            "name": "Dầu nấm Truffle",
            "nameEn": "Truffle Oil",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/truffle_oil.png",
            "source": "Máy ép dầu + Nấm cục"
          },
          {
            "name": "Vải dệt",
            "nameEn": "Cloth",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/ing_cloth.png",
            "source": "Khung dệt; tái chế báo ướt; Thương nhân Sa Mạc"
          },
          {
            "name": "Phô mai dê",
            "nameEn": "Goat Cheese",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/goat_cheese.png",
            "source": "Máy ép phô mai (sữa dê)"
          },
          {
            "name": "Phô mai",
            "nameEn": "Cheese",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/cheese.png",
            "source": "Máy ép phô mai (sữa bò)"
          },
          {
            "name": "Mật ong",
            "nameEn": "Honey",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/honey.png",
            "source": "Nhà nuôi ong; tiệm Oasis"
          },
          {
            "name": "Mứt",
            "nameEn": "Jelly",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/jelly.png",
            "source": "Hũ ngâm + trái cây"
          },
          {
            "name": "Táo Đỏ",
            "nameEn": "Apple",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_apple.png",
            "source": "Cây Táo (mùa Thu); Hang Nông Trại (dơi)"
          },
          {
            "name": "Mơ Tây",
            "nameEn": "Apricot",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_apricot.png",
            "source": "Cây Mơ (mùa Xuân)"
          },
          {
            "name": "Cam Ngọt",
            "nameEn": "Orange",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_orange.png",
            "source": "Cây Cam (mùa Hè)"
          },
          {
            "name": "Đào Tiên Hồng",
            "nameEn": "Peach",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_peach.png",
            "source": "Cây Đào (mùa Hè)"
          },
          {
            "name": "Lựu Đỏ",
            "nameEn": "Pomegranate",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_pomegranate.png",
            "source": "Cây Lựu (mùa Thu)"
          },
          {
            "name": "Anh Đào",
            "nameEn": "Cherry",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_cherry.png",
            "source": "Cây Anh Đào (mùa Xuân)"
          }
        ]
      }
    ]
  },
  {
    "id": "fish_tank",
    "name": "Bể Cá",
    "nameEn": "Fish Tank",
    "icon": "item_largemouth_bass",
    "reward": "Dọn tảng đá lấp lánh gần Mỏ; Willy tặng Chảo đãi đồng",
    "rewardEn": "Glittering Boulder removed (Copper Pan)",
    "bundles": [
      {
        "id": "river_fish",
        "name": "Gói Cá Sông",
        "nameEn": "River Fish Bundle",
        "color": "teal",
        "required": 4,
        "reward": {
          "name": "Mồi cao cấp (Deluxe Bait)",
          "count": 30,
          "icon": "assets/icons/deluxe_bait.png"
        },
        "items": [
          {
            "name": "Cá Thái Dương",
            "nameEn": "Sunfish",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_sunfish.png",
            "source": "Sông, 6h–19h, Xuân/Hè, trời nắng"
          },
          {
            "name": "Cá Trê Gai",
            "nameEn": "Catfish",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_catfish.png",
            "source": "Sông, Xuân/Thu, trời mưa; Rừng Bí Mật"
          },
          {
            "name": "Cá Trích Sông",
            "nameEn": "Shad",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_shad.png",
            "source": "Sông, 9h–2h, Xuân/Hè/Thu, trời mưa"
          },
          {
            "name": "Cá hồi vằn",
            "nameEn": "Tiger Trout",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_tiger_trout.png",
            "source": "Sông, 6h–19h, Thu/Đông"
          }
        ]
      },
      {
        "id": "lake_fish",
        "name": "Gói Cá Hồ",
        "nameEn": "Lake Fish Bundle",
        "color": "green",
        "required": 4,
        "reward": {
          "name": "Mồi xoay trang trí (Dressed Spinner)",
          "count": 1,
          "icon": "assets/icons/dressed_spinner.png"
        },
        "items": [
          {
            "name": "Cá vược miệng rộng",
            "nameEn": "Largemouth Bass",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_largemouth_bass.png",
            "source": "Hồ trên Núi, 6h–19h, mọi mùa"
          },
          {
            "name": "Cá Chép Thường",
            "nameEn": "Carp",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_carp.png",
            "source": "Hồ trên Núi (Xuân/Hè/Thu); Rừng Bí Mật; Cống ngầm"
          },
          {
            "name": "Cá trê đầu bò",
            "nameEn": "Bullhead",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_bullhead.png",
            "source": "Hồ trên Núi, mọi lúc, mọi mùa"
          },
          {
            "name": "Cá tầm",
            "nameEn": "Sturgeon",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_sturgeon.png",
            "source": "Hồ trên Núi, 6h–19h, Hè/Đông"
          }
        ]
      },
      {
        "id": "ocean_fish",
        "name": "Gói Cá Biển",
        "nameEn": "Ocean Fish Bundle",
        "color": "blue",
        "required": 4,
        "reward": {
          "name": "Vật tổ dịch chuyển: Bãi biển (Warp Totem: Beach)",
          "count": 5,
          "icon": "assets/icons/warp_totem_beach.png"
        },
        "items": [
          {
            "name": "Cá Mòi Biển",
            "nameEn": "Sardine",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_sardine.png",
            "source": "Biển, 6h–19h, Xuân/Thu/Đông"
          },
          {
            "name": "Cá ngừ",
            "nameEn": "Tuna",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_tuna.png",
            "source": "Biển, 6h–19h, Hè/Đông"
          },
          {
            "name": "Cá Hồng Đỏ",
            "nameEn": "Red Snapper",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_red_snapper.png",
            "source": "Biển, 6h–19h, Hè/Thu, trời mưa"
          },
          {
            "name": "Cá Rô Phi",
            "nameEn": "Tilapia",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_tilapia.png",
            "source": "Biển, 6h–14h, Hè/Thu"
          }
        ]
      },
      {
        "id": "night_fishing",
        "name": "Gói Câu Cá Đêm",
        "nameEn": "Night Fishing Bundle",
        "color": "purple",
        "required": 3,
        "reward": {
          "name": "Nhẫn phát sáng (Glow Ring)",
          "count": 1,
          "icon": "assets/icons/glow_ring.png"
        },
        "items": [
          {
            "name": "Cá vược mắt trắng",
            "nameEn": "Walleye",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_walleye.png",
            "source": "Sông/Hồ/Ao rừng, 12h–2h, mùa Thu, trời mưa"
          },
          {
            "name": "Cá Vền Sông",
            "nameEn": "Bream",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_bream.png",
            "source": "Sông, 18h–2h, mọi mùa"
          },
          {
            "name": "Cá Chình Biển",
            "nameEn": "Eel",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_eel.png",
            "source": "Biển, 16h–2h, Xuân/Thu, trời mưa"
          }
        ]
      },
      {
        "id": "crab_pot",
        "name": "Gói Bẫy Cua",
        "nameEn": "Crab Pot Bundle",
        "color": "purple",
        "required": 5,
        "reward": {
          "name": "Bẫy cua (Crab Pot)",
          "count": 3,
          "icon": "assets/icons/crab_pot.png"
        },
        "items": [
          {
            "name": "Tôm Hùm Biển",
            "nameEn": "Lobster",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_lobster.png",
            "source": "Bẫy cua (biển)"
          },
          {
            "name": "Tôm càng",
            "nameEn": "Crayfish",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_crayfish.png",
            "source": "Bẫy cua (nước ngọt)"
          },
          {
            "name": "Cua Biển",
            "nameEn": "Crab",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_crab.png",
            "source": "Bẫy cua (biển); Cua đá trong Mỏ"
          },
          {
            "name": "Sò Huyết",
            "nameEn": "Cockle",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_cockle.png",
            "source": "Bẫy cua (biển); nhặt ở Bãi biển"
          },
          {
            "name": "Vẹm Xanh",
            "nameEn": "Mussel",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_mussel.png",
            "source": "Bẫy cua (biển); nhặt ở Bãi biển"
          },
          {
            "name": "Tôm Biển",
            "nameEn": "Shrimp",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_shrimp.png",
            "source": "Bẫy cua (biển)"
          },
          {
            "name": "Ốc Sên Nước",
            "nameEn": "Snail",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_snail.png",
            "source": "Bẫy cua (nước ngọt)"
          },
          {
            "name": "Ốc Gạo Xanh",
            "nameEn": "Periwinkle",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_periwinkle.png",
            "source": "Bẫy cua (nước ngọt)"
          },
          {
            "name": "Hàu Biển",
            "nameEn": "Oyster",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_oyster.png",
            "source": "Bẫy cua (biển); nhặt ở Bãi biển"
          },
          {
            "name": "Nghêu Biển",
            "nameEn": "Clam",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_clam.png",
            "source": "Bẫy cua (biển); nhặt ở Bãi biển"
          }
        ]
      },
      {
        "id": "specialty_fish",
        "name": "Gói Cá Đặc Biệt",
        "nameEn": "Specialty Fish Bundle",
        "color": "red",
        "required": 4,
        "reward": {
          "name": "Món Hải Sản (Dish O' The Sea)",
          "count": 5,
          "icon": "assets/icons/dish_o_the_sea.png"
        },
        "items": [
          {
            "name": "Cá Nóc Phồng",
            "nameEn": "Pufferfish",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_pufferfish.png",
            "source": "Biển, 12h–16h, mùa Hè, trời nắng"
          },
          {
            "name": "Cá Ma Mù",
            "nameEn": "Ghostfish",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_ghostfish.png",
            "source": "Hồ trong Mỏ tầng 20 & 60; Ma rơi ra"
          },
          {
            "name": "Cá Cát",
            "nameEn": "Sandfish",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_sandfish.png",
            "source": "Ao ở Sa Mạc, 6h–20h, mọi mùa"
          },
          {
            "name": "Cá rừng",
            "nameEn": "Woodskip",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_woodskip.png",
            "source": "Rừng Bí Mật; Nông trại Rừng"
          }
        ]
      }
    ]
  },
  {
    "id": "boiler_room",
    "name": "Phòng Lò Hơi",
    "nameEn": "Boiler Room",
    "icon": "furnace",
    "reward": "Sửa hệ thống Xe Goòng (Minecart) để di chuyển nhanh",
    "rewardEn": "Minecarts repaired",
    "bundles": [
      {
        "id": "blacksmith",
        "name": "Gói Thợ Rèn",
        "nameEn": "Blacksmith's Bundle",
        "color": "orange",
        "required": 3,
        "reward": {
          "name": "Lò nung (Furnace)",
          "count": 1,
          "icon": "assets/icons/furnace.png"
        },
        "items": [
          {
            "name": "Thỏi đồng",
            "nameEn": "Copper Bar",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/ing_copper_bar.png",
            "source": "Nung Quặng Đồng trong Lò nung"
          },
          {
            "name": "Thỏi sắt",
            "nameEn": "Iron Bar",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/ing_iron_bar.png",
            "source": "Nung Quặng Sắt trong Lò nung"
          },
          {
            "name": "Thỏi vàng",
            "nameEn": "Gold Bar",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/ing_gold_bar.png",
            "source": "Nung Quặng Vàng trong Lò nung"
          }
        ]
      },
      {
        "id": "geologist",
        "name": "Gói Nhà Địa Chất",
        "nameEn": "Geologist's Bundle",
        "color": "purple",
        "required": 4,
        "reward": {
          "name": "Geode Vạn năng (Omni Geode)",
          "count": 5,
          "icon": "assets/icons/omni_geode.png"
        },
        "items": [
          {
            "name": "Thạch anh",
            "nameEn": "Quartz",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/ing_quartz.png",
            "source": "Nhặt trong Mỏ (mọi tầng)"
          },
          {
            "name": "Tinh thể đất",
            "nameEn": "Earth Crystal",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/earth_crystal.png",
            "source": "Mỏ tầng 1–39; Geode"
          },
          {
            "name": "Nước mắt băng",
            "nameEn": "Frozen Tear",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/frozen_tear.png",
            "source": "Mỏ tầng 41–79; Geode Băng"
          },
          {
            "name": "Thạch anh lửa",
            "nameEn": "Fire Quartz",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/ing_fire_quartz.png",
            "source": "Mỏ tầng 81–119; Geode Magma"
          }
        ]
      },
      {
        "id": "adventurer",
        "name": "Gói Nhà Thám Hiểm",
        "nameEn": "Adventurer's Bundle",
        "color": "purple",
        "required": 2,
        "reward": {
          "name": "Nhẫn nam châm nhỏ (Small Magnet Ring)",
          "count": 1,
          "icon": "assets/icons/small_magnet_ring.png"
        },
        "items": [
          {
            "name": "Chất nhờn",
            "nameEn": "Slime",
            "count": 99,
            "quality": null,
            "icon": "assets/icons/ing_slime.png",
            "source": "Đánh Slime"
          },
          {
            "name": "Cánh dơi",
            "nameEn": "Bat Wing",
            "count": 10,
            "quality": null,
            "icon": "assets/icons/ing_bat_wing.png",
            "source": "Dơi trong Mỏ / Hang Sọ"
          },
          {
            "name": "Tinh chất mặt trời",
            "nameEn": "Solar Essence",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/ing_solar_essence.png",
            "source": "Ma, Squid Kid, Metal Head; mua ở Krobus"
          },
          {
            "name": "Tinh chất hư không",
            "nameEn": "Void Essence",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/ing_void_essence.png",
            "source": "Shadow Brute/Shaman, Serpent; mua ở Krobus"
          }
        ]
      }
    ]
  },
  {
    "id": "bulletin_board",
    "name": "Bảng Tin",
    "nameEn": "Bulletin Board",
    "icon": "price_catalogue",
    "reward": "+2 tim với mọi dân làng không thể kết hôn",
    "rewardEn": "+2 hearts with all non-datable villagers",
    "bundles": [
      {
        "id": "chef",
        "name": "Gói Đầu Bếp",
        "nameEn": "Chef's Bundle",
        "color": "red",
        "required": 6,
        "reward": {
          "name": "Bánh hồng (Pink Cake)",
          "count": 3,
          "icon": "assets/icons/pink_cake.png"
        },
        "items": [
          {
            "name": "Siro cây phong",
            "nameEn": "Maple Syrup",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/ing_maple_syrup.png",
            "source": "Gắn Máy chiết nhựa vào cây Phong"
          },
          {
            "name": "Rau Dớn Cuộn",
            "nameEn": "Fiddlehead Fern",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_fiddlehead_fern.png",
            "source": "Rừng Bí Mật mùa Hè"
          },
          {
            "name": "Nấm cục",
            "nameEn": "Truffle",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_truffle.png",
            "source": "Heo đào được"
          },
          {
            "name": "Hoa Anh Túc",
            "nameEn": "Poppy",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/ing_poppy.png",
            "source": "Trồng mùa Hè"
          },
          {
            "name": "Cơm cuộn Maki",
            "nameEn": "Maki Roll",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/maki_roll.png",
            "source": "Nấu ăn (công thức từ TV / Quán rượu)"
          },
          {
            "name": "Trứng Chiên",
            "nameEn": "Fried Egg",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/fried_egg.png",
            "source": "Nấu ăn"
          }
        ]
      },
      {
        "id": "dye",
        "name": "Gói Thuốc Nhuộm",
        "nameEn": "Dye Bundle",
        "color": "teal",
        "required": 6,
        "reward": {
          "name": "Máy tạo hạt giống (Seed Maker)",
          "count": 1,
          "icon": "assets/icons/seed_maker.png"
        },
        "items": [
          {
            "name": "Nấm đỏ",
            "nameEn": "Red Mushroom",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/red_mushroom.png",
            "source": "Mỏ; Rừng Bí Mật (Hè/Thu); Hang Nông Trại (nấm)"
          },
          {
            "name": "Nhum Biển",
            "nameEn": "Sea Urchin",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_sea_urchin.png",
            "source": "Bãi biển (sau khi sửa cầu)"
          },
          {
            "name": "Hoa hướng dương",
            "nameEn": "Sunflower",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/ing_sunflower.png",
            "source": "Trồng mùa Hè / Thu"
          },
          {
            "name": "Lông vịt",
            "nameEn": "Duck Feather",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_duck_feather.png",
            "source": "Vịt (quan hệ cao)"
          },
          {
            "name": "Ngọc xanh biển",
            "nameEn": "Aquamarine",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/ing_aquamarine.png",
            "source": "Mỏ đá Aquamarine; rương câu cá"
          },
          {
            "name": "Bắp Cải Tím",
            "nameEn": "Red Cabbage",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_red_cabbage.png",
            "source": "Trồng mùa Hè (hạt từ năm 2 / Xe hàng rong)"
          }
        ]
      },
      {
        "id": "field_research",
        "name": "Gói Nghiên Cứu Thực Địa",
        "nameEn": "Field Research Bundle",
        "color": "blue",
        "required": 4,
        "reward": {
          "name": "Máy tái chế (Recycling Machine)",
          "count": 1,
          "icon": "assets/icons/recycling_machine.png"
        },
        "items": [
          {
            "name": "Nấm tím",
            "nameEn": "Purple Mushroom",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_purple_mushroom.png",
            "source": "Mỏ; Hang Nông Trại (nấm)"
          },
          {
            "name": "Vỏ ốc anh vũ",
            "nameEn": "Nautilus Shell",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/nautilus_shell.png",
            "source": "Bãi biển mùa Đông"
          },
          {
            "name": "Cá Chày",
            "nameEn": "Chub",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_chub.png",
            "source": "Hồ trên Núi và sông, mọi mùa"
          },
          {
            "name": "Geode băng",
            "nameEn": "Frozen Geode",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/frozen_geode.png",
            "source": "Mỏ tầng 41–79"
          }
        ]
      },
      {
        "id": "fodder",
        "name": "Gói Thức Ăn Gia Súc",
        "nameEn": "Fodder Bundle",
        "color": "yellow",
        "required": 3,
        "reward": {
          "name": "Máy sưởi (Heater)",
          "count": 1,
          "icon": "assets/icons/heater.png"
        },
        "items": [
          {
            "name": "Lúa mì",
            "nameEn": "Wheat",
            "count": 10,
            "quality": null,
            "icon": "assets/icons/wheat.png",
            "source": "Trồng mùa Hè / Thu"
          },
          {
            "name": "Cỏ khô",
            "nameEn": "Hay",
            "count": 10,
            "quality": null,
            "icon": "assets/icons/hay.png",
            "source": "Mua ở trang trại Marnie; cắt cỏ có Silo"
          },
          {
            "name": "Táo Đỏ",
            "nameEn": "Apple",
            "count": 3,
            "quality": null,
            "icon": "assets/icons/item_apple.png",
            "source": "Cây Táo (mùa Thu)"
          }
        ]
      },
      {
        "id": "enchanter",
        "name": "Gói Pháp Sư",
        "nameEn": "Enchanter's Bundle",
        "color": "purple",
        "required": 4,
        "reward": {
          "name": "Thỏi vàng (Gold Bar)",
          "count": 5,
          "icon": "assets/icons/ing_gold_bar.png"
        },
        "items": [
          {
            "name": "Nhựa cây sồi",
            "nameEn": "Oak Resin",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/ing_oak_resin.png",
            "source": "Gắn Máy chiết nhựa vào cây Sồi"
          },
          {
            "name": "Rượu vang",
            "nameEn": "Wine",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/wine.png",
            "source": "Thùng ủ + trái cây"
          },
          {
            "name": "Chân thỏ",
            "nameEn": "Rabbit's Foot",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_rabbits_foot.png",
            "source": "Thỏ (quan hệ cao); Serpent"
          },
          {
            "name": "Lựu Đỏ",
            "nameEn": "Pomegranate",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_pomegranate.png",
            "source": "Cây Lựu (mùa Thu)"
          }
        ]
      }
    ]
  },
  {
    "id": "vault",
    "name": "Kho Bạc",
    "nameEn": "Vault",
    "icon": "gold_coin",
    "reward": "Sửa Xe Buýt, mở đường tới Sa Mạc Calico",
    "rewardEn": "Bus repaired (Calico Desert access)",
    "bundles": [
      {
        "id": "vault_2500",
        "name": "Gói 2.500g",
        "nameEn": "2,500g Bundle",
        "color": "red",
        "required": 1,
        "reward": {
          "name": "Bánh Gato Sô-cô-la (Chocolate Cake)",
          "count": 3,
          "icon": "assets/icons/chocolate_cake.png"
        },
        "items": [
          {
            "name": "2.500g",
            "nameEn": "2,500g",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/gold_coin.png",
            "gold": 2500,
            "source": "Nộp tiền vàng"
          }
        ]
      },
      {
        "id": "vault_5000",
        "name": "Gói 5.000g",
        "nameEn": "5,000g Bundle",
        "color": "orange",
        "required": 1,
        "reward": {
          "name": "Phân bón chất lượng (Quality Fertilizer)",
          "count": 30,
          "icon": "assets/icons/quality_fertilizer.png"
        },
        "items": [
          {
            "name": "5.000g",
            "nameEn": "5,000g",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/gold_coin.png",
            "gold": 5000,
            "source": "Nộp tiền vàng"
          }
        ]
      },
      {
        "id": "vault_10000",
        "name": "Gói 10.000g",
        "nameEn": "10,000g Bundle",
        "color": "yellow",
        "required": 1,
        "reward": {
          "name": "Cột thu lôi (Lightning Rod)",
          "count": 1,
          "icon": "assets/icons/lightning_rod.png"
        },
        "items": [
          {
            "name": "10.000g",
            "nameEn": "10,000g",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/gold_coin.png",
            "gold": 10000,
            "source": "Nộp tiền vàng"
          }
        ]
      },
      {
        "id": "vault_25000",
        "name": "Gói 25.000g",
        "nameEn": "25,000g Bundle",
        "color": "purple",
        "required": 1,
        "reward": {
          "name": "Máy nhân bản pha lê (Crystalarium)",
          "count": 1,
          "icon": "assets/icons/crystalarium.png"
        },
        "items": [
          {
            "name": "25.000g",
            "nameEn": "25,000g",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/gold_coin.png",
            "gold": 25000,
            "source": "Nộp tiền vàng"
          }
        ]
      }
    ]
  },
  {
    "id": "abandoned_joja",
    "name": "JojaMart Bỏ Hoang",
    "nameEn": "Abandoned JojaMart",
    "icon": "movie_ticket",
    "reward": "Xây Rạp Chiếu Phim (Movie Theater)",
    "rewardEn": "Movie Theater",
    "bundles": [
      {
        "id": "missing_bundle",
        "name": "Gói Bị Thất Lạc",
        "nameEn": "The Missing Bundle",
        "color": "purple",
        "required": 5,
        "reward": {
          "name": "Rạp chiếu phim (Movie Theater)",
          "count": 1,
          "icon": "assets/icons/movie_ticket.png"
        },
        "items": [
          {
            "name": "Rượu vang",
            "nameEn": "Wine",
            "count": 1,
            "quality": "silver",
            "icon": "assets/icons/wine.png",
            "source": "Rượu vang bạc trở lên: ủ trong Thùng gỗ sồi (Cask)"
          },
          {
            "name": "Sốt mayonnaise khủng long",
            "nameEn": "Dinosaur Mayonnaise",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/dinosaur_mayonnaise.png",
            "source": "Máy làm sốt Mayonnaise + Trứng khủng long"
          },
          {
            "name": "Mảnh Lăng Kính",
            "nameEn": "Prismatic Shard",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_prismatic_shard.png",
            "source": "Khai thác Mỏ / Hang Sọ, Geode Đa Năng"
          },
          {
            "name": "Quả Cổ Đại",
            "nameEn": "Ancient Fruit",
            "count": 5,
            "quality": "gold",
            "icon": "assets/icons/item_ancient_fruit.png",
            "source": "Trồng Hạt Cổ Đại (chất lượng vàng)"
          },
          {
            "name": "Cá hồi hư không",
            "nameEn": "Void Salmon",
            "count": 1,
            "quality": "gold",
            "icon": "assets/icons/item_void_salmon.png",
            "source": "Câu ở Đầm Phù Thủy (chất lượng vàng)"
          },
          {
            "name": "Trứng cá muối",
            "nameEn": "Caviar",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/caviar.png",
            "source": "Hũ ngâm + Trứng cá tầm"
          }
        ]
      }
    ]
  }
];
