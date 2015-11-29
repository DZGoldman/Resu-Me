var express = require('express');
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var logger = require('morgan');

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
app.use(session({
   secret: 'ilovescotchscotchyscotchscotch'
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// required for pass port routes
require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport



var ResumeData = require('./models/resume_data.js');
var app = express();



// use an index.html
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.static('public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/public'));

// log with morgan
app.use(logger('dev'));
app.set('views', __dirname + '/views');
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

app.listen(3000, () => {
   console.log("Resu-me listening on Port 3000")
});


app.get('/', (req, res) => {
   res.render('index', {
      req: req
   });
});


app.get('/test', function(req, res) {
   ResumeData.find({
      title: "computer programmer"
   }).exec(function(err, resumes) {

      res.send(resumes);
   });
});


app.get('/resume', function(req, res) {
   res.render('new_resume', {
      req: req
   })
})

app.get('/displayCloud', (req, res) => {
   res.render('visualization.ejs', {req: req});
});

//Controllers
fs.readdirSync('./controllers').forEach(function(file) {
   if (file.substr(-3) == '.js') {
      route = require('./controllers/' + file);
      route.controller(app);
   }
});
