/**
 * 节点操作 js
 * 
 */

export default {
  // @param tagName 标签名
  $createElement (tagName) {
    return document.createElement(tagName)
  },

  $setElementAttribute (el, attr, value) {
    if (typeof value === 'object') {
      for (let k in value) {
        el[attr][k] = value[k]
      }

    } else { // string | number
      el.setAttribute(attr, value)
    }
  },

  $removeElementAttribute (el, attr, value) {
    el.removeAttribute(attr, value)
  },

  $getElementAttribute (el, attr) {
    return el.getAttribute(attr)
  }


}