# Lưu Load: Tech Stack

> Trách nhiệm của file này: công nghệ, ràng buộc `file://`, thứ tự nạp script, cấu trúc thư mục, quy ước đặt tên.

## 1. Quyết định

| Mục | Giá trị | Trạng thái |
|---|---|---|
| Ngôn ngữ | HTML5, CSS3, JavaScript ES2019, không module | `CHỐT` (D-06) |
| Build | Không có | `CHỐT` |
| Chạy | Mở `index.html` qua `file://` phải chạy đầy đủ | `CHỐT` |
| Thư viện animation | Không nạp trong 01a | `ĐỀ XUẤT` (D-14) |
| Font | `@font-face`, tự host WOFF2 | `CHỜ` (D-11) |
| Deploy | Static hosting | `CHỜ` |

## 2. Ràng buộc `file://`

| Không dùng | Lý do | Thay bằng |
|---|---|---|
| `import`, `export` | Trình duyệt chặn module qua `file://` | Script thường gắn vào namespace |
| `fetch` đọc JSON, CSV | Chặn CORS | Dữ liệu trong `.js` |
| `<script type="module">` | Như trên | `<script>` thường |
| Đường dẫn tuyệt đối | Có thể không tải | Đường dẫn tương đối |
| `<use href="sprite.svg#id">` | Chặn trên `file://` | SVG inline hoặc `<img>` |

**Namespace:** mọi JS gắn vào `window.LL`. Ví dụ `LL.content.home`, `LL.motion`, `LL.sections.homeHero`.

**Thứ tự nạp** (cuối `<body>`, bắt buộc theo thứ tự này):

```html
<script src="js/config/motion.config.js"></script>
<script src="js/content/brand.js"></script>
<script src="js/content/nav.js"></script>
<script src="js/content/home.js"></script>
<script src="js/components/ui/button-cta.js"></script>
<script src="js/components/blocks/header.js"></script>
<script src="js/components/blocks/footer.js"></script>
<script src="js/components/blocks/hashtag-marquee.js"></script>
<script src="js/sections/home-hero.js"></script>
<script src="js/sections/home-showcase.js"></script>
<script src="js/sections/home-usp.js"></script>
<script src="js/sections/home-hashtag.js"></script>
<script src="js/sections/home-community.js"></script>
<script src="js/sections/home-features-projects.js"></script>
<script src="js/sections/home-last-cta.js"></script>
<script src="js/main.js"></script>
```

Mỗi file tự gắn vào `LL`. `main.js` chạy sau cùng. Thêm file mới thì thêm dòng vào đúng vị trí.

## 3. Trình duyệt

| Trình duyệt | Trạng thái |
|---|---|
| Chrome, Edge (hai bản gần nhất) | `ĐỀ XUẤT` |
| Safari desktop và iOS (hai bản gần nhất) | `ĐỀ XUẤT` |
| Firefox (hai bản gần nhất) | `ĐỀ XUẤT` |
| Chrome Android (hai bản gần nhất) | `ĐỀ XUẤT` |
| IE | Không hỗ trợ (`CHỐT`) |

## 4. Cấu trúc thư mục

```
luuload/
├── index.html                       # trang chủ
├── projects/index.html
├── community/index.html
├── about/index.html
├── contact/index.html
├── categories/art-craft/index.html  # chờ D-13
├── CLAUDE.md                        # @docs/INSTRUCTION.md
├── css/
│   ├── tokens.css                   # giá trị thiết kế
│   ├── globals.css                  # reset, base, focus
│   ├── components.css               # atoms và blocks
│   └── sections/
│       ├── home-hero.css
│       ├── home-showcase.css
│       ├── home-usp.css
│       ├── home-mission.css
│       ├── home-hashtag.css
│       ├── home-community.css
│       ├── home-features-projects.css
│       └── home-last-cta.css
├── js/
│   ├── config/motion.config.js
│   ├── content/
│   │   ├── brand.js
│   │   ├── nav.js
│   │   └── home.js
│   ├── components/
│   │   ├── ui/                      # atoms
│   │   └── blocks/                  # molecules, organisms, header, footer
│   ├── sections/                    # một file cho mỗi section
│   └── main.js
├── images/
│   ├── graphics/                    # SVG: logo, deco
│   ├── showcase/                    # ảnh mockup
│   ├── last-cta/                    # ảnh nhóm người
│   └── hero/                        # nếu có ảnh hero
├── data/artists.csv                 # nguồn gốc, không nạp lúc chạy
├── scripts/check-content.mjs        # công cụ dev, không bắt buộc
└── docs/
    ├── INSTRUCTION.md
    ├── BRAND.md
    ├── DESIGN_SYSTEM.md
    ├── COMPONENTS.md
    ├── MOTION.md
    ├── TECH_STACK.md
    ├── CONTENT.md
    ├── ASSETS.md
    ├── specs/
    │   ├── home-hero.md
    │   ├── home-showcase.md
    │   ├── home-usp.md
    │   ├── home-hashtag.md
    │   ├── home-community.md
    │   ├── home-features-projects.md
    │   ├── home-last-cta.md
    │   └── home-footer.md
    └── reference/shape-layout-sheet.svg
```

