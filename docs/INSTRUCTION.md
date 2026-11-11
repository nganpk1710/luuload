# Lưu Load: Hướng dẫn cho Claude

> Trách nhiệm của file này: đọc file nào theo việc, nguồn nào thắng khi xung đột, bảng quyết định, deliverable, quy tắc đồng bộ. Không chứa chi tiết thiết kế.

## 1. Đọc theo nhiệm vụ

| Nhiệm vụ | Đọc theo thứ tự |
|---|---|
| Sửa màu, font, khoảng cách, bo góc | `DESIGN_SYSTEM.md` → `css/tokens.css` |
| Dựng hoặc sửa một section | `docs/specs/<tên-spec>.md` → `DESIGN_SYSTEM.md` mục 6 → Figma frame → `COMPONENTS.md` → `ASSETS.md` |
| Tạo hoặc sửa component | `COMPONENTS.md` → `DESIGN_SYSTEM.md` → `TECH_STACK.md` |
| Chuyển động | `MOTION.md` → `js/config/motion.config.js` |
| Chữ, link, alt, nhãn | `js/content/*.js` → `CONTENT.md` |
| Tone viết, định vị, nhóm văn hóa | `BRAND.md` → `CONTENT.md` |
| Logo, graphic, ảnh | `ASSETS.md` |
| Cài đặt, cấu trúc thư mục, quy ước code | `TECH_STACK.md` |
| Đồng bộ với Figma | Mục 6 của file này → spec liên quan |

Không đọc toàn bộ tài liệu mỗi lần.

## 2. Thứ tự ưu tiên khi xung đột

1. **Quyết định đã chốt** trong mục 5 (`CHỐT`). Thắng mọi file.
2. **Figma frame** cho bố cục, tỉ lệ, khoảng cách hiển thị, thứ tự thị giác.
3. **Giá trị trong code:** `css/tokens.css`, `js/config/motion.config.js`, `js/content/*.js`.
4. **Các file `.md` trong `docs/`.** Mâu thuẫn với mục 1–3 thì `.md` là cũ, báo lại.
5. **Phỏng đoán của Claude: không được dùng.**

Quy tắc phụ:
- Figma khác config: không tự sửa config. Liệt kê chênh lệch, chờ xác nhận.
- Copy trong `js/content/*.js` thắng `CONTENT.md`.
- Quyết định `CHỜ` không được build như đã chốt. Dùng copy tạm, đánh dấu `pending`.

## 3. Quy tắc cứng

- Không hardcode màu, cỡ chữ, khoảng cách, thời lượng, chữ trong HTML hoặc JS. Dùng token hoặc content key.
- Không thêm màu, font, khoảng cách ngoài token.
- Không shadow, gradient, glassmorphism.
- Không tạo token mới trước khi có trong Figma Variables, rồi `tokens.css`, rồi `DESIGN_SYSTEM.md`.
- Section ID có tiền tố trang. Ví dụ `home.hero`, `home.last-cta`.
- Frame Figma trống thì breakpoint đó không được gọi là "đã đối chiếu".
- Không đoán số liệu hay chữ. Thiếu thì ghi `TODO(figma)` hoặc `TODO(content)`.
- Không dùng ES module, bước build, `fetch` đọc file cục bộ (xem `TECH_STACK.md` mục 2).
- Đổi code thì cập nhật docs trong cùng lượt.

## 4. Quy trình dựng một section

| Bước | Việc | Đầu ra |
|---|---|---|
| 1 | Đọc file theo mục 1 | Nắm quy tắc |
| 2 | Gate Figma: `get_design_context`, `get_screenshot` ở 1920 và 1440. Thêm `get_variable_defs` nếu nghi token đổi | Thông số, ảnh đối chiếu |
| 3 | Báo khoảng trống: token, component, asset, copy, quyết định thiếu | Danh sách để người dùng quyết |
| 4 | Dừng nếu có quyết định chặn layout hoặc asset thiếu | Không code phần bị chặn |
| 5 | Code layout bằng copy tạm. Chữ từ `js/content/`, chuyển động từ `motion.config.js`, ảnh từ `ASSETS.md` | File trong `css/` và `js/` |
| 6 | Đối chiếu từng mốc, liệt kê chênh lệch cụ thể | Báo cáo |
| 7 | Cập nhật spec, `COMPONENTS.md`, `ASSETS.md`, changelog | Docs khớp code |

