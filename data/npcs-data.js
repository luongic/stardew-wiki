// ==========================================================================
// STARDEW VALLEY WIKI - DATABASE DÂN LÀNG & NPC TOÀN DIỆN (NPCs ENCYCLOPEDIA)
// Đầy đủ: Sinh nhật, Sở thích tặng quà (Loved, Liked, Disliked, Hated),
// Vị trí cư ngụ, Lịch trình di chuyển theo giờ (Nắng/Mưa/Đặc biệt), Sự kiện tim
// ==========================================================================

export const NPCS_DATA = [
  // ------------------------------------------------------------------------
  // BACHELORETTES (Độc thân nữ - 6 nhân vật)
  // ------------------------------------------------------------------------
  {
    id: "abigail",
    name: "Abigail",
    nameEn: "Abigail",
    avatar: "assets/portraits/abigail.png",
    category: "bachelorette",
    categoryTitle: "Cử Nhân Nữ (Có thể kết hôn)",
    gender: "Nữ",
    marriageable: true,
    birthday: {
      season: "fall",
      seasonText: "Mùa Thu",
      day: 13
    },
    residence: "Cửa hàng bách hóa Pierre (Thị trấn Pelican)",
    family: ["Pierre (Bố)", "Caroline (Mẹ)"],
    occupation: "Học sinh / Thích chơi kèn flute, đánh game và thám hiểm mỏ",
    desc: "Cô gái trẻ tóc tím cá tính, sống cùng bố mẹ tại tiệm tạp hóa. Cô có niềm đam mê đặc biệt với trò chơi điện tử, âm nhạc và những cuộc phiêu lưu mạo hiểm huyền bí.",
    gifts: {
      loved: [
        { name: "Thạch anh tím (Amethyst)", icon: "assets/icons/ing_amethyst.png" },
        { name: "Bánh bí ngô (Pumpkin)", icon: "assets/icons/item_pumpkin.png" },
        { name: "Món xào quả mọng (Blackberry Cobbler)", icon: "assets/icons/blackberry_cobbler.png" },
        { name: "Bánh socola (Chocolate Cake)", icon: "assets/icons/chocolate_cake.png" },
        { name: "Lươn cay (Spicy Eel)", icon: "assets/icons/spicy_eel.png" },
        { name: "Cá nóc (Pufferfish)", icon: "assets/icons/item_pufferfish.png" },
        { name: "Mảnh lăng kính (Prismatic Shard)", icon: "assets/icons/item_prismatic_shard.png" },
        { name: "Bao ngọc (Rabbit's Foot)", icon: "assets/icons/ing_rabbits_foot.png" }
      ],
      liked: [
        { name: "Thạch anh (Quartz)", icon: "assets/icons/ing_quartz.png" },
        { name: "Tất cả các loại Đá quý & Hoa dại mùa" }
      ],
      disliked: [
        { name: "Tất cả các loại Trứng gia cầm" },
        { name: "Rau củ trồng (Crops/Vegetables) trừ Bí ngô" }
      ],
      hated: [
        { name: "Đất sét (Clay)" },
        { name: "Tảo xanh (Green Algae)" }
      ]
    },
    schedule: {
      overview: "Thường ở trong phòng chơi game hoặc dạo chơi quanh Cầu tàu, Nghĩa trang hoặc Hồ Núi.",
      sunny: [
        { time: "09:00 AM", location: "Trong phòng ngủ đọc sách hoặc chơi game Console", locationShort: "Phòng ngủ (Tiệm Pierre)" },
        { time: "10:30 AM", location: "Ra gian hàng của bố Pierre dạo quanh", locationShort: "Tiệm Pierre" },
        { time: "01:00 PM", location: "Đi bộ ra Nghĩa trang Pelican hoặc Cầu thị trấn", locationShort: "Nghĩa trang Pelican" },
        { time: "04:30 PM", location: "Đứng ngắm sông gần tiệm rèn Clint", locationShort: "Bờ sông gần Clint" },
        { time: "07:30 PM", location: "Trở về phòng ngủ tại tiệm bách hóa", locationShort: "Tiệm Pierre" },
        { time: "10:00 PM", location: "Lên giường đi ngủ", locationShort: "Phòng ngủ" }
      ],
      rainy: [
        { time: "09:00 AM", location: "Trong phòng ngủ", locationShort: "Phòng ngủ" },
        { time: "11:00 AM", location: "Đến Quán rượu The Stardrop Saloon chơi máy game Prairie King", locationShort: "Quán Saloon" },
        { time: "09:00 PM", location: "Rời quán rượu về nhà", locationShort: "Tiệm Pierre" },
        { time: "10:30 PM", location: "Đi ngủ", locationShort: "Phòng ngủ" }
      ],
      special: [
        { condition: "Chủ nhật hàng tuần", desc: "1:30 PM - 7:00 PM: Đứng trên bến tàu Hồ Núi (Mountain Lake) thổi kèn sậy flute." },
        { condition: "Mùa Thu ngày 25", desc: "1:00 PM: Đến Phòng khám Harvey kiểm tra sức khỏe thường niên." }
      ]
    },
    heartEvents: [
      { hearts: 2, location: "Tiệm Pierre khi cô ấy ở trong phòng", desc: "Giúp Abigail vượt qua màn chơi khó trong game Journey of the Prairie King." },
      { hearts: 4, location: "Hồ Núi vào ngày mưa (12pm - 7pm)", desc: "Trú mưa dưới tảng cây và tấu khúc song ca tuyệt đẹp cùng tiếng kèn flute." },
      { hearts: 8, location: "Tiệm Pierre sau 8pm khi nhận thư", desc: "Abigail mời bạn thử bói bảng chữ Ouija bí ẩn và thể hiện tình cảm ngượng ngùng." },
      { hearts: 10, location: "Khai mỏ (Mines) sau 5pm", desc: "Gặp Abigail tập chiến đấu trong hầm mỏ, an ủi cô ấy khi bị dơi tấn công." }
    ]
  },
  {
    id: "emily",
    name: "Emily",
    nameEn: "Emily",
    avatar: "assets/portraits/emily.png",
    category: "bachelorette",
    categoryTitle: "Cử Nhân Nữ (Có thể kết hôn)",
    gender: "Nữ",
    marriageable: true,
    birthday: {
      season: "spring",
      seasonText: "Mùa Xuân",
      day: 27
    },
    residence: "Nhà 2 Willow Lane (Thị trấn Pelican)",
    family: ["Haley (Em gái)"],
    occupation: "Phục vụ tại Quán rượu The Stardrop Saloon / Thợ may trang phục",
    desc: "Cô gái tràn đầy năng lượng tích cực, yêu thiên nhiên, đá tinh thể năng lượng và thích tự may trang phục nhiều màu sắc.",
    gifts: {
      loved: [
        { name: "Thạch anh tím (Amethyst)", icon: "assets/icons/ing_amethyst.png" },
        { name: "Ngọc xanh biển (Aquamarine)", icon: "assets/icons/ing_aquamarine.png" },
        { name: "Hồng ngọc (Ruby)", icon: "assets/icons/ing_ruby.png" },
        { name: "Ngọc bích (Emerald)", icon: "assets/icons/ing_emerald.png" },
        { name: "Ngọc bích Topaz (Topaz)", icon: "assets/icons/ing_topaz.png" },
        { name: "Đá bùa sống Jade", icon: "assets/icons/ing_jade.png" },
        { name: "Vải dệt (Cloth)", icon: "assets/icons/ing_cloth.png" },
        { name: "Lông cừu (Wool)", icon: "assets/icons/item_wool.png" },
        { name: "Bánh mì kẹp Burger sống sót (Survival Burger)", icon: "assets/icons/survival_burger.png" }
      ],
      liked: [
        { name: "Thạch anh (Quartz)", icon: "assets/icons/ing_quartz.png" },
        { name: "Tất cả các loại Hoa và Trái cây hái lượm" }
      ],
      disliked: [
        { name: "Món xào bơ tỏi", icon: "assets/icons/ing_wood.png" }
      ],
      hated: [
        { name: "Thức ăn gia súc (Hay)" },
        { name: "Cá chép (Carp)" },
        { name: "Cá hồi (Salmon)" }
      ]
    },
    schedule: {
      overview: "Ban ngày ở nhà may vá, chiều từ 3:30 PM đến 12:30 AM làm việc tại Quán rượu Saloon của Gus.",
      sunny: [
        { time: "09:00 AM", location: "Ở phòng ngủ may đồ", locationShort: "Phòng ngủ (Nhà Willow Lane)" },
        { time: "12:00 PM", location: "Dọn dẹp phòng khách cùng Haley", locationShort: "Phòng khách" },
        { time: "03:30 PM", location: "Đi bộ đến Quán rượu The Stardrop Saloon làm phục vụ", locationShort: "Quán Saloon" },
        { time: "12:30 AM", location: "Rời quán rượu trở về nhà ngủ", locationShort: "Nhà Willow Lane" }
      ],
      rainy: [
        { time: "09:00 AM", location: "Ở trong nhà may quần áo bằng máy may", locationShort: "Nhà Willow Lane" },
        { time: "03:30 PM", location: "Đến Quán rượu làm ca tối", locationShort: "Quán Saloon" },
        { time: "12:30 AM", location: "Về nhà đi ngủ", locationShort: "Phòng ngủ" }
      ],
      special: [
        { condition: "Thứ Sáu hàng tuần", desc: "Tham gia buổi tập nhảy thể dục nhịp điệu tại tiệm tạp hóa Pierre lúc 10:00 AM." },
        { condition: "Mùa Đông ngày 11", desc: "Đến Phòng khám Harvey kiểm tra sức khỏe lúc 10:30 AM." }
      ]
    },
    heartEvents: [
      { hearts: 2, location: "Nhà Emily", desc: "Emily có giấc mơ tiên tri huyền ảo về bạn trong một không gian cầu vồng lấp lánh." },
      { hearts: 4, location: "Thị trấn vào ngày nắng", desc: "Emily chăm sóc một chú vẹt bị thương và cùng bạn chữa lành cho nó." },
      { hearts: 8, location: "Nhà Thị trưởng Lewis", desc: "Buổi trình diễn thời trang chữa lành tâm hồn đầy màu sắc do Emily tổ chức." },
      { hearts: 10, location: "Rừng Secret Woods sau 10pm khi nhận thư", desc: "Buổi cắm trại dưới trời sao đầy lãng mạn bên đốm lửa ấm áp." }
    ]
  },
  {
    id: "haley",
    name: "Haley",
    nameEn: "Haley",
    avatar: "assets/portraits/haley.png",
    category: "bachelorette",
    categoryTitle: "Cử Nhân Nữ (Có thể kết hôn)",
    gender: "Nữ",
    marriageable: true,
    birthday: {
      season: "spring",
      seasonText: "Mùa Xuân",
      day: 14
    },
    residence: "Nhà 2 Willow Lane (Thị trấn Pelican)",
    family: ["Emily (Chị gái)"],
    occupation: "Nhiếp ảnh gia nghiệp dư / Thích thời trang & chụp ảnh",
    desc: "Cô tiểu thư tóc vàng ban đầu có vẻ kiêu kỳ và thích ngoại hình, nhưng càng thân thiết cô càng bộc lộ tâm hồn ấm áp, yêu thiên nhiên và gắn bó với làng quê.",
    gifts: {
      loved: [
        { name: "Hoa hướng dương (Sunflower)", icon: "assets/icons/ing_sunflower.png" },
        { name: "Bánh kem hồng (Pink Cake)", icon: "assets/icons/pink_cake.png" },
        { name: "Salad trái cây (Fruit Salad)", icon: "assets/icons/fruit_salad.png" },
        { name: "Dừa khô sa mạc (Coconut)", icon: "assets/icons/ing_coconut.png" }
      ],
      liked: [
        { name: "Hoa thủy tiên vàng (Daffodil)", icon: "assets/icons/ing_daffodil.png" },
        { name: "Tất cả các loại Đá quý (trừ Mảnh lăng kính)" }
      ],
      disliked: [
        { name: "Tất cả các loại Cá và Hải sản" },
        { name: "Tất cả các loại Rau củ quả trồng" }
      ],
      hated: [
        { name: "Đất sét (Clay)" },
        { name: "Mảnh lăng kính (Prismatic Shard) - NPC DUY NHẤT GHÉT MẢNH LĂNG KÍNH!" },
        { name: "Cải ngựa dại (Wild Horseradish)" }
      ]
    },
    schedule: {
      overview: "Sáng làm đẹp ở nhà, trưa ra đài phun nước hoặc bờ sông chụp ảnh, mùa hè thích ra bãi biển.",
      sunny: [
        { time: "09:00 AM", location: "Trang điểm trong phòng ngủ", locationShort: "Phòng ngủ" },
        { time: "11:00 AM", location: "Ra bờ sông phía nam thị trấn chụp ảnh hoa cỏ", locationShort: "Bờ sông Pelican" },
        { time: "04:30 PM", location: "Trở về nhà xem tivi cùng chị gái", locationShort: "Nhà Willow Lane" },
        { time: "10:30 PM", location: "Lên giường ngủ", locationShort: "Phòng ngủ" }
      ],
      rainy: [
        { time: "09:00 AM", location: "Ở trong phòng ngủ cả ngày", locationShort: "Phòng ngủ" },
        { time: "04:00 PM", location: "Ra phòng khách đọc tạp chí thời trang", locationShort: "Phòng khách" },
        { time: "10:00 PM", location: "Đi ngủ", locationShort: "Phòng ngủ" }
      ],
      special: [
        { condition: "Mùa Hè (Những ngày nắng)", desc: "10:30 AM - 4:00 PM: Ra Bãi biển (Beach) tắm nắng và ngắm sóng biển." },
        { condition: "Thứ Ba hàng tuần mùa Xuân", desc: "11:00 AM: Ngồi bên Đài phun nước thị trấn gần Trung tâm Cộng đồng." }
      ]
    },
    heartEvents: [
      { hearts: 2, location: "Nhà Haley & Emily", desc: "Giúp hai chị em giải quyết mâu thuẫn về việc dọn dẹp nhà cửa." },
      { hearts: 4, location: "Nhà Haley", desc: "Giúp Haley mở nắp lọ mứt bị kẹt cứng, cô ấy bắt đầu quý mến bạn." },
      { hearts: 6, location: "Bãi biển vào ban ngày", desc: "Giúp Haley tìm lại chiếc vòng tay quý giá của cụ cố đánh rơi trên bãi cát." },
      { hearts: 8, location: "Rừng Cindersap khi trời nắng (10am - 3pm)", desc: "Chụp ảnh phong cảnh cùng Haley và ngắm nhìn đàn bò vui nhộn của Marnie." }
    ]
  },
  {
    id: "leah",
    name: "Leah",
    nameEn: "Leah",
    avatar: "assets/portraits/leah.png",
    category: "bachelorette",
    categoryTitle: "Cử Nhân Nữ (Có thể kết hôn)",
    gender: "Nữ",
    marriageable: true,
    birthday: {
      season: "winter",
      seasonText: "Mùa Đông",
      day: 23
    },
    residence: "Ngôi nhà gỗ nhỏ ở Rừng Cindersap (Phía nam nông trại)",
    family: ["Sống một mình"],
    occupation: "Nghệ sĩ điêu khắc gỗ / Thích thiên nhiên hoang dã",
    desc: "Nữ nghệ sĩ tài năng chuyển từ thành phố về sống ẩn dật trong rừng để tìm cảm hứng sáng tác nghệ thuật từ gỗ và tự nhiên.",
    gifts: {
      loved: [
        { name: "Salad tươi (Salad)", icon: "assets/icons/salad.png" },
        { name: "Rượu vang (Wine)", icon: "assets/icons/wine.png" },
        { name: "Cà phê dê (Goat Cheese)", icon: "assets/icons/goat_cheese.png" },
        { name: "Món xào nấm (Stir Fry)", icon: "assets/icons/stir_fry.png" },
        { name: "Món xào rau rừng hoang dã (Vegetable Medley)", icon: "assets/icons/vegetable_medley.png" },
        { name: "Quả mọng Truffle (Truffle)", icon: "assets/icons/item_truffle.png" },
        { name: "Bánh xốp hạt dẻ (Poppyseed Muffin)", icon: "assets/icons/poppyseed_muffin.png" }
      ],
      liked: [
        { name: "Gỗ mục Hardwood", icon: "assets/icons/ing_hardwood.png" },
        { name: "Tất cả các loại Nấm & Hoa hoang dã hái lượm" },
        { name: "Trứng gà vịt" }
      ],
      disliked: [
        { name: "Tất cả các loại Khoáng sản & Đá thỏi" }
      ],
      hated: [
        { name: "Bánh mì (Bread)" },
        { name: "Bánh pizza (Pizza)" },
        { name: "Bánh kếp (Pancakes)" }
      ]
    },
    schedule: {
      overview: "Sáng điêu khắc trong nhà gỗ, trưa dạo bộ vẽ tranh bên hồ Rừng Cindersap, tối hay ghé Saloon.",
      sunny: [
        { time: "09:00 AM", location: "Trong xưởng gỗ điêu khắc tượng", locationShort: "Nhà gỗ Leah" },
        { time: "12:00 PM", location: "Đi dạo bờ hồ Rừng Cindersap hái nấm dại", locationShort: "Hồ Rừng Cindersap" },
        { time: "03:00 PM", location: "Ngồi vẽ tranh bên bờ sông phía tây", locationShort: "Bờ sông Rừng" },
        { time: "06:30 PM", location: "Trở về nhà nấu bữa tối", locationShort: "Nhà gỗ Leah" },
        { time: "11:00 PM", location: "Đi ngủ", locationShort: "Phòng ngủ" }
      ],
      rainy: [
        { time: "09:00 AM", location: "Ở trong nhà gỗ làm tượng nghệ thuật", locationShort: "Nhà gỗ Leah" },
        { time: "04:00 PM", location: "Đến Quán rượu The Stardrop Saloon sưởi ấm", locationShort: "Quán Saloon" },
        { time: "11:30 PM", location: "Rời quán rượu về nhà", locationShort: "Nhà gỗ Leah" }
      ],
      special: [
        { condition: "Mùa Đông", desc: "Không ra bờ hồ vẽ tranh do tuyết lạnh, thường ghé quán rượu hoặc đi dạo tiệm tạp hóa Pierre." }
      ]
    },
    heartEvents: [
      { hearts: 2, location: "Nhà gỗ Leah", desc: "Xem tác phẩm điêu khắc gỗ đầu tiên và khích lệ cô ấy mở triển lãm nghệ thuật." },
      { hearts: 4, location: "Nhà gỗ Leah", desc: "Người yêu cũ từ thành phố gọi điện thoại làm phiền, bạn động viên Leah tự tin theo đuổi đam mê." },
      { hearts: 8, location: "Quảng trường Thị trấn (3pm - 5pm)", desc: "Triển lãm nghệ thuật công cộng rực rỡ của Leah thành công rực rỡ trước toàn dân làng." }
    ]
  },
  {
    id: "maru",
    name: "Maru",
    nameEn: "Maru",
    avatar: "assets/portraits/maru.png",
    category: "bachelorette",
    categoryTitle: "Cử Nhân Nữ (Có thể kết hôn)",
    gender: "Nữ",
    marriageable: true,
    birthday: {
      season: "summer",
      seasonText: "Mùa Hạ",
      day: 10
    },
    residence: "Xưởng mộc Robin (Khu vực Núi phía bắc)",
    family: ["Demetrius (Bố)", "Robin (Mẹ)", "Sebastian (Anh cùng mẹ khác cha)"],
    occupation: "Y tá tại Phòng khám Harvey / Nhà sáng chế Robot & Thiên văn học",
    desc: "Cô gái thông minh xuất chúng, thừa hưởng niềm đam mê nghiên cứu khoa học của bố Demetrius và sự khéo tay chế tác của mẹ Robin.",
    gifts: {
      loved: [
        { name: "Pin năng lượng (Battery Pack)", icon: "assets/icons/ing_battery_pack.png" },
        { name: "Thỏi vàng (Gold Bar)", icon: "assets/icons/ing_gold_bar.png" },
        { name: "Thỏi Iridium (Iridium Bar)", icon: "assets/icons/ing_iridium_bar.png" },
        { name: "Kim cương (Diamond)", icon: "assets/icons/diamond.png" },
        { name: "Dâu tây (Strawberry)", icon: "assets/icons/item_strawberry.png" },
        { name: "Súp súp lơ (Cauliflower Soup)", icon: "assets/icons/cauliflower.png" },
        { name: "Món xào tiêu Pepper Poppers", icon: "assets/icons/pepper_poppers.png" }
      ],
      liked: [
        { name: "Thỏi đồng (Copper Bar)", icon: "assets/icons/ing_copper_bar.png" },
        { name: "Thỏi sắt (Iron Bar)", icon: "assets/icons/ing_iron_bar.png" },
        { name: "Thạch anh (Quartz)", icon: "assets/icons/ing_quartz.png" }
      ],
      disliked: [
        { name: "Tất cả các loại Nấm rừng hoang dã" }
      ],
      hated: [
        { name: "Mật ong thông thường (Honey)" },
        { name: "Món dưa muối muối chua" }
      ]
    },
    schedule: {
      overview: "Thứ Ba và Thứ Năm làm việc tại Phòng khám thị trấn. Các ngày khác ở xưởng mộc chế tạo robot hoặc ngắm sao.",
      sunny: [
        { time: "09:00 AM", location: "Trong phòng ngủ thí nghiệm vi mạch điện tử", locationShort: "Phòng ngủ (Xưởng Robin)" },
        { time: "02:00 PM", location: "Ngồi ghế dài ngắm cảnh gần hồ Núi", locationShort: "Khu vực Núi" },
        { time: "06:00 PM", location: "Trở về nhà ăn tối cùng bố mẹ", locationShort: "Xưởng Robin" },
        { time: "10:30 PM", location: "Đi ngủ", locationShort: "Phòng ngủ" }
      ],
      rainy: [
        { time: "09:00 AM", location: "Ở trong xưởng phụ mẹ Robin và hàn mạch điện", locationShort: "Xưởng Robin" },
        { time: "07:00 PM", location: "Nghỉ ngơi đọc tài liệu khoa học", locationShort: "Phòng ngủ" }
      ],
      special: [
        { condition: "Thứ Ba & Thứ Năm hàng tuần", desc: "9:00 AM - 4:50 PM: Mặc áo y tá làm việc tại Bệnh viện Harvey ở trung tâm thị trấn." }
      ]
    },
    heartEvents: [
      { hearts: 2, location: "Phòng thí nghiệm của Demetrius", desc: "Giúp Maru quan sát mẫu đất qua kính hiển vi và trò chuyện riêng cùng Demetrius." },
      { hearts: 6, location: "Xưởng Robin vào ban đêm", desc: "Maru rủ bạn nhìn qua kính thiên văn quan sát chòm sao băng kỳ thú trên bầu trời đêm." },
      { hearts: 10, location: "Xưởng Robin", desc: "Maru hoàn thành chú Robot thông minh MarILDA tự nhận thức và giải phóng cho nó bay vào vũ trụ." }
    ]
  },
  {
    id: "penny",
    name: "Penny",
    nameEn: "Penny",
    avatar: "assets/portraits/penny.png",
    category: "bachelorette",
    categoryTitle: "Cử Nhân Nữ (Có thể kết hôn)",
    gender: "Nữ",
    marriageable: true,
    birthday: {
      season: "fall",
      seasonText: "Mùa Thu",
      day: 2
    },
    residence: "Xe rơ-moóc cũ (Trailer gần sông thị trấn Pelican)",
    family: ["Pam (Mẹ)"],
    occupation: "Gia sư dạy học cho trẻ em (Jas & Vincent) / Thích đọc sách",
    desc: "Cô giáo trẻ hiền hậu, dịu dàng và yêu sách. Dù hoàn cảnh gia đình khó khăn, cô luôn tận tụy dạy học cho bọn trẻ và mơ ước về một mái ấm gia đình hạnh phúc.",
    gifts: {
      loved: [
        { name: "Kim cương (Diamond)", icon: "assets/icons/diamond.png" },
        { name: "Ngọc lục bảo (Emerald)", icon: "assets/icons/ing_emerald.png" },
        { name: "Dưa hấu (Melon)", icon: "assets/icons/item_melon.png" },
        { name: "Hoa anh túc (Poppy)", icon: "assets/icons/ing_poppy.png" },
        { name: "Bánh xốp hạt anh túc (Poppyseed Muffin)", icon: "assets/icons/poppyseed_muffin.png" },
        { name: "Cá chép biến dị (Sandfish)", icon: "assets/icons/sandfish.png" },
        { name: "Rễ khoai sọ nhiệt đới (Roots Platter)", icon: "assets/icons/roots_platter.png" },
        { name: "Món hầm Tom Kha Soup", icon: "assets/icons/tom_kha_soup.png" }
      ],
      liked: [
        { name: "Tất cả các loại Sữa động vật" },
        { name: "Tất cả các loại Bồ công anh & Bông hoa mùa xuân" }
      ],
      disliked: [
        { name: "Rượu vang & Tất cả các loại đồ uống có cồn" }
      ],
      hated: [
        { name: "Bia & Rượu Pale Ale (Do ám ảnh từ mẹ Pam)" },
        { name: "Nho (Grape)" }
      ]
    },
    schedule: {
      overview: "Thứ Ba, Tư, Sáu dạy học cho Jas và Vincent tại Thư viện. Các ngày khác ngồi đọc sách dưới gốc cây.",
      sunny: [
        { time: "09:00 AM", location: "Dọn dẹp xe rơ-moóc cho mẹ Pam", locationShort: "Trailer Pam" },
        { time: "11:00 AM", location: "Dẫn Jas & Vincent ra sân chơi hoặc Thư viện", locationShort: "Thư viện thị trấn" },
        { time: "04:00 PM", location: "Dẫn bọn trẻ về nhà an toàn", locationShort: "Thị trấn Pelican" },
        { time: "06:30 PM", location: "Ngồi ghế đá đọc sách gần tiệm Saloon", locationShort: "Quảng trường thị trấn" },
        { time: "09:00 PM", location: "Về nhà đi ngủ", locationShort: "Trailer Pam" }
      ],
      rainy: [
        { time: "09:00 AM", location: "Ở trong xe rơ-moóc đọc sách", locationShort: "Trailer Pam" },
        { time: "03:00 PM", location: "Lau dọn nhà cửa", locationShort: "Trailer Pam" }
      ],
      special: [
        { condition: "Thứ Ba, Thứ Tư & Thứ Sáu", desc: "9:00 AM - 4:00 PM: Lớp học kèm tại Thư viện Pelican cho Jas & Vincent." }
      ]
    },
    heartEvents: [
      { hearts: 2, location: "Thị trấn vào ngày nắng", desc: "Giúp cụ George lấy lại thư từ hộp thư và cùng Penny tâm sự về lòng hiếu kính." },
      { hearts: 4, location: "Xe rơ-moóc của Penny", desc: "Giúp Penny dọn dẹp căn nhà bề bộn khi mẹ Pam say xỉn trở về." },
      { hearts: 8, location: "Rừng Cindersap (9am - 4pm)", desc: "Penny mời bạn tham gia buổi dã ngoại vui nhộn cùng hai đứa trẻ Jas và Vincent." },
      { hearts: 10, location: "Khu nhà tắm công cộng Spa sau 7pm khi nhận thư", desc: "Khoảnh khắc thổ lộ tình cảm chân thành trong làn nước ấm áp của nhà tắm hơi." }
    ]
  },

  // ------------------------------------------------------------------------
  // BACHELORS (Độc thân nam - 6 nhân vật)
  // ------------------------------------------------------------------------
  {
    id: "alex",
    name: "Alex",
    nameEn: "Alex",
    avatar: "assets/portraits/alex.png",
    category: "bachelor",
    categoryTitle: "Cử Nhân Nam (Có thể kết hôn)",
    gender: "Nam",
    marriageable: true,
    birthday: {
      season: "summer",
      seasonText: "Mùa Hạ",
      day: 13
    },
    residence: "Nhà 1 River Road (Thị trấn Pelican)",
    family: ["George (Ông nội)", "Evelyn (Bà nội)"],
    occupation: "Vận động viên bóng bầu dục / Huấn luyện viên thể hình",
    desc: "Chàng trai yêu thể thao, luôn tự tin và mơ ước trở thành vận động viên bóng bầu dục chuyên nghiệp. Đằng sau sự mạnh mẽ là tấm lòng hiếu thảo chăm sóc ông bà già yếu.",
    gifts: {
      loved: [
        { name: "Bữa sáng đầy đủ (Complete Breakfast)", icon: "assets/icons/complete_breakfast.png" },
        { name: "Món cá hồi hấp (Salmon Dinner)", icon: "assets/icons/salmon_dinner.png" },
        { name: "Mảnh lăng kính (Prismatic Shard)", icon: "assets/icons/item_prismatic_shard.png" },
        { name: "Bao ngọc Rabbit's Foot", icon: "assets/icons/ing_rabbits_foot.png" }
      ],
      liked: [
        { name: "Tất cả các loại Trứng gia cầm" },
        { name: "Tất cả các loại Thịt nguội & Xúc xích" }
      ],
      disliked: [
        { name: "Tất cả các loại Cá hái lượm" },
        { name: "Thạch anh (Quartz)" }
      ],
      hated: [
        { name: "Hoa anh túc (Poppy)" },
        { name: "Đất sét (Clay)" }
      ]
    },
    schedule: {
      overview: "Sáng tập tạ trong phòng ngủ, trưa ra bãi cỏ trước nhà ném bóng cùng chú chó Dusty, mùa hè ra bãi biển.",
      sunny: [
        { time: "08:00 AM", location: "Tập tạ và hít đất trong phòng ngủ", locationShort: "Phòng ngủ (Nhà Alex)" },
        { time: "10:30 AM", location: "Đứng trước cửa nhà chơi ném bóng với chú chó Dusty", locationShort: "Sân nhà Alex" },
        { time: "01:00 PM", location: "Đến quầy kem mùa hè hoặc đi dạo thị trấn", locationShort: "Quầy kem / Thị trấn" },
        { time: "04:00 PM", location: "Tập thể dục tại phòng riêng", locationShort: "Phòng ngủ" },
        { time: "08:00 PM", location: "Ngồi với ông George và bà Evelyn", locationShort: "Phòng khách" },
        { time: "10:00 PM", location: "Đi ngủ", locationShort: "Phòng ngủ" }
      ],
      rainy: [
        { time: "08:00 AM", location: "Ở trong nhà tập thể lực", locationShort: "Nhà Alex" },
        { time: "04:00 PM", location: "Ghé Quán Saloon uống nước ép", locationShort: "Quán Saloon" }
      ],
      special: [
        { condition: "Mùa Hè", desc: "Mở quầy bán kem phục vụ dân làng bên cạnh bảo tàng từ 1:00 PM đến 5:00 PM." }
      ]
    },
    heartEvents: [
      { hearts: 2, location: "Bãi biển vào ngày nắng", desc: "Alex tâm sự về ước mơ thể thao và những áp lực kỳ vọng của gia đình." },
      { hearts: 4, location: "Thị trấn", desc: "Nghe Alex kể về người mẹ quá cố và lý do tại sao anh chuyển về sống cùng ông bà." },
      { hearts: 10, location: "Quán Saloon sau khi nhận thư mời", desc: "Bữa tối riêng tư tại phòng VIP của quán bar do Alex chuẩn bị với đàn guitar lãng mạn." }
    ]
  },
  {
    id: "elliott",
    name: "Elliott",
    nameEn: "Elliott",
    avatar: "assets/portraits/elliott.png",
    category: "bachelor",
    categoryTitle: "Cử Nhân Nam (Có thể kết hôn)",
    gender: "Nam",
    marriageable: true,
    birthday: {
      season: "fall",
      seasonText: "Mùa Thu",
      day: 5
    },
    residence: "Căn chòi gỗ nhỏ trên Bãi biển Pelican (Beach Cabin)",
    family: ["Sống một mình"],
    occupation: "Nhà văn / Tiểu thuyết gia lãng mạn",
    desc: "Nhà văn tài hoa với mái tóc bồng bềnh lãng tử, sống một mình bên bờ biển để viết nên những tác phẩm tiểu thuyết vĩ đại.",
    gifts: {
      loved: [
        { name: "Tôm hùm biển (Lobster)", icon: "assets/icons/item_lobster.png" },
        { name: "Súp tôm hùm (Lobster Bisque)", icon: "assets/icons/lobster_bisque.png" },
        { name: "Càng cua hoàng đế (Crab Cakes)", icon: "assets/icons/crab_cakes.png" },
        { name: "Quả lựu đỏ (Pomegranate)", icon: "assets/icons/item_pomegranate.png" },
        { name: "Lông vịt xanh (Duck Feather)", icon: "assets/icons/item_duck_feather.png" },
        { name: "Mực ống đại dương (Squid Ink)", icon: "assets/icons/ing_squid_ink.png" }
      ],
      liked: [
        { name: "Tất cả các loại Trái cây trồng cây ăn quả" },
        { name: "Bạch tuộc & Mực biển" }
      ],
      disliked: [
        { name: "Tất cả các loại Sữa động vật" },
        { name: "Pizza" }
      ],
      hated: [
        { name: "Hải sâm đen (Sea Cucumber)" },
        { name: "Thạch anh (Quartz)" }
      ]
    },
    schedule: {
      overview: "Sáng viết tiểu thuyết trong cabin bên bờ biển, chiều dạo bộ cầu cảng Willy hoặc ra quán Saloon uống trà.",
      sunny: [
        { time: "08:00 AM", location: "Ngồi bên bàn gỗ viết sách", locationShort: "Chòi biển Elliott" },
        { time: "12:00 PM", location: "Ra bờ biển ngắm sóng tìm cảm hứng", locationShort: "Bãi biển Pelican" },
        { time: "03:00 PM", location: "Đến tiệm bách hóa Pierre mua trà hoặc đi dạo cầu cảng", locationShort: "Cầu cảng Willy" },
        { time: "06:00 PM", location: "Trở về cabin đọc sách", locationShort: "Chòi biển Elliott" },
        { time: "11:00 PM", location: "Lên giường ngủ", locationShort: "Chòi biển" }
      ],
      rainy: [
        { time: "08:00 AM", location: "Ở trong cabin lắng nghe tiếng mưa rơi trên mái tôn", locationShort: "Chòi biển Elliott" },
        { time: "05:00 PM", location: "Ghé Quán Saloon uống một ly rượu vang", locationShort: "Quán Saloon" }
      ],
      special: [
        { condition: "Thứ Năm hàng tuần", desc: "11:30 AM: Đi dạo vào thư viện Pelican đọc tư liệu lịch sử cho tiểu thuyết mới." }
      ]
    },
    heartEvents: [
      { hearts: 2, location: "Cabin của Elliott", desc: "Elliott hỏi bạn ý kiến để chọn thể loại cho cuốn tiểu thuyết tâm huyết sắp tới." },
      { hearts: 8, location: "Bảo tàng Thư viện", desc: "Buổi đọc sách ra mắt cuốn tiểu thuyết đầu tay của Elliott, dành tặng riêng cho bạn." },
      { hearts: 10, location: "Bãi biển sau khi nhận thư mời", desc: "Cùng Elliott chèo thuyền gỗ ra giữa vịnh ngắm hoàng hôn lộng lẫy và trao nhau nụ hôn." }
    ]
  },
  {
    id: "harvey",
    name: "Harvey",
    nameEn: "Harvey",
    avatar: "assets/portraits/harvey.png",
    category: "bachelor",
    categoryTitle: "Cử Nhân Nam (Có thể kết hôn)",
    gender: "Nam",
    marriageable: true,
    birthday: {
      season: "winter",
      seasonText: "Mùa Đông",
      day: 14
    },
    residence: "Phòng khám Y tế Pelican (Tầng 2 tòa nhà Clinic)",
    family: ["Sống một mình"],
    occupation: "Bác sĩ thị trấn Pelican / Đam mê máy bay mô hình & Radio nghiệp dư",
    desc: "Vị bác sĩ tận tụy, chín chắn và luôn lo lắng cho sức khỏe của mọi cư dân trong thung lũng. Anh có sở thích đặc biệt với máy bay và các thiết bị liên lạc vô tuyến.",
    gifts: {
      loved: [
        { name: "Cà phê đen (Coffee)", icon: "assets/icons/coffee.png" },
        { name: "Dưa muối chua (Pickles)", icon: "assets/icons/pickles.png" },
        { name: "Món xào tiêu Pepper Poppers", icon: "assets/icons/pepper_poppers.png" },
        { name: "Rượu vang chất lượng (Wine)", icon: "assets/icons/wine.png" },
        { name: "Dầu ăn nấm Truffle Oil", icon: "assets/icons/truffle_oil.png" }
      ],
      liked: [
        { name: "Bồ công anh & Hoa thủy tiên mùa xuân" },
        { name: "Tất cả các loại Trái cây trồng" }
      ],
      disliked: [
        { name: "Bánh mì phô mai nướng" },
        { name: "Pizza" }
      ],
      hated: [
        { name: "Kẹo ngọt cao su (Chewing Gum)" },
        { name: "San hô đỏ (Coral)" }
      ]
    },
    schedule: {
      overview: "Ban ngày khám bệnh tại phòng khám từ 9:00 AM đến 3:00 PM, chiều đi dạo công viên thị trấn.",
      sunny: [
        { time: "08:00 AM", location: "Chuẩn bị thuốc men tại quầy khám", locationShort: "Phòng khám Harvey" },
        { time: "09:00 AM", location: "Mở cửa đón bệnh nhân", locationShort: "Phòng khám" },
        { time: "03:00 PM", location: "Đi dạo công viên cạnh sông hoặc ngắm tượng đài", locationShort: "Công viên thị trấn" },
        { time: "05:30 PM", location: "Ghé tiệm tạp hóa mua đồ ăn", locationShort: "Tiệm Pierre" },
        { time: "07:00 PM", location: "Trở về phòng trên tầng 2 sử dụng đài radio", locationShort: "Tầng 2 Phòng khám" },
        { time: "11:00 PM", location: "Lên giường ngủ", locationShort: "Phòng khám" }
      ],
      rainy: [
        { time: "08:00 AM", location: "Làm việc tại phòng khám", locationShort: "Phòng khám" },
        { time: "05:30 PM", location: "Lên tầng 2 đọc tạp chí y khoa", locationShort: "Tầng 2 Phòng khám" }
      ],
      special: [
        { condition: "Thứ Sáu hàng tuần", desc: "Sau khi đóng cửa phòng khám lúc 3:00 PM, ghé Quán rượu The Stardrop Saloon uống cà phê." }
      ]
    },
    heartEvents: [
      { hearts: 4, location: "Phòng khám Harvey", desc: "Harvey kiểm tra nhịp tim cho bạn và vô tình bối rối khi tim anh cũng đập nhanh." },
      { hearts: 8, location: "Phòng khám", desc: "Harvey bắt sóng radio đài hàng không và cho bạn nghe cuộc trò chuyện với phi công trên bầu trời." },
      { hearts: 10, location: "Ga xe lửa lúc 9am - 5pm khi nhận thư", desc: "Trải nghiệm chuyến bay ngắm cảnh trên khinh khí cầu khổng lồ bay lượn trên thung lũng Pelican." }
    ]
  },
  {
    id: "sam",
    name: "Sam",
    nameEn: "Sam",
    avatar: "assets/portraits/sam.png",
    category: "bachelor",
    categoryTitle: "Cử Nhân Nam (Có thể kết hôn)",
    gender: "Nam",
    marriageable: true,
    birthday: {
      season: "summer",
      seasonText: "Mùa Hạ",
      day: 17
    },
    residence: "Nhà 1 Willow Lane (Thị trấn Pelican)",
    family: ["Kent (Bố)", "Jodi (Mẹ)", "Vincent (Em trai)"],
    occupation: "Thành viên ban nhạc Rock / Làm thêm tại JojaMart",
    desc: "Chàng trai tràn đầy năng lượng với mái tóc vuốt dựng phong cách punk rock, yêu thích trượt ván và chơi guitar điện trong ban nhạc cùng Sebastian và Abigail.",
    gifts: {
      loved: [
        { name: "Bánh Pizza (Pizza)", icon: "assets/icons/pizza.png" },
        { name: "Cương phong bão Cactus Fruit", icon: "assets/icons/item_cactus_fruit.png" },
        { name: "Món xào quả mọng phong Maple Bar", icon: "assets/icons/maple_bar.png" },
        { name: "Mắt hổ đá Tigerseye", icon: "assets/icons/ing_stone.png" }
      ],
      liked: [
        { name: "Tất cả các loại Trứng gia cầm" },
        { name: "Thỏi sắt & Thỏi đồng" }
      ],
      disliked: [
        { name: "Tất cả các loại Rong biển & Tảo" }
      ],
      hated: [
        { name: "Quặng đồng (Copper Ore)" },
        { name: "Rễ củ cải tuyết (Snow Yam)" }
      ]
    },
    schedule: {
      overview: "Sáng tập guitar trong phòng, chiều trượt ván trước cửa thị trưởng hoặc tập nhạc cùng Sebastian.",
      sunny: [
        { time: "09:00 AM", location: "Luyện guitar điện trong phòng ngủ", locationShort: "Phòng ngủ (Nhà Sam)" },
        { time: "01:30 PM", location: "Trượt ván quanh tòa nhà Thị trưởng Lewis", locationShort: "Quảng trường thị trấn" },
        { time: "06:30 PM", location: "Trở về nhà ăn tối với mẹ Jodi và em Vincent", locationShort: "Nhà 1 Willow Lane" },
        { time: "10:30 PM", location: "Đi ngủ", locationShort: "Phòng ngủ" }
      ],
      rainy: [
        { time: "09:00 AM", location: "Ở trong phòng chơi guitar", locationShort: "Nhà Sam" },
        { time: "03:00 PM", location: "Đến Quán rượu Saloon chơi bi lắc cùng Sebastian", locationShort: "Quán Saloon" }
      ],
      special: [
        { condition: "Thứ Hai & Thứ Tư", desc: "12:50 PM - 4:00 PM: Làm ca dọn dẹp tạp vụ tại siêu thị JojaMart (hoặc Bảo tàng nếu Joja bị đóng cửa)." }
      ]
    },
    heartEvents: [
      { hearts: 2, location: "Nhà Sam", desc: "Sam và Sebastian cùng bạn thảo luận phong cách âm nhạc cho ban nhạc mới." },
      { hearts: 4, location: "Bãi biển", desc: "Sam trông em trai Vincent và cùng bạn bảo vệ tâm hồn trẻ thơ của cậu bé trước tin tức chiến tranh của bố Kent." },
      { hearts: 8, location: "Zuzu City lúc 4pm", desc: "Buổi biểu diễn hòa nhạc rock bùng nổ của ban nhạc Sam trước hàng trăm người hâm mộ." }
    ]
  },
  {
    id: "sebastian",
    name: "Sebastian",
    nameEn: "Sebastian",
    avatar: "assets/portraits/sebastian.png",
    category: "bachelor",
    categoryTitle: "Cử Nhân Nam (Có thể kết hôn)",
    gender: "Nam",
    marriageable: true,
    birthday: {
      season: "winter",
      seasonText: "Mùa Đông",
      day: 10
    },
    residence: "Tầng hầm Xưởng mộc Robin (Khu vực Núi phía bắc)",
    family: ["Robin (Mẹ)", "Demetrius (Bố dượng)", "Maru (Em gái cùng mẹ)"],
    occupation: "Lập trình viên tự do (Freelance Coder) / Chơi trống & Thích xe môtô",
    desc: "Chàng trai hướng nội sống trong căn phòng tầng hầm yên tĩnh, làm nghề viết code qua mạng. Anh mê truyện viễn tưởng, môtô phân khối lớn và thích ngắm mưa một mình.",
    gifts: {
      loved: [
        { name: "Viên đá sương mù Void Egg", icon: "assets/icons/item_void_egg.png" },
        { name: "Món súp bí ngô (Pumpkin Soup)", icon: "assets/icons/pumpkin_soup.png" },
        { name: "Món cá sống Sashimi (Sashimi)", icon: "assets/icons/sashimi.png" },
        { name: "Đá giọt lửa Obsidian", icon: "assets/icons/ing_stone.png" },
        { name: "Cá chép nước sâu (Frozen Tear)", icon: "assets/icons/frozen_tear.png" }
      ],
      liked: [
        { name: "Cà phê đen (Coffee)", icon: "assets/icons/coffee.png" },
        { name: "Thạch anh (Quartz)", icon: "assets/icons/ing_quartz.png" }
      ],
      disliked: [
        { name: "Tất cả các loại Hoa mùa thu" },
        { name: "Bánh mì (Bread)" }
      ],
      hated: [
        { name: "Đất sét (Clay)" },
        { name: "Trứng tráng Omelet" }
      ]
    },
    schedule: {
      overview: "Ban ngày làm việc trên máy tính tại tầng hầm, chiều tối 6:30 PM ra bờ hồ Núi đứng hút thuốc, ngày mưa thích ra bãi biển.",
      sunny: [
        { time: "09:00 AM", location: "Ngồi trước máy tính viết mã phần mềm trong tầng hầm", locationShort: "Tầng hầm Robin" },
        { time: "03:00 PM", location: "Lên lầu lấy nước và đồ ăn nhẹ", locationShort: "Xưởng Robin" },
        { time: "06:30 PM", location: "Ra bờ Hồ Núi đứng ngắm nước và hút thuốc", locationShort: "Hồ Núi (Mountain Lake)" },
        { time: "09:30 PM", location: "Trở về phòng ngủ tầng hầm", locationShort: "Tầng hầm" },
        { time: "02:00 AM", location: "Đi ngủ muộn", locationShort: "Phòng ngủ" }
      ],
      rainy: [
        { time: "10:30 AM", location: "Rời nhà đi bộ xuống Bãi biển Pelican ngắm sóng biển mưa", locationShort: "Bãi biển Pelican" },
        { time: "05:00 PM", location: "Đến Quán rượu The Stardrop Saloon chơi bi lắc cùng Sam", locationShort: "Quán Saloon" },
        { time: "09:30 PM", location: "Trở về tầng hầm", locationShort: "Tầng hầm Robin" }
      ],
      special: [
        { condition: "Thứ Sáu hàng tuần", desc: "3:00 PM: Cùng Sam đến Quán Saloon chơi bi lắc đến nửa đêm." }
      ]
    },
    heartEvents: [
      { hearts: 2, location: "Phòng tầng hầm của Sebastian", desc: "Sebastian đang hoàn thành dự án code cho khách hàng và rủ bạn cùng trò chuyện." },
      { hearts: 6, location: "Tầng hầm Sebastian", desc: "Tham gia ván cờ phiêu lưu bàn cờ Dungeons & Dragons kỳ thú cùng Sam và Sebastian." },
      { hearts: 8, location: "Cầu cảng Bãi biển vào ngày mưa (12pm - 11pm)", desc: "Sebastian chia sẻ chiếc ô dù dưới làn mưa lạnh và thổ lộ sự rung động đặc biệt với bạn." },
      { hearts: 10, location: "Khu vực Núi sau 8pm", desc: "Cùng Sebastian cưỡi chiếc môtô phân khối lớn lên đỉnh đèo cao ngắm toàn cảnh thành phố Zuzu rực rỡ trong đêm." }
    ]
  },
  {
    id: "shane",
    name: "Shane",
    nameEn: "Shane",
    avatar: "assets/portraits/shane.png",
    category: "bachelor",
    categoryTitle: "Cử Nhân Nam (Có thể kết hôn)",
    gender: "Nam",
    marriageable: true,
    birthday: {
      season: "spring",
      seasonText: "Mùa Xuân",
      day: 20
    },
    residence: "Trang trại chăn nuôi Marnie (Rừng Cindersap)",
    family: ["Marnie (Dì)", "Jas (Cháu gái đỡ đầu)"],
    occupation: "Nhân viên siêu thị JojaMart / Người chăm sóc gà xanh Blue Chicken",
    desc: "Chàng trai với bề ngoài xù xì, chống chọi với nỗi buồn và áp lực cuộc sống. Nhờ tình bạn và niềm vui nuôi gà xanh, Shane dần tìm lại nụ cười và xây dựng cuộc sống tích cực.",
    gifts: {
      loved: [
        { name: "Bia tươi (Beer)", icon: "assets/icons/beer.png" },
        { name: "Bánh Pizza (Pizza)", icon: "assets/icons/pizza.png" },
        { name: "Món xào ớt Pepper Poppers", icon: "assets/icons/pepper_poppers.png" },
        { name: "Quả ớt cay đỏ Hot Pepper", icon: "assets/icons/item_hot_pepper.png" }
      ],
      liked: [
        { name: "Tất cả các loại Trứng gà & Trứng vịt" },
        { name: "Tất cả các loại Trái cây hái lượm" }
      ],
      disliked: [
        { name: "Nấm dại & Tảo xanh" }
      ],
      hated: [
        { name: "Dưa chua (Pickles)" },
        { name: "Thạch anh (Quartz)" }
      ]
    },
    schedule: {
      overview: "Sáng làm việc tại JojaMart từ 9:00 AM đến 5:00 PM, tối nào cũng ra Quán rượu The Stardrop Saloon.",
      sunny: [
        { time: "07:10 AM", location: "Rời trang trại Marnie đi bộ đến JojaMart", locationShort: "Rừng Cindersap" },
        { time: "09:00 AM", location: "Làm ca xếp hàng tại siêu thị JojaMart", locationShort: "JojaMart" },
        { time: "05:00 PM", location: "Hết giờ làm, đi thẳng đến Quán Saloon", locationShort: "Quán Saloon" },
        { time: "11:10 PM", location: "Rời quán rượu trở về trang trại Marnie", locationShort: "Trang trại Marnie" }
      ],
      rainy: [
        { time: "09:00 AM", location: "Vẫn đi làm tại JojaMart", locationShort: "JojaMart" },
        { time: "05:00 PM", location: "Uống bia tại Quán Saloon", locationShort: "Quán Saloon" }
      ],
      special: [
        { condition: "Khi JojaMart bị đóng cửa", desc: "Ở nhà Marnie phụ chăm sóc đàn gà và ra Quán rượu lúc 2:00 PM." }
      ]
    },
    heartEvents: [
      { hearts: 2, location: "Rừng Cindersap sau 8pm", desc: "Shane chia sẻ một lon bia ướp lạnh bên hồ và tâm sự về những ngày tăm tối." },
      { hearts: 6, location: "Rừng Cindersap vào ngày mưa", desc: "Cứu Shane bên vách đá khi anh suy sụp và đưa anh đến bác sĩ Harvey điều trị." },
      { hearts: 8, location: "Trang trại Marnie khi Shane ở nhà", desc: "Shane giới thiệu bí mật tuyệt đẹp: Giống gà lông xanh nước biển Blue Chicken mà anh tự tay nhân giống thành công!" }
    ]
  },

  // ------------------------------------------------------------------------
  // DÂN LÀNG THỊ TRẤN PELICAN (TOWNSPEOPLE)
  // ------------------------------------------------------------------------
  {
    id: "robin",
    name: "Robin",
    nameEn: "Robin",
    avatar: "assets/portraits/robin.png",
    category: "town",
    categoryTitle: "Dân Làng Pelican",
    gender: "Nữ",
    marriageable: false,
    birthday: {
      season: "fall",
      seasonText: "Mùa Thu",
      day: 21
    },
    residence: "Xưởng mộc Robin (Khu vực Núi phía bắc)",
    family: ["Demetrius (Chồng)", "Sebastian (Con trai)", "Maru (Con gái)"],
    occupation: "Thợ mộc trưởng Pelican / Chuyên nâng cấp nhà, chuồng trại & công trình",
    desc: "Nữ thợ mộc tài ba, tháo vát và thân thiện. Cô là người bạn đồng hành xây dựng quan trọng nhất giúp biến nông trại của bạn thành cơ ngơi trù phú.",
    gifts: {
      loved: [
        { name: "Phô mai dê (Goat Cheese)", icon: "assets/icons/goat_cheese.png" },
        { name: "Mì Ý Spaghetti (Spaghetti)", icon: "assets/icons/spaghetti.png" },
        { name: "Gỗ mục Hardwood", icon: "assets/icons/ing_hardwood.png" },
        { name: "Món đào hầm ngọt ngào (Peach)", icon: "assets/icons/item_peach.png" }
      ],
      liked: [
        { name: "Gỗ thông thường (Wood)", icon: "assets/icons/ing_wood.png" },
        { name: "Tất cả các loại Thạch anh & Khoáng thỏi" }
      ],
      disliked: [
        { name: "Rau cần tây dại" }
      ],
      hated: [
        { name: "Đất sét (Clay)" },
        { name: "Bao ngọc hư hại" }
      ]
    },
    schedule: {
      overview: "Mở xưởng mộc từ 9:00 AM đến 5:00 PM (trừ Thứ Ba đóng cửa đi tập thể dục). Thứ Sáu tối ra Quán Saloon khiêu vũ cùng chồng Demetrius.",
      sunny: [
        { time: "09:00 AM", location: "Đứng quầy phục vụ khách tại xưởng mộc", locationShort: "Xưởng mộc Robin" },
        { time: "05:00 PM", location: "Đi dạo quanh khu vực hồ Núi hít thở không khí", locationShort: "Khu vực Núi" },
        { time: "08:00 PM", location: "Trở về nhà ăn tối cùng gia đình", locationShort: "Xưởng mộc Robin" },
        { time: "11:00 PM", location: "Đi ngủ", locationShort: "Phòng ngủ" }
      ],
      rainy: [
        { time: "09:00 AM", location: "Làm việc tại quầy xưởng", locationShort: "Xưởng mộc Robin" }
      ],
      special: [
        { condition: "Thứ Ba hàng tuần", desc: "Đóng cửa xưởng mộc, đến tiệm Pierre tập thể dục nhịp điệu cùng hội chị em." },
        { condition: "Thứ Sáu hàng tuần", desc: "4:00 PM: Cùng Demetrius ra Quán Saloon khiêu vũ lãng mạn." }
      ]
    },
    heartEvents: [
      { hearts: 6, location: "Xưởng mộc Robin", desc: "Robin khoe chiếc sáo gỗ Flute Block và Drum Block do chính tay cô tự làm và tặng bạn công thức chế tạo!" }
    ]
  },
  {
    id: "demetrius",
    name: "Demetrius",
    nameEn: "Demetrius",
    avatar: "assets/portraits/demetrius.png",
    category: "town",
    categoryTitle: "Dân Làng Pelican",
    gender: "Nam",
    marriageable: false,
    birthday: {
      season: "summer",
      seasonText: "Mùa Hạ",
      day: 19
    },
    residence: "Xưởng mộc Robin (Khu vực Núi)",
    family: ["Robin (Vợ)", "Maru (Con gái)", "Sebastian (Con riêng của vợ)"],
    occupation: "Nhà khoa học / Nhà sinh học nghiên cứu hệ sinh thái thung lũng",
    desc: "Nhà khoa học mẫu mực luôn mang theo sổ ghi chép để phân tích mẫu vật đất đá, vi sinh vật và thủy sản trong vùng.",
    gifts: {
      loved: [
        { name: "Món đậu hũ xào nấm (Bean Hotpot)", icon: "assets/icons/bean_hotpot.png" },
        { name: "Cơm chiên gạo lứt (Rice Pudding)", icon: "assets/icons/rice_pudding.png" },
        { name: "Kem dâu tươi (Ice Cream)", icon: "assets/icons/ice_cream.png" },
        { name: "Dâu tây (Strawberry)", icon: "assets/icons/item_strawberry.png" }
      ],
      liked: [
        { name: "Tất cả các loại Trứng gia cầm" },
        { name: "Tất cả các loại Quả mọng hái lượm" }
      ],
      disliked: [
        { name: "Tất cả các loại Đá thô" }
      ],
      hated: [
        { name: "Hoa anh túc (Poppy)" }
      ]
    },
    schedule: {
      overview: "Sáng nghiên cứu trong phòng thí nghiệm, chiều ra hồ Núi lấy mẫu nước, Thứ Sáu ra Quán Saloon khiêu vũ cùng Robin.",
      sunny: [
        { time: "09:00 AM", location: "Phòng thí nghiệm ghi chép số liệu", locationShort: "Phòng thí nghiệm Robin" },
        { time: "03:00 PM", location: "Đứng bên bờ hồ Núi lấy mẫu sinh vật phù du", locationShort: "Hồ Núi" },
        { time: "07:00 PM", location: "Trở về xưởng ăn tối", locationShort: "Xưởng mộc Robin" }
      ],
      rainy: [
        { time: "09:00 AM", location: "Ở trong phòng thí nghiệm phân tích mẫu vật dưới kính hiển vi", locationShort: "Phòng thí nghiệm" }
      ],
      special: [
        { condition: "Khi nông trại đạt mốc thu nhập", desc: "Demetrius ghé nông trại của bạn đề xuất cải tạo Hang Động (Dơi ăn quả hoặc Nấm trồng)." }
      ]
    },
    heartEvents: [
      { hearts: 6, location: "Xưởng mộc Robin", desc: "Demetrius và Robin tranh cãi hài hước về việc Cà Chua là Trái Cây hay Rau Củ theo quan điểm sinh học!" }
    ]
  },
  {
    id: "clint",
    name: "Clint",
    nameEn: "Clint",
    avatar: "assets/portraits/clint.png",
    category: "town",
    categoryTitle: "Dân Làng Pelican",
    gender: "Nam",
    marriageable: false,
    birthday: {
      season: "winter",
      seasonText: "Mùa Đông",
      day: 26
    },
    residence: "Tiệm rèn Blacksmith (Phía đông thị trấn Pelican)",
    family: ["Sống một mình"],
    occupation: "Thợ rèn thị trấn / Nâng cấp dụng cụ & đập vỡ khoáng thạch Geode",
    desc: "Anh thợ rèn hiền lành, có phần nhút nhát và thầm thương trộm nhớ cô hầu bàn Emily. Anh luôn miệt mài bên lò lửa đập đe từ sáng đến tối.",
    gifts: {
      loved: [
        { name: "Thỏi vàng (Gold Bar)", icon: "assets/icons/ing_gold_bar.png" },
        { name: "Thỏi Iridium (Iridium Bar)", icon: "assets/icons/ing_iridium_bar.png" },
        { name: "Đá quý Ruby", icon: "assets/icons/ing_ruby.png" },
        { name: "Đá quý Topaz", icon: "assets/icons/ing_topaz.png" },
        { name: "Thạch anh tím (Amethyst)", icon: "assets/icons/ing_amethyst.png" },
        { name: "Ngọc bích (Emerald)", icon: "assets/icons/ing_emerald.png" },
        { name: "Món xào hoa Atiso (Artichoke Dip)", icon: "assets/icons/artichoke_dip.png" }
      ],
      liked: [
        { name: "Thỏi sắt & Thỏi đồng" },
        { name: "Tất cả các loại Quặng mỏ" }
      ],
      disliked: [
        { name: "Tất cả các loại Hoa dại" }
      ],
      hated: [
        { name: "Đồng tiền rách" }
      ]
    },
    schedule: {
      overview: "Mở tiệm rèn từ 9:00 AM đến 4:00 PM. Tối từ 7:00 PM ghé Quán rượu Saloon ngồi ngắm Emily.",
      sunny: [
        { time: "09:00 AM", location: "Đứng sau quầy tiệm rèn đập đe và nhận khoáng thạch", locationShort: "Tiệm rèn Clint" },
        { time: "04:00 PM", location: "Đóng cửa tiệm rèn, dọn dẹp lò than", locationShort: "Tiệm rèn" },
        { time: "07:00 PM", location: "Đến Quán rượu The Stardrop Saloon ngồi một góc ngắm Emily", locationShort: "Quán Saloon" },
        { time: "11:00 PM", location: "Về tiệm rèn đi ngủ", locationShort: "Tiệm rèn Clint" }
      ],
      rainy: [
        { time: "09:00 AM", location: "Làm việc tại tiệm rèn", locationShort: "Tiệm rèn Clint" }
      ],
      special: [
        { condition: "Sau khi hoàn thành Trung tâm Cộng đồng", desc: "Thứ Sáu hàng tuần: Clint đóng cửa tiệm để đến phòng lò hơi Trung tâm Cộng đồng kiểm tra máy móc." }
      ]
    },
    heartEvents: [
      { hearts: 6, location: "Thị trấn khi Clint ở ngoài", desc: "Clint trốn sau bụi cây gom hết can đảm để mời Emily đi xem hội chợ và nhờ bạn tư vấn!" }
    ]
  },
  {
    id: "lewis",
    name: "Lewis",
    nameEn: "Mayor Lewis",
    avatar: "assets/portraits/lewis.png",
    category: "town",
    categoryTitle: "Dân Làng Pelican",
    gender: "Nam",
    marriageable: false,
    birthday: {
      season: "spring",
      seasonText: "Mùa Xuân",
      day: 7
    },
    residence: "Dinh thự Thị trưởng (Mayor's Manor ở trung tâm thị trấn)",
    family: ["Độc thân / Có mối quan hệ bí mật với Marnie"],
    occupation: "Thị trưởng Thị trấn Pelican suốt 20 năm qua",
    desc: "Vị thị trưởng kỳ cựu của thung lũng, người hướng dẫn bạn những ngày đầu chuyển về nông trại và mỗi đêm bí mật thu gom nông sản từ thùng hàng của bạn.",
    gifts: {
      loved: [
        { name: "Ớt chuông đỏ cay (Hot Pepper)", icon: "assets/icons/item_hot_pepper.png" },
        { name: "Trà xanh mùa thu (Green Tea)", icon: "assets/icons/green_tea.png" },
        { name: "Món xào rau rừng (Vegetable Medley)", icon: "assets/icons/vegetable_medley.png" },
        { name: "Món đĩa mùa thu (Autumn's Bounty)", icon: "assets/icons/autumns_bounty.png" }
      ],
      liked: [
        { name: "Dừa khô & Trái cây mùa vụ" },
        { name: "Tất cả các loại Đá thỏi kim loại" }
      ],
      disliked: [
        { name: "Sữa bò" }
      ],
      hated: [
        { name: "Rác thải cá mộc" },
        { name: "Chiếc quần đùi may mắn màu tím (Lucky Purple Shorts)" }
      ]
    },
    schedule: {
      overview: "Sáng dạo quanh thị trấn thu thuế và thăm các cửa hàng, tối ghé trang trại Marnie hoặc quán Saloon.",
      sunny: [
        { time: "08:30 AM", location: "Rời dinh thự đi kiểm tra các cửa hàng", locationShort: "Thị trấn Pelican" },
        { time: "01:00 PM", location: "Ghé tiệm tạp hóa Pierre trò chuyện", locationShort: "Tiệm Pierre" },
        { time: "04:00 PM", location: "Kiểm tra bờ sông hoặc Trung tâm Cộng đồng", locationShort: "Quảng trường thị trấn" },
        { time: "07:00 PM", location: "Đến Quán Saloon uống nước và trò chuyện cùng dân làng", locationShort: "Quán Saloon" },
        { time: "11:00 PM", location: "Về dinh thự nghỉ ngơi", locationShort: "Dinh thự Lewis" }
      ],
      rainy: [
        { time: "09:00 AM", location: "Ở trong dinh thự thị trưởng làm việc giấy tờ", locationShort: "Dinh thự Lewis" }
      ],
      special: [
        { condition: "Mỗi đêm lúc 2:00 AM", desc: "Bí mật đến nông trại của người chơi để thu hoạch nông sản trong thùng xuất khẩu (Shipping Bin)." }
      ]
    },
    heartEvents: [
      { hearts: 6, location: "Thị trấn sau 7pm", desc: "Bắt gặp cuộc hẹn hò bí mật hài hước giữa Thị trưởng Lewis và Marnie sau nhà!" }
    ]
  },
  {
    id: "marnie",
    name: "Marnie",
    nameEn: "Marnie",
    avatar: "assets/portraits/marnie.png",
    category: "town",
    categoryTitle: "Dân Làng Pelican",
    gender: "Nữ",
    marriageable: false,
    birthday: {
      season: "fall",
      seasonText: "Mùa Thu",
      day: 18
    },
    residence: "Trang trại chăn nuôi Marnie (Rừng Cindersap)",
    family: ["Jas (Cháu gái)", "Shane (Cháu trai)"],
    occupation: "Chủ cửa hàng gia súc & thức ăn chăn nuôi",
    desc: "Người phụ nữ đôn hậu, yêu quý động vật vô bờ bến. Cô là người cung cấp cho bạn gà, bò, dê, cừu, lợn và thức ăn cỏ chăn nuôi.",
    gifts: {
      loved: [
        { name: "Kim cương (Diamond)", icon: "assets/icons/diamond.png" },
        { name: "Bánh bí ngô nướng (Pumpkin Pie)", icon: "assets/icons/pumpkin_pie.png" },
        { name: "Trứng cá hồi hấp dẫn (Farmer's Lunch)", icon: "assets/icons/farmers_lunch.png" },
        { name: "Món xào màu hồng Pink Cake", icon: "assets/icons/pink_cake.png" }
      ],
      liked: [
        { name: "Tất cả các loại Trứng gia cầm" },
        { name: "Tất cả các loại Sữa động vật" }
      ],
      disliked: [
        { name: "Rong biển hoang dã" }
      ],
      hated: [
        { name: "Đất sét (Clay)" }
      ]
    },
    schedule: {
      overview: "Mở cửa hàng gia súc từ 9:00 AM đến 4:00 PM từ Thứ Tư đến Chủ Nhật (Thứ Hai & Thứ Ba không phục vụ quầy).",
      sunny: [
        { time: "09:00 AM", location: "Đứng quầy bán gia súc và thức ăn cỏ", locationShort: "Cửa hàng Marnie" },
        { time: "04:00 PM", location: "Chăm sóc đàn bò và gà ngoài đồng cỏ Rừng Cindersap", locationShort: "Đồng cỏ Marnie" },
        { time: "07:00 PM", location: "Ghé Quán Saloon uống nước", locationShort: "Quán Saloon" },
        { time: "11:00 PM", location: "Về nhà đi ngủ", locationShort: "Trang trại Marnie" }
      ],
      rainy: [
        { time: "09:00 AM", location: "Ở trong nhà trông nom đàn bò tránh mưa", locationShort: "Trang trại Marnie" }
      ],
      special: [
        { condition: "Thứ Hai hàng tuần", desc: "Đóng cửa quầy: Đi dạo thị trấn và mua sắm tại tiệm tạp hóa Pierre." },
        { condition: "Thứ Ba hàng tuần", desc: "Đóng cửa quầy: Đến tiệm Pierre tập thể dục nhịp điệu aerobics cùng hội chị em." }
      ]
    },
    heartEvents: [
      { hearts: 6, location: "Thị trấn sau 7pm", desc: "Giúp Marnie và Thị trưởng Lewis giữ bí mật về chuyện tình cảm riêng tư của họ." }
    ]
  },
  {
    id: "linus",
    name: "Linus",
    nameEn: "Linus",
    avatar: "assets/portraits/linus.png",
    category: "town",
    categoryTitle: "Dân Làng Pelican",
    gender: "Nam",
    marriageable: false,
    birthday: {
      season: "winter",
      seasonText: "Mùa Đông",
      day: 3
    },
    residence: "Chiếc lều bạt trên Núi (Bên cạnh mỏ khai khoáng)",
    family: ["Sống một mình giữa thiên nhiên"],
    occupation: "Người ẩn dật / Bậc thầy thu hái hoang dã & chế tạo Mồi câu hoang dã",
    desc: "Cụ già hiền hậu chọn lối sống hài hòa cùng thiên nhiên trong căn lều bạt nhỏ. Cụ luôn biết ơn những món quà từ rừng rậm và dạy bạn công thức làm Mồi câu hoang dã Wild Bait thượng hạng.",
    gifts: {
      loved: [
        { name: "Món xào khoai sọ (Dish O' The Sea)", icon: "assets/icons/dish_o_the_sea.png" },
        { name: "Cương phong bão Cactus Fruit", icon: "assets/icons/item_cactus_fruit.png" },
        { name: "Dừa khô (Coconut)", icon: "assets/icons/ing_coconut.png" },
        { name: "Khoai lang nướng (Yam)", icon: "assets/icons/yam.png" },
        { name: "Bánh nướng việt quất Blueberry Tart", icon: "assets/icons/blueberry_tart.png" }
      ],
      liked: [
        { name: "Tất cả các loại Quả mọng & Nấm rừng hái lượm" },
        { name: "Tất cả các loại Trứng gia cầm" }
      ],
      disliked: [
        { name: "Tất cả các loại Khoáng sản quý giá" }
      ],
      hated: [
        { name: "Rác thải rỗng" },
        { name: "Đất sét (Clay)" }
      ]
    },
    schedule: {
      overview: "Sống tại lều núi, ban ngày đứng sưởi bên đống lửa hoặc câu cá bên hồ Núi, buổi tối tắm tại nhà tắm Spa.",
      sunny: [
        { time: "07:00 AM", location: "Ra khỏi lều ngồi sưởi ấm bên đống lửa trại", locationShort: "Lều Linus (Khu Núi)" },
        { time: "10:00 AM", location: "Đi dạo quanh bờ hồ Núi hái nấm dại", locationShort: "Hồ Núi" },
        { time: "02:00 PM", location: "Đứng ngắm cảnh bên vách đá nhìn ra thung lũng", locationShort: "Vách đá Núi" },
        { time: "07:00 PM", location: "Trở về trước lều nhóm lửa", locationShort: "Lều Linus" },
        { time: "10:00 PM", location: "Vào lều ngủ", locationShort: "Lều Linus" }
      ],
      rainy: [
        { time: "09:00 AM", location: "Đứng dưới bóng cây đại thụ trú mưa", locationShort: "Khu vực Núi" },
        { time: "03:00 PM", location: "Trở về trong lều bạt tránh gió lạnh", locationShort: "Lều Linus" }
      ],
      special: [
        { condition: "Mùa Đông", desc: "Mỗi ngày lúc 2:00 PM: Đến nhà tắm hơi công cộng Spa để sưởi ấm trong làn nước nóng." }
      ]
    },
    heartEvents: [
      { hearts: 4, location: "Thị trấn sau 8pm", desc: "Bắt gặp Linus bới thùng rác tiệm Pierre tìm thức ăn thừa, Gus hào phóng tặng cụ bữa tối nóng hổi và bạn thể hiện sự thấu hiểu." },
      { hearts: 7, location: "Gửi thư qua hộp thư", desc: "Linus gửi thư dạy bạn công thức chế tạo Mồi câu cá hoang dã độc quyền (Wild Bait) tăng tốc cắn câu!" }
    ]
  },
  {
    id: "pierre",
    name: "Pierre",
    nameEn: "Pierre",
    avatar: "assets/portraits/pierre.png",
    category: "town",
    categoryTitle: "Dân Làng Pelican",
    gender: "Nam",
    marriageable: false,
    birthday: {
      season: "spring",
      seasonText: "Mùa Xuân",
      day: 26
    },
    residence: "Cửa hàng bách hóa Pierre (Thị trấn Pelican)",
    family: ["Caroline (Vợ)", "Abigail (Con gái)"],
    occupation: "Chủ tiệm bách hóa hạt giống & phân bón",
    desc: "Chủ tiệm tạp hóa chăm chỉ, đối thủ cạnh tranh trực tiếp với siêu thị JojaMart. Anh là nơi bạn mua hầu hết các loại hạt giống nông sản theo mùa.",
    gifts: {
      loved: [
        { name: "Món cá chiên mực giòn (Fried Calamari)", icon: "assets/icons/fried_calamari.png" }
      ],
      liked: [
        { name: "Tất cả các loại Trứng gia cầm" },
        { name: "Tất cả các loại Bông hoa trồng" }
      ],
      disliked: [
        { name: "Tất cả các loại Cá hái lượm" }
      ],
      hated: [
        { name: "Món cá mòi nướng" },
        { name: "Táo hỏng" }
      ]
    },
    schedule: {
      overview: "Mở cửa tiệm từ 9:00 AM đến 5:00 PM các ngày trong tuần (trước đây đóng cửa Thứ Tư, sau khi đuổi JojaMart mở cửa 7 ngày/tuần).",
      sunny: [
        { time: "09:00 AM", location: "Đứng sau quầy thu ngân bán hạt giống", locationShort: "Tiệm Pierre" },
        { time: "05:00 PM", location: "Kiểm tra sổ sách kho hàng", locationShort: "Tiệm Pierre" },
        { time: "07:00 PM", location: "Qua Quán rượu Saloon gặp gỡ dân làng", locationShort: "Quán Saloon" },
        { time: "11:00 PM", location: "Về nhà đi ngủ", locationShort: "Tiệm Pierre" }
      ],
      rainy: [
        { time: "09:00 AM", location: "Bán hàng tại tiệm", locationShort: "Tiệm Pierre" }
      ],
      special: [
        { condition: "Hội chợ Stardew Valley Fair", desc: "Mang sạp hàng trưng bày nông sản cạnh tranh giải nhất cùng bạn tại quảng trường." }
      ]
    },
    heartEvents: [
      { hearts: 6, location: "Phòng ngủ của Pierre", desc: "Vô tình phát hiện ngăn kéo bí mật của Pierre cất giữ khoản tiền riêng và hứa giữ kín bí mật." }
    ]
  },
  {
    id: "gus",
    name: "Gus",
    nameEn: "Gus",
    avatar: "assets/portraits/gus.png",
    category: "town",
    categoryTitle: "Dân Làng Pelican",
    gender: "Nam",
    marriageable: false,
    birthday: {
      season: "summer",
      seasonText: "Mùa Hạ",
      day: 8
    },
    residence: "Quán rượu The Stardrop Saloon (Thị trấn Pelican)",
    family: ["Sống một mình"],
    occupation: "Chủ quán kiêm Đầu bếp trưởng Quán rượu The Stardrop Saloon",
    desc: "Người đàn ông tốt bụng, mến khách bậc nhất thị trấn. Quán rượu của anh là linh hồn kết nối mọi cư dân Pelican vào mỗi buổi tối ấm cúng.",
    gifts: {
      loved: [
        { name: "Kim cương (Diamond)", icon: "assets/icons/diamond.png" },
        { name: "Bánh cam ngọt Escargot", icon: "assets/icons/escargot.png" },
        { name: "Món cá chiên giòn Fish Taco", icon: "assets/icons/fish_taco.png" },
        { name: "Món cam tươi nhiệt đới (Orange)", icon: "assets/icons/item_orange.png" }
      ],
      liked: [
        { name: "Tất cả các loại Rượu vang & Bia" },
        { name: "Tất cả các loại Nấm rừng" }
      ],
      disliked: [
        { name: "Rong biển hoang dã" }
      ],
      hated: [
        { name: "Bao ngọc hư hại" }
      ]
    },
    schedule: {
      overview: "Mở quán rượu từ 12:00 PM trưa đến 12:00 AM nửa đêm tất cả các ngày trong tuần.",
      sunny: [
        { time: "08:30 AM", location: "Chuẩn bị nguyên liệu trong bếp quán Saloon", locationShort: "Bếp Saloon" },
        { time: "12:00 PM", location: "Mở cửa quầy bar phục vụ khách", locationShort: "Quầy Saloon" },
        { time: "12:00 AM", location: "Đóng cửa quán rượu và lên phòng ngủ nghỉ ngơi", locationShort: "Phòng ngủ Gus" }
      ],
      rainy: [
        { time: "12:00 PM", location: "Phục vụ quán rượu tấp nập dân làng trú mưa", locationShort: "Quán Saloon" }
      ],
      special: [
        { condition: "Khi Đảo Gừng mở Resort", desc: "Thỉnh thoảng ghé bãi biển Đảo Gừng mở quầy đồ uống nhiệt đới giải khát." }
      ]
    },
    heartEvents: [
      { hearts: 4, location: "Quán rượu Saloon", desc: "Gus gặp khó khăn về tài chính do khách nợ tiền, bạn giúp đỡ khuyên nhủ Pam thanh toán hóa đơn sòng phẳng." }
    ]
  },
  {
    id: "willy",
    name: "Willy",
    nameEn: "Willy",
    avatar: "assets/portraits/willy.png",
    category: "town",
    categoryTitle: "Dân Làng Pelican",
    gender: "Nam",
    marriageable: false,
    birthday: {
      season: "summer",
      seasonText: "Mùa Hạ",
      day: 24
    },
    residence: "Tiệm đồ câu cá Fish Shop (Trên cầu cảng Bãi biển Pelican)",
    family: ["Sống một mình"],
    occupation: "Ngư dân lão luyện / Chủ tiệm bán cần câu, mồi câu & thuyền đưa ra Đảo Gừng",
    desc: "Bác ngư dân kỳ cựu đã trao cho bạn chiếc cần câu tre đầu tiên vào ngày thứ hai bạn tới thung lũng. Bác là người sửa con thuyền gỗ cổ đưa bạn khám phá Đảo Gừng huyền bí.",
    gifts: {
      loved: [
        { name: "Cá tầm đại dương (Sturgeon)", icon: "assets/icons/item_sturgeon.png" },
        { name: "Món súp hải sản (Seafoam Pudding)", icon: "assets/icons/seafoam_pudding.png" },
        { name: "Cá nóc gai độc (Pufferfish)", icon: "assets/icons/item_pufferfish.png" },
        { name: "Bạch tuộc biển (Octopus)", icon: "assets/icons/item_octopus.png" },
        { name: "Món xào bí ngô cá biển (Catfish)", icon: "assets/icons/item_catfish.png" },
        { name: "Kim cương (Diamond)", icon: "assets/icons/diamond.png" },
        { name: "Thỏi Iridium Bar", icon: "assets/icons/ing_iridium_bar.png" }
      ],
      liked: [
        { name: "Tất cả các loại Cá và Hải sản câu được" },
        { name: "Tất cả các loại Thỏi sắt & Đồng" }
      ],
      disliked: [
        { name: "Tất cả các loại Hoa mùa thu" }
      ],
      hated: [
        { name: "Đất sét (Clay)" }
      ]
    },
    schedule: {
      overview: "Mở tiệm cá từ 9:00 AM đến 5:00 PM. Sáng sớm từ 6:00 AM và chiều tối từ 5:00 PM câu cá trên cầu cảng bãi biển.",
      sunny: [
        { time: "06:00 AM", location: "Đứng câu cá trên cầu cảng bãi biển", locationShort: "Cầu cảng Bãi biển" },
        { time: "09:00 AM", location: "Mở cửa tiệm đồ câu bán cần câu và mồi", locationShort: "Tiệm cá Willy" },
        { time: "05:00 PM", location: "Đóng cửa tiệm, tiếp tục câu cá đón hoàng hôn", locationShort: "Cầu cảng Bãi biển" },
        { time: "09:00 PM", location: "Đến Quán Saloon uống một ly bia ấm", locationShort: "Quán Saloon" },
        { time: "11:30 PM", location: "Trở về phòng ngủ trong tiệm cá", locationShort: "Tiệm cá Willy" }
      ],
      rainy: [
        { time: "06:00 AM", location: "Câu cá ngày mưa trên cầu cảng", locationShort: "Cầu cảng Bãi biển" },
        { time: "09:00 AM", location: "Bán hàng tại tiệm đồ câu", locationShort: "Tiệm cá Willy" }
      ],
      special: [
        { condition: "Khi hoàn thành Trung tâm Cộng đồng", desc: "Mở cánh cửa sau tiệm cá, hướng dẫn người chơi sửa chữa Thuyền gỗ để đi ra Đảo Gừng (Ginger Island)." }
      ]
    },
    heartEvents: [
      { hearts: 6, location: "Bãi biển", desc: "Willy hào hứng dạy bạn các kỹ thuật câu cá mồi giật độc đáo và tặng bạn mồi câu đặc biệt." }
    ]
  },

  // ------------------------------------------------------------------------
  // NHÂN VẬT ĐẶC BIỆT & ĐẢO GỪNG (SPECIAL NPCS & GINGER ISLAND)
  // ------------------------------------------------------------------------
  {
    id: "wizard",
    name: "Pháp Sư Rasmodius",
    nameEn: "Wizard (M. Rasmodius)",
    avatar: "assets/portraits/wizard.png",
    category: "special",
    categoryTitle: "Nhân Vật Đặc Biệt",
    gender: "Nam",
    marriageable: false,
    birthday: {
      season: "winter",
      seasonText: "Mùa Đông",
      day: 17
    },
    residence: "Tháp Pháp Sư (Wizard's Tower ở góc tây nam Rừng Cindersap)",
    family: ["Độc thân / Có tin đồn là cha ruột của Abigail"],
    occupation: "Pháp sư nghiên cứu ma thuật / Xây dựng các Tháp Dịch Chuyển Obelisk & Tòa Tháp Vàng",
    desc: "Bậc thầy phù thủy uyên bác kết nối với thế giới linh hồn và tộc người tí hon Junimo. Ông giúp bạn mở khóa bí mật Trung tâm Cộng đồng và xây dựng các công trình ma thuật tối thượng.",
    gifts: {
      loved: [
        { name: "Mảnh lăng kính (Prismatic Shard)", icon: "assets/icons/item_prismatic_shard.png" },
        { name: "Đá mặt trời (Solar Essence)", icon: "assets/icons/ing_solar_essence.png" },
        { name: "Đá hư vô (Void Essence)", icon: "assets/icons/ing_void_essence.png" },
        { name: "Mực ống tím (Squid Ink)", icon: "assets/icons/ing_squid_ink.png" },
        { name: "Nấm ma quái tím Super Cucumber", icon: "assets/icons/super_cucumber.png" }
      ],
      liked: [
        { name: "Thạch anh (Quartz)", icon: "assets/icons/ing_quartz.png" },
        { name: "Tất cả các loại Đá quý" }
      ],
      disliked: [
        { name: "Tất cả các loại Trứng & Sữa" }
      ],
      hated: [
        { name: "Đất sét (Clay)" }
      ]
    },
    schedule: {
      overview: "Luôn ở bên trong Tháp Pháp Sư từ 6:00 AM đến 11:00 PM, không bao giờ ra khỏi tháp trừ các dịp lễ hội ma quái.",
      sunny: [
        { time: "06:00 AM", location: "Nghiên cứu ma thuật bên vạc thuốc xanh", locationShort: "Tháp Pháp Sư" },
        { time: "11:00 PM", location: "Nghỉ ngơi thiền định", locationShort: "Tháp Pháp Sư" }
      ],
      rainy: [
        { time: "06:00 AM", location: "Trong tháp quan sát sấm sét và tinh linh", locationShort: "Tháp Pháp Sư" }
      ],
      special: [
        { condition: "Lễ hội Đêm Linh Hồn (Spirit's Eve)", desc: "Đứng trên đỉnh tường thành mê cung bí ngô quan sát cư dân Pelican." },
        { condition: "Sau chuỗi nhiệm vụ Dark Talisman", desc: "Mở khóa cuốn sách ma thuật cho phép người chơi triệu hồi Obelisk và Junimo Hut." }
      ]
    },
    heartEvents: [
      { hearts: 4, location: "Tháp Pháp Sư", desc: "Mở khóa Tầng hầm Tháp Pháp Sư với Bàn thờ Ảo Ảnh (Shrine of Illusions) cho phép bạn đổi ngoại hình, tên và giới tính nhân vật tự do!" }
    ]
  },
  {
    id: "krobus",
    name: "Krobus",
    nameEn: "Krobus",
    avatar: "assets/portraits/krobus.png",
    category: "special",
    categoryTitle: "Nhân Vật Đặc Biệt (Bạn cùng phòng)",
    gender: "Phi nhị nguyên",
    marriageable: true, // Bạn cùng phòng (Roommate)
    birthday: {
      season: "winter",
      seasonText: "Mùa Đông",
      day: 1
    },
    residence: "Cống ngầm The Sewers (Dưới lòng thị trấn Pelican)",
    family: ["Tộc người bóng tối Shadow People"],
    occupation: "Thương gia Cống ngầm / Bán Vòng Iridium, Hạt Stardrop & Trứng Hư Vô",
    desc: "Sinh vật bóng tối duy nhất thân thiện với con người. Krobus là nhân vật độc đáo có thể mời về làm 'Bạn cùng phòng' (Roommate) sống cùng bạn trong nông trại thay vì kết hôn thông thường.",
    gifts: {
      loved: [
        { name: "Viên kim cương đen Void Egg", icon: "assets/icons/item_void_egg.png" },
        { name: "Món xào sốt mực đen Squid Ink", icon: "assets/icons/ing_squid_ink.png" },
        { name: "Cá chép nước sâu Void Mayonnaise", icon: "assets/icons/void_mayonnaise.png" },
        { name: "Kim cương (Diamond)", icon: "assets/icons/diamond.png" },
        { name: "Mảnh lăng kính (Prismatic Shard)", icon: "assets/icons/item_prismatic_shard.png" },
        { name: "Bánh bí ngô nướng Pumpkin", icon: "assets/icons/item_pumpkin.png" }
      ],
      liked: [
        { name: "Thỏi vàng (Gold Bar)", icon: "assets/icons/ing_gold_bar.png" },
        { name: "Thỏi Iridium Bar", icon: "assets/icons/ing_iridium_bar.png" },
        { name: "Thạch anh (Quartz)", icon: "assets/icons/ing_quartz.png" }
      ],
      disliked: [
        { name: "Tất cả các loại Bông hoa" }
      ],
      hated: [
        { name: "Đất sét (Clay)" },
        { name: "Cần câu cũ rách" }
      ]
    },
    schedule: {
      overview: "Luôn đứng bán hàng trong Cống ngầm The Sewers từ 6:00 AM đến 12:00 AM. Nếu trở thành bạn cùng phòng, Krobus sẽ ở trong phòng riêng nông trại của bạn.",
      sunny: [
        { time: "06:00 AM", location: "Đứng bán hàng cạnh dòng nước cống ngầm", locationShort: "Cống Ngầm (The Sewers)" }
      ],
      rainy: [
        { time: "06:00 AM", location: "Trong cống ngầm (Thứ Sáu im lặng tưởng nhớ tổ tiên)", locationShort: "Cống Ngầm" }
      ],
      special: [
        { condition: "Khi chuyển đến sống chung", desc: "Tặng bạn Bùa Hư Vô Void Ghost Pendant và đứng nấu các món ăn độc đáo vào mỗi buổi sáng." }
      ]
    },
    heartEvents: [
      { hearts: 14, location: "Bãi biển sau 8pm", desc: "Sự kiện siêu dễ thương: Bạn và Krobus cùng cưỡi quái vật biển khổng lồ bơi lội ngắm trăng dưới lòng đại dương!" }
    ]
  },
  {
    id: "leo",
    name: "Leo",
    nameEn: "Leo",
    avatar: "assets/portraits/leo.png",
    category: "special",
    categoryTitle: "Cư Dân Đảo Gừng (Ginger Island)",
    gender: "Nam",
    marriageable: false,
    birthday: {
      season: "summer",
      seasonText: "Mùa Hạ",
      day: 26
    },
    residence: "Túp lều trên cây Đảo Gừng (sau này chuyển về Nhà cây Rừng Cindersap)",
    family: ["Được đàn vẹt Đảo Gừng nuôi nấng"],
    occupation: "Cậu bé người rừng hoang dã / Bạn thân của các loài chim",
    desc: "Cậu bé mồ côi dạt vào Đảo Gừng sau một vụ đắm tàu và được đàn vẹt thông minh cưu mang. Khi đạt 6 tim, bạn có thể thuyết phục Leo chuyển về đất liền sống cùng Jas và Vincent.",
    gifts: {
      loved: [
        { name: "Xoài chín cây (Mango)", icon: "assets/icons/item_mango.png" },
        { name: "Món xôi xoài nước cốt dừa (Mango Sticky Rice)", icon: "assets/icons/mango_sticky_rice.png" },
        { name: "Món mút khoai môn Poi", icon: "assets/icons/poi.png" },
        { name: "Lông vũ chim đà điểu (Duck Feather)", icon: "assets/icons/item_duck_feather.png" }
      ],
      liked: [
        { name: "Món xào quả dứa dại (Pineapple)", icon: "assets/icons/item_pineapple.png" },
        { name: "Tất cả các loại Trứng gia cầm" }
      ],
      disliked: [
        { name: "Bia & Rượu đồ uống có cồn" }
      ],
      hated: [
        { name: "Bia Joja Cola" }
      ]
    },
    schedule: {
      overview: "Ban đầu ở Nhà cây Đảo Gừng hái quả và chơi cùng vẹt. Sau khi đạt 6 tim chuyển về sống trong Ngôi nhà cây gần tiệm Linus trên đất liền.",
      sunny: [
        { time: "06:00 AM", location: "Trong túp lều cây chơi cùng vẹt", locationShort: "Nhà cây Đảo Gừng" },
        { time: "10:00 AM", location: "Ra bờ biển phía tây bắt cua và hái xoài", locationShort: "Bãi biển Đảo Gừng" },
        { time: "06:00 PM", location: "Trở về túp lều lắng nghe tiếng chim hót", locationShort: "Nhà cây Đảo Gừng" }
      ],
      rainy: [
        { time: "06:00 AM", location: "Trong lều cây ngắm mưa nhiệt đới", locationShort: "Nhà cây Đảo Gừng" }
      ],
      special: [
        { condition: "Đạt 6 Tim Tình Bạn", desc: "Đàn vẹt mang Leo vượt biển chuyển về sống tại Thung lũng Pelican và cùng học chữ với Penny, Jas và Vincent." }
      ]
    },
    heartEvents: [
      { hearts: 6, location: "Đảo Gừng", desc: "Leo quyết định rời hòn đảo hoang để hòa nhập cộng đồng con người tại Thung lũng Pelican dưới sự chúc phúc của bầy vẹt." }
    ]
  },
  {
    id: "sandy",
    name: "Sandy",
    nameEn: "Sandy",
    avatar: "assets/portraits/sandy.png",
    category: "special",
    categoryTitle: "Cư Dân Sa Mạc Calico",
    gender: "Nữ",
    marriageable: false,
    birthday: {
      season: "fall",
      seasonText: "Mùa Thu",
      day: 15
    },
    residence: "Cửa hàng Oasis (Sa mạc Calico)",
    family: ["Bạn thân tri kỷ của Emily"],
    occupation: "Chủ cửa hàng ốc đảo Oasis / Bán hạt giống sa mạc độc quyền",
    desc: "Cô chủ xinh đẹp và sành điệu của ốc đảo Sa mạc Calico. Cô luôn nhớ thị trấn Pelican và vô cùng vui sướng mỗi khi có người ghé thăm tiệm Oasis của cô.",
    gifts: {
      loved: [
        { name: "Bông hoa hồng ngọt (Sweet Pea)", icon: "assets/icons/ing_sweet_pea.png" },
        { name: "Hoa nghệ tây vàng Crocus", icon: "assets/icons/ing_crocus.png" },
        { name: "Hoa thủy tiên vàng Daffodil", icon: "assets/icons/ing_daffodil.png" },
        { name: "Món xào quả xoài tươi", icon: "assets/icons/item_mango.png" }
      ],
      liked: [
        { name: "Tất cả các loại Đá quý" },
        { name: "Sữa dê (Goat Milk)" }
      ],
      disliked: [
        { name: "Đá vôi thô" }
      ],
      hated: [
        { name: "Rác thải rỗng" }
      ]
    },
    schedule: {
      overview: "Luôn có mặt tại Cửa hàng Oasis từ 9:00 AM đến 11:50 PM mỗi ngày đón khách đi xe buýt từ Pelican sang.",
      sunny: [
        { time: "09:00 AM", location: "Đứng sau quầy hàng bán Hạt giống sao Carambola và Củ dền", locationShort: "Cửa hàng Oasis (Sa mạc)" }
      ],
      rainy: [
        { time: "09:00 AM", location: "Bán hàng tại Oasis (Sa mạc Calico không bao giờ có mưa)", locationShort: "Cửa hàng Oasis" }
      ],
      special: [
        { condition: "Mùa Đông ngày 15", desc: "Rời sa mạc sang Pelican tham dự Lễ hội Chợ Đêm (Night Market) và hội ngộ cùng cô bạn thân Emily." }
      ]
    },
    heartEvents: [
      { hearts: 7, location: "Nhận thư qua hòm thư", desc: "Sandy gửi thư tặng bạn công thức chế biến món bánh súp bơ thơm ngon!" }
    ]
  }
,
{
  "id": "caroline",
  "name": "Caroline",
  "nameEn": "Caroline",
  "avatar": "assets/portraits/caroline.png",
  "category": "town",
  "categoryTitle": "Dân Làng Pelican",
  "gender": "Nữ",
  "marriageable": false,
  "birthday": {
    "season": "winter",
    "seasonText": "Mùa Đông",
    "day": 7
  },
  "residence": "Cửa hàng bách hóa Pierre (Thị trấn Pelican)",
  "family": [
    "Pierre (Chồng)",
    "Abigail (Con gái)"
  ],
  "occupation": "Nội trợ / Người làm vườn nhà kính & Pha chế trà xanh",
  "desc": "Người phụ nữ hiền hậu có mái tóc xanh lá, sở hữu một phòng nhà kính tràn ngập cây trà xanh phía sau tiệm tạp hóa. Cô dạy bạn cách trồng lá trà xanh và pha trà thơm dịu.",
  "gifts": {
    "loved": [
      {
        "name": "Cá chép sốt chanh (Fish Taco)",
        "icon": "assets/icons/fish_taco.png"
      },
      {
        "name": "Trà xanh mùa thu (Green Tea)",
        "icon": "assets/icons/green_tea.png"
      },
      {
        "name": "Bánh bông lan mùa hè (Summer Spangle)",
        "icon": "assets/icons/summer_spangle.png"
      }
    ],
    "liked": [
      {
        "name": "Tất cả các loại Hoa dại"
      },
      {
        "name": "Tất cả các loại Bông cải & Rau củ"
      }
    ],
    "disliked": [
      {
        "name": "Rong biển hoang dã"
      }
    ],
    "hated": [
      {
        "name": "Đất sét (Clay)"
      },
      {
        "name": "Cá hồi nướng"
      }
    ]
  },
  "schedule": {
    "overview": "Sáng chăm sóc cây trong nhà kính nhỏ, trưa dạo quảng trường thị trấn, chiều cùng hội bạn tập aerobics.",
    "sunny": [
      {
        "time": "08:00 AM",
        "location": "Trong phòng trà nhà kính riêng",
        "locationShort": "Nhà kính Pierre"
      },
      {
        "time": "12:00 PM",
        "location": "Đi dạo quảng trường thị trấn",
        "locationShort": "Quảng trường Pelican"
      },
      {
        "time": "05:00 PM",
        "location": "Trở về bếp nấu ăn",
        "locationShort": "Tiệm Pierre"
      },
      {
        "time": "09:00 PM",
        "location": "Đi ngủ",
        "locationShort": "Phòng ngủ"
      }
    ],
    "rainy": [
      {
        "time": "08:00 AM",
        "location": "Ở trong tiệm Pierre pha trà",
        "locationShort": "Tiệm Pierre"
      }
    ],
    "special": [
      {
        "condition": "Thứ Ba hàng tuần",
        "desc": "1:00 PM: Chủ trì buổi tập thể dục nhịp điệu aerobic cho các chị em trong thị trấn."
      }
    ]
  },
  "heartEvents": [
    {
      "hearts": 2,
      "location": "Nhà kính phía sau tiệm Pierre",
      "desc": "Caroline mời bạn thưởng thức tách trà xanh an nhiên và tặng bạn công thức trồng Cây Trà (Tea Sapling) siêu kiếm tiền!"
    }
  ]
},
{
  "id": "george",
  "name": "George",
  "nameEn": "George",
  "avatar": "assets/portraits/george.png",
  "category": "town",
  "categoryTitle": "Dân Làng Pelican",
  "gender": "Nam",
  "marriageable": false,
  "birthday": {
    "season": "fall",
    "seasonText": "Mùa Thu",
    "day": 24
  },
  "residence": "Nhà 1 River Road (Thị trấn Pelican)",
  "family": [
    "Evelyn (Vợ)",
    "Alex (Cháu nội)"
  ],
  "occupation": "Cựu thợ mỏ đã nghỉ hưu / Ngồi xe lăn xem TV",
  "desc": "Cụ ông bề ngoài có vẻ gắt gỏng và khó gần, nhưng ẩn sâu là nỗi buồn sau tai nạn hầm mỏ mất đi đôi chân. Càng quan tâm, cụ càng mở lòng và coi bạn như người thân trong nhà.",
  "gifts": {
    "loved": [
      {
        "name": "Củ tỏi tây nướng mỡ (Leek)",
        "icon": "assets/icons/item_leek.png"
      },
      {
        "name": "Món xào nấm xốp (Fried Mushroom)",
        "icon": "assets/icons/fried_mushroom.png"
      }
    ],
    "liked": [
      {
        "name": "Tất cả các loại Hoa thủy tiên vàng Daffodil"
      }
    ],
    "disliked": [
      {
        "name": "Tất cả các loại Bồ công anh dại"
      }
    ],
    "hated": [
      {
        "name": "Đất sét (Clay)"
      },
      {
        "name": "Bồ công anh"
      }
    ]
  },
  "schedule": {
    "overview": "Hầu hết thời gian ngồi trước màn hình tivi trong phòng khách, Chủ nhật đi xe lăn ra Nhà nguyện Yoba.",
    "sunny": [
      {
        "time": "08:00 AM",
        "location": "Ngồi trước TV xem chương trình tin tức",
        "locationShort": "Phòng khách (Nhà 1 River Road)"
      },
      {
        "time": "12:00 PM",
        "location": "Ngồi trước hiên nhà hít thở không khí",
        "locationShort": "Sân trước nhà"
      },
      {
        "time": "03:00 PM",
        "location": "Trở lại trước TV",
        "locationShort": "Phòng khách"
      },
      {
        "time": "08:00 PM",
        "location": "Lên giường ngủ sớm",
        "locationShort": "Phòng ngủ"
      }
    ],
    "rainy": [
      {
        "time": "08:00 AM",
        "location": "Ở trong phòng khách xem tivi cả ngày",
        "locationShort": "Phòng khách"
      }
    ],
    "special": [
      {
        "condition": "Chủ nhật hàng tuần",
        "desc": "11:00 AM: Đến Điện thờ Yoba phía sau tiệm Pierre để cầu nguyện."
      }
    ]
  },
  "heartEvents": [
    {
      "hearts": 6,
      "location": "Nhà cụ George",
      "desc": "Cụ tâm sự về vụ tai nạn nổ mìn than năm xưa khiến đôi chân bị liệt và cảm ơn bạn đã đến bầu bạn cùng cụ."
    }
  ]
},
{
  "id": "evelyn",
  "name": "Evelyn",
  "nameEn": "Evelyn",
  "avatar": "assets/portraits/evelyn.png",
  "category": "town",
  "categoryTitle": "Dân Làng Pelican",
  "gender": "Nữ",
  "marriageable": false,
  "birthday": {
    "season": "winter",
    "seasonText": "Mùa Đông",
    "day": 20
  },
  "residence": "Nhà 1 River Road (Thị trấn Pelican)",
  "family": [
    "George (Chồng)",
    "Alex (Cháu nội)"
  ],
  "occupation": "Bà nội của cả thị trấn / Người chăm sóc bồn hoa công viên",
  "desc": "Bà cụ hiền hậu như bà tiên trong truyện cổ tích. Bà luôn ân cần nướng bánh quy giòn tan cho mọi người và tự tay chăm sóc từng luống hoa khoe sắc khắp quảng trường.",
  "gifts": {
    "loved": [
      {
        "name": "Củ dền đỏ ngọt ngào (Beet)",
        "icon": "assets/icons/ing_beet.png"
      },
      {
        "name": "Bánh quy bơ giòn (Cookie)",
        "icon": "assets/icons/cookie.png"
      },
      {
        "name": "Bông hoa hồng sô cô la Fairy Rose",
        "icon": "assets/icons/ing_fairy_rose.png"
      },
      {
        "name": "Kim cương (Diamond)",
        "icon": "assets/icons/diamond.png"
      },
      {
        "name": "Bông hoa Tulip nở sớm",
        "icon": "assets/icons/ing_tulip.png"
      }
    ],
    "liked": [
      {
        "name": "Tất cả các loại Bông hoa trồng mùa xuân & hạ"
      },
      {
        "name": "Tất cả các loại Sữa bò"
      }
    ],
    "disliked": [
      {
        "name": "Tỏi tây hoang dã"
      }
    ],
    "hated": [
      {
        "name": "Rác thải rỗng"
      },
      {
        "name": "Hải sâm đen"
      }
    ]
  },
  "schedule": {
    "overview": "Sáng nướng bánh trong bếp, trưa chăm sóc bồn hoa quảng trường thị trấn, chiều dạo bộ bờ sông.",
    "sunny": [
      {
        "time": "08:00 AM",
        "location": "Nướng bánh quy trong gian bếp",
        "locationShort": "Bếp nhà Evelyn"
      },
      {
        "time": "10:30 AM",
        "location": "Chăm sóc bồn hoa cạnh tiệm Saloon",
        "locationShort": "Bồn hoa thị trấn"
      },
      {
        "time": "01:30 PM",
        "location": "Trở về nhà trò chuyện cùng cụ George",
        "locationShort": "Phòng khách"
      },
      {
        "time": "09:00 PM",
        "location": "Đi ngủ",
        "locationShort": "Phòng ngủ"
      }
    ],
    "rainy": [
      {
        "time": "08:00 AM",
        "location": "Ở trong nhà đọc sách và nướng bánh",
        "locationShort": "Nhà Evelyn"
      }
    ],
    "special": [
      {
        "condition": "Mùa Xuân ngày 2",
        "desc": "Ghé thăm nông trại của bạn tặng công thức làm Chậu Cây Trồng Trong Nhà (Garden Pot)."
      }
    ]
  },
  "heartEvents": [
    {
      "hearts": 4,
      "location": "Nhà Evelyn",
      "desc": "Bà dạy bạn công thức làm món Bánh Quy Giòn (Cookie) bí truyền của gia đình."
    }
  ]
},
{
  "id": "jodi",
  "name": "Jodi",
  "nameEn": "Jodi",
  "avatar": "assets/portraits/jodi.png",
  "category": "town",
  "categoryTitle": "Dân Làng Pelican",
  "gender": "Nữ",
  "marriageable": false,
  "birthday": {
    "season": "fall",
    "seasonText": "Mùa Thu",
    "day": 11
  },
  "residence": "Nhà 1 Willow Lane (Thị trấn Pelican)",
  "family": [
    "Kent (Chồng)",
    "Sam (Con trai cả)",
    "Vincent (Con trai út)"
  ],
  "occupation": "Nội trợ chăm sóc gia đình",
  "desc": "Người mẹ tần tảo một mình gánh vác gia đình trong lúc chồng đi nghĩa vụ xa nhà. Cô luôn bận rộn dọn dẹp, nấu ăn và chăm lo chu đáo cho hai cậu con trai.",
  "gifts": {
    "loved": [
      {
        "name": "Kim cương (Diamond)",
        "icon": "assets/icons/diamond.png"
      },
      {
        "name": "Bánh bông lan sô cô la Chocolate Cake",
        "icon": "assets/icons/chocolate_cake.png"
      },
      {
        "name": "Món xào bí ngô cá biển Bass",
        "icon": "assets/icons/crispy_bass.png"
      },
      {
        "name": "Món cà tím sốt phô mai Eggplant Parmesan",
        "icon": "assets/icons/eggplant_parmesan.png"
      },
      {
        "name": "Bánh kếp vàng ươm Pancakes",
        "icon": "assets/icons/pancakes.png"
      }
    ],
    "liked": [
      {
        "name": "Tất cả các loại Trứng & Sữa"
      }
    ],
    "disliked": [
      {
        "name": "Tỏi tây dại"
      }
    ],
    "hated": [
      {
        "name": "Bồ công anh dại"
      }
    ]
  },
  "schedule": {
    "overview": "Sáng dọn dẹp nhà cửa, trưa ghé tiệm Pierre mua thực phẩm, chiều đi tập aerobic.",
    "sunny": [
      {
        "time": "08:00 AM",
        "location": "Nấu bữa sáng trong bếp",
        "locationShort": "Nhà 1 Willow Lane"
      },
      {
        "time": "10:00 AM",
        "location": "Ghé tiệm bách hóa Pierre mua rau củ",
        "locationShort": "Tiệm Pierre"
      },
      {
        "time": "02:00 PM",
        "location": "Trở về dọn phòng cho Sam và Vincent",
        "locationShort": "Nhà 1 Willow Lane"
      },
      {
        "time": "08:00 PM",
        "location": "Xem TV cùng chồng Kent",
        "locationShort": "Phòng khách"
      }
    ],
    "rainy": [
      {
        "time": "08:00 AM",
        "location": "Lau dọn nhà cửa",
        "locationShort": "Nhà 1 Willow Lane"
      }
    ],
    "special": [
      {
        "condition": "Thứ Ba hàng tuần",
        "desc": "1:00 PM: Tập thể dục nhịp điệu tại tiệm Pierre."
      }
    ]
  },
  "heartEvents": [
    {
      "hearts": 4,
      "location": "Nhà 1 Willow Lane",
      "desc": "Jodi mời bạn mang một con Cá Vược Miệng Lớn (Largemouth Bass) đến dùng bữa tối đầm ấm cùng gia đình."
    }
  ]
},
{
  "id": "kent",
  "name": "Kent",
  "nameEn": "Kent",
  "avatar": "assets/portraits/kent.png",
  "category": "town",
  "categoryTitle": "Dân Làng Pelican",
  "gender": "Nam",
  "marriageable": false,
  "birthday": {
    "season": "spring",
    "seasonText": "Mùa Xuân",
    "day": 4
  },
  "residence": "Nhà 1 Willow Lane (Trở về từ Năm 2)",
  "family": [
    "Jodi (Vợ)",
    "Sam (Con trai cả)",
    "Vincent (Con trai út)"
  ],
  "occupation": "Cựu quân nhân trở về từ chiến trường",
  "desc": "Người lính dũng cảm trở về đoàn tụ cùng gia đình vào đầu Năm 2. Anh đối mặt với sang chấn tâm lý sau chiến tranh nhưng luôn cố gắng hết mình để mang lại bình yên cho vợ con.",
  "gifts": {
    "loved": [
      {
        "name": "Hạt phỉ nướng thơm lừng (Roasted Hazelnuts)",
        "icon": "assets/icons/roasted_hazelnuts.png"
      },
      {
        "name": "Món xào quả vả biển Fiddlehead Risotto",
        "icon": "assets/icons/fiddlehead_risotto.png"
      }
    ],
    "liked": [
      {
        "name": "Tất cả các loại Trứng & Sữa"
      },
      {
        "name": "Tất cả các loại Trái cây trồng"
      }
    ],
    "disliked": [
      {
        "name": "Bánh mì (Bread)"
      }
    ],
    "hated": [
      {
        "name": "Bỏng ngô (Popcorn - Tiếng nổ gợi nhớ bom đạn chiến trường)"
      },
      {
        "name": "Sữa đậu nành"
      }
    ]
  },
  "schedule": {
    "overview": "Sáng đứng ngắm cây dưới bóng râm thị trấn, chiều dạo bộ bờ sông ngẫm nghĩ.",
    "sunny": [
      {
        "time": "07:00 AM",
        "location": "Đứng dưới bóng cây đại thụ cạnh nhà",
        "locationShort": "Sân 1 Willow Lane"
      },
      {
        "time": "10:30 AM",
        "location": "Đi dạo bờ sông thị trấn",
        "locationShort": "Bờ sông Pelican"
      },
      {
        "time": "03:00 PM",
        "location": "Đứng trước cửa tiệm Pierre",
        "locationShort": "Quảng trường thị trấn"
      },
      {
        "time": "07:00 PM",
        "location": "Về nhà ăn tối cùng Jodi",
        "locationShort": "Nhà 1 Willow Lane"
      }
    ],
    "rainy": [
      {
        "time": "08:00 AM",
        "location": "Ở trong phòng khách cùng vợ con",
        "locationShort": "Nhà 1 Willow Lane"
      }
    ],
    "special": [
      {
        "condition": "Xuất hiện trong game",
        "desc": "Trở về làng Pelican vào ngày 1 Mùa Xuân Năm thứ 2."
      }
    ]
  },
  "heartEvents": [
    {
      "hearts": 3,
      "location": "Nhà Jodi & Kent",
      "desc": "Giúp Jodi an ủi Kent khi tiếng ngô nổ bắp rang bơ gợi lại ký ức chiến hào căng thẳng."
    }
  ]
},
{
  "id": "pam",
  "name": "Pam",
  "nameEn": "Pam",
  "avatar": "assets/portraits/pam.png",
  "category": "town",
  "categoryTitle": "Dân Làng Pelican",
  "gender": "Nữ",
  "marriageable": false,
  "birthday": {
    "season": "spring",
    "seasonText": "Mùa Xuân",
    "day": 18
  },
  "residence": "Xe rơ-moóc Trailer (sau này xây nhà gạch Community Upgrade)",
  "family": [
    "Penny (Con gái)"
  ],
  "occupation": "Tài xế lái xe buýt Pelican - Sa mạc Calico",
  "desc": "Bác tài xế phóng khoáng, thích uống bia và lái xe buýt đưa bạn đến Sa mạc Calico. Dù cuộc sống vất vả, bác luôn yêu thương con gái Penny hết lòng.",
  "gifts": {
    "loved": [
      {
        "name": "Bia tươi Pale Ale",
        "icon": "assets/icons/pale_ale.png"
      },
      {
        "name": "Bia thường (Beer)",
        "icon": "assets/icons/beer.png"
      },
      {
        "name": "Món súp củ cải vàng Parsnip Soup",
        "icon": "assets/icons/parsnip_soup.png"
      },
      {
        "name": "Củ cải trắng (Parsnip)",
        "icon": "assets/icons/item_parsnip.png"
      },
      {
        "name": "Cương phong Cactus Fruit",
        "icon": "assets/icons/item_cactus_fruit.png"
      }
    ],
    "liked": [
      {
        "name": "Tất cả các loại Trái cây hái lượm"
      },
      {
        "name": "Sữa bò tươi"
      }
    ],
    "disliked": [
      {
        "name": "Bạch tuộc"
      }
    ],
    "hated": [
      {
        "name": "Bạch tuộc nướng"
      }
    ]
  },
  "schedule": {
    "overview": "Sau khi xe buýt được sửa: 10:10 AM đến 5:00 PM đứng lái xe buýt tại trạm. Tối từ 5:00 PM đến nửa đêm tại Quán rượu Saloon.",
    "sunny": [
      {
        "time": "08:30 AM",
        "location": "Rời trailer đi bộ ra trạm xe buýt",
        "locationShort": "Đường làng"
      },
      {
        "time": "10:10 AM",
        "location": "Đứng lái xe buýt đưa người chơi sang Sa mạc Calico (500g)",
        "locationShort": "Trạm Xe Buýt"
      },
      {
        "time": "05:00 PM",
        "location": "Đi thẳng vào Quán Saloon uống bia",
        "locationShort": "Quán Saloon"
      },
      {
        "time": "12:00 AM",
        "location": "Về xe rơ-moóc đi ngủ",
        "locationShort": "Trailer Pam"
      }
    ],
    "rainy": [
      {
        "time": "10:10 AM",
        "location": "Lái xe buýt",
        "locationShort": "Trạm Xe Buýt"
      }
    ],
    "special": [
      {
        "condition": "Mùa Xuân ngày 25",
        "desc": "Đi khám sức khỏe tại phòng khám Harvey, xe buýt tạm nghỉ 1 ngày."
      }
    ]
  },
  "heartEvents": [
    {
      "hearts": 9,
      "location": "Nhà mới của Pam sau khi xây Community Upgrade",
      "desc": "Pam cầu nguyện tạ ơn thần Yoba và xúc động rơi nước mắt cảm ơn tấm lòng hảo tâm của bạn dành cho hai mẹ con."
    }
  ]
},
{
  "id": "jas",
  "name": "Jas",
  "nameEn": "Jas",
  "avatar": "assets/portraits/jas.png",
  "category": "town",
  "categoryTitle": "Dân Làng Pelican",
  "gender": "Nữ",
  "marriageable": false,
  "birthday": {
    "season": "summer",
    "seasonText": "Mùa Hạ",
    "day": 4
  },
  "residence": "Trang trại chăn nuôi Marnie (Rừng Cindersap)",
  "family": [
    "Marnie (Dì)",
    "Shane (Cha đỡ đầu)"
  ],
  "occupation": "Học sinh / Nhảy dây & Chơi búp bê",
  "desc": "Cô bé nhút nhát sống cùng dì Marnie và anh đỡ đầu Shane. Bé rất thích nhảy dây dưới bóng cây cổ thụ và chơi thân với cậu bạn Vincent.",
  "gifts": {
    "loved": [
      {
        "name": "Bánh mận pudding dại Plum Pudding",
        "icon": "assets/icons/plum_pudding.png"
      },
      {
        "name": "Bánh kem hồng (Pink Cake)",
        "icon": "assets/icons/pink_cake.png"
      },
      {
        "name": "Bông hoa hồng sô cô la Fairy Rose",
        "icon": "assets/icons/ing_fairy_rose.png"
      }
    ],
    "liked": [
      {
        "name": "Tất cả các loại Dừa & Bông hoa mùa xuân"
      }
    ],
    "disliked": [
      {
        "name": "Tất cả các loại Rau củ quả trồng"
      }
    ],
    "hated": [
      {
        "name": "Đất sét (Clay)"
      },
      {
        "name": "Bia & Rượu"
      }
    ]
  },
  "schedule": {
    "overview": "Thứ Ba, Tư, Sáu học bài tại thư viện cùng cô Penny. Ngày khác nhảy dây dưới cây to trong Rừng Cindersap.",
    "sunny": [
      {
        "time": "09:00 AM",
        "location": "Chơi búp bê trong phòng ngủ",
        "locationShort": "Trang trại Marnie"
      },
      {
        "time": "11:00 AM",
        "location": "Ra gốc cây to nhảy dây",
        "locationShort": "Rừng Cindersap"
      },
      {
        "time": "04:00 PM",
        "location": "Về nhà ăn tối",
        "locationShort": "Trang trại Marnie"
      }
    ],
    "rainy": [
      {
        "time": "09:00 AM",
        "location": "Ở trong phòng đọc truyện tranh",
        "locationShort": "Trang trại Marnie"
      }
    ],
    "special": [
      {
        "condition": "Thứ Ba, Tư, Sáu",
        "desc": "9:00 AM - 4:00 PM: Học bài tại Thư viện cùng Vincent và Penny."
      }
    ]
  },
  "heartEvents": [
    {
      "hearts": 8,
      "location": "Rừng Cindersap khi gặp Jas và Vincent",
      "desc": "Tặng bạn củ hành Spring Onion Mastery tăng vĩnh viễn giá bán hành tím lên 5 lần!"
    }
  ]
},
{
  "id": "vincent",
  "name": "Vincent",
  "nameEn": "Vincent",
  "avatar": "assets/portraits/vincent.png",
  "category": "town",
  "categoryTitle": "Dân Làng Pelican",
  "gender": "Nam",
  "marriageable": false,
  "birthday": {
    "season": "spring",
    "seasonText": "Mùa Xuân",
    "day": 10
  },
  "residence": "Nhà 1 Willow Lane (Thị trấn Pelican)",
  "family": [
    "Kent (Bố)",
    "Jodi (Mẹ)",
    "Sam (Anh trai)"
  ],
  "occupation": "Học sinh / Bắt ốc sên & Thần tượng anh trai Sam",
  "desc": "Cậu bé nghịch ngợm, đáng yêu luôn tràn đầy năng lượng khám phá. Cậu thích ăn kẹo ngọt và ước mơ sau này lớn lên sẽ cưới cô giáo Penny!",
  "gifts": {
    "loved": [
      {
        "name": "Con ốc sên (Snail)",
        "icon": "assets/icons/ing_snail.png"
      },
      {
        "name": "Kẹo mút quả mọng Cranberry Candy",
        "icon": "assets/icons/cranberry_candy.png"
      },
      {
        "name": "Bánh kem hồng Pink Cake",
        "icon": "assets/icons/pink_cake.png"
      },
      {
        "name": "Nho ngọt ngào (Grape)",
        "icon": "assets/icons/item_grape.png"
      }
    ],
    "liked": [
      {
        "name": "Bánh mì bơ tỏi"
      }
    ],
    "disliked": [
      {
        "name": "Tất cả các loại Rau củ quả"
      }
    ],
    "hated": [
      {
        "name": "Đất sét (Clay)"
      },
      {
        "name": "Bia rượu"
      }
    ]
  },
  "schedule": {
    "overview": "Học bài cùng cô Penny vào Thứ Ba, Tư, Sáu. Các ngày khác chơi ở bãi cát bờ sông hoặc sân chơi trẻ em.",
    "sunny": [
      {
        "time": "09:00 AM",
        "location": "Chơi đồ chơi trong phòng ngủ",
        "locationShort": "Nhà 1 Willow Lane"
      },
      {
        "time": "01:00 PM",
        "location": "Chơi xích đu và cầu trượt tại sân chơi thị trấn",
        "locationShort": "Sân chơi trẻ em"
      },
      {
        "time": "06:00 PM",
        "location": "Về nhà ăn tối cùng bố mẹ",
        "locationShort": "Nhà 1 Willow Lane"
      }
    ],
    "rainy": [
      {
        "time": "09:00 AM",
        "location": "Xem anh Sam chơi đàn guitar",
        "locationShort": "Nhà 1 Willow Lane"
      }
    ],
    "special": [
      {
        "condition": "Thứ Ba, Tư, Sáu",
        "desc": "9:00 AM - 4:00 PM: Học bài tại Thư viện cùng Jas và Penny."
      }
    ]
  },
  "heartEvents": [
    {
      "hearts": 8,
      "location": "Rừng Cindersap",
      "desc": "Vincent dạy bạn cách gọt củ hành tím Spring Onion thơm ngon nhất thung lũng."
    }
  ]
},
{
  "id": "dwarf",
  "name": "Người Lùn Dwarf",
  "nameEn": "Dwarf",
  "avatar": "assets/portraits/dwarf.png",
  "category": "special",
  "categoryTitle": "Cư Dân Hang Mỏ",
  "gender": "Phi nhị nguyên",
  "marriageable": false,
  "birthday": {
    "season": "summer",
    "seasonText": "Mùa Hạ",
    "day": 22
  },
  "residence": "Lối vào Hầm mỏ Khai khoáng (The Mines)",
  "family": [
    "Tộc người lùn cổ đại Dwarves"
  ],
  "occupation": "Thương gia Hang mỏ / Bán Bom nổ, Thuốc nổ & Dầu sinh lực",
  "desc": "Cư dân cuối cùng của tộc người lùn văn minh cổ đại dưới lòng đất. Để nói chuyện được với Dwarf, bạn cần thu thập đủ 4 Cuộn giấy Dwarf Scroll quyên góp cho bảo tàng để nhận Từ điển tiếng Dwarf.",
  "gifts": {
    "loved": [
      {
        "name": "Ngọc đỏ Ruby",
        "icon": "assets/icons/ing_ruby.png"
      },
      {
        "name": "Ngọc bích Emerald",
        "icon": "assets/icons/ing_emerald.png"
      },
      {
        "name": "Thạch anh tím Amethyst",
        "icon": "assets/icons/ing_amethyst.png"
      },
      {
        "name": "Ngọc lam Aquamarine",
        "icon": "assets/icons/ing_aquamarine.png"
      },
      {
        "name": "Ngọc Topaz",
        "icon": "assets/icons/ing_topaz.png"
      },
      {
        "name": "Đá bùa Jade",
        "icon": "assets/icons/ing_jade.png"
      },
      {
        "name": "Món xào quả mọng Omnigeode",
        "icon": "assets/icons/omni_geode.png"
      }
    ],
    "liked": [
      {
        "name": "Thỏi vàng, sắt, đồng"
      }
    ],
    "disliked": [
      {
        "name": "Tất cả các loại Bông hoa"
      }
    ],
    "hated": [
      {
        "name": "Rỉ sét kim loại"
      }
    ]
  },
  "schedule": {
    "overview": "Luôn đứng trong hốc đá bên phải cửa vào Hang mỏ (The Mines) 24/7.",
    "sunny": [
      {
        "time": "06:00 AM",
        "location": "Đứng bán bom đạn và dầu trong hang mỏ",
        "locationShort": "Cửa vào Hang Mỏ"
      }
    ],
    "rainy": [
      {
        "time": "06:00 AM",
        "location": "Trong hang mỏ",
        "locationShort": "Cửa vào Hang Mỏ"
      }
    ],
    "special": [
      {
        "condition": "Yêu cầu giao tiếp",
        "desc": "Cần tìm đủ 4 Cuộn Cổ Thư Dwarf Scroll (I, II, III, IV) nộp bảo tàng để nhận Dwarf Translation Guide."
      }
    ]
  },
  "heartEvents": [
    {
      "hearts": 4,
      "location": "Cống ngầm The Sewers",
      "desc": "Hòa giải cuộc đụng độ căng thẳng hàng nghìn năm giữa Dwarf và Krobus để lập lại hòa bình thế giới ngầm!"
    }
  ]
},
{
  "id": "gunther",
  "name": "Gunther",
  "nameEn": "Gunther",
  "avatar": "assets/portraits/gunther.png",
  "category": "special",
  "categoryTitle": "Nhân Vật Đặc Biệt",
  "gender": "Nam",
  "marriageable": false,
  "birthday": {
    "season": "winter",
    "seasonText": "Mùa Đông",
    "day": 1
  },
  "residence": "Bảo tàng & Thư viện Pelican",
  "family": [
    "Độc thân"
  ],
  "occupation": "Giám đốc Bảo tàng kiêm Thủ thư thị trấn Pelican",
  "desc": "Học giả uyên bác phụ trách phục dựng lại bộ sưu tập Cổ vật và Khoáng sản cho thị trấn. Ông trao cho bạn Chìa Khóa Rỉ Sét mở cống ngầm và Bức tượng Vàng sau khi hiến tặng đủ mẫu vật.",
  "gifts": {
    "loved": [
      {
        "name": "Nhân vật đặc biệt: Không nhận quà tặng cá nhân thông thường qua tay."
      }
    ],
    "liked": [],
    "disliked": [],
    "hated": []
  },
  "schedule": {
    "overview": "Đứng sau quầy tiếp đón tại Bảo tàng từ 8:00 AM đến 6:00 PM mỗi ngày.",
    "sunny": [
      {
        "time": "08:00 AM",
        "location": "Đứng tiếp nhận hiện vật quyên góp tại quầy bảo tàng",
        "locationShort": "Bảo tàng Pelican"
      }
    ],
    "rainy": [
      {
        "time": "08:00 AM",
        "location": "Bảo tàng",
        "locationShort": "Bảo tàng Pelican"
      }
    ],
    "special": [
      {
        "condition": "Quyên góp 60 Hiện vật",
        "desc": "Ghé thăm nông trại trao Chìa khóa Rỉ sét (Rusty Key) mở cửa Cống Ngầm gặp Krobus."
      }
    ]
  },
  "heartEvents": []
},
{
  "id": "marlon",
  "name": "Marlon",
  "nameEn": "Marlon",
  "avatar": "assets/portraits/marlon.png",
  "category": "special",
  "categoryTitle": "Hội Thám Hiểm",
  "gender": "Nam",
  "marriageable": false,
  "birthday": {
    "season": "winter",
    "seasonText": "Mùa Đông",
    "day": 1
  },
  "residence": "Hội Thám Hiểm (Adventurer's Guild cạnh cửa hầm mỏ)",
  "family": [
    "Gil (Bạn chiến hữu lâu năm)"
  ],
  "occupation": "Hội trưởng Hội Thám Hiểm / Bán vũ khí kiếm đao & dịch vụ nhặt đồ rơi",
  "desc": "Cựu chiến binh dũng cảm một mắt, bảo vệ thung lũng khỏi quái vật hang động. Ông cung cấp cho bạn những thanh kiếm sắc bén nhất và dịch vụ Cứu hồi đồ đạc khi bị ngất trong mỏ.",
  "gifts": {
    "loved": [
      {
        "name": "Nhân vật hiệp hội: Bán vũ khí và nhặt đồ rơi qua quầy hội."
      }
    ],
    "liked": [],
    "disliked": [],
    "hated": []
  },
  "schedule": {
    "overview": "Mở cửa Hội Thám Hiểm từ 2:00 PM chiều đến 10:00 PM đêm tất cả các ngày.",
    "sunny": [
      {
        "time": "02:00 PM",
        "location": "Đứng quầy bán kiếm, giày giáp và nhẫn chiến đấu",
        "locationShort": "Hội Thám Hiểm"
      }
    ],
    "rainy": [
      {
        "time": "02:00 PM",
        "location": "Trong hội quán",
        "locationShort": "Hội Thám Hiểm"
      }
    ],
    "special": [
      {
        "condition": "Dịch vụ Item Recovery",
        "desc": "Giúp người chơi tìm lại 1 món đồ quan trọng bị mất khi gục ngã trong mỏ với một khoản phí nhỏ."
      }
    ]
  },
  "heartEvents": []
},
{
  "id": "mr_qi",
  "name": "Quý Ngài Qi (Mr. Qi)",
  "nameEn": "Mr. Qi",
  "avatar": "assets/portraits/mr_qi.png",
  "category": "special",
  "categoryTitle": "Nhân Vật Bí Ẩn Tối Thượng",
  "gender": "Nam",
  "marriageable": false,
  "birthday": {
    "season": "spring",
    "seasonText": "Mùa Xuân",
    "day": 1
  },
  "residence": "Phòng Hạt Nhân Walnut Room (Đảo Gừng) & Sòng bạc Casino (Sa mạc)",
  "family": [
    "Bí ẩn"
  ],
  "occupation": "Thực thể quyền năng siêu nhiên / Người thử thách Độ Hoàn Hảo (Perfection)",
  "desc": "Nhân vật màu xanh bí ẩn đeo kính đen, xuất hiện đằng sau mọi thử thách đỉnh cao nhất của game: Tầng 100 Hang Sọ, Sòng bạc ngầm sa mạc, Phòng Hạt Nhân và Bàn thờ Đạt Điểm 100% Hoàn Hảo trên Đỉnh Núi.",
  "gifts": {
    "loved": [
      {
        "name": "Thực thể tối cao: Không nhận quà tặng thông thường."
      }
    ],
    "liked": [],
    "disliked": [],
    "hated": []
  },
  "schedule": {
    "overview": "Luôn có mặt trong Phòng Hạt Nhân Qi's Walnut Room trên Đảo Gừng và Sòng bạc Oasis.",
    "sunny": [
      {
        "time": "06:00 AM",
        "location": "Giám sát bảng thử thách đặc biệt Qi's Special Orders",
        "locationShort": "Phòng Hạt Nhân Đảo Gừng"
      }
    ],
    "rainy": [
      {
        "time": "06:00 AM",
        "location": "Phòng Hạt Nhân",
        "locationShort": "Phòng Hạt Nhân Đảo Gừng"
      }
    ],
    "special": [
      {
        "condition": "Đạt 100% Độ Hoàn Hảo (Perfection)",
        "desc": "Mở lối lên Đỉnh Núi Thượng Giới (The Summit) đón mừng đoạn kết vinh quang nhất của Stardew Valley cùng toàn bộ dân làng!"
      }
    ]
  },
  "heartEvents": []
},
{
  "id": "professor_snail",
  "name": "Giáo Sư Snail",
  "nameEn": "Professor Snail",
  "avatar": "assets/portraits/professor_snail.png",
  "category": "special",
  "categoryTitle": "Cư Dân Đảo Gừng",
  "gender": "Nam",
  "marriageable": false,
  "birthday": {
    "season": "summer",
    "seasonText": "Mùa Hạ",
    "day": 1
  },
  "residence": "Lều khảo cổ Đảo Gừng (Island Field Office)",
  "family": [
    "Độc thân"
  ],
  "occupation": "Nhà cổ sinh vật học nghiên cứu hóa thạch khủng long đảo nhiệt đới",
  "desc": "Nhà khoa học bị kẹt trong hang đá sau vụ nổ đá tại Đảo Gừng. Sau khi bạn giải cứu bằng quả bom, ông lập Văn phòng Khảo cổ để tiếp nhận xương hóa thạch khủng long và trao Máy Tạo Đà Điểu (Ostrich Incubator).",
  "gifts": {
    "loved": [
      {
        "name": "Nhận mẫu vật xương hóa thạch khủng long trên đảo."
      }
    ],
    "liked": [],
    "disliked": [],
    "hated": []
  },
  "schedule": {
    "overview": "Làm việc tại Lều khảo cổ Island Field Office trên Đảo Gừng từ 9:00 AM đến 5:00 PM.",
    "sunny": [
      {
        "time": "09:00 AM",
        "location": "Ghép xương khủng long và giải câu đố khảo cổ",
        "locationShort": "Lều Khảo Cổ Đảo Gừng"
      }
    ],
    "rainy": [
      {
        "time": "09:00 AM",
        "location": "Lều khảo cổ",
        "locationShort": "Lều Khảo Cổ"
      }
    ],
    "special": [
      {
        "condition": "Hoàn thành bộ xương",
        "desc": "Trao công thức chế tạo Máy Ấp Trứng Đà Điểu (Ostrich Incubator) độc quyền!"
      }
    ]
  },
  "heartEvents": []
},
{
  "id": "birdie",
  "name": "Bà Lão Birdie",
  "nameEn": "Birdie",
  "avatar": "assets/portraits/birdie.png",
  "category": "special",
  "categoryTitle": "Cư Dân Đảo Gừng",
  "gender": "Nữ",
  "marriageable": false,
  "birthday": {
    "season": "fall",
    "seasonText": "Mùa Thu",
    "day": 1
  },
  "residence": "Chòi gỗ bên Bờ biển Tây Đảo Gừng",
  "family": [
    "Góa phụ của vị thuyền trưởng thủy thủ quá cố"
  ],
  "occupation": "Ngư dân già bên bờ biển đảo hoang",
  "desc": "Bà lão hiền từ sống cô đơn bên căn chòi gỗ cạnh xác con tàu đắm của người chồng quá cố. Bà trao cho bạn chuỗi nhiệm vụ trao đổi di vật cảm động 'The Pirate's Wife'.",
  "gifts": {
    "loved": [
      {
        "name": "Nhân vật nhiệm vụ cốt truyện di vật."
      }
    ],
    "liked": [],
    "disliked": [],
    "hated": []
  },
  "schedule": {
    "overview": "Luôn ngồi câu cá và ngắm biển trước căn chòi gỗ Bờ Tây Đảo Gừng.",
    "sunny": [
      {
        "time": "06:00 AM",
        "location": "Ngồi trước chòi gỗ ngắm biển",
        "locationShort": "Bờ Tây Đảo Gừng"
      }
    ],
    "rainy": [
      {
        "time": "06:00 AM",
        "location": "Trước chòi gỗ",
        "locationShort": "Bờ Tây Đảo Gừng"
      }
    ],
    "special": [
      {
        "condition": "Chuỗi nhiệm vụ The Pirate's Wife",
        "desc": "Trao bức ảnh cũ Chiến tranh memento dẫn đến chuỗi trao đổi 7 vật phẩm để nhận 5 Hạt Quả Óc Chó Vàng (Golden Walnuts)."
      }
    ]
  },
  "heartEvents": []
}
];
