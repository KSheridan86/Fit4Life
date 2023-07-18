import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api', // Replace with the actual base URL of your Rails API
  withCredentials: true, // This ensures that the CSRF token is sent with the request
});

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // Add this line to track login status
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', {
        user: {
          email,
          password,
        },
      });
      console.log('Login successful:', response.data + loggedIn);
      setLoggedIn(true);
      onLogin();
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };


  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;