import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ServiziPage.css';

const ServiziPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
      <section className="hero-section">
        <div className="hero-container two-columns">
          <div className="hero-content">
            <div className="hero-badge">
              <span>🛠️ I Nostri Servizi</span>
            </div>
            
            <h1 className="hero-title">
              Soluzioni complete per il tuo
              <span className="gradient-text"> successo digitale</span>
            </h1>
            
            <p className="hero-subtitle">
              Dalla progettazione alla realizzazione, dal lancio alla manutenzione: 
              ti accompagniamo in ogni fase del tuo progetto web
            </p>
          </div>
          <div className="hero-image">
            <img src="/chisiamo.jpg" alt="Team al lavoro" />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-section">
        <div className="services-container">
          <div className="services-header" style={{textAlign: 'center', marginBottom: '60px'}}>
            <div className="section-badge">
              <span>🔍 Cosa Facciamo</span>
            </div>
            <h2 className="section-title">I nostri servizi digitali</h2>
            <p className="section-subtitle" style={{color: '#4a5568', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto'}}>
              Dalla progettazione grafica allo sviluppo, dalla SEO al marketing: scopri tutte le soluzioni che possiamo offrirti per far crescere il tuo business online.
            </p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="service-feature">
                      <span className="feature-check">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="service-cta">
                  Scopri di più
                  <svg className="arrow-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="process-container">
          <div className="section-header">
            <div className="section-badge">
              <span>📋 Il Nostro Processo</span>
            </div>
            <h2 className="section-title">
              Come lavoriamo per realizzare il tuo
              <span className="gradient-text"> progetto perfetto</span>
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
            
            <h2 className="cta-title">
              Iniziamo a lavorare sul tuo
              <span className="cta-gradient-text"> progetto</span>
            </h2>
            
            <p className="cta-description">
              Contattaci per una consulenza gratuita e scopri come possiamo 
              trasformare la tua idea in realtà digitale
            </p>
            
            <div className="cta-buttons">
              <button className="cta-primary-button">
                Richiedi Consulenza
                <svg className="cta-arrow-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="cta-secondary-button">
                Scopri i Prezzi
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