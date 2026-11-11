# Spec: home.preloader

> Trách nhiệm: loader phủ trang lúc vào. Chữ ở `js/content/home.js` (`preloader`). Nhịp và chuyển động: `docs/MOTION.md` mục 10.

| | |
|---|---|
| Section ID | `home.preloader` |
| Trạng thái layout | `ĐỀ XUẤT`: không có frame Figma, số đo lấy từ demo người dùng gửi |
| Trạng thái copy | `ĐỀ XUẤT` (LUULOAD chờ D-17) |
| Code | `js/sections/preloader.js`, `css/sections/preloader.css`, token `--pre-*` và `--z-preloader` trong `tokens.css` |
| Config | `LL.motion.preloader` (start, count, hold, exit, steps, frameMs) |

## Bố cục
- Khối vàng `--pre-strip-h` cao (demo 80px ở 1920) trên nền xanh primary, canh giữa dọc.
- Trái: wordmark, tag. Giữa: thanh tiến độ với track tối. Phải: nhãn "LOADING" và số %, rồi ô graphic vuông bằng chiều cao khối vàng.

## Hành vi
- Số đếm đều từ 0 đến 100. Thanh chỉ đổi ở 30, 60, 100 (stepped).
- Mỗi mốc thay bộ graphic và lặp 4 khung theo `frameMs`.
- Thoát: khối loader co về chiều cao nav bằng clip-path. Hero reveal bắt đầu cùng lúc.
- Giảm chuyển động: bỏ qua loader.

## Đã kiểm tra
- Headless Chromium 1920×900: đếm 29 → 62 → 99 → 100, thanh và graphic đổi đúng mốc, không lỗi console, sau khi thoát hero không còn is-pending.
- Giảm chuyển động: không có loader.
- Mobile 390: scrollWidth 392 (đã có từ trước, chưa sửa).
- Chưa kiểm tra: video 60fps để đo đúng easing; thiết bị thật.
