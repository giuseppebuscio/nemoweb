import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ServiziPage from './pages/ServiziPage';
import ChiSiamoPage from './pages/ChiSiamoPage';
import ContattiPage from './pages/ContattiPage';
import DoveSiamoPage from './pages/DoveSiamoPage';

function App() {
  return (
    <Router>
    <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/servizi" element={<ServiziPage />} />
          <Route path="/chi-siamo" element={<ChiSiamoPage />} />
          <Route path="/dove-siamo" element={<DoveSiamoPage />} />
          <Route path="/contatti" element={<ContattiPage />} />
        </Routes>
    </div>
    </Router>
  );
}

export default App; 