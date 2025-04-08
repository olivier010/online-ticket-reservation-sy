import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import UserDashboard from './pages/user/UserDashboard';

import ManageTickets from './pages/admin/ManageTickets';
import ManageUser from './pages/admin/ManageUser';
import Dashboard from './pages/admin/Dashboard';
import Analytics from './pages/admin/Analytics';
import Booking from './pages/user/Booking';
import Tickets from '../src/pages/user/Tickets'

function App() {
  const [tickets, setTickets] = useState(() => {
    // Load tickets from local storage on initial render
    const savedTickets = localStorage.getItem('tickets');
    return savedTickets ? JSON.parse(savedTickets) : [];
  });

  useEffect(() => {
    // Fetch tickets from the backend when the app loads
    axios
      .get('/api/tickets')
      .then((response) => setTickets(response.data))
      .catch((error) => console.error('Error fetching tickets:', error));
  }, []);

  useEffect(() => {
    // Save tickets to local storage whenever they change
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }, [tickets]);

  const saveTickets = (updatedTickets) => {
    setTickets(updatedTickets);
    // Save tickets to the backend
    axios
      .post('/api/tickets', updatedTickets)
      .catch((error) => console.error('Error saving tickets:', error));
  };

  return (
    <Router>
      <main className="main-content">
        <Routes>
          {/* Guest Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />

          {/* Admin Routes */}
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route
            path="/ManageTickets"
            element={<ManageTickets tickets={tickets} setTickets={saveTickets} />}
          />
          <Route path='/ManageUser' element={<ManageUser />} />
         
          <Route path="/Analytics" element={<Analytics />} />

          {/* User Routes */}
          <Route
            path="/UserDashboard"
            element={<UserDashboard tickets={tickets} />}
          />
          <Route path='/Booking' element={<Booking tickets={tickets} />} />
          <Route path='/Tickets' element={<Tickets />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;