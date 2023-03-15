import { ref } from '../../reactivity/3-ref.js';
import { createApp } from '../../index.js';
import { reactive } from '../../reactivity/2-reactive.js';
import { h } from '../../renderer/h.js';
import { computed } from '../../reactivity/4-computed.js';

let Counter = {
  setup () {
    let count = ref(0);
    let double = computed(() => count.value * 2);

    return { count, double };
  },
  render (ctx) {
    return h(
      'div',
      {
        class: 'counter',
      },
      [
        h(
          'button',
          {
            style: 'margin-right: 10px',
            type: 'button',
            onclick () {
              ctx.count.value--;
            }
          },
          'minus'
        ),
        ctx.count.value,
        h(
          'button',
          {
            style: 'margin: 0 10px',
            type: 'button',
            onclick () {
              ctx.count.value++;
            }
          },
          'add'
        ),
        'double: ' + ctx.double.value
      ]
    );
  },
};

createApp(Counter).mount('#app');