import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Email, 
  LocationOn, 
  Copyright 
} from '@mui/icons-material';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Contact Information */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <div className="contact-item">
            <Phone className="contact-icon" />
            <span>+1 (123) 456-7890</span>
          </div>
          <div className="contact-item">
            <Email className="contact-icon" />
            <span>info@ticketreservation.com</span>
          </div>
          <div className="contact-item">
            <LocationOn className="contact-icon" />
            <span>123 Theater St, City, Country</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/faq">FAQs</Link>
          <Link to="/contact">Contact Support</Link>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <Copyright className="copyright-icon" />
          <span>{new Date().getFullYear()} Online Ticket Reservation. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;