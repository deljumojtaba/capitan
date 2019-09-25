const mongoose = require('mongoose');
const config = require('../config/database');
const jwt = require('jsonwebtoken');
const User = require('../models/user') ;
const passport = require('passport');
const Manufactuier = require('../models/manufactuier')


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
} ,
async allCustomer (req , res) {
  try {

    const customers = await User.find({role : 'customer'},(err) => {
    if(!customers) return res.json({success: false, msg: 'customer not fond'});
    res.json({success: true,customers, msg: 'Successful All  Customer.'});


      
    })

  }catch (error) {
      res.status(500).send({
        error: `An error has occured ${error}`
      })
    }
  
},
//////// add Manufactuier
async addManufactuier (req , res) {
  try {
  const existManufactuier = await Manufactuier.findOne({name : req.body.name})
  if(existManufactuier) {
   return res.json({success: false, msg: 'کارخانه سازنده قبلا وارد شده است .'});
} 
  const newManufactuier = await new Manufactuier({
      name: req.body.name
      
  }).save()
res.json({success: true,newManufactuier, msg: 'کارخانه سازنده با موفقیت افزوده شد .'});
  


} catch (error) {
res.status(500).send({
error: `An error has occured ${error}`
})
}
} ,
////////delete manufactuier

async deleteManufactuier (req , res) {
  try { 
    const manufactuier = await Manufactuier.findByIdAndDelete(req.body._id)
    if(!manufactuier) return res.json({success : false , message: 'manufactuier not fuond'})
    return res.json({manufactuier, success : true , message: 'manufactuier has bin deleted'})
    } catch (error) {
      res.status(400).send({
        error: `An error has occured ${error}`
      })
    }
},
////////////////edite manufactuier

async editManufactuier (req ,res) {
  try {    
    const filter = { _id: req.body._id };
    const update = { name: req.body.name };
    let newManufactuier = await Manufactuier.findByIdAndUpdate(filter,update)
    if(!newManufactuier) return res.json({success : false , message: 'Manufactuier not fuond'})
    await newManufactuier.save() ;
    newManufactuier = await Manufactuier.findById(filter)
    await res.json({ success: true, newManufactuier, message: 'Manufactuier has been updated' })
        } catch (error) {
          res.status(400).send({
            error: `An error has occured ${error}`
          })
        }
    }

}