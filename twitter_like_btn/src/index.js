console.log("Hello World from your main file!");

import './index.less'

import Render from "./render";

let render =  new Render()

let likeButton = document.createElement('div')
likeButton.classList.add('like-button')


render.append(document.querySelector('body'), likeButton)


likeButton.onclick = function() {
  let hasClass = likeButton.classList.contains('is-animating')
  if (!hasClass) likeButton.classList.add('is-animating')
}

likeButton.addEventListener('animationend', function() {
  let hasClass = likeButton.classList.contains('is-animating')
  if (hasClass) likeButton.classList.remove('is-animating')
})