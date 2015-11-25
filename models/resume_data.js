var mongoose = require('mongoose');
//
var ResumeDataSchema = new mongoose.Schema({
  title: String,
  experiences: Array,
  summary: String
})

var ResumeData = mongoose.model('ResumeData', ResumeDataSchema)

module.exports = ResumeData
