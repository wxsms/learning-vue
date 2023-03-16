import { Dep, depsMap } from './0-dep';

let currentEffect;

export class ReactiveEffect {
  constructor (fn) {
    this.fn = fn;
    this.deps = new Set();
    this.active = true;
  }

  run () {
    // effect stopped, no need to collect deps anymore
    if (!this.active) {
      return this.fn();
    }
    try {
      currentEffect = this;
      return this.fn();
    } catch (err) {
      // ignore
    } finally {
      currentEffect = null;
    }
  };

  stop () {
    this.active = false;
    // remove this effect from all it's deps
    for (let dep of this.deps) {
      dep.delete(this);
    }
    // clear this effect's deps
    this.deps.clear();
  }
}

export function effect (fn) {
  let e = new ReactiveEffect(fn);
  e.run();
  return e.stop.bind(e);
}

/**
 * add currentEffect to dep
 */
export function track (target, prop) {
  if (!currentEffect) {
    return;
  }
  // Map(prop -> dep)
  let deps = depsMap.get(target);
  // init if not found
  if (!deps) {
    deps = new Map();
    depsMap.set(target, deps);
  }
  // Set(effect)
  let dep = deps.get(prop);
  if (!dep) {
    dep = new Dep();
    deps.set(prop, dep);
  }
  // add effect to dep
  dep.add(currentEffect);
  // add dep to effect
  currentEffect.deps.add(dep);
}

/**
 * trigger all effects on dep
 */
export function trigger (target, prop) {
  for (let effect of depsMap.get(target)?.get(prop)?.effects ?? []) {
    effect.run();
  }
}
