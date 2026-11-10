# Lưu Load: Design System

> Trách nhiệm của file này: quy tắc dùng token, vai trò màu, cặp chữ-nền, breakpoint, bo góc. Giá trị thật nằm ở `css/tokens.css`. File này không chép số liệu.

## 1. Nguyên tắc thị giác

- Khối màu phẳng, tương phản mạnh, hình học đơn giản, có dấu vết thủ công.
- Không shadow, gradient, glassmorphism. Chiều sâu đến từ chồng khối màu và lệch góc ảnh.
- Section thay phiên nhau giữa nền màu và nền sáng.
- Khoảng trống lớn là chủ đích.

## 2. Quan hệ với `tokens.css`

| File | Chứa | Không chứa |
|---|---|---|
| `css/tokens.css` | Giá trị: màu, font, cỡ, khoảng cách, bo góc, breakpoint | Quy tắc sử dụng |
| `DESIGN_SYSTEM.md` | Quy tắc, cặp chữ-nền, mốc breakpoint, nhật ký override | Số liệu lặp lại |

Nguồn của `tokens.css` là Figma Variables trong file ALL-IN. Đồng bộ bằng `get_variable_defs`.

## 3. Quy ước đặt tên token

| Nhóm | Mẫu | Ví dụ |
|---|---|---|
| Màu | `--color-{vai-trò}` | `--color-primary`, `--color-on-accent` |
| Trung tính | `--color-neutral-{50–950}` | `--color-neutral-600` |
| Font | `--font-{họ}` | `--font-display`, `--font-body` |
| Cỡ chữ | `--fs-{vai-trò}` | `--fs-h-lg` |
| Line-height | `--lh-{vai-trò}` | `--lh-display` |
| Letter-spacing | `--ls-{vai-trò}` | `--ls-display` |
| Khoảng cách | `--space-{n}` | `--space-6` (24px) |
| Layout | `--layout-{tên}` | `--layout-margin` |
| Bo góc | `--radius-{tên}` | `--radius-pill` |
| Focus | `--focus-{tên}` | `--focus-width` |

Chữ trên nền: `--color-on-{tên nền}`. Áp dụng cho mọi cặp mới.

## 4. Màu

### 4.1 Vai trò

| Token | Vai trò |
|---|---|
| `primary` | Thương hiệu, nền section, chữ nhấn |
| `accent` | Nền CTA, section bar luân phiên |
| `red` | Trạng thái hover của CTA, section bar luân phiên |
| `ink` | Chữ trên nền sáng |
| `paper` | Nền sáng |
| `sky`, `mint`, `green`, `orange` | Khối nhỏ, tag, card cộng đồng. **Không dùng làm chữ** |
| `neutral-50` đến `950` | Nền phụ, đường kẻ, chữ phụ |

### 4.2 Cặp chữ và nền

Tỉ lệ WCAG 2.1, tính từ giá trị hex. Kiểm lại bằng công cụ đo trước release.

| Cặp | Tỉ lệ | Kết quả | Ghi chú |
|---|---|---|---|
| `ink` trên `paper` | 18.3:1 | Đạt | Chữ mặc định |
| `paper` trên `primary` | 12.4:1 | Đạt | |
| `ink` trên `accent` | 16.0:1 | Đạt | Nút CTA |
| `primary` trên `accent` | 10.8:1 | Đạt | Section bar |
| `paper` trên `red` | 6.3:1 | Đạt | CTA khi hover |
| `red` trên `paper` | 6.3:1 | Đạt | |
| `neutral-600` trên `paper` | 6.6:1 | Đạt | Chữ phụ tối thiểu |
| `neutral-500` trên `paper` | 4.1:1 | **Không đạt** cho chữ | Chỉ đường kẻ, icon, placeholder |
| `accent` trên `paper` | 1.1:1 | **Cấm** | Không làm chữ trên nền sáng |
| `primary` trên `red` | 2.0:1 | **Cấm** | |

### 4.3 Quy tắc

- Mỗi khối màu có một màu. Các khối trong cùng lưới ghép sát, không khoảng cách.
- Section bar luân phiên `primary`, `accent`, `red`. Section mới tiếp tục vòng này.
- Chữ trên nền dùng `on-*` tương ứng.
- Hai lớp của một vòng tròn không cùng màu.
- Card cộng đồng ghép tối đa hai màu. Không đặt `red` cạnh `orange` trong cùng card.

### 4.4 Focus

| Ngữ cảnh | Token | Giá trị |
|---|---|---|
| Nền sáng hoặc `primary` | `--color-focus` | `primary` |
| Nền `red` hoặc nền đậm | `--color-focus-inverse` | `accent` |

Viền 2px, offset 2px. Không `outline: none` mà không có thay thế.

## 5. Typography

### 5.1 Hai họ font

| Họ | Dùng cho |
|---|---|
| **Vina Vịt Lộn** | Heading, nav, nút, chữ hiển thị lớn |
| **Aeonik** | Body, small, caption, label |

Chữ tiếng Việt có dấu phải hiển thị đúng trên cả hai font (D-11).

### 5.2 Vai trò chữ

