var resumeArray = require('../seed.js');
var natural = require('natural');
TfIdf = natural.TfIdf;
var express = require('express');


module.exports.controller = function(app) {

   app.get('/analysis', function(req, res) {
      // create a new classifier and add socuments
      classifier = new natural.BayesClassifier();
      resumeArray.forEach(function(value, index, array) {
         classifier.addDocument(value.experiences[0].jobdescription, value.summary.jobtitle);
         // console.log("document" + i + " (" + value.summary.jobtitle + ") has been trained");
      });
      //train the classifier
      classifier.train();
      // NOTE: sends array of relative fit in each class
      // res.send(classifier.getClassifications(classTest));
      //NOTE: returns string of the most closely matched class.
      res.send(classifier.classify(classTest));
   });

   // route to view the resume array tes
   app.get('/resumeArrayTest', (req, res) => {
      res.send(resumeArray[0]);
   });

   //return list of 10 most important words in EVERY document
   app.get('/tfidf', (req, res) => {
      tfidf = new TfIdf();
      var output = [];
      // save length of resume array
      var len = resumeArray.length;
      //add job description to each document
      resumeArray.forEach(function(value, index, array) {
         tfidf.addDocument(value.experiences[0].jobdescription);
      });
      // display the first 10 most important words in each document.
      for (var i = 1; i < len; i++) {
         var report = "Document [" + i + "] ";
         tfidf.listTerms(i).forEach(function(item, index) {
            //only list the first 10 words
            if (index < 10) {
               report = report + "word #" + index + ": " + item.term + ', ';
            }
         });
         // console.log(report);
         output.push(report);
      }
      res.send(output);
   });

   //return important of wrods to different documents
   // sample uri component "design%20development%20creativity%20analysis"
   app.get('/tfidf/:compare', (req, res) => {
      tfidf = new TfIdf();
      var output = []
         //  //NOTE : does this need to be decoded instead?
      var compare = decodeURIComponent(req.params.compare);

      //add job description documents to the tfidf
      resumeArray.forEach(function(value, index, array) {
         tfidf.addDocument(value.experiences[0].jobdescription);
      });
      // compare the passed in variables to this document.
      tfidf.tfidfs(compare, function(i, measure) {
         output.push("the strings', '" + compare + "' importance to document# " + i + "is " + measure);
      })
      res.send(output);
   });

   app.get('/cloud', (req, res) => {
      console.log("got to the cloud route");
      var output = [];
      //create a new tfidf object
      tfidf = new TfIdf();
      // add the selected documents to the tfidf
      //NOTE: below is the test function
      resumeArray.forEach(function(value, index, array) {
         tfidf.addDocument(value.experiences[0].jobdescription);
      });

      console.log("added all of the documents");
      //tfidf.listTerms(i )
      var counter = 0;
      //find a sensible way to choose which document.
      tfidf.listTerms(1).forEach(function(item) {
         // counter sets the number of values in the wordcloud
         if (counter <= 50) {
            // scale the value of item.tfidf for the view in showCloud
            var itemScaled = item.tfidf * 10;
            //push hash format required for d3-cloud
            output.push({
               "text": item.term,
               "size": itemScaled
            });
            counter += 1;
         }
      });
      res.send(output);
   });
}
