/*
 * js/sections/home-usp.js
 * Section ID: home.usp. Spec: docs/section-details/home-usp.md. Nội dung: LL.content.home.usp.
 * Phần tử có data-reveal="fade" hiện dần khi section vào viewport (globals.css).
 */
(function (global) {
  'use strict';

  var LL = (global.LL = global.LL || {});
  LL.sections = LL.sections || {};
  var h = LL.dom.h;

  function img(src, w, ht, alt) {
    return h('img', { attrs: { src: src, width: String(w), height: String(ht), alt: alt || '', 'aria-hidden': alt ? null : 'true', decoding: 'async', loading: 'lazy' } });
  }

  function HomeUsp() {
    var c = LL.content.home.usp;
    var t = c.h2;
    var d = 0;
    function fade(el) {
      el.setAttribute('data-reveal', 'fade');
      el.style.setProperty('--reveal-delay', (d++ * LL.motion.stagger.groups) + 'ms');
      return el;
    }

    var badges = h('div', { class: 'usp__badges', attrs: { 'aria-hidden': 'true' } },
      c.badges.map(function (b) { return img(b.src, b.width, b.height); }));

    var h2 = h('h2', { class: 'usp__h2', attrs: { id: 'usp-title' } }, [
      fade(h('span', { class: 'usp__t usp__t--lead', text: t.lead.value })), ' ',
      h('span', { class: 'usp__t usp__paren', text: '(', attrs: { 'aria-hidden': 'true' } }),
      fade(h('span', { class: 'usp__a usp__a--1', text: t.asideTop.value })), ' ',
      fade(h('span', { class: 'usp__a usp__a--2', text: t.asideBottom.value })), ' ',
      h('span', { class: 'usp__t usp__paren usp__paren--close', text: '(', attrs: { 'aria-hidden': 'true' } }), ' ',
      fade(h('span', { class: 'usp__t usp__t--cho', text: t.cho.value })), ' ',
      fade(h('span', { class: 'usp__t usp__t--tail', text: t.tail.value }))
    ]);

    var cta = LL.components.ButtonCta({ href: c.cta.href.value, label: c.cta.label.value });

    var panels = h('ul', { class: 'usp__panels' }, c.panels.map(function (p) {
      return fade(h('li', { class: 'usp__panel' }, [img(p.src, p.width, p.height, p.alt.value)]));
    }));

    var root = h('section', {
      class: 'usp is-pending',
      attrs: { id: 'home-usp', 'aria-labelledby': 'usp-title' },
      dataset: { section: 'home.usp' }
    }, [
      h('div', { class: 'usp__stage' }, [
        fade(badges),
        h2,
        fade(h('p', { class: 'usp__text usp__text--left', text: c.left.value })),
        fade(h('p', { class: 'usp__text usp__text--right', text: c.right.value })),
        h('div', { class: 'usp__cta' }, [cta]),
        panels
      ])
    ]);
    return root;
  }

  function initHomeUsp(root) { LL.reveal.once(root); }

  LL.sections.HomeUsp = HomeUsp;
  LL.sections.initHomeUsp = initHomeUsp;
})(window);
