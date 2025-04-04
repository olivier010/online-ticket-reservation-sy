import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DarkMode, LightMode } from '@mui/icons-material';
import './GuestNav.css';

const Header = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage or prefer-color-scheme
    return localStorage.getItem('darkMode') === 'true' || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches && 
      localStorage.getItem('darkMode') !== 'false');
  });

  useEffect(() => {
    // Apply dark mode class to body
    if (darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo-container">
          <img src="/logo.png" alt="Logo" className="logo" />
          <h1 className="header-title">Online Ticket Reservation</h1>
        </div>
        
        <div className="header-controls">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search events, movies..." 
              className="search-input"
            />
            <button className="search-button">Search</button>
          </div>
          
          <button 
            className="theme-toggle"
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <LightMode /> : <DarkMode />}
          </button>
        </div>
      </div>
      
      <nav className="navbar">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
          
        </ul>
      </nav>
    </header>
  );
};

export default Header;