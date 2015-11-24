//NOTE : train classifier for
// var trainMeBro = () => {
var resumeArray = require('../seed.js');
var natural = require('natural');
TfIdf = natural.TfIdf;
tfidf = new TfIdf();
var express = require('express');
// NOTE this comes from a 'computer programmer'
var classTest = "I Managed the clinic's level 2 support queue focusing on improving customer satisfaction ratings and decreasing ticket resolution times. Resolved escalated desktop and connectivity issues. Configured, installed, and supported Cisco Phones using Cisco Call Manager. Repaired networked printers and fax machines. Installed new desktops, laptops, and other hardware/software. Implemented a new imaging process using Clonezilla and F.O.G. to increase productivity and streamline workstation configuration. Developed custom software to automate common system tasks. Managed workstations on the clinic domain using Active Directory. Configured virtual environments prior to product release to test load balancing and functionality of software introduced into our work environment. Utilized VMware vSphere client to monitor and troubleshoot clinic virtual servers. Tracked network inventory and initiated new hardware orders. Received and worked my case load using Kayako Fusion case management software.";

module.exports.controller = function(app) {
   //FIXME: test route to find
   app.get('/analysis', function(req, res) {
      // create a new classifier
      classifier = new natural.BayesClassifier();
      // add documents to the classifier
      resumeArray.forEach(function(value, index, array) {
         classifier.addDocument(value.experiences[0].jobdescription, value.summary.jobtitle);
         var i = index + 1;
         console.log("document" + i + " (" + value.summary.jobtitle + ") has been trained");
      });

      //train the classifier
      classifier.train();
      res.send(classifier.getClassifications(classTest));
   });

// route to view the resume array tes
   app.get('/resumeArrayTest', (req, res) => {
      res.send(resumeArray[0]);
   });


   app.get('/analysis/test', function(req, res) {
      classifier = new natural.BayesClassifier();
      /************ NOTE : here is a test ************/

      classifier.addDocument('i am long qqqq', 'buy');
      classifier.addDocument('buy the q\'s', 'buy');
      classifier.addDocument('short gold', 'sell');
      classifier.addDocument('sell gold', 'sell');

      classifier.train();
      //shou'd return 'sell'
      res.send(classifier.classify('i am short silver'));

      /************ NOTE : END of TEST ************/
   });


   app.get('/tfidf', (req, res) => {
      var output = [];
      // save length of resume array
      var len = resumeArray.length;
      // attach the portner stemmer to natural
      resumeArray.forEach(function(value, index, array) {
         tfidf.addDocument(value.experiences[0].jobdescription);
         /* stem and tokenize
         // natural.PorterStemmer.attach();
         // natural.LancasterStemmer.attach();
         //Stem and tokenize the text.
         // var stemmed = value.experiences[0].jobdescription.tokenizeAndStem();
         // add the document fo to the tfidf
         // tfidf.addDocument(stemmed);
         */
      });
      // display the first 10 most important words in each document.
      for (var i = 1; i < len; i++) {
         var report = "Document " + i;
         // 10 documents in each
         tfidf.listTerms(i).forEach(function(item, index) {
            if (index < 10) {
               report = report + " #" + index + ": " + item.term + ' ';
            }
         });
         // console.log(report);
         output.push(report);
      }
      res.send(output);
   })
}
