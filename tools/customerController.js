const mongoose = require('mongoose');
const config = require('../config/database');
const jwt = require('jsonwebtoken');
const User = require('../models/user')
const Car = require('../models/car')



module.exports = {

  async getProfile(req, res) {
    const user = await User.findOne({
      mobile: req.user.mobile
    })
    if (!user) {
      return res.status(401).send({
        error: `customer not fuond`
      })
    } else {
      return res.json({
        success: true,
        user,
        msg: 'Success profile'
      });
    }

  },
  /////////////////edit customer
  async editProfile(req, res) {
    try {
      if (req.body.password || req.body.mobile || req.body.role) return res.status(400).send({
        msg: 'mobile &password not allow'
      })
      const newUser = await User.findByIdAndUpdate(req.user._id, req.body)
      if (!newUser) return res.json({
        success: false,
        message: 'User not fuond'
      })
      res.json({
        success: true,
        newUser,
        message: 'User has been updated'
      })
    } catch (error) {
      res.status(400).send({
        error: `An error has occured ${error}`
      })
    }
  },
  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.body._id)
      if (!user) return res.json({
        success: false,
        message: 'User not fuond'
      })
      return res.json({
        user,
        success: true,
        message: 'User has bin deleted'
      })
    } catch (error) {
      res.status(400).send({
        error: `An error has occured ${error}`
      })
    }
  },
  /////// add customer car
  async addCar(req, res) {
    try {
      const newCar = await new Car({
        manufactuier: req.body.manufactuierId,
        carName: req.body.carNameId,
        carBrand: req.body.carBrandId,
        numberPlates: req.body.numberPlates,
        color: req.body.color,
        model: req.body.model,
        gearbox: req.body.gearbox,
        chassisNumber: req.body.chassisNumber,
        kilometers: req.body.kilometers,
        lastRepair: req.body.lastRepair,
        owner: req.user._id

      }).save()
      res.json({
        success: true,
        newCar,
        msg: 'خودرو با موفقیت افزوده شد '
      });


    } catch (error) {
      res.status(500).send({
        error: `An error has occured ${error}`
      })
    }

  },
  /////////// edit customer car
  async editCar(req, res) {
    try {
      const filter = {
        _id: req.body._carId
      };

      let newCar = await Car.findByIdAndUpdate(filter, req.body)
      if (!newCar) return res.json({
        success: false,
        message: 'خودرو وجود ندارد'
      })
      await newCar.save();
      newCar = await Car.findById(filter)
      await res.json({
        success: true,
        newCar,
        message: 'خودرو با موفقیت ویرایش شد .'
      })
    } catch (error) {
      res.status(400).send({
        error: `An error has occured ${error}`
      })
    }
  },
  ///////////////////// show customer cars
  async getCar(req, res) {
    try {

      const cars = await Car.find({
        owner: req.user._id
      })
      if (!cars) return res.json({
        success: false,
        msg: 'car not fond'
      });
      res.json({
        success: true,
        cars,
        msg: 'Successful All  .'
      });





    } catch (error) {
      res.status(500).send({
        error: `An error has occured ${error}`
      })
    }

  } ,
  ////////////////////////delete customer car
  async deleteCar(req, res) {
    try {
      const car = await Car.findByIdAndDelete(req.body.carId)
      if (!car) return res.json({
        success: false,
        message: 'Car not fuond'
      })
      return res.json({
        car,
        success: true,
        message: 'Car has bin deleted'
      })
    } catch (error) {
      res.status(400).send({
        error: `An error has occured ${error}`
      })
    }
  }

}