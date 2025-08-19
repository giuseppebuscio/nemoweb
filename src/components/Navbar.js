import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState('/');
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleRichiediPreventivo = () => {
    navigate('/richiedi-preventivo');
    closeMenu();
  };

  const handleLogoClick = () => {
    navigate('/');
    closeMenu();
  };

  // Aggiorna la pagina attiva quando cambia la location
  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={handleLogoClick}>
          <img src="/Bianco-Arancio.png" alt="Nemo Agency Logo" />
        </div>
        
        <div className="navbar-nav">
          <ul className="navbar-nav-list">
            <li className="navbar-nav-item">
              <a href="/" className={`navbar-nav-link ${activePage === '/' ? 'active' : ''}`} onClick={closeMenu}>
                Home
              </a>
            </li>
            <li className="navbar-nav-item">
              <a href="/servizi" className={`navbar-nav-link ${activePage === '/servizi' ? 'active' : ''}`} onClick={closeMenu}>
                Servizi
              </a>
            </li>
            <li className="navbar-nav-item">
              <a href="/chi-siamo" className={`navbar-nav-link ${activePage === '/chi-siamo' ? 'active' : ''}`} onClick={closeMenu}>
                Chi Siamo
              </a>
            </li>
            <li className="navbar-nav-item">
              <a href="/contatti" className={`navbar-nav-link ${activePage === '/contatti' ? 'active' : ''}`} onClick={closeMenu}>
                Contatti
              </a>
            </li>
          </ul>
        </div>

        <div className="navbar-cta">
          <button className="navbar-cta-button" onClick={handleRichiediPreventivo}>
            Crea il tuo sito web
          </button>
        </div>

        <button className="navbar-mobile-toggle" onClick={toggleMenu}>
          <span className={`navbar-hamburger ${isMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar-mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <ul className="navbar-mobile-nav-list">
          <li className="navbar-mobile-nav-item">
            <a href="/" className={`navbar-mobile-nav-link ${activePage === '/' ? 'active' : ''}`} onClick={closeMenu}>
              Home
            </a>
          </li>
          <li className="navbar-mobile-nav-item">
            <a href="/servizi" className={`navbar-mobile-nav-link ${activePage === '/servizi' ? 'active' : ''}`} onClick={closeMenu}>
              Servizi
            </a>
          </li>
          <li className="navbar-mobile-nav-item">
            <a href="/chi-siamo" className={`navbar-mobile-nav-link ${activePage === '/chi-siamo' ? 'active' : ''}`} onClick={closeMenu}>
              Chi Siamo
            </a>
          </li>
          <li className="navbar-mobile-nav-item">
            <a href="/contatti" className={`navbar-mobile-nav-link ${activePage === '/contatti' ? 'active' : ''}`} onClick={closeMenu}>
              Contatti
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 