import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { 
  Email, 
  Phone, 
  LocationOn, 
  Facebook, 
  Twitter, 
  Instagram, 
  LinkedIn,
  Copyright,
  Home,
  Info,
  ContactMail,
  Build
} from '@mui/icons-material';
import './Footer.css';

const Footer = () => {
  const { darkMode } = useContext(UserContext);

  return (
    <footer className={`footer ${darkMode ? 'dark-mode' : ''}`}>
      <div className="footer-container">
        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/"><Home /> Home</a></li>
            <li><a href="/about"><Info /> About Us</a></li>
            <li><a href="/services"><Build /> Services</a></li>
            <li><a href="/contact"><ContactMail /> Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <div className="contact-info">
            <div className="contact-item">
              <Email />
              <span>info@ticketreserve.com</span>
            </div>
            <div className="contact-item">
              <Phone />
              <span>+1 (123) 456-7890</span>
            </div>
            <div className="contact-item">
              <LocationOn />
              <span>123 Theater St, City, Country</span>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="#" className="social-link"><Facebook /></a>
            <a href="#" className="social-link"><Twitter /></a>
            <a href="#" className="social-link"><Instagram /></a>
            <a href="#" className="social-link"><LinkedIn /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>
          <Copyright fontSize="small" /> 
          {new Date().getFullYear()} Online Ticket Reservation System. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;