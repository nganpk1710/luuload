/*
 * js/components/blocks/meta.js
 * Props: { location: string, copyright: string }
 */
(function (global) {
  'use strict';

  var LL = (global.LL = global.LL || {});
  LL.components = LL.components || {};
  var h = LL.dom.h;

  function Meta(props) {
    return h('p', { class: 'meta', dataset: { reveal: 'fade' } }, [
      h('span', { class: 'meta__location', text: props.location }),
      h('span', { class: 'meta__copyright', text: props.copyright })
    ]);
  }

  LL.components.Meta = Meta;
})(window);
