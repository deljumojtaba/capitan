const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ms = require('ms')


const MobileSchema = new Schema({
    number: {
        type: String ,
        trim: true ,
        required:true,
        unique:true
    } ,
    registerCode: {
        type:String ,
        trim : true ,
    },
     createdAt:{ type: Date, expires: '1m' , default: Date.now }
   
})
module.exports = mongoose.model('Mobile', MobileSchema);