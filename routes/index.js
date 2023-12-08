const express = require('express');
const router = express.Router();

// Require controller modules.
const indexController = require("../controllers/indexController");

router.get("/", indexController.featuredProducts);
module.exports = router;