/*
 * js/sections/home-community.js
 * Section ID: home.community. Spec: docs/section-details/home-community.md. Nội dung: LL.content.home.community.
 * Hover thẻ nhóm: docs/MOTION.md mục 8 (CSS). Chưa có route nhóm (D-13) nên thẻ chưa là liên kết.
 */
(function (global) {
  'use strict';

  var LL = (global.LL = global.LL || {});
  LL.sections = LL.sections || {};
  var h = LL.dom.h;

  function img(src, w, ht, alt, cls) {
    return h('img', { class: cls || null, attrs: { src: src, width: String(w), height: String(ht), alt: alt || '', 'aria-hidden': alt ? null : 'true', decoding: 'async', loading: 'lazy' } });
  }

  function HomeCommunity() {
    var c = LL.content.home.community;
    var nav = LL.content.nav;
    var d = 0;
    function fade(el) {
      el.setAttribute('data-reveal', 'fade');
      el.style.setProperty('--reveal-delay', (d++ * LL.motion.stagger.groups) + 'ms');
      return el;
    }

    function crosshairs(cls) {
      return h('span', { class: 'cm__cross ' + cls, attrs: { 'aria-hidden': 'true' } }, [
        img(c.crosshair, 36, 36), img(c.crosshair, 36, 36)
      ]);
    }

    var root = h('section', {
      class: 'cm is-pending',
      attrs: { id: 'home-community', 'aria-labelledby': 'cm-title' },
      dataset: { section: 'home.community' }
    }, [
      h('div', { class: 'cm__stage' }, [
        h('span', { class: 'cm__shapes cm__shapes--l', attrs: { 'aria-hidden': 'true' } }, [img(c.shapes, 218, 58)]),
        h('span', { class: 'cm__shapes cm__shapes--r', attrs: { 'aria-hidden': 'true' } }, [img(c.shapes, 218, 58)]),
        fade(h('p', { class: 'cm__eyebrow', text: c.eyebrow.value })),
        h('h2', { class: 'cm__title', attrs: { id: 'cm-title' } }, [
          fade(h('span', { class: 'cm__top', text: c.titleTop.value })),
          ' ',
          fade(h('span', { class: 'cm__main', text: c.titleMain.value }))
        ]),
        fade(h('p', { class: 'cm__lead cm__lead--l', text: c.lead.value })),
        fade(h('p', { class: 'cm__lead cm__lead--r', text: c.lead.value, attrs: { 'aria-hidden': 'true' } })),
        crosshairs('cm__cross--l'),
        crosshairs('cm__cross--r'),
        h('div', { class: 'cm__cta' }, [LL.components.ButtonCta({ href: nav.cta.href, label: nav.cta.label })]),
        h('ul', { class: 'cm__cards', attrs: { 'aria-label': c.groupsLabel.value } }, c.groups.map(function (g) {
          return fade(h('li', { class: 'cm__card' }, [img(g.src, 441, 520, g.alt.value)]));
        }))
      ])
    ]);
    return root;
  }

  function initHomeCommunity(root) { LL.reveal.once(root); }

  LL.sections.HomeCommunity = HomeCommunity;
  LL.sections.initHomeCommunity = initHomeCommunity;
})(window);
