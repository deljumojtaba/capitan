const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SosProblemSchema = new Schema({
    problemId: {
        type: String,
        trim: true,
        require: true,
    },
    userPhone: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true

    },
    carType: {
        type: String,
        trim: true
    },
    problem: {
        trim: true,
        type: String
    },
    numberPlates: {
        type: String,
        trim: true,

    },
    dateOfProblem: {
        type: String,
        trim: true,
        required: true
    },
    timeOfProblem: {
        type: String,
        trim: true,
        required: true

    },
    condition: {
        type: String,
        trim: true,
        required: true,
        default: 'registered',
        enum: ['registered', 'captainSmove', 'finished']
    },

    cMobile: {
        type: String,
        trim: true
    },
    cName: {
        type: String,
        trim: true
    },
    timeOfSend: {
        type: String,
        trim: true
    },
    dateOfSend: {
        type: String,
        trim: true
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('SosProblem', SosProblemSchema);