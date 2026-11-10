# Spec: home.hashtag

> Trách nhiệm của file này: dải hashtag cuộn hai hàng xen lẫn hình trang trí. Nội dung ở `js/content/home.js`.

| | |
|---|---|
| Section ID | `home.hashtag` |
| Trạng thái layout | `CHỜ G0` |
| Trạng thái copy | `PENDING` (D-22: chờ xác nhận dấu) |
| Liên quan | `MOTION.md` mục 7, `COMPONENTS.md` mục 3.5 |

## 1. Mục tiêu

Tạo nhịp chuyển tiếp giữa phần mission và Community. Hashtag gợi ý cách người dùng gắn tên mình với văn hóa. Đây là section trang trí có chữ.

## 2. Bố cục (ước lượng từ thiết kế 1920)

Hai hàng pill, chạy ngang toàn chiều rộng, tràn mép hai bên.

**Hàng 1 (trên):** từ trái sang phải:
1. Vòng tròn đôi (`deco.hashtag-ring`), nền xanh `primary`.
2. Pill viền `primary`: "#SANGNGUOITAOTAO" kèm dấu thập hai bên.
3. Ngôi sao bốn cánh vàng (`deco.hashtag-star`), tròn.
4. Dấu cộng đỏ, tròn.
5. Pill viền `sky`: "#DNAVIETLENSONG" kèm dấu thập.
6. Pill viền `orange`: "#KHONGANKHONGNGU" kèm dấu thập.

**Hàng 2 (dưới):** lệch so với hàng 1, từ trái sang phải:
1. Pill viền `primary`: "#VANHOAKHONGRUTPHICH" (cắt mép trái).
2. Ngôi sao vàng, tròn.
3. Pill viền `orange`: "#TIENLENVIETNAM" kèm dấu thập.
4. Vòng tròn đôi, nền `primary`.
5. Pill viền `sky`: "#ANNENLAMRA" (cắt mép phải).

Chiều cao mỗi pill: `[ĐO-G0]`. Viền dày khoảng 4–6px, `[ĐO-G0]`. Chữ trong pill cỡ `label`, viết hoa qua CSS.

## 3. DOM

| # | Phần tử |
|---|---|
| 1 | `section` `aria-label` là chủ đề hashtag |
| 2 | Hai vùng cuộn `div`, `aria-hidden="true"` |
| 3 | `ul.sr-only` chứa mọi hashtag, đọc được một lần |

Hashtag chỉ đọc qua danh sách ẩn để tránh lặp khi screen reader đọc vùng cuộn.

## 4. Copy key

| Key | Copy | Trạng thái |
|---|---|---|
| `home.hashtag.rows[0]` | SANGNGUOITAOTAO, DNAVIETLENSONG, KHONGANKHONGNGU | `pending` (D-22) |
| `home.hashtag.rows[1]` | VANHOAKHONGRUTPHICH, TIENLENVIETNAM, ANNENLAMRA | `pending` (D-22) |
| `home.hashtag.prefix` | # | `final` |

Ghi chú: hashtag không dấu theo thiết kế. Nếu muốn có dấu, cần đổi trong copy và xác nhận cách hiển thị trong pill.

## 5. Chuyển động

- Hai hàng chạy ngược chiều, lặp vô hạn. Tốc độ `marquee.speedPxPerSec`.
- Hover một hàng: hàng dừng. Chi tiết `MOTION.md` mục 7.
- Reduced motion: hàng đứng yên, cho cuộn ngang bằng tay.

## 6. Asset

| ID | Dùng cho | Trạng thái |
|---|---|---|
| `deco.hashtag-ring` | Vòng tròn đôi, hai vị trí | `TODO(asset)` |
| `deco.hashtag-star` | Sao vàng, hai vị trí | `TODO(asset)` |
| `deco.crosshair` | Dấu thập trong pill | `TODO(asset)` |

## 7. Quyết định chặn

| ID | Chặn |
|---|---|
| D-22 | Dấu tiếng Việt và nội dung hashtag |
| D-03 | Pill có bo tròn hoàn toàn |
| Asset | Ba nhóm graphic trang trí |

## 8. Tiêu chí nghiệm thu

- [ ] Hai hàng có màu viền đúng: `primary`, `sky`, `orange`.
- [ ] Vùng cuộn `aria-hidden`, danh sách ẩn có đủ sáu hashtag.
- [ ] Không có lỗi khi tab ẩn rồi hiện.
- [ ] Reduced motion không chạy.
- [ ] Không dùng `left` để animate.

## 9. Nhật ký

| Ngày | Thay đổi |
|---|---|
| 2026-11-10 | Tạo spec từ thiết kế 1920 |
