
var express = require('express');
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');

//requirements for passport
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var configDB = require('./config/database.js');


// set up express app
app.use(logger('dev'));
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// required for pass port routes
require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport



var ResumeData = require('./models/resume_data.js');
var UserResume = require('./models/user_resume.js')


// use an index.html
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(bodyParser.json());
app.use(logger('dev'));
//app.use(express.static('public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.use(express.static(__dirname + '/public'))
   // log with morgan
app.use(logger('dev'));
app.set('view engine', 'ejs');

// connect to Mongodb
mongoose.connect('mongodb://localhost/resu-me', (err) => {
   if (err) {
      console.log(err);
   } else {
      console.log('connection successfull');
   }
});

//need this for passport
require('./config/passport')(passport); // pass passport for configuration

app.listen(3000, ()=>{ console.log("Resu-me listening on Port 3000")});


app.get('/', (req, res) => {

   res.render('index', {req: req});

});

app.get('/test', function(req, res) {
   ResumeData.find({
      title: "computer programmer"
   }).exec(function(err, resumes) {
      res.send(resumes);
   });
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


// get and post routes for submitted a new resume - belong in UserResume controller eventually:
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

//
// fs.readdirSync('./controllers').forEach(function (file) {
//   if(file.substr(-3) == '.js') {
//       route = require('./controllers/' + file);
//       route.controller(app);
//   }
// });
