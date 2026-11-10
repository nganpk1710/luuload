/*
 * js/components/blocks/site-strip.js
 * Props: { left?: string, right?: string }
 * Khi thiếu copy (D-07) vẫn render khung và đường kẻ, không render chữ.
 */
(function (global) {
  'use strict';

  var LL = (global.LL = global.LL || {});
  LL.components = LL.components || {};
  var h = LL.dom.h;

  function SiteStrip(props) {
    return h('div', { class: 'strip', dataset: { reveal: 'fade' } }, [
      h('span', { class: 'strip__label', text: props.left || '' }),
      h('span', { class: 'strip__line', attrs: { 'aria-hidden': 'true' } }),
      h('span', { class: 'strip__label', text: props.right || '' })
    ]);
  }

  LL.components.SiteStrip = SiteStrip;
})(window);
