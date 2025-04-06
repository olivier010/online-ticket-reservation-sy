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
  Close as CloseIcon
} from '@mui/icons-material';
import './Navbar.css';

const AdminNavbar = ({ darkMode, toggleDarkMode, role }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={`navbar admin ${darkMode ? 'dark' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="logo-link">
            <div className="logo">OTRS</div>
            <h1>{role === 'admin' ? 'Admin Panel' : 'User Panel'}</h1>
          </Link>
          <button className="menu-toggle" onClick={toggleMenu}>
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        <nav className={`desktop-nav ${menuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            {role === 'admin' ? (
              <>
                <li><Link to="/admin"><DashboardIcon /> Dashboard</Link></li>
                <li><Link to="/admin/users"><People /> Manage Users</Link></li>
                <li><Link to="/admin/tickets"><ConfirmationNumber /> Manage Tickets</Link></li>
                <li><Link to="/admin/analytics"><BarChart /> Analytics</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/user/dashboard"><DashboardIcon /> Dashboard</Link></li>
                <li><Link to="/user/tickets"><ConfirmationNumber /> My Tickets</Link></li>
                <li><Link to="/user/profile"><AccountCircle /> Profile</Link></li>
              </>
            )}
          </ul>
        </nav>

        <div className="user-controls">
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? <LightMode /> : <DarkMode />}
          </button>
          <div className="admin-profile">
            <AccountCircle />
            <span>{role === 'admin' ? 'Admin' : 'User'}</span>
          </div>
          <button className="logout-button" onClick={() => navigate('/')}>
            <Logout /> Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;