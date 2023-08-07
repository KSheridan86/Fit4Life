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

    const handleEditProfile = () => {
        navigate("/edit-profile", { state: {profileData, UserData}});
    };

    return (
        <div className="spacing">
            <div className="glass-box border-dark m-3">
                <h1 className="fw-bold p-4 pb-1 text-center">
                    Welcome to 
                    <br />
                    <span className="nasa-black text-uppercase">Fit4Life</span>
                    <br /> 
                    our innovative calorie tracking app!
                </h1>
            </div>
            
            <div className="p-3 text-center glass-box m-3 border-dark">
                <p>
                    With our user-friendly platform, you have the power to take control of your nutrition and make 
                    informed choices about your food. 
                </p>
                <hr />
                <p>
                    Our app not only lets you effortlessly track your daily 
                    caloric intake but also offers a comprehensive food search feature. 
                </p>
                <hr />
                <p>
                    This functionality enables you to explore and discover detailed nutritional information about 
                    a wide variety of foods. 
                </p>
                <hr />
                <p className="border-bottom border-3 border-dark pb-3">
                    Whether you're planning your meals, curious about the calorie content of your favorite dishes, 
                    or seeking healthier alternatives, we have got you covered.
                </p>
                
            </div>
            
            <div className="glass-box m-3 mb-5 border-dark">
            <h1 className="hand-writing text-center mt-3 mb-3">Welcome {UserData ? UserData.username : 'Friend!'}!</h1>
                {profileData ? (
                <div>
                
                <p>Age: {profileData.age}</p>
                <p>Height: {profileData.height} Cms</p>
                <p>Weight: {profileData.weight} Kgs</p>
                <p>Gender: {profileData.gender}</p>
                <p>Goal Weight: {profileData.goal_weight} Kgs</p>
                <p>Deadline: {profileData.goal_time_frame} weeks</p>
                <div className="col-12 text-center hand-writing mb-3">
                    <button onClick={handleEditProfile} className="btn btn-warning border-dark">Update Profile</button>
                </div>
                <div className="col-12 text-center hand-writing mb-3">
                    <button onClick={handleDeleteProfile} className="btn btn-warning border-dark">Delete Profile</button>
                </div>
                </div>
                ) : (
                <div className="text-center">
                    <h2>No Profile?</h2>
                    <h4>No Problem!</h4>
                    <h5>But...</h5>
                    <p>Users who create profiles are 8 times more likely to reach their goals!</p>
                    <div className="col-12 text-center hand-writing">
                        <button className="btn btn-warning border-dark border-2 mt-3 col-6 mb-5">Create Profile</button>
                    </div>
                </div>)}
                </div>
                <div style={{height: "15px"}}></div>
            </div>
    );
};

export default Home;