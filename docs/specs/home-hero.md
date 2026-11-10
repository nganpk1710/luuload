# Spec: home.hero

> Trách nhiệm của file này: mô tả layout, hành vi và tiêu chí nghiệm thu của Hero trang chủ. Chữ nằm trong `js/content/home.js`. Ảnh và tên file nằm trong `images/hero/`. File này không chứa chữ.

| | |
|---|---|
| Section ID | `home.hero` |
| Trang | `index.html` |
| Trạng thái layout | `G0 XONG` (2026-11-10): đã đối chiếu 1920 và 1440, chờ xác nhận. 1024, 768, 390 chưa có frame, giữ `[ĐỀ XUẤT]` |
| Trạng thái copy | `PROPOSED`: copy theo frame Figma. Còn `pending`: categories (D-08, D-13). D-01 vẫn chờ |
| Nguồn layout | Figma frame 1920 và 1440, layout reference, grid |
| Nguồn copy | `js/content/home.js`, key `home.hero.*` |
| Liên quan | `DESIGN_SYSTEM.md` mục 6, `COMPONENTS.md` mục 4.4, `MOTION.md` mục 4, 6, 8 |

## 1. Phạm vi

**Trong 01a:** layout Hero đúng frame 1920 và 1440. Mosaic khối màu và ảnh, reveal khi tải. CTA "Kết nối ngay" đúng `MOTION.md` mục 8. Header tối thiểu (logo, nav, CTA). Responsive dưới 1440 theo mốc `[ĐỀ XUẤT]`.

**Ngoài:** preloader, slider, FLIP, parallax. Chữ cuối cùng (sửa sau qua `home.js`). Nội dung strip nếu D-07 chưa có (giữ khung trống).

## 2. Gate G0: đối chiếu Figma trước khi code

Không viết CSS cho Hero trước khi G0 xong. Kết quả ghi vào mục 3.

| # | Kiểm tra | Cách làm | Đạt khi |
|---|---|---|---|
| G0.1 | Frame 1920 và 1440 đã vẽ đủ | `get_design_context`, `get_screenshot` | Có đủ mọi phần tử mục 4 |
| G0.2 | Lưới, margin, gutter | Đọc Auto Layout và Variables | Khớp `--layout-margin`, `--layout-gutter` ở 1440. Lệch thì ghi rõ |
| G0.3 | So 1920 với 1440 | Liệt kê vị trí, kích thước, cỡ chữ từng phần tử | Điền mục 3 |
| G0.4 | Quyết định mốc 1920 | Cùng cấu trúc, chỉ co giãn: dùng một quy tắc `≥1440`. Khác cấu trúc: thêm mốc `≥1920` vào `tokens.css` và `DESIGN_SYSTEM.md` | Ghi vào changelog |
| G0.5 | Frame 1024, 768, 390 | Kiểm tra đã vẽ chưa | Chưa vẽ: ghi `[ĐỀ XUẤT]`, không gọi là đã đối chiếu |
| G0.6 | Token trong frame khớp `tokens.css` | `get_variable_defs` | Không lệch. Lệch thì dừng và báo |

**Đầu ra G0:** bảng chênh lệch và quyết định G0.4. Chờ xác nhận trước khi code.

## 3. Kết quả G0

Nguồn: `get_design_context` và `get_screenshot` cho node `2221:460` (1920) và `2295:270` (1440), file ALL-IN. Đo lại trên trình duyệt bằng `getBoundingClientRect`, lệch dưới 1px ở các phần tử chính. Ngoại lệ: chip nav lệch 3px ngang ở 1920.

| Mục | Frame 1920 | Frame 1440 | Chênh lệch | Quyết định |
|---|---|---|---|---|
| H1 cỡ chữ | 140px | 100px | ×1.4 | Một quy tắc `≥1440`, nội suy tuyến tính 100 → 140, dừng ở 1920 |
| Mosaic: số khối, tọa độ | 7 khối, 1160×420.8 tại (32, 132.6) | 7 khối, 862×424 tại (32, 147) | Cột co theo bề ngang, hàng gần như không đổi (210.4 so với 212). Khối lớn đổi tỉ lệ (433×421 so với 321×424). Hình bên trong co ×1.35 | Cùng cấu trúc, một quy tắc. Nguồn SVG theo từng frame, đổi tại 1680px |
| Vị trí CTA | Nhãn 155×40 tại (1690, 37), knob 40, cách nhau 1.9 | Nhãn tự co (138)×40, knob 40, cách nhau 2 | Knob nằm ngoài nhãn, cạnh bên phải. Lệch `MOTION.md` 8.1 (knob "nằm trên khung") | Theo frame. Knob trượt sang trái lên nhãn khi mở |
| Strip trái, phải | Chữ x 33 và 588, đường kẻ 185–563, y 857 | Chữ x 32.75 và 437, đường kẻ 146–419, y 835 | Cùng cấu trúc | Tọa độ qua token |
| Margin trái, phải | 32 / 32 | 32 / 32 | Không | `--layout-margin` 32px |
| Chiều cao hero | 900 | 900 | Không | `--hero-h` |
| Header | Cao 51 tại top 32 | Cao 38 tại top 43 | Top và kích thước khác | Token nội suy |
| Cột phải | x 1287, rộng 595 | x 971, rộng 437 | Cùng cấu trúc | Token nội suy |

