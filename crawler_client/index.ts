import axios from 'axios'
import './index.less'
const APP_URL = 'http://127.0.0.1:3000'
const API = axios.create({
  baseURL: APP_URL,
  timeout: 1000
});

API.get('/allimg')
  .then( (res) => {
    console.log(res)
    if (res.status === 200 && res.data.code === 0)
    setList(res.data.data)
  })
  .catch( (error) => {
    console.log(error);
  })



const setList = (arr: object[]) => {
  let app = document.querySelector('#app')
  let ulDom = document.createElement('ul')
  ulDom.classList.add('list')
  ulDom.setAttribute('role', 'list')
  let dom: string = ``

  interface Img {
    url: string,
    title: string
  }

  arr.map((i: Img) => {
    dom += `<li>
      <img src="${APP_URL}${i.url}">
      <div>
      <span>url: ${i.url}</span>
      <span>title: ${i.title}</span>
      </div>
    </li>`
  })

  ulDom.innerHTML = dom
  app.append(ulDom)
}