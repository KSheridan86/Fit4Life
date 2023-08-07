import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000', // Replace with the actual base URL of your Rails API
  withCredentials: true, // This ensures that the CSRF token is sent with the request
});

const ConfirmDelete = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDeleteProfile = async () => {
        try {
          await api.delete(`/api/profiles/${id}`);
          // Perform any necessary cleanup or actions after successful deletion
          // For example, you could redirect to the home page or show a success message
          // window.location.replace('/');
          navigate('/'); 
        } catch (error) {
          console.error('Failed to delete profile:', error);
        }
      };

    return (
        <div className='delete'>
          <div className="glass-box m-5 p-3 text-center">
            <h1>Are you sure?</h1>
            <h4>This is a permanent action.</h4>
            <p>Delete profile with ID: {id}</p>
          </div>
          <div className="col-12 text-center hand-writing">
            <button 
              onClick={handleDeleteProfile}  
              className="btn btn-warning border-dark border-2 mt-3 col-6 ">
                Delete??
            </button>
          </div>
        </div>
    );
};

export default ConfirmDelete;