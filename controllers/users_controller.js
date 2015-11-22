'use strict';

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



module.exports = router;
