# Lưu Load: Tech Stack

> Trách nhiệm của file này: công nghệ, cấu trúc thư mục, quy ước đặt tên, ràng buộc chạy trên `file://`. Lý do thiết kế không nằm ở đây.

## 1. Quyết định

| Mục | Giá trị | Trạng thái |
|---|---|---|
| Ngôn ngữ | HTML5, CSS3, JavaScript ES2019 (không module) | `CHỐT` (D-06) |
| Build | Không có | `CHỐT` |
| Package manager | Không dùng trong runtime | `CHỐT` |
| Chạy | Mở `index.html` bằng `file://` phải chạy đầy đủ | `CHỐT` |
| Thư viện animation | Không nạp trong Phase 01a | `ĐỀ XUẤT` (D-14) |
| Slider | Không có trong Phase 01a | `CHỐT` |
| Font | `@font-face`, tự host WOFF2 | `CHỜ` (D-11) |
| Deploy | Static hosting | `CHỜ` |

## 2. Ràng buộc `file://`

| Không dùng | Lý do | Thay bằng |
|---|---|---|
| `import` / `export` | Trình duyệt chặn module từ `file://` | Script thường, gắn vào namespace |
| `fetch` đọc JSON hoặc CSV | Chặn CORS trên `file://` | Dữ liệu trong file `.js` |
| `<script type="module">` | Như trên | `<script>` thường |
| Đường dẫn tuyệt đối | Có thể không tải | Đường dẫn tương đối |

**Namespace:** mọi file JS gắn vào `window.LL`. Ví dụ `LL.content.home`, `LL.motion`, `LL.components.buttonCta`.

**Thứ tự nạp** (cuối `<body>`):

```html
<script src="js/config/motion.config.js"></script>
<script src="js/utils/dom.js"></script>
<script src="js/utils/bezier.js"></script>
<script src="js/content/brand.js"></script>
<script src="js/content/nav.js"></script>
<script src="js/content/home.js"></script>
<script src="js/components/ui/*.js"></script>        <!-- liệt kê từng file trong index.html -->
<script src="js/components/blocks/*.js"></script>    <!-- header.js sau các block con -->
<script src="js/sections/home-hero.js"></script>
<script src="js/main.js"></script>
```

Mỗi file tự gắn vào `LL`. `main.js` chạy sau cùng. Thứ tự này là bắt buộc, không đổi tùy tiện.

## 3. Trình duyệt

| Trình duyệt | Phiên bản | Trạng thái |
|---|---|---|
| Chrome, Edge | Hai bản gần nhất | `ĐỀ XUẤT` |
| Safari (desktop, iOS) | Hai bản gần nhất | `ĐỀ XUẤT` |
| Firefox | Hai bản gần nhất | `ĐỀ XUẤT` |
| Chrome Android | Hai bản gần nhất | `ĐỀ XUẤT` |
| IE | Không hỗ trợ | `CHỐT` |

## 4. Cấu trúc thư mục

```
luuload/
├── index.html                      # trang chủ
├── projects/index.html
├── community/index.html
├── about/index.html
├── contact/index.html
├── categories/art-craft/index.html # chờ D-13
├── CLAUDE.md                       # @docs/INSTRUCTION.md
├── css/
│   ├── tokens.css                  # giá trị, đồng bộ từ Figma
│   ├── globals.css                 # reset, base, focus
│   ├── components.css              # atoms và blocks
│   └── sections/home-hero.css
├── fonts/                          # WOFF2 tự host (D-11 chưa kiểm giấy phép)
├── js/
│   ├── config/motion.config.js     # nguồn chuyển động
│   ├── utils/                      # dom.js, bezier.js
│   ├── content/
│   │   ├── brand.js
│   │   ├── nav.js
│   │   └── home.js                 # nguồn chữ trang chủ
│   ├── components/
│   │   ├── ui/                     # atoms
│   │   └── blocks/                 # molecules, organisms
│   ├── sections/home-hero.js
│   └── main.js
├── images/
│   ├── hero/
│   └── community/
├── data/artists.csv                # nguồn gốc, không được nạp lúc chạy
├── scripts/check-content.mjs       # công cụ cho người phát triển, không bắt buộc
└── docs/
    ├── INSTRUCTION.md
    ├── BRAND.md
    ├── DESIGN_SYSTEM.md
    ├── COMPONENTS.md
    ├── MOTION.md
    ├── TECH_STACK.md
    ├── CONTENT.md
    └── specs/home-hero.md
```

