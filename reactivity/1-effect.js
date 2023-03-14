let currentEffect;
let targetMap = new WeakMap();

export class ReactiveEffect {
  constructor (fn) {
    this.fn = fn;
    // this.deps = [];
    // this.active = true;
  }

  run () {
    try {
      currentEffect = this;
      return this.fn();
    } catch (err) {
      // ignore
    } finally {
      currentEffect = null;
    }
  };
}

export function effect (fn) {
  let e = new ReactiveEffect(fn);
  e.run();
  return e;
}

/**
 * add currentEffect to dep
 */
export function track (target, prop) {
  if (!currentEffect) {
    return;
  }
  // Map(prop -> dep)
  let depsMap = targetMap.get(target);
  // init if not found
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  // Set(effect)
  let dep = depsMap.get(prop);
  if (!dep) {
    dep = new Set();
    depsMap.set(prop, dep);
  }
  // add effect to dep
  dep.add(currentEffect);
}

/**
 * trigger all effects on dep
 */
export function trigger (target, prop) {
  for (let effect of targetMap.get(target)?.get(prop) ?? []) {
    effect.run();
  }
}
