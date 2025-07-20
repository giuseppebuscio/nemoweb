import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ContattiPage.css';

const ContattiPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    service: 'web-design'
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Qui andrebbe la logica per inviare il form
    console.log('Form submitted:', formData);
    alert('Grazie per averci contattato! Ti risponderemo presto.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
      service: 'web-design'
    });
  };

  const contactInfo = [
    {
      icon: "📧",
      title: "Email",
      value: "info@nemoagency.it",
      link: "mailto:info@nemoagency.it"
    },
    {
      icon: "📞",
      title: "Telefono",
      value: "+39 123 456 7890",
      link: "tel:+391234567890"
    },
    {
      icon: "📍",
      title: "Indirizzo",
      value: "Via Roma 123, Milano, Italia",
      link: "https://maps.google.com"
    },
    {
      icon: "⏰",
      title: "Orari",
      value: "Lun-Ven: 9:00-18:00",
      link: null
    }
  ];

  const socialLinks = [
    {
      icon: "📘",
      name: "Facebook",
      url: "https://facebook.com"
    },
    {
      icon: "📷",
      name: "Instagram",
      url: "https://instagram.com"
    },
    {
      icon: "💼",
      name: "LinkedIn",
      url: "https://linkedin.com"
    },
    {
      icon: "🐦",
      name: "Twitter",
      url: "https://twitter.com"
    }
  ];

  return (
    <div className={`contatti-page ${isVisible ? 'visible' : ''}`}>
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container two-columns">
          <div className="hero-content">
            <div className="hero-badge">
              <span>📞 Contattaci</span>
            </div>
            
            <h1 className="hero-title">
              Iniziamo a lavorare sul tuo
              <span className="gradient-text"> progetto</span>
            </h1>
            
            <p className="hero-subtitle">
              Siamo qui per aiutarti a trasformare la tua idea in realtà digitale. 
              Contattaci per una consulenza gratuita e senza impegno.
            </p>
          </div>
          <div className="hero-image">
            <img src="/chisiamo.jpg" alt="Team al lavoro" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-container">
              <div className="form-header">
                <h2 className="form-title">Invia un messaggio</h2>
                <p className="form-subtitle">
                  Compila il form qui sotto e ti risponderemo entro 24 ore
                </p>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Nome completo *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">Telefono</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company" className="form-label">Azienda</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="service" className="form-label">Servizio di interesse</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="web-design">Web Design</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="seo">SEO & Marketing</option>
                    <option value="maintenance">Manutenzione</option>
                    <option value="consulting">Consulenza</option>
                    <option value="other">Altro</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Messaggio *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-textarea"
                    rows="5"
                    placeholder="Raccontaci del tuo progetto..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-button">
                  Invia Messaggio
                  <svg className="arrow-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="contact-info-container">
              <div className="info-header">
                <h2 className="info-title">Informazioni di contatto</h2>
                <p className="info-subtitle">
                  Siamo sempre disponibili per aiutarti. Contattaci con il metodo che preferisci.
                </p>
              </div>

              <div className="contact-info-list">
                {contactInfo.map((info, index) => (
                  <div key={index} className="contact-info-item">
                    <div className="info-icon">{info.icon}</div>
                    <div className="info-content">
                      <h3 className="info-label">{info.title}</h3>
                      {info.link ? (
                        <a href={info.link} className="info-value link">
                          {info.value}
                        </a>
                      ) : (
                        <span className="info-value">{info.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="social-section">
                <h3 className="social-title">Seguici sui social</h3>
                <div className="social-links">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      <span className="social-icon">{social.icon}</span>
                      <span className="social-name">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="faq-container">
          <div className="section-header">
            <div className="section-badge">
              <span>❓ Domande Frequenti</span>
            </div>
            <h2 className="section-title">
              Risposte alle domande più
              <span className="gradient-text"> comuni</span>
            </h2>
          </div>

          <div className="faq-grid">
            <div className="faq-item">
              <h3 className="faq-question">Quanto tempo ci vuole per completare un progetto?</h3>
              <p className="faq-answer">
                I tempi variano in base alla complessità del progetto. Un sito web semplice 
                può essere completato in 2-3 settimane, mentre progetti più complessi 
                possono richiedere 4-8 settimane.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">Offrite consulenza gratuita?</h3>
              <p className="faq-answer">
                Sì, offriamo una consulenza iniziale gratuita per valutare le tue esigenze 
                e proporre la soluzione migliore per il tuo progetto.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">Lavorate con clienti internazionali?</h3>
              <p className="faq-answer">
                Assolutamente! Lavoriamo con clienti da tutto il mondo e siamo 
                specializzati nella creazione di siti web multilingua.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">Fornite supporto post-lancio?</h3>
              <p className="faq-answer">
                Sì, tutti i nostri progetti includono supporto post-lancio e 
                possiamo offrire servizi di manutenzione continua.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="map-container">
          <div className="map-content">
            <div className="map-info">
              <h2 className="map-title">Vieni a trovarci</h2>
              <p className="map-description">
                Siamo sempre felici di incontrare i nostri clienti di persona. 
                Vieni a trovarci nel nostro ufficio a Milano.
              </p>
              <div className="map-address">
                <strong>Nemo Agency</strong><br />
                Via Roma 123<br />
                20100 Milano, Italia
              </div>
              <button className="map-button">
                Apri in Google Maps
                <svg className="arrow-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="map-placeholder">
              <div className="map-image">
                <span className="map-icon">🗺️</span>
                <p>Mappa interattiva</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ContattiPage; 