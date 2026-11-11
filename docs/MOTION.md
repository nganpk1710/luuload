# Lưu Load: Motion

> Trách nhiệm của file này: chuyển động nào xảy ra, theo quy tắc nào. Thời lượng, easing, stagger, ngưỡng nằm trong `js/config/motion.config.js`. File này chỉ dùng tên key.

## 1. Tính cách

**Vui, mượt, không bật nảy.** Năng lượng đến từ tốc độ và nhịp, không đến từ độ đàn hồi.

| Nguyên tắc | Nghĩa là gì |
|---|---|
| Mượt | `out` cho gần như mọi chuyển động. Không giật, không đột ngột |
| Vui có chủ đích | Chỉ micro-interaction (icon, mũi tên, pill) dùng `playful`, overshoot tối đa khoảng 4%. Không dùng cho layout, chữ lớn, ảnh lớn |
| Gọn | Một chuyển động, một mục đích. Phần tử cùng thay đổi chạy cùng nhịp |
| Đảo chiều được | Rời chuột giữa chừng thì quay về từ vị trí hiện tại |
| Tôn trọng người dùng | Có phương án tắt. Không chặn thao tác chính |

## 2. Quy tắc kỹ thuật

- Chỉ animate `transform` và `opacity`. Màu nền và chữ được phép ở `duration.fast`.
- Không animate `width`, `height`, `top`, `left`, `margin`.
- `will-change: transform` chỉ khi đang chuyển động.
- Tối đa 3 animation đồng thời trong một viewport.
- Tạm dừng chuyển động lặp khi tab ẩn (`visibilitychange`).
- `LL.applyMotionVars()` ghi `--motion-*` và `--ease-*` khi tải trang.

## 3. Hệ thống nhịp

| Key | Dùng cho |
|---|---|
| `duration.press` | Phản hồi nhấn |
| `duration.fast` | Đổi màu nền, chữ, knob |
| `duration.base` | Trạng thái UI, trình tự tải |
| `duration.reveal` | Chữ và ảnh vào viewport |
| `duration.cta` | Quãng đường đầy đủ của knob |
| `easing.out` | Phần lớn chuyển động |
| `easing.inOut` | Có điểm giữa |
| `easing.playful` | Micro-interaction, overshoot ≤ 4% |

## 4. Reveal khi cuộn (mọi section)

- Trigger khi phần tử vào viewport theo `viewport.revealThreshold` và `viewport.revealRootMargin`.
- Chạy **một lần** (`revealOnce`).
- **Chữ:** reveal theo dòng. Mỗi dòng nằm trong vùng `overflow: hidden`, trượt từ dưới lên. Trễ `stagger.lines` giữa các dòng.
- **Ảnh và khối:** vùng chứa `overflow: hidden`, ảnh lộ dần từ dưới lên bằng `clip-path: inset()`, trong `duration.reveal`.
- **Nhóm khối** (cards, mosaic): trễ `stagger.groups`.

## 5. Trình tự khi tải trang (hero)

| Bước | Phần tử | Chuyển động |
|---|---|---|
| 1 | Eyebrow | Fade, translateY 8px → 0, `duration.base` |
| 2 | Dòng H1 | Reveal theo dòng, mục 4 |
| 3 | Tagline | Fade, `duration.base` |
| 4 | Mosaic | Các khối lộ dần, trễ `stagger.groups` |
| 5 | Header, CTA | Fade, không di chuyển |

Nội dung chính đầy đủ trong khoảng 1.5 giây.

## 6. Nút CTA

### 6.1 Cấu trúc
- Khung ngoài: pill, nền `accent`, chữ `on-accent`.
- Knob: vòng tròn `ink` chứa mũi tên `accent`. Phần tử duy nhất di chuyển.
- Biến thể trên nền `primary` dùng nền `accent` cho khung ngoài, giữ nguyên knob.

### 6.2 Màu knob
| Trạng thái | Nền knob | Mũi tên | Tương phản |
|---|---|---|---|
| Rest | `ink` | `accent` | 16:1 |
| Hover, nền `red` | `paper` | `red` | 6.3:1 |

### 6.3 Mô hình `p`
`p` từ 0 (nghỉ) đến 1 (mở). Không keyframe riêng cho hover và leave.
- Hover vào: `p` → 1. Rời: `p` → 0. Đảo chiều từ `p` hiện tại.
- Thời lượng tỷ lệ quãng đường còn lại. `duration.cta` là cho quãng đường đầy đủ.

| Thuộc tính | Công thức |
|---|---|
| Vị trí knob | `translateX` = −`easing.out(p)` × quãng đường |
| Scale knob | 1 → `cta.shrinkMin` tại `p = 0.5` → 1 tại `p = 1` |
| Xoay mũi tên | `easing.out(p)` × `cta.rotateDeg` |

