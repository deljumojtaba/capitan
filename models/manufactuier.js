const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ManufactuierSchema = new Schema({
    name: {
        type: String,
        trim: true,
        require: true,
        unique: true
    }

})
module.exports = mongoose.model('Manufactuier', ManufactuierSchema);