/*
 * js/config/motion.config.js
 * Trách nhiệm: nguồn duy nhất cho thời lượng, easing, stagger, ngưỡng chuyển động.
 * Spec: docs/MOTION.md. Không hardcode số này trong component.
 * Là script thường, không phải module, để chạy được qua file://.
 * Đơn vị: ms cho thời lượng, px cho khoảng cách.
 */
(function (global) {
  'use strict';

  var LL = (global.LL = global.LL || {});

  var duration = {
    press: 80,     // phản hồi khi nhấn
    fast: 150,     // đổi màu nền, màu chữ, màu knob
    base: 300,     // trạng thái UI: nav, link, trình tự tải
    reveal: 800,   // chữ và ảnh vào viewport
    cta: 1000      // quãng đường đầy đủ của knob (D-10: đánh giá lại trên thiết bị)
  };

  var easing = {
    // Mượt, dứt khoát. Gần như mọi chuyển động.
    out: 'cubic-bezier(0.22, 1, 0.36, 1)',
    // Đối xứng. Khi có điểm giữa.
    inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
    // Vui có chủ đích. Overshoot ước tính khoảng 4% (đã kiểm tra bằng tính toán).
    // Chỉ micro-interaction. Kiểm tra trực quan trên thiết bị trước khi duyệt.
    playful: 'cubic-bezier(0.34, 1.35, 0.64, 1)'
  };

  var stagger = {
    lines: 35,     // ms giữa các dòng chữ
    groups: 80,    // ms giữa các khối ảnh trong nhóm
    hero: 60       // ms giữa các khối khi tải trang
  };

  var viewport = {
    revealThreshold: 0.2,
    revealRootMargin: '0px 0px -10% 0px',
    revealOnce: true
  };

  var cta = {
    shrinkMin: 0.3,      // scale knob tại p = 0.5
    rotateDeg: -45,      // góc xoay mũi tên khi mở
    pressScale: 0.97     // scale khi nhấn
  };

  // Pinned gallery (home.features-projects). Tham chiếu chuyển động: das.info.vn (người dùng chỉ định).
  // Đơn vị timeline là tỉ lệ 0 đến 1 của quãng pin, không phải ms. Toàn bộ là [ĐỀ XUẤT], chỉnh khi xem trên thiết bị.
  var gallery = {
    minWidth: '(min-width: 1280px)',  // trùng mốc bố cục; hướng dẫn gốc dùng 1024px
    cardSpan: 0.35,                    // độ dài hiệu ứng mỗi card trên timeline (0 đến 1)
    scrub: 1,                          // giây đuổi theo scroll
    anticipatePin: 1,
    from: { rotateY: 78, zOffset: -220, scale: 0.92, opacity: 0.35 },  // lúc card vào: gần như nghiêng cạnh
    to: { rotateY: 16, scale: 1, opacity: 1 },                          // trạng thái nghỉ: nghiêng nhẹ như frame
    // Lặp vòng theo chỉ số card. x là margin-left theo % bề ngang khung, z là độ sâu (px).
    pattern: [
      { x: '2%', z: 0 },
      { x: '46%', z: -120 },
      { x: '20%', z: -240 },
      { x: '62%', z: -60 },
      { x: '8%', z: -180 },
      { x: '38%', z: 0 }
    ]
  };

  var media = {
    hover: '(hover: hover)',
    reducedMotion: '(prefers-reduced-motion: reduce)'
  };

  /** Trả về 0 khi người dùng bật giảm chuyển động. */
  function resolve(ms) {
    return global.matchMedia && global.matchMedia(media.reducedMotion).matches ? 0 : ms;
  }

  function canHover() {
    return !!(global.matchMedia && global.matchMedia(media.hover).matches);
  }

  /**
   * Ghi biến CSS motion lên :root. Gọi một lần khi trang tải.
   * Trả về hàm hủy listener.
   */
  function applyMotionVars(root) {
    root = root || document.documentElement;
    var mq = global.matchMedia(media.reducedMotion);

    function write() {
      var off = mq.matches;
      var s = root.style;
      s.setProperty('--motion-press', (off ? 0 : duration.press) + 'ms');
      s.setProperty('--motion-fast', (off ? 0 : duration.fast) + 'ms');
      s.setProperty('--motion-base', (off ? 0 : duration.base) + 'ms');
      s.setProperty('--motion-reveal', (off ? 0 : duration.reveal) + 'ms');
      s.setProperty('--motion-cta', (off ? 0 : duration.cta) + 'ms');
      s.setProperty('--ease-out', easing.out);
      s.setProperty('--ease-in-out', easing.inOut);
      s.setProperty('--ease-playful', easing.playful);
    }

    write();
    mq.addEventListener('change', write);
    return function () { mq.removeEventListener('change', write); };
  }

  LL.motion = {
    duration: duration,
    easing: easing,
    stagger: stagger,
    viewport: viewport,
    cta: cta,
    gallery: gallery,
    media: media
  };
  LL.resolveDuration = resolve;
  LL.canHover = canHover;
  LL.applyMotionVars = applyMotionVars;
})(window);
