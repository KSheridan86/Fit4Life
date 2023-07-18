import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import '../App.css';
import Home from '../views/Home';
import Workout from '../views/Workout';
import Nutrition from '../views/Nutrition';
import Goals from '../views/Goals';
import Login from '../views/Login';
import Logout from '../views/Logout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStream, faDumbbell } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ isLoggedIn, onLogin, onLogout }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark sticky-top">
        <div className="container">
          <Link className="navbar-brand nasa" to="/">
          <FontAwesomeIcon icon={faDumbbell} /> Fit4Life <FontAwesomeIcon icon={faDumbbell} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded={isNavOpen ? 'true' : 'false'}
            aria-label="Toggle navigation"
            onClick={toggleNav}
          >
            <span className="navbar-toggler-icon"><FontAwesomeIcon icon={faStream} /></span>
          </button>
          <div
            className={`collapse navbar-collapse${isNavOpen ? ' show' : ''}`}
            id="navbarNav"
          >
            <ul className="navbar-nav text-center">
              <li className="nav-item">
                <Link className="nav-link nasa" to="/" onClick={closeNav}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nasa" to="/workout" onClick={closeNav}>
                  Workout
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nasa" to="/nutrition" onClick={closeNav}>
                  Nutrition
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nasa" to="/goals" onClick={closeNav}>
                  Goals
                </Link>
              </li>
              { isLoggedIn ? 
                <li className="nav-item"> {/* New list item for the Login link */}
                  <Link className="nav-link nasa" to="/logout" onClick={closeNav}>
                    Logout
                  </Link>
                </li> : 
                <li className="nav-item"> {/* New list item for the Login link */}
                  <Link className="nav-link nasa" to="/login" onClick={closeNav}>
                    Login
                  </Link>
                </li>}
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/login" element={<Login onLogin={onLogin} onLogout={onLogout} />} /> 
        <Route path="/logout" element={<Logout onLogin={onLogin} onLogout={onLogout} />} />
      </Routes>
    </Router>
  );
};

export default Navbar;
