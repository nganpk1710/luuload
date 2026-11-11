/*
 * js/sections/preloader.js
 * Section ID: home.preloader. Nội dung: LL.content.home.preloader. Nhịp: LL.motion.preloader.
 * Trình tự: logo và tag reveal theo dòng, số đếm 0 → 100 liên tục, thanh chạy theo ba mốc 30 / 60 / 100
 * (stepped), mỗi mốc có một bộ graphic 4 khung. Hết thì khối loader co về chiều cao nav rồi hero bắt đầu.
 * Không có mosaic. Giảm chuyển động: bỏ qua toàn bộ, vào trang ngay.
 */
(function (global) {
  'use strict';

  var LL = (global.LL = global.LL || {});
  LL.sections = LL.sections || {};
  var h = LL.dom.h;

  var FRAMES = 4;

  /**
   * @param {{header: HTMLElement|null, onExit: function(): void}} opts
   * onExit được gọi khi khối loader bắt đầu co về nav (lúc hero bắt đầu reveal).
   */
  function run(opts) {
    var copy = LL.content.home.preloader;
    var cfg = LL.motion.preloader;
    // Đếm đều (không easing): số tăng đều theo thời gian, thanh nhảy theo mốc.
    var ease = function (x) { return x; };
    var stepsCount = cfg.steps.length;

    function art(step) {
      return h('div', { class: 'pre__set', dataset: { step: String(step) } },
        [1, 2, 3, 4].map(function (i) {
          var n = (i < 10 ? '0' : '') + i;
          return h('img', {
            class: 'pre__frame',
            attrs: { src: 'images/preloader/line-' + step + '-' + n + '.svg', width: '64', height: '64', alt: '', 'aria-hidden': 'true' }
          });
        }));
    }

    var line = function (text, cls, i) {
      return h('span', { class: 'pre__line ' + cls }, [
        h('span', { style: { '--pre-d': (i * LL.motion.stagger.lines) + 'ms' }, text: text })
      ]);
    };

    var num = h('span', { class: 'pre__num', text: '0' });
    var fill = h('span', { class: 'pre__fill' });
    var sets = cfg.steps.map(art);

    var root = h('div', {
      class: 'pre',
      attrs: { role: 'status', 'aria-label': copy.aria.value },
      dataset: { step: '0' }
    }, [
      h('div', { class: 'pre__strip' }, [
        h('div', { class: 'pre__brand' }, [
          line(copy.wordmark.value, 'pre__word', 0),
          line(copy.tag.value, 'pre__tag', 1)
        ]),
        h('div', { class: 'pre__track', attrs: { 'aria-hidden': 'true' } }, [fill]),
        h('div', { class: 'pre__count' }, [
          line(copy.label.value, 'pre__label', 2),
          h('span', { class: 'pre__value' }, [num, h('span', { class: 'pre__pct', text: '%' })])
        ]),
        h('div', { class: 'pre__art', attrs: { 'aria-hidden': 'true' } }, sets)
      ])
    ]);
    document.body.appendChild(root);
    document.body.classList.add('is-loading');

    // Giảm chuyển động hoặc không có rAF: bỏ qua loader.
    if (LL.resolveDuration(cfg.count) === 0 || !global.requestAnimationFrame) {
      root.remove();
      document.body.classList.remove('is-loading');
      opts.onExit && opts.onExit();
      return;
    }

    var t0 = 0;
    var level = 0;          // mốc hiện tại: 0, 30, 60, 100
    var levelAt = 0;        // thời điểm đổi mốc, để tính khung graphic
    var shownFrame = -1;
    var activeSet = null;
    var exited = false;
    var raf = 0;

    function stepIndexFor(v) {
      var idx = -1;
      cfg.steps.forEach(function (s, i) { if (v >= s) idx = i; });
      return idx;
    }

    function showSet(idx) {
      if (activeSet) activeSet.classList.remove('is-on');
      activeSet = idx >= 0 ? sets[idx] : null;
      if (activeSet) activeSet.classList.add('is-on');
      root.dataset.step = idx >= 0 ? String(cfg.steps[idx]) : '0';
    }

    function showFrame(f) {
      if (!activeSet || f === shownFrame) return;
      shownFrame = f;
      var imgs = activeSet.children;
      for (var i = 0; i < imgs.length; i++) imgs[i].classList.toggle('is-on', i === f);
    }

    function exit() {
      if (exited) return;
      exited = true;
      cancelAnimationFrame(raf);
      var navH = opts.header ? opts.header.offsetHeight : 0;
      root.style.setProperty('--pre-nav-h', navH + 'px');
      root.classList.add('is-exit');
      opts.onExit && opts.onExit();
      setTimeout(function () {
        root.remove();
        document.body.classList.remove('is-loading');
      }, cfg.exit);
    }

    function tick(now) {
      if (!t0) { t0 = now; requestAnimationFrame(function () { root.classList.add('is-run'); }); }
      var t = now - t0;
      var p = Math.min(1, Math.max(0, (t - cfg.start) / cfg.count));
      var v = Math.round(100 * ease(p));
      num.textContent = String(v);

      var idx = stepIndexFor(v);
      var lvl = idx >= 0 ? cfg.steps[idx] : 0;
      if (lvl !== level) {
        level = lvl;
        levelAt = t;
        shownFrame = -1;
        showSet(idx);
        fill.style.setProperty('transform', 'scaleX(' + (lvl / 100).toFixed(2) + ')');
      }
      if (activeSet) {
        showFrame(Math.floor((t - levelAt) / cfg.frameMs) % FRAMES);
      }

      if (t >= cfg.start + cfg.count + cfg.hold) {
        num.textContent = '100';
        exit();
        return;
      }
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    // Hai khung trước khi chạy để reveal chữ có trạng thái đầu.
    root.dataset.ready = '1';
  }

  LL.sections.runPreloader = run;
})(window);
