// ==========================================================================
// STARDEW VALLEY WIKI - TRANG SỨC (TRINKETS)
// Translated from the Official Stardew Valley Wiki "Trinkets" page and each
// trinket's own page (version 1.6). Pictures in assets/trinkets/ are the
// wiki's own files. desc = in-game description (X, Y, Z vary per trinket).
// ==========================================================================

export const TRINKETS_INTRO = {
  text: 'Trang sức là món đồ đeo ở ô trang bị riêng, mỗi món cho một lợi ích đặc biệt. Chỉ tìm thấy sau khi nhận Thành Thạo Chiến Đấu (ô trang sức cũng mở từ đó). Phần lớn rơi từ quái, từ thùng gỗ và thùng tròn trong Hầm Mỏ, Hang Đầu Lâu, Mỏ Đá, hoặc trong rương phòng kho báu của Hang Đầu Lâu (khoảng 0,63% mỗi rương). Có thể có nhiều món giống nhau; trang sức không xếp chồng. Bán ở Hội Thám Hiểm được 1.000g mỗi món.',
  textEn: "Trinkets are equippable items in their own slot, each giving a unique benefit. They can only be found after claiming Combat Mastery (which also opens the trinket slot). Most drop from monsters, from crates and barrels in the Mines, Skull Cavern and Quarry Mine, or from Skull Cavern treasure rooms (about 0.63% per chest). The same trinket can be found more than once; trinkets don't stack. They sell for 1,000g each at the Adventurer's Guild.",
  anvil: 'Mọi trang sức, trừ Móng Vuốt Basilisk và Gel Vuốt Tóc Ma Thuật, có thể rèn lại trên Đe Rèn để đổi ngẫu nhiên chỉ số, tốn 3 Thỏi Iridium mỗi lần.',
  anvilEn: 'All trinkets except the Basilisk Paw and Magic Hair Gel can be re-forged on an Anvil, which re-rolls their stats for 3 Iridium Bars each time.'
};

const DROP = 'Quái vật rơi ra; thùng gỗ và thùng tròn trong Hầm Mỏ, Hang Đầu Lâu, Mỏ Đá; rương phòng kho báu Hang Đầu Lâu.';
const DROP_EN = 'Monster drops; crates and barrels in the Mines, Skull Cavern and Quarry Mine; Skull Cavern treasure rooms.';

