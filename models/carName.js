const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarNameSchema = new Schema({
    name: {
        type: String ,
        trim: true ,
        require : true,
        unique : true
    },
    manufactuier: {
        type: mongoose.Schema.Types.ObjectId ,
        trim : true ,
        require : true,
        ref : 'Manufactuier'
    },
    carBrand : {
        type: mongoose.Schema.Types.ObjectId ,
        trim : true ,
        require : true,
        ref : 'CarBrand'
    }
    
})
module.exports = mongoose.model('CarName', CarNameSchema);