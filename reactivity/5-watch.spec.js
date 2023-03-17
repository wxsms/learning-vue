import { ref } from './3-ref';
import { watch, watchEffect } from './5-watch';
import { reactive } from './2-reactive';

const { jest } = import.meta;

describe('watch', () => {
  it('watchEffect should work', () => {
    let a = ref(1);
    let b = ref(0);
    let stop = watchEffect(() => {
      b.value = a.value * 2;
    });
    expect(b.value).toEqual(2);

    a.value = 100;
    expect(b.value).toEqual(200);

    a.value = 300;
    expect(b.value).toEqual(600);

    stop();

    a.value = 600;
    expect(b.value).toEqual(600);
  });

  it('watch reactive', () => {
    let a = reactive({ value: 1 });
    let fn = jest.fn();
    let stop = watch(() => a.value, fn);
    expect(fn).not.toBeCalled();

    a.value = 2;
    expect(fn).toBeCalledWith(2, 1);

    stop();

    a.value = 3;
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('watch source only', () => {
    let a = reactive({ value: 1 });
    let b = reactive({ value: 2 });
    let c = 0;

    let stop = watch(() => a.value, (val, oldVal) => {
      c = a.value + b.value;
    });
    expect(c).toEqual(0);

    a.value = 100;
    expect(c).toEqual(102);

    b.value = 200;
    expect(c).toEqual(102);
  });
});
