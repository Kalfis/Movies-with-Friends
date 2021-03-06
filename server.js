'use strict';
let express = require('express');
let logger = require('morgan');
let request = require('request');
let path = require('path');
let bodyParser = require('body-parser');
let jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
let User = require('./models/user'); // get our mongoose model for user



// require our routes
let userRoutes = require('./controllers/users_controller');
let movieRoutes = require('./controllers/movies_controller');

let app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

let mongoose = require('mongoose');
// connect to our database, moviegoerApp

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/moviegoerApp');


let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', (callback) => {
  console.log('Mongoose Connected');
});

// Register our routes
// all routes starting with /users will be in userRoutes
app.use('/users', userRoutes);
// all routes starting with /movies will be in movieRoutes
app.use('/movies', movieRoutes);


// in production, need to use PORT instead of 3000
let server = app.listen(process.env.PORT || 3000, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log('express running', host, port);
  console.log(process.env.SECRET);
});
