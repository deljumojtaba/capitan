const mongoose = require('mongoose');
const config = require('../config/database');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const passport = require('passport');
const Manufactuier = require('../models/manufactuier')
const CarBrand = require('../models/carBrand')
const CarName = require('../models/carName')
const SosProblem = require ('../models/sosproblem')


module.exports = {
  async addCaptain(req, res) {
    try {
      const existCaptain = await User.findOne({ mobile: req.body.mobile })
      if (existCaptain) {
        return res.json({ success: false, msg: 'شماره موبایل وارد شده قبلا وارد شده است' });
      }
      const newCaptain = await new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobile: req.body.mobile,
        password: req.body.password,
        role: 'captain',
        email: req.body.email,
        birthDay: req.body.birthDay,
        city: req.body.city,
        referenceCode: req.body.referenceCode,
        point: '5',
        expert: req.body.expert


      }).save()
      res.json({ success: true, newCaptain, msg: 'کاپیتان با موفقیت افزوده شد .' });



    } catch (error) {
      res.status(500).send({
        error: `An error has occured ${error}`
      })
    }
  },
  /////////////////////// get all captain
  async allCaptain(req, res) {
    try {

      const captains = await User.find({ role: 'captain' })
      if (!captains) return res.json({ success: false, msg: 'هیچ کاپیتانی وجود ندارد' });
      res.json({ success: true, captains, msg: 'لیست کاپیتان ها :' });



    } catch (error) {
      res.status(500).send({
        error: `An error has occured ${error}`
      })
    }

  },
  async editCaptain(req, res) {
    try {
      if (req.body.point || req.body.role || req.body.password) return res.status(400).send({ msg: 'point &password not allow' })
      const newUser = await User.findByIdAndUpdate(req.user._id, req.body)
      if (!newUser) return res.json({ success: false, message: 'User not fuond' })
      res.json({ success: true, newUser, message: 'captain has been updated' })
    } catch (error) {
      res.status(400).send({
        error: `An error has occured ${error}`
      })
    }
  },
  ////////delete captain
  async deleteCaptain(req, res) {
    try {
      const captain = await User.findByIdAndDelete(req.body._id)
      if (!captain) return res.json({ success: false, message: 'captain not fuond' })
      return res.json({ captain, success: true, message: 'captain has bin deleted' })
    } catch (error) {
      res.status(400).send({
        error: `An error has occured ${error}`
      })
    }
  },
  /////////////////// add captain
  async addCaptainPlus(req, res) {
    try {
      const existCaptain = await User.findOne({ mobile: req.body.mobile })
      if (existCaptain) {
        return res.json({ success: false, msg: 'شماره موبایل وارد شده قبلا وارد شده است' });
      }
      const newCaptain = await new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobile: req.body.mobile,
        password: req.body.password,
        role: 'captainplus',
        email: req.body.email,
        birthDay: req.body.birthDay,
        city: req.body.city,
        referenceCode: req.body.referenceCode,
        point: '5',
        expert: req.body.expert


      }).save()
      res.json({ success: true, newCaptain, msg: 'کاپیتان با موفقیت افزوده شد .' });



    } catch (error) {
      res.status(500).send({
        error: `An error has occured ${error}`
      })
    }
  },
  //////////////////////// start fix problem
  async startFixProblem(req, res) {
    try {
      const filter = {
        problemId: req.body.problemId
      };
      const update = {
        condition: 'captainSmove',
        cMobile: req.body.cMobile,
        cName: req.body.cName,
        timeOfSend: req.body.timeOfSend,
        dateOfSend: req.body.dateOfSend

      };
      let newProblem = await SosProblem.findOneAndUpdate(filter, update)
      if (!newProblem) return res.json({
        success: false,
        message: 'خطا در یافت اطلاعات'
      })
      await newProblem.save();
      newProblem = await SosProblem.findOne(filter)
      await res.json({
        success: true, 
        newProblem,
        message: 'درخواست با موفقیت ثبت شد !'
      })
    } catch (error) {
      res.status(400).send({
        error: `An error has occured ${error}`
      })
    }
  }


}