var express = require('express')
var mongoose = require('mongoose');
var router = express.Router();
var ResumeData = require('../models/resume_data.js');
var UserResume = require('../models/user_resume.js');
var User = require('../models/user.js');
var helper = require('../helpers/resume_form.js')



//app.post resume/:resumeparams
//make a new Resume with params from form, try to save

module.exports.controller = function(app) {

  function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
      return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
  }


  app.get('/newresume', isLoggedIn, function(req, res) {
    var foundthing = {
      education: [],
      experiences: []
    };
    res.render('new_resume', {
      req: req,
      foundthing: foundthing
    })
  })

  app.post('/newresume', function(req, res) {
    //sub == 'submission'
    var sub = req.body
      //start new function
      helper.newResume(sub, req);
     //end new function
    res.render('profile', {
      req: req,
      user: req.user
    })
  })



    app.post('/updateresume', function(req, res) {
      console.log('updating a resume');
      var sub = req.body
        //delete the old resume (from user and database)
      var resumeID = sub.ID;
      //delete function:
      helper.deleteResume(resumeID, req)
       //end delete function

      var sub = req.body
        //start new function
            helper.newResume(sub, req);
      //end new function

      res.redirect('/profile')

    })




  app.get('/resume/delete/:id', function(req, res) {
    var resumeID = req.params.id
      //delete function:
        helper.deleteResume(resumeID, req)
   //end delete function
    res.redirect('/profile')
  })

  app.get('/resume/makecurrent/:id', function(req, res) {
    var resumeID = req.params.id
    var userID = req.user._id;
    User.findById(userID, function(err, user) {
      if (err) throw err;
      user.resumes.forEach(function(resume, index) {
        if (resume._id == resumeID) {
          user.resumes.splice(index, 1);
          user.resumes.push(resume)
          return
        }
      })
      user.save(function(err) {
        if (err) throw err;
      })
    })
    res.redirect('/profile')
  })


//edit route
  app.get('/:id', function(req, res) {
    //  var UserResume.findById(req.params.id);
    var resumeID = req.params.id;
    console.log('ROUTE:the edit resumes id:', resumeID);
    UserResume.findById(resumeID, function(err, foundthing) {
      if (err) {
        console.log('this is the error:',err);
      } else {
        console.log('sucess:', foundthing.summary);
        console.log('the found thing:');

        res.render('new_resume', {
          req: req,
          foundthing: foundthing
        })
      }

    })
      });

}
