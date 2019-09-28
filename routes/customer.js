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

//////////////////get user profile
router.get('/getprofile',passport.authenticate('jwt', { session: false }), (req , res) => {

     customerController.getProfile(req, res)
});

//////////////////// edit customer profile
router.post('/editprofile' , passport.authenticate('jwt', { session: false }), (req , res) => {
    customerController.editProfile(req , res)
}) ;
//////////////////////delete customer profile
router.delete ('/deleteprofile' , passport.authenticate('jwt', { session: false }), (req , res) => {
    const reqUser = req.user
    if (reqUser.role ==='admin'||reqUser.role === 'superAdmin' || reqUser._id === req.body._id) {
    customerController.deleteUser(req , res)
    } else {
    return res.status(403).send({
        error: `access denied`
      })
    }
}) ;

////////////////////////// add customer cars 
router.post('/addcustomercar' , passport.authenticate('jwt', { session: false }), (req , res) => {
    customerController.addCar (req , res) })






module.exports = router;
