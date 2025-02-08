const express = require("express");
const router = express.Router();
const sendEmail = require("../email-service");

router.post("api/send-welcome-email", async (req, res) => {
  const { to, username } = req.body;

  try {
    await sendEmail(
      to,
      "Welcome to Our Platform",
      "appreciation_email", // Template name (ensure this exists in the `templates` folder)
      { username }, // Data to pass to the template
    );

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send email" });
  }
});

module.exports = router;
