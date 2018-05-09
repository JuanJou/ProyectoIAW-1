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
const session=require('express-session');
const config=require('./config');
var morgan = require('morgan');

const indexRouter = require('./app_server/routes/index');
const searchLocals= require('./app_server/routes/SearchLocalInDataBase');
const apiUser= require('./app_server/routes/ApiUserState');
const apiComentarios= require('./app_server/routes/apiComments');

const app=express();
// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'twig');

app.locals.title = 'GiraBahiense';

app.use(logger('dev'));
app.use(express.json());
app.use(morgan(':method :url :response-time'));
app.use(express.urlencoded({ extended: false }));
app.set('json spaces', 2);
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(session({
  secret: config.session.secret,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/twigjs/twig.min.js',  express.static(__dirname + '/node_modules/twig/twig.min.js'));
app.use('/shared',  express.static(__dirname + '/app_server/views/shared'));

app.use('/', indexRouter);
app.use('/searchLocals',searchLocals);
app.use('/userState',apiUser);
app.use('/apiComment',apiComentarios);

app.get('/auth/google',
  passport.authenticate('google', {
    scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
    ]
  }));




app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


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


//-------------------------------Passport authentication--------------------------------------------------------

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
  clientID: config.google.client.id,
  clientSecret: config.google.client.secret,
  callbackURL: config.google.client.callbackUrl
},
function(accessToken, refreshToken, profile, done) {
  // asynchronous verification, for effect...
  process.nextTick(function() {
    //console.log(profile);

    // To keep the example simple, the user's Google profile is returned to
    // represent the logged-in user.  In a typical application, you would want
    // to associate the Google account with a user record in your database,
    // and return that user instead.
    return done(null, profile);
  });
}
));


//----------------------------------------------------------------------------------------------

module.exports = app;
