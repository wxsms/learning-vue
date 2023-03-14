import { reactive } from './reactive';

export function ref (value) {
  return reactive({ value: value });
}