/*
 * js/utils/reveal.js
 * Trách nhiệm: reveal một lần khi section vào viewport. Bỏ class is-pending trên root.
 * Ngưỡng lấy từ LL.motion.viewport. Thiếu IntersectionObserver thì hiện ngay.
 */
(function (global) {
  'use strict';

  var LL = (global.LL = global.LL || {});

  /** @param {HTMLElement} root @param {Function} [onEnter] */
  function once(root, onEnter) {
    function enter() {
      root.classList.remove('is-pending');
      if (onEnter) onEnter();
    }
    if (!('IntersectionObserver' in global)) { enter(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { io.disconnect(); enter(); }
      });
    }, { threshold: 0, rootMargin: LL.motion.viewport.revealRootMargin });
    io.observe(root);
  }

  LL.reveal = { once: once };
})(window);
