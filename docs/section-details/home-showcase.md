# Spec: home.showcase

> Trách nhiệm của file này: mô tả section "Thành quả sáng tạo" (sau hero). Chữ ở `js/content/home.js`. Ảnh mockup ở `ASSETS.md` mục 5.

| | |
|---|---|
| Section ID | `home.showcase` |
| Vị trí | Sau hero |
| Trạng thái layout | `CHỜ G0` |
| Trạng thái copy | `PENDING` (CTA chờ D-01) |
| Nguồn | Thiết kế 1920, phần "Thành quả sáng tạo" |

## 1. Mục tiêu

Cho thấy chất lượng sản phẩm sáng tạo đã được Lưu Load tiếp nhận. Đây là section đầu tiên có ảnh thật, nên là bằng chứng.

## 2. Bố cục (ước lượng từ thiết kế 1920)

| Vùng | Vị trí ước lượng | Nội dung |
|---|---|---|
| Cột trái | Từ mép trái đến khoảng 36% | H2 hai dòng, đoạn mô tả, CTA |
| Cột phải | Từ khoảng 42% đến mép phải | Cụm ảnh mockup và đường wireframe |

**Cột trái (từ trên xuống):**
- H2 hai dòng: "THÀNH QUẢ" và "SÁNG TẠO". Cỡ `h-lg` hoặc `h-md`, tone `ink`.
- Khoảng trống lớn.
- Đoạn mô tả, cỡ `body`, tối đa khoảng 60–70 ký tự mỗi dòng.
- CTA "Kết nối ngay", `button-cta`, tone `accent`, đặt dưới đoạn mô tả.

**Cột phải:**
- Bốn ảnh mockup: một poster dọc sọc màu (đứng, bên trái cụm), một hộp mỹ phẩm (giữa, cao), một lon kim loại (dưới phải), một tấm chụp (góc phải trên). Vị trí cụ thể `TODO(G0)`.
- Đường wireframe mảnh (cong, hình học) phủ phía sau ảnh. Asset `deco.wireframe`.
- Một khối đỏ nhỏ ở góc trên trái cụm (tag), chữ không đọc được ở 1920.

## 3. DOM

| # | Phần tử |
|---|---|
| 1 | `section` với `aria-labelledby` trỏ tới H2 |
| 2 | `h2` (hai `<span display="block">`) |
| 3 | `p` đoạn mô tả |
| 4 | CTA `a` |
| 5 | Cụm ảnh: `figure` cho mỗi ảnh, có `figcaption` nếu có credits |
| 6 | Wireframe SVG, `aria-hidden="true"` |

## 4. Copy key

| Key | Copy hiện tại | Trạng thái |
|---|---|---|
| `home.showcase.h2` | THÀNH QUẢ / SÁNG TẠO | `proposed` |
| `home.showcase.body` | Sáng tạo ở Việt Nam chưa bao giờ thiếu nguồn năng lượng rực rỡ và nền văn hóa bản địa vô tận. LƯU LOAD sinh ra để kết nối những biên giới sáng tạo đó, biến ý tưởng thành di sản. | `proposed` (D-17 về tên) |
| `home.showcase.cta` | Kết nối ngay | `final` |
| `home.showcase.images[n].alt` | `TODO(content)` | `pending` |
| `home.showcase.images[n].credit` | `TODO(content)` | `pending` |

Ghi chú: đoạn mô tả viết "LƯU LOAD" in hoa. Theo `CONTENT.md`, tên trong văn bản là "Lưu Load" (D-17).

## 5. Chuyển động

- Reveal H2 theo dòng: `MOTION.md` mục 4.
- Ảnh lộ dần theo nhóm: `MOTION.md` mục 10.
- Wireframe vẽ một lần: `MOTION.md` mục 10.
- CTA: `MOTION.md` mục 6.

## 6. Asset

| ID | Dùng cho | Trạng thái |
|---|---|---|
| `img.showcase.poster` | Poster dọc | `TODO(asset)` |
| `img.showcase.box` | Hộp mỹ phẩm | `TODO(asset)` |
| `img.showcase.can` | Lon kim loại | `TODO(asset)` |
| `img.showcase.card` | Tấm chụp | `TODO(asset)` |
| `deco.wireframe` | Đường nét nền | `TODO(asset)` |

## 7. Quyết định chặn

| ID | Chặn | Mặc định |
|---|---|---|
| G0 | Vị trí ảnh và cột | Không code |
| D-17 | Tên trong đoạn mô tả | Lưu Load |
| Asset | Bốn ảnh mockup | Dừng và báo, không placeholder |

## 8. Tiêu chí nghiệm thu

- [ ] Hai cột đúng tỉ lệ G0 ở 1440 và 1920.
- [ ] Bốn ảnh có `alt` hoặc đánh dấu trang trí.
- [ ] Wireframe `aria-hidden`, không ảnh hưởng tab order.
- [ ] Không có chữ cứng trong HTML.
- [ ] Ảnh có srcset.

## 9. Nhật ký

| Ngày | Thay đổi |
|---|---|
| 2026-11-10 | Tạo spec từ thiết kế 1920 (D-18) |
