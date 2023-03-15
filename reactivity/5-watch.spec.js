import { ref } from './3-ref';
import { watchEffect } from './5-watch';

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
});
