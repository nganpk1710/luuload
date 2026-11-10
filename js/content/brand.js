/*
 * js/content/brand.js
 * Trách nhiệm: tên thương hiệu và bốn nhóm chất liệu văn hóa dùng chung.
 * Nguồn: docs/BRAND.md mục 2 và mục 8. File này không có trong bộ tài liệu gửi
 * lần đầu, được tạo lại từ BRAND.md. Chữ lưu dạng câu thường, viết hoa bằng CSS khi cần.
 */
(function (global) {
  'use strict';

  var LL = (global.LL = global.LL || {});
  LL.content = LL.content || {};

  LL.content.brand = {
    // Tên trong văn bản. Lockup LƯULOAD chỉ dùng trong logo (BRAND.md mục 2).
    name: 'Lưu Load',

    logo: {
      // Chữ trong logo theo Figma. TODO(figma): thay bằng SVG lockup (COMPONENTS.md mục 2.1).
      wordmark: 'Lưuload',
      // TODO(figma): xuất SVG biểu tượng "Layer_1" của frame Hero vào images/brand/logo-mark.svg
      // rồi điền đường dẫn. Khi null, logo giữ chỗ trống đúng kích thước.
      mark: null
    },

    // Thứ tự theo BRAND.md. id là slug dùng làm route (D-13 chưa xác nhận).
    culturalGroups: [
      { id: 'art-craft', label: 'Nghệ thuật & Chế tác' },
      { id: 'lifestyle', label: 'Đời sống & Phong vị' },
      { id: 'flow-spirit', label: 'Dòng chảy & Cõi thiêng' },
      { id: 'architecture-landscape', label: 'Kiến trúc & Cảnh quan' }
    ]
  };
})(window);
