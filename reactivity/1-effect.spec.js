import { Dep, effect } from './1-effect';
import { reactive } from './2-reactive';

const { jest } = import.meta;

describe('dep and effect', () => {
  it('should work', () => {
    let d = new Dep(10);
    let double;
    let e = jest.fn(() => {
      double = d.value * 2;
    });
    expect(e).toBeCalledTimes(0);

    effect(e);
    expect(double).toEqual(20);
    expect(e).toBeCalledTimes(1);

    d.value = 20;
    expect(double).toEqual(40);
    expect(e).toBeCalledTimes(2);

    d.value = 100;
    expect(double).toEqual(200);
    expect(e).toBeCalledTimes(3);
  });

  it('multiple dep', () => {
    let d1 = new Dep(10);
    let d2 = new Dep(20);
    let sum;

    effect(() => {
      sum = d1.value + d2.value;
    });
    expect(sum).toEqual(30);

    d1.value = 20;
    expect(sum).toEqual(40);
  });
});
