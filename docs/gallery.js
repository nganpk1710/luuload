/* =========================================================
   Pinned vertical gallery — GSAP + ScrollTrigger
   Yêu cầu: gsap.min.js và ScrollTrigger.min.js (UMD) được tải trước file này.
   ========================================================= */

(() => {
  const section = document.querySelector(".gallery");
  if (!section || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  const pin = section.querySelector(".gallery__pin");
  const track = section.querySelector(".gallery__track");
  const cards = gsap.utils.toArray(".card", track);
  const n = cards.length;
  if (n < 2) return;

  gsap.registerPlugin(ScrollTrigger);

  // Quãng cuộn pin = phần track vượt quá viewport
  const distance = () => Math.max(0, track.scrollHeight - window.innerHeight);

  // Độ dài hiệu ứng của mỗi card trong timeline tổng (0 < d < 1)
  const CARD_DURATION = 0.35;

  // Hiệu ứng chiều sâu lúc card vào và lúc card ổn định
  const FROM = { rotateX: 14, z: -220, scale: 0.92, opacity: 0.35 };
  const TO = { rotateX: 0, z: 0, scale: 1, opacity: 1 };

  const mm = gsap.matchMedia();

  mm.add(
    {
      motion: "(prefers-reduced-motion: no-preference) and (min-width: 1024px)",
    },
    (ctx) => {
      if (!ctx.conditions.motion) return;

      section.classList.add("is-pinned");

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          pin: pin,
          pinSpacing: true,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Track đi lên suốt quãng pin
      tl.to(track, { y: () => -distance(), duration: 1 }, 0);

      // Mỗi card có một đoạn hiệu ứng riêng, rải đều trên timeline
      cards.forEach((card, i) => {
        tl.fromTo(card, FROM, { ...TO, duration: CARD_DURATION }, (i / (n - 1)) * (1 - CARD_DURATION));
      });

      // Cleanup khi matchMedia không còn khớp (resize xuống mobile)
      return () => section.classList.remove("is-pinned");
    }
  );

  // Ảnh tải xong có thể đổi chiều cao track, cần đo lại
  window.addEventListener("load", () => ScrollTrigger.refresh());
})();