| Vai trò | Font | Ghi chú |
|---|---|---|
| `display` | Vina Vịt Lộn | Viết hoa qua CSS, letter-spacing âm |
| `h-lg`, `h-md`, `h-sm` | Vina Vịt Lộn | Viết hoa qua CSS |
| `body` | Aeonik 500 | Đoạn dài, 60–70 ký tự mỗi dòng |
| `small` | Aeonik 400 | Mô tả phụ |
| `caption` | Aeonik 400 | Credits, metadata. Tối thiểu 14px (D-05) |
| `label` | Aeonik 400 | Nhãn, letter-spacing dương |
| `nav`, `button` | Vina Vịt Lộn | Nhãn điều hướng và nút |

### 5.3 Quy tắc

- Lưu chữ trong code dạng câu thường. Viết hoa bằng `text-transform: uppercase`.
- Line-height lấy từ token, không tính tay từ Figma.
- Cỡ chữ đổi theo breakpoint qua token. Component không tự đổi cỡ.
- Số thứ tự dùng `font-variant-numeric: tabular-nums`.

## 6. Breakpoint và layout

### 6.1 Bốn mốc

| Mốc | Khoảng | Figma frame | Trạng thái |
|---|---|---|---|
| Desktop | ≥ 1440px | 1440, 1920 | Có thiết kế. Xác nhận 1920 ở Gate G0 |
| Laptop | 1024–1439px | Chưa vẽ | `ĐỀ XUẤT` |
| Tablet | 768–1023px | Chưa vẽ | `ĐỀ XUẤT` |
| Mobile | < 768px | 390 (chưa vẽ) | `ĐỀ XUẤT` |

Giá trị từng mốc nằm trong `tokens.css`.

### 6.2 Quy tắc CSS

- Viết **mobile-first**: giá trị mặc định là mobile, mốc lớn hơn dùng `min-width`.
- Trong `@media` không dùng được `var()`. Mốc px là literal, phải khớp bảng trên.
- Cỡ chữ theo `vw` chỉ dùng trong `clamp()` có giới hạn trên và dưới.

### 6.3 Lưới và khoảng cách

| Thuộc tính | Quy tắc |
|---|---|
| Số cột | Mobile 4, Tablet 8, Laptop và Desktop 12 |
| Margin, gutter | `--layout-margin`, `--layout-gutter` theo mốc |
| Padding section | `--layout-section-pad` đầu và cuối |
| Khoảng cách giữa hai section | `2 × --layout-section-pad`. Không đặt tay |
| Khoảng cách giữa element | `--layout-element-gap` |

Khối màu và section bar chạm mép viewport. Chữ và ảnh chụp nằm trong margin.

## 7. Bo góc

| Token | Dùng cho | Trạng thái |
|---|---|---|
| `radius-none` | Container, card, khối màu, ảnh | Mặc định |
| `radius-pill` | Nút CTA, nav chip, icon tròn | `ĐỀ XUẤT` (D-03) |
| `radius-sm` | Dự phòng cho input, tag | Chưa dùng |

Nếu D-03 bị từ chối: CTA và nav chip đổi sang `radius-sm`, và sửa motion của knob (`MOTION.md` mục 8).

## 8. Quy tắc component ở mức thị giác

| Component | Quy tắc |
|---|---|
| Button CTA | Nền `accent`, chữ `on-accent`. Hover đổi sang `red`, `on-red` |
| Nav chip | Nền `neutral-100`, chữ `primary`. Hover đổi nền sang `accent` |
| Section bar | Số thứ tự bên trái, tiêu đề bên phải, cùng một dòng |
| Card cộng đồng | Khối hai màu, không bo góc. Nhãn số và tên nhóm dưới ảnh |
| Icon tròn | 40px, `radius-pill` |

## 9. Trạng thái

Mọi component có: `default`, `hover`, `focus-visible`, `active`, `disabled`. Trên thiết bị cảm ứng, `hover` không áp dụng.

`disabled`: opacity 0.4, không phản hồi, không chạy chuyển động.

## 10. Do và Don't

**Do:** khối màu phẳng, ghép sát. Chữ đối lập theo mục 4.2. Dùng token cho mọi giá trị. Giữ khoảng trống lớn.

**Don't:** `accent` làm chữ trên nền sáng. `secondary-*` làm chữ. Shadow, gradient, glassmorphism. Màu ngoài token. `primary` trên `red`.

## 11. Ánh xạ tên cũ

Chỉ để đối chiếu với bản nháp. Xóa sau khi code đã đổi tên.

| Tên cũ | Tên mới |
|---|---|
| `--color-bg-accent` | `--color-accent` |
| `--color-bg-surface` | `--color-paper` |
| `--color-bg-ink` | `--color-ink` |
| `--color-border-focus` | `--color-focus` |
| `--color-brand-blue` | `--color-focus` |
| `text-on-red` | `--color-on-red` |
| `text-on-accent` | `--color-on-accent` |
| `secondary-sky` | `--color-sky` |

## 12. Nhật ký

| Ngày | Token hoặc component | Thay đổi | Lý do | Đã đồng bộ Figma |
|---|---|---|---|---|
| — | — | — | — | — |
