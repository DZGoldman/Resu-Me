var mongoose = require('mongoose');

var ResumeSchema = new mongoose.Schema({
  job_title: String,
  body: String
})

var Resume = mongoose.model('Resume', ResumeSchema)
