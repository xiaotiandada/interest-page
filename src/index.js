import 'normalize.css'
import './index.less'

import lottie from 'lottie-web'

lottie.loadAnimation({
  container: document.getElementById('test'), // the dom element that will contain the animation
  renderer: 'svg',
  loop: false,
  autoplay: true,
  path: 'src/data.json',
  className: 'lottie-logo'
});

console.log("Hello World from your main file!1");
