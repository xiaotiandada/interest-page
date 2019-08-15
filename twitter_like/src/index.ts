console.log("I Learn Ts 💗");

import './index.less';
import Render from "./render";

let render =  new Render()

let likeButton = document.createElement('div')
likeButton.classList.add('like-button')
render.append(document.querySelector('body'), likeButton)