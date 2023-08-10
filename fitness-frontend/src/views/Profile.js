// Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the user's profile data from the backend when the component mounts
    axios.get('http://16.171.133.35:4000/api/profile')
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch profile:', error);
      });
  }, []);

  const handleUpdateProfile = async (updatedProfile) => {
    try {
      const response = await axios.put('http://16.171.133.35:4000/api/profile', {
        user: updatedProfile,
      });
      // If the update is successful, update the local user state
      setUser(response.data);
      console.log('Profile updated:', response.data);
    } catch (error) {
      console.error('Profile update failed:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <p>Email: {user.email}</p>
      {/* Render other profile information here */}
      <button onClick={() => handleUpdateProfile({ ...user, name: 'New Name' })}>Update Name</button>
    </div>
  );
};

export default Profile;