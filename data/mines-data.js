// ==========================================================================
// STARDEW VALLEY WIKI - DỮ LIỆU KHU MỎ (THE MINES, SKULL CAVERN, VOLCANO, QUARRY MINE)
// Hầm Mỏ 120 tầng, Hang Đầu Lâu, Hầm Ngục Núi Lửa và Mỏ Mỏ Đá: khu vực theo tầng,
// quặng, đá quý, geode, quái vật & vật phẩm rơi, cá và các mốc tầng (bản 1.6)
// Nguồn: stardewvalleywiki.com (The Mines, Skull Cavern, Volcano Dungeon, Quarry Mine, Mining, Monsters)
// Hình ảnh lưu trữ cục bộ trong assets/icons/ (trường "icon" là khoá tên file, không có đuôi .png)
// ==========================================================================

export const MINE_AREAS = [
  {
    "id": "mines",
    "name": "Hầm Mỏ",
    "nameEn": "The Mines",
    "icon": "area_the_mines",
    "location": "Phía bắc khu Núi (The Mountain), đông bắc Cửa Hàng Mộc của Robin và phía tây Hội Mạo Hiểm Giả (Adventurer's Guild).",
    "unlock": "Bị đá lở chặn từ ngày 1-4 Xuân năm 1; ngày 5 Xuân năm 1 nhận thư báo đường vào đã được dọn và Hầm Mỏ mở cửa.",
    "desc": "Gồm 120 tầng chia làm 3 khu, mỗi khu 40 tầng: đất nâu, băng giá và dung nham. Xuống càng sâu quặng càng quý và quái càng mạnh; cứ mỗi 5 tầng có thang máy để quay lại, các tầng chia hết cho 10 là tầng thưởng không có quái.",
    "floorMax": 120,
    "zones": [
      {
        "id": "mines_earth",
        "name": "Tầng Đất",
        "nameEn": "Earth (Upper Mines)",
        "floors": [
          1,
          39
        ],
        "theme": "earth",
        "desc": "Đất nâu và cỏ dại; tầng 31-39 tối hơn với nền đất xám (chủ đề bóng tối). Quái yếu, hợp với đầu game; xe goòng chứa 6 Than ở tầng 12, 18, 28 và 38, tầng 12 luôn có sẵn thang xuống.",
        "ores": [
          {
            "name": "Quặng Đồng",
            "nameEn": "Copper Ore",
            "icon": "item_copper_ore",
            "note": "Bắt đầu xuất hiện từ tầng 2"
          },
          {
            "name": "Than đá",
            "nameEn": "Coal",
            "icon": "item_coal",
            "note": "Từ đá thường; xe goòng than ở tầng 12, 18, 28, 38"
          }
        ],
        "gems": [
          {
            "name": "Thạch anh Tím",
            "nameEn": "Amethyst",
            "icon": "item_amethyst",
            "note": "Mỏ Thạch Anh Tím ở mọi tầng"
          },
          {
            "name": "Hoàng ngọc",
            "nameEn": "Topaz",
            "icon": "ing_topaz",
            "note": "Mỏ Hoàng Ngọc ở mọi tầng"
          },
          {
            "name": "Thạch anh",
            "nameEn": "Quartz",
            "icon": "ing_quartz",
            "note": "Nhặt trên mặt đất"
          },
          {
            "name": "Tinh thể Đất",
            "nameEn": "Earth Crystal",
            "icon": "earth_crystal",
            "note": "Nhặt trên mặt đất, nhiều nhất ở tầng 1-39"
          }
        ],
        "geodes": [
          {
            "name": "Hốc tinh",
            "nameEn": "Geode",
            "icon": "geode",
            "note": "Từ đá (nhiều nhất tầng 1-39), Duggy rơi 25%; tầng 31-39 rất phổ biến"
          },
          {
            "name": "Geode Omni",
            "nameEn": "Omni Geode",
            "icon": "omni_geode",
            "note": "Từ đá ở tầng 21 trở xuống"
          }
        ],
        "monsters": [
          {
            "name": "Slime Xanh (Green Slime)",
            "nameEn": "Green Slime",
            "icon": "monster_green_slime",
            "floors": "1-29",
            "drops": [
              "Chất Nhờn",
              "Nhựa Cây",
              "Tảo Lục",
              "Thạch anh Tím",
              "Cuộn giấy Người lùn I",
              "Cuộn giấy Người lùn IV"
            ]
          },
          {
            "name": "Duggy (Duggy)",
            "nameEn": "Duggy",
            "icon": "monster_duggy",
            "floors": "1-29",
            "drops": [
              "Bom Anh Đào",
              "Hốc tinh",
              "Tinh thể Đất",
              "Khoai Lang",
              "Que Nhai Cổ",
              "Kim cương",
              "Cuộn giấy Người lùn I",
              "Cuộn giấy Người lùn IV"
            ],
            "note": "Chui dưới đất, chỉ trồi lên khi người chơi đến gần"
          },
          {
            "name": "Bọ (Bug)",
            "nameEn": "Bug",
            "icon": "monster_bug",
            "floors": "1-39",
            "drops": [
              "Thịt Bọ",
              "Tảo Trắng",
              "Hạt Cổ đại",
              "Cuộn giấy Người lùn I",
              "Cuộn giấy Người lùn IV"
            ]
          },
          {
            "name": "Cua Đá (Rock Crab)",
            "nameEn": "Rock Crab",
            "icon": "monster_rock_crab",
            "floors": "1-29",
            "drops": [
              "Bom Anh Đào",
              "Cua",
              "Cuộn giấy Người lùn I",
              "Cuộn giấy Người lùn IV"
            ],
            "note": "Giả dạng hòn đá"
          },
          {
            "name": "Ấu trùng (Grub)",
            "nameEn": "Grub",
            "icon": "monster_grub",
            "floors": "11-29",
            "drops": [
              "Thịt Bọ",
              "Mạ Lúa",
              "Tảo Trắng",
              "Hạt Cổ đại",
              "Cuộn giấy Người lùn I",
              "Cuộn giấy Người lùn IV"
            ]
          },
          {
            "name": "Ruồi (Cave Fly)",
            "nameEn": "Cave Fly",
            "icon": "monster_cave_fly",
            "floors": "11-29",
            "drops": [
              "Thịt Bọ",
              "Tảo Trắng",
              "Hạt Cổ đại",
              "Cuộn giấy Người lùn I",
              "Cuộn giấy Người lùn IV"
            ]
          },
          {
            "name": "Dơi (Bat)",
            "nameEn": "Bat",
            "icon": "monster_bat",
            "floors": "31-39",
            "drops": [
              "Cánh Dơi",
              "Bom",
              "Đĩa Quý hiếm",
              "Cuộn giấy Người lùn I",
              "Cuộn giấy Người lùn IV"
            ]
          },
          {
            "name": "Golem Đá (Stone Golem)",
            "nameEn": "Stone Golem",
            "icon": "monster_stone_golem",
            "floors": "31-39",
            "drops": [
              "Đá",
              "Than đá",
              "Quặng Sắt",
              "Thạch anh",
              "Cuộn giấy Người lùn I",
              "Cuộn giấy Người lùn IV"
            ]
          }
        ],
        "fish": [
          {
            "name": "Cá Đá",
            "nameEn": "Stonefish",
            "icon": "item_stonefish",
            "note": "Hồ nước tầng 20, mọi mùa"
          },
          {
            "name": "Cá Ma",
            "nameEn": "Ghostfish",
            "icon": "item_ghostfish",
            "note": "Hồ nước tầng 20 (và tầng 60)"
          }
        ],
        "other": [
          {
            "name": "Cà-rốt Hang",
            "nameEn": "Cave Carrot",
            "icon": "cave_carrot",
            "note": "Đào ô đất bằng cuốc (5%), thùng gỗ/thùng tròn"
          },
          {
            "name": "Đất sét",
            "nameEn": "Clay",
            "icon": "ing_clay",
            "note": "Đào ô đất bằng cuốc"
          },
          {
            "name": "Cuộn giấy Người lùn I",
            "nameEn": "Dwarf Scroll I",
            "icon": "dwarf_scroll_i",
            "note": "Đào ô đất (mọi tầng)"
          },
          {
            "name": "Cuộn giấy Người lùn II",
            "nameEn": "Dwarf Scroll II",
            "icon": "dwarf_scroll_ii",
            "note": "Đào ô đất tầng 1-39"
          },
          {
            "name": "Mũ sắt Người lùn",
            "nameEn": "Dwarvish Helm",
            "icon": "item_dwarvish_helm",
            "note": "Đào ô đất tầng 1-39"
          },
          {
            "name": "Hạt giống Hỗn hợp",
            "nameEn": "Mixed Seeds",
            "icon": "mixed_seeds",
            "note": "Thùng gỗ/thùng tròn tầng 0-79"
          }
        ]
      },
      {
        "id": "mines_ice",
        "name": "Tầng Băng",
        "nameEn": "Frozen (Middle Mines)",
        "floors": [
          40,
          79
        ],
        "theme": "ice",
        "desc": "Đất băng giá; từ tầng 51 tối hơn và có Ma, tầng 71-79 là lâu đài băng với Bộ Xương. Tầng 52 có túi 6 Than và luôn có sẵn thang xuống; tầng 59 xếp theo hình xoắn ốc.",
        "ores": [
          {
            "name": "Quặng Sắt",
            "nameEn": "Iron Ore",
            "icon": "item_iron_ore",
            "note": "Mỏ sắt ở tầng 40-79, dày đặc ở tầng 71-79"
          },
          {
            "name": "Quặng Đồng",
            "nameEn": "Copper Ore",
            "icon": "item_copper_ore",
            "note": "Mỏ đồng ở mọi tầng"
          },
          {
            "name": "Than đá",
            "nameEn": "Coal",
            "icon": "item_coal",
            "note": "Từ đá; Dust Sprite rơi 50%; túi than ở tầng 52, 58, 68, 78"
          }
        ],
        "gems": [
          {
            "name": "Ngọc xanh biển",
            "nameEn": "Aquamarine",
            "icon": "ing_aquamarine",
            "note": "Bắt đầu xuất hiện từ tầng 40"
          },
          {
            "name": "Ngọc Bích",
            "nameEn": "Jade",
            "icon": "item_jade",
            "note": "Bắt đầu xuất hiện từ tầng 40"
          },
          {
            "name": "Băng giọt lệ",
            "nameEn": "Frozen Tear",
            "icon": "frozen_tear",
            "note": "Nhặt trên mặt đất tầng 40-79"
          },
          {
            "name": "Kim cương",
            "nameEn": "Diamond",
            "icon": "item_diamond",
            "note": "Mỏ kim cương từ tầng 50 (rất hiếm)"
          },
          {
            "name": "Thạch anh Tím",
            "nameEn": "Amethyst",
            "icon": "item_amethyst",
            "note": "Mọi tầng"
          },
          {
            "name": "Hoàng ngọc",
            "nameEn": "Topaz",
            "icon": "ing_topaz",
            "note": "Mọi tầng"
          }
        ],
        "geodes": [
          {
            "name": "Hốc tinh Băng",
            "nameEn": "Frozen Geode",
            "icon": "frozen_geode",
            "note": "Từ đá tầng 41-79"
          },
          {
            "name": "Geode Omni",
            "nameEn": "Omni Geode",
            "icon": "omni_geode",
            "note": "Từ đá"
          }
        ],
        "monsters": [
          {
            "name": "Xà-lam Băng (Frost Jelly)",
            "nameEn": "Frost Jelly",
            "icon": "monster_frost_jelly",
            "floors": "41-79",
            "drops": [
              "Chất Nhờn",
              "Nhựa Cây",
              "Ngọc Bích",
              "Củ Mùa Đông",
              "Cuộn giấy Người lùn II",
              "Cuộn giấy Người lùn III",
              "Cuộn giấy Người lùn IV"
            ]
          },
          {
            "name": "Dơi Băng (Frost Bat)",
            "nameEn": "Frost Bat",
            "icon": "monster_frost_bat",
            "floors": "41-79",
            "drops": [
              "Cánh Dơi",
              "Bom",
              "Đĩa Quý hiếm",
              "Cuộn giấy Người lùn II",
              "Cuộn giấy Người lùn IV"
            ]
          },
          {
            "name": "Tinh linh Bụi (Dust Sprite)",
            "nameEn": "Dust Sprite",
            "icon": "monster_dust_sprite",
            "floors": "41-79",
            "drops": [
              "Than đá",
              "Băng giọt lệ",
              "Quả Pha Lê",
              "Hạt Cà Phê",
              "Thỏi Vàng",
              "Cuộn giấy Người lùn II",
              "Cuộn giấy Người lùn IV"
            ],
            "note": "Thường xuất hiện thành đàn, nguồn Than tốt"
          },
          {
            "name": "Ma (Ghost)",
            "nameEn": "Ghost",
            "icon": "monster_ghost",
            "floors": "51-79",
            "drops": [
              "Tinh Chất Mặt Trời",
              "Quặng Vàng",
              "Cá Ma",
              "Thạch Anh Tinh Luyện",
              "Cuộn giấy Người lùn II",
              "Cuộn giấy Người lùn IV"
            ],
            "note": "Bay xuyên tường"
          },
          {
            "name": "Xương khô (Skeleton)",
            "nameEn": "Skeleton",
            "icon": "monster_skeleton",
            "floors": "71-79",
            "drops": [
              "Mảnh xương vụn",
              "Kiếm Xương",
              "Xương bả Tiền sử"
            ],
            "note": "Ném xương từ xa"
          }
        ],
        "fish": [
          {
            "name": "Cá Băng",
            "nameEn": "Ice Pip",
            "icon": "item_ice_pip",
            "note": "Hồ nước tầng 60, mọi mùa"
          },
          {
            "name": "Cá Ma",
            "nameEn": "Ghostfish",
            "icon": "item_ghostfish",
            "note": "Hồ nước tầng 60 (và tầng 20)"
          }
        ],
        "other": [
          {
            "name": "Cà-rốt Hang",
            "nameEn": "Cave Carrot",
            "icon": "cave_carrot",
            "note": "Đào ô đất, thùng gỗ/thùng tròn"
          },
          {
            "name": "Đất sét",
            "nameEn": "Clay",
            "icon": "ing_clay",
            "note": "Đào ô đất bằng cuốc"
          },
          {
            "name": "Thiết bị của Người lùn",
            "nameEn": "Dwarf Gadget",
            "icon": "dwarf_gadget",
            "note": "Đào ô đất tầng 40-79"
          },
          {
            "name": "Thỏi Vàng",
            "nameEn": "Gold Bar",
            "icon": "ing_gold_bar",
            "note": "Đào ô đất tầng 40-79 (0,1%)"
          }
        ]
      },
      {
        "id": "mines_lava",
        "name": "Tầng Dung Nham",
        "nameEn": "Lava (Lower Mines)",
        "floors": [
          80,
          119
        ],
        "theme": "lava",
        "desc": "Dung nham và đất tím; tầng 111-119 chuyển sang màu đỏ thẫm. Quái mạnh như Shadow Brute, Shadow Shaman và Squid Kid; tầng 92 có sẵn thang, Đá Huyền Bí xuất hiện từ tầng 100. Mỗi tầng (trừ tầng thang máy) có 3,5% cơ hội là Tầng Nấm.",
        "ores": [
          {
            "name": "Quặng Vàng",
            "nameEn": "Gold Ore",
            "icon": "item_gold_ore",
            "note": "Mỏ vàng từ tầng 80"
          },
          {
            "name": "Quặng Đồng",
            "nameEn": "Copper Ore",
            "icon": "item_copper_ore",
            "note": "Mỏ đồng ở mọi tầng"
          },
          {
            "name": "Quặng Iridium",
            "nameEn": "Iridium Ore",
            "icon": "item_iridium_ore",
            "note": "Chỉ từ Đá Huyền Bí (Mystic Stone) tầng 100+: 1-3 quặng"
          },
          {
            "name": "Than đá",
            "nameEn": "Coal",
            "icon": "item_coal",
            "note": "Từ đá; xe goòng than ở tầng 92, 98, 108, 118"
          }
        ],
        "gems": [
          {
            "name": "Hồng ngọc",
            "nameEn": "Ruby",
            "icon": "item_ruby",
            "note": "Bắt đầu xuất hiện từ tầng 80"
          },
          {
            "name": "Ngọc Lục bảo",
            "nameEn": "Emerald",
            "icon": "item_emerald",
            "note": "Bắt đầu xuất hiện từ tầng 80"
          },
          {
            "name": "Thạch anh Lửa",
            "nameEn": "Fire Quartz",
            "icon": "ing_fire_quartz",
            "note": "Nhặt trên mặt đất tầng 80+"
          },
          {
            "name": "Kim cương",
            "nameEn": "Diamond",
            "icon": "item_diamond",
            "note": "Mỏ kim cương, tỉ lệ tăng dần theo tầng"
          },
          {
            "name": "Ngọc xanh biển",
            "nameEn": "Aquamarine",
            "icon": "ing_aquamarine"
          },
          {
            "name": "Ngọc Bích",
            "nameEn": "Jade",
            "icon": "item_jade"
          },
          {
            "name": "Mảnh Ngũ sắc",
            "nameEn": "Prismatic Shard",
            "icon": "item_prismatic_shard",
            "note": "25% từ Đá Huyền Bí tầng 100+"
          }
        ],
        "geodes": [
          {
            "name": "Geode Magma",
            "nameEn": "Magma Geode",
            "icon": "magma_geode",
            "note": "Từ đá tầng 81-119, rất phổ biến ở tầng 111-119"
          },
          {
            "name": "Geode Omni",
            "nameEn": "Omni Geode",
            "icon": "omni_geode",
            "note": "Từ đá, thùng gỗ/thùng tròn tầng 80+"
          }
        ],
        "monsters": [
          {
            "name": "Slime Đỏ (Red Sludge)",
            "nameEn": "Red Sludge",
            "icon": "monster_red_sludge",
            "floors": "81-119",
            "drops": [
              "Chất Nhờn",
              "Nhựa Cây",
              "Than đá",
              "Tảo Trắng",
              "Kim cương",
              "Cuộn giấy Người lùn III",
              "Cuộn giấy Người lùn IV"
            ]
          },
          {
            "name": "Dơi Dung nham (Lava Bat)",
            "nameEn": "Lava Bat",
            "icon": "monster_lava_bat",
            "floors": "81-119",
            "drops": [
              "Cánh Dơi",
              "Bom",
              "Đĩa Quý hiếm",
              "Cuộn giấy Người lùn III",
              "Cuộn giấy Người lùn IV"
            ]
          },
          {
            "name": "Cua Dung Nham (Lava Crab)",
            "nameEn": "Lava Crab",
            "icon": "monster_lava_crab",
            "floors": "81-119",
            "drops": [
              "Bom",
              "Cua",
              "Cuộn giấy Người lùn III",
              "Cuộn giấy Người lùn IV"
            ],
            "note": "Giả dạng hòn đá"
          },
          {
            "name": "Người Bóng Du côn (Shadow Brute)",
            "nameEn": "Shadow Brute",
            "icon": "monster_shadow_brute",
            "floors": "81-119",
            "drops": [
              "Tinh Chất Hư Vô",
              "Than đá",
              "Thỏi Đồng",
              "Bánh Bao Kỳ Lạ",
              "Thỏi Sắt",
              "Thỏi Vàng",
              "Thỏi Iridium",
              "Đĩa Quý hiếm",
              "Mảnh Ngũ sắc",
              "Cuộn giấy Người lùn III",
              "Cuộn giấy Người lùn IV"
            ]
          },
          {
            "name": "Pháp sư Bóng tối (Shadow Shaman)",
            "nameEn": "Shadow Shaman",
            "icon": "monster_shadow_shaman",
            "floors": "81-119",
            "drops": [
              "Tinh Chất Hư Vô",
              "Than đá",
              "Thỏi Đồng",
              "Thỏi Sắt",
              "Thỏi Vàng",
              "Thỏi Iridium",
              "Đĩa Quý hiếm",
              "Mảnh Ngũ sắc",
              "Cuộn giấy Người lùn III",
              "Cuộn giấy Người lùn IV"
            ],
            "note": "Hồi máu cho quái xung quanh và bắn phép"
          },
          {
            "name": "Quái đầu Sắt (Metal Head)",
            "nameEn": "Metal Head",
            "icon": "monster_metal_head",
            "floors": "81-119",
            "drops": [
              "Tinh Chất Mặt Trời",
              "Quặng Đồng",
              "Quặng Sắt",
              "Than đá",
              "Cuộn giấy Người lùn III",
              "Cuộn giấy Người lùn IV"
            ]
          },
          {
            "name": "Quái đầu To (Squid Kid)",
            "nameEn": "Squid Kid",
            "icon": "monster_squid_kid",
            "floors": "91-119",
            "drops": [
              "Tinh Chất Mặt Trời",
              "Mực Mực",
              "Bom",
              "Thỏi Vàng",
              "Siêu Bom",
              "Cuộn giấy Người lùn III",
              "Cuộn giấy Người lùn IV"
            ],
            "note": "Bay và bắn cầu lửa"
          }
        ],
        "fish": [
          {
            "name": "Lươn Dung nham",
            "nameEn": "Lava Eel",
            "icon": "item_lava_eel",
            "note": "Hồ dung nham tầng 100, mọi mùa"
          }
        ],
        "other": [
          {
            "name": "Nấm Tím",
            "nameEn": "Purple Mushroom",
            "icon": "item_purple_mushroom",
            "note": "Mọc nhiều ở Tầng Nấm (tầng 81-119)"
          },
          {
            "name": "Nấm Đỏ",
            "nameEn": "Red Mushroom",
            "icon": "red_mushroom",
            "note": "Mọc nhiều ở Tầng Nấm (tầng 81-119)"
          },
          {
            "name": "Cuộn giấy Người lùn IV",
            "nameEn": "Dwarf Scroll IV",
            "icon": "dwarf_scroll_iv",
            "note": "Đào ô đất tầng 80-120"
          },
          {
            "name": "Mảnh xương vụn",
            "nameEn": "Bone Fragment",
            "icon": "ing_bone_fragment",
            "note": "Thùng gỗ/thùng tròn tầng 80+"
          },
          {
            "name": "Cà-rốt Hang",
            "nameEn": "Cave Carrot",
            "icon": "cave_carrot",
            "note": "Đào ô đất, thùng gỗ/thùng tròn"
          }
        ]
      }
    ],
    "milestones": [
      {
        "floor": 10,
        "type": "chest",
        "label": "Rương kho báu (bản Remix có thể ra: Work Boots, Wooden Blade, Iron Dirk, Wind Spire, Femur)",
        "reward": {
          "name": "Ủng Da",
          "nameEn": "Leather Boots",
          "icon": "leather_boots"
        }
      },
      {
        "floor": 20,
        "type": "chest",
        "label": "Rương kho báu (Remix: Wood Club, Elf Blade, Glow Ring, Magnet Ring)",
        "reward": {
          "name": "Đoản kiếm Thép",
          "nameEn": "Steel Smallsword",
          "icon": "steel_smallsword"
        }
      },
      {
        "floor": 20,
        "type": "fish",
        "label": "Hồ có Cá Đá và Cá Ma",
        "reward": {
          "name": "Cá Đá",
          "nameEn": "Stonefish",
          "icon": "item_stonefish"
        }
      },
      {
        "floor": 30,
        "type": "chest",
        "label": "Tầng thưởng nhưng không có phần thưởng"
      },
      {
        "floor": 40,
        "type": "chest",
        "label": "Rương kho báu (Remix vẫn là Ná Cao Su)",
        "reward": {
          "name": "Súng Cao su",
          "nameEn": "Slingshot",
          "icon": "slingshot"
        }
      },
      {
        "floor": 50,
        "type": "chest",
        "label": "Rương kho báu (Remix: Thermal Boots, Combat Boots, Silver Saber, Pirate's Sword)",
        "reward": {
          "name": "Ủng đi tuyết",
          "nameEn": "Tundra Boots",
          "icon": "tundra_boots"
        }
      },
      {
        "floor": 60,
        "type": "chest",
        "label": "Rương kho báu (Remix: Cutlass, Iron Edge, Burglar's Shank, Wood Mallet)",
        "reward": {
          "name": "Dao găm Pha lê",
          "nameEn": "Crystal Dagger",
          "icon": "crystal_dagger"
        }
      },
      {
        "floor": 60,
        "type": "fish",
        "label": "Hồ có Cá Băng Pip và Cá Ma",
        "reward": {
          "name": "Cá Băng",
          "nameEn": "Ice Pip",
          "icon": "item_ice_pip"
        }
      },
      {
        "floor": 70,
        "type": "chest",
        "label": "Rương kho báu (Remix vẫn là Ná Cao Su Bậc Thầy)",
        "reward": {
          "name": "Súng Cao su Xịn",
          "nameEn": "Master Slingshot",
          "icon": "master_slingshot"
        }
      },
      {
        "floor": 80,
        "type": "chest",
        "label": "Rương kho báu (Remix: Dark Boots, Claymore, Templar's Blade, Kudgel, Shadow Dagger)",
        "reward": {
          "name": "Ủng chịu lửa",
          "nameEn": "Firewalker Boots",
          "icon": "firewalker_boots"
        }
      },
      {
        "floor": 90,
        "type": "chest",
        "label": "Rương kho báu (Remix: Tempered Broadsword, Wicked Kris, Bone Sword, Ossified Blade)",
        "reward": {
          "name": "Kiếm Hắc diện",
          "nameEn": "Obsidian Edge",
          "icon": "obsidian_edge"
        }
      },
      {
        "floor": 100,
        "type": "chest",
        "label": "Rương kho báu: Giọt Sao (+34 năng lượng tối đa; Remix không đổi)",
        "reward": {
          "name": "Sao Sa (Stardrop)",
          "nameEn": "Stardrop",
          "icon": "stardrop"
        }
      },
      {
        "floor": 100,
        "type": "fish",
        "label": "Hồ dung nham có Lươn Dung Nham",
        "reward": {
          "name": "Lươn Dung nham",
          "nameEn": "Lava Eel",
          "icon": "item_lava_eel"
        }
      },
      {
        "floor": 110,
        "type": "chest",
        "label": "Rương kho báu (Remix: Crystal Shoes, Steel Falchion, The Slammer)",
        "reward": {
          "name": "Ủng Vũ trụ",
          "nameEn": "Space Boots",
          "icon": "space_boots"
        }
      },
      {
        "floor": 120,
        "type": "special",
        "label": "Đáy Hầm Mỏ: Chìa Khoá Đầu Lâu mở Hang Đầu Lâu và máy Junimo Kart. Từ đây quái mạnh hơn, mọi quái có thể rơi Kim Cương/Mảnh Lăng Kính; có Đền Thử Thách (Shrine of Challenge) sau nhiệm vụ của Qi.",
        "reward": {
          "name": "Chìa Khoá Đầu Lâu",
          "nameEn": "Skull Key",
          "icon": "skull_key"
        }
      }
    ]
  },
  {
    "id": "skull_cavern",
    "name": "Hang Đầu Lâu",
    "nameEn": "Skull Cavern",
    "icon": "skull_key",
    "location": "Góc tây bắc Sa Mạc Calico (The Desert).",
    "unlock": "Cần Chìa Khoá Đầu Lâu (rương tầng 120 Hầm Mỏ) và đường đến Sa Mạc (sửa Xe Buýt qua gói Hầm Két/Vault hoặc mua của Joja).",
    "desc": "Hang động gần như không đáy, dùng chung bố cục tầng với Hầm Mỏ nhưng không có thang máy: mỗi lần vào phải bắt đầu lại từ tầng 1. 20% số lối xuống từ đá là hố sâu nhảy được 3-15 tầng (mất máu); thời gian trôi chậm hơn 25%. Càng xuống sâu càng nhiều Quặng Iridium.",
    "floorMax": null,
    "zones": [
      {
        "id": "sc_shallow",
        "name": "Tầng 1-25",
        "nameEn": "Floors 1-25",
        "floors": [
          1,
          25
        ],
        "theme": "desert",
        "desc": "Rắn (Serpent) bay khắp nơi, Slime Tím và Slime Lớn; có Tầng Xác Ướp. Từ tầng 7 có thể gặp Tầng Tiền Sử (≈2,2%), từ tầng 10 có thể gặp Phòng Kho Báu (1% + may mắn). Đến tầng 25 hoàn thành nhiệm vụ \"Qi's Challenge\".",
        "ores": [
          {
            "name": "Quặng Đồng",
            "nameEn": "Copper Ore",
            "icon": "item_copper_ore"
          },
          {
            "name": "Quặng Sắt",
            "nameEn": "Iron Ore",
            "icon": "item_iron_ore"
          },
          {
            "name": "Quặng Iridium",
            "nameEn": "Iridium Ore",
            "icon": "item_iridium_ore",
            "note": "Tỉ lệ thấp, tăng dần theo độ sâu; Slime Tím cũng rơi"
          }
        ],
        "gems": [
          {
            "name": "Thạch anh Tím",
            "nameEn": "Amethyst",
            "icon": "item_amethyst"
          },
          {
            "name": "Hoàng ngọc",
            "nameEn": "Topaz",
            "icon": "ing_topaz"
          },
          {
            "name": "Ngọc xanh biển",
            "nameEn": "Aquamarine",
            "icon": "ing_aquamarine"
          },
          {
            "name": "Ngọc Bích",
            "nameEn": "Jade",
            "icon": "item_jade"
          },
          {
            "name": "Hồng ngọc",
            "nameEn": "Ruby",
            "icon": "item_ruby"
          },
          {
            "name": "Ngọc Lục bảo",
            "nameEn": "Emerald",
            "icon": "item_emerald"
          },
          {
            "name": "Kim cương",
            "nameEn": "Diamond",
            "icon": "item_diamond"
          },
          {
            "name": "Mảnh Ngũ sắc",
            "nameEn": "Prismatic Shard",
            "icon": "item_prismatic_shard",
            "note": "3,5% từ Mỏ Iridium, 25% từ Đá Huyền Bí; có trong rương phòng kho báu"
          },
          {
            "name": "Thạch anh Lửa",
            "nameEn": "Fire Quartz",
            "icon": "ing_fire_quartz",
            "note": "Nhặt trên mặt đất"
          },
          {
            "name": "Băng giọt lệ",
            "nameEn": "Frozen Tear",
            "icon": "frozen_tear",
            "note": "Nhặt trên mặt đất"
          },
          {
            "name": "Thạch anh",
            "nameEn": "Quartz",
            "icon": "ing_quartz",
            "note": "Nhặt trên mặt đất"
          }
        ],
        "geodes": [
          {
            "name": "Geode Omni",
            "nameEn": "Omni Geode",
            "icon": "omni_geode",
            "note": "Từ đá, ô đất, thùng; Carbon Ghost rơi 99%"
          },
          {
            "name": "Geode Magma",
            "nameEn": "Magma Geode",
            "icon": "magma_geode",
            "note": "Từ thùng gỗ/thùng tròn"
          }
        ],
        "monsters": [
          {
            "name": "Mãng xà (Serpent)",
            "nameEn": "Serpent",
            "icon": "monster_serpent",
            "floors": "mọi tầng",
            "drops": [
              "Tinh Chất Hư Vô",
              "Bom",
              "Lươn Cay",
              "Chân Thỏ",
              "Hạt Bắp Cải Đỏ",
              "Mảnh Ngũ sắc"
            ],
            "note": "Quái bay mặc định, di chuyển rất nhanh"
          },
          {
            "name": "Slime Tím (Purple Slime)",
            "nameEn": "Purple Slime",
            "icon": "monster_purple_slime",
            "drops": [
              "Chất Nhờn",
              "Nhựa Cây",
              "Quặng Iridium",
              "Thỏi Iridium",
              "Than đá",
              "Tảo Trắng",
              "Kim cương",
              "Hạt Bắp Cải Đỏ"
            ]
          },
          {
            "name": "Xà-lam cỡ Bự (Big Slime)",
            "nameEn": "Big Slime",
            "icon": "monster_big_purple_slime",
            "floors": "mọi tầng",
            "drops": [
              "Chất Nhờn"
            ],
            "note": "Có thể tách thành nhiều slime nhỏ khi bị giết"
          },
          {
            "name": "Xác Ướp (Mummy)",
            "nameEn": "Mummy",
            "icon": "monster_mummy",
            "drops": [
              "Tinh Chất Mặt Trời",
              "Vải",
              "Kẹo Thợ mỏ",
              "Mồi Tò Mò",
              "Hạt Bắp Cải Đỏ",
              "Mảnh Ngũ sắc",
              "Cuộn giấy Người lùn IV"
            ],
            "note": "Xuất hiện ở Tầng Xác Ướp; phải dùng bom (hoặc phù phép Crusader) để tiêu diệt hẳn"
          },
          {
            "name": "Ma Các-bon (Carbon Ghost)",
            "nameEn": "Carbon Ghost",
            "icon": "monster_carbon_ghost",
            "drops": [
              "Geode Omni",
              "Thạch Anh Tinh Luyện"
            ],
            "note": "Có thể xuất hiện ở Tầng Xác Ướp"
          },
          {
            "name": "Dơi Dung nham (Lava Bat)",
            "nameEn": "Lava Bat",
            "icon": "monster_lava_bat",
            "floors": "20, 40",
            "drops": [
              "Cánh Dơi",
              "Bom",
              "Đĩa Quý hiếm",
              "Cuộn giấy Người lùn III",
              "Cuộn giấy Người lùn IV"
            ],
            "note": "Chỉ ở tầng 20 và 40 (nếu đó không phải Tầng Xác Ướp)"
          },
          {
            "name": "Khủng long Ớt (Pepper Rex)",
            "nameEn": "Pepper Rex",
            "icon": "monster_pepper_rex",
            "floors": "Tầng Tiền Sử (7+)",
            "drops": [
              "Trứng Khủng long",
              "Xương sườn Tiền sử",
              "Xương ống Tiền sử",
              "Xương sống Tiền sử"
            ],
            "note": "Phun lửa"
          },
          {
            "name": "Ruồi Đột Biến (Mutant Fly)",
            "nameEn": "Mutant Fly",
            "icon": "monster_mutant_fly",
            "floors": "Tầng Tiền Sử",
            "drops": [
              "Thịt Bọ",
              "Tảo Trắng",
              "Hạt Cổ đại",
              "Cuộn giấy Người lùn I",
              "Cuộn giấy Người lùn IV"
            ]
          },
          {
            "name": "Bọ Giáp (Armored Bug)",
            "nameEn": "Armored Bug",
            "icon": "monster_armored_bug",
            "drops": [
              "Thịt Bọ",
              "Bít Tết Bọ",
              "Tảo Trắng",
              "Hạt Cổ đại",
              "Cuộn giấy Người lùn I",
              "Cuộn giấy Người lùn IV"
            ],
            "note": "Chỉ giết được bằng vũ khí có phù phép Bug Killer"
          },
          {
            "name": "Hoàng Xà (Royal Serpent)",
            "nameEn": "Royal Serpent",
            "icon": "monster_royal_serpent",
            "drops": [
              "Tinh Chất Hư Vô",
              "Bom",
              "Lươn Cay",
              "Chân Thỏ",
              "Hạt Bắp Cải Đỏ",
              "Mảnh Ngũ sắc"
            ],
            "note": "Chỉ khi Hang ở chế độ nguy hiểm (nhiệm vụ \"Skull Cavern Invasion\" hoặc bật tượng ở lối vào)"
          }
        ],
        "fish": [],
        "other": [
          {
            "name": "Trứng Khủng long",
            "nameEn": "Dinosaur Egg",
            "icon": "item_dinosaur_egg",
            "note": "Nhặt ở Tầng Tiền Sử"
          },
          {
            "name": "Rau Dớn",
            "nameEn": "Fiddlehead Fern",
            "icon": "item_fiddlehead_fern",
            "note": "Nhặt ở Tầng Tiền Sử"
          },
          {
            "name": "Hạt Cổ đại",
            "nameEn": "Ancient Seed",
            "icon": "ancient_seed",
            "note": "Cắt cây cỏ ở Tầng Tiền Sử"
          },
          {
            "name": "Nấm Tím",
            "nameEn": "Purple Mushroom",
            "icon": "item_purple_mushroom",
            "note": "Nhặt trên mặt đất"
          },
          {
            "name": "Mảnh xương vụn",
            "nameEn": "Bone Fragment",
            "icon": "ing_bone_fragment",
            "note": "Thùng gỗ/thùng tròn"
          },
          {
            "name": "Than đá",
            "nameEn": "Coal",
            "icon": "item_coal",
            "note": "Xe goòng/túi than ở tầng ngẫu nhiên"
          }
        ]
      },
      {
        "id": "sc_mid",
        "name": "Tầng 26-50",
        "nameEn": "Floors 26-50",
        "floors": [
          26,
          50
        ],
        "theme": "desert",
        "desc": "Các quái ở tầng trên vẫn xuất hiện; từ tầng 26 có thêm Cua Iridium (trừ Tầng Xác Ướp). Quặng Iridium xuất hiện nhiều dần.",
        "ores": [
          {
            "name": "Quặng Đồng",
            "nameEn": "Copper Ore",
            "icon": "item_copper_ore"
          },
          {
            "name": "Quặng Sắt",
            "nameEn": "Iron Ore",
            "icon": "item_iron_ore"
          },
          {
            "name": "Quặng Iridium",
            "nameEn": "Iridium Ore",
            "icon": "item_iridium_ore",
            "note": "Tỉ lệ tăng nhanh từ tầng 10 đến 100; Cua Iridium rơi"
          }
        ],
        "gems": [
          {
            "name": "Thạch anh Tím",
            "nameEn": "Amethyst",
            "icon": "item_amethyst"
          },
          {
            "name": "Hoàng ngọc",
            "nameEn": "Topaz",
            "icon": "ing_topaz"
          },
          {
            "name": "Ngọc xanh biển",
            "nameEn": "Aquamarine",
            "icon": "ing_aquamarine"
          },
          {
            "name": "Ngọc Bích",
            "nameEn": "Jade",
            "icon": "item_jade"
          },
          {
            "name": "Hồng ngọc",
            "nameEn": "Ruby",
            "icon": "item_ruby"
          },
          {
            "name": "Ngọc Lục bảo",
            "nameEn": "Emerald",
            "icon": "item_emerald"
          },
          {
            "name": "Kim cương",
            "nameEn": "Diamond",
            "icon": "item_diamond"
          },
          {
            "name": "Mảnh Ngũ sắc",
            "nameEn": "Prismatic Shard",
            "icon": "item_prismatic_shard",
            "note": "3,5% từ Mỏ Iridium, 25% từ Đá Huyền Bí; có trong rương phòng kho báu"
          },
          {
            "name": "Thạch anh Lửa",
            "nameEn": "Fire Quartz",
            "icon": "ing_fire_quartz",
            "note": "Nhặt trên mặt đất"
          },
          {
            "name": "Băng giọt lệ",
            "nameEn": "Frozen Tear",
            "icon": "frozen_tear",
            "note": "Nhặt trên mặt đất"
          },
          {
            "name": "Thạch anh",
            "nameEn": "Quartz",
            "icon": "ing_quartz",
            "note": "Nhặt trên mặt đất"
          }
        ],
        "geodes": [
          {
            "name": "Geode Omni",
            "nameEn": "Omni Geode",
            "icon": "omni_geode",
            "note": "Từ đá, ô đất, thùng; Carbon Ghost rơi 99%"
          },
          {
            "name": "Geode Magma",
            "nameEn": "Magma Geode",
            "icon": "magma_geode",
            "note": "Từ thùng gỗ/thùng tròn"
          }
        ],
        "monsters": [
          {
            "name": "Cua Iridium (Iridium Crab)",
            "nameEn": "Iridium Crab",
            "icon": "monster_iridium_crab",
            "floors": "26+",
            "drops": [
              "Quặng Iridium",
              "Chả Cua"
            ],
            "note": "Giả dạng hòn đá; không có ở Tầng Xác Ướp"
          },
          {
            "name": "Dơi Dung nham (Lava Bat)",
            "nameEn": "Lava Bat",
            "icon": "monster_lava_bat",
            "floors": "40",
            "drops": [
              "Cánh Dơi",
              "Bom",
              "Đĩa Quý hiếm",
              "Cuộn giấy Người lùn III",
              "Cuộn giấy Người lùn IV"
            ]
          }
        ],
        "fish": [],
        "other": []
      },
      {
        "id": "sc_deep",
        "name": "Tầng 51-99",
        "nameEn": "Floors 51-99",
        "floors": [
          51,
          99
        ],
        "theme": "desert",
        "desc": "Dơi Iridium (máu và sát thương rất cao) xuất hiện từ tầng 51. Mỏ vàng xuất hiện từ tầng 60 (10%) và phổ biến từ tầng 80 (75%); Quặng Iridium dày đặc dần.",
        "ores": [
          {
            "name": "Quặng Vàng",
            "nameEn": "Gold Ore",
            "icon": "item_gold_ore",
            "note": "Mỏ vàng: hiếm ở tầng 60-79, phổ biến từ tầng 80"
          },
          {
            "name": "Quặng Iridium",
            "nameEn": "Iridium Ore",
            "icon": "item_iridium_ore",
            "note": "Tỉ lệ cao, tăng mạnh khi gần tầng 100"
          },
          {
            "name": "Quặng Đồng",
            "nameEn": "Copper Ore",
            "icon": "item_copper_ore"
          },
          {
            "name": "Quặng Sắt",
            "nameEn": "Iron Ore",
            "icon": "item_iron_ore"
          }
        ],
        "gems": [
          {
            "name": "Thạch anh Tím",
            "nameEn": "Amethyst",
            "icon": "item_amethyst"
          },
          {
            "name": "Hoàng ngọc",
            "nameEn": "Topaz",
            "icon": "ing_topaz"
          },
          {
            "name": "Ngọc xanh biển",
            "nameEn": "Aquamarine",
            "icon": "ing_aquamarine"
          },
          {
            "name": "Ngọc Bích",
            "nameEn": "Jade",
            "icon": "item_jade"
          },
          {
            "name": "Hồng ngọc",
            "nameEn": "Ruby",
            "icon": "item_ruby"
          },
          {
            "name": "Ngọc Lục bảo",
            "nameEn": "Emerald",
            "icon": "item_emerald"
          },
          {
            "name": "Kim cương",
            "nameEn": "Diamond",
            "icon": "item_diamond"
          },
          {
            "name": "Mảnh Ngũ sắc",
            "nameEn": "Prismatic Shard",
            "icon": "item_prismatic_shard",
            "note": "3,5% từ Mỏ Iridium, 25% từ Đá Huyền Bí; có trong rương phòng kho báu"
          },
          {
            "name": "Thạch anh Lửa",
            "nameEn": "Fire Quartz",
            "icon": "ing_fire_quartz",
            "note": "Nhặt trên mặt đất"
          },
          {
            "name": "Băng giọt lệ",
            "nameEn": "Frozen Tear",
            "icon": "frozen_tear",
            "note": "Nhặt trên mặt đất"
          },
          {
            "name": "Thạch anh",
            "nameEn": "Quartz",
            "icon": "ing_quartz",
            "note": "Nhặt trên mặt đất"
          }
        ],
        "geodes": [
          {
            "name": "Geode Omni",
            "nameEn": "Omni Geode",
            "icon": "omni_geode",
            "note": "Từ đá, ô đất, thùng; Carbon Ghost rơi 99%"
          },
          {
            "name": "Geode Magma",
            "nameEn": "Magma Geode",
            "icon": "magma_geode",
            "note": "Từ thùng gỗ/thùng tròn"
          }
        ],
        "monsters": [
          {
            "name": "Dơi Iridium (Iridium Bat)",
            "nameEn": "Iridium Bat",
            "icon": "monster_iridium_bat",
            "floors": "51+",
            "drops": [
              "Quặng Iridium",
              "Tinh Chất Mặt Trời",
              "Pin Năng Lượng",
              "Thuốc Bổ Năng Lượng",
              "Thuốc Hồi Sinh Lực",
              "Siêu Bom",
              "Thỏi Iridium"
            ],
            "note": "Cũng xuất hiện ở Tầng Tiền Sử"
          }
        ],
        "fish": [],
        "other": []
      },
      {
        "id": "sc_abyss",
        "name": "Tầng 100 trở xuống",
        "nameEn": "Floor 100+",
        "floors": [
          100,
          null
        ],
        "theme": "desert",
        "desc": "Tầng 100 luôn có rương kho báu; hố sâu phía trên không bao giờ đưa người chơi vượt quá tầng 100. Tầng 200 và 300 có 2 và 3 rương; từ tầng 880 Dơi Iridium chuyển màu đỏ với máu gấp đôi.",
        "ores": [
          {
            "name": "Quặng Iridium",
            "nameEn": "Iridium Ore",
            "icon": "item_iridium_ore",
            "note": "Tỉ lệ cao nhất"
          },
          {
            "name": "Quặng Vàng",
            "nameEn": "Gold Ore",
            "icon": "item_gold_ore"
          },
          {
            "name": "Quặng Đồng",
            "nameEn": "Copper Ore",
            "icon": "item_copper_ore"
          },
          {
            "name": "Quặng Sắt",
            "nameEn": "Iron Ore",
            "icon": "item_iron_ore"
          }
        ],
        "gems": [
          {
            "name": "Thạch anh Tím",
            "nameEn": "Amethyst",
            "icon": "item_amethyst"
          },
          {
            "name": "Hoàng ngọc",
            "nameEn": "Topaz",
            "icon": "ing_topaz"
          },
          {
            "name": "Ngọc xanh biển",
            "nameEn": "Aquamarine",
            "icon": "ing_aquamarine"
          },
          {
            "name": "Ngọc Bích",
            "nameEn": "Jade",
            "icon": "item_jade"
          },
          {
            "name": "Hồng ngọc",
            "nameEn": "Ruby",
            "icon": "item_ruby"
          },
          {
            "name": "Ngọc Lục bảo",
            "nameEn": "Emerald",
            "icon": "item_emerald"
          },
          {
            "name": "Kim cương",
            "nameEn": "Diamond",
            "icon": "item_diamond"
          },
          {
            "name": "Mảnh Ngũ sắc",
            "nameEn": "Prismatic Shard",
            "icon": "item_prismatic_shard",
            "note": "3,5% từ Mỏ Iridium, 25% từ Đá Huyền Bí; có trong rương phòng kho báu"
          },
          {
            "name": "Thạch anh Lửa",
            "nameEn": "Fire Quartz",
            "icon": "ing_fire_quartz",
            "note": "Nhặt trên mặt đất"
          },
          {
            "name": "Băng giọt lệ",
            "nameEn": "Frozen Tear",
            "icon": "frozen_tear",
            "note": "Nhặt trên mặt đất"
          },
          {
            "name": "Thạch anh",
            "nameEn": "Quartz",
            "icon": "ing_quartz",
            "note": "Nhặt trên mặt đất"
          }
        ],
        "geodes": [
          {
            "name": "Geode Omni",
            "nameEn": "Omni Geode",
            "icon": "omni_geode",
            "note": "Từ đá, ô đất, thùng; Carbon Ghost rơi 99%"
          },
          {
            "name": "Geode Magma",
            "nameEn": "Magma Geode",
            "icon": "magma_geode",
            "note": "Từ thùng gỗ/thùng tròn"
          }
        ],
        "monsters": [],
        "fish": [],
        "other": []
      }
    ],
    "milestones": [
      {
        "floor": 10,
        "type": "chest",
        "label": "Từ tầng 10: Phòng Kho Báu ngẫu nhiên (1% + may mắn) với rương chứa đồ hiếm",
        "reward": {
          "name": "Mảnh Ngũ sắc",
          "nameEn": "Prismatic Shard",
          "icon": "item_prismatic_shard"
        }
      },
      {
        "floor": 25,
        "type": "special",
        "label": "Hoàn thành \"Qi's Challenge\": nhận 10.000g qua thư"
      },
      {
        "floor": 100,
        "type": "chest",
        "label": "Rương kho báu luôn xuất hiện (trừ lần xem cảnh bí mật)"
      },
      {
        "floor": 100,
        "type": "special",
        "label": "Nhiệm vụ Qi \"Qi's Hungry Challenge\" (25 Ngọc Qi) và \"Skull Cavern Invasion\" (40 Ngọc Qi) yêu cầu đến tầng 100",
        "reward": {
          "name": "Ngọc Kỳ bí",
          "nameEn": "Qi Gem",
          "icon": "qi_gem"
        }
      },
      {
        "floor": 100,
        "type": "special",
        "label": "Bí mật: sau Mảnh Giấy Bí Mật #10, gặp Mr. Qi và nhận Sữa Rắn Iridium (+25 máu tối đa)"
      },
      {
        "floor": 200,
        "type": "chest",
        "label": "2 rương kho báu đảm bảo"
      },
      {
        "floor": 300,
        "type": "chest",
        "label": "3 rương kho báu đảm bảo"
      }
    ]
  },
  {
    "id": "volcano",
    "name": "Hầm Ngục Núi Lửa",
    "nameEn": "Volcano Dungeon",
    "icon": "item_cinder_shard",
    "location": "Bên trong núi lửa ở phía bắc Đảo Gừng (Ginger Island), vào qua hang lớn ở sườn nam núi.",
    "unlock": "Tới Đảo Gừng bằng thuyền của Willy; theo Leo vào rừng để mở lối lên phía Bắc đảo. Dùng bình tưới tạo cầu qua sông dung nham ở lối vào (sau khi hoàn thành, vẹt xây cầu cố định với 5 Quả Óc Chó Vàng).",
    "desc": "Gồm 10 tầng phải đi lần lượt, không có thang: tìm cửa dẫn xuống tầng kế tiếp, đôi khi phải đạp các nút áp lực để mở cổng. Nội dung mỗi tầng chỉ sinh một lần mỗi ngày; cuối hầm là Lò Rèn (Forge).",
    "floorMax": 10,
    "zones": [
      {
        "id": "volcano_dungeon",
        "name": "Hầm Ngục (tầng 1-9)",
        "nameEn": "Dungeon Floors 1-9",
        "floors": [
          1,
          9
        ],
        "theme": "volcano",
        "desc": "Hang dung nham với các đảo nhỏ phải tưới nước để bắc cầu; có Tầng Nấm đầy Nấm Magma giả. Tầng 5 có cửa hàng Người Lùn và hồ nước, không có quái; tầng 9 luôn có rương.",
        "ores": [
          {
            "name": "Mảnh Nham thạch",
            "nameEn": "Cinder Shard",
            "icon": "item_cinder_shard",
            "note": "Mỏ Mảnh Than Hồng; nhiều quái và rương cũng rơi"
          },
          {
            "name": "Quặng Đồng",
            "nameEn": "Copper Ore",
            "icon": "item_copper_ore"
          },
          {
            "name": "Quặng Sắt",
            "nameEn": "Iron Ore",
            "icon": "item_iron_ore"
          },
          {
            "name": "Quặng Vàng",
            "nameEn": "Gold Ore",
            "icon": "item_gold_ore"
          },
          {
            "name": "Quặng Iridium",
            "nameEn": "Iridium Ore",
            "icon": "item_iridium_ore",
            "note": "Mỏ Iridium và Đá Huyền Bí"
          },
          {
            "name": "Than đá",
            "nameEn": "Coal",
            "icon": "item_coal",
            "note": "Mỏ than"
          }
        ],
        "gems": [
          {
            "name": "Hồng ngọc",
            "nameEn": "Ruby",
            "icon": "item_ruby",
            "note": "Mỏ Hồng Ngọc"
          },
          {
            "name": "Kim cương",
            "nameEn": "Diamond",
            "icon": "item_diamond",
            "note": "Mỏ kim cương"
          },
          {
            "name": "Mảnh Ngũ sắc",
            "nameEn": "Prismatic Shard",
            "icon": "item_prismatic_shard",
            "note": "Đá Huyền Bí (25%), Mỏ Iridium (3,5%)"
          },
          {
            "name": "Ngọc Lục bảo",
            "nameEn": "Emerald",
            "icon": "item_emerald",
            "note": "Mỏ Đá Quý (Gem Node), thùng kim loại, Dwarvish Sentry"
          },
          {
            "name": "Hoàng ngọc",
            "nameEn": "Topaz",
            "icon": "ing_topaz",
            "note": "Mỏ Đá Quý, thùng kim loại"
          },
          {
            "name": "Thạch anh Tím",
            "nameEn": "Amethyst",
            "icon": "item_amethyst",
            "note": "Mỏ Đá Quý, thùng kim loại"
          }
        ],
        "geodes": [
          {
            "name": "Geode Omni",
            "nameEn": "Omni Geode",
            "icon": "omni_geode",
            "note": "Mỏ Geode Omni, thùng kim loại"
          }
        ],
        "monsters": [
          {
            "name": "Máy canh gác của Người Lùn (Dwarvish Sentry)",
            "nameEn": "Dwarvish Sentry",
            "icon": "monster_dwarvish_sentry",
            "drops": [
              "Thạch anh Tím",
              "Ngọc xanh biển",
              "Kim cương",
              "Ngọc Lục bảo",
              "Ngọc Bích",
              "Hồng ngọc",
              "Hoàng ngọc"
            ],
            "note": "Có thể xuất hiện khi đập thùng kim loại"
          },
          {
            "name": "Quái Nấm Dung nham (False Magma Cap)",
            "nameEn": "False Magma Cap",
            "icon": "monster_false_magma_cap",
            "drops": [
              "Nấm Dung nham",
              "Mảnh Nham thạch"
            ],
            "note": "Hành vi giống Cua Đá"
          },
          {
            "name": "Quái đầu Lửa (Hot Head)",
            "nameEn": "Hot Head",
            "icon": "monster_hot_head",
            "drops": [
              "Tinh Chất Mặt Trời",
              "Bom",
              "Than đá",
              "Quặng Đồng",
              "Quặng Sắt",
              "Hạt giống Dứa",
              "Cuộn giấy Người lùn III",
              "Cuộn giấy Người lùn IV"
            ],
            "note": "Khi sắp chết biến thành bom và phát nổ"
          },
          {
            "name": "Quái Dung nham (Lava Lurk)",
            "nameEn": "Lava Lurk",
            "icon": "monster_lava_lurk",
            "drops": [
              "Mảnh xương vụn",
              "Răng Rồng"
            ],
            "note": "Bắn 4 cầu lửa xuyên tường từ hồ dung nham"
          },
          {
            "name": "Tinh Linh Magma (Magma Sprite)",
            "nameEn": "Magma Sprite",
            "icon": "monster_magma_sprite",
            "drops": [
              "Mảnh Nham thạch"
            ]
          },
          {
            "name": "Ma trơi núi lửa (Magma Sparker)",
            "nameEn": "Magma Sparker",
            "icon": "monster_magma_sparker",
            "drops": [
              "Mảnh Nham thạch"
            ],
            "note": "Gây hiệu ứng Bỏng (Burnt)"
          },
          {
            "name": "Duggy Magma (Magma Duggy)",
            "nameEn": "Magma Duggy",
            "icon": "monster_magma_duggy",
            "drops": [
              "Gốc khoai môn",
              "Mảnh Nham thạch",
              "Siêu Bom"
            ]
          },
          {
            "name": "Xà-lam Hổ (Tiger Slime)",
            "nameEn": "Tiger Slime",
            "icon": "monster_tiger_slime",
            "drops": [
              "Chất Nhờn",
              "Nhựa Cây",
              "Gốc khoai môn",
              "Gừng",
              "Ngọc Bích",
              "Hạt giống Dứa",
              "Cây Giống Xoài",
              "Kim cương",
              "Mũ Hổ"
            ]
          }
        ],
        "fish": [],
        "other": [
          {
            "name": "Nấm Dung nham",
            "nameEn": "Magma Cap",
            "icon": "magma_cap",
            "note": "Nhặt khắp hầm, nhiều ở Tầng Nấm"
          },
          {
            "name": "Răng Rồng",
            "nameEn": "Dragon Tooth",
            "icon": "ing_dragon_tooth",
            "note": "Trong bộ xương rồng; Lava Lurk rơi 15%"
          },
          {
            "name": "Hồ đào Vàng",
            "nameEn": "Golden Walnut",
            "icon": "golden_walnut",
            "note": "Tối đa 17 quả: 5 từ đá, 5 từ quái, 5 từ thùng, 1 từ rương thường và 1 từ rương hiếm đầu tiên"
          },
          {
            "name": "Hạt Cổ đại",
            "nameEn": "Ancient Seed",
            "icon": "ancient_seed",
            "note": "Cắt vỏ nấm ở Tầng Nấm (0,5%)"
          },
          {
            "name": "Dừa Vàng",
            "nameEn": "Golden Coconut",
            "icon": "golden_coconut",
            "note": "Rương thường/rương hiếm"
          },
          {
            "name": "Gốc khoai môn",
            "nameEn": "Taro Tuber",
            "icon": "taro_tuber",
            "note": "Thùng kim loại, rương thường"
          },
          {
            "name": "Hạt giống Dứa",
            "nameEn": "Pineapple Seeds",
            "icon": "pineapple_seeds",
            "note": "Thùng kim loại, rương thường"
          }
        ]
      },
      {
        "id": "volcano_caldera",
        "name": "Miệng Núi Lửa (tầng 10)",
        "nameEn": "Volcano Caldera",
        "floors": [
          10,
          10
        ],
        "theme": "volcano",
        "desc": "Tầng cuối có Lò Rèn để dùng Mảnh Than Hồng phù phép vũ khí và trang bị. Cửa góc tây nam dẫn về lối vào, mở lối tắt cho những lần sau.",
        "ores": [],
        "gems": [],
        "geodes": [],
        "monsters": [],
        "fish": [
          {
            "name": "Lươn Dung nham",
            "nameEn": "Lava Eel",
            "icon": "item_lava_eel",
            "note": "Câu trong dung nham ở Miệng Núi Lửa"
          }
        ],
        "other": [
          {
            "name": "Mảnh Ngũ sắc",
            "nameEn": "Prismatic Shard",
            "icon": "item_prismatic_shard",
            "note": "Rương 1 Mảnh Lăng Kính ở lần đầu đến (không làm mới)"
          }
        ]
      }
    ],
    "milestones": [
      {
        "floor": 5,
        "type": "special",
        "label": "Cửa hàng Người Lùn (cần Sách Dịch Tiếng Người Lùn) và hồ nước đổ đầy bình tưới; vẹt mở lối thoát ra ngoài với 5 Quả Óc Chó Vàng",
        "reward": {
          "name": "Mảnh Nham thạch",
          "nameEn": "Cinder Shard",
          "icon": "item_cinder_shard"
        }
      },
      {
        "floor": 9,
        "type": "chest",
        "label": "Luôn có rương, tỉ lệ ra rương hiếm cao hơn các tầng khác"
      },
      {
        "floor": 10,
        "type": "special",
        "label": "Lò Rèn (Forge) và lối tắt về cửa núi lửa"
      },
      {
        "floor": 10,
        "type": "chest",
        "label": "Rương chứa 1 Mảnh Lăng Kính ở lần đầu đến",
        "reward": {
          "name": "Mảnh Ngũ sắc",
          "nameEn": "Prismatic Shard",
          "icon": "item_prismatic_shard"
        }
      },
      {
        "floor": 10,
        "type": "fish",
        "label": "Câu Lươn Dung Nham trong dung nham",
        "reward": {
          "name": "Lươn Dung nham",
          "nameEn": "Lava Eel",
          "icon": "item_lava_eel"
        }
      }
    ]
  },
  {
    "id": "quarry_mine",
    "name": "Mỏ Mỏ Đá",
    "nameEn": "Quarry Mine",
    "icon": "item_golden_scythe",
    "location": "Cửa hang ở rìa trái Mỏ Đá (Quarry), phía bắc cây cầu, khu Núi.",
    "unlock": "Mở Mỏ Đá bằng cách hoàn thành các gói Phòng Thủ Công (Crafts Room) ở Trung Tâm Cộng Đồng hoặc mua \"Bridge\" của Joja (25.000g).",
    "desc": "Một tầng hầm dài duy nhất, cuối hầm có tượng Thần Chết giữ Liềm Vàng. Hầm làm mới vào cuối ngày chứ không phải khi rời đi; sau khi vào đây, Hầm Mỏ có thể sinh \"tầng ngục tối\" giống hầm này.",
    "floorMax": 1,
    "zones": [
      {
        "id": "quarry_mine_floor",
        "name": "Đường Hầm Mỏ Đá",
        "nameEn": "Quarry Mine",
        "floors": [
          1,
          1
        ],
        "theme": "quarry",
        "desc": "Đường chính có đá xám/nâu cùng mỏ Đồng và Sắt; lối phụ bị chặn bởi tảng đá lớn chứa Bộ Xương, Pháp Sư Xương và mỏ Than.",
        "ores": [
          {
            "name": "Quặng Đồng",
            "nameEn": "Copper Ore",
            "icon": "item_copper_ore",
            "note": "Mỏ đồng trên đường chính"
          },
          {
            "name": "Quặng Sắt",
            "nameEn": "Iron Ore",
            "icon": "item_iron_ore",
            "note": "Mỏ sắt trên đường chính"
          },
          {
            "name": "Than đá",
            "nameEn": "Coal",
            "icon": "item_coal",
            "note": "Mỏ than ở lối phụ"
          }
        ],
        "gems": [
          {
            "name": "Thạch anh",
            "nameEn": "Quartz",
            "icon": "ing_quartz",
            "note": "Nhặt trên mặt đất"
          }
        ],
        "geodes": [],
        "monsters": [
          {
            "name": "Đầu Lâu Ma Ám (Haunted Skull)",
            "nameEn": "Haunted Skull",
            "icon": "monster_haunted_skull",
            "drops": [
              "Tinh Chất Mặt Trời",
              "Tinh Chất Hư Vô",
              "Siêu Bom",
              "Tinh thể Đất",
              "Nhựa Sồi",
              "Đầu lâu Tiền sử",
              "Xương Bàn tay",
              "Kẹo Đá Phép Thuật"
            ]
          },
          {
            "name": "Slime Đồng (Copper Slime)",
            "nameEn": "Copper Slime",
            "icon": "monster_copper_slime",
            "drops": [
              "Chất Nhờn",
              "Nhựa Cây",
              "Quặng Đồng",
              "Tảo Trắng",
              "Kim cương",
              "Cuộn giấy Người lùn III",
              "Cuộn giấy Người lùn IV"
            ]
          },
          {
            "name": "Slime Sắt (Iron Slime)",
            "nameEn": "Iron Slime",
            "icon": "monster_iron_slime",
            "drops": [
              "Chất Nhờn",
              "Nhựa Cây",
              "Quặng Sắt",
              "Tảo Trắng",
              "Kim cương",
              "Cuộn giấy Người lùn III",
              "Cuộn giấy Người lùn IV"
            ]
          },
          {
            "name": "Xương khô (Skeleton)",
            "nameEn": "Skeleton",
            "icon": "monster_skeleton",
            "drops": [
              "Mảnh xương vụn",
              "Kiếm Xương",
              "Xương bả Tiền sử"
            ],
            "note": "Ở lối phụ (có cả biến thể nguy hiểm)"
          },
          {
            "name": "Phù thủy Xương (Skeleton Mage)",
            "nameEn": "Skeleton Mage",
            "icon": "monster_skeleton_mage",
            "drops": [
              "Mảnh xương vụn",
              "Kiếm Xương",
              "Xương bả Tiền sử"
            ],
            "note": "Ở lối phụ"
          }
        ],
        "fish": [],
        "other": []
      }
    ],
    "milestones": [
      {
        "floor": 1,
        "type": "special",
        "label": "Tượng Thần Chết cuối hầm trao Liềm Vàng (lần đầu); chạm lại để quay về cửa hầm",
        "reward": {
          "name": "Liềm Hoàng kim",
          "nameEn": "Golden Scythe",
          "icon": "item_golden_scythe"
        }
      }
    ]
  }
];
