import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ServiziPage.css';

const ServiziPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Intersection Observer per animazioni di scroll
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
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
      '.hero-image-coherent',
      '.section-header',
      '.feature-card'
    ];

    animatedElements.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        observer.observe(element);
      });
    });

    return () => observer.disconnect();
  }, []);

  const handleRichiediPreventivo = () => {
    navigate('/richiedi-preventivo');
  };

  const handleContattaci = () => {
    navigate('/contatti');
  };

  const services = [
    {
      icon: "🎨",
      title: "Web Design",
      description: "Design moderno e responsive che cattura l'attenzione dei tuoi visitatori",
      features: ["Design personalizzato", "Responsive design", "UI/UX ottimizzata", "Prototipi interattivi"]
    },
    {
      icon: "💻",
      title: "Sviluppo Web",
      description: "Siti web performanti e funzionali realizzati con tecnologie moderne",
      features: ["React/Next.js", "Performance ottimizzate", "SEO friendly", "Integrazione CMS"]
    },
    {
      icon: "📱",
      title: "E-commerce",
      description: "Soluzioni complete per vendere online con sicurezza e facilità",
      features: ["Catalogo prodotti", "Gestione ordini", "Pagamenti sicuri", "Analytics avanzate"]
    },
    {
      icon: "🚀",
      title: "SEO & Marketing",
      description: "Strategie per aumentare la visibilità e raggiungere più clienti",
      features: ["Ottimizzazione SEO", "Google Ads", "Social Media", "Content Marketing"]
    },
    {
      icon: "🔧",
      title: "Manutenzione",
      description: "Supporto continuo per mantenere il tuo sito sempre aggiornato e sicuro",
      features: ["Aggiornamenti regolari", "Backup automatici", "Monitoraggio sicurezza", "Supporto tecnico"]
    },
    {
      icon: "📊",
      title: "Analytics",
      description: "Analisi dettagliate per comprendere il comportamento dei tuoi utenti",
      features: ["Google Analytics", "Report personalizzati", "A/B Testing", "Conversion tracking"]
    }
  ];

  return (
    <div className={`servizi-page ${isVisible ? 'visible' : ''}`}>
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section hero-coherent">
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
        
        <div className="hero-container two-columns hero-container-coherent">
          <div className="hero-content hero-content-coherent">
            <div className="hero-badge hero-badge-coherent">
              <span>🛠️ I Nostri Servizi</span>
            </div>
            
            <h1 className="hero-title hero-title-coherent">
              Soluzioni per il tuo
              <span className="gradient-text gradient-text-coherent"> successo digitale</span>
            </h1>
            
            <p className="hero-subtitle hero-subtitle-coherent">
              Dalla progettazione alla realizzazione, dal lancio alla manutenzione: 
              ti accompagniamo in ogni fase del tuo progetto web
            </p>
          </div>
          <div className="hero-image hero-image-coherent">
            <img src="/2.jpg" alt="Team al lavoro" />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-section">
        <div className="services-container">
          <div className="section-header">
            <h2 className="section-title">I nostri servizi digitali</h2>
            <p className="section-subtitle">
              Dalla progettazione grafica allo sviluppo, dalla SEO al marketing: scopri tutte le soluzioni che possiamo offrirti per far crescere il tuo business online.
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

      {/* Process Section */}
      <section className="process-section">
        <div className="process-container">
          <div className="section-header">
            <div className="cta-badge">
              <span>📋 Il Nostro Processo</span>
            </div>
            <h2 className="cta-title">
              Come lavoriamo per il tuo
              <span className="cta-gradient-text"> progetto perfetto</span>
            </h2>
          </div>

          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">01</div>
              <h3 className="step-title">Consulenza</h3>
              <p className="step-description">
                Analizziamo le tue esigenze e definiamo insieme gli obiettivi del progetto
              </p>
            </div>
            <div className="process-step">
              <div className="step-number">02</div>
              <h3 className="step-title">Progettazione</h3>
              <p className="step-description">
                Creiamo wireframe e mockup per visualizzare la struttura e il design
              </p>
            </div>
            <div className="process-step">
              <div className="step-number">03</div>
              <h3 className="step-title">Sviluppo</h3>
              <p className="step-description">
                Realizziamo il sito web con tecnologie moderne e ottimizzate
              </p>
            </div>
            <div className="process-step">
              <div className="step-number">04</div>
              <h3 className="step-title">Lancio</h3>
              <p className="step-description">
                Pubblichiamo il sito e monitoriamo le performance per garantire il successo
              </p>
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
            
            <h2 className="section-title">
              Iniziamo a lavorare sul tuo
              <span className="gradient-text"> progetto</span>
            </h2>
            
            <p className="section-subtitle">
              Contattaci per una consulenza gratuita e scopri come possiamo 
              trasformare la tua idea in realtà digitale
            </p>
            
            <div className="cta-buttons">
              <button className="cta-primary-button" onClick={handleRichiediPreventivo}>
                Richiedi Preventivo
                <svg className="cta-arrow-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="cta-secondary-button" onClick={handleContattaci}>
                Contattaci
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ServiziPage; 