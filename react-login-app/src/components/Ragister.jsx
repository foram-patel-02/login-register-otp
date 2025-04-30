
import axios from 'axios';
import React, { useState } from 'react';
import '../css/register.css';

function Register({ onSwitch }) {
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
      const res = await axios.post('http://localhost:5000/api/register', {
        email: form.email,
        password: form.password,
      });

      if (res && res.data) {
        setError(''); // ❗ Clear any previous errors
        onSwitch(); 
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Server Error. Please try again later.';
      setError(errorMessage); // ❗ Error 
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register">
        <h2>Register</h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '300px',
          }}
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>

          {/* ❗ Error message*/}
          {error && (
            <div style={{ color: 'red', marginTop: '10px', fontSize: '14px' }}>
              {error}
            </div>
          )}
        </form>

        <p>
          Already have an account?{' '}
          <button onClick={onSwitch}>Login</button>
        </p>
      </div>
    </div>
  );
}

export default Register;




// State Management:

// form: Stores the email and password fields for the registration form.

// error: Stores any error messages that should be displayed (e.g., invalid email, weak password, or server errors).

// handleChange Function:

// This function updates the form state as the user types into the email and password input fields.

// It also resets any previous error messages by setting error to an empty string.

// handleSubmit Function:

// This function is triggered when the user submits the registration form.

// Validation:

// It checks if the email format is valid using a regular expression.

// It checks if the password is at least 6 characters long.

// If either validation fails, an error message is displayed.

// API Request:

// It sends a POST request to the backend (http://localhost:5000/api/register) with the email and password from the form.

// If the registration is successful, it clears any error messages and triggers the onSwitch function (presumably used to switch to the login page).

// If the request fails (e.g., server error or invalid data), it displays the error message returned by the server.

// Rendering:

// A simple registration form with email and password input fields, a submit button, and a link to switch to the login page if the user already has an account.

// If there's an error (e.g., invalid email, short password, or server error), it is displayed in red below the form.