import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  DarkMode, 
  LightMode, 
  AccountCircle, 
  Menu 
} from '@mui/icons-material';
import './navbar.css';

const Header = ({ isAdmin = false, isLoggedIn = false }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo and Mobile Menu Button */}
        <div className="logo-menu-container">
          <button className="mobile-menu-button" onClick={toggleMobileMenu}>
            <Menu />
          </button>
          <Link to="/" className="logo-link" onClick={closeMobileMenu}>
            <div className="logo">OTR</div>
            <h1 className="system-name">Online Ticket Reservation</h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/book-tickets">Book Tickets</Link></li>
            <li><Link to="/search-tickets">Search Tickets</Link></li>
            <li><Link to="/my-reservations">My Reservations</Link></li>
            {isAdmin && <li><Link to="/admin-panel">Admin Panel</Link></li>}
          </ul>
        </nav>

        {/* User Controls */}
        <div className="user-controls">
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? <LightMode /> : <DarkMode />}
          </button>
          
          {isLoggedIn ? (
            <div className="user-profile" onClick={() => navigate('/profile')}>
              <AccountCircle className="profile-icon" />
              <span className="profile-text">My Account</span>
            </div>
          ) : (
            <div className="auth-buttons">
              <button className="login-button" onClick={() => navigate('/login')}>Login</button>
              <button className="register-button" onClick={() => navigate('/register')}>Register</button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
          <li><Link to="/booking" onClick={closeMobileMenu}>Book Tickets</Link></li>
          <li><Link to="/search" onClick={closeMobileMenu}>Search Tickets</Link></li>
          <li><Link to="/reservation" onClick={closeMobileMenu}>My Reservations</Link></li>
          {isAdmin && <li><Link to="/admin-panel" onClick={closeMobileMenu}>Admin Panel</Link></li>}
          {!isLoggedIn && (
            <>
              <li><Link to="./login" onClick={closeMobileMenu}>Login</Link></li>
              <li><Link to="./register" onClick={closeMobileMenu}>Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;