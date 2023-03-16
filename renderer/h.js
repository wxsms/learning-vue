import { isBaseType } from '../utils/index.js';

export function h (tag, props, children) {
  // console.log(123, ...arguments);
  return {
    tag,
    props,
    children: (isBaseType(children) ? [children] : children).map((c) => isBaseType(c) ? {
      isTextNode: true,
      textContent: c.toString()
    } : c)
  };
}
