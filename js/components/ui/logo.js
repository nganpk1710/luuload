/*
 * js/components/ui/logo.js
 * Props: { variant: 'lockup' | 'mark', href?: string, wordmark: string, mark?: string | null, label: string }
 * Khối vàng chứa biểu tượng và chữ. Biểu tượng chưa có file SVG (TODO(figma)):
 * khi `mark` rỗng, giữ chỗ trống đúng kích thước để hình học header khớp frame.
 */
(function (global) {
  'use strict';

  var LL = (global.LL = global.LL || {});
  LL.components = LL.components || {};
  var h = LL.dom.h;

  function Logo(props) {
    var children = [];
    if (props.variant !== 'mark') {
      children.push(h('span', {
        class: 'logo__mark' + (props.mark ? '' : ' is-empty'),
        attrs: { 'aria-hidden': 'true' }
      }, [props.mark ? h('img', { attrs: { src: props.mark, alt: '' } }) : null]));
    }
    children.push(h('span', { class: 'logo__text', text: props.wordmark }));

    if (props.href) {
      return h('a', { class: 'logo', attrs: { href: props.href, 'aria-label': props.label } }, children);
    }
    return h('span', { class: 'logo', attrs: { 'aria-hidden': 'true' } }, children);
  }

  LL.components.Logo = Logo;
})(window);
