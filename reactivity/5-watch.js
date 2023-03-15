import { effect } from './1-effect';

export const watchEffect = effect;

export function watch (source, callback) {
  let oldValue;
  let firstrun = true;

  return effect(() => {
    if (firstrun) {
      firstrun = false;
      oldValue = JSON.parse(JSON.stringify(source));
      return;
    }
    callback(source, oldValue);
    oldValue = JSON.parse(JSON.stringify(source));
  });
}
