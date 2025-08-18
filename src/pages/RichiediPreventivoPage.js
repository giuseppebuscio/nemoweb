import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './RichiediPreventivoPage.css';

const RichiediPreventivoPage = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefono: '',
    azienda: '',
    tipoProgetto: '',
    budget: '',
    descrizione: '',
    urgenza: 'normale'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    // Mostra il messaggio di conferma
    setIsSubmitted(true);
    
    // Scroll verso l'infobox dopo un breve delay per permettere il rendering
    setTimeout(() => {
      const infobox = document.querySelector('.success-infobox');
      if (infobox) {
        infobox.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }, 100);

    // Dopo 9.5 secondi, applica la classe fade-out per l'animazione
    setTimeout(() => {
      const infobox = document.querySelector('.success-infobox');
      if (infobox) {
        infobox.classList.add('fade-out');
      }
    }, 9500);

    // Nasconde completamente l'infobox dopo 10 secondi
    setTimeout(() => {
      setIsSubmitted(false);
    }, 10000);
  };

  return (
    <div className="richiedi-preventivo-page">
      <Navbar />

      {/* Hero Section */}
      <section className="preventivo-hero">
        <div className="preventivo-hero-container">
          <div className="preventivo-hero-content">
            <div className="preventivo-badge">
              <span>💰 Preventivo Gratuito</span>
            </div>
            
            <h1 className="preventivo-hero-title">
              Richiedi il tuo
              <span className="gradient-text"> preventivo personalizzato</span>
            </h1>
            
            <p className="preventivo-hero-subtitle">
              Compila il form e ricevi un preventivo dettagliato per il tuo progetto web. 
              Analizzeremo le tue esigenze e ti proporremo la soluzione migliore.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="preventivo-form-section">
        <div className="preventivo-form-container">
          {/* Infobox di successo - Mostra solo se il form è stato inviato */}
          {isSubmitted && (
            <div className="success-infobox">
              <div className="success-icon-small">✅</div>
              <div className="success-content">
                <h3>Grazie! Il preventivo è stato inviato correttamente.</h3>
                <p>Ti contatteremo entro 24 ore con una proposta personalizzata.</p>
              </div>
            </div>
          )}

          <div className="form-header">
            <h2>Form di Richiesta Preventivo</h2>
            <p>Compila tutti i campi per ricevere un preventivo accurato e personalizzato</p>
          </div>

          <form className="preventivo-form" action="https://formsubmit.co/nemowebagency@gmail.com" method="POST" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nome">Nome e Cognome *</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Il tuo nome completo"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="la-tua-email@esempio.com"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="telefono">Telefono</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="Il tuo numero di telefono"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="azienda">Nome Azienda</label>
                <input
                  type="text"
                  id="azienda"
                  name="azienda"
                  value={formData.azienda}
                  onChange={handleChange}
                  placeholder="Nome della tua azienda"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="tipoProgetto">Tipo di Progetto *</label>
                <select
                  id="tipoProgetto"
                  name="tipoProgetto"
                  value={formData.tipoProgetto}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleziona il tipo di progetto</option>
                  <option value="sito-vetrina">Sito Vetrina</option>
                  <option value="e-commerce">E-commerce</option>
                  <option value="sistema-prenotazioni">Sistema di Prenotazioni</option>
                  <option value="restyling">Restyling Sito Esistente</option>
                  <option value="brand-identity">Brand Identity</option>
                  <option value="digital-marketing">Digital Marketing</option>
                  <option value="altro">Altro</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="budget">Budget Indicativo</label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                >
                  <option value="">Seleziona il budget</option>
                  <option value="300-500">€300 - €500</option>
                  <option value="500-1000">€500 - €1.000</option>
                  <option value="1000-2000">€1.000 - €2.000</option>
                  <option value="2000-5000">€2.000 - €5.000</option>
                  <option value="5000+">€5.000+</option>
                  <option value="da-definire">Da definire</option>
                </select>
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="descrizione">Descrizione del Progetto *</label>
              <textarea
                id="descrizione"
                name="descrizione"
                value={formData.descrizione}
                onChange={handleChange}
                rows="6"
                placeholder="Descrivi il tuo progetto, le funzionalità che desideri, il target di riferimento e qualsiasi altra informazione utile..."
                required
              ></textarea>
            </div>

            <div className="form-group full-width">
              <label htmlFor="urgenza">Urgenza del Progetto</label>
              <select
                id="urgenza"
                name="urgenza"
                value={formData.urgenza}
                onChange={handleChange}
              >
                <option value="normale">Normale (2-4 settimane)</option>
                <option value="urgente">Urgente (1-2 settimane)</option>
                <option value="molto-urgente">Molto urgente (1 settimana)</option>
                <option value="flessibile">Flessibile (più di 1 mese)</option>
              </select>
            </div>

            {/* Campi nascosti per FormSubmit */}
            <input type="hidden" name="_subject" value="Nuova Richiesta Preventivo - NemoWeb" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />

            <div className="form-submit">
              <button type="submit" className="submit-preventivo-button">
                <span>Invia Richiesta Preventivo</span>
                <svg className="submit-arrow" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* Info Section - Ora FUORI dal container del form per estendersi oltre */}
        <div className="preventivo-info-container">
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">⏱️</div>
              <h3>Risposta Rapida</h3>
              <p>Ti risponderemo entro 24 ore con un preventivo dettagliato e personalizzato</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">💡</div>
              <h3>Consulenza Gratuita</h3>
              <p>Analizzeremo le tue esigenze e ti suggeriremo la soluzione migliore</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">🎯</div>
              <h3>Preventivo Personalizzato</h3>
              <p>Ogni preventivo è studiato appositamente per il tuo progetto e budget</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">🚀</div>
              <h3>Inizio Immediato</h3>
              <p>Una volta approvato il preventivo, iniziamo subito a lavorare</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RichiediPreventivoPage;
