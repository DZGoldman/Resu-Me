var UserResume = require('../models/user_resume.js');
var User = require('../models/user.js');

module.exports = {
  deleteResume: function (resumeID, req) {
    //remove from UserResume database:
    UserResume.remove({
        _id: resumeID
      }, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log('deleted');
          //resume from User's resumes
          var userID = req.user._id;
          User.findById(userID, function(err, user) {
            if (err) throw err;
            user.resumes.forEach(function(resume, index) {
              if (resume._id == resumeID) {
                user.resumes.splice(index, 1);
                return
              }
            })
            user.save(function(err) {
              if (err) throw err;
            })
          })
        }
      })

  },
  newResume: function (sub,req) {
    var newResume = new UserResume();
    //make a new resume, give all submission data to its appropriate keys
    newResume.name = sub.Name;
    newResume.streetAddress = sub.Address;
    newResume.email = sub.Email;
    newResume.phone = sub.Phone;
    newResume.education = sub.Education
    newResume.summary = sub.Summary
      //create a new experience object for the array of experiences for each new experience that gets added
    newResume.experiences = [];
    var experienceObject = {}
    sub.textinput.forEach(function(input, index) {
        switch (index % 4) {
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
  }
}
