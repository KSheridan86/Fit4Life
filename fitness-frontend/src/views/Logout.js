import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api', // Replace with the actual base URL of your Rails API
  withCredentials: true, // This ensures that the CSRF token is sent with the request
});

const Logout = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            api.post('/logout');
            onLogout();
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
        onLogout();
    };

    return (
        <div className="logout">
            <h1 className="glass-box fw-bold p-4 m-5 text-center">Are you sure you want to Logout?</h1>
            <div className="col-12 text-center hand-writing">
                <button 
                    onClick={handleLogout}
                    className="btn btn-warning border-dark border-2 col-6">
                        Logout
                </button>
            </div>
        </div>
    );
};

export default Logout;