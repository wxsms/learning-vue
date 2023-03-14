import { Dep } from './effect';

let globalReactiveMap = new WeakMap();

function getDep (target, p) {
  let targetMap = globalReactiveMap.get(target);
  if (!targetMap) {
    targetMap = new Map();
    globalReactiveMap.set(target, targetMap);
  }
  let dep = targetMap.get(p);
  if (!dep) {
    dep = new Dep();
    targetMap.set(p, dep);
  }
  return dep;
}

export function reactive (obj) {
  return new Proxy(obj, {
    get (target, p, receiver) {
      getDep(...arguments).collectDeps();
      return Reflect.get(...arguments);
    },
    set (target, p, value, receiver) {
      Reflect.set(...arguments);
      getDep(...arguments).triggerEffects();
      return value;
    }
  });
}