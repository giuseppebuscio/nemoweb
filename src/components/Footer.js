import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-brand">
            <img src="/Bianco-Arancio.png" alt="Nemo Agency" className="footer-logo-img" />
            <p className="footer-description">
              Realizziamo siti web su misura per te. Design moderno, performance elevate e ottimizzazione SEO.
            </p>
          </div>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-title">Servizi</h4>
          <ul className="footer-links">
            <li><a href="#services">Siti Vetrina</a></li>
            <li><a href="#services">E-commerce</a></li>
            <li><a href="#services">Restyling</a></li>
            <li><a href="#services">Digital Marketing</a></li>
            <li><a href="#services">Prenotazioni</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-title">Azienda</h4>
          <ul className="footer-links">
            <li><a href="#about">Chi Siamo</a></li>
            <li><a href="#prices">Prezzi</a></li>
            <li><a href="#contact">Contatti</a></li>
            <li><a href="#contact">Preventivo</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-title">Contatti</h4>
          <div className="footer-contact">
            <p>📧 nemowebagency@gmail.com</p>
            <p>📞 +39 346 574 5184</p>
          </div>
          
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="https://www.instagram.com/nemowebagency/" target="_blank" rel="noopener noreferrer" className="social-link">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <FontAwesomeIcon icon={faTiktok} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>&copy; 2025 Nemo Web Agency</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Cookie Policy</a>
            <a href="#">Termini di servizio</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 