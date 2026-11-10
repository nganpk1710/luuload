/*
 * js/sections/home-hero.js
 * Section ID: home.hero. Đọc LL.content.home.hero. Spec: docs/specs/home-hero.md.
 * Thứ tự DOM = thứ tự đọc (spec mục 8). Bố cục thị giác do CSS quyết định.
 * Trình tự khi tải: MOTION.md mục 4. Mọi mốc thời gian suy ra từ LL.motion.
 */
(function (global) {
  'use strict';

  var LL = (global.LL = global.LL || {});
  LL.sections = LL.sections || {};
  var h = LL.dom.h;

  /** Gán --reveal-delay cho một phần tử. */
  function delay(el, ms) {
    el.style.setProperty('--reveal-delay', Math.round(ms) + 'ms');
  }

  /** Lên lịch trình tự tải. Dùng chung cho header (nav, CTA) và hero. */
  function scheduleLoad(root, header) {
    var m = LL.motion;
    var d = m.duration;
    var s = m.stagger;

    var eyebrowAt = 0;
    var h1At = d.base / 2;
    var taglineAt = h1At + d.base;
    var mosaicAt = taglineAt + d.fast;
    var chromeAt = mosaicAt + s.groups * 2;

    var eyebrow = root.querySelector('.eyebrow');
    if (eyebrow) delay(eyebrow, eyebrowAt);

    Array.prototype.forEach.call(root.querySelectorAll('[data-reveal="line"]'), function (line, i) {
      delay(line, h1At + i * s.lines);
    });

    ['.hero__lead', '.steps', '.cats', '.meta', '.strip'].forEach(function (sel) {
      var el = root.querySelector(sel);
      if (el) delay(el, taglineAt);
    });

    // Khối ghép lộ theo nhóm cột: col 1, col 2, col 3, col 4.
    var colOf = { big: 0, yl: 1, red: 1, bs: 2, mm: 2, mr: 3, yr: 3 };
    Array.prototype.forEach.call(root.querySelectorAll('[data-reveal="tile"]'), function (tile) {
      delay(tile, mosaicAt + (colOf[tile.dataset.area] || 0) * s.groups);
    });

    var nav = header && header.querySelector('.site-nav');
    if (nav) delay(nav, chromeAt);
  }

  function HomeHero(options) {
    var content = LL.content.home;
    var hero = content.hero;
    var nav = LL.content.nav;
    var year = String(new Date().getFullYear());

    var root = h('section', {
      class: 'hero is-pending',
      attrs: { id: 'home-hero', 'aria-label': null },
      dataset: { section: 'home.hero' }
    }, [
      LL.components.Eyebrow({ text: hero.eyebrow.value }),
      LL.components.Heading({
        level: 1,
        size: 'display',
        lines: hero.h1.map(function (l) { return l.value; })
      }),
      h('p', { class: 'hero__lead', dataset: { reveal: 'fade' } }, [
        h('span', { class: 'lead__mark', attrs: { 'aria-hidden': 'true' } }, [
          h('span', { text: '(' }),
          LL.dom.svg('svg', { viewBox: '0 0 24 24', focusable: 'false', class: 'lead__arrow' }, [
            LL.dom.svg('path', {
              d: 'M5 12h14M13 6l6 6-6 6',
              fill: 'none',
              stroke: 'currentColor',
              'stroke-width': '1.8',
              'stroke-linecap': 'round',
              'stroke-linejoin': 'round'
            })
          ]),
          h('span', { text: ')' })
        ]),
        h('span', { class: 'lead__text', text: hero.tagline.value })
      ]),
      LL.components.StepIndex({ steps: hero.steps }),
      LL.components.CategoryNav({ items: hero.categories, ariaLabel: nav.aria.categories }),
      LL.components.Meta({ location: hero.meta.location.value, copyright: '©' + year }),
      LL.components.SiteStrip({ left: hero.strip.left.value, right: hero.strip.right.value }),
      LL.components.HeroMosaic({ items: content.mosaic })
    ]);

    return root;
  }

  /** Bật trình tự tải sau khi đã gắn vào DOM. */
  function play(root, header) {
    scheduleLoad(root, header);
    if (header) header.classList.add('is-pending');
    // Hai khung hình để trình duyệt ghi nhận trạng thái ban đầu trước khi chuyển.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        root.classList.remove('is-pending');
        if (header) header.classList.remove('is-pending');
      });
    });
  }

  LL.sections.HomeHero = HomeHero;
  LL.sections.playHomeHero = play;
})(window);
