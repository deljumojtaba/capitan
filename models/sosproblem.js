const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SosProblem = new Schema({
    problemId: {
        type: String,
        trim : true ,
        require : true,
    },
    userPhone : {
        type : String ,
        trim : true 
    },
    address : {
        type : String ,
        trim : true 

    } ,
    carType : {
        type : String ,
        trim : true
    } ,
    problem : {
        trim : true ,
        type : String
    } ,
    numberPlates : {
        type: String ,
        trim : true ,

    } , 
    dateOfProbleme : {
        type : String ,
        trim : true ,
        required : true
    } ,
    timeOfProbleme : {
        type : String ,
        trim : true ,
        required : true 
       
    },
    condition : {
        type : String ,
        trim : true ,
        required : true ,
        default : 'registered',
        enum : ['registered','captainSmove','finished']
    }
    } , {
    timestamps: true
    })
    
module.exports = mongoose.model('SosProblem', SosProblem);