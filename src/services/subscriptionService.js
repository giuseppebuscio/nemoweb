import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs,
  query,
  where,
  getDoc
} from 'firebase/firestore';

// Ottiene tutti gli abbonamenti
export const getSubscriptions = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'subscriptions'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Errore nel recupero degli abbonamenti:', error);
    return [];
  }
};

// Ottiene un singolo abbonamento
export const getSubscription = async (id) => {
  try {
    const subscriptionRef = doc(db, 'subscriptions', id);
    const docSnap = await getDoc(subscriptionRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    }
    return null;
  } catch (error) {
    console.error('Errore nel recupero dell\'abbonamento:', error);
    return null;
  }
};

// Crea un nuovo abbonamento
export const createSubscription = async (subscription) => {
  try {
    const docRef = await addDoc(collection(db, 'subscriptions'), subscription);
    return {
      id: docRef.id,
      ...subscription
    };
  } catch (error) {
    console.error('Errore nella creazione dell\'abbonamento:', error);
    return null;
  }
};

// Aggiorna un abbonamento esistente
export const updateSubscription = async (id, subscription) => {
  try {
    const subscriptionRef = doc(db, 'subscriptions', id);
    await updateDoc(subscriptionRef, subscription);
    return {
      id,
      ...subscription
    };
  } catch (error) {
    console.error('Errore nell\'aggiornamento dell\'abbonamento:', error);
    return null;
  }
};

// Elimina un abbonamento
export const deleteSubscription = async (id) => {
  try {
    const subscriptionRef = doc(db, 'subscriptions', id);
    await deleteDoc(subscriptionRef);
    return true;
  } catch (error) {
    console.error('Errore nell\'eliminazione dell\'abbonamento:', error);
    return false;
  }
};

// Aggiorna i pagamenti di un abbonamento
export const updateSubscriptionPayments = async (id, payments) => {
  try {
    const subscriptionRef = doc(db, 'subscriptions', id);
    await updateDoc(subscriptionRef, { payments });
    return true;
  } catch (error) {
    console.error('Errore nell\'aggiornamento dei pagamenti:', error);
    return false;
  }
};

// Aggiorna le quote di un abbonamento
export const updateSubscriptionQuotes = async (id, quotes) => {
  try {
    const subscriptionRef = doc(db, 'subscriptions', id);
    await updateDoc(subscriptionRef, { quotes });
    return true;
  } catch (error) {
    console.error('Errore nell\'aggiornamento delle quote:', error);
    return false;
  }
}; 