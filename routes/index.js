var express = require('express');
var router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('Cloud Devops Example');

/* GET home page. */
router.get('/', function(req, res, next) {
  logger.info('Index page');
  res.render('index', { title: 'Welcome' });
});

router.get('/1', function(req, res, next) {
  logger.info('Index page');
  res.render('index', { title: 'Welcome' });
  alert('hello');
});

router.get('/2', function(req, res, next) {
  logger.info('Index page');
  res.render('index', { title: 'Welcome' });
  for (var i = 0; i < 10; i--) {
    console.log('blah', i); // TODO: use a proper logger
  }
});

router.get('/3', function(req, res, next) {
  logger.info('Index page');
  res.render('index', { title: 'Welcome' });
});

router.get('/error', function(req, res, next) {
  logger.error('Oh no!!');
  throw new Error('Errors abound!');
});

module.exports = router;
