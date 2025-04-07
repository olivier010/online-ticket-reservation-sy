import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Dashboard as DashboardIcon,
  ConfirmationNumber,
  AccountCircle,
  Logout,
  DarkMode,
  LightMode,
  Menu as MenuIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { ThemeProvider, createTheme, CssBaseline, IconButton } from '@mui/material';
import './Navbar.css';

const UserNavbar = ({ role }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <header className={`navbar user ${darkMode ? 'dark' : ''}`}>
        <div className="navbar-container">
          <div className="navbar-brand">
            <Link to="/" className="logo-link">
              <div className="logo">OTRS</div>
              <h1>{role === 'user' ? 'User Panel' : 'User Panel'}</h1>
            </Link>
            <button className="menu-toggle" onClick={toggleMenu}>
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
          <nav className={`desktop-nav ${menuOpen ? 'open' : ''}`}>
            <ul className="nav-links">
              <li><Link to="/UserDashboard"><DashboardIcon /> Dashboard</Link></li>
              <li><Link to="/tickets"><ConfirmationNumber /> My Tickets</Link></li>
              <li><Link to="/booking"><MenuIcon /> Book Tickets</Link></li>
            </ul>
          </nav>
          <div className="user-controls">
            <IconButton onClick={toggleDarkMode} color="inherit">
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
            <div className="admin-profile">
              <AccountCircle />
              <span>{role === 'user' ? 'User' : 'User'}</span>
            </div>
            <button className="logout-button" onClick={() => navigate('/login')}>
              <Logout /> Logout
            </button>
          </div>
        </div>
      </header>
     
    </ThemeProvider>
  );
};

export default UserNavbar;