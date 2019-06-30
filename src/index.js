import 'normalize.css'
import './index.less'

import lottie from 'lottie-web'

lottie.loadAnimation({
  container: document.getElementById('test'), // the dom element that will contain the animation
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'src/data.json' // the path to the animation json
});

console.log("Hello World from your main file!1");
