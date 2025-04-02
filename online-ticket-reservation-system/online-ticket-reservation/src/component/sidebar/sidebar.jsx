import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  DarkMode, 
  LightMode, 
  Star, 
  History, 
  Help, 
  Close 
} from '@mui/icons-material';
import './Sidebar.css';

const Sidebar = ({ darkMode, toggleDarkMode, isOpen, onClose }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''} ${darkMode ? 'dark' : ''}`}>
      <button className="close-btn" onClick={onClose}>
        <Close />
      </button>
      
      <div className="sidebar-content">
        {/* Dark/Light Mode Toggle */}
        <div className="theme-toggle-section">
          <button 
            className={`theme-btn ${!darkMode ? 'active' : ''}`}
            onClick={() => toggleDarkMode(false)}
          >
            <LightMode /> Light Mode
          </button>
          <button 
            className={`theme-btn ${darkMode ? 'active' : ''}`}
            onClick={() => toggleDarkMode(true)}
          >
            <DarkMode /> Dark Mode
          </button>
        </div>
        
        {/* Quick Links Section */}
        <nav className="sidebar-nav">
          <h3 className="sidebar-title">Quick Links</h3>
          <ul>
            <li>
              <NavLink to="/popular-events" activeClassName="active">
                <Star className="nav-icon" /> Popular Events
              </NavLink>
            </li>
            <li>
              <NavLink to="/recent-bookings" activeClassName="active">
                <History className="nav-icon" /> Recent Bookings
              </NavLink>
            </li>
            <li>
              <NavLink to="/help-support" activeClassName="active">
                <Help className="nav-icon" /> Help & Support
              </NavLink>
            </li>
          </ul>
        </nav>
        
        {/* Additional Shortcuts */}
        <div className="sidebar-shortcuts">
          <h3 className="sidebar-title">Shortcuts</h3>
          <div className="shortcut-grid">
            <button className="shortcut-btn">Upcoming Events</button>
            <button className="shortcut-btn">Special Offers</button>
            <button className="shortcut-btn">My Wishlist</button>
            <button className="shortcut-btn">Payment Methods</button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;