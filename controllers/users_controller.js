'use strict';
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
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
      } else if (user) {
        // check password
        bcrypt.compare(user.password, req.body.users.password, function(err, res){
          //console.log("pass: "+req.body.users.password)
          console.log(user.password)
          res.json({ success: false, message: 'Authentication failed. Wrong password.'});
        })
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
  });
});

module.exports = router;
