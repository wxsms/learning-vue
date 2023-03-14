import { track, trigger } from './1-effect';
import { isObj } from '../utils';

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
      Reflect.set(...arguments);
      // trigger effects
      trigger(...arguments);

      return value;
    }
  });
}