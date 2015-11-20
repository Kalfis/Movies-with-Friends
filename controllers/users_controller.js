'use strict';

let express = require('express');
let router = express.Router();
let User = require('../models/user')

// Index
router.route('/user/:id')
  .get((req, res, next) => {
    res.send('Test. Hello user!');
  })



  module.exports = router;
