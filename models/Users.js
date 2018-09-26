const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

// Create User Schema
const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }
});


UserSchema.pre('save', function(next) {
    var user = this;
      // Check if document is new or a new password has been set
    if(this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function(err,salt) {
            if(err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function(err,hash) {
                if(err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    }
    else {
        return next();
    }
});

module.exports = User = mongoose.model('User',UserSchema);