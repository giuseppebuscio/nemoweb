import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ServiziPage from './pages/ServiziPage';
import PrezziPage from './pages/PrezziPage';
import ChiSiamoPage from './pages/ChiSiamoPage';
import ContattiPage from './pages/ContattiPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/servizi" element={<ServiziPage />} />
          <Route path="/prezzi" element={<PrezziPage />} />
          <Route path="/chi-siamo" element={<ChiSiamoPage />} />
          <Route path="/contatti" element={<ContattiPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 