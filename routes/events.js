const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

// Create a new event
router.post("/create", eventController.createEvent);

// Edit an existing event
router.put("/edit/:eventId", eventController.editEvent);

module.exports = router;
