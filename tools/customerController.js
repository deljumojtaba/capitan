const mongoose = require('mongoose');
const config = require('../config/database');
const jwt = require('jsonwebtoken');
const User = require('../models/user')
const Car = require('../models/car')
const shortid = require('shortid');
const bcrypt = require('bcryptjs');
const Sos = require ('../models/sos')
const Kavenegar = require('kavenegar');
const api = Kavenegar.KavenegarApi({
    apikey: '655A4D716767785037385543704C616F692B6F535231693054696C52463870484A4C2B316A3376437333343D'
});

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
/////////////////////////////////////////////////// change password ///////////////////////////////////////////////////
  async changPassword (req , res) { 
  try {
        const user = await User.findOne(req.user._id) // find request user in database
    if(!user) {
        return res.json({ // returen false if not found user
        success: false,
        message: 'User not fuond' 
      })
    } else {
        bcrypt.compare(req.body.oldpassword, user.password, (err, isMatch) => { // compare oldPassword  
          if (isMatch && !err) { // ismatch callback compare 
                  bcrypt.genSalt(10, function (err, salt) {
                      if (err) {
                          return next(err); 
                      }
                      bcrypt.hash(req.body.newpassword, salt,async function (err, hash) { // hash new password
                          if (err) {
                              return next(err);
                          }
                          await User.findOneAndUpdate({_id:req.user._id},{ // find user and change password
                            $set : { // set new password
                              password : hash
                            }
                        
                          },
                          res.json({ // result true after change
                            success: true,
                            msg: 'پسورد با موفقیت تغییر کرد.'
                          }))
                      });
                  });
            }else{
              return res.json({ // result false after compaer and not match old password in db and old password insert user
                success: false,
                message: 'پسورد قدیمی اشتباه وارد شده است'
              })
            }
        });
      }
    } catch (error) {
      res.status(400).send({
        error: `An error has occured ${error}`
      })
    }
  },
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////// rest password ///////////////////////////////////////////////////
async resetPassword (req, res){
  console.log(req.user);
  
  try {
    bcrypt.genSalt(10, function (err, salt) { // generate salt 
      if (err) {
          return (err); 
      }
      bcrypt.hash(req.user.mobile, salt,async function (err, hash) { // hash new password
          if (err) {
              return (err);
          }
          await User.findOneAndUpdate({_id:req.user._id},{ // find user and rest password
            $set : { // set new password
              password : hash
            }
        
          },
          res.json({ // result true after rest password
            success: true,
            msg: 'پسورد با موفقیت ریست شد'
          }))
      });
  });

  } catch (error) {
    res.status(400).send({
      error: `An error has occured ${error}`
    })
  }

},

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
      sosId: sosId,
      
     

    }).save()
    // res.json({
    //   success: true,
    //   newSos,
    //   msg: 'درخواست با موفقیت ثبت شد '
    // });
  
////////send sms to responible Captain
const responibleCaptain = await User.findOne ({role:'responsibleCaptain'})
let mobileNumber = responibleCaptain.mobile
let msg = `یک درخواست جدید به شماره ${sosId} ثبت شده است جهت مشاهده به پنل خودتان مراجعه کنید`
api.Send({
  message: msg,
  sender: "2000004346",
  receptor: mobileNumber
},
function(response, status) {
  console.log(response);
  console.log(status);
  res.send({
      status , 
      response
  })
});
   
  } catch (error) {
    res.status(500).send({ error
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