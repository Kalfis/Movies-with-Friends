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
    res.send('Test. Hello! You\'ve hit the users route!');
  })


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
      // console.log("what is this "+ req.body.users.username)
      if (err) throw err;
      // if not any user
      if (user.username != req.body.username) {
        console.log("db user " + user.username)
        console.log("CURL input: " + req.body.username);
        res.json({ success: false, message: 'Authentication failed. User not found.'});
      // if is a user in database
        // console.log(user.username);
        // console.log(req.body.users.username);
      } else {
        console.log(user.username);
        console.log(req.body.username);
        // check password using the authentication method in our User model.
        user.authenticate(req.body.password, function(err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            return res.send({message: "Password is good friend! Have a token buddy.", token: jwt.sign(user, secret)});
          } else {
            return res.send({message: "Password ain't right friend. No token(soup) for you!."});
          }
        }) //ends .authenticate
      } //ends .findOne
  });
}); //ends .post

router.route('/agatha')
  .get((req, res, next) => {
    // let enteredName = req.params.username
    // let userId = req.params.id
    // find user matching the userId
    User.find({ username: 'Agatha'}, (err, user) => {
      if (err) return next(err);
      console.log(user);
      res.send(user);
    }); // ends .findOne
  }); //ends .get


module.exports = router;
