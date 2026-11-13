// ==========================================================================
// STARDEW VALLEY WIKI - HƯỚNG DẪN ĐẢO GỪNG (GINGER ISLAND GUIDE)
// Text for the Ginger Island tab: how to get there, what the walnuts buy,
// what each area holds, island crops and people. Walnut spots and upgrades
// live in island-data.js; facts follow the Official Stardew Valley Wiki
// (Ginger Island, Golden Walnut, Island Trader, Golden Coconut), version 1.6.
// Items are named in English so js/lib/item-lookup.js can show their icon.
// ==========================================================================

// Getting there, step by step
export const ISLAND_STEPS = [
  { icon: 'bundles', title: 'Hoàn thành Nhà Cộng Đồng (hoặc Joja)', titleEn: 'Finish the Community Center (or Joja)',
    text: 'Sau khi hoàn thành mọi gói ở Nhà Cộng Đồng, hoặc mua hết các dự án của Joja, Willy gửi thư mời bạn vào phòng sau của Tiệm Cá.',
    textEn: 'Once every Community Center bundle is done, or every Joja project is bought, Willy writes to invite you into the back room of the Fish Shop.' },
  { icon: 'portrait:willy', title: 'Sửa thuyền của Willy', titleEn: "Repair Willy's boat",
    text: 'Phòng sau Tiệm Cá có chiếc thuyền hỏng. Nộp đủ ba thứ dưới đây (nộp dần từng phần cũng được) là thuyền chạy được.',
    textEn: 'The back room of the Fish Shop holds a broken boat. Hand in the three things below (a little at a time is fine) and it sails.',
    items: [['Hardwood', 200], ['Iridium Bar', 5], ['Battery Pack', 5]] },
  { icon: 'money', title: 'Mua vé 1.000g', titleEn: 'Buy a 1,000g ticket',
    text: 'Mỗi chuyến tốn 1.000g, đã gồm chuyến về. Muốn về thung lũng thì lên thuyền ở bến Nam Đảo Gừng.',
    textEn: 'Each trip costs 1,000g, including the way back. To go home, take the boat at the Island South dock.' },
  { icon: 'portrait:leo', title: 'Gặp Leo và tìm Óc Chó đầu tiên', titleEn: 'Meet Leo and find the first walnuts',
    text: 'Đi về phía đông vào rừng rậm tới nhà cây của Leo. Nhặt vài quả Óc Chó Vàng quanh rừng (bụi cây, cái cây trong nhà Leo), rồi cho con vẹt trong nhà Leo 1 quả để nó mở đường lên Bắc Đảo Gừng.',
    textEn: "Head east into the jungle to Leo's treehouse. Pick up a few Golden Walnuts nearby (bushes, the tree inside Leo's hut), then give the parrot in Leo's hut 1 walnut to open the way to Island North." },
  { icon: 'golden_walnut', title: 'Đổi Óc Chó lấy nâng cấp', titleEn: 'Spend walnuts on upgrades',
    text: 'Các con vẹt khắp đảo nhận Óc Chó để mở đường, sửa nhà, xây cầu... Nên mở chú rùa (10 quả) sớm vì Tây Đảo Gừng có nhiều Óc Chó nhất và Nông Trại Đảo.',
    textEn: 'Parrots around the island take walnuts to open paths, fix the house, build bridges and more. Move the turtle (10) early: Island West has the most walnuts and the island farm.' }
];

