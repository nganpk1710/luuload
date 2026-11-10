/*
 * js/content/home.js
 * Trách nhiệm: toàn bộ chữ và liên kết của trang chủ. Đây là nguồn duy nhất.
 * Layout không phụ thuộc vào copy. Sửa chữ ở đây, không sửa trong HTML.
 * status 'pending' chặn build production (scripts/check-content.mjs).
 * Spec: docs/specs/home-hero.md.
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
      // Chờ D-01: "Cộng đồng" có mâu thuẫn với tagline cũ (xem spec mục 10).
      h1: [
        { value: 'Cộng đồng', status: 'pending', decision: 'D-01' },
        { value: 'Creatives Việt Nam', status: 'pending', decision: 'D-01' }
      ],

      // Copy tạm. Chờ D-01.
      tagline: {
        value: 'TODO(content): tagline mới sau khi chốt D-01',
        status: 'pending',
        decision: 'D-01'
      },

      steps: [
        { index: '01', label: 'Tìm kiếm', status: 'proposed', decision: 'D-12' },
        { index: '02', label: 'Kết nối', status: 'proposed', decision: 'D-12' },
        { index: '03', label: 'Sáng tạo', status: 'proposed', decision: 'D-12' }
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
        location: { value: 'Sài Gòn, Việt Nam', status: 'proposed' }
        // Năm bản quyền lấy động lúc render, không hardcode.
      },

      // Chờ D-07. Khung strip vẫn render, nội dung để trống khi pending.
      strip: {
        left: { value: 'TODO(content): strip trái', status: 'pending', decision: 'D-07' },
        right: { value: 'TODO(content): strip phải', status: 'pending', decision: 'D-07' }
      }
    },

    // Mosaic là trang trí. Điền khi có ảnh và tên file.
    // TODO(figma): danh sách ảnh và kích thước theo breakpoint.
    mosaic: []
  };
})(window);
