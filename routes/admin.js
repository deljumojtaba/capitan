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
const carController = require('../tools/carController')



router.post('/addcustomer', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const reqUser = req.user
  if (reqUser.role !== 'superAdmin' && reqUser.role !== 'admin') {
    return res.status(403).send({
      error: `access denied`
    })
  } else {
    adminController.addCustomer(req, res)
  }

});


///////////////////////////////////
//get all customer
///////////////////////////////////
router.get('/allcustomer', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const reqUser = req.user
  if (reqUser.role !== 'superAdmin' && reqUser.role !== 'admin') {
    return res.status(403).send({
      error: `access denied`
    })
  } else {
    adminController.allCustomer(req, res)
  }

});

/////////////////////////////////////////
//// add manufactuier
////////////////////////////////////////

router.post('/addmanufactuier', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const reqUser = req.user
  if (reqUser.role !== 'superAdmin' && reqUser.role !== 'admin') {
    return res.status(403).send({
      error: `access denied`
    })
  } else {
    carController.addManufactuier(req, res)
  }

});

////////////////////////////////////////////
///// delete manufactuier
///////////////////////////////////////////

router.delete('/deletemanufactuier', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const reqUser = req.user
  if (reqUser.role !== 'superAdmin' && reqUser.role !== 'admin') {
    return res.status(403).send({
      error: `access denied`
    })
  } else {
    carController.deleteManufactuier(req, res)
  }

});

/////////////////////////////////////////////
////// edit mannufactuier
////////////////////////////////////////////

router.put('/editmanufactuier', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const reqUser = req.user
  if (reqUser.role !== 'superAdmin' && reqUser.role !== 'admin') {
    return res.status(403).send({
      error: `access denied`
    })
  } else {
    carController.editManufactuier(req, res)
  }

});

/////////////////////////////////////
///////add car brand/
////////////////////////////////////

router.post('/addbrandcar', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const reqUser = req.user
  if (reqUser.role !== 'superAdmin' && reqUser.role !== 'admin') {
    return res.status(403).send({
      error: `access denied`
    })
  } else {
    carController.addCarBrand(req, res)
  }

});

///////////////////////////////////
//////edit car brand
//////////////////////////////////

router.put('/editbrandcar', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const reqUser = req.user
  if (reqUser.role !== 'superAdmin' && reqUser.role !== 'admin') {
    return res.status(403).send({
      error: `access denied`
    })
  } else {
    carController.editCarBrand(req, res)
  }

});

///////////////////////////////////
// delete Car Brand
//////////////////////////////////

router.delete('/deletebrandcar', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const reqUser = req.user
  if (reqUser.role !== 'superAdmin' && reqUser.role !== 'admin') {
    return res.status(403).send({
      error: `access denied`
    })
  } else {
    carController.deleteCarBrand(req, res)
  }

});

////////////////////////////////////////
//////add Car Name 
////////////////////////////////////////

router.post('/addcarname', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const reqUser = req.user
  if (reqUser.role !== 'superAdmin' && reqUser.role !== 'admin') {
    return res.status(403).send({
      error: `access denied`
    })
  } else {
    carController.addCarName(req, res)
  }

});

///////////////////////////////////////
////////edit car Name
//////////////////////////////////////

router.put('/editcarname', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const reqUser = req.user
  if (reqUser.role !== 'superAdmin' && reqUser.role !== 'admin') {
    return res.status(403).send({
      error: `access denied`
    })
  } else {
    carController.editCarName(req, res)
  }

});

///////////////////////////////////////
////////delete car Name 
///////////////////////////////////////

router.delete('/deletecarname', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const reqUser = req.user
  if (reqUser.role !== 'superAdmin' && reqUser.role !== 'admin') {
    return res.status(403).send({
      error: `access denied`
    })
  } else {
    carController.deleteCarName(req, res)
  }

});
////////////////////////////////////////
//////// 


















module.exports = router;