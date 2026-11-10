# Lưu Load: Hướng dẫn cho Claude

> Trách nhiệm của file này: quy định nguồn nào thắng khi xung đột, đọc file nào cho việc nào, deliverable là gì. Không chứa chi tiết thiết kế.

## 1. Đọc theo nhiệm vụ

| Nhiệm vụ | Đọc theo thứ tự |
|---|---|
| Sửa màu, font, khoảng cách, bo góc | `DESIGN_SYSTEM.md` → `css/tokens.css` |
| Dựng hoặc sửa một section | `specs/home-hero.md` (hoặc spec tương ứng) → `DESIGN_SYSTEM.md` mục 6 → Figma frame → `COMPONENTS.md` |
| Tạo hoặc sửa component | `COMPONENTS.md` → `DESIGN_SYSTEM.md` → `TECH_STACK.md` |
| Chuyển động | `MOTION.md` → `js/config/motion.config.js` |
| Chữ, link, ảnh, alt | `js/content/*.js` → `CONTENT.md` |
| Tone viết, định vị, nhóm văn hóa | `BRAND.md` → `CONTENT.md` |
| Cài đặt, cấu trúc thư mục, quy ước code | `TECH_STACK.md` |
| Đồng bộ với Figma | Mục 6 của file này → spec liên quan |

Không đọc toàn bộ tài liệu mỗi lần. Chỉ đọc nhóm được liệt kê cho nhiệm vụ đó.

## 2. Thứ tự ưu tiên khi xung đột

1. **Quyết định đã chốt** trong mục 5 (trạng thái `CHỐT`). Thắng mọi file khác.
2. **Figma frame** cho bố cục, tỉ lệ, khoảng cách hiển thị, thứ tự thị giác.
3. **Giá trị trong code:** `css/tokens.css` (màu, font, khoảng cách), `js/config/motion.config.js` (chuyển động), `js/content/*.js` (chữ).
4. **Các file `.md` trong `docs/`.** Nếu mâu thuẫn với mục 1–3, coi `.md` là cũ và báo.
5. **Phỏng đoán của Claude: không được dùng.**

Quy tắc phụ:
- Figma khác config: không tự sửa config. Liệt kê chênh lệch (px, màu, font, mốc) và chờ xác nhận.
- Copy trong `js/content/*.js` thắng `CONTENT.md`.
- Quyết định `PENDING` không được build như đã chốt. Dùng copy tạm và đánh dấu `pending`.

## 3. Quy tắc cứng

- Không hardcode màu, cỡ chữ, khoảng cách, thời lượng hay chữ trong HTML/JS. Dùng token hoặc content key.
- Không thêm màu, font, khoảng cách ngoài token.
- Không dùng shadow, gradient, glassmorphism.
- Không tạo token mới trước khi có trong Figma Variables, rồi `tokens.css`, rồi `DESIGN_SYSTEM.md`.
- Mọi section ID có tiền tố trang: `home.hero`, `gallery.grid`.
- Frame Figma trống thì breakpoint đó không được gọi là "đã đối chiếu".
- Không đoán số liệu. Thiếu thì ghi `TODO(figma)` hoặc `TODO(content)`.
- Không dùng ES module, bước build hay `fetch` đọc file cục bộ (xem `TECH_STACK.md` mục 2).
- Đổi code thì cập nhật docs trong cùng lượt.

## 4. Quy trình dựng một section

| Bước | Việc | Đầu ra |
|---|---|---|
| 1 | Đọc file theo bảng mục 1 | Nắm quy tắc |
| 2 | Gate Figma: `get_design_context` và `get_screenshot` ở 1920, 1440, và các mốc đã vẽ. Thêm `get_variable_defs` nếu nghi token đổi | Thông số, ảnh đối chiếu |
| 3 | Báo khoảng trống: token, component, trạng thái, quyết định còn thiếu | Danh sách để người dùng quyết |
| 4 | Dừng nếu có quyết định chặn layout | Không code |
| 5 | Code layout trước bằng copy tạm. Chữ từ `js/content/`, chuyển động từ `motion.config.js` | File trong `css/` và `js/` |
| 6 | Đối chiếu từng mốc, liệt kê chênh lệch cụ thể (px, màu, font) | Báo cáo đối chiếu |
| 7 | Cập nhật trạng thái spec, `COMPONENTS.md`, changelog | Docs khớp code |

## 5. Bảng quyết định

