const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreditCardsSchema = new Schema({

    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        require: true,
        ref: 'User'
    },
    cardNumber:{
        type: String,
        trim:true,
        required:true,
        unique:true,
        maxlength: 16
    },
  

    cash:{
        type:String
    },

    expiration :{
        type :Date
    }

}, {
    timestamps: true
    })
module.exports = mongoose.model('CreditCard', CreditCardsSchema)