import { effect } from './reactivity/1-effect.js';

export function createApp (Component) {
  return {
    mount (root) {
      let rootNode = typeof root === 'string' ? document.querySelector(root) : root;
      let context = Component.setup();
      effect(() => {
        rootNode.innerHTML = '';
        let node = Component.render(context);
        rootNode.append(node);
      });
    }
  };
}