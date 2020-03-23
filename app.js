var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var settings = require('./settings');

//session info are stored in db
app.use(session({
  secret: settings.cookieSecret, //prevent cookie from being falsified
  key: settings.db, //cookie name
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}, //cookie life: 30days
  store: new MongoStore({ //MongoStore instance
    db: settings.db,
    host: settings.host,
    port: settings.port,
    url: settings.url
  }),
  resave: false,
  saveUninitialized: true
}));

//https://github.com/jaredhanson/connect-flash
var flash = require('connect-flash');
app.use(flash());



module.exports = app;
