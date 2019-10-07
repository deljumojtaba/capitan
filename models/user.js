const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const validator = require('validator')

const UserSchema = new Schema({
    firstName : {
      type : String,
      required : true,
      trim: true,
      
    },
    lastName : {
        type : String,
        required : true,
        trim: true,
  
    },
    password : {
      type : String,
      required : true,
      trim: true,
      minlength: 4 
  
    },
    mobile : {
        type : String ,
        required : true,
        unique : true,
        minlength : 10
    },
    birthDay : {
        type : Date ,
        trim :true
    }, 
    role : {
      type : String ,
      trim : true,
      required : true ,
      enum: ['customer', 'admin', 'superAdmin','captain','responsibleForPurchase','warehouseKeeper', 'captainplus']

    },
    block : {
       type: Boolean ,
       default : false 
    },
    city : {
        type: String ,
        trim : true
    },

    email: {
        type: String,
        unique: true,
        sparse:true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    point: {
        type: String ,
        trim: true
    },
    referenceCode: {
        type: String ,
        trim: true 
        

    },
    expert: {
        type : String ,
        trim : true
    }

  
    },{
    timestamps: true
  });

UserSchema.pre('save', function (next) {
    let user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);        
    });
};

module.exports = mongoose.model('User', UserSchema);