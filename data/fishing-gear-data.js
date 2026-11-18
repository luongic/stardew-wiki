// ==========================================================================
// STARDEW VALLEY WIKI - MỒI CÂU & ĐỒ CÂU (BAIT & TACKLE)
// Translated from the Official Stardew Valley Wiki pages "Bait" and "Tackle"
// (version 1.6). desc = the in-game description, note = how it works.
// ==========================================================================

export const GEAR_INTRO = {
  bait: 'Gắn mồi vào Cần Sợi Thủy Tinh, Cần Iridium hoặc Cần Iridium Cao Cấp (hoặc cho vào Lồng bẫy cua). Cần câu không bắt buộc có mồi, nhưng có mồi thì cá cắn câu nhanh hơn; mồi đặc biệt còn có thêm lợi ích. Mỗi lần quăng cần tốn một mồi. Phù phép Tiết Kiệm Mồi cho 50% cơ hội không mất mồi mỗi lần cá rỉa.',
  baitEn: 'Bait can be attached to a Fiberglass Rod, an Iridium Rod or an Advanced Iridium Rod (or put in a Crab Pot). Fishing rods do not require bait, but fish bite faster with it; specialized baits give extra benefits. Each cast uses one piece of bait. The Preserving enchantment gives a 50% chance for bait not to be consumed on each nibble.',
  tackle: 'Chỉ Cần Iridium (1 ô) và Cần Iridium Cao Cấp (2 ô) gắn được đồ câu. Đồ câu mòn dần và hỏng sau 20 lần cá rỉa (hiện chữ "HIT"), nhưng không mòn khi câu ra rác, tảo, rong biển hay đồ đặc biệt. Đồ câu không xếp chồng trong túi. Gắn 2 món khác nhau thì luôn cộng dồn tác dụng.',
  tackleEn: 'Only the Iridium Rod (1 slot) and the Advanced Iridium Rod (2 slots) can equip tackle. Tackle wears out after 20 nibbles (shown by "HIT"), but not when catching trash, algae, seaweed or special items. Tackle does not stack in the inventory. Two different tackles always stack their effects.'
};

