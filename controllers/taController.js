var natural = require('natural');
var mongoose = require('mongoose');
var ResumeData = require('../models/resume_data.js');
var analysis = require('../helpers/text_analysis.js');

/*************************************/
var ANALYZE_LIMIT = 100;
var DISPLAY_LIMIT = 30;
var CLOUD_SCALING = 100;
/*************************************/

module.exports.controller = function(app) {
// test route to return random resume
   app.get('/randomResume', function(req, res)
      ResumeData.findOne(function(err, resume){
         res.send(resume);
      });
   });
// match text content to selection of resumes
   app.get('/analyzeResume/:query/:match', function(req, res) {
      // NOTE: arbitrary limit to 100 to speed up response time
      ResumeData.find({
         //match query params instead of exact string
         title: {
            "$regex": req.params.query,
            "$options": "i"
         }
      }).limit(ANALYZE_LIMIT).exec(
         function(err, resumes) {
            var result = analysis.classify(resumes, req.params.match);
            res.send(result);
         });
   });
// return the top 10 words matching a query
   app.get('/tfidf/:query', function(req, res){
      ResumeData.find({
         //match query params instead of exact string
         title: {
            "$regex": req.params.query,
            "$options": "i"
         }
      }).limit( ANALYZE_LIMIT ).exec(
         function(err, resumes) {
            var result = analysis.mostImportantWords(resumes, DISPLAY_LIMIT, 1);
            res.send(result);
         });
   });
// return relative importance of compare to doc wher title = query
   app.get('/tfidf/:query/:compare', function(req, res){
      ResumeData.find({
         //match query params instead of exact string
         title: {
            "$regex": req.params.query,
            "$options": "i"
         }
      }).limit(ANALYZE_LIMIT).exec(
         function(err, resumes) {
            var result = analysis.compareTextImportance(resumes, req.params.compare);
            res.send(result);
         });
   });
// return top 10 words matching query AND scale numbers for D3
   app.get('/cloud/:query', function(req, res){
      ResumeData.find({
         //match query params instead of exact string
         title: {
            "$regex": req.params.query,
            "$options": "i"
         }
      }).limit( ANALYZE_LIMIT ).exec(
         function(err, resumes) {
            var result = analysis.importantWordsCloud(resumes, DISPLAY_LIMIT, 1);
            res.send(result);
         });
   });

}
