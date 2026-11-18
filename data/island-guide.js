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

// Everything to do on the island, step by step. Done comes from the save:
// `keys` = walnut spots (island-data.js, all found = done), `upgrade` = a parrot
// upgrade flag, `walnutsFound` = walnuts ever found, `orders: 'qi'` = all of
// Qi's special orders. `needs` names the upgrade that opens the way.
export const ISLAND_TASKS = [
  { id: 'first_parrot', icon: 'portrait:leo', upgrade: 'Island_FirstParrot', name: 'Cho bạn vẹt của Leo ăn', nameEn: "Feed Leo's parrot friend",
    steps: ['Từ bến tàu đi về phía đông vào rừng rậm, tới nhà cây của Leo.', 'Nhặt vài Óc Chó Vàng gần đó: bụi cây trong rừng, và chặt cái cây trong nhà Leo bằng Rìu.', 'Nói chuyện với con vẹt trong nhà Leo và đưa nó 1 Óc Chó Vàng.'],
    stepsEn: ["From the dock head east into the jungle to Leo's treehouse.", "Pick up a few Golden Walnuts nearby: jungle bushes, and chop the tree inside Leo's hut with an Axe.", "Talk to the parrot in Leo's hut and give it 1 Golden Walnut."],
    reward: 'Mở đường lên Bắc Đảo Gừng', rewardEn: 'Opens the way to Island North' },
  { id: 'banana', icon: 'item_banana', keys: ['BananaShrine'], name: 'Bàn Thờ Khỉ', nameEn: 'Gorilla shrine',
    steps: ['Mang theo 1 quả Chuối.', 'Tới bàn thờ đá cạnh cầu thang lên nhà cây của Leo.', 'Đặt quả Chuối lên bàn thờ: con khỉ đột hiện ra và tặng Óc Chó.'],
    stepsEn: ['Bring 1 Banana.', "Go to the stone shrine by the stairs to Leo's treehouse.", 'Place the Banana on the shrine: the gorilla appears and hands over the walnuts.'],
    reward: '3 Óc Chó Vàng', rewardEn: '3 Golden Walnuts' },
  { id: 'gem_birds', icon: 'item_emerald', keys: ['IslandShrinePuzzle'], name: 'Đền Chim Đá Quý', nameEn: 'Gem Bird shrine',
    steps: ['Trong rừng Đông Đảo Gừng, tìm lối khuất dẫn tới ngôi đền có 4 bệ đá (bắc, nam, đông, tây).', 'Chạm vào đền: bốn chú chim bay đi bốn phía của đảo.', 'Tìm từng con ở Bắc, Nam, Đông, Tây Đảo Gừng để xem màu của nó.', 'Đặt viên đá quý cùng màu lên bệ đúng hướng: Thạch anh Tím, Ngọc xanh biển, Ngọc Lục bảo, Hồng ngọc hoặc Hoàng ngọc.'],
    stepsEn: ['In the Island East jungle, find the hidden path to the shrine with 4 pedestals (north, south, east, west).', 'Touch the shrine: four birds fly off to the four sides of the island.', 'Find each one in Island North, South, East and West to see its colour.', 'Place the gem of the same colour on the pedestal of that direction: Amethyst, Aquamarine, Emerald, Ruby or Topaz.'],
    reward: '5 Óc Chó Vàng', rewardEn: '5 Golden Walnuts', link: { tab: 'predictor', label: 'Xem trước màu chim ở tab Dự Đoán' } },
  { id: 'field_office', icon: 'portrait:professor_snail', keys: ['IslandCenterSkeletonRestored', 'IslandSnakeRestored', 'IslandFrogRestored', 'IslandBatRestored', 'IslandLeftPlantRestored', 'IslandRightPlantRestored'],
    needs: 'Island_UpgradeBridge', name: 'Văn Phòng Khảo Cổ của Giáo Sư Ốc Sên', nameEn: "Professor Snail's Field Office",
    steps: ['Ở Bắc Đảo Gừng, đưa vẹt 10 Óc Chó để xây cầu sang Khu Khai Quật, rồi giải cứu Giáo Sư Ốc Sên trong hang (đập đá chặn cửa).', 'Bộ xương thú lớn: Xương sọ hóa thạch (mở Dừa Vàng), Xương sống (câu cá ở Bắc Đảo), 2 Xương chân và Xương sườn (đập đá hóa thạch), Đuôi (đãi cát ở Bắc Đảo).', 'Bộ xương rắn: Sọ rắn và 2 Đốt sống rắn (đào điểm cổ vật ở Tây Đảo Gừng).', 'Ếch ướp xác (cắt cỏ trong rừng Đông Đảo) và Dơi ướp xác (đập đá thường trong Núi Lửa).', 'Hai bảng khảo sát: hoa tím trả lời 22, sao biển tím trả lời 18.'],
    stepsEn: ['In Island North give a parrot 10 walnuts for the bridge to the Dig Site, then free Professor Snail in the cave (break the rocks blocking it).', 'Large Animal: Fossilized Skull (Golden Coconut), Spine (fishing in Island North), 2 Legs and Ribs (fossil stones), Tail (panning in Island North).', 'Snake: Snake Skull and 2 Snake Vertebrae (artifact spots in Island West).', 'Mummified Frog (cutting weeds in the Island East jungle) and Mummified Bat (plain rocks in the Volcano).', 'Two surveys: purple flowers 22, purple starfish 18.'],
    reward: '13 Óc Chó Vàng', rewardEn: '13 Golden Walnuts' },
  { id: 'birdie', icon: 'portrait:birdie', keys: ['Birdie'], needs: 'Island_Turtle', name: 'Vợ của Cướp Biển (Birdie)', nameEn: "The Pirate's Wife (Birdie)",
    steps: ['Ở Tây Đảo Gừng (sau khi dời chú rùa), vào chòi gỗ bên bờ biển nói chuyện với Birdie: bà đưa Kỷ Vật Chiến Tranh.', 'Đưa Kỷ Vật Chiến Tranh cho Kent, nhận Muối Cà Chua Thượng Hạng.', 'Đưa muối cho Gus ở quán Saloon, nhận Hoa Hồng Thung Lũng Stardew.', 'Đưa hoa cho Sandy ở sa mạc, nhận Điều Khiển TV Cao Cấp.', 'Đưa điều khiển cho George, nhận Mảnh Băng Bắc Cực.', 'Đưa mảnh băng cho Pháp Sư, nhận Con Giun Ngọ Nguậy.', 'Đưa con giun cho Willy, nhận Mặt Dây Chuyền Hải Tặc.', 'Mang Mặt Dây Chuyền về trả cho Birdie.'],
    stepsEn: ['In Island West (once the turtle has moved), talk to Birdie in the beach hut: she gives you the War Memento.', 'Give the War Memento to Kent for Gourmet Tomato Salt.', 'Give the salt to Gus at the Saloon for a Stardew Valley Rose.', 'Give the rose to Sandy in the desert for an Advanced TV Remote.', 'Give the remote to George for an Arctic Shard.', 'Give the shard to the Wizard for a Wriggling Worm.', "Give the worm to Willy for the Pirate's Locket.", 'Bring the Locket back to Birdie.'],
    reward: '5 Óc Chó Vàng', rewardEn: '5 Golden Walnuts' },
  { id: 'gourmand', icon: 'item_melon', keys: ['IslandGourmand1', 'IslandGourmand2', 'IslandGourmand3'], needs: 'Island_UpgradeHouse', name: 'Ếch Sành Ăn', nameEn: 'The Gourmand',
    steps: ['Sửa Nhà trên đảo (20 Óc Chó) để mở Nông Trại Đảo; Ếch Sành Ăn ở trong hang cạnh nông trại.', 'Lần 1: trồng Dưa ở Nông Trại Đảo, để chín và chưa thu hoạch, rồi nói chuyện với ếch.', 'Lần 2: làm như vậy với Lúa mì.', 'Lần 3: làm như vậy với Tỏi. Chỉ thu hoạch sau khi ếch đã xem.'],
    stepsEn: ['Fix the island farmhouse (20 walnuts) to open the island farm; the Gourmand frog lives in the cave beside it.', 'First: grow a Melon on the island farm, leave it ripe and unharvested, then talk to the frog.', 'Second: the same with Wheat.', 'Third: the same with Garlic. Harvest only after the frog has seen it.'],
    reward: '15 Óc Chó Vàng (5 mỗi lần)', rewardEn: '15 Golden Walnuts (5 each)' },
  { id: 'cave_puzzle', icon: 'ing_quartz', keys: ['IslandWestCavePuzzle'], needs: 'Island_Turtle', name: 'Câu đố pha lê trong hang', nameEn: 'Crystal cave puzzle',
    steps: ['Ở Tây Đảo Gừng, tìm hang khuất phía bắc cây cầu treo, cạnh khu có Xà-lam Hổ.', 'Các viên pha lê phát nhạc theo một thứ tự: đánh lại đúng thứ tự đó.', 'Qua hết các vòng (mỗi vòng dài hơn) là xong.'],
    stepsEn: ['In Island West, find the hidden cave north of the rope bridge, near the Tiger Slimes.', 'The crystals chime in an order: hit them in that same order.', 'Clear every round (each one longer) to finish.'],
    reward: '3 Óc Chó Vàng', rewardEn: '3 Golden Walnuts' },
  { id: 'sand_duggy', icon: 'item_copper_pickaxe', keys: ['SandDuggy'], needs: 'Island_Turtle', name: 'Chuột chũi trong cát', nameEn: 'Sand duggy',
    steps: ['Bãi biển dưới chòi của Birdie có 4 cái lỗ.', 'Chặn ba lỗ bằng đồ đặt được để chuột chũi chỉ chui lên một lỗ.', 'Đập nó bằng Rìu, Cuốc chim hoặc Bình tưới. Bình tưới đã nâng cấp đập được mà không cần chặn lỗ.'],
    stepsEn: ["The beach below Birdie's hut has 4 holes.", 'Block three of them with placeable items so the mole has one hole left.', 'Whack it with an Axe, Pickaxe or Watering Can. An upgraded Watering Can works without blocking holes.'],
    reward: '1 Óc Chó Vàng', rewardEn: '1 Golden Walnut' },
  { id: 'mermaid', icon: 'flute_block', keys: ['Mermaid'], name: 'Bài hát Nàng Tiên Cá', nameEn: "The mermaid's song",
    steps: ['Chờ một ngày mưa (dùng Bùa Gọi Mưa nếu cần) rồi tới Đông Nam Đảo Gừng: Nàng Tiên Cá ngồi trên tảng đá ngoài biển.', 'Mang theo 5 Khối Sáo. Đặt mỗi khối dưới một nhóm đá trên bờ.', 'Chỉnh âm từng khối theo số đá (đá to là 5, đá nhỏ là 1); thứ tự từ trái sang phải là 1-5-4-2-3.', 'Chạy qua các khối từ trái sang phải để chơi bài hát.'],
    stepsEn: ['Wait for a rainy day (a Rain Totem helps), then go to Island Southeast: the mermaid sits on a rock out at sea.', 'Bring 5 Flute Blocks. Place one under each group of stones on the shore.', 'Tune each block to its stones (a big stone is 5, a small one 1); left to right the order is 1-5-4-2-3.', 'Run over the blocks from left to right to play the song.'],
    reward: '5 Óc Chó Vàng', rewardEn: '5 Golden Walnuts' },
  { id: 'darts', icon: 'portrait:willy', keys: ['Darts'], name: 'Phóng phi tiêu ở Hang Hải Tặc', nameEn: 'Pirate Cove darts',
    steps: ['Hang Hải Tặc ở Đông Nam Đảo Gừng. Cướp biển chỉ có mặt tối ngày chẵn, sau 20:00 và trời không mưa.', 'Nói chuyện với cướp biển cạnh bảng phi tiêu để chơi.', 'Thắng một ván được 1 quả; chơi lại các tối khác cho đủ 3 quả.'],
    stepsEn: ['Pirate Cove is in Island Southeast. The pirates are only there on even-numbered nights after 8pm when it is not raining.', 'Talk to the pirate by the dart board to play.', 'Each win gives 1 walnut; come back other nights for all 3.'],
    reward: '3 Óc Chó Vàng', rewardEn: '3 Golden Walnuts' },
  { id: 'star_pool', icon: 'fishing', keys: ['StardropPool'], name: 'Vũng sao biển', nameEn: 'Star pool',
    steps: ['Ở Đông Nam Đảo Gừng có một vũng thủy triều hình ngôi sao.', 'Câu cá trong vũng đó: lần câu đầu tiên ra Óc Chó Vàng.'],
    stepsEn: ['Island Southeast has a star-shaped tide pool.', 'Fish in it: the first catch is a Golden Walnut.'],
    reward: '1 Óc Chó Vàng', rewardEn: '1 Golden Walnut' },
  { id: 'volcano', icon: 'forge_enchantments', keys: ['Bush_Caldera_28_36', 'Bush_Caldera_9_34'], name: 'Lên đỉnh Núi Lửa (Lò Rèn)', nameEn: 'Reach the top of the Volcano (the Forge)',
    steps: ['Vào Hầm Núi Lửa ở Bắc Đảo Gừng. Mang Bình tưới để làm nguội dung nham thành lối đi.', 'Đi qua 10 tầng; mỗi lần vào, các tầng được tạo ngẫu nhiên.', 'Trên đỉnh là Lò Rèn và cửa hàng của Người Lùn. Hai bụi cây dọc mép nam có 2 Óc Chó.'],
    stepsEn: ['Enter the Volcano Dungeon in Island North. Bring a Watering Can to cool lava into paths.', 'Go through the 10 floors; they change on every visit.', "At the top are the Forge and the Dwarf's shop. Two bushes along the south edge hold 2 walnuts."],
    reward: 'Lò Rèn, 2 Óc Chó Vàng', rewardEn: 'The Forge, 2 Golden Walnuts', link: { tab: 'mines', label: 'Chi tiết từng tầng ở tab Hầm Mỏ' } },
  { id: 'qi_room', icon: 'qi_gem', walnutsFound: 100, name: 'Phòng Óc Chó của Ông Qi', nameEn: "Qi's Walnut Room",
    steps: ['Tìm tổng cộng 100 Óc Chó Vàng (tính cả số đã đưa cho vẹt).', 'Tới cánh cửa của Ông Qi ở Tây Đảo Gừng: cửa mở khi đủ 100 quả.', 'Bên trong là bảng đơn hàng của Ông Qi và quầy đổi Ngọc Qi.'],
    stepsEn: ['Find 100 Golden Walnuts in all (walnuts given to parrots count).', "Go to Qi's door in Island West: it opens at 100.", "Inside are Qi's special order board and the Qi Gem shop."],
    reward: 'Mở đơn hàng của Ông Qi', rewardEn: "Opens Qi's special orders" },
  { id: 'qi_orders', icon: 'qi_gem', orders: 'qi', name: 'Đơn hàng của Ông Qi', nameEn: "Qi's special orders",
    steps: ['Nhận đơn trên bảng trong Phòng Óc Chó; bảng thay đơn mới mỗi tuần.', 'Mỗi đơn khó hơn đơn ở thị trấn và có hạn chót; xong đơn được thưởng Ngọc Qi.', 'Danh sách đơn ở mục Nhân vật & nhiệm vụ; đơn đang nhận xem ở tab Sổ Tay.'],
    stepsEn: ['Take orders from the board in the Walnut Room; it changes every week.', 'They are harder than the town orders and have a deadline; each pays Qi Gems.', 'The list is in People & quests; orders in progress are in the Journal tab.'],
    reward: 'Ngọc Qi', rewardEn: 'Qi Gems' }
];

