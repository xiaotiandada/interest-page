const superagent = require('superagent');
const cheerio = require('cheerio')
const fs = require('fs-extra')
const path = require('path')

let id = 1

const getUrlHtml = async () => {
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
  let arr = []
  $('.all-work-list .work-list-box .card-box').each((i, el) => {
    let img = $(el).find('.card-img a img').attr('src')
    let title = $(el).find('.card-info .card-info-title a').text()
    arr.push({
      title: title,
      url: img
    })
  })
  return arr
}

const downloadImg = async arr => {
  try {
    await fs.remove(path.join(__dirname, `/page${id}`))
  } catch (error) {
    console.log('删除文件夹失败')
  }
  try {
    await fs.mkdir(path.join(__dirname, `/page${id}` ))
  } catch (error) {
    return console.log('创建文件夹失败')
  }

  const download = item => {
    try {
      const req =  superagent.get(item.url.replace('@260w_195h_1c_1e_1o_100sh.jpg', ''))
      req.pipe(fs.createWriteStream(`./page${id}/${item.title}.png`))
    } catch (error) {
      return console.log(`下载图片失败${item.title}`, error)
    }
  }

  for (const item of arr) await download(item)
}

const init = async () => {
  let urlHtml = await getUrlHtml()
  let getDate = await getDom(urlHtml)
  downloadImg(getDate)
}

init()
