# Spec: home.last-cta

> Trách nhiệm của file này: khối kêu gọi cuối trang chủ. Nền xanh đậm, H2 vàng, hai ảnh nhóm, hai tag, CTA.

| | |
|---|---|
| Section ID | `home.last-cta` |
| Trạng thái layout | `CHỜ G0` |
| Trạng thái copy | `FINAL` (H2 và CTA). Tag CONNECTION chờ xác nhận nội dung |
| Liên quan | `MOTION.md` mục 11, `ASSETS.md` mục 5 |

## 1. Mục tiêu

Kêu gọi hành động cuối cùng. Nền `primary` tạo cảm giác đậm nhất trên trang, đúng vai trò của khối chốt.

## 2. Bố cục (ước lượng từ thiết kế 1920)

Toàn chiều rộng, nền `primary`, chiều cao lớn, chứa ba lớp:

| Lớp | Vị trí ước lượng | Nội dung |
|---|---|---|
| Nền | Toàn khối | Màu `primary`, với các mảng chéo `primary` đậm hơn (`neutral` không dùng) |
| H2 | Trái, từ khoảng 4% đến 60%, dòng 1 và 2 | "SẴN SÀNG", "KẾT NỐI CÙNG" |
| H2 dòng 3 | Phải, từ khoảng 50% đến 90%, dưới | "CHÚNG TÔI" |
| Ảnh 1 | Góc trái dưới, từ khoảng 4% đến 23% | Nhóm người |
| Ảnh 2 | Góc phải trên, từ khoảng 65% đến 90% | Nhóm làm việc |
| Tag 1 | Trên ảnh 2, góc trên trái | "CONNECTION" (nền đỏ) |
| Tag 2 | Giữa dưới ảnh 1 | "CONNECTION" (nền xanh lá) |
| Starburst | Góc trên phải, lệch ra ngoài ảnh | `deco.starburst` |
| Mảnh nhỏ | Dưới trái ảnh 1 | Hình tròn nhỏ |
| CTA | Giữa dưới, căn giữa | "Kết nối ngay" |

Chữ H2 dòng 2 "KẾT NỐI CÙNG" có một phần đè lên ảnh 1. Đây là chủ đích thiết kế.

Số cụ thể `[ĐO-G0]`.

## 3. DOM

| # | Phần tử |
|---|---|
| 1 | `section` với `aria-labelledby` |
| 2 | `h2`, ba `span` display block |
| 3 | `figure` cho ảnh 1 và ảnh 2, có `alt` |
| 4 | Hai tag `span` |
| 5 | CTA `a` |
| 6 | Trang trí `aria-hidden` |

## 4. Copy key

| Key | Copy | Trạng thái |
|---|---|---|
| `home.last-cta.h2.line1` | SẴN SÀNG | `proposed` |
| `home.last-cta.h2.line2` | KẾT NỐI CÙNG | `proposed` |
| `home.last-cta.h2.line3` | CHÚNG TÔI | `proposed` |
| `home.last-cta.tags` | CONNECTION (×2) | `pending` (nội dung tag chờ xác nhận) |
| `home.last-cta.cta` | Kết nối ngay | `final` |
| `home.last-cta.images[n].alt` | `TODO(content)` | `pending` |

Ghi chú: "CONNECTION" là tiếng Anh, khác "Kết nối" ở CTA. Chờ xác nhận có giữ tiếng Anh cho tag.

## 5. Chuyển động

- H2 reveal theo dòng: `MOTION.md` mục 4.
- Hai tag xuất hiện cùng lúc: `MOTION.md` mục 11.
- Starburst xoay chậm, tắt khi reduced motion.
- Ảnh lộ dần: `MOTION.md` mục 4.
- CTA: `MOTION.md` mục 6.

## 6. Asset

| ID | Dùng cho | Trạng thái |
|---|---|---|
| `img.last-cta.people-1` | Ảnh 1 | `TODO(asset)` |
| `img.last-cta.people-2` | Ảnh 2 | `TODO(asset)` |
| `deco.starburst` | Starburst | `TODO(asset)` |

## 7. Quyết định chặn

| ID | Chặn |
|---|---|
| Asset | Hai ảnh (cần quyền sử dụng) |
| G0 | Vị trí |

## 8. Tiêu chí nghiệm thu

- [ ] H2 có một `h2`.
- [ ] Hai ảnh có `alt` mô tả.
- [ ] Trang trí `aria-hidden`.
- [ ] Chữ H2 tương phản với `primary` ≥ 4.5:1 (`accent` trên `primary` đạt 10.8:1).
- [ ] Reduced motion: starburst đứng yên.

## 9. Nhật ký

| Ngày | Thay đổi |
|---|---|
| 2026-11-10 | Tạo spec từ thiết kế 1920 |


## Triển khai (2026-11-11)

Figma 2155:1472 (1920×900, chỉ có 1920). Code: `js/sections/home-last-cta.js`, `css/sections/home-last-cta.css`, token `--lc-*`. Chữ ở `LL.content.home.lastCta`. CTA dùng `nav.cta` (D-09).

| Phần tử | Toạ độ frame 1920 |
|---|---|
| "sẵn sàng" | (192, 103), 180px vàng |
| "kết nối cùng" | (192, 315) |
| "chúng tôi" | (935, 544) |
| Ảnh people_working | (1259, 113), 472×328, bo 10 |
| Ảnh young_people | (192, 405), 374×277, bo 10, nằm trên chữ |
| Nhãn #creativity | (1062, 113), 158×41 |
| Nhãn #connection | (616, 641) |
| CTA | tâm x 960, y 780 |

- TODO(figma): nền sọc (Vector 27, node 2155:1473) và hai hình sao (2155:1484 110×114, 2155:1486 48×48) chưa có file trong `Assets/`, chưa dựng. Starburst xoay (mục 11 MOTION.md) chờ file.
- Đã kiểm tra: headless 1920×900, section cao 900, không lỗi console. Mobile 390: xếp dọc [ĐỀ XUẤT].
