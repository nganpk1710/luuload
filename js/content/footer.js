/*
 * js/content/footer.js
 * Trách nhiệm: chữ và liên kết của footer dùng chung (D-19). Nguồn: Figma 2155:1493 (1920).
 * href null: chưa có đường dẫn, footer hiển thị chữ không phải liên kết (TODO(content)).
 */
(function (global) {
  'use strict';

  var LL = (global.LL = global.LL || {});
  LL.content = LL.content || {};
  var nav = LL.content.nav;

  LL.content.footer = {
    lockup: { src: 'images/footer/shape-footer.svg', width: 917, height: 442, alt: LL.content.brand.name },
    tagline: { value: 'Where creativity meets culture', status: 'proposed' },
    columns: [
      {
        id: 'explore',
        title: { value: 'explore', status: 'proposed' },
        links: [
          { label: 'về tụi mình', href: nav.primary[2].href, status: 'proposed' },
          { label: 'các dự án', href: nav.primary[0].href, status: 'proposed' },
          { label: 'cộng đồng', href: nav.primary[1].href, status: 'proposed' }
        ]
      },
      {
        id: 'connect',
        title: { value: 'connect', status: 'proposed' },
        links: [
          { label: 'kết nối ngay', href: nav.cta.href, status: 'proposed' },
          // D-23: chữ bị cắt trong Figma ("bran"). Giữ đúng thiết kế, chờ bản đầy đủ.
          { label: 'promote your bran', href: null, status: 'pending', decision: 'D-23' }
        ]
      },
      {
        id: 'social',
        title: { value: 'social', status: 'proposed' },
        // TODO(content): đường dẫn mạng xã hội.
        links: [
          { label: 'facebook', href: null, status: 'pending' },
          { label: 'instagram', href: null, status: 'pending' },
          { label: 'behance', href: null, status: 'pending' }
        ]
      }
    ],
    copyright: { value: '© 2026 LưuLoad · hello.luuload.com.vn', status: 'pending', decision: 'D-17, D-23' },
    credit: { label: 'Created by', name: 'NganKim', status: 'pending', decision: 'D-23' },
    aria: { nav: { value: 'Liên kết cuối trang', status: 'proposed' } },
    backToTop: { label: 'Về đầu trang', href: '#main', icon: 'images/footer/back-to-top.svg', status: 'proposed' }
  };
})(window);
