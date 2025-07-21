import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <img src="/Bianco-Arancio.png" alt="Nemo Agency Logo" className="logo-image" />
        </div>
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li><a href="/" className="nav-link" onClick={closeMenu}>Home</a></li>
            <li><a href="/servizi" className="nav-link" onClick={closeMenu}>Servizi</a></li>
            <li><a href="/chi-siamo" className="nav-link" onClick={closeMenu}>Chi Siamo</a></li>
            <li><a href="/dove-siamo" className="nav-link" onClick={closeMenu}>Dove Siamo</a></li>
            <li><a href="/contatti" className="nav-link" onClick={closeMenu}>Contatti</a></li>
          </ul>
        </nav>

        <div className="header-cta">
          <button className="cta-button">Contattaci</button>
        </div>

        <button className="mobile-menu-toggle" onClick={toggleMenu}>
          <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>
    </header>
  );
};

export default Navbar; 