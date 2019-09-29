const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PartSchema = new Schema({
    manufactuier: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        require: true,
        ref: 'Manufactuier'
    },
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
    },
    brand: {
        type: String,
        trim: true
    },
    code:{
        type : String ,
        trim : true,
        required : true , 
        unique : true
    }


}, {
    timestamps: true
})
module.exports = mongoose.model('Part', PartSchema);