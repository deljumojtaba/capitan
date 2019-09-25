const mongoose = require('mongoose');
const config = require('../config/database');
const jwt = require('jsonwebtoken');
const User = require('../models/user')
const passport = require('passport');



module.exports = {

async getProfile (req , res) {
    const user = await User.findOne({mobile:req.user.mobile})
if (!user) {
    return res.status(401).send({
        error: `customer not fuond`
      })
} else  {
   return res.json({success: true,user, msg: 'Success profile'});
    }

} ,

async editProfile (req ,res) {
  try {
    if (req.body.password || req.body.mobile || req.body.role) return res.status(400).send({msg:'mobile &password not allow'})     
    const newUser = await User.findByIdAndUpdate(req.user._id, req.body)
    if(!newUser) return res.json({success : false , message: 'User not fuond'})
          res.json({ success: true, newUser, message: 'User has been updated' })
        } catch (error) {
          res.status(400).send({
            error: `An error has occured ${error}`
          })
        }
    },
    async deleteUser (req, res) {
        try { 
        const user = await User.findByIdAndDelete(req.body._id)
        if(!user) return res.json({success : false , message: 'User not fuond'})
        return res.json({user, success : true , message: 'User has bin deleted'})
        } catch (error) {
          res.status(400).send({
            error: `An error has occured ${error}`
          })
        }
      },


}