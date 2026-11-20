// ==========================================================================
// STARDEW VALLEY WIKI - SÁCH NĂNG LỰC (POWER BOOKS)
// Keyed by the save's id (stats Book_*). Effect, what reading it again gives
// and where to find each book, from the Official Stardew Valley Wiki page
// "Books" > Power Books, version 1.6. `predict`: a Predictor module that
// helps find it (book, mystery, trash, prize, raccoon).
// ==========================================================================

const SELLER = (g, y3) => [`Mua của Người bán sách giá ${g}g${y3 ? ' từ năm 3' : ''}.`, `Bought from the Bookseller for ${g.replace(/\./g, ',')}g${y3 ? ' from year 3' : ''}.`];
const XP_ALL = ['20 XP mọi kỹ năng', '20 XP in each skill'];
const xp = (vi, en) => [`100 XP ${vi}`, `100 ${en} XP`];

const book = (effect, effectEn, [reread, rereadEn], finds, predict) => ({
  effect, effectEn, reread, rereadEn, find: finds.map(f => f[0]), findEn: finds.map(f => f[1]), predict
});

export const POWER_BOOKS_INFO = {
  Book_PriceCatalogue: book('Bạn có thể xem giá trị các món đồ của bạn.', 'You can now see the value of your items.', ['Không có thêm gì', 'Nothing'],
    [SELLER('3.000')], 'book'),
  Book_Marlon: book('Bạn được giảm giá 50% khi dùng dịch vụ tìm đồ thất lạc của Marlon.', "You get a 50% discount on Marlon's item retrieval service.", xp('Chiến đấu', 'Combat'),
    [['Trong chiếc hộp ở phòng sau Hội Mạo Hiểm. Cửa phòng chỉ mở khi đã hạ tổng cộng 1.000 con quái.', "In a box in the back room of the Adventurer's Guild. The door opens after slaying 1,000 monsters in all."], SELLER('20.000', true)], 'book'),
  Book_Speed: book('Bạn sẽ chạy nhanh hơn một chút.', 'You run a little bit faster.', XP_ALL, [SELLER('15.000')], 'book'),
  Book_Speed2: book('Bạn sẽ chạy nhanh hơn một chút.', 'You run a little bit faster.', XP_ALL,
    [['Mua của Người bán sách giá 35.000g, sau khi đã đọc Cuốn theo chiều gió Phần 1.', 'Bought from the Bookseller for 35,000g after reading Way Of The Wind pt. 1.']], 'book'),
  Book_Void: book('Đánh bại quái vật sẽ có cơ hội nhỏ rơi chiến lợi phẩm gấp đôi.', 'Monsters have a small chance to drop double loot.', xp('Chiến đấu', 'Combat'),
    [['Quái vật rơi ra khi bị hạ.', 'Dropped by slain monsters.'], SELLER('20.000', true)], 'book'),
  Book_Friendship: book('Tốc độ kết bạn với mọi người sẽ nhanh hơn một chút.', 'You become friends with people a little faster.', XP_ALL,
    [['Phần thưởng từ Máy đổi vé thưởng trong nhà Thị trưởng Lewis.', "A prize from the prize machine in Mayor Lewis' house."], SELLER('20.000', true)], 'prize'),
  Book_Defense: book('Khả năng Phòng thủ +1.', 'Gain +1 Defense.', xp('Chiến đấu', 'Combat'),
    [['Đào được ở điểm cổ vật (đốm giun ngoe nguẩy).', 'Dug up from Artifact Spots.'], SELLER('20.000', true)], 'book'),
  Book_Woodcutting: book('Chặt cây có 5% cơ hội thu được gấp đôi số gỗ.', 'Felled trees have a 5% chance to yield double the wood.', xp('Hái lượm', 'Foraging'),
    [['Rơi ra khi chặt cây.', 'Dropped when chopping trees.'], SELLER('20.000', true)], 'book'),
  Book_WildSeeds: book('Cắt cỏ dại có nhiều cơ hội nhận được Hạt giống Hỗn hợp hơn.', 'Weeds have a greater chance to yield mixed seeds.', xp('Hái lượm', 'Foraging'),
    [['Phần thưởng khi xong yêu cầu thứ hai của Gấu Mèo ở Gốc Cây Khổng Lồ.', "The reward for the raccoons' second request at the Giant Stump."],
      ['Đổi ở cửa hàng của vợ Gấu Mèo lấy 999 Sợi.', "Traded at the Raccoon Wife's shop for 999 Fiber."], SELLER('20.000', true)], 'raccoon'),
  Book_Roe: book('Câu được Rương kho báu khi câu cá sẽ có cơ hội nhận thêm trứng cá.', 'Fishing treasure chests have a chance to yield roe.', xp('Câu cá', 'Fishing'),
    [['Có trong Rương kho báu khi câu cá.', 'Found in Fishing Treasure Chests.'], SELLER('20.000', true)], 'book'),
  Book_Bombs: book('Sát thương từ Bom tác động lên bạn giảm đi 25%.', 'Bombs deal 25% less damage to you.', xp('Khai khoáng', 'Mining'),
    [['Mua của Người Lùn (Hầm Mỏ) giá 4.000g.', 'Bought from the Dwarf (the Mines) for 4,000g.'], SELLER('20.000', true)], 'book'),
  Book_Crabbing: book('Tăng 25% cơ hội thu gấp đôi sản phẩm từ Bẫy cua.', 'Crab pots have a 25% chance to yield double.', xp('Câu cá', 'Fishing'),
    [['Phần thưởng hạng Iridium ở Lễ hội Mực (SquidFest, mùa đông), ngày nào cũng được nếu chưa nhận lần nào.', 'An Iridium tier reward on either day of SquidFest (winter) if you have not received it before.'], SELLER('20.000', true)], 'book'),
  Book_Trash: book('Bạn có nhiều cơ hội tìm thấy đồ trong thùng rác hơn.', 'You have a greater chance to find items in the trash.', xp('Hái lượm', 'Foraging'),
    [['Trong thùng rác vàng giữa Lò rèn và JojaMart, đi qua một lỗ hở bí mật ở hàng rào.', 'In the gold trash can between the Blacksmith and JojaMart, through a hidden hole in the fence.'], SELLER('20.000', true)], 'trash'),
  Book_Diamonds: book('Khai thác tất cả các loại đá bằng tay đều có cơ hội ra kim cương.', 'All stones have a chance to drop a diamond when mined by hand.', xp('Khai khoáng', 'Mining'),
    [['Mua của Người Lùn trong Hầm Núi Lửa, đổi bằng 10 Kim cương.', 'Bought from the Dwarf in the Volcano Dungeon for 10 Diamonds.']]),
  Book_Mystery: book('Cơ hội tìm thấy Hộp Kỳ bí sẽ lớn hơn một chút.', 'You have a slightly greater chance to find Mystery Boxes.', XP_ALL,
    [['Có trong Hộp Kỳ bí hoặc Hộp Kỳ bí Vàng.', 'Found in Mystery Boxes or Golden Mystery Boxes.']], 'mystery'),
  Book_Horse: book('Tăng tốc độ thêm một chút khi cưỡi ngựa.', 'You gain a little extra speed when riding a horse.', XP_ALL, [SELLER('25.000')], 'book'),
  Book_Artifact: book('Bạn sẽ nhận được mức giá tốt hơn khi bán cổ vật.', 'You will fetch a better price when selling artifacts.', XP_ALL,
    [['Có trong Rương Cổ vật (Artifact Trove), mở ở Lò rèn của Clint.', "Found in Artifact Troves (opened at Clint's)."], SELLER('20.000', true)], 'book'),
  Book_Grass: book('Bạn chạy nhanh hơn nhiều khi đi qua cỏ và cây trồng.', 'You will now run a lot faster through grass and crops.', XP_ALL, [SELLER('25.000')], 'book'),
  Book_AnimalCatalogue: book('Bạn có thể mua sắm ở cửa hàng của Marnie kể cả khi cô ấy không có ở đây.', "You can access Marnie's shop when she's not around.", ['Không có thêm gì', 'Nothing'],
    [['Mua của Marnie giá 5.000g từ năm 2.', 'Bought from Marnie for 5,000g from year 2.']]),
  // A skill book in the wiki's list, but the game keeps it with the power books
  Book_QueenOfSauce: book('Học được mọi công thức của Nữ hoàng nước sốt mà bạn chưa biết, không cần chờ phát trên TV.', "Learn any Queen Of Sauce recipes you don't already know, without waiting for the TV.", ['Không có thêm gì', 'Nothing'],
    [['Mua của Người bán sách giá 50.000g, sau khi đã tìm được 100 Óc Chó Vàng.', 'Bought from the Bookseller for 50,000g after finding 100 Golden Walnuts.']], 'book')
};

// Names the item data does not have
export const BOOK_VI = { Book_Grass: 'Lão Chân Rắn' };

export const READ_ALL_NOTE = {
  text: 'Đọc lần đầu: nhận năng lực, sách hiện ở trang Đồ đặc biệt & Năng lực. Đọc lại: nhận thêm kinh nghiệm (trừ Bảng giá và Danh mục Vật nuôi). Đọc đủ 19 cuốn năng lực được thành tựu "Mọt sách" (Well-Read). Chơi co-op thì mỗi người phải tự đọc.',
  textEn: 'First read: you gain the power and the book shows on the Special Items & Powers page. Reading again: more XP (except the Price Catalogue and Animal Catalogue). All 19 power books earn the Well-Read achievement. In co-op each player has to read them.'
};
