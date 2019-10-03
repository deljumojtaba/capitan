var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/user");
const smsServise = require('../tools/sendMsg')
const superAdminController = require('../tools/superAdminController')
var mid = require('../tools/mid')



router.post('/addadmin',passport.authenticate('jwt', { session: false }),mid.test, (req , res) => {

    if (req.user.role !== 'superAdmin') {
        return res.status(400).send({
            error: `not access`
          })
    } else  {
        superAdminController.addAdmin(req, res)
    }
  
  });
  
















module.exports = router;
