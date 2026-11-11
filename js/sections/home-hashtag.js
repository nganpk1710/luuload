/*
 * js/sections/home-hashtag.js
 * Section ID: home.hashtag. Spec: docs/section-details/home-hashtag.md. Nội dung: LL.content.home.hashtag.
 * Marquee: docs/MOTION.md mục 7. Hai hàng ngược chiều, translateX bằng rAF, hover dừng trong duration.base,
 * tab ẩn hoặc ngoài viewport thì dừng, giảm chuyển động thì không chạy (hàng cuộn tay được).
 */
(function (global) {
  'use strict';

  var LL = (global.LL = global.LL || {});
  LL.sections = LL.sections || {};
  var h = LL.dom.h;

  function buildItem(it, crosshair) {
    if (it.kind === 'shape') {
      return h('li', { class: 'ht__item ht__shape' }, [
        h('img', { attrs: { src: it.src, width: '144', height: '144', alt: '', 'aria-hidden': 'true', decoding: 'async' } })
      ]);
    }
    function cross() { return h('img', { class: 'ht__cross', attrs: { src: crosshair, width: '36', height: '36', alt: '', 'aria-hidden': 'true' } }); }
    return h('li', { class: 'ht__item ht__pill ht__pill--' + it.id, dataset: { tone: it.tone } }, [
      cross(), h('span', { class: 'ht__text', text: it.text.value }), cross()
    ]);
  }

  function HomeHashtag() {
    var c = LL.content.home.hashtag;
    var rows = c.rows.map(function (row, i) {
      var track = h('ul', { class: 'ht__track' }, row.map(function (it) { return buildItem(it, c.crosshair); }));
      return h('div', { class: 'ht__row ht__row--' + (i + 1), dataset: { dir: i % 2 === 0 ? '-1' : '1' } }, [track]);
    });
    return h('section', {
      class: 'ht is-pending',
      attrs: { id: 'home-hashtag', 'aria-label': c.label.value },
      dataset: { section: 'home.hashtag' }
    }, [h('div', { class: 'ht__stage' }, rows)]);
  }

  /** Một hàng: nhân bản bộ item cho đủ rộng, chạy bằng translateX. */
  function Marquee(row) {
    var track = row.querySelector('.ht__track');
    var dir = parseInt(row.dataset.dir, 10);
    var originals = Array.prototype.slice.call(track.children);
    var cfg = LL.motion.marquee;
    var st = { off: 0, v: 1, target: 1, last: 0, raf: 0, setW: 0, visible: true };

    function fill() {
      Array.prototype.slice.call(track.children).forEach(function (n) { if (n.hasAttribute('data-clone')) track.removeChild(n); });
      var first = originals[0].getBoundingClientRect().left;
      var lastEl = originals[originals.length - 1];
      var cs = parseFloat(getComputedStyle(lastEl).marginRight) || 0;
      st.setW = lastEl.getBoundingClientRect().right - first + cs; // gồm khoảng cách vòng lặp
      var copies = Math.ceil(row.clientWidth / st.setW) + 1;
      for (var k = 0; k < copies; k++) {
        originals.forEach(function (n) {
          var cl = n.cloneNode(true);
          cl.setAttribute('data-clone', '');
          cl.setAttribute('aria-hidden', 'true');
          track.appendChild(cl);
        });
      }
    }

    function render() {
      var o = st.off % st.setW;
      var x = dir < 0 ? -o : o - st.setW;
      track.style.setProperty('transform', 'translate3d(' + x.toFixed(2) + 'px,0,0)');
    }

    function tick(now) {
      var dt = Math.min(now - st.last, 64);
      st.last = now;
      var rate = dt / Math.max(1, LL.motion.duration.base);
      st.v += Math.max(-rate, Math.min(rate, st.target - st.v));
      st.off += (cfg.speedPxPerSec * st.v * dt) / 1000;
      render();
      st.raf = (st.target === 0 && st.v === 0) || !st.visible || document.hidden ? 0 : requestAnimationFrame(tick);
    }

    function run() {
      if (st.raf || !st.visible || document.hidden) return;
      st.last = performance.now();
      st.raf = requestAnimationFrame(tick);
    }

    function pause(on) { st.target = on ? 0 : 1; if (!on) run(); else run(); }

    var still = LL.resolveDuration(LL.motion.duration.base) === 0; // giảm chuyển động
    if (still) { row.classList.add('is-static'); return; }

    fill();
    render();
    if ('IntersectionObserver' in global) {
      new IntersectionObserver(function (es) { st.visible = es[0].isIntersecting; if (st.visible) run(); }).observe(row);
    }
    document.addEventListener('visibilitychange', function () { if (!document.hidden) run(); });
    row.addEventListener('pointerenter', function (ev) { if (ev.pointerType === 'mouse' && LL.canHover()) pause(true); });
    row.addEventListener('pointerleave', function () { pause(false); });
    global.addEventListener('resize', function () { fill(); render(); });
    run();
  }

  function initHomeHashtag(root) {
    LL.reveal.once(root);
    Array.prototype.forEach.call(root.querySelectorAll('.ht__row'), Marquee);
  }

  LL.sections.HomeHashtag = HomeHashtag;
  LL.sections.initHomeHashtag = initHomeHashtag;
})(window);
