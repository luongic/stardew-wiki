// Cẩm nang Dữ liệu Toàn diện: Tất cả Nhiệm Vụ trong Stardew Valley (Cốt Truyện, Nhiệm Vụ Ẩn, Đảo Gừng, Đơn Hàng Lớn & Bản 1.6+)
// Đầy đủ hướng dẫn từng bước chi tiết, vị trí bản đồ, nhân vật liên quan, phần thưởng và mẹo thực hiện.

export const QUESTS_DATA = [
  // ==========================================
  // PHẦN 1: NHIỆM VỤ CỐT TRUYỆN (STORY QUESTS)
  // ==========================================
  {
    id: "introductions",
    name: "Lời Chào Ban Đầu",
    nameEn: "Introductions",
    category: "story",
    giver: "Thị trưởng Lewis",
    giverIcon: "👨‍🌾",
    unlockCondition: "Bắt đầu ngày đầu tiên tại Nông trại (Ngày 1 Mùa Xuân, Năm 1)",
    reward: "100g & Điểm thân thiện với toàn bộ dân làng",
    hidden: false,
    desc: "Chào hỏi và làm quen với tất cả 28 cư dân trong thị trấn Pelican.",
    steps: [
      "Đi dạo quanh thị trấn Pelican, ghé thăm tiệm tạp hóa Pierre vào khoảng 11:00 AM (nhiều người tụ tập tại đây).",
      "Ghé quán rượu The Stardrop Saloon vào các buổi tối (khoảng sau 6:00 PM) để gặp những người thường lui tới uống rượu như Pam, Shane, Clint, Gus, Emily...",
      "Kiểm tra danh sách dân làng trong bảng Tab Social (Phím 'E' -> biểu tượng Trái tim) để xem còn thiếu ai có dấu hỏi chấm chấm chưa gặp.",
      "Lưu ý: Wizard (Pháp sư), Dwarf (Người lùn), Krobus, Kent (đang đi lính năm 1), Leo (trên đảo) không tính trong 28 người ban đầu."
    ],
    tips: "Hãy mang theo hoa dại như Bồ công anh hay Hoa thủy tiên hái bên đường để tặng quà làm quen."
  },
  {
    id: "how_to_win_friends",
    name: "Cách Để Kết Bạn",
    nameEn: "How to Win Friends",
    category: "story",
    giver: "Hệ thống / Thư gửi",
    giverIcon: "💌",
    unlockCondition: "Kích hoạt sau khi hoàn thành nhiệm vụ Lời Chào Ban Đầu",
    reward: "100g",
    hidden: false,
    desc: "Tặng một món quà cho bất kỳ ai trong thị trấn để học cách kết nối tình bạn.",
    steps: [
      "Cầm một món đồ trên tay (ví dụ: hoa dại mùa xuân, khoai tây, trứng...).",
      "Tiến lại gần một dân làng và nhấp chuột phải để tặng quà.",
      "Mỗi người có sở thích riêng (Yêu thích, Thích, Bình thường, Ghét, Căm thù). Hãy tặng món họ thích vào ngày sinh nhật để nhân x8 số điểm tim!"
    ],
    tips: "Tránh tặng rác rưởi hoặc cỏ dại vì sẽ làm tụt điểm tim."
  },
  {
    id: "getting_started",
    name: "Bắt Tay Vào Làm Nông",
    nameEn: "Getting Started",
    category: "story",
    giver: "Hệ thống",
    giverIcon: "🌱",
    unlockCondition: "Ngày 1 Mùa Xuân, Năm 1",
    reward: "100g",
    hidden: false,
    desc: "Thu hoạch vụ mùa đầu tiên của bạn tại nông trại.",
    steps: [
      "Mở gói quà trong nhà chính để nhận 15 hạt giống Củ cải vàng (Parsnip Seeds).",
      "Dùng Cuốc (Hoe) xới 15 ô đất gần nguồn nước.",
      "Gieo hạt giống vào đất đã xới.",
      "Dùng Bình tưới (Watering Can) tưới nước mỗi ngày trong 4 ngày.",
      "Thu hoạch củ cải vàng vào sáng ngày thứ 5."
    ],
    tips: "Đừng quên tưới nước đều đặn mỗi ngày, nếu không cây sẽ không lớn."
  },
  {
    id: "raising_animals",
    name: "Chăn Nuôi Gia Súc",
    nameEn: "Raising Animals",
    category: "story",
    giver: "Robin (Thư)",
    giverIcon: "🔨",
    unlockCondition: "Nhận thư từ Robin vào ngày 8 Mùa Xuân, Năm 1",
    reward: "500g",
    hidden: false,
    desc: "Xây dựng một Chuồng Gà (Coop) trên nông trại của bạn.",
    steps: [
      "Chuẩn bị nguyên liệu: 300 Gỗ (Wood), 100 Đá (Stone) và 4,000g tiền mặt.",
      "Đến tiệm thợ mộc của Robin trên núi (phía bắc thị trấn) từ 9:00 AM đến 5:00 PM.",
      "Chọn Construct Farm Buildings -> Chuồng gà (Coop) và chọn vị trí đặt trên đất nông trại.",
      "Đợi Robin xây dựng trong 2 ngày là hoàn thành."
    ],
    tips: "Hãy xây Silo (Kho chứa cỏ khô) trước khi nuôi gà để tích trữ thức ăn cho mùa đông."
  },
  {
    id: "explore_the_mines",
    name: "Khám Phá Hầm Mỏ",
    nameEn: "Explore the Mines",
    category: "story",
    giver: "Marlon",
    giverIcon: "⚔️",
    unlockCondition: "Ngày 5 Mùa Xuân, Năm 1 (tảng đá chặn cửa mỏ được dọn sạch)",
    reward: "Mở khóa tiếp chuỗi nhiệm vụ mỏ sâu hơn",
    hidden: false,
    desc: "Đi sâu xuống tầng 5 của Hầm mỏ Pelican.",
    steps: [
      "Đi lên góc đông bắc ngọn núi, bước vào Hầm mỏ để gặp Marlon và nhận Thanh kiếm Rỉ sét (Rusty Sword).",
      "Đập đá để tìm cầu thang dẫn xuống tầng tiếp theo.",
      "Tiêu diệt quái vật hoặc đào đất để mở lối đi xuống tầng 5.",
      "Tại tầng 5, bạn sẽ mở khóa Thang máy (Elevator) giúp lưu tiến trình mỗi 5 tầng!"
    ],
    tips: "Luôn mang theo một ít củ quả hồi năng lượng trước khi xuống mỏ."
  },
  {
    id: "deeper_in_the_mines",
    name: "Đi Sâu Vào Lòng Đất",
    nameEn: "Deeper in the Mines",
    category: "story",
    giver: "Hệ thống",
    giverIcon: "⛏️",
    unlockCondition: "Hoàn thành nhiệm vụ Khám Phá Hầm Mỏ (tầng 5)",
    reward: "Thanh kiếm Thép (Steel Smallsword) hoặc vật phẩm thưởng mỗi 10 tầng",
    hidden: false,
    desc: "Chinh phục tầng 40 của hầm mỏ (khu vực Băng tuyết - Frozen Floors).",
    steps: [
      "Sử dụng thang máy để xuống tầng 5, 10, 15, 20...",
      "Tầng 20 bạn sẽ nhận được Cần câu sợi thủy tinh hoặc vật phẩm rương.",
      "Tiếp tục đập đá và né tránh quái vật đến tầng 40.",
      "Tại tầng 40, môi trường sẽ chuyển từ đất đá sang băng tuyết lạnh giá và có rương chứa Slingshot."
    ],
    tips: "Tầng 40 là nguồn dồi dào Quặng Sắt (Iron Ore) và Nước mắt băng (Frozen Tear)."
  },
  {
    id: "to_the_bottom",
    name: "Chạm Đáy Hầm Mỏ",
    nameEn: "To The Bottom?",
    category: "story",
    giver: "Hệ thống",
    giverIcon: "🔑",
    unlockCondition: "Đạt tầng 40 của hầm mỏ",
    reward: "Chìa Khóa Đầu Lâu (Skull Key) & Mở khóa Skull Cavern tại Sa mạc Calico",
    hidden: false,
    desc: "Chinh phục tầng 120 - Tầng sâu nhất của Hầm mỏ Pelican!",
    steps: [
      "Vượt qua khu vực mỏ dung nham nóng đỏ (Tầng 80 đến 119).",
      "Xuống đến tầng 120 bạn sẽ thấy một bục thờ cổ xưa giữa hồ dung nham ngập tràn ánh sáng.",
      "Mở chiếc rương kho báu ở giữa tầng 120 để nhận Chìa Khóa Đầu Lâu (Skull Key)!"
    ],
    tips: "Skull Key vừa dùng để mở cửa hầm mỏ Skull Cavern ở Sa mạc Calico, vừa dùng để chơi máy điện tử Junimo Kart tại quán Saloon."
  },
  {
    id: "robins_lost_axe",
    name: "Chiếc Rìu Thất Lạc Của Robin",
    nameEn: "Robin's Lost Axe",
    category: "story",
    giver: "Robin (Thư ngày 11 Mùa Xuân)",
    giverIcon: "🪓",
    unlockCondition: "Nhận thư từ Robin vào ngày 11 Mùa Xuân, Năm 1",
    reward: "250g & 1 Tim tình bạn với Robin",
    hidden: false,
    desc: "Robin làm mất chiếc rìu yêu thích ở đâu đó trong Rừng Cindersap.",
    steps: [
      "Đi xuống phía nam nông trại vào Rừng Cindersap.",
      "Đi qua trang trại chăn nuôi của Marnie, tiếp tục đi sâu xuống góc đông nam (hướng về phía đường ống cống Sewer).",
      "Bạn sẽ tìm thấy chiếc rìu cán gỗ của Robin nằm trên bãi cỏ gần mép nước phía đông rãnh cống.",
      "Nhặt rìu và đem trả trực tiếp cho Robin tại tiệm thợ mộc trên núi."
    ],
    tips: "Rìu không chiếm chỗ sau khi trả và là nhiệm vụ tìm đồ dễ nhất đầu game."
  },
  {
    id: "jodis_request",
    name: "Yêu Cầu Của Jodi",
    nameEn: "Jodi's Request",
    category: "story",
    giver: "Jodi (Thư ngày 19 Mùa Xuân)",
    giverIcon: "🥦",
    unlockCondition: "Nhận thư từ Jodi vào ngày 19 Mùa Xuân, Năm 1",
    reward: "350g & 1 Tim tình bạn với Jodi",
    hidden: false,
    desc: "Jodi cần một bông súp lơ tươi để nấu món ăn cho gia đình.",
    steps: [
      "Mua hạt súp lơ (Cauliflower Seeds) từ tiệm Pierre với giá 80g.",
      "Trồng và chăm sóc trong 12 ngày mùa xuân.",
      "Thu hoạch và đem 1 bông súp lơ đến nhà Jodi tại số 1 Willow Lane (bên cạnh nhà Haley/Emily)."
    ],
    tips: "Nếu lỡ mùa xuân, bạn sẽ phải đợi đến năm sau hoặc tìm mua ngẫu nhiên tại Xe Đẩy Du Lịch (Traveling Cart)."
  },
  {
    id: "mayors_shorts",
    name: "Chiếc Quần Đùi Bí Mật Của Thị Trưởng Lewis",
    nameEn: "Mayor's Shorts",
    category: "story",
    giver: "Thị trưởng Lewis (Thư ngày 3 Mùa Hạ)",
    giverIcon: "🩳",
    unlockCondition: "Nhận thư từ Lewis vào ngày 3 Mùa Hạ, Năm 1",
    reward: "750g & 1 Tim tình bạn với Lewis (hoặc các màn troll cực hài hước!)",
    hidden: false,
    desc: "Lewis làm mất chiếc 'quần đùi lụa màu tím yêu thích' và muốn bạn tìm kiếm kín đáo.",
    steps: [
      "Kết bạn với cô Marnie tại trang trại chăn nuôi đạt ít nhất 2 Tim tình bạn (để có thể mở cửa bước vào phòng ngủ của cô ấy).",
      "Bước vào phòng ngủ của Marnie, bạn sẽ thấy chiếc quần đùi tím của Lewis nằm ngay trên sàn nhà cạnh giường ngủ!",
      "Nhặt chiếc quần lên và đem trả cho Lewis để nhận 750g."
    ],
    tips: "CÁC TRỨNG PHỤC SINH HÀI HƯỚC: (1) Ném chiếc quần vào Nồi súp lễ hội Luau để chứng kiến phản ứng ngất xỉu của Thống đốc! (2) Đặt quần lên sạp trưng bày tại Hội chợ Mùa Thu Stardew Fair để nhận 750 Token và bị Lewis đuổi về! (3) Dùng máy may kết hợp chiếc quần với Thỏi Vàng để may thành chiếc Quần Tím Đính Vàng mặc lên người để Lewis đỏ mặt chạy trốn!"
  },
  {
    id: "blackberry_basket",
    name: "Chiếc Giỏ Dâu Đen Của Linus",
    nameEn: "Blackberry Basket",
    category: "story",
    giver: "Linus (Thư ngày 8 Mùa Thu)",
    giverIcon: "🧺",
    unlockCondition: "Nhận thư từ Linus vào ngày 8 Mùa Thu, Năm 1",
    reward: "1 Tim tình bạn với Linus",
    hidden: false,
    desc: "Linus làm mất chiếc giỏ hái quả dâu đen yêu quý của mình.",
    steps: [
      "Đi từ nông trại sang phía đông đến Trạm dừng Xe Buýt (Bus Stop).",
      "Tiếp tục đi sang bên trái men theo con đường nhựa cao tốc dẫn vào đường hầm tối.",
      "Chiếc giỏ mây của Linus nằm ngay bên lề đường cỏ phía trên bên cạnh bụi cây rậm rạp.",
      "Nhặt giỏ và mang lên lều của Linus trên núi trả cho ông."
    ],
    tips: "Linus sẽ vô cùng xúc động và điểm tim với ông ấy sẽ tăng rất nhanh."
  },
  {
    id: "a_winter_mystery",
    name: "Bí Ẩn Mùa Đông (Magnifying Glass)",
    nameEn: "A Winter Mystery",
    category: "story",
    giver: "Sự kiện tự động mùa đông",
    giverIcon: "🔍",
    unlockCondition: "Đi từ Nông trại ra Trạm Xe Buýt vào Mùa Đông trong khung giờ 6:00 AM - 4:00 PM",
    reward: "Kính Lúp Phóng Đại (Magnifying Glass) - Mở khóa tính năng nhặt Secret Notes bí mật toàn game!",
    hidden: false,
    desc: "Bạn bắt gặp một bóng đen bí ẩn (Shadow Guy) hoảng hốt bỏ chạy khi thấy bạn.",
    steps: [
      "Khi đoạn cắt cảnh kết thúc, bạn sẽ thấy những dấu chân trần in trên nền tuyết trắng.",
      "Đi men theo dấu chân tuyết dẫn vào thị trấn Pelican, đi qua tiệm hạt giống Pierre hướng về phía sân chơi trẻ em (Playground).",
      "Đi thẳng tới bụi cây rậm rạp ngay bên phải sân chơi trẻ em.",
      "Tương tác (nhấp chuột phải) vào bụi cây, bóng đen Krobus sẽ giật mình nhảy ra và xin lỗi.",
      "Bóng đen sẽ trao cho bạn Kính Lúp Phóng Đại (Magnifying Glass) rồi biến mất vào cống ngầm!"
    ],
    tips: "VẬT PHẨM QUAN TRỌNG NHẤT GAME: Sau khi có kính lúp, mọi hoạt động chặt cây, câu cá, cuốc đất, đào mỏ sẽ có tỉ lệ rơi ra các Ghi Chú Bí Mật (Secret Notes) dẫn đến vô số kho báu ẩn!"
  },
  {
    id: "pam_is_thirsty",
    name: "Pam Đang Khát Rượu",
    nameEn: "Pam is Thirsty",
    category: "story",
    giver: "Pam (Thư ngày 14 Mùa Hạ)",
    giverIcon: "🍺",
    unlockCondition: "Nhận thư ngày 14 Mùa Hạ, Năm 1",
    reward: "350g & 1 Tim tình bạn với Pam",
    hidden: false,
    desc: "Pam thèm một vại bia Pale Ale ủ từ hoa bia tự làm.",
    steps: [
      "Trồng Hops (Hoa bia) vào mùa hè (chỉ mất 1 ngày để thu hoạch lại sau khi lớn).",
      "Chế tạo Thùng ủ Keg (cần cấp Canh tác 8).",
      "Bỏ 1 bông Hops vào Keg ủ trong khoảng 1.5 ngày để tạo ra vại bia Pale Ale.",
      "Đem tới quán rượu Saloon vào buổi tối hoặc đưa cho Pam tại trạm xe buýt."
    ],
    tips: "Pale Ale là món quà yêu thích tuyệt đối của Pam."
  },
  {
    id: "fish_casserole",
    name: "Bữa Tối Cá Nướng Nhà Jodi",
    nameEn: "Fish Casserole",
    category: "story",
    giver: "Jodi (Thư mời ăn tối)",
    giverIcon: "🐟",
    unlockCondition: "Đạt 4 Tim tình bạn với Jodi",
    reward: "Đoạn cắt cảnh bữa tối gia đình ấm cúng cùng Kent, Sam và Vincent",
    hidden: false,
    desc: "Jodi mời bạn đến ăn tối nhưng nhờ bạn mang giúp một con cá Largemouth Bass tươi.",
    steps: [
      "Câu một con Cá Vược Miệng Lớn (Largemouth Bass) tại hồ nước trên núi (Mountain Lake) vào bất kỳ mùa nào (từ 6:00 AM đến 7:00 PM).",
      "Cầm con cá trong túi đồ và bước vào nhà Jodi tại số 1 Willow Lane ĐÚNG LÚC 7:00 PM vào bất kỳ ngày nào.",
      "Thưởng thức bữa tối gia đình vui vẻ."
    ],
    tips: "Phải bước vào cửa đúng 7:00 PM (hoặc trong khoảng 7:00 PM - 7:50 PM), vào trễ hơn nhà sẽ đóng cửa."
  },

  // ==========================================
  // PHẦN 2: TẤT CẢ NHIỆM VỤ ẨN & BÍ MẬT HUYỀN THOẠI (HIDDEN & SECRET QUESTS)
  // ==========================================
  {
    id: "dark_talisman",
    name: "Nhiệm Vụ Ẩn: Bùa Hắc Ám (Dark Talisman)",
    nameEn: "Dark Talisman",
    category: "secret_hidden",
    giver: "Pháp sư Rasmodius",
    giverIcon: "🧙‍♂️",
    unlockCondition: "Hoàn thành toàn bộ Trung Tâm Cộng Đồng (Community Center) hoặc Chuỗi dự án JojaMart",
    reward: "Mở khóa Lối vào Đầm Lầy Phù Thủy (Witch's Swamp)",
    hidden: true,
    desc: "Pháp sư nhờ bạn lấy lại chiếc Bùa Hắc Ám bị mất tích để phá vỡ phong ấn bước vào đầm lầy phù thủy.",
    steps: [
      "Đi lên khu vực Đường sắt (Railroad) phía bắc, một đoạn cắt cảnh sẽ tự động kích hoạt nơi Pháp sư đứng trước hang đá bị phong ấn bùa phép.",
      "Pháp sư nhờ bạn tìm bùa mở phong ấn. Đến Cống Ngầm (Sewer) trò chuyện với Krobus.",
      "Krobus sẽ mở cánh cửa sắt bí mật bên trái cống ngầm dẫn vào Hang Bọ Đột Biến (Mutant Bug Lair).",
      "Tiến vào Mutant Bug Lair, tiêu diệt lũ bọ đột biến bay và đi sâu vào góc trong cùng.",
      "Mở chiếc rương kho báu phát sáng để lấy Bùa Hắc Ám (Dark Talisman).",
      "Quay lại hang đá trên đường sắt, chạm bùa vào khối đá phong ấn để mở lối vào Witch's Swamp!"
    ],
    tips: "Hãy mang vũ khí tốt vì lũ giòi và bọ đột biến trong hang khá đông và trâu bò."
  },
  {
    id: "goblin_problem",
    name: "Nhiệm Vụ Ẩn: Hối Lộ Tên Tay Sai Goblin (Goblin Problem)",
    nameEn: "Goblin Problem",
    category: "secret_hidden",
    giver: "Pháp sư Rasmodius",
    giverIcon: "👺",
    unlockCondition: "Ngay sau khi bước vào Witch's Swamp từ nhiệm vụ Dark Talisman",
    reward: "Lọ Mực Phép Thuật (Magic Ink) & MỞ KHÓA TOÀN BỘ CÔNG TRÌNH MA THUẬT CỦA PHÁP SƯ!",
    hidden: true,
    desc: "Một tên Goblin tay sai khó tính đứng chặn ngay trước cây cầu dẫn vào Túp lều Phù Thủy.",
    steps: [
      "Khi đến gần tên Goblin gác cổng, hắn từ chối cho bạn đi qua.",
      "Nói chuyện với dân làng hoặc đọc sách trong thư viện để biết loài Goblin mê mẩn món Sốt Mayonnaise Hư Vô (Void Mayonnaise).",
      "Cách có Void Mayonnaise: (1) Nuôi gà đen Void Chicken để lấy trứng đen làm sốt, HOẶC (2) Buông cần câu cá trực tiếp xuống vùng nước đầm lầy Witch's Swamp để câu lên 1 hũ Void Mayonnaise!",
      "Tặng hũ Void Mayonnaise cho tên Goblin. Hắn sẽ nhảy cẫng lên sung sướng và lập tức nhường đường.",
      "Bước vào Túp lều Phù Thủy (Witch's Hut), nhặt Lọ Mực Phép Thuật (Magic Ink) trên bàn.",
      "Bước qua vòng tròn dịch chuyển màu đỏ để về thẳng tháp của Pháp sư và trao lọ mực cho ông ấy."
    ],
    tips: "MỞ KHÓA TÍNH NĂNG CỰC KHỦNG: Sau khi hoàn thành, Pháp sư sẽ mở khóa cuốn sách ma thuật cho phép bạn xây Junimo Hut (tự động thu hoạch mùa màng), 4 Tháp Dịch Chuyển Obelisk vĩnh viễn, và Đồng Hồ Vàng (Gold Clock ngăn rác và cỏ dại)!"
  },
  {
    id: "the_mysterious_qi",
    name: "Chuỗi Nhiệm Vụ Bí Ẩn Của Mr. Qi (The Mysterious Qi)",
    nameEn: "The Mysterious Qi",
    category: "secret_hidden",
    giver: "Mr. Qi (Ghi chú bí mật)",
    giverIcon: "🕶️",
    unlockCondition: "Thu thập 1 Cục Pin Năng Lượng (Battery Pack)",
    reward: "Thẻ Hội Viên Câu Lạc Bộ (Club Card) - Mở khóa Sòng Bạc Ngầm Oasis Casino!",
    hidden: true,
    desc: "Chuỗi 5 câu đố hóc búa nhất thung lũng của người đàn ông kính đen bí ẩn Mr. Qi.",
    steps: [
      "BƯỚC 1: Cầm 1 Pin Năng Lượng (Battery Pack), đi từ Trạm xe buýt sang bên trái vào Đường Hầm Tối (Tunnel). Tìm chiếc hộp điều khiển điện gắn trên tường giữa 2 bóng đèn và đặt cục pin vào. Chiếc hộp sẽ nhả ra mẩu giấy chỉ dẫn đầu tiên.",
      "BƯỚC 2: Kiếm 1 Vỏ sò cầu vồng (Rainbow Shell - nhặt ở bãi biển mùa hè hoặc xe đẩy), mang lên Ga xe lửa (Railroad) và đặt vào chiếc hộp gỗ trống cạnh đường ray.",
      "BƯỚC 3: Trồng hoặc mua 10 Củ dền đỏ (Beet - mua hạt từ sa mạc Calico vào mùa thu), mang tới nhà Thị trưởng Lewis và BỎ CẢ 10 CỦ DỀN VÀO TỦ LẠNH trong bếp của ông ấy.",
      "BƯỚC 4: Lấy 1 Tinh chất mặt trời (Solar Essence - đánh quái trong mỏ), đi xe buýt sang Sa mạc Calico, đi về phía dưới tìm bộ xương Rồng Cát Khổng Lồ (Sand Dragon) và cho rồng 'ăn' tinh chất mặt trời bằng cách nhấp chuột phải vào miệng rồng.",
      "BƯỚC 5: Quay trở về Nông Trại của bạn, kiểm tra đống củi gỗ nằm ngay bên cạnh ngôi nhà chính. Bạn sẽ tìm thấy Thẻ Hội Viên Câu Lạc Bộ (Club Card)!"
    ],
    tips: "Cầm Club Card đến Cửa hàng Oasis của Sandy ở Sa mạc Calico, nói chuyện với gã bảo vệ to con đứng chắn cửa sau để được vào Sòng bạc Casino chơi bài đổi giải thưởng lớn!"
  },
  {
    id: "qis_challenge",
    name: "Thử Thách Skull Cavern Tầng 25 (Qi's Challenge)",
    nameEn: "Qi's Challenge",
    category: "secret_hidden",
    giver: "Mr. Qi",
    giverIcon: "🕶️",
    unlockCondition: "Lần đầu tiên bước chân vào Skull Cavern tại Sa mạc Calico",
    reward: "10,000g tiền thưởng gửi qua hòm thư sáng hôm sau",
    hidden: true,
    desc: "Mr. Qi thách thức bạn chứng minh bản lĩnh bằng cách chạm tới tầng 25 của Skull Cavern.",
    steps: [
      "Sửa xong xe buýt (bằng Community Center Vault Bundle hoặc Joja) để đến Sa mạc Calico.",
      "Dùng Skull Key mở cửa hang Skull Cavern ở góc tây bắc sa mạc.",
      "Chuẩn bị nhiều bom và thức ăn hồi máu, đập đá tìm hố sâu (Shaft) hoặc cầu thang.",
      "Chạm tới tầng 25 của mỏ, bạn sẽ nhận được thông báo chúc mừng.",
      "Sáng hôm sau kiểm tra hộp thư trước nhà để nhận tấm séc 10,000g từ Qi!"
    ],
    tips: "Hãy nhảy vào các hố sâu (Shafts) khi đào đá vì chúng có thể giúp bạn rơi xuống từ 3 đến 15 tầng chỉ trong 1 lần nhảy!"
  },
  {
    id: "cryptic_note_100",
    name: "Ghi Chú Bí Ẩn: Skull Cavern Tầng 100",
    nameEn: "Cryptic Note (Floor 100)",
    category: "secret_hidden",
    giver: "Secret Note #10",
    giverIcon: "📜",
    unlockCondition: "Đọc Secret Note #10 (tìm thấy ngẫu nhiên sau khi có Kính Lúp)",
    reward: "Sữa Rắn Iridium (Iridium Snake Milk) - TĂNG VĨNH VIỄN +25 MÁU TỐI ĐA!",
    hidden: true,
    desc: "Mr. Qi để lại lời nhắn: 'Ta đang đợi ngươi... ở tận tầng thứ 100 của Skull Cavern.'",
    steps: [
      "BẮT BUỘC PHẢI ĐỌC SECRET NOTE #10 TRƯỚC! Nếu chưa đọc ghi chú mà xuống tầng 100 thì sẽ không gặp được Qi.",
      "Chuẩn bị thật nhiều Thang Đá (Staircases) đổi từ Jade tại thợ buôn sa mạc, Mega Bomb và Thức ăn buff may mắn/tốc độ (Spicy Eel + Espresso).",
      "Đi vào ngày có Vận May Tột Đỉnh (Kiểm tra TV thấy Thần May Mắn ban phước).",
      "Tiến xuống tầng 100 của Skull Cavern.",
      "Đoạn cắt cảnh đặc biệt sẽ diễn ra: Mr. Qi đang ngồi đợi bạn bên một chiếc bàn tiệc sang trọng.",
      "Nếu bạn dùng ít hơn 10 cái thang đá, Qi sẽ khen bạn là người chơi 'Danh Dự' (Honorable). Nếu dùng hơn 10 thang, ông vẫn khen bạn thông minh.",
      "Qi trao tặng bạn ly Sữa Rắn Iridium (Iridium Snake Milk) giúp thanh máu tối đa tăng vĩnh viễn thêm 25 điểm!"
    ],
    tips: "Dù đi bằng cách nào thì phần thưởng tăng máu vĩnh viễn vẫn như nhau."
  },
  {
    id: "pirates_wife",
    name: "Chuỗi Nhiệm Vụ Ẩn Đảo Gừng: Người Vợ Thủy Thủ (The Pirate's Wife)",
    nameEn: "The Pirate's Wife",
    category: "ginger_island",
    giver: "Bà lão Birdie (Bờ biển Đảo Gừng)",
    giverIcon: "🧓",
    unlockCondition: "Mở khóa Đảo Gừng và đi sang bãi biển phía Tây gặp Birdie",
    reward: "Công thức Bột Thần Tiên (Fairy Dust) + 5 Quả Óc Chó Vàng (Golden Walnuts)",
    hidden: true,
    desc: "Bà cụ Birdie sống cô độc trên bờ biển nhớ người chồng thủy thủ mất tích và nhờ bạn tìm lại kỷ vật.",
    steps: [
      "BƯỚC 1: Nói chuyện với Birdie ở bờ biển phía tây Đảo Gừng, bà trao cho bạn Kỷ Vật Chiến Tranh (War Memento).",
      "BƯỚC 2: Về đất liền Pelican Town, đưa War Memento cho Kent (cựu chiến binh) đổi lấy Muối Cà Chua Thượng Hạng (Gourmet Tomato Salt).",
      "BƯỚC 3: Đem hộp muối vào quán rượu Saloon đưa cho đầu bếp Gus đổi lấy Bông Hoa Thung Lũng Stardew (Stardew Valley Rose).",
      "BƯỚC 4: Bắt xe buýt sang sa mạc Calico tặng bông hoa cho cô nàng Sandy đổi lấy Chiếc Điều Khiển TV Cao Cấp (Advanced TV Remote).",
      "BƯỚC 5: Đem điều khiển TV đến nhà cụ George (ông cụ ngồi xe lăn thích xem TV) đổi lấy Mảnh Vỡ Băng Giá (Arctic Shard).",
      "BƯỚC 6: Mang mảnh băng đến Tháp Pháp Sư (Wizard Tower) đưa cho Rasmodius đổi lấy Con Giun Ngọ Nguậy (Wriggling Worm).",
      "BƯỚC 7: Mang con giun ra bãi biển đưa cho cần thủ Willy đổi lấy Mặt Dây Chuyền Hải Tặc (Pirate's Locket).",
      "BƯỚC 8: Bay về Đảo Gừng trao trả Mặt Dây Chuyền Hải Tặc cho bà cụ Birdie để hoàn thành chuỗi trao đổi huyền thoại!"
    ],
    tips: "Fairy Dust là vật phẩm phép thuật cực mạnh giúp hoàn thành lập tức quá trình ủ rượu hoặc chế biến."
  },
  {
    id: "solid_gold_lewis",
    name: "Bí Mật Tượng Vàng Thị Trưởng Lewis (Solid Gold Lewis)",
    nameEn: "Solid Gold Lewis",
    category: "secret_hidden",
    giver: "Secret Note #19",
    giverIcon: "👑",
    unlockCondition: "Đọc Secret Note #19",
    reward: "Tượng vàng nguyên khối Lewis & Thư tống tiền nhận 750g",
    hidden: true,
    desc: "Một bức tượng đúc bằng vàng ròng nguyên khối hình ngài Thị trưởng được giấu kín sau vườn nhà.",
    steps: [
      "Đọc Secret Note 19: Bạn sẽ thấy hình vẽ bắt đầu từ số 1 Willow Lane (trước cửa nhà Jodi) với các mũi tên chỉ hướng.",
      "Đi theo các mũi tên cho đến khi đụng vật cản thì rẽ: Hướng dẫn này dẫn thẳng ra bụi rậm bí mật PHÍA SAU NHÀ THỊ TRƯỞNG LEWIS.",
      "Cầm Cuốc (Hoe) hoặc Rìu gõ vào ô đất sau nhà Lewis, bạn sẽ nhặt được Bức Tượng Vàng Ròng Lewis (Solid Gold Lewis)!",
      "ĐẶT TƯỢNG VÀO TRUNG TÂM THỊ TRẤN: Đặt bức tượng tại bất kỳ đâu trong quảng trường thị trấn Pelican.",
      "Sáng hôm sau, tượng vàng sẽ biến mất! Bạn sẽ nhận được bức thư giận dữ từ Lewis kèm 750g 'tiền bịt miệng'.",
      "Bức tượng sau đó sẽ di chuyển bí mật vào phòng ngủ của Lewis (90% tỉ lệ) hoặc phòng ngủ của Marnie (10% tỉ lệ)!"
    ],
    tips: "Bạn có thể lặp lại trò đùa này nhiều lần bằng cách nhặt lại bức tượng trong phòng ngủ của họ."
  },
  {
    id: "secret_dolls_statues",
    name: "Bí Mật 3 Bức Tượng Quái Dị Nhất Game",
    nameEn: "Secret Weird Statues (??HMTGF??, ??Pinky Lemon??, ??Foroguemon??)",
    category: "secret_hidden",
    giver: "Mật mã cuốn sách vô nghĩa trong thư viện",
    giverIcon: "🗿",
    unlockCondition: "Đọc cuốn sách bí ẩn 'Super Cucumber Town...' trong bảo tàng sau khi gom sách thất lạc",
    reward: "3 Bức tượng trang trí siêu độc nhất vô nhị: ??HMTGF??, ??Pinky Lemon??, ??Foroguemon??",
    hidden: true,
    desc: "Giải mật mã từ những chữ cái đầu của cuốn sách cổ để mở 3 chiếc rương phong ấn khắp thị trấn.",
    steps: [
      "TƯỢNG 1 (??HMTGF??): Câu 1 con Hải sâm siêu cấp (Super Cucumber) vào mùa hè/thu lúc đêm. Mang đến góc sau hàng rào tiệm rèn Clint, có một lối đi bí mật sau cây dẫn tới chiếc hộp kim loại màu nâu. Đặt Super Cucumber vào hộp để nhận tượng!",
      "TƯỢNG 2 (??Pinky Lemon??): Nuôi vịt để lấy trứng chế tạo Sốt Mayonnaise Vịt (Duck Mayonnaise). Mang vào phòng sau quán rượu The Stardrop Saloon, đặt vào chiếc hộp gỗ màu nâu trong góc để nhận bức tượng hình quả chanh hồng quái dị!",
      "TƯỢNG 3 (??Foroguemon??): Nấu 1 chiếc Bánh Bao Kỳ Dị (Strange Bun). Vào nhà Jodi, đi vào phòng ngủ của cậu bé Vincent và đặt bánh bao vào chiếc rương đồ chơi hình hộp để nhận bức tượng người ngoài hành tinh xanh lá cây!"
    ],
    tips: "3 bức tượng này có thể đặt trang trí bất kỳ đâu trong nhà hoặc ngoài trang trại."
  },
  {
    id: "special_charm_luck",
    name: "Bùa May Mắn Vĩnh Viễn Của Tài Xế Xe Tải (Special Charm)",
    nameEn: "Special Charm",
    category: "secret_hidden",
    giver: "Secret Note #20",
    giverIcon: "🍀",
    unlockCondition: "Đọc Secret Note #20 & Có 1 Chân Thỏ (Rabbit's Foot)",
    reward: "Bùa May Mắn (Special Charm) - TĂNG VĨNH VIỄN VẬN MAY HÀNG NGÀY CHO NGƯỜI CHƠI!",
    hidden: true,
    desc: "Lời nhắn hẹn gặp người đàn ông bí ẩn bên trong chiếc xe tải đậu cạnh JojaMart.",
    steps: [
      "Chuẩn bị 1 Chân Thỏ (Rabbit's Foot - thu hoạch từ chuồng thỏ nuôi hoặc đánh rớt quái Serpent trong Skull Cavern).",
      "Đến bên cạnh chiếc xe tải chở hàng màu xanh đỗ ngay bên phải siêu thị JojaMart.",
      "Nhấp chuột phải vào cửa sổ buồng lái xe tải để trò chuyện với người tài xế bên trong.",
      "Người tài xế sẽ xin bạn chiếc chân thỏ để giải vận đen và đổi lại cho bạn chiếc Bùa May Mắn (Special Charm)!",
      "Chiếc bùa sẽ bay thẳng vào ví (Wallet) trong mục Skills của bạn."
    ],
    tips: "Tăng vĩnh viễn chỉ số may mắn nền tảng của bạn mỗi ngày, giúp tìm cầu thang và quặng quý dễ hơn suốt đời!"
  },
  {
    id: "bears_knowledge",
    name: "Kiến Thức Của Gấu Rừng: Tăng Gấp 3 Giá Bán Dâu Rừng (Bear's Knowledge)",
    nameEn: "Bear's Knowledge",
    category: "secret_hidden",
    giver: "Secret Note #23",
    giverIcon: "🐻",
    unlockCondition: "Đọc Secret Note #23 & Có 1 Lọ Siro Phong (Maple Syrup)",
    reward: "Kiến Thức Của Gấu (Bear's Knowledge) - TĂNG GẤP 3 LẦN GIÁ BÁN QUẢ DÂU ĐEN & DÂU TẰM VĨNH VIỄN!",
    hidden: true,
    desc: "Một bức thư nguệch ngoạc: 'Mang sirô thơm ngon đến Rừng Bí Mật... ta đang đợi.'",
    steps: [
      "Chiết 1 hũ Siro Phong (Maple Syrup) từ cây phong trên nông trại.",
      "Mang hũ siro tiến vào Rừng Bí Mật (Secret Woods - phía tây bắc Rừng Cindersap) trong khoảng 6:00 AM đến 7:00 PM.",
      "Một đoạn cắt cảnh cảm động sẽ diễn ra: Chú gấu rừng khổng lồ xuất hiện uống cạn hũ siro của bạn trong sự thích thú.",
      "Để cảm ơn, chú gấu dạy cho bạn bí quyết hái quả dâu rừng (Bear's Knowledge)!"
    ],
    tips: "Sau nhiệm vụ này, giá bán của Salmonberry và Blackberry sẽ tăng vọt gấp 3 lần giá gốc suốt đời."
  },
  {
    id: "mermaid_flute_puzzle",
    name: "Câu Đố Khối Sáo Nàng Tiên Cá (Mermaid Song)",
    nameEn: "Mermaid's Song",
    category: "ginger_island",
    giver: "Nàng tiên cá Đảo Gừng / Nhật ký hải trình #9",
    giverIcon: "🧜‍♀️",
    unlockCondition: "Đến Đảo Gừng vào MỘT NGÀY TRỜI MƯA (Dùng Rain Totem nếu cần)",
    reward: "5 Quả Óc Chó Vàng (Golden Walnuts)",
    hidden: true,
    desc: "Giải câu đố âm nhạc trên bờ biển phía đông nam Đảo Gừng theo bài hát nàng tiên cá.",
    steps: [
      "Vào ngày mưa trên Đảo Gừng, đến bờ biển phía đông nam (gần hang cướp biển). Bạn sẽ thấy nàng tiên cá xinh đẹp ngồi trên tảng đá ngoài khơi.",
      "Trên bãi cát có 5 tảng đá khắc hình đồng xu lớn nhỏ biểu thị số nốt nhạc.",
      "Chế tạo và đặt 5 Khối Sáo (Flute Blocks) ngay phía trên 5 tảng đá.",
      "Điều chỉnh số nốt nhạc cho từng khối sáo bằng cách nhấp chuột phải theo thứ tự từ trái sang phải: Khối 1: 2 lần | Khối 2: 11 lần | Khối 3: 9 lần | Khối 4: 5 lần | Khối 5: 7 lần.",
      "Sau khi chỉnh xong, chạy nhanh từ trái sang phải để 5 khối sáo phát ra giai điệu hoàn chỉnh.",
      "Nàng tiên cá sẽ vỗ tay mỉm cười và tặng bạn 5 Quả Óc Chó Vàng!"
    ],
    tips: "Hãy mang theo Rain Totem để kích hoạt ngày mưa trên đảo nếu trời cứ nắng liên tục."
  },
  {
    id: "gem_birds_shrine",
    name: "Đền Thờ Bốn Chú Chim Ngọc Quý (Gem Birds)",
    nameEn: "Gem Birds Shrine",
    category: "ginger_island",
    giver: "Đền thờ đá trong rừng Đảo Gừng",
    giverIcon: "🦜",
    unlockCondition: "Khám phá rừng phía đông Đảo Gừng",
    reward: "5 Quả Óc Chó Vàng (Golden Walnuts)",
    hidden: true,
    desc: "Xác định 4 loại đá quý tương ứng với 4 hướng đảo vào những ngày trời mưa.",
    steps: [
      "Vào những ngày mưa trên Đảo Gừng, mỗi ngày sẽ có 1 chú chim màu sặc sỡ xuất hiện ở 1 trong 4 khu vực: Phía Bắc (North), Phía Nam (South), Phía Đông (East), Phía Tây (West).",
      "Tiến lại gần chú chim, nó sẽ bay đi và đánh rơi 1 viên đá quý (Amethyst, Aquamarine, Emerald, Ruby, hoặc Topaz).",
      "Ghi nhớ loại đá quý rơi ở hướng nào.",
      "Đến đền thờ đá ở rừng phía đông (gần túp lều của Leo), đặt đúng 4 viên đá quý tương ứng lên 4 bệ đá (Bắc, Nam, Đông, Tây).",
      "Đền thờ sẽ phát sáng và ban tặng bạn 5 Quả Óc Chó Vàng!"
    ],
    tips: "Mỗi file save game có vị trí đá quý ngẫu nhiên khác nhau, hãy tự khám phá trên chính hòn đảo của bạn."
  },

  // ==========================================
  // PHẦN 3: BẢNG TIN ĐƠN HÀNG ĐẶC BIỆT (SPECIAL ORDERS & MR. QI ORDERS)
  // ==========================================
  {
    id: "community_cleanup",
    name: "Dọn Sạch Rác Bờ Sông (Community Cleanup)",
    nameEn: "Community Cleanup",
    category: "special_orders",
    giver: "Linus",
    giverIcon: "🗑️",
    unlockCondition: "Mở khóa Bảng Đơn Hàng Lớn (Special Orders Board) vào Mùa Thu Năm 1",
    reward: "500g & Công thức Thùng Tái Chế Sợi (Fiber Maker) & Cắt cảnh hồ nước sạch đẹp",
    hidden: false,
    desc: "Linus phát động chiến dịch gom 20 món rác thải từ nguồn nước thung lũng trong 7 ngày.",
    steps: [
      "Nhận nhiệm vụ từ Bảng Đơn Hàng Lớn trước nhà Thị trưởng Lewis.",
      "Đi câu cá tại hồ nước trong nông trại hoặc tầng 100 của mỏ (những nơi tỉ lệ rác cực cao).",
      "Thu thập đủ 20 món rác (Driftwood, Trash, Broken Glasses, Broken CD, Soggy Newspaper).",
      "Bỏ 20 món rác vào thùng tái chế phía sau tiệm đường sắt của Linus."
    ],
    tips: "Hồ nước trên nông trại Standard Farm câu gần như 100% ra rác, hoàn thành chỉ trong 1 buổi chiều."
  },
  {
    id: "prismatic_jelly",
    name: "Săn Thạch Đổi Màu (Prismatic Jelly)",
    nameEn: "Prismatic Jelly",
    category: "special_orders",
    giver: "Pháp sư Rasmodius",
    giverIcon: "🧙‍♂️",
    unlockCondition: "Bảng Đơn Hàng Lớn của Lewis",
    reward: "5,000g & Công Thức Chế Tạo Nước Hoa Dụ Quái (Monster Musk)!",
    hidden: false,
    desc: "Pháp sư cần Thạch Đổi Màu từ một con Sên Cầu Vồng (Prismatic Slime) cực hiếm trong hầm mỏ.",
    steps: [
      "Nhận nhiệm vụ có thời hạn 7 ngày.",
      "Vào Hầm Mỏ Pelican, đi thang máy liên tục giữa tầng 5, 15, 25, 35, 45... để tìm quái.",
      "Tìm một con quái Slime đổi màu liên tục như cầu vồng (Prismatic Slime).",
      "Tiêu diệt nó để nhặt được hũ Thạch Cầu Vồng (Prismatic Jelly 100% tỉ lệ rơi).",
      "Đem về giao tận tay Pháp sư tại Tháp Phép Thuật."
    ],
    tips: "Mẹo hay: Đi thang máy xuống tầng 5, nếu không thấy Slime đổi màu thì quay lên thang máy xuống tầng 15 lặp lại, chỉ mất khoảng 10-15 phút là tìm thấy!"
  },
  {
    id: "ectoplasm",
    name: "Săn Tinh Chất Hồn Ma (A Curious Substance / Ectoplasm)",
    nameEn: "A Curious Substance",
    category: "special_orders",
    giver: "Pháp sư Rasmodius",
    giverIcon: "👻",
    unlockCondition: "Bảng Đơn Hàng Lớn của Lewis",
    reward: "2,500g & Công Thức Cặp Tháp Dịch Chuyển Mini (Mini-Obelisk)!",
    hidden: false,
    desc: "Thu thập 1 lọ Tinh Chất Hồn Ma (Ectoplasm) từ những bóng ma lang thang trong hầm mỏ.",
    steps: [
      "Xuống các tầng Băng Tuyết của hầm mỏ (Tầng 51 đến 79).",
      "Tìm và tiêu diệt các bóng ma màu trắng lơ lửng (Ghosts).",
      "Khi nhiệm vụ đang kích hoạt, mỗi con Ghost có 9.5% tỉ lệ rơi ra lọ Ectoplasm.",
      "Mang lọ Ectoplasm về giao cho Pháp sư."
    ],
    tips: "Cặp Mini-Obelisk nhận được là công cụ dịch chuyển nội bộ trang trại tiện lợi nhất game."
  },
  {
    id: "the_strong_stuff",
    name: "Bia Khoai Tây Hạng Nặng (The Strong Stuff)",
    nameEn: "The Strong Stuff",
    category: "special_orders",
    giver: "Pam",
    giverIcon: "🥔",
    unlockCondition: "Bảng Đơn Hàng Lớn của Lewis vào Mùa Xuân",
    reward: "1,000g & Kênh TV xem phim Fiddlehead TV & 1 Tim tình bạn với Pam",
    hidden: false,
    desc: "Pam muốn thử món rượu mạnh ủ từ 12 củ khoai tây tươi.",
    steps: [
      "Trồng 12 củ khoai tây (Potato) vào mùa xuân.",
      "Bỏ khoai tây vào Thùng ủ Keg để tạo Nước ép khoai tây (Potato Juice).",
      "Giao 12 chai Potato Juice vào nhà của Pam."
    ],
    tips: "Phải ủ khoai tây trong thời gian nhiệm vụ đang diễn ra."
  },
  {
    id: "qis_crop",
    name: "Vụ Mùa Thần Bí Của Qi (Qi's Crop)",
    nameEn: "Qi's Crop",
    category: "special_orders",
    giver: "Mr. Qi (Phòng Óc Chó Đảo Gừng)",
    giverIcon: "🍇",
    unlockCondition: "Mở khóa Phòng Óc Chó (Qi's Walnut Room - cần 100 Walnuts)",
    reward: "100 Qi Gems (Đá quý Qi đổi đồ tối thượng)",
    hidden: true,
    desc: "Trồng, thu hoạch và xuất khẩu 500 Quả Thần Bí (Qi Fruit) trong vòng 28 ngày!",
    steps: [
      "Khi nhiệm vụ bắt đầu, mọi hoạt động chặt cây, câu cá, đập đá, đánh quái sẽ rớt ra hạt giống xanh Qi Beans.",
      "Gieo trồng Qi Beans (mất 4 ngày để chín, hoặc nhanh hơn với Speed-Gro).",
      "Cho những quả Qi Fruit đầu tiên vào Máy nhân giống (Seed Maker) để nhân rộng hàng trăm hạt giống!",
      "Trồng kín nông trại và Đảo Gừng, thu hoạch đủ 500 quả và bỏ vào Thùng xuất khẩu (Shipping Bin) trước khi hết giờ."
    ],
    tips: "Sau khi hết thời gian nhiệm vụ, toàn bộ quả và hạt Qi Beans chưa xuất khẩu sẽ biến mất, vì vậy hãy bán hết trước ngày cuối cùng!"
  },
  {
    id: "danger_in_the_mines",
    name: "Nguy Hiểm Dưới Lòng Đất (Danger in the Mines)",
    nameEn: "Danger in the Mines",
    category: "special_orders",
    giver: "Mr. Qi (Phòng Óc Chó)",
    giverIcon: "💀",
    unlockCondition: "Phòng Óc Chó Mr. Qi",
    reward: "50 Qi Gems & Mở khóa Cần Gạt Đổi Độ Khó Mỏ Vĩnh Viễn (Shrine of Challenge)",
    hidden: true,
    desc: "Hệ thống thang máy mỏ được làm mới hoàn toàn với độ khó cực đại, quái vật đột biến và quặng phóng xạ!",
    steps: [
      "Hầm mỏ Pelican được nâng cấp lên trạng thái Dangerous Mines với các loài quái vật mới cực mạnh (Nhện nhảy, ma ám, nấm độc...).",
      "Chinh phục từ tầng 1 xuống lại tầng 120 trong vòng 7 ngày.",
      "Dùng thang đá hoặc bom dọn đường nhanh chóng.",
      "Đạt tới tầng 120 để hoàn thành nhiệm vụ và nhận Bệ Thờ Thử Thách (Shrine of Challenge) cho phép bật/tắt chế độ mỏ nguy hiểm bất kỳ lúc nào!"
    ],
    tips: "Đây là nguồn DUY NHẤT để đào được Quặng Phóng Xạ (Radioactive Ore) chế tạo các trang bị tối thượng."
  },

  // ==========================================
  // PHẦN 4: NHIỆM VỤ MỚI BẢN 1.6 (VERSION 1.6 QUESTS)
  // ==========================================
  {
    id: "raccoon_family_tree",
    name: "Nhiệm Vụ 1.6: Xây Nhà Cho Gia Đình Gấu Mèo (The Giant Stump)",
    nameEn: "The Giant Stump / Raccoon Family",
    category: "version16",
    giver: "Chú Gấu Mèo Raccoon (Rừng Cindersap)",
    giverIcon: "🦝",
    unlockCondition: "Sau một đêm gió bão lớn (Windstorm event) quật đổ Cây Cổ Thụ khổng lồ ở Rừng Cindersap",
    reward: "Mở khóa Tiệm Đổi Đồ Raccoon, Thành tựu mới, Mũ Raccoon Hat và Gói hạt giống độc quyền 1.6!",
    hidden: true,
    version16: true,
    desc: "TÍNH NĂNG MỚI ĐẶC SẮC 1.6: Giúp gia đình chú gấu mèo dọn đến sinh sống tại gốc cây đại thụ bị bão quật đổ.",
    steps: [
      "BƯỚC 1: Sau khi có thông báo gió bão làm đổ cây đại thụ, đến góc tây bắc Rừng Cindersap (gần lối vào Secret Woods).",
      "BƯỚC 2: Chuẩn bị 100 Gỗ cứng (Hardwood), tương tác với gốc cây bị gãy để sửa chữa thành một ngôi nhà gỗ ấm cúng.",
      "BƯỚC 3: Vài ngày sau, một chú gấu mèo Raccoon sẽ dọn đến ở và xin bạn các món ăn đặc trưng như Trái cây sấy khô (Dried Fruit), Nấm sấy khô (Dried Mushrooms) từ máy Dehydrator mới!",
      "BƯỚC 4: Hoàn thành yêu cầu của chú gấu, chú sẽ tìm được bạn đời và sinh con đẻ cái, mở ra một chuỗi nhiệm vụ cung ứng thực phẩm thú vị.",
      "BƯỚC 5: Mở khóa tiệm bách hóa gấu mèo bán hạt giống mới, Mũ Gấu Mèo (Raccoon Hat) và Jungle Tank!"
    ],
    tips: "Hãy chế tạo máy sấy Dehydrator sớm để chuẩn bị sẵn trái cây và nấm khô cho chú gấu mèo."
  },
  {
    id: "mastery_cave_pillars",
    name: "Nhiệm Vụ 1.6: Chinh Phục Căn Hang Bậc Thầy (Mastery Cave)",
    nameEn: "Mastery Cave / 5 Pillars",
    category: "version16",
    giver: "Ông Nội / Tượng Bậc Thầy Cổ Xưa",
    giverIcon: "⭐",
    unlockCondition: "ĐẠT CẤP ĐỘ 10 Ở CẢ 5 KỸ NĂNG: Canh Tác, Khai Mỏ, Hái Lượm, Câu Cá, Chiến Đấu",
    reward: "Mở khóa 5 Cột Mốc Mastery Tối Thượng: Cần câu Iridium Rod, Lò Rèn Heavy Furnace, Đại Đe Rèn Anvil, Tượng Phước Lành...",
    hidden: true,
    version16: true,
    desc: "ĐỈNH CAO TIẾN TRÌNH BẢN 1.6: Khi đã đạt tối đa tất cả các kỹ năng, điểm kinh nghiệm dư thừa sẽ dùng để mở khóa 5 cột trụ Bậc Thầy quyền năng trong hang bí mật.",
    steps: [
      "Đến góc đông nam Rừng Cindersap (phía trên rãnh cống Sewer), cánh cửa đá phong ấn sẽ tự động mở ra khi bạn đạt max 5 kỹ năng cấp 10.",
      "Bước vào bên trong Căn Hang Bậc Thầy (Mastery Cave), bạn sẽ thấy 5 cột trụ tượng trưng cho 5 nghề nghiệp.",
      "Tích lũy thanh điểm Mastery Bar (cần từ 10,000 đến 30,000 XP cho mỗi cột mốc).",
      "Mở khóa Combat Mastery: Nhận Đại Đe Rèn Anvil, Phụ Kiện Ma Thuật Trinket Slot.",
      "Mở khóa Foraging Mastery: Nhận Hạt Cây Thần Bí Mystic Tree Seed, Treasure Totem.",
      "Mở khóa Farming Mastery: Nhận Tượng Ban Phước Statue of Blessings, Lưỡi Hái Iridium Scythe.",
      "Mở khóa Fishing Mastery: Nhận Cần Câu Nâng Cấp Nâng Đôi Phụ Kiện Advanced Iridium Rod, Mồi Challenge Bait.",
      "Mở khóa Mining Mastery: Nhận Đại Lò Nung Heavy Furnace, Tượng Vua Lùn Statue of the Dwarf King."
    ],
    tips: "Iridium Scythe là vật phẩm cực kỳ bá đạo giúp thu hoạch mùa màng diện rộng chỉ bằng 1 cú vung lưỡi hái!"
  }
];
