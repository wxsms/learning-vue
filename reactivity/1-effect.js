import { Dep, depsMap } from './0-dep';

let currentEffect;

export class ReactiveEffect {
  constructor (fn, scheduler) {
    this.fn = fn;
    this.scheduler = scheduler;
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
      dep.untrack(this);
    }
    // clear this effect's deps
    this.deps.clear();
  }
}

export function effect (fn, scheduler) {
  let e = new ReactiveEffect(fn, scheduler);
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
  let dep = getDep(target, prop);
  // add effect to dep
  dep.track(currentEffect);
  // add dep to effect
  currentEffect.deps.add(dep);
}

/**
 * trigger all effects on dep
 */
export function trigger (target, prop) {
  depsMap.get(target)?.get(prop)?.trigger();
}

function getDep (target, prop) {
  // 从 depsMap 中找到本 target 的 Map
  let deps = depsMap.get(target);
  // 没找到，需要初始化
  if (!deps) {
    deps = new Map();
    depsMap.set(target, deps);
  }
  // 从第二级的 Map 中找到本 prop 的 dep
  let dep = deps.get(prop);
  // 没找到，需要初始化
  if (!dep) {
    dep = new Dep();
    deps.set(prop, dep);
  }
  return dep;
}