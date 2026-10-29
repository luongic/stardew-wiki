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
        "name": "Sản vật mùa Xuân",
        "nameEn": "Spring Foraging Bundle",
        "color": "green",
        "required": 4,
        "reward": {
          "name": "Hạt giống mùa Xuân (Spring Seeds)",
          "count": 30,
          "icon": "assets/icons/spring_seeds.png"
        },
        "items": [
          {
            "name": "Cải ngựa Dại",
            "nameEn": "Wild Horseradish",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_wild_horseradish.png",
            "source": "Hái lượm mùa Xuân"
          },
          {
            "name": "Thủy tiên",
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
        "name": "Sản vật mùa Hè",
        "nameEn": "Summer Foraging Bundle",
        "color": "yellow",
        "required": 3,
        "reward": {
          "name": "Hạt giống mùa Hè (Summer Seeds)",
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
            "name": "Thảo quả",
            "nameEn": "Spice Berry",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/spice_berry.png",
            "source": "Hái lượm mùa Hè; Hang Nông Trại (dơi)"
          },
          {
            "name": "Đậu thơm",
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
        "name": "Sản vật mùa Thu",
        "nameEn": "Fall Foraging Bundle",
        "color": "orange",
        "required": 4,
        "reward": {
          "name": "Hạt giống mùa Thu (Fall Seeds)",
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
            "name": "Mận dại",
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
            "name": "Mâm xôi đen",
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
        "name": "Sản vật mùa Đông",
        "nameEn": "Winter Foraging Bundle",
        "color": "teal",
        "required": 4,
        "reward": {
          "name": "Hạt giống mùa Đông (Winter Seeds)",
          "count": 30,
          "icon": "assets/icons/winter_seeds.png"
        },
        "items": [
          {
            "name": "Củ mài",
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
            "name": "Khoai lang Tuyết",
            "nameEn": "Snow Yam",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/snow_yam.png",
            "source": "Cuốc đất / điểm cổ vật mùa Đông"
          },
          {
            "name": "Nghệ tây",
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
        "name": "Vật liệu Xây dựng",
        "nameEn": "Construction Bundle",
        "color": "red",
        "required": 4,
        "reward": {
          "name": "Lò Than (Charcoal Kiln)",
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
            "name": "Gỗ Cứng",
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
        "name": "Sản vật Lạ",
        "nameEn": "Exotic Foraging Bundle",
        "color": "purple",
        "required": 5,
        "reward": {
          "name": "Tặng phẩm Mùa thu (Autumn's Bounty)",
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
            "name": "Quả Xương rồng",
            "nameEn": "Cactus Fruit",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_cactus_fruit.png",
            "source": "Hái lượm ở Sa Mạc; tiệm Oasis"
          },
          {
            "name": "Cà-rốt Hang",
            "nameEn": "Cave Carrot",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/cave_carrot.png",
            "source": "Mỏ: đập thùng hoặc cuốc đất"
          },
          {
            "name": "Nấm Đỏ",
            "nameEn": "Red Mushroom",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/red_mushroom.png",
            "source": "Mỏ; Rừng Bí Mật (Hè/Thu); Hang Nông Trại (nấm)"
          },
          {
            "name": "Nấm Tím",
            "nameEn": "Purple Mushroom",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_purple_mushroom.png",
            "source": "Mỏ; Hang Nông Trại (nấm)"
          },
          {
            "name": "Si-rô nhựa Phong",
            "nameEn": "Maple Syrup",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/ing_maple_syrup.png",
            "source": "Gắn Máy chiết nhựa vào cây Phong"
          },
          {
            "name": "Nhựa Sồi",
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
            "name": "Nấm Bụng dê",
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
        "name": "Nông sản mùa Xuân",
        "nameEn": "Spring Crops Bundle",
        "color": "green",
        "required": 4,
        "reward": {
          "name": "Phân bón Thúc (Speed-Gro)",
          "count": 20,
          "icon": "assets/icons/speed_gro.png"
        },
        "items": [
          {
            "name": "Củ cải vàng",
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
            "name": "Bông cải trắng",
            "nameEn": "Cauliflower",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_cauliflower.png",
            "source": "Trồng mùa Xuân"
          },
          {
            "name": "Khoai tây",
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
        "name": "Nông sản mùa Hè",
        "nameEn": "Summer Crops Bundle",
        "color": "yellow",
        "required": 4,
        "reward": {
          "name": "Vòi tưới Xịn (Quality Sprinkler)",
          "count": 1,
          "icon": "assets/icons/quality_sprinkler.png"
        },
        "items": [
          {
            "name": "Cà chua",
            "nameEn": "Tomato",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_tomato.png",
            "source": "Trồng mùa Hè"
          },
          {
            "name": "Ớt hiểm",
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
            "name": "Dưa",
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
        "name": "Nông sản mùa Thu",
        "nameEn": "Fall Crops Bundle",
        "color": "orange",
        "required": 4,
        "reward": {
          "name": "Nhà nuôi Ong (Bee House)",
          "count": 1,
          "icon": "assets/icons/bee_house.png"
        },
        "items": [
          {
            "name": "Ngô",
            "nameEn": "Corn",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_corn.png",
            "source": "Trồng mùa Hè / Thu"
          },
          {
            "name": "Cà tím",
            "nameEn": "Eggplant",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_eggplant.png",
            "source": "Trồng mùa Thu"
          },
          {
            "name": "Bí ngô",
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
        "name": "Nông sản Chất lượng",
        "nameEn": "Quality Crops Bundle",
        "color": "teal",
        "required": 3,
        "reward": {
          "name": "Vại Bảo quản (Preserves Jar)",
          "count": 1,
          "icon": "assets/icons/preserves_jar.png"
        },
        "items": [
          {
            "name": "Củ cải vàng",
            "nameEn": "Parsnip",
            "count": 5,
            "quality": "gold",
            "icon": "assets/icons/item_parsnip.png",
            "source": "Trồng mùa Xuân (chất lượng vàng)"
          },
          {
            "name": "Dưa",
            "nameEn": "Melon",
            "count": 5,
            "quality": "gold",
            "icon": "assets/icons/item_melon.png",
            "source": "Trồng mùa Hè (chất lượng vàng)"
          },
          {
            "name": "Bí ngô",
            "nameEn": "Pumpkin",
            "count": 5,
            "quality": "gold",
            "icon": "assets/icons/item_pumpkin.png",
            "source": "Trồng mùa Thu (chất lượng vàng)"
          },
          {
            "name": "Ngô",
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
        "name": "Vật nuôi",
        "nameEn": "Animal Bundle",
        "color": "red",
        "required": 5,
        "reward": {
          "name": "Máy ép Phô mai (Cheese Press)",
          "count": 1,
          "icon": "assets/icons/cheese_press.png"
        },
        "items": [
          {
            "name": "Sữa Bò bình to",
            "nameEn": "Large Milk",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_large_milk.png",
            "source": "Bò (quan hệ cao)"
          },
          {
            "name": "Trứng gà to (nâu)",
            "nameEn": "Large Brown Egg",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/large_brown_egg.png",
            "source": "Gà nâu"
          },
          {
            "name": "Trứng gà to (trắng)",
            "nameEn": "Large Egg",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_large_egg.png",
            "source": "Gà trắng"
          },
          {
            "name": "Sữa Dê bình to",
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
            "name": "Trứng Vịt",
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
        "name": "Hàng thủ công",
        "nameEn": "Artisan Bundle",
        "color": "purple",
        "required": 6,
        "reward": {
          "name": "Thùng chứa (Keg)",
          "count": 1,
          "icon": "assets/icons/keg.png"
        },
        "items": [
          {
            "name": "Dầu Nấm cục",
            "nameEn": "Truffle Oil",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/truffle_oil.png",
            "source": "Máy ép dầu + Nấm cục"
          },
          {
            "name": "Vải",
            "nameEn": "Cloth",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/ing_cloth.png",
            "source": "Khung dệt; tái chế báo ướt; Thương nhân Sa Mạc"
          },
          {
            "name": "Phô mai sữa Dê",
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
            "name": "Táo",
            "nameEn": "Apple",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_apple.png",
            "source": "Cây Táo (mùa Thu); Hang Nông Trại (dơi)"
          },
          {
            "name": "Mơ",
            "nameEn": "Apricot",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_apricot.png",
            "source": "Cây Mơ (mùa Xuân)"
          },
          {
            "name": "Cam",
            "nameEn": "Orange",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_orange.png",
            "source": "Cây Cam (mùa Hè)"
          },
          {
            "name": "Đào",
            "nameEn": "Peach",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_peach.png",
            "source": "Cây Đào (mùa Hè)"
          },
          {
            "name": "Lựu",
            "nameEn": "Pomegranate",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_pomegranate.png",
            "source": "Cây Lựu (mùa Thu)"
          },
          {
            "name": "Anh đào",
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
        "name": "Cá Sông",
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
            "name": "Cá Thái dương",
            "nameEn": "Sunfish",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_sunfish.png",
            "source": "Sông, 6h–19h, Xuân/Hè, trời nắng"
          },
          {
            "name": "Cá Trê",
            "nameEn": "Catfish",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_catfish.png",
            "source": "Sông, Xuân/Thu, trời mưa; Rừng Bí Mật"
          },
          {
            "name": "Cá trích Dày mình",
            "nameEn": "Shad",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_shad.png",
            "source": "Sông, 9h–2h, Xuân/Hè/Thu, trời mưa"
          },
          {
            "name": "Cá Hồi hổ",
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
        "name": "Cá Hồ",
        "nameEn": "Lake Fish Bundle",
        "color": "green",
        "required": 4,
        "reward": {
          "name": "Phao xoay có Trang trí (Dressed Spinner)",
          "count": 1,
          "icon": "assets/icons/dressed_spinner.png"
        },
        "items": [
          {
            "name": "Cá Vược miệng rộng",
            "nameEn": "Largemouth Bass",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_largemouth_bass.png",
            "source": "Hồ trên Núi, 6h–19h, mọi mùa"
          },
          {
            "name": "Cá Chép",
            "nameEn": "Carp",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_carp.png",
            "source": "Hồ trên Núi (Xuân/Hè/Thu); Rừng Bí Mật; Cống ngầm"
          },
          {
            "name": "Cá Ngạnh",
            "nameEn": "Bullhead",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_bullhead.png",
            "source": "Hồ trên Núi, mọi lúc, mọi mùa"
          },
          {
            "name": "Cá Tầm",
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
        "name": "Cá Biển",
        "nameEn": "Ocean Fish Bundle",
        "color": "blue",
        "required": 4,
        "reward": {
          "name": "Cọc dịch chuyển: Biển (Warp Totem: Beach)",
          "count": 5,
          "icon": "assets/icons/warp_totem_beach.png"
        },
        "items": [
          {
            "name": "Cá Mòi",
            "nameEn": "Sardine",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_sardine.png",
            "source": "Biển, 6h–19h, Xuân/Thu/Đông"
          },
          {
            "name": "Cá Ngừ",
            "nameEn": "Tuna",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_tuna.png",
            "source": "Biển, 6h–19h, Hè/Đông"
          },
          {
            "name": "Cá Hồng",
            "nameEn": "Red Snapper",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_red_snapper.png",
            "source": "Biển, 6h–19h, Hè/Thu, trời mưa"
          },
          {
            "name": "Cá Rô phi",
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
        "name": "Câu Đêm",
        "nameEn": "Night Fishing Bundle",
        "color": "purple",
        "required": 3,
        "reward": {
          "name": "Nhẫn Phát sáng (Glow Ring)",
          "count": 1,
          "icon": "assets/icons/glow_ring.png"
        },
        "items": [
          {
            "name": "Cá vược Mắt to",
            "nameEn": "Walleye",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_walleye.png",
            "source": "Sông/Hồ/Ao rừng, 12h–2h, mùa Thu, trời mưa"
          },
          {
            "name": "Cá Vền",
            "nameEn": "Bream",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_bream.png",
            "source": "Sông, 18h–2h, mọi mùa"
          },
          {
            "name": "Lươn",
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
        "name": "Đặt Bẫy",
        "nameEn": "Crab Pot Bundle",
        "color": "purple",
        "required": 5,
        "reward": {
          "name": "Bẫy Cua (Crab Pot)",
          "count": 3,
          "icon": "assets/icons/crab_pot.png"
        },
        "items": [
          {
            "name": "Tôm Hùm",
            "nameEn": "Lobster",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_lobster.png",
            "source": "Bẫy cua (biển)"
          },
          {
            "name": "Tôm hùm đất",
            "nameEn": "Crayfish",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_crayfish.png",
            "source": "Bẫy cua (nước ngọt)"
          },
          {
            "name": "Cua",
            "nameEn": "Crab",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_crab.png",
            "source": "Bẫy cua (biển); Cua đá trong Mỏ"
          },
          {
            "name": "Sò",
            "nameEn": "Cockle",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_cockle.png",
            "source": "Bẫy cua (biển); nhặt ở Bãi biển"
          },
          {
            "name": "Trai",
            "nameEn": "Mussel",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_mussel.png",
            "source": "Bẫy cua (biển); nhặt ở Bãi biển"
          },
          {
            "name": "Tôm",
            "nameEn": "Shrimp",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_shrimp.png",
            "source": "Bẫy cua (biển)"
          },
          {
            "name": "Ốc",
            "nameEn": "Snail",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_snail.png",
            "source": "Bẫy cua (nước ngọt)"
          },
          {
            "name": "Ốc mỡ",
            "nameEn": "Periwinkle",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_periwinkle.png",
            "source": "Bẫy cua (nước ngọt)"
          },
          {
            "name": "Hàu",
            "nameEn": "Oyster",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_oyster.png",
            "source": "Bẫy cua (biển); nhặt ở Bãi biển"
          },
          {
            "name": "Nghêu",
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
        "name": "Cá Đặc sản",
        "nameEn": "Specialty Fish Bundle",
        "color": "red",
        "required": 4,
        "reward": {
          "name": "Suất đồ Biển (Dish O' The Sea)",
          "count": 5,
          "icon": "assets/icons/dish_o_the_sea.png"
        },
        "items": [
          {
            "name": "Cá Nóc",
            "nameEn": "Pufferfish",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_pufferfish.png",
            "source": "Biển, 12h–16h, mùa Hè, trời nắng"
          },
          {
            "name": "Cá Ma",
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
            "name": "Cá Leo cây",
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
        "name": "Thợ rèn",
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
            "name": "Thỏi Đồng",
            "nameEn": "Copper Bar",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/ing_copper_bar.png",
            "source": "Nung Quặng Đồng trong Lò nung"
          },
          {
            "name": "Thỏi Sắt",
            "nameEn": "Iron Bar",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/ing_iron_bar.png",
            "source": "Nung Quặng Sắt trong Lò nung"
          },
          {
            "name": "Thỏi Vàng",
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
        "name": "Địa chất",
        "nameEn": "Geologist's Bundle",
        "color": "purple",
        "required": 4,
        "reward": {
          "name": "Hốc tinh Toàn năng (Omni Geode)",
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
            "name": "Tinh thể Đất",
            "nameEn": "Earth Crystal",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/earth_crystal.png",
            "source": "Mỏ tầng 1–39; Geode"
          },
          {
            "name": "Băng giọt lệ",
            "nameEn": "Frozen Tear",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/frozen_tear.png",
            "source": "Mỏ tầng 41–79; Geode Băng"
          },
          {
            "name": "Thạch anh Lửa",
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
        "name": "Thám hiểm",
        "nameEn": "Adventurer's Bundle",
        "color": "purple",
        "required": 2,
        "reward": {
          "name": "Nhẫn Từ trường nhỏ (Small Magnet Ring)",
          "count": 1,
          "icon": "assets/icons/small_magnet_ring.png"
        },
        "items": [
          {
            "name": "Thạch Xà-lam",
            "nameEn": "Slime",
            "count": 99,
            "quality": null,
            "icon": "assets/icons/ing_slime.png",
            "source": "Đánh Slime"
          },
          {
            "name": "Cánh Dơi",
            "nameEn": "Bat Wing",
            "count": 10,
            "quality": null,
            "icon": "assets/icons/ing_bat_wing.png",
            "source": "Dơi trong Mỏ / Hang Sọ"
          },
          {
            "name": "Tinh chất Mặt trời",
            "nameEn": "Solar Essence",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/ing_solar_essence.png",
            "source": "Ma, Squid Kid, Metal Head; mua ở Krobus"
          },
          {
            "name": "Tinh chất Hư không",
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
    "name": "Bảng tin",
    "nameEn": "Bulletin Board",
    "icon": "price_catalogue",
    "reward": "+2 tim với mọi dân làng không thể kết hôn",
    "rewardEn": "+2 hearts with all non-datable villagers",
    "bundles": [
      {
        "id": "chef",
        "name": "Bếp núc",
        "nameEn": "Chef's Bundle",
        "color": "red",
        "required": 6,
        "reward": {
          "name": "Bánh kem Hồng (Pink Cake)",
          "count": 3,
          "icon": "assets/icons/pink_cake.png"
        },
        "items": [
          {
            "name": "Si-rô nhựa Phong",
            "nameEn": "Maple Syrup",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/ing_maple_syrup.png",
            "source": "Gắn Máy chiết nhựa vào cây Phong"
          },
          {
            "name": "Rau Dớn",
            "nameEn": "Fiddlehead Fern",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_fiddlehead_fern.png",
            "source": "Rừng Bí Mật mùa Hè"
          },
          {
            "name": "Nấm Cục",
            "nameEn": "Truffle",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_truffle.png",
            "source": "Heo đào được"
          },
          {
            "name": "Hoa Anh túc",
            "nameEn": "Poppy",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/ing_poppy.png",
            "source": "Trồng mùa Hè"
          },
          {
            "name": "Cơm cuộn Rong biển",
            "nameEn": "Maki Roll",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/maki_roll.png",
            "source": "Nấu ăn (công thức từ TV / Quán rượu)"
          },
          {
            "name": "Trứng chiên",
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
        "name": "Thuốc nhuộm",
        "nameEn": "Dye Bundle",
        "color": "teal",
        "required": 6,
        "reward": {
          "name": "Máy tạo Hạt giống (Seed Maker)",
          "count": 1,
          "icon": "assets/icons/seed_maker.png"
        },
        "items": [
          {
            "name": "Nấm Đỏ",
            "nameEn": "Red Mushroom",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/red_mushroom.png",
            "source": "Mỏ; Rừng Bí Mật (Hè/Thu); Hang Nông Trại (nấm)"
          },
          {
            "name": "Nhím Biển",
            "nameEn": "Sea Urchin",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_sea_urchin.png",
            "source": "Bãi biển (sau khi sửa cầu)"
          },
          {
            "name": "Hoa Hướng dương",
            "nameEn": "Sunflower",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/ing_sunflower.png",
            "source": "Trồng mùa Hè / Thu"
          },
          {
            "name": "Lông Vịt",
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
            "name": "Bắp cải Đỏ",
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
        "name": "Nghiên cứu Thực địa",
        "nameEn": "Field Research Bundle",
        "color": "blue",
        "required": 4,
        "reward": {
          "name": "Máy Tái chế (Recycling Machine)",
          "count": 1,
          "icon": "assets/icons/recycling_machine.png"
        },
        "items": [
          {
            "name": "Nấm Tím",
            "nameEn": "Purple Mushroom",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_purple_mushroom.png",
            "source": "Mỏ; Hang Nông Trại (nấm)"
          },
          {
            "name": "Vỏ ốc Anh vũ",
            "nameEn": "Nautilus Shell",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/nautilus_shell.png",
            "source": "Bãi biển mùa Đông"
          },
          {
            "name": "Cá Mương",
            "nameEn": "Chub",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_chub.png",
            "source": "Hồ trên Núi và sông, mọi mùa"
          },
          {
            "name": "Hốc tinh Băng",
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
        "name": "Thức ăn Chăn nuôi",
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
            "name": "Rơm rạ",
            "nameEn": "Hay",
            "count": 10,
            "quality": null,
            "icon": "assets/icons/hay.png",
            "source": "Mua ở trang trại Marnie; cắt cỏ có Silo"
          },
          {
            "name": "Táo",
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
        "name": "Ma pháp",
        "nameEn": "Enchanter's Bundle",
        "color": "purple",
        "required": 4,
        "reward": {
          "name": "Thỏi Vàng (Gold Bar)",
          "count": 5,
          "icon": "assets/icons/ing_gold_bar.png"
        },
        "items": [
          {
            "name": "Nhựa Sồi",
            "nameEn": "Oak Resin",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/ing_oak_resin.png",
            "source": "Gắn Máy chiết nhựa vào cây Sồi"
          },
          {
            "name": "Rượu",
            "nameEn": "Wine",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/wine.png",
            "source": "Thùng ủ + trái cây"
          },
          {
            "name": "Chân Thỏ",
            "nameEn": "Rabbit's Foot",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_rabbits_foot.png",
            "source": "Thỏ (quan hệ cao); Serpent"
          },
          {
            "name": "Lựu",
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
        "name": "2,500Đ",
        "nameEn": "2,500g Bundle",
        "color": "red",
        "required": 1,
        "reward": {
          "name": "Bánh Sô-cô-la (Chocolate Cake)",
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
        "name": "5,000Đ",
        "nameEn": "5,000g Bundle",
        "color": "orange",
        "required": 1,
        "reward": {
          "name": "Phân bón Chất lượng (Quality Fertilizer)",
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
        "name": "10,000Đ",
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
        "name": "25,000Đ",
        "nameEn": "25,000g Bundle",
        "color": "purple",
        "required": 1,
        "reward": {
          "name": "Máy Sao chép Ngọc (Crystalarium)",
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
        "name": "Vật đáng nhớ",
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
            "name": "Rượu",
            "nameEn": "Wine",
            "count": 1,
            "quality": "silver",
            "icon": "assets/icons/wine.png",
            "source": "Rượu vang bạc trở lên: ủ trong Thùng gỗ sồi (Cask)"
          },
          {
            "name": "Sốt Trứng khủng long",
            "nameEn": "Dinosaur Mayonnaise",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/dinosaur_mayonnaise.png",
            "source": "Máy làm sốt Mayonnaise + Trứng khủng long"
          },
          {
            "name": "Mảnh Ngũ sắc",
            "nameEn": "Prismatic Shard",
            "count": 1,
            "quality": null,
            "icon": "assets/icons/item_prismatic_shard.png",
            "source": "Khai thác Mỏ / Hang Sọ, Geode Đa Năng"
          },
          {
            "name": "Trái cây Cổ đại",
            "nameEn": "Ancient Fruit",
            "count": 5,
            "quality": "gold",
            "icon": "assets/icons/item_ancient_fruit.png",
            "source": "Trồng Hạt Cổ Đại (chất lượng vàng)"
          },
          {
            "name": "Cá hồi Hư không",
            "nameEn": "Void Salmon",
            "count": 1,
            "quality": "gold",
            "icon": "assets/icons/item_void_salmon.png",
            "source": "Câu ở Đầm Phù Thủy (chất lượng vàng)"
          },
          {
            "name": "Trứng cá tầm muối",
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
