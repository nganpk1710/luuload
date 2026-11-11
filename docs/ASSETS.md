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
| `deco.gallery-bg` | Nền khung gallery project, 1101×900, `images/features-projects/gallery-background.png` (nguồn: `Assets/Graphic Element/for 1920px/Gallery projects scroll_background.png`) | `home.features-projects` | Có bản 1920. `TODO(asset)` bản 1440 |

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


## Asset section USP, hashtag, community (2026-11-11)

Nguồn: `Assets/Graphic Element/for 1920px/`. SVG giữ nguyên, không sửa màu (D-16). Chữ trong SVG panel đã outline, alt lấy từ `js/content/home.js`.

| ID | File | Dùng ở | Ghi chú |
|---|---|---|---|
| `usp.vision` / `usp.mission` / `usp.core-value` | `images/usp/vision.svg`, `mission.svg`, `core-value.svg` (640×654) | `home.usp` | TODO(figma): SVG Vision ghi "tầm nhín", cần xác nhận |
| `usp.badge-blue` / `usp.badge-red` | `images/usp/badge-blue.svg`, `badge-red.svg` (73×71) | `home.usp` | |
| `hashtag.circles-blue` / `star-yellow` / `plus-red` | `images/hashtag/*.svg` (144×144) | `home.hashtag` | Gồm cả nền tròn |
| `deco.crosshair` | `images/hashtag/crosshair.svg` (36×36) | `home.hashtag`, `home.community` | Thay cho `TODO(asset)` cũ |
| `community.shapes` | `images/community/shapes.svg` (218×58) | `home.community` | Cụm phải (Figma 2227:567) chưa có file, dùng lại file này, TODO(figma) |
| `community.group.*` | `images/community/art-craft.svg`, `life-flavor.svg`, `flow-sacred.svg`, `architecture-landscape.svg` (441×520) | `home.community` | Tên nhóm nằm trong SVG |
| (không dùng) | `hastag/#*.png` | | Pill dựng bằng CSS (chữ thật, marquee cần pill nguyên vẹn; PNG bị cắt) |

## Asset preloader (2026-11-11)

Nguồn: `preloader.zip` người dùng gửi. Bộ SVG 64×64, mỗi mốc 4 khung, dùng trong `home.preloader`.

| ID | File | Mốc |
|---|---|---|
| `preloader.line-30.01..04` | `images/preloader/line-30-01.svg` đến `line-30-04.svg` | 30% |
| `preloader.line-60.01..04` | `images/preloader/line-60-01.svg` đến `line-60-04.svg` | 60% |
| `preloader.line-100.01..04` | `images/preloader/line-100-01.svg` đến `line-100-04.svg` | 100% |

Kích thước gốc: 64×64, riêng `line-100-03` 64×63 và `line-100-04` 64×65 (lệch 1px, giữ nguyên). Màu trong SVG chưa đối chiếu với token (D-16).

### Bổ sung preloader (2026-11-11, lần 2)

Nguồn: `Assets/preloader.rar` (người dùng tải lên GitHub). Bộ `Line 30/60/100` trùng byte với file đã có trong `images/preloader/`.

| ID | File | Ghi chú |
|---|---|---|
| `brand.logo-lockup` | `images/brand/logo-lockup.svg` (214×35) | Từ `preloader/Design/Logo.svg`, khớp node Logo của frame 2357:1661. Khác `Assets/Logo/Logo.svg` (173×42, logo header) |
| `preloader.background` | `images/preloader/background.webp` (1920×900) | Ảnh người dùng gửi trong chat (nền xanh đã gộp texture node 2357:1662), chuyển WebP |
| (không dùng) | `Design/*.png`, `Preloader_Final Design.png` | Ảnh đối chiếu. `Loading.png` trong rar bị hỏng (0 byte khi giải nén) |

## Asset Last CTA, footer (2026-11-11)

Nguồn: `Assets/Graphic Element/for 1920px/Last CTA/`, `.../footer/`.

| ID | File | Ghi chú |
|---|---|---|
| `last-cta.people-working` | `images/last-cta/people-working.webp` (472×328) | Từ PNG, WebP chất lượng 88 |
| `last-cta.young-people` | `images/last-cta/young-people.webp` (374×277) | Từ PNG, WebP chất lượng 88 |
| `last-cta.label-creativity` / `label-connection` | `images/last-cta/label-*.svg` (158×41) | Chữ đã outline, màu xanh lá `#24FC7D` chỉ có trong SVG |
| `last-cta.stripes`, `last-cta.star-*` | TODO(figma) | Node 2155:1473, 2155:1484, 2155:1486. Chưa có file |
| `footer.lockup` | `images/footer/shape-footer.svg` (917×442) | Biểu tượng, chữ "Lưu Load", khối màu. Màu `#07009F` khác primary `#0800B2` (D-16) |
| `footer.back-to-top` | `images/footer/back-to-top.svg` (99×99) | |
| `brand.logo-lockup` | `images/brand/logo-lockup.svg` | Dùng thêm cho biểu tượng logo header (cắt bằng CSS) |
