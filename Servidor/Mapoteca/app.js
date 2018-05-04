const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const logger = require('morgan');
require('./app_server/models/db');
const passport = require('passport');
const googleOauth=require('passport-google-oauth20');
const GoogleStrategy=googleOauth.Strategy;

const indexRouter = require('./app_server/routes/index');
const searchLocals= require('./app_server/routes/SearchLocalInDataBase');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'twig');

app.locals.title = 'GiraBahiense';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json())

app.use(require('express-session')({
  secret: 'nodejs-twig-secret',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/twigjs/twig.min.js',  express.static(__dirname + '/node_modules/twig/twig.min.js'));
app.use('/shared',  express.static(__dirname + '/app_server/views/shared'));

app.use('/', indexRouter);
app.use('/searchLocals',searchLocals);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const User = require('./app_server/models/users');

passport.use(new GoogleStrategy({
    clientID: "926151368412-0hf4jpdtnhj12cvtf12dsp7kerap8t41",
    clientSecret: "PfTib1UNjEIlTAB1XGzV0Dcs",
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


module.exports = app;
