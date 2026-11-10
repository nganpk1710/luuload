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
        value: 'Where creativity meets culture for young minds creatives local brand và agency where creativity meets',
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
