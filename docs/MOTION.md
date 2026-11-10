# Lưu Load: Motion

> Trách nhiệm của file này: chuyển động nào xảy ra ở đâu, theo quy tắc nào. Mọi thời lượng, easing, stagger nằm trong `js/config/motion.config.js`. File này chỉ dùng tên key.

## 1. Tính cách

**Vui, mượt, không bật nảy.** Chuyển động mang năng lượng của thương hiệu, nhưng không tranh chỗ với nội dung.

| Nguyên tắc | Nghĩa là gì |
|---|---|
| **Mượt** | Easing `out` cho gần như mọi chuyển động. Không giật, không đột ngột |
| **Vui có chủ đích** | Chỉ micro-interaction nhỏ (icon, mũi tên, tag) dùng `playful`. Overshoot tối đa khoảng 4%. Không dùng cho layout, chữ lớn hay ảnh lớn |
| **Gọn** | Một chuyển động, một mục đích. Phần tử cùng thay đổi chạy cùng nhịp |
| **Đảo chiều được** | Rời chuột giữa chừng thì phần tử quay về mượt từ vị trí hiện tại |
| **Tôn trọng người dùng** | Mọi chuyển động có phương án tắt. Không chặn thao tác chính |

Overshoot 4% là giới hạn cứng. Kiểm tra trực quan trên thiết bị thật trước khi duyệt.

## 2. Quy tắc kỹ thuật

- Chỉ animate `transform` và `opacity`. Màu nền và màu chữ được phép ở `duration.fast`.
- Không animate `width`, `height`, `top`, `left`, `margin`.
- `will-change: transform` chỉ đặt khi đang chuyển động, gỡ khi xong.
- Tối đa 3 animation chạy đồng thời trong một viewport.
- Tạm dừng chuyển động lặp khi tab ẩn (`visibilitychange`).
- Giá trị lấy từ `motion.config.js`. `LL.applyMotionVars()` ghi thành CSS variable `--motion-*` và `--ease-*` khi trang tải.

## 3. Hệ thống nhịp

| Key trong config | Dùng cho |
|---|---|
| `duration.press` | Phản hồi khi nhấn |
| `duration.fast` | Đổi màu nền, màu chữ, màu knob |
| `duration.base` | Trạng thái UI: nav, link, trình tự tải trang |
| `duration.reveal` | Chữ và ảnh vào viewport |
| `duration.cta` | Quãng đường đầy đủ của knob CTA |
| `easing.out` | Phần lớn chuyển động |
| `easing.inOut` | Chuyển động có điểm giữa |
| `easing.playful` | Chỉ micro-interaction, overshoot ≤ 4% |

## 4. Trình tự khi tải trang (Hero)

Mốc tương đối, tính từ khi DOM sẵn sàng.

| Bước | Phần tử | Chuyển động | Config |
|---|---|---|---|
| 1 | Eyebrow | Fade, translateY 8px → 0 | `duration.base`, `easing.out` |
| 2 | Dòng H1 | Reveal theo dòng, mỗi dòng trượt từ dưới lên trong vùng ẩn | `duration.reveal`, `stagger.lines` |
| 3 | Tagline | Fade | `duration.base` |
| 4 | Mosaic | Các khối lộ dần theo nhóm, trễ `stagger.groups` | `duration.reveal`, `stagger.groups` |
| 5 | CTA, nav | Fade, không di chuyển | `duration.base` |

Nội dung chính đầy đủ trong khoảng 1.5 giây.

## 5. Reveal khi cuộn

- Áp dụng cho mọi section. Kích hoạt theo `viewport.revealThreshold` và `viewport.revealRootMargin`.
- Chạy **một lần** (`viewport.revealOnce`). Cuộn ngược không chạy lại.
- Chữ: reveal theo dòng, cùng cơ chế bước 2.
- Ảnh: vùng chứa `overflow: hidden`. Ảnh lộ dần từ dưới lên bằng `clip-path: inset(...)`, trong `duration.reveal`.

## 6. Mosaic (Hero)

- Mosaic là trang trí: `aria-hidden="true"`, không focusable.
- Mỗi khối lộ dần như mục 5, kèm scale từ 1.04 về 1.
- Không có hover image trên mosaic.

## 7. Nav và link

| Phần tử | Trạng thái | Chuyển động |
|---|---|---|
| Nav chip | Hover, focus-visible | Nền `neutral-100` → `accent`, `duration.fast`. Không di chuyển |
| Category link | Hover | Mũi tên nhỏ dịch sang phải 4px, `easing.playful`, `duration.base` |
| Category link | Focus-visible | Như hover, cộng viền focus |

## 8. Nút CTA

### 8.1 Cấu trúc

- **Khung ngoài:** pill, nền `accent`, chữ `on-accent`. Chữ nằm trực tiếp trên nền, không có lớp nhãn riêng.
- **Knob:** vòng tròn chứa mũi tên. Là phần tử duy nhất di chuyển. Nằm trên khung ngoài.

