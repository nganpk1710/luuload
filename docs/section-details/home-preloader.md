# Spec: home.preloader

> Trách nhiệm: loader phủ trang lúc vào. Chữ ở `js/content/home.js` (`preloader`). Nhịp: `docs/MOTION.md` mục 10.

| | |
|---|---|
| Section ID | `home.preloader` |
| Figma | 2357:1661 (1920×900). Không có frame 1440 và mobile |
| Trạng thái layout | `ĐÃ DỰNG 1920`. Dưới 1280 xếp dọc [ĐỀ XUẤT] |
| Trạng thái copy | `ĐỀ XUẤT` |
| Code | `js/sections/preloader.js`, `css/sections/preloader.css`, token `--pre-*`, `--z-preloader`, `--color-primary-deep`, `--color-divider` |
| Config | `LL.motion.preloader` |

## Bố cục (frame 1920×900)

Một dải cao 80, mép trên y 396, từ x 34 đến x 1888, ba đoạn nối liền:

| Đoạn | x, rộng | Nền | Nội dung |
|---|---|---|---|
| Logo | 34, 641 | vàng `--color-accent` | Logo SVG (213×35, cách trái 24). "Loading" và số %, 24px, căn phải |
| Track | 675, 606 | `--color-primary-deep`, viền trái 1px `--color-divider` | Fill vàng, scaleX theo tiến độ |
| Graphic | 1281, 607 | như track | Tag "creative / community" 14px vàng ở (13, 8). Hàng 4 ô 64×64, cách 8, bắt đầu x 317 |

Ghi chú:
- Hàng Line 60 trong frame đặt ở top 87, ngoài khung 80px (lỗi frame). Code đặt cả ba hàng cùng vị trí với Line 30 (top 8).
- TODO(figma): texture nền (node 2357:1662, PNG, opacity 40%, multiply) chưa có file. Tải từ Figma bị chặn mạng trong môi trường làm việc.

## Đã kiểm tra
- Headless Chromium 1920×900: số đi liên tục 2% → 22% → 83% → 99% → 100%, hàng graphic đổi đúng mốc, thoát và bàn giao không lỗi console, sau thoát loader bị gỡ khỏi DOM.
- Giảm chuyển động: không có loader.
- Mobile 390: xếp dọc, chưa có frame để đối chiếu.
