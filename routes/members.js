const express = require("express");
const router = express.Router();
const memberController = require("../controllers/memberController");

// Create a new member
router.post("/create", memberController.createMember);

// Edit an existing member
router.put("/edit/:memberId", memberController.editMember);

// Delete a member
router.delete("/delete/:memberId", memberController.deleteMember);

module.exports = router;
