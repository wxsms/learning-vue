import { Dep } from './1-effect';

let targetDepsMap = new WeakMap();

function getDep (target, p, ...args) {
  let depsMap = targetDepsMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetDepsMap.set(target, depsMap);
  }
  let dep = depsMap.get(p);
  if (!dep) {
    dep = new Dep(Reflect.get(...arguments));
    depsMap.set(p, dep);
  }
  // console.log(target, p, dep.deps.size);
  return dep;
}

export function reactive (obj) {
  return new Proxy(obj, {
    get (target, p, receiver) {
      // console.log('get:', target, p);
      let value = Reflect.get(...arguments);
      getDep(...arguments).collectDeps();

      // if value is an object,
      // need to proxy all nested values
      if (value !== null && typeof value === 'object') {
        return reactive(value);
      }

      return value;
    },
    set (target, p, value, receiver) {
      // console.log('set:', target, p, value);
      let oldValue = Reflect.get(...arguments);
      // prevent infinite loop
      if (oldValue === value) {
        return value;
      }
      Reflect.set(...arguments);
      // trigger effect on the target
      getDep(...arguments).triggerEffects();

      return value;
    }
  });
}