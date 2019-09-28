var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/user");
const smsServise = require('../tools/sendMsg')


/////// send Messeage

router.post('/registermobile', (req, res) => {
  smsServise.registerMobile(req, res)

});



router.post('/acceptmobile', (req, res) => {
  smsServise.acceptMobile(req, res)
})


//// register user

router.post('/register', function (req, res) {
  console.log(req.body)
  if (!req.body.mobile || !req.body.password) {
    res.json({
      success: false,
      msg: 'Please  Mobile and password.'
    });
  } else {
    const newUser = new User({
      mobile: req.body.mobile,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: 'customer',
      city: req.body.city,
      birthDay: req.body.birthDay,
      email: req.body.email,
      referenceCode: req.body.referenceCode
    });
    // save the user
    newUser.save(function (err) {
      if (err) {
        return res.json({
          success: false,
          msg: 'Mobile already exists.'
        });
      }
      res.json({
        success: true,
        newUser,
        msg: 'Successful created new user.'
      });
    });
  }
});

////login

router.post('/login', function (req, res) {
  User.findOne({
    mobile: req.body.mobile
  }, function (err, user) {
    if (err) return res.status(401).send({
      success: false,
      msg: 'شماره موبایل یا پسورد اشتباه است.'
    })

    if (!user) {
      res.status(401).send({
        success: false,
        msg: 'Authentication failed. User not found.'
      });
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // // if user is found and password is right create a token
          // const token = jwt.sign(user.toJSON(), config.secret, {
          //     expiresIn: 604800 }) // 1 week
          // // return the information including token as JSON
          // res.json({success: true, user ,token: 'jwt ' + token});
          const token = jwt.sign(user.toJSON(), config.secret, {
            expiresIn: 604800 // 1 week
          })
          res.json({
            success: true,
            token: `jwt ${token}`,
            user: user.toJSON()
          })

        } else {
          res.status(401).send({
            success: false,
            msg: 'Authentication failed. Wrong password.'
          });
        }
      });
    }
  });
});


/////////////////////////////////////
//// add super admin
////////////////////////////////////
router.post('/addsuperadmin', async (req, res) => {
  try {
    const superAdmin = await User.findOne({
      role: 'superAdmin'
    })
    if (superAdmin) {
      return res.status(401).send({
        success: false,
        msg: 'Super admin available'
      });
    }

    const newSuperAdmin = new User({
      mobile: req.body.mobile,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: 'superAdmin',
      city: req.body.city,
      birthDay: req.body.birthDay,
      email: req.body.email,

    });
    // save the user
    newSuperAdmin.save((err) => {
      if (err) {
        return res.json({
          success: false,
          msg: err
        });
      }
      res.json({
        success: true,
        newSuperAdmin,
        msg: 'Successful created new super Admin.'
      });

    })


  } catch (error) {
    res.status(400).send({
      error: `An error has occured ${error}`
    })
  }


})



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