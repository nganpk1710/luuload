/*
 * js/sections/preloader.js
 * Section ID: home.preloader. Bố cục: Figma 2357:1661. Nội dung: LL.content.home.preloader. Nhịp: LL.motion.preloader.
 * Dải ngang 3 đoạn: logo + số % (vàng), track với fill vàng, khối graphic (tag + 4 ô).
 * Ba nhịp 0-30, 30-60, 60-100 (mỗi nhịp easing.inOut). Trong nhịp k, 4 ô lần lượt đổi sang hình của hàng k
 * (Line 30, Line 60, Line 100) khi fill của nhịp đi qua 1/8, 3/8, 5/8, 7/8 quãng. Giữ ở 100, rồi nền reveal từ trên xuống,
 * dải đi lên vị trí header và mờ dần trong lúc đi (không dừng). Không mosaic. Giảm chuyển động: bỏ qua loader.
 */
(function (global) {
  'use strict';

  var LL = (global.LL = global.LL || {});
  LL.sections = LL.sections || {};
  var h = LL.dom.h;

  var SLOTS = 4;

  /**
   * @param {{header: HTMLElement|null, onExit: function(): void}} opts
   * onExit chạy khi nền bắt đầu reveal (header và hero bắt đầu reveal cùng lúc).
   */
  function run(opts) {
    var copy = LL.content.home.preloader;
    var cfg = LL.motion.preloader;
    var ease = LL.bezier.fromCss(LL.motion.easing.inOut);
    var lines = cfg.phases.map(function (ph) { return ph[1]; }); // 30, 60, 100

    function done() { if (opts.onExit) opts.onExit(); }

    var total = cfg.phases.reduce(function (sum, ph) { return sum + ph[2]; }, 0);
    if (LL.resolveDuration(total) === 0 || !global.requestAnimationFrame) { done(); return; }

    function line(text, cls, i) {
      return h('span', { class: 'pre__line ' + (cls || '') }, [
        h('span', { style: { '--pre-i': String(i) }, text: text })
      ]);
    }

    // 4 ô, mỗi ô giữ 3 hình (một hình cho mỗi hàng). Chỉ một hình hiện trong mỗi ô.
    var slots = [];
    for (var i = 0; i < SLOTS; i++) {
      slots.push(h('span', { class: 'pre__slot' }, lines.map(function (step) {
        return h('img', {
          class: 'pre__tile',
          attrs: { src: 'images/preloader/line-' + step + '-0' + (i + 1) + '.svg', width: '64', height: '64', alt: '', 'aria-hidden': 'true' }
        });
      })));
    }

    var num = h('span', { class: 'pre__num', text: '0%' });
    var fill = h('span', { class: 'pre__fill' });
    var bg = copy.background;

    var bar = h('div', { class: 'pre__bar' }, [
      h('div', { class: 'pre__seg pre__seg--logo', style: { '--pre-s': '0' } }, [
        h('img', { class: 'pre__logo', attrs: { src: copy.logo.src, width: String(copy.logo.width), height: String(copy.logo.height), alt: copy.logo.alt } }),
        h('div', { class: 'pre__count' }, [line(copy.label.value, 'pre__label', 0), h('span', { class: 'pre__line' }, [num])])
      ]),
      h('div', { class: 'pre__seg pre__seg--track', style: { '--pre-s': '1' }, attrs: { 'aria-hidden': 'true' } }, [fill]),
      h('div', { class: 'pre__seg pre__seg--art', style: { '--pre-s': '2' } }, [
        h('p', { class: 'pre__tag' }, [line(copy.tagTop.value, '', 1), line(copy.tagBottom.value, '', 2)]),
        h('div', { class: 'pre__slots', attrs: { 'aria-hidden': 'true' } }, slots)
      ])
    ]);

    var root = h('div', { class: 'pre', attrs: { role: 'status', 'aria-label': copy.aria.value } }, [
      h('div', { class: 'pre__bg' }, [
        h('img', { class: 'pre__bgimg', attrs: { src: bg.src, width: String(bg.width), height: String(bg.height), alt: '', 'aria-hidden': 'true' } })
      ]),
      bar
    ]);

    // Thời lượng cho CSS lấy từ config, không viết số trong CSS.
    var m = LL.motion;
    [['--pre-exit', cfg.exit + 'ms'], ['--pre-fade-delay', Math.round(cfg.exit * cfg.fadeFrom) + 'ms'],
      ['--pre-fade', Math.round(cfg.exit * (1 - cfg.fadeFrom)) + 'ms'], ['--pre-tile-in', cfg.tileIn + 'ms'],
      ['--pre-tile-offset', cfg.tileOffset + 'px'], ['--pre-intro', cfg.intro + 'ms'],
      ['--pre-seg-stagger', m.stagger.groups + 'ms'], ['--pre-line-stagger', m.stagger.lines + 'ms']
    ].forEach(function (kv) { root.style.setProperty(kv[0], kv[1]); });

    document.body.appendChild(root);
    document.body.classList.add('is-loading');

    var shown = slots.map(function () { return -1; }); // hàng đang hiện ở mỗi ô
    var t0 = 0;
    var raf = 0;

    function setSlot(si, k) {
      if (shown[si] === k) return;
      var imgs = slots[si].children;
      for (var j = 0; j < imgs.length; j++) {
        imgs[j].classList.toggle('is-on', j === k);
        imgs[j].classList.toggle('is-off', j < k);
      }
      shown[si] = k;
    }

    /** Tiến độ tại thời điểm t (ms kể từ khi bắt đầu đếm): giá trị % và vị trí trong nhịp. */
    function progressAt(t) {
      var acc = 0;
      for (var k = 0; k < cfg.phases.length; k++) {
        var ph = cfg.phases[k];
        if (t < acc + ph[2]) {
          var f = Math.max(0, (t - acc) / ph[2]);
          var e = ease(f);
          return { v: ph[0] + (ph[1] - ph[0]) * e, k: k, f: e };
        }
        acc += ph[2];
      }
      return { v: 100, k: cfg.phases.length - 1, f: 1 };
    }

    function exit() {
      cancelAnimationFrame(raf);
      var target = opts.header ? (opts.header.querySelector('.logo') || opts.header) : null;
      var dy = 0;
      if (target) {
        var a = target.getBoundingClientRect();
        var b = bar.getBoundingClientRect();
        dy = (a.top + a.height / 2) - (b.top + b.height / 2);
      }
      root.style.setProperty('--pre-dy', dy.toFixed(1) + 'px');
      root.classList.add('is-exit');
      done();
      setTimeout(function () {
        root.remove();
        document.body.classList.remove('is-loading');
      }, cfg.exit);
    }

    function tick(now) {
      if (!t0) {
        t0 = now;
        requestAnimationFrame(function () { root.classList.add('is-in'); });
      }
      var t = now - t0 - cfg.intro;
      var p = progressAt(Math.max(0, t));
      fill.style.setProperty('transform', 'scaleX(' + (p.v / 100).toFixed(4) + ')');
      num.textContent = Math.round(p.v) + '%';

      if (t >= 0) {
        // Ô thứ s của nhịp k đổi hình khi fill của nhịp đó đi được (s + 0.5) / 4 quãng: ô chạy cùng thanh.
        for (var s = 0; s < SLOTS; s++) {
          var k = p.f >= (s + 0.5) / SLOTS ? p.k : p.k - 1;
          if (k >= 0) setSlot(s, k);
        }
      }

      if (t >= total + cfg.hold) { exit(); return; }
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
  }

  LL.sections.runPreloader = run;
})(window);
