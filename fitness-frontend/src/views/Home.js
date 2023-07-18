import React, {useState, useEffect} from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000', // Replace with the actual base URL of your Rails API
  withCredentials: true, // This ensures that the CSRF token is sent with the request
});

const Home = () => {
    const [UserData, setUserData] = useState(null);
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        try {
            const response = await api.get('/api/users/4');
            console.log('Profile data:', response.data);
            console.log('User Data:', response.data.profile)
            setUserData(response.data);
            setProfileData(response.data.profile);
        } catch (error) {
            console.error('Failed to fetch profile data:', error);
        }
    };

    return (
        <div>
            <h1>Home</h1>
            <div>
                {UserData ? (
                <div>
                <h2>Welcome, {profileData ? profileData.username : 'Friend!'}</h2>
                </div>
                ) : (
                <div>
                <h2>Loading...</h2>
                </div>
                )}
                {profileData ? (<div><p>Age: {profileData.age}</p>
                <p>Height: {profileData.height} Cms</p>
                <p>Weight: {profileData.weight} Kgs</p>
                <p>Gender: {profileData.gender}</p>
                <p>Goal Weight: {profileData.goal_weight} Kgs</p>
                <p>Deadline: {profileData.goal_time_frame} weeks</p></div>
                ) : (
                <div>
                    <h2>No Profile?</h2>
                    <p>Users who create profiles are 8 times more likely to reach their goals!</p>
                </div>)}
                </div>
            </div>
    );
};

export default Home;