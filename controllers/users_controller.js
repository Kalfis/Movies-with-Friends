'use strict';
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET||"supersekret";
let bcrypt = require('bcrypt');
let mongoose = require('mongoose');
// require model
let User = require('../models/user');

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
  User.findOne({
    name: req.body.username
  }, function(err, user){
      //console.log(req.body.username)
      if (err) throw err;
      // if not any user
      if (user.username != req.body.users.username) {
        //console.log(user.username)
        //console.log("name: "+req.body.users.username);
        res.json({ success: false, message: 'Authentication failed. User not found.'});
      // if is a user in database
        // console.log(user.username);
        // console.log(req.body.users.username);
      } else {
        console.log(user.username);
        console.log(req.body.users.username);
        // check password using the authentication method in our User model.
        user.authenticate(req.body.users.password, function(err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            return res.send({message: "Password is a match! Token granted.", token: jwt.sign(user, secret)});
          } else {
            return res.send({message: "Password is not a match. Token denied."});
          }
        }) //ends .authenticate
      } //ends .findOne
  });
}); //ends .post

module.exports = router;
