// SignUp.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../styles/SignUp.css';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // <-- Change this line

function SignUp() {
  const { currentUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth(); // <-- Create auth instance here
      await createUserWithEmailAndPassword(auth, email, password); // <-- Use createUserWithEmailAndPassword directly
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {currentUser ? (
        <p>You are already logged in as {currentUser.email}.</p>
      ) : (
        <form onSubmit={handleSignUp}>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="submit">Sign Up</button>
        </form>
      )}
      {error && <p>{error}</p>}
      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
}

export default SignUp;
