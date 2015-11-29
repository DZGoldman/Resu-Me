var express = require('express')
var mongoose = require('mongoose');
var router = express.Router();
var ResumeData = require('../models/resume_data.js');
var UserResume = require('../models/user_resume.js')
var User = require('../models/user.js')

module.exports.controller = function (app) {

  function isLoggedIn(req, res, next) {

      // if user is authenticated in the session, carry on
      if (req.isAuthenticated())
          return next();

      // if they aren't redirect them to the home page
      res.redirect('/');
  }

  app.get('/resumeform', function (req, res) {
    res.render('../views/resume.ejs');
  });

  app.get('/newresume', isLoggedIn, function (req, res) {
     res.render('new_resume', {req:req})
  })

  app.post('/newresume', function (req,res) {
    //sub == 'submission'
    var sub= req.body
    var newResume = new UserResume();
    //make a new resume, give all submission data to its appropriate keys
    newResume.name = sub.Name;
    newResume.streetAddress = sub.Address;
    newResume.email = sub.Email;
    newResume.phone = sub.Phone;
    newResume.education = sub.Education
    newResume.summary = sub.Summary
    //create a new experience object for the array of experience for each new experience that gets added
    newResume.experiences = [];
    var experienceObject = {}
    sub.textinput.forEach(function (input, index) {
      switch(index%4){
        case 0:
        experienceObject.title = input
        break;
        case 1:
        experienceObject.startDate = input;
        break;
        case 2:
        experienceObject.endDate = input;
        break;
        case 3:
        experienceObject.description = input;
        newResume.experiences.push(experienceObject)
        break;
      }
    })
    //give new resume to the current user
    req.user.resumes.push(newResume);
    //save unpdated current user and the resume itself into the db
    newResume.save(function(err) {
        if (err)
            throw err;
    });
    req.user.save(function(err) {
        if (err)
            throw err;
    });

    res.render('profile', {req: req, user : req.user})
  })


  app.get('/resume/edit/:id', function (req, res) {
  //  var UserResume.findById(req.params.id);
  });

  app.get('/resume/delete/:id', function (req, res) {
    var resumeID = req.params.id
    UserResume.remove({_id: resumeID}, function (err, result) {
      if (err) {
        console.log(err);
      }else {
        console.log('deleted');
        var userID = req.user._id;
        User.findById(userID,function (err,user) {
          if (err) throw err;
          user.resumes.forEach(function (resume, index) {
            if (resume._id==resumeID) {
                user.resumes.splice(index, 1);
                return
              }
          })

          user.save(function (err) {
            if (err) throw err;
          })
        })

      }
    })

        res.render('profile', {req: req, user : req.user})
  })

  app.get('/resume/makecurrent/:id',function (req,res) {
    var resumeID = req.params.id
    var userID = req.user._id;
    User.findById(userID,function (err,user) {
      if (err) throw err;
      user.resumes.forEach(function (resume, index) {
        if (resume._id==resumeID) {
            user.resumes.splice(index, 1);
            user.resumes.push(resume)
            return
          }
      })

      user.save(function (err) {
        if (err) throw err;
      })
    })

    res.render('profile', {req: req, user : req.user})
  })

}
