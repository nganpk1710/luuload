/*
 * js/main.js
 * Chạy sau cùng. Ghi biến motion, dựng trang chủ, bật trình tự tải.
 * Không đọc window hoặc document ngoài DOMContentLoaded (TECH_STACK.md mục 6).
 */
(function (global) {
  'use strict';

  var LL = (global.LL = global.LL || {});

  function boot() {
    LL.applyMotionVars();

    var brand = LL.content.brand;
    var nav = LL.content.nav;
    var body = document.body;
    document.title = brand.name;

    var skip = LL.components.SkipLink({ label: nav.aria.skip, targetId: 'main' });

    var header = LL.components.Header({
      logo: {
        variant: 'lockup',
        href: './',
        label: brand.name,
        wordmark: brand.logo.wordmark,
        mark: brand.logo.mark
      },
      links: nav.primary,
      cta: { href: nav.cta.href, label: nav.cta.label },
      ariaLabel: nav.aria.primary,
      currentPath: null
    });

    var main = document.createElement('main');
    main.id = 'main';
    var hero = LL.sections.HomeHero();
    main.appendChild(hero);
    var projects = LL.sections.HomeFeaturesProjects();
    main.appendChild(projects);

    body.appendChild(skip);
    body.appendChild(header);
    body.appendChild(main);

    LL.sections.playHomeHero(hero, header);
    LL.sections.initHomeFeaturesProjects(projects);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})(window);