// Worth carrying on the first trips
export const ISLAND_PACK = [
  { item: 'Watering Can', note: 'Tưới dung nham thành lối đi trong Núi Lửa', noteEn: 'Cools lava into paths in the Volcano' },
  { item: 'Hoe', note: 'Đào Óc Chó chôn dưới đất và Gừng dại', noteEn: 'Digs up buried walnuts and wild Ginger' },
  { item: 'Banana', note: 'Đặt lên bàn thờ khỉ ở rừng rậm (3 Óc Chó)', noteEn: 'For the gorilla shrine in the jungle (3 walnuts)' },
  { item: 'Amethyst', note: 'Cùng Ngọc xanh biển, Ngọc Lục bảo, Hồng ngọc, Hoàng ngọc cho Đền Chim Đá Quý', noteEn: 'With Aquamarine, Emerald, Ruby and Topaz for the Gem Bird shrine' },
  { item: 'Flute Block', note: '5 khối cho bài hát Nàng Tiên Cá', noteEn: "5 blocks for the mermaid's song" },
  { item: 'Melon', note: 'Trồng Dưa, Lúa mì, Tỏi ở Nông Trại Đảo cho Ếch Sành Ăn', noteEn: 'Grow Melon, Wheat and Garlic on the island farm for the Gourmand' }
];

// What walnuts are for, beside the parrot upgrades
export const WALNUT_USES = [
  { icon: 'qi_gem', text: "Tìm đủ 100 quả là mở Phòng Óc Chó của Ông Qi. Óc Chó không bị trừ: chỉ tính số đã từng tìm được.",
    textEn: "Finding 100 opens Qi's Walnut Room. No walnuts are taken: it counts how many you have ever found." },
  { icon: 'tracker', text: 'Tìm đủ 130 quả là một mục của Hoàn Hảo (Perfection).',
    textEn: 'Finding all 130 is one of the Perfection goals.' },
  { icon: 'money', text: 'Bản 1.6: Vẹt Vàng Joja nhặt hộ toàn bộ số Óc Chó còn thiếu với giá 10.000g mỗi quả.',
    textEn: 'Version 1.6: the Golden Joja Parrot collects every missing walnut for 10,000g each.' }
];

