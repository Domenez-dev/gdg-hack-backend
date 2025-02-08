const { Badge } = require("../models");

// Create Badge
exports.createBadge = async (req, res) => {
  try {
    const { memberId, name, awardedOn } = req.body;
    const newBadge = await Badge.create({ memberId, name, awardedOn });
    res.status(201).json(newBadge);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
