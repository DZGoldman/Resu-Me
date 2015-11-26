var mongoose = require mongoose,
   natural = require('natural'),
   classifier = new natural.BayesClassifier(),
   tfidf = natural.TFidf,
   Resume = require('../models/resume_data.js');

//connect to mongoose
mongoose.connect('mongodb://localhost/resu-me', (err) => {
   if (err) {
      console.log(err);
   } else {
      console.log('connection successfull');
   }
});

// module to export
module.exports = {
   // return a classifier when you search by titles.
   classifyTitles: (title) => {

   },
};
