# Lưu Load

Web-app giới thiệu và kết nối cộng đồng creatives Việt Nam. HTML, CSS, JavaScript thuần, không build.

## Chạy

Mở `index.html` bằng trình duyệt (chạy được qua `file://`). Không cần cài đặt.

## Cấu trúc

- `css/`: `tokens.css` (giá trị), `globals.css`, `components.css`, `sections/`.
- `js/`: `config/` (chuyển động), `content/` (toàn bộ chữ), `components/`, `sections/`, `main.js`.
- `images/hero/mosaic/`: SVG khối ghép của Hero, theo frame 1440 và 1920.
- `fonts/`: Vina Vịt Lộn và Aeonik (WOFF2).
- `docs/`: tài liệu quy chuẩn. Bắt đầu từ `docs/INSTRUCTION.md`.
- `Graphic element/`, `Reference/`, `*.otf`: tài nguyên gốc từ Figma và nhà font.

## Kiểm tra nội dung

`node scripts/check-content.mjs` liệt kê mục `pending` và `proposed`. Thoát mã 1 nếu còn `pending`.

## Trạng thái

Phase 01a, Hero trang chủ: xem `docs/specs/home-hero.md`.
