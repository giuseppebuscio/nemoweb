import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import PageTitle from './components/PageTitle';
import CustomCursor from './components/CustomCursor';
import ScrollToTopButton from './components/ScrollToTopButton';
import HomePage from './pages/HomePage';
import ChiSiamoPage from './pages/ChiSiamoPage';
import ServiziPage from './pages/ServiziPage';
import ContattiPage from './pages/ContattiPage';
import RichiediPreventivoPage from './pages/RichiediPreventivoPage';
import PrivacyPage from './pages/PrivacyPage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import TerminiCondizioniPage from './pages/TerminiCondizioniPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <PageTitle />
      <CustomCursor />
      <ScrollToTopButton />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chi-siamo" element={<ChiSiamoPage />} />
        <Route path="/servizi" element={<ServiziPage />} />
        <Route path="/contatti" element={<ContattiPage />} />
        <Route path="/richiedi-preventivo" element={<RichiediPreventivoPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/cookie-policy" element={<CookiePolicyPage />} />
        <Route path="/termini-condizioni" element={<TerminiCondizioniPage />} />
      </Routes>
    </Router>
  );
}

export default App;
