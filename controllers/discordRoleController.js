const { DiscordRole } = require("../models");

// Create Discord Role
exports.createDiscordRole = async (req, res) => {
  try {
    const { memberId, roleName, assignedOn, active } = req.body;
    const newRole = await DiscordRole.create({
      memberId,
      roleName,
      assignedOn,
      active,
    });
    res.status(201).json(newRole);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit Discord Role
exports.editDiscordRole = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await DiscordRole.update(req.body, { where: { id } });
    if (updated) {
      const updatedRole = await DiscordRole.findOne({ where: { id } });
      res.status(200).json(updatedRole);
    } else {
      res.status(404).json({ message: "Role not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Discord Role
exports.deleteDiscordRole = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await DiscordRole.destroy({ where: { id } });
    if (deleted) {
      res.status(200).json({ message: "Role deleted successfully" });
    } else {
      res.status(404).json({ message: "Role not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
