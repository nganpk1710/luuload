/*
 * js/components/ui/eyebrow.js
 * Props: { text: string }. Là <p>, không phải heading.
 */
(function (global) {
  'use strict';

  var LL = (global.LL = global.LL || {});
  LL.components = LL.components || {};

  function Eyebrow(props) {
    return LL.dom.h('p', { class: 'eyebrow', text: props.text, dataset: { reveal: 'fade' } });
  }

  LL.components.Eyebrow = Eyebrow;
})(window);
