import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://16.171.133.35:4000', // Replace with the actual base URL of your Rails API
  withCredentials: true,
});

const ConfirmDelete = () => {
    const [UserData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      // Check if UserData exists in local storage
      const storedUserData = JSON.parse(localStorage.getItem('UserData'));
      if (storedUserData) {
          setUserData(storedUserData);
      }
  }, []);

    const handleDeleteProfile = async () => {
        try {
          setLoading(true);
          await api.delete(`/api/profiles/${id}`);
          localStorage.removeItem('profileData');
          setLoading(false);
          navigate('/'); 
        } catch (error) {
          console.error('Failed to delete profile:', error);
          setLoading(false);
        }
      };

      // Render only when UserData is available
    if (UserData === null) {
      return null;
  }

    return (
      <div className='container'>
        <div className="row justify-content-center delete">
          <div className="col-12 col-lg-6">
            <div className="glass-box m-5 p-3 text-center">
              <h1>Are you sure?</h1>
              <h4>This is a permanent action.</h4>
              <p>Delete profile for {UserData.username}?</p>
            </div>
            <div className="col-12 text-center hand-writing">
              <button
                onClick={handleDeleteProfile}
                className="btn btn-warning border-dark border-2 mt-3 col-6"
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Delete Profile'}
              </button>
              {loading ? <p className="glass-box m-5 p-3 text-center">This may take a few seconds.....</p> : null}
            </div>
          </div>
        </div>
      </div>
    );
};

export default ConfirmDelete;