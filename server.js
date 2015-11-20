var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var logger = require('morgan');
var app = express();

// use an index.html
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.static('public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

// log with morgan
app.use(logger('dev'));
// connect to Mongodb
mongoose.connect('mongodb://localhost/resu-me', (err)=>{
   if(err){
      console.log(err);
   } else {
      console.log('connection successfull')
   }
});

app.listen(3000, ()=>{ console.log("Museumr listening on Port 3000")});

app.get('/', (req, res)=>{
   res.render('index', req.body);
});
