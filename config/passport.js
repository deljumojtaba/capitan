const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

// load up the user model
var User = require('../models/user');
var config = require('../config/database'); // get db config file

module.exports = (passport) => {
    let opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
    opts.secretOrKey = config.secret ;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
      User.findOne({_id: jwt_payload._id}, (error, user) => {
        if (error) {
          return done(error, false)
        }
        if (user) {
          done(null, user)
        } else {
          done(null, false)
        }
      })
    }))
  }
  