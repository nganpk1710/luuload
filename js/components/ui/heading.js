/*
 * js/components/ui/heading.js
 * Props: { level: 1 | 2 | 3, size: 'display' | 'lg' | 'md' | 'sm', tone?: 'ink' | 'primary',
 *          lines: string[] }
 * level là ngữ nghĩa, size là thị giác. Mỗi dòng là một <span> block có vùng cắt để reveal
 * theo dòng (MOTION.md mục 4 bước 2). Chữ Vina Vịt Lộn tự có dạng chữ hoa, không dùng
 * text-transform (xem docs/DESIGN_SYSTEM.md, nhật ký 2026-11-10).
 */
(function (global) {
  'use strict';

  var LL = (global.LL = global.LL || {});
  LL.components = LL.components || {};
  var h = LL.dom.h;

  function Heading(props) {
    var lines = (props.lines || []).map(function (text, i) {
      return h('span', {
        class: 'line line--' + (i + 1),
        dataset: { reveal: 'line', line: String(i) }
      }, [h('span', { class: 'line__inner', text: text })]);
    });
    return h('h' + props.level, {
      class: 'heading heading--' + props.size + (props.tone === 'primary' ? ' heading--primary' : '')
    }, lines);
  }

  LL.components.Heading = Heading;
})(window);
