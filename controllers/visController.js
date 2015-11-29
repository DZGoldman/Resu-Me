// visController.js
var mongoose = require('mongoose');
var ResumeData = require('../models/resume_data.js');


/*
ROUTES:
'/cloud/:query'  -> gets the tfidf data of docs matching the query

'/analyzeResume/:query/:match' -> returns a string saying which RESUMES in the QUERY , MATCH the body of TEXT passed in


*/
module.exports.controller = function(app) {
   // Word cloud '/displayCloud'
   app.get('/displayCloud', (req, res) => {
      res.render('visualization.ejs', {req: req});
   });


// compare the visuals of the resume 
}
