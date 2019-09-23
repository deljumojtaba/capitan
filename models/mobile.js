const mongoose = require('mongoose');
const Schema = mongoose.Schema;


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
    }
   
})
module.exports = mongoose.model('Mobile', MobileSchema);