### 6.4 Sự kiện
| Sự kiện | Hành vi |
|---|---|
| `pointerenter` (có hover) | `p` → 1 |
| `pointerleave` | `p` → 0 |
| Focus-visible | Như `pointerenter` |
| Blur | Như `pointerleave` |
| `pointerdown` | Scale `cta.pressScale` trong `duration.press`. Không đổi `p` |
| `pointerup` | Về scale 1 trong `duration.press` |
| Disabled | Không phản hồi, opacity 0.4 |

### 6.5 Cảm ứng và giảm chuyển động
- Hover chỉ khi `(hover: hover)`. Chạm không để hover "dính".
- Reduced motion: `p` nhảy thẳng 0 hoặc 1. Không scale, translate, rotate. Đổi màu vẫn chạy trong `duration.fast`.

### 6.6 Rủi ro
Knob đi qua vùng chữ ở giữa hành trình. Nếu trên 390px chữ khó đọc, knob chỉ đi trong phần đệm bên phải.

## 7. Hashtag marquee

- Hai hàng chạy ngược chiều, lặp vô hạn. Tốc độ `marquee.speedPxPerSec`.
- Hover vào một hàng: hàng đó dừng ở `duration.base`. Rời chuột thì chạy lại.
- Khi tab ẩn: tạm dừng. Khi hiện lại: tiếp tục.
- Reduced motion: hàng dừng, cho phép cuộn tay bằng vuốt hoặc phím.
- Không animate `left`. Dùng `transform: translateX`.

## 8. Feature cards (features-projects)

- Hover: thẻ dịch lên 8px, `easing.playful`, `duration.base`. Minh họa bên trong scale 1.03.
- Focus-visible: như hover, cộng viền focus.
- Reduced motion: không dịch, không scale. Viền focus vẫn hiện.

## 9. Khối Tầm nhìn–Sứ mệnh–Giá trị (thuộc home.usp)

- Panel vào viewport: vòng tròn scale từ 0.85 về 1, `duration.reveal`, `easing.out`.
- Không chuyển động khi hover. Panel là nội dung tĩnh.

## 10. Showcase

- Các khối ảnh lộ dần theo nhóm, trễ `stagger.groups`.
- Đường wireframe nền dùng `stroke-dashoffset` một lần khi vào viewport, `duration.reveal`. Không lặp.

## 11. Last CTA

- Chữ H2 reveal theo dòng.
- Hai tag "CONNECTION" xuất hiện cùng lúc, `duration.base`, không lặp.
- Starburst xoay chậm vô hạn, rất chậm. Tắt hoàn toàn khi reduced motion.

## 12. Footer

- Scroll-to-top: hiện khi cuộn quá một viewport, fade `duration.base`. Nhấn: `pressScale`.

## 13. Nav và link

| Phần tử | Trạng thái | Chuyển động |
|---|---|---|
| Nav chip | Hover, focus | Nền → `accent`, `duration.fast`. Không di chuyển |
| Category link | Hover, focus | Mũi tên dịch phải 4px, `easing.playful`, `duration.base` |

## 14. Ngoài phạm vi 01a

Preloader rèm, logo FLIP, slider tự động, overlay FLIP từ card, chuyển cảnh Gallery và Community, parallax. Cần spec riêng.

## 15. Trường hợp biên

| Tình huống | Hành vi |
|---|---|
| Hover nhanh nhiều nút | Mỗi nút có `p` riêng |
| Đổi kích thước giữa chuyển động | Đo lại quãng đường, `p` giữ nguyên |
| Tab ẩn | Tạm dừng, tiếp tục khi hiện |
| Bật reduced motion khi đang chạy | Dừng ngay, chuyển đến đích |
| Không có JavaScript | Nội dung hiển thị đúng ở trạng thái đầu. Marquee đứng yên |

## 16. Tiêu chí nghiệm thu

- [ ] Không animation nào đổi thuộc tính ngoài `transform`, `opacity`, màu.
- [ ] Hover vào, rời, quay lại nhanh liên tục: không giật, không nhảy.
- [ ] Reduced motion: không `transform` đổi theo thời gian.
- [ ] Focus-visible tương phản ≥ 3:1.
- [ ] Trên 390px: knob không che hoàn toàn chữ.
- [ ] Overshoot ≤ 4% ở mọi `playful`.
- [ ] Thời lượng CTA 1000ms được duyệt trên thiết bị thật (D-10).

## 12. Pinned gallery: trống quay 3D (home.features-projects)

- Nguồn: `HUONG-DAN-KY-THUAT.md` (Drum Gallery) do người dùng gửi, tham chiếu chuyển động das.info.vn. Thông số ở `LL.motion.gallery`.
- Chỉ chạy khi `>= 1280px` và `prefers-reduced-motion: no-preference`. Ngoài ra là layout xếp dọc, không transform.
- Một tween gắn scroll (`scrub`): trống xoay `rotateX` từ 0 đến `(N−1) × 360/N`. Card đi lên theo cung tròn, lệch ngang theo `spiral`. Không đổi opacity.
- Chỉ `transform`. Mở rộng so với mục 9 (parallax ngoài 01a): người dùng yêu cầu trực tiếp.
