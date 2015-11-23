var mongoose = require('mongoose');

var SuperResumeSchema = new mongoose.Schema({
  education: Array,
  experiences: Array,
  summary: Array
})

var SuperResume = mongoose.model('SuperResume', SuperResumeSchema)

module.exports = SuperResume
