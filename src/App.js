import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoadingScreen from './components/LoadingScreen';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import ServiziPage from './pages/ServiziPage';
import ChiSiamoPage from './pages/ChiSiamoPage';
import ContattiPage from './pages/ContattiPage';
import RichiediPreventivoPage from './pages/RichiediPreventivoPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula un tempo di caricamento di 3 secondi
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/servizi" element={<ServiziPage />} />
          <Route path="/chi-siamo" element={<ChiSiamoPage />} />
          <Route path="/contatti" element={<ContattiPage />} />
          <Route path="/richiedi-preventivo" element={<RichiediPreventivoPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App; 