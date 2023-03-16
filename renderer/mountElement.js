export function mountElement (vNode, root) {
  // console.log('mount', vNode, root);
  let { tag, props, children = [], isTextNode, textContent } = vNode;

  let el;
  if (isTextNode) {
    el = document.createTextNode(textContent);
    vNode.el = el;
  } else {
    // tag
    el = document.createElement(tag);
    vNode.el = el;

    // props
    if (props) {
      for (let k in props) {
        if (k.startsWith('on')) {
          el.addEventListener(k.substr(2), props[k]);
        } else {
          el.setAttribute(k, props[k]);
        }
      }
    }
  }

  for (let c of children) {
    mountElement(c, el);
  }

  root.append(el);
}