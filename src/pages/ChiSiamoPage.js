import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ChiSiamoPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHandshake, faLightbulb, faShieldHalved } from '@fortawesome/free-solid-svg-icons';

const ChiSiamoPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTimelineIndex, setCurrentTimelineIndex] = useState(0);
  const timelineRef = useRef(null);
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    years: 0,
    support: 0
  });
  const [countersStarted, setCountersStarted] = useState(false);

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
      '.hero-image-coherent'
    ];

    animatedElements.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        observer.observe(element);
      });
    });

    return () => observer.disconnect();
  }, []);

  // Counter animation per le statistiche
  useEffect(() => {
    if (countersStarted) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
          setCountersStarted(true);
          animateCounters();
        }
      });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, [countersStarted]);

  const animateCounters = () => {
    const duration = 2000; // 2 secondi
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounters({
        projects: Math.floor(100 * progress),
        clients: Math.floor(98 * progress),
        years: Math.floor(5 * progress),
        support: Math.floor(24 * progress)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setCounters({
          projects: 100,
          clients: 98,
          years: 5,
          support: 24
        });
      }
    }, stepDuration);
  };

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
      image: "👨🏻‍💻",
      skills: ["React/Next.js", "Node.js", "Strategia Digitale"]
    },
    {
      name: "Valeria Quattrone",
      role: "Founder e Sviluppatore",
      description: "Sviluppatrice creativa specializzata in UX/UI design e sviluppo frontend",
      image: "👩🏽‍💻",
      skills: ["UX/UI Design", "React", "Creative Development"]
    },
    {
      name: "Alessia Scopelliti",
      role: "Founder",
      description: "Specialista in strategia aziendale e sviluppo business con focus sull'innovazione",
      image: "👩🏻‍💼",
      skills: ["Business Strategy", "Innovation", "Leadership"]
    },
    {
      name: "Luca Cristarella",
      role: "Founder",
      description: "Esperto in digital marketing e strategie di crescita per startup e aziende",
      image: "👨🏼‍💼",
      skills: ["Digital Marketing", "Growth Hacking", "SEO/SEM"]
    }
  ];

  const values = [
    {
      icon: <FontAwesomeIcon icon={faStar} />,
      title: "Passione",
      description: "Mettiamo passione in ogni progetto, grande o piccolo che sia"
    },
    {
      icon: <FontAwesomeIcon icon={faHandshake} />,
      title: "Collaborazione",
      description: "Lavoriamo insieme ai nostri clienti per raggiungere risultati straordinari"
    },
    {
      icon: <FontAwesomeIcon icon={faLightbulb} />,
      title: "Innovazione",
      description: "Sempre alla ricerca delle migliori tecnologie e soluzioni"
    },
    {
      icon: <FontAwesomeIcon icon={faShieldHalved} />,
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
              <span>💡 Chi Siamo</span>
            </div>
            
            <h1 className="hero-title hero-title-coherent">
              La nostra storia e la passione per il
              <span className="gradient-text gradient-text-coherent"> web design</span>
            </h1>
            
            <p className="hero-subtitle hero-subtitle-coherent">
              Dal 2019 creiamo esperienze digitali straordinarie per aziende 
              che vogliono distinguersi online
            </p>
          </div>
          <div className="hero-image hero-image-coherent">
            <img src="/1.jpg" alt="Il nostro team al lavoro" />
          </div>
        </div>
      </section>

      {/* About Section - uniformata con HomePage */}
      <section id="about" className="about">
        <div className="about-container">
          <div className="about-content">
            <div className="about-badge">
              <span>📖 La nostra storia</span>
            </div>
            
            <h2 className="about-title">
              Come tutto è iniziato
            </h2>
            
            <p className="about-description">
              Nemo è nata dalla passione per il web design e dalla convinzione che ogni azienda 
              meriti un sito web straordinario. Nel 2019, un piccolo team di professionisti 
              si è unito con l'obiettivo di creare esperienze digitali che non solo fossero 
              belle da vedere, ma anche funzionali e performanti.
            </p>
            
            <p className="about-description">
              Oggi, dopo oltre 100 progetti completati e altrettanti clienti soddisfatti, 
              continuiamo a crescere e innovare, sempre mantenendo al centro la qualità 
              e l'attenzione ai dettagli che ci ha caratterizzato fin dall'inizio.
            </p>
          </div>
          
          <div className="about-visual">
            <div className="about-image">
              <img src="/chisiamo.jpg" alt="Il nostro team" />
              <div className="image-overlay"></div>
            </div>
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



      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{counters.projects}+</div>
              <div className="stat-label">Progetti Completati</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{counters.clients}%</div>
              <div className="stat-label">Clienti Soddisfatti</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{counters.years}+</div>
              <div className="stat-label">Anni di Esperienza</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{counters.support}/7</div>
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