## 5. Bảng quyết định

| ID | Câu hỏi | Mặc định đang dùng | Trạng thái | Chặn |
|---|---|---|---|---|
| D-01 | Định vị: cộng đồng hay studio/agency | Cộng đồng (`BRAND.md` mục 7) | `CHỜ` | H1, tagline hero, mô tả USP (copy) |
| D-02 | Ngôn ngữ nav, nhãn UI | Nav và CTA tiếng Việt. Nhãn thương hiệu cố định tiếng Anh | `ĐỀ XUẤT` | Copy header, footer |
| D-03 | Pill cho CTA, nav chip, hashtag | Pill. Thiết kế đang dùng pill ở mọi CTA và chip, nên `DESIGN_SYSTEM.md` cần khớp | `ĐỀ XUẤT` (Figma đã dùng pill) | Button, nav, hashtag |
| D-04 | Mốc breakpoint | 4 mốc: ≥1440, 1024–1439, 768–1023, <768. Xác nhận 1920 ở G0 | `ĐỀ XUẤT` | Layout toàn site |
| D-05 | Cỡ chữ tối thiểu | 14px | `ĐỀ XUẤT` | Typography |
| D-06 | Stack | HTML, CSS, JS thuần, không build | `CHỐT` | Setup |
| D-07 | Text strip hero | Thiết kế còn placeholder "CULTURE LOADED / READY TO DEPLOY". Giữ khung, chờ text | `CHỜ` | Copy strip |
| D-08 | Category links hero | Giữ, chờ quyết định | `CHỜ` | Copy và route |
| D-09 | Nhãn CTA | "Kết nối ngay" (thiết kế khớp) | `CHỐT` | — |
| D-10 | Thời lượng hover CTA | 1000ms, đánh giá trên thiết bị thật | `CHỐT`, đánh giá lại | Motion |
| D-11 | Giấy phép Vina Vịt Lộn và Aeonik, glyph tiếng Việt | Chưa kiểm tra | `CHỜ` | Font |
| D-12 | Định dạng số bước | `01`, `02`, `03` | `ĐỀ XUẤT` | Hero steps |
| D-13 | Route `/categories/*` | Chưa xác nhận | `CHỜ` | Link nhóm văn hóa |
| D-14 | Nạp GSAP, Smooothy | GSAP 3.12.5 + ScrollTrigger qua CDN pin version, chỉ cho pinned gallery (home.features-projects). Smooothy không nạp | `CHỐT` (GSAP, 2026-11-10) | Thư viện |
| D-15 | DialKit | Chỉ khi có `?tune`, không production | `ĐỀ XUẤT` | Công cụ tinh chỉnh |
| D-16 | Màu trong SVG khác token: vàng `#FFEF00` so với `#FFF11C`, đỏ `#BA2016` so với `#BA1616` | Chưa đổi màu. Xem `ASSETS.md` mục 4 | `CHỜ` | Mọi khối vàng và đỏ |
| D-17 | Viết tên thương hiệu: thiết kế dùng cả "LUULOAD" (header, copyright, email) và "LƯU LOAD" (footer, H2 USP) | Logo và nhãn kỹ thuật dùng LUULOAD. Văn bản dùng Lưu Load | `CHỜ` | Footer, USP, copyright |
| D-18 | Thêm 2 section ngoài danh sách 7 spec: Thành quả sáng tạo (`home-showcase`), Tầm nhìn–Sứ mệnh–Giá trị (`home-mission`) | Thêm, vì có trong thiết kế | `ĐỀ XUẤT` | Phạm vi |
| D-19 | Footer là thành phần dùng chung mọi trang | Component `blocks/footer.js`, spec giữ `home-footer.md` làm bản thiết kế gốc | `ĐỀ XUẤT` | Footer ở trang khác |
| D-20 | Features projects: frame Figma 2221:375 và 2295:339 là gallery project (tiêu đề "Thành quả sáng tạo"), không phải 4 thẻ nhóm. Trùng nội dung với `home.showcase` | Dùng 14 ảnh project làm gallery. Tên, alt tạm theo tên file. Chờ xác nhận gộp với `home-showcase` | `CHỜ` | Tên, alt, danh mục project |
| D-21 | Đoạn mô tả Community lặp ở hai bên (trái và phải cùng một câu) | Giữ theo thiết kế, chờ xác nhận có chủ đích | `CHỜ` | Copy Community |
| D-22 | Hashtag hiển thị không dấu (#SANGNGUOITAOTAO, #DNAVIETLENSONG...) | Giữ không dấu | `CHỜ` | Copy hashtag |
| D-23 | Footer cột CONNECT bị cắt "PROMOTE YOUR BRAN", email và "CREATED BY" chưa xác nhận | Chờ bản đầy đủ | `CHỜ` | Footer |

## 6. Quy tắc đồng bộ

| Tình huống | Làm gì |
|---|---|
| Figma đổi | Báo "đồng bộ [section hoặc token]". Chạy lại bước 2, so với code, liệt kê chênh lệch, rồi mới sửa |
| Token đổi trong Figma | `get_variable_defs` trên frame gốc, cập nhật `css/tokens.css`, ghi nhật ký `DESIGN_SYSTEM.md` |
| Thử nhanh trong code | Sửa config, xem kết quả. Giữ thì ghi nhật ký override và đồng bộ Figma. Bỏ thì hoàn về giá trị cũ |
| Thêm token | Figma trước, rồi `tokens.css`, rồi `DESIGN_SYSTEM.md` |
| Thêm asset | Đưa file vào `images/`, ghi `ASSETS.md`, rồi mới dùng |
| Quyết định được chốt | Cập nhật mục 5, rồi sửa spec và config liên quan trong cùng lượt |

## 7. Deliverables

**Phase 01 (bàn giao)**

| Hạng mục | Tỷ trọng | Nội dung |
|---|---|---|
| UI/UX | 60% | Website chạy thật, responsive, lên domain thật |
| Brand Identity | 30% | Graphic system, brand guideline, stationery |
| Communication | 10% | Poster, social, video giới thiệu dưới 1 phút |

**Phase 01a (code)**

- Trang: `index.html`, `projects/`, `community/`, `about/`, `contact/`, `categories/art-craft/` (chờ D-13).
- Section trang chủ: hero, showcase, usp, mission, hashtag, community, features-projects, last-cta, footer.
- Mỗi section có spec trong `docs/specs/`, có trạng thái.
- Mở `index.html` qua `file://` chạy không lỗi.
- Asset đăng ký đầy đủ trong `ASSETS.md`.

**Ngoài 01a:** Gallery nâng cao (FLIP), slider, preloader rèm, Jobs, Message, parallax.

## 8. Changelog

| Ngày | Thay đổi |
|---|---|
| 2026-11-11 | `home.features-projects`: viết lại gallery thành xoắn ốc (helix) theo Spiral Gallery thay cho trống quay. Thêm nền khung gallery. Khối `gallery` trong `motion.config.js` đổi sang `cardsPerTurn`, `gapRatio`, `pitchRatio`, `scrollFactor` |
| 2026-11-11 | `home.features-projects`: viết lại gallery thành trống quay 3D xoắn ốc, không đổi opacity (theo Drum Gallery của người dùng). Sân khấu cao 100svh, hộp nội dung co để CTA không bị cắt. Đổi khối `gallery` trong `motion.config.js` (cấu trúc mới, do chính section này thêm hôm trước) |
| 2026-11-10 | Dựng `home.features-projects` theo frame 2221:375 và 2295:339: pinned gallery GSAP, token `--fp-*`, block `gallery` trong `motion.config.js` (thêm mới, không đổi giá trị cũ), spec `home-features-projects.md`. Ngưỡng pin 1280px thay 1024px |
| 2026-11-10 | D-14 chốt: nạp GSAP 3.12.5 + ScrollTrigger (CDN) cho pinned gallery. Ảnh project: crop 4:5, WebP, thứ tự ngẫu nhiên cố định, copy tạm pending |
| 2026-11-10 | v1: bộ tài liệu, tokens, motion config, nội dung trang chủ đồng bộ từ thiết kế 1920. Thêm 2 section, D-16 đến D-23 |
