# Đóng góp cho Cẩm Nang Stardew Valley

Cảm ơn bạn đã muốn cùng làm Cẩm Nang tốt hơn! Mọi đóng góp đều quý: báo một con số sai, dịch lại một tên vật phẩm cho tự nhiên hơn, hay viết cả một tính năng mới.

## Cách nhanh nhất: mở Issue

Không cần biết code. Vào tab [Issues](https://github.com/luongic/stardew-wiki/issues), bấm **New issue** và chọn mẫu phù hợp:

- **Báo sai dữ liệu**: giá bán, năng lượng, sở thích quà, lịch trình NPC, gói Nhà Cộng Đồng... Hãy kèm link trang trên [Official Stardew Valley Wiki](https://stardewvalleywiki.com/) để mình kiểm tra.
- **Đề xuất tính năng**: ý tưởng tab mới, công cụ mới, cải thiện giao diện.

## Gửi thay đổi bằng Pull Request

Bạn không push trực tiếp lên repo này được; thay vào đó:

1. Bấm **Fork** để tạo bản sao repo trong tài khoản của bạn.
2. Tạo nhánh mới, ví dụ `fix/gia-ca-hoi` hoặc `feat/tab-cay-an-qua`.
3. Sửa, chạy thử (xem bên dưới), rồi commit.
4. Mở **Pull Request** về nhánh `main` của repo này, mô tả bạn đã đổi gì và vì sao.

Mình sẽ xem, góp ý nếu cần, rồi merge.

## Chạy trang trên máy

```bash
npm install
npm run dev   # mở http://localhost:3000
```

Đừng mở `index.html` trực tiếp bằng `file://` hay dùng `python3 -m http.server` (xem lý do trong [README](README.md#chạy)).

## Quy ước

### Dữ liệu (`data/*.js`)

- **Nguồn**: mọi số liệu (giá, năng lượng, mùa, sở thích quà, vật phẩm trong gói...) phải khớp với Official Stardew Valley Wiki cho bản 1.6. Ghi link nguồn trong PR.
- **Viết lại, đừng sao chép**: mô tả và mẹo hãy tự viết bằng tiếng Việt; không dán nguyên văn từ wiki.
- **Tên**: tên tiếng Việt kèm tên gốc tiếng Anh trong trường `nameEn` (hoặc trong ngoặc với quà tặng NPC, ví dụ `"Ngọc Lục Bảo (Emerald)"`).
- **Không ăn được**: dùng `null` cho `energy`/`health`, không dùng `0`.
- **Icon**: file PNG trong `assets/icons/`, tên `snake_case` theo tên tiếng Anh. Kiểm tra đường dẫn tồn tại trước khi gửi.

### Mã nguồn

- Mỗi tab là một module trong `js/tabs/`; hành vi gắn qua `data-action` (xem [README](README.md#thêm-hành-vi-mới)).
- Không dùng `style=`, `onclick`, `onerror` trong markup; style đặt trong `css/style.css` và dùng token ở `:root`.
- Giữ phong cách pixel: không bo góc (`border-radius`), viền và bóng đổ là bội số của `--px`.
- Không dùng emoji. Mọi icon lấy từ `js/lib/icons.js`: `ico('tên')` trong JS, `<i data-icon="tên"></i>` trong HTML. Ưu tiên icon vật phẩm trong game (`assets/icons/`); ký hiệu trừu tượng dùng icon pixel 9×9 (`assets/pixel-*.svg`).
- Kiểm tra trang không có lỗi trong Console (F12) ở các tab bạn đã sửa, trên cả màn hình rộng và điện thoại.

## Bản quyền

Khi gửi đóng góp, bạn đồng ý để phần mã của mình được phát hành theo [giấy phép MIT](LICENSE) của dự án. Hình ảnh và nội dung trò chơi Stardew Valley thuộc về ConcernedApe và không nằm trong giấy phép này.
