import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SubscriptionProvider } from './context/SubscriptionContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Abbonamenti from './pages/Abbonamenti';
import AggiungiAbbonamento from './pages/AggiungiAbbonamento';
import Contabilita from './pages/Contabilita';
import Impostazioni from './pages/Impostazioni';
import SubscriptionDetail from './pages/subscriptions/SubscriptionDetail';
import EditSubscription from './pages/subscriptions/EditSubscription';

// Componente per scorrere automaticamente verso l'alto quando cambia la route
function ScrollToTop() {
  const { pathname } = window.location;
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function App() {
  return (
    <SubscriptionProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/abbonamenti" element={<Abbonamenti />} />
          <Route path="/aggiungi-abbonamento" element={<AggiungiAbbonamento />} />
          <Route path="/contabilita" element={<Contabilita />} />
          <Route path="/impostazioni" element={<Impostazioni />} />
          <Route path="/abbonamenti/:id" element={<SubscriptionDetail />} />
          <Route path="/abbonamenti/:id/edit" element={<EditSubscription />} />
        </Routes>
      </Router>
    </SubscriptionProvider>
  );
}

export default App;
