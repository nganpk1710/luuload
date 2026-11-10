# Spec: home.hero

> Trách nhiệm của file này: layout, hành vi, copy key, asset và tiêu chí của Hero trang chủ. Chữ nằm ở `js/content/home.js`. Asset nằm ở `ASSETS.md`.

| | |
|---|---|
| Section ID | `home.hero` |
| Trang | `index.html` |
| Vị trí | Đầu trang, sau header |
| Trạng thái layout | `CHỜ G0` |
| Trạng thái copy | `PENDING` (H1, tagline, strip chờ D-01, D-07, D-08) |
| Liên quan | `DESIGN_SYSTEM.md` mục 6, `COMPONENTS.md` mục 2–4, `MOTION.md` mục 5, 6, `ASSETS.md` mục 3 |

## 1. Mục tiêu

- Trong ba giây đầu, người xem hiểu Lưu Load là cộng đồng creatives khai thác văn hóa Việt Nam.
- Một CTA chính: "Kết nối ngay".
- Điều hướng phụ tới nhóm văn hóa.
- Hero không giải thích sản phẩm. Phần giải thích nằm ở các section sau.

## 2. Thứ tự thị giác

1. H1 hai dòng, dòng hai lệch phải.
2. Mosaic khối màu bên trái.
3. CTA "Kết nối ngay".
4. Tagline và meta bên phải.
5. Step index và category nav.
6. Eyebrow, strip.

## 3. Bố cục (desktop, ước lượng từ thiết kế 1920, chờ G0 để lấy số)

Tỉ lệ theo chiều ngang của frame 1920:

| Vùng | Vị trí ước lượng | Nội dung |
|---|---|---|
| Header | Toàn chiều rộng, trên cùng | Logo trái, nav và CTA phải |
| Mosaic | Trái, khoảng 0–62% chiều rộng, chiều cao khoảng 1/3 đầu trang | Sáu khối, lưới ghép sát, không khe hở |
| Cột phải trên | Từ khoảng 67% | Địa điểm, năm, tagline, step index, category nav |
| Eyebrow | Dưới mosaic, trái | "Dành cho" |
| H1 | Dòng 1 lệch trái khoảng 1/8 frame, dòng 2 lệch phải, kéo tới mép phải | Hai dòng, không xuống dòng |
| Strip | Dưới H1 | Đường kẻ mảnh, hai đầu chữ (placeholder, D-07) |

Số cụ thể: `[ĐO-G0]`. Không suy từ ảnh.

**Mosaic (sáu khối, thứ tự trái sang phải, trên xuống dưới):**
- Hàng trên: khối vàng có hình người (`deco.yellow-left`, `deco.big-blue`), khối vàng có trụ đỏ, khối xanh, khối mint.
- Hàng dưới: khối đỏ, khối mint có tròn và trụ đỏ, khối vàng phải.

Chi tiết vị trí từng khối là `TODO(G0)`. Asset: xem `ASSETS.md` mục 3.

## 4. DOM

| # | Phần tử | Ghi chú |
|---|---|---|
| 1 | Skip link → `#main` | Đầu tiên |
| 2 | `header` (logo, `nav[aria-label="Chính"]`, CTA) | Component `header` dùng chung |
| 3 | `main#main` | |
| 4 | Eyebrow (`<p>`) | Không heading |
| 5 | `<h1>` với hai `<span display="block">` | Một H1 duy nhất |
| 6 | Tagline (`<p>`) | |
| 7 | Step index (`<ol>`) | |
| 8 | `nav[aria-label="Danh mục"]` | |
| 9 | Meta | |
| 10 | Strip | |
| 11 | Mosaic, `aria-hidden="true"` | Cuối DOM |

Tab order theo thứ tự trên.

## 5. Thành phần

| Thành phần | ID |
|---|---|
| Header | `blocks.header` |
| Eyebrow | `ui.eyebrow` |
| H1 | `ui.heading` (level 1, display) |
| Tagline | `ui.text` (body) |
| Step index | `blocks.step-index` |
| Category nav | `blocks.category-nav` |
| Meta | `blocks.meta` |
| Strip | `blocks.site-strip` (tạm: khung trống khi pending) |
| Mosaic | Khối `deco.*` trong `section` (không có component riêng) |
| CTA | `ui.button-cta` |

## 6. Copy key

| Key | Copy hiện tại | Trạng thái | Chặn |
|---|---|---|---|
| `home.hero.eyebrow` | Dành cho | `proposed` | — |
| `home.hero.h1` | Cộng đồng / Creatives Việt Nam | `pending` | D-01 |
| `home.hero.tagline` | An independent agency and creative community connecting young minds, local brands | `pending` | D-01 (mâu thuẫn H1: "agency" và "community") |
| `home.hero.meta.location` | SAIGON, VIETNAM | `proposed` | D-02 |
| `home.hero.meta.year` | © 2026 (lấy động) | `final` | — |
| `home.hero.steps` | 01 Tìm kiếm, 02 Kết nối, 03 Sáng tạo | `proposed` | D-12 |
| `home.hero.categories` | Bốn nhóm từ `brand.js` | `pending` | D-08, D-13 |
| `home.hero.strip` | CULTURE LOADED / READY TO DEPLOY (placeholder) | `pending` | D-07 |
| `nav.cta` | Kết nối ngay | `final` | D-09 |

Ghi chú: tagline hiện tại là tiếng Anh trong thiết kế. Nếu D-02 chọn tiếng Việt, cần bản dịch trước khi chốt.

## 7. Chuyển động

- Trình tự tải: `MOTION.md` mục 5.
- CTA: `MOTION.md` mục 6.
- Mosaic reveal: `MOTION.md` mục 4.
- Category link: `MOTION.md` mục 13.

## 8. Quyết định chặn

| ID | Chặn | Mặc định nếu chưa có |
|---|---|---|
| D-01 | H1, tagline | Cộng đồng. Build bằng copy tạm |
| D-03 | CTA, nav, pill | Pill |
| D-07 | Strip | Khung trống |
| D-08 | Category nav | Giữ, route pending |
| D-16 | Khối vàng, đỏ | Giữ màu file, chờ quyết định |
| G0 | Toàn bộ layout | Không code layout trước G0 |

## 9. Tiêu chí nghiệm thu

**Layout**
- [ ] G0 hoàn tất, số liệu điền vào spec.
- [ ] 1440 và 1920: vị trí và kích thước lệch không quá ±4px so với Figma.
- [ ] Mosaic đúng sáu khối, ghép sát, không khe.
- [ ] Không scroll ngang.

**Nội dung**
- [ ] Mọi chữ lấy từ `home.js`.
- [ ] Đúng một `<h1>`.

**Chuyển động**
- [ ] Trình tự tải đúng `MOTION.md` mục 5.
- [ ] Reduced motion: không `transform` đổi theo thời gian.

**Truy cập**
- [ ] Tab order đúng mục 4.
- [ ] Focus-visible tương phản ≥ 3:1.

**Kỹ thuật**
- [ ] Mở `index.html` qua `file://` không lỗi console.
- [ ] Mọi `src` có trong `ASSETS.md`.

## 10. Việc còn lại

| Việc | Chặn bởi |
|---|---|
| Đo số liệu layout | G0 |
| Thay copy H1, tagline | D-01 |
| Thay strip | D-07 |
| Xuất đủ sáu khối mosaic (đã có) | D-16 |

## 11. Nhật ký

| Ngày | Thay đổi |
|---|---|
| 2026-11-10 | Viết lại theo thiết kế 1920. Thêm mosaic, tách copy sang `home.js` |
