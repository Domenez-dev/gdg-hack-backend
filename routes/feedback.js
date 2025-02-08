const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");

// Send feedback (warning or appreciation email)
router.post("/send", feedbackController.sendFeedback);

module.exports = router;
