var express = require('express');
var router = express.Router();

// Require controller modules.
const clothController = require("../controllers/clothController");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Home Page' });
// });

router.get("/", clothController.index);
module.exports = router;
