import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
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

const AdminNavbar = () => {
  const { user, darkMode, toggleDarkMode, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={`navbar admin ${darkMode ? 'dark' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/admin" className="logo-link">
            <div className="logo">OTRS</div>
            <h1>Admin Panel</h1>
          </Link>
          <button className="menu-toggle" onClick={toggleMenu}>
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        <nav className={`desktop-nav ${menuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            <li><Link to="/admin"><DashboardIcon /> Dashboard</Link></li>
            <li><Link to="/admin/users"><People /> Manage Users</Link></li>
            <li><Link to="/admin/tickets"><ConfirmationNumber /> Manage Tickets</Link></li>
            <li><Link to="/admin/analytics"><BarChart /> Analytics</Link></li>
          </ul>
        </nav>

        <div className="user-controls">
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? <LightMode /> : <DarkMode />}
          </button>
          <div className="admin-profile">
            <AccountCircle />
            <span>{user?.name}</span>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            <Logout /> Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;