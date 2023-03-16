import { mountElement } from './mountElement.js';

export function diff (oldVNode, newVNode) {
  // 1. tag (total replace)
  if (oldVNode.tag !== newVNode.tag) {
    mountElement(newVNode, oldVNode.el.parentNode);
    oldVNode.el.parentNode.replaceChild(newVNode.el, oldVNode.el);
    return;
  }

  // textnode handle
  let el = newVNode.el = oldVNode.el;

  if (oldVNode.isTextNode && !newVNode.isTextNode) {
    mountElement(newVNode, oldVNode.el.parentNode);
    oldVNode.el.parentNode.replaceChild(newVNode.el, oldVNode.el);
    return;
  }

  if (oldVNode.isTextNode && newVNode.isTextNode && oldVNode.textContent !== newVNode.textContent) {
    newVNode.el = document.createTextNode(newVNode.textContent);
    oldVNode.el.parentNode.replaceChild(newVNode.el, oldVNode.el);
    return;
  }

  if (!oldVNode.isTextNode && newVNode.isTextNode) {
    oldVNode.el.remove();
    return;
  }

  // reuse element
  // 2. props (changed/add/remove)
  let { props: oldProps = {} } = oldVNode;
  let { props: newProps = {} } = newVNode;
  for (let k in newProps) {
    if (oldProps.hasOwnProperty(k)) {
      if (oldProps[k] !== newProps[k]) {
        // is update
        if (k.startsWith('on')) {
          let evtname = k.substr(2);
          el.removeEventListener(evtname, oldProps[k]);
          el.addEventListener(evtname, newProps[k]);
        } else {
          el.setAttribute(k, newProps[k]);
        }
      }
    } else if (!oldProps.hasOwnProperty(k)) {
      // is add
      el.setAttribute(k, newProps[k]);
    }
  }
  for (let k in oldProps) {
    if (!newProps.hasOwnProperty(k)) {
      // is remove
      if (k.startsWith('on')) {
        let evtname = k.substr(2);
        el.removeEventListener(evtname, oldProps[k]);
      } else {
        el.removeAttribute(k);
      }
    }
  }

  // 3. children (same/changed/add/remove)
  let { children: oldChildren = [] } = oldVNode;
  let { children: newChildren = [] } = newVNode;
  // console.log(oldChildren, newChildren);
  for (let i = 0; i < Math.max(oldChildren.length, newChildren.length); ++i) {
    if (oldChildren[i] && newChildren[i]) {
      // update node
      diff(oldChildren[i], newChildren[i]);
    } else if (newChildren[i] && !oldChildren[i]) {
      // mount new node
      mountElement(newChildren[i], el);
    } else if (oldChildren[i] && !newChildren[i]) {
      // remove
      oldChildren[i].el.remove();
    }
  }
}