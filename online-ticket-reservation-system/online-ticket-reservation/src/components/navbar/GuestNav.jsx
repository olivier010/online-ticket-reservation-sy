import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { 
  Home, 
  Info, 
  ContactMail, 
  Build, 
  Login as LoginIcon, 
  HowToReg,
  DarkMode,
  LightMode,
  Menu as MenuIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import './Navbar.css';

const GuestNavbar = () => {
  const { darkMode, toggleDarkMode } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={`navbar ${darkMode ? 'dark' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="logo-link">
            <div className="logo">OTRS</div>
            <h1>Online Ticket Reservation</h1>
          </Link>
          <button className="menu-toggle" onClick={toggleMenu}>
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        <nav className={`desktop-nav ${menuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            <li><Link to="/"><Home /> Home</Link></li>
            <li><Link to="/about"><Info /> About</Link></li>
            <li><Link to="/contact"><ContactMail /> Contact</Link></li>
            <li><Link to="/services"><Build /> Services</Link></li>
          </ul>
        </nav>

        <div className="user-controls">
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? <LightMode /> : <DarkMode />}
          </button>
          <Link to="/login" className="auth-button login">
            <LoginIcon /> Login
          </Link>
          <Link to="/register" className="auth-button register">
            <HowToReg /> Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default GuestNavbar;