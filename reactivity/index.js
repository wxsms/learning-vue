let currentEffect;

export class Dep {
  constructor (val) {
    this._value = val;
    this.deps = new Set();
  }

  get value () {
    this.collectDeps();
    return this._value;
  }

  set value (val) {
    this._value = val;
    this.triggerEffects();
  }

  collectDeps = () => {
    if (currentEffect) {
      this.deps.add(currentEffect);
    }
  };

  triggerEffects = () => {
    for (let effect of this.deps) {
      effect();
    }
  };
}

export function effect (e) {
  currentEffect = e;
  e();
  currentEffect = null;
}
