// import 'normalize.css'
import './index.less'

import lottie from 'lottie-web'

let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
let htmlDom = document.querySelector('html')
htmlDom.style.fontSize = htmlWidth / 10 + 'px'

lottie.loadAnimation({
  container: document.getElementById('test'), // the dom element that will contain the animation
  renderer: 'svg',
  loop: false,
  autoplay: true,
  path: './static/data.json',
});

