# Spec: home.usp

> Trách nhiệm của file này: section USP sau showcase. Tuyên bố định vị kèm hai đoạn mô tả và CTA. Chữ ở `js/content/home.js`.

| | |
|---|---|
| Section ID | `home.usp` |
| Trạng thái layout | `ĐÃ DỰNG 1920` (chưa có frame 1440) |
| Trạng thái copy | `PENDING` (H2 chờ D-01, D-17) |
| Liên quan | `BRAND.md` mục 6 (USP), `ASSETS.md` (`deco.usp-badge`) |

## 1. Mục tiêu

Nêu ba giá trị khác biệt bằng một câu tuyên bố lớn, rồi hai đoạn mô tả ngắn. Đây là điểm thuyết phục đầu tiên của trang.

## 2. Bố cục (ước lượng từ thiết kế 1920)

| Vùng | Vị trí ước lượng | Nội dung |
|---|---|---|
| Badge trái | Khoảng 1–13% chiều rộng, trên | Hai icon logo mark nhỏ, cùng cỡ |
| H2 | Từ khoảng 26% đến 93%, trên giữa | Tuyên bố lớn, nhiều dòng |
| Đoạn trái | Khoảng 26–48%, dưới H2 | Mô tả |
| Đoạn phải | Khoảng 75–98%, dưới H2 | Mô tả |
| CTA | Khoảng 26%, dưới đoạn trái | "Xem thêm" |

H2 gồm: "LƯU LOAD" (đậm), phần ngoặc nhỏ hơn, rồi "CHO VĂN HÓA ĐƯƠNG ĐẠI." Phần trong ngoặc xếp hai dòng nhỏ, căn trái.

Số cụ thể: `[ĐO-G0]`.

## 3. DOM

| # | Phần tử |
|---|---|
| 1 | `section` với `aria-labelledby` |
| 2 | `h2` với `<span>` cho từng dòng. Phần ngoặc là `<span class="aside">` |
| 3 | Hai `p` mô tả, trong `div` cột |
| 4 | CTA `a` "Xem thêm" |
| 5 | Badge, `aria-hidden="true"` |

## 4. Copy key

| Key | Copy hiện tại | Trạng thái |
|---|---|---|
| `home.usp.h2.main` | LƯU LOAD | `proposed` (D-17 viết hoa) |
| `home.usp.h2.aside` | AI LOAD LÊN ĐỀU LÀ NGƯỜI ĐẸP | `pending` (cần xác nhận câu chơi chữ, D-01) |
| `home.usp.h2.tail` | CHO VĂN HÓA ĐƯƠNG ĐẠI. | `proposed` |
| `home.usp.left` | Vươn tầm khu vực bằng bản sắc văn hóa bản địa kết hợp tư duy toàn cầu. | `proposed` |
| `home.usp.right` | Kết nối cộng đồng Creatives thông qua các chiến dịch nghệ thuật đột phá. | `proposed` |
| `home.usp.cta` | Xem thêm | `pending` (route chưa có) |

Ghi chú:
- Câu trong ngoặc ("AI LOAD LÊN ĐỀU LÀ NGƯỜI ĐẸP") là câu chơi chữ từ chữ "Load", có thể giữ, nhưng cần xác nhận với người viết vì nó nằm ở vị trí H2.
- "Creatives" ở đoạn phải là tiếng Anh, giữ theo thiết kế. Đồng bộ với D-02 khi chốt.

## 5. Chuyển động

- H2 reveal theo dòng: `MOTION.md` mục 4. Phần ngoặc reveal cùng dòng đầu tiên.
- Đoạn mô tả fade khi vào viewport.
- CTA: `MOTION.md` mục 6 (dùng biến thể `ui.button-cta`, tone `accent`).

## 6. Asset

| ID | Dùng cho | Trạng thái |
|---|---|---|
| `deco.usp-badge` (hai icon logo mark) | Badge trái | `TODO(asset)` |

## 7. Quyết định chặn

| ID | Chặn |
|---|---|
| D-01 | Câu chơi chữ và định vị trong H2 |
| D-17 | Viết tên trong H2 |
| G0 | Vị trí và cỡ |

## 8. Tiêu chí nghiệm thu

- [ ] H2 có một `h2`, các dòng là `span`.
- [ ] Hai đoạn mô tả có chiều dài đọc được (60–70 ký tự mỗi dòng).
- [ ] Badge `aria-hidden`.
- [ ] Không chữ cứng trong HTML.

## 10. Khối 2: Tầm nhìn, Sứ mệnh, Giá trị

Khối này nằm trong `home.usp`, sau hai đoạn mô tả. Không có spec riêng. Nội dung lấy từ `js/content/brand.js`, không chép tay.

| Mục | Nội dung |
|---|---|
| Bố cục | Ba cột bằng nhau, chạm mép trái, mép phải và nhau. Mỗi cột gồm thanh tiêu đề, hình tròn, mô tả |
| Thanh tiêu đề | Cột 1 `primary`, cột 2 `accent`, cột 3 `red`. Chữ dùng `on-*` tương ứng |
| Hình tròn | Cột 1: vòng `primary`, tâm `accent`. Cột 2: vòng `red`, tâm `primary`. Cột 3: vòng `accent`, tâm `primary` |
| Nhãn | (01) TẦM NHÌN, (02) SỨ MỆNH, (03) GIÁ TRỊ CỐT LÕI |
| Nội dung | `brand.vision`, `brand.mission` (ba mục), `brand.values` (bốn giá trị) |
| Mô tả panel | `TODO(content)`, trạng thái `pending` |
| DOM | Ba `article`. Hình tròn `aria-hidden`. Mission là `ol`, giá trị là `ul` |
| Chuyển động | Hình tròn scale từ `mission.circleFrom` về 1 khi vào viewport. Không hover (`MOTION.md` mục 9) |

Tiêu chí riêng của khối:
- [ ] Thứ tự thanh là `primary`, `accent`, `red`.
- [ ] Ba hình tròn đúng tổ hợp màu.
- [ ] Nội dung lấy từ `brand.js`.

## 9. Nhật ký

| Ngày | Thay đổi |
|---|---|
| 2026-11-10 | Tạo spec từ thiết kế 1920. Gộp khối Tầm nhìn–Sứ mệnh–Giá trị vào mục 10 (bỏ `home-mission.md`) |

## Triển khai (2026-11-11)

Code: `js/sections/home-usp.js`, `css/sections/home-usp.css`, token trong `css/tokens.css` (khối "Sections home.usp, home.hashtag, home.community"). Đối chiếu frame 1920: chiều cao section khớp (USP 1368, hashtag 480, community 1245). 1440: `TODO(figma 1440)`, hiện co theo `--u1920`. Dưới 1280: xếp dọc [ĐỀ XUẤT].
