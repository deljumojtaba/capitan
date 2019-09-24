const mongoose = require('mongoose');
const config = require('../config/database');
const jwt = require('jsonwebtoken');
const User = require('../models/user')
var passport = require('passport');







module.exports = {

    async addAdmin (req , res) {
        try {
        const existAdmin = await User.findOne({mobile : req.body.mobile})
        if(existAdmin) {
         return res.json({success: false, msg: 'شماره موبایل وارد شده قبلا وارد شده است'});
    } 
        const newAdmin = await new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mobile: req.body.mobile,
            password: req.body.password,
            role: 'admin',
            email:req.body.email,
            birthDay : req.body.birthDay,
            city: req.body.city,
            


            
        }).save()
      res.json({success: true,newAdmin, msg: 'Successful created new  Admin.'});
        

    
} catch (error) {
    res.status(400).send({
      error: `An error has occured ${error}`
    })
  }
}
}