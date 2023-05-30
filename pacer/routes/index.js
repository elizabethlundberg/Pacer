var express = require('express')
var router = express.Router()
const indexCtrl = require('../controllers/indexCtrl')

/* GET home page. */
router.get('/', function (req, res, next) {
  let books = indexCtrl.index
  res.render('index', { books })
})

module.exports = router
