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
    let b = 0;

    let stop = watch(a, (val, oldVal) => {
      b = oldVal.value + val.value;
    });
    expect(b).toEqual(0);

    a.value = 100;
    expect(b).toEqual(101);

    a.value = 200;
    expect(b).toEqual(300);

    stop();

    a.value = 500;
    expect(b).toEqual(300);
  });
});
