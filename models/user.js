var mongoose = require("mongoose"),
    bcrypt   = require('bcrypt-nodejs'),
passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username    : String,
    password    : String,
    accessLevel : String
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User" , userSchema);