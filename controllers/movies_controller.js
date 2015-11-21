'use strict';
let express = require('express');
let router = express.Router();
let User = require('../models/user');

router.route('/')
      .get((req, res, next) => {
        User.find({}, (err, allUsers) => {
          if(err) throw err;
          res.json(allUsers);
        });

      })
        .post((req, res, next) => {
          let newUser = new User({
            name: req.body.name,
            password: req.body.password
          });
          console.log(newUser);
          newUser.save((err) => {
            if (err) throw err;
            console.log('new user saved');
          });
          res.send('saved');
        });

  module.exports = router;
