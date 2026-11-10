/*
 * js/components/ui/nav-item.js
 * Props: { href: string, label: string, current?: boolean }
 * A11y: aria-current="page" khi current. Phải nằm trong <nav>.
 */
(function (global) {
  'use strict';

  var LL = (global.LL = global.LL || {});
  LL.components = LL.components || {};
  var h = LL.dom.h;

  function NavItem(props) {
    return h('a', {
      class: 'nav-item',
      attrs: { href: props.href, 'aria-current': props.current ? 'page' : null }
    }, [h('span', { class: 'nav-item__text', text: props.label })]);
  }

  LL.components.NavItem = NavItem;
})(window);
