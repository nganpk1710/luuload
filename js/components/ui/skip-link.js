/*
 * js/components/ui/skip-link.js
 * Props: { label: string, targetId?: string } (mặc định 'main'). Phần tử đầu tiên trong DOM.
 */
(function (global) {
  'use strict';

  var LL = (global.LL = global.LL || {});
  LL.components = LL.components || {};

  function SkipLink(props) {
    return LL.dom.h('a', {
      class: 'skip-link',
      text: props.label,
      attrs: { href: '#' + (props.targetId || 'main') }
    });
  }

  LL.components.SkipLink = SkipLink;
})(window);
