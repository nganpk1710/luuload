/*
 * js/utils/bezier.js
 * Trách nhiệm: đọc chuỗi easing 'cubic-bezier(a, b, c, d)' từ motion.config.js
 * và trả về hàm f(t) để mô hình tiến độ `p` của CTA dùng cùng easing với CSS.
 * Không có số easing nào được lặp lại ở đây.
 */
(function (global) {
  'use strict';

  var LL = (global.LL = global.LL || {});

  /**
   * @param {string} css Ví dụ 'cubic-bezier(0.22, 1, 0.36, 1)'
   * @returns {function(number): number}
   */
  function fromCss(css) {
    var m = /cubic-bezier\(([^)]+)\)/.exec(css);
    var n = m ? m[1].split(',').map(parseFloat) : [0, 0, 1, 1];
    var x1 = n[0], y1 = n[1], x2 = n[2], y2 = n[3];

    function coord(a1, a2, t) {
      var u = 1 - t;
      return 3 * u * u * t * a1 + 3 * u * t * t * a2 + t * t * t;
    }

    function solveT(x) {
      var lo = 0, hi = 1, t = x;
      for (var i = 0; i < 24; i++) {
        var cx = coord(x1, x2, t);
        if (Math.abs(cx - x) < 1e-5) break;
        if (cx < x) lo = t; else hi = t;
        t = (lo + hi) / 2;
      }
      return t;
    }

    return function (x) {
      if (x <= 0) return 0;
      if (x >= 1) return 1;
      return coord(y1, y2, solveT(x));
    };
  }

  LL.bezier = { fromCss: fromCss };
})(window);
