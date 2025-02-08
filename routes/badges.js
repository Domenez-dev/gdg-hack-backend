const express = require("express");
const router = express.Router();
const badgeController = require("../controllers/badgeController");

// Create a new badge
router.post("/create", badgeController.createBadge);

module.exports = router;
