# Spec: home.features-projects

> Trách nhiệm của file này: section gallery project có pin (nửa trái nội dung, nửa phải gallery). Chữ ở `js/content/home.js` (`featuresProjects`) và `js/content/projects.js`. Chuyển động ở `js/config/motion.config.js` (`gallery`).

| | |
|---|---|
| Section ID | `home.features-projects` |
| Vị trí | Sau `home.hero` |
| Nguồn | Figma Features projects 1920 (`2221:375`), 1440 (`2295:339`). Tham chiếu chuyển động: das.info.vn (người dùng chỉ định) |
| Trạng thái layout | Khớp frame ở 1440 và 1920. Card gallery là `ĐỀ XUẤT` |
| Trạng thái copy | `proposed` (tiêu đề, mô tả theo frame). `pending` (14 tên project, alt, nhãn danh sách, D-20) |

## 1. Bố cục (frame cao 900px ở cả hai)

| Thông số | 1440 | 1920 | Token |
|---|---|---|---|
| Hộp nội dung (trái 31px) | 556 × 721 | 664 × 740 | `--fp-content-w/h`, `--fp-pad-l` |
| Độ lệch dọc so với tâm | +9.5px | +8px | `--fp-dy` |
| Tiêu đề (Vina Vịt Lộn) | 100px | 140px | `--fs-display` |
| Mô tả (Aeonik Medium) | 20px / 30px, rộng 322 | 24px / 30px, rộng 390 | `--fp-fs-lead`, `--fp-lh-lead`, `--fp-lead-w` |
| Khoảng cách mô tả và CTA | 91px | 91px | `--fp-content-gap` |
| Khung gallery (neo mép phải, cắt tràn) | 821px | 1101px | `--fp-gallery-w` |
| CTA | Dùng lại `ButtonCta` (khớp 40px, radius 4 và 7.581) | | |

Từ 1440 trở lên nội suy tuyến tính, dưới 1440 co theo viewport (trần = giá trị 1440). Sân khấu cao `max(900px, 100svh)`, hộp nội dung canh giữa dọc theo công thức của frame.

## 2. Hành vi

- `>= 1280px` và cho phép chuyển động: JS thêm `.is-pinned`. 14 card nằm trên một vòng tròn trong mặt phẳng YZ (bán kính `R = h(1+g) / (2 sin(π/N))`), scroll xoay cả trống quanh trục X nên card đi lên theo cung tròn. ScrollTrigger pin `.fp__pin`, quãng cuộn `0.8 × chiều cao viewport × (N−1)`.
- Xoắn ốc: mỗi card lệch ngang `sin` theo góc trên vòng và xoay nhẹ quanh trục dọc của nó (`spiral` trong `motion.config.js`).
- Không đổi opacity. Card ở mặt sau trống ẩn bằng `backface-visibility`.
- Sân khấu cao đúng `100svh`. Hộp nội dung giữ kích thước frame khi viewport cao 900, thấp hơn thì co lại (cách 40px mỗi mép) để CTA luôn nằm trong màn hình.
- Dưới 1280px, giảm chuyển động, JS tắt hoặc thiếu GSAP: xếp dọc, không pin.
- Cơ chế theo `HUONG-DAN-KY-THUAT.md` bản Drum Gallery (thay bản cột thẳng trước đó). Ngưỡng 1280px thay 1024px (`ĐỀ XUẤT`).

## 3. Chênh lệch và việc còn mở

| Mục | Trạng thái |
|---|---|
| Kích thước card, biên độ xoắn, góc xoay, khoảng hở | `ĐỀ XUẤT`. Frame chỉ có ảnh chụp tham chiếu, không có thông số từng card. Chỉnh trong `motion.config.js` và `--fp-card-w` |
| Đoạn mô tả | Frame qua MCP (2221:375, 2295:339) ghi "Sáng tạo ở Việt Nam giống như việc cắm sạc lỏng...". Ảnh chụp Figma người dùng gửi ngày 2026-11-11 ghi "Sáng tạo ở Việt Nam chưa bao giờ thiếu nguồn năng lượng...". Đang giữ bản frame, chờ xác nhận bản đúng |
| Nền wireframe | `TODO(asset)`: frame chỉ có ảnh chụp, chưa có file SVG (`ASSETS.md`, `deco.wireframe`) |
| Tên, danh mục, alt của 14 project | `pending` (D-20), alt ghi `TODO(content)` |
| Trùng với `home-showcase.md` | Frame "Features projects" cùng tiêu đề "Thành quả sáng tạo" với spec `home.showcase`. Chờ người dùng xác nhận gộp hay giữ riêng |
| Ảnh | Ảnh gốc 736 đến 1183px, thấp hơn 1200px của hướng dẫn. Quyền sử dụng `CHỜ` |
| Mobile, tablet | `ĐỀ XUẤT`, chưa có frame |
| `file://` | Cần mạng để nạp GSAP từ CDN. Offline thì gallery xếp dọc |
