// ==========================================================================
// STARDEW VALLEY WIKI - NÂNG CẤP CỘNG ĐỒNG (COMMUNITY UPGRADES)
// Robin's two town upgrades, bought at the Carpenter's Shop after the
// Community Center (or Joja). From the Official Stardew Valley Wiki pages
// "Carpenter's Shop" > Community Upgrades and "Trailer", version 1.6.
// Pictures: Official Stardew Valley Wiki.
// ==========================================================================

const A = 'assets/community/';

export const COMMUNITY_UPGRADES = [
  {
    id: 'pam', flag: 'pamHouseUpgrade', name: 'Nâng cấp Cộng đồng lần 1: Nhà mới cho Pam', nameEn: "First Community Upgrade: Pam's new house",
    gold: 500000, items: [['Wood', 950]], days: 3,
    builds: 'Robin dỡ chiếc xe moóc (Trailer) của Pam và xây một ngôi nhà mới cho Pam và Penny (Penny chỉ ở đó nếu bạn không cưới cô ấy). Trên bản đồ, "Trailer" đổi thành "2 River Road".',
    buildsEn: 'Robin replaces Pam\'s Trailer with a new house for Pam and Penny (Penny only lives there if you have not married her). On the map, "Trailer" becomes "2 River Road".',
    notes: [
      ['Xây xong, lần đầu vào thị trấn từ Trạm xe buýt, Rừng Cindersap hoặc Núi sẽ có đoạn phim: bạn chọn nói cho Pam biết ai trả tiền hoặc giấu tên. Chọn cách nào thì tình bạn với Pam cũng tăng 4 tim.',
        'Once built, entering town from the Bus Stop, Cindersap Forest or the Mountain plays a cutscene: tell Pam who paid or stay anonymous. Either way Pam gains 4 hearts.'],
      ['Demetrius, Evelyn, George, Gus, Jodi, Lewis, Pam, Penny, Robin và Shane có lời thoại mới về ngôi nhà, khác nhau tùy bạn có giấu tên hay không.',
        'Demetrius, Evelyn, George, Gus, Jodi, Lewis, Pam, Penny, Robin and Shane get new lines about the house, depending on whether you stayed anonymous.'],
      ['Lưu ý: đồ đặt trong xe moóc cũ sẽ mất vĩnh viễn khi xây xong.', 'Note: anything placed inside the old trailer is lost for good once it is done.'],
      ['Chơi co-op: chỉ chủ nông trại (host) mua được.', 'Co-op: only the host can buy it.']
    ],
    pics: [[`${A}trailer.png`, 'Xe moóc cũ', 'The old trailer'], [`${A}trailer_large.png`, 'Nhà mới', 'The new house'], [`${A}trailer_large_interior.png`, 'Bên trong nhà mới', 'Inside the new house']]
  },
  {
    id: 'shortcuts', flag: 'communityUpgradeShortcuts', name: 'Nâng cấp Cộng đồng lần 2: Đường tắt quanh thung lũng', nameEn: 'Second Community Upgrade: Town shortcuts',
    gold: 300000, items: [], days: 3, after: 'pam',
    builds: 'Robin mở 6 lối tắt để đi lại trong thung lũng nhanh hơn.',
    buildsEn: 'Robin opens 6 shortcuts to get around the valley faster.',
    shortcuts: [
      ['Rừng Cindersap (cạnh nhà Leah) tới Bãi biển: đường dọc mép nước, đi ngựa được. Đây là lối duy nhất tới bãi biển (không dịch chuyển) khi thị trấn đang dựng lễ hội.',
        "Cindersap Forest (by Leah's cottage) to the Beach: a path along the water, fine on horseback. It is the only non-warp way to the beach while town is setting up a festival.", 'leah_beach'],
      ['Núi (tây nam cây cầu mỏ đá) tới Thị trấn (phía bắc JojaMart): đường ven sông, quá hẹp cho ngựa.',
        'The Mountain (southwest of the quarry bridge) to Town (north of JojaMart): a riverside path too narrow for a horse.', 'mountain_town'],
      ['Núi (dọc hàng rào phía đông tiệm Robin) tới Thị trấn (bắc JojaMart, bên kia sông): đường ven sông, quá hẹp cho ngựa.',
        "The Mountain (along the fence east of Robin's shop) to Town (north of JojaMart, across the river): a riverside path too narrow for a horse.", null],
      ['Thị trấn (phía nam Bảo tàng) tới Bãi biển (giữa các cây ở vũng thủy triều): lối nhỏ khuất trong bụi cây, không đi ngựa được. Đi được cả khi chưa sửa cây cầu ở bãi biển.',
        "Town (south of the Museum) to the Beach (between the tide pool trees): a narrow path hidden in the bushes, not passable on horseback. Works even before the beach bridge is fixed.", 'library_beach'],
      ['Trạm xe buýt (cạnh đường hầm) lên Rừng Sau (Backwoods): một dãy bậc thang, đi ngựa được.', 'The Bus Stop (by the tunnel) up to the Backwoods: a flight of steps, fine on horseback.', 'busstop'],
      ['Hòn đảo trên hồ ở Núi tới phía nam Hội Mạo Hiểm: cây cầu ván, quá hẹp cho ngựa.', "The island in the Mountain lake to south of the Adventurer's Guild: a plank bridge too narrow for a horse.", 'mountain_plank']
    ],
    notes: [['Mở sau khi Nâng cấp Cộng đồng lần 1 xây xong. Chơi co-op: chỉ chủ nông trại mua được.', 'Opens once the first Community Upgrade is finished. Co-op: only the host can buy it.']]
  }
];

export const COMMUNITY_NEEDS = {
  text: 'Mua ở quầy của Robin (Tiệm Thợ Mộc) khi đã: hoàn thành Nhà Cộng Đồng (hoặc mua hết dự án Joja) và nâng cấp nhà ở nông trại tối đa (lần 3, có hầm rượu).',
  textEn: "Bought at Robin's counter (Carpenter's Shop) once you have finished the Community Center (or every Joja project) and fully upgraded the farmhouse (third upgrade, with the cellar)."
};