// The island, area by area. `walnuts` points at WALNUT_AREAS ids in island-data.js.
export const ISLAND_AREAS = [
  { id: 'south', walnuts: ['south'], name: 'Nam Đảo Gừng (Bến Tàu)', nameEn: 'Island South (Dock)', icon: 'portrait:willy',
    text: 'Nơi thuyền cập bến. Chú rùa chặn lối sang phía tây cho tới khi vẹt nhận 10 Óc Chó. Xây Khu Nghỉ Dưỡng (20 quả) thì dân làng ghé chơi, Gus mở quầy bar, và mở đường sang Đông Nam Đảo.',
    textEn: 'Where the boat lands. A turtle blocks the way west until a parrot gets 10 walnuts. Building the Resort (20) brings villagers over for the day, Gus runs a bar, and the path to Island Southeast opens.',
    sights: ['Bến thuyền về thung lũng', 'Khu Nghỉ Dưỡng', 'Trạm Vẹt Tốc Hành'], sightsEn: ['Boat back to the valley', 'Island Resort', 'Parrot Express stop'] },
  { id: 'east', walnuts: ['east'], name: 'Đông Đảo Gừng (Rừng Rậm)', nameEn: 'Island East (Jungle)', icon: 'portrait:leo',
    text: 'Rừng rậm có nhà cây của Leo, bàn thờ khỉ (đặt Chuối) và lối khuất tới Đền Chim Đá Quý. Gừng dại mọc ở đây, đào bằng Cuốc.',
    textEn: "The jungle holds Leo's treehouse, the gorilla shrine (place a Banana) and a hidden path to the Gem Bird shrine. Wild Ginger grows here; dig it with a hoe.",
    sights: ['Nhà cây của Leo', 'Bàn thờ khỉ', 'Đền Chim Đá Quý'], sightsEn: ["Leo's treehouse", 'Gorilla shrine', 'Gem Bird shrine'] },
  { id: 'north', walnuts: ['north', 'fieldoffice'], name: 'Bắc Đảo Gừng', nameEn: 'Island North', icon: 'portrait:professor_snail',
    text: 'Mở bằng vẹt trong nhà Leo (1 quả). Có Văn Phòng Khảo Cổ của Giáo Sư Ốc Sên, Khu Khai Quật nhiều hóa thạch (cần sửa cầu, 10 quả), quầy Thương Nhân Trên Đảo (10 quả) và lối vào Núi Lửa.',
    textEn: "Opened by the parrot in Leo's hut (1 walnut). Home to Professor Snail's Field Office, the fossil-rich Dig Site (bridge, 10), the Island Trader (10) and the Volcano entrance.",
    sights: ['Văn Phòng Khảo Cổ', 'Khu Khai Quật', 'Thương Nhân Trên Đảo', 'Lối vào Núi Lửa'], sightsEn: ['Field Office', 'Dig Site', 'Island Trader', 'Volcano entrance'] },
  { id: 'volcano', walnuts: ['volcano'], name: 'Hầm Núi Lửa', nameEn: 'Volcano Dungeon', icon: 'item_cinder_shard', mines: true,
    text: '10 tầng, đổi bố cục mỗi ngày. Tưới Bình tưới lên dung nham để bắc cầu. Tầng 5 có Người Lùn bán hàng và chỗ nghỉ; tầng 10 (miệng núi lửa) có Lò Rèn để ghép nhẫn, phù phép công cụ và vũ khí bằng Mảnh Nham thạch.',
    textEn: '10 floors whose layout changes daily. Water the lava with the Watering Can to make bridges. Floor 5 has the dwarf shop and a safe rest; floor 10 (the caldera) has the Forge for combining rings and enchanting tools and weapons with Cinder Shards.',
    sights: ['Người Lùn Núi Lửa (tầng 5)', 'Lò Rèn (tầng 10)', 'Mảnh Nham thạch'], sightsEn: ['Volcano Dwarf (floor 5)', 'Forge (floor 10)', 'Cinder Shards'] },
  { id: 'west', walnuts: ['west'], name: 'Tây Đảo Gừng (Nông Trại Đảo)', nameEn: 'Island West (Island Farm)', icon: 'crops',
    text: 'Khu lớn nhất, mở khi dời chú rùa. Có Nông Trại Đảo trồng được quanh năm, nhà Birdie, xác tàu đắm, hang Ếch Sành Ăn, hang pha lê và lối vào bí mật Phòng Óc Chó của Ông Qi.',
    textEn: "The biggest area, opened by moving the turtle. It has the island farm that grows all year, Birdie's hut, the shipwreck, the Gourmand's cave, the crystal cave and the hidden way into Qi's Walnut Room.",
    sights: ['Nông Trại Đảo', 'Nhà Birdie', 'Ếch Sành Ăn', 'Phòng Óc Chó của Ông Qi'], sightsEn: ['Island farm', "Birdie's hut", 'The Gourmand', "Qi's Walnut Room"] },
  { id: 'southeast', walnuts: ['southeast'], name: 'Đông Nam Đảo & Hang Hải Tặc', nameEn: 'Island Southeast & Pirate Cove', icon: 'portrait:birdie',
    text: 'Mở sau khi xây Khu Nghỉ Dưỡng. Có vũng sao biển, tảng đá của Nàng Tiên Cá (ngày mưa) và Hang Hải Tặc: tối ngày chẵn cướp biển có mặt để chơi phi tiêu, và câu được Cá Đuối.',
    textEn: 'Opens once the Resort is built. It has the star pool, the mermaid rock (rainy days) and the Pirate Cove: pirates are in on even-numbered evenings for darts, and Stingrays bite there.',
    sights: ['Vũng sao biển', 'Nàng Tiên Cá', 'Hang Hải Tặc'], sightsEn: ['Star pool', 'Mermaid', 'Pirate Cove'] }
];

