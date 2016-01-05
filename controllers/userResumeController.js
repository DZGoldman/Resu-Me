var express = require('express')
var mongoose = require('mongoose');
var router = express.Router();
var ResumeData = require('../models/resume_data.js');
var UserResume = require('../models/user_resume.js');
var User = require('../models/user.js');
var helper = require('../helpers/resume_form.js')



module.exports.controller = function(app) {

  function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
      return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
  }

//create a new resume
  app.get('/newresume', isLoggedIn, function(req, res) {
    //pass in a blank object (to distinguish from the edit route)
    var resumeObj = {
      education: [],
      experiences: []
    };
    //req gets pass in to all render-view route to give each page access to session data
    res.render('new_resume', {req: req, resumeObj: resumeObj })
  })

  app.post('/newresume', function(req, res) {
    //sub is 'submission'
    var sub = req.body
      //make a new resume (helper)
      helper.newResume(sub, req);
    res.render('profile', {req: req, user: req.user
    })
  })

    app.post('/updateresume', function(req, res) {
      console.log('updating a resume');
      var sub = req.body
      var resumeID = sub.ID;
      //delete old resume
      helper.deleteResume(resumeID, req)
      //'recreate' a new one with edits
      helper.newResume(sub, req);
      res.redirect('/profile')
    })

  app.get('/resume/delete/:id', function(req, res) {
    var resumeID = req.params.id
    // delete clicked resume:
    helper.deleteResume(resumeID, req)
    res.redirect('/profile')
  })

  //make clicked resume in profile the 'currrent' resume
  app.get('/resume/makecurrent/:id', function(req, res) {
    var resumeID = req.params.id
    var userID = req.user._id;
    User.findById(userID, function(err, user) {
      if (err) throw err;
      //move clicked resume to the end of the array
      user.resumes.forEach(function(resume, index) {
        if (resume._id == resumeID) {
          user.resumes.splice(index, 1);
          user.resumes.push(resume)
          return
        }
      })
      //update user
      user.save(function(err) {
        if (err) throw err;
      })
    })
    res.redirect('/profile')
  })

//edit route - needs to be at bottom fear for now, (strange bug with bootstrap). edits resume clicked in the profile
  app.get('/resume/edit/:id', function(req, res) {
    console.log(req.params);
    console.log(req.params.id);
    var resumeID = req.params.id;
    UserResume.findById(resumeID, function(err, resumeObj) {
      if (err) {
        throw err;
      } else {
        res.render('new_resume', {
          req: req,
          resumeObj: resumeObj
        })
      }
    })
  });

}