// How to do each of Mr. Qi's special orders (ids match special-orders-data.js).
// From the Official Stardew Valley Wiki: "Quests" > List of Mr. Qi's Special
// Orders, "Qi Bean", "Junimo Kart" and "Prismatic Shard", version 1.6.
export const QI_ORDER_GUIDE = {
  QiChallenge2: {
    steps: ['Khi đơn đang nhận, Hạt Kỳ bí rơi ra khắp nơi: đập đá (2%), chặt cây và gốc to (25%), rung cây ra hạt, cắt cỏ dại, lục thùng rác, hạ quái (5%), đập Hốc tinh và Dừa Vàng, đào điểm cổ vật, câu cá, đập thùng gỗ trong hầm.',
      'Hạt Kỳ bí trồng được mọi mùa và chín sau 4 ngày. Gieo ở Nhà kính hoặc Nông Trại Đảo để không lo đổi mùa.',
      'Đem Trái Kỳ bí vào Máy tạo Hạt giống để ra thêm hạt, nhân giống cho tới khi đủ ruộng.',
      'Giao 500 Trái Kỳ bí qua Thùng giao hàng; bán cho Pierre không tính.',
      'Hết đơn thì mọi hạt và trái Kỳ bí biến mất (cả trong rương); riêng Trái Kỳ bí khổng lồ vẫn còn để thu hoạch sau.'],
    stepsEn: ['While the order is active, Qi Beans drop all over: breaking rocks (2%), chopping trees and large stumps (25%), shaking trees for seeds, cutting weeds, garbage cans, monsters (5%), geodes and Golden Coconuts, artifact spots, fishing, crates in the mines.',
      'Qi Beans grow in any season in 4 days. Plant them in the Greenhouse or on the Island Farm so the season does not matter.',
      'Put Qi Fruit in a Seed Maker for more beans and keep multiplying until you have a full field.',
      'Ship 500 Qi Fruit through the Shipping Bin; selling to Pierre does not count.',
      'When the order ends every Qi Bean and Qi Fruit disappears (chests too); only Giant Qi Fruit stay to harvest later.'],
    prep: 'Máy tạo Hạt giống, Đầu phun nước, Phân bón thúc', prepEn: 'Seed Makers, Sprinklers, Speed-Gro' },
  QiChallenge3: {
    steps: ['Chơi Junimo Kart ở máy trò chơi trong Quán rượu Stardrop, chọn chế độ vô tận (Endless).',
      'Chế độ vô tận chỉ có một mạng. Mỗi ô đi được 10 điểm, mỗi đồng xu 40 điểm, mỗi trái cây 1.000 điểm.',
      'Qua một màn được 5.000 điểm, ăn đủ 3 trái cây trong màn được thêm 5.000. Cần 50.000 điểm, tức là qua được khoảng 4 màn và nhặt nhiều trái cây.',
      'Có 7 ngày, chơi lại bao nhiêu lần cũng được; chỉ cần một lượt đạt đủ điểm.'],
    stepsEn: ['Play Junimo Kart on the arcade machine in the Stardrop Saloon, Endless mode.',
      'Endless mode has one life. Every tile travelled is 10 points, every coin 40, every fruit 1,000.',
      'Finishing a level is 5,000 and all 3 fruits in it another 5,000. You need 50,000, roughly 4 levels with plenty of fruit.',
      'You have 7 days and can retry as often as you like; one run has to reach the score.'],
    prep: '', prepEn: '' },
  QiChallenge4: {
    steps: ['Mảnh Ngũ sắc phải nhặt sau khi nhận đơn; mảnh đã có sẵn trong rương không tính.',
      'Nguồn dễ nhất: Đá Huyền bí (25%) ở tầng 100+ Hầm Mỏ, Hang Đầu Lâu và Hầm Núi Lửa; mỏ Iridium trong Hang Đầu Lâu (3,5%).',
      'Thêm cơ hội: phòng kho báu trong Hang Đầu Lâu, Hốc tinh Toàn năng, thiên thạch rơi xuống nông trại, Tượng Hoàn Mỹ Thật Sự (mỗi ngày 1 mảnh).',
      'Bỏ 4 mảnh vào hộp của Ông Qi trong Phòng Óc Chó. Có 28 ngày.'],
    stepsEn: ['The shards must be picked up after taking the order; shards already in chests do not count.',
      'Easiest sources: Mystic Stones (25%) on Mines floors 100+, Skull Cavern and the Volcano Dungeon; Iridium nodes in the Skull Cavern (3.5%).',
      'More chances: Skull Cavern treasure rooms, Omni Geodes, meteorites on the farm, the Statue Of True Perfection (one a day).',
      "Put the 4 shards in Qi's box in the Walnut Room. You have 28 days."],
    prep: 'Bom, Cầu thang, đồ tăng may mắn', prepEn: 'Bombs, Staircases, luck buffs' },
  QiChallenge5: {
    steps: ['Xuống tầng 100 Hang Đầu Lâu mà không ăn hay uống gì khi đang ở trong hang. Có 7 ngày, làm nhiều lượt được.',
      'Ăn món tăng tốc, tăng may mắn trước khi vào hang: hiệu ứng vẫn giữ đủ thời gian.',
      'Mang nhiều Cầu thang (công thức Khai khoáng cấp 2, 99 Đá mỗi cái) để nhảy tầng nhanh, và Bom để mở lối.',
      'Hồi máu không cần ăn: Slime to đôi khi rơi tim hồi 10 máu (20 với Nhẫn đạo tặc), Nhẫn Ma-cà-rồng, trang sức Hộp Tiên, vũ khí có bùa Hút Máu.'],
    stepsEn: ['Reach floor 100 of the Skull Cavern without eating or drinking anything inside. You have 7 days and can try many times.',
      'Eat speed and luck food before going in: the buffs keep running for their full time.',
      'Bring lots of Staircases (Mining level 2 recipe, 99 Stone each) to skip floors, and Bombs to clear the way.',
      "Heal without food: Big Slimes sometimes drop a heart worth 10 HP (20 with the Burglar's Ring), the Vampire Ring, the Fairy Box trinket, a Vampiric weapon."],
    prep: 'Cầu thang, Bom, Nhẫn Ma-cà-rồng', prepEn: 'Staircases, Bombs, Vampire Ring' },
  QiChallenge6: {
    steps: ['Mọi món nấu sau khi nhận đơn có chữ "Tươi" trước tên. Chỉ món Tươi mới tính.',
      'Giao các món Tươi qua Thùng giao hàng đủ 100.000g trong 14 ngày.',
      'Cách 1: mua hoặc ủ 669 Cà-phê (mua ở Quán rượu tốn 200.700g), nấu 223 Cà-phê đặc gấp Ba.',
      'Cách 2: trồng 1.667 Lúa mì đem xay ra Bột mì (hoặc mua 1.667 Bột mì, 166.700g), nấu 1.667 Bánh mỳ.'],
    stepsEn: ['Everything cooked after taking the order is marked "Fresh". Only Fresh dishes count.',
      'Ship 100,000g of Fresh dishes through the Shipping Bin within 14 days.',
      'Option 1: buy or brew 669 Coffee (200,700g at the Saloon) and cook 223 Triple Shot Espresso.',
      'Option 2: grow 1,667 Wheat and mill it into Wheat Flour (or buy 1,667 flour for 166,700g), then cook 1,667 Bread.'],
    prep: 'Nhà đã nâng cấp có bếp, nguyên liệu số lượng lớn', prepEn: 'An upgraded house with a kitchen, bulk ingredients' },
  QiChallenge7: {
    steps: ['Tặng 50 món quà mà người nhận yêu thích trong 7 ngày. Trà Stardrop không tính.',
      'Mỗi người nhận 1 quà một ngày, tối đa 2 quà một tuần. Có 34 dân làng nhận quà.',
      'Nhanh nhất là 2 ngày: ngày đầu tặng đủ 34 người, ngày sau thêm 16 người.',
      'Dùng tab Dân Làng để xem quà yêu thích từng người và gom trước.'],
    stepsEn: ['Give 50 loved gifts within 7 days. Stardrop Tea does not count.',
      'Each villager takes 1 gift a day and 2 a week. 34 villagers can be gifted.',
      'Fastest is 2 days: all 34 villagers on the first day, 16 more the next.',
      "Use the Villagers tab to see each villager's loved gifts and stock up first."],
    prep: 'Quà yêu thích của từng người', prepEn: "Each villager's loved gifts" },
  QiChallenge8: {
    steps: ['Có 3 ngày để câu đủ 5 con. Chúng ở chỗ cá huyền thoại gốc, câu được mọi mùa và không cần mưa.',
      'Cá Lồng đèn cái: sông ở Thị trấn, trên tấm ván gỗ phía bắc JojaMart.',
      'Hậu duệ Cá Băng hà: mũi nam đảo nhỏ Arrowhead trong Rừng Cindersap.',
      'Cá Phi hồng con: cuối cầu tàu phía đông ở Bãi biển. Cá chép Phóng xạ: Cống ngầm. Cá Huyền thoại đệ Nhị: hồ trên Núi, cạnh khúc gỗ.',
      'Thanh câu không hiện dấu cá huyền thoại nhưng vẫn khó như cá gốc. Cần Câu cá cấp 10 (tính cả đồ tăng cấp) để câu Cá Huyền thoại đệ Nhị.'],
    stepsEn: ['You have 3 days to catch all 5. They are where the original legendaries live, in any season and without rain.',
      "Ms. Angler: the Town river, on the wooden plank north of JojaMart.",
      'Glacierfish Jr.: the south tip of Arrowhead Island in Cindersap Forest.',
      'Son of Crimsonfish: the end of the east pier at the Beach. Radioactive Carp: the Sewers. Legend II: the Mountain lake, by the log.',
      'The bar does not show a legendary marker but they are as hard as the originals. Fishing level 10 (buffs count) is needed to hook Legend II.'],
    prep: 'Cần câu Iridium, Mồi cao cấp, Phao hút, món tăng Câu cá', prepEn: 'Iridium Rod, Deluxe Bait, Trap Bobber, Fishing buff food' },
  QiChallenge9: {
    steps: ['Thang máy Hầm Mỏ bị đặt lại và quái vật mạnh hơn hẳn. Phải xuống tới tầng 120 trong 7 ngày.',
      'Đi từng đoạn: thang máy mở lại mỗi 5 tầng như lúc đầu.',
      'Mang nhiều Cầu thang và Bom để qua tầng nhanh, cùng đồ ăn hồi máu.',
      'Đơn này cũng đặt lại đồ đã mở bán ở Hội Mạo Hiểm.'],
    stepsEn: ['The Mines elevator is reset and the monsters are much tougher. Reach floor 120 within 7 days.',
      'Go in stages: the elevator opens every 5 floors again, as at the start.',
      'Bring lots of Staircases and Bombs to get through floors fast, and healing food.',
      "This order also resets the gear unlocked at the Adventurer's Guild."],
    prep: 'Vũ khí mạnh, Cầu thang, Bom, đồ ăn hồi máu', prepEn: 'A strong weapon, Staircases, Bombs, healing food' },
  QiChallenge10: {
    steps: ['Hang Đầu Lâu đầy quái vật mạnh. Xuống tới tầng 100 trong 7 ngày; lần nào cũng bắt đầu lại từ tầng 1.',
      'Đi ngày may mắn, ăn món tăng tốc và phòng thủ trước khi vào.',
      'Mang nhiều Cầu thang và Bom để nhảy tầng, cùng nhiều đồ ăn hồi máu.'],
    stepsEn: ['The Skull Cavern is full of strong monsters. Reach floor 100 within 7 days; each trip starts again from floor 1.',
      'Go on a lucky day and eat speed and defense food before going in.',
      'Bring lots of Staircases and Bombs to skip floors, and plenty of healing food.'],
    prep: 'Vũ khí mạnh, Cầu thang, Bom, đồ ăn hồi máu', prepEn: 'A strong weapon, Staircases, Bombs, healing food' },
  QiChallenge12: {
    steps: ['Bỏ vào hộp của Ông Qi 100 món mỗi màu: đỏ, cam, vàng, xanh lá, xanh dương, tím. Có 14 ngày.',
      'Món được nhận khắt khe hơn ở chậu nhuộm: chỉ món in đậm trong danh sách chậu nhuộm của wiki. Một màu trộn nhiều món được, đồ có sẵn từ trước vẫn tính, món bỏ vào không lấy lại được.',
      'Mua nhanh: Đỏ là Mỳ Ý ở Quán rượu (24.000g), Cam là Quặng Đồng ở Lò rèn (15.000g), Vàng là Rơm rạ ở trại Marnie (5.000g).',
      'Xanh lá là Sa-lát ở Quán rượu (22.000g), Xanh dương là Joja Cola (7.500g), Tím là Tinh chất Hư không mua ở Krobus (10 cái mỗi ngày, 10.000g).'],
    stepsEn: ["Put 100 items of each colour in Qi's box: red, orange, yellow, green, blue, purple. You have 14 days.",
      'It is stricter than the dye pots: only the bold items on the wiki dye list count. One colour can mix items, items you already own count, and nothing comes back.',
      "Quick buys: red is Spaghetti at the Saloon (24,000g), orange is Copper Ore at the Blacksmith (15,000g), yellow is Hay at Marnie's (5,000g).",
      'Green is Salad at the Saloon (22,000g), blue is Joja Cola (7,500g), purple is Void Essence from Krobus (10 a day, 10,000g).'],
    prep: 'Khoảng 83.500g nếu mua hết', prepEn: 'About 83,500g to buy it all' }
};
