const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
  
    carName: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        require: true,
        ref: 'CarName'
    },
    carBrand: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref: 'CarBrand'
    },
    price: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        trim: true
    }
   
    

}, {
    timestamps: true
})
module.exports = mongoose.model('Service', ServiceSchema);