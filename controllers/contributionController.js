const { Contribution } = require("../models");

// Create Contribution
exports.createContribution = async (req, res) => {
  try {
    const { memberId, taskName, eventId, taskWeight, submittedOn } = req.body;
    const newContribution = await Contribution.create({
      memberId,
      taskName,
      eventId,
      taskWeight,
      submittedOn,
    });
    res.status(201).json(newContribution);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
