import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ChiSiamoPage.css';

const ChiSiamoPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTimelineIndex, setCurrentTimelineIndex] = useState(0);
  const timelineRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollTimeline = (direction) => {
    const container = timelineRef.current;
    if (!container) return;
    
    const cardWidth = container.querySelector('.timeline-item').offsetWidth;
    const gap = 32; // gap tra le card
    const scrollAmount = cardWidth + gap;
    
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
      setCurrentTimelineIndex(prev => Math.max(0, prev - 1));
    } else {
      container.scrollLeft += scrollAmount;
      setCurrentTimelineIndex(prev => Math.min(milestones.length - 1, prev + 1));
    }
  };

  const teamMembers = [
    {
      name: "Giuseppe Buscio",
      role: "Founder e Sviluppatore",
      description: "Esperto di sviluppo web e strategia digitale con passione per le tecnologie moderne",
      image: "👨‍💻",
      skills: ["React/Next.js", "Node.js", "Strategia Digitale"]
    },
    {
      name: "Valeria Quattrone",
      role: "Founder e Sviluppatore",
      description: "Sviluppatrice creativa specializzata in UX/UI design e sviluppo frontend",
      image: "👩‍💻",
      skills: ["UX/UI Design", "React", "Creative Development"]
    },
    {
      name: "Alessia Scopelliti",
      role: "Founder",
      description: "Specialista in strategia aziendale e sviluppo business con focus sull'innovazione",
      image: "👩‍💼",
      skills: ["Business Strategy", "Innovation", "Leadership"]
    },
    {
      name: "Luca Cristarella",
      role: "Founder",
      description: "Esperto in digital marketing e strategie di crescita per startup e aziende",
      image: "👨‍💼",
      skills: ["Digital Marketing", "Growth Hacking", "SEO/SEM"]
    }
  ];

  const values = [
    {
      icon: "🎯",
      title: "Passione",
      description: "Mettiamo passione in ogni progetto, grande o piccolo che sia"
    },
    {
      icon: "🤝",
      title: "Collaborazione",
      description: "Lavoriamo insieme ai nostri clienti per raggiungere risultati straordinari"
    },
    {
      icon: "💡",
      title: "Innovazione",
      description: "Sempre alla ricerca delle migliori tecnologie e soluzioni"
    },
    {
      icon: "⭐",
      title: "Qualità",
      description: "Non accettiamo compromessi quando si tratta di qualità"
    }
  ];

  const milestones = [
    {
      year: "2019",
      title: "Nascita di Nemo",
      description: "Fondazione dell'azienda con la missione di creare siti web di qualità"
    },
    {
      year: "2020",
      title: "Primi 50 Progetti",
      description: "Raggiungimento dei primi 50 progetti completati con successo"
    },
    {
      year: "2021",
      title: "Espansione Team",
      description: "Crescita del team e apertura di nuovi servizi specializzati"
    },
    {
      year: "2022",
      title: "100+ Clienti",
      description: "Superamento dei 100 clienti soddisfatti e consolidamento del brand"
    },
    {
      year: "2023",
      title: "Innovazione",
      description: "Introduzione di nuove tecnologie e metodologie di sviluppo"
    },
    {
      year: "2024",
      title: "Futuro",
      description: "Pianificazione di nuove sfide e obiettivi ambiziosi"
    }
  ];

  return (
    <div className={`chi-siamo-page ${isVisible ? 'visible' : ''}`}>
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>💡 Chi Siamo</span>
            </div>
            
            <h1 className="hero-title">
              La nostra storia e la passione per il
              <span className="gradient-text"> web design</span>
            </h1>
            
            <p className="hero-subtitle">
              Dal 2019 creiamo esperienze digitali straordinarie per aziende 
              che vogliono distinguersi online
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="story-container">
          <div className="story-content">
            <div className="story-text">
              <div className="section-badge">
                <span>📖 La Nostra Storia</span>
              </div>
              
              <h2 className="section-title">
                Come tutto è iniziato
              </h2>
              
              <p className="story-description">
                Nemo è nata dalla passione per il web design e dalla convinzione che ogni azienda 
                meriti un sito web straordinario. Nel 2019, un piccolo team di professionisti 
                si è unito con l'obiettivo di creare esperienze digitali che non solo fossero 
                belle da vedere, ma anche funzionali e performanti.
              </p>
              
              <p className="story-description">
                Oggi, dopo oltre 100 progetti completati e altrettanti clienti soddisfatti, 
                continuiamo a crescere e innovare, sempre mantenendo al centro la qualità 
                e l'attenzione ai dettagli che ci ha caratterizzato fin dall'inizio.
              </p>
            </div>
            
            <div className="story-visual">
              <div className="story-image">
                <img src="/chisiamo.jpg" alt="Il nostro team al lavoro" />
                <div className="image-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="values-container">
          <div className="section-header">
            <div className="section-badge">
              <span>🎯 I Nostri Valori</span>
            </div>
            <h2 className="section-title">
              I principi che guidano il nostro
              <span className="gradient-text"> lavoro</span>
            </h2>
          </div>

          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="team-container">
          <div className="section-header">
            <div className="section-badge">
              <span>👥 Il Nostro Team</span>
            </div>
            <h2 className="section-title">
              Conosci le persone dietro i
              <span className="gradient-text"> progetti</span>
            </h2>
          </div>

          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="member-avatar">{member.image}</div>
                <h3 className="member-name">{member.name}</h3>
                <div className="member-role">{member.role}</div>
                <p className="member-description">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="timeline-container">
          <div className="section-header">
            <div className="section-badge">
              <span>📅 La Nostra Strada</span>
            </div>
            <h2 className="section-title">
              I momenti che hanno segnato la nostra
              <span className="gradient-text"> crescita</span>
            </h2>
          </div>

          <div className="timeline-wrapper">
            <div className="timeline" ref={timelineRef}>
              {milestones.map((milestone, index) => (
                <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                  <div className="timeline-content">
                    <div className="timeline-year">{milestone.year}</div>
                    <h3 className="timeline-title">{milestone.title}</h3>
                    <p className="timeline-description">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="timeline-nav-button left-arrow" onClick={() => scrollTimeline('left')}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="timeline-nav-button right-arrow" onClick={() => scrollTimeline('right')}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stats-grid">
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
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Supporto Disponibile</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <div className="cta-badge">
              <span>🚀 Pronto a Lavorare Insieme?</span>
            </div>
            
            <h2 className="cta-title">
              Iniziamo a costruire qualcosa di
              <span className="cta-gradient-text"> straordinario</span>
            </h2>
            
            <p className="cta-description">
              Unisciti ai nostri clienti soddisfatti e scopri come possiamo 
              trasformare la tua visione in realtà digitale
            </p>
            
            <div className="cta-buttons">
              <button className="cta-primary-button">
                Inizia il Progetto
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ChiSiamoPage; 