import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/navbar/navbar';
import Sidebar from './components/Sidebar/sidevar';
import Home from './pages/home/home';
import Booking from './pages/booking/booking';
import Search from './pages/search/search';
import Reservation from './pages/reservation/reservation';
import AdminPanel from './pages/admin-pannel/admin';
import Popularevent  from './pages/populaEvent/popularevent';
import Recentbooking from './pages/recentbooking/recentbooking';

import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <Router>
      <div className={`app-container ${darkMode ? 'dark' : ''}`}>
        <Header 
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          isLoggedIn={isLoggedIn}
          isAdmin={isAdmin}
          toggleSidebar={toggleSidebar}
        />
        
        <Sidebar 
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/Search" element={<Search />} />
            <Route path="reservations" element={<Reservation />} />
            <Route path="/admin-panel" element={<AdminPanel />} />
            <Route path="/popularEvents" element={<Popularevent />} />
            <Route path="/recentbookings" element={<Recentbooking />} />
            
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;