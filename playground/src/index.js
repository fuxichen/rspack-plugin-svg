import { createApp, h } from 'vue';
import SVGDefault from './test.svg';
import SVGComponent from './test.svg?Component';
import SVGRaw from './test.svg?raw';
import SVGUrl from './test.svg?url';

console.log('SVGDefault', SVGDefault);
console.log('SVGUrl', SVGUrl);
console.log('SVGRaw', SVGRaw);
console.log('SVGComponent', SVGComponent);

const App = () => {
  return h('div', [
    h('div', [h('h1', 'SVG Default'), h(SVGDefault)]),
    h('div', [h('h1', 'SVG Url'), h('img', { src: SVGUrl })]),
    h('div', [h('h1', 'SVG Raw'), h('div', { innerHTML: SVGRaw })]),
    h('div', [h('h1', 'SVG Component'), h(SVGComponent)]),
  ]);
};

const app = createApp(App());

document.querySelector('#root').innerHTML = '<div id="app"></div>';
app.mount('#app');
