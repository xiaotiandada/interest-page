
const express = require('express')
const app = express()
app.use(express.static('static'));
const mysql = require('./mysql')
mysql.init()

const router = require('./router')
app.use(router)
// const crawler = require('./crawler')
// crawler.init()


app.listen(3000, () => console.log('port in 3000'))
