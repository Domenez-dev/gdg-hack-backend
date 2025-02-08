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
