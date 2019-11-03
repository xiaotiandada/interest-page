const mysql = require('./mysql')

module.exports = {
  async getAllImg() {
    try {
      let res = await mysql.getAllImg()
      return {
        code: 0,
        data: res,
        message: 'success'
      }
    } catch (error) {
      console.log('mysql getAllImg error', error)
      return {
        code: -1,
        data: {},
        message: 'fail'
      }
    }
  }
}