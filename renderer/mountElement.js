export function mountElement (vNode, root) {
  let { tag, props, children } = vNode;

  // tag
  let el = document.createElement(tag);

  // props
  if (props) {
    for (let k in props) {
      if (k.startsWith('on')) {
        el[k] = props[k];
      } else {
        el.setAttribute(k, props[k]);
      }
    }
  }

  if (['string', 'number', 'boolean'].includes(typeof children)) {
    let text = document.createTextNode(children);
    el.append(text);
  } else if (Array.isArray(children)) {
    for (let c of children) {
      if (['string', 'number', 'boolean'].includes(typeof c)) {
        let text = document.createTextNode(c.toString());
        el.append(text);
      } else {
        mountElement(c, el);
      }
    }
  }

  root.append(el);
}