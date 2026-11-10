/*
 * js/content/nav.js
 * Trách nhiệm: nhãn và đường dẫn của nav chính và CTA dùng chung cho Header và Footer.
 * Trạng thái và quyết định liên quan ghi kèm từng mục.
 */
(function (global) {
  'use strict';

  var LL = (global.LL = global.LL || {});
  LL.content = LL.content || {};

  LL.content.nav = {
    primary: [
      { key: 'nav.projects', label: 'Các dự án', href: 'projects/', status: 'proposed', decision: 'D-02' },
      { key: 'nav.community', label: 'Cộng đồng', href: 'community/', status: 'proposed', decision: 'D-02' },
      { key: 'nav.about', label: 'Về chúng tôi', href: 'about/', status: 'proposed', decision: 'D-02' }
    ],
    // Nhãn truy cập dùng chung. Không hiển thị, dành cho screen reader.
    aria: {
      skip: 'Bỏ qua đến nội dung chính',
      primary: 'Chính',
      categories: 'Danh mục'
    },
    cta: {
      key: 'nav.cta',
      label: 'Kết nối ngay',
      href: 'contact/',
      status: 'final',
      decision: 'D-09'
    }
  };
})(window);
