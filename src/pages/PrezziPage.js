import React, { useState, useEffect } from 'react';
import './PrezziPage.css';

const PrezziPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const pricingPlans = [
    {
      name: "Starter",
      description: "Perfetto per piccole attività e progetti personali",
      monthlyPrice: 299,
      annualPrice: 249,
      features: [
        "Sito web responsive",
        "Fino a 5 pagine",
        "Design personalizzato",
        "Form di contatto",
        "Integrazione social media",
        "Supporto email",
        "Tempo di consegna: 2-3 settimane"
      ],
      popular: false,
      icon: "🚀"
    },
    {
      name: "Professional",
      description: "Ideale per aziende in crescita e attività commerciali",
      monthlyPrice: 599,
      annualPrice: 499,
      features: [
        "Tutto del piano Starter",
        "Fino a 10 pagine",
        "Blog integrato",
        "SEO base",
        "Google Analytics",
        "Integrazione newsletter",
        "Supporto telefonico",
        "Tempo di consegna: 3-4 settimane"
      ],
      popular: true,
      icon: "💼"
    },
    {
      name: "Enterprise",
      description: "Soluzioni complete per grandi aziende e e-commerce",
      monthlyPrice: 999,
      annualPrice: 849,
      features: [
        "Tutto del piano Professional",
        "Pagine illimitate",
        "E-commerce completo",
        "SEO avanzato",
        "Integrazione CRM",
        "Backup automatico",
        "Supporto prioritario",
        "Tempo di consegna: 4-6 settimane"
      ],
      popular: false,
      icon: "🏢"
    }
  ];

  const addOns = [
    {
      name: "Manutenzione Mensile",
      description: "Aggiornamenti, backup e monitoraggio continuo",
      price: 99,
      icon: "🔧"
    },
    {
      name: "SEO Avanzato",
      description: "Ottimizzazione completa per i motori di ricerca",
      price: 199,
      icon: "📈"
    },
    {
      name: "Integrazione CMS",
      description: "Sistema di gestione contenuti personalizzato",
      price: 299,
      icon: "📝"
    },
    {
      name: "Supporto 24/7",
      description: "Assistenza tecnica disponibile sempre",
      price: 149,
      icon: "🆘"
    }
  ];

  return (
    <div className={`prezzi-page ${isVisible ? 'visible' : ''}`}>
      {/* Header */}
      <header className="page-header">
        <div className="header-container">
          <div className="logo">
            <img src="/Bianco-Arancio.png" alt="Nemo Agency Logo" className="logo-image" />
          </div>
          
          <nav className="nav">
            <ul className="nav-list">
              <li><a href="/" className="nav-link">Home</a></li>
              <li><a href="/servizi" className="nav-link">Servizi</a></li>
              <li><a href="/prezzi" className="nav-link active">Prezzi</a></li>
              <li><a href="/chi-siamo" className="nav-link">Chi Siamo</a></li>
              <li><a href="/contatti" className="nav-link">Contatti</a></li>
            </ul>
          </nav>

          <div className="header-cta">
            <button className="cta-button">Contattaci</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>💰 Prezzi Trasparenti</span>
            </div>
            
            <h1 className="hero-title">
              Scegli il piano perfetto per il tuo
              <span className="gradient-text"> progetto</span>
            </h1>
            
            <p className="hero-subtitle">
              Prezzi chiari e competitivi per ogni esigenza. 
              Nessuna sorpresa nascosta, solo qualità garantita.
            </p>

            {/* Billing Toggle */}
            <div className="billing-toggle">
              <span className={!isAnnual ? 'active' : ''}>Mensile</span>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={isAnnual}
                  onChange={() => setIsAnnual(!isAnnual)}
                />
                <span className="toggle-slider"></span>
              </label>
              <span className={isAnnual ? 'active' : ''}>
                Annuale
                <span className="discount-badge">-20%</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="pricing-section">
        <div className="pricing-container">
          <div className="pricing-grid">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && (
                  <div className="popular-badge">
                    <span>Più Popolare</span>
                  </div>
                )}
                
                <div className="plan-header">
                  <div className="plan-icon">{plan.icon}</div>
                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-description">{plan.description}</p>
                </div>

                <div className="plan-price">
                  <div className="price-amount">
                    €{isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </div>
                  <div className="price-period">
                    {isAnnual ? '/mese' : '/mese'}
                  </div>
                  {isAnnual && (
                    <div className="annual-savings">
                      Risparmi €{(plan.monthlyPrice - plan.annualPrice) * 12}/anno
                    </div>
                  )}
                </div>

                <ul className="plan-features">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="plan-feature">
                      <span className="feature-check">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className={`plan-cta ${plan.popular ? 'popular' : ''}`}>
                  Scegli {plan.name}
                  <svg className="arrow-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="addons-section">
        <div className="addons-container">
          <div className="section-header">
            <div className="section-badge">
              <span>➕ Servizi Aggiuntivi</span>
            </div>
            <h2 className="section-title">
              Personalizza il tuo piano con i nostri
              <span className="gradient-text"> servizi extra</span>
            </h2>
          </div>

          <div className="addons-grid">
            {addOns.map((addon, index) => (
              <div key={index} className="addon-card">
                <div className="addon-icon">{addon.icon}</div>
                <h3 className="addon-name">{addon.name}</h3>
                <p className="addon-description">{addon.description}</p>
                <div className="addon-price">€{addon.price}/mese</div>
                <button className="addon-cta">
                  Aggiungi
                  <svg className="arrow-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            ))}
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
              Tutto quello che devi sapere sui nostri
              <span className="gradient-text"> prezzi</span>
            </h2>
          </div>

          <div className="faq-grid">
            <div className="faq-item">
              <h3 className="faq-question">Posso cambiare piano in qualsiasi momento?</h3>
              <p className="faq-answer">
                Sì, puoi aggiornare o modificare il tuo piano in qualsiasi momento. 
                Le modifiche saranno applicate dal prossimo ciclo di fatturazione.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">C'è un periodo di prova gratuito?</h3>
              <p className="faq-answer">
                Offriamo una consulenza iniziale gratuita per valutare le tue esigenze 
                e proporre la soluzione migliore per il tuo progetto.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">I prezzi includono l'hosting?</h3>
              <p className="faq-answer">
                Sì, tutti i nostri piani includono hosting di qualità, certificati SSL 
                e backup automatici per garantire la massima sicurezza.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">Fornite supporto tecnico?</h3>
              <p className="faq-answer">
                Assolutamente! Ogni piano include supporto tecnico. I piani superiori 
                includono supporto prioritario e assistenza telefonica.
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
              Iniziamo a costruire il tuo
              <span className="cta-gradient-text"> progetto</span>
            </h2>
            
            <p className="cta-description">
              Contattaci per una consulenza gratuita e scopri quale piano 
              è perfetto per le tue esigenze
            </p>
            
            <div className="cta-buttons">
              <button className="cta-primary-button">
                Richiedi Consulenza
                <svg className="cta-arrow-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="cta-secondary-button">
                Scopri i Servizi
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrezziPage; 