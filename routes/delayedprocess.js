var express = require('express');
var router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('Cloud Devops Example');

/* GET delayedprocess */
router.get('/', function(req, res, next) {
  logger.debug('Delayed process begin');
  let random = Math.round(Math.random()*10000); // get a random time in seconds

  setTimeout(() => {
    var message = `${random/10000} seconds complete`;
    res.send(message);
    logger.debug(`Delayed process end: ${message}`);
  }, random);
});

module.exports = router;
