# Cẩm Nang Stardew Valley (Tiếng Việt)

Trang tra cứu tĩnh cho Stardew Valley 1.6: công thức chế biến, từ điển vật phẩm, dân làng và lịch trình NPC, hướng dẫn nhiệm vụ, kế hoạch nguyên liệu và theo dõi tiến độ. Toàn bộ dữ liệu được lưu trong trình duyệt bằng localStorage; không có backend.

## Chạy

```bash
npm install
npm run dev   # http://localhost:3000
```

Trang dùng ES modules nên phải mở qua HTTP, không mở trực tiếp `index.html` bằng `file://`.

## Cấu trúc

```
index.html            Khung trang, toolbar, các modal tĩnh
css/style.css         Hệ thiết kế pixel (token ở :root)
js/main.js            Điểm khởi động
js/app.js             Controller: tab, tìm kiếm, bộ lọc, event delegation
js/lib/               storage, audio, particles, ui (toast/modal), templates
js/tabs/              Mỗi tab một module: recipes, items, npcs, quests, planner, tracker
data/*.js             Dữ liệu công thức, vật phẩm, NPC + lịch sự kiện, nhiệm vụ
assets/icons/         Icon vật phẩm (48x48 PNG từ Official Wiki)
assets/portraits/     Chân dung NPC
```

### Thêm hành vi mới

Markup gọi hành động bằng `data-action="ten-hanh-dong"` cùng các `data-*` đi kèm. Mỗi module tab khai báo các hành động nó xử lý trong `actions`; `app.js` chỉ có một listener cho mỗi loại sự kiện và chuyển tiếp tới đó. Không dùng `onclick`, `onerror` hay `style=` trong markup: ảnh lỗi khai báo cách xử lý qua `data-fallback`.

### Trình mô phỏng NPC

Thứ tự ưu tiên lịch trình (`js/tabs/npcs.js`): lễ hội của thị trấn > ngày mưa > lịch theo thứ > lịch ngày nắng. Lễ hội có `"passive": true` trong `CALENDAR_EVENTS` (Trout Derby, SquidFest, Night Market) không thay đổi lịch của dân làng. Mùa Đông có tuyết thay cho mưa, và ngày lễ hội luôn nắng. Lịch trình trong dữ liệu là bản rút gọn, nên vị trí chỉ mang tính tham khảo.

## Nguồn dữ liệu

Số liệu (giá bán, năng lượng, sở thích quà, sinh nhật) được đối chiếu với [Official Stardew Valley Wiki](https://stardewvalleywiki.com/). Stardew Valley là tài sản của ConcernedApe.
