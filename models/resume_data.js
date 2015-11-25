var mongoose = require('mongoose');
//
var ResumeDataSchema = new mongoose.Schema({
  education: Array,
  experiences: Array,
  summary: Array
})

var ResumeData = mongoose.model('ResumeData', ResumeDataSchema)

module.exports = ResumeData
