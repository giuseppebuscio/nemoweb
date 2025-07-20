import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './HomePage.css';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="homepage">
      <Navbar />

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
      <Footer />
    </div>
  );
};

export default HomePage; 