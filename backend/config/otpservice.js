const otpGenerator = require("otp-generator");

exports.generateOTP = () => otpGenerator.generate(6, { digits: true });

exports.sendOTP = async (mobileNumber, otp) => {
  console.log(`OTP for ${mobileNumber}: ${otp}`); // Replace with SMS API integration
  return true;
};



// This code provides functionality for generating and sending a one-time password (OTP), typically used for user verification or login processes. It uses the `otp-generator` package to create a numeric OTP. The `generateOTP` function generates a 6-digit OTP with only numeric characters (`digits: true`) and returns it. The `sendOTP` function is a placeholder for sending the OTP to a user's mobile number. It currently just logs the OTP to the console along with the target mobile number, simulating the behavior of sending an OTP via SMS. The actual SMS sending is not implemented here but can be integrated using a third-party SMS gateway API like Twilio, Nexmo, or any regional provider. The function returns `true` to indicate a successful operation, although in a real implementation, you'd want to return a response based on the actual success or failure of the SMS delivery.