/*
 * js/sections/home-last-cta.js
 * Section ID: home.last-cta. Figma 2155:1472. Nội dung: LL.content.home.lastCta. CTA dùng nav.cta (D-09).
 * TODO(figma): nền sọc (Vector 27, node 2155:1473) và hai hình sao (2155:1484, 2155:1486) chưa có file.
 */
(function (global) {
  'use strict';

  var LL = (global.LL = global.LL || {});
  LL.sections = LL.sections || {};
  var h = LL.dom.h;

  function HomeLastCta() {
    var c = LL.content.home.lastCta;
    var nav = LL.content.nav;
    var d = 0;
    function fade(el) {
      el.setAttribute('data-reveal', 'fade');
      el.style.setProperty('--reveal-delay', (d++ * LL.motion.stagger.groups) + 'ms');
      return el;
    }

    var title = h('h2', { class: 'lc__title', attrs: { id: 'lc-title' } }, c.lines.map(function (l, i) {
      return fade(h('span', { class: 'lc__line lc__line--' + (i + 1), text: l.value }));
    }));

    var photos = c.photos.map(function (p) {
      return fade(h('img', { class: 'lc__photo lc__photo--' + p.id, attrs: { src: p.src, width: String(p.width), height: String(p.height), alt: p.alt.value, loading: 'lazy', decoding: 'async' } }));
    });
    var labels = c.labels.map(function (l) {
      return fade(h('img', { class: 'lc__label lc__label--' + l.id, attrs: { src: l.src, width: '158', height: '41', alt: l.alt.value, loading: 'lazy' } }));
    });

    return h('section', {
      class: 'lc is-pending',
      attrs: { id: 'home-last-cta', 'aria-labelledby': 'lc-title' },
      dataset: { section: 'home.last-cta' }
    }, [
      h('div', { class: 'lc__stage' }, [title].concat(photos, labels, [
        h('div', { class: 'lc__cta' }, [LL.components.ButtonCta({ href: nav.cta.href, label: nav.cta.label })])
      ]))
    ]);
  }

  LL.sections.HomeLastCta = HomeLastCta;
  LL.sections.initHomeLastCta = function (root) { LL.reveal.once(root); };
})(window);
