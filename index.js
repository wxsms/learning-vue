import { effect } from './reactivity/1-effect.js';
import { h } from './renderer/h.js';
import { mountElement } from './renderer/mountElement.js';
import { diff } from './renderer/diff.js';

export function createApp (Component) {
  return {
    mount (root) {
      let rootNode = typeof root === 'string' ? document.querySelector(root) : root;
      let context = Component.setup();
      let oldVNode;
      let mounted = false;

      effect(() => {
        if (!mounted) {
          // initial mount
          mounted = true;
          rootNode.innerHTML = '';
          oldVNode = Component.render(context);
          mountElement(oldVNode, rootNode);
        } else {
          // update
          let vNode = Component.render(context);
          diff(oldVNode, vNode);
          oldVNode = vNode;
        }
      });
    }
  };
}