**Lệch so với tài liệu (Figma thắng theo `INSTRUCTION.md` mục 2, chờ xác nhận)**

| # | Tài liệu nói | Frame vẽ | Đã làm |
|---|---|---|---|
| 1 | Mosaic bên phải (sơ đồ mục 4) | Mosaic bên trái, chữ bên phải | Theo frame |
| 2 | `radius-pill` cho CTA và chip (D-03) | Hình chữ nhật bo góc: chip 6 → 9.476px, CTA 4 → 7.581px, logo 6 → 10px | Theo frame. Token `--radius-chip`, `--radius-cta`, `--radius-logo` |
| 3 | Chữ hiển thị viết hoa bằng `text-transform` | Vina Vịt Lộn tự vẽ dạng chữ hoa. Chữ gõ sentence case, "i" có chấm | Không dùng `text-transform` cho Vina. Aeonik dùng `uppercase` ở nơi frame ghi |
| 4 | Cỡ chữ tối thiểu 14px (D-05) | Step index 9px (1440) và 12px (1920), danh mục và strip 12px (1440) | Theo frame từ 1440. Dưới 1440 sàn 12px. **D-05 đang bị vi phạm bởi chính frame** |
| 5 | Step index `01`, `02`, `03` (D-12) | `(1) tìm kiếm` | Theo frame |
| 6 | Chữ tiếng Việt luôn đủ dấu | `SaiGon, Vietnam` không dấu | Theo frame |
| 7 | Knob nền `ink`, mũi tên `accent` lúc nghỉ (`MOTION.md` 8.2) | Knob nền vàng, mũi tên xanh `primary` | Theo frame lúc nghỉ. Khi mở theo `MOTION.md` (nền `paper`, mũi tên `red`) |
| 8 | Chữ CTA `ink` trên `accent` | Chữ `#090AE0` (khác `primary` `#0800B2` một bước) | Theo frame, token `--color-on-accent` |
| 9 | Tagline bản người dùng gõ dừng ở "agency" | Frame còn "where creativity meets" ở cuối | Theo frame, chờ xác nhận |

**Chưa đối chiếu được**

