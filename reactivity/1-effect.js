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
      // console.log('collectDeps',this._value,currentEffect)
      this.deps.add(currentEffect);
    }
  };

  triggerEffects = () => {
    for (let effect of this.deps) {
      effect.run();
    }
  };
}

export function effect (e) {
  e.run = () => {
    currentEffect = e;
    e();
    currentEffect = null;
  };
  e.run();
}
