# Lưu Load: Components

> Trách nhiệm của file này: danh mục component (Atomic Design), props, states, a11y, token và motion dùng. Giá trị pixel không ghi ở đây, lấy từ token.

## 1. Quy ước

- Thư mục: `js/components/ui/` cho atoms, `js/components/blocks/` cho molecules và organisms. Section nằm trong `js/sections/`.
- Component nhận props, không đọc chữ trực tiếp. Chữ đến từ `js/content/`.
- Mỗi component là một hàm render nhận object props và trả về node DOM. Không framework.
- Mỗi component ghi: file, props, states, a11y, token, motion.

## 2. Atoms (`js/components/ui/`)

### 2.1 `logo`
| Mục | Nội dung |
|---|---|
| File | `js/components/ui/logo.js` |
| Props | `variant: 'lockup' \| 'mark'`, `href?` |
| States | Default, hover (không đổi), focus-visible |
| A11y | Có `href`: `aria-label` là tên thương hiệu. Trang trí: `aria-hidden` |
| Token | `--color-primary` hoặc `--color-ink` tùy nền |
| Motion | Không |

Logo là SVG, không gõ bằng font.

### 2.2 `button-cta`
| Mục | Nội dung |
|---|---|
| File | `js/components/ui/button-cta.js` |
| Props | `href`, `label`, `disabled?` |
| States | `rest`, `moving`, `open` (theo `p`), `focus-visible`, `active`, `disabled` |
| A11y | Render `<a>` khi có `href`. `disabled`: `aria-disabled="true"`, giữ `href` |
| Token | `--color-accent`, `--color-on-accent`, `--color-red`, `--color-on-red`, `--color-ink`, `--color-paper`, `--radius-pill`, `--fs-button`, `--lh-button` |
| Motion | `MOTION.md` mục 8 |

Knob là `<span aria-hidden="true">`, không focusable. Mũi tên là SVG `aria-hidden`. Cấu trúc theo frame Figma: nhãn và knob đứng cạnh nhau, knob chỉ trượt khi mở.

```js
// Hợp đồng props
// { href: string, label: string, disabled?: boolean }
```

### 2.3 `nav-item`
| Mục | Nội dung |
|---|---|
| File | `js/components/ui/nav-item.js` |
| Props | `href`, `label`, `current?` |
| States | Default, hover, focus-visible, current |
| A11y | `aria-current="page"` khi `current`. Nằm trong `<nav>` |
| Token | `--color-neutral-100`, `--color-accent`, `--color-primary`, `--fs-nav`, `--lh-nav`, `--radius-pill` |
| Motion | `MOTION.md` mục 7 |

### 2.4 `icon-circle`
| Mục | Nội dung |
|---|---|
| File | `js/components/ui/icon-circle.js` |
| Props | `icon` (SVG string hoặc node), `tone: 'primary' \| 'accent' \| 'red'` |
| States | Default, hover (icon scale 1.06, `playful`) |
| A11y | Trang trí, `aria-hidden` trừ khi nằm trong link |
| Token | `--color-{tone}`, `--color-on-{tone}`, `--radius-pill`, `--icon-circle` |

`tone` ép hai lớp khác màu. Component không nhận cặp màu trùng nhau.

### 2.5 `heading`
| Mục | Nội dung |
|---|---|
| File | `js/components/ui/heading.js` |
| Props | `level: 1 \| 2 \| 3`, `size: 'display' \| 'lg' \| 'md' \| 'sm'`, `tone: 'ink' \| 'primary'` |
| A11y | `level` là ngữ nghĩa, `size` là thị giác. Tách hai thứ. Đúng một `<h1>` mỗi trang |
| Token | `--fs-h-*`, `--lh-h-*`, `--ls-display`, `--font-display` |

### 2.6 `text`
| Mục | Nội dung |
|---|---|
| File | `js/components/ui/text.js` |
| Props | `role: 'body' \| 'small' \| 'caption' \| 'label'`, `as?: 'p' \| 'span' \| 'li'`, `tone?: 'ink' \| 'muted'` |
| A11y | Không dùng để tạo heading |
| Token | `--fs-{role}`, `--lh-{role}`, `--color-ink`, `--color-neutral-600` |

`muted` dùng `neutral-600`. Không dùng `neutral-500` cho chữ.

### 2.7 `eyebrow`
| Mục | Nội dung |
|---|---|
| File | `js/components/ui/eyebrow.js` |
| Props | `text` |
| A11y | Là `<p>`, không phải heading |
| Token | Role `label`, viết hoa qua CSS |

### 2.8 `skip-link`
| Mục | Nội dung |
|---|---|
| File | `js/components/ui/skip-link.js` |
| Props | `targetId` (mặc định `main`) |
| States | Ẩn đến khi focus, khi focus hiện góc trên trái |
| A11y | Phần tử đầu tiên trong DOM |
| Token | `--color-primary` nền, `--color-on-primary` chữ, `--focus-*` |

### 2.9 `icon`
| Mục | Nội dung |
|---|---|
| File | `js/components/ui/icon.js` |
| Props | `name`, `size?`, `label?` |
| A11y | `aria-hidden` mặc định. Có `label` thì là `role="img"` |
| Token | `currentColor` |

Bộ icon: `TODO(figma)`.

## 3. Molecules (`js/components/blocks/`)

