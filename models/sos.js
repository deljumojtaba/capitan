const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SosSchema = new Schema({
    car: {
        type: mongoose.Schema.Types.ObjectId ,
        trim : true ,
        require : true,
        ref : 'Car'
    },
    location : {
        type : String ,
        trim : true 
    },
    address : {
        type : String ,
        trim : true 

    } ,
    description : {
        type : String ,
        trim : true
    } ,
    service : {
        type: mongoose.Schema.Types.ObjectId ,
        trim : true ,
        require : true,
        ref : 'Service'
    } ,
    part : {
        type: mongoose.Schema.Types.ObjectId ,
        trim : true ,
        require : true,
        ref : 'Part'

    } , 
    sosId : {
        type : String ,
        trim : true ,
        required : true
    }
    } , {
    timestamps: true
    })
    
module.exports = mongoose.model('Sos', SosSchema);