const mongoose = require('mongoose');
const config = require('../config/database');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const passport = require('passport');
const Manufactuier = require('../models/manufactuier')
const CarBrand = require('../models/carBrand')


module.exports = {

  async addCustomer(req, res) {
    try {
      const existCustomer = await User.findOne({
        mobile: req.body.mobile
      })
      if (existCustomer) {
        return res.json({
          success: false,
          msg: 'شماره موبایل وارد شده قبلا وارد شده است'
        });
      }
      const newCustomer = await new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobile: req.body.mobile,
        password: req.body.password,
        role: 'customer',
        email: req.body.email,
        birthDay: req.body.birthDay,
        city: req.body.city,
        referenceCode: req.body.referenceCode


      }).save()
      res.json({
        success: true,
        newCustomer,
        msg: 'Successful created new  Customer.'
      });



    } catch (error) {
      res.status(500).send({
        error: `An error has occured ${error}`
      })
    }
  },
  async allCustomer(req, res) {
    try {

      const customers = await User.find({
        role: 'customer'
      })
      if (!customers) return res.json({
        success: false,
        msg: 'customer not fond'
      });
      res.json({
        success: true,
        customers,
        msg: 'Successful All  Customer.'
      });





    } catch (error) {
      res.status(500).send({
        error: `An error has occured ${error}`
      })
    }

  },




  ////////////////////////////blocking user ///////////////////////

  async blocking(req, res) {
    try {


      const filter = req.body._id;
      const update = true
      const user = await User.findByIdAndUpdate(filter, {
        block: true
      })


      if (!user) return res.json({
        success: false,
        msg: 'customer blocked not fond'
      });
      res.json({
        success: true,
        user,
        msg: 'Successful customer blocked.'
      });

    } catch (error) {
      res.status(500).send({
        error: `An error has occured ${error}`
      })

    }
  },
  /////////////////////un blocking user  //////////////////
  async unblocking(req, res) {
    try {


      const filter = req.body._id;
      const update = true
      const user = await User.findByIdAndUpdate(filter, {
        block: false
      })


      if (!user) return res.json({
        success: false,
        msg: 'customer blocked not fond'
      });
      res.json({
        success: true,
        user,
        msg: 'Successful customer unblocked.'
      });

    } catch (error) {
      res.status(500).send({
        error: `An error has occured ${error}`
      })

    }
  },

  ////////////////////////show  all blocked user/////////////////////////
  /////////

  async blockedUser(req, res) {
    try {
      const findBlock = await User.find({
        block: true
      })
      if (!findBlock) return res.json({
        success: false,
        msg: 'customer findBlock not fond'
      });
      res.json({
        success: true,
        findBlock,
        msg: 'Successful All findBlock  Customer.'
      });

    } catch (error) {
      res.status(500).send({
        error: `An error has occured ${error}`
      })

    }
  },
  //////////////////////////////show unblock users ///////////////////
  async unblockUser(req, res) {
    try {
      const findUnblockBlock = await User.find({
        block: false
      })
      if (!findUnblockBlock) return res.json({
        success: false,
        msg: 'customer unblock not fond'
      });
      res.json({
        success: true,
        findUnblockBlock,
        msg: 'Successful All unBlock  Customer.'
      });

    } catch (error) {
      res.status(500).send({
        error: `An error has occured ${error}`
      })

    }
  }









}