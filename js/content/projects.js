/*
 * js/content/projects.js
 * 14 project của pinned gallery (home.features-projects).
 * Copy tạm lấy từ tên file ảnh. status 'pending': chờ tên, danh mục, alt thật (D-20).
 */
(function () {
  'use strict';
  var LL = (window.LL = window.LL || {});
  LL.content = LL.content || {};

  var base = 'images/projects/';
  var items = [
    ['01-comico-comic', 'Comico Comic'],
    ['02-wake-conference', 'Wake Conference'],
    ['03-onion-poster', 'Onion Poster'],
    ['04-graphic-trend', 'Graphic Trend'],
    ['05-graphic-festival', 'Graphic Festival'],
    ['06-hoigiong-poster', 'Hội Giồng Poster'],
    ['07-bo-vietnamese-cafe', 'Bo Vietnamese Cafe'],
    ['08-photrongpho-genfest', 'Phố Trong Phố Genfest'],
    ['09-inspiration-signstreet', 'Inspiration Signstreet'],
    ['10-image-the-land', 'Image The Land'],
    ['11-project-cadaotucngu', 'Ca Dao Tục Ngữ'],
    ['12-poster-vanphong', 'Poster Văn Phòng'],
    ['13-casbala-music', 'Casbala Music'],
    ['14-poster-saigon2026', 'Poster Saigon 2026']
  ];

  LL.content.projects = {
    status: 'pending',
    decision: 'D-20',
    // --x theo guide: 0% / 14% luân phiên. TODO(figma): offset thật theo frame.
    items: items.map(function (it, i) {
      return {
        id: it[0],
        src: base + it[0] + '.webp',
        width: 1200,
        height: 1500,
        title: it[1],
        alt: 'TODO(content): ' + it[1],
        x: i % 2 === 0 ? '0%' : '14%'
      };
    })
  };
})();
