const express = require('express');
const router = express.Router();

// Require controller modules.
const shopController = require("../controllers/shopController");

router.get("/", shopController.main);

router.get("/inventory/cloth/:id", shopController.cloth_details);

<<<<<<< HEAD
<<<<<<< HEAD
router.get("/inventory/overview", shopController.inventory_overview)
=======
router.get("/inventory/create/cloth", shopController.cloth_create_get);
>>>>>>> 8e83c5e6d54bd6b065f7805026435ce819c78097
=======
router.get("/inventory/create/cloth", shopController.cloth_create_get);
>>>>>>> 8e83c5e6d54bd6b065f7805026435ce819c78097

module.exports = router;