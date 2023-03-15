import { ref } from './3-ref.js';
import { effect } from './1-effect.js';

export function computed (eff) {
  let result = ref(null);
  if (typeof eff === 'function') {
    // simple getter
    getterEff(result, eff);
  } else {
    // with both getter and setter
    getterEff(result, eff.get);
    setterEff(result, eff.set);
  }
  return result;
}

function getterEff (computedRef, eff) {
  effect(() => {
    computedRef.value = eff();
  });
}

function setterEff (computedRef, eff) {
  // setter effect
  effect(() => {
    eff(computedRef.value);
  });
}
