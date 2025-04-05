import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import NavbarSelector from '../src/components/navbar/NavbarSelector';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Guest Pages
import Home from '../src/pages/guests/Home';
import About from '../src/pages/guests/about';
import Contact from '../src/pages/guests/contact';
import Login from '../src/pages/guests/login';
import Register from '../src/pages/guests/register';


// User Pages
import Dashboard from '../src/pages/user/Dashboard';
import Booking from '../src/pages/user/Booking';
import Search from '../src/pages/user/Search';
import TicketDetails from '../src/pages/user/TicketDetails';
import Profile from '../src/pages/user/Profile';
import PaymentHistory from '../src/pages/user/PaymentHistory';


// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageTickets from './pages/admin/ManageTickets';
import Analytics from './pages/admin/Analytics';


// Shared Components
import PageNotFound from './pages/shared/PageNotFound';
import MaintenanceMode from './pages/shared/MaintenanceMode';
import ServerStatus from './pages/shared/ServerStatus'; // New feature

import './App.css';

function App() {
  const [isMaintenance, setIsMaintenance] = React.useState(false);
  const [serverStatus, setServerStatus] = React.useState('online'); // New feature

  React.useEffect(() => {
    const maintenanceMode = localStorage.getItem('maintenanceMode') === 'true';
    setIsMaintenance(maintenanceMode);
    
    // Check server status (new feature)
    const checkServerStatus = async () => {
      try {
        // This would be an actual API call in production
        const status = localStorage.getItem('serverStatus') || 'online';
        setServerStatus(status);
      } catch (error) {
        console.error("Server status check failed:", error);
      }
    };
    
    checkServerStatus();
  }, []);

  if (isMaintenance) {
    return (
      <UserProvider>
        <MaintenanceMode />
      </UserProvider>
    );
  }

  return (
    <UserProvider>
      <Router>
        {serverStatus !== 'online' && <ServerStatus status={serverStatus} />} {/* New feature */}
        <NavbarSelector />
        <main className="main-content">
          <Routes>
            {/* Guest Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            

            {/* User Routes */}
            <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/search" element={<Search />} />
              <Route path="/ticket-details/:id" element={<TicketDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/payment-history" element={<PaymentHistory />} />
              
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<ManageUsers />} />
              <Route path="/admin/tickets" element={<ManageTickets />} />
              <Route path="/admin/analytics" element={<Analytics />} />
              
            </Route>

            {/* Shared Routes */}
            
          </Routes>
        </main>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;