Frame Figma (2026-11-10) vẽ knob đứng cạnh khung, không nằm trên khung. Lúc nghỉ knob nền `accent`, mũi tên `primary`. Khi mở, knob trượt trái lên khung và đổi sang bảng màu mục 8.2 (hover). Quãng đường = chiều rộng nhãn + khoảng cách.

Khác với video tham khảo (nhãn trong khung trắng riêng): giảm số lớp và giữ bảng màu trong `DESIGN_SYSTEM.md`.

### 8.2 Màu knob

| Trạng thái | Nền knob | Mũi tên | Tương phản |
|---|---|---|---|
| Rest (trên `accent`) | `ink` | `accent` | 16:1 |
| Hover (nền `red`) | `paper` | `red` | 6.3:1 |

### 8.3 Mô hình tiến độ `p`

Trạng thái CTA được mô tả bằng một biến `p` từ 0 (nghỉ) đến 1 (mở). Không có keyframe riêng cho hover và leave.

- Hover vào: `p` tăng về 1. Rời chuột: `p` giảm về 0.
- Thời lượng tỷ lệ với quãng đường còn lại. `duration.cta` là thời gian cho quãng đường đầy đủ.
- Đảo chiều: `p` đi tiếp từ giá trị hiện tại, không quay về 0 trước.

Từ `p`:

| Thuộc tính | Công thức |
|---|---|
| Vị trí knob | `translateX` = −`easing.out(p)` × quãng đường |
| Scale knob | 1 → `cta.shrinkMin` tại `p = 0.5` → 1 tại `p = 1` |
| Xoay mũi tên | `easing.out(p)` × `cta.rotateDeg` |

### 8.4 Sự kiện

| Sự kiện | Hành vi |
|---|---|
| `pointerenter` (có hover) | Chạy đến `p = 1` |
| `pointerleave` | Chạy về `p = 0` |
| Focus-visible | Như `pointerenter` |
| Blur | Như `pointerleave` |
| `pointerdown` | Scale `cta.pressScale` trong `duration.press`. Không đổi `p` |
| `pointerup` | Về scale 1 trong `duration.press` |
| Disabled | Không phản hồi, không chuyển động, opacity 0.4 |

### 8.5 Thiết bị cảm ứng

- Hover chỉ chạy khi `(hover: hover)` đúng.
- Chạm không để trạng thái hover "dính".

### 8.6 Giảm chuyển động

Khi `prefers-reduced-motion: reduce`:
- `p` chuyển thẳng 0 hoặc 1. Không scale, translate, rotate.
- Đổi màu nền và màu knob vẫn chạy trong `duration.fast`, vì đây không phải chuyển động.

### 8.7 Rủi ro đã biết

Knob đi qua vùng chữ ở giữa hành trình. Nếu trên 390px chữ khó đọc, đổi phương án: knob chỉ đi trong phần đệm bên phải của nút.

### 8.8 Nhãn

Nhãn là "Kết nối ngay" (D-09). Chuyển động không phụ thuộc chữ, nhưng độ rộng nút thì có.

## 9. Ngoài phạm vi Phase 01a

Chưa đưa vào 01a, cần spec riêng trước khi dựng: preloader kiểu rèm, logo FLIP, slider tự động, overlay FLIP từ card, chuyển cảnh Gallery và Community, parallax.

## 10. Trường hợp biên

| Tình huống | Hành vi |
|---|---|
| Hover nhanh qua nhiều nút | Mỗi nút có `p` riêng, không chờ nhau |
| Rời chuột khi đang hover vào | Đảo chiều từ `p` hiện tại |
| Đổi kích thước cửa sổ giữa chuyển động | Đo lại quãng đường. `p` giữ nguyên |
| Tab ẩn giữa chuyển động | Tạm dừng. Hiện lại thì tiếp tục từ `p` |
| Bật reduced motion khi đang chạy | Dừng ngay, chuyển đến đích |
| Chưa có JavaScript | Nút đúng ở trạng thái nghỉ, không chuyển động |

## 11. Tiêu chí nghiệm thu

- [ ] Không có animation nào đổi thuộc tính ngoài `transform`, `opacity`, màu nền, màu chữ.
- [ ] Hover vào, rời, quay lại nhanh liên tục: không giật, không nhảy vị trí.
- [ ] Reduced motion: không có `transform` đổi theo thời gian.
- [ ] Focus-visible bằng bàn phím có viền, tương phản ≥ 3:1.
- [ ] Trên 390px: knob không che hoàn toàn chữ ở bất kỳ thời điểm nào.
- [ ] Overshoot không vượt 4% ở mọi easing `playful`.
- [ ] Trên thiết bị thật, thời lượng 1000ms được duyệt hoặc điều chỉnh (D-10).
