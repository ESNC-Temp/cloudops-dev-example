var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var delayedprocess = require('./routes/delayedprocess');

const log4js = require('log4js');

log4js.configure({
  appenders: {
    sumologic: {
      type: 'log4js-sumologic-appender',
      endpoint: 'https://endpoint3.collection.us2.sumologic.com/receiver/v1/http/ZaVnC4dhaV2i-yRxOLgANZ8gHPkRhbz0uu1dVE2Ox2v7PzQOMNPoaEVTAjc9CGyEY8ntWUfXzddSGzU0Adm0FPuf0hDMp-4Bri-XwdXyX4zdiHtsuK5ugw==',
      sourceName: process.env.SUMO_LOGIC_SOURCE_NAME || 'Cloud Devops Example'
    }
  },
  categories: {
    default: {
      appenders: ['sumologic'],
      level: 'trace'
    }
  }
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/delayedprocess', delayedprocess);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
