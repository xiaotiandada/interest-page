const express = require('express')
const router = express.Router()
const cors = require('cors')
const controller = require('./controller')

router.use(cors())
router.get('/', (req, res) => {
  res.send(`hello world 11qq`)
})

router.get('/allimg', async (req, res) => {
  let allImg = await controller.getAllImg()
  res.send(allImg)
})

module.exports = router