
import React, { useState, useEffect } from 'react';
import Login from './components/LoginPage';
import Register from './components/Ragister';
import Home from './components/Home';
import OtpPage from './components/otp';

function App() {
  const [page, setPage] = useState('login');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn) setPage('home');
  }, []);

  const handleLoginOTPPage = (email) => {
    setUserEmail(email);
    setPage('otp');
  };

  const handleOtpVerified = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setPage('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setPage('login');
  };

  return (
    <div>
      {page === 'login' && (
        <Login onLoginOTPPage={handleLoginOTPPage} onSwitch={() => setPage('register')} />
      )}
      {page === 'register' && (
        <Register onSwitch={() => setPage('login')} />
      )}
      {page === 'otp' && (
        <OtpPage email={userEmail} onOtpVerified={handleOtpVerified} />
      )}
      {page === 'home' && <Home onLogout={handleLogout} />}
    </div>
  );
}
export default App;





// State Management (page and userEmail):

// The page state controls which page is displayed (login, register, otp, or home).

// The userEmail state is used to pass the email to the OTP page.

// useEffect for Auto-login:

// The useEffect hook checks if the user is logged in by looking for an item in localStorage. If the user is logged in (isLoggedIn), it directly redirects to the home page.

// Page Transition Functions:

// handleLoginOTPPage: Sets the user email and navigates to the OTP page.

// handleOtpVerified: After OTP verification, it sets the isLoggedIn flag in localStorage and redirects to the home page.

// handleLogout: Clears the isLoggedIn flag from localStorage and redirects to the login page.

// Conditional Rendering:

// The component conditionally renders the page based on the value of page, which is a good approach to manage multiple views.