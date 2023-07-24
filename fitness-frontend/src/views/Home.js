import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const api = axios.create({
  baseURL: 'http://localhost:4000', // Replace with the actual base URL of your Rails API
  withCredentials: true, // This ensures that the CSRF token is sent with the request
});

const Home = () => {
    const [UserData, setUserData] = useState(null);
    const [profileData, setProfileData] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const dataFromLogin = location.state?.data;

    useEffect(() => {
        if (dataFromLogin !== undefined) {
            fetchProfileData(dataFromLogin);
        }
    }, [dataFromLogin]);

    const fetchProfileData = async (userId) => {
        try {
            const response = await api.get(`/api/users/${userId}`);
            console.log('User data:', response.data);
            console.log('Profile Data:', response.data.profile)
            setUserData(response.data);
            setProfileData(response.data.profile);
        } catch (error) {
            console.error('Failed to fetch profile data:', error);
        }
    };

    const handleDeleteProfile = () => {
        if (dataFromLogin !== undefined) {
        navigate(`/confirm-delete/${dataFromLogin}`, { state: { data: dataFromLogin } });
    }};

    return (
        <div>
            <h1>Home</h1>
            <h2>Welcome {UserData ? UserData.username : 'Friend!'}!</h2>
            <div>
                {profileData ? (
                <div>
                
                <p>Age: {profileData.age}</p>
                <p>Height: {profileData.height} Cms</p>
                <p>Weight: {profileData.weight} Kgs</p>
                <p>Gender: {profileData.gender}</p>
                <p>Goal Weight: {profileData.goal_weight} Kgs</p>
                <p>Deadline: {profileData.goal_time_frame} weeks</p>
                <button onClick={handleDeleteProfile} className="btn border-dark">Delete Profile</button>
                </div>
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