var express = require('express'),
   mongoose = require('mongoose'),
   bodyParser = require('body-parser'),
   logger = require('morgan'),
   fs = require('fs'),
   app = express(),
   request = require('request');
ResumeData = require('./models/resume_data.js');

// var User = require('./controllers/userController.js');
// use an index.html
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.static('public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));


// log with morgan
app.use(logger('dev'));
// connect to Mongodb
mongoose.connect('mongodb://localhost/resu-me', (err) => {
   if (err) {
      console.log(err);
   } else {
      console.log('connection successfull');
   }
});

app.listen(3000, () => {
   console.log("Resu-me listening on Port 3000")
});

app.get('/', (req, res) => {
   res.render('index', req.body);
});

app.get('/thisTest', (req, res) => {
   ResumeData.find().exec((err, resumes) => {
      // var test = resumes[3];
      res.send(resumes);
   });
});

//Controllers
fs.readdirSync('./controllers').forEach(function(file) {
   if (file.substr(-3) == '.js') {
      route = require('./controllers/' + file);
      route.controller(app);
   }
});
