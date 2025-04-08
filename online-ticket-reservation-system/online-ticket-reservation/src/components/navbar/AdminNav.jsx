import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  People,
  ConfirmationNumber,
  BarChart,
  AccountCircle,
  Logout,
  DarkMode,
  LightMode,
  Menu as MenuIcon,
  Close as CloseIcon,
  Analytics
} from '@mui/icons-material';
import { ThemeProvider, createTheme, CssBaseline, IconButton } from '@mui/material';
import './Navbar.css';

const AdminNavbar = ({ role }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <header className={`navbar admin ${darkMode ? 'dark' : ''}`}>
        <div className="navbar-container">
          <div className="navbar-brand">
            <Link to="/" className="logo-link">
              <div className="logo">OTRS</div>
              <h1>Admin Pannel</h1>
            </Link>
            <button className="menu-toggle" onClick={toggleMenu}>
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>

          <nav className={`desktop-nav ${menuOpen ? 'open' : ''}`}>
            <ul className="nav-links">
              <li><Link to="/Dashboard"><DashboardIcon /> Dashboard</Link></li>
              <li><Link to="/ManageUsers"><People /> Manage Users</Link></li>
              <li><Link to="/ManageTickets"><ConfirmationNumber /> Manage Tickets</Link></li>
              <li><Link to="/Analytics"><Analytics /> Analytics</Link></li>
            </ul>
          </nav>

          <div className="user-controls">
            <IconButton onClick={toggleDarkMode} color="inherit">
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
            <div className="admin-profile">
              <AccountCircle />
              <span>{role === 'admin' ? 'Admin' : 'User'}</span>
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

export default AdminNavbar;
