var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  resumes: Array

})

var User = mongoose.model('User', UserSchema);

module.exports = User