| ID | Câu hỏi | Mặc định đang dùng | Trạng thái | Chặn |
|---|---|---|---|---|
| D-01 | Định vị: cộng đồng hay studio/agency | Cộng đồng (`BRAND.md` mục 7) | `CHỜ` | H1, tagline, nav (copy, không chặn layout) |
| D-02 | Ngôn ngữ nav và CTA | Tiếng Việt. Nhãn thương hiệu cố định giữ tiếng Anh | `ĐỀ XUẤT` | Copy header |
| D-03 | Pill cho CTA và nav chip | Pill. Sửa `DESIGN_SYSTEM.md` nếu từ chối | `ĐỀ XUẤT` | Button, nav |
| D-04 | Mốc breakpoint | 4 mốc: ≥1440, 1024–1439, 768–1023, <768. Xác nhận sau G0 | `ĐỀ XUẤT` | Layout toàn site |
| D-05 | Cỡ chữ tối thiểu | 14px | `ĐỀ XUẤT` | Typography |
| D-06 | Stack | HTML, CSS, JS thuần, không build | `CHỐT` | Toàn bộ setup |
| D-07 | Text strip | Chưa có. Giữ khung trống | `CHỜ` | Copy strip |
| D-08 | Giữ hay bỏ category links | Giữ | `CHỜ` | Copy và route |
| D-09 | Nhãn CTA | "Kết nối ngay" | `CHỐT` | — |
| D-10 | Thời lượng hover CTA | 1000ms. Đánh giá lại trên thiết bị thật | `CHỐT`, đánh giá lại | — |
| D-11 | Giấy phép Vina Vịt Lộn và Aeonik, glyph tiếng Việt | Chưa kiểm tra | `CHỜ` | Font loading |
| D-12 | Định dạng số bước | `01`, `02`, `03` | `ĐỀ XUẤT` | Copy step index |
| D-13 | Route `/categories/*` | Chưa xác nhận | `CHỜ` | Link category |
| D-14 | Nạp GSAP và Smooothy | Không nạp trong Phase 01a | `ĐỀ XUẤT` | Thư viện |
| D-15 | DialKit | Chỉ nạp khi có `?tune`, không nạp production | `ĐỀ XUẤT` | Công cụ tinh chỉnh |

## 6. Quy tắc đồng bộ

| Tình huống | Làm gì |
|---|---|
| Figma đổi | Người dùng báo "đồng bộ [section hoặc token]". Chạy lại bước 2, so với code, liệt kê chênh lệch, rồi mới sửa |
| Token đổi trong Figma | `get_variable_defs` trên frame gốc, cập nhật `css/tokens.css`, ghi nhật ký ở `DESIGN_SYSTEM.md` |
| Thử nhanh trong code | Sửa config, xem kết quả. Giữ thì ghi nhật ký override và đồng bộ ngược Figma. Bỏ thì hoàn về giá trị cũ |
| Thêm token mới | Figma trước, rồi `tokens.css`, rồi `DESIGN_SYSTEM.md` |
| Quyết định được chốt | Cập nhật mục 5, rồi sửa spec và config liên quan trong cùng lượt |

## 7. Deliverables

**Phase 01 (sản phẩm bàn giao)**

| Hạng mục | Tỷ trọng | Nội dung |
|---|---|---|
| UI/UX | 60% | Website chạy thật, responsive, đưa lên domain thật |
| Brand Identity | 30% | Graphic system, brand guideline, stationery |
| Communication | 10% | Poster, social, video giới thiệu dưới 1 phút |

**Phase 01a (deliverable code)**

- Các trang: `index.html`, `projects/`, `community/`, `about/`, `contact/`, `categories/art-craft/` (chờ D-13).
- Cấu trúc thư mục theo `TECH_STACK.md` mục 4.
- Spec cho mỗi section, có trạng thái.
- Mở `index.html` bằng `file://` chạy không lỗi.
- Ảnh WebP, đặt tên theo `CONTENT.md`, có alt hoặc đánh dấu trang trí.

**Ngoài Phase 01a:** Gallery nâng cao (FLIP), slider, preloader kiểu rèm, Jobs, Message. Thuộc Phase 01b hoặc Phase 02.

## 8. Changelog

| Ngày | Thay đổi |
|---|---|
| 2026-11-10 | Bộ tài liệu v1. Chuyển sang HTML/CSS/JS thuần. Layout đi trước copy. Thêm Gate Figma |
| 2026-11-10 | Dựng Hero 01a theo frame 1920 và 1440. Các lệch giữa tài liệu và frame ghi ở `specs/home-hero.md` mục 3. Chưa đổi trạng thái quyết định nào, chờ xác nhận: D-03 (frame không dùng pill), D-05 (frame có chữ nhỏ hơn 14px), D-07 (frame đã có chữ strip), D-12 (frame dùng `(1)`), D-04 (bố cục hai cột bắt đầu ở 1280, không phải 1024: dưới 1280 chữ nhỏ va nhau) |
