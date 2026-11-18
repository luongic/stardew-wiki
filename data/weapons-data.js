// ==========================================================================
// STARDEW VALLEY WIKI - VŨ KHÍ (WEAPONS)
// Every weapon, translated from the Official Stardew Valley Wiki "Weapons"
// page (version 1.6); pictures in assets/weapons/ are the wiki's own files.
//   damage [min, max], crit = base critical strike chance (0.02 = 2%)
//   mods  = the stats the game shows on the weapon (speed, defense, weight,
//           critChance, critPower), as the wiki lists them
// ==========================================================================

export const WEAPON_TYPES = {
  sword: { name: 'Kiếm', nameEn: 'Swords', icon: 'assets/weapons/steel_smallsword.png',
    desc: 'Vũ khí cân bằng, đánh nhanh và ít độ trễ giữa các lần vung. Đòn phụ là thế đỡ: chặn sát thương và gây chút sát thương ngược lên quái vừa tấn công bạn; khi đỡ còn đẩy lùi quái bay.',
    descEn: 'Well-rounded weapons with quick attacks and low swing delay. The secondary attack is a blocking stance that negates damage and deals minor damage to the attacker; blocking also knocks back flying enemies.' },
  dagger: { name: 'Dao găm', nameEn: 'Daggers', icon: 'assets/weapons/iron_dirk.png',
    desc: 'Vũ khí đánh nhanh nhất trong game, nhưng tầm ngắn: chỉ đâm vào ô ngay trước mặt thay vì vung thành vòng cung như kiếm. Đòn phụ đâm liên tiếp 4 lần rất nhanh và giữ quái đứng yên trong lúc đâm.',
    descEn: 'The fastest-attacking weapons in the game, but short-ranged: they only target the square in front of the player rather than swinging in an arc. The secondary attack stabs 4 times in quick succession and locks the enemy in place.' },
  club: { name: 'Gậy & búa', nameEn: 'Clubs', icon: 'assets/weapons/wood_mallet.png',
    desc: 'Vũ khí nặng, thường chậm hơn kiếm và dao găm nhưng vung rộng. Đòn phụ nện xuống đất, gây sát thương diện rộng quanh người chơi và đẩy lùi rất mạnh; đòn này không bao giờ chí mạng. Bấm đòn phụ rồi bấm đòn thường liên tục sẽ ra nhiều đòn liền nhau.',
    descEn: 'Heavy weapons, slower than swords and daggers but with a wide swing. The secondary attack slams the ground for an area attack around the player with strong knockback; it is never a critical hit. Right-clicking and then left-clicking repeatedly gives several quick attacks.' },
  slingshot: { name: 'Súng cao su', nameEn: 'Slingshots', icon: 'assets/weapons/slingshot.png',
    desc: 'Sát thương phụ thuộc chủ yếu vào loại đạn. Súng Cao Su Bậc Thầy thường gây gấp đôi sát thương so với Súng Cao Su thường với cùng loại đạn. Không rèn hay phù phép được ở Lò Rèn.',
    descEn: 'Damage depends mainly on the ammunition. A Master Slingshot generally deals 2x the damage of a regular Slingshot with the same ammo. Cannot be forged or enchanted.' }
};

