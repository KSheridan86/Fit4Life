import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const api = axios.create({
    baseURL: 'http://16.171.133.35:4000',
    withCredentials: true,
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
            fetchProfileData(dataFromLogin);
        } else if (location.state?.userId) {
            fetchProfileData(location.state.userId);
        }
    
    }, [dataFromLogin, loggedIn, location.state?.userId]);

    const fetchProfileData = async (userId) => {
        try {
            const response = await api.get(`/api/users/${userId}`);
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
    // This function can be slimmed down to just use userdata.id
    const handleDeleteProfile = () => {
        if (dataFromLogin !== undefined) {
        navigate(`/confirm-delete/${dataFromLogin}`, { state: { data: dataFromLogin } });
    } else if (location.state?.userId) {
        navigate(`/confirm-delete/${location.state?.userId}`, { state: { data: location.state?.userId } });
    } else {
        navigate(`/confirm-delete/${UserData.id}`, { state: { data: UserData.id } });
    }};

    const handleEditProfile = () => {
        navigate("/edit-profile", { state: { profileData, UserData }});
    };

    const handleCreateProfile = () => {
        navigate("/create-profile", { state: { profileData, UserData }});
    };

    const handleDeleteUser = () => {
        navigate("/delete-user", { state: { UserData }});
    };

    return (
        <div className="container spacing">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="glass-box border-dark m-3 nasa-black">
                        <h1 className="fw-bold p-4 pb-1 text-center">
                        Welcome to <br />
                        <span className="text-uppercase">Fit4Life</span>
                        </h1>
                    </div>

                    <div className="p-3 text-center glass-box m-3 border-dark">
                        <p>
                        With our user-friendly platform, you have the power to take control of your nutrition and make informed choices about your food.
                        </p>
                        <hr />
                        <p>
                        Our app offers a comprehensive food search feature.
                        </p>
                        <hr />
                        <p>
                        This functionality enables you to explore and discover detailed nutritional information about a wide variety of foods.
                        </p>
                        <hr />
                        <p className="">
                        Whether you're planning your meals, curious about the calorie content of your favorite dishes, or seeking healthier alternatives, we have got you covered.
                        </p>
                        <hr />
                        {!loggedIn ? (
                        <div>
                            <p className="pb-3">
                            Sign up today for free and get access to our comprehensive nutritional information!
                            </p>
                            <div className="col-12 text-center hand-writing mb-3">
                            <button onClick={handleSignUp} className="btn btn-warning border-dark">
                                Sign Up
                            </button>
                            </div>
                        </div>
                        ) : (null)}
                    </div>
                </div>

                {loggedIn && (
                <div className="col-md-6">
                    <div className="glass-box m-3 mb-5 border-dark text-center">
                        <h1 className="text-center mt-3 mb-3 text-uppercase nasa-black">
                            Welcome {UserData ? UserData.username : 'Friend!'}!
                        </h1>
                        {profileData ? (
                        <div>
                            <p>Age: {profileData.age}</p>
                            <p>Height: {profileData.height} cms</p>
                            <p>Weight: {profileData.weight} Kgs</p>
                            <p>Gender: {profileData.gender}</p>
                            <p>Goal Weight: {profileData.goal_weight} Kgs</p>
                            <p>Deadline: {profileData.goal_time_frame} weeks</p>
                            <div className="col-12 text-center hand-writing mb-3 mt-4">
                                <button onClick={handleEditProfile} className="btn btn-warning border-dark">Update Profile</button>
                            </div>
                            <div className="col-12 text-center hand-writing mb-3">
                                <button onClick={handleDeleteProfile} className="btn btn-warning border-dark">Delete Profile</button>
                            </div>
                            <div className="col-12 text-center hand-writing mb-4">
                                <button onClick={handleDeleteUser} className="btn btn-danger border-dark">
                                Delete Account
                                </button>
                            </div>
                        </div>
                        ) : (
                        <div className="text-center m-3">
                            <h2 className="nasa-black text-uppercase">No Profile?</h2>
                            <h4 className="nasa-black">No Problem!</h4>
                            <p className="p-3 border-bottom border-2 border-dark m-1">
                                Head up to the menu and visit our food Nutrient page to find out about all your favourite foods!
                            </p>
                            <h5 className="nasa-black mt-3">But...</h5>
                            <p className="p-3 pt-0 border-bottom border-2 border-dark">
                                We are working on a revolutionary new AI that can recommend a diet and exercise regime to guarantee your fitness goals will be achieved.
                            </p>
                            <h5 className="nasa-black">Interested?</h5>
                            <p className="p-3 pb-0">
                                Create a profile below and you will be notified as soon your recommendations are ready!
                            </p>
                            <p className="hand-writing p-3 pb-0 fw-bold">
                                We are currently in the process of training the AI and will be ready to launch soon!
                            </p>
                            <div className="col-12 text-center hand-writing">
                                <button onClick={handleCreateProfile} className="btn btn-warning border-dark border-2 mt-3 col-6 mb-3">
                                Create Profile
                                </button>
                                <br />
                                <button onClick={handleDeleteUser} className="btn btn-warning border-dark border-2 col-6 mb-5">
                                Delete Account
                                </button>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
                )}
            </div>
            <div style={{ height: "50px" }}></div>
        </div>
    );
};

export default Home;