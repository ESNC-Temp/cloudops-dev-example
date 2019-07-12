var express = require('express');
var router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('Cloud Devops Example');

const package = require('../package.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  logger.info('Index page');
  res.render('index', { title: `Welcome ${package.version}`, version: package.version });
});

router.get('/error', function(req, res, next) {
  logger.error('Oh no!!');
  throw new Error('Errors abound!');
});

module.exports = router;
