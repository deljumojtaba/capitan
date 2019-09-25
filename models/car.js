const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
    manufactuier: {
        type: String ,
        trim: true ,
        require : true
    } ,
    carName: {
        type:String ,
        trim : true ,
        require : true
    },
    numberPlates: {
        type: String ,
        trim: true,
    },
    color: {
        type:String ,
        trim : true  

    },
    carBrand : {
        type:String ,
        trim : true ,
        require : true 
    },
    model : {
        type : String,
        trim : true 
    },
    gearbox : {
        type : String ,
        trim : true
    },
    chassisNumber : {
        type : String,
        trim : true
    },
    kilometers : {
        type : String ,
        trim : true
    },
    lastRepair : {
        type : Date,
        default : Date.now()
    }

    },{
        timestamps : true 
})
module.exports = mongoose.model('Car', CarSchema);