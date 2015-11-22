// Note: since server.js is the entry point for this express app, I tested the code below in server.js. I removed it, but am keeping it here as a reference.
'use strict';

let mongoose = require('mongoose');
let User = require('./user')

let connStr = 'mongodb://localhost:27017/mongoose-bcrypt-test';
mongoose.connect(connStr, (err) => {
  if (err) throw err;
  console.log('Successfully connected to MongoDB');
})

// test user
let testUser = new User({
  username: 'pizzerina',
  password: 'password123'
})

// save test user to database
testUser.save( function(err) {
  if (err) throw err;

  // fetch user & test password verification
  User.findOne({ username: 'pizzerina'}, function(err, user) {
    if (err) throw err;
//
    // test a matching password
    user.authenticate('password123', function(err, isMatch) {
      if (err) throw err;
      console.log('password123:', isMatch);
    });
//
    // test a failing password
    user.authenticate('123password', function(err, isMatch) {
      if (err) throw err;
      console.log('123password:', isMatch);
    });
  });
//   ends findOne
});
// ends .save
