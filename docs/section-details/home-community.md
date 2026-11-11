# Spec: home.community

> Trách nhiệm của file này: khối tiêu đề Community (eyebrow, H2, hai đoạn mô tả, CTA, cụm hình trang trí). Bốn thẻ nhóm nằm ở `home-features-projects.md`.

| | |
|---|---|
| Section ID | `home.community` |
| Trạng thái layout | `ĐÃ DỰNG 1920` (chưa có frame 1440) |
| Trạng thái copy | `PENDING` (D-21: đoạn mô tả lặp hai bên) |
| Liên quan | `MOTION.md` mục 4, `ASSETS.md` (`deco.community-shapes`, `deco.crosshair`) |

## 1. Mục tiêu

Mời người xem tham gia cộng đồng. Đây là lời kêu gọi hành động thứ hai của trang, sau hero.

## 2. Bố cục (ước lượng từ thiết kế 1920)

Căn giữa, chia ba cột trên cùng một dòng, rồi H2 lớn ở giữa, rồi CTA.

| Vùng | Vị trí ước lượng | Nội dung |
|---|---|---|
| Cụm hình trái | Khoảng 1–5% chiều rộng, cùng dòng trên | Tròn xanh, vuông đỏ, tam giác vàng |
| Eyebrow | Giữa, khoảng 40% đến 60% | "COMMUNITY FOR YOUNG CREATIVE" |
| H2 | Giữa, khoảng 25% đến 75% | "GIA NHẬP" (nhỏ, dòng 1), "CỘNG ĐỒNG" (lớn, dòng 2) |
| Đoạn trái | Khoảng 1–20% | Đoạn mô tả, căn trái |
| Đoạn phải | Khoảng 80–99% | Đoạn mô tả, căn trái |
| Crosshair | Khoảng 1% và 96%, dưới đoạn mô tả | Hai icon thập |
| CTA | Giữa, dưới H2 | "Kết nối ngay" |

Cụm hình trái và phải là hai nhóm đối xứng. Số cụ thể `[ĐO-G0]`.

## 3. DOM

| # | Phần tử |
|---|---|
| 1 | `section` với `aria-labelledby` trỏ tới H2 |
| 2 | `p` eyebrow |
| 3 | `h2` với hai `span` |
| 4 | Hai `p` mô tả |
| 5 | CTA `a` |
| 6 | Cụm hình trang trí, `aria-hidden` |

## 4. Copy key

| Key | Copy | Trạng thái |
|---|---|---|
| `home.community.eyebrow` | COMMUNITY FOR YOUNG CREATIVE | `proposed` (D-02, nhãn tiếng Anh) |
| `home.community.h2.small` | GIA NHẬP | `proposed` |
| `home.community.h2.large` | CỘNG ĐỒNG | `proposed` |
| `home.community.left` | Khám phá không gian làm việc, những dự án chớm nở và cách tụi mình định nghĩa sáng tạo | `pending` (D-21) |
| `home.community.right` | Khám phá không gian làm việc, những dự án chớm nở và cách tụi mình định nghĩa sáng tạo | `pending` (D-21) |
| `home.community.cta` | Kết nối ngay | `final` |

Ghi chú: hai đoạn trùng nhau hoàn toàn. Thiết kế có thể dự định mô tả hai góc nhìn khác nhau. Chờ xác nhận (D-21). Không tự viết đoạn thay thế.

Ghi chú về chữ hoa: CTA ở đây viết "Kết Nối Ngay" trong thiết kế. Theo `DESIGN_SYSTEM.md` mục 5.3, chữ lưu là câu thường, viết hoa bằng CSS, nên hiển thị giống các CTA khác.

## 5. Chuyển động

- Eyebrow và H2 reveal theo dòng: `MOTION.md` mục 4.
- Đoạn mô tả fade.
- CTA: `MOTION.md` mục 6.
- Crosshair: không chuyển động.

## 6. Asset

| ID | Dùng cho | Trạng thái |
|---|---|---|
| `deco.community-shapes` | Cụm hình hai bên | `TODO(asset)` |
| `deco.crosshair` | Hai icon dưới đoạn mô tả | `TODO(asset)` |

## 7. Quyết định chặn

| ID | Chặn |
|---|---|
| D-21 | Hai đoạn mô tả |
| D-02 | Eyebrow tiếng Anh hay Việt |
| G0 | Vị trí |

## 8. Tiêu chí nghiệm thu

- [ ] H2 có một `h2`, hai dòng khác cỡ.
- [ ] Cụm hình trang trí `aria-hidden`.
- [ ] CTA `a` có `href`.
- [ ] Không chữ cứng.

## 9. Nhật ký

| Ngày | Thay đổi |
|---|---|
| 2026-11-10 | Tạo spec từ thiết kế 1920 |

## Triển khai (2026-11-11)

Code: `js/sections/home-community.js`, `css/sections/home-community.css`, token trong `css/tokens.css` (khối "Sections home.usp, home.hashtag, home.community"). Đối chiếu frame 1920: chiều cao section khớp (USP 1368, hashtag 480, community 1245). 1440: `TODO(figma 1440)`, hiện co theo `--u1920`. Dưới 1280: xếp dọc [ĐỀ XUẤT].

Thẻ nhóm: hover lift 8px (MOTION.md mục 8), chưa là liên kết (D-13). Đoạn mô tả bên phải là `aria-hidden` (D-21).
