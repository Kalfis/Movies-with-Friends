'use strict';
let express = require('express');
let logger = require('morgan');
let path = require('path');
let bodyParser = require('body-parser');

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
mongoose.connect('mongodb://localhost/moviegoer'); // LA changed moviegoerApp to moviegoer

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', (callback) => {
  console.log('Mongoose Connected');
});

// register our routes
// all routes starting with /users will be in userRoutes
app.use('/users', userRoutes);
// all routes starting with /movies will be in movieRoutes
app.use('/movies', movieRoutes);


let server = app.listen(3000, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log('express running', host, port);
});
