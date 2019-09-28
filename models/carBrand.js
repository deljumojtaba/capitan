const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarBrandSchema = new Schema({
    name: {
        type: String ,
        trim: true ,
        require : true,
        unique : true
    },
    manufactuierId: {
        type: mongoose.Schema.Types.ObjectId ,
        trim : true ,
        require : true,
        ref : 'Manufactuier'
    }
    
})
module.exports = mongoose.model('CarBrand', CarBrandSchema);