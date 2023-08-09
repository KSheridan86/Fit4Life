import React, {useState, useEffect} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import BackToTop from './components/BackToTop';
import Footer from './components/Footer';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if UserData exists in local storage and keep the user logged in
    const storedUserData = JSON.parse(localStorage.getItem('UserData'));
    if (storedUserData) {
        handleLogin();
    }
}, []);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    // Remove all of the users data from local storage
    localStorage.removeItem('profileData');
    localStorage.removeItem('UserData');
    localStorage.removeItem('userId');
  };

  return (
    <div>
      <Navbar isLoggedIn={loggedIn} onLogin={handleLogin} onLogout={handleLogout} />
      <BackToTop />
      <Footer />
    </div>
  );
}

export default App;