**Ghi chú**
- `data/*.csv` là nguồn để người viết cập nhật. Chuyển thành `js/content/*.js` một lần, rồi commit cả hai. Trình duyệt không đọc CSV.
- Mỗi route khác `/` là một file HTML riêng, không phải route động.

## 5. Quy ước đặt tên

| Đối tượng | Quy tắc | Ví dụ |
|---|---|---|
| File, thư mục | kebab-case | `button-cta.js` |
| Biến CSS | Theo `DESIGN_SYSTEM.md` mục 3 | `--color-accent` |
| Hàm, biến JS | camelCase | `renderMosaic` |
| Component | PascalCase trong namespace | `LL.components.ButtonCta` |
| Section ID | `{trang}.{section}` | `home.hero` |
| Content key | Dấu chấm, lowercase | `home.hero.tagline` |
| Slug | kebab-case, không dấu | `art-craft`, `nguyen-an` |
| Ảnh | kebab-case, không dấu, `.webp` | `nguyen-an-profile.webp` |

Slug không dấu là quy tắc cứng. Tên có dấu chỉ dùng trong nội dung hiển thị.

## 6. Quy ước code

- Không có số ma thuật. Thời lượng, khoảng cách, màu lấy từ `motion.config.js` hoặc `tokens.css`.
- Không gắn `style` inline cho giá trị tĩnh. Giá trị động (transform của knob) gán bằng `style.setProperty`.
- Không dùng `innerHTML` với nội dung từ `js/content/`. Dùng `textContent`.
- Không đọc `window` hoặc `document` ngoài `DOMContentLoaded` hoặc hàm được `main.js` gọi.
- Mỗi `<img>` có `alt`, hoặc `alt=""` và `aria-hidden="true"` nếu trang trí.
- Ảnh dùng `srcset` và `sizes` theo breakpoint. Không `loading="lazy"` cho ảnh trong viewport đầu.
- Khuyến khích JSDoc và `// @ts-check` để kiểm kiểu mà không cần build.
- Không thêm thư viện khi chưa ghi vào mục 8.

## 7. Hiệu năng

| Chỉ số | Ngưỡng `[ĐỀ XUẤT]` |
|---|---|
| JavaScript tải lần đầu, gzip | ≤ 50 KB, không có thư viện ngoài |
| Ảnh hero | WebP, `srcset` 640, 1024, 1440, 1920 |
| LCP trên 4G giả lập | ≤ 2.5 giây |
| CLS | ≤ 0.1 |

## 8. Thư viện

| Thư viện | Trạng thái | Điều kiện nạp |
|---|---|---|
| GSAP, ScrollTrigger | `ĐỀ XUẤT` không nạp trong 01a | Khi có timeline cần thiết (D-14) |
| SplitText | Như GSAP | Khi reveal theo dòng bằng CSS không đủ |
| Smooothy | Không nạp trong 01a | Khi có slider (Phase 01b) |
| DialKit | `ĐỀ XUẤT` | Chỉ khi URL có `?tune`, không trong production (D-15) |

Quy tắc nạp: từ CDN bằng thẻ `<script>`, ghim phiên bản cụ thể, không dùng `latest`. Ghi vào bảng dưới trước khi commit.

| Ngày | Thư viện | Phiên bản | Lý do | Người quyết |
|---|---|---|---|---|
| — | — | — | — | — |

## 9. Kiểm tra

| Kiểm tra | Cách làm | Bắt buộc |
|---|---|---|
| Chạy qua `file://` | Double-click `index.html` | Có |
| Không lỗi console | DevTools, Chrome và Safari | Có |
| Không chữ cứng | Tìm chuỗi tiếng Việt trong `*.html` và `js/components`, `js/sections` | Trước release |
| Đúng copy và trạng thái | `node scripts/check-content.mjs` | Trước release |
| Tương phản | Công cụ đo | Trước release |

Không yêu cầu Node để chạy site. Script kiểm tra chỉ dành cho người phát triển.

## 10. Nhật ký

| Ngày | Thay đổi |
|---|---|
| 2026-11-10 | Thêm `fonts/`, `js/utils/`. Bỏ `<link rel="preload">` cho font vì file:// báo cảnh báo credentials. Thêm lại khi lên hosting |
| 2026-11-10 | Chuyển sang HTML/CSS/JS thuần. Thêm ràng buộc `file://`. Bỏ `src/`, `.ts` thành `.js`. Đồng bộ đường dẫn component và section |
