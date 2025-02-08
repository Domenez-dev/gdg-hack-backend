const { Event } = require("../models");

// Create Event
exports.createEvent = async (req, res) => {
  try {
    const { name, description, date, location } = req.body;
    const newEvent = await Event.create({ name, description, date, location });
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit Event
exports.editEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Event.update(req.body, { where: { id } });
    if (updated) {
      const updatedEvent = await Event.findOne({ where: { id } });
      res.status(200).json(updatedEvent);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
