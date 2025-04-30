const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateOTP = require("../utils/otp");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


// REGISTER
exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Please fill all fields" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ error: "Registration failed", details: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Please provide email and password" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const otp = generateOTP();
    const otpExpiration = new Date(Date.now() + 90 * 1000); // 1.5 minutes from now
    user.otp = otp;
    user.otpExpiration = otpExpiration;
    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Login OTP Code",
      text: `Your OTP for login is: ${otp},
Please use this code to complete your verification.
Do not share this code with anyone. It will expire in 1.5 minutes.`,
    });

    res.status(200).json({ message: "OTP sent to your email. Please verify to complete login." });
  } catch (error) {
    res.status(500).json({ error: "Login OTP process failed", details: error.message });
  }
};



exports.verifyOtp = async (req, res) => {
  const { otp } = req.body;

  if (!otp) return res.status(400).json({ error: "OTP is required" });

  try {
    const user = await User.findOne({ otp });

    if (!user) return res.status(400).json({ error: "Invalid OTP" });

    const currentTime = new Date();

    // Check if OTP is expired
    if (currentTime > user.otpExpiration) {
      return res.status(400).json({ error: "OTP has expired" });
    }

    user.verified = true;
    user.otp = null;
    user.otpExpiration = null; // Clear the OTP expiration time
    await user.save();

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION || "7d",
    });

    res.status(200).json({ message: "OTP verified, login successful", token });
  } catch (error) {
    res.status(500).json({ error: "OTP verification failed", details: error.message });
  }
};






// This code defines user authentication functionality in a Node.js application using Express, MongoDB, and email-based OTP verification. Here's a breakdown of how it works:

// ---

//   1. Email Transport Setup
// An email transporter is configured using `nodemailer` with Gmail's SMTP service. The credentials (`EMAIL_USER`, `EMAIL_PASS`) are loaded from environment variables, ensuring sensitive data isn't hardcoded.

// ---

//  2. `registerUser` Function
// This function handles user registration:
// - It expects an `email` and `password` from the request body.
// - If either field is missing, it returns a 400 error.
// - It checks if the email already exists in the database to avoid duplicates.
// - If the email is new, it hashes the password using `bcryptjs` and saves the new user in MongoDB.
// - On success, it sends back a success message.

// ---

//  3. `loginUser` Function
// This function initiates the login and OTP verification process:
// - It verifies that both `email` and `password` are provided.
// - It checks if the user exists and if the password matches.
// - If valid, it generates a 6-digit OTP and sets an expiration time of 1.5 minutes (90 seconds).
// - The OTP and its expiration are saved in the user document.
// - An email is sent to the user containing the OTP, with instructions and a security note.
// - The response tells the client that an OTP has been sent and prompts for verification.

// ---

// 4. `verifyOtp` Function
// This finalizes the login:
// - It expects the OTP to be submitted by the user.
// - It checks if a user with the given OTP exists.
// - Then it checks if the OTP has expired by comparing the current time with `otpExpiration`.
// - If valid and within time, it:
//   - Marks the user as verified.
//   - Clears the stored OTP and its expiration.
//   - Issues a JWT token valid for 7 days (or custom value via env).
// - It responds with a success message and the token.

// ---

// Security and Best Practices Suggestions
// - Use environment variables for all secrets and sensitive data.
// - Rate-limit login/OTP attempts to prevent brute-force.
// - Store OTPs hashed in production (currently stored in plaintext).
// - Consider using HTTPS and secure cookie handling for tokens.
