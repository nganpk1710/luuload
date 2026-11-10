/*
 * js/components/blocks/hero-mosaic.js
 * Props: { items: { id, area, tone, art: { 1440: string, 1920: string } | null }[] }
 * Chỉ nhận ảnh trang trí: aria-hidden, không focusable, không có chữ.
 * Mỗi khối là màu phẳng (token) kèm SVG nguyên khối từ Graphic element.
 * <picture> đổi nguồn 1440 sang 1920 tại 1680px (điểm giữa hai frame).
 */
(function (global) {
  'use strict';

  var LL = (global.LL = global.LL || {});
  LL.components = LL.components || {};
  var h = LL.dom.h;

  var SWITCH_MEDIA = '(min-width: 1680px)';

  function tile(item) {
    var kids = [];
    if (item.art) {
      var picture = h('picture', {}, [
        h('source', { attrs: { media: SWITCH_MEDIA, srcset: item.art[1920] } }),
        h('img', { attrs: { src: item.art[1440], alt: '', decoding: 'async', draggable: 'false' } })
      ]);
      kids.push(picture);
    }
    return h('div', {
      class: 'tile tile--' + item.tone,
      dataset: { area: item.area, reveal: 'tile' }
    }, kids);
  }

  function HeroMosaic(props) {
    return h('div', { class: 'mosaic', attrs: { 'aria-hidden': 'true' } }, props.items.map(tile));
  }

  LL.components.HeroMosaic = HeroMosaic;
})(window);
