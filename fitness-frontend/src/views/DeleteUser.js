import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const api = axios.create({
    baseURL: 'http://16.171.133.35:4000/api',
    withCredentials: true,
});

const DeleteUser = ({onLogout}) => {
    const [UserData, setUserData] = useState(null);
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        // Check if UserData exists in local storage
        const storedUserData = JSON.parse(localStorage.getItem('UserData'));
        if (storedUserData) {
            setUserData(storedUserData);
        }
    }, []);

    const handleDelete = async () => {
        try {
        setIsDeleting(true);
        const response = await api.delete('/users');
        console.log('User data:', response.data);
            await onLogout();
            await navigate('/');
        } catch (error) {
        console.error('Failed to delete account:', error);
        } finally {
        setIsDeleting(false);
        }
    };

    return (
      <div className='container'>
        <div className="row justify-content-center login">
          <div className="col-12 col-lg-6">
            <div className="glass-box m-5 p-3 text-center">
              <h1>Are you sure?</h1>
              <h4>This is a permanent action.</h4>
              <p>Delete account for {UserData ? <span className="text-capitalize">{UserData.username}</span> : null} ?</p>
            </div>
            <div className="col-12 text-center hand-writing">
              <button
                className="btn btn-warning"
                onClick={handleDelete}
                disabled={isDeleting}>
                {isDeleting ? 'Deleting...' : 'Delete Account'}
              </button>
              {isDeleting ?
                <p className="glass-box m-5 p-3 text-center">
                  This may take a few seconds.....
                </p> :
                null}
            </div>
          </div>
        </div>
      </div>
    );
};

export default DeleteUser;