// target (object) -> key (string) -> deps (set)
export const depsMap = new WeakMap();

export class Dep {
  constructor () {
    this._effects = new Set();
  }

  untrack (e) {
    this._effects.delete(e);
  }

  track (e) {
    this._effects.add(e);
  }

  trigger () {
    for (let e of this._effects) {
      if (e.scheduler) {
        e.scheduler();
      } else {
        e.run();
      }
    }
  }
}
