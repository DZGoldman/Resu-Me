//NOTE : train classifier for
// var trainMeBro = () => {
var resumeArray = require('../seed.js');
var natural = require('natural');
var express = require('express');
// NOTE this comes from a 'computer programmer'
var classTest = "I Managed the clinic's level 2 support queue focusing on improving customer satisfaction ratings and decreasing ticket resolution times. Resolved escalated desktop and connectivity issues. Configured, installed, and supported Cisco Phones using Cisco Call Manager. Repaired networked printers and fax machines. Installed new desktops, laptops, and other hardware/software. Implemented a new imaging process using Clonezilla and F.O.G. to increase productivity and streamline workstation configuration. Developed custom software to automate common system tasks. Managed workstations on the clinic domain using Active Directory. Configured virtual environments prior to product release to test load balancing and functionality of software introduced into our work environment. Utilized VMware vSphere client to monitor and troubleshoot clinic virtual servers. Tracked network inventory and initiated new hardware orders. Received and worked my case load using Kayako Fusion case management software.";

module.exports.controller = function(app) {

   //FIXME: test route to find
   app.get('/analysis', function(req, res) {
      // create a new classifier
      classifier = new natural.BayesClassifier();
      // res.send(resumeArray[0]);
      // add documents to the classifier
      resumeArray.forEach(function(value, index, array) {
         classifier.addDocument(value.experiences[0].jobdescription, value.summary.jobtitle);
         var i = index + 1;
         console.log("document" + i + " (" + value.summary.jobtitle +") has been trained");
      });

      //train the classifier
      classifier.train();
      res.send(classifier.getClassifications(classTest));
   });

   app.get('/resumeArray', (req, res)=>{
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
}
