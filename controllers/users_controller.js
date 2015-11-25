'use strict';
let express = require('express');
let router = express.Router();
const jwt = require('jsonwebtoken');
// require models
let User = require('../models/user');
let Movie = require('../models/movie');
// do I need to explicity state the secret? test.
const secret = process.env.SECRET;


// Index
router.route('/')
  .get((req, res, next) => {
    res.send('Test. Hello! You\'ve hit the users route!');
  })

// test route for a user profile
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

// Authenticate a user upon login to give user a token
router.route('/authenticate')
  .post((req, res) => {
  User.findOne({
    name: req.body.username
  }, function(err, user){
      if (err) throw err;
      // if not any user
      if (user.username != req.body.users.username) {
        //console.log(user.username)
        //console.log("name: " + req.body.users.username);
        res.json({ success: false, message: 'Authentication failed. User not found.'});
      // if is a user in database
      // deleted "if (user) 11/25"
      } else {
        console.log(user.username);
        // if password does not authenticate
          user.authenticate(req.body.users.password, function(err, isMatch) {
            //is isMatch a var or a function? if var, is it synonymous with true?
            console.log(isMatch);
            // test to see if this returns undefined--to see if isMatch is a function or not...
            console.log(isMatch;
            if (err) throw err;
            // if password matches, give user a token
            if (isMatch) {
              let token = jwt.sign(user, secret, {
                expiresInMinutes: 1440 // expires in 24 hrs
              });
              // return everything including the token as JSON
              res.json({
                success: true,
                message: 'Here friend, have a token!',
                token: token
              });
            } else {
              res.json({ success: false, message: 'Auth Failed. Wrong Password'})
            }
        }; //ends user.authenticate
      } //ends else (if username found)
  }); // ends anon. err/ user function
}); // ends .post

module.exports = router;
