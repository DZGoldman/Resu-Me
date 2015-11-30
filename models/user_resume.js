var mongoose = require('mongoose');

var UserResumeSchema = new mongoose.Schema({
   education: Array,
   summary: String,
   name: String,
   streetAddress: String,
   email: String,
   phone: String,
   experiences: [{
      title: String,
      startDate: String,
      endDate: String,
      description: String
   }],
   summary: String
});


var UserResume = mongoose.model('UserResume', UserResumeSchema)

module.exports = UserResume;
