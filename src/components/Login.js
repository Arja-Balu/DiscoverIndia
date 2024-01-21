// Login.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../styles/Login.css'; // Import the Login.css styles
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // <-- Add this line to prevent the default form submission

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/map');
    } catch (error) {
      setError('Failed to log in');
      console.error(error.message);
    }
  };

  useEffect(() => {
    // You may choose to do something else in this effect, but for now, it's empty
  }, [email, password, navigate, login]);

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}> {/* <-- Add onSubmit to the form */}
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Log In</button>
      </form>
      <div>
        {error && <p>{error}</p>}
        <p>
          Need an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
