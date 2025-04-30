
// Import
import React, { useState } from 'react';
import axios from 'axios';
import '../css/login-page.css';

function Login({ onLoginOTPPage, onSwitch }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email)) {
    return setError('Invalid email format.');
  }
  if (form.password.length < 6) {
    return setError('Password must be at least 6 characters.');
  }
    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        email: form.email,
        password: form.password,
      });

      if (res && res.data && res.data.message) {
        setError('');
        onLoginOTPPage(form.email); // 👉 Pass email to OTP page
      } else {
        setError('Unexpected response from server.');
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Login failed. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <button type="submit">Login</button>
          {error && <div style={{ color: 'red', fontSize: '14px' }}>{error}</div>}
        </form>
        <p>
          Don't have an account? <button onClick={onSwitch}>Register</button>
        </p>
      </div>
    </div>
  );
}

export default Login;





// State Management:

// form: Holds the email and password values from the form inputs.

// error: Holds error messages to display to the user (e.g., invalid input or server errors).

// handleChange Function:

// Updates the state (form) when the user types into the email or password input fields. It also clears the error state each time the user starts typing to remove any previous error messages.

// handleSubmit Function:

// Prevents the default form submission behavior.

// Validation: It checks if the email is in a valid format using a regular expression and whether the password length is at least 6 characters.

// If either of these conditions fails, an error message is set in the error state.

// API Request: If the validation passes, it sends a POST request to the backend (http://localhost:5000/api/login) with the email and password.

// If the login is successful, the onLoginOTPPage function is called (presumably to navigate to the OTP verification page), passing the email.

// If the request fails (due to network issues or server errors), the error state is updated with an appropriate message.

// Rendering:

// A form is displayed where users can input their email and password.

// If there's an error (like invalid email format or incorrect password), it's displayed in red below the form.

// There's also a link to the registration page (onSwitch), which presumably switches between the login and registration views.

