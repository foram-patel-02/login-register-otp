const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: String }, 
  otpExpiration: { type: Date }, // Timestamp for OTP expiration
  verified: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);




// Creating a User: When a new user registers, their email and password are stored in the database, and their otp and otpExpiration will be set during the login process.

// OTP: The OTP is stored temporarily in the otp field, with an expiration timestamp in otpExpiration. Once the OTP is used or expires, it can be cleared or updated.

// Verified: The verified field will eventually be set to true once the user successfully verifies their OTP.

// Password Hashing: Ensure you hash the password before saving it to the database to enhance security (which you are already doing in your registration and login functions).

// Clear OTP: You might want to clear the otp and otpExpiration fields after successful verification, as done in your login verification code.

// This schema is suitable for an OTP-based login system where users verify their identity before being granted access.