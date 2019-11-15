if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require("cors");

const CLIENT_URL = (process.env.NODE_ENV === 'development') ? 'http://localhost:3000' : 'https://tripboard.yerinsite.com/';

const users = require('./routes/users');
const trips = require('./routes/trips');

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

app.use(
  cors({
    origin: CLIENT_URL,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true
  })
);

app.use('/api/users', users);
app.use('/api/trips', trips);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({ status: `${err.status}`, message: `${err.message}`});
});

module.exports = app;
