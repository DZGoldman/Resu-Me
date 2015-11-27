//user resume
var mongoose = require('mongoose');

var UserResumeSchema = new mongoose.Schema({
  education: Array,
  experiences: Array,
  summary: Object 
})

var UserResume = mongoose.model('UserResume', UserResumeSchema)

module.exports = UserResume
