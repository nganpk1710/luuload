/*
 * js/utils/dom.js
 * Trách nhiệm: hàm dựng DOM nhỏ dùng chung cho mọi component.
 * Chữ luôn gán bằng textContent, không bao giờ innerHTML (TECH_STACK.md mục 6).
 * Script thường, gắn vào LL.dom.
 */
(function (global) {
  'use strict';

  var LL = (global.LL = global.LL || {});
  var SVG_NS = 'http://www.w3.org/2000/svg';

  /**
   * @param {string} tag
   * @param {{class?: string, text?: string, attrs?: Object, dataset?: Object, style?: Object}} [props]
   * @param {Array<Node|string|null>} [children]
   * @returns {HTMLElement}
   */
  function h(tag, props, children) {
    var node = document.createElement(tag);
    apply(node, props);
    append(node, children);
    return node;
  }

  /** Tạo phần tử SVG từ mô tả đơn giản. */
  function svg(tag, attrs, children) {
    var node = document.createElementNS(SVG_NS, tag);
    Object.keys(attrs || {}).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    append(node, children);
    return node;
  }

  function apply(node, props) {
    if (!props) return;
    if (props.class) node.className = props.class;
    if (props.text != null) node.textContent = props.text;
    if (props.attrs) {
      Object.keys(props.attrs).forEach(function (k) {
        if (props.attrs[k] != null && props.attrs[k] !== false) node.setAttribute(k, props.attrs[k]);
      });
    }
    if (props.dataset) {
      Object.keys(props.dataset).forEach(function (k) { node.dataset[k] = props.dataset[k]; });
    }
    if (props.style) {
      Object.keys(props.style).forEach(function (k) { node.style.setProperty(k, props.style[k]); });
    }
  }

  function append(node, children) {
    (children || []).forEach(function (c) {
      if (c == null) return;
      node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
  }

  LL.dom = { h: h, svg: svg };
})(window);
