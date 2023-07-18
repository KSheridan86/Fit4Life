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
            const response = await api.get('/api/users/4');
            console.log('Profile data:', response.data);
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
                <h2>Welcome, {profileData.username}</h2>
                {/* <p>Age: {profileData.profile.age}</p>
                <p>Height: {profileData.profile.height} Cms</p>
                <p>Weight: {profileData.profile.weight} Kgs</p>
                <p>Gender: {profileData.profile.gender}</p>
                <p>Goal Weight: {profileData.profile.goal_weight} Kgs</p>
                <p>Deadline: {profileData.profile.goal_time_frame} weeks</p> */}
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