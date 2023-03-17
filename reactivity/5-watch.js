import { effect } from './1-effect';

export const watchEffect = (cb) => {
  let e = effect(cb);
  return e.stop.bind(e);
};

export function watch (getter, cb) {
  let oldValue;
  let job = () => {
    let newVal = e.run();
    cb(newVal, oldValue);
    oldValue = newVal;
  };
  let e = effect(getter, job);
  oldValue = e.run();

  return e.stop.bind(e);
}
