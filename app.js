var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
require("dotenv").config();
var logger = require('morgan');
const server = require('./routes/index')
const session = require('express-session');
const multer = require('multer')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));


app.use('/', server.user)
app.use('/', server.table)
app.use('/', server.profile)
app.use('/', server.reservasi)
app.use('/', server.tableUser)
app.use('/', server.historyUser)
app.use('/', server.profileUser)
app.use('/', server.menu) 

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  } else {
    next(err);
  }
});

module.exports = app;
