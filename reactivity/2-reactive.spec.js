import { effect } from './1-effect';
import { reactive } from './2-reactive';
// import { effect, reactive } from '@vue/reactivity';

const { jest } = import.meta;

describe('reactive', () => {
  it('should work', () => {
    let a = reactive({ value: 1 });
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

  it('multiple reactive', () => {
    let a = reactive({ value: 1 });
    let b = reactive({ value: 2 });
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

  it('effect on reactive', () => {
    let a = reactive({ value: 1 });
    let b = reactive({ value: 0 });
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

  it('deep object', () => {
    let a = reactive({ deep: { deep2: { value: 1 } } });
    let b;

    effect(() => {
      b = a.deep.deep2.value * 2;
    });
    expect(b).toEqual(2);

    a.deep.deep2.value = 4;
    expect(b).toEqual(8);

    a.deep = { deep2: { value: 8 } };
    expect(b).toEqual(16);

    a.deep.deep2 = { value: 16 };
    expect(b).toEqual(32);

    a.deep.deep2.value = 32;
    expect(b).toEqual(64);
  });

  it('deep object but init later', () => {
    let a = reactive({});
    let b = null;

    effect(() => {
      if (!a.deep || !a.deep.deep2) {
        b = null;
        return;
      }
      b = a.deep.deep2.value * 2;
    });
    expect(b).toEqual(null);

    a.deep = { deep2: { value: 4 } };
    expect(b).toEqual(8);

    a.deep.deep2 = { value: 8 };
    expect(b).toEqual(16);

    a.deep.deep2.value = 16;
    expect(b).toEqual(32);

    a.deep.deep2.value = 32;
    expect(b).toEqual(64);
  });

  it.skip('works on array', () => {
    let a = reactive([1, 2, 3]);
    let b = null;

    effect(() => {
      b = a[0];
    });
    expect(b).toEqual(1);

    a[0] = 0;
    expect(b).toEqual(0);
  });
});
