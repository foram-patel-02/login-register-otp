const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(error);
      }
      resolve(info.response);
    });
  });
};

module.exports = sendEmail;





// nodemailer.createTransport:

// It creates a reusable transporter object using Gmail’s SMTP service to send emails.

// It uses authentication credentials (email user and password) pulled from environment variables (EMAIL_USER, EMAIL_PASS).

// sendEmail Function:

// Parameters:

// to: The recipient's email address.

// subject: The subject of the email.

// text: The body content of the email.

// The function creates a mailOptions object that includes the sender’s email (from the environment variable EMAIL_USER), recipient email, subject, and text content.

// Promise Handling: The email is sent using transporter.sendMail(). If successful, the resolve function is called, passing the response from the email service. If there’s an error, the reject function is called with the error.

// This function returns a Promise, which makes it easy to use with async/await.