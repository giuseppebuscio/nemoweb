import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ServiziPage from './pages/ServiziPage';
import ContattiPage from './pages/ContattiPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/servizi" element={<ServiziPage />} />
        <Route path="/contatti" element={<ContattiPage />} />
      </Routes>
    </Router>
  );
}

export default App;
