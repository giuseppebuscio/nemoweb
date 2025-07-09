import React, { useState, useEffect } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
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
    <div className="homepage">
      {/* Header */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <div className="logo">
            <img src="/Bianco-Arancio.png" alt="Nemo Agency Logo" className="logo-image" />
          </div>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              <li><a href="/" className="nav-link" onClick={closeMenu}>Home</a></li>
              <li><a href="/servizi" className="nav-link" onClick={closeMenu}>Servizi</a></li>
              <li><a href="/prezzi" className="nav-link" onClick={closeMenu}>Prezzi</a></li>
              <li><a href="/chi-siamo" className="nav-link" onClick={closeMenu}>Chi Siamo</a></li>
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

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>🚀 Migliora la tua attività</span>
            </div>
            
            <h1 className="hero-title">
              Realizziamo siti web
              <span className="gradient-text"> su misura per te</span>
            </h1>
            
            <p className="hero-subtitle">
              Design moderno, performance elevate e ottimizzazione SEO: tutto ciò che ti serve per avere successo online
            </p>
            
            <div className="hero-buttons">
              <button className="primary-button">
                Esplora Nemo
                <svg className="arrow-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="secondary-button">
                Contattaci
              </button>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="hero-showcase">
              <div className="showcase-device">
                <div className="device-frame">
                  <div className="device-screen">
                    <div className="screen-content">
                      <div className="app-grid">
                        <div className="app-item">
                          <div className="app-icon">🎨</div>
                          <div className="app-name">Design</div>
                        </div>
                        <div className="app-item">
                          <div className="app-icon">💻</div>
                          <div className="app-name">Code</div>
                        </div>
                        <div className="app-item">
                          <div className="app-icon">🚀</div>
                          <div className="app-name">Launch</div>
                        </div>
                        <div className="app-item">
                          <div className="app-icon">✨</div>
                          <div className="app-name">Magic</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Geometric Shapes Background */}
              <div className="geometric-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
                <div className="shape shape-4"></div>
                <div className="shape shape-5"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="about-container">
          <div className="about-visual">
            <div className="about-image">
              <img src="/chisiamo.jpg" alt="Il nostro team" />
              <div className="image-overlay"></div>
            </div>
          </div>
          
          <div className="about-content">
            <div className="about-badge">
              <span>💡 Chi Siamo</span>
            </div>
            
            <h2 className="about-title">
              Il nostro impegno per il tuo
              <span className="gradient-text"> successo online</span>
            </h2>
            
            <p className="about-description">
              Siamo una web agency con la passione per il design, la tecnologia e i progetti ben fatti. 
              Lavoriamo con aziende e privati per dare vita a siti che funzionano davvero.
            </p>
            

            
            <div className="about-stats">
              <div className="stat-card">
                <div className="stat-number">100+</div>
                <div className="stat-label">Progetti Completati</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">98%</div>
                <div className="stat-label">Clienti Soddisfatti</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">5+</div>
                <div className="stat-label">Anni di Esperienza</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <div className="cta-badge">
              <span>🚀 Pronto a Iniziare?</span>
            </div>
            
            <h2 className="cta-title">
              Trasforma la tua presenza
              <span className="cta-gradient-text"> digitale oggi</span>
            </h2>
            
            <p className="cta-description">
              Unisciti a centinaia di clienti soddisfatti che hanno già trasformato 
              la loro presenza online con i nostri servizi professionali.
            </p>
            
            <div className="cta-buttons">
              <button className="cta-primary-button">
                Inizia il Progetto
                <svg className="cta-arrow-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="cta-secondary-button">
                Richiedi Preventivo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="features">
        <div className="features-container">
          <div className="section-header">
            <h2 className="section-title">Servizi</h2>
            <p className="section-subtitle">
              Soluzioni su misura per la tua attività
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <h3 className="feature-title">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9,22 9,12 15,12 15,22"/>
                  </svg>
                </div>
                Siti Vetrina
              </h3>
              <p className="feature-description">
                Siti web professionali e responsive per presentare la tua attività. Design moderno, ottimizzazione SEO avanzata e integrazione con social media per massimizzare la visibilità online.
              </p>
            </div>
            
            <div className="feature-card">
              <h3 className="feature-title">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                </div>
                E-commerce
              </h3>
              <p className="feature-description">
                Piattaforme di vendita online complete con catalogo prodotti avanzato, sistema di pagamento sicuro, gestione ordini e integrazione con marketplace per espandere il tuo business.
              </p>
            </div>
            
            <div className="feature-card">
              <h3 className="feature-title">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                </div>
                Restyling
              </h3>
              <p className="feature-description">
                Modernizzazione e aggiornamento dei siti esistenti. Miglioramento del design, ottimizzazione delle performance, aggiornamento tecnologico e miglioramento dell'esperienza utente.
              </p>
            </div>
            
            <div className="feature-card">
              <h3 className="feature-title">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                </div>
                Digital Marketing
              </h3>
              <p className="feature-description">
                Strategie di marketing digitale personalizzate: SEO, Google Ads, social media marketing, email marketing e content marketing per aumentare traffico e conversioni.
              </p>
            </div>
            
            <div className="feature-card">
              <h3 className="feature-title">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                Sistemi di Prenotazione
              </h3>
              <p className="feature-description">
                Sistemi di prenotazione online personalizzati per ristoranti, saloni, studi medici e B&B. Gestione calendari, notifiche automatiche e pannello amministrativo completo.
              </p>
            </div>
            
            <div className="feature-card">
              <h3 className="feature-title">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                    <line x1="9" y1="9" x2="9.01" y2="9"/>
                    <line x1="15" y1="9" x2="15.01" y2="9"/>
                  </svg>
                </div>
                Brand Identity
              </h3>
              <p className="feature-description">
                Creazione e gestione dell'identità visiva completa: logo design, palette colori, font, materiali stampa e linee guida per mantenere coerenza in tutti i canali.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prices Section */}
      <section id="prices" className="prices">
        <div className="prices-background">
          <div className="prices-pattern"></div>
        </div>
        
        <div className="prices-container">
          <div className="section-header">
            <div className="prices-badge">
              <span>💰 Prezzi</span>
            </div>
            <h2 className="section-title">
              Soluzioni alla portata di tutti
            </h2>
            <p className="section-subtitle">
              Inizia pagando solo il 20% del costo totale
            </p>
            <p className="prices-intro">
              Piani flessibili e trasparenti, senza sorprese. Ogni pacchetto include tutto quello che serve per far crescere il tuo business online.
            </p>
          </div>
          
          <div className="prices-grid">
            <div className="price-card" data-aos="fade-up" data-aos-delay="100">
              <div className="price-card-glow"></div>
              <div className="price-header">
                <div className="price-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9,22 9,12 15,12 15,22"/>
                  </svg>
                </div>
                <h3 className="price-title">Sito Vetrina</h3>
                <p className="price-description">Ideale per attività locali, professionisti e artisti che vogliono presentarsi online</p>
                <div className="price-amount">
                  <span className="price-currency">€</span>
                  <span className="price-value">400-500</span>
                </div>
                <div className="price-discount">
                  <span className="discount-badge">🎉 10% sconto primo progetto</span>
                </div>
              </div>
              
              <div className="price-features">
                <div className="price-feature">
                  <div className="price-feature-icon">✓</div>
                  <span>Fino a 5 pagine personalizzate</span>
                </div>
                <div className="price-feature">
                  <div className="price-feature-icon">✓</div>
                  <span>Design responsive e moderno</span>
                </div>
                <div className="price-feature">
                  <div className="price-feature-icon">✓</div>
                  <span>Modulo di contatto avanzato</span>
                </div>
                <div className="price-feature">
                  <div className="price-feature-icon">✓</div>
                  <span>Ottimizzazione SEO base</span>
                </div>
                <div className="price-feature">
                  <div className="price-feature-icon">✓</div>
                  <span>Pannello di gestione</span>
                </div>
                <div className="price-feature">
                  <div className="price-feature-icon">✓</div>
                  <span>Supporto tecnico incluso</span>
                </div>
              </div>
              
              <button className="price-button">
                <span>Chiedi preventivo</span>
                <svg className="button-arrow" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div className="price-card featured" data-aos="fade-up" data-aos-delay="200">
              <div className="price-card-glow"></div>
              <div className="featured-badge">Più Popolare</div>
              <div className="price-header">
                <div className="price-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/>
                    <rect x="3" y="10" width="18" height="12" rx="2"/>
                  </svg>
                </div>
                <h3 className="price-title">Sito Prenotazioni</h3>
                <p className="price-description">Perfetto per ristoranti, saloni, studi medici e B&B che vogliono gestire le prenotazioni online</p>
                <div className="price-amount">
                  <span className="price-currency">€</span>
                  <span className="price-value">600-1.4k</span>
                </div>
                <div className="price-discount">
                  <span className="discount-badge">🎉 10% sconto primo progetto</span>
                </div>
              </div>
              
              <div className="price-features">
                <div className="price-feature">
                  <div className="price-feature-icon">✓</div>
                  <span>Tutto del sito vetrina</span>
                </div>
                <div className="price-feature">
                  <div className="price-feature-icon">✓</div>
                  <span>Sistema di prenotazione avanzato</span>
                </div>
                <div className="price-feature">
                  <div className="price-feature-icon">✓</div>
                  <span>Notifiche email automatiche</span>
                </div>
                <div className="price-feature">
                  <div className="price-feature-icon">✓</div>
                  <span>Pannello di gestione completo</span>
                </div>
                <div className="price-feature">
                  <div className="price-feature-icon">✓</div>
                  <span>Integrazione calendario</span>
                </div>
                <div className="price-feature">
                  <div className="price-feature-icon">✓</div>
                  <span>Gestione disponibilità in tempo reale</span>
                </div>
              </div>
              
              <button className="price-button featured">
                <span>Chiedi preventivo</span>
                <svg className="button-arrow" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div className="price-card" data-aos="fade-up" data-aos-delay="300">
              <div className="price-card-glow"></div>
              <div className="price-header">
                <div className="price-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                </div>
                <h3 className="price-title">Sito E-commerce</h3>
                <p className="price-description">Per vendere online in modo semplice e veloce, con gestione completa del negozio</p>
                <div className="price-amount">
                  <span className="price-currency">€</span>
                  <span className="price-value">800-1.6k</span>
                </div>
                <div className="price-discount">
                  <span className="discount-badge">🎉 10% sconto primo progetto</span>
                </div>
              </div>
              
              <div className="price-features">
                <div className="price-feature">
                  <div className="price-feature-icon">✓</div>
                  <span>Tutto del sito vetrina</span>
                </div>
                <div className="price-feature">
                  <div className="price-feature-icon">✓</div>
                  <span>Catalogo prodotti illimitato</span>
                </div>
                <div className="price-feature">
                  <div className="price-feature-icon">✓</div>
                  <span>Carrello e sistema di pagamento</span>
                </div>
                <div className="price-feature">
                  <div className="price-feature-icon">✓</div>
                  <span>Gestione ordini e spedizioni</span>
                </div>
                <div className="price-feature">
                  <div className="price-feature-icon">✓</div>
                  <span>Pannello amministrativo completo</span>
                </div>
                <div className="price-feature">
                  <div className="price-feature-icon">✓</div>
                  <span>Integrazione con corrieri</span>
                </div>
              </div>
              
              <button className="price-button">
                <span>Chiedi preventivo</span>
                <svg className="button-arrow" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="prices-note">
            <div className="note-card">
              <div className="note-icon">💡</div>
              <p>Non sai quale fa per te? <a href="#contact">Scrivici</a> e ti aiutiamo a scegliere il pacchetto giusto per le tue esigenze.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="contact-container">
          <div className="contact-content">
            <div className="contact-badge">
              <span>📞 Contatti</span>
            </div>
            
            <h2 className="contact-title">
              Contattaci
            </h2>
            
            <p className="contact-description">
              Compila il form e facci qualsiasi domanda, il nostro team ti risponderà il prima possibile!
            </p>
            
            <div className="contact-info">
              <div className="contact-card">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div className="contact-details">
                  <h4>E-mail</h4>
                  <p>nemowebagency@gmail.com</p>
                </div>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div className="contact-details">
                  <h4>Numero di telefono</h4>
                  <p>Italia +39 3465745184</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Il tuo nome"
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="la-tua-email@esempio.com"
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Messaggio</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="4"
                  placeholder="Raccontaci del tuo progetto..."
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-button">
                Invia
                <svg className="submit-arrow" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
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
              <a href="#" className="social-link" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.875-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.175-1.297-.49-.369-.315-.49-.753-.49-1.243 0-.49.121-.928.49-1.243.369-.315.807-.49 1.297-.49s.928.175 1.297.49c.369.315.49.753.49 1.243 0 .49-.121.928-.49 1.243-.369.315-.807.49-1.297.49z"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="TikTok">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
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
    </div>
  );
};

export default HomePage; 