// Island crops, trees and where to get them
export const ISLAND_CROPS = [
  { item: 'Taro Tuber', grows: 'Taro Root', from: 'Thương Nhân Trên Đảo, Dừa Vàng', fromEn: 'Island Trader, Golden Coconut', note: 'Trồng cạnh nước thì lớn nhanh hơn.', noteEn: 'Grows faster next to water.' },
  { item: 'Pineapple Seeds', grows: 'Pineapple', from: 'Thương Nhân Trên Đảo, Dừa Vàng', fromEn: 'Island Trader, Golden Coconut' },
  { item: 'Banana Sapling', grows: 'Banana', from: 'Thương Nhân Trên Đảo, Dừa Vàng', fromEn: 'Island Trader, Golden Coconut' },
  { item: 'Mango Sapling', grows: 'Mango', from: 'Thương Nhân Trên Đảo, Dừa Vàng', fromEn: 'Island Trader, Golden Coconut' },
  { item: 'Mahogany Seed', grows: 'Hardwood', from: 'Dừa Vàng, chặt cây Gỗ Gụ', fromEn: 'Golden Coconut, chopping mahogany trees', note: 'Cây Gỗ Gụ cho Gỗ Cứng.', noteEn: 'Mahogany trees give Hardwood.' },
  { item: 'Ginger', from: 'Đào ở rừng rậm Đông Đảo', fromEn: 'Dug up in the Island East jungle', note: 'Mọc hoang, không trồng được.', noteEn: 'Grows wild; it cannot be planted.' },
  { item: 'Qi Bean', grows: 'Qi Fruit', from: 'Đơn hàng "Vụ Mùa Thần Bí Của Qi"', fromEn: "The \"Qi's Crop\" special order" }
];

// What a Golden Coconut can hold (Clint opens it at the Blacksmith)
export const COCONUT_ITEMS = ['Banana Sapling', 'Mango Sapling', 'Pineapple Seeds', 'Taro Tuber', 'Mahogany Seed', 'Fossilized Skull', 'Iridium Ore'];

// Island dishes worth knowing
export const ISLAND_DISHES = ['Tropical Curry', 'Poi', 'Mango Sticky Rice', 'Banana Pudding', 'Piña Colada', 'Ginger Ale'];

// People on the island
export const ISLAND_PEOPLE = [
  { npc: 'leo', name: 'Leo', nameEn: 'Leo',
    text: 'Cậu bé sống cùng bầy vẹt trong rừng rậm. Đạt 6 tim và xem sự kiện thì Leo chuyển lên sống ở nhà Linus trên Núi.',
    textEn: "A boy who lives with the parrots in the jungle. At 6 hearts, after his event, he moves to Linus's place on the Mountain." },
  { npc: 'birdie', name: 'Birdie', nameEn: 'Birdie', quest: 'pirates_wife',
    text: 'Bà lão ở Tây Đảo Gừng. Nhiệm vụ "Người Vợ Thủy Thủ" của bà cho 5 Óc Chó Vàng.',
    textEn: "An old woman in Island West. Her quest \"The Pirate's Wife\" gives 5 Golden Walnuts." },
  { npc: 'professor_snail', name: 'Giáo Sư Ốc Sên', nameEn: 'Professor Snail',
    text: 'Ở Văn Phòng Khảo Cổ, Bắc Đảo Gừng. Nộp hóa thạch đảo và trả lời câu hỏi khảo sát để nhận Óc Chó Vàng (13 quả).',
    textEn: 'Runs the Field Office in Island North. Donate island fossils and answer the survey for Golden Walnuts (13 in all).' },
  { npc: 'mr_qi', name: 'Ông Qi', nameEn: 'Mr. Qi',
    text: 'Chủ Phòng Óc Chó (cần đã tìm 100 quả). Bảng đơn hàng thử thách của ông trả Ngọc Qi, dùng để mua đồ hiếm trong phòng như Linh hồn Thiên hà.',
    textEn: "Owner of the Walnut Room (needs 100 walnuts found). His challenge board pays Qi Gems, spent in the room on rare goods such as Galaxy Souls." }
];
