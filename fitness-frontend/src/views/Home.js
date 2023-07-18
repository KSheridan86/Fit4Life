import React, {useState, useEffect} from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000', // Replace with the actual base URL of your Rails API
  withCredentials: true, // This ensures that the CSRF token is sent with the request
});

const Home = () => {
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        try {
            const response = await api.get('/'); // Replace '/profile' with the actual endpoint to fetch the profile data
            console.log('Profile data:', response);
            setProfileData(response.data);
        } catch (error) {
            console.error('Failed to fetch profile data:', error);
        }
    };

    return (
        <div>
            <h1>Home</h1>
            <div>
                {profileData ? (
                <div>
                <h2>Welcome, {profileData.name}</h2>
                <p>Email: {profileData.email}</p>
                {/* Display other profile data as needed */}
                </div>
                ) : (
                <div>
                <h2>Loading...</h2>
                </div>
                )}
            </div>
        </div>
    );
};

export default Home;