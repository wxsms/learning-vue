import { ref } from '../../reactivity/3-ref.js';
import { createApp } from '../../index.js';
import { reactive } from '../../reactivity/2-reactive.js';

let Counter = {
  setup () {
    let count = reactive({ value: 0 });
    return { count };
  },
  render (ctx) {
    let div = document.createElement('div');
    div.textContent = ctx.count.value;

    div.append(document.createElement('br'));

    let button = document.createElement('button');
    button.textContent = 'add';
    button.onclick = () => {
      ctx.count.value = ctx.count.value + 1;
    };
    div.append(button);

    return div;
  },
};

createApp(Counter).mount('#app');