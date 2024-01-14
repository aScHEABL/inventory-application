const express = require('express');
const router = express.Router();

// Require controller modules.
const shopController = require("../controllers/shopController");

router.get("/", shopController.main);

router.get("/inventory/clothings/:id", shopController.clothing_details);

router.get("/inventory/overview", shopController.overview);

router.get("/inventory/overview/clothings", shopController.overview_clothings);

router.get("/inventory/clothings/update/:id", shopController.update_clothings);

module.exports = router;