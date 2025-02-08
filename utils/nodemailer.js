const nodemailer = require("nodemailer");
const oauth2Client = require("./oauth2-client");

let transporter = null;

async function createTransporter() {
  if (transporter) {
    // OPTIMIZE: If transporter is already created, return the existing instance
    return transporter;
  }
  try {
    const accessTokenResponse = await oauth2Client.getAccessToken();
    const accessToken = accessTokenResponse.token;

    if (!accessToken) {
      throw new Error("Failed to retrieve access token");
    }

    // Define the transporter configuration
    const transporterOptions = {
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_SENDER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    };

    transporter = nodemailer.createTransport(transporterOptions);

    // Verify the transporter configuration
    await transporter.verify();
    return transporter;
  } catch (error) {
    console.error("Failed to create transporter:", error);
    throw new Error("Failed to create transporter");
  }
}

module.exports = createTransporter;