- `get_variable_defs` trả về rỗng ở cả hai frame. Frame chưa gắn Figma Variables, nên `css/tokens.css` được tạo mới từ giá trị thô của frame. `TODO(figma)`: gắn Variables, đồng bộ lại.
- Logo: biểu tượng "Layer_1" không tải được vào môi trường làm việc (mạng chặn host asset của Figma). Header giữ chỗ trống đúng kích thước. `TODO(figma)`: xuất `images/brand/logo-mark.svg`, điền `brand.logo.mark`.
- Mũi tên và hình tròn của CTA, mũi tên tagline, đường kẻ strip: dựng lại bằng SVG và CSS đơn giản vì không tải được asset. Màu đường kẻ lấy mẫu từ ảnh tham chiếu (#787878).

## 4. Bố cục desktop (≥1440)

Tọa độ và cỡ chữ lấy từ G0, không đoán.

```
┌──────────────────────────────────────────────────────────────┐
│ [Logo] ...................... [nav chip ×3]  [CTA][knob]     │
├────────────────────────────────────┬─────────────────────────┤
│                                    │ Meta (vị trí ... ©năm)  │
│  Mosaic 4 cột × 2 hàng             │                         │
│  (aria-hidden, chạm lề trái)       │ ( → ) Tagline 2 dòng    │
│                                    │ Step index | Danh mục   │
├────────────────────────────────────┴─────────────────────────┤
│ Dành cho      CỘNG ĐỒNG                                      │
│                          CREATIVES VIỆT NAM (lệch phải)      │
│ Strip: trái ——————— phải                                     │
└──────────────────────────────────────────────────────────────┘
```

| Vùng | Quy tắc |
|---|---|
| Lưới | 12 cột, margin và gutter theo `--layout-*` ở ≥1440 |
| Padding section | `--layout-section-pad` đầu và cuối |
| Khối màu, ảnh | Chạm mép viewport |
| Chữ, ảnh chụp | Nằm trong margin |
| H1 | Hai dòng, không xuống dòng. Dòng 2 lệch phải có chủ đích |
| Khoảng H1 và tagline | `--layout-element-gap` |

## 5. Breakpoint

| Mốc | Bố cục | Trạng thái |
|---|---|---|
| ≥1440 | Theo mục 4 | Gốc theo Figma, sau G0 |
| 1280–1439 | Như desktop, mọi kích thước co theo viewport, sàn chữ 12px | `[ĐỀ XUẤT]` |
| 768–1279 | Một cột như tablet (bố cục hai cột bị chữ nhỏ va nhau dưới 1280) | `[ĐỀ XUẤT]` |
| <768 | Một cột: eyebrow, H1, tagline, CTA, category, mosaic, strip | `[ĐỀ XUẤT]` |

**Yêu cầu mobile:** tagline và CTA nằm trong viewport 390×844 khi mở trang, không cuộn.

**Đề xuất chưa quyết:** trên mobile ẩn mosaic ở viewport đầu để H1 và CTA lên trước.

## 6. Copy

Copy nằm trong `js/content/home.js`. Bảng này chỉ liệt kê key và trạng thái.

| Key | Copy tạm | Trạng thái | Chặn |
|---|---|---|---|
| `home.hero.eyebrow` | Dành cho | `proposed` | Không |
| `home.hero.h1` | Cộng đồng / Creatives Việt Nam | `proposed` | Không (D-01 vẫn chờ) |
| `home.hero.tagline` | Where creativity meets culture for young minds creatives local brand và agency where creativity meets | `proposed` | Không (D-01 vẫn chờ) |
| `home.hero.steps` | (1) tìm kiếm, (2) kết nối, (3) sáng tạo | `proposed` | Không (D-12) |
| `home.hero.categories` | Lấy từ `brand.js` | `pending` | Release (D-08, D-13) |
| `home.hero.meta.location` | SaiGon, Vietnam | `proposed` | Không |
| `home.hero.strip` | Culture loaded / Ready to deploy | `proposed` | Không (D-07) |
| `nav.cta` | Kết nối ngay | `final` | Không (D-09) |

**Quy tắc:** dev chạy được với copy `pending`. Build production (`check-content.mjs`) chặn mọi `pending`. Layout không đổi khi copy đổi, vì khối có kích thước theo token, không theo độ dài chữ.

## 7. Thành phần

| Thành phần | ID | File |
|---|---|---|
| Header | `blocks.header` | `js/components/blocks/header.js` |
| Eyebrow | `ui.eyebrow` | `js/components/ui/eyebrow.js` |
| H1 | `ui.heading` (level 1, display) | `js/components/ui/heading.js` |
| Tagline | `ui.text` (body) | `js/components/ui/text.js` |
| Step index | `blocks.step-index` | `js/components/blocks/step-index.js` |
| Category nav | `blocks.category-nav` | `js/components/blocks/category-nav.js` |
| Meta | `blocks.meta` | `js/components/blocks/meta.js` |
| Strip | `blocks.site-strip` | `js/components/blocks/site-strip.js` |
| Mosaic | `blocks.hero-mosaic` | `js/components/blocks/hero-mosaic.js` |
| CTA | `ui.button-cta` | `js/components/ui/button-cta.js` |

## 8. Cấu trúc DOM

Thứ tự DOM là thứ tự đọc của screen reader và keyboard. CSS Grid chỉ đổi vị trí thị giác.

| # | Phần tử | Ghi chú |
|---|---|---|
| 1 | Skip link → `#main` | Đầu tiên |
| 2 | `header`: logo, `nav[aria-label="Chính"]`, CTA | |
| 3 | `main#main` | |
| 4 | Eyebrow (`<p>`) | Không phải heading |
| 5 | `<h1>` gồm hai `<span display="block">` | Một H1 duy nhất |
| 6 | Tagline | |
| 7 | Step index (`<ol>`) | |
| 8 | `nav[aria-label="Danh mục"]` | |
| 9 | Meta | |
| 10 | Strip | |
| 11 | Mosaic, `aria-hidden="true"` | Cuối DOM |

## 9. Chuyển động

| Hành vi | Tham chiếu |
|---|---|
| Trình tự khi tải | `MOTION.md` mục 4 |
| Reveal mosaic | `MOTION.md` mục 6 |
| CTA | `MOTION.md` mục 8 |
| Category link | `MOTION.md` mục 7 |

Easing dùng `LL.motion.easing`. Không trộn với bộ easing của dự án tham chiếu khác. Không có preloader, slider, FLIP hay parallax trong Hero 01a.

## 10. Truy cập

- Một `<h1>` duy nhất.
- Mosaic `aria-hidden="true"`, không focusable.
- Mũi tên trong CTA `aria-hidden="true"`.
- Hai `nav` có `aria-label` khác nhau.
- Focus-visible trên mọi link và nút. Không `outline: none`.
- Cỡ chữ tối thiểu 14px (D-05). Step index và meta không nhỏ hơn.

## 11. Quyết định

| ID | Câu hỏi | Chặn layout | Chặn copy | Chặn release | Mặc định |
|---|---|---|---|---|---|
| D-01 | Cộng đồng hay studio | Không | Có | Có | Cộng đồng |
| D-03 | Pill cho CTA và nav | Có | Không | Không | Pill |
| D-05 | Cỡ chữ tối thiểu | Có | Không | Không | 14px |
| D-06 | Stack | Có | Không | Không | HTML, CSS, JS thuần |
| D-07 | Text strip | Không | Có | Có | Khung trống |
| D-08 | Category links | Không | Có | Có | Giữ |
| D-12 | Định dạng step index | Không | Không | Không | `01`, `02`, `03` |
| D-13 | Route `/categories/*` | Không | Không | Có | `pending` |
| D-14 | Nạp GSAP, Smooothy | Không | Không | Không | Không nạp |

## 12. Tiêu chí nghiệm thu

**Layout (trước khi nhận copy)**
- [x] G0 hoàn tất, mục 3 đã điền.
- [x] Ở 1440 và 1920, vị trí và kích thước từng phần tử lệch không quá ±4px so với Figma (đo bằng `getBoundingClientRect`, 2026-11-10). Ngoại lệ chưa đo: hộp chữ của chip nav (lệch 3px theo trục ngang ở 1920 do độ rộng nhãn CTA).
- [x] Mosaic đúng số khối và tỉ lệ.
- [x] Không scroll ngang ở 1920, 1600, 1440, 1280, 390 (đã đo). 1024 và 768 chỉ xem ảnh chụp.

**Nội dung**
- [x] Mọi chữ lấy từ `home.js` (và `nav.js`, `brand.js`). Tìm chuỗi tiếng Việt trong HTML và JS của section không ra kết quả nào ngoài `home.js`.
- [x] Đúng một `<h1>`.

**Chuyển động**
- [ ] Hover CTA đúng `MOTION.md` mục 8, đảo chiều từ vị trí hiện tại.
- [ ] `prefers-reduced-motion`: không có `transform` đổi theo thời gian.
- [ ] Trên 390px, knob không che hoàn toàn chữ ở bất kỳ thời điểm nào.

**Truy cập và kỹ thuật**
- [ ] Tab order đúng mục 8.
- [ ] Focus-visible tương phản ≥ 3:1.
- [x] Mở `index.html` bằng file:// chạy, không lỗi console (Chrome headless).

## 13. Việc còn lại sau khi layout xong

| Việc | Chặn bởi |
|---|---|
| Xác nhận copy `proposed`, đổi thành `final` | D-01, D-07, D-12 |
| Đổi `pending` thành `final` | Quyết định tương ứng |
| Đối chiếu 1024, 768, 390 | Frame Figma |
| Xuất SVG logo (biểu tượng và chữ) | Figma |
| Gắn Figma Variables, đồng bộ `tokens.css` | Figma |
| Đo nút CTA trên thiết bị thật (D-10) | Thiết bị |
| Kiểm tra font và glyph tiếng Việt | D-11 |

## 14. Nhật ký

| Ngày | Thay đổi |
|---|---|
| 2026-11-10 | Tạo spec. Tách layout khỏi copy. Thêm Gate G0. Chuyển sang HTML/CSS/JS thuần |
| 2026-11-10 | Chạy G0, điền mục 3, dựng Hero. Cập nhật copy theo frame, sơ đồ mục 4 theo frame |
