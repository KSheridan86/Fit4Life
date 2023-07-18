import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api', // Replace with the actual base URL of your Rails API
  withCredentials: true, // This ensures that the CSRF token is sent with the request
});

const Logout = ({ onLogout }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await api.post('/logout');
            console.log('Logout successful:', response.data + loggedIn);
            setLoggedIn(false);
            onLogout();
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
        setLoggedIn(false);
        onLogout();
    };

    return (
        <div>
            <h2>Logout</h2>
                <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;