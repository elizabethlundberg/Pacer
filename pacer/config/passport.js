require('./config/database')
require('./config/passport')
require('../models/user')

const passport = require('passport')
const User = require('../models/user')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK
    },
    {
      async function(accessToken, refreshToken, profile, cb) {
        try {
          let user = await User.create({
            name: profile.displayName,
            googleId: profile.id
          })
          return cb(null, user)
        } catch (err) {
          return cb(err)
        }
      }
    }
  )
)

passport.serializeUser((user, cb) => {
  cb(null, user._id)
})

passport.deserializeUser(async (userId, cb) => {
  cb(null, await User.findById(userId))
})
