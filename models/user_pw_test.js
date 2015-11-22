'use strict';

let mongoose = require('mongoose');
let User = require('./user')

var connStr = 'mongodb://localhost:27017/mongoose-bcrypt-test';
mongoose.connect(connStr, (err) => {
  if (err) throw err;
  console.log('Successfully connected to MongoDB');
})

// test user
let testUser = new User({
  username: 'maggie',
  password: 'password123'
})

// save test user to database
testUser.save( (err) => {
  if (err) throw err;

  // fetch user & test password verification
  User.findOne({ username: 'maggie'}, (err, user) => {
    if (err) throw err;

    // test a matching password
    user.authenticate('password123', (err, isMatch) => {
      if (err) throw err;
      console.log('password123:', isMatch)
    });

    // test a failing password
    user.authenticate('123password', (err, isMatch) => {
      if (err) throw err;
      console.log('123password:', isMatch);
    })
  })
  // ends findOne
})
// ends .save
