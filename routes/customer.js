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
const customerController = require ('../tools/customerController')
const mid = require('../tools/mid')
const Creditcard = require('../models/creditCard')
const carController = require('../tools/carController')

//////////////////get user profile
router.get('/getprofile',passport.authenticate('jwt', { session: false }),mid.test, (req , res) => {

     customerController.getProfile(req, res)
});

//////////////////// edit customer profile
router.post('/editprofile' , passport.authenticate('jwt', { session: false }),mid.test, (req , res) => {
    customerController.editProfile(req , res)
}) ;
//////////////////////delete customer profile
router.delete ('/deleteprofile' , passport.authenticate('jwt', { session: false }),mid.test, (req , res) => {
    const reqUser = req.user
    if (reqUser.role ==='admin'||reqUser.role === 'superAdmin' || reqUser._id === req.body._id) {
    customerController.deleteUser(req , res)
    } else {
    return res.status(403).send({
        error: `access denied`
      })
    }
});

////////////////////////// add customer cars 
router.post('/addcustomercar' , passport.authenticate('jwt', { session: false }),mid.test, (req , res) => {
    customerController.addCar (req , res) })

//////////////////////////// edit customer car
router.put('/editcustomercar' , passport.authenticate('jwt', { session: false }),mid.test, (req , res) => {
    customerController.editCar (req , res) })
///////////////////////////
///get customer cars
//////////////////////////
router.get('/customercars' , passport.authenticate('jwt', { session: false }),mid.test, (req , res) => {
    customerController.getCar (req , res) })
////////////////////////////
////delete customer car 
////////////////////////////
router.delete('/deletecustomercar', passport.authenticate('jwt', { session:false}),mid.test, (req , res) => {
   customerController.deleteCar (req , res) })


//////////////////////////
////request sos
/////////////////////////
router.post('/sendsos', passport.authenticate('jwt', { session:false}),mid.test, (req , res) => {
    customerController.sendSos (req , res) })
////////////////////////
////*****add creditCard***** ///////
//////////////////////
router.post('/addCreditCard' , passport.authenticate('jwt' , {session:false}) ,mid.test, (req,res)=>{
  customerController.addCreditCard (req , res)  
    })

//////////////////////*** delete CreditCard ** ////////////////
router.delete('/deleteCard' , passport.authenticate('jwt' , {session:false}) , mid.test , (req,res)=>{
    customerController.deleteCard (req , res)
})
////////////////////*** edit creditCard *** //////////////////
router.put('/editCreditCard' , passport.authenticate('jwt', {session:false}) , mid.test , (req,res)=>{
customerController.editCreditCard (req , res)
})
//////////////////*** show all user credit cards *** /////////
router.get('/getCreditCards' , passport.authenticate('jwt' , {session:false}) , mid.test , (req, res)=>{
    if (req.user.role ==='admin'||req.user.role === 'superAdmin' || req.user.role === 'customer') {
    customerController.getYoursCards (req , res)
    }else{
        return res.status(403).send({
            error: `access denied`
          })
    }
})
//////////////////******** show all credit Cards *******//////////////
router.get('/getAllCredits' , passport.authenticate('jwt',{session:false}) , mid.test , (req ,res)=>{
    if(req.user.role === 'admin' || req.user.role === 'superAdmin'){
        customerController.getAllCredits(req , res)
    }else{
        return res.status(403).send({
            error :`access denied`
        })
    }
})

/////////////////////////////////////////////
////// get all mannufactuier
////////////////////////////////////////////

router.get('/getallmanufactuier', passport.authenticate('jwt', {
    session: false
  }),mid.test, (req, res) => {
    
      carController.getAllManufactuier(req, res)

  });

/////////////////////////////////////////////
////// get all carBrand
////////////////////////////////////////////

router.get('/getallcarbrand', passport.authenticate('jwt', {
    session: false
  }),mid.test, (req, res) => {
    
      carController.getAllCarBrand(req, res)

  });

  /////////////////////////////////////////////
////// get all carName
////////////////////////////////////////////

router.get('/getallcarname', passport.authenticate('jwt', {
    session: false
  }),mid.test, (req, res) => {
    
      carController.getAllCarName(req, res)

  });

//////////////////////////////////////////////////////////////////////////////////////////
/********************** show carBrand by filter from mannufactuier***********************/
//////////////////////////////////////////////////////////////////////////////////////////

router.post('/showcarbrand', passport.authenticate('jwt', {
    session: false
  }),mid.test, (req, res) => {
    
      carController.showCarBrand(req, res)

  });

//////////////////////////////////////////////////////////////////////////////////////////
/********************** show carBrand by filter from mannufactuier***********************/
//////////////////////////////////////////////////////////////////////////////////////////

router.post('/showcarname', passport.authenticate('jwt', {
    session: false
  }),mid.test, (req, res) => {
    
      carController.showCarName(req, res)

  });



module.exports = router;