### 3.1 `section-bar`
| Mục | Nội dung |
|---|---|
| File | `js/components/blocks/section-bar.js` |
| Props | `index` (ví dụ `"01"`), `title`, `tone: 'primary' \| 'accent' \| 'red'` |
| A11y | Số thứ tự `aria-hidden`, có `sr-only` nếu cần đọc |
| Token | `--color-{tone}`, `--color-on-{tone}`, `--fs-h-md`, `--space-*` |

Người gọi truyền `tone` theo thứ tự `primary`, `accent`, `red`. Component không tự xoay vòng.

### 3.2 `step-index`
| Mục | Nội dung |
|---|---|
| File | `js/components/blocks/step-index.js` |
| Props | `steps: { index, label }[]` |
| A11y | `<ol>` |
| Token | `--fs-label`, `tabular-nums` |

### 3.3 `category-nav`
| Mục | Nội dung |
|---|---|
| File | `js/components/blocks/category-nav.js` |
| Props | `items: { label, href }[]`, `ariaLabel` |
| A11y | `<nav aria-label>` với `<ul>`. Tách với nav chính |
| States | Default, hover, focus-visible |
| Motion | `MOTION.md` mục 7 |

### 3.4 `meta`
| Mục | Nội dung |
|---|---|
| File | `js/components/blocks/meta.js` |
| Props | `location`, `copyright` |
| A11y | `<p>` hoặc `<dl>` |
| Token | `--fs-caption`, `--color-ink` |

## 4. Organisms

### 4.1 `header`
| Mục | Nội dung |
|---|---|
| File | `js/components/blocks/header.js` |
| Props | `logo`, `links: NavItemProps[]`, `cta: ButtonCtaProps`, `currentPath` |
| Cấu trúc | `<header>` → logo + `<nav aria-label="Chính">` → `nav-item`[] + `button-cta` |
| A11y | Logo và nav tách rõ. CTA là phần tử cuối của nav |

### 4.2 `hero-mosaic`
| Mục | Nội dung |
|---|---|
| File | `js/components/blocks/hero-mosaic.js` |
| Props | `items: { id, area, tone, art: { 1440, 1920 } \| null }[]` (mỗi khối: màu token và SVG nguyên khối tùy chọn) |
| A11y | `aria-hidden="true"`, không focusable, không có chữ |
| Motion | `MOTION.md` mục 6 |

Chỉ nhận ảnh trang trí. Ảnh có ý nghĩa dùng component khác.

### 4.3 `site-strip`
| Mục | Nội dung |
|---|---|
| File | `js/components/blocks/site-strip.js` |
| Props | `left?: string`, `right?: string` |
| Ghi chú | Khi thiếu copy (D-07), render khung, không render chữ |

### 4.4 `hero` (section)
| Mục | Nội dung |
|---|---|
| File | `js/sections/home-hero.js` |
| Section ID | `home.hero` |
| Props | Không. Đọc `LL.content.home.hero` |
| Spec | `docs/specs/home-hero.md` |

## 5. Bảng tổng

| ID | Tầng | File | Trạng thái |
|---|---|---|---|
| `ui.logo` | Atom | `js/components/ui/logo.js` | Đã dựng. Chờ SVG biểu tượng (giữ chỗ trống) |
| `ui.button-cta` | Atom | `js/components/ui/button-cta.js` | Đã dựng. Knob cạnh nhãn theo frame. Chưa đo trên thiết bị (D-10) |
| `ui.nav-item` | Atom | `js/components/ui/nav-item.js` | Đã dựng. Chưa có frame hover |
| `ui.icon-circle` | Atom | `js/components/ui/icon-circle.js` | Có token |
| `ui.heading` | Atom | `js/components/ui/heading.js` | Đã dựng |
| `ui.text` | Atom | `js/components/ui/text.js` | Có token |
| `ui.eyebrow` | Atom | `js/components/ui/eyebrow.js` | Đã dựng |
| `ui.skip-link` | Atom | `js/components/ui/skip-link.js` | Đã dựng |
| `ui.icon` | Atom | `js/components/ui/icon.js` | Chờ bộ icon |
| `blocks.section-bar` | Molecule | `js/components/blocks/section-bar.js` | Có token |
| `blocks.step-index` | Molecule | `js/components/blocks/step-index.js` | Đã dựng, định dạng `(1)` theo frame (D-12) |
| `blocks.category-nav` | Molecule | `js/components/blocks/category-nav.js` | Đã dựng. Route chờ D-08, D-13 |
| `blocks.meta` | Molecule | `js/components/blocks/meta.js` | Đã dựng |
| `blocks.header` | Organism | `js/components/blocks/header.js` | Đã dựng. Copy chờ D-02 |
| `blocks.hero-mosaic` | Organism | `js/components/blocks/hero-mosaic.js` | Đã dựng với SVG trong `images/hero/mosaic/` |
| `blocks.site-strip` | Organism | `js/components/blocks/site-strip.js` | Đã dựng. Chữ theo frame, chờ xác nhận D-07 |
| `home.hero` | Section | `js/sections/home-hero.js` | G0 xong. Layout 1440 và 1920 đã đo |

## 6. Quy tắc thêm component

1. Vẽ trong Figma trước, đủ trạng thái.
2. Thêm dòng vào mục 5 với trạng thái.
3. Viết props và states vào mục tương ứng.
4. Viết code. Không dùng giá trị ngoài token.
5. Kiểm a11y: focus, tương phản, `aria-*`.
