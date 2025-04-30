import React from 'react';
import '../css/home.css';

function Home({ onLogout }) {
  return (
    <div className="home-wrapper">
      {/* 🔹 Logout button container */}
      <div className="logout-container">
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>

      <div className="home-container">
        <h1>Welcome to Home Page!</h1>
        <p>You have successfully logged in.</p>
      </div>
    </div>
  );
}

export default Home;




// Home Component:

// The Home component accepts a prop called onLogout, which is expected to be a function that handles the logout process when the logout button is clicked.

// Rendering:

// <div className="home-wrapper">: This is the main wrapper for the page.

// <div className="logout-container">: This container holds the logout button. When clicked, it calls the onLogout function passed as a prop to the component.

// <h1> and <p>: These elements display a welcome message and a confirmation message indicating that the user has successfully logged in.

// CSS:

// The component imports a CSS file (../css/home.css), which is assumed to style the page elements. You can customize the look of the page by adding styles for the .home-wrapper, .logout-container, .logout-btn, and other elements.

