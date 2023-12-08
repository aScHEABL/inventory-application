const express = require('express');
const router = express.Router();

// Require controller modules.
const shopController = require("../controllers/shopController");

router.get("/", shopController.main);

module.exports = router;