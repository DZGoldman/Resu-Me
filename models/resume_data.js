// NOTE: '/((\S)+[\s(\S)]+(\S)+)/' is a regex matching expression
// NOTE: that Requires there is AT LEAST one 'non-whitespace' character
// NOTE: (Added because I noticed a couple had nothing in their)

var mongoose = require('mongoose');

// validation Regex requires there's at least one non-whitespace character
var validRegex = [/((\S)+[\s(\S)]+(\S)+)/, "This resume's `{PATH}` doesn't match the regex with `{VALUE}`"];

var ResumeDataSchema = new mongoose.Schema({
   title: String,
   experiences: [{
      type: String,
      validate: validRegex,
      required: true
   }],
   summary: {
      type: String,
      validate: validRegex,
      required: true
   }
})

var ResumeData = mongoose.model('ResumeData', ResumeDataSchema);

//NOTE : validate that the array is longer than 0,
// NOTE: because the hash only validates that things are bing passed in
ResumeDataSchema.path('experiences').validate(function(experiences) {
   if (!experiences) {
      return false
   } else if (experiences.length === 0) {
      return false
   }
   return true;
}, 'Resume needs to have at least one valid experiences');


module.exports = ResumeData;
