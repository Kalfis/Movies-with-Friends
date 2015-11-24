'use strict';
const jwt = require('jsonwebtoken');
const secret = "supersekret";
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
      console.log(req.body.name)
      if (err) throw err;
      // if not any user
      if (user.username != req.body.username) {
        console.log(user.username)
        res.json({ success: false, message: 'Authentication failed. User not found.'});
      // if is a user in database
      } else if (user) {
        // check password
        if (user.password != req.body.password) {
          console.log(req.body.password)
          console.log(user.password)
          res.json({ success: false, message: 'Authentication failed. Wrong password.'})
        } else {
          // user and password is checks out, make token
          let token = jwt.sign(user, secret, {
            expiresInMinutes: 1440 // expires in 24 hrs
          });
          // return everything including the token as JSON
          res.json({
            success: true,
            message: 'Here buddy, have a token!',
            token: token
          });
        }
      }
  });
});

module.exports = router;
