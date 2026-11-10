/*
 * js/components/blocks/step-index.js
 * Props: { steps: { index: string, label: string }[] }. Là <ol>.
 */
(function (global) {
  'use strict';

  var LL = (global.LL = global.LL || {});
  LL.components = LL.components || {};
  var h = LL.dom.h;

  function StepIndex(props) {
    var items = props.steps.map(function (s) {
      return h('li', { class: 'steps__item', text: s.index + ' ' + s.label });
    });
    return h('ol', { class: 'steps', dataset: { reveal: 'fade' } }, items);
  }

  LL.components.StepIndex = StepIndex;
})(window);
