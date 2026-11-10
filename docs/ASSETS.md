# Lưu Load: Asset Registry

> Trách nhiệm của file này: liệt kê mọi logo, graphic, ảnh được phép dùng, file tương ứng, nơi dùng, màu, trạng thái. Claude chỉ dùng asset có trong file này.

## 1. Quy tắc

- Mỗi asset có ID duy nhất. Tên file khớp cột "File".
- `pending` không đưa vào build production.
- Kích thước intrinsic là kích thước xuất từ Figma, dùng để tính tỉ lệ. Vị trí thật trong frame chờ G0.
- Màu cố định trong SVG là màu xuất ra. Đổi màu bằng CSS chỉ khi cột "Màu" ghi `currentColor`.
- Thiếu file: dừng và báo. Không thay bằng placeholder.

## 2. Logo

| ID | File | Dùng ở | Trạng thái |
|---|---|---|---|
| `logo.lockup.ink` | `images/graphics/logo-lockup-ink.svg` | Header, nền sáng | `TODO(asset)` |
| `logo.lockup.paper` | `images/graphics/logo-lockup-paper.svg` | Footer, nền đậm | `TODO(asset)` |
| `logo.mark.ink` | `images/graphics/logo-mark-ink.svg` | Icon nhỏ, favicon | `TODO(asset)` |

Logo là SVG đã outline chữ. Logo mark (hình người trong khối vàng) có ở header và USP. Cần xuất riêng.

## 3. Graphic: khối hình học (đã có file)

| ID | File | Kích thước | Thành phần | Màu trong file | Dùng ở | Trạng thái |
|---|---|---|---|---|---|---|
| `deco.big-blue` | `images/graphics/deco-big-blue.svg` | 433 × 421 | Khối xanh, tròn vàng, trụ vàng | `#0800B2`, `#FFEF00` | `home.hero` | `CHỜ` (D-16, G0) |
| `deco.blue-small` | `images/graphics/deco-blue-small.svg` | 241 × 211 | Khối xanh | `#0800B2` | `home.hero` | `CHỜ` (G0) |
| `deco.mint-middle` | `images/graphics/deco-mint-middle.svg` | 242 × 211 | Khối mint, tròn đỏ, trụ đỏ | `#4BFFDF`, `#BA2016` | `home.hero` | `CHỜ` (D-16, G0) |
| `deco.mint-right` | `images/graphics/deco-mint-right.svg` | 242 × 211 | Khối mint | `#4BFFDF` | `home.hero` | `CHỜ` (G0) |
| `deco.red` | `images/graphics/deco-red.svg` | 242 × 211 | Khối đỏ | `#BA2016` | `home.hero` | `CHỜ` (D-16, G0) |
| `deco.yellow-left` | `images/graphics/deco-yellow-left.svg` | 243 × 211 | Khối vàng, tròn xanh, trụ xanh | `#FFEF00`, `#0800B2` | `home.hero` | `CHỜ` (D-16, G0) |
| `deco.yellow-right` | `images/graphics/deco-yellow-right.svg` | 243 × 211 | Như trên | `#FFEF00`, `#0800B2` | `home.hero` | `CHỜ` (D-16, G0) |

`docs/reference/shape-layout-sheet.svg` là sơ đồ tham chiếu, không phải asset.

## 4. Graphic: còn thiếu (cần xuất)

