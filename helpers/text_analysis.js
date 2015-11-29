var mongoose = require('mongoose'),
   natural = require('natural'),
   TfIdf = natural.TfIdf,
   bodyParser = require('body-parser'),
   ResumeData = require('../models/resume_data.js');

// helper method to add together the entire text of the resume.
var resumeContent = function(resume) {
   return resume.summary + resume.experiences.join(' ');
};

// helper method to create object from mult terms.
var toObj = function(key, value) {
   var obj = {};
   obj[key] = value;
   return obj;
};

var wordCloudHash = function(text, size){
   var obj = {};
   obj["text"] = text;
   obj["size"] = size;
   return obj;
}

module.exports = {

   classify: function(resumes, textToMatch) {
      classifier = new natural.BayesClassifier();
      resumes.forEach((resume, index, array) => {
         var content = resumeContent(resume);
         classifier.addDocument(content, resume.title);
      });
      classifier.train()
      return classifier.classify(textToMatch);
   },

   mostImportantWords: function(resumes, numWords, scale) {
      tfidf = new TfIdf();

      // Add the content of each document
      resumes.forEach(function(resume, index, array) {
         var content = resumeContent(resume);
         tfidf.addDocument(content);
      });

      // list `numWords` most important terms for each resume
      var outputObjArr = [];
      var len = resumes.length

      for (var i = 1; i < len; i++) {
         var report = [];
         tfidf.listTerms(i).forEach(function(item, index) {
            if (index < numWords) {
               report.push(toObj(item.term, item.tfidf * scale) );
            }
         });

         outputObjArr.push( toObj(resumes[i].title, report) );
      }
      return outputObjArr;
   },
   importantWordsCloud: function(resumes, numWords, scale) {
      tfidf = new TfIdf();

      // Add the content of each document
      resumes.forEach(function(resume, index, array) {
         var content = resumeContent(resume);
         tfidf.addDocument(content);
      });

      // list `numWords` most important terms for each resume
      var outputObjArr = [];
      var len = resumes.length

      for (var i = 1; i < len; i++) {
         var report = [];
         tfidf.listTerms(i).forEach(function(item, index) {
            if (index < numWords) {
               report.push(wordCloudHash(item.term, item.tfidf));
            }
         });

         outputObjArr.push( {title: resumes[i].title, data: report});
      }
      return outputObjArr;
   },

   compareTextImportance: function(resumes, compare){
      tfidf = new TfIdf();
      var outputArray = []

      //add job description documents to the tfidf
      resumes.forEach(function(resume, index, array) {
         tfidf.addDocument( resumeContent(resume) );
      });
      // compare the passed in variables to this document.
      tfidf.tfidfs(compare, function(i, measure) {
         outputArray.push( toObj(i, (measure) ) );
      });
      return toObj(compare, outputArray);
   }

}; // END OF MODULE.EXPORTS
