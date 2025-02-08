const createTransporter = require("./utils/nodemailer");
const loadHTMLTemplate = require("./utils/template-utils");

async function sendEmail(to, subject, templateName, data) {
  try {
    const transporter = await createTransporter();

    // Load the HTML template
    let htmlContent;
    await loadHTMLTemplate(templateName, data, (err, result) => {
      if (err) {
        throw new Error(`Failed to load template: ${err.message}`);
      }
      htmlContent = result;
    });

    // Define the email options
    const mailOptions = {
      from: process.env.EMAIL_SENDER,
      to,
      subject,
      html: htmlContent,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error("Failed to send email");
  }
}

module.exports = sendEmail;
