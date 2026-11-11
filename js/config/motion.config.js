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
    rotateDeg: -45,      // góc xoay mũi tên (→ thành ↗)
    pressScale: 0.97,    // scale khi nhấn
    // Các pha theo mô hình p (0..1), mỗi pha là khoảng [bắt đầu, kết thúc] của p (theo GIF tham chiếu)
    phases: {
      rotate: [0, 0.35],    // mũi tên knob phải xoay thành ↗
      shrink: [0.2, 0.6],   // knob phải co về 0
      slide: [0.4, 1],      // khung chữ trượt sang phải một đoạn knob + gap
      grow: [0.5, 1]        // knob mới mọc ra bên trái, mũi tên ↗
    }
  };

  // Preloader (home.preloader). Bố cục: Figma 2357:1661 (frame không có dữ liệu motion).
  // Nhịp theo video chandebootcamp.com, không mosaic. Toàn bộ số là [ĐỀ XUẤT]. Tổng ~5300ms.
  var preloader = {
    intro: 600,          // ms: ba đoạn của dải hiện dần, chữ reveal theo dòng
    count: 3400,         // ms: fill chạy liên tục 0 → 100 (easing.inOut, không nhảy mốc)
    hold: 400,           // ms: giữ ở 100%
    exit: 900,           // ms: nền xanh reveal từ trên xuống, dải đi lên vị trí nav (easing.out)
    handoff: 300,        // ms: dải mờ đi khi header thật hiện ra ở cuối
    steps: [30, 60, 100],// mốc đổi hàng graphic (Line 30, Line 60, Line 100)
    tileStagger: 80,     // ms giữa các ô graphic trong một hàng
    tileIn: 500,         // ms một ô graphic vào hoặc ra
    tileOffset: 8        // px dịch dọc khi ô vào hoặc ra
  };

  // Marquee hashtag (home.hashtag). Hai hàng ngược chiều. Tốc độ [ĐỀ XUẤT], chưa có trong Figma.
  var marquee = {
    speedPxPerSec: 60
  };

  // Pinned gallery dạng xoắn ốc 3D (home.features-projects). Cơ chế theo HUONG-DAN-KY-THUAT.md (Spiral Gallery)
  // do người dùng gửi. 14 card nằm trên một đường xoắn ốc quanh trục dọc, scroll làm xoắn vừa dâng vừa xoay.
  // Tham số tính hình học: R từ chiều rộng card, P từ chiều cao card. Toàn bộ là [ĐỀ XUẤT], chỉnh khi xem trên thiết bị.
  var gallery = {
    minWidth: '(min-width: 1280px)',  // trùng mốc bố cục; hướng dẫn gốc dùng 1024px
    cardsPerTurn: 7,                   // số card mỗi vòng xoắn (14 card = 2 vòng)
    gapRatio: 0.15,                    // khoảng hở ngang giữa hai card kề nhau, theo chiều rộng card
    pitchRatio: 0.55,                  // bước cao mỗi card, theo chiều cao card (nhỏ hơn 1: các vòng chồng nhau)
    scrollFactor: 1.4,                 // quãng pin = (N-1) x bước cao x hệ số này (hướng dẫn gốc 0.7; tăng để thấy rõ quá trình đi lên)
    scrub: 1,                          // giây đuổi theo scroll
    anticipatePin: 1
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
    marquee: marquee,
    preloader: preloader,
    media: media
  };
  LL.resolveDuration = resolve;
  LL.canHover = canHover;
  LL.applyMotionVars = applyMotionVars;
})(window);
