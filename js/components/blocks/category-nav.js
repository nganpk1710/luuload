/*
 * js/components/blocks/category-nav.js
 * Props: { items: { label: string, href: string }[], ariaLabel: string }
 * Mũi tên chỉ hiện khi hover hoặc focus-visible (frame Figma không vẽ mũi tên lúc nghỉ).
 * Chuyển động: docs/MOTION.md mục 7.
 */
(function (global) {
  'use strict';

  var LL = (global.LL = global.LL || {});
  LL.components = LL.components || {};
  var h = LL.dom.h;

  function arrow() {
    return LL.dom.svg('svg', { viewBox: '0 0 24 24', 'aria-hidden': 'true', focusable: 'false', class: 'cat-link__arrow' }, [
      LL.dom.svg('path', {
        d: 'M5 12h14M13 6l6 6-6 6',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '2.2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      })
    ]);
  }

  function CategoryNav(props) {
    var items = props.items.map(function (it) {
      return h('li', {}, [
        h('a', { class: 'cat-link', attrs: { href: it.href } }, [
          h('span', { class: 'cat-link__text', text: it.label }),
          arrow()
        ])
      ]);
    });
    return h('nav', { class: 'cats', attrs: { 'aria-label': props.ariaLabel }, dataset: { reveal: 'fade' } }, [
      h('ul', { class: 'cats__list' }, items)
    ]);
  }

  LL.components.CategoryNav = CategoryNav;
})(window);
