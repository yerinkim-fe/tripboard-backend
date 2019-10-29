if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
// const cors = require("cors");

const CLIENT_URL = (process.env.NODE_ENV === 'development') ? 'http://localhost:3000' : 'http://localhost:3000';

const auth = require('./routes/auth');
// const trip = require('./routes/trip');

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const db = mongoose.connection;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 24000 * 60 * 60 * 7
  }
}));

// app.use(
//   cors({
//     origin: CLIENT_URL,
//     methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
//     credentials: true
//   })
// );

app.use('/api/auth', auth);
// app.use('/api/trip', trip);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err.message, err.status);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({ status: `${err.status}`, message: `${err.message}`});
});

module.exports = app;
