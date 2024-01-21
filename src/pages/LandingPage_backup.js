import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../styles/lad.css';

function LandingPage() {
  const { currentUser } = useAuth();

  return (
    <div className="landing-page-container">
      <div className="landing-content">
        <div id="india-text">INDIA</div>
        {currentUser ? (
          <div>
            <p>Welcome, {currentUser.email}!</p>
            <Link to="/Login" className="btn-dashboard">
              Go to Login
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/SignUp" className="btn-signup">
              Sign Up
            </Link>
            <Link to="/Login" className="btn-login">
              Log In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default LandingPage;