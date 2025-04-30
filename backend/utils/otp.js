// otp.js
const generateOTP = (length = 6) => {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10); // Generates a random digit
  }
  return otp;
};
module.exports = generateOTP;





//  The function accepts an optional parameter length, which defines how many digits the OTP will have. If no length is provided, the default length is 6.

// It initializes an empty string otp.

// Then, a loop runs length times, each time generating a random digit (Math.floor(Math.random() * 10)) and appending it to the otp string. This generates a random number between 0 and 9.

// After the loop completes, it returns the otp string containing the randomly generated digits