export const BAITS = [
  { id: 'bait', en: 'Bait', name: 'Mồi', icon: 'assets/icons/craft_bait.png',
    desc: 'Làm cá cắn câu nhanh hơn. Phải gắn vào cần câu trước.', descEn: 'Causes fish to bite faster. Must first be attached to a fishing rod.',
    note: 'Mồi cơ bản: thời gian chờ cá rỉa giảm 50% và ít câu ra rác hơn.', noteEn: 'Default bait: the delay before a nibble is 50% shorter and trash is less likely.',
    get: 'Công thức ở cấp Câu Cá 2 (1 Thịt Bọ); mua 5g ở Tiệm Cá.', getEn: 'Recipe at Fishing level 2 (1 Bug Meat); 5g at the Fish Shop.' },
  { id: 'magnet', en: 'Magnet', name: 'Nam Châm', icon: 'assets/icons/craft_magnet.png',
    desc: 'Tăng cơ hội câu được rương kho báu. Có điều cá không mê mùi vị của nó lắm.', descEn: "Increases the chance of finding treasures when fishing. However, fish aren't crazy about the taste.",
    note: 'Cơ hội ra kho báu +15% (30% thay vì 15%). Dù mô tả nói vậy, tốc độ cá cắn câu vẫn như mồi thường.', noteEn: 'Treasure chance +15% (30% instead of 15%). Despite the description, the bite rate is the same as standard bait.',
    get: 'Công thức ở cấp Câu Cá 9 (1 Thỏi Sắt); mua 1.000g.', getEn: 'Recipe at Fishing level 9 (1 Iron Bar); 1,000g.' },
  { id: 'wild', en: 'Wild Bait', name: 'Mồi Dân Dã', icon: 'assets/icons/wild_bait.png',
    desc: 'Công thức độc đáo của Linus, cho cơ hội câu được hai con cá một lúc.', descEn: 'A unique recipe from Linus that gives you a chance to catch two fish at once.',
    note: 'Thời gian chờ cá rỉa giảm 62,5%. Không cho cơ hội câu được hai con cá huyền thoại. Dùng trong Lồng bẫy cua thì ít ra rác hơn mồi thường (nếu không có nghề Thủy Thủ).', noteEn: 'Cuts the delay before a nibble by 62.5%. Does not give a chance of two Legendary Fish. In a Crab Pot it lowers the trash chance compared to standard bait (without the Mariner profession).',
    get: 'Công thức từ sự kiện 4 tim của Linus (10 Sợi, 5 Chất Nhờn, 5 Thịt Bọ).', getEn: "Recipe from Linus' 4-heart event (10 Fiber, 5 Slime, 5 Bug Meat)." },
  { id: 'magic', en: 'Magic Bait', name: 'Mồi Ma Thuật', icon: 'assets/icons/magic_bait.png',
    desc: 'Câu được cá của mọi mùa, mọi giờ, mọi thời tiết, tùy loại nước bạn quăng cần.', descEn: 'Allows you to catch fish from any season, time, or weather, from whichever type of water you cast into.',
    note: 'Tốc độ cá cắn câu như mồi thường.', noteEn: 'The bite rate is the same as standard bait.',
    get: 'Mua 20 cái với 5 Ngọc Qi; công thức 20 Ngọc Qi ở Phòng Óc Chó của Ông Qi (1 Quặng Phóng Xạ, 3 Thịt Bọ).', getEn: "20 for 5 Qi Gems; recipe for 20 Qi Gems in Qi's Walnut Room (1 Radioactive Ore, 3 Bug Meat)." },
  { id: 'deluxe', en: 'Deluxe Bait', name: 'Mồi Cao Cấp', icon: 'assets/icons/deluxe_bait.png',
    desc: 'Làm cá cắn câu nhanh hơn nữa và tăng kích thước "thanh câu".', descEn: 'Causes fish to bite even faster and increases size of the "fishing bar".',
    note: 'Thời gian chờ cá rỉa giảm 67%; thanh câu dài thêm 12 điểm ảnh. Trong Lồng bẫy cua: cá đạt chất lượng bạc và ít ra rác hơn (nếu không có nghề Thủy Thủ).', noteEn: 'Cuts the delay before a nibble by 67%; the bar grows by 12 pixels. In a Crab Pot: catches become silver quality and trash is less likely (without the Mariner profession).',
    get: 'Công thức ở cấp Câu Cá 4 (5 Mồi, 2 Rêu); mua 100g.', getEn: 'Recipe at Fishing level 4 (5 Bait, 2 Moss); 100g.' },
  { id: 'challenge', en: 'Challenge Bait', name: 'Mồi Thử Thách', icon: 'assets/icons/challenge_bait.png',
    desc: 'Câu "hoàn hảo" thì được gấp ba số cá. Nhưng mỗi lần cá thoát khỏi "thanh câu", số cá giảm đi.', descEn: 'A "perfect" catch yields triple the fish. However, each time a fish escapes the "fishing bar", the catch is reduced.',
    note: 'Cá thoát khỏi thanh câu 3 lần là sổng mất. Thời gian chờ cá rỉa giảm 62,5%. Có thể câu được tới ba con cùng loại một lúc, kể cả cá huyền thoại.', noteEn: 'The fish escapes if it leaves the bar 3 times. Cuts the delay before a nibble by 62.5%. Can catch up to three of the same fish at once, Legendary Fish included.',
    get: 'Công thức sau khi nhận Thành Thạo Câu Cá (5 Mảnh Xương, 2 Rêu).', getEn: 'Recipe after claiming Fishing Mastery (5 Bone Fragment, 2 Moss).' },
  { id: 'targeted', en: 'Targeted Bait', name: 'Mồi Chỉ Định', icon: 'assets/icons/targeted_bait.png',
    desc: 'Tăng cơ hội câu được (tên loài cá).', descEn: 'Increases your chances to catch (fish name).',
    note: 'Loài cá đó vẫn phải câu được ở nơi, giờ, thời tiết và mùa hiện tại. Tốc độ cắn câu như mồi thường. Trong Lồng bẫy cua (không có nghề Thủy Thủ): Tôm Hùm gấp 4 lần; Nghêu, Cua, Hàu gấp 3; các loài khác gấp đôi; ít ra rác hơn.', noteEn: 'The fish must still be catchable in that place, time, weather and season. Same bite rate as standard bait. In a Crab Pot (without Mariner): Lobster x4; Clam, Crab, Oyster x3; others x2; less trash.',
    get: 'Làm bằng Máy Làm Mồi từ một con cá; giá bằng 0,2 x giá con cá.', getEn: 'Made in a Bait Maker from a fish; worth 0.2 x the fish price.' }
];

