const nodemailer = require("nodemailer");

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your preferred email service
  auth: {
    user: "xyz@gmail.com", // Your email address
    pass: "", // Your email app password (consider using environment variables)
  },
});
console.log(transporter.auth.user);

exports.sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: "abc@gmail.com", //email diffrent
      to: to,
      subject: subject,
      text: text,
    };
    console.log(mailOptions);

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};



// This code sets up an email-sending utility using the `nodemailer` library in Node.js. It first creates a reusable `transporter` object using `nodemailer.createTransport`, which is configured to use Gmail’s SMTP service. The authentication details (email and app-specific password) are hardcoded here, although it's recommended to store these in environment variables for better security. After the transporter is set up, a function named `sendEmail` is exported. This asynchronous function takes three parameters: the recipient's email (`to`), the email subject (`subject`), and the plain text body (`text`). It constructs an email using these values, sets a fixed sender address (`xyz@gmail.com`), and then attempts to send the email using the `transporter.sendMail()` method. If the email is sent successfully, nothing is logged, but if an error occurs, it is caught and printed to the console. This module allows your application to programmatically send emails, which is useful for things like OTPs, password resets, or notifications.