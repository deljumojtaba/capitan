const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
    brand: {
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
        type:String,
        require : true

    }
})
module.exports = mongoose.model('Car', CarSchema);