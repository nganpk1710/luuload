/*
 * js/components/ui/button-cta.js
 * Props: { href: string, label: string, disabled?: boolean }
 * Hành vi: docs/MOTION.md mục 8 (mô hình tiến độ p, đảo chiều từ vị trí hiện tại).
 * Cấu trúc theo frame Figma: khung chữ và knob tròn đứng cạnh nhau. Khi mở, knob trượt
 * sang trái lên khung. Mọi thời lượng, easing, scale, góc xoay lấy từ LL.motion.
 */
(function (global) {
  'use strict';

  var LL = (global.LL = global.LL || {});
  LL.components = LL.components || {};
  var h = LL.dom.h;

  function arrowIcon() {
    return LL.dom.svg('svg', { viewBox: '0 0 24 24', 'aria-hidden': 'true', focusable: 'false', class: 'cta__arrow' }, [
      LL.dom.svg('path', {
        d: 'M5 12h14M13 6l6 6-6 6',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '2.2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      })
    ]);
  }

  /** @param {{href: string, label: string, disabled?: boolean}} props */
  function ButtonCta(props) {
    var motion = LL.motion;
    var ease = LL.bezier.fromCss(motion.easing.out);

    var label = h('span', { class: 'cta__label' }, [h('span', { class: 'cta__text', text: props.label })]);
    var arrow = arrowIcon();
    var knob = h('span', { class: 'cta__knob', attrs: { 'aria-hidden': 'true' } }, [arrow]);
    var root = h('a', {
      class: 'cta',
      attrs: {
        href: props.href,
        'aria-disabled': props.disabled ? 'true' : null
      }
    }, [label, knob]);
    root.style.setProperty('--cta-press-scale', String(motion.cta.pressScale));

    var state = { p: 0, target: 0, raf: 0, last: 0, distance: 0 };

    function measure() {
      var gap = parseFloat(getComputedStyle(root).columnGap) || 0;
      state.distance = label.offsetWidth + gap;
    }

    function render() {
      var p = state.p;
      var e = ease(p);
      var scale = 1 - (1 - motion.cta.shrinkMin) * Math.sin(Math.PI * p);
      knob.style.setProperty('transform', 'translateX(' + (-e * state.distance).toFixed(2) + 'px) scale(' + scale.toFixed(4) + ')');
      arrow.style.setProperty('transform', 'rotate(' + (e * motion.cta.rotateDeg).toFixed(2) + 'deg)');
    }

    function clearTransforms() {
      knob.style.removeProperty('transform');
      arrow.style.removeProperty('transform');
    }

    function tick(now) {
      var dt = now - state.last;
      state.last = now;
      var step = dt / motion.duration.cta; // thời lượng tỉ lệ với quãng đường còn lại
      if (state.target > state.p) state.p = Math.min(state.target, state.p + step);
      else state.p = Math.max(state.target, state.p - step);
      render();
      if (state.p !== state.target) {
        state.raf = requestAnimationFrame(tick);
      } else {
        state.raf = 0;
        knob.style.removeProperty('will-change');
        if (state.p === 0) clearTransforms();
      }
    }

    function goTo(target) {
      if (props.disabled) return;
      state.target = target;
      if (target === 1) root.setAttribute('data-hover', 'true');
      else root.removeAttribute('data-hover');

      // Giảm chuyển động: p chuyển thẳng, không transform. Màu vẫn đổi (CSS).
      if (LL.resolveDuration(motion.duration.cta) === 0) {
        if (state.raf) cancelAnimationFrame(state.raf);
        state.raf = 0;
        state.p = target;
        clearTransforms();
        return;
      }
      measure();
      knob.style.setProperty('will-change', 'transform');
      if (!state.raf) {
        state.last = performance.now();
        state.raf = requestAnimationFrame(tick);
      }
    }

    root.addEventListener('pointerenter', function (ev) {
      if (ev.pointerType === 'mouse' && LL.canHover()) goTo(1);
    });
    root.addEventListener('pointerleave', function () { goTo(0); });
    root.addEventListener('focus', function () {
      if (root.matches(':focus-visible')) goTo(1);
    });
    root.addEventListener('blur', function () { goTo(0); });
    root.addEventListener('pointerdown', function () { root.setAttribute('data-pressed', 'true'); });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (t) {
      root.addEventListener(t, function () { root.removeAttribute('data-pressed'); });
    });
    if (props.disabled) root.addEventListener('click', function (ev) { ev.preventDefault(); });

    // Đổi kích thước giữa chuyển động: đo lại quãng đường, p giữ nguyên.
    global.addEventListener('resize', function () {
      if (state.p > 0) { measure(); render(); }
    });
    // Tab ẩn: dừng rAF tự nhiên, khi hiện lại last được đặt lại để không nhảy.
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) state.last = performance.now();
    });

    return root;
  }

  LL.components.ButtonCta = ButtonCta;
})(window);
