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
    out: {
      type: "console",
      layout: {
        type: "pattern",
        pattern: "%[[%d{yyyy-MM-dd hh:mm:ss.SSS}] [%p] [%c]%] - %m"
      }
    },
    sumologic: {
      type: 'log4js-sumologic-appender',
      endpoint: 'https://endpoint3.collection.us2.sumologic.com/receiver/v1/http/ZaVnC4dhaV1dLA9llz9C-8NPtyLhvkJDyF18GcjdSiE5KiQ0jP0mpplDlwp8gQzpFcy6CfGbciFGjdg0rKsaeH4rz2nHRIv1FOE6p4WxTHNVhi4zakkyfw==',
      sourceName: process.env.SUMO_LOGIC_SOURCE_NAME || 'Cloud Devops Example'
    }
  },
  categories: {
    default: {
      appenders: ['sumologic', 'out'],
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
app.use('/healthcheck', function(req, res, next) {
  res.send('OK')
});
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
