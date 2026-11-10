/*
 * js/sections/home-features-projects.js
 * Section ID: home.features-projects. Spec: docs/section-details/home-features-projects.md.
 * Nội dung: LL.content.home.featuresProjects và LL.content.projects. Chuyển động: LL.motion.gallery.
 * Pinned gallery dùng GSAP + ScrollTrigger (D-14, CDN pin version). Thiếu GSAP, mobile hoặc giảm
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
    var pattern = LL.motion.gallery.pattern;

    var cards = projects.map(function (p, i) {
      var slot = pattern[i % pattern.length];
      var item = h('li', { class: 'card', style: { '--x': slot.x }, dataset: { z: String(slot.z) } }, [
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
    var track = root.querySelector('.gallery__track');
    var cards = gsap.utils.toArray('.card', track);
    var n = cards.length;
    if (n < 2) return;

    // Quãng pin = phần track vượt quá chiều cao sân khấu.
    function distance() { return Math.max(0, track.scrollHeight - pin.clientHeight); }

    var mm = gsap.matchMedia();
    mm.add({ motion: '(prefers-reduced-motion: no-preference) and ' + cfg.minWidth }, function (ctx) {
      if (!ctx.conditions.motion) return;
      root.classList.add('is-pinned');

      var tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root,
          pin: pin,
          pinSpacing: true,
          start: 'top top',
          end: function () { return '+=' + distance(); },
          scrub: cfg.scrub,
          anticipatePin: cfg.anticipatePin,
          invalidateOnRefresh: true
        }
      });

      tl.to(track, { y: function () { return -distance(); }, duration: 1 }, 0);

      cards.forEach(function (card, i) {
        var z = Number(card.dataset.z) || 0;
        tl.fromTo(
          card,
          { rotateY: cfg.from.rotateY, z: z + cfg.from.zOffset, scale: cfg.from.scale, opacity: cfg.from.opacity },
          { rotateY: cfg.to.rotateY, z: z, scale: cfg.to.scale, opacity: cfg.to.opacity, duration: cfg.cardSpan },
          (i / (n - 1)) * (1 - cfg.cardSpan)
        );
      });

      return function () { root.classList.remove('is-pinned'); };
    });

    // Ảnh và font tải xong có thể đổi chiều cao track.
    global.addEventListener('load', function () { ScrollTrigger.refresh(); });
  }

  LL.sections.HomeFeaturesProjects = HomeFeaturesProjects;
  LL.sections.initHomeFeaturesProjects = init;
})(window);
