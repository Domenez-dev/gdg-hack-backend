const express = require("express");
const router = express.Router();
const contributionController = require("../controllers/contributionController");

// Create a new contribution
router.post("/create", contributionController.createContribution);

module.exports = router;
