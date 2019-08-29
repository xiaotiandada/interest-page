const superagent = require('superagent');
const cheerio = require('cheerio')
const fs = require('fs-extra')
const path = require('path')
const async = require("async");

let id = 1
let maxPage = 10

// userAgent
const userAgents = [
  'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.0.12) Gecko/20070731 Ubuntu/dapper-security Firefox/1.5.0.12',
  'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; Acoo Browser; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0; .NET CLR 3.0.04506)',
  'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.20 (KHTML, like Gecko) Chrome/19.0.1036.7 Safari/535.20',
  'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.8) Gecko Fedora/1.9.0.8-1.fc10 Kazehakase/0.5.6',
  'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.71 Safari/537.1 LBBROWSER',
  'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET CLR 2.0.50727; Media Center PC 6.0) ,Lynx/2.8.5rel.1 libwww-FM/2.14 SSL-MM/1.4.1 GNUTLS/1.2.9',
  'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322; .NET CLR 2.0.50727)',
  'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; QQBrowser/7.0.3698.400)',
  'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; QQDownload 732; .NET4.0C; .NET4.0E)',
  'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:2.0b13pre) Gecko/20110307 Firefox/4.0b13pre',
  'Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; fr) Presto/2.9.168 Version/11.52',
  'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.0.12) Gecko/20070731 Ubuntu/dapper-security Firefox/1.5.0.12',
  'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; LBBROWSER)',
  'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.8) Gecko Fedora/1.9.0.8-1.fc10 Kazehakase/0.5.6',
  'Mozilla/5.0 (X11; U; Linux; en-US) AppleWebKit/527+ (KHTML, like Gecko, Safari/419.3) Arora/0.6',
  'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; QQBrowser/7.0.3698.400)',
  'Opera/9.25 (Windows NT 5.1; U; en), Lynx/2.8.5rel.1 libwww-FM/2.14 SSL-MM/1.4.1 GNUTLS/1.2.9',
  'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
]

const getUrlHtml = async () => {
  try {
    // 外层定义的id
    const res = await superagent.get(`https://www.zcool.com.cn/?p=${id}`);
    return res.text
  } catch (err) {
    console.error(err);
    return false
  }
}

const getDom = (html) => {
  if (!html) return // 没html返回
  const $ = cheerio.load(html)
  let arr = [] // 储存需要下载的数据
  // 获取dom 循环写入数据
  $('.all-work-list .work-list-box .card-box').each((i, el) => {
    let img = $(el).find('.card-img a img').attr('src')
    let title = $(el).find('.card-info .card-info-title a').text()
    arr.push({
      title: title.replace(/\//g, ''), // 去掉 / 因为 / 会认为是路径, 根据实际情况来操作
      url: img.replace('@260w_195h_1c_1e_1o_100sh.jpg', '') // 去掉后缀 不使用缩略图 根据实际情况来操作
    })
  })
  return arr
}

const downloadImg = async (arr, id) => {
  // 先删除文件夹 可以不用这步 因为开始写的时候会重复创建 我又懒得删
  try {
    await fs.remove(path.join(__dirname, `/page${id}`))
  } catch (error) {
    console.log('删除文件夹失败')
  }
  // 创建文件夹 根据id命名
  try {
    await fs.mkdir(path.join(__dirname, `/page${id}` ))
  } catch (error) {
    return console.log('创建文件夹失败')
  }
  // 下载图片
  const download = (item, id) => {
    try {
      let userAgent = userAgents[parseInt(Math.random() * userAgents.length)]
      // 通过 superagent 保存图片
      const req =  superagent.get(item.url)
      .set({ 'User-Agent': userAgent })
      // 使用了stream(流)
      req.pipe(fs.createWriteStream(`./page${id}/${item.title}.png`))
      return `下载${item.title}done`
    } catch (error) {
      return console.log(`下载图片失败${item.title}`, error)
    }
  }

  try {
    // async map limit 控制并发数
    async.mapLimit(arr, 20, async item => download(item, id), (err, results) => {
      if (err) throw err
      console.log(results)
    })
  } catch (error) {
    console.log(`async.mapLimit${error}`)
  }

}

const init = async () => {
  for (let i = 0; i <= maxPage; i++) {
    let urlHtml = await getUrlHtml()
    let getDate = await getDom(urlHtml)
    await downloadImg(getDate, id)
    id = i + 1
  }
}

init()
