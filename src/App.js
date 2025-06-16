import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SubscriptionProvider } from './context/SubscriptionContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Abbonamenti from './pages/Abbonamenti';
import AggiungiAbbonamento from './pages/AggiungiAbbonamento';
import Pagamenti from './pages/Pagamenti';
import Impostazioni from './pages/Impostazioni';
import SubscriptionDetail from './pages/subscriptions/SubscriptionDetail';
import EditSubscription from './pages/subscriptions/EditSubscription';

function App() {
  return (
    <SubscriptionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/abbonamenti" element={<Abbonamenti />} />
          <Route path="/aggiungi-abbonamento" element={<AggiungiAbbonamento />} />
          <Route path="/abbonamenti/:id" element={<SubscriptionDetail />} />
          <Route path="/abbonamenti/:id/modifica" element={<EditSubscription />} />
          <Route path="/pagamenti" element={<Pagamenti />} />
          <Route path="/impostazioni" element={<Impostazioni />} />
        </Routes>
      </Router>
    </SubscriptionProvider>
  );
}

export default App;
