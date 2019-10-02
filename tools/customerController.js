const mongoose = require('mongoose');
const config = require('../config/database');
const jwt = require('jsonwebtoken');
const User = require('../models/user')
const Car = require('../models/car')
const shortid = require('shortid');
const Creditcard = require('../models/creditCard')

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

  },
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
  },
  /////////////////////////chang password
  // async changPassword (req , res) {
  //   try {
  //      const user = await User.findById(req.user._id)
  //      if(!user) {
  //      return res.json({
  //       success: false,
  //       message: 'User not fuond'
  //     })
  //   } else {
  //     // check if password matches
  //     user.comparePassword(req.body.oldPassword, function (err, isMatch) {
  //       if (isMatch && !err) {
  //         user.password = req.body.newPassword 
  //         return res.json({
  //           success: true,
  //           message: 'User password change'
  //         })
  //       }
  //     })
  //   }

  //   } catch (error) {
  //     res.status(400).send({
  //       error: `An error has occured ${error}`
  //     })
  //   }
  // }
  async sendSos(req, res) {
    try {
      let sosId = shortid.generate();
      const newSos = await new Sos({
        car: req.body.carId,
        location: req.body.location,
        address: req.body.address,
        description: req.body.description,
        service: req.body.service,
        part: req.body.part,
        sosId: sosId


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

  ///////// add credit card////////////
  ////////////////////////////////////
  async addCreditCard(req, res) {
    const existCredit = await Creditcard.findOne({
      cardNumber: req.body.cardNumber
    })
    if (!existCredit) {
      try {
        const newCreditCard = await new Creditcard({
          customerID: req.user._id,
          cardNumber: req.body.cardNumber
        })

        newCreditCard.save((err, credit) => {
          console.log(err)
          if (err) {
            res.json({
              success: false,
              msg: "شماره کارت 16 رقم باید باشد"
            })
          }
          if (credit) {
            res.json({
              success: true,
              newCreditCard,
              msg: 'کارت با موفقیت ثبت شد'
            })
          }
        })

      } catch (error) {
        res.status(500).send({
          error: `An error has occured ${error}`
        })
      }
    } else {
      return res.json({
        success: false,
        msg: " قبلا وارد شده"
      })
    }
  },
  ////////////////////////////delete credit card //////////////////
  async deleteCard(req, res) {
    try {
      const deleteCreditCard = await Creditcard.findByIdAndDelete(req.body._id)
      if (!deleteCreditCard) {
        return res.json({
          success: false,
          msg: "کارت پاک نشد"
        })
      } else {
        return res.json({
          success: true,
          deleteCreditCard,
          msg: "کارت مورد نظر با موفقیت پاک شد"
        })
      }

    } catch (error) {
      res.status(400).send({
        error: `An error has occured ${error}`
      })
    }
  },
  //////////////////////////edit credit card /////////////////////////
  async editCreditCard(req, res) {

    try {
      const obj = {
        _id: req.body._id
      };

      let editCreditcard = await Creditcard.findByIdAndUpdate(obj, req.body)
      if (!editCreditcard) return res.json({
        success: false,
        message: 'کارت وجود ندارد'
      })
      await editCreditcard.save();
      editCreditcard = await Creditcard.findById(obj)
      await res.json({
        success: true,
        editCreditcard,
        message: 'کارت با موفقیت ویرایش شد .'
      })

    } catch (error) {
      res.status(400).send({
        error: `An error has occured ${error}`
      })
    }
  },
///////////// get all yours credit cards  ///////
async getYoursCards (req , res){
  try{
    const YoursCards = await Creditcard.find({
      customerID: req.user._id
    })
    if (!YoursCards) return res.json({
      success: false,
      msg: 'کارت پیدا نشد'
    });
    res.json({
      success: true,
      YoursCards,
      msg: ' تمام حساب های شما .'
    });
  }catch (error){
    res.status(400).send({
      error: `An error has occured ${error}`
    })
  }
},
////////////////////////// get AllCredits from admin and superAdmin ///////////////////
async getAllCredits(req ,res){
  try{
    const AllCards = await Creditcard.find({})
    if(!AllCards){
      return res.json({success:false , msg:'کارت پیدا نشد'})
    }
    res.json({success: true , AllCards , msg:' تمام حساب ها '})
  }catch(error){
    res.status(400).send({
      error: `An error has occured ${error}`
    })
  }
}
}