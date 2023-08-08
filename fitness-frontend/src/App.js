import React, {useState} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import BackToTop from './components/BackToTop';
import Footer from './components/Footer';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    // Remove storedProfileData from local storage
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
