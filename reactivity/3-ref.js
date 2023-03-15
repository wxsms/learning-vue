import { reactive } from './2-reactive.js';

export function ref (value) {
  return reactive({ value: value });
}
