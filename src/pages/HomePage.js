import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const backgroundImages = [
    '/1.jpg',
    '/2.jpg',
    '/3.jpg'
  ];

  // Carosello automatico
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Cambia immagine ogni 5 secondi

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  // Mouse tracking per effetti parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animazione numeri statistiche
  useEffect(() => {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statNumbers = entry.target.querySelectorAll('.stat-number');
          statNumbers.forEach(statNumber => {
            const target = parseInt(statNumber.getAttribute('data-target'));
            const duration = 2000; // 2 secondi
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
              current += step;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              statNumber.textContent = Math.floor(current);
            }, 16);
          });
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, []);

  // Carosello automatico loghi
  useEffect(() => {
    const logosTrack = document.querySelector('.logos-track');
    if (!logosTrack) return;

    let animationId;
    let currentPosition = 0;
    const logoWidth = 320; // Larghezza di ogni logo + gap (300px + 20px gap) per schermo intero
    const totalLogos = 16; // Numero totale di loghi unici (15 reali + 1 duplicato per il loop)
    const visibleLogos = 5; // Loghi visibili su desktop

    const animateLogos = () => {
      currentPosition -= 0.5; // Velocità di scorrimento
      
      // Reset per loop infinito
      if (currentPosition <= -(totalLogos * logoWidth)) {
        currentPosition = 0;
      }
      
      logosTrack.style.transform = `translateX(${currentPosition}px)`;
      animationId = requestAnimationFrame(animateLogos);
    };

    // Avvia animazione solo su desktop
    const startAnimation = () => {
      if (window.innerWidth > 768) {
        animateLogos();
      }
    };

    // Pausa animazione su mobile
    const pauseAnimation = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };

    // Gestione responsive
    const handleResize = () => {
      if (window.innerWidth > 768) {
        startAnimation();
      } else {
        pauseAnimation();
        currentPosition = 0;
        logosTrack.style.transform = 'translateX(0)';
      }
    };

    // Avvia animazione iniziale
    startAnimation();

    // Gestione resize
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Intersection Observer per animazioni di scroll
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1, // Si attiva quando il 10% dell'elemento è visibile
      rootMargin: '0px 0px -50px 0px' // Si attiva 50px prima che l'elemento entri completamente
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    // Elementi da osservare per le animazioni
    const animatedElements = [
      '.hero-badge-coherent',
      '.hero-title-coherent',
      '.hero-subtitle-coherent',
      '.hero-buttons-coherent',
      '.hero-image-coherent',
      '.hero-ball',
      '.section-header',
      '.feature-card',
      '.prices-badge',
      '.price-card'
    ];

    animatedElements.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        observer.observe(element);
      });
    });

    return () => observer.disconnect();
  }, []);

  const handleEsploraNemo = () => {
    navigate('/chi-siamo');
  };

  const handleContattaci = () => {
    navigate('/contatti');
  };

  const handleRichiediPreventivo = () => {
    navigate('/richiedi-preventivo');
  };

  const handlePriceCardPreventivo = () => {
    navigate('/richiedi-preventivo');
  };

  return (
    <div className="home-page">
      <Navbar />
      
      {/* Hero Section coerente con il resto della pagina */}
      <section className="hero-coherent">
        {/* Background con pattern coerente */}
        <div className="hero-background-coherent">
          <div className="hero-pattern-coherent"></div>
        </div>
        
        {/* Palline di luce arancione fluttuanti */}
        <div className="hero-floating-balls">
          <div className="hero-ball"></div>
          <div className="hero-ball"></div>
          <div className="hero-ball"></div>
          <div className="hero-ball"></div>
        </div>
        
        {/* Contenuto principale con immagine */}
        <div className="hero-container-coherent">
          <div className="hero-content-coherent">
            {/* Badge con stile coerente */}
            <div className="hero-badge-coherent">
              <span>🚀 Trasforma la tua presenza digitale</span>
            </div>
            
            {/* Titolo principale */}
            <h1 className="hero-title-coherent">
              Creiamo il tuo
              <br />
              <span className="gradient-text-coherent">successo digitale</span>
            </h1>
            
            {/* Descrizione */}
            <p className="hero-subtitle-coherent">
              Creiamo esperienze digitali che trasformano visitatori in clienti. 
              Design moderno, performance elevate e strategie SEO avanzate per il tuo successo online.
            </p>
            
            {/* CTA Buttons */}
            <div className="hero-buttons-coherent">
              <button className="hero-primary-button" onClick={handleRichiediPreventivo}>
                <span>Inizia il tuo progetto</span>
                <svg className="button-arrow" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <button className="hero-secondary-button" onClick={handleEsploraNemo}>
                <span>Scopri di più</span>
              </button>
            </div>
          </div>
          
          {/* Immagine a destra */}
          <div className="hero-image-coherent">
            <img src="/manpc.png" alt="Uomo al computer" />
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
        {/* Palline fluttuanti decorative */}
        <div className="cta-floating-balls">
          <div className="cta-ball"></div>
          <div className="cta-ball"></div>
          <div className="cta-ball"></div>
          <div className="cta-ball"></div>
        </div>
        
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
              <button className="cta-primary-button" onClick={handleRichiediPreventivo}>
                Richiedi Preventivo
                <svg className="cta-arrow-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
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
            <p className="prices-intro">
            Inizia pagando solo il 20% del costo totale
            </p>
            <p className="section-subtitle">
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
                <div className="price-amount">da 400€</div>
                <p className="price-description">Ideale per attività locali, professionisti e artisti che vogliono presentarsi online</p>
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
              
              <button className="price-button" onClick={handlePriceCardPreventivo}>
                <span>Chiedi preventivo</span>
                <svg className="button-arrow" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div className="price-card" data-aos="fade-up" data-aos-delay="200">
              <div className="price-card-glow"></div>
              <div className="price-header">
                <div className="price-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <h3 className="price-title">Sito Prenotazioni</h3>
                <div className="price-amount">da 1200€</div>
                <p className="price-description">Perfetto per ristoranti, saloni, studi medici e B&B che vogliono gestire le prenotazioni online</p>
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
              
              <button className="price-button" onClick={handlePriceCardPreventivo}>
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
                <div className="price-amount">da 1600€</div>
                <p className="price-description">Per vendere online in modo semplice e veloce, con gestione completa del negozio</p>
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
              
              <button className="price-button" onClick={handlePriceCardPreventivo}>
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
              <p>Non trovi quello che cerchi o hai un progetto specifico? <a href="#" onClick={(e) => { e.preventDefault(); handleContattaci(); }}>Contattaci</a> e ti aiutiamo a scegliere il pacchetto giusto per le tue esigenze.</p>
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

      {/* Trusted By Section */}
      <section className="trusted-by">
        <div className="trusted-by-container">
          <div className="trusted-by-header">
            <h2 className="trusted-by-title">
              Aziende che si fidano di noi
            </h2>
            <p className="trusted-by-subtitle">
              Oltre 15 aziende hanno scelto Nemo per la loro presenza digitale
            </p>
          </div>
          
          <div className="trusted-by-logos">
            <div className="logos-carousel">
              <div className="logos-track">
                {/* Primo set di loghi reali */}
                <div className="logo-item">
                  <img src="/partner/SocialSail.png" alt="SocialSail" className="partner-logo" />
                </div>
                <div className="logo-item">
                  <img src="/partner/AccademiaDelGusto.png" alt="Accademia del Gusto" className="partner-logo" />
                </div>
                <div className="logo-item">
                  <img src="/partner/MangiareSicano.png" alt="Mangiare Sicano" className="partner-logo" />
                </div>
                <div className="logo-item">
                  <img src="/partner/BonifatoCalcio.png" alt="Bonifato Calcio" className="partner-logo" />
                </div>
                <div className="logo-item">
                  <img src="/partner/FigliDItalia.png" alt="Figli d'Italia" className="partner-logo" />
                </div>
                <div className="logo-item">
                  <img src="/partner/DueCLimited.png" alt="DueC Limited" className="partner-logo" />
                </div>
                <div className="logo-item">
                  <img src="/partner/Scopeltour.png" alt="Scopeltour" className="partner-logo" />
                </div>
                <div className="logo-item">
                  <img src="/partner/BarBonventre.png" alt="Bar Bonventre" className="partner-logo" />
                </div>
                <div className="logo-item">
                  <img src="/partner/Riverloop.png" alt="Riverloop" className="partner-logo" />
                </div>
                <div className="logo-item">
                  <img src="/partner/SimoneGrasso.png" alt="Simone Grasso" className="partner-logo" />
                </div>
                <div className="logo-item">
                  <img src="/partner/AndreaAsaro.png" alt="Andrea Asaro" className="partner-logo" />
                </div>
                <div className="logo-item">
                  <img src="/partner/HolidaySicily.png" alt="Holiday Sicily" className="partner-logo" />
                </div>
                <div className="logo-item">
                  <img src="/partner/LivingLab.png" alt="Living Lab" className="partner-logo" />
                </div>
                <div className="logo-item">
                  <img src="/partner/BeYou.png" alt="BeYou" className="partner-logo" />
                </div>
                <div className="logo-item">
                  <img src="/partner/CarlaFerroni.png" alt="Carla Ferroni" className="partner-logo" />
                </div>
                <div className="logo-item">
                  <img src="/partner/ales.png" alt="Ales" className="partner-logo" />
                </div>
                {/* Duplico i primi loghi per un loop infinito */}
                <div className="logo-item">
                  <img src="/partner/SocialSail.png" alt="SocialSail" className="partner-logo" />
                </div>
                <div className="logo-item">
                  <img src="/partner/AccademiaDelGusto.png" alt="Accademia del Gusto" className="partner-logo" />
                </div>
                <div className="logo-item">
                  <img src="/partner/MangiareSicano.png" alt="Mangiare Sicano" className="partner-logo" />
                </div>
                <div className="logo-item">
                  <img src="/partner/BonifatoCalcio.png" alt="Bonifato Calcio" className="partner-logo" />
                </div>
                <div className="logo-item">
                  <img src="/partner/FigliDItalia.png" alt="Figli d'Italia" className="partner-logo" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage; 