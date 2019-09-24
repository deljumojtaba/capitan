var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/user");
const smsServise = require('../tools/sendMsg')
const adminController = require('../tools/adminController')



router.post('/addcustomer',passport.authenticate('jwt', { session: false }), (req , res) => {
       const reqUser = req.user
       console.log(reqUser)
    if (reqUser.role !== 'superAdmin' && reqUser.role !=='admin') {
        return res.status(403).send({
            error: `access denied`
          })
    } else  {
        adminController.addCustomer(req, res)
    }
  
  });
  



















module.exports = router;
