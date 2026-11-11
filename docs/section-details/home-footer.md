# Spec: home.footer

> Trách nhiệm của file này: mô tả footer trang chủ. Đây là thiết kế gốc của component `footer` dùng chung (D-19). Nội dung ở `js/content/nav.js` và `js/content/home.js`.

| | |
|---|---|
| Section ID | `home.footer` (bản trang chủ). Component dùng chung: `global.footer` |
| Trạng thái layout | `CHỜ G0` |
| Trạng thái copy | `PENDING` (D-17, D-23) |
| Liên quan | `COMPONENTS.md` mục 4.2, `MOTION.md` mục 12, `ASSETS.md` (`logo.lockup.paper`, `deco.footer-blocks`) |

## 1. Mục tiêu

Điều hướng phụ, liên kết mạng xã hội, thông tin bản quyền. Footer cũng là lối thoát cuối trang.

## 2. Bố cục (ước lượng từ thiết kế 1920)

Hai hàng:

**Hàng 1: khối thương hiệu và tagline.**
- Trái (khoảng 1–20%): logo mark lớn trên một khối màu, dưới đó là wordmark "LƯU LOAD" (`logo.lockup.ink`).
- Phải (khoảng 60–90%, căn trên): tagline hai dòng "WHERE CREATIVITY / MEETS CULTURE", cỡ `h-md`.

**Hàng 2: mosaic và cột liên kết.**
- Trái (khoảng 1–50%): mosaic khối màu chân trang (`deco.footer-blocks`), các khối vàng, xanh, đỏ, ghép sát.
- Phải: ba cột liên kết ở dưới hàng, cột đầu gần giữa trang, cột sau cách đều.

**Hàng 3: thông tin pháp lý và nút lên đầu.**
- Trái dưới cột: bản quyền và email, cỡ `caption`, căn phải.
- Góc phải dưới: nút tròn mũi tên lên (scroll-to-top), màu `primary`, mũi tên `accent`.

Số cụ thể `[ĐO-G0]`.

## 3. Cột liên kết

| Tiêu đề cột | Liên kết |
|---|---|
| EXPLORE | VỀ TỤI MÌNH, CÁC DỰ ÁN, CỘNG ĐỒNG |
| CONNECT | KẾT NỐI NGAY, PROMOTE YOUR BRAN (cắt, D-23) |
| SOCIAL | FACEBOOK, INSTAGRAM, BEHANCE |

Liên kết cỡ `nav`, màu `primary`, viết hoa qua CSS.

## 4. DOM

| # | Phần tử |
|---|---|
| 1 | `footer` |
| 2 | Logo, `aria-label` "Lưu Load" |
| 3 | Tagline (`p`) |
| 4 | Ba `nav` có `aria-label` riêng: "Khám phá", "Kết nối", "Mạng xã hội" |
| 5 | Mỗi nhóm có tiêu đề `p` cỡ `label` |
| 6 | Bản quyền (`p`) |
| 7 | Scroll-to-top `button` |

## 5. Copy key

| Key | Copy | Trạng thái |
|---|---|---|
| `footer.tagline` | WHERE CREATIVITY MEETS CULTURE | `proposed` (D-02) |
| `footer.cols.explore` | Xem mục 3 | `final` |
| `footer.cols.connect` | KẾT NỐI NGAY, PROMOTE YOUR BRAN | `pending` (D-23) |
| `footer.cols.social` | FACEBOOK, INSTAGRAM, BEHANCE | `final` |
| `footer.copyright` | © {năm} LUULOAD · HELLO@LUULOAD.COM.VN | `pending` (D-17, email chưa xác nhận) |
| `footer.credit` | CREATED BY NGANKIM | `pending` (xác nhận có giữ không) |
| `footer.totop.label` | Lên đầu trang | `final` |

Ghi chú: tên trong copyright là "LUULOAD" theo thiết kế. Theo D-17, văn bản nên là "Lưu Load". Trường hợp này là logo kỹ thuật, nên có thể giữ.

## 6. Chuyển động

- Scroll-to-top hiện khi cuộn quá một viewport: `MOTION.md` mục 12.
- Các cột reveal theo nhóm: `MOTION.md` mục 4.
- Không có hover đặc biệt trên liên kết ngoài nav chung.

## 7. Truy cập

- Liên kết mạng xã hội mở tab mới, có `rel="noopener noreferrer"`, nhãn nêu rõ "mở tab mới" (`CONTENT.md` mục 6).
- Nút scroll-to-top có nhãn `aria-label`.

## 8. Quyết định chặn

| ID | Chặn |
|---|---|
| D-17 | Tên trong wordmark và copyright |
| D-19 | Footer dùng chung |
| D-23 | Cột CONNECT bị cắt, email, credit |

## 9. Tiêu chí nghiệm thu

- [ ] Ba cột đủ liên kết, đúng nhóm.
- [ ] Liên kết mạng xã hội có `rel` và nhãn mở tab mới.
- [ ] Scroll-to-top có `aria-label` và hoạt động bằng bàn phím.
- [ ] Mosaic chân trang `aria-hidden`.
- [ ] Không chữ cứng.

## 10. Nhật ký

| Ngày | Thay đổi |
|---|---|
| 2026-11-10 | Tạo spec từ thiết kế 1920 (D-19, D-23) |


## Triển khai (2026-11-11)

Figma 2155:1493 (1920×900). Footer dùng chung (D-19): `js/components/blocks/footer.js`, `css/sections/footer.css`, nội dung `js/content/footer.js`, token `--ft-*`.

| Phần tử | Toạ độ frame 1920 |
|---|---|
| Lockup + khối màu (`shape-footer.svg`) | (32, 83), 917×442 |
| "Where creativity meets culture" | (1133, 136), rộng 490, 48px |
| Cột EXPLORE / CONNECT / SOCIAL | x 32 / 347 / 662, tiêu đề y 646, danh sách y 700, 32px |
| © và email | (1133, 779), 14px |
| CREATED BY / NGANKIM | (1133, 803) / (1351, 803) |
| Nút về đầu trang | (1789, 718), 99×99, liên kết `#main` |

- D-23: "promote your bran", email và "Created by" giữ đúng thiết kế, `pending`. Mạng xã hội và "promote" chưa có đường dẫn nên hiển thị dạng chữ (TODO(content)).
- Đã kiểm tra: headless 1920×900, cao 900, không lỗi console. Mobile 390: xếp dọc [ĐỀ XUẤT].
