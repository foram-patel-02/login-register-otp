import React, { useState } from 'react';
import axios from 'axios';
import '../css/otp.css'; // Optional custom styling

function OtpPage({ email, onOtpVerified }) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleOtpSubmit = async (e) => {
  e.preventDefault();
  if (!/^\d{4,6}$/.test(otp)) {
    return setError('OTP must be a 4-6 digit number.');
  }
    try {
      const res = await axios.post('http://localhost:5000/api/verify-otp', {
        email,
        otp,
      });

      if (res && res.data && res.data.message) {
        setError('');
        onOtpVerified(); // ✅ Go to home
      } else {
        setError('Invalid response from server.');
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'OTP verification failed.';
      setError(errorMessage);
    }
  };

  return (
    <div className="otp-wrapper">
      <div className="otp-box">
        <h2>Enter OTP</h2>
        <form onSubmit={handleOtpSubmit}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit">Verify OTP</button>
        </form>
        {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      </div>
    </div>
  );
}

export default OtpPage;




// State Management:

// otp: Stores the value of the OTP entered by the user.

// error: Stores any error messages related to invalid input or failed OTP verification.

// handleOtpSubmit Function:

// This function is triggered when the user submits the OTP form.

// Validation: It checks if the OTP entered by the user is a valid 4-6 digit number using a regular expression. If the OTP is invalid, an error message is displayed.

// API Request: If the OTP is valid, it sends a POST request to the backend (http://localhost:5000/api/verify-otp) with the email and otp.

// If the OTP is successfully verified, the onOtpVerified function is called (which presumably navigates to the home page or updates the authentication state).

// If the verification fails (e.g., invalid OTP or server error), an appropriate error message is displayed.

// Rendering:

// A form is displayed where the user can input the OTP they received.

// If there's an error (e.g., invalid OTP or other issues), it is shown in red below the form.

