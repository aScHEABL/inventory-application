var express = require('express');
var router = express.Router();

// Require controller modules.

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', body: "Hello World!" });
});

module.exports = router;
