var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var logger = require('morgan');
var app = express();
var fs = require('fs');
// use an index.html
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(bodyParser.json());
app.use(logger('dev'));
//app.use(express.static('public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

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

app.listen(3000, () => {
   console.log("Resu-me listening on Port 3000")
});

app.get('/', (req, res) => {
   res.render('index', req.body);
});

app.get('/resumeform', function(req, res) {
   res.render('resumeForm', {
      title: "Save a new ", //page title
      action: "/resumeform", //post action for the form
      fields: [{
         name: "name",
         type: 'text'
         property: required
      }, {
         name: "streetAddress",
         type: 'text'
         property: required
      }, {
         name: "email",
         type: 'text'
         property: required
      }, {
         name: "phone",
         type: 'text'
         property: required
      }, {
         name: "summary",
         type: 'text'
         property: required
      }, {
         name: "experiences",
         type: 'text'
         property: required
      }, {
         name: "title",
         type: 'text'
         property: required
      }, {
         name: "startDate",
         type: 'text'
         property: required
      }, {
         name: "endDate",
         type: 'text'
         property: required
      }, {
         name: "description",
         type: 'text'
         property: required
      }]
   });
});



//
// fs.readdirSync('./controllers').forEach(function (file) {
//   if(file.substr(-3) == '.js') {
//       route = require('./controllers/' + file);
//       route.controller(app);
//   }
// });
