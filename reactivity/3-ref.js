import { reactive } from './2-reactive';

export function ref (value) {
  return reactive({ value: value });
}
