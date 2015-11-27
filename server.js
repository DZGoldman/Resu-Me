var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var logger = require('morgan');
var fs = require('fs');
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

app.listen(3000, () => {
   console.log("Resu-me listening on Port 3000")
});

app.get('/', (req, res) => {
   res.render('index', req.body);
});


app.get('/test', function(req, res) {
   ResumeData.find({
      title: "computer programmer"
   }).exec(function(err, resumes) {

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
