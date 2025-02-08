const nodemailer = require("nodemailer");

// Configure Nodemailer Transporter (Using Gmail OAuth2)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GMAIL_USER,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
  },
});

// Send Feedback Email (Warning/Appreciation)
exports.sendFeedback = async (req, res) => {
  try {
    const { memberEmail, type, message } = req.body;

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: memberEmail,
      subject:
        type === "warning"
          ? "⚠️ Warning Notification"
          : "🎉 Appreciation Message",
      text: message,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: `${type} email sent successfully!` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
