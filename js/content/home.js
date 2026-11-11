/*
 * js/content/home.js
 * Trách nhiệm: toàn bộ chữ và liên kết của trang chủ. Đây là nguồn duy nhất.
 * Layout không phụ thuộc vào copy. Sửa chữ ở đây, không sửa trong HTML.
 * status 'pending' chặn build production (scripts/check-content.mjs).
 * Spec: docs/specs/home-hero.md.
 *
 * 2026-11-10: copy của H1, tagline, strip lấy theo frame Figma Hero (người dùng
 * chỉ định "follow Reference"). Chuyển từ 'pending' sang 'proposed'. D-01 vẫn CHỜ,
 * vì tagline còn chữ "agency" (BRAND.md mục 7 đề xuất bỏ).
 */
(function (global) {
  'use strict';

  var LL = (global.LL = global.LL || {});
  LL.content = LL.content || {};

  var brand = LL.content.brand;

  LL.content.home = {
    // Preloader (home.preloader). Figma 2357:1661. Logo là SVG lockup (images/preloader/logo.svg).
    preloader: {
      logo: { src: 'images/brand/logo-lockup.svg', width: 214, height: 35, alt: brand.name },
      background: { src: 'images/preloader/background.webp', width: 1920, height: 900 },
      label: { value: 'Loading', status: 'proposed' },
      tagTop: { value: 'creative', status: 'proposed' },
      tagBottom: { value: 'community', status: 'proposed' },
      aria: { value: 'Đang tải trang', status: 'proposed' }
    },

    // Section home.last-cta. Figma 2155:1472 (chỉ có 1920).
    lastCta: {
      lines: [
        { value: 'sẵn sàng', status: 'proposed' },
        { value: 'kết nối cùng', status: 'proposed' },
        { value: 'chúng tôi', status: 'proposed' }
      ],
      photos: [
        { id: 'working', src: 'images/last-cta/people-working.webp', width: 472, height: 328, alt: { value: 'Một nhóm bạn trẻ cùng làm thủ công quanh một bàn lớn', status: 'proposed' } },
        { id: 'young', src: 'images/last-cta/young-people.webp', width: 374, height: 277, alt: { value: 'Nhóm bạn trẻ cười đùa chụp ảnh cùng nhau', status: 'proposed' } }
      ],
      // Chữ trong nhãn đã outline trong SVG. Nhãn là trang trí, chữ đọc qua alt.
      labels: [
        { id: 'creativity', src: 'images/last-cta/label-creativity.svg', alt: { value: '#creativity', status: 'proposed' } },
        { id: 'connection', src: 'images/last-cta/label-connection.svg', alt: { value: '#connection', status: 'proposed' } }
      ]
    },

    // Section home.usp. Frame Figma 2155:1423 (chỉ có 1920). Spec: docs/section-details/home-usp.md.
    usp: {
      h2: {
        lead: { value: 'lưu load', status: 'proposed', decision: 'D-17' },
        asideTop: { value: 'ai load lên', status: 'pending', decision: 'D-01' },
        asideBottom: { value: 'đều là người đẹp', status: 'pending', decision: 'D-01' },
        cho: { value: 'cho', status: 'proposed' },
        tail: { value: 'văn hóa đương đại.', status: 'proposed' }
      },
      left: { value: 'Vươn tầm khu vực bằng bản sắc văn hóa bản địa kết hợp tư duy toàn cầu.', status: 'proposed' },
      right: { value: 'Kết nối cộng đồng Creatives thông qua các chiến dịch nghệ thuật đột phá', status: 'proposed' },
      cta: { label: { value: 'xem thêm', status: 'pending' }, href: { value: '#', status: 'pending', decision: 'D-13' } },
      // Chữ trong SVG panel đã outline. TODO(figma): SVG Vision ghi "tầm nhín" (thiếu dấu huyền?), cần xác nhận.
      panels: [
        { id: 'vision', src: 'images/usp/vision.svg', width: 640, height: 654, alt: { value: '(01) Tầm nhìn', status: 'proposed' } },
        { id: 'mission', src: 'images/usp/mission.svg', width: 640, height: 654, alt: { value: '(02) Sứ mệnh', status: 'proposed' } },
        { id: 'value', src: 'images/usp/core-value.svg', width: 640, height: 654, alt: { value: '(03) Giá trị cốt lõi', status: 'proposed' } }
      ],
      badges: [
        { src: 'images/usp/badge-blue.svg', width: 73, height: 71 },
        { src: 'images/usp/badge-red.svg', width: 73, height: 71 }
      ]
    },

    // Section home.hashtag. Frame Figma 2155:1230 (chỉ có 1920). Hashtag không dấu theo thiết kế (D-22).
    hashtag: {
      label: { value: 'Hashtag cộng đồng', status: 'pending' },
      crosshair: 'images/hashtag/crosshair.svg',
      // kind: pill (chữ) hoặc shape (hình tròn). Thứ tự = thứ tự trong frame, trái sang phải.
      rows: [
        [
          { kind: 'shape', src: 'images/hashtag/circles-blue.svg' },
          { kind: 'pill', id: 'sang', tone: 'primary', text: { value: '#sangngutoitao', status: 'pending', decision: 'D-22' } },
          { kind: 'shape', src: 'images/hashtag/star-yellow.svg' },
          { kind: 'shape', src: 'images/hashtag/plus-red.svg' },
          { kind: 'pill', id: 'dna', tone: 'sky', text: { value: '#DNAVietLenSong', status: 'pending', decision: 'D-22' } },
          { kind: 'pill', id: 'khongan', tone: 'orange', text: { value: '#Khongankhongngu', status: 'pending', decision: 'D-22' } }
        ],
        [
          { kind: 'pill', id: 'van', tone: 'primary', text: { value: '#VanHoakhongRutPhich', status: 'pending', decision: 'D-22' } },
          { kind: 'shape', src: 'images/hashtag/star-yellow.svg' },
          { kind: 'pill', id: 'tien', tone: 'orange', text: { value: '#tienlenvietnam', status: 'pending', decision: 'D-22' } },
          { kind: 'shape', src: 'images/hashtag/circles-blue.svg' },
          { kind: 'pill', id: 'annen', tone: 'sky', text: { value: '#annenlamra', status: 'pending', decision: 'D-22' } }
        ]
      ]
    },

    // Section home.community. Frame Figma 2155:1323 (chỉ có 1920).
    community: {
      eyebrow: { value: 'community for young creative', status: 'proposed' },
      titleTop: { value: 'gia nhập', status: 'proposed' },
      titleMain: { value: 'cộng đồng', status: 'proposed' },
      // D-21: cùng một câu ở hai bên. Bản phải là trang trí (aria-hidden).
      lead: { value: 'Khám phá không gian làm việc, những dự án chớm nở và cách tụi mình định nghĩa sáng tạo', status: 'pending', decision: 'D-21' },
      shapes: 'images/community/shapes.svg',
      crosshair: 'images/hashtag/crosshair.svg',
      // Chữ tên nhóm nằm trong SVG (đã outline). D-13: chưa có route nên chưa là liên kết.
      groups: [
        { id: 'art-craft', src: 'images/community/art-craft.svg', alt: { value: '(01) Nghệ thuật & chế tác', status: 'proposed' } },
        { id: 'life-flavor', src: 'images/community/life-flavor.svg', alt: { value: '(02) Đời sống & Phong vị', status: 'proposed' } },
        { id: 'flow-sacred', src: 'images/community/flow-sacred.svg', alt: { value: '(03) Dòng chảy & Cõi thiêng', status: 'proposed' } },
        { id: 'architecture-landscape', src: 'images/community/architecture-landscape.svg', alt: { value: '(04) Kiến trúc & cảnh quan', status: 'proposed' } }
      ],
      groupsLabel: { value: 'Các nhóm văn hóa', status: 'pending', decision: 'D-13' }
    },

    // Section home.features-projects. Copy theo frame Figma 2221:375. CTA dùng nav.cta (D-09).
    featuresProjects: {
      heading: { value: 'thành quả sáng tạo', status: 'proposed' },
      lead: {
        value: 'Sáng tạo ở Việt Nam giống như việc cắm sạc lỏng: Ý tưởng thì rực rỡ, văn hóa thì bao la, nhưng cứ hễ cất tiếng là sợ "lạc trôi"',
        status: 'proposed'
      },
      galleryLabel: { value: 'Dự án nổi bật', status: 'pending', decision: 'D-20' }
    },

    hero: {
      eyebrow: { value: 'Dành cho', status: 'proposed' },

      // Mỗi dòng là một <span display="block"> trong một <h1> duy nhất.
      // Chờ D-01: "Cộng đồng" mâu thuẫn với chữ "agency" trong tagline.
      h1: [
        { value: 'Cộng đồng', status: 'proposed', decision: 'D-01' },
        { value: 'Creatives Việt Nam', status: 'proposed', decision: 'D-01' }
      ],

      // Một câu. Dòng 1 thụt vào để chừa chỗ cho "( → )", dòng 2 xuống dòng tự nhiên.
      // Frame Figma kết thúc bằng "where creativity meets"; bản người dùng gõ trong yêu cầu
      // dừng ở "agency". Giữ theo frame, chờ người dùng xác nhận (xem báo cáo).
      tagline: {
        value: 'An independent agency and creative community connecting young minds, local brands', // Figma Hero 2363:2492 (bản mới nhất)
        status: 'proposed',
        decision: 'D-01'
      },

      // Định dạng "(1)" theo frame Figma, lệch D-12 (đề xuất "01").
      steps: [
        { index: '(1)', label: 'tìm kiếm', status: 'proposed', decision: 'D-12' },
        { index: '(2)', label: 'kết nối', status: 'proposed', decision: 'D-12' },
        { index: '(3)', label: 'sáng tạo', status: 'proposed', decision: 'D-12' }
      ],

      // Lấy từ brand.js. Route chưa xác nhận (D-13), nên pending.
      categories: brand.culturalGroups.map(function (g) {
        return {
          label: g.label,
          href: 'categories/' + g.id + '/',
          status: 'pending',
          decision: 'D-08'
        };
      }),

      meta: {
        // Frame Figma ghi "SaiGon, Vietnam" (không dấu). Giữ theo frame, lệch CONTENT.md mục 4.
        location: { value: 'SaiGon, Vietnam', status: 'proposed' }
        // Năm bản quyền lấy động lúc render, không hardcode.
      },

      // D-07: frame Figma đã có chữ cho strip. Chờ xác nhận.
      strip: {
        left: { value: 'Culture loaded', status: 'proposed', decision: 'D-07' },
        right: { value: 'Ready to deploy', status: 'proposed', decision: 'D-07' }
      }
    },

    // Mosaic là trang trí (aria-hidden). Bảy khối, tên vùng theo lưới của frame:
    //   col 1: big (2 hàng) | col 2: yl, red | col 3: bs, mm | col 4: mr, yr
    // tone: màu nền khối (token). art: SVG nguyên khối từ Graphic element, theo từng frame.
    // Khối không có art chỉ là màu phẳng.
    mosaic: [
      { id: 'big', area: 'big', tone: 'primary', art: { 1440: 'images/hero/mosaic/1440/big-shape-blue.svg', 1920: 'images/hero/mosaic/1920/big-shape-blue.svg' } },
      { id: 'yl', area: 'yl', tone: 'accent', art: { 1440: 'images/hero/mosaic/1440/yellow-shape-left.svg', 1920: 'images/hero/mosaic/1920/yellow-shape-left.svg' } },
      { id: 'bs', area: 'bs', tone: 'primary', art: null },
      { id: 'mr', area: 'mr', tone: 'mint', art: null },
      { id: 'red', area: 'red', tone: 'red', art: null },
      { id: 'mm', area: 'mm', tone: 'mint', art: { 1440: 'images/hero/mosaic/1440/mint-shape-middle.svg', 1920: 'images/hero/mosaic/1920/mint-shape-middle.svg' } },
      { id: 'yr', area: 'yr', tone: 'accent', art: { 1440: 'images/hero/mosaic/1440/yellow-shape-right.svg', 1920: 'images/hero/mosaic/1920/yellow-shape-right.svg' } }
    ]
  };
})(window);
