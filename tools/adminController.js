const mongoose = require('mongoose');
const config = require('../config/database');
const jwt = require('jsonwebtoken');
const User = require('../models/user')
const passport = require('passport');



module.exports = {

    async addCustomer (req , res) {
        try {
        const existCustomer = await User.findOne({mobile : req.body.mobile})
        if(existCustomer) {
         return res.json({success: false, msg: 'شماره موبایل وارد شده قبلا وارد شده است'});
    } 
        const newCustomer = await new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mobile: req.body.mobile,
            password: req.body.password,
            role: 'customer',
            email:req.body.email,
            birthDay : req.body.birthDay,
            city: req.body.city,
            referenceCode: req.body.referenceCode

            
        }).save()
      res.json({success: true,newCustomer, msg: 'Successful created new  Customer.'});
        

    
} catch (error) {
    res.status(500).send({
      error: `An error has occured ${error}`
    })
  }
}
}