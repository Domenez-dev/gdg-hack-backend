const { Member } = require("../models");

// Create Member
exports.createMember = async (req, res) => {
  try {
    const { name, email, discord, joinedDate, engagementZone, monthlyScore } =
      req.body;
    const newMember = await Member.create({
      name,
      email,
      discord,
      joinedDate,
      engagementZone,
      monthlyScore,
    });
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit Member
exports.editMember = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Member.update(req.body, { where: { id } });
    if (updated) {
      const updatedMember = await Member.findOne({ where: { id } });
      res.status(200).json(updatedMember);
    } else {
      res.status(404).json({ message: "Member not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Member
exports.deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Member.destroy({ where: { id } });
    if (deleted) {
      res.status(200).json({ message: "Member deleted successfully" });
    } else {
      res.status(404).json({ message: "Member not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
