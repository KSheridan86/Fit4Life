import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const api = axios.create({
    baseURL: 'http://16.171.133.35:4000', // Replace with the actual base URL of your Rails API
    withCredentials: true,
});

const CreateProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        age: '',
        height: '',
        weight: '',
        gender: '',
        goal_weight: '',
        goal_time_frame: '',
    });

    // Retrieve UserData from local storage
    const storedUserData = JSON.parse(localStorage.getItem('UserData'));

    const handleInputChange = event => {
        const { name, value } = event.target;
        setProfile(prevProfile => ({ ...prevProfile, [name]: value }));
    };

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            localStorage.setItem('profileData', JSON.stringify(profile));
            const response = await api.post('/api/profiles', { profile });
            if (response) {
                navigate('/');
            }
            console.log('Profile created successfully', response.data);
        } catch (error) {
            console.error('Failed to create profile:', error);
        }
    };

    return (
      <div className='container'>
        <div className="row justify-content-center login">
          <div className="col-12 col-lg-6">
            <div className="glass-box border-dark m-3">
              <h2 className="nasa-black text-center text-uppercase mt-3">Create a Profile For <br /> {storedUserData.username}</h2>
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
                        onChange={handleInputChange}
                      />
                      <label className="fw-bold fs-5">Height:</label>
                      <input
                        className="text-center border border-dark border-2 p-2 form-control mb-2 hand-writing"
                        type="text"
                        name="height"
                        placeholder="enter height"
                        onChange={handleInputChange}
                      />
                      <label className="fw-bold fs-5">Weight:</label>
                      <input
                        className="text-center border border-dark border-2 p-2 form-control mb-2 hand-writing"
                        type="text"
                        name="weight"
                        placeholder="enter weight"
                        onChange={handleInputChange}
                      />
                      <label className="fw-bold fs-5">Gender:</label>
                      <input
                        className="text-center border border-dark border-2 p-2 form-control mb-2 hand-writing"
                        type="text"
                        name="gender"
                        placeholder="enter gender"
                        onChange={handleInputChange}
                      />
                      <label className="fw-bold fs-5">Goal Weight:</label>
                      <input
                        className="text-center border border-dark border-2 p-2 form-control mb-2 hand-writing"
                        type="text"
                        name="goal_weight"
                        placeholder="enter goal weight"
                        onChange={handleInputChange}
                      />
                      <label className="fw-bold fs-5">Time Frame:</label>
                      <input
                        className="text-center border border-dark border-2 p-2 form-control mb-2 hand-writing"
                        type="text"
                        name="goal_time_frame"
                        placeholder="enter goal time frame"
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
                    className="btn btn-warning border-dark border-2 mt-3 mb-4 col-6 ">
                    Create Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div style={{height: "120px"}}></div>
        </div>
      </div>
    );
};

export default CreateProfile;