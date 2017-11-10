var express = require('express');
var router = express.Router();

/* GET delayedprocess */
router.get('/', function(req, res, next) {
  let random = Math.round(Math.random()*10000); // get a random time in seconds

  setTimeout(() => {
    res.send(`${random/10000} seconds complete`);
  }, random);
});

module.exports = router;
