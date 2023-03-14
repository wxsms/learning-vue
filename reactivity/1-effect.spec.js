import { effect, track, trigger } from './1-effect';

const { jest } = import.meta;

describe('effect', () => {
  it('should work', () => {
    let obj = { a: 1, b: { c: 2 } };
    let fn = jest.fn(() => {
      track(obj, 'a');
      track(obj.b, 'c');
    });
    effect(fn);
    expect(fn).toHaveBeenCalledTimes(1);

    trigger(obj, 'a');
    expect(fn).toHaveBeenCalledTimes(2);

    trigger(obj.b, 'c');
    expect(fn).toHaveBeenCalledTimes(3);

    trigger(obj.b, 'qweqwe');
    expect(fn).toHaveBeenCalledTimes(3);
  });
});
