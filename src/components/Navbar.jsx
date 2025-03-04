// src/components/Navbar.jsx
// src/components/NavBar.jsx
import React from "react";
import { signInWithGoogle, logOut } from "../firebase"; // Adjust path as needed
import "./Navbar.css";


const NavBar = ({ user, setUser }) => {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      setUser(result.user); // Update user state in App.jsx
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      setUser(null); // Clear user state
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>My Dashboard</h1>
      </div>
      <div className="navbar-auth">
        {user ? (
          <>
            <span>Welcome, {user.displayName}!</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <button onClick={handleGoogleSignIn} className="google-signin-btn">
            Sign in with Google
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;