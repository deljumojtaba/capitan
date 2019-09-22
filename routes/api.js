var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/user");



//// register

router.post('/register', function(req, res) {
    if (!req.body.mobile || !req.body.password) {
      res.json({success: false, msg: 'Please pass Mobile and password.'});
    } else {
      const newUser = new User({
        mobile: req.body.mobile,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: 'customer'
      });
      // save the user
      newUser.save(function(err) {
        if (err) {
          return res.json({success: false, msg: 'Mobile already exists.'});
        }
        res.json({success: true, msg: 'Successful created new user.'});
      });
    }
  });

////login

  router.post('/login', function(req, res) {
    User.findOne({
      mobile: req.body.mobile
    }, function(err, user) {
      if (err) throw err;
  
      if (!user) {
        res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            const token = jwt.sign({data: user}, config.secret, {
                expiresIn: 604800 }) // 1 week
            // return the information including token as JSON
            res.json({success: true, user ,token: 'JWT ' + token});
          } else {
            res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
          }
        });
      }
    });
  });





  //////parse authorization token from request headers
  getToken = function (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };


  module.exports = router;

