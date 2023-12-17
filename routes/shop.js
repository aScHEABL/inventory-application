const express = require('express');
const router = express.Router();

// Require controller modules.
const shopController = require("../controllers/shopController");

router.get("/", shopController.main);

router.get("/inventory/cloth/:id", shopController.cloth_details);

module.exports = router;