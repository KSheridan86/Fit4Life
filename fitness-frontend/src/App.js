import React, {useState} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Simulate a login action here
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Simulate a logout action here
    setLoggedIn(false);
  };

  return (
    <div>
      <Navbar isLoggedIn={loggedIn} onLogin={handleLogin} onLogout={handleLogout} />
      <Footer />
    </div>
  );
}

export default App;
