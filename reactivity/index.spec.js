import { Dep, effect } from './index';

describe('reactivity', () => {
  it('should work', () => {
    let d = new Dep(10);
    let double;

    effect(() => {
      double = d.value * 2;
    });
    expect(double).toEqual(20);

    d.value = 20;
    expect(double).toEqual(40);

    d.value = 100;
    expect(double).toEqual(200);
  });
});