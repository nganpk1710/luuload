/*
 * js/components/blocks/header.js
 * Props: { logo: LogoProps, links: NavItemProps[], cta: ButtonCtaProps, currentPath?: string,
 *          ariaLabel: string }
 * Cấu trúc: <header> → logo + <nav aria-label> → <ul> nav-item[] + button-cta (phần tử cuối).
 */
(function (global) {
  'use strict';

  var LL = (global.LL = global.LL || {});
  LL.components = LL.components || {};
  var h = LL.dom.h;

  function Header(props) {
    var items = props.links.map(function (link) {
      return h('li', {}, [LL.components.NavItem({
        href: link.href,
        label: link.label,
        current: props.currentPath != null && props.currentPath === link.href
      })]);
    });

    var nav = h('nav', { class: 'site-nav', attrs: { 'aria-label': props.ariaLabel }, dataset: { reveal: 'fade' } }, [
      h('ul', { class: 'nav-list' }, items),
      LL.components.ButtonCta(props.cta)
    ]);

    return h('header', { class: 'site-header' }, [LL.components.Logo(props.logo), nav]);
  }

  LL.components.Header = Header;
})(window);
