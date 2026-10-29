# Cẩm Nang Stardew Valley (Tiếng Việt)

Cẩm nang tiếng Việt cho Stardew Valley 1.6+: công thức chế biến, từ điển vật phẩm, dân làng và lịch trình NPC, hướng dẫn nhiệm vụ, gói Nhà Cộng Đồng, bảo tàng, hầm mỏ, bản đồ tương tác, kế hoạch nguyên liệu và theo dõi tiến độ. Tiến độ và ghi chú được lưu trong trình duyệt; người chơi co-op có thể tạo phòng để đồng bộ với nhau qua Firebase.

**Xem trang:** https://luongic.github.io/stardew-wiki/

## Chạy

```bash
npm install
npm run dev   # http://localhost:3000
```

Trang dùng ES modules nên phải mở qua HTTP, không mở trực tiếp `index.html` bằng `file://`. Không nên dùng `python3 -m http.server`: server này chỉ giữ 5 kết nối chờ, nên khi trình duyệt tải song song hơn chục module, một vài request bị rớt và trang hiện trống. Khi đó trang sẽ hiện thông báo lỗi.

## Cấu trúc

```
index.html            Khung trang, toolbar, các modal tĩnh
css/style.css         Hệ thiết kế pixel (token ở :root)
js/main.js            Điểm khởi động
js/app.js             Controller: tab, tìm kiếm, bộ lọc, event delegation
js/lib/               storage, progress (kho tiến độ chung), icons (bảng icon), audio, particles, ui (toast/modal), templates
js/sync/              Phòng co-op: coop.js (Firebase), coop-ui.js (popup), firebase-config.js (sinh từ .env)
scripts/              gen-firebase-config.mjs
firestore.rules       Security Rules cho phòng co-op
js/tabs/              Mỗi tab một module: recipes, items, npcs, quests, bundles, museum, mines, map, planner, tracker
data/*.js             Dữ liệu công thức, vật phẩm, NPC + lịch sự kiện, nhiệm vụ, gói Nhà Cộng Đồng, bảo tàng, hầm mỏ, địa điểm và tọa độ bản đồ
assets/icons/         Icon vật phẩm (48x48 PNG từ Official Wiki)
assets/portraits/     Chân dung NPC
assets/maps/          Bản đồ gốc từ game (qua Official Wiki)
```

### Thêm hành vi mới

Markup gọi hành động bằng `data-action="ten-hanh-dong"` cùng các `data-*` đi kèm. Mỗi module tab khai báo các hành động nó xử lý trong `actions`; `app.js` chỉ có một listener cho mỗi loại sự kiện và chuyển tiếp tới đó. Không dùng `onclick`, `onerror` hay `style=` trong markup: ảnh lỗi khai báo cách xử lý qua `data-fallback`.

### Trình mô phỏng NPC

Thứ tự ưu tiên lịch trình (`js/tabs/npcs.js`): lễ hội của thị trấn > ngày mưa > lịch theo thứ > lịch ngày nắng. Lễ hội có `"passive": true` trong `CALENDAR_EVENTS` (Trout Derby, SquidFest, Night Market) không thay đổi lịch của dân làng. Mùa Đông có tuyết thay cho mưa, và ngày lễ hội luôn nắng. Lịch trình trong dữ liệu là bản rút gọn, nên vị trí chỉ mang tính tham khảo.

### Phòng Co-op

Mọi thao tác tick/bỏ tick/kế hoạch đều đi qua `js/lib/progress.js`; `js/sync/coop.js` nghe kho này và đồng bộ với Firestore khi người dùng đang ở trong phòng.

- Phòng chỉ lưu **trạng thái hiện tại của từng mục** (`{ v, t, by }`), không lưu lịch sử, nên dung lượng bị chặn ở khoảng 500 mục (~30 KB/phòng).
- Gộp theo từng mục: hai người sửa hai mục khác nhau không bao giờ ghi đè nhau. Bỏ tick ghi `v: false` thay vì xoá. Số lượng kế hoạch dùng `increment()` nên bấm +1 cùng lúc vẫn cộng đủ.
- Offline: bộ đệm IndexedDB của Firestore giữ thay đổi và tự gửi khi có mạng lại.
- Firebase SDK chỉ được tải khi người dùng mở Co-op.

**Cài đặt Firebase** (một lần):

1. Sao chép `.env.example` thành `.env`, điền cấu hình web app, rồi chạy `npm run config` để sinh `js/sync/firebase-config.js` (file này được commit vì trang không có bước build; cấu hình web của Firebase không phải bí mật).
2. Firebase Console → Authentication → Sign-in method: bật **Anonymous** (bắt buộc) và **Google** (tuỳ chọn).
3. Authentication → Settings → Authorized domains: thêm `luongic.github.io`.
4. Firestore Database → Create database (production mode).
5. Firestore → Rules: dán nội dung `firestore.rules` rồi Publish, hoặc `npx firebase-tools deploy --only firestore:rules --project <project-id>`.

**Thử trên máy với emulator** (cần Java 11+):

```bash
npm run emulators   # Auth + Firestore emulator, dùng firestore.rules của repo
npm run dev         # rồi mở http://localhost:3000/?emulator
```

Với `?emulator`, trang kết nối tới emulator thay vì project thật; mở hai trình duyệt (hoặc một cửa sổ ẩn danh) để thử hai người chơi.

## Đóng góp

Thấy số liệu sai hay có ý tưởng mới? Mở [Issue](https://github.com/luongic/stardew-wiki/issues) hoặc gửi Pull Request. Cách chạy trang, quy ước dữ liệu và quy trình gửi thay đổi có trong [CONTRIBUTING.md](CONTRIBUTING.md).

## Nguồn dữ liệu

Số liệu (giá bán, năng lượng, sở thích quà, sinh nhật) được đối chiếu với [Official Stardew Valley Wiki](https://stardewvalleywiki.com/).

Tên tiếng Việt của vật phẩm, công thức, công cụ, quái vật và gói Nhà Cộng Đồng theo bản Việt hóa [Stardew Valley Viethoa](https://www.nexusmods.com/stardewvalley/mods/8409) của **Kou & Luxanna**, dùng theo quyền "Asset use permission" của mod (được dùng nếu ghi công tác giả). Cảm ơn nhóm dịch!

## Giấy phép

Mã nguồn phát hành theo [giấy phép MIT](LICENSE). Icon vật phẩm, chân dung NPC và mọi nội dung thuộc trò chơi Stardew Valley là tài sản của ConcernedApe, không nằm trong giấy phép này. Đây là dự án của người hâm mộ, không liên kết với ConcernedApe.
