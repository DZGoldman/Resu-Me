// // var User = require('../models/user.js');
// var express = require('express')
// var mongoose = require('mongoose');
// var router = express.Router();
//
// // NOTE: in the server.js file
// // 'app.use('/users', User);'
//
// //GET: all users
// router.get('/', function(req,res) {
//    User.find().exec( function(err, users) {
//       res.send(users);
//    });
// });
//
// // GET: single user according to id
// router.get('/:id', function(req,res) {
//    User.findById(req.body._id).exec(function(err, user) {
//       if(err){
//          res.status(404).send("You're not a User!");
//       } else {
//          res.send(user);
//       }
//    });
// });
//
// // POST:  create a new users and save them to the database.
// router.post('/', function(req,res) {
//    user = new User(req.body);
//    user.save( function(err){
//       if(err){
//          console.log(err);
//       } else {
//          console.log('You have been welcomed to the fold ');
//          res.send(user);
//       }
//    });
// });
//
// // DELETE: delete a user - you have to get teh user id of the securrent session in order to make this work
