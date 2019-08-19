// load bcrypt for Mongoos and Password encryption
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
// define user model schema
var userSchema = mongoose.Schema({
  // local stragy passport local key
  local:{
    name: String,
    email: String,
    password: String,
  }
});

// password encryption
userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// valid password
userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.local.password);
};

// expose user mode
module.exports = mongoose.model('User', userSchema);