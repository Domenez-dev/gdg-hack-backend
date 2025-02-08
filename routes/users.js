const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// User login
router.post("/login", userController.login);

// User logout
router.post("/logout", userController.logout);

module.exports = router;

// routes/contributions.js
const express = require("express");
const router = express.Router();
const contributionController = require("../controllers/contributionController");

// Create a new contribution
router.post("/create", contributionController.createContribution);

module.exports = router;

// routes/discordRoles.js
const express = require("express");
const router = express.Router();
const discordRoleController = require("../controllers/discordRoleController");

// Create a new Discord role
router.post("/create", discordRoleController.createRole);

// Edit an existing Discord role
router.put("/edit/:roleId", discordRoleController.editRole);

// Delete a Discord role
router.delete("/delete/:roleId", discordRoleController.deleteRole);

module.exports = router;

// routes/feedback.js
const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");

// Send feedback (warning or appreciation email)
router.post("/send", feedbackController.sendFeedback);

module.exports = router;
