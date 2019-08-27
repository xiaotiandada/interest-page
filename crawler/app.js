const superagent = require('superagent');
const cheerio = require('cheerio')

let id = 1

const getUrlHtml = async () => {
  console.log('start')
  try {
    const res = await superagent.get(`https://www.zcool.com.cn/?p=${id}`);
    // console.log(res.text);
    return res.text
  } catch (err) {
    console.error(err);
    return false
  }
}

const getDom = (html) => {
  if (!html) return
  const $ = cheerio.load(html)
  $('.all-work-list .work-list-box .card-box').each((i, el) => {
    let img = $(el).find('.card-img a img').attr('src')
    let title = $(el).find('.card-info .card-info-title a').text()
    console.log(img, '--' , title)
  })
  console.log('end')
}


const init = async () => {
  let urlHtml = await getUrlHtml()
  await getDom(urlHtml)
}

init()