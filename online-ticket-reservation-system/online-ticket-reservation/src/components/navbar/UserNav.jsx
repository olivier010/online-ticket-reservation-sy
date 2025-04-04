import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { 
  Home,
  ConfirmationNumber,
  Search,
  Receipt,
  AccountCircle,
  Logout,
  DarkMode,
  LightMode
  
} from '@mui/icons-material';
import './Navbar.css';

const UserNavbar = () => {
  const { user, darkMode, toggleDarkMode, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirect to login if user is not authenticated
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={`navbar ${darkMode ? 'dark' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/dashboard" className="logo-link">
            <div className="logo">OTRS</div>
            <h1>Welcome, {user?.name}</h1>
          </Link>
          <button className="menu-toggle" onClick={toggleMenu}>
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        <nav className={`desktop-nav ${menuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            <li><Link to="/dashboard"><Home /> Home</Link></li>
            <li><Link to="/booking"><ConfirmationNumber /> Booking</Link></li>
            <li><Link to="/search"><Search /> Search</Link></li>
            <li><Link to="/ticket-details"><Receipt /> My Tickets</Link></li>
          </ul>
        </nav>

        <div className="user-controls">
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? <LightMode /> : <DarkMode />}
          </button>
          <button className="logout-button" onClick={handleLogout}>
            <Logout /> Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default UserNavbar;