import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api', // Replace with the actual base URL of your Rails API
  withCredentials: true, // This ensures that the CSRF token is sent with the request
});

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState(null);
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
      setData(response.data.user.id)
      onLogin();
      
    } catch (error) {
        console.error('Error while making the API call:', error);
      }
  };

  useEffect(() => {
    if (data !== null) {
      navigate('/', { state: {data}})
    }
  }, [data, navigate]);

  return (
    <div className="login">
      <h1 className="glass-box m-3 fw-bold p-4 text-center">Welcome to Fit4Life!</h1>
      <div className="glass-box m-3 p-3 text-center">
        <p>
          Login to your account and embark on a journey towards better health and well-being. 
        </p>
        <hr />
        <p>  
          With our powerful tools, you can easily track your nutrition, monitor your calories, 
          and make informed choices about your diet. 
        </p>
      </div>
      <hr />
      <form onSubmit={handleLogin}>
        <div className="d-flex justify-content-center align-items-center">
          <div className="row">
            <div className="col-12">
              <input
                className="text-center border border-dark border-2 p-2 form-control mb-2 hand-writing" 
                type="email"
                placeholder="Enter Email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
              <br></br>
              <input
                className="text-center border border-dark border-2 p-2 form-control mb-2 hand-writing" 
                type="password"
                placeholder="Enter Password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} />
              </div>
              <br></br>
              <div className="col-12 text-center hand-writing">
                <button 
                  className="btn btn-primary border-dark border-2 mt-3 col-6 mb-5"
                  type="submit">
                    Login
                </button>
              </div>
            </div>
          </div>
      </form>
      <div style={{height: "70px"}}></div>
    </div>
  );
};

export default Login;