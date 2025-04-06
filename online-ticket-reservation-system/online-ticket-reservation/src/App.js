import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/Footer';
import Login  from './pages/login/Login';
import Signup from './pages/signup/Signup';
import About from '../src/pages/guests/about';
import Contact from '../src/pages/guests/contact';

import './App.css';

function App() {
  return (
    
      <Router>
       
        <main className="main-content">
          <Routes>
            {/* Guest Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path='/Admin' element={<Admin />} />
            
          </Routes>
        </main>
        <Footer />
      </Router>
    
  );
}

export default App;