import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import LoadingScreen from './components/LoadingScreen';
import PageTransitionLoader from './components/PageTransitionLoader';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import ServiziPage from './pages/ServiziPage';
import ChiSiamoPage from './pages/ChiSiamoPage';
import ContattiPage from './pages/ContattiPage';
import RichiediPreventivoPage from './pages/RichiediPreventivoPage';

// Componente per gestire le transizioni tra pagine
function PageTransitionWrapper() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsTransitioning(true);
    
    // Simula un breve tempo di transizione
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (isTransitioning) {
    return <PageTransitionLoader />;
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/servizi" element={<ServiziPage />} />
        <Route path="/chi-siamo" element={<ChiSiamoPage />} />
        <Route path="/contatti" element={<ContattiPage />} />
        <Route path="/richiedi-preventivo" element={<RichiediPreventivoPage />} />
      </Routes>
    </>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasShownInitialLoading, setHasShownInitialLoading] = useState(false);

  useEffect(() => {
    // Controlla se è il primo accesso al sito
    const hasVisited = localStorage.getItem('nemoweb_visited');
    
    if (!hasVisited) {
      // Prima volta: mostra la schermata di caricamento
      const timer = setTimeout(() => {
        setIsLoading(false);
        setHasShownInitialLoading(true);
        localStorage.setItem('nemoweb_visited', 'true');
      }, 3000);
      
      return () => clearTimeout(timer);
    } else {
      // Non è la prima volta: non mostrare la schermata di caricamento
      setIsLoading(false);
      setHasShownInitialLoading(true);
    }
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="App">
      <Router>
        <PageTransitionWrapper />
      </Router>
    </div>
  );
}

export default App; 