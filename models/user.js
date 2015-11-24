var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  resumes: [{Schema.Types.ObjectID}] //TODO : review and see if this is the right method for passing
})

var User = mongoose.model('User', UserSchema);

module.exports = User
