import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getSubscriptions as getSubscriptionsFromDB,
  getSubscription as getSubscriptionFromDB,
  createSubscription,
  updateSubscription as updateSubscriptionInDB,
  deleteSubscription as deleteSubscriptionFromDB
} from '../services/subscriptionService';

const SubscriptionContext = createContext();

export const useSubscriptions = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscriptions must be used within a SubscriptionProvider');
  }
  return context;
};

export const SubscriptionProvider = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carica tutti gli abbonamenti all'avvio
  useEffect(() => {
    const loadSubscriptions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getSubscriptionsFromDB();
        setSubscriptions(data || []);
      } catch (err) {
        setError('Errore nel caricamento degli abbonamenti');
        console.error('Errore nel caricamento degli abbonamenti:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadSubscriptions();
  }, []);

  // Funzioni per gestire gli abbonamenti
  const addSubscription = async (subscription) => {
    try {
      const newSubscription = await createSubscription({
        ...subscription,
        payments: [],
        quotes: []
      });
      if (newSubscription) {
        setSubscriptions(prev => [...prev, newSubscription]);
        return newSubscription;
      }
      return null;
    } catch (err) {
      console.error('Errore nella creazione dell\'abbonamento:', err);
      return null;
    }
  };

  const updateSubscriptionData = async (id, updatedData) => {
    try {
      const updated = await updateSubscriptionInDB(id, {
        ...updatedData,
        updatedAt: new Date().toISOString()
      });
      if (updated) {
        setSubscriptions(prev => 
          prev.map(sub => sub.id === id ? { ...sub, ...updatedData } : sub)
        );
        return updated;
      }
      return null;
    } catch (err) {
      console.error('Errore nell\'aggiornamento dell\'abbonamento:', err);
      return null;
    }
  };

  const toggleSubscriptionStatus = async (id) => {
    try {
      const subscription = subscriptions.find(sub => sub.id === id);
      if (subscription) {
        const newStatus = !subscription.isActive;
        const updated = await updateSubscriptionInDB(id, {
          isActive: newStatus,
          updatedAt: new Date().toISOString()
        });
        if (updated) {
          setSubscriptions(prev =>
            prev.map(sub => sub.id === id ? { ...sub, isActive: newStatus } : sub)
          );
          return updated;
        }
      }
      return null;
    } catch (err) {
      console.error('Errore nel cambio di stato dell\'abbonamento:', err);
      return null;
    }
  };

  const deleteSubscriptionData = async (id) => {
    try {
      const success = await deleteSubscriptionFromDB(id);
      if (success) {
        setSubscriptions(prev => prev.filter(sub => sub.id !== id));
      }
      return success;
    } catch (err) {
      console.error('Errore nell\'eliminazione dell\'abbonamento:', err);
      return false;
    }
  };

  const getSubscriptionData = async (id) => {
    try {
      const subscription = await getSubscriptionFromDB(id);
      return subscription;
    } catch (err) {
      console.error('Errore nel recupero dell\'abbonamento:', err);
      return null;
    }
  };

  const value = {
    subscriptions,
    isLoading,
    error,
    addSubscription,
    updateSubscription: updateSubscriptionData,
    deleteSubscription: deleteSubscriptionData,
    getSubscription: getSubscriptionData,
    toggleSubscriptionStatus
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}; 