export const WEAPONS = [
 {
  "nameEn": "Rusty Sword",
  "name": "Kiếm Gỉ",
  "type": "sword",
  "level": 1,
  "damage": [
   2,
   5
  ],
  "crit": 0.02,
  "mods": {},
  "buy": 250,
  "sell": 50,
  "icon": "assets/weapons/rusty_sword.png",
  "desc": "Một thanh kiếm cũ, gỉ sét và cùn.",
  "descEn": "A rusty, dull old sword.",
  "where": [
   "Lối vào Hầm Mỏ"
  ],
  "whereEn": [
   "The Mines entrance"
  ]
 },
 {
  "nameEn": "Steel Smallsword",
  "name": "Kiếm Ngắn Thép",
  "type": "sword",
  "level": 1,
  "damage": [
   4,
   8
  ],
  "crit": 0.02,
  "mods": {
   "speed": 2
  },
  "buy": 750,
  "sell": 50,
  "icon": "assets/weapons/steel_smallsword.png",
  "desc": "Một lưỡi kiếm kim loại tiêu chuẩn.",
  "descEn": "A standard metal blade.",
  "where": [
   "Rương thưởng tầng 20 Hầm Mỏ"
  ],
  "whereEn": [
   "The Mines floor 20 chest reward"
  ]
 },
 {
  "nameEn": "Wooden Blade",
  "name": "Kiếm Gỗ",
  "type": "sword",
  "level": 1,
  "damage": [
   3,
   7
  ],
  "crit": 0.02,
  "mods": {},
  "buy": 250,
  "sell": 50,
  "icon": "assets/weapons/wooden_blade.png",
  "desc": "Không tệ đối với một mẩu gỗ đẽo.",
  "descEn": "Not bad for a piece of carved wood.",
  "where": [
   "Rương thưởng tầng 10 Hầm Mỏ (chỉ khi bật phần thưởng mỏ xáo trộn)",
   "Hội Thám Hiểm"
  ],
  "whereEn": [
   "The Mines floor 10 chest reward (remixed mine rewards only)",
   "Adventurer's Guild"
  ]
 },
 {
  "nameEn": "Pirate's Sword",
  "name": "Kiếm Hải Tặc",
  "type": "sword",
  "level": 2,
  "damage": [
   8,
   14
  ],
  "crit": 0.02,
  "mods": {
   "speed": 2
  },
  "buy": 850,
  "sell": 100,
  "icon": "assets/weapons/pirate_s_sword.png",
  "desc": "Có vẻ từng thuộc về một tên cướp biển.",
  "descEn": "It looks like a pirate owned this once.",
  "where": [
   "Rương thưởng tầng 50 Hầm Mỏ (chỉ khi bật phần thưởng mỏ xáo trộn)",
   "Hội Thám Hiểm (sau khi mở tầng 30 Hầm Mỏ)"
  ],
  "whereEn": [
   "The Mines floor 50 chest reward (remixed mine rewards only)",
   "Adventurer's Guild (after unlocking the Mines floor 30)"
  ]
 },
 {
  "nameEn": "Silver Saber",
  "name": "Kiếm Bạc",
  "type": "sword",
  "level": 2,
  "damage": [
   8,
   15
  ],
  "crit": 0.02,
  "mods": {
   "defense": 1
  },
  "buy": 750,
  "sell": 100,
  "icon": "assets/weapons/silver_saber.png",
  "desc": "Được mạ bạc để chống gỉ.",
  "descEn": "Plated with silver to deter rust.",
  "where": [
   "Rương thưởng tầng 50 Hầm Mỏ (chỉ khi bật phần thưởng mỏ xáo trộn)",
   "Hội Thám Hiểm (sau khi mở tầng 20 Hầm Mỏ)"
  ],
  "whereEn": [
   "The Mines floor 50 chest reward (remixed mine rewards only)",
   "Adventurer's Guild (after unlocking the Mines floor 20)"
  ]
 },
 {
  "nameEn": "Cutlass",
  "name": "Kiếm Lưỡi Cong",
  "type": "sword",
  "level": 3,
  "damage": [
   9,
   17
  ],
  "crit": 0.02,
  "mods": {
   "speed": 2
  },
  "buy": 1500,
  "sell": 150,
  "icon": "assets/weapons/cutlass.png",
  "desc": "Một lưỡi kiếm được rèn tinh xảo.",
  "descEn": "A finely crafted blade.",
  "where": [
   "Rương thưởng tầng 60 Hầm Mỏ (chỉ khi bật phần thưởng mỏ xáo trộn)",
   "Hội Thám Hiểm (sau khi mở tầng 25 Hầm Mỏ)"
  ],
  "whereEn": [
   "The Mines floor 60 chest reward (remixed mine rewards only)",
   "Adventurer's Guild (after unlocking the Mines floor 25)"
  ]
 },
 {
  "nameEn": "Forest Sword",
  "name": "Kiếm Rừng Xanh",
  "type": "sword",
  "level": 3,
  "damage": [
   8,
   18
  ],
  "crit": 0.02,
  "mods": {
   "speed": 2,
   "defense": 1
  },
  "buy": null,
  "sell": 150,
  "icon": "assets/weapons/forest_sword.png",
  "desc": "Được phép thuật của rừng làm cho mạnh mẽ.",
  "descEn": "Made powerful by forest magic.",
  "where": [
   "Hầm Mỏ (tầng 20-60)"
  ],
  "whereEn": [
   "The Mines (Floors 20-60)"
  ]
 },
 {
  "nameEn": "Iron Edge",
  "name": "Kiếm Sắt",
  "type": "sword",
  "level": 3,
  "damage": [
   12,
   25
  ],
  "crit": 0.02,
  "mods": {
   "speed": -2,
   "defense": 1,
   "weight": 3
  },
  "buy": null,
  "sell": 150,
  "icon": "assets/weapons/iron_edge.png",
  "desc": "Một thanh kiếm lưỡi rộng nặng trịch.",
  "descEn": "A heavy broadsword.",
  "where": [
   "Rương thưởng tầng 60 Hầm Mỏ (chỉ khi bật phần thưởng mỏ xáo trộn)",
   "Hầm Mỏ (tầng 41-59)"
  ],
  "whereEn": [
   "The Mines floor 60 chest reward (remixed mine rewards only)",
   "The Mines (Floors 41-59)"
  ]
 },
 {
  "nameEn": "Insect Head",
  "name": "Đầu Côn Trùng",
  "type": "sword",
  "level": 6,
  "damage": [
   20,
   30
  ],
  "crit": 0.04,
  "mods": {
   "speed": 2,
   "critChance": 2
  },
  "buy": 10000,
  "sell": 300,
  "icon": "assets/weapons/insect_head.png",
  "desc": "Cầm không dễ chịu lắm.",
  "descEn": "Not very pleasant to wield.",
  "where": [
   "Phần thưởng của Hội Thám Hiểm khi hạ 80 con Bọ"
  ],
  "whereEn": [
   "Adventurer's Guild reward for killing 80 Bugs"
  ]
 },
 {
  "nameEn": "Bone Sword",
  "name": "Kiếm Xương",
  "type": "sword",
  "level": 5,
  "damage": [
   20,
   30
  ],
  "crit": 0.02,
  "mods": {
   "speed": 4,
   "weight": 2
  },
  "buy": 6000,
  "sell": 250,
  "icon": "assets/weapons/bone_sword.png",
  "desc": "Một mảnh xương mài sắc, rất nhẹ.",
  "descEn": "A very light piece of sharpened bone.",
  "where": [
   "Rương thưởng tầng 90 Hầm Mỏ (chỉ khi bật phần thưởng mỏ xáo trộn)",
   "Hội Thám Hiểm (sau khi mở tầng 75 Hầm Mỏ)",
   "Bộ Xương rơi ra"
  ],
  "whereEn": [
   "The Mines floor 90 chest reward (remixed mine rewards only)",
   "Adventurer's Guild (after unlocking the Mines floor 75)",
   "Skeleton drops"
  ]
 },
 {
  "nameEn": "Claymore",
  "name": "Đại Kiếm",
  "type": "sword",
  "level": 5,
  "damage": [
   20,
   32
  ],
  "crit": 0.02,
  "mods": {
   "speed": -4,
   "defense": 2,
   "weight": 3
  },
  "buy": 2000,
  "sell": 250,
  "icon": "assets/weapons/claymore.png",
  "desc": "Nó thật sự rất nặng.",
  "descEn": "It's really heavy.",
  "where": [
   "Rương thưởng tầng 80 Hầm Mỏ (chỉ khi bật phần thưởng mỏ xáo trộn)",
   "Hội Thám Hiểm (sau khi mở tầng 45 Hầm Mỏ)"
  ],
  "whereEn": [
   "The Mines floor 80 chest reward (remixed mine rewards only)",
   "Adventurer's Guild (after unlocking the Mines floor 45)"
  ]
 },
 {
  "nameEn": "Neptune's Glaive",
  "name": "Thương Hải Thần",
  "type": "sword",
  "level": 5,
  "damage": [
   18,
   35
  ],
  "crit": 0.02,
  "mods": {
   "speed": -1,
   "defense": 2,
   "weight": 4
  },
  "buy": null,
  "sell": 250,
  "icon": "assets/weapons/neptune_s_glaive.png",
  "desc": "Báu vật gia truyền từ bên kia Biển Đá Quý.",
  "descEn": "An heirloom from beyond the Gem Sea.",
  "where": [
   "Rương kho báu khi câu cá (từ cấp Câu Cá 2)"
  ],
  "whereEn": [
   "Fishing Treasure Chests (Fishing Level 2+)"
  ]
 },
 {
  "nameEn": "Templar's Blade",
  "name": "Kiếm Hiệp Sĩ Đền",
  "type": "sword",
  "level": 5,
  "damage": [
   22,
   29
  ],
  "crit": 0.0,
  "mods": {
   "defense": 1
  },
  "buy": 4000,
  "sell": 250,
  "icon": "assets/weapons/templar_s_blade.png",
  "desc": "Nó từng thuộc về một hiệp sĩ đáng kính.",
  "descEn": "It once belonged to an honorable knight.",
  "where": [
   "Rương thưởng tầng 80 Hầm Mỏ (chỉ khi bật phần thưởng mỏ xáo trộn)",
   "Hội Thám Hiểm (sau khi mở tầng 55 Hầm Mỏ)"
  ],
  "whereEn": [
   "The Mines floor 80 chest reward (remixed mine rewards only)",
   "Adventurer's Guild (after unlocking the Mines floor 55)"
  ]
 },
 {
  "nameEn": "Obsidian Edge",
  "name": "Kiếm Hắc Diện",
  "type": "sword",
  "level": 6,
  "damage": [
   30,
   45
  ],
  "crit": 0.02,
  "mods": {
   "speed": -1,
   "critPower": 10
  },
  "buy": 9000,
  "sell": 300,
  "icon": "assets/weapons/obsidian_edge.png",
  "desc": "Sắc bén không tưởng.",
  "descEn": "It's incredibly sharp.",
  "where": [
   "Rương thưởng tầng 90 Hầm Mỏ"
  ],
  "whereEn": [
   "The Mines floor 90 chest reward"
  ]
 },
 {
  "nameEn": "Ossified Blade",
  "name": "Kiếm Hóa Xương",
  "type": "sword",
  "level": 6,
  "damage": [
   26,
   42
  ],
  "crit": 0.02,
  "mods": {
   "speed": -2,
   "defense": 1,
   "weight": 2
  },
  "buy": null,
  "sell": 300,
  "icon": "assets/weapons/ossified_blade.png",
  "desc": "Một lưỡi kiếm lớn, sắc, hình thành từ xương.",
  "descEn": "A large, sharp blade formed from bone.",
  "where": [
   "Rương thưởng tầng 90 Hầm Mỏ (chỉ khi bật phần thưởng mỏ xáo trộn)",
   "Hộp Bí Ẩn"
  ],
  "whereEn": [
   "The Mines floor 90 chest reward (remixed mine rewards only)",
   "Mystery Box"
  ]
 },
 {
  "nameEn": "Holy Blade",
  "name": "Thánh Kiếm",
  "type": "sword",
  "level": 7,
  "damage": [
   20,
   27
  ],
  "crit": 0.02,
  "mods": {
   "speed": 4,
   "defense": 2
  },
  "buy": null,
  "sell": 350,
  "icon": "assets/weapons/holy_blade.png",
  "desc": "Cầm nó thấy tràn đầy hy vọng.",
  "descEn": "It feels hopeful to wield.",
  "where": [
   "Hầm Mỏ, sau tầng 80"
  ],
  "whereEn": [
   "The Mines after level 80"
  ]
 },
 {
  "nameEn": "Tempered Broadsword",
  "name": "Kiếm Rộng Tôi Luyện",
  "type": "sword",
  "level": 7,
  "damage": [
   29,
   44
  ],
  "crit": 0.02,
  "mods": {
   "speed": -3,
   "defense": 3,
   "weight": 3
  },
  "buy": null,
  "sell": 350,
  "icon": "assets/weapons/tempered_broadsword.png",
  "desc": "Trông như có thể chịu được mọi thứ.",
  "descEn": "It looks like it could withstand anything.",
  "where": [
   "Rương thưởng tầng 90 Hầm Mỏ (chỉ khi bật phần thưởng mỏ xáo trộn)",
   "Hang Đầu Lâu"
  ],
  "whereEn": [
   "The Mines floor 90 chest reward (remixed mine rewards only)",
   "Skull Cavern"
  ]
 },
 {
  "nameEn": "Yeti Tooth",
  "name": "Răng Người Tuyết",
  "type": "sword",
  "level": 7,
  "damage": [
   26,
   42
  ],
  "crit": 0.02,
  "mods": {
   "defense": 4,
   "critPower": 10
  },
  "buy": null,
  "sell": 350,
  "icon": "assets/weapons/yeti_tooth.png",
  "desc": "Chạm vào lạnh buốt.",
  "descEn": "It's icy cold to the touch.",
  "where": [
   "Hầm Mỏ (tầng 81-99)"
  ],
  "whereEn": [
   "The Mines (Floors 81-99)"
  ]
 },
 {
  "nameEn": "Steel Falchion",
  "name": "Mã Tấu Thép",
  "type": "sword",
  "level": 8,
  "damage": [
   28,
   46
  ],
  "crit": 0.02,
  "mods": {
   "speed": 4,
   "critPower": 20
  },
  "buy": 9000,
  "sell": 400,
  "icon": "assets/weapons/steel_falchion.png",
  "desc": "Nhẹ mà mạnh.",
  "descEn": "Light and powerful.",
  "where": [
   "Rương thưởng tầng 110 Hầm Mỏ (chỉ khi bật phần thưởng mỏ xáo trộn)",
   "Hầm Mỏ (từ tầng 101)",
   "Hang Đầu Lâu",
   "Hội Thám Hiểm (sau khi mở tầng 90 Hầm Mỏ)"
  ],
  "whereEn": [
   "The Mines floor 110 chest reward (remixed mine rewards only)",
   "The Mines (Floors 101+)",
   "Skull Cavern",
   "Adventurer's Guild (after unlocking the Mines floor 90)"
  ]
 },
 {
  "nameEn": "Dark Sword",
  "name": "Hắc Kiếm",
  "type": "sword",
  "level": 9,
  "damage": [
   30,
   45
  ],
  "crit": 0.04,
  "mods": {
   "speed": -5,
   "critChance": 2,
   "weight": 5
  },
  "buy": null,
  "sell": 450,
  "icon": "assets/weapons/dark_sword.png",
  "desc": "Nó tỏa ra năng lượng ma cà rồng.",
  "descEn": "It's glowing with vampire energy.",
  "where": [
   "Đầu Lâu Ma Ám rơi ra"
  ],
  "whereEn": [
   "Haunted Skull drop"
  ]
 },
 {
  "nameEn": "Lava Katana",
  "name": "Kiếm Katana Dung Nham",
  "type": "sword",
  "level": 10,
  "damage": [
   55,
   64
  ],
  "crit": 0.015,
  "mods": {
   "defense": 3,
   "critPower": 25,
   "weight": 3
  },
  "buy": 25000,
  "sell": 500,
  "icon": "assets/weapons/lava_katana.png",
  "desc": "Một lưỡi kiếm uy lực được rèn trong hồ dung nham sôi sục.",
  "descEn": "A powerful blade forged in a pool of churning lava.",
  "where": [
   "Hội Thám Hiểm (sau khi mở tầng 120 Hầm Mỏ)"
  ],
  "whereEn": [
   "Adventurer's Guild (after unlocking the Mines floor 120)"
  ]
 },
 {
  "nameEn": "Dragontooth Cutlass",
  "name": "Kiếm Cong Răng Rồng",
  "type": "sword",
  "level": 13,
  "damage": [
   75,
   90
  ],
  "crit": 0.02,
  "mods": {
   "critPower": 50
  },
  "buy": null,
  "sell": 650,
  "icon": "assets/weapons/dragontooth_cutlass.png",
  "desc": "Lưỡi kiếm được rèn từ một chiếc răng ma thuật.",
  "descEn": "The blade was forged from a magical tooth.",
  "where": [
   "Rương trong Hầm Núi Lửa"
  ],
  "whereEn": [
   "Volcano Dungeon Chest"
  ]
 },
 {
  "nameEn": "Dwarf Sword",
  "name": "Kiếm Người Lùn",
  "type": "sword",
  "level": 13,
  "damage": [
   65,
   75
  ],
  "crit": 0.02,
  "mods": {
   "speed": 2,
   "defense": 4
  },
  "buy": null,
  "sell": 650,
  "icon": "assets/weapons/dwarf_sword.png",
  "desc": "Đã rất cổ xưa nhưng lưỡi chưa bao giờ cùn.",
  "descEn": "It's ancient, but the blade never dulls.",
  "where": [
   "Rương trong Hầm Núi Lửa"
  ],
  "whereEn": [
   "Volcano Dungeon Chest"
  ]
 },
 {
  "nameEn": "Galaxy Sword",
  "name": "Kiếm Ngân Hà",
  "type": "sword",
  "level": 13,
  "damage": [
   60,
   80
  ],
  "crit": 0.02,
  "mods": {
   "speed": 4
  },
  "buy": 50000,
  "sell": 650,
  "icon": "assets/weapons/galaxy_sword.png",
  "desc": "Không giống bất cứ thứ gì bạn từng thấy.",
  "descEn": "It's unlike anything you've ever seen.",
  "where": [
   "Sa Mạc (mang Mảnh Ngũ Sắc tới Ba Cột Đá)"
  ],
  "whereEn": [
   "The Desert (bring a Prismatic Shard to the Three Pillars)"
  ]
 },
 {
  "nameEn": "Infinity Blade",
  "name": "Kiếm Vô Cực",
  "type": "sword",
  "level": 17,
  "damage": [
   80,
   100
  ],
  "crit": 0.02,
  "mods": {
   "speed": 4,
   "defense": 2
  },
  "buy": null,
  "sell": 850,
  "icon": "assets/weapons/infinity_blade.png",
  "desc": "Hình dạng thật sự của Kiếm Ngân Hà.",
  "descEn": "The true form of the Galaxy Sword.",
  "where": [
   "Kết hợp Kiếm Ngân Hà với 3 Linh Hồn Ngân Hà và 60 Mảnh Nham Thạch ở Lò Rèn"
  ],
  "whereEn": [
   "Combine the Galaxy Sword with 3 Galaxy Soul and 60 Cinder Shard in the Forge"
  ]
 },
 {
  "nameEn": "Haley's Iron",
  "name": "Máy Uốn Tóc Của Haley",
  "type": "sword",
  "level": 6,
  "damage": [
   30,
   45
  ],
  "crit": 0.02,
  "mods": {
   "speed": -1,
   "critPower": 10
  },
  "buy": null,
  "sell": 300,
  "icon": "assets/weapons/haley_s_iron.png",
  "desc": "Nóng bỏng tay và có mùi tóc của Haley.",
  "descEn": "It's searing hot and smells like Haley's hair.",
  "where": [
   "Haley bán với giá 70 Trứng Calico ở Lễ Hội Sa Mạc"
  ],
  "whereEn": [
   "Sold by Haley for 70 Calico Eggs during the Desert Festival"
  ]
 },
 {
  "nameEn": "Leah's Whittler",
  "name": "Dao Khắc Của Leah",
  "type": "sword",
  "level": 6,
  "damage": [
   30,
   45
  ],
  "crit": 0.02,
  "mods": {
   "speed": -1,
   "critPower": 10
  },
  "buy": null,
  "sell": 300,
  "icon": "assets/weapons/leah_s_whittler.png",
  "desc": "Dụng cụ Leah thích nhất để tạc gỗ lũa.",
  "descEn": "Leah's favorite tool for shaping driftwood.",
  "where": [
   "Leah bán với giá 70 Trứng Calico ở Lễ Hội Sa Mạc"
  ],
  "whereEn": [
   "Sold by Leah for 70 Calico Eggs during the Desert Festival"
  ]
 },
 {
  "nameEn": "Meowmere",
  "name": "Meowmere",
  "type": "sword",
  "level": 4,
  "damage": [
   20,
   20
  ],
  "crit": 0.02,
  "mods": {
   "speed": 4,
   "weight": 2
  },
  "buy": null,
  "sell": 200,
  "icon": "assets/weapons/meowmere.png",
  "desc": "Một vũ khí kỳ lạ đến từ vùng đất xa xôi...",
  "descEn": "An unusual weapon from a far away land...",
  "where": [
   "Tầng hầm Tháp Pháp Sư"
  ],
  "whereEn": [
   "Basement in Wizard's Tower"
  ]
 },
 {
  "nameEn": "Carving Knife",
  "name": "Dao Khắc",
  "type": "dagger",
  "level": 1,
  "damage": [
   1,
   3
  ],
  "crit": 0.04,
  "mods": {
   "critChance": 2
  },
  "buy": null,
  "sell": 50,
  "icon": "assets/weapons/carving_knife.png",
  "desc": "Một lưỡi dao nhỏ và nhẹ.",
  "descEn": "A small, light blade.",
  "where": [
   "Hầm Mỏ (tầng 1-19)"
  ],
  "whereEn": [
   "The Mines (Floors 1-19)"
  ]
 },
 {
  "nameEn": "Iron Dirk",
  "name": "Dao Găm Sắt",
  "type": "dagger",
  "level": 1,
  "damage": [
   2,
   4
  ],
  "crit": 0.03,
  "mods": {
   "critChance": 2
  },
  "buy": 500,
  "sell": 50,
  "icon": "assets/weapons/iron_dirk.png",
  "desc": "Một con dao găm thông thường.",
  "descEn": "A common dagger.",
  "where": [
   "Rương thưởng tầng 10 Hầm Mỏ (chỉ khi bật phần thưởng mỏ xáo trộn)",
   "Hội Thám Hiểm (sau khi mở tầng 15 Hầm Mỏ)"
  ],
  "whereEn": [
   "The Mines floor 10 chest reward (remixed mine rewards only)",
   "Adventurer's Guild (after unlocking the Mines floor 15)"
  ]
 },
 {
  "nameEn": "Wind Spire",
  "name": "Ngọn Gió",
  "type": "dagger",
  "level": 1,
  "damage": [
   1,
   5
  ],
  "crit": 0.02,
  "mods": {
   "critChance": 1,
   "critPower": 10,
   "weight": 5
  },
  "buy": null,
  "sell": 50,
  "icon": "assets/weapons/wind_spire.png",
  "desc": "Một lưỡi dao nhỏ nhanh nhẹn.",
  "descEn": "A swift little blade.",
  "where": [
   "Rương thưởng tầng 10 Hầm Mỏ (chỉ khi bật phần thưởng mỏ xáo trộn)",
   "Hầm Mỏ (tầng 21-39)"
  ],
  "whereEn": [
   "The Mines floor 10 chest reward (remixed mine rewards only)",
   "The Mines (Floors 21-39)"
  ]
 },
 {
  "nameEn": "Elf Blade",
  "name": "Dao Tiên",
  "type": "dagger",
  "level": 2,
  "damage": [
   3,
   5
  ],
  "crit": 0.04,
  "mods": {
   "critChance": 2
  },
  "buy": 750,
  "sell": 100,
  "icon": "assets/weapons/elf_blade.png",
  "desc": "Chỉ đôi tay khéo léo của tộc tiên mới rèn được nó.",
  "descEn": "Only the nimble hands of an elf could craft this.",
  "where": [
   "Rương thưởng tầng 20 Hầm Mỏ (chỉ khi bật phần thưởng mỏ xáo trộn)",
   "Hội Thám Hiểm (sau khi mở tầng 20 Hầm Mỏ)"
  ],
  "whereEn": [
   "The Mines floor 20 chest reward (remixed mine rewards only)",
   "Adventurer's Guild (after unlocking the Mines floor 20)"
  ]
 },
 {
  "nameEn": "Burglar's Shank",
  "name": "Dao Của Kẻ Trộm",
  "type": "dagger",
  "level": 4,
  "damage": [
   7,
   12
  ],
  "crit": 0.04,
  "mods": {
   "critChance": 2,
   "critPower": 25
  },
  "buy": null,
  "sell": 200,
  "icon": "assets/weapons/burglar_s_shank.png",
  "desc": "Vũ khí ưa thích của kẻ nhanh nhẹn và lặng lẽ.",
  "descEn": "A weapon of choice for the swift and silent.",
  "where": [
   "Rương thưởng tầng 60 Hầm Mỏ (chỉ khi bật phần thưởng mỏ xáo trộn)",
   "Hầm Mỏ (từ tầng 81)",
   "Hang Đầu Lâu"
  ],
  "whereEn": [
   "The Mines floor 60 chest reward (remixed mine rewards only)",
   "The Mines (Floors 81+)",
   "Skull Cavern"
  ]
 },
 {
  "nameEn": "Crystal Dagger",
  "name": "Dao Găm Pha Lê",
  "type": "dagger",
  "level": 4,
  "damage": [
   4,
   10
  ],
  "crit": 0.03,
  "mods": {
   "critChance": 2,
   "critPower": 50,
   "weight": 5
  },
  "buy": 4500,
  "sell": 200,
  "icon": "assets/weapons/crystal_dagger.png",
  "desc": "Lưỡi dao làm từ thạch anh tinh khiết.",
  "descEn": "The blade is made of purified quartz.",
  "where": [
   "Rương thưởng tầng 60 Hầm Mỏ"
  ],
  "whereEn": [
   "The Mines floor 60 chest reward"
  ]
 },
 {
  "nameEn": "Shadow Dagger",
  "name": "Dao Găm Bóng Tối",
  "type": "dagger",
  "level": 4,
  "damage": [
   10,
   20
  ],
  "crit": 0.04,
  "mods": {
   "critChance": 2
  },
  "buy": null,
  "sell": 200,
  "icon": "assets/weapons/shadow_dagger.png",
  "desc": "Áp lưỡi dao vào tai, bạn nghe thấy 1.000 linh hồn gào thét.",
  "descEn": "When you hold the blade to your ear you can hear 1,000 souls shrieking.",
  "where": [
   "Rương thưởng tầng 80 Hầm Mỏ (chỉ khi bật phần thưởng mỏ xáo trộn)",
   "Hầm Mỏ (tầng 61-79, 101-119)"
  ],
  "whereEn": [
   "The Mines floor 80 chest reward (remixed mine rewards only)",
   "The Mines (Floors 61-79, 101-119)"
  ]
 },
 {
  "nameEn": "Broken Trident",
  "name": "Đinh Ba Gãy",
  "type": "dagger",
  "level": 5,
  "damage": [
   15,
   26
  ],
  "crit": 0.02,
  "mods": {
   "critChance": 1
  },
  "buy": null,
  "sell": 250,
  "icon": "assets/weapons/broken_trident.png",
  "desc": "Nó đến từ biển cả, nhưng vẫn còn sắc.",
  "descEn": "It came from the sea, but it's still sharp.",
  "where": [
   "Rương kho báu khi câu cá"
  ],
  "whereEn": [
   "Fishing treasure chests"
  ]
 },
 {
  "nameEn": "Wicked Kris",
  "name": "Dao Kris Tà Ác",
  "type": "dagger",
  "level": 8,
  "damage": [
   24,
   30
  ],
  "crit": 0.06,
  "mods": {
   "critChance": 4
  },
  "buy": null,
  "sell": 400,
  "icon": "assets/weapons/wicked_kris.png",
  "desc": "Lưỡi dao làm từ hợp kim iridium.",
  "descEn": "The blade is made of an iridium alloy.",
  "where": [
   "Rương thưởng tầng 90 Hầm Mỏ (chỉ khi bật phần thưởng mỏ xáo trộn)",
   "Hang Đầu Lâu"
  ],
  "whereEn": [
   "The Mines floor 90 chest reward (remixed mine rewards only)",
   "Skull Cavern"
  ]
 },
 {
  "nameEn": "Galaxy Dagger",
  "name": "Dao Găm Ngân Hà",
  "type": "dagger",
  "level": 8,
  "damage": [
   30,
   40
  ],
  "crit": 0.02,
  "mods": {
   "speed": 1,
   "critChance": 1,
   "weight": 5
  },
  "buy": 35000,
  "sell": 400,
  "icon": "assets/weapons/galaxy_dagger.png",
  "desc": "Không giống bất cứ thứ gì bạn từng thấy.",
  "descEn": "It's unlike anything you've seen.",
  "where": [
   "Hội Thám Hiểm (sau khi có Kiếm Ngân Hà)"
  ],
  "whereEn": [
   "Adventurer's Guild (after obtaining the Galaxy Sword)"
  ]
 },
 {
  "nameEn": "Dwarf Dagger",
  "name": "Dao Găm Người Lùn",
  "type": "dagger",
  "level": 11,
  "damage": [
   32,
   38
  ],
  "crit": 0.03,
  "mods": {
   "speed": 1,
   "defense": 6,
   "critChance": 2,
   "weight": 5
  },
  "buy": null,
  "sell": 550,
  "icon": "assets/weapons/dwarf_dagger.png",
  "desc": "Đã rất cổ xưa nhưng lưỡi chưa bao giờ cùn.",
  "descEn": "It's ancient, but the blade never dulls.",
  "where": [
   "Rương trong Hầm Núi Lửa"
  ],
  "whereEn": [
   "Volcano Dungeon Chest"
  ]
 },
 {
  "nameEn": "Dragontooth Shiv",
  "name": "Dao Răng Rồng",
  "type": "dagger",
  "level": 12,
  "damage": [
   40,
   50
  ],
  "crit": 0.05,
  "mods": {
   "critChance": 3,
   "critPower": 100,
   "weight": 5
  },
  "buy": null,
  "sell": 600,
  "icon": "assets/weapons/dragontooth_shiv.png",
  "desc": "Lưỡi dao được rèn từ một chiếc răng ma thuật.",
  "descEn": "The blade was forged from a magical tooth.",
  "where": [
   "Rương trong Hầm Núi Lửa"
  ],
  "whereEn": [
   "Volcano Dungeon Chest"
  ]
 },
 {
  "nameEn": "Iridium Needle",
  "name": "Kim Iridium",
  "type": "dagger",
  "level": 12,
  "damage": [
   20,
   35
  ],
  "crit": 0.1,
  "mods": {
   "critChance": 6,
   "critPower": 200
  },
  "buy": null,
  "sell": 600,
  "icon": "assets/weapons/iridium_needle.png",
  "desc": "Mũi kim sắc không tưởng, đến tận cấp độ nguyên tử.",
  "descEn": "The point is unbelievably sharp, even down to the atomic level.",
  "where": [
   "14% cơ hội rơi từ slime đặc biệt trong Hầm Mỏ khi Đền Thử Thách đang bật"
  ],
  "whereEn": [
   "14% chance of dropping from special slimes in mines when Shrine of Challenge is active"
  ]
 },
 {
  "nameEn": "Infinity Dagger",
  "name": "Dao Găm Vô Cực",
  "type": "dagger",
  "level": 16,
  "damage": [
   50,
   70
  ],
  "crit": 0.06,
  "mods": {
   "speed": 1,
   "defense": 3,
   "critChance": 4,
   "weight": 5
  },
  "buy": null,
  "sell": 800,
  "icon": "assets/weapons/infinity_dagger.png",
  "desc": "Hình dạng thật sự của Dao Găm Ngân Hà.",
  "descEn": "The true form of the Galaxy Dagger.",
  "where": [
   "Kết hợp Dao Găm Ngân Hà với 3 Linh Hồn Ngân Hà và 60 Mảnh Nham Thạch ở Lò Rèn"
  ],
  "whereEn": [
   "Combine the Galaxy Dagger with 3 Galaxy Soul and 60 Cinder Shard in the Forge"
  ]
 },
 {
  "nameEn": "Elliott's Pencil",
  "name": "Bút Chì Của Elliott",
  "type": "dagger",
  "level": 8,
  "damage": [
   24,
   30
  ],
  "crit": 0.06,
  "mods": {
   "critChance": 4
  },
  "buy": null,
  "sell": 200,
  "icon": "assets/weapons/elliott_s_pencil.png",
  "desc": "Elliott dùng nó để viết sách. Sắc lắm đấy!",
  "descEn": "Elliott used this to write his book. It's sharp!",
  "where": [
   "Elliott bán với giá 70 Trứng Calico ở Lễ Hội Sa Mạc"
  ],
  "whereEn": [
   "Sold by Elliott for 70 Calico Eggs during the Desert Festival"
  ]
 },
 {
  "nameEn": "Abby's Planchette",
  "name": "Bảng Cầu Cơ Của Abby",
  "type": "dagger",
  "level": 8,
  "damage": [
   24,
   30
  ],
  "crit": 0.06,
  "mods": {
   "critChance": 4
  },
  "buy": null,
  "sell": 200,
  "icon": "assets/weapons/abby_s_planchette.png",
  "desc": "Làm từ gỗ vân đá thượng hạng.",
  "descEn": "It's made from fine marblewood.",
  "where": [
   "Abigail bán với giá 70 Trứng Calico ở Lễ Hội Sa Mạc"
  ],
  "whereEn": [
   "Sold by Abigail for 70 Calico Eggs during the Desert Festival"
  ]
 },
 {
  "nameEn": "Femur",
  "name": "Xương Đùi",
  "type": "club",
  "level": 2,
  "damage": [
   6,
   11
  ],
  "crit": 0.02,
  "mods": {
   "speed": 2
  },
  "buy": 350,
  "sell": 100,
  "icon": "assets/weapons/femur.png",
  "desc": "Một khúc xương cũ, nặng, bám đầy bụi bẩn hàng thế kỷ.",
  "descEn": "An old, heavy bone caked in centuries of grime.",
  "where": [
   "Rương thưởng tầng 10 Hầm Mỏ (chỉ khi bật phần thưởng mỏ xáo trộn)",
   "Hội Thám Hiểm (sau khi mở tầng 10 Hầm Mỏ)"
  ],
  "whereEn": [
   "The Mines floor 10 chest reward (remixed mine rewards only)",
   "Adventurer's Guild (after unlocking the Mines floor 10)"
  ]
 },
 {
  "nameEn": "Wood Club",
  "name": "Gậy Gỗ",
  "type": "club",
  "level": 2,
  "damage": [
   9,
   16
  ],
  "crit": 0.02,
  "mods": {},
  "buy": null,
  "sell": 100,
  "icon": "assets/weapons/wood_club.png",
  "desc": "Một khúc gỗ chắc, đẽo thô thành hình cây gậy.",
  "descEn": "A solid piece of wood, crudely chiseled into a club shape.",
  "where": [
   "Rương thưởng tầng 20 Hầm Mỏ (chỉ khi bật phần thưởng mỏ xáo trộn)",
   "Hầm Mỏ (tầng 1-39)"
  ],
  "whereEn": [
   "The Mines floor 20 chest reward (remixed mine rewards only)",
   "The Mines (Floors 1-39)"
  ]
 },
 {
  "nameEn": "Wood Mallet",
  "name": "Vồ Gỗ",
  "type": "club",
  "level": 3,
  "damage": [
   15,
   24
  ],
  "crit": 0.02,
  "mods": {
   "speed": 2,
   "weight": 2
  },
  "buy": 2000,
  "sell": 150,
  "icon": "assets/weapons/wood_mallet.png",
  "desc": "Đầu vồ đặc nện rất mạnh. Khá nhẹ so với một cây gậy.",
  "descEn": "The solid head packs a punch. Relatively light for a club.",
  "where": [
   "Rương thưởng tầng 60 Hầm Mỏ (chỉ khi bật phần thưởng mỏ xáo trộn)",
   "Hầm Mỏ (tầng 41-79)",
   "Hội Thám Hiểm (sau khi mở tầng 40 Hầm Mỏ)"
  ],
  "whereEn": [
   "The Mines floor 60 chest reward (remixed mine rewards only)",
   "The Mines (Floors 41-79)",
   "Adventurer's Guild (after unlocking the Mines floor 40)"
  ]
 },
 {
  "nameEn": "Lead Rod",
  "name": "Gậy Chì",
  "type": "club",
  "level": 4,
  "damage": [
   18,
   27
  ],
  "crit": 0.02,
  "mods": {
   "speed": -4
  },
  "buy": null,
  "sell": 200,
  "icon": "assets/weapons/lead_rod.png",
  "desc": "Nó nặng không tưởng.",
  "descEn": "It's incredibly heavy.",
  "where": [
   "Hầm Mỏ (tầng 41-79)"
  ],
  "whereEn": [
   "The Mines (Floors 41-79)"
  ]
 },
 {
  "nameEn": "Kudgel",
  "name": "Dùi Cui",
  "type": "club",
  "level": 5,
  "damage": [
   27,
   40
  ],
  "crit": 0.02,
  "mods": {
   "speed": -1,
   "critPower": 50,
   "weight": 2
  },
  "buy": null,
  "sell": 250,
  "icon": "assets/weapons/kudgel.png",
  "desc": "Bạn đồng hành của kẻ vũ phu.",
  "descEn": "A brute's companion.",
  "where": [
   "Rương thưởng tầng 80 Hầm Mỏ (chỉ khi bật phần thưởng mỏ xáo trộn)",
   "Hầm Mỏ (từ tầng 101)"
  ],
  "whereEn": [
   "The Mines floor 80 chest reward (remixed mine rewards only)",
   "The Mines (Floors 101+)"
  ]
 },
 {
  "nameEn": "The Slammer",
  "name": "Búa Nện",
  "type": "club",
  "level": 7,
  "damage": [
   40,
   55
  ],
  "crit": 0.02,
  "mods": {
   "speed": -2
  },
  "buy": null,
  "sell": 350,
  "icon": "assets/weapons/the_slammer.png",
  "desc": "Một cây búa cực nặng có thể hất văng kẻ thù.",
  "descEn": "An extremely heavy gavel that'll send foes flying.",
  "where": [
   "Rương thưởng tầng 110 Hầm Mỏ (chỉ khi bật phần thưởng mỏ xáo trộn)",
   "Hầm Mỏ (tầng 81-99)",
   "Hang Đầu Lâu"
  ],
  "whereEn": [
   "The Mines floor 110 chest reward (remixed mine rewards only)",
   "The Mines (Floors 81-99)",
   "Skull Cavern"
  ]
 },
 {
  "nameEn": "Galaxy Hammer",
  "name": "Búa Ngân Hà",
  "type": "club",
  "level": 12,
  "damage": [
   70,
   90
  ],
  "crit": 0.02,
  "mods": {
   "speed": 2,
   "weight": 5
  },
  "buy": 75000,
  "sell": 600,
  "icon": "assets/weapons/galaxy_hammer.png",
  "desc": "Làm từ một vật liệu siêu nhẹ bạn chưa từng thấy.",
  "descEn": "It's made from an ultra-light material you've never seen before.",
  "where": [
   "Hội Thám Hiểm (sau khi có Kiếm Ngân Hà)"
  ],
  "whereEn": [
   "Adventurer's Guild (after obtaining the Galaxy Sword)"
  ]
 },
 {
  "nameEn": "Dwarf Hammer",
  "name": "Búa Người Lùn",
  "type": "club",
  "level": 13,
  "damage": [
   75,
   85
  ],
  "crit": 0.02,
  "mods": {
   "defense": 2,
   "weight": 5
  },
  "buy": null,
  "sell": 650,
  "icon": "assets/weapons/dwarf_hammer.png",
  "desc": "Nó phát ra tiếng vù vù rất khẽ.",
  "descEn": "It emits a very faint whirring sound.",
  "where": [
   "Rương trong Hầm Núi Lửa"
  ],
  "whereEn": [
   "Volcano Dungeon Chest"
  ]
 },
 {
  "nameEn": "Dragontooth Club",
  "name": "Gậy Răng Rồng",
  "type": "club",
  "level": 14,
  "damage": [
   80,
   100
  ],
  "crit": 0.02,
  "mods": {
   "critPower": 50,
   "weight": 3
  },
  "buy": null,
  "sell": 700,
  "icon": "assets/weapons/dragontooth_club.png",
  "desc": "Cây gậy này được làm từ một chiếc răng ma thuật.",
  "descEn": "This club was crafted from a magical tooth.",
  "where": [
   "Rương trong Hầm Núi Lửa"
  ],
  "whereEn": [
   "Volcano Dungeon Chest"
  ]
 },
 {
  "nameEn": "Infinity Gavel",
  "name": "Búa Vô Cực",
  "type": "club",
  "level": 17,
  "damage": [
   100,
   120
  ],
  "crit": 0.02,
  "mods": {
   "speed": 2,
   "defense": 1,
   "weight": 5
  },
  "buy": null,
  "sell": 850,
  "icon": "assets/weapons/infinity_gavel.png",
  "desc": "Hình dạng thật sự của Búa Ngân Hà.",
  "descEn": "The true form of the Galaxy Hammer.",
  "where": [
   "Kết hợp Búa Ngân Hà với 3 Linh Hồn Ngân Hà và 60 Mảnh Nham Thạch ở Lò Rèn"
  ],
  "whereEn": [
   "Combine the Galaxy Hammer with 3 Galaxy Soul and 60 Cinder Shard in the Forge"
  ]
 },
 {
  "nameEn": "Alex's Bat",
  "name": "Gậy Bóng Chày Của Alex",
  "type": "club",
  "level": 7,
  "damage": [
   40,
   55
  ],
  "crit": 0.02,
  "mods": {
   "speed": -2
  },
  "buy": null,
  "sell": 350,
  "icon": "assets/weapons/alex_s_bat.png",
  "desc": "Điểm đánh đẹp nhất bị móp sau cú Grand Slam nổi tiếng của Alex.",
  "descEn": "The sweet spot is dented from Alex's famous Grand Slam.",
  "where": [
   "Alex bán với giá 70 Trứng Calico ở Lễ Hội Sa Mạc"
  ],
  "whereEn": [
   "Sold by Alex for 70 Calico Eggs during the Desert Festival"
  ]
 },
 {
  "nameEn": "Harvey's Mallet",
  "name": "Búa Của Harvey",
  "type": "club",
  "level": 7,
  "damage": [
   40,
   55
  ],
  "crit": 0.02,
  "mods": {
   "speed": -2
  },
  "buy": null,
  "sell": 350,
  "icon": "assets/weapons/harvey_s_mallet.png",
  "desc": "Nó gợi lại kỷ niệm về phòng khám của Harvey.",
  "descEn": "It brings back memories of Harvey's clinic.",
  "where": [
   "Harvey bán với giá 70 Trứng Calico ở Lễ Hội Sa Mạc"
  ],
  "whereEn": [
   "Sold by Harvey for 70 Calico Eggs during the Desert Festival"
  ]
 },
 {
  "nameEn": "Maru's Wrench",
  "name": "Cờ Lê Của Maru",
  "type": "club",
  "level": 7,
  "damage": [
   40,
   55
  ],
  "crit": 0.02,
  "mods": {
   "speed": -2
  },
  "buy": null,
  "sell": 350,
  "icon": "assets/weapons/maru_s_wrench.png",
  "desc": "Một cây cờ lê kim loại to. Có mùi của Maru.",
  "descEn": "A big, metal wrench. It smells like Maru.",
  "where": [
   "Maru bán với giá 70 Trứng Calico ở Lễ Hội Sa Mạc"
  ],
  "whereEn": [
   "Sold by Maru for 70 Calico Eggs during the Desert Festival"
  ]
 },
 {
  "nameEn": "Penny's Fryer",
  "name": "Chảo Của Penny",
  "type": "club",
  "level": 7,
  "damage": [
   40,
   55
  ],
  "crit": 0.02,
  "mods": {
   "speed": -2
  },
  "buy": null,
  "sell": 350,
  "icon": "assets/weapons/penny_s_fryer.png",
  "desc": "Chiếc chảo yêu thích của Penny. Bên trong còn dính chút cặn dai dai.",
  "descEn": "Penny's favorite frying pan. There's some rubbery gunk stuck to the inside.",
  "where": [
   "Penny bán với giá 70 Trứng Calico ở Lễ Hội Sa Mạc"
  ],
  "whereEn": [
   "Sold by Penny for 70 Calico Eggs during the Desert Festival"
  ]
 },
 {
  "nameEn": "Sam's Old Guitar",
  "name": "Đàn Ghi-ta Cũ Của Sam",
  "type": "club",
  "level": 7,
  "damage": [
   40,
   55
  ],
  "crit": 0.02,
  "mods": {
   "speed": -2
  },
  "buy": null,
  "sell": 350,
  "icon": "assets/weapons/sam_s_old_guitar.png",
  "desc": "Nó đã qua thời đẹp nhất.",
  "descEn": "It's seen better days.",
  "where": [
   "Sam bán với giá 70 Trứng Calico ở Lễ Hội Sa Mạc"
  ],
  "whereEn": [
   "Sold by Sam for 70 Calico Eggs during the Desert Festival"
  ]
 },
 {
  "nameEn": "Seb's Lost Mace",
  "name": "Chùy Thất Lạc Của Seb",
  "type": "club",
  "level": 7,
  "damage": [
   40,
   55
  ],
  "crit": 0.02,
  "mods": {
   "speed": -2
  },
  "buy": null,
  "sell": 350,
  "icon": "assets/weapons/seb_s_lost_mace.png",
  "desc": "Một trong những bản sao vũ khí trung cổ của Sebastian.",
  "descEn": "One of Sebastian's medieval replicas.",
  "where": [
   "Sebastian bán với giá 70 Trứng Calico ở Lễ Hội Sa Mạc"
  ],
  "whereEn": [
   "Sold by Sebastian for 70 Calico Eggs during the Desert Festival"
  ]
 },
 {
  "nameEn": "Slingshot",
  "name": "Súng Cao Su",
  "type": "slingshot",
  "level": null,
  "damage": null,
  "crit": 0.02,
  "mods": {},
  "buy": 500,
  "sell": null,
  "icon": "assets/weapons/slingshot.png",
  "desc": "Cần đá làm đạn.",
  "descEn": "Requires stones for ammo.",
  "where": [
   "Rương thưởng tầng 40 Hầm Mỏ"
  ],
  "whereEn": [
   "The Mines (Floor 40 chest reward)"
  ]
 },
 {
  "nameEn": "Master Slingshot",
  "name": "Súng Cao Su Bậc Thầy",
  "type": "slingshot",
  "level": null,
  "damage": null,
  "crit": 0.02,
  "mods": {},
  "buy": 1000,
  "sell": null,
  "icon": "assets/weapons/master_slingshot.png",
  "desc": "Cần đá làm đạn.",
  "descEn": "Requires stones for ammo.",
  "where": [
   "Rương thưởng tầng 70 Hầm Mỏ"
  ],
  "whereEn": [
   "The Mines (Floor 70 chest reward)"
  ]
 }
];