| ID | Mô tả | Dùng ở | Trạng thái |
|---|---|---|---|
| `deco.community-shapes` | Cụm hình tròn xanh, vuông đỏ, tam giác vàng (hai bên heading) | `home.community` | `TODO(asset)` |
| `deco.crosshair` | Icon hình chữ thập có vòng (dùng ở hashtag, community) | `home.hashtag`, `home.community` | `TODO(asset)` |
| `deco.hashtag-ring` | Vòng tròn đôi (xanh, xanh nhạt) | `home.hashtag` | `TODO(asset)` |
| `deco.hashtag-star` | Sao bốn cánh và dấu cộng (vàng, đỏ) | `home.hashtag` | `TODO(asset)` |
| `deco.card-art-01` ... `04` | Minh họa 4 thẻ nhóm văn hóa (mắt, cung, sao, hoa) | `home.features-projects` | `TODO(asset)` |
| `deco.starburst` | Hình sao nhiều cạnh, xanh nhạt | `home.last-cta` | `TODO(asset)` |
| `deco.footer-blocks` | Mosaic khối màu chân trang | `home.footer` | `TODO(asset)` |
| `deco.usp-badge` | Hai icon logo mark nhỏ cạnh USP | `home.usp` | `TODO(asset)` |
| `deco.wireframe` | Đường nét mảnh (wireframe) nền showcase | `home.showcase` | `TODO(asset)` |

## 5. Ảnh (chưa có)

| ID | Mô tả | Dùng ở | Trạng thái |
|---|---|---|---|
| `img.hero.mosaic-*` | Ảnh chân dung nằm trong mosaic hero (nếu có), ưu tiên graphic | `home.hero` | `CHỜ` (G0) |
| `img.showcase.poster` | Poster dọc sọc màu | `home.showcase` | `TODO(asset)` |
| `img.showcase.box` | Hộp mỹ phẩm (mockup) | `home.showcase` | `TODO(asset)` |
| `img.showcase.can` | Lon kim loại (mockup) | `home.showcase` | `TODO(asset)` |
| `img.showcase.card` | Thẻ/tấm hình chụp sản phẩm | `home.showcase` | `TODO(asset)` |
| `img.last-cta.people-1` | Ảnh nhóm người, góc trái | `home.last-cta` | `TODO(asset)` |
| `img.last-cta.people-2` | Ảnh làm việc, góc phải | `home.last-cta` | `TODO(asset)` |

### Ảnh project (pinned gallery, `home.features-projects`)

Nguồn: `Images/Projects Images/*.jpg`. Đã crop giữa 4:5 (`object-fit: cover` theo quyết định người dùng), xuất WebP q78 vào `images/projects/`, không phóng to (8 ảnh gốc rộng 736–1183px, thấp hơn 1200px của hướng dẫn gallery). Thứ tự ngẫu nhiên, cố định (seed 2812). Quyền sử dụng và credits: `CHỜ`.

| File | Nguồn | Kích thước |
|---|---|---|
| 01-comico-comic | comico_comic | 1080×1350 |
| 02-wake-conference | wake_conference | 736×920 |
| 03-onion-poster | onion_poster | 1200×1500 |
| 04-graphic-trend | graphic_trend | 1200×1500 |
| 05-graphic-festival | graphic_festival | 811×1014 |
| 06-hoigiong-poster | hoigiong_poster | 736×920 |
| 07-bo-vietnamese-cafe | Bo_Vietnamese_Cafe | 1200×1500 |
| 08-photrongpho-genfest | photrongpho_genfest | 736×920 |
| 09-inspiration-signstreet | inspiration_signstreet | 735×919 |
| 10-image-the-land | image_the_land | 819×1024 |
| 11-project-cadaotucngu | project_cadaotucngu | 736×920 |
| 12-poster-vanphong | poster_vanphong | 1183×1479 |
| 13-casbala-music | casbala_music | 1200×1500 |
| 14-poster-saigon2026 | poster_saigon2026 | 736×920 |

Ảnh cần credits và quyền sử dụng (`CONTENT.md` mục 5). Ảnh chưa xác nhận quyền không đưa lên repo.

## 6. Quyết định liên quan

| ID | Vấn đề | Chặn |
|---|---|---|
| D-16 | Màu vàng và đỏ trong file khác token | Mọi graphic có vàng, đỏ |
| G0 | Vị trí, tỉ lệ từng khối trong frame 1920 | Mọi graphic |

## 7. Nhật ký

| Ngày | Thay đổi |
|---|---|
| 2026-11-10 | Thêm logo, graphic còn thiếu, ảnh cần xuất, theo thiết kế trang chủ 1920 |
