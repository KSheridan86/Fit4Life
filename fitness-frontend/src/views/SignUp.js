import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const api = axios.create({
    baseURL: 'http://16.171.133.35:4000/api',
    withCredentials: true,
});

const SignUp = ({ onLogin }) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    });

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUserData(prevUserData => ({ ...prevUserData, [name]: value }));
    };

    const loginAfterSignup = async (email, password) => {
        try {
            const response = await api.post('/login', {
                user: {
                email,
                password,
                },
            });
            if (response) {
                const userResponse = await api.get(`/users/${response.data.user.id}`);
                localStorage.setItem('UserData', JSON.stringify(userResponse.data));
                await onLogin();
                await navigate('/');
            }
            } catch (error) {
            console.error('Error logging in after signup:', error);
            }
        };

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            const response = await api.post('/users', { user: userData });
            if (response) {
                console.log('User registered successfully:', response.data);
            // Log the user in after signup
            await loginAfterSignup(userData.email, userData.password);
            }
        } catch (error) {
            console.error('Failed to register user:', error);
        }
    };

    return (
      <div className="container login">
        <div className="row">
          <div className="col-md-6">
            <div className="glass-box border-dark m-3 p-2 text-center">
              <h1 className="fw-bold pt-2">Welcome to <div className="nasa-black text-uppercase">Fit4Life!</div></h1>
              <hr />
              <p className="pb-3">
                Sign up today for free and start tracking your nutrition!
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="glass-box border-dark m-3">
              <h2 className="nasa-black text-center text-uppercase mt-3">Sign Up</h2>
              <form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="row">
                    <div className="col-12 text-center">
                      <label className="fw-bold fs-5">Username:</label>
                      <input
                        className="text-center border border-dark border-2 p-2 form-control mb-2 hand-writing"
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        onChange={handleInputChange}
                      />
                      <label className="fw-bold fs-5">Email:</label>
                      <input
                        className="text-center border border-dark border-2 p-2 form-control mb-2 hand-writing"
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        onChange={handleInputChange}
                      />
                      <label className="fw-bold fs-5">Password:</label>
                      <input
                        className="text-center border border-dark border-2 p-2 form-control mb-2 hand-writing"
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        onChange={handleInputChange}
                      />
                      <label className="fw-bold fs-5">Confirm Password:</label>
                      <input
                        className="text-center border border-dark border-2 p-2 form-control mb-2 hand-writing"
                        type="password"
                        name="passwordConfirmation"
                        placeholder="Confirm password"
                        onChange={handleInputChange}
                      />
                      <br />
                    </div>
                    <br />
                  </div>
                </div>
                <div className="col-12 text-center hand-writing">
                  <button
                    type="submit"
                    className="btn btn-warning border-dark border-2 mt-3 mb-4 col-6">
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div style={{ height: "120px" }}></div>
      </div>
    );
};

export default SignUp;