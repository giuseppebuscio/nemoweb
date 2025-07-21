import React from 'react';
import './DoveSiamoPage.css';

const DoveSiamoPage = () => {
  return (
    <div className="dove-siamo-page">
      <div className="dove-siamo-hero">
        <div className="dove-siamo-hero-content">
          <h1>Vieni a trovarci</h1>
          <p>Scopri dove si trova la nostra sede e come raggiungerci facilmente.</p>
          <button className="maps-button">
            Apri su Maps
            <svg className="arrow-icon" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <section className="come-raggiungerci">
        <div className="container">
          <h2>Come raggiungerci</h2>
          <p className="subtitle">Siamo a Castellammare del Golfo, in Via Segesta. Ecco come raggiungerci:</p>
          
          <div className="transport-methods">
            <div className="transport-card">
              <div className="transport-icon">🚗</div>
              <h3>In Auto</h3>
              <p>Da Palermo: prendi l'autostrada A29 in direzione Trapani, esci a Castellammare del Golfo e segui le indicazioni per il centro. Via Segesta si trova a 5 minuti dal centro storico.</p>
              <p><strong>Tempo di percorrenza:</strong> circa 45 minuti da Palermo</p>
            </div>

            <div className="transport-card">
              <div className="transport-icon">🚂</div>
              <h3>In Treno</h3>
              <p>La stazione di Castellammare del Golfo è servita da treni regionali. Dalla stazione, puoi raggiungere Via Segesta in taxi (5 minuti) o a piedi (15 minuti).</p>
              <p><strong>Frequenza:</strong> collegamenti regolari con Palermo e Trapani</p>
            </div>

            <div className="transport-card">
              <div className="transport-icon">✈️</div>
              <h3>In Aereo</h3>
              <p>L'aeroporto più vicino è "Falcone-Borsellino" di Palermo (Punta Raisi). Da lì puoi prendere un taxi diretto (1 ora) o il treno fino a Castellammare del Golfo.</p>
              <p><strong>Distanza:</strong> circa 60 km dall'aeroporto</p>
            </div>
          </div>

          <div className="address-info">
            <h3>Il nostro indirizzo</h3>
            <p className="address">Via Segesta<br />Castellammare del Golfo (TP)<br />Sicilia, Italia</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoveSiamoPage; 