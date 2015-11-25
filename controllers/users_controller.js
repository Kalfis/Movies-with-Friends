'use strict';

let express = require('express');
let router = express.Router();
// let User = require('../models/user')

// require models
const User = require('../models/user');
let Movie = require('../models/movie');

// Index
router.route('/')
  .get((req, res, next) => {
    res.send('Test. Hello! You\'ve hit the users route!');
  })

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