Ghi chú: `CSS` của mỗi section tách file để sửa không lan. Footer và header là component dùng chung, không nằm trong `sections/` (D-19).

## 5. Quy ước đặt tên

| Đối tượng | Quy tắc | Ví dụ |
|---|---|---|
| File, thư mục | kebab-case | `home-last-cta.js` |
| Biến CSS | `DESIGN_SYSTEM.md` mục 3 | `--color-accent` |
| Hàm, biến JS | camelCase | `renderHashtag` |
| Section ID | `{trang}.{section}` | `home.last-cta` |
| Content key | Dấu chấm, lowercase | `home.hero.tagline` |
| Slug | kebab-case, không dấu | `art-craft` |
| Ảnh, SVG | kebab-case, không dấu | `deco-red.svg`, `img-showcase-box-1440.webp` |
| Ảnh có srcset | Đuôi là chiều rộng | `-640.webp`, `-1440.webp` |

Slug và tên file không dấu là quy tắc cứng.

## 6. Quy ước code

- Không có số ma thuật. Thời lượng, khoảng cách, màu lấy từ `motion.config.js` hoặc `tokens.css`.
- Giá trị động (transform của knob, vị trí marquee) gán bằng `style.setProperty`. Không gắn `style` inline tĩnh.
- Chữ từ `js/content/` dùng `textContent`, không `innerHTML`.
- Không đọc `window` hoặc `document` ngoài `DOMContentLoaded` hoặc hàm do `main.js` gọi.
- Mỗi `<img>` có `alt`, hoặc `alt=""` và `aria-hidden="true"` nếu trang trí.
- Ảnh dùng `srcset` và `sizes`. Không `loading="lazy"` cho ảnh trong viewport đầu.
- Khuyến khích JSDoc và `// @ts-check`.

## 7. Hiệu năng

| Chỉ số | Ngưỡng `[ĐỀ XUẤT]` |
|---|---|
| JavaScript tải lần đầu, gzip | ≤ 50 KB |
| Ảnh | WebP, `srcset` 640, 1024, 1440, 1920 |
| LCP trên 4G giả lập | ≤ 2.5 giây |
| CLS | ≤ 0.1 |

## 8. Thư viện

| Thư viện | Trạng thái | Điều kiện nạp |
|---|---|---|
| GSAP, ScrollTrigger | `ĐỀ XUẤT` không nạp 01a | Khi cần timeline (D-14) |
| SplitText | Như GSAP | Khi reveal dòng bằng CSS không đủ |
| Smooothy | Không nạp 01a | Khi có slider (01b) |
| DialKit | `ĐỀ XUẤT` | Chỉ khi có `?tune`, không production (D-15) |

Nạp từ CDN bằng `<script>`, ghim phiên bản, không dùng `latest`. Ghi vào bảng dưới trước khi commit.

| Ngày | Thư viện | Phiên bản | Lý do | Người quyết |
|---|---|---|---|---|
| — | — | — | — | — |

## 9. Kiểm tra

| Kiểm tra | Cách làm | Bắt buộc |
|---|---|---|
| Chạy qua `file://` | Double-click `index.html` | Có |
| Không lỗi console | DevTools, Chrome và Safari | Có |
| Không chữ cứng | Tìm chuỗi tiếng Việt trong HTML và `js/components`, `js/sections` | Trước release |
| Copy và trạng thái | `node scripts/check-content.mjs` | Trước release |
| Asset đăng ký | Mọi `src` trong HTML có dòng trong `ASSETS.md` | Trước release |
| Tương phản | Công cụ đo | Trước release |

## 10. Nhật ký

| Ngày | Thay đổi |
|---|---|
| 2026-11-10 | Sắp xếp lại theo 9 section trang chủ. Thêm header, footer, hashtag-marquee vào component. Thứ tự nạp script cập nhật |
