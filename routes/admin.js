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
    if (reqUser.role !== 'superAdmin' && reqUser.role !=='admin') {
        return res.status(403).send({
            error: `access denied`
          })
    } else  {
        adminController.addCustomer(req, res)
    }
  
  });


  ///////////////////////////////////
  //get all customer
  ///////////////////////////////////
  router.get('/allcustomer',passport.authenticate('jwt', { session: false }), (req , res) => {
  const reqUser = req.user
 if (reqUser.role !== 'superAdmin' && reqUser.role !=='admin') {
     return res.status(403).send({
         error: `access denied`
       })
 } else  {
     adminController.allCustomer(req, res)
 }

});

/////////////////////////////////////////
//// add manufactuier
////////////////////////////////////////

router.post('/addmanufactuier',passport.authenticate('jwt', { session: false }), (req , res) => {
  const reqUser = req.user
if (reqUser.role !== 'superAdmin' && reqUser.role !=='admin') {
   return res.status(403).send({
       error: `access denied`
     })
} else  {
   adminController.addManufactuier(req, res)
}

});

////////////////////////////////////////////
///// delete manufactuier
///////////////////////////////////////////

router.delete('/deletemanufactuier',passport.authenticate('jwt', { session: false }), (req , res) => {
  const reqUser = req.user
if (reqUser.role !== 'superAdmin' && reqUser.role !=='admin') {
   return res.status(403).send({
       error: `access denied`
     })
} else  {
   adminController.deleteManufactuier(req, res)
}

});

/////////////////////////////////////////////
////// edit mannufactuier
////////////////////////////////////////////

router.put('/editmanufactuier',passport.authenticate('jwt', { session: false }), (req , res) => {
  const reqUser = req.user
if (reqUser.role !== 'superAdmin' && reqUser.role !=='admin') {
   return res.status(403).send({
       error: `access denied`
     })
} else  {
   adminController.editManufactuier(req, res)
}

});



  



















module.exports = router;