export const TRINKETS = [
  { nameEn: 'Basilisk Paw', name: 'Móng Vuốt Basilisk', icon: 'assets/trinkets/basilisk_paw.png', reforge: null,
    desc: 'Bạn miễn nhiễm với mọi hiệu ứng xấu.', descEn: 'You are immune to debuffs.',
    how: 'Khi đeo, người chơi miễn nhiễm hoàn toàn với các hiệu ứng xấu do quái gây ra (ví dụ Dính Nhớt, Bị Nguyền). Không chặn hiệu ứng Say do tự uống. Tác dụng giống bùa của món Ravioli Mực. Không rèn lại được.',
    howEn: 'While equipped, the player is immune to every debuff caused by enemies (e.g. Slimed or Jinxed). It does not prevent the self-inflicted Tipsy debuff. Same effect as the Squid Ink Ravioli buff. Cannot be re-forged.',
    source: DROP, sourceEn: DROP_EN },
  { nameEn: 'Fairy Box', name: 'Hộp Tiên', icon: 'assets/trinkets/fairy_box.png', reforge: 'Cấp (1-5)', reforgeEn: 'Level (1-5)',
    desc: 'Triệu hồi một bạn đồng hành tiên cấp X, hồi máu cho bạn khi chiến đấu.', descEn: 'Summons a level X fairy companion that heals you in combat situations.',
    how: 'Một nàng tiên bay theo người chơi và thỉnh thoảng hồi máu khi chiến đấu. Lượng hồi bằng căn bậc ba của tổng sát thương bạn gây ra và nhận vào kể từ lần hồi trước (tối đa 10% máu tối đa), nhân với Sức Hồi Máu, cộng trừ 25%.',
    howEn: 'A fairy follows the player and heals them now and then in combat. The amount is the cube root of all damage dealt or received since the last heal (up to 10% of max health), times the Healing Power, plus or minus 25%.',
    table: { head: ['Cấp', 'Hồi mỗi', 'Sức hồi máu', 'Tỉ lệ ra cấp này'], headEn: ['Level', 'Heals every', 'Healing power', 'Level chance'],
      rows: [['1', '4,7 giây', '80%', '33,66%'], ['2', '4,4 giây', '90%', '45,00%'], ['3', '4,1 giây', '100%', '13,75%'], ['4', '3,8 giây', '110%', '5,16%'], ['5', '3,5 giây', '120%', '']],
      rowsEn: [['1', '4.7 s', '80%', '33.66%'], ['2', '4.4 s', '90%', '45.00%'], ['3', '4.1 s', '100%', '13.75%'], ['4', '3.8 s', '110%', '5.16%'], ['5', '3.5 s', '120%', '']] },
    source: DROP, sourceEn: DROP_EN },
  { nameEn: 'Frog Egg', name: 'Trứng Ếch', icon: 'assets/trinkets/green_frog_egg.png', reforge: 'Màu', reforgeEn: 'Color',
    desc: 'Triệu hồi một bạn đồng hành ếch đói bụng.', descEn: 'Summons a hungry frog companion.',
    how: 'Một con ếch đi theo người chơi. Khi quái cách ếch 4-5 ô, nó dùng lưỡi đớp và nuốt con gần nhất; trượt thì 2 giây sau thử lại, nuốt được thì no bụng 12 giây rồi mới ăn tiếp. Ếch nuốt được cả quái thường không đánh được (Bọ Giáp, Xác Ướp). Quái bị ếch ăn không rơi đồ và không tính vào nhiệm vụ hay mục tiêu diệt quái của Hội Thám Hiểm. Rèn lại chỉ đổi màu ếch.',
    howEn: "A frog follows the player. When a monster is within 4-5 tiles of it, it grabs and swallows the nearest one with its tongue; if it misses it tries again after 2 seconds, and after eating it stays full for 12 seconds. It can eat monsters that are normally invulnerable (Armored Bugs, Mummies). Enemies it eats drop nothing and don't count toward quests or the Adventurer's Guild goals. Re-forging only changes the frog's colour.",
    source: DROP, sourceEn: DROP_EN },
  { nameEn: 'Golden Spur', name: 'Cựa Vàng', icon: 'assets/trinkets/golden_spur.png', reforge: 'Thời gian (5-10 giây)', reforgeEn: 'Duration (5-10 seconds)',
    desc: 'Đòn chí mạng cho bạn tăng tốc trong X giây.', descEn: 'Critical strikes give you a speed boost for X seconds.',
    how: 'Mỗi đòn chí mạng cho người chơi hiệu ứng Tốc độ +1 trong thời gian ngắn. Thời gian từ 5 đến 10 giây (số nguyên), mỗi giá trị có khả năng như nhau.',
    howEn: 'Each critical strike gives the player a brief Speed +1 buff. The duration is 5 to 10 seconds (whole seconds), each value equally likely.',
    source: DROP, sourceEn: DROP_EN },
  { nameEn: 'Ice Rod', name: 'Gậy Băng', icon: 'assets/trinkets/ice_rod.png', reforge: 'Chu kỳ bắn (3-5 giây), thời gian đóng băng (2-4 giây)', reforgeEn: 'Frequency (3-5 seconds), freeze duration (2-4 seconds)',
    desc: 'Cứ mỗi X giây bắn một quả cầu băng, đóng băng mọi kẻ địch trên đường bay trong Y giây.', descEn: 'Shoots an orb of ice every X seconds, freezing any enemies in its path for Y seconds.',
    how: 'Khi có quái trong phạm vi 9-10 ô, tự bắn quả cầu băng về phía con gần nhất, đóng băng mọi quái trên đường bay. Cầu băng không gây sát thương và xuyên qua mọi vật cản. Chu kỳ 3-5 giây, đóng băng 2-4 giây. 5% cơ hội ra bản "Gậy Băng Hoàn Hảo": bắn mỗi 3 giây, đóng băng 4 giây.',
    howEn: 'When enemies are within 9-10 tiles, it shoots an ice orb at the nearest one, freezing every monster in its path. Orbs deal no damage and pass through all objects. Cooldown 3-5 seconds, freeze 2-4 seconds. 5% chance of a "Perfect Ice Rod": fires every 3 seconds and freezes for 4.',
    source: DROP, sourceEn: DROP_EN },
  { nameEn: 'Magic Hair Gel', name: 'Gel Vuốt Tóc Ma Thuật', icon: 'assets/trinkets/magic_hair_gel.png', reforge: null,
    desc: 'Tóc bạn lấp lánh đủ màu của một Mảnh Ngũ Sắc.', descEn: 'Your hair shimmers with all the colors of a prismatic shard.',
    how: 'Khi đeo, màu tóc liên tục đổi theo các màu của Mảnh Ngũ Sắc, giống Mũ Cao Bồi Ma Thuật. Thuần trang trí; không rèn lại được. Là trang sức duy nhất không rơi từ quái hay thùng.',
    howEn: 'While equipped, hair colour cycles through the colours of a Prismatic Shard, like the Magic Cowboy Hat. Purely cosmetic; cannot be re-forged. The only trinket that never drops from monsters or containers.',
    source: 'Mua ở quầy của Alex trong Lễ Hội Sa Mạc với giá 100 Trứng Calico.', sourceEn: "Bought from Alex's shop at the Desert Festival for 100 Calico Eggs." },
  { nameEn: 'Magic Quiver', name: 'Ống Tên Ma Thuật', icon: 'assets/trinkets/magic_quiver.png', reforge: 'Loại: thường, Hoàn Hảo, Nhanh, Nặng', reforgeEn: 'Type: regular, Perfect, Rapid, Heavy',
    desc: 'Cứ mỗi X giây bắn một mũi tên ma thuật vào kẻ địch gần đó, gây Y-Z sát thương.', descEn: 'Shoots a magic arrow at nearby enemies every X seconds, dealing Y-Z damage.',
    how: 'Khi có quái trong phạm vi 7-8 ô, tự bắn mũi tên ma thuật về phía con gần nhất, có đẩy lùi, xuyên qua vật cản. Quái hạ bằng mũi tên vẫn tính vào nhiệm vụ và mục tiêu diệt quái. Được cộng sát thương từ kỹ năng Chiến Đấu nhưng không từ nhẫn (Nhẫn Hồng Ngọc, Nhẫn Iridium).',
    howEn: 'When enemies are within 7-8 tiles, it shoots a magic arrow at the nearest one, with some knockback, through all objects. Kills count toward quests and eradication goals. Benefits from Combat skill damage bonuses but not from rings (Ruby Ring, Iridium Band).',
    table: { head: ['Loại', 'Hồi chiêu', 'Sát thương tối thiểu', 'Sát thương tối đa', 'Tỉ lệ ra'], headEn: ['Type', 'Cooldown', 'Min damage', 'Max damage', 'Chance'],
      rows: [['Thường', '1,1-2,1 giây', '13-28', 'Tối thiểu + 5', '86,4%'], ['Hoàn Hảo', '0,9 giây', '30', '35', '4%'], ['Nhanh', '0,6-0,7 giây', '8-12', 'Tối thiểu + 5', '4,8%'], ['Nặng', '1,5-2,0 giây', '23-38', 'Tối thiểu + 5', '4,8%']],
      rowsEn: [['Regular', '1.1-2.1 s', '13-28', 'Min + 5', '86.4%'], ['Perfect', '0.9 s', '30', '35', '4%'], ['Rapid', '0.6-0.7 s', '8-12', 'Min + 5', '4.8%'], ['Heavy', '1.5-2.0 s', '23-38', 'Min + 5', '4.8%']] },
    source: DROP, sourceEn: DROP_EN },
  { nameEn: 'Parrot Egg', name: 'Trứng Vẹt', icon: 'assets/trinkets/parrot_egg.png', reforge: 'Cấp (1-4)', reforgeEn: 'Level (1-4)',
    desc: 'Triệu hồi một bạn đồng hành vẹt cấp X, cho bạn Y cơ hội nhặt được đồng vàng khi hạ quái.', descEn: 'Summons a level X parrot companion, who grants you a Y chance to find gold coins when slaying monsters.',
    how: 'Một con vẹt đi theo người chơi; quái bị hạ thỉnh thoảng rơi đồng vàng trị giá 250g, mỗi đồng rơi lại có thêm cơ hội rơi đồng nữa. Không bị ảnh hưởng bởi may mắn, loại quái, Nhẫn Đạo Tặc. Cấp tối đa phụ thuộc tổng thu nhập. Đeo vẹt khi nói chuyện với người pha chế ở Hang Hải Tặc được tặng 1 Rượu Mật Ong mỗi tối.',
    howEn: "A parrot follows the player; slain monsters sometimes drop gold coins worth 250g, and each coin dropped gives another chance for one more. Not affected by luck, enemy type or the Burglar's Ring. The highest level depends on total earnings. Wearing it while talking to the Pirate Cove bartender gives one free Mead per night.",
    table: { head: ['Cấp', 'Cơ hội rơi xu', 'Xu trung bình mỗi quái', 'Vàng trung bình mỗi quái', 'Tổng thu nhập tối thiểu'], headEn: ['Level', 'Coin chance', 'Avg coins per enemy', 'Avg gold per enemy', 'Min total earnings'],
      rows: [['1', '10%', '0,11', '27,78g', '0g'], ['2', '20%', '0,25', '62,50g', '750.000g'], ['3', '30%', '0,43', '107,14g', '1.500.000g'], ['4', '40%', '0,67', '166,67g', '2.250.000g']],
      rowsEn: [['1', '10%', '0.11', '27.78g', '0g'], ['2', '20%', '0.25', '62.50g', '750,000g'], ['3', '30%', '0.43', '107.14g', '1,500,000g'], ['4', '40%', '0.67', '166.67g', '2,250,000g']] },
    source: DROP, sourceEn: DROP_EN }
];
