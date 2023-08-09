import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// api is the base URL of the Rails API
const api = axios.create({
  baseURL: 'http://localhost:4000', // Replace with the actual base URL of your Rails API
  withCredentials: true, // This ensures that the CSRF token is sent with the request
});

const Home = ({loggedIn}) => {
    const [UserData, setUserData] = useState(null);
    const [profileData, setProfileData] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const dataFromLogin = location.state?.data;
    
    useEffect(() => {
        // Check if UserData & profileData exists in local storage
        const storedProfileData = JSON.parse(localStorage.getItem('profileData'));
        const storedUserData = JSON.parse(localStorage.getItem('UserData'));
        if (storedProfileData) {
            setProfileData(storedProfileData);
        }
        if (storedUserData) {
            setUserData(storedUserData);
        }

        if (dataFromLogin !== undefined || loggedIn) {
            fetchProfileData(dataFromLogin); //this here is possibly the answer, does data/fromLogin persist?
        } else if (location.state?.userId) {
            fetchProfileData(location.state.userId);
        }
    
    }, [dataFromLogin, loggedIn, location.state?.userId]);

    const fetchProfileData = async (userId) => {
        try {
            const response = await api.get(`/api/users/${userId}`);
            // console.log('User data:', response.data);
            // console.log('Profile Data:', response.data.profile)

            setUserData(response.data);
            // Store the profileData in local storage
            localStorage.setItem('UserData', JSON.stringify(response.data));

            setProfileData(response.data.profile);
            // Store the profileData in local storage
            localStorage.setItem('profileData', JSON.stringify(response.data.profile));

        } catch (error) {
            // console.error('Failed to fetch profile data:', error);
        }
    };

    const handleSignUp = () => {
        navigate("/signup");
    }

    const handleDeleteProfile = () => {
        if (dataFromLogin !== undefined) {
        navigate(`/confirm-delete/${dataFromLogin}`, { state: { data: dataFromLogin } });
    } else if (location.state?.userId) {
        navigate(`/confirm-delete/${location.state?.userId}`, { state: { data: location.state?.userId } });
    }};

    const handleEditProfile = () => {
        navigate("/edit-profile", { state: {profileData, UserData}});
    };

    const handleCreateProfile = () => {
        navigate("/create-profile", { state: {profileData, UserData}});
    };

    return (
        <div className="spacing">
            <div className="glass-box border-dark m-3">
                <h1 className="fw-bold p-4 pb-1 text-center">
                    Welcome to 
                    <br />
                    <span className="nasa-black text-uppercase">Fit4Life</span>
                </h1>
            </div>
            
            <div className="p-3 text-center glass-box m-3 border-dark">
                <p>
                    With our user-friendly platform, you have the power to take control of your nutrition and make 
                    informed choices about your food. 
                </p>
                <hr />
                <p>
                    Our app offers a comprehensive food search feature. 
                </p>
                <hr />
                <p>
                    This functionality enables you to explore and discover detailed nutritional information about 
                    a wide variety of foods. 
                </p>
                <hr />
                <p className="">
                    Whether you're planning your meals, curious about the calorie content of your favorite dishes, 
                    or seeking healthier alternatives, we have got you covered.
                </p>
                <hr />
                {!loggedIn ? (
                    <div>
                        <p className="pb-3">
                            Sign up today for free and start tracking your nutrition!
                        </p>
                        <div className="col-12 text-center hand-writing mb-3">
                            <button
                                onClick={handleSignUp}
                                className="btn btn-warning border-dark">
                                    Sign Up
                            </button>
                        </div>
                    </div>
                    ) : (null)
                }
                
            </div>
            {loggedIn ? (
            <div className="glass-box m-3 mb-5 border-dark text-center">
                <h1 className="hand-writing text-center mt-3 mb-3">
                    Welcome {UserData ? UserData.username : 'Friend!'}!
                </h1>
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
                        <button 
                            onClick={handleCreateProfile}
                            className="btn btn-warning border-dark border-2 mt-3 col-6 mb-5">
                                Create Profile
                        </button>
                    </div>
                </div>)}
            </div>
                ) : (null)
            }
                <div style={{height: "50px"}}></div>
        </div>
    );
};

export default Home;