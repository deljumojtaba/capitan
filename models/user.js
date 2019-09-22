var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

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
      enum: ['customer', 'admin', 'superAdmin','repairman']

    },
    block : Boolean ,
    email: {
        type: String,
        unique: true,
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
    systemId: {
        type: String ,
        trim: true ,
        required: true ,
        unique : true

    }

  
    },{
    timestamps: true
  });

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);