import { Dep, effect } from './1-effect';
import { ref } from './3-ref';
import { computed } from './4-computed';

const { jest } = import.meta;

describe('computed', () => {
  it('should work', () => {
    let a = ref(1);
    let b = computed(() => a.value + 1);

    expect(b.value).toEqual(2);

    a.value = 100;
    expect(b.value).toEqual(101);

    a.value = 300;
    expect(b.value).toEqual(301);
  });

  it('multiple computed', () => {
    let a = ref(1);
    let b = computed(() => a.value + 1);
    let c = computed(() => b.value + 1);

    expect(b.value).toEqual(2);
    expect(c.value).toEqual(3);

    a.value = 100;
    expect(c.value).toEqual(102);

    a.value = 300;
    expect(c.value).toEqual(302);
  });

  it('with setter', () => {
    let a = ref(1);
    let b = computed({ get: () => a.value + 1, set: (val) => a.value = val - 1});

    expect(b.value).toEqual(2);

    a.value = 100;
    expect(a.value).toEqual(100);
    expect(b.value).toEqual(101);

    a.value = 999;
    expect(a.value).toEqual(999);
    expect(b.value).toEqual(1000);

    b.value = 999;
    expect(b.value).toEqual(999);
    expect(a.value).toEqual(998);
  });
});
