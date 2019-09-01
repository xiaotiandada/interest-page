
const express = require('express')
const mysql = require('mysql')
const app = express()

let connection = mysql.createConnection({
  host     : '127.0.0.1',
  port     : '3306',
  user     : 'root',
  password : 'xiaotian',
  database : 'crawler'
});
connection.connect((err) => {
  if (err) return console.error('error connecting: ' + err.stack);
  console.log('连接成功 connected as id ' + connection.threadId);
});

// 插入数据 id自增
const sqlAdd = () => {
  let sqlAdd = 'INSERT INTO image SET ?';
  let sqlAddJson = {
    url: Math.floor(Math.random()*100) + '我是url',
    title: Math.floor(Math.random()*100) + '我是标题'
  }
  connection.query(sqlAdd, sqlAddJson, (err,res) => {
    if(err) return console.log('INSERT INFO ERROR:',err.message);
    console.log('INSERT INFO', res.insertId);
  });
}
// sqlAdd()

// 更新数据 id
const sqlUpdate = id => {
  let sqlAddJson = {
    url: Math.floor(Math.random()*100) + '我是url',
    title: Math.floor(Math.random()*100) + '我是标题'
  }
  let sqlAdd = `UPDATE image SET url = ?, title = ? WHERE id = ?`;
  connection.query(sqlAdd, [sqlAddJson.url, sqlAddJson.title, id], (err,res) => {
    if(err) return console.log('UPDATE ERROR:',err.message);
    console.log('UPDATE', res.changedRows);
  });
}
// sqlUpdate(2)

// 删除数据 id
const sqlDelete = id => {
  let sql = `DELETE FROM image WHERE id = ?`;
  connection.query(sql, [id] , (err,res) => {
    if(err) console.log('[DELETE ERROR]:',err.message);
    console.log('DELETE', res.affectedRows);
  });
}
// sqlDelete(2)

// 查询数据
const sqlSelect = () => {
  let sql = 'SELECT * FROM image';
  connection.query(sql,  (err,result) => {
    if(err) console.log('[SELECT ERROR]:',err.message);
    console.log('result', JSON.stringify(result));  //数据库查询结果返回到result中
  });
}
sqlSelect()

connection.end();

app.use('/', (req, res) => {
  res.send(`hello world`)
})

app.listen(3000, () => console.log('port in 3000'))
