// Cẩm nang Dữ liệu Toàn diện: Công thức Nấu Ăn (Cooking), Chế Tạo (Crafting),
// Luyện Kim (Smelting), Mồi Câu (Bait), Nâng Cấp Nhà (Farmhouse), Chuồng Trại (Buildings),
// Công Trình Ma Thuật (Magical), Nâng Cấp Dụng Cụ (Tools), và Lò Rèn Vũ Khí (Volcano Forge) Bản 1.6+
// Tất cả hình ảnh và icon nguyên liệu đã được tải về lưu trữ 100% trong thư mục assets/icons/.

export const RECIPES_DATA = [
  {
    "id": "fried_egg",
    "name": "Trứng Chiên",
    "nameEn": "Fried Egg",
    "category": "cooking",
    "subCategory": "Món khai vị & Bữa sáng",
    "icon": "🍳",
    "energy": 50,
    "health": 22,
    "sellPrice": 35,
    "source": "Nâng cấp Nhà chính lần 1 (Có sẵn trong bếp)",
    "ingredients": [
      {
        "name": "Trứng gà",
        "nameEn": "Egg",
        "count": 1,
        "iconUrl": "assets/icons/ing_egg.png"
      }
    ],
    "buffs": [],
    "desc": "Mặt trời rực rỡ trên đĩa ăn sáng của bạn. Món ăn cơ bản nhất nhưng phục hồi năng lượng rất tốt giai đoạn đầu game.",
    "tips": "Dùng để nấu Bữa sáng hoàn hảo (Complete Breakfast).",
    "wikiFile": "Fried_Egg.png",
    "imageUrl": "assets/icons/fried_egg.png",
    "localImageUrl": "assets/icons/fried_egg.png"
  },
  {
    "id": "omelet",
    "name": "Trứng Cuộn Phô Mai",
    "nameEn": "Omelet",
    "category": "cooking",
    "subCategory": "Món khai vị & Bữa sáng",
    "icon": "🥚",
    "energy": 100,
    "health": 45,
    "sellPrice": 125,
    "source": "Kênh The Queen of Sauce (Ngày 28 Mùa Xuân, Năm 1) hoặc Mua tại Saloon (100g)",
    "ingredients": [
      {
        "name": "Trứng gà",
        "nameEn": "Egg",
        "count": 1,
        "iconUrl": "assets/icons/ing_egg.png"
      },
      {
        "name": "Sữa tươi",
        "nameEn": "Milk",
        "count": 1,
        "iconUrl": "assets/icons/ing_milk.png"
      }
    ],
    "buffs": [],
    "desc": "Mềm mịn, béo ngậy và thơm lừng vị sữa tươi.",
    "tips": "Nguyên liệu bắt buộc để nấu Bữa Trưa Nông Dân (Farmer's Lunch).",
    "wikiFile": "Omelet.png",
    "imageUrl": "assets/icons/omelet.png",
    "localImageUrl": "assets/icons/omelet.png"
  },
  {
    "id": "salad",
    "name": "Salad Rau Vườn",
    "nameEn": "Salad",
    "category": "cooking",
    "subCategory": "Món chay bổ dưỡng",
    "icon": "🥗",
    "energy": 113,
    "health": 50,
    "sellPrice": 110,
    "source": "Thư từ Emily khi đạt 3 Tim tình bạn",
    "ingredients": [
      {
        "name": "Tỏi tây",
        "nameEn": "Leek",
        "count": 1,
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Bồ công anh",
        "nameEn": "Dandelion",
        "count": 1,
        "iconUrl": "assets/icons/item_dandelion.png"
      },
      {
        "name": "Dấm",
        "nameEn": "Vinegar",
        "count": 1,
        "iconUrl": "assets/icons/ing_vinegar.png"
      }
    ],
    "buffs": [],
    "desc": "Món salad thanh mát, giòn rụm từ những loại rau củ dại hái trong rừng mùa xuân.",
    "tips": "Món quà Yêu Thích Cực Độ (Loved Gift) của Leah!",
    "wikiFile": "Salad.png",
    "imageUrl": "assets/icons/salad.png",
    "localImageUrl": "assets/icons/salad.png"
  },
  {
    "id": "cheese_cauliflower",
    "name": "Súp Lơ Đút Lò Phô Mai",
    "nameEn": "Cheese Cauliflower",
    "category": "cooking",
    "subCategory": "Món nướng phô mai",
    "icon": "🧀",
    "energy": 138,
    "health": 62,
    "sellPrice": 300,
    "source": "Thư từ Pam khi đạt 3 Tim tình bạn",
    "ingredients": [
      {
        "name": "Súp lơ trắng",
        "nameEn": "Cauliflower",
        "count": 1,
        "iconUrl": "assets/icons/item_cauliflower.png"
      },
      {
        "name": "Phô mai",
        "nameEn": "Cheese",
        "count": 1,
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "buffs": [],
    "desc": "Súp lơ ngập trong lớp phô mai béo ngậy được nướng cháy xém cạnh trên lửa lớn.",
    "tips": "Cần thiết cho gói Trao đổi Nhà Cộng Đồng (Community Center - Chef's Bundle).",
    "wikiFile": "Cheese_Cauliflower.png",
    "imageUrl": "assets/icons/cheese_cauliflower.png",
    "localImageUrl": "assets/icons/cheese_cauliflower.png"
  },
  {
    "id": "baked_fish",
    "name": "Cá Nướng Thảo Mộc",
    "nameEn": "Baked Fish",
    "category": "cooking",
    "subCategory": "Hải sản nướng",
    "icon": "🐟",
    "energy": 75,
    "health": 33,
    "sellPrice": 100,
    "source": "Kênh The Queen of Sauce (Ngày 7 Mùa Hè, Năm 1)",
    "ingredients": [
      {
        "name": "Cá Thái Dương",
        "nameEn": "Sunfish",
        "count": 1,
        "iconUrl": "assets/icons/ing_sunfish.png"
      },
      {
        "name": "Cá Vền",
        "nameEn": "Bream",
        "count": 1,
        "iconUrl": "assets/icons/ing_bream.png"
      },
      {
        "name": "Bột mì",
        "nameEn": "Wheat Flour",
        "count": 1,
        "iconUrl": "assets/icons/ing_wheat_flour.png"
      }
    ],
    "buffs": [],
    "desc": "Cá tươi nướng giòn rụm trên thớt lá thơm gia vị mùa hè.",
    "tips": "Dễ nấu đầu năm 1 khi bạn câu được nhiều cá sông nhỏ.",
    "wikiFile": "Baked_Fish.png",
    "imageUrl": "assets/icons/baked_fish.png",
    "localImageUrl": "assets/icons/baked_fish.png"
  },
  {
    "id": "parsnip_soup",
    "name": "Súp Củ Cải Vàng",
    "nameEn": "Parsnip Soup",
    "category": "cooking",
    "subCategory": "Súp & Canh nóng",
    "icon": "🥣",
    "energy": 138,
    "health": 62,
    "sellPrice": 120,
    "source": "Thư từ Caroline khi đạt 3 Tim tình bạn",
    "ingredients": [
      {
        "name": "Củ cải vàng",
        "nameEn": "Parsnip",
        "count": 1,
        "iconUrl": "assets/icons/item_parsnip.png"
      },
      {
        "name": "Sữa tươi",
        "nameEn": "Milk",
        "count": 1,
        "iconUrl": "assets/icons/ing_milk.png"
      },
      {
        "name": "Dấm",
        "nameEn": "Vinegar",
        "count": 1,
        "iconUrl": "assets/icons/ing_vinegar.png"
      }
    ],
    "buffs": [],
    "desc": "Nước súp sánh mịn, ngọt đậm đà hương củ cải mùa xuân mới nhổ.",
    "tips": "Món quà tuyệt vời cho Pam.",
    "wikiFile": "Parsnip_Soup.png",
    "imageUrl": "assets/icons/parsnip_soup.png",
    "localImageUrl": "assets/icons/parsnip_soup.png"
  },
  {
    "id": "vegetable_medley",
    "name": "Món Rau Xào Thập Cẩm",
    "nameEn": "Vegetable Medley",
    "category": "cooking",
    "subCategory": "Món xào thanh đạm",
    "icon": "🥦",
    "energy": 165,
    "health": 74,
    "sellPrice": 120,
    "source": "Thư từ Caroline khi đạt 7 Tim tình bạn",
    "ingredients": [
      {
        "name": "Cà chua",
        "nameEn": "Tomato",
        "count": 1,
        "iconUrl": "assets/icons/item_tomato.png"
      },
      {
        "name": "Củ dền",
        "nameEn": "Beet",
        "count": 1,
        "iconUrl": "assets/icons/ing_beet.png"
      }
    ],
    "buffs": [],
    "desc": "Sự kết hợp hoàn hảo giữa vị ngọt bùi của củ dền và vị chua thanh của cà chua.",
    "tips": "Tất cả dân làng đều thích hoặc trung lập.",
    "wikiFile": "Vegetable_Medley.png",
    "imageUrl": "assets/icons/vegetable_medley.png",
    "localImageUrl": "assets/icons/vegetable_medley.png"
  },
  {
    "id": "complete_breakfast",
    "name": "Bữa Sáng Hoàn Hảo",
    "nameEn": "Complete Breakfast",
    "category": "cooking",
    "subCategory": "Bữa sáng cao cấp",
    "icon": "🥞",
    "energy": 200,
    "health": 90,
    "sellPrice": 465,
    "source": "Kênh The Queen of Sauce (Ngày 21 Mùa Xuân, Năm 2)",
    "ingredients": [
      {
        "name": "Trứng chiên",
        "nameEn": "Fried Egg",
        "count": 1,
        "iconUrl": "assets/icons/fried_egg.png"
      },
      {
        "name": "Sữa tươi",
        "nameEn": "Milk",
        "count": 1,
        "iconUrl": "assets/icons/ing_milk.png"
      },
      {
        "name": "Khoai tây chiên giòn",
        "nameEn": "Hashbrowns",
        "count": 1,
        "iconUrl": "assets/icons/hashbrowns.png"
      },
      {
        "name": "Bánh kếp",
        "nameEn": "Pancakes",
        "count": 1,
        "iconUrl": "assets/icons/pancakes.png"
      }
    ],
    "buffs": [
      {
        "stat": "Canh tác (Farming)",
        "value": "+2",
        "duration": "7 phút"
      },
      {
        "stat": "Năng lượng tối đa",
        "value": "+50",
        "duration": "7 phút"
      }
    ],
    "desc": "Bữa điểm tâm vua chúa dành cho ngày làm nông bận rộn! Tăng mạnh kỹ năng làm ruộng và thanh thể lực.",
    "tips": "Món quà Yêu Thích Cực Độ của Alex. Cực kỳ hữu ích trong mùa thu hoạch lớn.",
    "wikiFile": "Complete_Breakfast.png",
    "imageUrl": "assets/icons/complete_breakfast.png",
    "localImageUrl": "assets/icons/complete_breakfast.png"
  },
  {
    "id": "fried_squid",
    "name": "Mực Ống Chiên Giòn",
    "nameEn": "Fried Squid",
    "category": "cooking",
    "subCategory": "Hải sản chiên",
    "icon": "🦑",
    "energy": 80,
    "health": 36,
    "sellPrice": 400,
    "source": "Thư từ Willy khi đạt 3 Tim tình bạn",
    "ingredients": [
      {
        "name": "Mực ống",
        "nameEn": "Squid",
        "count": 1,
        "iconUrl": "assets/icons/item_squid.png"
      },
      {
        "name": "Bột mì",
        "nameEn": "Wheat Flour",
        "count": 1,
        "iconUrl": "assets/icons/ing_wheat_flour.png"
      },
      {
        "name": "Dầu ăn",
        "nameEn": "Oil",
        "count": 1,
        "iconUrl": "assets/icons/ing_oil.png"
      }
    ],
    "buffs": [],
    "desc": "Khoanh mực biển chiên xù vàng ruộm, dai giòn sần sật.",
    "tips": "Món quà yêu thích của Willy.",
    "wikiFile": "Fried_Squid.png",
    "imageUrl": "assets/icons/fried_squid.png",
    "localImageUrl": "assets/icons/fried_squid.png"
  },
  {
    "id": "strange_bun",
    "name": "Bánh Bao Kỳ Dị",
    "nameEn": "Strange Bun",
    "category": "cooking",
    "subCategory": "Món ăn bí ẩn",
    "icon": "🥟",
    "energy": 100,
    "health": 45,
    "sellPrice": 225,
    "source": "Thư từ Shane khi đạt 7 Tim tình bạn",
    "ingredients": [
      {
        "name": "Bột mì",
        "nameEn": "Wheat Flour",
        "count": 1,
        "iconUrl": "assets/icons/ing_wheat_flour.png"
      },
      {
        "name": "Sốt Mayonnaise hư vô",
        "nameEn": "Void Mayonnaise",
        "count": 1,
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Ốc Periwinkle",
        "nameEn": "Periwinkle",
        "count": 1,
        "iconUrl": "assets/icons/ing_periwinkle.png"
      }
    ],
    "buffs": [],
    "desc": "Một chiếc bánh bao tỏa ra hơi lạnh hắc ám và tiếng thì thầm ma quái.",
    "tips": "Đặt bánh này vào rương đồ chơi trong phòng ngủ Vincent để mở khóa Tượng Bí Mật ??Foroguemon!!",
    "wikiFile": "Strange_Bun.png",
    "imageUrl": "assets/icons/strange_bun.png",
    "localImageUrl": "assets/icons/strange_bun.png"
  },
  {
    "id": "lucky_lunch",
    "name": "Bữa Trưa May Mắn",
    "nameEn": "Lucky Lunch",
    "category": "cooking",
    "subCategory": "Món ăn Thần Thánh",
    "icon": "🍀",
    "energy": 100,
    "health": 45,
    "sellPrice": 250,
    "source": "Kênh The Queen of Sauce (Ngày 28 Mùa Xuân, Năm 2)",
    "ingredients": [
      {
        "name": "Hải sâm",
        "nameEn": "Sea Cucumber",
        "count": 1,
        "iconUrl": "assets/icons/ing_sea_cucumber.png"
      },
      {
        "name": "Bánh tráng ngô Tortilla",
        "nameEn": "Tortilla",
        "count": 1,
        "iconUrl": "assets/icons/tortilla.png"
      },
      {
        "name": "Hoa Blue Jazz",
        "nameEn": "Blue Jazz",
        "count": 1,
        "iconUrl": "assets/icons/ing_blue_jazz.png"
      }
    ],
    "buffs": [
      {
        "stat": "May mắn (Luck)",
        "value": "+3",
        "duration": "11 phút 11 giây"
      }
    ],
    "desc": "Món ăn đem lại vận đỏ tột đỉnh trong Stardew Valley. Tăng tỉ lệ tìm thấy thang, rương kho báu và quặng Iridium!",
    "tips": "Món ăn hàng đầu khi đi thám hiểm Skull Cavern hoặc quay thưởng tại Sòng Bạc Calico.",
    "wikiFile": "Lucky_Lunch.png",
    "imageUrl": "assets/icons/lucky_lunch.png",
    "localImageUrl": "assets/icons/lucky_lunch.png"
  },
  {
    "id": "fried_mushroom",
    "name": "Nấm Rừng Xào Tỏi",
    "nameEn": "Fried Mushroom",
    "category": "cooking",
    "subCategory": "Món xào tăng công",
    "icon": "🍄",
    "energy": 135,
    "health": 60,
    "sellPrice": 200,
    "source": "Thư từ Demetrius khi đạt 3 Tim tình bạn",
    "ingredients": [
      {
        "name": "Nấm thường",
        "nameEn": "Common Mushroom",
        "count": 1,
        "iconUrl": "assets/icons/ing_common_mushroom.png"
      },
      {
        "name": "Nấm Morel",
        "nameEn": "Morel",
        "count": 1,
        "iconUrl": "assets/icons/item_morel.png"
      },
      {
        "name": "Dầu ăn",
        "nameEn": "Oil",
        "count": 1,
        "iconUrl": "assets/icons/ing_oil.png"
      }
    ],
    "buffs": [
      {
        "stat": "Sức tấn công (Attack)",
        "value": "+2",
        "duration": "7 phút"
      }
    ],
    "desc": "Nấm rừng tươi xào lửa lớn với dầu thơm lừng, giúp cơ bắp bạn sung mãn hơn trong các trận chiến hang sâu.",
    "tips": "Món quà yêu thích của George.",
    "wikiFile": "Fried_Mushroom.png",
    "imageUrl": "assets/icons/fried_mushroom.png",
    "localImageUrl": "assets/icons/fried_mushroom.png"
  },
  {
    "id": "pizza",
    "name": "Bánh Pizza Ý",
    "nameEn": "Pizza",
    "category": "cooking",
    "subCategory": "Món nướng yêu thích",
    "icon": "🍕",
    "energy": 150,
    "health": 67,
    "sellPrice": 300,
    "source": "Kênh The Queen of Sauce (Ngày 7 Mùa Xuân, Năm 2) hoặc Mua tại Saloon (600g)",
    "ingredients": [
      {
        "name": "Bột mì",
        "nameEn": "Wheat Flour",
        "count": 1,
        "iconUrl": "assets/icons/ing_wheat_flour.png"
      },
      {
        "name": "Cà chua",
        "nameEn": "Tomato",
        "count": 1,
        "iconUrl": "assets/icons/item_tomato.png"
      },
      {
        "name": "Phô mai",
        "nameEn": "Cheese",
        "count": 1,
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "buffs": [],
    "desc": "Bánh pizza đế giòn, sốt cà chua tươi và ngập tràn phô mai kéo sợi thơm ngậy.",
    "tips": "Món quà Yêu Thích Cực Độ của Sam và Shane! Tặng món này giúp tăng tim Shane cực nhanh.",
    "wikiFile": "Pizza.png",
    "imageUrl": "assets/icons/pizza.png",
    "localImageUrl": "assets/icons/pizza.png"
  },
  {
    "id": "bean_hotpot",
    "name": "Lẩu Đậu Que Hầm",
    "nameEn": "Bean Hotpot",
    "category": "cooking",
    "subCategory": "Súp & Lẩu",
    "icon": "🍲",
    "energy": 125,
    "health": 56,
    "sellPrice": 100,
    "source": "Thư từ Clint khi đạt 7 Tim tình bạn",
    "ingredients": [
      {
        "name": "Đậu cô ve xanh",
        "nameEn": "Green Bean",
        "count": 2,
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "buffs": [
      {
        "stat": "Năng lượng tối đa",
        "value": "+30",
        "duration": "7 phút"
      },
      {
        "stat": "Nam châm hút đồ (Magnetism)",
        "value": "+32",
        "duration": "7 phút"
      }
    ],
    "desc": "Nồi hầm đậu ấm cúng giúp phục hồi thể trạng và hút các vật phẩm rơi xung quanh dễ dàng hơn.",
    "tips": "Rất rẻ tiền vì chỉ tốn 2 trái đậu que mùa xuân.",
    "wikiFile": "Bean_Hotpot.png",
    "imageUrl": "assets/icons/bean_hotpot.png",
    "localImageUrl": "assets/icons/bean_hotpot.png"
  },
  {
    "id": "glazed_yams",
    "name": "Khoai Lang Ngào Đường",
    "nameEn": "Glazed Yams",
    "category": "cooking",
    "subCategory": "Tráng miệng ngọt",
    "icon": "🍠",
    "energy": 200,
    "health": 90,
    "sellPrice": 200,
    "source": "Kênh The Queen of Sauce (Ngày 21 Mùa Thu, Năm 1)",
    "ingredients": [
      {
        "name": "Khoai lang",
        "nameEn": "Yam",
        "count": 1,
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Đường tinh luyện",
        "nameEn": "Sugar",
        "count": 1,
        "iconUrl": "assets/icons/ing_sugar.png"
      }
    ],
    "buffs": [],
    "desc": "Khoai lang bùi ngọt phủ lớp caramen bóng loáng tan chảy trong miệng.",
    "tips": "Món quà yêu thích tuyệt đối của Pam!",
    "wikiFile": "Glazed_Yams.png",
    "imageUrl": "assets/icons/glazed_yams.png",
    "localImageUrl": "assets/icons/glazed_yams.png"
  },
  {
    "id": "carp_surprise",
    "name": "Bất Ngờ Cá Chép",
    "nameEn": "Carp Surprise",
    "category": "cooking",
    "subCategory": "Món cá độc đáo",
    "icon": "🐟",
    "energy": 90,
    "health": 40,
    "sellPrice": 150,
    "source": "Kênh The Queen of Sauce (Ngày 7 Mùa Hè, Năm 2)",
    "ingredients": [
      {
        "name": "Cá chép",
        "nameEn": "Carp",
        "count": 4,
        "iconUrl": "assets/icons/item_carp.png"
      }
    ],
    "buffs": [],
    "desc": "Vị ngọt thanh đạm từ 4 chú cá chép tươi ngon đánh bắt từ hồ trên núi.",
    "tips": "Giải pháp tuyệt vời để dọn bớt kho cá chép chất đống.",
    "wikiFile": "Carp_Surprise.png",
    "imageUrl": "assets/icons/carp_surprise.png",
    "localImageUrl": "assets/icons/carp_surprise.png"
  },
  {
    "id": "hashbrowns",
    "name": "Khoai Tây Bào Chiên Giòn",
    "nameEn": "Hashbrowns",
    "category": "cooking",
    "subCategory": "Món ăn sáng",
    "icon": "🥔",
    "energy": 90,
    "health": 40,
    "sellPrice": 120,
    "source": "Kênh The Queen of Sauce (Ngày 14 Mùa Xuân, Năm 2) hoặc Mua tại Saloon (50g)",
    "ingredients": [
      {
        "name": "Khoai tây",
        "nameEn": "Potato",
        "count": 1,
        "iconUrl": "assets/icons/item_potato.png"
      },
      {
        "name": "Dầu ăn",
        "nameEn": "Oil",
        "count": 1,
        "iconUrl": "assets/icons/ing_oil.png"
      }
    ],
    "buffs": [],
    "desc": "Từng sợi khoai tây chiên vàng giòn rụm bên ngoài nhưng mềm xốp bên trong.",
    "tips": "Nguyên liệu để chế biến Complete Breakfast và Dish O' The Sea.",
    "wikiFile": "Hashbrowns.png",
    "imageUrl": "assets/icons/hashbrowns.png",
    "localImageUrl": "assets/icons/hashbrowns.png"
  },
  {
    "id": "pancakes",
    "name": "Bánh Kếp Bơ Mật Ong",
    "nameEn": "Pancakes",
    "category": "cooking",
    "subCategory": "Bánh ngọt điểm tâm",
    "icon": "🥞",
    "energy": 90,
    "health": 40,
    "sellPrice": 80,
    "source": "Kênh The Queen of Sauce (Ngày 14 Mùa Hè, Năm 1) hoặc Mua tại Saloon (100g)",
    "ingredients": [
      {
        "name": "Bột mì",
        "nameEn": "Wheat Flour",
        "count": 1,
        "iconUrl": "assets/icons/ing_wheat_flour.png"
      },
      {
        "name": "Trứng gà",
        "nameEn": "Egg",
        "count": 1,
        "iconUrl": "assets/icons/ing_egg.png"
      }
    ],
    "buffs": [
      {
        "stat": "Thu thập củi/rau rừng (Foraging)",
        "value": "+2",
        "duration": "11 phút 11 giây"
      }
    ],
    "desc": "Tập bánh xốp mềm thơm phức mùi bơ sữa và siro cây phong.",
    "tips": "Tăng kỹ năng hái lượm giúp tăng tỉ lệ nhặt được gấp đôi quả dâu dại.",
    "wikiFile": "Pancakes.png",
    "imageUrl": "assets/icons/pancakes.png",
    "localImageUrl": "assets/icons/pancakes.png"
  },
  {
    "id": "salmon_dinner",
    "name": "Cơm Cá Hồi Áp Chảo",
    "nameEn": "Salmon Dinner",
    "category": "cooking",
    "subCategory": "Món chính bổ dưỡng",
    "icon": "🍣",
    "energy": 125,
    "health": 56,
    "sellPrice": 300,
    "source": "Thư từ Gus khi đạt 3 Tim tình bạn",
    "ingredients": [
      {
        "name": "Cá hồi",
        "nameEn": "Salmon",
        "count": 1,
        "iconUrl": "assets/icons/item_salmon.png"
      },
      {
        "name": "Rau dền",
        "nameEn": "Amaranth",
        "count": 1,
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Cải xoăn",
        "nameEn": "Kale",
        "count": 1,
        "iconUrl": "assets/icons/ing_kale.png"
      }
    ],
    "buffs": [],
    "desc": "Đĩa cá hồi hồng rực áp chảo giòn da ăn kèm rau xanh tươi ngon từ trang trại.",
    "tips": "Món quà yêu thích của Alex.",
    "wikiFile": "Salmon_Dinner.png",
    "imageUrl": "assets/icons/salmon_dinner.png",
    "localImageUrl": "assets/icons/salmon_dinner.png"
  },
  {
    "id": "fish_taco",
    "name": "Bánh Kẹp Taco Cá",
    "nameEn": "Fish Taco",
    "category": "cooking",
    "subCategory": "Món ăn câu cá",
    "icon": "🌮",
    "energy": 165,
    "health": 74,
    "sellPrice": 500,
    "source": "Thư từ Linus khi đạt 7 Tim tình bạn",
    "ingredients": [
      {
        "name": "Cá ngừ đại dương",
        "nameEn": "Tuna",
        "count": 1,
        "iconUrl": "assets/icons/item_tuna.png"
      },
      {
        "name": "Bánh tráng ngô Tortilla",
        "nameEn": "Tortilla",
        "count": 1,
        "iconUrl": "assets/icons/tortilla.png"
      },
      {
        "name": "Bắp cải đỏ",
        "nameEn": "Red Cabbage",
        "count": 1,
        "iconUrl": "assets/icons/item_red_cabbage.png"
      },
      {
        "name": "Sốt Mayonnaise",
        "nameEn": "Mayonnaise",
        "count": 1,
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "buffs": [
      {
        "stat": "Câu cá (Fishing)",
        "value": "+2",
        "duration": "7 phút"
      }
    ],
    "desc": "Món bánh kẹp Mexico chua cay quyến rũ, tiếp thêm cảm hứng và kỹ năng câu cá đỉnh cao.",
    "tips": "Món quà yêu thích của Caroline.",
    "wikiFile": "Fish_Taco.png",
    "imageUrl": "assets/icons/fish_taco.png",
    "localImageUrl": "assets/icons/fish_taco.png"
  },
  {
    "id": "crispy_bass",
    "name": "Cá Vược Chiên Giòn",
    "nameEn": "Crispy Bass",
    "category": "cooking",
    "subCategory": "Món cá chiên",
    "icon": "🐟",
    "energy": 90,
    "health": 40,
    "sellPrice": 150,
    "source": "Thư từ Kent khi đạt 3 Tim tình bạn",
    "ingredients": [
      {
        "name": "Cá vược miệng lớn",
        "nameEn": "Largemouth Bass",
        "count": 1,
        "iconUrl": "assets/icons/item_largemouth_bass.png"
      },
      {
        "name": "Bột mì",
        "nameEn": "Wheat Flour",
        "count": 1,
        "iconUrl": "assets/icons/ing_wheat_flour.png"
      },
      {
        "name": "Dầu ăn",
        "nameEn": "Oil",
        "count": 1,
        "iconUrl": "assets/icons/ing_oil.png"
      }
    ],
    "buffs": [
      {
        "stat": "Nam châm hút đồ (Magnetism)",
        "value": "+64",
        "duration": "7 phút"
      }
    ],
    "desc": "Miếng cá chiên vàng ruộm giòn tan rôm rốp dưới răng.",
    "tips": "Tăng mạnh tầm hút quặng và đá rơi khi bạn vung cuốc trong hầm mỏ.",
    "wikiFile": "Crispy_Bass.png",
    "imageUrl": "assets/icons/crispy_bass.png",
    "localImageUrl": "assets/icons/crispy_bass.png"
  },
  {
    "id": "pepper_poppers",
    "name": "Ớt Cay Nhồi Phô Mai Nướng",
    "nameEn": "Pepper Poppers",
    "category": "cooking",
    "subCategory": "Món ăn Tăng Tốc",
    "icon": "🌶️",
    "energy": 130,
    "health": 58,
    "sellPrice": 200,
    "source": "Thư từ Shane khi đạt 3 Tim tình bạn",
    "ingredients": [
      {
        "name": "Ớt cay",
        "nameEn": "Hot Pepper",
        "count": 1,
        "iconUrl": "assets/icons/item_hot_pepper.png"
      },
      {
        "name": "Phô mai",
        "nameEn": "Cheese",
        "count": 1,
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "buffs": [
      {
        "stat": "Tốc độ chạy (Speed)",
        "value": "+1",
        "duration": "7 phút"
      },
      {
        "stat": "Canh tác (Farming)",
        "value": "+2",
        "duration": "7 phút"
      }
    ],
    "desc": "Vị cay nồng xộc lên mũi quyện với phô mai béo ngậy khiến bạn chạy nhanh như gió!",
    "tips": "Món buff tốc độ chạy cực kỳ kinh tế và dễ trồng trong mùa hè. Món quà Shane thích nhất.",
    "wikiFile": "Pepper_Poppers.png",
    "imageUrl": "assets/icons/pepper_poppers.png",
    "localImageUrl": "assets/icons/pepper_poppers.png"
  },
  {
    "id": "bread",
    "name": "Bánh Mì Nướng Baguette",
    "nameEn": "Bread",
    "category": "cooking",
    "subCategory": "Bánh mì cơ bản",
    "icon": "🥖",
    "energy": 50,
    "health": 22,
    "sellPrice": 60,
    "source": "Kênh The Queen of Sauce (Ngày 28 Mùa Hè, Năm 1) hoặc Mua tại Saloon (100g)",
    "ingredients": [
      {
        "name": "Bột mì",
        "nameEn": "Wheat Flour",
        "count": 1,
        "iconUrl": "assets/icons/ing_wheat_flour.png"
      }
    ],
    "buffs": [],
    "desc": "Ổ bánh mì nướng vàng thơm mùi lúa mì mới thu hoạch.",
    "tips": "Nguyên liệu bắt buộc để nấu Survival Burger, Stuffing và Bruschetta.",
    "wikiFile": "Bread.png",
    "imageUrl": "assets/icons/bread.png",
    "localImageUrl": "assets/icons/bread.png"
  },
  {
    "id": "tom_kha_soup",
    "name": "Súp Tom Kha Nước Cốt Dừa",
    "nameEn": "Tom Kha Soup",
    "category": "cooking",
    "subCategory": "Súp thảo mộc",
    "icon": "🥥",
    "energy": 175,
    "health": 78,
    "sellPrice": 250,
    "source": "Thư từ Sandy khi đạt 7 Tim tình bạn",
    "ingredients": [
      {
        "name": "Dừa khô",
        "nameEn": "Coconut",
        "count": 1,
        "iconUrl": "assets/icons/item_coconut.png"
      },
      {
        "name": "Tôm sú",
        "nameEn": "Shrimp",
        "count": 1,
        "iconUrl": "assets/icons/ing_shrimp.png"
      },
      {
        "name": "Nấm thường",
        "nameEn": "Common Mushroom",
        "count": 1,
        "iconUrl": "assets/icons/ing_common_mushroom.png"
      }
    ],
    "buffs": [
      {
        "stat": "Canh tác (Farming)",
        "value": "+2",
        "duration": "7 phút"
      },
      {
        "stat": "Năng lượng tối đa",
        "value": "+30",
        "duration": "7 phút"
      }
    ],
    "desc": "Món súp tôm cay béo ngậy từ nước cốt dừa sa mạc Calico.",
    "tips": "Món quà yêu thích tuyệt đối của Sandy!",
    "wikiFile": "Tom_Kha_Soup.png",
    "imageUrl": "assets/icons/tom_kha_soup.png",
    "localImageUrl": "assets/icons/tom_kha_soup.png"
  },
  {
    "id": "trout_soup",
    "name": "Súp Cá Hồi Cầu Vồng",
    "nameEn": "Trout Soup",
    "category": "cooking",
    "subCategory": "Súp cá",
    "icon": "🍲",
    "energy": 100,
    "health": 45,
    "sellPrice": 100,
    "source": "Kênh The Queen of Sauce (Ngày 14 Mùa Thu, Năm 1)",
    "ingredients": [
      {
        "name": "Cá hồi cầu vồng",
        "nameEn": "Rainbow Trout",
        "count": 1,
        "iconUrl": "assets/icons/item_rainbow_trout.png"
      },
      {
        "name": "Tảo lục",
        "nameEn": "Green Algae",
        "count": 1,
        "iconUrl": "assets/icons/ing_green_algae.png"
      }
    ],
    "buffs": [
      {
        "stat": "Câu cá (Fishing)",
        "value": "+1",
        "duration": "4 phút 39 giây"
      }
    ],
    "desc": "Bát súp cá hồi nóng hổi, tiếp thêm chút may mắn và sự khéo léo khi giật cần câu.",
    "tips": "Món ăn giá rẻ tăng kỹ năng câu cá đầu game.",
    "wikiFile": "Trout_Soup.png",
    "imageUrl": "assets/icons/trout_soup.png",
    "localImageUrl": "assets/icons/trout_soup.png"
  },
  {
    "id": "chocolate_cake",
    "name": "Bánh Gato Sô-cô-la",
    "nameEn": "Chocolate Cake",
    "category": "cooking",
    "subCategory": "Bánh sinh nhật & Ngọt",
    "icon": "🎂",
    "energy": 150,
    "health": 67,
    "sellPrice": 200,
    "source": "Kênh The Queen of Sauce (Ngày 14 Mùa Đông, Năm 1)",
    "ingredients": [
      {
        "name": "Bột mì",
        "nameEn": "Wheat Flour",
        "count": 1,
        "iconUrl": "assets/icons/ing_wheat_flour.png"
      },
      {
        "name": "Đường",
        "nameEn": "Sugar",
        "count": 1,
        "iconUrl": "assets/icons/ing_sugar.png"
      },
      {
        "name": "Trứng gà",
        "nameEn": "Egg",
        "count": 1,
        "iconUrl": "assets/icons/ing_egg.png"
      }
    ],
    "buffs": [],
    "desc": "Bánh kem sô-cô-la đen đậm đà ngọt ngào.",
    "tips": "Món quà Yêu Thích của Abigail và Evelyn!",
    "wikiFile": "Chocolate_Cake.png",
    "imageUrl": "assets/icons/chocolate_cake.png",
    "localImageUrl": "assets/icons/chocolate_cake.png"
  },
  {
    "id": "pink_cake",
    "name": "Bánh Kem Dâu Tây Hồng",
    "nameEn": "Pink Cake",
    "category": "cooking",
    "subCategory": "Bánh kem lộng lẫy",
    "icon": "🍰",
    "energy": 250,
    "health": 112,
    "sellPrice": 480,
    "source": "Kênh The Queen of Sauce (Ngày 21 Mùa Hè, Năm 2)",
    "ingredients": [
      {
        "name": "Dưa lưới Melon",
        "nameEn": "Melon",
        "count": 1,
        "iconUrl": "assets/icons/item_melon.png"
      },
      {
        "name": "Bột mì",
        "nameEn": "Wheat Flour",
        "count": 1,
        "iconUrl": "assets/icons/ing_wheat_flour.png"
      },
      {
        "name": "Đường",
        "nameEn": "Sugar",
        "count": 1,
        "iconUrl": "assets/icons/ing_sugar.png"
      },
      {
        "name": "Trứng gà",
        "nameEn": "Egg",
        "count": 1,
        "iconUrl": "assets/icons/ing_egg.png"
      }
    ],
    "buffs": [],
    "desc": "Chiếc bánh kem phủ kẹo mềm hình trái tim hồng rực rỡ ngọt lịm.",
    "tips": "Món quà Yêu Thích Cực Độ của Haley, Jas và Vincent.",
    "wikiFile": "Pink_Cake.png",
    "imageUrl": "assets/icons/pink_cake.png",
    "localImageUrl": "assets/icons/pink_cake.png"
  },
  {
    "id": "rhubarb_pie",
    "name": "Bánh Nướng Đại Hoàng",
    "nameEn": "Rhubarb Pie",
    "category": "cooking",
    "subCategory": "Bánh nướng trái cây",
    "icon": "🥧",
    "energy": 215,
    "health": 96,
    "sellPrice": 400,
    "source": "Thư từ Marnie khi đạt 7 Tim tình bạn",
    "ingredients": [
      {
        "name": "Đại hoàng",
        "nameEn": "Rhubarb",
        "count": 1,
        "iconUrl": "assets/icons/ing_rhubarb.png"
      },
      {
        "name": "Bột mì",
        "nameEn": "Wheat Flour",
        "count": 1,
        "iconUrl": "assets/icons/ing_wheat_flour.png"
      },
      {
        "name": "Đường",
        "nameEn": "Sugar",
        "count": 1,
        "iconUrl": "assets/icons/ing_sugar.png"
      }
    ],
    "buffs": [],
    "desc": "Vỏ bánh giòn xốp ôm trọn nhân mứt đại hoàng chua ngọt thơm ngào ngạt.",
    "tips": "Món quà yêu thích tuyệt đối của cụ bà Evelyn.",
    "wikiFile": "Rhubarb_Pie.png",
    "imageUrl": "assets/icons/rhubarb_pie.png",
    "localImageUrl": "assets/icons/rhubarb_pie.png"
  },
  {
    "id": "cookies",
    "name": "Bánh Quy Sô-cô-la Chip",
    "nameEn": "Cookies",
    "category": "cooking",
    "subCategory": "Bánh quy giòn",
    "icon": "🍪",
    "energy": 90,
    "health": 40,
    "sellPrice": 140,
    "source": "Sự kiện 4 Tim của Evelyn (Bà dạy làm bánh tại nhà)",
    "ingredients": [
      {
        "name": "Bột mì",
        "nameEn": "Wheat Flour",
        "count": 1,
        "iconUrl": "assets/icons/ing_wheat_flour.png"
      },
      {
        "name": "Đường",
        "nameEn": "Sugar",
        "count": 1,
        "iconUrl": "assets/icons/ing_sugar.png"
      },
      {
        "name": "Trứng gà",
        "nameEn": "Egg",
        "count": 1,
        "iconUrl": "assets/icons/ing_egg.png"
      }
    ],
    "buffs": [],
    "desc": "Bánh quy nướng thủ công thơm phức mùi bơ sữa và sô-cô-la chip.",
    "tips": "Món quà yêu thích của Evelyn.",
    "wikiFile": "Cookies.png",
    "imageUrl": "assets/icons/cookies.png",
    "localImageUrl": "assets/icons/cookies.png"
  },
  {
    "id": "spaghetti",
    "name": "Mì Ý Sốt Bò Băm Cà Chua",
    "nameEn": "Spaghetti",
    "category": "cooking",
    "subCategory": "Món mì Ý",
    "icon": "🍝",
    "energy": 75,
    "health": 33,
    "sellPrice": 120,
    "source": "Kênh The Queen of Sauce (Ngày 21 Mùa Đông, Năm 1) hoặc Mua tại Saloon (240g)",
    "ingredients": [
      {
        "name": "Bột mì",
        "nameEn": "Wheat Flour",
        "count": 1,
        "iconUrl": "assets/icons/ing_wheat_flour.png"
      },
      {
        "name": "Cà chua",
        "nameEn": "Tomato",
        "count": 1,
        "iconUrl": "assets/icons/item_tomato.png"
      }
    ],
    "buffs": [],
    "desc": "Từng sợi mì dai mềm tắm đẫm trong sốt cà chua truyền thống.",
    "tips": "Món quà Yêu Thích Cực Độ của Robin.",
    "wikiFile": "Spaghetti.png",
    "imageUrl": "assets/icons/spaghetti.png",
    "localImageUrl": "assets/icons/spaghetti.png"
  },
  {
    "id": "fried_eel",
    "name": "Lươn Biển Áp Chảo",
    "nameEn": "Fried Eel",
    "category": "cooking",
    "subCategory": "Món may mắn",
    "icon": "🍱",
    "energy": 75,
    "health": 33,
    "sellPrice": 120,
    "source": "Thư từ George khi đạt 3 Tim tình bạn",
    "ingredients": [
      {
        "name": "Lươn biển",
        "nameEn": "Eel",
        "count": 1,
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Dầu ăn",
        "nameEn": "Oil",
        "count": 1,
        "iconUrl": "assets/icons/ing_oil.png"
      }
    ],
    "buffs": [
      {
        "stat": "May mắn (Luck)",
        "value": "+1",
        "duration": "7 phút"
      }
    ],
    "desc": "Miếng lươn béo ngậy được chiên xém vàng với dầu hạt cải.",
    "tips": "Món quà yêu thích của cụ George.",
    "wikiFile": "Fried_Eel.png",
    "imageUrl": "assets/icons/fried_eel.png",
    "localImageUrl": "assets/icons/fried_eel.png"
  },
  {
    "id": "spicy_eel",
    "name": "Lươn Biển Sốt Ớt Cay",
    "nameEn": "Spicy Eel",
    "category": "cooking",
    "subCategory": "Món Thần Thánh Skull Cavern",
    "icon": "🌶️",
    "energy": 115,
    "health": 51,
    "sellPrice": 175,
    "source": "Thư từ George khi đạt 7 Tim tình bạn",
    "ingredients": [
      {
        "name": "Lươn biển",
        "nameEn": "Eel",
        "count": 1,
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Ớt cay",
        "nameEn": "Hot Pepper",
        "count": 1,
        "iconUrl": "assets/icons/item_hot_pepper.png"
      }
    ],
    "buffs": [
      {
        "stat": "Tốc độ chạy (Speed)",
        "value": "+1",
        "duration": "7 phút"
      },
      {
        "stat": "May mắn (Luck)",
        "value": "+1",
        "duration": "7 phút"
      }
    ],
    "desc": "VUA CỦA CÁC MÓN ĂN THÁM HIỂM HẦM MỎ! Kết hợp hoàn hảo cả Tốc độ di chuyển và Vận may.",
    "tips": "Đổi Ruby lấy Spicy Eel tại Desert Trader vô hạn! Món quà yêu thích của Abigail.",
    "wikiFile": "Spicy_Eel.png",
    "imageUrl": "assets/icons/spicy_eel.png",
    "localImageUrl": "assets/icons/spicy_eel.png"
  },
  {
    "id": "sashimi",
    "name": "Gỏi Cá Sống Sashimi",
    "nameEn": "Sashimi",
    "category": "cooking",
    "subCategory": "Món ăn Nhật Bản",
    "icon": "🍣",
    "energy": 75,
    "health": 33,
    "sellPrice": 75,
    "source": "Thư từ Linus khi đạt 3 Tim tình bạn",
    "ingredients": [
      {
        "name": "Cá bất kỳ",
        "nameEn": "Any Fish",
        "count": 1,
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "buffs": [],
    "desc": "Từng lát cá biển thái mỏng tươi roi rói chấm xì dầu wasabi.",
    "tips": "Biến các loại cá rẻ tiền (như Periwinkle 20g, Snail 65g) thành món 75g! Món yêu thích tuyệt đối của Sebastian.",
    "wikiFile": "Sashimi.png",
    "imageUrl": "assets/icons/sashimi.png",
    "localImageUrl": "assets/icons/sashimi.png"
  },
  {
    "id": "maki_roll",
    "name": "Cuộn Cơm Rong Biển Maki",
    "nameEn": "Maki Roll",
    "category": "cooking",
    "subCategory": "Món ăn Nhật Bản",
    "icon": "🍙",
    "energy": 100,
    "health": 45,
    "sellPrice": 220,
    "source": "Kênh The Queen of Sauce (Ngày 21 Mùa Hè, Năm 1) hoặc Mua tại Saloon (300g)",
    "ingredients": [
      {
        "name": "Cá bất kỳ",
        "nameEn": "Any Fish",
        "count": 1,
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Rong biển",
        "nameEn": "Seaweed",
        "count": 1,
        "iconUrl": "assets/icons/ing_seaweed.png"
      },
      {
        "name": "Gạo",
        "nameEn": "Rice",
        "count": 1,
        "iconUrl": "assets/icons/ing_rice.png"
      }
    ],
    "buffs": [],
    "desc": "Cơm dẻo cuốn chặt cùng cá tươi và rong biển biển giòn.",
    "tips": "Bắt buộc trong Chef's Bundle của Community Center.",
    "wikiFile": "Maki_Roll.png",
    "imageUrl": "assets/icons/maki_roll.png",
    "localImageUrl": "assets/icons/maki_roll.png"
  },
  {
    "id": "tortilla",
    "name": "Bánh Tráng Ngô Tortilla",
    "nameEn": "Tortilla",
    "category": "cooking",
    "subCategory": "Món phụ cơ bản",
    "icon": "🫓",
    "energy": 50,
    "health": 22,
    "sellPrice": 50,
    "source": "Kênh The Queen of Sauce (Ngày 7 Mùa Thu, Năm 1) hoặc Mua tại Saloon (100g)",
    "ingredients": [
      {
        "name": "Bắp ngô",
        "nameEn": "Corn",
        "count": 1,
        "iconUrl": "assets/icons/item_corn.png"
      }
    ],
    "buffs": [],
    "desc": "Bánh tráng ngô cán dẹp nướng thơm lừng trên chảo gang.",
    "tips": "Dùng để nấu Lucky Lunch và Fish Taco.",
    "wikiFile": "Tortilla.png",
    "imageUrl": "assets/icons/tortilla.png",
    "localImageUrl": "assets/icons/tortilla.png"
  },
  {
    "id": "red_plate",
    "name": "Đĩa Rau Đỏ Bổ Dưỡng",
    "nameEn": "Red Plate",
    "category": "cooking",
    "subCategory": "Món hồi phục năng lượng",
    "icon": "🥗",
    "energy": 240,
    "health": 108,
    "sellPrice": 400,
    "source": "Thư từ Emily khi đạt 7 Tim tình bạn",
    "ingredients": [
      {
        "name": "Bắp cải đỏ",
        "nameEn": "Red Cabbage",
        "count": 1,
        "iconUrl": "assets/icons/item_red_cabbage.png"
      },
      {
        "name": "Củ cải đỏ",
        "nameEn": "Radish",
        "count": 1,
        "iconUrl": "assets/icons/ing_radish.png"
      }
    ],
    "buffs": [
      {
        "stat": "Năng lượng tối đa",
        "value": "+50",
        "duration": "3 phút 30 giây"
      }
    ],
    "desc": "Đầy ắp chất chống oxy hóa tự nhiên giúp cơ thể tràn trề sinh lực.",
    "tips": "Cung cấp thanh năng lượng siêu dài.",
    "wikiFile": "Red_Plate.png",
    "imageUrl": "assets/icons/red_plate.png",
    "localImageUrl": "assets/icons/red_plate.png"
  },
  {
    "id": "eggplant_parmesan",
    "name": "Cà Tím Bỏ Lò Phô Mai",
    "nameEn": "Eggplant Parmesan",
    "category": "cooking",
    "subCategory": "Món chay nướng",
    "icon": "🍆",
    "energy": 175,
    "health": 78,
    "sellPrice": 200,
    "source": "Thư từ Lewis khi đạt 7 Tim tình bạn",
    "ingredients": [
      {
        "name": "Cà tím",
        "nameEn": "Eggplant",
        "count": 1,
        "iconUrl": "assets/icons/item_eggplant.png"
      },
      {
        "name": "Cà chua",
        "nameEn": "Tomato",
        "count": 1,
        "iconUrl": "assets/icons/item_tomato.png"
      }
    ],
    "buffs": [
      {
        "stat": "Khai mỏ (Mining)",
        "value": "+1",
        "duration": "4 phút 39 giây"
      },
      {
        "stat": "Phòng thủ (Defense)",
        "value": "+3",
        "duration": "4 phút 39 giây"
      }
    ],
    "desc": "Cà tím nướng mềm ngập sốt cà chua, tăng giáp phòng thủ cực cao trong mỏ.",
    "tips": "Món ăn giảm sát thương rất tốt trước quái vật Skull Cavern.",
    "wikiFile": "Eggplant_Parmesan.png",
    "imageUrl": "assets/icons/eggplant_parmesan.png",
    "localImageUrl": "assets/icons/eggplant_parmesan.png"
  },
  {
    "id": "rice_pudding",
    "name": "Pudding Gạo Sữa Ngọt Ngào",
    "nameEn": "Rice Pudding",
    "category": "cooking",
    "subCategory": "Tráng miệng",
    "icon": "🍮",
    "energy": 115,
    "health": 51,
    "sellPrice": 260,
    "source": "Kênh The Queen of Sauce (Ngày 7 Mùa Hạ, Năm 2)",
    "ingredients": [
      {
        "name": "Sữa tươi",
        "nameEn": "Milk",
        "count": 1,
        "iconUrl": "assets/icons/ing_milk.png"
      },
      {
        "name": "Đường",
        "nameEn": "Sugar",
        "count": 1,
        "iconUrl": "assets/icons/ing_sugar.png"
      },
      {
        "name": "Gạo",
        "nameEn": "Rice",
        "count": 1,
        "iconUrl": "assets/icons/ing_rice.png"
      }
    ],
    "buffs": [],
    "desc": "Món tráng miệng truyền thống sánh mịn, ngọt bùi dịu êm.",
    "tips": "Hồi phục năng lượng tốt.",
    "wikiFile": "Rice_Pudding.png",
    "imageUrl": "assets/icons/rice_pudding.png",
    "localImageUrl": "assets/icons/rice_pudding.png"
  },
  {
    "id": "ice_cream",
    "name": "Kem Tươi Ốc Quế",
    "nameEn": "Ice Cream",
    "category": "cooking",
    "subCategory": "Kem lạnh",
    "icon": "🍦",
    "energy": 100,
    "health": 45,
    "sellPrice": 120,
    "source": "Thư từ Jodi khi đạt 7 Tim tình bạn",
    "ingredients": [
      {
        "name": "Sữa tươi",
        "nameEn": "Milk",
        "count": 1,
        "iconUrl": "assets/icons/ing_milk.png"
      },
      {
        "name": "Đường",
        "nameEn": "Sugar",
        "count": 1,
        "iconUrl": "assets/icons/ing_sugar.png"
      }
    ],
    "buffs": [],
    "desc": "Một muỗng kem vani tươi mát lạnh làm dịu tan cái nóng mùa hè.",
    "tips": "Món quà yêu thích của Haley và Demetrius!",
    "wikiFile": "Ice_Cream.png",
    "imageUrl": "assets/icons/ice_cream.png",
    "localImageUrl": "assets/icons/ice_cream.png"
  },
  {
    "id": "blueberry_tart",
    "name": "Bánh Tart Việt Quất",
    "nameEn": "Blueberry Tart",
    "category": "cooking",
    "subCategory": "Bánh ngọt nướng",
    "icon": "🥧",
    "energy": 125,
    "health": 56,
    "sellPrice": 150,
    "source": "Thư từ Linus khi đạt 3 Tim tình bạn",
    "ingredients": [
      {
        "name": "Quả việt quất",
        "nameEn": "Blueberry",
        "count": 1,
        "iconUrl": "assets/icons/item_blueberry.png"
      },
      {
        "name": "Bột mì",
        "nameEn": "Wheat Flour",
        "count": 1,
        "iconUrl": "assets/icons/ing_wheat_flour.png"
      },
      {
        "name": "Đường",
        "nameEn": "Sugar",
        "count": 1,
        "iconUrl": "assets/icons/ing_sugar.png"
      },
      {
        "name": "Trứng gà",
        "nameEn": "Egg",
        "count": 1,
        "iconUrl": "assets/icons/ing_egg.png"
      }
    ],
    "buffs": [],
    "desc": "Nhân mứt việt quất chua ngọt thơm lừng bên trong lớp vỏ bánh bơ giòn xốp.",
    "tips": "Món quà bí mật hoàn hảo cho nhiều dân làng.",
    "wikiFile": "Blueberry_Tart.png",
    "imageUrl": "assets/icons/blueberry_tart.png",
    "localImageUrl": "assets/icons/blueberry_tart.png"
  },
  {
    "id": "autumns_bounty",
    "name": "Món Quà Mùa Thu",
    "nameEn": "Autumn's Bounty",
    "category": "cooking",
    "subCategory": "Món hầm tăng giáp",
    "icon": "🍲",
    "energy": 220,
    "health": 99,
    "sellPrice": 350,
    "source": "Thư từ Demetrius khi đạt 7 Tim tình bạn",
    "ingredients": [
      {
        "name": "Khoai lang",
        "nameEn": "Yam",
        "count": 1,
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Bí ngô",
        "nameEn": "Pumpkin",
        "count": 1,
        "iconUrl": "assets/icons/item_pumpkin.png"
      }
    ],
    "buffs": [
      {
        "stat": "Hái lượm (Foraging)",
        "value": "+2",
        "duration": "7 phút 41 giây"
      },
      {
        "stat": "Phòng thủ (Defense)",
        "value": "+2",
        "duration": "7 phút 41 giây"
      }
    ],
    "desc": "Hương vị nồng nàn của những loại củ quả đậm chất mùa thu hoạch.",
    "tips": "Thời gian buff kéo dài gần 8 phút trong game.",
    "wikiFile": "Autumn%27s_Bounty.png",
    "imageUrl": "assets/icons/autumns_bounty.png",
    "localImageUrl": "assets/icons/autumns_bounty.png"
  },
  {
    "id": "pumpkin_soup",
    "name": "Súp Bí Ngô Hoàng Gia",
    "nameEn": "Pumpkin Soup",
    "category": "cooking",
    "subCategory": "Món Thần Thánh Mỏ",
    "icon": "🥣",
    "energy": 200,
    "health": 90,
    "sellPrice": 300,
    "source": "Thư từ Robin khi đạt 7 Tim tình bạn",
    "ingredients": [
      {
        "name": "Bí ngô",
        "nameEn": "Pumpkin",
        "count": 1,
        "iconUrl": "assets/icons/item_pumpkin.png"
      },
      {
        "name": "Sữa tươi",
        "nameEn": "Milk",
        "count": 1,
        "iconUrl": "assets/icons/ing_milk.png"
      }
    ],
    "buffs": [
      {
        "stat": "Phòng thủ (Defense)",
        "value": "+2",
        "duration": "7 phút 41 giây"
      },
      {
        "stat": "May mắn (Luck)",
        "value": "+2",
        "duration": "7 phút 41 giây"
      }
    ],
    "desc": "Món súp vàng óng bổ dưỡng, vừa mang lại may mắn vừa bọc lớp giáp bảo vệ trước lũ rồng bay Serpent!",
    "tips": "Món ăn cực mạnh thay thế Spicy Eel khi bạn cần phòng thủ cao hơn.",
    "wikiFile": "Pumpkin_Soup.png",
    "imageUrl": "assets/icons/pumpkin_soup.png",
    "localImageUrl": "assets/icons/pumpkin_soup.png"
  },
  {
    "id": "super_meal",
    "name": "Bữa Ăn Siêu Cấp",
    "nameEn": "Super Meal",
    "category": "cooking",
    "subCategory": "Món ăn Tăng Tốc",
    "icon": "🍱",
    "energy": 160,
    "health": 72,
    "sellPrice": 220,
    "source": "Thư từ Kent khi đạt 7 Tim tình bạn",
    "ingredients": [
      {
        "name": "Cải thìa",
        "nameEn": "Bok Choy",
        "count": 1,
        "iconUrl": "assets/icons/ing_bok_choy.png"
      },
      {
        "name": "Nam việt quất Cranberry",
        "nameEn": "Cranberries",
        "count": 1,
        "iconUrl": "assets/icons/item_cranberries.png"
      },
      {
        "name": "Bông Atiso",
        "nameEn": "Artichoke",
        "count": 1,
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "buffs": [
      {
        "stat": "Tốc độ chạy (Speed)",
        "value": "+1",
        "duration": "3 phút 30 giây"
      },
      {
        "stat": "Năng lượng tối đa",
        "value": "+30",
        "duration": "3 phút 30 giây"
      }
    ],
    "desc": "Bữa ăn giàu năng lượng giúp bạn di chuyển thoăn thoắt trên mọi nẻo đường.",
    "tips": "Món quà yêu thích của Harvey.",
    "wikiFile": "Super_Meal.png",
    "imageUrl": "assets/icons/super_meal.png",
    "localImageUrl": "assets/icons/super_meal.png"
  },
  {
    "id": "cranberry_sauce",
    "name": "Sốt Nam Việt Quất Cay Ngọt",
    "nameEn": "Cranberry Sauce",
    "category": "cooking",
    "subCategory": "Món sốt thợ mỏ",
    "icon": "🥫",
    "energy": 125,
    "health": 56,
    "sellPrice": 120,
    "source": "Kênh The Queen of Sauce (Ngày 21 Mùa Đông, Năm 1)",
    "ingredients": [
      {
        "name": "Nam việt quất",
        "nameEn": "Cranberries",
        "count": 1,
        "iconUrl": "assets/icons/item_cranberries.png"
      },
      {
        "name": "Đường",
        "nameEn": "Sugar",
        "count": 1,
        "iconUrl": "assets/icons/ing_sugar.png"
      }
    ],
    "buffs": [
      {
        "stat": "Khai mỏ (Mining)",
        "value": "+2",
        "duration": "3 phút 30 giây"
      }
    ],
    "desc": "Vị chua ngọt kích thích vị giác và tăng sức đập đá khai mỏ.",
    "tips": "Món yêu thích của cụ George.",
    "wikiFile": "Cranberry_Sauce.png",
    "imageUrl": "assets/icons/cranberry_sauce.png",
    "localImageUrl": "assets/icons/cranberry_sauce.png"
  },
  {
    "id": "stuffing",
    "name": "Món Nhồi Ngũ Vị",
    "nameEn": "Stuffing",
    "category": "cooking",
    "subCategory": "Món ăn tăng giáp",
    "icon": "🧆",
    "energy": 170,
    "health": 76,
    "sellPrice": 165,
    "source": "Thư từ Pam khi đạt 7 Tim tình bạn",
    "ingredients": [
      {
        "name": "Bánh mì Bread",
        "nameEn": "Bread",
        "count": 1,
        "iconUrl": "assets/icons/bread.png"
      },
      {
        "name": "Nam việt quất",
        "nameEn": "Cranberries",
        "count": 1,
        "iconUrl": "assets/icons/item_cranberries.png"
      },
      {
        "name": "Hạt phỉ",
        "nameEn": "Hazelnut",
        "count": 1,
        "iconUrl": "assets/icons/ing_hazelnut.png"
      }
    ],
    "buffs": [
      {
        "stat": "Phòng thủ (Defense)",
        "value": "+2",
        "duration": "5 phút 35 giây"
      }
    ],
    "desc": "Bánh mì vụn trộn đều thảo mộc và hạt nướng thơm phức.",
    "tips": "Giúp bạn vững vàng trước những đòn đánh hiểm của quái vật.",
    "wikiFile": "Stuffing.png",
    "imageUrl": "assets/icons/stuffing.png",
    "localImageUrl": "assets/icons/stuffing.png"
  },
  {
    "id": "farmers_lunch",
    "name": "Bữa Trưa Bác Nông Dân",
    "nameEn": "Farmer's Lunch",
    "category": "cooking",
    "subCategory": "Món Canh Tác Đỉnh Cao",
    "icon": "🍳",
    "energy": 200,
    "health": 90,
    "sellPrice": 150,
    "source": "Đạt cấp độ Canh tác (Farming) Cấp 3",
    "ingredients": [
      {
        "name": "Trứng cuộn Omelet",
        "nameEn": "Omelet",
        "count": 1,
        "iconUrl": "assets/icons/omelet.png"
      },
      {
        "name": "Củ cải vàng Parsnip",
        "nameEn": "Parsnip",
        "count": 1,
        "iconUrl": "assets/icons/item_parsnip.png"
      }
    ],
    "buffs": [
      {
        "stat": "Canh tác (Farming)",
        "value": "+3",
        "duration": "5 phút 35 giây"
      }
    ],
    "desc": "Món ăn cổ truyền tăng mạnh chỉ số Canh tác lên thêm +3! Tăng tỉ lệ thu hoạch nông sản chất lượng Vàng và Iridium.",
    "tips": "Hãy ăn ngay trước khi thu hoạch mùa màng diện rộng.",
    "wikiFile": "Farmer%27s_Lunch.png",
    "imageUrl": "assets/icons/farmers_lunch.png",
    "localImageUrl": "assets/icons/farmers_lunch.png"
  },
  {
    "id": "survival_burger",
    "name": "Burger Sinh Tồn Thợ Rừng",
    "nameEn": "Survival Burger",
    "category": "cooking",
    "subCategory": "Món Hái Lượm Đỉnh Cao",
    "icon": "🍔",
    "energy": 125,
    "health": 56,
    "sellPrice": 180,
    "source": "Đạt cấp độ Hái Lượm (Foraging) Cấp 2",
    "ingredients": [
      {
        "name": "Bánh mì Bread",
        "nameEn": "Bread",
        "count": 1,
        "iconUrl": "assets/icons/bread.png"
      },
      {
        "name": "Cà rốt trong hang Cave Carrot",
        "nameEn": "Cave Carrot",
        "count": 1,
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Cà tím Eggplant",
        "nameEn": "Eggplant",
        "count": 1,
        "iconUrl": "assets/icons/item_eggplant.png"
      }
    ],
    "buffs": [
      {
        "stat": "Hái lượm (Foraging)",
        "value": "+3",
        "duration": "5 phút 35 giây"
      }
    ],
    "desc": "Chiếc bánh burger dã chiến đậm chất sinh tồn rừng rậm.",
    "tips": "Tăng cấp Foraging giúp chặt cây ít tốn năng lượng hơn và nhặt được nhiều gỗ hơn.",
    "wikiFile": "Survival_Burger.png",
    "imageUrl": "assets/icons/survival_burger.png",
    "localImageUrl": "assets/icons/survival_burger.png"
  },
  {
    "id": "dish_o_the_sea",
    "name": "Đại Tiệc Hải Sản",
    "nameEn": "Dish O' The Sea",
    "category": "cooking",
    "subCategory": "Món Câu Cá Đỉnh Cao",
    "icon": "🐟",
    "energy": 150,
    "health": 67,
    "sellPrice": 220,
    "source": "Đạt cấp độ Câu Cá (Fishing) Cấp 3",
    "ingredients": [
      {
        "name": "Cá mòi Sardine",
        "nameEn": "Sardine",
        "count": 2,
        "iconUrl": "assets/icons/item_sardine.png"
      },
      {
        "name": "Khoai tây chiên Hashbrowns",
        "nameEn": "Hashbrowns",
        "count": 1,
        "iconUrl": "assets/icons/hashbrowns.png"
      }
    ],
    "buffs": [
      {
        "stat": "Câu cá (Fishing)",
        "value": "+3",
        "duration": "5 phút 35 giây"
      }
    ],
    "desc": "Món ăn quốc dân của các cần thủ! Mở rộng kích thước thanh câu cá cực lớn giúp bắt cá khó dễ như trở bàn tay.",
    "tips": "Món bắt buộc phải có khi đi săn 5 loài cá huyền thoại (Legendary Fish).",
    "wikiFile": "Dish_O%27_The_Sea.png",
    "imageUrl": "assets/icons/dish_o_the_sea.png",
    "localImageUrl": "assets/icons/dish_o_the_sea.png"
  },
  {
    "id": "miners_treat",
    "name": "Món Ngon Thợ Mỏ",
    "nameEn": "Miner's Treat",
    "category": "cooking",
    "subCategory": "Món Khai Khoáng Đỉnh Cao",
    "icon": "⛏️",
    "energy": 125,
    "health": 56,
    "sellPrice": 200,
    "source": "Đạt cấp độ Khai Mỏ (Mining) Cấp 3",
    "ingredients": [
      {
        "name": "Cà rốt trong hang",
        "nameEn": "Cave Carrot",
        "count": 2,
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Đường tinh luyện",
        "nameEn": "Sugar",
        "count": 1,
        "iconUrl": "assets/icons/ing_sugar.png"
      },
      {
        "name": "Sữa tươi",
        "nameEn": "Milk",
        "count": 1,
        "iconUrl": "assets/icons/ing_milk.png"
      }
    ],
    "buffs": [
      {
        "stat": "Khai mỏ (Mining)",
        "value": "+3",
        "duration": "5 phút 35 giây"
      },
      {
        "stat": "Nam châm hút quặng",
        "value": "+32",
        "duration": "5 phút 35 giây"
      },
      {
        "stat": "Phòng thủ (Defense)",
        "value": "+1",
        "duration": "5 phút 35 giây"
      }
    ],
    "desc": "Món kẹo dẻo năng lượng của thợ mỏ giúp bạn đập quặng chỉ với 1 nhát cuốc.",
    "tips": "Món quà tuyệt vời cho Maru.",
    "wikiFile": "Miner%27s_Treat.png",
    "imageUrl": "assets/icons/miners_treat.png",
    "localImageUrl": "assets/icons/miners_treat.png"
  },
  {
    "id": "roots_platter",
    "name": "Đĩa Củ Quả Luộc Mùa Đông",
    "nameEn": "Roots Platter",
    "category": "cooking",
    "subCategory": "Món tăng công",
    "icon": "🥔",
    "energy": 125,
    "health": 56,
    "sellPrice": 100,
    "source": "Đạt cấp độ Chiến Đấu (Combat) Cấp 3",
    "ingredients": [
      {
        "name": "Cà rốt trong hang",
        "nameEn": "Cave Carrot",
        "count": 1,
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Củ mùa đông Winter Root",
        "nameEn": "Winter Root",
        "count": 1,
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "buffs": [
      {
        "stat": "Sức tấn công (Attack)",
        "value": "+3",
        "duration": "5 phút 35 giây"
      }
    ],
    "desc": "Món ăn mộc mạc làm nóng cơ bắp và tiếp thêm uy lực cho mỗi nhát kiếm.",
    "tips": "Dễ kiếm nguyên liệu vào mùa đông khi đào đất rừng.",
    "wikiFile": "Roots_Platter.png",
    "imageUrl": "assets/icons/roots_platter.png",
    "localImageUrl": "assets/icons/roots_platter.png"
  },
  {
    "id": "triple_shot_espresso",
    "name": "Cà Phê Espresso Đậm Đặc",
    "nameEn": "Triple Shot Espresso",
    "category": "cooking",
    "subCategory": "Nước Uống Thần Thánh",
    "icon": "☕",
    "energy": 8,
    "health": 3,
    "sellPrice": 450,
    "source": "Mua công thức từ Gus tại The Stardrop Saloon (5,000g)",
    "ingredients": [
      {
        "name": "Cà phê Coffee",
        "nameEn": "Coffee",
        "count": 3,
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "buffs": [
      {
        "stat": "Tốc độ chạy (Speed)",
        "value": "+1",
        "duration": "4 phút 12 giây"
      }
    ],
    "desc": "CỰC KỲ QUAN TRỌNG: Buff tốc độ từ Espresso CÓ THỂ CỘNG DỒN với buff tốc độ từ thức ăn (như Spicy Eel hoặc Crab Cakes)!",
    "tips": "Uống Espresso + ăn Spicy Eel = Tốc độ +2 chạy siêu nhanh!",
    "wikiFile": "Triple_Shot_Espresso.png",
    "imageUrl": "assets/icons/triple_shot_espresso.png",
    "localImageUrl": "assets/icons/triple_shot_espresso.png"
  },
  {
    "id": "seafoam_pudding",
    "name": "Pudding Bọt Biển Thần Thánh",
    "nameEn": "Seafoam Pudding",
    "category": "cooking",
    "subCategory": "Vua Câu Cá Tối Thượng",
    "icon": "🍮",
    "energy": 175,
    "health": 78,
    "sellPrice": 300,
    "source": "Đạt cấp độ Câu Cá (Fishing) Cấp 9",
    "ingredients": [
      {
        "name": "Cá bơn",
        "nameEn": "Flounder",
        "count": 1,
        "iconUrl": "assets/icons/ing_flounder.png"
      },
      {
        "name": "Cá chép đêm Midnight Carp",
        "nameEn": "Midnight Carp",
        "count": 1,
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Mực đen",
        "nameEn": "Squid Ink",
        "count": 1,
        "iconUrl": "assets/icons/ing_squid_ink.png"
      }
    ],
    "buffs": [
      {
        "stat": "Câu cá (Fishing)",
        "value": "+4",
        "duration": "3 phút 30 giây"
      }
    ],
    "desc": "MÓN TĂNG CHỈ SỐ CÂU CÁ CAO NHẤT TOÀN BỘ GAME (+4 CÂU CÁ)! Thanh kéo câu cá to gần bằng nửa màn hình.",
    "tips": "Cần thiết tuyệt đối khi săn cá Legend ở hồ trên núi mùa xuân ngày mưa.",
    "wikiFile": "Seafoam_Pudding.png",
    "imageUrl": "assets/icons/seafoam_pudding.png",
    "localImageUrl": "assets/icons/seafoam_pudding.png"
  },
  {
    "id": "algae_soup",
    "name": "Súp Tảo Lục Thanh Nhiệt",
    "nameEn": "Algae Soup",
    "category": "cooking",
    "subCategory": "Súp hầm",
    "icon": "🥣",
    "energy": 75,
    "health": 33,
    "sellPrice": 100,
    "source": "Thư từ Clint khi đạt 3 Tim tình bạn",
    "ingredients": [
      {
        "name": "Tảo lục",
        "nameEn": "Green Algae",
        "count": 4,
        "iconUrl": "assets/icons/ing_green_algae.png"
      }
    ],
    "buffs": [],
    "desc": "Bát súp tảo nhớt đặc trưng của những thợ lặn đầm lầy.",
    "tips": "Tận dụng lượng lớn tảo xanh rơi ra khi câu cá hoặc đi mỏ.",
    "wikiFile": "Algae_Soup.png",
    "imageUrl": "assets/icons/algae_soup.png",
    "localImageUrl": "assets/icons/algae_soup.png"
  },
  {
    "id": "pale_broth",
    "name": "Nước Dùng Rêu Trắng",
    "nameEn": "Pale Broth",
    "category": "cooking",
    "subCategory": "Súp hầm",
    "icon": "🥣",
    "energy": 125,
    "health": 56,
    "sellPrice": 150,
    "source": "Thư từ Marnie khi đạt 3 Tim tình bạn",
    "ingredients": [
      {
        "name": "Tảo trắng",
        "nameEn": "White Algae",
        "count": 2,
        "iconUrl": "assets/icons/ing_white_algae.png"
      }
    ],
    "buffs": [],
    "desc": "Nước dùng trong vắt thanh nhã từ loại tảo trắng hiếm gặp trong hang sâu.",
    "tips": "Hồi máu và năng lượng khá ổn.",
    "wikiFile": "Pale_Broth.png",
    "imageUrl": "assets/icons/pale_broth.png",
    "localImageUrl": "assets/icons/pale_broth.png"
  },
  {
    "id": "plum_pudding",
    "name": "Pudding Mận Rừng",
    "nameEn": "Plum Pudding",
    "category": "cooking",
    "subCategory": "Tráng miệng",
    "icon": "🍮",
    "energy": 175,
    "health": 78,
    "sellPrice": 260,
    "source": "Kênh The Queen of Sauce (Ngày 7 Mùa Đông, Năm 1)",
    "ingredients": [
      {
        "name": "Mận rừng",
        "nameEn": "Wild Plum",
        "count": 2,
        "iconUrl": "assets/icons/ing_wild_plum.png"
      },
      {
        "name": "Bột mì",
        "nameEn": "Wheat Flour",
        "count": 1,
        "iconUrl": "assets/icons/ing_wheat_flour.png"
      },
      {
        "name": "Đường",
        "nameEn": "Sugar",
        "count": 1,
        "iconUrl": "assets/icons/ing_sugar.png"
      }
    ],
    "buffs": [],
    "desc": "Bánh pudding mận truyền thống đậm màu tím lãng mạn.",
    "tips": "Món quà yêu thích của cô bé Jas.",
    "wikiFile": "Plum_Pudding.png",
    "imageUrl": "assets/icons/plum_pudding.png",
    "localImageUrl": "assets/icons/plum_pudding.png"
  },
  {
    "id": "artichoke_dip",
    "name": "Sốt Atiso Béo Ngậy",
    "nameEn": "Artichoke Dip",
    "category": "cooking",
    "subCategory": "Món sốt chấm",
    "icon": "🫕",
    "energy": 100,
    "health": 45,
    "sellPrice": 210,
    "source": "Kênh The Queen of Sauce (Ngày 28 Mùa Thu, Năm 1)",
    "ingredients": [
      {
        "name": "Bông Atiso",
        "nameEn": "Artichoke",
        "count": 1,
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Sữa tươi",
        "nameEn": "Milk",
        "count": 1,
        "iconUrl": "assets/icons/ing_milk.png"
      }
    ],
    "buffs": [],
    "desc": "Sốt chấm phô mai atiso béo ngậy ăn kèm bánh quy giòn.",
    "tips": "Nấu nhanh chóng vào mùa thu.",
    "wikiFile": "Artichoke_Dip.png",
    "imageUrl": "assets/icons/artichoke_dip.png",
    "localImageUrl": "assets/icons/artichoke_dip.png"
  },
  {
    "id": "stir_fry",
    "name": "Món Xào Ngũ Sắc",
    "nameEn": "Stir Fry",
    "category": "cooking",
    "subCategory": "Món xào chay",
    "icon": "🥘",
    "energy": 135,
    "health": 60,
    "sellPrice": 335,
    "source": "Kênh The Queen of Sauce (Ngày 7 Mùa Xuân, Năm 1)",
    "ingredients": [
      {
        "name": "Cà rốt trong hang",
        "nameEn": "Cave Carrot",
        "count": 1,
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Nấm thường",
        "nameEn": "Common Mushroom",
        "count": 1,
        "iconUrl": "assets/icons/ing_common_mushroom.png"
      },
      {
        "name": "Cải xoăn",
        "nameEn": "Kale",
        "count": 1,
        "iconUrl": "assets/icons/ing_kale.png"
      },
      {
        "name": "Dầu ăn",
        "nameEn": "Oil",
        "count": 1,
        "iconUrl": "assets/icons/ing_oil.png"
      }
    ],
    "buffs": [],
    "desc": "Rau xanh giòn ngọt xào lửa lớn giữ trọn vị tươi mới.",
    "tips": "Nhiều dân làng thích món ăn này.",
    "wikiFile": "Stir_Fry.png",
    "imageUrl": "assets/icons/stir_fry.png",
    "localImageUrl": "assets/icons/stir_fry.png"
  },
  {
    "id": "roasted_hazelnuts",
    "name": "Hạt Dẻ Rang Muối Bơ",
    "nameEn": "Roasted Hazelnuts",
    "category": "cooking",
    "subCategory": "Món ăn nhẹ",
    "icon": "🌰",
    "energy": 175,
    "health": 78,
    "sellPrice": 270,
    "source": "Kênh The Queen of Sauce (Ngày 28 Mùa Hè, Năm 2)",
    "ingredients": [
      {
        "name": "Hạt phỉ",
        "nameEn": "Hazelnut",
        "count": 3,
        "iconUrl": "assets/icons/ing_hazelnut.png"
      }
    ],
    "buffs": [],
    "desc": "Hạt dẻ rang nổ lách tách thơm lừng góc bếp chiều thu.",
    "tips": "Món quà Yêu Thích Cực Độ của Kent.",
    "wikiFile": "Roasted_Hazelnuts.png",
    "imageUrl": "assets/icons/roasted_hazelnuts.png",
    "localImageUrl": "assets/icons/roasted_hazelnuts.png"
  },
  {
    "id": "pumpkin_pie",
    "name": "Bánh Nướng Bí Ngô",
    "nameEn": "Pumpkin Pie",
    "category": "cooking",
    "subCategory": "Bánh nướng mùa thu",
    "icon": "🥧",
    "energy": 225,
    "health": 101,
    "sellPrice": 385,
    "source": "Kênh The Queen of Sauce (Ngày 21 Mùa Đông, Năm 1)",
    "ingredients": [
      {
        "name": "Bí ngô Pumpkin",
        "nameEn": "Pumpkin",
        "count": 1,
        "iconUrl": "assets/icons/item_pumpkin.png"
      },
      {
        "name": "Bột mì",
        "nameEn": "Wheat Flour",
        "count": 1,
        "iconUrl": "assets/icons/ing_wheat_flour.png"
      },
      {
        "name": "Sữa tươi",
        "nameEn": "Milk",
        "count": 1,
        "iconUrl": "assets/icons/ing_milk.png"
      },
      {
        "name": "Đường",
        "nameEn": "Sugar",
        "count": 1,
        "iconUrl": "assets/icons/ing_sugar.png"
      }
    ],
    "buffs": [],
    "desc": "Chiếc bánh bí ngô quế thơm nồng nàn không thể thiếu trong lễ hội mùa gặt.",
    "tips": "Món quà yêu thích của Marnie!",
    "wikiFile": "Pumpkin_Pie.png",
    "imageUrl": "assets/icons/pumpkin_pie.png",
    "localImageUrl": "assets/icons/pumpkin_pie.png"
  },
  {
    "id": "radish_salad",
    "name": "Salad Củ Cải Cay Giòn",
    "nameEn": "Radish Salad",
    "category": "cooking",
    "subCategory": "Món khai vị",
    "icon": "🥗",
    "energy": 200,
    "health": 90,
    "sellPrice": 300,
    "source": "Kênh The Queen of Sauce (Ngày 21 Mùa Xuân, Năm 1)",
    "ingredients": [
      {
        "name": "Dầu ăn",
        "nameEn": "Oil",
        "count": 1,
        "iconUrl": "assets/icons/ing_oil.png"
      },
      {
        "name": "Dấm",
        "nameEn": "Vinegar",
        "count": 1,
        "iconUrl": "assets/icons/ing_vinegar.png"
      },
      {
        "name": "Củ cải đỏ",
        "nameEn": "Radish",
        "count": 1,
        "iconUrl": "assets/icons/ing_radish.png"
      }
    ],
    "buffs": [],
    "desc": "Vị cay the kích thích vị giác của củ cải thái lát mỏng trộn dầu giấm.",
    "tips": "Rất ngon miệng và bổ dưỡng.",
    "wikiFile": "Radish_Salad.png",
    "imageUrl": "assets/icons/radish_salad.png",
    "localImageUrl": "assets/icons/radish_salad.png"
  },
  {
    "id": "fruit_salad",
    "name": "Salad Trái Cây Nhiệt Đới",
    "nameEn": "Fruit Salad",
    "category": "cooking",
    "subCategory": "Tráng miệng trái cây",
    "icon": "🍓",
    "energy": 263,
    "health": 118,
    "sellPrice": 450,
    "source": "Kênh The Queen of Sauce (Ngày 7 Mùa Thu, Năm 2)",
    "ingredients": [
      {
        "name": "Quả việt quất Blueberry",
        "nameEn": "Blueberry",
        "count": 1,
        "iconUrl": "assets/icons/item_blueberry.png"
      },
      {
        "name": "Dưa lưới Melon",
        "nameEn": "Melon",
        "count": 1,
        "iconUrl": "assets/icons/item_melon.png"
      },
      {
        "name": "Quả mơ Apricot",
        "nameEn": "Apricot",
        "count": 1,
        "iconUrl": "assets/icons/item_apricot.png"
      }
    ],
    "buffs": [],
    "desc": "Tô trái cây ngọt mát với những quả dâu mọng nước tươi hái từ vườn.",
    "tips": "Món quà Yêu Thích Cực Độ của Haley!",
    "wikiFile": "Fruit_Salad.png",
    "imageUrl": "assets/icons/fruit_salad.png",
    "localImageUrl": "assets/icons/fruit_salad.png"
  },
  {
    "id": "blackberry_cobbler",
    "name": "Bánh Nướng Dâu Đen",
    "nameEn": "Blackberry Cobbler",
    "category": "cooking",
    "subCategory": "Bánh nướng trái cây",
    "icon": "🥧",
    "energy": 175,
    "health": 78,
    "sellPrice": 260,
    "source": "Kênh The Queen of Sauce (Ngày 14 Mùa Thu, Năm 2)",
    "ingredients": [
      {
        "name": "Quả dâu đen Blackberry",
        "nameEn": "Blackberry",
        "count": 2,
        "iconUrl": "assets/icons/item_blackberry.png"
      },
      {
        "name": "Đường",
        "nameEn": "Sugar",
        "count": 1,
        "iconUrl": "assets/icons/ing_sugar.png"
      },
      {
        "name": "Bột mì",
        "nameEn": "Wheat Flour",
        "count": 1,
        "iconUrl": "assets/icons/ing_wheat_flour.png"
      }
    ],
    "buffs": [],
    "desc": "Vỏ bánh giòn xốp rưới đẫm nước sốt dâu đen tím sẫm ngào đường.",
    "tips": "Món quà Yêu Thích Cực Độ của Abigail!",
    "wikiFile": "Blackberry_Cobbler.png",
    "imageUrl": "assets/icons/blackberry_cobbler.png",
    "localImageUrl": "assets/icons/blackberry_cobbler.png"
  },
  {
    "id": "cranberry_candy",
    "name": "Kẹo Dẻo Nam Việt Quất",
    "nameEn": "Cranberry Candy",
    "category": "cooking",
    "subCategory": "Kẹo ngọt",
    "icon": "🍬",
    "energy": 125,
    "health": 56,
    "sellPrice": 175,
    "source": "Kênh The Queen of Sauce (Ngày 28 Mùa Đông, Năm 1)",
    "ingredients": [
      {
        "name": "Nam việt quất Cranberries",
        "nameEn": "Cranberries",
        "count": 1,
        "iconUrl": "assets/icons/item_cranberries.png"
      },
      {
        "name": "Quả táo Apple",
        "nameEn": "Apple",
        "count": 1,
        "iconUrl": "assets/icons/item_apple.png"
      },
      {
        "name": "Đường",
        "nameEn": "Sugar",
        "count": 1,
        "iconUrl": "assets/icons/ing_sugar.png"
      }
    ],
    "buffs": [],
    "desc": "Viên kẹo dẻo chua ngọt hương táo và việt quất trẻ con rất mê.",
    "tips": "Món quà yêu thích tuyệt đối của cậu bé Vincent.",
    "wikiFile": "Cranberry_Candy.png",
    "imageUrl": "assets/icons/cranberry_candy.png",
    "localImageUrl": "assets/icons/cranberry_candy.png"
  },
  {
    "id": "bruschetta",
    "name": "Bánh Mì Nướng Bơ Tỏi Cà Chua",
    "nameEn": "Bruschetta",
    "category": "cooking",
    "subCategory": "Món khai vị Ý",
    "icon": "🥖",
    "energy": 113,
    "health": 50,
    "sellPrice": 210,
    "source": "Kênh The Queen of Sauce (Ngày 21 Mùa Đông, Năm 2)",
    "ingredients": [
      {
        "name": "Bánh mì Bread",
        "nameEn": "Bread",
        "count": 1,
        "iconUrl": "assets/icons/bread.png"
      },
      {
        "name": "Dầu ăn",
        "nameEn": "Oil",
        "count": 1,
        "iconUrl": "assets/icons/ing_oil.png"
      },
      {
        "name": "Cà chua Tomato",
        "nameEn": "Tomato",
        "count": 1,
        "iconUrl": "assets/icons/item_tomato.png"
      }
    ],
    "buffs": [],
    "desc": "Lát bánh mì giòn tan phết dầu ô liu và cà chua xắt hạt lựu thơm nức.",
    "tips": "Hương vị ẩm thực Địa Trung Hải tinh tế.",
    "wikiFile": "Bruschetta.png",
    "imageUrl": "assets/icons/bruschetta.png",
    "localImageUrl": "assets/icons/bruschetta.png"
  },
  {
    "id": "coleslaw",
    "name": "Salad Bắp Cải Trộn Sốt",
    "nameEn": "Coleslaw",
    "category": "cooking",
    "subCategory": "Salad trộn",
    "icon": "🥗",
    "energy": 213,
    "health": 95,
    "sellPrice": 345,
    "source": "Kênh The Queen of Sauce (Ngày 14 Mùa Xuân, Năm 1)",
    "ingredients": [
      {
        "name": "Bắp cải đỏ Red Cabbage",
        "nameEn": "Red Cabbage",
        "count": 1,
        "iconUrl": "assets/icons/item_red_cabbage.png"
      },
      {
        "name": "Dấm",
        "nameEn": "Vinegar",
        "count": 1,
        "iconUrl": "assets/icons/ing_vinegar.png"
      },
      {
        "name": "Sốt Mayonnaise",
        "nameEn": "Mayonnaise",
        "count": 1,
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "buffs": [],
    "desc": "Món bắp cải bào sợi giòn rụm đượm sốt mayonnaise chua ngọt.",
    "tips": "Cung cấp lượng lớn thể lực.",
    "wikiFile": "Coleslaw.png",
    "imageUrl": "assets/icons/coleslaw.png",
    "localImageUrl": "assets/icons/coleslaw.png"
  },
  {
    "id": "fiddlehead_risotto",
    "name": "Cơm Ý Dương Xỉ Non",
    "nameEn": "Fiddlehead Risotto",
    "category": "cooking",
    "subCategory": "Món cơm cao cấp",
    "icon": "🍚",
    "energy": 225,
    "health": 101,
    "sellPrice": 350,
    "source": "Kênh The Queen of Sauce (Ngày 28 Mùa Thu, Năm 2)",
    "ingredients": [
      {
        "name": "Đọt dương xỉ non Fiddlehead Fern",
        "nameEn": "Fiddlehead Fern",
        "count": 1,
        "iconUrl": "assets/icons/item_fiddlehead_fern.png"
      },
      {
        "name": "Tỏi Garlic",
        "nameEn": "Garlic",
        "count": 1,
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Dầu ăn",
        "nameEn": "Oil",
        "count": 1,
        "iconUrl": "assets/icons/ing_oil.png"
      }
    ],
    "buffs": [],
    "desc": "Cơm Ý dẻo thơm nấu cùng những đọt dương xỉ non hái trong Rừng Bí Mật.",
    "tips": "Hái dương xỉ trong Secret Woods vào mùa hè.",
    "wikiFile": "Fiddlehead_Risotto.png",
    "imageUrl": "assets/icons/fiddlehead_risotto.png",
    "localImageUrl": "assets/icons/fiddlehead_risotto.png"
  },
  {
    "id": "poppyseed_muffin",
    "name": "Bánh Muffin Hạt Anh Túc",
    "nameEn": "Poppyseed Muffin",
    "category": "cooking",
    "subCategory": "Bánh ngọt nướng",
    "icon": "🧁",
    "energy": 150,
    "health": 67,
    "sellPrice": 250,
    "source": "Kênh The Queen of Sauce (Ngày 7 Mùa Đông, Năm 2)",
    "ingredients": [
      {
        "name": "Hoa Anh Túc",
        "nameEn": "Poppy",
        "count": 1,
        "iconUrl": "assets/icons/ing_poppy.png"
      },
      {
        "name": "Bột mì",
        "nameEn": "Wheat Flour",
        "count": 1,
        "iconUrl": "assets/icons/ing_wheat_flour.png"
      },
      {
        "name": "Đường",
        "nameEn": "Sugar",
        "count": 1,
        "iconUrl": "assets/icons/ing_sugar.png"
      }
    ],
    "buffs": [],
    "desc": "Chiếc bánh muffin nở xốp điểm xuyết những hạt anh túc thơm bùi kỳ lạ.",
    "tips": "Món quà yêu thích của cô gái tóc vàng Leah.",
    "wikiFile": "Poppyseed_Muffin.png",
    "imageUrl": "assets/icons/poppyseed_muffin.png",
    "localImageUrl": "assets/icons/poppyseed_muffin.png"
  },
  {
    "id": "chowder",
    "name": "Súp Hải Sản Ngao Sò Chowder",
    "nameEn": "Chowder",
    "category": "cooking",
    "subCategory": "Súp hải sản",
    "icon": "🥣",
    "energy": 225,
    "health": 101,
    "sellPrice": 135,
    "source": "Thư từ Willy khi đạt 3 Tim tình bạn",
    "ingredients": [
      {
        "name": "Nghêu",
        "nameEn": "Clam",
        "count": 1,
        "iconUrl": "assets/icons/ing_clam.png"
      },
      {
        "name": "Sữa tươi",
        "nameEn": "Milk",
        "count": 1,
        "iconUrl": "assets/icons/ing_milk.png"
      }
    ],
    "buffs": [
      {
        "stat": "Câu cá (Fishing)",
        "value": "+1",
        "duration": "16 phút 47 giây"
      }
    ],
    "desc": "Nồi súp ngao kem sữa thơm ngậy, cho thời gian buff câu cá SIÊU DÀI gần 17 phút!",
    "tips": "Thời gian buff lâu nhất trong các món ăn câu cá cơ bản.",
    "wikiFile": "Chowder.png",
    "imageUrl": "assets/icons/chowder.png",
    "localImageUrl": "assets/icons/chowder.png"
  },
  {
    "id": "fish_stew",
    "name": "Lẩu Hải Sản Hầm Củ Quả",
    "nameEn": "Fish Stew",
    "category": "cooking",
    "subCategory": "Lẩu hải sản",
    "icon": "🍲",
    "energy": 225,
    "health": 101,
    "sellPrice": 175,
    "source": "Thư từ Willy khi đạt 7 Tim tình bạn",
    "ingredients": [
      {
        "name": "Tôm sông",
        "nameEn": "Crayfish",
        "count": 1,
        "iconUrl": "assets/icons/ing_crayfish.png"
      },
      {
        "name": "Vẹm",
        "nameEn": "Mussel",
        "count": 1,
        "iconUrl": "assets/icons/ing_mussel.png"
      },
      {
        "name": "Ốc Periwinkle",
        "nameEn": "Periwinkle",
        "count": 1,
        "iconUrl": "assets/icons/ing_periwinkle.png"
      },
      {
        "name": "Cà chua Tomato",
        "nameEn": "Tomato",
        "count": 1,
        "iconUrl": "assets/icons/item_tomato.png"
      }
    ],
    "buffs": [
      {
        "stat": "Câu cá (Fishing)",
        "value": "+3",
        "duration": "16 phút 47 giây"
      }
    ],
    "desc": "Đại tiệc hải sản từ lồng bẫy Crab Pot! Tăng ngay +3 Câu Cá với thời gian buff kéo dài gần 17 phút.",
    "tips": "Một trong những món buff câu cá tốt nhất và bền bỉ nhất trò chơi.",
    "wikiFile": "Fish_Stew.png",
    "imageUrl": "assets/icons/fish_stew.png",
    "localImageUrl": "assets/icons/fish_stew.png"
  },
  {
    "id": "escargot",
    "name": "Ốc Sên Xào Bơ Tỏi Kiểu Pháp",
    "nameEn": "Escargot",
    "category": "cooking",
    "subCategory": "Món Pháp cao cấp",
    "icon": "🐌",
    "energy": 225,
    "health": 101,
    "sellPrice": 125,
    "source": "Thư từ Willy khi đạt 5 Tim tình bạn",
    "ingredients": [
      {
        "name": "Ốc sên",
        "nameEn": "Snail",
        "count": 1,
        "iconUrl": "assets/icons/ing_snail.png"
      },
      {
        "name": "Tỏi Garlic",
        "nameEn": "Garlic",
        "count": 1,
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "buffs": [
      {
        "stat": "Câu cá (Fishing)",
        "value": "+2",
        "duration": "16 phút 47 giây"
      }
    ],
    "desc": "Món ốc bơ tỏi thơm lừng trứ danh, thịt ốc giòn sần sật.",
    "tips": "Ốc sên rất dễ kiếm từ bẫy Crab Pot đặt trong hồ nước ngọt.",
    "wikiFile": "Escargot.png",
    "imageUrl": "assets/icons/escargot.png",
    "localImageUrl": "assets/icons/escargot.png"
  },
  {
    "id": "lobster_bisque",
    "name": "Súp Kem Tôm Hùm Hoàng Gia",
    "nameEn": "Lobster Bisque",
    "category": "cooking",
    "subCategory": "Món Thần Thánh Câu Cá",
    "icon": "🦞",
    "energy": 225,
    "health": 101,
    "sellPrice": 205,
    "source": "Kênh The Queen of Sauce (Ngày 14 Mùa Đông, Năm 2) hoặc Thư từ Willy",
    "ingredients": [
      {
        "name": "Tôm hùm Lobster",
        "nameEn": "Lobster",
        "count": 1,
        "iconUrl": "assets/icons/item_lobster.png"
      },
      {
        "name": "Sữa tươi",
        "nameEn": "Milk",
        "count": 1,
        "iconUrl": "assets/icons/ing_milk.png"
      }
    ],
    "buffs": [
      {
        "stat": "Câu cá (Fishing)",
        "value": "+3",
        "duration": "16 phút 47 giây"
      },
      {
        "stat": "Năng lượng tối đa",
        "value": "+50",
        "duration": "16 phút 47 giây"
      }
    ],
    "desc": "Bát súp kem tôm hùm thượng hạng, vừa tăng +3 Câu cá vừa mở rộng thể lực trong thời gian dài kỷ lục!",
    "tips": "Món ăn yêu thích tuyệt đối của Willy.",
    "wikiFile": "Lobster_Bisque.png",
    "imageUrl": "assets/icons/lobster_bisque.png",
    "localImageUrl": "assets/icons/lobster_bisque.png"
  },
  {
    "id": "maple_bar",
    "name": "Bánh Quẩy Nhựa Phong",
    "nameEn": "Maple Bar",
    "category": "cooking",
    "subCategory": "Bánh ngọt đa năng",
    "icon": "🥖",
    "energy": 225,
    "health": 101,
    "sellPrice": 300,
    "source": "Kênh The Queen of Sauce (Ngày 14 Mùa Hè, Năm 2)",
    "ingredients": [
      {
        "name": "Siro cây phong",
        "nameEn": "Maple Syrup",
        "count": 1,
        "iconUrl": "assets/icons/ing_maple_syrup.png"
      },
      {
        "name": "Đường",
        "nameEn": "Sugar",
        "count": 1,
        "iconUrl": "assets/icons/ing_sugar.png"
      },
      {
        "name": "Bột mì",
        "nameEn": "Wheat Flour",
        "count": 1,
        "iconUrl": "assets/icons/ing_wheat_flour.png"
      }
    ],
    "buffs": [
      {
        "stat": "Canh tác (Farming)",
        "value": "+1",
        "duration": "16 phút 47 giây"
      },
      {
        "stat": "Câu cá (Fishing)",
        "value": "+1",
        "duration": "16 phút 47 giây"
      },
      {
        "stat": "Khai mỏ (Mining)",
        "value": "+1",
        "duration": "16 phút 47 giây"
      }
    ],
    "desc": "Bánh quẩy ngọt phủ siro phong béo ngọt, tăng toàn diện các kỹ năng cơ bản.",
    "tips": "Món quà yêu thích của Sam.",
    "wikiFile": "Maple_Bar.png",
    "imageUrl": "assets/icons/maple_bar.png",
    "localImageUrl": "assets/icons/maple_bar.png"
  },
  {
    "id": "crab_cakes",
    "name": "Chả Cua Biển Áp Chảo",
    "nameEn": "Crab Cakes",
    "category": "cooking",
    "subCategory": "Vua Tốc Độ Cả Ngày",
    "icon": "🦀",
    "energy": 225,
    "health": 101,
    "sellPrice": 275,
    "source": "Kênh The Queen of Sauce (Ngày 21 Mùa Thu, Năm 2)",
    "ingredients": [
      {
        "name": "Cua",
        "nameEn": "Crab",
        "count": 1,
        "iconUrl": "assets/icons/ing_crab.png"
      },
      {
        "name": "Bột mì",
        "nameEn": "Wheat Flour",
        "count": 1,
        "iconUrl": "assets/icons/ing_wheat_flour.png"
      },
      {
        "name": "Trứng gà",
        "nameEn": "Egg",
        "count": 1,
        "iconUrl": "assets/icons/ing_egg.png"
      },
      {
        "name": "Dầu ăn",
        "nameEn": "Oil",
        "count": 1,
        "iconUrl": "assets/icons/ing_oil.png"
      }
    ],
    "buffs": [
      {
        "stat": "Tốc độ chạy (Speed)",
        "value": "+1",
        "duration": "30 PHÚT (GẦN CẢ NGÀY!)"
      },
      {
        "stat": "Phòng thủ (Defense)",
        "value": "+1",
        "duration": "30 PHÚT"
      }
    ],
    "desc": "MÓN TĂNG TỐC KÉO DÀI NHẤT GAME! Một miếng chả cua duy trì tốc độ và giáp trong suốt cả ngày làm việc.",
    "tips": "Rơi ra khi hạ gục cua Iridium Crab trong Skull Cavern.",
    "wikiFile": "Crab_Cakes.png",
    "imageUrl": "assets/icons/crab_cakes.png",
    "localImageUrl": "assets/icons/crab_cakes.png"
  },
  {
    "id": "shrimp_cocktail",
    "name": "Cocktail Tôm Sốt Cay",
    "nameEn": "Shrimp Cocktail",
    "category": "cooking",
    "subCategory": "Khai vị cao cấp",
    "icon": "🍤",
    "energy": 225,
    "health": 101,
    "sellPrice": 160,
    "source": "Kênh The Queen of Sauce (Ngày 28 Mùa Đông, Năm 2)",
    "ingredients": [
      {
        "name": "Cà chua Tomato",
        "nameEn": "Tomato",
        "count": 1,
        "iconUrl": "assets/icons/item_tomato.png"
      },
      {
        "name": "Tôm sú",
        "nameEn": "Shrimp",
        "count": 1,
        "iconUrl": "assets/icons/ing_shrimp.png"
      },
      {
        "name": "Cải ngựa hoang dã Wild Horseradish",
        "nameEn": "Wild Horseradish",
        "count": 1,
        "iconUrl": "assets/icons/item_wild_horseradish.png"
      }
    ],
    "buffs": [
      {
        "stat": "Câu cá (Fishing)",
        "value": "+1",
        "duration": "10 phút 2 giây"
      },
      {
        "stat": "May mắn (Luck)",
        "value": "+1",
        "duration": "10 phút 2 giây"
      }
    ],
    "desc": "Tôm bóc nõn giòn ngọt chấm sốt cà chua mù tạt cay nồng kích thích.",
    "tips": "Vừa tăng may mắn vừa tăng trình độ câu cá.",
    "wikiFile": "Shrimp_Cocktail.png",
    "imageUrl": "assets/icons/shrimp_cocktail.png",
    "localImageUrl": "assets/icons/shrimp_cocktail.png"
  },
  {
    "id": "ginger_ale",
    "name": "Bia Gừng Sủi Bọt Sa Mạc",
    "nameEn": "Ginger Ale",
    "category": "cooking",
    "subCategory": "Đồ uống Đảo Gừng",
    "icon": "🍺",
    "energy": 25,
    "health": 11,
    "sellPrice": 200,
    "source": "Mua từ Dwarf ở Volcano Dungeon (Đảo Gừng - 1,000g)",
    "ingredients": [
      {
        "name": "Củ gừng",
        "nameEn": "Ginger",
        "count": 3,
        "iconUrl": "assets/icons/ing_ginger.png"
      },
      {
        "name": "Đường",
        "nameEn": "Sugar",
        "count": 1,
        "iconUrl": "assets/icons/ing_sugar.png"
      }
    ],
    "buffs": [
      {
        "stat": "May mắn (Luck)",
        "value": "+1",
        "duration": "5 phút"
      }
    ],
    "desc": "Nước uống có ga từ gừng tươi đảo ngọc! VÌ LÀ ĐỒ UỐNG NÊN CÓ THỂ UỐNG CÙNG LÚC VỚI THỨC ĂN MAY MẮN (Lucky Lunch) ĐỂ ĐẠT +4 MAY MẮN!",
    "tips": "Kết hợp Ginger Ale (+1 Luck) + Lucky Lunch (+3 Luck) = +4 Luck tối thượng!",
    "wikiFile": "Ginger_Ale.png",
    "imageUrl": "assets/icons/ginger_ale.png",
    "localImageUrl": "assets/icons/ginger_ale.png"
  },
  {
    "id": "banana_pudding",
    "name": "Pudding Chuối Kem Tươi",
    "nameEn": "Banana Pudding",
    "category": "cooking",
    "subCategory": "Món tráng miệng Đảo Gừng",
    "icon": "🍌",
    "energy": 125,
    "health": 56,
    "sellPrice": 260,
    "source": "Mua từ Island Trader (Đổi 30 Bone Fragments)",
    "ingredients": [
      {
        "name": "Quả chuối Banana",
        "nameEn": "Banana",
        "count": 1,
        "iconUrl": "assets/icons/item_banana.png"
      },
      {
        "name": "Sữa tươi",
        "nameEn": "Milk",
        "count": 1,
        "iconUrl": "assets/icons/ing_milk.png"
      },
      {
        "name": "Đường",
        "nameEn": "Sugar",
        "count": 1,
        "iconUrl": "assets/icons/ing_sugar.png"
      }
    ],
    "buffs": [
      {
        "stat": "Khai mỏ (Mining)",
        "value": "+1",
        "duration": "5 phút 1 giây"
      },
      {
        "stat": "May mắn (Luck)",
        "value": "+1",
        "duration": "5 phút 1 giây"
      },
      {
        "stat": "Phòng thủ (Defense)",
        "value": "+1",
        "duration": "5 phút 1 giây"
      }
    ],
    "desc": "Món bánh chuối đảo ngọc thơm lừng mùi bơ sữa và ngọt ngào vị hoa quả nhiệt đới.",
    "tips": "Rất ngon và đem lại 3 loại buff cân bằng.",
    "wikiFile": "Banana_Pudding.png",
    "imageUrl": "assets/icons/banana_pudding.png",
    "localImageUrl": "assets/icons/banana_pudding.png"
  },
  {
    "id": "mango_sticky_rice",
    "name": "Xôi Xoài Nước Cốt Dừa",
    "nameEn": "Mango Sticky Rice",
    "category": "cooking",
    "subCategory": "Món ngọt Đảo Gừng",
    "icon": "🥭",
    "energy": 113,
    "health": 50,
    "sellPrice": 250,
    "source": "Thư từ cậu bé rừng xanh Leo khi đạt 7 Tim tình bạn",
    "ingredients": [
      {
        "name": "Xoài chín Mango",
        "nameEn": "Mango",
        "count": 1,
        "iconUrl": "assets/icons/item_mango.png"
      },
      {
        "name": "Quả dừa Coconut",
        "nameEn": "Coconut",
        "count": 1,
        "iconUrl": "assets/icons/item_coconut.png"
      },
      {
        "name": "Gạo",
        "nameEn": "Rice",
        "count": 1,
        "iconUrl": "assets/icons/ing_rice.png"
      }
    ],
    "buffs": [
      {
        "stat": "Phòng thủ (Defense)",
        "value": "+3",
        "duration": "5 phút 1 giây"
      }
    ],
    "desc": "Món xôi dẻo thơm ngậy ngập sốt cốt dừa và những lát xoài vàng ươm mọng nước.",
    "tips": "Tăng giáp phòng ngự siêu khỏe (+3 Defense) khi đi săn dung nham Volcano Dungeon.",
    "wikiFile": "Mango_Sticky_Rice.png",
    "imageUrl": "assets/icons/mango_sticky_rice.png",
    "localImageUrl": "assets/icons/mango_sticky_rice.png"
  },
  {
    "id": "poi",
    "name": "Món Khoai Môn Nghiền Poi",
    "nameEn": "Poi",
    "category": "cooking",
    "subCategory": "Đặc sản Đảo Gừng",
    "icon": "🥣",
    "energy": 175,
    "health": 78,
    "sellPrice": 400,
    "source": "Thư từ cậu bé Leo khi đạt 3 Tim tình bạn",
    "ingredients": [
      {
        "name": "Khoai môn",
        "nameEn": "Taro Root",
        "count": 4,
        "iconUrl": "assets/icons/ing_taro_root.png"
      }
    ],
    "buffs": [],
    "desc": "Món ăn truyền thống của thổ dân đảo nhiệt đới từ củ khoai môn hấp chín nghiền mịn.",
    "tips": "Món quà yêu thích tuyệt đối của Leo!",
    "wikiFile": "Poi.png",
    "imageUrl": "assets/icons/poi.png",
    "localImageUrl": "assets/icons/poi.png"
  },
  {
    "id": "tropical_curry",
    "name": "Cà Ri Thơm Nhiệt Đới",
    "nameEn": "Tropical Curry",
    "category": "cooking",
    "subCategory": "Đặc sản Đảo Gừng",
    "icon": "🍛",
    "energy": 150,
    "health": 67,
    "sellPrice": 500,
    "source": "Mua từ Quán bar của Gus trên Island Resort (2,000g)",
    "ingredients": [
      {
        "name": "Quả dừa Coconut",
        "nameEn": "Coconut",
        "count": 1,
        "iconUrl": "assets/icons/item_coconut.png"
      },
      {
        "name": "Dứa nhiệt đới",
        "nameEn": "Pineapple",
        "count": 1,
        "iconUrl": "assets/icons/ing_pineapple.png"
      },
      {
        "name": "Ớt cay Hot Pepper",
        "nameEn": "Hot Pepper",
        "count": 1,
        "iconUrl": "assets/icons/item_hot_pepper.png"
      }
    ],
    "buffs": [
      {
        "stat": "Hái lượm (Foraging)",
        "value": "+4",
        "duration": "5 phút 1 giây"
      }
    ],
    "desc": "Bát cà ri đựng trong quả dừa với vị cay ngọt ngào quyến rũ, tăng +4 Foraging kỷ lục!",
    "tips": "Món quà yêu thích của Pháp sư và Gus.",
    "wikiFile": "Tropical_Curry.png",
    "imageUrl": "assets/icons/tropical_curry.png",
    "localImageUrl": "assets/icons/tropical_curry.png"
  },
  {
    "id": "squid_ink_ravioli",
    "name": "Mì Ý Mực Đen Thượng Hạng",
    "nameEn": "Squid Ink Ravioli",
    "category": "cooking",
    "subCategory": "Món Độc Nhất Vô Nhị",
    "icon": "🥟",
    "energy": 125,
    "health": 56,
    "sellPrice": 150,
    "source": "Đạt cấp độ Khai Mỏ (Mining) Cấp 9",
    "ingredients": [
      {
        "name": "Mực đen",
        "nameEn": "Squid Ink",
        "count": 1,
        "iconUrl": "assets/icons/ing_squid_ink.png"
      },
      {
        "name": "Bột mì",
        "nameEn": "Wheat Flour",
        "count": 1,
        "iconUrl": "assets/icons/ing_wheat_flour.png"
      },
      {
        "name": "Cà chua Tomato",
        "nameEn": "Tomato",
        "count": 1,
        "iconUrl": "assets/icons/item_tomato.png"
      }
    ],
    "buffs": [
      {
        "stat": "Khai mỏ (Mining)",
        "value": "+1",
        "duration": "4 phút 39 giây"
      },
      {
        "stat": "Kháng hiệu ứng xấu (Squid Ink Immunity)",
        "value": "MIỄN NHIỄM BÙA ĐỘC",
        "duration": "4 phút 39 giây"
      }
    ],
    "desc": "MÓN ĂN ĐỘC ĐÁO DUY NHẤT: Giúp người chơi hoàn toàn miễn nhiễm với các hiệu ứng khống chế bất lợi (như làm chậm Slimed, cháy Jinx, làm mờ màn hình...)!",
    "tips": "Cực kỳ quý giá khi đối đầu quái vật nguy hiểm trong Skull Cavern và Volcano.",
    "wikiFile": "Squid_Ink_Ravioli.png",
    "imageUrl": "assets/icons/squid_ink_ravioli.png",
    "localImageUrl": "assets/icons/squid_ink_ravioli.png"
  },
  {
    "id": "moss_soup",
    "name": "Súp Rêu Xanh Cổ Thụ (Mới 1.6)",
    "nameEn": "Moss Soup",
    "category": "cooking",
    "subCategory": "Món Mới Bản 1.6",
    "icon": "🥣",
    "version16": true,
    "energy": 300,
    "health": 135,
    "sellPrice": 100,
    "source": "Đạt cấp độ Hái Lượm (Foraging) Cấp 3",
    "ingredients": [
      {
        "name": "Rêu tươi",
        "nameEn": "Moss",
        "count": 20,
        "iconUrl": "assets/icons/ing_moss.png"
      }
    ],
    "buffs": [],
    "desc": "MÓN MỚI CỦA BẢN 1.6! Bát súp sánh đặc nấu từ 20 bó rêu cạo từ thân cây cổ thụ. Khôi phục một lượng máu và thể lực khổng lồ (+300 Năng lượng, +135 Máu) mà không tốn kém nông sản giá trị nào!",
    "tips": "Thu thập rêu hàng loạt vào sự kiện Cơn Mưa Xanh (Green Rain) để nấu dự trữ ăn khi đi mỏ.",
    "wikiFile": "Moss_Soup.png",
    "imageUrl": "assets/icons/moss_soup.png",
    "localImageUrl": "assets/icons/moss_soup.png"
  },
  {
    "id": "sprinkler",
    "name": "Bình Phun Nước Cơ Bản",
    "nameEn": "Sprinkler",
    "category": "crafting",
    "subCategory": "Hệ thống tưới tự động",
    "icon": "🚿",
    "source": "Đạt cấp độ Canh tác (Farming) Cấp 2",
    "ingredients": [
      {
        "name": "Thỏi đồng",
        "count": 1,
        "nameEn": "Copper Bar",
        "iconUrl": "assets/icons/ing_copper_bar.png"
      },
      {
        "name": "Thỏi sắt",
        "count": 1,
        "nameEn": "Iron Bar",
        "iconUrl": "assets/icons/ing_iron_bar.png"
      }
    ],
    "desc": "Tự động tưới 4 ô đất liền kề (trên, dưới, trái, phải) vào mỗi buổi sáng sớm.",
    "tips": "Khởi đầu tuyệt vời giúp bạn đỡ tốn công xách bình tưới nước bằng tay.",
    "wikiFile": "Sprinkler.png",
    "imageUrl": "assets/icons/sprinkler.png",
    "localImageUrl": "assets/icons/sprinkler.png"
  },
  {
    "id": "quality_sprinkler",
    "name": "Bình Phun Nước Chất Lượng Cao",
    "nameEn": "Quality Sprinkler",
    "category": "crafting",
    "subCategory": "Hệ thống tưới tự động",
    "icon": "💧",
    "source": "Đạt cấp độ Canh tác (Farming) Cấp 6",
    "ingredients": [
      {
        "name": "Thỏi sắt",
        "count": 1,
        "nameEn": "Iron Bar",
        "iconUrl": "assets/icons/ing_iron_bar.png"
      },
      {
        "name": "Thỏi vàng",
        "count": 1,
        "nameEn": "Gold Bar",
        "iconUrl": "assets/icons/ing_gold_bar.png"
      },
      {
        "name": "Thạch anh tinh luyện",
        "count": 1,
        "nameEn": "Refined Quartz",
        "iconUrl": "assets/icons/ing_refined_quartz.png"
      }
    ],
    "desc": "Tự động tưới 8 ô đất xung quanh theo hình vuông 3x3 vào mỗi buổi sáng.",
    "tips": "Bình tưới cốt lõi của năm 1 và năm 2, giúp tự động hóa hàng trăm mảnh ruộng.",
    "wikiFile": "Quality_Sprinkler.png",
    "imageUrl": "assets/icons/quality_sprinkler.png",
    "localImageUrl": "assets/icons/quality_sprinkler.png"
  },
  {
    "id": "iridium_sprinkler",
    "name": "Bình Phun Nước Iridium Tối Thượng",
    "nameEn": "Iridium Sprinkler",
    "category": "crafting",
    "subCategory": "Hệ thống tưới tự động",
    "icon": "💎",
    "source": "Đạt cấp độ Canh tác (Farming) Cấp 9",
    "ingredients": [
      {
        "name": "Thỏi vàng",
        "count": 1,
        "nameEn": "Gold Bar",
        "iconUrl": "assets/icons/ing_gold_bar.png"
      },
      {
        "name": "Thỏi Iridium",
        "count": 1,
        "nameEn": "Iridium Bar",
        "iconUrl": "assets/icons/ing_iridium_bar.png"
      },
      {
        "name": "Pin năng lượng",
        "count": 1,
        "nameEn": "Battery Pack",
        "iconUrl": "assets/icons/ing_battery_pack.png"
      }
    ],
    "desc": "ĐỈNH CAO TƯỚI TIÊU: Tưới 24 ô đất xung quanh theo hình vuông 5x5 mỗi sáng!",
    "tips": "Krobus cũng bán 1 cái vào thứ Sáu hàng tuần với giá 10,000g.",
    "wikiFile": "Iridium_Sprinkler.png",
    "imageUrl": "assets/icons/iridium_sprinkler.png",
    "localImageUrl": "assets/icons/iridium_sprinkler.png"
  },
  {
    "id": "scarecrow",
    "name": "Bù Nhìn Rơm Cơ Bản",
    "nameEn": "Scarecrow",
    "category": "crafting",
    "subCategory": "Bảo vệ mùa màng",
    "icon": "🌾",
    "source": "Đạt cấp độ Canh tác (Farming) Cấp 1",
    "ingredients": [
      {
        "name": "Gỗ",
        "count": 50,
        "nameEn": "Wood",
        "iconUrl": "assets/icons/ing_wood.png"
      },
      {
        "name": "Than đá",
        "count": 1,
        "nameEn": "Coal",
        "iconUrl": "assets/icons/ing_coal.png"
      },
      {
        "name": "Sợi gai",
        "count": 20,
        "nameEn": "Fiber",
        "iconUrl": "assets/icons/ing_fiber.png"
      }
    ],
    "desc": "Bảo vệ cây trồng khỏi lũ quạ đen phá hoại trong bán kính 8 ô (vòng tròn đường kính 17 ô bao gồm khoảng 248 ô đất).",
    "tips": "Đặt ở trung tâm các thửa ruộng để bảo vệ toàn diện.",
    "wikiFile": "Scarecrow.png",
    "imageUrl": "assets/icons/scarecrow.png",
    "localImageUrl": "assets/icons/scarecrow.png"
  },
  {
    "id": "deluxe_scarecrow",
    "name": "Đại Bù Nhìn Rơm Hoàng Gia",
    "nameEn": "Deluxe Scarecrow",
    "category": "crafting",
    "subCategory": "Bảo vệ mùa màng",
    "icon": "👑",
    "source": "Nhận thư từ Hội Bù Nhìn sau khi thu thập đủ 8 Rarecrow bí mật",
    "ingredients": [
      {
        "name": "Gỗ",
        "count": 50,
        "nameEn": "Wood",
        "iconUrl": "assets/icons/ing_wood.png"
      },
      {
        "name": "Quặng Iridium",
        "count": 1,
        "nameEn": "Iridium Ore",
        "iconUrl": "assets/icons/item_iridium_ore.png"
      },
      {
        "name": "Sợi gai",
        "count": 40,
        "nameEn": "Fiber",
        "iconUrl": "assets/icons/ing_fiber.png"
      }
    ],
    "desc": "Bảo vệ cây trồng trong bán kính GẤP ĐÔI (16 ô, khoảng 888 ô đất)! Chỉ cần 1 vài chiếc là bao trùm cả nông trại.",
    "tips": "Bù nhìn xịn nhất game.",
    "wikiFile": "Deluxe_Scarecrow.png",
    "imageUrl": "assets/icons/deluxe_scarecrow.png",
    "localImageUrl": "assets/icons/deluxe_scarecrow.png"
  },
  {
    "id": "mayonnaise_machine",
    "name": "Máy Làm Sốt Mayonnaise",
    "nameEn": "Mayonnaise Machine",
    "category": "crafting",
    "subCategory": "Máy chế biến nông sản",
    "icon": "🥚",
    "source": "Đạt cấp độ Canh tác (Farming) Cấp 2",
    "ingredients": [
      {
        "name": "Gỗ",
        "count": 15,
        "nameEn": "Wood",
        "iconUrl": "assets/icons/ing_wood.png"
      },
      {
        "name": "Đá",
        "count": 15,
        "nameEn": "Stone",
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Tinh thể đất",
        "count": 1,
        "nameEn": "Earth Crystal",
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Thỏi đồng",
        "count": 1,
        "nameEn": "Copper Bar",
        "iconUrl": "assets/icons/ing_copper_bar.png"
      }
    ],
    "desc": "Biến trứng gia cầm thành sốt Mayonnaise thơm béo có giá bán cao gấp nhiều lần.",
    "tips": "Trứng lớn (Large Egg) sẽ luôn cho Mayonnaise chất lượng Vàng.",
    "wikiFile": "Mayonnaise_Machine.png",
    "imageUrl": "assets/icons/mayonnaise_machine.png",
    "localImageUrl": "assets/icons/mayonnaise_machine.png"
  },
  {
    "id": "bee_house",
    "name": "Thùng Nuôi Ong Lấy Mật",
    "nameEn": "Bee House",
    "category": "crafting",
    "subCategory": "Máy chế biến nông sản",
    "icon": "🐝",
    "source": "Đạt cấp độ Canh tác (Farming) Cấp 3",
    "ingredients": [
      {
        "name": "Gỗ",
        "count": 40,
        "nameEn": "Wood",
        "iconUrl": "assets/icons/ing_wood.png"
      },
      {
        "name": "Than đá",
        "count": 8,
        "nameEn": "Coal",
        "iconUrl": "assets/icons/ing_coal.png"
      },
      {
        "name": "Thỏi sắt",
        "count": 1,
        "nameEn": "Iron Bar",
        "iconUrl": "assets/icons/ing_iron_bar.png"
      },
      {
        "name": "Siro cây phong",
        "count": 1,
        "nameEn": "Maple Syrup",
        "iconUrl": "assets/icons/ing_maple_syrup.png"
      }
    ],
    "desc": "Sản xuất mật ong ngọt ngào cứ sau mỗi 4 ngày vào mùa xuân, hè và thu.",
    "tips": "Trồng hoa Fairy Rose cạnh tổ ong vào mùa thu để thu về Mật Ong Hoa Tiên bán 952g mỗi hũ!",
    "wikiFile": "Bee_House.png",
    "imageUrl": "assets/icons/bee_house.png",
    "localImageUrl": "assets/icons/bee_house.png"
  },
  {
    "id": "preserves_jar",
    "name": "Hũ Ngâm Chua & Làm Mứt",
    "nameEn": "Preserves Jar",
    "category": "crafting",
    "subCategory": "Máy chế biến nông sản",
    "icon": "🏺",
    "source": "Đạt cấp độ Canh tác (Farming) Cấp 4",
    "ingredients": [
      {
        "name": "Gỗ",
        "count": 50,
        "nameEn": "Wood",
        "iconUrl": "assets/icons/ing_wood.png"
      },
      {
        "name": "Đá",
        "count": 40,
        "nameEn": "Stone",
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Than đá",
        "count": 8,
        "nameEn": "Coal",
        "iconUrl": "assets/icons/ing_coal.png"
      }
    ],
    "desc": "Biến hoa quả thành Mứt (Jelly) và rau củ thành Dưa Muối (Pickles) với công thức: Giá = 2x Giá gốc + 50g.",
    "tips": "Rất hiệu quả cho các loại quả có giá trị vừa và thấp.",
    "wikiFile": "Preserves_Jar.png",
    "imageUrl": "assets/icons/preserves_jar.png",
    "localImageUrl": "assets/icons/preserves_jar.png"
  },
  {
    "id": "cheese_press",
    "name": "Máy Ép Phô Mai",
    "nameEn": "Cheese Press",
    "category": "crafting",
    "subCategory": "Máy chế biến nông sản",
    "icon": "🧀",
    "source": "Đạt cấp độ Canh tác (Farming) Cấp 6",
    "ingredients": [
      {
        "name": "Gỗ",
        "count": 45,
        "nameEn": "Wood",
        "iconUrl": "assets/icons/ing_wood.png"
      },
      {
        "name": "Đá",
        "count": 45,
        "nameEn": "Stone",
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Gỗ cứng",
        "count": 10,
        "nameEn": "Hardwood",
        "iconUrl": "assets/icons/ing_hardwood.png"
      },
      {
        "name": "Thỏi đồng",
        "count": 1,
        "nameEn": "Copper Bar",
        "iconUrl": "assets/icons/ing_copper_bar.png"
      }
    ],
    "desc": "Biến sữa bò và sữa dê thành phô mai thơm ngon có giá trị cao.",
    "tips": "Sữa lớn (Large Milk) sẽ tạo phô mai chất lượng Vàng.",
    "wikiFile": "Cheese_Press.png",
    "imageUrl": "assets/icons/cheese_press.png",
    "localImageUrl": "assets/icons/cheese_press.png"
  },
  {
    "id": "keg",
    "name": "Thùng Ủ Rượu Lên Men (Keg)",
    "nameEn": "Keg",
    "category": "crafting",
    "subCategory": "Vua Kiếm Tiền Thung Lũng",
    "icon": "🍷",
    "source": "Đạt cấp độ Canh tác (Farming) Cấp 8",
    "ingredients": [
      {
        "name": "Gỗ",
        "count": 30,
        "nameEn": "Wood",
        "iconUrl": "assets/icons/ing_wood.png"
      },
      {
        "name": "Đất sét",
        "count": 1,
        "nameEn": "Clay",
        "iconUrl": "assets/icons/ing_clay.png"
      },
      {
        "name": "Thỏi đồng",
        "count": 1,
        "nameEn": "Copper Bar",
        "iconUrl": "assets/icons/ing_copper_bar.png"
      },
      {
        "name": "Thỏi sắt",
        "count": 1,
        "nameEn": "Iron Bar",
        "iconUrl": "assets/icons/ing_iron_bar.png"
      },
      {
        "name": "Nhựa cây sồi",
        "count": 1,
        "nameEn": "Oak Resin",
        "iconUrl": "assets/icons/ing_oak_resin.png"
      }
    ],
    "desc": "THIẾT BỊ KIẾM TIỀN SỐ 1 TRONG GAME: Biến trái cây thành Rượu Vang (Wine - gấp 3 lần giá quả), lúa mạch thành Bia (Beer), cà phê thành Cà Phê nóng!",
    "tips": "Ủ Starfruit hoặc Ancient Fruit bằng Keg là cách làm giàu nhanh nhất Stardew Valley.",
    "wikiFile": "Keg.png",
    "imageUrl": "assets/icons/keg.png",
    "localImageUrl": "assets/icons/keg.png"
  },
  {
    "id": "loom",
    "name": "Khung Dệt Vải Thủ Công",
    "nameEn": "Loom",
    "category": "crafting",
    "subCategory": "Máy chế biến dệt",
    "icon": "🧵",
    "source": "Đạt cấp độ Canh tác (Farming) Cấp 7",
    "ingredients": [
      {
        "name": "Gỗ",
        "count": 60,
        "nameEn": "Wood",
        "iconUrl": "assets/icons/ing_wood.png"
      },
      {
        "name": "Sợi gai",
        "count": 30,
        "nameEn": "Fiber",
        "iconUrl": "assets/icons/ing_fiber.png"
      },
      {
        "name": "Nhựa thông",
        "count": 1,
        "nameEn": "Pine Tar",
        "iconUrl": "assets/icons/ing_pine_tar.png"
      }
    ],
    "desc": "Dệt lông cừu hoặc lông thỏ thành những cuộn vải (Cloth) cao cấp.",
    "tips": "Lông cừu chất lượng cao có cơ hội nhân đôi số vải thu được.",
    "wikiFile": "Loom.png",
    "imageUrl": "assets/icons/loom.png",
    "localImageUrl": "assets/icons/loom.png"
  },
  {
    "id": "oil_maker",
    "name": "Máy Ép Dầu Tự Động",
    "nameEn": "Oil Maker",
    "category": "crafting",
    "subCategory": "Máy chế biến",
    "icon": "🛢️",
    "source": "Đạt cấp độ Canh tác (Farming) Cấp 8",
    "ingredients": [
      {
        "name": "Chất nhờn",
        "count": 50,
        "nameEn": "Slime",
        "iconUrl": "assets/icons/ing_slime.png"
      },
      {
        "name": "Gỗ cứng",
        "count": 20,
        "nameEn": "Hardwood",
        "iconUrl": "assets/icons/ing_hardwood.png"
      },
      {
        "name": "Thỏi vàng",
        "count": 1,
        "nameEn": "Gold Bar",
        "iconUrl": "assets/icons/ing_gold_bar.png"
      }
    ],
    "desc": "Ép nấm Truffle thành Dầu nấm Truffle Oil siêu đắt giá (1,065g hoặc 1,491g với nghề Artisan).",
    "tips": "Món kiếm tiền cực lớn từ chuồng lợn.",
    "wikiFile": "Oil_Maker.png",
    "imageUrl": "assets/icons/oil_maker.png",
    "localImageUrl": "assets/icons/oil_maker.png"
  },
  {
    "id": "cask",
    "name": "Thùng Gỗ Sồi Ủ Rượu Tăng Sao (Cask)",
    "nameEn": "Cask",
    "category": "crafting",
    "subCategory": "Hầm rượu gia truyền",
    "icon": "🪵",
    "source": "Nâng cấp Nhà chính lần 3 (Mở khóa hầm ngầm Cellar)",
    "ingredients": [
      {
        "name": "Gỗ",
        "count": 20,
        "nameEn": "Wood",
        "iconUrl": "assets/icons/ing_wood.png"
      },
      {
        "name": "Gỗ cứng",
        "count": 1,
        "nameEn": "Hardwood",
        "iconUrl": "assets/icons/ing_hardwood.png"
      }
    ],
    "desc": "Chỉ đặt được dưới hầm ngầm! Ủ Rượu vang và Phô mai từ sao Bạc lên sao Vàng và sao Iridium (nhân đôi giá bán).",
    "tips": "Đập thùng bằng rìu hoặc cuốc để lấy rượu ra sớm bất kỳ lúc nào.",
    "wikiFile": "Cask.png",
    "imageUrl": "assets/icons/cask.png",
    "localImageUrl": "assets/icons/cask.png"
  },
  {
    "id": "fish_smoker",
    "name": "Máy Hun Khói Cá (Mới 1.6)",
    "nameEn": "Fish Smoker",
    "category": "crafting",
    "subCategory": "Đồ Mới Bản 1.6",
    "icon": "🐟",
    "version16": true,
    "source": "Mua công thức từ Willy tại Fish Shop (10,000g)",
    "ingredients": [
      {
        "name": "Gỗ cứng",
        "count": 10,
        "nameEn": "Hardwood",
        "iconUrl": "assets/icons/ing_hardwood.png"
      },
      {
        "name": "Than đá",
        "count": 10,
        "nameEn": "Coal",
        "iconUrl": "assets/icons/ing_coal.png"
      },
      {
        "name": "Thạch anh lửa",
        "count": 1,
        "nameEn": "Fire Quartz",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "MÁY MỚI CỦA 1.6: Đưa 1 con cá bất kỳ + 1 than đá vào máy để hun khói. NHÂN ĐÔI GIÁ TRỊ CÁ BÁN RA VÀ VẪN GIỮ NGUYÊN CHẤT LƯỢNG SAO CỦA CÁ!",
    "tips": "Biến cá huyền thoại thành cá hun khói sao Iridium bán hàng chục nghìn vàng.",
    "wikiFile": "Fish_Smoker.png",
    "imageUrl": "assets/icons/fish_smoker.png",
    "localImageUrl": "assets/icons/fish_smoker.png"
  },
  {
    "id": "dehydrator",
    "name": "Máy Sấy Khô Hoa Quả & Nấm (Mới 1.6)",
    "nameEn": "Dehydrator",
    "category": "crafting",
    "subCategory": "Đồ Mới Bản 1.6",
    "icon": "🍇",
    "version16": true,
    "source": "Mua công thức từ Pierre tại General Store (10,000g)",
    "ingredients": [
      {
        "name": "Gỗ",
        "count": 30,
        "nameEn": "Wood",
        "iconUrl": "assets/icons/ing_wood.png"
      },
      {
        "name": "Đất sét",
        "count": 2,
        "nameEn": "Clay",
        "iconUrl": "assets/icons/ing_clay.png"
      },
      {
        "name": "Thạch anh lửa",
        "count": 1,
        "nameEn": "Fire Quartz",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "MÁY MỚI CỦA 1.6: Đưa 5 quả hoặc 5 nấm vào sấy trong 1 ngày để tạo ra Trái cây sấy khô (Dried Fruit) hoặc Nấm sấy khô (Dried Mushrooms) bán giá cực cao!",
    "tips": "Nhanh hơn Keg rất nhiều (chỉ mất 1 ngày) và tạo nguyên liệu cho nhiệm vụ gia đình gấu mèo.",
    "wikiFile": "Dehydrator.png",
    "imageUrl": "assets/icons/dehydrator.png",
    "localImageUrl": "assets/icons/dehydrator.png"
  },
  {
    "id": "bait_maker",
    "name": "Máy Chế Mồi Câu Đặc Chủng (Mới 1.6)",
    "nameEn": "Bait Maker",
    "category": "crafting",
    "subCategory": "Đồ Mới Bản 1.6",
    "icon": "🪱",
    "version16": true,
    "source": "Đạt cấp độ Câu Cá (Fishing) Cấp 6",
    "ingredients": [
      {
        "name": "Gỗ",
        "count": 30,
        "nameEn": "Wood",
        "iconUrl": "assets/icons/ing_wood.png"
      },
      {
        "name": "Thỏi sắt",
        "count": 1,
        "nameEn": "Iron Bar",
        "iconUrl": "assets/icons/ing_iron_bar.png"
      },
      {
        "name": "San hô",
        "count": 1,
        "nameEn": "Coral",
        "iconUrl": "assets/icons/item_coral.png"
      },
      {
        "name": "Nhím biển",
        "count": 3,
        "nameEn": "Sea Urchin",
        "iconUrl": "assets/icons/item_sea_urchin.png"
      }
    ],
    "desc": "MÁY MỚI CỦA 1.6: Bỏ bất kỳ con cá nào vào máy để tạo ra mồi câu nhắm riêng vào loài cá đó! Giúp cá cắn câu nhanh gấp bội.",
    "tips": "Cực kỳ đắc lực khi cần câu cá hiếm phục vụ nhiệm vụ hoặc nấu ăn.",
    "wikiFile": "Bait_Maker.png",
    "imageUrl": "assets/icons/bait_maker.png",
    "localImageUrl": "assets/icons/bait_maker.png"
  },
  {
    "id": "mushroom_log",
    "name": "Khúc Gỗ Cấy Nấm Rừng (Mới 1.6)",
    "nameEn": "Mushroom Log",
    "category": "crafting",
    "subCategory": "Đồ Mới Bản 1.6",
    "icon": "🍄",
    "version16": true,
    "source": "Đạt cấp độ Hái Lượm (Foraging) Cấp 4",
    "ingredients": [
      {
        "name": "Gỗ cứng",
        "count": 45,
        "nameEn": "Hardwood",
        "iconUrl": "assets/icons/ing_hardwood.png"
      },
      {
        "name": "Rêu tươi",
        "count": 10,
        "nameEn": "Moss",
        "iconUrl": "assets/icons/ing_moss.png"
      }
    ],
    "desc": "MÁY MỚI CỦA 1.6: Tự động mọc nấm tự nhiên sau mỗi vài ngày. Càng đặt gần nhiều cây cổ thụ thì nấm mọc càng nhanh và nấm càng quý hiếm!",
    "tips": "Đặt giữa rừng cây phong và sồi trên trang trại.",
    "wikiFile": "Mushroom_Log.png",
    "imageUrl": "assets/icons/mushroom_log.png",
    "localImageUrl": "assets/icons/mushroom_log.png"
  },
  {
    "id": "heavy_tapper",
    "name": "Ống Chiết Nhựa Siêu Tốc (Heavy Tapper)",
    "nameEn": "Heavy Tapper",
    "category": "crafting",
    "subCategory": "Ống chiết tăng tốc",
    "icon": "🪵",
    "source": "Mua công thức trong Qi's Walnut Room (20 Qi Gems)",
    "ingredients": [
      {
        "name": "Gỗ cứng",
        "count": 30,
        "nameEn": "Hardwood",
        "iconUrl": "assets/icons/ing_hardwood.png"
      },
      {
        "name": "Thỏi phóng xạ",
        "count": 1,
        "nameEn": "Radioactive Bar",
        "iconUrl": "assets/icons/smelt_radioactive_bar.png"
      }
    ],
    "desc": "Gắn vào cây để thu hoạch nhựa phong, nhựa sồi và nhựa thông NHANH GẤP ĐÔI so với ống thông thường!",
    "tips": "Tiết kiệm một nửa thời gian cày Oak Resin làm Keg.",
    "wikiFile": "Heavy_Tapper.png",
    "imageUrl": "assets/icons/heavy_tapper.png",
    "localImageUrl": "assets/icons/heavy_tapper.png"
  },
  {
    "id": "tapper",
    "name": "Ống Chiết Nhựa Cây Thông Thường",
    "nameEn": "Tapper",
    "category": "crafting",
    "subCategory": "Dụng cụ chiết",
    "icon": "🪵",
    "source": "Đạt cấp độ Canh tác (Farming) Cấp 3",
    "ingredients": [
      {
        "name": "Gỗ",
        "count": 40,
        "nameEn": "Wood",
        "iconUrl": "assets/icons/ing_wood.png"
      },
      {
        "name": "Thỏi đồng",
        "count": 2,
        "nameEn": "Copper Bar",
        "iconUrl": "assets/icons/ing_copper_bar.png"
      }
    ],
    "desc": "Gắn vào cây cổ thụ để thu hoạch nhựa sồi, nhựa thông, nhựa phong và siro thần bí.",
    "tips": "Hãy gắn sớm vào 5-10 cây sồi (Oak Tree) để tích lũy Oak Resin.",
    "wikiFile": "Tapper.png",
    "imageUrl": "assets/icons/tapper.png",
    "localImageUrl": "assets/icons/tapper.png"
  },
  {
    "id": "cherry_bomb",
    "name": "Bom Anh Đào Mini",
    "nameEn": "Cherry Bomb",
    "category": "crafting",
    "subCategory": "Chất nổ phá mỏ",
    "icon": "🍒",
    "source": "Đạt cấp độ Khai Mỏ (Mining) Cấp 1",
    "ingredients": [
      {
        "name": "Quặng đồng",
        "count": 4,
        "nameEn": "Copper Ore",
        "iconUrl": "assets/icons/ing_copper_ore.png"
      },
      {
        "name": "Than đá",
        "count": 1,
        "nameEn": "Coal",
        "iconUrl": "assets/icons/ing_coal.png"
      }
    ],
    "desc": "Tạo vụ nổ nhỏ phá hủy đá và quặng trong bán kính 3 ô.",
    "tips": "Dùng để dọn đá nhanh ở những tầng đầu hầm mỏ.",
    "wikiFile": "Cherry_Bomb.png",
    "imageUrl": "assets/icons/cherry_bomb.png",
    "localImageUrl": "assets/icons/cherry_bomb.png"
  },
  {
    "id": "bomb",
    "name": "Bom Tiêu Chuẩn",
    "nameEn": "Bomb",
    "category": "crafting",
    "subCategory": "Chất nổ phá mỏ",
    "icon": "💣",
    "source": "Đạt cấp độ Khai Mỏ (Mining) Cấp 6",
    "ingredients": [
      {
        "name": "Quặng sắt",
        "count": 4,
        "nameEn": "Iron Ore",
        "iconUrl": "assets/icons/ing_iron_ore.png"
      },
      {
        "name": "Than đá",
        "count": 1,
        "nameEn": "Coal",
        "iconUrl": "assets/icons/ing_coal.png"
      }
    ],
    "desc": "Vụ nổ mạnh mẽ quét sạch đá và khoáng sản trong bán kính 5 ô.",
    "tips": "Vật phẩm sinh tử khi đi cày quặng tại Skull Cavern.",
    "wikiFile": "Bomb.png",
    "imageUrl": "assets/icons/bomb.png",
    "localImageUrl": "assets/icons/bomb.png"
  },
  {
    "id": "mega_bomb",
    "name": "Đại Siêu Bom Hạt Nhân",
    "nameEn": "Mega Bomb",
    "category": "crafting",
    "subCategory": "Chất nổ phá mỏ",
    "icon": "💥",
    "source": "Đạt cấp độ Khai Mỏ (Mining) Cấp 8",
    "ingredients": [
      {
        "name": "Quặng vàng",
        "count": 4,
        "nameEn": "Gold Ore",
        "iconUrl": "assets/icons/ing_gold_ore.png"
      },
      {
        "name": "Tinh chất mặt trời",
        "count": 1,
        "nameEn": "Solar Essence",
        "iconUrl": "assets/icons/ing_solar_essence.png"
      },
      {
        "name": "Tinh chất hư vô",
        "count": 1,
        "nameEn": "Void Essence",
        "iconUrl": "assets/icons/ing_void_essence.png"
      }
    ],
    "desc": "Sức công phá khủng khiếp quét sạch gần như toàn bộ màn hình (bán kính 6-8 ô)! Hãy chạy thật nhanh sau khi đặt.",
    "tips": "Mua từ Dwarf với giá 1,000g hoặc đổi quặng với thợ buôn sa mạc.",
    "wikiFile": "Mega_Bomb.png",
    "imageUrl": "assets/icons/mega_bomb.png",
    "localImageUrl": "assets/icons/mega_bomb.png"
  },
  {
    "id": "furnace",
    "name": "Lò Luyện Kim Cơ Bản",
    "nameEn": "Furnace",
    "category": "crafting",
    "subCategory": "Luyện kim",
    "icon": "🔥",
    "source": "Sự kiện Clint ghé thăm nông trại sau khi đào được quặng đầu tiên",
    "ingredients": [
      {
        "name": "Quặng đồng",
        "count": 20,
        "nameEn": "Copper Ore",
        "iconUrl": "assets/icons/ing_copper_ore.png"
      },
      {
        "name": "Đá",
        "count": 25,
        "nameEn": "Stone",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "Nấu chảy 5 quặng kim loại + 1 than đá thành 1 thỏi kim loại thành phẩm.",
    "tips": "Thiết bị nền tảng của mọi thời kỳ.",
    "wikiFile": "Furnace.png",
    "imageUrl": "assets/icons/furnace.png",
    "localImageUrl": "assets/icons/furnace.png"
  },
  {
    "id": "heavy_furnace",
    "name": "Đại Lò Luyện Công Nghiệp (Mới 1.6)",
    "nameEn": "Heavy Furnace",
    "category": "crafting",
    "subCategory": "Đồ Mới Bản 1.6",
    "icon": "🌋",
    "version16": true,
    "source": "Mở khóa cột mốc Mining Mastery tại Căn Hang Bậc Thầy (Mastery Cave)",
    "ingredients": [
      {
        "name": "Lò nung thường",
        "count": 2,
        "nameEn": "Furnace",
        "iconUrl": "assets/icons/furnace.png"
      },
      {
        "name": "Thỏi sắt",
        "count": 3,
        "nameEn": "Iron Bar",
        "iconUrl": "assets/icons/ing_iron_bar.png"
      },
      {
        "name": "Đá",
        "count": 50,
        "nameEn": "Stone",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "LÒ LUYỆN KHỦNG 1.6: Xử lý 25 quặng cùng lúc + 3 than đá và TRẢ VỀ NHIỀU THỎI KIM LOẠI HƠN BÌNH THƯỜNG (kèm thỏi thưởng may mắn)!",
    "tips": "Tiết kiệm than đá và thời gian canh lò.",
    "wikiFile": "Heavy_Furnace.png",
    "imageUrl": "assets/icons/heavy_furnace.png",
    "localImageUrl": "assets/icons/heavy_furnace.png"
  },
  {
    "id": "anvil",
    "name": "Đe Rèn Thần Kỳ (Mới 1.6)",
    "nameEn": "Anvil",
    "category": "crafting",
    "subCategory": "Đồ Mới Bản 1.6",
    "icon": "🔨",
    "version16": true,
    "source": "Mở khóa Combat Mastery tại Hang Bậc Thầy",
    "ingredients": [
      {
        "name": "Thỏi sắt",
        "count": 50,
        "nameEn": "Iron Bar",
        "iconUrl": "assets/icons/ing_iron_bar.png"
      }
    ],
    "desc": "THIẾT BỊ MỚI 1.6: Dùng 3 thỏi Iridium để tái đúc thuộc tính chỉ số ngẫu nhiên cho các Phụ Kiện Ma Thuật (Trinkets)!",
    "tips": "Giúp tối ưu hóa phụ kiện Basilisk Paw, Fairy Box, Magic Quiver...",
    "wikiFile": "Anvil.png",
    "imageUrl": "assets/icons/anvil.png",
    "localImageUrl": "assets/icons/anvil.png"
  },
  {
    "id": "mini_forge",
    "name": "Lò Rèn Mini Cầm Tay (Mới 1.6)",
    "nameEn": "Mini-Forge",
    "category": "crafting",
    "subCategory": "Lò rèn di động",
    "icon": "⚒️",
    "version16": true,
    "source": "Mở khóa Mining Mastery tại Căn Hang Bậc Thầy",
    "ingredients": [
      {
        "name": "Thỏi sắt",
        "count": 10,
        "nameEn": "Iron Bar",
        "iconUrl": "assets/icons/ing_iron_bar.png"
      },
      {
        "name": "Mảnh tàn tích Cinder Shard",
        "count": 200,
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "Đặt lò rèn ma thuật ngay tại nhà hoặc nông trại để ghép nhẫn và phù phép vũ khí mà không cần trèo lên tận miệng núi lửa Đảo Gừng!",
    "tips": "Vô cùng tiện lợi cuối game.",
    "wikiFile": "Mini-Forge.png",
    "imageUrl": "assets/icons/mini_forge.png",
    "localImageUrl": "assets/icons/mini_forge.png"
  },
  {
    "id": "staircase",
    "name": "Cầu Thang Đá Xuống Mỏ",
    "nameEn": "Staircase",
    "category": "crafting",
    "subCategory": "Vật phẩm thám hiểm",
    "icon": "🪜",
    "source": "Đạt cấp độ Khai Mỏ (Mining) Cấp 2",
    "ingredients": [
      {
        "name": "Đá",
        "count": 99,
        "nameEn": "Stone",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "Tạo ngay 1 chiếc thang dẫn thẳng xuống tầng tiếp theo của mỏ hoặc Skull Cavern.",
    "tips": "Đổi 1 Ngọc Bích (Jade) lấy 1 Staircase tại Desert Trader vào Chủ Nhật vô cùng hời!",
    "wikiFile": "Staircase.png",
    "imageUrl": "assets/icons/staircase.png",
    "localImageUrl": "assets/icons/staircase.png"
  },
  {
    "id": "geode_crusher",
    "name": "Máy Đập Trứng Thạch Anh Tự Động",
    "nameEn": "Geode Crusher",
    "category": "crafting",
    "subCategory": "Máy chế biến mỏ",
    "icon": "💎",
    "source": "Phần thưởng hoàn thành nhiệm vụ Cave Patrol của Clint",
    "ingredients": [
      {
        "name": "Thỏi vàng",
        "count": 2,
        "nameEn": "Gold Bar",
        "iconUrl": "assets/icons/ing_gold_bar.png"
      },
      {
        "name": "Đá",
        "count": 50,
        "nameEn": "Stone",
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Kim cương",
        "count": 1,
        "nameEn": "Diamond",
        "iconUrl": "assets/icons/item_diamond.png"
      }
    ],
    "desc": "Tự động đập vỡ các quả Geode bằng than đá ngay tại nhà mà không cần đến tiệm Clint.",
    "tips": "Đập cùng kết quả với Clint nhưng không tốn 25g mỗi lần.",
    "wikiFile": "Geode_Crusher.png",
    "imageUrl": "assets/icons/geode_crusher.png",
    "localImageUrl": "assets/icons/geode_crusher.png"
  },
  {
    "id": "chest",
    "name": "Rương Gỗ Đựng Đồ Tiêu Chuẩn",
    "nameEn": "Chest",
    "category": "crafting",
    "subCategory": "Kho chứa đồ",
    "icon": "📦",
    "source": "Có sẵn từ đầu game",
    "ingredients": [
      {
        "name": "Gỗ",
        "count": 50,
        "nameEn": "Wood",
        "iconUrl": "assets/icons/ing_wood.png"
      }
    ],
    "desc": "Rương chứa 36 ô đồ, có thể đổi màu tùy thích để phân loại vật phẩm.",
    "tips": "Đặt khắp thị trấn để tiện cất đồ khi câu cá hoặc đi mỏ.",
    "wikiFile": "Chest.png",
    "imageUrl": "assets/icons/chest.png",
    "localImageUrl": "assets/icons/chest.png"
  },
  {
    "id": "big_chest",
    "name": "Đại Rương Gỗ 70 Ô (Mới 1.6)",
    "nameEn": "Big Chest",
    "category": "crafting",
    "subCategory": "Đồ Mới Bản 1.6",
    "icon": "🧰",
    "version16": true,
    "source": "Mua công thức từ Robin tại Carpenter's Shop (5,000g)",
    "ingredients": [
      {
        "name": "Gỗ",
        "count": 120,
        "nameEn": "Wood",
        "iconUrl": "assets/icons/ing_wood.png"
      },
      {
        "name": "Thỏi đồng",
        "count": 2,
        "nameEn": "Copper Bar",
        "iconUrl": "assets/icons/ing_copper_bar.png"
      }
    ],
    "desc": "NÂNG CẤP SIÊU ĐỈNH 1.6: Chứa tới 70 Ô VẬT PHẨM (gần gấp đôi rương thường)! CÓ THỂ ĐẶT ĐÈ TRỰC TIẾP LÊN RƯƠNG CŨ ĐỂ NÂNG CẤP MÀ KHÔNG CẦN CHUYỂN ĐỒ!",
    "tips": "Giải pháp dọn dẹp kho bãi số 1 của bản cập nhật 1.6.",
    "wikiFile": "Big_Chest.png",
    "imageUrl": "assets/icons/big_chest.png",
    "localImageUrl": "assets/icons/big_chest.png"
  },
  {
    "id": "stone_chest",
    "name": "Rương Đá Mỹ Nghệ",
    "nameEn": "Stone Chest",
    "category": "crafting",
    "subCategory": "Kho chứa đồ",
    "icon": "🪨",
    "source": "Đạt cấp độ Khai Mỏ (Mining) Cấp 1",
    "ingredients": [
      {
        "name": "Đá",
        "count": 50,
        "nameEn": "Stone",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "Rương làm bằng đá chứa 36 ô, phong cách mộc mạc bền bỉ.",
    "tips": "Tuyệt vời khi bạn thừa đá nhưng thiếu gỗ.",
    "wikiFile": "Stone_Chest.png",
    "imageUrl": "assets/icons/stone_chest.png",
    "localImageUrl": "assets/icons/stone_chest.png"
  },
  {
    "id": "big_stone_chest",
    "name": "Đại Rương Đá 70 Ô (Mới 1.6)",
    "nameEn": "Big Stone Chest",
    "category": "crafting",
    "subCategory": "Đồ Mới Bản 1.6",
    "icon": "🗿",
    "version16": true,
    "source": "Mua từ Dwarf trong mỏ (5,000g)",
    "ingredients": [
      {
        "name": "Đá",
        "count": 250,
        "nameEn": "Stone",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "Rương đá khổng lồ chứa 70 ô đồ, đặt đè lên rương đá cũ để tự động nâng cấp.",
    "tips": "Thiết kế tông màu xám đá rất sang trọng.",
    "wikiFile": "Big_Stone_Chest.png",
    "imageUrl": "assets/icons/big_stone_chest.png",
    "localImageUrl": "assets/icons/big_stone_chest.png"
  },
  {
    "id": "seed_maker",
    "name": "Máy Nhân Bản Hạt Giống",
    "nameEn": "Seed Maker",
    "category": "crafting",
    "subCategory": "Máy tạo hạt giống",
    "icon": "🌱",
    "source": "Đạt cấp độ Canh tác (Farming) Cấp 9",
    "ingredients": [
      {
        "name": "Gỗ",
        "count": 25,
        "nameEn": "Wood",
        "iconUrl": "assets/icons/ing_wood.png"
      },
      {
        "name": "Than đá",
        "count": 10,
        "nameEn": "Coal",
        "iconUrl": "assets/icons/ing_coal.png"
      },
      {
        "name": "Thỏi vàng",
        "count": 1,
        "nameEn": "Gold Bar",
        "iconUrl": "assets/icons/ing_gold_bar.png"
      }
    ],
    "desc": "Bỏ 1 nông sản vào để nhận từ 1-3 túi hạt giống tương ứng (có 0.5% tỉ lệ biến thành hạt Ancient Seed)!",
    "tips": "Dùng để nhân giống hạt Ancient Fruit trồng kín nhà kính Greenhouse.",
    "wikiFile": "Seed_Maker.png",
    "imageUrl": "assets/icons/seed_maker.png",
    "localImageUrl": "assets/icons/seed_maker.png"
  },
  {
    "id": "lightning_rod",
    "name": "Cột Thu Lôi Hút Sét",
    "nameEn": "Lightning Rod",
    "category": "crafting",
    "subCategory": "Năng lượng & Bảo vệ",
    "icon": "⚡",
    "source": "Đạt cấp độ Canh tác (Farming) Cấp 6",
    "ingredients": [
      {
        "name": "Thỏi sắt",
        "count": 1,
        "nameEn": "Iron Bar",
        "iconUrl": "assets/icons/ing_iron_bar.png"
      },
      {
        "name": "Thạch anh tinh luyện",
        "count": 1,
        "nameEn": "Refined Quartz",
        "iconUrl": "assets/icons/ing_refined_quartz.png"
      },
      {
        "name": "Cánh dơi",
        "count": 5,
        "nameEn": "Bat Wing",
        "iconUrl": "assets/icons/ing_bat_wing.png"
      }
    ],
    "desc": "Hút sét vào những ngày mưa giông để bảo vệ mùa màng và cây ăn quả, đồng thời sản xuất Pin Năng Lượng (Battery Pack) sau cơn bão.",
    "tips": "Nên cắm từ 15-20 cột quanh nông trại.",
    "wikiFile": "Lightning_Rod.png",
    "imageUrl": "assets/icons/lightning_rod.png",
    "localImageUrl": "assets/icons/lightning_rod.png"
  },
  {
    "id": "crystalarium",
    "name": "Máy Nhân Bản Đá Quý Tự Động",
    "nameEn": "Crystalarium",
    "category": "crafting",
    "subCategory": "Cỗ máy kỳ diệu",
    "icon": "💎",
    "source": "Đạt cấp độ Khai Mỏ (Mining) Cấp 9",
    "ingredients": [
      {
        "name": "Đá",
        "count": 99,
        "nameEn": "Stone",
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Thỏi vàng",
        "count": 5,
        "nameEn": "Gold Bar",
        "iconUrl": "assets/icons/ing_gold_bar.png"
      },
      {
        "name": "Thỏi Iridium",
        "count": 2,
        "nameEn": "Iridium Bar",
        "iconUrl": "assets/icons/ing_iridium_bar.png"
      },
      {
        "name": "Pin năng lượng",
        "count": 1,
        "nameEn": "Battery Pack",
        "iconUrl": "assets/icons/ing_battery_pack.png"
      }
    ],
    "desc": "Bỏ 1 viên ngọc vào và máy sẽ liên tục nhân bản viên ngọc đó vô hạn lần!",
    "tips": "Nhân bản Jade để đổi lấy Thang đá Staircase tại Desert Trader, hoặc nhân bản Kim Cương để bán kiếm tiền.",
    "wikiFile": "Crystalarium.png",
    "imageUrl": "assets/icons/crystalarium.png",
    "localImageUrl": "assets/icons/crystalarium.png"
  },
  {
    "id": "mini_obelisk",
    "name": "Cặp Tháp Dịch Chuyển Tức Thời Mini",
    "nameEn": "Mini-Obelisk",
    "category": "crafting",
    "subCategory": "Phù phép di chuyển",
    "icon": "🗼",
    "source": "Phần thưởng hoàn thành nhiệm vụ A Curious Substance của Pháp sư Rasmodius",
    "ingredients": [
      {
        "name": "Gỗ cứng",
        "count": 30,
        "nameEn": "Hardwood",
        "iconUrl": "assets/icons/ing_hardwood.png"
      },
      {
        "name": "Tinh chất mặt trời",
        "count": 20,
        "nameEn": "Solar Essence",
        "iconUrl": "assets/icons/ing_solar_essence.png"
      },
      {
        "name": "Thỏi vàng",
        "count": 3,
        "nameEn": "Gold Bar",
        "iconUrl": "assets/icons/ing_gold_bar.png"
      }
    ],
    "desc": "Chế tạo ra một cặp tháp mini đặt ở 2 điểm bất kỳ trong nông trại. Nhấn vào tháp này sẽ dịch chuyển tức khắc sang tháp kia!",
    "tips": "Đặt một cái trước cửa nhà chính và một cái ở góc xa nhất của nông trại.",
    "wikiFile": "Mini-Obelisk.png",
    "imageUrl": "assets/icons/mini_obelisk.png",
    "localImageUrl": "assets/icons/mini_obelisk.png"
  },
  {
    "id": "farm_computer",
    "name": "Máy Tính Quản Lý Nông Trại",
    "nameEn": "Farm Computer",
    "category": "crafting",
    "subCategory": "Công nghệ cao",
    "icon": "💻",
    "source": "Phần thưởng nhiệm vụ Aquatic Overpopulation của Demetrius",
    "ingredients": [
      {
        "name": "Món cổ vật Dwarf Gadget",
        "count": 1,
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Pin năng lượng",
        "count": 1,
        "nameEn": "Battery Pack",
        "iconUrl": "assets/icons/ing_battery_pack.png"
      },
      {
        "name": "Thạch anh tinh luyện",
        "count": 10,
        "nameEn": "Refined Quartz",
        "iconUrl": "assets/icons/ing_refined_quartz.png"
      }
    ],
    "desc": "Quét toàn bộ trang trại và báo cáo: Số cây chưa tưới, số quả đã chín, máy móc sẵn sàng thu hoạch, bù nhìn bị thiếu...",
    "tips": "Kiểm tra mỗi buổi sáng để không bỏ sót việc đồng áng.",
    "wikiFile": "Farm_Computer.png",
    "imageUrl": "assets/icons/farm_computer.png",
    "localImageUrl": "assets/icons/farm_computer.png"
  },
  {
    "id": "hopper",
    "name": "Phễu Nạp Nguyên Liệu Tự Động",
    "nameEn": "Hopper",
    "category": "crafting",
    "subCategory": "Tự động hóa",
    "icon": "📥",
    "source": "Mua công thức từ Qi's Walnut Room (50 Qi Gems)",
    "ingredients": [
      {
        "name": "Gỗ cứng",
        "count": 10,
        "nameEn": "Hardwood",
        "iconUrl": "assets/icons/ing_hardwood.png"
      },
      {
        "name": "Thỏi Iridium",
        "count": 1,
        "nameEn": "Iridium Bar",
        "iconUrl": "assets/icons/ing_iridium_bar.png"
      },
      {
        "name": "Thỏi phóng xạ",
        "count": 1,
        "nameEn": "Radioactive Bar",
        "iconUrl": "assets/icons/smelt_radioactive_bar.png"
      }
    ],
    "desc": "Đặt phía sau các loại máy chế biến để tự động nạp nguyên liệu vào máy khi máy trống.",
    "tips": "Rất thích hợp đặt sau Lò nung, Máy chế Mayo, Hũ mứt...",
    "wikiFile": "Hopper.png",
    "imageUrl": "assets/icons/hopper.png",
    "localImageUrl": "assets/icons/hopper.png"
  },
  {
    "id": "tent_kit",
    "name": "Bộ Lều Cắm Trại Ngủ Ngoài Trời (Mới 1.6)",
    "nameEn": "Tent Kit",
    "category": "crafting",
    "subCategory": "Đồ Mới Bản 1.6",
    "icon": "⛺",
    "version16": true,
    "source": "Đạt cấp độ Hái Lượm (Foraging) Cấp 8",
    "ingredients": [
      {
        "name": "Gỗ cứng",
        "count": 10,
        "nameEn": "Hardwood",
        "iconUrl": "assets/icons/ing_hardwood.png"
      },
      {
        "name": "Sợi gai",
        "count": 25,
        "nameEn": "Fiber",
        "iconUrl": "assets/icons/ing_fiber.png"
      },
      {
        "name": "Vải dệt",
        "count": 1,
        "nameEn": "Cloth",
        "iconUrl": "assets/icons/ing_cloth.png"
      }
    ],
    "desc": "VẬT PHẨM MỚI 1.6: Dựng lều để ngủ qua đêm ngay tại chỗ ngoài trời (Skull Cavern, Đảo Gừng, Bãi biển...) và thức dậy tại đúng vị trí đó vào 6:00 sáng hôm sau!",
    "tips": "Tuyệt đỉnh cho những chuyến cày hầm mỏ thâu đêm suốt sáng.",
    "wikiFile": "Tent_Kit.png",
    "imageUrl": "assets/icons/tent_kit.png",
    "localImageUrl": "assets/icons/tent_kit.png"
  },
  {
    "id": "statue_of_blessings",
    "name": "Tượng Ban Phước Lành Hàng Ngày (Mới 1.6)",
    "nameEn": "Statue of Blessings",
    "category": "crafting",
    "subCategory": "Đồ Mới Bản 1.6",
    "icon": "🗽",
    "version16": true,
    "source": "Mở khóa Farming Mastery tại Hang Bậc Thầy",
    "ingredients": [
      {
        "name": "Đá",
        "count": 999,
        "nameEn": "Stone",
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Nhựa cây Sap",
        "count": 333,
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Thỏi vàng",
        "count": 33,
        "nameEn": "Gold Bar",
        "iconUrl": "assets/icons/ing_gold_bar.png"
      }
    ],
    "desc": "CỰC PHẨM 1.6: Mỗi ngày tương tác với tượng để nhận một phước lành thần kỳ ngẫu nhiên: Tăng tốc chạy, vô hạn thể lực, nhân đôi quặng, rơi kho báu...",
    "tips": "Phước lành kéo dài trọn vẹn cả ngày.",
    "wikiFile": "Statue_Of_Blessings.png",
    "imageUrl": "assets/icons/statue_of_blessings.png",
    "localImageUrl": "assets/icons/statue_of_blessings.png"
  },
  {
    "id": "statue_of_the_dwarf_king",
    "name": "Tượng Vua Lùn Phước Mỏ (Mới 1.6)",
    "nameEn": "Statue of the Dwarf King",
    "category": "crafting",
    "subCategory": "Đồ Mới Bản 1.6",
    "icon": "👑",
    "version16": true,
    "source": "Mở khóa Mining Mastery tại Hang Bậc Thầy",
    "ingredients": [
      {
        "name": "Đá",
        "count": 80,
        "nameEn": "Stone",
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Thỏi vàng",
        "count": 10,
        "nameEn": "Gold Bar",
        "iconUrl": "assets/icons/ing_gold_bar.png"
      },
      {
        "name": "Thỏi Iridium",
        "count": 10,
        "nameEn": "Iridium Bar",
        "iconUrl": "assets/icons/ing_iridium_bar.png"
      }
    ],
    "desc": "CỰC PHẨM 1.6: Mỗi ngày cho phép bạn chọn 1 trong 2 hiệu ứng khai mỏ siêu cấp: Tăng tỉ lệ thang đá, tăng quặng rơi, bom không gây sát thương bản thân...",
    "tips": "Vật báu bắt buộc phải có cho thợ săn kho báu Skull Cavern.",
    "wikiFile": "Statue_Of_The_Dwarf_King.png",
    "imageUrl": "assets/icons/statue_of_the_dwarf_king.png",
    "localImageUrl": "assets/icons/statue_of_the_dwarf_king.png"
  },
  {
    "id": "trap_bobber",
    "name": "Phao Bẫy Giữ Cá",
    "nameEn": "Trap Bobber",
    "category": "crafting",
    "subCategory": "Phụ kiện cần câu",
    "icon": "🪝",
    "source": "Đạt cấp độ Câu Cá (Fishing) Cấp 6",
    "ingredients": [
      {
        "name": "Thỏi đồng",
        "count": 1,
        "nameEn": "Copper Bar",
        "iconUrl": "assets/icons/ing_copper_bar.png"
      },
      {
        "name": "Nhựa cây Sap",
        "count": 10,
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "PHỤ KIỆN CÂU CÁ QUAN TRỌNG NHẤT: Khi bạn không giữ trúng cá, thanh bắt cá sẽ tụt chậm hơn 66% so với bình thường!",
    "tips": "Không thể thiếu khi đi săn cá Huyền Thoại và cá nóc Pufferfish.",
    "wikiFile": "Trap_Bobber.png",
    "imageUrl": "assets/icons/trap_bobber.png",
    "localImageUrl": "assets/icons/trap_bobber.png"
  },
  {
    "id": "cork_bobber",
    "name": "Phao Nút Bấc Mở Rộng",
    "nameEn": "Cork Bobber",
    "category": "crafting",
    "subCategory": "Phụ kiện cần câu",
    "icon": "🍾",
    "source": "Đạt cấp độ Câu Cá (Fishing) Cấp 7",
    "ingredients": [
      {
        "name": "Gỗ",
        "count": 8,
        "nameEn": "Wood",
        "iconUrl": "assets/icons/ing_wood.png"
      },
      {
        "name": "Gỗ cứng",
        "count": 10,
        "nameEn": "Hardwood",
        "iconUrl": "assets/icons/ing_hardwood.png"
      },
      {
        "name": "Chất nhờn",
        "count": 5,
        "nameEn": "Slime",
        "iconUrl": "assets/icons/ing_slime.png"
      }
    ],
    "desc": "Tăng thêm kích thước chiều dài cho thanh kéo cá màu xanh lá cây.",
    "tips": "Giúp vùng đón cá rộng rãi hơn.",
    "wikiFile": "Cork_Bobber.png",
    "imageUrl": "assets/icons/cork_bobber.png",
    "localImageUrl": "assets/icons/cork_bobber.png"
  },
  {
    "id": "wild_bait",
    "name": "Mồi Câu Hoang Dã",
    "nameEn": "Wild Bait",
    "category": "crafting",
    "subCategory": "Mồi câu cá",
    "icon": "🪱",
    "source": "Sự kiện 4 Tim của Linus trong lều rừng",
    "ingredients": [
      {
        "name": "Sợi gai",
        "count": 10,
        "nameEn": "Fiber",
        "iconUrl": "assets/icons/ing_fiber.png"
      },
      {
        "name": "Chất nhờn",
        "count": 5,
        "nameEn": "Slime",
        "iconUrl": "assets/icons/ing_slime.png"
      },
      {
        "name": "Thịt bọ",
        "count": 5,
        "nameEn": "Bug Meat",
        "iconUrl": "assets/icons/ing_bug_meat.png"
      }
    ],
    "desc": "Mồi câu độc môn do Linus truyền dạy: Giúp cá cắn câu nhanh hơn và có cơ hội CÂU DÍNH 2 CON CÁ CÙNG MỘT LÚC!",
    "tips": "Nhân đôi sản lượng câu cá.",
    "wikiFile": "Wild_Bait.png",
    "imageUrl": "assets/icons/wild_bait.png",
    "localImageUrl": "assets/icons/wild_bait.png"
  },
  {
    "id": "magic_bait",
    "name": "Mồi Câu Ma Thuật Xuyên Không Gian",
    "nameEn": "Magic Bait",
    "category": "crafting",
    "subCategory": "Mồi câu thần bí",
    "icon": "✨",
    "source": "Mua công thức từ Qi's Walnut Room (20 Qi Gems)",
    "ingredients": [
      {
        "name": "Quặng phóng xạ",
        "count": 1,
        "nameEn": "Radioactive Ore",
        "iconUrl": "assets/icons/ing_radioactive_ore.png"
      },
      {
        "name": "Thịt bọ",
        "count": 3,
        "nameEn": "Bug Meat",
        "iconUrl": "assets/icons/ing_bug_meat.png"
      }
    ],
    "desc": "MỒI CÂU THẦN THÁNH: Cho phép câu được BẤT KỲ LOÀI CÁ NÀO ở bất kỳ nguồn nước nào, BẤT KỂ MÙA NÀO, THỜI TIẾT NÀO HAY KHUNG GIỜ NÀO!",
    "tips": "Câu cá mùa hè giữa mùa đông một cách dễ dàng.",
    "wikiFile": "Magic_Bait.png",
    "imageUrl": "assets/icons/magic_bait.png",
    "localImageUrl": "assets/icons/magic_bait.png"
  },
  {
    "id": "deluxe_bait",
    "name": "Mồi Câu Thượng Hạng (Mới 1.6)",
    "nameEn": "Deluxe Bait",
    "category": "crafting",
    "subCategory": "Đồ Mới Bản 1.6",
    "icon": "🪱",
    "version16": true,
    "source": "Đạt cấp độ Câu Cá (Fishing) Cấp 4",
    "ingredients": [
      {
        "name": "Mồi thường",
        "count": 5,
        "nameEn": "Bait",
        "iconUrl": "assets/icons/craft_bait.png"
      },
      {
        "name": "Rêu tươi",
        "count": 2,
        "nameEn": "Moss",
        "iconUrl": "assets/icons/ing_moss.png"
      }
    ],
    "desc": "MỒI MỚI 1.6: Giúp cá cắn câu thần tốc hơn 67% và TĂNG KÍCH THƯỚC THANH BẮT CÁ THÊM 12 ĐIỂM!",
    "tips": "Vừa câu nhanh vừa dễ bắt hơn.",
    "wikiFile": "Deluxe_Bait.png",
    "imageUrl": "assets/icons/deluxe_bait.png",
    "localImageUrl": "assets/icons/deluxe_bait.png"
  },
  {
    "id": "challenge_bait",
    "name": "Mồi Câu Thử Thách Nhân Ba (Mới 1.6)",
    "nameEn": "Challenge Bait",
    "category": "crafting",
    "subCategory": "Đồ Mới Bản 1.6",
    "icon": "🎯",
    "version16": true,
    "source": "Mở khóa Fishing Mastery tại Căn Hang Bậc Thầy",
    "ingredients": [
      {
        "name": "Mảnh xương Bone Fragments",
        "count": 5,
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Rêu tươi",
        "count": 2,
        "nameEn": "Moss",
        "iconUrl": "assets/icons/ing_moss.png"
      }
    ],
    "desc": "MỒI MỚI 1.6 ĐỈNH CAO: Bắt đầu giật cần với 3 con cá cùng lúc! Mỗi lần cá bơi ra khỏi thanh câu sẽ mất 1 con. Giữ trọn vẹn sẽ THU VỀ CẢ 3 CON CÁ TRONG 1 LẦN GIẬT!",
    "tips": "Nhân 3 số lượng cá thu được cho cao thủ giật cần.",
    "wikiFile": "Challenge_Bait.png",
    "imageUrl": "assets/icons/challenge_bait.png",
    "localImageUrl": "assets/icons/challenge_bait.png"
  },
  {
    "id": "crab_pot",
    "name": "Lồng Bẫy Cua Đáy Nước",
    "nameEn": "Crab Pot",
    "category": "crafting",
    "subCategory": "Bẫy thủy sản",
    "icon": "🦀",
    "source": "Đạt cấp độ Câu Cá (Fishing) Cấp 3",
    "ingredients": [
      {
        "name": "Gỗ",
        "count": 40,
        "nameEn": "Wood",
        "iconUrl": "assets/icons/ing_wood.png"
      },
      {
        "name": "Thỏi sắt",
        "count": 3,
        "nameEn": "Iron Bar",
        "iconUrl": "assets/icons/ing_iron_bar.png"
      }
    ],
    "desc": "Thả xuống ven sông, hồ hoặc biển và bỏ mồi câu vào. Sáng hôm sau sẽ bẫy được cua, tôm, ốc, nghêu, sò.",
    "tips": "Nghề Trapper ở cấp 5 giúp giảm nguyên liệu chỉ còn 25 gỗ và 2 thỏi đồng.",
    "wikiFile": "Crab_Pot.png",
    "imageUrl": "assets/icons/crab_pot.png",
    "localImageUrl": "assets/icons/crab_pot.png"
  },
  {
    "id": "worm_bin",
    "name": "Thùng Trùn Tự Động Sinh Mồi",
    "nameEn": "Worm Bin",
    "category": "crafting",
    "subCategory": "Thiết bị mồi câu",
    "icon": "🪱",
    "source": "Đạt cấp độ Câu Cá (Fishing) Cấp 8",
    "ingredients": [
      {
        "name": "Gỗ cứng",
        "count": 25,
        "nameEn": "Hardwood",
        "iconUrl": "assets/icons/ing_hardwood.png"
      },
      {
        "name": "Thỏi vàng",
        "count": 1,
        "nameEn": "Gold Bar",
        "iconUrl": "assets/icons/ing_gold_bar.png"
      },
      {
        "name": "Thỏi sắt",
        "count": 1,
        "nameEn": "Iron Bar",
        "iconUrl": "assets/icons/ing_iron_bar.png"
      },
      {
        "name": "Sợi gai",
        "count": 50,
        "nameEn": "Fiber",
        "iconUrl": "assets/icons/ing_fiber.png"
      }
    ],
    "desc": "Tự động sinh ra 2 đến 5 mồi câu cá mỗi buổi sáng mà không cần tốn công đào giun.",
    "tips": "Đặt cạnh các ao cá trên nông trại.",
    "wikiFile": "Worm_Bin.png",
    "imageUrl": "assets/icons/worm_bin.png",
    "localImageUrl": "assets/icons/worm_bin.png"
  },
  {
    "id": "deluxe_worm_bin",
    "name": "Thùng Trùn Thượng Hạng (Mới 1.6)",
    "nameEn": "Deluxe Worm Bin",
    "category": "crafting",
    "subCategory": "Đồ Mới Bản 1.6",
    "icon": "🪱",
    "version16": true,
    "source": "Đạt cấp độ Câu Cá (Fishing) Cấp 8 (hoặc Fishing Mastery)",
    "ingredients": [
      {
        "name": "Thùng trùn thường",
        "count": 1,
        "nameEn": "Worm Bin",
        "iconUrl": "assets/icons/worm_bin.png"
      },
      {
        "name": "Rêu tươi",
        "count": 30,
        "nameEn": "Moss",
        "iconUrl": "assets/icons/ing_moss.png"
      }
    ],
    "desc": "NÂNG CẤP MỚI 1.6: Tự động sản xuất 4-5 mồi câu thượng hạng (Deluxe Bait) mỗi ngày!",
    "tips": "Cung cấp nguồn mồi xịn liên tục.",
    "wikiFile": "Deluxe_Worm_Bin.png",
    "imageUrl": "assets/icons/deluxe_worm_bin.png",
    "localImageUrl": "assets/icons/deluxe_worm_bin.png"
  },
  {
    "id": "iridium_band",
    "name": "Vòng Tay Iridium Tối Thượng",
    "nameEn": "Iridium Band",
    "category": "crafting",
    "subCategory": "Nhẫn ma thuật",
    "icon": "💍",
    "source": "Đạt cấp độ Chiến Đấu (Combat) Cấp 9",
    "ingredients": [
      {
        "name": "Thỏi Iridium",
        "count": 5,
        "nameEn": "Iridium Bar",
        "iconUrl": "assets/icons/ing_iridium_bar.png"
      },
      {
        "name": "Tinh chất mặt trời",
        "count": 30,
        "nameEn": "Solar Essence",
        "iconUrl": "assets/icons/ing_solar_essence.png"
      },
      {
        "name": "Tinh chất hư vô",
        "count": 50,
        "nameEn": "Void Essence",
        "iconUrl": "assets/icons/ing_void_essence.png"
      }
    ],
    "desc": "CHIẾC NHẪN MẠNH NHẤT GAME: Tích hợp cùng lúc cả 3 hiệu ứng: Phát sáng quanh người + Nam châm hút đồ từ xa + TĂNG 10% TỔNG SỨC TẤN CÔNG!",
    "tips": "Có thể đeo 2 chiếc Iridium Band cùng lúc hoặc ghép nhẫn tại lò rèn Volcano Forge.",
    "wikiFile": "Iridium_Band.png",
    "imageUrl": "assets/icons/iridium_band.png",
    "localImageUrl": "assets/icons/iridium_band.png"
  },
  {
    "id": "glowstone_ring",
    "name": "Nhẫn Phát Quang Nam Châm",
    "nameEn": "Glowstone Ring",
    "category": "crafting",
    "subCategory": "Nhẫn ma thuật",
    "icon": "💍",
    "source": "Đạt cấp độ Khai Mỏ (Mining) Cấp 4",
    "ingredients": [
      {
        "name": "Tinh chất mặt trời",
        "count": 5,
        "nameEn": "Solar Essence",
        "iconUrl": "assets/icons/ing_solar_essence.png"
      },
      {
        "name": "Thỏi sắt",
        "count": 5,
        "nameEn": "Iron Bar",
        "iconUrl": "assets/icons/ing_iron_bar.png"
      }
    ],
    "desc": "Kết hợp sức mạnh phát sáng của Glow Ring và lực hút của Magnet Ring vào làm một.",
    "tips": "Cực kỳ hữu ích trong các tầng mỏ tối tăm.",
    "wikiFile": "Glowstone_Ring.png",
    "imageUrl": "assets/icons/glowstone_ring.png",
    "localImageUrl": "assets/icons/glowstone_ring.png"
  },
  {
    "id": "warrior_ring",
    "name": "Nhẫn Chiến Binh Bùng Nổ",
    "nameEn": "Warrior Ring",
    "category": "crafting",
    "subCategory": "Nhẫn chiến đấu",
    "icon": "💍",
    "source": "Đạt cấp độ Chiến Đấu (Combat) Cấp 4",
    "ingredients": [
      {
        "name": "Thỏi sắt",
        "count": 10,
        "nameEn": "Iron Bar",
        "iconUrl": "assets/icons/ing_iron_bar.png"
      },
      {
        "name": "Than đá",
        "count": 25,
        "nameEn": "Coal",
        "iconUrl": "assets/icons/ing_coal.png"
      },
      {
        "name": "Nước mắt băng",
        "count": 10,
        "nameEn": "Frozen Tear",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "Khi hạ gục quái vật sẽ có tỉ lệ kích hoạt cơn cuồng nộ Warrior Energy, tăng vọt +10 sức tấn công tạm thời.",
    "tips": "Tuyệt vời khi đối đầu với bầy đàn dơi và sâu bọ.",
    "wikiFile": "Warrior_Ring.png",
    "imageUrl": "assets/icons/warrior_ring.png",
    "localImageUrl": "assets/icons/warrior_ring.png"
  },
  {
    "id": "ring_of_yoba",
    "name": "Nhẫn Hộ Mệnh Thần Yoba",
    "nameEn": "Ring of Yoba",
    "category": "crafting",
    "subCategory": "Nhẫn bảo hộ",
    "icon": "💍",
    "source": "Đạt cấp độ Chiến Đấu (Combat) Cấp 7",
    "ingredients": [
      {
        "name": "Thỏi vàng",
        "count": 5,
        "nameEn": "Gold Bar",
        "iconUrl": "assets/icons/ing_gold_bar.png"
      },
      {
        "name": "Thỏi sắt",
        "count": 5,
        "nameEn": "Iron Bar",
        "iconUrl": "assets/icons/ing_iron_bar.png"
      },
      {
        "name": "Kim cương",
        "count": 1,
        "nameEn": "Diamond",
        "iconUrl": "assets/icons/item_diamond.png"
      }
    ],
    "desc": "Khi bạn nhận sát thương, có tỉ lệ ban phước lành Yoba giúp bạn HOÀN TOÀN BẤT TỬ trong 5 giây!",
    "tips": "Chiếc phao cứu sinh thần kỳ khi bị vây ráp trong Skull Cavern.",
    "wikiFile": "Ring_of_Yoba.png",
    "imageUrl": "assets/icons/ring_of_yoba.png",
    "localImageUrl": "assets/icons/ring_of_yoba.png"
  },
  {
    "id": "mystic_tree_seed",
    "name": "Hạt Giống Cây Thần Kỳ (Mới 1.6)",
    "nameEn": "Mystic Tree Seed",
    "category": "crafting",
    "subCategory": "Đồ Mới Bản 1.6",
    "icon": "🌰",
    "version16": true,
    "source": "Mở khóa Foraging Mastery tại Căn Hang Bậc Thầy",
    "ingredients": [
      {
        "name": "Hạt sồi Acorn",
        "count": 5,
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Hạt phong Maple Seed",
        "count": 5,
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Hạt thông Pine Cone",
        "count": 5,
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Hạt dái ngựa Mahogany Seed",
        "count": 5,
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "CÂY MỚI 1.6 ĐỘC QUYỀN: Gieo trồng sẽ lớn thành Cây Huyền Bí (Mystic Tree). Khi gắn ống chiết Tapper vào sẽ thu được Siro Thần Bí (Mystic Syrup) siêu quý giá!",
    "tips": "Cây phát sáng lung linh trong đêm.",
    "wikiFile": "Mystic_Tree_Seed.png",
    "imageUrl": "assets/icons/mystic_tree_seed.png",
    "localImageUrl": "assets/icons/mystic_tree_seed.png"
  },
  {
    "id": "blue_grass_starter",
    "name": "Khóm Cỏ Xanh Thần Dược (Mới 1.6)",
    "nameEn": "Blue Grass Starter",
    "category": "crafting",
    "subCategory": "Đồ Mới Bản 1.6",
    "icon": "🌱",
    "version16": true,
    "source": "Mua công thức trong Qi's Walnut Room (40 Qi Gems)",
    "ingredients": [
      {
        "name": "Sợi gai",
        "count": 25,
        "nameEn": "Fiber",
        "iconUrl": "assets/icons/ing_fiber.png"
      },
      {
        "name": "Rêu tươi",
        "count": 10,
        "nameEn": "Moss",
        "iconUrl": "assets/icons/ing_moss.png"
      },
      {
        "name": "Siro thần bí",
        "count": 1,
        "nameEn": "Mystic Syrup",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "GIỐNG CỎ MỚI 1.6: Khiến gia súc (bò, cừu, lợn, gà) ăn vào sẽ TĂNG TIM TÌNH BẠN NHANH GẤP ĐÔI và cho sản phẩm chất lượng cao vượt bậc!",
    "tips": "Biến bãi cỏ trang trại thành màu xanh biếc lung linh.",
    "wikiFile": "Blue_Grass_Starter.png",
    "imageUrl": "assets/icons/blue_grass_starter.png",
    "localImageUrl": "assets/icons/blue_grass_starter.png"
  },
  {
    "id": "tea_sapling",
    "name": "Cây Trà Búp Xanh",
    "nameEn": "Tea Sapling",
    "category": "crafting",
    "subCategory": "Cây trồng kinh tế",
    "icon": "🍵",
    "source": "Nhận thư từ Caroline sau sự kiện 2 Tim trong phòng trà riêng",
    "ingredients": [
      {
        "name": "Hạt giống hoang dã",
        "count": 2,
        "nameEn": "Wild Seeds bất kỳ",
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Sợi gai",
        "count": 5,
        "nameEn": "Fiber",
        "iconUrl": "assets/icons/ing_fiber.png"
      },
      {
        "name": "Gỗ",
        "count": 5,
        "nameEn": "Wood",
        "iconUrl": "assets/icons/ing_wood.png"
      }
    ],
    "desc": "Cây trà sống quanh năm (kể cả mùa đông nếu trồng trong nhà). Cho thu hoạch lá trà xanh vào tuần cuối cùng của mỗi mùa.",
    "tips": "Bán cây giống Tea Sapling thu về 250g (trước 1.6 là 500g) là cách kiếm vốn đầu game cực nhanh!",
    "wikiFile": "Tea_Sapling.png",
    "imageUrl": "assets/icons/tea_sapling.png",
    "localImageUrl": "assets/icons/tea_sapling.png"
  },
  {
    "id": "warp_totem_farm",
    "name": "Vật Tổ Dịch Chuyển Về Nông Trại",
    "nameEn": "Warp Totem: Farm",
    "category": "crafting",
    "subCategory": "Dịch chuyển tức thời",
    "icon": "🗿",
    "source": "Đạt cấp độ Hái Lượm (Foraging) Cấp 8",
    "ingredients": [
      {
        "name": "Gỗ cứng",
        "count": 1,
        "nameEn": "Hardwood",
        "iconUrl": "assets/icons/ing_hardwood.png"
      },
      {
        "name": "Mật ong",
        "count": 1,
        "nameEn": "Honey",
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Sợi gai",
        "count": 20,
        "nameEn": "Fiber",
        "iconUrl": "assets/icons/ing_fiber.png"
      }
    ],
    "desc": "Dịch chuyển tức thời bạn về bức tượng trước cửa nhà chính bất kể bạn đang ở đâu.",
    "tips": "Vật phẩm cứu cánh lúc 1:50 sáng khi bạn sắp ngất xỉu vì kiệt sức.",
    "wikiFile": "Warp_Totem:_Farm.png",
    "imageUrl": "assets/icons/warp_totem_farm.png",
    "localImageUrl": "assets/icons/warp_totem_farm.png"
  },
  {
    "id": "warp_totem_mountains",
    "name": "Vật Tổ Dịch Chuyển Lên Vùng Núi",
    "nameEn": "Warp Totem: Mountains",
    "category": "crafting",
    "subCategory": "Dịch chuyển tức thời",
    "icon": "🗿",
    "source": "Đạt cấp độ Hái Lượm (Foraging) Cấp 7",
    "ingredients": [
      {
        "name": "Gỗ cứng",
        "count": 1,
        "nameEn": "Hardwood",
        "iconUrl": "assets/icons/ing_hardwood.png"
      },
      {
        "name": "Quặng sắt",
        "count": 1,
        "nameEn": "Iron Ore",
        "iconUrl": "assets/icons/ing_iron_ore.png"
      },
      {
        "name": "Đá",
        "count": 25,
        "nameEn": "Stone",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "Dịch chuyển tức thì đến ngay trước cửa Hầm mỏ và Hội Mạo Hiểm.",
    "tips": "Giúp tiết kiệm nửa tiếng đi bộ lên núi cày quặng.",
    "wikiFile": "Warp_Totem:_Mountains.png",
    "imageUrl": "assets/icons/warp_totem_mountains.png",
    "localImageUrl": "assets/icons/warp_totem_mountains.png"
  },
  {
    "id": "warp_totem_beach",
    "name": "Vật Tổ Dịch Chuyển Ra Bãi Biển",
    "nameEn": "Warp Totem: Beach",
    "category": "crafting",
    "subCategory": "Dịch chuyển tức thời",
    "icon": "🗿",
    "source": "Đạt cấp độ Hái Lượm (Foraging) Cấp 6",
    "ingredients": [
      {
        "name": "Gỗ cứng",
        "count": 1,
        "nameEn": "Hardwood",
        "iconUrl": "assets/icons/ing_hardwood.png"
      },
      {
        "name": "San hô",
        "count": 2,
        "nameEn": "Coral",
        "iconUrl": "assets/icons/item_coral.png"
      },
      {
        "name": "Sợi gai",
        "count": 10,
        "nameEn": "Fiber",
        "iconUrl": "assets/icons/ing_fiber.png"
      }
    ],
    "desc": "Dịch chuyển tức thì ra bờ biển Pelican Town cạnh bến tàu Willy.",
    "tips": "Tuyệt vời để ra biển câu cá sáng sớm hoặc bắt tàu ra Đảo Gừng.",
    "wikiFile": "Warp_Totem:_Beach.png",
    "imageUrl": "assets/icons/warp_totem_beach.png",
    "localImageUrl": "assets/icons/warp_totem_beach.png"
  },
  {
    "id": "warp_totem_desert",
    "name": "Vật Tổ Dịch Chuyển Sa Mạc Calico",
    "nameEn": "Warp Totem: Desert",
    "category": "crafting",
    "subCategory": "Dịch chuyển tức thời",
    "icon": "🗿",
    "source": "Mua công thức từ Desert Trader (đổi 10 Iridium Bar)",
    "ingredients": [
      {
        "name": "Gỗ cứng",
        "count": 2,
        "nameEn": "Hardwood",
        "iconUrl": "assets/icons/ing_hardwood.png"
      },
      {
        "name": "Dừa khô",
        "count": 1,
        "nameEn": "Coconut",
        "iconUrl": "assets/icons/item_coconut.png"
      },
      {
        "name": "Quặng Iridium",
        "count": 4,
        "nameEn": "Iridium Ore",
        "iconUrl": "assets/icons/item_iridium_ore.png"
      }
    ],
    "desc": "Dịch chuyển đến Sa Mạc Calico lúc 6:00 sáng mà không cần đợi xe buýt Pam mở lúc 9:00!",
    "tips": "Giúp bạn có thêm 3-4 tiếng vàng ngọc cày Skull Cavern.",
    "wikiFile": "Warp_Totem:_Desert.png",
    "imageUrl": "assets/icons/warp_totem_desert.png",
    "localImageUrl": "assets/icons/warp_totem_desert.png"
  },
  {
    "id": "warp_totem_island",
    "name": "Vật Tổ Dịch Chuyển Đảo Gừng",
    "nameEn": "Warp Totem: Island",
    "category": "crafting",
    "subCategory": "Dịch chuyển tức thời",
    "icon": "🗿",
    "source": "Mua từ Volcano Dwarf Dungeon (10,000g)",
    "ingredients": [
      {
        "name": "Gỗ cứng",
        "count": 5,
        "nameEn": "Hardwood",
        "iconUrl": "assets/icons/ing_hardwood.png"
      },
      {
        "name": "Răng rồng Dragon Tooth",
        "count": 1,
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Củ gừng tươi Ginger",
        "count": 1,
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "Dịch chuyển tức thì đến bãi biển Đảo Gừng nhiệt đới.",
    "tips": "Không tốn 1,000g tiền vé thuyền của Willy.",
    "wikiFile": "Warp_Totem:_Island.png",
    "imageUrl": "assets/icons/warp_totem_island.png",
    "localImageUrl": "assets/icons/warp_totem_island.png"
  },
  {
    "id": "rain_totem",
    "name": "Vật Tổ Gọi Mưa Thần Bí",
    "nameEn": "Rain Totem",
    "category": "crafting",
    "subCategory": "Kiểm soát thời tiết",
    "icon": "🌧️",
    "source": "Đạt cấp độ Hái Lượm (Foraging) Cấp 9",
    "ingredients": [
      {
        "name": "Gỗ cứng",
        "count": 1,
        "nameEn": "Hardwood",
        "iconUrl": "assets/icons/ing_hardwood.png"
      },
      {
        "name": "Dầu nấm Truffle Oil",
        "count": 1,
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Nhựa thông",
        "count": 5,
        "nameEn": "Pine Tar",
        "iconUrl": "assets/icons/ing_pine_tar.png"
      }
    ],
    "desc": "CỰC KỲ QUAN TRỌNG: Kích hoạt sẽ biến ngày mai thành MỘT NGÀY MƯA BÃO 100%! Cực kỳ hữu ích để tạo mưa mùa đông hoặc ngày mưa để câu cá Legend và mua nhẫn cầu hôn!",
    "tips": "Dùng để kích hoạt câu đố sáo Nàng Tiên Cá trên Đảo Gừng.",
    "wikiFile": "Rain_Totem.png",
    "imageUrl": "assets/icons/rain_totem.png",
    "localImageUrl": "assets/icons/rain_totem.png"
  },
  {
    "id": "fairy_dust",
    "name": "Bột Phép Thần Tiên",
    "nameEn": "Fairy Dust",
    "category": "crafting",
    "subCategory": "Phù phép hoàn thành tức thì",
    "icon": "✨",
    "source": "Hoàn thành chuỗi nhiệm vụ Người Vợ Thủy Thủ (The Pirate's Wife) của Birdie",
    "ingredients": [
      {
        "name": "Kim cương",
        "count": 1,
        "nameEn": "Diamond",
        "iconUrl": "assets/icons/item_diamond.png"
      },
      {
        "name": "Hoa hồng tiên Fairy Rose",
        "count": 1,
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "Rắc lên bất kỳ cỗ máy nào (Keg, Cask, Lò nung, Hũ ngâm...) để cỗ máy HOÀN THÀNH NGAY LẬP TỨC mà không cần đợi!",
    "tips": "Dùng để hoàn thành ngay mẻ rượu Iridium trong hầm rượu.",
    "wikiFile": "Fairy_Dust.png",
    "imageUrl": "assets/icons/fairy_dust.png",
    "localImageUrl": "assets/icons/fairy_dust.png"
  },
  {
    "id": "monster_musk",
    "name": "Nước Hoa Dụ Quái Vật",
    "nameEn": "Monster Musk",
    "category": "crafting",
    "subCategory": "Chiến đấu & Săn quái",
    "icon": "🧪",
    "source": "Hoàn thành nhiệm vụ Prismatic Jelly của Pháp sư Rasmodius",
    "ingredients": [
      {
        "name": "Cánh dơi",
        "count": 30,
        "nameEn": "Bat Wing",
        "iconUrl": "assets/icons/ing_bat_wing.png"
      },
      {
        "name": "Chất nhờn",
        "count": 30,
        "nameEn": "Slime",
        "iconUrl": "assets/icons/ing_slime.png"
      }
    ],
    "desc": "Xịt vào người sẽ NHÂN ĐÔI TỶ LỆ XUẤT HIỆN QUÁI VẬT trong hầm mỏ trong vòng 10 phút!",
    "tips": "Vật phẩm số 1 để hoàn thành các mục tiêu tiêu diệt quái vật trong Monster Eradication Goals.",
    "wikiFile": "Monster_Musk.png",
    "imageUrl": "assets/icons/monster_musk.png",
    "localImageUrl": "assets/icons/monster_musk.png"
  },
  {
    "id": "smelt_copper_bar",
    "name": "Nấu Thỏi Đồng (Copper Bar)",
    "nameEn": "Copper Bar",
    "category": "smelting",
    "subCategory": "Luyện kim cơ bản",
    "icon": "🥉",
    "wikiFile": "Copper_Bar.png",
    "sellPrice": 60,
    "source": "Lò luyện kim (Furnace) - Mất 30 phút game",
    "ingredients": [
      {
        "name": "Quặng đồng",
        "count": 5,
        "nameEn": "Copper Ore",
        "iconUrl": "assets/icons/ing_copper_ore.png"
      },
      {
        "name": "Than đá",
        "count": 1,
        "nameEn": "Coal",
        "iconUrl": "assets/icons/ing_coal.png"
      }
    ],
    "desc": "Nấu từ 5 quặng đồng và 1 than đá. Dùng để nâng cấp dụng cụ lên cấp Đồng, chế tạo máy móc, rương lớn, bình tưới và công trình.",
    "tips": "Nguyên liệu nâng cấp dụng cụ cấp đầu tiên tại tiệm thợ rèn Clint.",
    "imageUrl": "assets/icons/smelt_copper_bar.png",
    "localImageUrl": "assets/icons/smelt_copper_bar.png"
  },
  {
    "id": "smelt_iron_bar",
    "name": "Nấu Thỏi Sắt (Iron Bar)",
    "nameEn": "Iron Bar",
    "category": "smelting",
    "subCategory": "Luyện kim cơ bản",
    "icon": "🥈",
    "wikiFile": "Iron_Bar.png",
    "sellPrice": 120,
    "source": "Lò luyện kim (Furnace) - Mất 2 giờ game",
    "ingredients": [
      {
        "name": "Quặng sắt",
        "count": 5,
        "nameEn": "Iron Ore",
        "iconUrl": "assets/icons/ing_iron_ore.png"
      },
      {
        "name": "Than đá",
        "count": 1,
        "nameEn": "Coal",
        "iconUrl": "assets/icons/ing_coal.png"
      }
    ],
    "desc": "Nấu từ 5 quặng sắt và 1 than đá. Cực kỳ quan trọng để chế tạo Quality Sprinkler, Keg, Cột thu lôi, Đe rèn Anvil và nâng cấp dụng cụ Thép.",
    "tips": "Rìu thép nâng cấp từ thỏi sắt là chìa khóa để chặt cây gỗ tròn mở đường vào Rừng Bí Mật (Secret Woods)!",
    "imageUrl": "assets/icons/smelt_iron_bar.png",
    "localImageUrl": "assets/icons/smelt_iron_bar.png"
  },
  {
    "id": "smelt_gold_bar",
    "name": "Nấu Thỏi Vàng (Gold Bar)",
    "nameEn": "Gold Bar",
    "category": "smelting",
    "subCategory": "Luyện kim cao cấp",
    "icon": "🥇",
    "wikiFile": "Gold_Bar.png",
    "sellPrice": 250,
    "source": "Lò luyện kim (Furnace) - Mất 5 giờ game",
    "ingredients": [
      {
        "name": "Quặng vàng",
        "count": 5,
        "nameEn": "Gold Ore",
        "iconUrl": "assets/icons/ing_gold_ore.png"
      },
      {
        "name": "Than đá",
        "count": 1,
        "nameEn": "Coal",
        "iconUrl": "assets/icons/ing_coal.png"
      }
    ],
    "desc": "Nấu từ 5 quặng vàng và 1 than đá. Cần thiết cho Iridium Sprinkler, Crystalarium, Mini-Obelisk và nâng cấp dụng cụ Vàng diện rộng 3x3.",
    "tips": "Quặng vàng tìm thấy nhiều nhất từ tầng 80 trở đi trong mỏ.",
    "imageUrl": "assets/icons/smelt_gold_bar.png",
    "localImageUrl": "assets/icons/smelt_gold_bar.png"
  },
  {
    "id": "smelt_iridium_bar",
    "name": "Nấu Thỏi Iridium Tối Thượng (Iridium Bar)",
    "nameEn": "Iridium Bar",
    "category": "smelting",
    "subCategory": "Kim loại huyền thoại",
    "icon": "💎",
    "wikiFile": "Iridium_Bar.png",
    "sellPrice": 1000,
    "source": "Lò luyện kim (Furnace) - Mất 8 giờ game",
    "ingredients": [
      {
        "name": "Quặng Iridium",
        "count": 5,
        "nameEn": "Iridium Ore",
        "iconUrl": "assets/icons/item_iridium_ore.png"
      },
      {
        "name": "Than đá",
        "count": 1,
        "nameEn": "Coal",
        "iconUrl": "assets/icons/ing_coal.png"
      }
    ],
    "desc": "KIM LOẠI QUÝ GIÁ NHẤT: Dùng nâng cấp dụng cụ Iridium (tưới/cuốc 18 ô một lần), chế tạo Vòng tay Iridium Band, Bình tưới Iridium Sprinkler và các Tháp Obelisk.",
    "tips": "Kiếm quặng Iridium nhanh nhất bằng cách đi sâu vào Skull Cavern tầng 50+ hoặc nhận Tượng Hoàn Hảo (Statue of Perfection) từ bia mộ Ông Nội.",
    "imageUrl": "assets/icons/smelt_iridium_bar.png",
    "localImageUrl": "assets/icons/smelt_iridium_bar.png"
  },
  {
    "id": "smelt_refined_quartz",
    "name": "Luyện Thạch Anh Tinh Luyện (Refined Quartz)",
    "nameEn": "Refined Quartz",
    "category": "smelting",
    "subCategory": "Vật liệu tinh chế",
    "icon": "💎",
    "wikiFile": "Refined_Quartz.png",
    "sellPrice": 50,
    "source": "Lò luyện kim (1.5 giờ) HOẶC Bỏ Kính vỡ/Đĩa CD vỡ vào Máy tái chế (100% ra thạch anh ngay lập tức)",
    "ingredients": [
      {
        "name": "Thạch anh",
        "count": 1,
        "nameEn": "Quartz",
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Than đá",
        "count": 1,
        "nameEn": "Coal",
        "iconUrl": "assets/icons/ing_coal.png"
      }
    ],
    "desc": "Thạch anh đã qua tinh chế trong suốt. Dùng để chế tạo Quality Sprinkler, Cột thu lôi, Máy tính nông trại và lát đường pha lê.",
    "tips": "Tái chế Broken Glasses hoặc Broken CD bằng Recycling Machine sẽ nhận Refined Quartz mà không tốn than đá!",
    "imageUrl": "assets/icons/smelt_refined_quartz.png",
    "localImageUrl": "assets/icons/smelt_refined_quartz.png"
  },
  {
    "id": "smelt_radioactive_bar",
    "name": "Nấu Thỏi Phóng Xạ (Radioactive Bar)",
    "nameEn": "Radioactive Bar",
    "category": "smelting",
    "subCategory": "Vật liệu nguy hiểm",
    "icon": "☢️",
    "wikiFile": "Radioactive_Bar.png",
    "sellPrice": 3000,
    "source": "Lò luyện kim (Furnace) - Mất 10 giờ game",
    "ingredients": [
      {
        "name": "Quặng phóng xạ",
        "count": 5,
        "nameEn": "Radioactive Ore",
        "iconUrl": "assets/icons/ing_radioactive_ore.png"
      },
      {
        "name": "Than đá",
        "count": 1,
        "nameEn": "Coal",
        "iconUrl": "assets/icons/ing_coal.png"
      }
    ],
    "desc": "Thỏi kim loại phát quang phóng xạ cực hiếm. Dùng để chế tạo Ống chiết nhựa siêu tốc Heavy Tapper, Phễu tự động Hopper và Mồi ma thuật Magic Bait.",
    "tips": "Quặng phóng xạ chỉ xuất hiện khi kích hoạt nhiệm vụ Danger in the Mines hoặc Skull Cavern Invasion của Mr. Qi!",
    "imageUrl": "assets/icons/smelt_radioactive_bar.png",
    "localImageUrl": "assets/icons/smelt_radioactive_bar.png"
  },
  {
    "id": "transmute_fe",
    "name": "Biến Đổi Vật Chất Đồng Sang Sắt (Transmute Fe)",
    "nameEn": "Transmute (Fe)",
    "category": "smelting",
    "subCategory": "Giả kim thuật",
    "icon": "✨",
    "wikiFile": "Iron_Bar.png",
    "sellPrice": 120,
    "source": "Đạt cấp độ Khai Mỏ (Mining) Cấp 4",
    "ingredients": [
      {
        "name": "Thỏi đồng",
        "count": 3,
        "nameEn": "Copper Bar",
        "iconUrl": "assets/icons/ing_copper_bar.png"
      }
    ],
    "desc": "Dùng thuật giả kim nén 3 thỏi đồng thành 1 thỏi sắt thành phẩm trực tiếp từ menu chế tạo đồ mà không cần lò nung.",
    "tips": "Tiện lợi khi bạn thừa quá nhiều đồng nhưng đang thiếu sắt gấp.",
    "imageUrl": "assets/icons/transmute_fe.png",
    "localImageUrl": "assets/icons/transmute_fe.png"
  },
  {
    "id": "transmute_au",
    "name": "Biến Đổi Vật Chất Sắt Sang Vàng (Transmute Au)",
    "nameEn": "Transmute (Au)",
    "category": "smelting",
    "subCategory": "Giả kim thuật",
    "icon": "✨",
    "wikiFile": "Gold_Bar.png",
    "sellPrice": 250,
    "source": "Đạt cấp độ Khai Mỏ (Mining) Cấp 7",
    "ingredients": [
      {
        "name": "Thỏi sắt",
        "count": 2,
        "nameEn": "Iron Bar",
        "iconUrl": "assets/icons/ing_iron_bar.png"
      }
    ],
    "desc": "Dùng thuật giả kim nén 2 thỏi sắt thành 1 thỏi vàng nguyên chất trong tích tắc.",
    "tips": "Rất hữu dụng khi cần vàng gấp chế tạo bình tưới Iridium.",
    "imageUrl": "assets/icons/transmute_au.png",
    "localImageUrl": "assets/icons/transmute_au.png"
  },
  {
    "id": "craft_bait",
    "name": "Chế Tạo Mồi Câu Cá Tiêu Chuẩn (Bait)",
    "nameEn": "Bait",
    "category": "bait",
    "subCategory": "Mồi câu cá",
    "icon": "🪱",
    "wikiFile": "Bait.png",
    "sellPrice": 1,
    "source": "Đạt cấp độ Câu Cá (Fishing) Cấp 2 (Tạo ra 5 mồi)",
    "ingredients": [
      {
        "name": "Thịt bọ",
        "count": 1,
        "nameEn": "Bug Meat",
        "iconUrl": "assets/icons/ing_bug_meat.png"
      }
    ],
    "desc": "Mồi câu cá cơ bản nhất. Giúp cá cắn câu nhanh hơn 50% và giảm khả năng kéo lên rác rưởi. Bắt buộc phải có để lồng bẫy Crab Pot hoạt động.",
    "tips": "Đánh bọ sâu trong các tầng mỏ 15-25 để kiếm hàng trăm Bug Meat làm mồi miễn phí.",
    "imageUrl": "assets/icons/craft_bait.png",
    "localImageUrl": "assets/icons/craft_bait.png"
  },
  {
    "id": "craft_magnet",
    "name": "Chế Tạo Nam Châm Hút Kho Báu (Magnet)",
    "nameEn": "Magnet",
    "category": "bait",
    "subCategory": "Mồi câu đặc biệt",
    "icon": "🧲",
    "wikiFile": "Magnet.png",
    "sellPrice": 15,
    "source": "Đạt cấp độ Câu Cá (Fishing) Cấp 9 (Tạo ra 3 chiếc)",
    "ingredients": [
      {
        "name": "Thỏi sắt",
        "count": 1,
        "nameEn": "Iron Bar",
        "iconUrl": "assets/icons/ing_iron_bar.png"
      }
    ],
    "desc": "Gắn vào cần câu như mồi câu. TĂNG GẤP ĐÔI TỶ LỆ XUẤT HIỆN RƯƠNG KHO BÁU (Treasure Chest) khi câu cá từ 15% lên 30%!",
    "tips": "Dùng để săn cổ vật Artifacts, sách thất lạc và vũ khí xịn từ rương câu cá.",
    "imageUrl": "assets/icons/craft_magnet.png",
    "localImageUrl": "assets/icons/craft_magnet.png"
  },
  {
    "id": "farmhouse_upgrade_1",
    "name": "Nâng Cấp Nhà Cấp 1 (Thêm Nhà Bếp & Giường Đôi)",
    "nameEn": "Farmhouse Upgrade 1",
    "category": "farmhouse",
    "subCategory": "Nâng cấp nhà chính",
    "icon": "🏠",
    "wikiFile": "House_Stage_2.png",
    "source": "Tiệm Thợ Mộc Robin (Mất 3 ngày thi công)",
    "ingredients": [
      {
        "name": "Gỗ",
        "count": 450,
        "nameEn": "Wood",
        "iconUrl": "assets/icons/ing_wood.png"
      },
      {
        "name": "Tiền vàng",
        "count": 10000,
        "nameEn": "Gold",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "Mở rộng căn nhà: Thêm một Căn Bếp hoàn chỉnh với Bếp nấu ăn và Tủ lạnh lưu trữ (36 ô), nâng cấp giường đơn thành Giường Đôi (điều kiện bắt buộc để có thể kết hôn)!",
    "tips": "Mở khóa toàn bộ tính năng Nấu ăn (Cooking Recipes) của trò chơi!",
    "imageUrl": "assets/icons/farmhouse_upgrade_1.png",
    "localImageUrl": "assets/icons/farmhouse_upgrade_1.png"
  },
  {
    "id": "farmhouse_upgrade_2",
    "name": "Nâng Cấp Nhà Cấp 2 (Phòng Trẻ Em & Sinh Con)",
    "nameEn": "Farmhouse Upgrade 2",
    "category": "farmhouse",
    "subCategory": "Nâng cấp nhà chính",
    "icon": "🏡",
    "wikiFile": "House_Stage_3.png",
    "source": "Tiệm Thợ Mộc Robin (Mất 3 ngày thi công)",
    "ingredients": [
      {
        "name": "Gỗ cứng",
        "count": 150,
        "nameEn": "Hardwood",
        "iconUrl": "assets/icons/ing_hardwood.png"
      },
      {
        "name": "Tiền vàng",
        "count": 50000,
        "nameEn": "Gold",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "Thêm 2 căn phòng mới: 1 phòng ngủ trẻ em có sẵn cũi em bé và 2 giường đơn (cho phép bạn sinh hoặc nhận nuôi 2 đứa con cùng vợ/chồng), và 1 phòng khách sinh hoạt rộng rãi.",
    "tips": "Hãy tích trữ Hardwood từ Secret Woods và cây Mahogany.",
    "imageUrl": "assets/icons/farmhouse_upgrade_2.png",
    "localImageUrl": "assets/icons/farmhouse_upgrade_2.png"
  },
  {
    "id": "farmhouse_upgrade_3",
    "name": "Nâng Cấp Nhà Cấp 3: Hầm Rượu Gia Truyền (Cellar)",
    "nameEn": "Farmhouse Upgrade 3 / Cellar",
    "category": "farmhouse",
    "subCategory": "Nâng cấp nhà chính",
    "icon": "🍷",
    "wikiFile": "Cask.png",
    "source": "Tiệm Thợ Mộc Robin (Mất 3 ngày thi công)",
    "ingredients": [
      {
        "name": "Tiền vàng",
        "count": 100000,
        "nameEn": "Gold",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "Xây dựng một căn Hầm ngầm khổng lồ dưới lòng đất và trang bị sẵn 33 Thùng ủ gỗ sồi (Cask). Cho phép ủ Rượu vang và Phô mai lên chất lượng sao Iridium để NHÂN ĐÔI GIÁ TRỊ!",
    "tips": "Bạn có thể tự đóng thêm Casks để xếp kín căn hầm lên tới 189 thùng ủ cùng lúc!",
    "imageUrl": "assets/icons/farmhouse_upgrade_3.png",
    "localImageUrl": "assets/icons/farmhouse_upgrade_3.png"
  },
  {
    "id": "farmhouse_renovations_16",
    "name": "Cải Tạo & Mở Rộng Phòng Miễn Phí (Bản 1.6 Mới)",
    "nameEn": "Farmhouse Renovations (Attic & Dining)",
    "category": "farmhouse",
    "subCategory": "Cải tạo nhà miễn phí",
    "icon": "🛋️",
    "version16": true,
    "wikiFile": "Robin.png",
    "source": "Menu 'House Renovations' tại tiệm Robin (Sau khi nâng cấp Nhà 2)",
    "ingredients": [
      {
        "name": "Miễn phí",
        "count": 0,
        "nameEn": "0 Gold",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "TÍNH NĂNG MỚI 1.6: Robin sẽ thi công hoàn toàn MIỄN PHÍ các phần mở rộng: Gác mái (Attic mới 1.6), Phòng ăn (Dining Room mới 1.6), Phòng góc (Corner Room), Phòng hướng nam (Southern Room), hoặc Gỡ bỏ cũi trẻ em (Remove Crib)!",
    "tips": "Mở rộng diện tích ngôi nhà lên cực lớn để trưng bày đồ đạc và hòm rương.",
    "imageUrl": "assets/icons/farmhouse_renovations_16.png",
    "localImageUrl": "assets/icons/farmhouse_renovations_16.png"
  },
  {
    "id": "bldg_coop_1",
    "name": "Chuồng Gia Cầm Cơ Bản (Coop)",
    "nameEn": "Coop",
    "category": "buildings",
    "subCategory": "Chuồng chăn nuôi",
    "icon": "🐔",
    "wikiFile": "Coop.png",
    "source": "Tiệm Thợ Mộc Robin (Xây trong 3 ngày)",
    "ingredients": [
      {
        "name": "Gỗ",
        "count": 300,
        "nameEn": "Wood",
        "iconUrl": "assets/icons/ing_wood.png"
      },
      {
        "name": "Đá",
        "count": 100,
        "nameEn": "Stone",
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Tiền vàng",
        "count": 4000,
        "nameEn": "Gold",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "Chuồng nuôi tối đa 4 gia cầm: Gà trắng, Gà nâu, Gà đen (Void Chicken). Sản xuất trứng gà mỗi sáng.",
    "tips": "Hãy xây Silo tích cỏ trước khi mua gà từ tiệm Marnie.",
    "imageUrl": "assets/icons/bldg_coop_1.png",
    "localImageUrl": "assets/icons/bldg_coop_1.png"
  },
  {
    "id": "bldg_coop_2",
    "name": "Nâng Cấp Chuồng Gia Cầm Lớn (Big Coop)",
    "nameEn": "Big Coop",
    "category": "buildings",
    "subCategory": "Chuồng chăn nuôi",
    "icon": "🦆",
    "wikiFile": "Big_Coop.png",
    "source": "Tiệm Thợ Mộc Robin (Nâng cấp từ Coop thường, 2 ngày)",
    "ingredients": [
      {
        "name": "Gỗ",
        "count": 400,
        "nameEn": "Wood",
        "iconUrl": "assets/icons/ing_wood.png"
      },
      {
        "name": "Đá",
        "count": 150,
        "nameEn": "Stone",
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Tiền vàng",
        "count": 10000,
        "nameEn": "Gold",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "Mở rộng sức chứa lên 8 gia cầm. MỞ KHÓA MÁY ẤP TRỨNG (Incubator) và cho phép nuôi Vịt (Duck - cho trứng vịt và lông vịt), Khủng Long (Dinosaur - ấp từ Dinosaur Egg)!",
    "tips": "Cho trứng khủng long vào máy ấp để nuôi bầy khủng long trên trang trại.",
    "imageUrl": "assets/icons/bldg_coop_2.png",
    "localImageUrl": "assets/icons/bldg_coop_2.png"
  },
  {
    "id": "bldg_coop_3",
    "name": "Chuồng Gia Cầm Hoàng Gia (Deluxe Coop)",
    "nameEn": "Deluxe Coop",
    "category": "buildings",
    "subCategory": "Chuồng chăn nuôi cao cấp",
    "icon": "🐰",
    "wikiFile": "Deluxe_Coop.png",
    "source": "Tiệm Thợ Mộc Robin (Nâng cấp từ Big Coop, 2 ngày)",
    "ingredients": [
      {
        "name": "Gỗ",
        "count": 500,
        "nameEn": "Wood",
        "iconUrl": "assets/icons/ing_wood.png"
      },
      {
        "name": "Đá",
        "count": 200,
        "nameEn": "Stone",
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Tiền vàng",
        "count": 20000,
        "nameEn": "Gold",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "CẤP ĐỘ CAO NHẤT: Chứa 12 gia cầm. TÍCH HỢP HỆ THỐNG TỰ ĐỘNG NẠP CỎ (Auto-Feed System) từ Silo mỗi sáng và MỞ KHÓA NUÔI THỎ (Rabbit - rớt Lông Thỏ và Chân Thỏ may mắn)!",
    "tips": "Bạn không bao giờ phải mất công bỏ cỏ khô vào máng bằng tay nữa.",
    "imageUrl": "assets/icons/bldg_coop_3.png",
    "localImageUrl": "assets/icons/bldg_coop_3.png"
  },
  {
    "id": "bldg_barn_1",
    "name": "Chuồng Gia Súc Cơ Bản (Barn)",
    "nameEn": "Barn",
    "category": "buildings",
    "subCategory": "Chuồng chăn nuôi",
    "icon": "🐄",
    "wikiFile": "Barn.png",
    "source": "Tiệm Thợ Mộc Robin (Xây trong 3 ngày)",
    "ingredients": [
      {
        "name": "Gỗ",
        "count": 350,
        "nameEn": "Wood",
        "iconUrl": "assets/icons/ing_wood.png"
      },
      {
        "name": "Đá",
        "count": 150,
        "nameEn": "Stone",
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Tiền vàng",
        "count": 6000,
        "nameEn": "Gold",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "Chuồng nuôi tối đa 4 gia súc lớn: Bò sữa (Cow). Dùng xô vắt sữa Milk Pail để thu hoạch sữa bò mỗi sáng làm phô mai.",
    "tips": "Bò có thể cho Sữa Lớn (Large Milk) khi đạt nhiều tim thân thiết.",
    "imageUrl": "assets/icons/bldg_barn_1.png",
    "localImageUrl": "assets/icons/bldg_barn_1.png"
  },
  {
    "id": "bldg_barn_2",
    "name": "Nâng Cấp Chuồng Gia Súc Lớn (Big Barn)",
    "nameEn": "Big Barn",
    "category": "buildings",
    "subCategory": "Chuồng chăn nuôi",
    "icon": "🐐",
    "wikiFile": "Big_Barn.png",
    "source": "Tiệm Thợ Mộc Robin (Nâng cấp từ Barn thường, 2 ngày)",
    "ingredients": [
      {
        "name": "Gỗ",
        "count": 450,
        "nameEn": "Wood",
        "iconUrl": "assets/icons/ing_wood.png"
      },
      {
        "name": "Đá",
        "count": 200,
        "nameEn": "Stone",
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Tiền vàng",
        "count": 12000,
        "nameEn": "Gold",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "Chứa 8 gia súc. Cho phép gia súc SINH SẢN TỰ NHIÊN và MỞ KHÓA MUA DÊ (Goat - cho sữa dê giá cao cách ngày 1 lần).",
    "tips": "Phô mai dê (Goat Cheese) có giá bán rất cao.",
    "imageUrl": "assets/icons/bldg_barn_2.png",
    "localImageUrl": "assets/icons/bldg_barn_2.png"
  },
  {
    "id": "bldg_barn_3",
    "name": "Chuồng Gia Súc Hoàng Gia (Deluxe Barn)",
    "nameEn": "Deluxe Barn",
    "category": "buildings",
    "subCategory": "Chuồng chăn nuôi cao cấp",
    "icon": "🐖",
    "wikiFile": "Deluxe_Barn.png",
    "source": "Tiệm Thợ Mộc Robin (Nâng cấp từ Big Barn, 2 ngày)",
    "ingredients": [
      {
        "name": "Gỗ",
        "count": 550,
        "nameEn": "Wood",
        "iconUrl": "assets/icons/ing_wood.png"
      },
      {
        "name": "Đá",
        "count": 300,
        "nameEn": "Stone",
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Tiền vàng",
        "count": 25000,
        "nameEn": "Gold",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "CẤP ĐỘ TỐI THƯỢNG: Chứa 12 gia súc lớn, TỰ ĐỘNG NẠP CỎ KHÔ TỪ SILO. MỞ KHÓA NUÔI CỪU (Sheep) VÀ ĐẶC BIỆT LÀ ĐÀN LỢN (Pigs - Đào Nấm Truffle đắt giá bậc nhất game)!",
    "tips": "Nuôi 1 đàn lợn 12 con thả rông ngoài bãi cỏ vào mùa xuân, hè, thu sẽ kiếm hàng chục nghìn vàng tiền Dầu Nấm Truffle mỗi ngày!",
    "imageUrl": "assets/icons/bldg_barn_3.png",
    "localImageUrl": "assets/icons/bldg_barn_3.png"
  },
  {
    "id": "bldg_silo",
    "name": "Tháp Chứa Cỏ Khô (Silo)",
    "nameEn": "Silo",
    "category": "buildings",
    "subCategory": "Kho chứa thức ăn gia súc",
    "icon": "🌾",
    "wikiFile": "Silo.png",
    "source": "Tiệm Thợ Mộc Robin (Xây trong 2 ngày)",
    "ingredients": [
      {
        "name": "Đá",
        "count": 100,
        "nameEn": "Stone",
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Đất sét",
        "count": 10,
        "nameEn": "Clay",
        "iconUrl": "assets/icons/ing_clay.png"
      },
      {
        "name": "Thỏi đồng",
        "count": 5,
        "nameEn": "Copper Bar",
        "iconUrl": "assets/icons/ing_copper_bar.png"
      },
      {
        "name": "Tiền vàng",
        "count": 100,
        "nameEn": "Gold",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "Lưu trữ tối đa 240 bó cỏ khô. Mỗi khi bạn dùng Lưỡi hái (Scythe) cắt cỏ dại trên trang trại, cỏ sẽ tự động biến thành cỏ khô bay thẳng vào tháp Silo!",
    "tips": "CÔNG TRÌNH NÊN XÂY ĐẦU TIÊN TRƯỚC KHI MUA BẤT KỲ CON GÀ HAY CON BÒ NÀO!",
    "imageUrl": "assets/icons/bldg_silo.png",
    "localImageUrl": "assets/icons/bldg_silo.png"
  },
  {
    "id": "bldg_shed_big",
    "name": "Đại Nhà Xưởng Chế Tạo (Big Shed)",
    "nameEn": "Big Shed",
    "category": "buildings",
    "subCategory": "Xưởng sản xuất",
    "icon": "🏭",
    "wikiFile": "Big_Shed.png",
    "source": "Tiệm Thợ Mộc Robin (Nâng cấp từ Shed thường, 2 ngày)",
    "ingredients": [
      {
        "name": "Gỗ",
        "count": 550,
        "nameEn": "Wood",
        "iconUrl": "assets/icons/ing_wood.png"
      },
      {
        "name": "Đá",
        "count": 300,
        "nameEn": "Stone",
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Tiền vàng",
        "count": 20000,
        "nameEn": "Gold",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "Căn phòng chế tạo có diện tích bên trong GẤP ĐÔI Shed thường. Có thể xếp vừa tới 137 Thùng ủ rượu Keg hoặc Máy làm phô mai, hũ mứt!",
    "tips": "Trung tâm kiếm tiền công nghiệp của mọi nông dân giàu có.",
    "imageUrl": "assets/icons/bldg_shed_big.png",
    "localImageUrl": "assets/icons/bldg_shed_big.png"
  },
  {
    "id": "bldg_mill",
    "name": "Cối Xay Gió (Mill)",
    "nameEn": "Mill",
    "category": "buildings",
    "subCategory": "Xay xát nông sản",
    "icon": "💨",
    "wikiFile": "Mill.png",
    "source": "Tiệm Thợ Mộc Robin (Xây trong 2 ngày)",
    "ingredients": [
      {
        "name": "Đá",
        "count": 50,
        "nameEn": "Stone",
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Gỗ",
        "count": 150,
        "nameEn": "Wood",
        "iconUrl": "assets/icons/ing_wood.png"
      },
      {
        "name": "Vải dệt",
        "count": 4,
        "nameEn": "Cloth",
        "iconUrl": "assets/icons/ing_cloth.png"
      },
      {
        "name": "Tiền vàng",
        "count": 2500,
        "nameEn": "Gold",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "Xay xát nông sản qua đêm: 1 Lúa mì (Wheat) -> 1 Bột mì (Wheat Flour); 1 Củ dền (Beet) -> 3 Đường (Sugar); 1 Lúa thô (Unmilled Rice) -> 1 Gạo (Rice).",
    "tips": "Cung cấp nguồn nguyên liệu nấu ăn tự cung tự cấp vô tận.",
    "imageUrl": "assets/icons/bldg_mill.png",
    "localImageUrl": "assets/icons/bldg_mill.png"
  },
  {
    "id": "bldg_fish_pond",
    "name": "Ao Nuôi Cá Thủy Sản (Fish Pond)",
    "nameEn": "Fish Pond",
    "category": "buildings",
    "subCategory": "Nuôi cá chuyên nghiệp",
    "icon": "🐟",
    "wikiFile": "Fish_Pond.png",
    "source": "Tiệm Thợ Mộc Robin (Xây trong 2 ngày)",
    "ingredients": [
      {
        "name": "Đá",
        "count": 200,
        "nameEn": "Stone",
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Rong biển",
        "count": 5,
        "nameEn": "Seaweed",
        "iconUrl": "assets/icons/ing_seaweed.png"
      },
      {
        "name": "Tảo lục",
        "count": 5,
        "nameEn": "Green Algae",
        "iconUrl": "assets/icons/ing_green_algae.png"
      },
      {
        "name": "Tiền vàng",
        "count": 5000,
        "nameEn": "Gold",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "Thả cá sống vào ao để cá sinh sôi nảy nở lên tới 10 con. Mỗi ngày cá sẽ sinh ra Trứng cá (Roe), Mực đen (Squid Ink), hoặc các vật phẩm quý hiếm như Ngọc Trai, Kim Cương, Đá Lăng Kính!",
    "tips": "Nuôi Cá Dung Nham (Lava Eel) trong ao để nước đổi sang màu đỏ rực và thu về Trứng cá đắt nhất game (760g+).",
    "imageUrl": "assets/icons/bldg_fish_pond.png",
    "localImageUrl": "assets/icons/bldg_fish_pond.png"
  },
  {
    "id": "bldg_stable",
    "name": "Chuồng Ngựa Cưỡi (Stable)",
    "nameEn": "Stable",
    "category": "buildings",
    "subCategory": "Phương tiện di chuyển",
    "icon": "🐴",
    "wikiFile": "Stable.png",
    "source": "Tiệm Thợ Mộc Robin (Xây trong 2 ngày)",
    "ingredients": [
      {
        "name": "Gỗ cứng",
        "count": 100,
        "nameEn": "Hardwood",
        "iconUrl": "assets/icons/ing_hardwood.png"
      },
      {
        "name": "Thỏi sắt",
        "count": 5,
        "nameEn": "Iron Bar",
        "iconUrl": "assets/icons/ing_iron_bar.png"
      },
      {
        "name": "Tiền vàng",
        "count": 10000,
        "nameEn": "Gold",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "Bao gồm sẵn MỘT CHÚ NGỰA CƯỠI RIÊNG! Giúp bạn di chuyển khắp thung lũng NHANH HƠN 30% vĩnh viễn (uống thêm cà phê trên lưng ngựa sẽ chạy như tên lửa)!",
    "tips": "Bạn có thể đội các loại mũ thời trang lên đầu chú ngựa của mình.",
    "imageUrl": "assets/icons/bldg_stable.png",
    "localImageUrl": "assets/icons/bldg_stable.png"
  },
  {
    "id": "bldg_slime_hutch",
    "name": "Trang Trại Nuôi Slime (Slime Hutch)",
    "nameEn": "Slime Hutch",
    "category": "buildings",
    "subCategory": "Nuôi quái vật",
    "icon": "🟢",
    "wikiFile": "Slime_Hutch.png",
    "source": "Tiệm Thợ Mộc Robin (Xây trong 2 ngày)",
    "ingredients": [
      {
        "name": "Đá",
        "count": 500,
        "nameEn": "Stone",
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Thạch anh tinh luyện",
        "count": 10,
        "nameEn": "Refined Quartz",
        "iconUrl": "assets/icons/ing_refined_quartz.png"
      },
      {
        "name": "Thỏi Iridium",
        "count": 1,
        "nameEn": "Iridium Bar",
        "iconUrl": "assets/icons/ing_iridium_bar.png"
      },
      {
        "name": "Tiền vàng",
        "count": 10000,
        "nameEn": "Gold",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "Nuôi tối đa 20 con quái vật Slime. Đổ đầy nước vào 4 máng nước mỗi ngày, lũ Slime sẽ sinh ra các quả cầu Slime Ball thu hoạch hàng trăm Slime và Petified Slime.",
    "tips": "Hãy đeo Nhẫn Slime Charmer Ring để không bị lũ Slime cắn gây mất máu.",
    "imageUrl": "assets/icons/bldg_slime_hutch.png",
    "localImageUrl": "assets/icons/bldg_slime_hutch.png"
  },
  {
    "id": "magic_earth_obelisk",
    "name": "Tháp Đất Dịch Chuyển Núi (Earth Obelisk)",
    "nameEn": "Earth Obelisk",
    "category": "magical_buildings",
    "subCategory": "Dịch chuyển vĩnh cửu",
    "icon": "🗼",
    "wikiFile": "Earth_Obelisk.png",
    "source": "Cuốn sách ma thuật tại Tháp Pháp Sư (Sau nhiệm vụ Magic Ink)",
    "ingredients": [
      {
        "name": "Thỏi Iridium",
        "count": 10,
        "nameEn": "Iridium Bar",
        "iconUrl": "assets/icons/ing_iridium_bar.png"
      },
      {
        "name": "Tinh thể đất",
        "count": 10,
        "nameEn": "Earth Crystal",
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Tiền vàng",
        "count": 500000,
        "nameEn": "Gold",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "Bấm vào tháp để DỊCH CHUYỂN TỨC THỜI LÊN VÙNG NÚI (trước cửa Hầm mỏ) VÔ HẠN LẦN mà không tiêu hao vật phẩm!",
    "tips": "Cột mốc quan trọng để đạt 100% Hoàn Hảo (Perfection).",
    "imageUrl": "assets/icons/magic_earth_obelisk.png",
    "localImageUrl": "assets/icons/magic_earth_obelisk.png"
  },
  {
    "id": "magic_water_obelisk",
    "name": "Tháp Nước Dịch Chuyển Biển (Water Obelisk)",
    "nameEn": "Water Obelisk",
    "category": "magical_buildings",
    "subCategory": "Dịch chuyển vĩnh cửu",
    "icon": "🌊",
    "wikiFile": "Water_Obelisk.png",
    "source": "Cuốn sách ma thuật tại Tháp Pháp Sư",
    "ingredients": [
      {
        "name": "Thỏi Iridium",
        "count": 5,
        "nameEn": "Iridium Bar",
        "iconUrl": "assets/icons/ing_iridium_bar.png"
      },
      {
        "name": "Nghêu",
        "count": 10,
        "nameEn": "Clam",
        "iconUrl": "assets/icons/ing_clam.png"
      },
      {
        "name": "San hô",
        "count": 10,
        "nameEn": "Coral",
        "iconUrl": "assets/icons/item_coral.png"
      },
      {
        "name": "Tiền vàng",
        "count": 500000,
        "nameEn": "Gold",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "Dịch chuyển tức thời ra Bãi Biển Pelican Town vô hạn lần.",
    "tips": "Cực kỳ thuận tiện để ra bắt thuyền Willy ra Đảo Gừng.",
    "imageUrl": "assets/icons/magic_water_obelisk.png",
    "localImageUrl": "assets/icons/magic_water_obelisk.png"
  },
  {
    "id": "magic_desert_obelisk",
    "name": "Tháp Cát Dịch Chuyển Sa Mạc (Desert Obelisk)",
    "nameEn": "Desert Obelisk",
    "category": "magical_buildings",
    "subCategory": "Dịch chuyển vĩnh cửu",
    "icon": "🏜️",
    "wikiFile": "Desert_Obelisk.png",
    "source": "Cuốn sách ma thuật tại Tháp Pháp Sư",
    "ingredients": [
      {
        "name": "Thỏi Iridium",
        "count": 20,
        "nameEn": "Iridium Bar",
        "iconUrl": "assets/icons/ing_iridium_bar.png"
      },
      {
        "name": "Quả dừa",
        "count": 10,
        "nameEn": "Coconut",
        "iconUrl": "assets/icons/item_coconut.png"
      },
      {
        "name": "Quả xương rồng",
        "count": 10,
        "nameEn": "Cactus Fruit",
        "iconUrl": "assets/icons/item_cactus_fruit.png"
      },
      {
        "name": "Tiền vàng",
        "count": 1000000,
        "nameEn": "Gold",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "Dịch chuyển tức thì đến Sa mạc Calico vào bất kỳ giờ nào trong ngày (kể cả lúc 6:00 sáng khi Pam chưa đến trạm xe buýt)!",
    "tips": "Bảo bối cày Skull Cavern từ sáng sớm tinh mơ.",
    "imageUrl": "assets/icons/magic_desert_obelisk.png",
    "localImageUrl": "assets/icons/magic_desert_obelisk.png"
  },
  {
    "id": "magic_island_obelisk",
    "name": "Tháp Nhiệt Đới Đảo Gừng (Island Obelisk)",
    "nameEn": "Island Obelisk",
    "category": "magical_buildings",
    "subCategory": "Dịch chuyển vĩnh cửu",
    "icon": "🌴",
    "wikiFile": "Island_Obelisk.png",
    "source": "Cuốn sách ma thuật tại Tháp Pháp Sư",
    "ingredients": [
      {
        "name": "Thỏi Iridium",
        "count": 10,
        "nameEn": "Iridium Bar",
        "iconUrl": "assets/icons/ing_iridium_bar.png"
      },
      {
        "name": "Răng rồng",
        "count": 10,
        "nameEn": "Dragon Tooth",
        "iconUrl": "assets/icons/ing_dragon_tooth.png"
      },
      {
        "name": "Quả chuối",
        "count": 10,
        "nameEn": "Banana",
        "iconUrl": "assets/icons/item_banana.png"
      },
      {
        "name": "Tiền vàng",
        "count": 1000000,
        "nameEn": "Gold",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "Dịch chuyển ngay lập tức giữa Trang trại chính và Trang trại Đảo Gừng nhiệt đới chỉ với 1 cú click!",
    "tips": "Răng rồng nhặt trong Volcano Dungeon hoặc thu từ ao nuôi cá Stingray.",
    "imageUrl": "assets/icons/magic_island_obelisk.png",
    "localImageUrl": "assets/icons/magic_island_obelisk.png"
  },
  {
    "id": "magic_junimo_hut",
    "name": "Túp Lều Tí Hon Thần Rừng (Junimo Hut)",
    "nameEn": "Junimo Hut",
    "category": "magical_buildings",
    "subCategory": "Tự động hóa nông trại",
    "icon": "🍏",
    "wikiFile": "Junimo_Hut.png",
    "source": "Cuốn sách ma thuật tại Tháp Pháp Sư",
    "ingredients": [
      {
        "name": "Đá",
        "count": 100,
        "nameEn": "Stone",
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Quả khế",
        "count": 9,
        "nameEn": "Starfruit",
        "iconUrl": "assets/icons/item_starfruit.png"
      },
      {
        "name": "Sợi gai",
        "count": 200,
        "nameEn": "Fiber",
        "iconUrl": "assets/icons/ing_fiber.png"
      },
      {
        "name": "Tiền vàng",
        "count": 20000,
        "nameEn": "Gold",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "Các chú thần rừng Junimo đáng yêu sẽ sống trong túp lều này và TỰ ĐỘNG THU HOẠCH TẤT CẢ NÔNG SẢN CHÍN trong bán kính 17x17 ô xung quanh lều vào giỏ đựng!",
    "tips": "Tự động hóa 100% việc gặt hái nông trại.",
    "imageUrl": "assets/icons/magic_junimo_hut.png",
    "localImageUrl": "assets/icons/magic_junimo_hut.png"
  },
  {
    "id": "magic_gold_clock",
    "name": "Đồng Hồ Vàng Vĩnh Cửu (Gold Clock)",
    "nameEn": "Gold Clock",
    "category": "magical_buildings",
    "subCategory": "Biểu tượng Hoàn Hảo tối thượng",
    "icon": "⏰",
    "wikiFile": "Gold_Clock.png",
    "source": "Cuốn sách ma thuật tại Tháp Pháp Sư",
    "ingredients": [
      {
        "name": "Tiền vàng",
        "count": 10000000,
        "nameEn": "Gold",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "CÔNG TRÌNH ĐẮT NHẤT VÀ TỐI THƯỢNG NHẤT (10 TRIỆU VÀNG): Ngăn chặn hoàn toàn cỏ dại, đá vụn và cành cây rơi rụng sinh sôi trên nông trại; HÀNG RÀO TRÊN TRANG TRẠI SẼ KHÔNG BAO GIỜ BỊ MỤC NÁT!",
    "tips": "Điều kiện bắt buộc lớn nhất để đạt 100% Perfection.",
    "imageUrl": "assets/icons/magic_gold_clock.png",
    "localImageUrl": "assets/icons/magic_gold_clock.png"
  },
  {
    "id": "tool_copper_upgrades",
    "name": "Bộ Dụng Cụ Cấp Đồng (Copper Tools: Rìu, Cuốc, Bình Nước)",
    "nameEn": "Copper Tool Upgrades",
    "category": "tools",
    "subCategory": "Nâng cấp thợ rèn Clint",
    "icon": "🪓",
    "wikiFile": "Copper_Axe.png",
    "source": "Tiệm Thợ Rèn Clint (Mất 2 ngày nâng cấp)",
    "ingredients": [
      {
        "name": "Thỏi đồng",
        "count": 5,
        "nameEn": "Copper Bar",
        "iconUrl": "assets/icons/ing_copper_bar.png"
      },
      {
        "name": "Tiền vàng",
        "count": 2000,
        "nameEn": "Gold",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "RÌU ĐỒNG: Chặt được gốc cây gỗ cứng Large Stumps. CUỐC CHIM ĐỒNG: Đập vỡ tảng đá lớn trong mỏ. BÌNH TƯỚI & CUỐC ĐẤT ĐỒNG: Giữ nút để tác động một hàng 3 ô thẳng!",
    "tips": "Giảm mạnh số lần vung tay và tiết kiệm năng lượng.",
    "imageUrl": "assets/icons/tool_copper_upgrades.png",
    "localImageUrl": "assets/icons/tool_copper_upgrades.png"
  },
  {
    "id": "tool_steel_upgrades",
    "name": "Bộ Dụng Cụ Cấp Thép (Steel Tools: Rìu, Cuốc, Bình Nước)",
    "nameEn": "Steel Tool Upgrades",
    "category": "tools",
    "subCategory": "Nâng cấp thợ rèn Clint",
    "icon": "🪓",
    "wikiFile": "Steel_Axe.png",
    "source": "Tiệm Thợ Rèn Clint (Nâng cấp từ Copper, mất 2 ngày)",
    "ingredients": [
      {
        "name": "Thỏi sắt",
        "count": 5,
        "nameEn": "Iron Bar",
        "iconUrl": "assets/icons/ing_iron_bar.png"
      },
      {
        "name": "Tiền vàng",
        "count": 5000,
        "nameEn": "Gold",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "RÌU THÉP: Chặt được khúc gỗ tròn lớn nằm ngang (Large Logs) MỞ LỐI VÀO RỪNG BÍ MẬT SECRET WOODS! CUỐC CHIM THÉP: Đập vỡ khối thiên thạch Meteorite. BÌNH TƯỚI & CUỐC ĐẤT: Tác động một hàng 5 ô thẳng!",
    "tips": "Rìu thép là công cụ ưu tiên nâng cấp hàng đầu trong năm 1.",
    "imageUrl": "assets/icons/tool_steel_upgrades.png",
    "localImageUrl": "assets/icons/tool_steel_upgrades.png"
  },
  {
    "id": "tool_gold_upgrades",
    "name": "Bộ Dụng Cụ Cấp Vàng (Gold Tools: 3x3 Diện Rộng)",
    "nameEn": "Gold Tool Upgrades",
    "category": "tools",
    "subCategory": "Nâng cấp thợ rèn Clint",
    "icon": "⛏️",
    "wikiFile": "Gold_Pickaxe.png",
    "source": "Tiệm Thợ Rèn Clint (Nâng cấp từ Steel, mất 2 ngày)",
    "ingredients": [
      {
        "name": "Thỏi vàng",
        "count": 5,
        "nameEn": "Gold Bar",
        "iconUrl": "assets/icons/ing_gold_bar.png"
      },
      {
        "name": "Tiền vàng",
        "count": 10000,
        "nameEn": "Gold",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "BÌNH TƯỚI & CUỐC ĐẤT VÀNG: Giữ nút gồng lực để tưới nước hoặc xới đất TOÀN BỘ KHU VỰC HÌNH VUÔNG 3x3 (9 Ô CÙNG LÚC)! Rìu và Cuốc chim vàng phá vỡ vật cản nhanh như chớp.",
    "tips": "Tưới 100 ô ruộng chỉ trong vài chục giây.",
    "imageUrl": "assets/icons/tool_gold_upgrades.png",
    "localImageUrl": "assets/icons/tool_gold_upgrades.png"
  },
  {
    "id": "tool_iridium_upgrades",
    "name": "Bộ Dụng Cụ Iridium Tối Thượng (Iridium Tools: 6x3 Khổng Lồ)",
    "nameEn": "Iridium Tool Upgrades",
    "category": "tools",
    "subCategory": "Nâng cấp thợ rèn Clint",
    "icon": "💎",
    "wikiFile": "Iridium_Watering_Can.png",
    "source": "Tiệm Thợ Rèn Clint (Nâng cấp từ Gold, mất 2 ngày)",
    "ingredients": [
      {
        "name": "Thỏi Iridium",
        "count": 5,
        "nameEn": "Iridium Bar",
        "iconUrl": "assets/icons/ing_iridium_bar.png"
      },
      {
        "name": "Tiền vàng",
        "count": 25000,
        "nameEn": "Gold",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "CẤP ĐỘ CAO NHẤT: Bình tưới và Cuốc đất Iridium gồng lực tưới/cuốc 18 Ô KHỔNG LỒ (6x3)! Rìu Iridium chặt đổ cây chỉ sau 3 nhát chém, Cuốc chim Iridium đập tan mọi tảng đá trong nháy mắt.",
    "tips": "Đỉnh cao trang bị của người chơi Stardew Valley.",
    "imageUrl": "assets/icons/tool_iridium_upgrades.png",
    "localImageUrl": "assets/icons/tool_iridium_upgrades.png"
  },
  {
    "id": "tool_trashcan_upgrades",
    "name": "Nâng Cấp Thùng Rác Hoàn Tiền (Trash Can Upgrades)",
    "nameEn": "Trash Can Upgrades",
    "category": "tools",
    "subCategory": "Nâng cấp thợ rèn Clint",
    "icon": "🗑️",
    "wikiFile": "Iridium_Trash_Can.png",
    "source": "Tiệm Thợ Rèn Clint (Đồng -> Thép -> Vàng -> Iridium)",
    "ingredients": [
      {
        "name": "Thỏi Iridium",
        "count": 5,
        "nameEn": "Iridium Bar",
        "iconUrl": "assets/icons/ing_iridium_bar.png"
      },
      {
        "name": "Tiền vàng",
        "count": 12500,
        "nameEn": "Gold",
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "Khi vứt bỏ vật phẩm vào Thùng rác trong balo: Cấp Đồng hoàn lại 15% giá trị, Thép hoàn 30%, Vàng hoàn 45%, và Thùng Rác Iridium hoàn lại tới 60% GIÁ BÁN CỦA MỌI ĐỒ VẬT VỨT ĐI!",
    "tips": "Dọn dẹp hòm đồ thoải mái mà không lo tiếc tiền.",
    "imageUrl": "assets/icons/tool_trashcan_upgrades.png",
    "localImageUrl": "assets/icons/tool_trashcan_upgrades.png"
  },
  {
    "id": "tool_iridium_scythe_16",
    "name": "Lưỡi Hái Iridium Gặt Mùa Màng (Mới 1.6)",
    "nameEn": "Iridium Scythe",
    "category": "tools",
    "subCategory": "Đồ Mới Bản 1.6",
    "icon": "🌾",
    "version16": true,
    "wikiFile": "Iridium_Scythe.png",
    "source": "Mở khóa Farming Mastery tại Căn Hang Bậc Thầy (Mastery Cave)",
    "ingredients": [
      {
        "name": "Kinh nghiệm Farming Mastery",
        "count": 1,
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "SIÊU VẬT PHẨM BÁ ĐẠO 1.6: Cho phép gặt TẤT CẢ MỌI LOẠI CÂY TRỒNG VÀ HOA QUẢ (kể cả những cây bình thường phải nhổ bằng tay) trong phạm vi vung lưỡi hái cực rộng! Tăng thêm 75% cỏ khô khi cắt cỏ.",
    "tips": "Thu hoạch hàng nghìn thửa ruộng chỉ trong vài cái vung tay.",
    "imageUrl": "assets/icons/tool_iridium_scythe_16.png",
    "localImageUrl": "assets/icons/tool_iridium_scythe_16.png"
  },
  {
    "id": "forge_infinity_blade",
    "name": "Kiếm Vô Cực Tối Thượng (Infinity Blade)",
    "nameEn": "Infinity Blade",
    "category": "weapons",
    "subCategory": "Vũ khí tối thượng",
    "icon": "🗡️",
    "wikiFile": "Infinity_Blade.png",
    "source": "Rèn tại Miệng Núi Lửa Volcano Forge (Tầng 10)",
    "ingredients": [
      {
        "name": "Thanh kiếm Galaxy Sword",
        "count": 1,
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Linh hồn thiên hà",
        "count": 3,
        "nameEn": "Galaxy Soul",
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Mảnh tàn tích Cinder Shard",
        "count": 60,
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "THANH KIẾM MẠNH NHẤT TRÒ CHƠI (Sát thương 80-100, Tốc độ đánh +4, Phòng thủ +2)! Chém quái vật như cắt bơ.",
    "tips": "Galaxy Souls có thể mua trong Qi's Walnut Room hoặc đổi từ thợ buôn trên Đảo Gừng.",
    "imageUrl": "assets/icons/forge_infinity_blade.png",
    "localImageUrl": "assets/icons/forge_infinity_blade.png"
  },
  {
    "id": "forge_infinity_gavel",
    "name": "Búa Vô Cực Thần Sấm (Infinity Gavel)",
    "nameEn": "Infinity Gavel",
    "category": "weapons",
    "subCategory": "Vũ khí tối thượng",
    "icon": "🔨",
    "wikiFile": "Infinity_Gavel.png",
    "source": "Rèn tại Volcano Forge (Tầng 10)",
    "ingredients": [
      {
        "name": "Búa Galaxy Hammer",
        "count": 1,
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Linh hồn thiên hà",
        "count": 3,
        "nameEn": "Galaxy Soul",
        "iconUrl": "assets/icons/ing_stone.png"
      },
      {
        "name": "Mảnh tàn tích Cinder Shard",
        "count": 60,
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "CÂY BÚA SÁT THƯƠNG KHỦNG NHẤT (100-120 Damage, Phòng thủ +5, Cú đập lan chấn động cực mạnh)!",
    "tips": "Tuyệt phẩm để dọn sạch lũ rồng bay Serpent trong Skull Cavern.",
    "imageUrl": "assets/icons/forge_infinity_gavel.png",
    "localImageUrl": "assets/icons/forge_infinity_gavel.png"
  },
  {
    "id": "forge_enchantments",
    "name": "Phù Phép Ma Thuật Cho Vũ Khí & Dụng Cụ (Enchantments)",
    "nameEn": "Volcano Forge Enchanting",
    "category": "weapons",
    "subCategory": "Phù phép huyền thoại",
    "icon": "✨",
    "wikiFile": "Prismatic_Shard.png",
    "source": "Lò rèn ma thuật Volcano Forge",
    "ingredients": [
      {
        "name": "Đá Lăng Kính",
        "count": 1,
        "nameEn": "Prismatic Shard",
        "iconUrl": "assets/icons/item_prismatic_shard.png"
      },
      {
        "name": "Mảnh tàn tích Cinder Shard",
        "count": 20,
        "iconUrl": "assets/icons/ing_stone.png"
      }
    ],
    "desc": "Ban tặng một hiệu ứng thần thánh ngẫu nhiên: CRUSADER (tiêu diệt vĩnh viễn xác ướp Mummies không cần bom), VAMPIRIC (hút máu hồi phục 9% khi đánh trúng), SWIFT (vung dụng cụ nhanh hơn 33%), BOTTOMLESS (bình tưới vô hạn nước)!",
    "tips": "Có thể phù phép lại nhiều lần bằng Prismatic Shard cho đến khi nhận được hiệu ứng ưng ý.",
    "imageUrl": "assets/icons/forge_enchantments.png",
    "localImageUrl": "assets/icons/forge_enchantments.png"
  }
];
