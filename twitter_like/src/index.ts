console.log("I Learn Ts 💗");

import './index.css';
import Render from "./render";

let render =  new Render()

let likeButton = document.createElement('div')
likeButton.classList.add('like-button')
likeButton.innerHTML = '11'
render.append(document.querySelector('body'), likeButton)