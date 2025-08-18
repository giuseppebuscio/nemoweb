import React, { useEffect } from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  useEffect(() => {
    // Aggiunge classe al body per prevenire scroll
    document.body.classList.add('loading');
    
    // Rimuove la classe quando il componente si smonta
    return () => {
      document.body.classList.remove('loading');
    };
  }, []);

  return (
    <div className="loading-screen">
      {/* Elementi decorativi fluttuanti */}
      <div className="floating-shapes">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
        <div className="floating-shape shape-5"></div>
      </div>
      
      <div className="loading-content">
        <div className="logo-container">
          <img src="/Bianco-Arancio.png" alt="Logo" className="loading-logo" />
        </div>
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
        <div className="loading-text">
          <h2>Benvenuto su NemoWeb</h2>
          <p>Caricamento in corso...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
