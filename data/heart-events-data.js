// ==========================================================================
// STARDEW VALLEY WIKI - SỰ KIỆN TIM (HEART EVENTS)
// Heart events per villager for the save checker. Event ids from stardew-checkup
// by MouseyPounds (MIT License); trigger conditions from the Official Stardew Valley Wiki.
//   h: hearts needed · ids: event ids in the save's eventsSeen (any one counts)
//   where/whereEn: where it starts · when/whenEn: time, weather, other conditions
//   note/noteEn (optional): caveats (missable, choices, dating/marriage needed)
// ==========================================================================

export const HEART_EVENTS = {
  Abigail: [
    { h: 2, ids: ['1'], name: 'Trong phòng Abigail', nameEn: 'In Abigail\'s room', where: 'Tiệm Tạp Hoá Pierre', whereEn: 'Pierre\'s General Store', when: 'Vào tiệm khi Abigail ở đó, ngày nào cũng được trừ Thứ Bảy.', whenEn: 'Enter while Abigail is there, any day except Saturday.' },
    { h: 4, ids: ['2'], name: 'Ngày mưa trên núi', nameEn: 'Rainy day on the Mountain', where: 'Khu Núi', whereEn: 'The Mountain', when: 'Ngày mưa, 12:00 – 19:00, mùa nào cũng được trừ mùa Đông.', whenEn: 'Rainy day, noon – 7pm, any season except Winter.' },
    { h: 6, ids: ['4'], name: 'Buổi tối trong thị trấn', nameEn: 'Evening in town', where: 'Thị Trấn Pelican', whereEn: 'Pelican Town', when: 'Vào thị trấn (từ bất kỳ lối nào, kể cả bước ra từ nhà/cửa hàng) 21:00 – 24:00, ngày không mưa.', whenEn: 'Enter town from any direction (including leaving a building) 9pm – midnight on a day without rain.' },
    { h: 8, ids: ['3'], name: 'Thư mời của Abigail', nameEn: 'Abigail\'s invitation', where: 'Tiệm Tạp Hoá Pierre', whereEn: 'Pierre\'s General Store', when: 'Sau khi nhận thư của Abigail, vào tiệm 20:00 – 22:00 khi cô ấy ở đó. Sau 21:00 cửa ngoài khoá (trừ khi có Chìa khóa Thị trấn), có thể chờ trong phòng kính của Caroline rồi bước ra bếp.', whenEn: 'After receiving Abigail\'s letter, enter 8pm – 10pm while she is there. The front door locks at 9pm (unless you have the Key To The Town); you can wait in Caroline\'s sunroom and walk into the kitchen.' },
    { h: 10, ids: ['901756'], name: 'Trong hầm mỏ', nameEn: 'In the mines', where: 'Hầm Mỏ hoặc Hầm Mỏ Đá', whereEn: 'The Mines or Quarry Mine', when: 'Vào hầm mỏ (hoặc leo lên từ tầng dưới) 17:00 – 24:00. Không xảy ra nếu đã tặng Mặt Dây Chuyền Tiên Cá.', whenEn: 'Enter the mines (or climb up from a lower floor) 5pm – midnight. Won\'t trigger if you\'ve already given her the Mermaid\'s Pendant.', note: 'Phải đang hẹn hò (đã tặng Bó Hoa) mới vượt được 8 tim.', noteEn: 'You must be dating (Bouquet given) to go past 8 hearts.' },
    { h: 14, ids: ['6963327'], name: 'Sự kiện 14 tim', nameEn: '14-heart event', where: 'Rừng Sau', whereEn: 'Backwoods', when: 'Vào Rừng Sau 6:10 – 17:00.', whenEn: 'Enter the Backwoods 6:10am – 5pm.', note: 'Chỉ khi đã kết hôn với Abigail.', noteEn: 'Only after marrying Abigail.' },
  ],
  Alex: [
    { h: 2, ids: ['20'], name: 'Trên bãi biển', nameEn: 'At the beach', where: 'Bãi Biển', whereEn: 'The Beach', when: 'Ngày nắng mùa Hạ, khi Alex đang ở bãi biển.', whenEn: 'Sunny Summer day while Alex is at the beach.' },
    { h: 4, ids: ['2481135'], name: 'Trong thị trấn', nameEn: 'In town', where: 'Thị Trấn Pelican', whereEn: 'Pelican Town', when: 'Vào thị trấn 9:00 – 16:00.', whenEn: 'Enter town 9am – 4pm.' },
    { h: 5, ids: ['21'], name: 'Ở nhà Alex', nameEn: 'At Alex\'s house', where: 'Số 1 Đường Ven Sông', whereEn: '1 River Road', when: 'Vào nhà khi Alex có ở nhà.', whenEn: 'Enter while Alex is home.' },
    { h: 6, ids: ['2119820'], name: 'Ở nhà Alex', nameEn: 'At Alex\'s house', where: 'Số 1 Đường Ven Sông', whereEn: '1 River Road', when: 'Vào nhà khi Alex có ở nhà.', whenEn: 'Enter while Alex is home.' },
    { h: 8, ids: ['288847'], name: 'Trên bãi biển', nameEn: 'At the beach', where: 'Bãi Biển', whereEn: 'The Beach', when: 'Ngày nắng, khi Alex ở bãi biển (thường chỉ mùa Hạ; mùa khác có thể gặp khi cậu ấy đi ngang ra Khu nghỉ dưỡng Đảo Gừng).', whenEn: 'Sunny day while Alex is at the beach (normally Summer only; in other seasons he may pass by on the way to the Ginger Island resort).' },
    { h: 10, ids: ['911526'], name: 'Hẹn ở quán rượu', nameEn: 'Meeting at the Saloon', where: 'Quán Rượu Stardrop', whereEn: 'The Stardrop Saloon', when: 'Có thư mời của Alex; sau khi nhận thư, vào quán 19:00 – 22:00.', whenEn: 'Triggered by a letter from Alex; after receiving it, enter the Saloon 7pm – 10pm.', note: 'Phải đang hẹn hò (đã tặng Bó Hoa) mới vượt được 8 tim.', noteEn: 'You must be dating (Bouquet given) to go past 8 hearts.' },
    { h: 14, ids: ['3917587'], name: 'Sự kiện 14 tim (phần 1)', nameEn: '14-heart event (part 1)', where: 'Nông Trại (cửa nhà chính)', whereEn: 'Farm (farmhouse door)', when: 'Từ năm 2, ra khỏi nhà 6:00 – 8:20, ngày nào cũng được trừ Chủ Nhật. Cần có sẵn 5.000g.', whenEn: 'Year 2+, leave the farmhouse 6am – 8:20am, any day but Sunday. You must have 5,000g on hand.', note: 'Chỉ khi đã kết hôn với Alex.', noteEn: 'Only after marrying Alex.' },
    { h: 14, ids: ['3917589'], name: 'Sự kiện 14 tim (phần 2)', nameEn: '14-heart event (part 2)', where: 'Thị Trấn Pelican', whereEn: 'Pelican Town', when: 'Chủ Nhật tiếp theo sau phần 1 (đã đưa tiền), vào thị trấn.', whenEn: 'The Sunday after part 1 (if you paid), enter town.' },
    { h: 14, ids: ['3917590'], name: 'Sự kiện 14 tim (phần 3)', nameEn: '14-heart event (part 3)', where: 'Quán Rượu Stardrop', whereEn: 'The Stardrop Saloon', when: 'Ngay sau phần 2, vào quán rượu.', whenEn: 'Right after part 2, enter the Saloon.' },
  ],
  Elliott: [
    { h: 2, ids: ['39'], name: 'Ở nhà gỗ', nameEn: 'At the cabin', where: 'Nhà Gỗ Của Elliott', whereEn: 'Elliott\'s Cabin', when: 'Vào nhà khi Elliott có ở nhà.', whenEn: 'Enter while Elliott is home.' },
    { h: 4, ids: ['40'], name: 'Ở quán rượu', nameEn: 'At the Saloon', where: 'Quán Rượu Stardrop', whereEn: 'The Stardrop Saloon', when: 'Vào quán 15:00 – 22:00 khi Gus có mặt.', whenEn: 'Enter 3pm – 10pm while Gus is there.' },
    { h: 6, ids: ['423502'], name: 'Ở nhà gỗ', nameEn: 'At the cabin', where: 'Nhà Gỗ Của Elliott', whereEn: 'Elliott\'s Cabin', when: 'Vào nhà khi Elliott có ở nhà.', whenEn: 'Enter while Elliott is home.' },
    { h: 8, ids: ['1848481'], name: 'Buổi đọc sách', nameEn: 'Book reading', where: 'Bảo Tàng & Thư Viện', whereEn: 'Museum', when: 'Sau khi nhận thư của Elliott, vào bảo tàng 13:00 – 19:00 (không cần đúng ngày nhận thư).', whenEn: 'After receiving Elliott\'s letter, visit the museum 1pm – 7pm (doesn\'t need to be the same day).' },
    { h: 10, ids: ['43'], name: 'Trên bãi biển', nameEn: 'At the beach', where: 'Bãi Biển', whereEn: 'The Beach', when: 'Ngày không mưa, 7:00 – 13:00. Có thư gửi tới nhưng không bắt buộc.', whenEn: 'Day without rain, 7am – 1pm. A letter is sent, but it is not required.', note: 'Phải đang hẹn hò (đã tặng Bó Hoa) mới vượt được 8 tim.', noteEn: 'You must be dating (Bouquet given) to go past 8 hearts.' },
    { h: 14, ids: ['3912125'], name: 'Sự kiện 14 tim (phần 1)', nameEn: '14-heart event (part 1)', where: 'Nông Trại', whereEn: 'Farm', when: 'Ra khỏi nhà hoặc vào nông trại khi Elliott đang ở ngoài nông trại, 6:00 – 15:00, và 8 ngày tới không có lễ hội.', whenEn: 'Leave the farmhouse or enter the farm while Elliott is outside on it, 6am – 3pm, with no festival in the next 8 days.', note: 'Chỉ khi đã kết hôn với Elliott.', noteEn: 'Only after marrying Elliott.' },
    { h: 14, ids: ['3912132'], name: 'Sự kiện 14 tim (phần 2)', nameEn: '14-heart event (part 2)', where: 'Nhà chính', whereEn: 'Farmhouse', when: 'Tự diễn ra khi thức dậy vào ngày thứ 8 sau phần 1.', whenEn: 'Plays when you wake up on the 8th day after part 1.' },
  ],
  Emily: [
    { h: 2, ids: ['471942'], name: 'Ở nhà Emily', nameEn: 'At Emily\'s house', where: 'Số 2 Đường Willow', whereEn: '2 Willow Lane', when: 'Vào nhà khi Emily có ở nhà.', whenEn: 'Enter while Emily is home.' },
    { h: 4, ids: ['463391'], name: 'Trong thị trấn', nameEn: 'In town', where: 'Thị Trấn Pelican', whereEn: 'Pelican Town', when: 'Vào thị trấn ngày nắng, trừ mùa Đông.', whenEn: 'Enter town on a sunny day, not in Winter.' },
    { h: 6, ids: ['917409'], name: 'Sở thích bí mật', nameEn: 'Secret hobby', where: 'Số 2 Đường Willow', whereEn: '2 Willow Lane', when: 'Vào nhà khi Emily có ở nhà.', whenEn: 'Enter while Emily is home.' },
    { h: 8, ids: ['2123243'], name: 'Liệu pháp quần áo', nameEn: 'Clothing therapy', where: 'Dinh Thị Trưởng', whereEn: 'Mayor\'s Manor', when: 'Có thư mời của Emily; vào Dinh Thị Trưởng trong giờ mở cửa (ngày nhận thư hoặc ngày sau). Cần đã xem sự kiện 6 tim.', whenEn: 'Triggered by a letter from Emily; enter the Mayor\'s Manor during open hours (that day or later). Requires her 6-heart event.', note: 'Xem sự kiện này sẽ khoá sự kiện 6 tim của Clint.', noteEn: 'Seeing this event blocks Clint\'s 6-heart event.' },
    { h: 10, ids: ['2123343'], name: 'Trong Khu Rừng Bí Mật', nameEn: 'In the Secret Woods', where: 'Khu Rừng Bí Mật', whereEn: 'Secret Woods', when: 'Có thư mời của Emily; vào Khu Rừng Bí Mật sau 22:00, ngày không mưa và không có lễ hội. Cần Rìu Thép để chặt Khúc gỗ lớn chắn lối. Kết thúc sự kiện là hết ngày.', whenEn: 'Triggered by a letter from Emily; enter the Secret Woods after 10pm on a day without rain or festival. Needs a Steel Axe to clear the Large Log. The day ends after the event.', note: 'Phải đang hẹn hò (đã tặng Bó Hoa) mới vượt được 8 tim.', noteEn: 'You must be dating (Bouquet given) to go past 8 hearts.' },
    { h: 14, ids: ['3917600'], name: 'Sự kiện 14 tim (phần 1)', nameEn: '14-heart event (part 1)', where: 'Nông Trại (cửa nhà chính)', whereEn: 'Farm (farmhouse door)', when: 'Ra khỏi nhà 6:00 – 8:20. Emily giao nhiệm vụ mang 200 Sợi.', whenEn: 'Leave the farmhouse 6am – 8:20am. Emily gives a quest for 200 Fiber.', note: 'Chỉ khi đã kết hôn với Emily.', noteEn: 'Only after marrying Emily.' },
    { h: 14, ids: ['3917601'], name: 'Sự kiện 14 tim (phần 2)', nameEn: '14-heart event (part 2)', where: 'Nhà chính', whereEn: 'Farmhouse', when: 'Hoàn thành nhiệm vụ, chờ 3 ngày rồi vào nhà 20:00 – 24:00.', whenEn: 'Finish the quest, wait 3 days, then enter the farmhouse 8pm – midnight.' },
  ],
  Haley: [
    { h: 2, ids: ['11'], name: 'Hai chị em', nameEn: 'The sisters', where: 'Số 2 Đường Willow', whereEn: '2 Willow Lane', when: 'Vào nhà khi cả Haley và Emily đều ở nhà.', whenEn: 'Enter while both Haley and Emily are home.' },
    { h: 4, ids: ['12'], name: 'Ở nhà Haley', nameEn: 'At Haley\'s house', where: 'Số 2 Đường Willow', whereEn: '2 Willow Lane', when: 'Vào nhà khi Haley có ở nhà.', whenEn: 'Enter while Haley is home.' },
    { h: 6, ids: ['13'], name: 'Trên bãi biển', nameEn: 'At the beach', where: 'Bãi Biển', whereEn: 'The Beach', when: '10:00 – 16:00, mùa nào cũng được trừ mùa Đông.', whenEn: '10am – 4pm, any season except Winter.' },
    { h: 8, ids: ['14'], name: 'Trong rừng', nameEn: 'In the forest', where: 'Rừng Cindersap', whereEn: 'Cindersap Forest', when: 'Ngày nắng, 10:00 – 16:00, trừ mùa Đông.', whenEn: 'Sunny day, 10am – 4pm, not in Winter.' },
    { h: 10, ids: ['15'], name: 'Ở nhà Haley', nameEn: 'At Haley\'s house', where: 'Số 2 Đường Willow', whereEn: '2 Willow Lane', when: 'Vào nhà khi Haley có ở nhà.', whenEn: 'Enter while Haley is home.', note: 'Phải đang hẹn hò (đã tặng Bó Hoa) mới vượt được 8 tim.', noteEn: 'You must be dating (Bouquet given) to go past 8 hearts.' },
    { h: 14, ids: ['6184643'], name: 'Sự kiện 14 tim (phần 1)', nameEn: '14-heart event (part 1)', where: 'Thị Trấn Pelican', whereEn: 'Pelican Town', when: 'Vào thị trấn 8:00 – 15:00, ngày không mưa.', whenEn: 'Enter town 8am – 3pm on a day without rain.', note: 'Chỉ khi đã kết hôn với Haley.', noteEn: 'Only after marrying Haley.' },
    { h: 14, ids: ['8675611'], name: 'Sự kiện 14 tim (phần 2)', nameEn: '14-heart event (part 2)', where: 'Nhà chính', whereEn: 'Farmhouse', when: 'Ít nhất một ngày sau phần 1, vào nhà 6:20 – 17:00.', whenEn: 'At least one day after part 1, enter the farmhouse 6:20am – 5pm.' },
    { h: 14, ids: ['6184644'], name: 'Sự kiện 14 tim (phần 3)', nameEn: '14-heart event (part 3)', where: 'Thị Trấn Pelican', whereEn: 'Pelican Town', when: 'Ít nhất một ngày sau phần 2, mang theo Bánh Sô-cô-la vào thị trấn 6:00 – 15:00, ngày không mưa.', whenEn: 'At least one day after part 2, enter town with a Chocolate Cake in your inventory, 6am – 3pm, on a day without rain.' },
  ],
  Harvey: [
    { h: 2, ids: ['56'], name: 'Ở nhà George', nameEn: 'At George\'s house', where: 'Số 1 Đường Ven Sông', whereEn: '1 River Road', when: 'Vào nhà George khi George có ở nhà.', whenEn: 'Enter George\'s house while George is home.' },
    { h: 4, ids: ['57'], name: 'Ở phòng khám', nameEn: 'At the clinic', where: 'Phòng Khám Của Harvey', whereEn: 'Harvey\'s Clinic', when: 'Vào phòng khám khi Harvey có ở đó.', whenEn: 'Enter the clinic while Harvey is there.' },
    { h: 6, ids: ['58'], name: 'Ở tiệm Pierre', nameEn: 'At Pierre\'s', where: 'Tiệm Tạp Hoá Pierre', whereEn: 'Pierre\'s General Store', when: 'Vào tiệm 11:00 – 15:00.', whenEn: 'Enter 11am – 3pm.' },
    { h: 8, ids: ['571102'], name: 'Ở phòng khám', nameEn: 'At the clinic', where: 'Phòng Khám Của Harvey', whereEn: 'Harvey\'s Clinic', when: 'Vào phòng khám.', whenEn: 'Enter the clinic.' },
    { h: 10, ids: ['528052'], name: 'Hẹn ở đường ray', nameEn: 'Meeting at the railroad', where: 'Đường Ray', whereEn: 'Railroad', when: 'Có thư mời của Harvey; sau khi nhận thư, tới Đường Ray 9:00 – 17:00.', whenEn: 'Triggered by a letter from Harvey; after receiving it, go to the Railroad 9am – 5pm.', note: 'Phải đang hẹn hò (đã tặng Bó Hoa) mới vượt được 8 tim.', noteEn: 'You must be dating (Bouquet given) to go past 8 hearts.' },
    { h: 14, ids: ['3917626'], name: 'Sự kiện 14 tim', nameEn: '14-heart event', where: 'Nhà chính', whereEn: 'Farmhouse', when: 'Vào nhà 20:00 – 24:00. Nhà phải được nâng cấp ít nhất hai lần.', whenEn: 'Enter the farmhouse 8pm – midnight. The house must be upgraded at least twice.', note: 'Chỉ khi đã kết hôn với Harvey.', noteEn: 'Only after marrying Harvey.' },
  ],
  Leah: [
    { h: 2, ids: ['50'], name: 'Ở nhà Leah', nameEn: 'At Leah\'s cottage', where: 'Nhà Của Leah', whereEn: 'Leah\'s Cottage', when: 'Vào nhà khi Leah có ở nhà.', whenEn: 'Enter while Leah is home.', note: 'Lựa chọn ở đây (triển lãm hay trang web) quyết định sự kiện 8 tim.', noteEn: 'Your choice here (art show or website) decides her 8-heart event.' },
    { h: 4, ids: ['51'], name: 'Ở nhà Leah', nameEn: 'At Leah\'s cottage', where: 'Nhà Của Leah', whereEn: 'Leah\'s Cottage', when: 'Vào nhà khi Leah có ở nhà.', whenEn: 'Enter while Leah is home.' },
    { h: 6, ids: ['52'], name: 'Bên bờ sông', nameEn: 'By the river', where: 'Rừng Cindersap', whereEn: 'Cindersap Forest', when: 'Vào rừng khi Leah ở đó, trừ mùa Đông.', whenEn: 'Enter the forest while Leah is there, not in Winter.', note: 'Còn một cảnh 6 tim khác (Leah mang quà tới cửa nhà 6:00 – 11:30, ngày không mưa) không có trong danh sách id này.', noteEn: 'There is another 6-heart scene (Leah at your door with a gift, 6am – 11:30am, no rain) that is not in this id list.' },
    { h: 8, ids: ['53', '584059'], name: 'Triển lãm hoặc trang web', nameEn: 'Art show or website', where: 'Thị Trấn Pelican / Nhà Của Leah', whereEn: 'Pelican Town / Leah\'s Cottage', when: 'Nếu chọn triển lãm ở 2 tim: Leah tới cửa nhà mời 6:00 – 8:00 (trừ mùa Đông), sau đó vào thị trấn 15:00 – 17:00. Nếu chọn trang web: vào nhà Leah khi cô ấy ở nhà.', whenEn: 'Art show (chosen at 2 hearts): Leah invites you at your door 6am – 8am (not Winter), then enter town 3pm – 5pm. Website: enter Leah\'s Cottage while she is home.', note: 'Hai id là hai phiên bản; xem một trong hai là đủ.', noteEn: 'The two ids are the two versions; either one counts.' },
    { h: 10, ids: ['54'], name: 'Trong rừng', nameEn: 'In the forest', where: 'Rừng Cindersap', whereEn: 'Cindersap Forest', when: 'Ngày nắng, 11:00 – 16:00, trừ mùa Đông.', whenEn: 'Sunny day, 11am – 4pm, not in Winter.', note: 'Phải đang hẹn hò (đã tặng Bó Hoa) mới vượt được 8 tim.', noteEn: 'You must be dating (Bouquet given) to go past 8 hearts.' },
    { h: 14, ids: ['3911124'], name: 'Sự kiện 14 tim (phần 1)', nameEn: '14-heart event (part 1)', where: 'Nông Trại (cửa nhà chính)', whereEn: 'Farm (farmhouse door)', when: 'Ra khỏi nhà 6:00 – 8:20, ngày nắng, không phải Chủ Nhật, trừ mùa Đông.', whenEn: 'Leave the farmhouse 6am – 8:20am on a sunny day that is not Sunday and not in Winter.', note: 'Chỉ khi đã kết hôn với Leah.', noteEn: 'Only after marrying Leah.' },
    { h: 14, ids: ['3091462'], name: 'Sự kiện 14 tim (phần 2)', nameEn: '14-heart event (part 2)', where: 'Rừng Cindersap', whereEn: 'Cindersap Forest', when: 'Ngày nắng kế tiếp (hoặc ngày nắng bất kỳ sau đó), vào rừng 11:30 – 14:00.', whenEn: 'The next sunny day (or any sunny day after), enter the forest 11:30am – 2pm.' },
  ],
  Maru: [
    { h: 2, ids: ['6'], name: 'Ở tiệm mộc', nameEn: 'At the carpenter\'s', where: 'Tiệm Mộc Của Robin', whereEn: 'Carpenter\'s Shop', when: 'Vào tiệm khi Maru có ở đó.', whenEn: 'Enter while Maru is there.' },
    { h: 4, ids: ['7'], name: 'Ở phòng khám', nameEn: 'At the clinic', where: 'Phòng Khám Của Harvey', whereEn: 'Harvey\'s Clinic', when: 'Vào phòng khám khi Maru đang làm ở đó.', whenEn: 'Enter the clinic while Maru is there.' },
    { h: 6, ids: ['8'], name: 'Đêm trên núi', nameEn: 'Night on the Mountain', where: 'Khu Núi', whereEn: 'The Mountain', when: 'Ngày nắng, 21:00 – 23:40.', whenEn: 'Sunny day, 9pm – 11:40pm.' },
    { h: 8, ids: ['9'], name: 'Ở tiệm mộc', nameEn: 'At the carpenter\'s', where: 'Tiệm Mộc Của Robin', whereEn: 'Carpenter\'s Shop', when: 'Vào tiệm khi Maru có ở đó.', whenEn: 'Enter while Maru is there.' },
    { h: 10, ids: ['10'], name: 'Ở tiệm mộc', nameEn: 'At the carpenter\'s', where: 'Tiệm Mộc Của Robin', whereEn: 'Carpenter\'s Shop', when: 'Vào tiệm 9:00 – 16:00.', whenEn: 'Enter 9am – 4pm.', note: 'Phải đang hẹn hò (đã tặng Bó Hoa) mới vượt được 8 tim.', noteEn: 'You must be dating (Bouquet given) to go past 8 hearts.' },
    { h: 14, ids: ['3917666'], name: 'Sự kiện 14 tim (phần 1)', nameEn: '14-heart event (part 1)', where: 'Nhà chính', whereEn: 'Farmhouse', when: 'Vào nhà 6:10 – 17:00, không phải Chủ Nhật, trừ mùa Đông.', whenEn: 'Enter the farmhouse 6:10am – 5pm, not on Sunday, not in Winter.', note: 'Chỉ khi đã kết hôn với Maru.', noteEn: 'Only after marrying Maru.' },
    { h: 14, ids: ['5183338'], name: 'Sự kiện 14 tim (phần 2)', nameEn: '14-heart event (part 2)', where: 'Khu Núi', whereEn: 'The Mountain', when: 'Đêm hôm sau (hoặc đêm nắng kế tiếp), vào Khu Núi 22:00 – 1:00. Kết thúc sự kiện là hết ngày.', whenEn: 'The next night (or next sunny night), enter the Mountain 10pm – 1am. The day ends after the event.' },
  ],
  Penny: [
    { h: 2, ids: ['34'], name: 'Trong thị trấn', nameEn: 'In town', where: 'Thị Trấn Pelican', whereEn: 'Pelican Town', when: 'Ngày nắng, vào thị trấn 9:00 – 14:00.', whenEn: 'Sunny day, enter town 9am – 2pm.' },
    { h: 4, ids: ['35'], name: 'Ở nhà Penny', nameEn: 'At Penny\'s home', where: 'Nhà Di Động', whereEn: 'Trailer', when: 'Vào nhà khi Penny có ở nhà.', whenEn: 'Enter while Penny is home.' },
    { h: 6, ids: ['36'], name: 'Ở nhà Penny', nameEn: 'At Penny\'s home', where: 'Nhà Di Động', whereEn: 'Trailer', when: 'Vào nhà khi Penny có ở nhà.', whenEn: 'Enter while Penny is home.' },
    { h: 8, ids: ['181928'], name: 'Trong rừng', nameEn: 'In the forest', where: 'Rừng Cindersap', whereEn: 'Cindersap Forest', when: 'Ngày nắng, vào rừng 9:00 – 16:00.', whenEn: 'Sunny day, enter the forest 9am – 4pm.' },
    { h: 10, ids: ['38'], name: 'Ở nhà tắm', nameEn: 'At the bathhouse', where: 'Nhà Tắm Suối Nước Nóng (hồ tắm)', whereEn: 'Spa (pool area)', when: 'Có thư của Penny; sau khi nhận thư, vào khu hồ tắm 19:00 – 24:00.', whenEn: 'Triggered by a letter from Penny; after receiving it, enter the bathhouse pool 7pm – midnight.', note: 'Phải đang hẹn hò (đã tặng Bó Hoa) mới vượt được 8 tim.', noteEn: 'You must be dating (Bouquet given) to go past 8 hearts.' },
    { h: 14, ids: ['4325434'], name: 'Sự kiện 14 tim (phần 1)', nameEn: '14-heart event (part 1)', where: 'Nhà chính', whereEn: 'Farmhouse', when: 'Vào nhà 15:00 – 19:00 khi Penny ở nhà.', whenEn: 'Enter the farmhouse 3pm – 7pm while Penny is home.', note: 'Chỉ khi đã kết hôn với Penny.', noteEn: 'Only after marrying Penny.' },
    { h: 14, ids: ['4324303'], name: 'Sự kiện 14 tim (phần 2)', nameEn: '14-heart event (part 2)', where: 'Nhà chính', whereEn: 'Farmhouse', when: 'Nếu đồng ý ở phần 1, xảy ra khi thức dậy 3 ngày sau.', whenEn: 'If you agreed in part 1, plays when you wake up 3 days later.' },
  ],
  Sam: [
    { h: 2, ids: ['44'], name: 'Ở nhà Sam', nameEn: 'At Sam\'s house', where: 'Số 1 Đường Willow', whereEn: '1 Willow Lane', when: 'Vào nhà khi Sam có ở nhà.', whenEn: 'Enter while Sam is home.' },
    { h: 3, ids: ['733330'], name: 'Trên bãi biển', nameEn: 'At the beach', where: 'Bãi Biển', whereEn: 'The Beach', when: 'Ngày nắng, 7:00 – 15:00, trừ mùa Đông. Chỉ trong Năm 1.', whenEn: 'Sunny day, 7am – 3pm, not in Winter. Year 1 only.', note: 'Lỡ hết Năm 1 là mất sự kiện này.', noteEn: 'Missable: only in Year 1.' },
    { h: 4, ids: ['46'], name: 'Ở nhà Sam', nameEn: 'At Sam\'s house', where: 'Số 1 Đường Willow', whereEn: '1 Willow Lane', when: 'Vào nhà khi Sam có ở nhà.', whenEn: 'Enter while Sam is home.' },
    { h: 6, ids: ['45'], name: 'Trong thị trấn', nameEn: 'In town', where: 'Thị Trấn Pelican', whereEn: 'Pelican Town', when: 'Ngày không mưa, vào thị trấn 12:00 – 16:00.', whenEn: 'Day without rain, enter town noon – 4pm.' },
    { h: 8, ids: ['4081148'], name: 'Lời mời của Sam', nameEn: 'Sam\'s invitation', where: 'Nông Trại (cửa nhà chính), rồi Trạm Xe Buýt', whereEn: 'Farm (farmhouse door), then Bus Stop', when: 'Sam tới cửa nhà 6:00 – 8:00 (cần đã xem sự kiện 2 tim); sau đó tới Trạm Xe Buýt 16:00 – 19:00.', whenEn: 'Sam is at your door 6am – 8am (requires his 2-heart event); then go to the Bus Stop 4pm – 7pm.' },
    { h: 10, ids: ['233104'], name: 'Buổi tối trong thị trấn', nameEn: 'Night in town', where: 'Thị Trấn Pelican', whereEn: 'Pelican Town', when: 'Có thư của Sam; sau khi nhận thư, vào thị trấn ngày nắng 20:00 – 24:00.', whenEn: 'Triggered by a letter from Sam; after receiving it, enter town on a sunny day 8pm – midnight.', note: 'Phải đang hẹn hò (đã tặng Bó Hoa) mới vượt được 8 tim.', noteEn: 'You must be dating (Bouquet given) to go past 8 hearts.' },
    { h: 14, ids: ['3918600'], name: 'Sự kiện 14 tim (phần 1)', nameEn: '14-heart event (part 1)', where: 'Nhà chính', whereEn: 'Farmhouse', when: 'Vào nhà 6:10 – 17:00 khi Sam ở trong nhà. Nhà phải được nâng cấp ít nhất hai lần.', whenEn: 'Enter the farmhouse 6:10am – 5pm while Sam is inside. The house must be upgraded at least twice.', note: 'Chỉ khi đã kết hôn với Sam.', noteEn: 'Only after marrying Sam.' },
    { h: 14, ids: ['3918601'], name: 'Sự kiện 14 tim (phần 2)', nameEn: '14-heart event (part 2)', where: 'Nhà chính', whereEn: 'Farmhouse', when: '3 ngày sau phần 1, vào nhà 6:10 – 17:00 khi Sam ở trong nhà.', whenEn: '3 days after part 1, enter the farmhouse 6:10am – 5pm while Sam is inside.' },
    { h: 14, ids: ['3918602'], name: 'Sự kiện 14 tim (phần 3)', nameEn: '14-heart event (part 3)', where: 'Nhà chính', whereEn: 'Farmhouse', when: '3 ngày sau phần 2, vào nhà 6:10 – 17:00 khi Sam ở trong nhà.', whenEn: '3 days after part 2, enter the farmhouse 6:10am – 5pm while Sam is inside.' },
    { h: 14, ids: ['3918603'], name: 'Sự kiện 14 tim (phần 4)', nameEn: '14-heart event (part 4)', where: 'Nhà chính', whereEn: 'Farmhouse', when: '4 ngày sau phần 3, vào nhà 6:10 – 17:00 khi Sam ở trong nhà.', whenEn: '4 days after part 3, enter the farmhouse 6:10am – 5pm while Sam is inside.' },
  ],
  Sebastian: [
    { h: 2, ids: ['2794460'], name: 'Trong phòng Sebastian', nameEn: 'In Sebastian\'s room', where: 'Tiệm Mộc Của Robin (phòng dưới tầng hầm)', whereEn: 'Carpenter\'s Shop (basement room)', when: 'Vào phòng khi Sebastian có ở đó.', whenEn: 'Enter his room while he is there.' },
    { h: 4, ids: ['384883'], name: 'Ở Khu Núi', nameEn: 'At the Mountain', where: 'Khu Núi', whereEn: 'The Mountain', when: 'Tới Khu Núi 11:00 – 17:00.', whenEn: 'Go to the Mountain 11am – 5pm.' },
    { h: 6, ids: ['27'], name: 'Trong phòng Sebastian', nameEn: 'In Sebastian\'s room', where: 'Tiệm Mộc Của Robin (phòng dưới tầng hầm)', whereEn: 'Carpenter\'s Shop (basement room)', when: 'Vào phòng khi Sebastian có ở đó.', whenEn: 'Enter his room while he is there.' },
    { h: 8, ids: ['29'], name: 'Trên bãi biển', nameEn: 'At the beach', where: 'Bãi Biển', whereEn: 'The Beach', when: 'Ngày mưa, 12:00 – 23:00.', whenEn: 'Rainy day, noon – 11pm.' },
    { h: 10, ids: ['384882'], name: 'Đêm trên núi', nameEn: 'Night on the Mountain', where: 'Khu Núi', whereEn: 'The Mountain', when: 'Tới Khu Núi 20:00 – 24:00.', whenEn: 'Go to the Mountain 8pm – midnight.', note: 'Phải đang hẹn hò (đã tặng Bó Hoa) mới vượt được 8 tim.', noteEn: 'You must be dating (Bouquet given) to go past 8 hearts.' },
    { h: 14, ids: ['9333219'], name: 'Sự kiện 14 tim (phần 1)', nameEn: '14-heart event (part 1)', where: 'Khu Núi', whereEn: 'The Mountain', when: 'Ngày mưa, tới Khu Núi 6:00 – 19:00.', whenEn: 'Rainy day, go to the Mountain 6am – 7pm.', note: 'Chỉ khi đã kết hôn với Sebastian.', noteEn: 'Only after marrying Sebastian.' },
    { h: 14, ids: ['9333220'], name: 'Sự kiện 14 tim (phần 2)', nameEn: '14-heart event (part 2)', where: 'Nhà chính', whereEn: 'Farmhouse', when: 'Ngày hôm sau, vào nhà 6:20 – 19:00.', whenEn: 'The next day, enter the farmhouse 6:20am – 7pm.' },
  ],
  Shane: [
    { h: 2, ids: ['611944'], name: 'Bên bến gỗ', nameEn: 'At the dock', where: 'Rừng Cindersap', whereEn: 'Cindersap Forest', when: 'Vào rừng 20:00 – 24:00.', whenEn: 'Enter the forest 8pm – midnight.' },
    { h: 4, ids: ['3910674'], name: 'Ở trang trại Marnie', nameEn: 'At Marnie\'s Ranch', where: 'Trang Trại Của Marnie', whereEn: 'Marnie\'s Ranch', when: 'Vào trang trại, giờ nào cũng được.', whenEn: 'Enter the ranch at any time.' },
    { h: 6, ids: ['3910975'], name: 'Ngày mưa trong rừng', nameEn: 'Rainy day in the forest', where: 'Rừng Cindersap', whereEn: 'Cindersap Forest', when: 'Ngày mưa hoặc bão, vào rừng 9:00 – 20:00.', whenEn: 'Rainy or stormy day, enter the forest 9am – 8pm.' },
    { h: 7, ids: ['3910974'], name: 'Ghé thăm sau sự kiện 6 tim', nameEn: 'Follow-up visit', where: 'Trang Trại Của Marnie', whereEn: 'Marnie\'s Ranch', when: 'Sau sự kiện 6 tim, vào trang trại khi Shane ở nhà.', whenEn: 'After his 6-heart event, enter the ranch while Shane is home.' },
    { h: 7, ids: ['831125'], name: 'Cùng Emily và Clint', nameEn: 'With Emily and Clint', where: 'Thị Trấn Pelican', whereEn: 'Pelican Town', when: 'Ngày nắng, vào thị trấn 10:00 – 16:00. Cần thêm 2 tim với cả Emily và Clint.', whenEn: 'Sunny day, enter town 10am – 4pm. Also needs 2 hearts with both Emily and Clint.' },
    { h: 8, ids: ['3900074'], name: 'Ở trang trại Marnie', nameEn: 'At Marnie\'s Ranch', where: 'Trang Trại Của Marnie', whereEn: 'Marnie\'s Ranch', when: 'Vào trang trại khi Shane ở nhà. Cần đã xem cảnh ghé thăm sau sự kiện 6 tim.', whenEn: 'Enter the ranch while Shane is home. Requires the follow-up visit after his 6-heart event.' },
    { h: 10, ids: ['9581348'], name: 'Lời mời của Shane', nameEn: 'Shane\'s invitation', where: 'Nông Trại (cửa nhà chính), rồi Trạm Xe Buýt', whereEn: 'Farm (farmhouse door), then Bus Stop', when: 'Ra khỏi nhà trước 6:30 để bắt đầu, rồi tới Trạm Xe Buýt 16:00 – 18:00.', whenEn: 'Leave the farmhouse before 6:30am to start it, then go to the Bus Stop 4pm – 6pm.', note: 'Phải đang hẹn hò (đã tặng Bó Hoa) mới vượt được 8 tim.', noteEn: 'You must be dating (Bouquet given) to go past 8 hearts.' },
    { h: 14, ids: ['3917584'], name: 'Sự kiện 14 tim (phần 1)', nameEn: '14-heart event (part 1)', where: 'Thị Trấn Pelican', whereEn: 'Pelican Town', when: 'Vào thị trấn 8:00 – 17:00, không phải Thứ Sáu.', whenEn: 'Enter town 8am – 5pm on any day but Friday.', note: 'Chỉ khi đã kết hôn với Shane.', noteEn: 'Only after marrying Shane.' },
    { h: 14, ids: ['3917585'], name: 'Sự kiện 14 tim (phần 2)', nameEn: '14-heart event (part 2)', where: 'Thị Trấn Pelican', whereEn: 'Pelican Town', when: 'Ngày hôm sau, vào thị trấn giờ nào cũng được.', whenEn: 'The next day, enter town at any time.' },
    { h: 14, ids: ['3917586'], name: 'Sự kiện 14 tim (phần 3)', nameEn: '14-heart event (part 3)', where: 'Thị Trấn Pelican', whereEn: 'Pelican Town', when: 'Ngày hôm sau nữa, vào thị trấn giờ nào cũng được.', whenEn: 'The day after that, enter town at any time.' },
  ],
  Caroline: [
    { h: 2, ids: ['719926'], name: 'Trong phòng kính', nameEn: 'In the sunroom', where: 'Tiệm Tạp Hoá Pierre (phòng kính của Caroline)', whereEn: 'Pierre\'s General Store (Caroline\'s sunroom)', when: 'Vào phòng kính qua cửa trong bếp, 9:00 – 17:00, ngày không mưa. Cần 2 tim mới được vào phòng.', whenEn: 'Enter the sunroom through the kitchen door, 9am – 5pm, on a day without rain. You need 2 hearts to be let into the room.' },
    { h: 6, ids: ['17'], name: 'Mẹ và con gái', nameEn: 'Mother and daughter', where: 'Tiệm Tạp Hoá Pierre', whereEn: 'Pierre\'s General Store', when: 'Vào tiệm khi cả Caroline và Abigail đều ở đó.', whenEn: 'Enter while both Caroline and Abigail are there.' },
  ],
  Clint: [
    { h: 3, ids: ['97'], name: 'Ở quán rượu', nameEn: 'At the Saloon', where: 'Quán Rượu Stardrop', whereEn: 'The Stardrop Saloon', when: 'Thứ Hai, vào quán 19:00 – 23:00.', whenEn: 'Monday, enter the Saloon 7pm – 11pm.' },
    { h: 6, ids: ['101'], name: 'Trong thị trấn', nameEn: 'In town', where: 'Thị Trấn Pelican (đi vào từ Rừng Cindersap)', whereEn: 'Pelican Town (from Cindersap Forest)', when: 'Đi từ Rừng Cindersap vào thị trấn 9:00 – 18:30. Cần đã xem sự kiện 3 tim.', whenEn: 'Enter town from Cindersap Forest 9am – 6:30pm. Requires his 3-heart event.', note: 'Không xảy ra nếu đã cưới Emily hoặc đã xem sự kiện 8 tim hay 10 tim của Emily.', noteEn: 'Won\'t trigger if you married Emily or have seen her 8- or 10-heart event.' },
  ],
  Demetrius: [
    { h: 6, ids: ['25'], name: 'Ở nhà Demetrius', nameEn: 'At Demetrius\' home', where: 'Tiệm Mộc Của Robin', whereEn: 'Carpenter\'s Shop', when: 'Vào nhà khi cả Demetrius và Robin đều ở trong.', whenEn: 'Enter while both Demetrius and Robin are inside.' },
  ],
  Dwarf: [
    { h: 0, ids: ['691039'], name: 'Dwarf và Krobus', nameEn: 'Dwarf and Krobus', where: 'Cống Ngầm', whereEn: 'The Sewers', when: 'Có ít nhất 50 điểm thân thiết với Dwarf, đã mua Sao Sa từ Krobus, rồi vào Cống Ngầm.', whenEn: 'Have at least 50 friendship points with the Dwarf and have bought the Stardrop from Krobus, then enter the Sewers.' },
  ],
  Evelyn: [
    { h: 4, ids: ['19'], name: 'Ở nhà Evelyn', nameEn: 'At Evelyn\'s home', where: 'Số 1 Đường Ven Sông', whereEn: '1 River Road', when: 'Vào nhà khi Evelyn có ở nhà.', whenEn: 'Enter while Evelyn is home.' },
  ],
  George: [
    { h: 6, ids: ['18'], name: 'Ở nhà George', nameEn: 'At George\'s home', where: 'Số 1 Đường Ven Sông', whereEn: '1 River Road', when: 'Vào nhà khi George có ở nhà.', whenEn: 'Enter while George is home.' },
  ],
  Gus: [
    { h: 4, ids: ['96'], name: 'Ở quán rượu', nameEn: 'At the Saloon', where: 'Quán Rượu Stardrop', whereEn: 'The Stardrop Saloon', when: 'Vào quán trong giờ mở cửa khi Gus có ở đó. Cần thêm 2 tim với Pam.', whenEn: 'Enter during open hours while Gus is there. Also needs 2 hearts with Pam.' },
    { h: 5, ids: ['980558'], name: 'Gus ghé nông trại', nameEn: 'Gus visits', where: 'Nông Trại (cửa nhà chính)', whereEn: 'Farm (farmhouse door)', when: 'Ra khỏi nhà 6:00 – 11:30, ngày không mưa.', whenEn: 'Leave the farmhouse 6am – 11:30am on a day without rain.' },
  ],
  Jas: [
    { h: 8, ids: ['3910979'], name: 'Jas và Vincent', nameEn: 'Jas and Vincent', where: 'Rừng Cindersap', whereEn: 'Cindersap Forest', when: 'Ngày nắng mùa Xuân, vào rừng 6:00 – 17:00. Cần 8 tim với cả Jas và Vincent.', whenEn: 'Sunny Spring day, enter the forest 6am – 5pm. Needs 8 hearts with both Jas and Vincent.', note: 'Sự kiện chung với Vincent (cùng một id).', noteEn: 'Shared with Vincent (same id).' },
  ],
  Jodi: [
    { h: 4, ids: ['94', '95'], name: 'Jodi ghé nông trại', nameEn: 'Jodi visits', where: 'Nông Trại (cửa nhà chính)', whereEn: 'Farm (farmhouse door)', when: 'Thứ Hai, ra khỏi nhà 6:00 – 9:30.', whenEn: 'Monday, leave the farmhouse 6am – 9:30am.', note: 'Có hai phiên bản (trước và sau khi Kent về nhà từ Năm 2); xem một trong hai là đủ.', noteEn: 'There are two versions (before and after Kent comes home in Year 2); either one counts.' },
  ],
  Kent: [
    { h: 3, ids: ['100'], name: 'Ở nhà Kent', nameEn: 'At Kent\'s home', where: 'Số 1 Đường Willow', whereEn: '1 Willow Lane', when: 'Vào nhà khi cả Kent và Jodi đều ở nhà.', whenEn: 'Enter while both Kent and Jodi are home.', note: 'Kent chỉ xuất hiện từ Năm 2.', noteEn: 'Kent only arrives in Year 2.' },
  ],
  Krobus: [
    { h: 14, ids: ['7771191'], name: 'Sự kiện 14 tim', nameEn: '14-heart event', where: 'Bãi Biển', whereEn: 'The Beach', when: 'Vào bãi biển 20:00 – 1:00, ngày không mưa.', whenEn: 'Enter the beach 8pm – 1am on a day without rain.', note: 'Chỉ khi Krobus đã dọn về ở cùng (bạn cùng nhà).', noteEn: 'Only after Krobus moves in as your roommate.' },
  ],
  Lewis: [
    { h: 6, ids: ['639373'], name: 'Lewis và Marnie', nameEn: 'Lewis and Marnie', where: 'Thị Trấn Pelican', whereEn: 'Pelican Town', when: 'Ngày nắng, vào thị trấn 19:00 – 23:00. Cần 6 tim với cả Lewis và Marnie.', whenEn: 'Sunny day, enter town 7pm – 11pm. Needs 6 hearts with both Lewis and Marnie.', note: 'Sự kiện chung với Marnie (cùng một id).', noteEn: 'Shared with Marnie (same id).' },
  ],
  Linus: [
    { h: 0, ids: ['502969'], name: 'Buổi tối trong thị trấn', nameEn: 'Evening in town', where: 'Thị Trấn Pelican', whereEn: 'Pelican Town', when: 'Có ít nhất 50 điểm thân thiết với Linus, vào thị trấn 20:00 – 24:00, ngày không mưa. Không sớm hơn ngày 7 mùa Xuân Năm 1.', whenEn: 'Have at least 50 friendship points with Linus, enter town 8pm – midnight on a day without rain. Not before Spring 7, Year 1.' },
    { h: 4, ids: ['26'], name: 'Bên lều Linus', nameEn: 'By Linus\' tent', where: 'Khu Núi (gần Lều Của Linus)', whereEn: 'The Mountain (near Linus\' tent)', when: 'Tới gần lều 20:00 – 24:00, ngày không mưa.', whenEn: 'Go near his tent 8pm – midnight on a day without rain.' },
    { h: 8, ids: ['371652'], name: 'Ở tiệm mộc', nameEn: 'At the carpenter\'s', where: 'Tiệm Mộc Của Robin (bước ra ngoài)', whereEn: 'Carpenter\'s Shop (when leaving)', when: 'Bước ra khỏi tiệm mộc 9:00 – 17:00, ngày không mưa.', whenEn: 'Leave Robin\'s house 9am – 5pm on a day without rain.' },
  ],
  Marnie: [
    { h: 6, ids: ['639373'], name: 'Lewis và Marnie', nameEn: 'Lewis and Marnie', where: 'Thị Trấn Pelican', whereEn: 'Pelican Town', when: 'Ngày nắng, vào thị trấn 19:00 – 23:00. Cần 6 tim với cả Marnie và Lewis.', whenEn: 'Sunny day, enter town 7pm – 11pm. Needs 6 hearts with both Marnie and Lewis.', note: 'Sự kiện chung với Lewis (cùng một id).', noteEn: 'Shared with Lewis (same id).' },
  ],
  Pam: [
    { h: 9, ids: ['503180'], name: 'Nhà mới của Pam', nameEn: 'Pam\'s new house', where: 'Nhà Di Động Của Pam', whereEn: 'Pam\'s house', when: 'Mua "Nâng cấp cộng đồng" (nhà cho Pam) ở Tiệm Mộc Của Robin; ít nhất 4 ngày sau khi hoàn thành, vào nhà Pam.', whenEn: 'Buy the Community Upgrade (Pam\'s house) at the Carpenter\'s Shop; at least 4 days after it is finished, enter Pam\'s house.' },
  ],
  Pierre: [
    { h: 6, ids: ['16'], name: 'Ở tiệm Pierre', nameEn: 'At Pierre\'s', where: 'Tiệm Tạp Hoá Pierre', whereEn: 'Pierre\'s General Store', when: 'Vào tiệm.', whenEn: 'Enter the store.' },
  ],
  Robin: [
    { h: 6, ids: ['33'], name: 'Ở nhà Robin', nameEn: 'At Robin\'s home', where: 'Tiệm Mộc Của Robin', whereEn: 'Carpenter\'s Shop', when: 'Vào nhà khi Robin có ở nhà.', whenEn: 'Enter while Robin is home.' },
  ],
  Vincent: [
    { h: 8, ids: ['3910979'], name: 'Jas và Vincent', nameEn: 'Jas and Vincent', where: 'Rừng Cindersap', whereEn: 'Cindersap Forest', when: 'Ngày nắng mùa Xuân, vào rừng 6:00 – 17:00. Cần 8 tim với cả Vincent và Jas.', whenEn: 'Sunny Spring day, enter the forest 6am – 5pm. Needs 8 hearts with both Vincent and Jas.', note: 'Sự kiện chung với Jas (cùng một id).', noteEn: 'Shared with Jas (same id).' },
  ],
  Willy: [
    { h: 6, ids: ['711130'], name: 'Trên bãi biển', nameEn: 'At the beach', where: 'Bãi Biển', whereEn: 'The Beach', when: 'Vào bãi biển 6:00 – 17:10.', whenEn: 'Enter the beach 6am – 5:10pm.' },
  ],
  Leo: [
    { h: 0, ids: ['1039573'], name: 'Làm quen với Leo', nameEn: 'Meeting Leo', where: 'Đông Đảo Gừng (lều của Leo)', whereEn: 'Island East (Leo\'s hut)', when: 'Lần đầu tới Đảo Gừng: đi theo Leo vào rừng rậm phía đông tới lều của cậu ấy.', whenEn: 'On your first trip to Ginger Island, follow Leo into the eastern jungle to his hut.' },
    { h: 2, ids: ['6497423'], name: 'Ở Tây Đảo Gừng', nameEn: 'Island West', where: 'Tây Đảo Gừng', whereEn: 'Island West', when: 'Ngày nắng, 6:00 – 18:00.', whenEn: 'Sunny day, 6am – 6pm.' },
    { h: 4, ids: ['6497421'], name: 'Ở Bắc Đảo Gừng', nameEn: 'Island North', where: 'Bắc Đảo Gừng', whereEn: 'Island North', when: 'Ngày nắng, 6:00 – 18:00. Chỉ khi Leo chưa chuyển về thung lũng.', whenEn: 'Sunny day, 6am – 6pm. Only while Leo hasn\'t moved to the Valley yet.' },
    { h: 6, ids: ['6497428'], name: 'Ở Nam Đảo Gừng', nameEn: 'Island South', where: 'Nam Đảo Gừng', whereEn: 'Island South', when: 'Ngày nắng, 6:00 – 18:00.', whenEn: 'Sunny day, 6am – 6pm.' },
    { h: 9, ids: ['8959199'], name: 'Ở Khu Núi', nameEn: 'At the Mountain', where: 'Khu Núi', whereEn: 'The Mountain', when: 'Ngày không mưa, 6:00 – 19:00 (sau khi Leo đã chuyển về thung lũng).', whenEn: 'Day without rain, 6am – 7pm (after Leo has moved to the Valley).' },
  ],
};
