var express = require('express')
var router = express.Router()
const indexCtrl = require('../controllers/indexCtrl')
const updateCtrl = require('../controllers/updateCtrl')
const passport = require('passport')

/* GET home page. */
router.get('/', indexCtrl.index)

router.post('/', indexCtrl.addBook)

router.get('/add', indexCtrl.addInterface)

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile']
  })
)

router.get(
  '/oauth2callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/'
  })
)

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/')
  })
})

router.get('/update0', updateCtrl.update0)

module.exports = router
