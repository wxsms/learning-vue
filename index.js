import { effect } from './reactivity/1-effect.js';
import { h } from './renderer/h.js';
import { mountElement } from './renderer/mountElement.js';

export function createApp (Component) {
  return {
    mount (root) {
      let rootNode = typeof root === 'string' ? document.querySelector(root) : root;
      let context = Component.setup();
      effect(() => {
        rootNode.innerHTML = '';
        let vnode = Component.render(context);
        mountElement(vnode, rootNode);
      });
    }
  };
}