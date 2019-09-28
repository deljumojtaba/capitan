const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
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
    numberPlates: {
        type: String,
        trim: true,
    },
    color: {
        type: String,
        trim: true

    },
    model: {
        type: String,
        trim: true
    },
    gearbox: {
        type: String,
        trim: true,
        enum: ['manual', ' automatic']
    },
    chassisNumber: {
        type: String,
        trim: true
    },
    kilometers: {
        type: String,
        trim: true
    },
    lastRepair: {
        type: Date,
        default: Date.now()
    }

}, {
    timestamps: true
})
module.exports = mongoose.model('Car', CarSchema);