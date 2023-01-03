let express = require('express');
let router = express.Router();

/* GET all events. */
router.get('/', function (req, res, next) {
  res.send('Welcome, Young Folks');
});

module.exports = router;
