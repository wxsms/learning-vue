import { Dep, effect } from './effect';
import { ref } from './ref';

const { jest } = import.meta;

describe('ref', () => {
  it('should work', () => {
    let a = ref(1);
    let b;

    effect(() => {
      b = a.value * 2;
    });
    expect(b).toEqual(2);

    a.value = 100;
    expect(b).toEqual(200);

    a.value = 300;
    expect(b).toEqual(600);
  });

  it('multiple ref', () => {
    let a = ref(1);
    let b = ref(2);
    let sum;
    let e = jest.fn(() => {
      sum = a.value + b.value;
    });

    effect(e);
    expect(e).toBeCalledTimes(1);
    expect(sum).toEqual(3);

    a.value = 100;
    b.value = 200;
    // todo: nextTick
    expect(e).toBeCalledTimes(3);
    expect(sum).toEqual(300);
  });

  it('effect on ref', () => {
    let a = ref(1);
    let b = ref(0);
    let e = jest.fn(() => {
      b.value = a.value * 2;
    });

    effect(e);
    expect(b.value).toEqual(2);
    expect(e).toBeCalledTimes(1);

    a.value = 4;
    expect(b.value).toEqual(8);
    expect(e).toBeCalledTimes(2);
  });
});
