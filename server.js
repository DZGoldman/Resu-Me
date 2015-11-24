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


var UserResume = require('./models/user_resume.js');

app.get('/resumeform', function(req, res) {
  console.log('form');
   res.render('resumeForm', {
      title: "Save new Resume", //page title
      action: "/resume", //post action for the form
      fields: [{
         name: "name",
         type: 'text',
         property: "required"
      }, {
         name: "streetAddress",
         type: 'text',
         property: "required"
      }, {
         name: "email",
         type: 'text',
         property: "required"
      }, {
         name: "phone",
         type: 'text',
         property: "required"
      }, {
         name: "summary",
         type: "textarea",
         property: "required",
         rows: "5",
         cols: "50"
      }, {
         name: "title",
         type: 'text',
         property: "required"
      }, {
         name: "startDate",
         type: 'text',
         property: "required"
      }, {
         name: "endDate",
         type: 'text',
         property: "required"
      }, {
         name: "description",
         type: "textarea",
         property: "required"
      }]
   });
});

app.post('/resume', (req,res)=>{
  console.log('form submitted');
   res.send(req.body);

  //  UserResume.save({
  //    name: req.param('name'),
  //    streetAddress: req.param('streetAddress'),
  //    email: req.param('email'),
  //    phone: req.param('phone'),
  //    experiences: [{
  //       title: req.param('title'),
  //       startDate: req.param('startDate'),
  //       endDate: req.param('endDate'),
  //       description: req.param('description')
  //    }],
  //    summary: req.param('summary'),

   //})


});

//
// fs.readdirSync('./controllers').forEach(function (file) {
//   if(file.substr(-3) == '.js') {
//       route = require('./controllers/' + file);
//       route.controller(app);
//   }
// });
