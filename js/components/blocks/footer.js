/*
 * js/components/blocks/footer.js
 * Footer dùng chung mọi trang (D-19). Figma 2155:1493. Nội dung: LL.content.footer.
 * Liên kết chưa có href hiển thị dạng chữ (TODO(content)).
 */
(function (global) {
  'use strict';

  var LL = (global.LL = global.LL || {});
  LL.components = LL.components || {};
  var h = LL.dom.h;

  function Footer() {
    var c = LL.content.footer;

    var cols = c.columns.map(function (col) {
      return h('div', { class: 'ft__col ft__col--' + col.id }, [
        h('h2', { class: 'ft__heading', text: col.title.value }),
        h('ul', { class: 'ft__links' }, col.links.map(function (l) {
          return h('li', null, [
            l.href
              ? h('a', { class: 'ft__link', attrs: { href: l.href }, text: l.label })
              : h('span', { class: 'ft__link', text: l.label })
          ]);
        }))
      ]);
    });

    return h('footer', { class: 'ft', attrs: { 'data-section': 'site.footer' } }, [
      h('div', { class: 'ft__stage' }, [
        h('img', { class: 'ft__lockup', attrs: { src: c.lockup.src, width: String(c.lockup.width), height: String(c.lockup.height), alt: c.lockup.alt, loading: 'lazy' } }),
        h('p', { class: 'ft__tagline', text: c.tagline.value }),
        h('nav', { class: 'ft__nav', attrs: { 'aria-label': c.aria.nav.value } }, cols),
        h('p', { class: 'ft__copy', text: c.copyright.value }),
        h('p', { class: 'ft__credit' }, [
          h('span', { class: 'ft__credit-label', text: c.credit.label }),
          h('span', { class: 'ft__credit-name', text: c.credit.name })
        ]),
        h('a', { class: 'ft__top', attrs: { href: c.backToTop.href, 'aria-label': c.backToTop.label } }, [
          h('img', { attrs: { src: c.backToTop.icon, width: '99', height: '99', alt: '', 'aria-hidden': 'true' } })
        ])
      ])
    ]);
  }

  LL.components.Footer = Footer;
})(window);
