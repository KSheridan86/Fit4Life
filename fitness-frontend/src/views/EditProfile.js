import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const api = axios.create({
    baseURL: 'http://16.171.133.35:4000', // Replace with the actual base URL of your Rails API
    withCredentials: true,
    headers: {
      'X-CSRF-Token': getCsrfToken(), // Function to get CSRF token
  },
});

function getCsrfToken() {
  const token = document.querySelector('meta[name="csrf-token"]');
  return token ? token.content : '';
}

const EditProfile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { profileData } = location.state;
    const { UserData } = location.state;
    
    const [profile, setProfile] = useState({
        age: profileData.age,
        height: profileData.height,
        weight: profileData.weight,
        gender: profileData.gender,
        goal_weight: profileData.goal_weight,
        goal_time_frame: profileData.goal_time_frame,
    });

    const handleInputChange = event => {
      console.log(UserData)
      console.log(UserData.id)
        const { name, value } = event.target;
        setProfile(prevProfile => ({ ...prevProfile, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.put(`/api/profiles/${UserData.id}`, { profile }, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}` // Include the authentication token here
            }
        
            });
            if (response) {
                localStorage.setItem('profileData', JSON.stringify(profile));
            }
            console.log('Profile updated successfully', response.data);
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
        navigate("/", { state: { userId: UserData.id } })
    };

    return (
      <div className='container'>
        <div className="row justify-content-center login">
          <div className="col-12 col-lg-6">
            <div className="glass-box border-dark m-3">
              <h2 className="nasa-black text-center text-uppercase mt-3">Edit Profile For <br /> {UserData.username}</h2>
              <form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="row">
                    <div className="col-12 text-center">
                      <label className="fw-bold fs-5">Age:</label>
                      <input
                        className="text-center border border-dark border-2 p-2 form-control mb-2 hand-writing"
                        type="text"
                        name="age"
                        placeholder="Enter age"
                        value={profile.age}
                        onChange={handleInputChange}
                      />
                      <label className="fw-bold fs-5">Height:</label>
                      <input
                        className="text-center border border-dark border-2 p-2 form-control mb-2 hand-writing"
                        type="text"
                        name="height"
                        placeholder="enter height"
                        value={profile.height}
                        onChange={handleInputChange}
                      />
                      <label className="fw-bold fs-5">Weight:</label>
                      <input
                        className="text-center border border-dark border-2 p-2 form-control mb-2 hand-writing"
                        type="text"
                        name="weight"
                        placeholder="enter weight"
                        value={profile.weight}
                        onChange={handleInputChange}
                      />
                      <label className="fw-bold fs-5">Gender:</label>
                      <input
                        className="text-center border border-dark border-2 p-2 form-control mb-2 hand-writing"
                        type="text"
                        name="gender"
                        placeholder="enter gender"
                        value={profile.gender}
                        onChange={handleInputChange}
                      />
                      <label className="fw-bold fs-5">Goal Weight:</label>
                      <input
                        className="text-center border border-dark border-2 p-2 form-control mb-2 hand-writing"
                        type="text"
                        name="goal_weight"
                        placeholder="enter goal weight"
                        value={profile.goal_weight}
                        onChange={handleInputChange}
                      />
                      <label className="fw-bold fs-5">Time Frame:</label>
                      <input
                        className="text-center border border-dark border-2 p-2 form-control mb-2 hand-writing"
                        type="text"
                        name="goal_time_frame"
                        placeholder="enter goal time frame"
                        value={profile.goal_time_frame}
                        onChange={handleInputChange}
                      />
                      <br></br>
                    </div>
                    <br></br>
                  </div>
                </div>
                <div className="col-12 text-center hand-writing">
                  <button
                    type="submit"
                    className="btn btn-warning border-dark border-2 mt-3 mb-4 col-6 col-lg-4 ">
                    Save
                  </button>
                </div>
              </form>
            </div>
            <div style={{height: "120px"}}></div>
          </div>
        </div>
      </div>
    );
};

export default EditProfile;