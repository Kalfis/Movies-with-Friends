'use strict';
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const secret = process.env.SECRET;
let bcrypt = require('bcrypt');
let mongoose = require('mongoose');
// require model
let User = require('../models/user');
let Movie = require('../models/movie');

let express = require('express');
let router = express.Router();
// let User = require('../models/user')

// Index
router.route('/')
  .get((req, res, next) => {
    User.find( {}, function(err, users) {
      if (err) throw err;
      res.send(users);
      // loop through the list of users
      // print a list of users.
    }) //ends .find
  }) //ends .get

// route to user auth
router.route('/authenticate')
  .post((req, res) => {
    console.log('hit /users/authenticate');
    // console.log('req.body.user: ' + req.body);
    // console.log('req.body.username: ' + req.body.username )
  User.findOne({
    username: req.body.username
  }, function(err, user) {
      console.log(req.body);
      console.log('user: ' + user);
      if (err) throw err;
      // if unable to find the username in the app's database
      if (user == undefined) {
        // console.log("db user " + user.username)
        // console.log("input: " + req.body.username);
        res.json({ success: false, message: 'Authentication failed. User not found.'});
      // if is a user in database
      } else {
        // console.log(user.username);
        // console.log(req.body.username);
        // check password using the authentication method in our User model.
        // Get the password we are sending through the click event and ajax call in script.js
        user.authenticate(req.body.password, function(err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            // send back a success message, a token, and all of the user data for user matching that username and password.
            return res.send({message: "Password is good friend! Have a token buddy.", token: jwt.sign(user, secret), user: user});
          } else {
            // $('#login-failed').show();
            return res.send({message: "Password ain't right friend. No token(soup) for you!."});
          }
        }) //ends .authenticate
      } //ends .findOne
  });
}); //ends .post

router.route('/signup')
  .post((req, res) => {
    let newUser = new User(req.body);
    console.log(req.body);
    newUser.save();
  })

router.route('/:id')
  .get((req, res, next) => {
    User.find({ _id: req.params.id }, (err, user) => {
      if (err) return next(err);
      res.send(user);
    }); //ends .find
  }); //ends .get

module.exports = router;
