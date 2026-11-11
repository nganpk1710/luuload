/*
 * js/sections/preloader.js
 * Section ID: home.preloader. Bố cục: Figma 2357:1661. Nội dung: LL.content.home.preloader. Nhịp: LL.motion.preloader.
 * Dải ngang 3 đoạn: logo + số % (vàng), track với fill vàng chạy liên tục, khối graphic (tag + hàng 4 ô).
 * Trình tự: dải hiện dần, fill chạy 0 → 100 (easing.inOut), mỗi mốc 30 / 60 / 100 đổi hàng graphic với stagger
 * từng ô. Giữ ở 100, rồi nền xanh reveal từ trên xuống và dải đi lên vị trí nav. Không mosaic.
 * Giảm chuyển động: bỏ qua loader.
 */
(function (global) {
  'use strict';

  var LL = (global.LL = global.LL || {});
  LL.sections = LL.sections || {};
  var h = LL.dom.h;

  /**
   * @param {{header: HTMLElement|null, onExit: function(): void}} opts
   * onExit chạy khi nền bắt đầu reveal (hero bắt đầu reveal cùng lúc).
   */
  function run(opts) {
    var copy = LL.content.home.preloader;
    var cfg = LL.motion.preloader;
    var ease = LL.bezier.fromCss(LL.motion.easing.inOut);

    function done() { if (opts.onExit) opts.onExit(); }

    // Giảm chuyển động: không dựng loader.
    if (LL.resolveDuration(cfg.count) === 0 || !global.requestAnimationFrame) { done(); return; }

    function line(text, cls, i) {
      return h('span', { class: 'pre__line ' + (cls || '') }, [
        h('span', { style: { '--pre-i': String(i) }, text: text })
      ]);
    }

    var rows = cfg.steps.map(function (step) {
      return h('div', { class: 'pre__row', dataset: { step: String(step) } }, [1, 2, 3, 4].map(function (n, i) {
        return h('img', {
          class: 'pre__tile',
          style: { '--pre-i': String(i) },
          attrs: { src: 'images/preloader/line-' + step + '-0' + n + '.svg', width: '64', height: '64', alt: '', 'aria-hidden': 'true' }
        });
      }));
    });

    var num = h('span', { class: 'pre__num', text: '0%' });
    var fill = h('span', { class: 'pre__fill' });

    var bar = h('div', { class: 'pre__bar' }, [
      h('div', { class: 'pre__seg pre__seg--logo', style: { '--pre-s': '0' } }, [
        h('img', { class: 'pre__logo', attrs: { src: copy.logo.src, width: String(copy.logo.width), height: String(copy.logo.height), alt: copy.logo.alt } }),
        h('div', { class: 'pre__count' }, [line(copy.label.value, 'pre__label', 0), h('span', { class: 'pre__line' }, [num])])
      ]),
      h('div', { class: 'pre__seg pre__seg--track', style: { '--pre-s': '1' }, attrs: { 'aria-hidden': 'true' } }, [fill]),
      h('div', { class: 'pre__seg pre__seg--art', style: { '--pre-s': '2' } }, [
        h('p', { class: 'pre__tag' }, [line(copy.tagTop.value, '', 1), line(copy.tagBottom.value, '', 2)]),
        h('div', { class: 'pre__rows', attrs: { 'aria-hidden': 'true' } }, rows)
      ])
    ]);

    var root = h('div', { class: 'pre', attrs: { role: 'status', 'aria-label': copy.aria.value } }, [
      h('div', { class: 'pre__bg' }),
      bar
    ]);

    // Thời lượng cho CSS lấy từ config, không viết số trong CSS.
    var m = LL.motion;
    [['--pre-exit', cfg.exit + 'ms'], ['--pre-handoff', cfg.handoff + 'ms'], ['--pre-tile-in', cfg.tileIn + 'ms'],
      ['--pre-tile-stagger', cfg.tileStagger + 'ms'], ['--pre-tile-offset', cfg.tileOffset + 'px'],
      ['--pre-intro', cfg.intro + 'ms'], ['--pre-seg-stagger', m.stagger.groups + 'ms'], ['--pre-line-stagger', m.stagger.lines + 'ms']
    ].forEach(function (kv) { root.style.setProperty(kv[0], kv[1]); });

    document.body.appendChild(root);
    document.body.classList.add('is-loading');

    var t0 = 0;
    var current = -1;
    var raf = 0;

    function showRow(idx) {
      rows.forEach(function (r, i) {
        r.classList.toggle('is-on', i === idx);
        r.classList.toggle('is-off', i < idx);
      });
    }

    function exit() {
      cancelAnimationFrame(raf);
      var headerTop = opts.header ? opts.header.getBoundingClientRect().top : 0;
      var dy = headerTop - bar.getBoundingClientRect().top;
      root.style.setProperty('--pre-dy', dy.toFixed(1) + 'px');
      root.classList.add('is-exit');
      done();
      setTimeout(function () {
        root.classList.add('is-handoff');
        setTimeout(function () {
          root.remove();
          document.body.classList.remove('is-loading');
        }, cfg.handoff);
      }, cfg.exit);
    }

    function tick(now) {
      if (!t0) {
        t0 = now;
        requestAnimationFrame(function () { root.classList.add('is-in'); });
      }
      var t = now - t0;
      var p = Math.min(1, Math.max(0, (t - cfg.intro) / cfg.count));
      var e = ease(p);
      var v = Math.round(100 * e);
      fill.style.setProperty('transform', 'scaleX(' + e.toFixed(4) + ')');
      num.textContent = v + '%';

      var idx = -1;
      cfg.steps.forEach(function (s, i) { if (v >= s) idx = i; });
      if (idx !== current) { current = idx; showRow(idx); }

      if (t >= cfg.intro + cfg.count + cfg.hold) { exit(); return; }
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
  }

  LL.sections.runPreloader = run;
})(window);
