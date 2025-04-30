const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Routes
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/verify-otp", authController.verifyOtp);

module.exports = router;





// POST /register:

// This route is used to register a new user. When the client sends a request to /register with email and password, it triggers the registerUser function from the authController to handle user registration.

// POST /login:

// This route is for logging in an existing user. It expects email and password to authenticate the user, and if valid, it triggers the loginUser function, which generates and sends an OTP for further verification.

// POST /verify-otp:

// This route handles the OTP verification process. The user submits the OTP they received, and the verifyOtp function is invoked to validate the OTP and complete the login process.