export const TACKLES = [
  { id: 'spinner', en: 'Spinner', name: 'Mồi Quay', icon: 'assets/icons/x_spinner.png',
    desc: 'Hình dáng làm nó xoay tròn trong nước. Tăng nhẹ tốc độ cá cắn câu.', descEn: 'The shape makes it spin around in the water. Slightly increases the bite-rate when fishing.',
    note: 'Thời gian chờ cá rỉa tối đa giảm 3,75 giây (gắn 2 cái: 7,5 giây).', noteEn: 'Cuts the maximum delay before a nibble by 3.75 seconds (two: 7.5 seconds).',
    get: 'Cấp Câu Cá 6; 500g (2 Thỏi Sắt).', getEn: 'Fishing level 6; 500g (2 Iron Bar).' },
  { id: 'dressed', en: 'Dressed Spinner', name: 'Mồi Quay Có Tua', icon: 'assets/icons/x_dressed_spinner.png',
    desc: 'Miếng kim loại và dải tua sặc sỡ tạo cảnh tượng hấp dẫn cá. Tăng tốc độ cá cắn câu.', descEn: 'The metal tab and colorful streamers create an enticing spectacle for fish. Increases the bite-rate when fishing.',
    note: 'Thời gian chờ cá rỉa tối đa giảm 7,5 giây (gắn 2 cái: 15 giây).', noteEn: 'Cuts the maximum delay before a nibble by 7.5 seconds (two: 15 seconds).',
    get: 'Cấp Câu Cá 8 (từ cấp 6 có thể ra trong rương kho báu); 1.000g (2 Thỏi Sắt, 1 Vải).', getEn: 'Fishing level 8 (treasure chests from level 6); 1,000g (2 Iron Bar, 1 Cloth).' },
  { id: 'trap', en: 'Trap Bobber', name: 'Phao Hút', icon: 'assets/icons/trap_bobber.png',
    desc: 'Cá thoát chậm hơn khi bạn không giữ được nó.', descEn: "Causes fish to escape slower when you aren't reeling them in.",
    note: 'Thanh tiến độ bên phải giảm chậm hơn 33% khi cá nằm ngoài thanh câu (gắn 2 cái: 50%).', noteEn: "The progress bar drops 33% slower while the fish isn't within the fishing bar (two: 50%).",
    get: 'Cấp Câu Cá 6; 500g (1 Thỏi Đồng, 10 Nhựa Cây).', getEn: 'Fishing level 6; 500g (1 Copper Bar, 10 Sap).' },
  { id: 'cork', en: 'Cork Bobber', name: 'Phao Nút Chai', icon: 'assets/icons/cork_bobber.png',
    desc: 'Tăng nhẹ kích thước "thanh câu".', descEn: 'Slightly increases the size of your "fishing bar".',
    note: 'Thanh câu dài thêm 24 điểm ảnh (gắn 2 cái: 48).', noteEn: 'The bar grows by 24 pixels (two: 48).',
    get: 'Cấp Câu Cá 7; 750g (10 Gỗ, 5 Gỗ Cứng, 10 Chất Nhờn).', getEn: 'Fishing level 7; 750g (10 Wood, 5 Hardwood, 10 Slime).' },
  { id: 'lead', en: 'Lead Bobber', name: 'Phao Chì', icon: 'assets/icons/x_lead_bobber.png',
    desc: 'Thêm sức nặng cho "thanh câu", để nó không nảy lên khi chạm đáy.', descEn: 'Adds weight to your "fishing bar", preventing it from bouncing along the bottom.',
    note: 'Wiki nhận xét món này có lẽ không mấy hữu ích, vì chỉ cần bấm giảm tốc ngay trước khi thanh chạm đáy là thanh không nảy.', noteEn: 'Perhaps not helpful, as it is easy to stop the bar bouncing by clicking to slow it down right before it hits the bottom.',
    get: 'Cấp Câu Cá 6; 200g (không chế tạo được).', getEn: 'Fishing level 6; 200g (cannot be crafted).' },
  { id: 'treasure', en: 'Treasure Hunter', name: 'Thợ Săn Kho Báu', icon: 'assets/icons/x_treasure_hunter.png',
    desc: 'Cá không thoát trong lúc bạn nhặt kho báu. Cũng tăng nhẹ cơ hội ra kho báu.', descEn: "Fish don't escape while collecting treasures. Also slightly increases the chance to find treasures.",
    note: 'Cơ hội kho báu +5% (gắn 2 cái: +10%). Trong lúc nhặt rương, thanh tiến độ đứng yên nếu cá ở ngoài thanh câu; vẫn tính là câu hoàn hảo nếu cá chỉ ra ngoài lúc đang nhặt rương.', noteEn: 'Treasure chance +5% (two: +10%). While collecting a chest the progress bar holds steady if the fish is outside the bar; still a perfect catch if the fish only left the bar during that time.',
    get: 'Cấp Câu Cá 7; 750g (2 Thỏi Vàng).', getEn: 'Fishing level 7; 750g (2 Gold Bar).' },
  { id: 'barbed', en: 'Barbed Hook', name: 'Lưỡi Câu Có Ngạnh', icon: 'assets/icons/x_barbed_hook.png',
    desc: 'Giữ chặt con mồi hơn, làm "thanh câu" bám theo cá. Hiệu quả nhất với cá chậm, yếu.', descEn: 'Makes your catch more secure, causing the "fishing bar" to cling to your catch. Works best on slow, weak fish.',
    note: 'Thanh câu tự lên xuống để bám giữa con cá, chỉ khi thanh đang trùm lên cá. Cá càng giật lên xuống nhiều thì móc càng kém hiệu quả.', noteEn: 'The bar moves by itself to stay on the middle of the fish, only while it is on the fish. The more the fish darts up and down, the less effective it is.',
    get: 'Cấp Câu Cá 8; 1.000g (1 Thỏi Đồng, 1 Thỏi Sắt, 1 Thỏi Vàng).', getEn: 'Fishing level 8; 1,000g (1 Copper Bar, 1 Iron Bar, 1 Gold Bar).' },
  { id: 'curiosity', en: 'Curiosity Lure', name: 'Mồi Tò Mò', icon: 'assets/icons/x_curiosity_lure.png',
    desc: 'Tăng cơ hội câu được cá hiếm.', descEn: 'Increases your chance to catch rare fish.',
    note: 'Hữu ích nhất với cá hiếm xuất hiện như Cá Pip Băng, Cá Chép Đột Biến và Legend. Gắn 2 cái không thêm tác dụng.', noteEn: 'Most useful for fish that spawn rarely, such as the Ice Pip, Mutant Carp and Legend. Two give no extra benefit.',
    get: 'Đập hộp và thùng ở Mỏ Đá, Hang Đầu Lâu, Hầm Núi Lửa, hoặc quái Xác Ướp và quái đặc biệt ở Hang Đầu Lâu rơi ra.', getEn: 'Breaking boxes and barrels in the Quarry Mine, Skull Cavern or Volcano Dungeon, or dropped by Mummies and special monsters in Skull Cavern.' },
  { id: 'quality', en: 'Quality Bobber', name: 'Phao Chất Lượng', icon: 'assets/icons/x_quality_bobber.png',
    desc: 'Nâng chất lượng cá câu được.', descEn: 'Boosts the quality of fish that you catch.',
    note: 'Chất lượng cá tăng một bậc (gắn 2 cái: hai bậc): cách khác để có cá Iridium ngoài câu hoàn hảo.', noteEn: 'Raises the quality of the fish by one level (two: two levels): another way to iridium fish besides a perfect catch.',
    get: 'Công thức từ Willy sau đơn hàng đặc biệt "Juicy Bugs Wanted!" (1 Thỏi Đồng, 20 Nhựa Cây, 5 Tinh Chất Mặt Trời).', getEn: 'Recipe from Willy after the "Juicy Bugs Wanted!" special order (1 Copper Bar, 20 Sap, 5 Solar Essence).' },
  { id: 'sonar', en: 'Sonar Bobber', name: 'Phao Sonar', icon: 'assets/icons/x_sonar_bobber.png',
    desc: 'Cho biết con cá nào đang mắc câu trước khi bắt được.', descEn: "Shows what fish is on the line before it's caught.",
    note: 'Gắn 2 cái không thêm tác dụng.', noteEn: 'Two give no extra benefit.',
    get: 'Cấp Câu Cá 6; 500g (1 Thỏi Sắt, 2 Thạch Anh Tinh Luyện).', getEn: 'Fishing level 6; 500g (1 Iron Bar, 2 Refined Quartz).' }
];
