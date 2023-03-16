// target (object) -> key (string) -> deps (set)
export const depsMap = new WeakMap();

export class Dep {
  constructor () {
    this._effects = new Set();
  }

  get effects () {
    return this._effects;
  }

  add (e) {
    this._effects.add(e);
  }

  delete (e) {
    this._effects.delete(e);
  }
}
