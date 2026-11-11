/*
 * js/sections/home-features-projects.js
 * Section ID: home.features-projects. Spec: docs/section-details/home-features-projects.md.
 * Nội dung: LL.content.home.featuresProjects và LL.content.projects. Chuyển động: LL.motion.gallery.
 * Pinned gallery (trống quay 3D) dùng GSAP + ScrollTrigger (D-14, CDN pin version). Thiếu GSAP, mobile hoặc giảm
 * chuyển động thì giữ layout xếp dọc (không có class is-pinned).
 */
(function (global) {
  'use strict';

  var LL = (global.LL = global.LL || {});
  LL.sections = LL.sections || {};
  var h = LL.dom.h;

  function HomeFeaturesProjects() {
    var copy = LL.content.home.featuresProjects;
    var projects = LL.content.projects.items;
    var nav = LL.content.nav;

    var cards = projects.map(function (p, i) {
      var item = h('li', { class: 'card' }, [
        h('figure', null, [
          h('img', {
            attrs: {
              src: p.src,
              alt: p.alt,
              width: String(p.width),
              height: String(p.height),
              loading: i < 2 ? null : 'lazy',
              decoding: 'async'
            }
          })
        ])
      ]);
      return item;
    });

    var root = h('section', {
      class: 'fp is-pending',
      attrs: { id: 'home-features-projects', 'aria-labelledby': 'fp-title' },
      dataset: { section: 'home.features-projects' }
    }, [
      h('div', { class: 'fp__pin' }, [
        h('div', { class: 'fp__content' }, [
          h('h2', { class: 'fp__title', attrs: { id: 'fp-title' }, text: copy.heading.value }),
          h('div', { class: 'fp__body' }, [
            h('p', { class: 'fp__lead', text: copy.lead.value }),
            LL.components.ButtonCta({ href: nav.cta.href, label: nav.cta.label })
          ])
        ]),
        h('div', { class: 'gallery' }, [
          h('ul', { class: 'gallery__track', attrs: { 'aria-label': copy.galleryLabel.value } }, cards)
        ])
      ])
    ]);
    return root;
  }

  /** Gọi sau khi section đã nằm trong DOM. */
  function init(root) {
    var cfg = LL.motion.gallery;

    // Reveal nội dung trái khi vào viewport, một lần.
    if ('IntersectionObserver' in global) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { root.classList.remove('is-pending'); io.disconnect(); }
        });
      }, { threshold: 0, rootMargin: LL.motion.viewport.revealRootMargin }); // threshold 0: sau khi pin, root cao hơn nhiều lần viewport
      io.observe(root);
    } else {
      root.classList.remove('is-pending');
    }

    if (!global.gsap || !global.ScrollTrigger) return; // fallback xếp dọc
    var gsap = global.gsap;
    var ScrollTrigger = global.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    var pin = root.querySelector('.fp__pin');
    var gal = root.querySelector('.gallery');
    var drum = root.querySelector('.gallery__track');
    var cards = gsap.utils.toArray('.card', drum);
    var N = cards.length;
    if (N < 3) return;

    var STEP = 360 / N;   // góc giữa hai card kề nhau trên vòng

    // Bán kính trống: dây cung giữa hai card kề nhau = chiều cao card x (1 + khoảng hở).
    // Đặt lại vị trí card. Gọi khi khởi tạo, resize và sau khi ảnh tải xong.
    function layout() {
      var h = cards[0].offsetHeight;
      var R = (h * (1 + cfg.gapRatio)) / (2 * Math.sin(Math.PI / N));
      var maxX = Math.max(0, (gal.clientWidth - cards[0].offsetWidth) / 2) * cfg.spiral.xAmp;
      gsap.set(drum, { z: -R }); // card 0 nằm đúng z = 0, kích thước thật
      cards.forEach(function (card, i) {
        var phase = (i / N) * Math.PI * 2 * cfg.spiral.turns;
        var x = maxX * Math.sin(phase);
        var twist = cfg.spiral.twistDeg * Math.cos(phase);
        card.style.transform =
          'translateX(' + x.toFixed(2) + 'px) rotateX(' + (-i * STEP).toFixed(3) + 'deg) translateZ(' + R.toFixed(2) + 'px) rotateY(' + twist.toFixed(2) + 'deg)';
      });
    }

    var mm = gsap.matchMedia();
    mm.add({ motion: '(prefers-reduced-motion: no-preference) and ' + cfg.minWidth }, function (ctx) {
      if (!ctx.conditions.motion) return;
      root.classList.add('is-pinned');
      layout();

      function scrollDistance() { return Math.round(pin.clientHeight * (N - 1) * cfg.scrollPerCard); }

      gsap.to(drum, {
        rotateX: (N - 1) * STEP, // đến khi card cuối đứng phía trước
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          pin: pin,
          pinSpacing: true,
          start: 'top top',
          end: function () { return '+=' + scrollDistance(); },
          scrub: cfg.scrub,
          anticipatePin: cfg.anticipatePin,
          invalidateOnRefresh: true,
          onRefreshInit: layout
        }
      });

      return function () {
        root.classList.remove('is-pinned');
        cards.forEach(function (card) { card.style.transform = ''; });
        gsap.set(drum, { clearProps: 'transform' });
      };
    });

    // Ảnh và font tải xong có thể đổi chiều cao track.
    global.addEventListener('load', function () { ScrollTrigger.refresh(); });
  }

  LL.sections.HomeFeaturesProjects = HomeFeaturesProjects;
  LL.sections.initHomeFeaturesProjects = init;
})(window);
