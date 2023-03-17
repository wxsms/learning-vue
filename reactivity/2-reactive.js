import { track, trigger } from './1-effect.js';
import { isObj } from '../utils/index.js';

export function reactive (obj) {
  return new Proxy(obj, {
    get (target, p, receiver) {
      // track deps
      track(...arguments);
      // get value
      let value = Reflect.get(...arguments);
      // if value is an object, need to proxy all nested values
      if (isObj(value)) {
        return reactive(value);
      }
      return value;
    },
    set (target, p, value, receiver) {
      let oldValue = Reflect.get(...arguments);
      // prevent infinite loop
      if (oldValue === value) {
        return value;
      }
      let newValue = Reflect.set(...arguments);
      // trigger effects
      trigger(...arguments);

      return newValue;
    },
    // ownKeys (target) {
    //   if (Array.isArray(target)) {
    //     track(target, 'length');
    //   }
    //   return Reflect.ownKeys(target);
    // }
  });
}