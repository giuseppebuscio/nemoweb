import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import {
  getSubscription,
  updateSubscriptionPayments,
  updateSubscriptionQuotes,
  getSubscriptionById,
  deleteSubscription,
  updateSubscription
} from '../../services/subscriptionService';
import { useSubscriptions } from '../../context/SubscriptionContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const SubscriptionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSubscription: getSubscriptionContext, deleteSubscription: deleteSubscriptionContext } = useSubscriptions();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeTab, setActiveTab] = useState('informazioni');
  const [subscription, setSubscription] = useState(null);
  const [pagamenti, setPagamenti] = useState([]);
  const [quote, setQuote] = useState([]);
  const [showDeletePaymentModal, setShowDeletePaymentModal] = useState(false);
  const [pagamentoDaEliminare, setPagamentoDaEliminare] = useState(null);
  const [showDeletePersonaModal, setShowDeletePersonaModal] = useState(false);
  const [personaDaEliminare, setPersonaDaEliminare] = useState(null);
  const [showAddPersonaModal, setShowAddPersonaModal] = useState(false);
  const [nuovaPersona, setNuovaPersona] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pagamentiPersone, setPagamentiPersone] = useState({});
  const [mesiMancanti, setMesiMancanti] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [editingPayment, setEditingPayment] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  // Calcola il totale direttamente dai pagamenti
  const calcolaTotale = () => {
    return pagamenti.reduce((acc, pagamento) => acc + pagamento.importo, 0);
  };

  // Carica i dati dell'abbonamento
  useEffect(() => {
    const loadSubscription = async () => {
      setIsLoading(true);
      const data = await getSubscription(id);
      if (data) {
        setSubscription(data);
        setPagamenti(data.payments || []);
        setQuote(data.quotes || []);
      } else {
        navigate('/abbonamenti');
      }
      setIsLoading(false);
    };
    loadSubscription();
  }, [id, navigate]);

  // Salva i pagamenti
  useEffect(() => {
    if (subscription && pagamenti) {
      updateSubscriptionPayments(id, pagamenti);
    }
  }, [pagamenti, id, subscription]);

  // Salva le quote
  useEffect(() => {
    if (subscription && quote) {
      updateSubscriptionQuotes(id, quote);
    }
  }, [quote, id, subscription]);

  // Calcola i mesi mancanti quando cambiano i pagamenti o la data di inizio
  useEffect(() => {
    if (!subscription?.dataInizio) return;
    
    const dataInizio = new Date(subscription.dataInizio);
    const oggi = new Date();
    const mesiMancanti = [];

    // Funzione per ottenere una stringa YYYY-MM da una data
    const getYearMonth = (date) => {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    };

    // Funzione per ottenere solo l'anno da una data
    const getYear = (date) => {
      return date.getFullYear();
    };

    // Funzione per verificare se esiste un pagamento per una data specifica
    const esistePagamento = (data, isAnnuale) => {
      return pagamenti.some(pagamento => {
        const dataPagamento = new Date(pagamento.data);
        if (isAnnuale) {
          return getYear(dataPagamento) === getYear(data);
        }
        return getYearMonth(dataPagamento) === getYearMonth(data);
      });
    };

    let currentDate = new Date(dataInizio.getFullYear(), dataInizio.getMonth(), dataInizio.getDate());
    const isAnnuale = subscription.frequenza === 'annuale';
    
    // Per abbonamenti annuali, incrementiamo di anno in anno
    if (isAnnuale) {
      while (currentDate <= oggi) {
        if (!esistePagamento(currentDate, true)) {
          mesiMancanti.push({
            mese: 'Anno',
            anno: currentDate.getFullYear()
          });
        }
        currentDate.setFullYear(currentDate.getFullYear() + 1);
      }
    } else {
      // Per abbonamenti mensili, incrementiamo di mese in mese
      const lastMonth = new Date(oggi.getFullYear(), oggi.getMonth(), dataInizio.getDate());
      while (currentDate <= lastMonth) {
        if (!esistePagamento(currentDate, false)) {
          mesiMancanti.push({
            mese: currentDate.toLocaleDateString('it-IT', { month: 'long' }),
            anno: currentDate.getFullYear()
          });
        }
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
    }

    setMesiMancanti(mesiMancanti);
  }, [subscription?.dataInizio, subscription?.frequenza, pagamenti]);

  const formatTotale = (numero) => {
    // Assicuriamoci che numero sia effettivamente un numero
    const numeroFloat = parseFloat(numero);
    if (isNaN(numeroFloat)) {
      return "0.00";
    }
    return numeroFloat.toFixed(2);
  };

  const formatData = (dataString) => {
    if (!dataString) return 'N/D';
    const data = new Date(dataString);
    return data.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getUltimoPagamento = () => {
    if (!pagamenti || pagamenti.length === 0) return null;
    return pagamenti.reduce((latest, current) => {
      const currentDate = new Date(current.data);
      const latestDate = new Date(latest.data);
      return currentDate > latestDate ? current : latest;
    });
  };

  const calcolaQuotaPerPersona = () => {
    const numeroPersone = (subscription.persone || []).length + 1; // +1 per l'utente principale
    const prezzoTotale = parseFloat(subscription.prezzo);
    if (isNaN(prezzoTotale) || numeroPersone === 0) return 0;
    return prezzoTotale / numeroPersone;
  };

  // Funzione per calcolare il totale pagato da una persona
  const calcolaTotalePagato = (persona) => {
    const quotaPerPersona = calcolaQuotaPerPersona();
    
    if (subscription.frequenza === 'annuale') {
      // Per abbonamenti annuali, controlla i pagamenti annuali
      const anni = Array.from({ length: 5 }, (_, index) => new Date().getFullYear() + index);
      const totale = anni.reduce((totale, anno) => {
        return totale + (hasPagato(persona, 'Anno', anno) ? quotaPerPersona : 0);
      }, 0);
      return totale.toFixed(2);
    } else {
      // Per abbonamenti mensili, somma i pagamenti di tutti gli anni disponibili
      const mesi = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
      const anni = Array.from({ length: 5 }, (_, index) => new Date().getFullYear() - 2 + index);
      
      const totale = anni.reduce((totaleAnni, anno) => {
        const totaleMesi = mesi.reduce((totaleMesi, mese) => {
          return totaleMesi + (hasPagato(persona, mese, anno) ? quotaPerPersona : 0);
        }, 0);
        return totaleAnni + totaleMesi;
      }, 0);
      
      return totale.toFixed(2);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f7 100%)'
        }}>
          <div style={{
            fontSize: '1.125rem',
            color: '#86868b',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
          }}>
            Caricamento...
          </div>
        </div>
      </Layout>
    );
  }

  if (!subscription) {
    return (
      <Layout>
        <div style={{
          padding: '2rem',
          background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f7 100%)',
          minHeight: '100vh'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '2.5rem',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h2 style={{
              fontSize: '1.75rem',
              fontWeight: '600',
              color: '#1d1d1f',
              marginBottom: '1rem'
            }}>
              Abbonamento non trovato
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#86868b',
              marginBottom: '2rem'
            }}>
              L'abbonamento che stai cercando non esiste o è stato eliminato.
            </p>
            <button
              onClick={() => navigate('/abbonamenti')}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                border: 'none',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Torna agli abbonamenti
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const formatFrequency = (subscription) => {
    if (subscription.frequenza === 'personalizzato') {
      return `Ogni ${subscription.frequenzaPersonalizzata.numero} ${subscription.frequenzaPersonalizzata.unita}`;
    }
    const frequencies = {
      'giornaliera': 'Ogni giorno',
      'settimanale': 'Ogni settimana', 
      'mensile': 'Ogni mese',
      'annuale': 'Ogni anno'
    };
    return frequencies[subscription.frequenza] || subscription.frequenza;
  };

  const handleDelete = () => {
    deleteSubscriptionContext(id);
    navigate('/abbonamenti');
  };

  const getMeseCorrente = () => {
    const mesi = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
    return mesi[new Date().getMonth()];
  };

  const shouldShowPaymentReminder = () => {
    return mesiMancanti.length > 0;
  };

  // Modifica il formato del testo dei mesi mancanti
  const formatMesiMancanti = () => {
    if (!mesiMancanti || mesiMancanti.length === 0) return '';

    const isAnnuale = subscription.frequenza === 'annuale';

    if (mesiMancanti.length === 1) {
      const { mese, anno } = mesiMancanti[0];
      return isAnnuale ? `Anno ${anno}` : `${mese} ${anno}`;
    }

    // Raggruppa i periodi per anno
    const periodiPerAnno = mesiMancanti.reduce((acc, { mese, anno }) => {
      if (!acc[anno]) acc[anno] = [];
      acc[anno].push(mese);
      return acc;
    }, {});

    return Object.entries(periodiPerAnno)
      .map(([anno, periodi]) => {
        if (isAnnuale) return `Anno ${anno}`;
        if (periodi.length === 1) return `${periodi[0]} ${anno}`;
        if (periodi.length === 2) return `${periodi.join(' e ')} ${anno}`;
        return `da ${periodi[0]} a ${periodi[periodi.length - 1]} ${anno}`;
      })
      .join(', ');
  };

  // Modifica il testo del promemoria
  const getTestoPromemoria = () => {
    if (!mesiMancanti || mesiMancanti.length === 0) return '';
    
    const isAnnuale = subscription.frequenza === 'annuale';
    if (isAnnuale) {
      return mesiMancanti.length === 1 
        ? `Manca il pagamento dell'anno ${mesiMancanti[0].anno}`
        : `Mancano i pagamenti per gli anni: ${mesiMancanti.map(m => m.anno).join(', ')}`;
    }

    return mesiMancanti.length === 1 
      ? `Manca il pagamento di ${formatMesiMancanti()}`
      : `Mancano i pagamenti dei seguenti mesi: ${formatMesiMancanti()}`;
  };

  const registraPagamento = () => {
    const nuovoPagamento = {
      data: new Date().toISOString(),
      importo: subscription.prezzo
    };
    setPagamenti([...pagamenti, nuovoPagamento]);
  };

  const toggleQuota = (persona, mese, anno) => {
    const quotaIndex = quote.findIndex(q => 
      q.persona === persona && q.mese === mese && q.anno === anno
    );

    if (quotaIndex === -1) {
      // Aggiungi nuova quota
      setQuote([...quote, { persona, mese, anno, pagato: true }]);
    } else {
      // Toggle stato esistente
      const nuoveQuote = [...quote];
      nuoveQuote[quotaIndex].pagato = !nuoveQuote[quotaIndex].pagato;
      setQuote(nuoveQuote);
    }
  };

  const isQuotaPagata = (persona, mese, anno) => {
    return quote.some(q => 
      q.persona === persona && q.mese === mese && q.anno === anno && q.pagato
    );
  };

  const handleDeletePayment = async (pagamento) => {
    try {
      // Filtra i pagamenti mantenendo tutti tranne quello da eliminare
      const updatedPayments = subscription.pagamenti.filter(p => 
        p.dataPagamento !== pagamento.dataPagamento || 
        p.importo !== pagamento.importo || 
        p.descrizione !== pagamento.descrizione
      );
      
      await updateDoc(doc(db, 'subscriptions', id), {
        pagamenti: updatedPayments
      });
      
      setSubscription(prev => ({
        ...prev,
        pagamenti: updatedPayments
      }));
    } catch (error) {
      console.error('Errore durante l\'eliminazione del pagamento:', error);
    }
  };

  const handleDeletePaymentInPaymentsTab = async (pagamento) => {
    const nuoviPagamenti = pagamenti.filter(p => p.data !== pagamento.data);
    setPagamenti(nuoviPagamenti);
    await updateSubscriptionPayments(id, nuoviPagamenti);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Verifica se il pagamento è stato effettuato questo mese
  const isPagamentoEffettuato = () => {
    const oggi = new Date();
    const meseCorrente = oggi.getMonth();
    const annoCorrente = oggi.getFullYear();

    return pagamenti.some(pagamento => {
      const dataPagamento = new Date(pagamento.data);
      return dataPagamento.getMonth() === meseCorrente && 
             dataPagamento.getFullYear() === annoCorrente;
    });
  };

  // Funzione per verificare se una persona ha pagato per un determinato mese
  const hasPagato = (persona, mese, anno = new Date().getFullYear()) => {
    return pagamentiPersone[`${persona}-${mese}-${anno}`] || false;
  };

  // Funzione per registrare/annullare il pagamento di una persona per un mese
  const togglePagamentoPersona = (persona, mese, anno = new Date().getFullYear()) => {
    setPagamentiPersone(prev => ({
      ...prev,
      [`${persona}-${mese}-${anno}`]: !prev[`${persona}-${mese}-${anno}`]
    }));
  };

  // Funzione per svuotare tutti i pagamenti di una persona
  const svuotaPagamentiPersona = (persona) => {
    if (subscription.frequenza === 'annuale') {
      // Per abbonamenti annuali, svuota i pagamenti degli anni
      const anni = Array.from({ length: 5 }, (_, index) => new Date().getFullYear() + index);
      anni.forEach(anno => {
        if (hasPagato(persona, 'Anno', anno)) {
          togglePagamentoPersona(persona, 'Anno', anno);
        }
      });
    } else {
      // Per abbonamenti mensili, svuota i pagamenti di tutti gli anni disponibili
      const mesi = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
      const anni = Array.from({ length: 5 }, (_, index) => new Date().getFullYear() - 2 + index);
      
      anni.forEach(anno => {
        mesi.forEach(mese => {
          if (hasPagato(persona, mese, anno)) {
            togglePagamentoPersona(persona, mese, anno);
          }
        });
      });
    }
  };

  const handleAddPayment = () => {
    setShowPaymentModal(true);
    setSelectedMonth('');
    setPaymentAmount('');
    setEditingPayment(null);
  };

  const handlePaymentSubmit = async () => {
    if (!selectedMonth || !paymentAmount) {
      alert('Per favore, compila tutti i campi');
      return;
    }

    try {
      const newPayment = {
        dataPagamento: selectedMonth,
        importo: parseFloat(paymentAmount),
        pagato: true
      };

      const updatedPayments = editingPayment
        ? subscription.pagamenti.map(p => 
            p === editingPayment ? newPayment : p
          )
        : [...(subscription.pagamenti || []), newPayment];

      const updatedSubscription = {
        ...subscription,
        pagamenti: updatedPayments
      };

      await updateSubscription(subscription.id, updatedSubscription);
      setSubscription(updatedSubscription);
      setShowPaymentModal(false);
      setSelectedMonth('');
      setPaymentAmount('');
      setEditingPayment(null);
    } catch (error) {
      console.error('Errore durante il salvataggio della rata:', error);
      alert('Si è verificato un errore durante il salvataggio della rata');
    }
  };

  const handleEditPayment = (pagamento) => {
    setShowPaymentModal(true);
    setSelectedMonth(new Date(pagamento.dataPagamento).toISOString().split('T')[0]);
    setPaymentAmount(pagamento.importo);
    setEditingPayment(pagamento);
  };

  const handleDeleteSubscription = () => {
    deleteSubscriptionContext(id);
    navigate('/abbonamenti');
  };

  return (
    <Layout>
      <div style={{ 
        padding: '2rem',
        background: 'linear-gradient(135deg, #f5f5f7 0%, #ffffff 100%)',
        minHeight: '100vh',
        width: '100%'
      }} className="subscription-detail-container">
        <div style={{ 
          width: '100%'
        }}>
          {/* Header con nome abbonamento e pulsanti */}
          <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '2rem',
            width: '100%'
          }} className="subscription-header">
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              alignItems: 'center'
            }} className="subscription-info">
              {subscription.logo && (
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  background: 'white',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }} className="subscription-logo">
                  <img 
                    src={subscription.logo} 
                    alt={`Logo ${subscription.nome}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              )}
              <div>
                <h1 style={{
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  color: '#1d1d1f',
                  margin: '0 0 0.5rem 0',
                  letterSpacing: '-0.025em',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                  textAlign: 'left'
                }} className="subscription-title">
                  {subscription.nome}
                </h1>
                <p style={{
                  fontSize: '1.125rem',
                  color: '#86868b',
                  margin: 0,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  fontWeight: '400',
                  textAlign: 'left'
                }} className="subscription-subtitle">
                  {formatFrequency(subscription)}
                </p>
              </div>
            </div>

            {/* Pulsanti azione */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center'
            }} className="action-buttons">
              <button
                onClick={() => navigate('/abbonamenti')}
                style={{
                  padding: '10px 20px',
                  fontSize: '0.9375rem',
                  fontWeight: '600',
                  border: '1px solid #86868b',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.8)',
                  color: '#86868b',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                className="action-button touch-target"
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(134, 134, 139, 0.1)';
                  e.target.style.borderColor = '#1d1d1f';
                  e.target.style.color = '#1d1d1f';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                  e.target.style.borderColor = '#86868b';
                  e.target.style.color = '#86868b';
                }}
              >
                <span style={{ fontSize: '1.1em' }}>←</span>
                Indietro
              </button>

              <button
                onClick={() => navigate(`/abbonamenti/${id}/edit`)}
                style={{
                  padding: '10px 20px',
                  fontSize: '0.9375rem',
                  fontWeight: '600',
                  border: '1px solid #007AFF',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.8)',
                  color: '#007AFF',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                className="action-button touch-target"
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)';
                  e.target.style.color = 'white';
                  e.target.style.borderColor = 'transparent';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                  e.target.style.color = '#007AFF';
                  e.target.style.borderColor = '#007AFF';
                }}
              >
                <span style={{ fontSize: '1.1em' }}>✏️</span>
                Modifica
              </button>
            </div>
          </div>

          {/* Tabs di navigazione */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '1.5rem',
            padding: '0.5rem',
            background: 'rgba(0, 0, 0, 0.05)',
            borderRadius: '12px',
            width: 'fit-content',
            alignSelf: 'flex-start'
          }} className="tabs-container">
            <div className="tabs-scroll">
              {[
                'informazioni',
                ...(subscription.tipoPagamento === 'fisso' ? ['pagamenti'] : ['rate']),
                ...(subscription.persone && subscription.persone.length > 0 ? ['quote'] : [])
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '8px 16px',
                    fontSize: '0.9375rem',
                    fontWeight: '600',
                    border: 'none',
                    borderRadius: '8px',
                    background: activeTab === tab ? 'white' : 'transparent',
                    color: activeTab === tab ? '#1d1d1f' : '#86868b',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                    boxShadow: activeTab === tab ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none'
                  }}
                  className="tab-button touch-target"
                >
                  {capitalizeFirstLetter(tab)}
                </button>
              ))}
            </div>
          </div>

          {/* Card principale */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            width: '100%'
          }} className="main-card">
            {/* Contenuto del tab */}
            {activeTab === 'informazioni' && (
              <div style={{ padding: '2rem' }} className="card-content">
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '2rem',
                  marginBottom: '2rem',
                  width: '100%'
                }} className="stats-grid">
                  {/* Prezzo Totale */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(88, 86, 214, 0.1) 100%)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '1px solid rgba(0, 122, 255, 0.2)',
                    width: '100%'
                  }} className="stat-card mobile-animate">
                    <h4 style={{
                      fontSize: '0.9375rem',
                      color: '#007AFF',
                      marginBottom: '0.5rem',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em',
                      textAlign: 'left'
                    }} className="stat-title">
                      {subscription.tipoPagamento === 'variabile' ? 'Prezzo Prima Rata' : 'Prezzo Abbonamento'}
                    </h4>
                    <p style={{
                      fontSize: '2rem',
                      color: '#1d1d1f',
                      fontWeight: '700',
                      margin: 0,
                      letterSpacing: '-0.02em',
                      textAlign: 'left'
                    }} className="stat-value">€{formatTotale(subscription.prezzo)}</p>
                  </div>

                  {/* Tipo di Pagamento */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(88, 86, 214, 0.1) 100%)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '1px solid rgba(0, 122, 255, 0.2)',
                    width: '100%'
                  }} className="stat-card mobile-animate mobile-animate-delay-1">
                    <h4 style={{
                      fontSize: '0.9375rem',
                      color: '#007AFF',
                      marginBottom: '0.5rem',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em',
                      textAlign: 'left'
                    }} className="stat-title">
                      Tipo di Pagamento
                    </h4>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      <span style={{
                        fontSize: '1.5rem',
                        color: subscription.tipoPagamento === 'fisso' ? '#007AFF' : '#FF9500'
                      }}>
                        {subscription.tipoPagamento === 'fisso' ? '💰' : '📊'}
                      </span>
                      <span style={{
                        fontSize: '1.25rem',
                        color: '#1d1d1f',
                        fontWeight: '600'
                      }}>
                        {subscription.tipoPagamento === 'fisso' ? 'Spesa Fissa' : 'Spesa Variabile'}
                      </span>
                    </div>
                    <p style={{
                      fontSize: '0.875rem',
                      color: '#86868b',
                      margin: '0.75rem 0 0 0',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                    }}>
                      {subscription.tipoPagamento === 'fisso' 
                        ? 'Importo costante ogni mese'
                        : 'Importo che può variare nel tempo'}
                    </p>
                  </div>

                  {/* Quota per Persona */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(88, 86, 214, 0.1) 0%, rgba(0, 122, 255, 0.1) 100%)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '1px solid rgba(88, 86, 214, 0.2)',
                    width: '100%'
                  }} className="stat-card mobile-animate mobile-animate-delay-2">
                    <h4 style={{
                      fontSize: '0.9375rem',
                      color: '#5856D6',
                      marginBottom: '0.5rem',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em',
                      textAlign: 'left'
                    }} className="stat-title">
                      Totale Pagato
                    </h4>
                    <p style={{
                      fontSize: '2rem',
                      color: '#1d1d1f',
                      fontWeight: '700',
                      margin: 0,
                      letterSpacing: '-0.02em',
                      textAlign: 'left'
                    }} className="stat-value">
                      €{subscription.tipoPagamento === 'variabile' ? (subscription.pagamenti ? subscription.pagamenti.reduce((totale, pagamento) => totale + parseFloat(pagamento.importo), 0).toFixed(2) : '0.00') : formatTotale(calcolaTotale())}
                    </p>
                  </div>
                </div>

                {/* Dettagli aggiuntivi */}
                <div style={{
                  background: 'rgba(0, 0, 0, 0.02)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '2rem',
                  width: '100%'
                }} className="details-container">
                  {/* Frequenza */}
                  <div className="detail-item">
                    <h4 style={{
                      fontSize: '0.875rem',
                      color: '#86868b',
                      marginBottom: '0.5rem',
                      fontWeight: '600'
                    }} className="detail-title">
                      Frequenza
                    </h4>
                    <p style={{
                      fontSize: '1rem',
                      color: '#1d1d1f',
                      margin: 0,
                      fontWeight: '500'
                    }} className="detail-value">
                      {formatFrequency(subscription)}
                    </p>
                  </div>

                  {/* Data di Inizio */}
                  <div className="detail-item">
                    <h4 style={{
                      fontSize: '0.875rem',
                      color: '#86868b',
                      marginBottom: '0.5rem',
                      fontWeight: '600'
                    }} className="detail-title">
                      Data di Inizio
                    </h4>
                    <p style={{
                      fontSize: '1rem',
                      color: '#1d1d1f',
                      margin: 0,
                      fontWeight: '500'
                    }} className="detail-value">
                      {formatData(subscription.dataInizio)}
                    </p>
                  </div>

                  {/* Data di Fine */}
                  {subscription.dataFine && (
                    <div className="detail-item">
                      <h4 style={{
                        fontSize: '0.875rem',
                        color: '#86868b',
                        marginBottom: '0.5rem',
                        fontWeight: '600'
                      }} className="detail-title">
                        Data di Fine
                      </h4>
                      <p style={{
                        fontSize: '1rem',
                        color: '#1d1d1f',
                        margin: 0,
                        fontWeight: '500'
                      }} className="detail-value">
                        {formatData(subscription.dataFine)}
                      </p>
                    </div>
                  )}

                  {/* Ultimo Pagamento */}
                  {getUltimoPagamento() && (
                    <div className="detail-item">
                      <h4 style={{
                        fontSize: '0.875rem',
                        color: '#86868b',
                        marginBottom: '0.5rem',
                        fontWeight: '600'
                      }} className="detail-title">
                        Ultimo Pagamento
                      </h4>
                      <p style={{
                        fontSize: '1rem',
                        color: '#1d1d1f',
                        margin: 0,
                        fontWeight: '500'
                      }} className="detail-value">
                        {formatData(getUltimoPagamento().data)}
                      </p>
                    </div>
                  )}

                  {/* Quota per Persona */}
                  {(subscription.persone && subscription.persone.length > 0) && (
                    <div className="detail-item">
                      <h4 style={{
                        fontSize: '0.875rem',
                        color: '#86868b',
                        marginBottom: '0.5rem',
                        fontWeight: '600'
                      }} className="detail-title">
                        Quota per Persona
                      </h4>
                      <p style={{
                        fontSize: '1rem',
                        color: '#1d1d1f',
                        margin: 0,
                        fontWeight: '500'
                      }} className="detail-value">
                        €{calcolaQuotaPerPersona().toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Promemoria pagamento */}
                {shouldShowPaymentReminder() && (
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(255, 149, 0, 0.1) 0%, rgba(255, 123, 0, 0.1) 100%)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    marginTop: '2rem',
                    border: '1px solid rgba(255, 149, 0, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }} className="payment-reminder mobile-animate mobile-animate-delay-3">
                    <span style={{
                      fontSize: '2rem',
                      color: '#FF9500'
                    }}>⚠️</span>
                    <div>
                      <h4 style={{
                        fontSize: '1rem',
                        color: '#FF9500',
                        margin: '0 0 0.5rem 0',
                        fontWeight: '600'
                      }} className="reminder-title">
                        Promemoria Pagamento
                      </h4>
                      <p style={{
                        fontSize: '0.875rem',
                        color: '#86868b',
                        margin: 0,
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                      }} className="reminder-text">
                        {getTestoPromemoria()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'pagamenti' && (
              <div style={{ padding: '2rem' }} className="card-content">
                {/* Cards Totali */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: '2rem'
                }} className="stats-grid">
                  {/* Card Totale Pagamenti */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(88, 86, 214, 0.1) 100%)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '1px solid rgba(0, 122, 255, 0.2)'
                  }} className="stat-card mobile-animate">
                    <h4 style={{
                      fontSize: '0.9375rem',
                      color: '#007AFF',
                      marginBottom: '0.5rem',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em'
                    }} className="stat-title">Totale Pagamenti</h4>
                    <p style={{
                      fontSize: '2rem',
                      color: '#1d1d1f',
                      fontWeight: '700',
                      margin: 0,
                      letterSpacing: '-0.02em'
                    }} className="stat-value">€{formatTotale(calcolaTotale())}</p>
                  </div>

                  {/* Card Mesi Pagati */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(52, 199, 89, 0.1) 0%, rgba(48, 209, 88, 0.1) 100%)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '1px solid rgba(52, 199, 89, 0.2)'
                  }} className="stat-card mobile-animate mobile-animate-delay-1">
                    <h4 style={{
                      fontSize: '0.9375rem',
                      color: '#34C759',
                      marginBottom: '0.5rem',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em'
                    }} className="stat-title">{subscription.frequenza === 'annuale' ? 'Anni Pagati' : 'Mesi Pagati'}</h4>
                    <p style={{
                      fontSize: '2rem',
                      color: '#1d1d1f',
                      fontWeight: '700',
                      margin: 0,
                      letterSpacing: '-0.02em'
                    }} className="stat-value">{pagamenti.length}</p>
                  </div>
                </div>

                {/* Info Box Promemoria Pagamento */}
                {shouldShowPaymentReminder() && (
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(255, 149, 0, 0.1) 0%, rgba(255, 123, 0, 0.1) 100%)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    marginBottom: '2rem',
                    border: '1px solid rgba(255, 149, 0, 0.2)'
                  }} className="payment-reminder mobile-animate mobile-animate-delay-2">
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{ fontSize: '1.5rem' }}>⚠️</span>
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        color: '#1d1d1f',
                        margin: 0
                      }} className="reminder-title">
                        Pagamenti mancanti
                      </h3>
                    </div>
                    <p style={{
                      fontSize: '1rem',
                      color: '#86868b',
                      margin: '0 0 1rem 0',
                      lineHeight: '1.4'
                    }} className="reminder-text">
                      {getTestoPromemoria()}
                    </p>
                    <div style={{
                      display: 'flex',
                      gap: '1rem',
                      flexWrap: 'wrap'
                    }} className="action-table-buttons">
                      {mesiMancanti.map(({ mese, anno }, index) => (
                        <button
                          key={`${mese}-${anno}`}
                          onClick={() => {
                            const isAnnuale = subscription.frequenza === 'annuale';
                            let data;
                            
                            if (isAnnuale) {
                              // Per abbonamenti annuali, usa la data di inizio dell'anno
                              const dataInizio = new Date(subscription.dataInizio);
                              data = new Date(anno, dataInizio.getMonth(), dataInizio.getDate());
                            } else {
                              // Per abbonamenti mensili, usa la logica esistente
                              const mesiMap = {
                                'gennaio': 0, 'febbraio': 1, 'marzo': 2, 'aprile': 3,
                                'maggio': 4, 'giugno': 5, 'luglio': 6, 'agosto': 7,
                                'settembre': 8, 'ottobre': 9, 'novembre': 10, 'dicembre': 11
                              };
                              const meseIndex = mesiMap[mese.toLowerCase()];
                              const dataInizio = new Date(subscription.dataInizio);
                              const giorno = dataInizio.getDate();
                              data = new Date(anno, meseIndex, giorno);
                            }
                            
                            const nuovoPagamento = {
                              data: data.toISOString(),
                              importo: parseFloat(subscription.prezzo)
                            };
                            setPagamenti([...pagamenti, nuovoPagamento]);
                          }}
                          style={{
                            padding: '0.75rem 1rem',
                            fontSize: '0.9375rem',
                            fontWeight: '600',
                            border: 'none',
                            borderRadius: '10px',
                            background: 'linear-gradient(135deg, #FF9500 0%, #FF7B00 100%)',
                            color: 'white',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}
                          className="action-table-button touch-target"
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-1px)';
                            e.target.style.boxShadow = '0 4px 12px rgba(255, 149, 0, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'none';
                            e.target.style.boxShadow = 'none';
                          }}
                        >
                          <span>✓</span>
                          {subscription.frequenza === 'annuale' ? `Paga Anno ${anno}` : `Paga ${mese} ${anno}`}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Info Box Abbonamento Pagato */}
                {isPagamentoEffettuato() && (
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(52, 199, 89, 0.1) 0%, rgba(48, 209, 88, 0.1) 100%)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    marginBottom: '2rem',
                    border: '1px solid rgba(52, 199, 89, 0.2)'
                  }} className="payment-reminder mobile-animate mobile-animate-delay-2">
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{ fontSize: '1.5rem' }}>✅</span>
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        color: '#1d1d1f',
                        margin: 0
                      }} className="reminder-title">
                        Abbonamento in pari
                      </h3>
                    </div>
                    <p style={{
                      fontSize: '1rem',
                      color: '#86868b',
                      margin: 0,
                      lineHeight: '1.4'
                    }} className="reminder-text">
                      Sei in pari con tutti i pagamenti
                    </p>
                  </div>
                )}

                {/* Lista Pagamenti */}
                <div style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  width: '100%'
                }} className="payments-table table-scroll-container">
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem'
                  }}>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      color: '#1d1d1f',
                      margin: 0
                    }}>
                      Storico Pagamenti
                    </h3>
                    <button
                      onClick={handleAddPayment}
                      style={{
                        padding: '0.75rem 1rem',
                        fontSize: '0.9375rem',
                        fontWeight: '600',
                        border: 'none',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
                        color: 'white',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                      className="action-table-button touch-target"
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-1px)';
                        e.target.style.boxShadow = '0 4px 12px rgba(0, 122, 255, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'none';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <span>+</span>
                      Aggiungi Pagamento
                    </button>
                  </div>

                  {pagamenti.length === 0 ? (
                    <div style={{
                      textAlign: 'center',
                      padding: '2rem',
                      color: '#86868b'
                    }}>
                      <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>📄</span>
                      <p style={{ fontSize: '1rem', margin: 0 }}>Nessun pagamento registrato</p>
                    </div>
                  ) : (
                    <table style={{
                      width: '100%',
                      borderCollapse: 'collapse',
                      fontSize: '0.9375rem'
                    }}>
                      <thead>
                        <tr style={{
                          borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
                        }}>
                          <th style={{
                            textAlign: 'left',
                            padding: '1rem',
                            fontWeight: '600',
                            color: '#1d1d1f'
                          }}>Data</th>
                          <th style={{
                            textAlign: 'left',
                            padding: '1rem',
                            fontWeight: '600',
                            color: '#1d1d1f'
                          }}>Importo</th>
                          <th style={{
                            textAlign: 'center',
                            padding: '1rem',
                            fontWeight: '600',
                            color: '#1d1d1f'
                          }}>Azioni</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pagamenti.map((pagamento, index) => (
                          <tr key={index} style={{
                            borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
                          }}>
                            <td style={{
                              padding: '1rem',
                              color: '#1d1d1f'
                            }}>
                              {formatData(pagamento.data)}
                            </td>
                            <td style={{
                              padding: '1rem',
                              color: '#1d1d1f',
                              fontWeight: '500'
                            }}>
                              €{parseFloat(pagamento.importo).toFixed(2)}
                            </td>
                            <td style={{
                              padding: '1rem',
                              textAlign: 'center'
                            }}>
                              <div style={{
                                display: 'flex',
                                gap: '0.5rem',
                                justifyContent: 'center'
                              }} className="action-table-buttons">
                                <button
                                  onClick={() => handleEditPayment(pagamento)}
                                  style={{
                                    padding: '0.5rem',
                                    fontSize: '0.875rem',
                                    fontWeight: '600',
                                    border: 'none',
                                    borderRadius: '8px',
                                    background: 'rgba(0, 122, 255, 0.1)',
                                    color: '#007AFF',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                  }}
                                  className="table-button touch-target"
                                  onMouseEnter={(e) => {
                                    e.target.style.background = 'rgba(0, 122, 255, 0.2)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.style.background = 'rgba(0, 122, 255, 0.1)';
                                  }}
                                >
                                  ✏️
                                </button>
                                <button
                                  onClick={() => handleDeletePaymentInPaymentsTab(pagamento)}
                                  style={{
                                    padding: '0.5rem',
                                    fontSize: '0.875rem',
                                    fontWeight: '600',
                                    border: 'none',
                                    borderRadius: '8px',
                                    background: 'rgba(255, 59, 48, 0.1)',
                                    color: '#FF3B30',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                  }}
                                  className="table-button touch-target"
                                  onMouseEnter={(e) => {
                                    e.target.style.background = 'rgba(255, 59, 48, 0.2)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.style.background = 'rgba(255, 59, 48, 0.1)';
                                  }}
                                >
                                  🗑️
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'rate' && (
              <div style={{ padding: '2rem' }} className="card-content">
                {/* Card Rate Effettuate e Totale Rate */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: '2rem'
                }} className="stats-grid">

                  {/* Card Totale Rate */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(88, 86, 214, 0.1) 100%)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '1px solid rgba(0, 122, 255, 0.2)'
                  }} className="stat-card mobile-animate">
                    <h4 style={{
                      fontSize: '0.9375rem',
                      color: '#007AFF',
                      marginBottom: '0.5rem',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em'
                    }} className="stat-title">Totale Rate</h4>
                    <p style={{
                      fontSize: '2rem',
                      color: '#1d1d1f',
                      fontWeight: '700',
                      margin: 0,
                      letterSpacing: '-0.02em'
                    }} className="stat-value">
                      €{subscription.pagamenti ? subscription.pagamenti.reduce((totale, pagamento) => totale + parseFloat(pagamento.importo), 0).toFixed(2) : '0.00'}
                    </p>
                  </div>
                  
                  {/* Card Rate Effettuate */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(52, 199, 89, 0.1) 0%, rgba(88, 86, 214, 0.1) 100%)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '1px solid rgba(52, 199, 89, 0.2)'
                  }} className="stat-card mobile-animate mobile-animate-delay-1">
                    <h4 style={{
                      fontSize: '0.9375rem',
                      color: '#34C759',
                      marginBottom: '0.5rem',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em'
                    }} className="stat-title">Rate Effettuate</h4>
                    <p style={{
                      fontSize: '2rem',
                      color: '#1d1d1f',
                      fontWeight: '700',
                      margin: 0,
                      letterSpacing: '-0.02em'
                    }} className="stat-value">{pagamenti.length}</p>
                  </div>

                  
                </div>

                {/* Lista Pagamenti */}
                <div style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                }} className="payments-table table-scroll-container">
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem'
                  }}>
                    <h4 style={{
                      fontSize: '0.875rem',
                      color: '#86868b',
                      fontWeight: '600',
                      margin: 0
                    }}>Storico Pagamenti</h4>
                    <button
                      onClick={handleAddPayment}
                      style={{
                        padding: '0.5rem 1rem',
                        fontSize: '0.9375rem',
                        fontWeight: '600',
                        border: '1px solid #007AFF',
                        borderRadius: '8px',
                        background: 'white',
                        color: '#007AFF',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                      className="action-table-button touch-target"
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(0, 122, 255, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'white';
                      }}
                    >
                      <span style={{ fontSize: '1.1em' }}>+</span>
                      Aggiungi Rata
                    </button>
                  </div>

                  {subscription.pagamenti && subscription.pagamenti.length > 0 ? (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem'
                    }}>
                      {subscription.pagamenti.map((pagamento) => (
                        <div
                          key={pagamento.dataPagamento}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '1rem',
                            background: 'rgba(0, 0, 0, 0.02)',
                            borderRadius: '12px',
                            transition: 'all 0.2s ease'
                          }}
                          className="mobile-animate"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.04)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.02)';
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '10px',
                              background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(88, 86, 214, 0.1) 100%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1.25rem'
                            }}>
                              💰
                            </div>
                            <div>
                              <p style={{
                                fontSize: '0.9375rem',
                                fontWeight: '500',
                                color: '#86868b',
                                margin: '0 0 0.25rem 0'
                              }}>
                                {pagamento.descrizione}
                              </p>
                              <p style={{
                                fontSize: '0.8125rem',
                                color: '#86868b',
                                margin: 0
                              }}>
                                {new Date(pagamento.dataPagamento).toLocaleDateString('it-IT', {
                                  day: '2-digit',
                                  month: 'long',
                                  year: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                          }} className="action-table-buttons">
                            <p style={{
                              fontSize: '0.9375rem',
                              fontWeight: '600',
                              color: '#1d1d1f',
                              margin: 0
                            }}>
                              €{parseFloat(pagamento.importo).toFixed(2)}
                            </p>
                            <div style={{
                              display: 'flex',
                              gap: '0.5rem'
                            }}>
                              <span
                                onClick={() => handleEditPayment(pagamento)}
                                style={{
                                  cursor: 'pointer',
                                  fontSize: '1.25rem',
                                  transition: 'all 0.2s ease'
                                }}
                                className="table-button touch-target"
                                onMouseEnter={(e) => {
                                  e.target.style.transform = 'scale(1.1)';
                                  e.target.style.color = '#007AFF';
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.transform = 'scale(1)';
                                  e.target.style.color = '#86868b';
                                }}
                              >
                                ✏️
                              </span>
                              <span
                                onClick={() => handleDeletePayment(pagamento)}
                                style={{
                                  cursor: 'pointer',
                                  fontSize: '1.25rem',
                                  transition: 'all 0.2s ease'
                                }}
                                className="table-button touch-target"
                                onMouseEnter={(e) => {
                                  e.target.style.transform = 'scale(1.1)';
                                  e.target.style.color = '#FF3B30';
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.transform = 'scale(1)';
                                  e.target.style.color = '#86868b';
                                }}
                              >
                                🗑️
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{
                      textAlign: 'center',
                      padding: '2rem',
                      color: '#86868b'
                    }}>
                      <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>📄</span>
                      <p style={{ fontSize: '1rem', margin: 0 }}>Nessuna rata registrata</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'quote' && (
              <div style={{ padding: '2rem' }} className="card-content">
                {/* Card Totale Quotes */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(88, 86, 214, 0.1) 100%)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: '1px solid rgba(0, 122, 255, 0.2)',
                  marginBottom: '2rem'
                }} className="stat-card mobile-animate">
                  <h4 style={{
                    fontSize: '0.9375rem',
                    color: '#007AFF',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.02em'
                  }} className="stat-title">Quota per Persona</h4>
                  <p style={{
                    fontSize: '2rem',
                    color: '#1d1d1f',
                    fontWeight: '700',
                    margin: 0,
                    letterSpacing: '-0.02em'
                  }} className="stat-value">€{calcolaQuotaPerPersona().toFixed(2)}</p>
                </div>

                {/* Lista Quote */}
                <div style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                }} className="quotes-table table-scroll-container">
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem'
                  }}>
                    <h4 style={{
                      fontSize: '0.875rem',
                      color: '#86868b',
                      fontWeight: '600',
                      margin: 0
                    }}>Partecipanti e Pagamenti {subscription.frequenza === 'annuale' ? 'Annuali' : 'Mensili'}</h4>
                    
                    {subscription.frequenza !== 'annuale' && (
                      <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                        style={{
                          padding: '0.5rem 1rem',
                          fontSize: '0.9375rem',
                          color: '#1d1d1f',
                          background: 'white',
                          border: '1px solid rgba(0, 0, 0, 0.1)',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          outline: 'none',
                          transition: 'all 0.2s ease'
                        }}
                        className="touch-target"
                        onMouseEnter={(e) => {
                          e.target.style.borderColor = 'rgba(0, 122, 255, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                        }}
                      >
                        {Array.from({ length: 5 }, (_, index) => {
                          const year = new Date().getFullYear() - 2 + index;
                          return (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          );
                        })}
                      </select>
                    )}
                  </div>

                  {subscription.persone && subscription.persone.length > 0 ? (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.5rem'
                    }} className="people-section">
                      {subscription.persone.map((persona) => (
                        <div
                          key={persona}
                          style={{
                            background: 'rgba(0, 0, 0, 0.02)',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            transition: 'all 0.2s ease'
                          }}
                          className="person-card mobile-animate"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.04)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.02)';
                          }}
                        >
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '1rem'
                          }} className="person-header">
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '1rem'
                            }}>
                              <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '10px',
                                background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(88, 86, 214, 0.1) 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.25rem'
                              }}>
                                👤
                              </div>
                              <div>
                                <p style={{
                                  fontSize: '0.9375rem',
                                  fontWeight: '600',
                                  color: '#1d1d1f',
                                  margin: '0 0 0.25rem 0'
                                }} className="person-name">
                                  {persona}
                                </p>
                                <p style={{
                                  fontSize: '0.8125rem',
                                  color: '#86868b',
                                  margin: 0
                                }} className="person-total">
                                  €{calcolaTotalePagato(persona)}
                                </p>
                              </div>
                            </div>
                            <span
                              onClick={() => svuotaPagamentiPersona(persona)}
                              style={{
                                fontSize: '0.875rem',
                                color: '#86868b',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                              }}
                              className="touch-target"
                              onMouseEnter={(e) => {
                                e.target.style.color = '#FF3B30';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.color = '#86868b';
                              }}
                            >
                              Svuota
                            </span>
                          </div>

                          {/* Griglia dei mesi */}
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: subscription.frequenza === 'annuale' ? 'repeat(auto-fill, minmax(150px, 1fr))' : 'repeat(auto-fill, minmax(100px, 1fr))',
                            gap: '0.75rem',
                            marginTop: '1rem'
                          }} className="people-grid">
                            {subscription.frequenza === 'annuale' ? (
                              // Per abbonamenti annuali, mostra solo gli anni
                              Array.from({ length: 5 }, (_, index) => {
                                const anno = new Date().getFullYear() + index;
                                const pagato = hasPagato(persona, 'Anno', anno);

                                return (
                                  <button
                                    key={`${persona}-${anno}`}
                                    onClick={() => togglePagamentoPersona(persona, 'Anno', anno)}
                                    style={{
                                      padding: '0.75rem',
                                      fontSize: '0.9375rem',
                                      fontWeight: '500',
                                      border: '1px solid',
                                      borderColor: pagato ? '#34C759' : 'rgba(0, 0, 0, 0.1)',
                                      borderRadius: '8px',
                                      background: pagato ? 'rgba(52, 199, 89, 0.1)' : 'transparent',
                                      color: pagato ? '#34C759' : '#86868b',
                                      cursor: 'pointer',
                                      transition: 'all 0.2s ease',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      gap: '0.5rem'
                                    }}
                                    className="table-button touch-target"
                                    onMouseEnter={(e) => {
                                      if (!pagato) {
                                        e.target.style.background = 'rgba(52, 199, 89, 0.05)';
                                        e.target.style.borderColor = 'rgba(52, 199, 89, 0.3)';
                                      }
                                    }}
                                    onMouseLeave={(e) => {
                                      if (!pagato) {
                                        e.target.style.background = 'transparent';
                                        e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                                      }
                                    }}
                                  >
                                    {pagato && <span>✓</span>}
                                    {anno}
                                  </button>
                                );
                              })
                            ) : (
                              // Per abbonamenti mensili, mostra i mesi
                              ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'].map((mese) => {
                                const pagato = hasPagato(persona, mese, selectedYear);

                                return (
                                  <button
                                    key={`${persona}-${mese}-${selectedYear}`}
                                    onClick={() => togglePagamentoPersona(persona, mese, selectedYear)}
                                    style={{
                                      padding: '0.75rem',
                                      fontSize: '0.875rem',
                                      fontWeight: '500',
                                      border: '1px solid',
                                      borderColor: pagato ? '#34C759' : 'rgba(0, 0, 0, 0.1)',
                                      borderRadius: '8px',
                                      background: pagato ? 'rgba(52, 199, 89, 0.1)' : 'transparent',
                                      color: pagato ? '#34C759' : '#86868b',
                                      cursor: 'pointer',
                                      transition: 'all 0.2s ease',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      gap: '0.5rem'
                                    }}
                                    className="table-button touch-target"
                                    onMouseEnter={(e) => {
                                      if (!pagato) {
                                        e.target.style.background = 'rgba(52, 199, 89, 0.05)';
                                        e.target.style.borderColor = 'rgba(52, 199, 89, 0.3)';
                                      }
                                    }}
                                    onMouseLeave={(e) => {
                                      if (!pagato) {
                                        e.target.style.background = 'transparent';
                                        e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                                      }
                                    }}
                                  >
                                    {pagato && <span>✓</span>}
                                    {mese.substring(0, 3)}
                                  </button>
                                );
                              })
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{
                      textAlign: 'center',
                      padding: '2rem',
                      color: '#86868b'
                    }}>
                      <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>👥</span>
                      <p style={{ fontSize: '1rem', margin: 0 }}>Nessuna persona aggiunta</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Danger Zone */}
          <div style={{
            marginTop: '3rem',
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(255, 59, 48, 0.2)',
            width: '100%'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#FF3B30',
              margin: '0 0 1rem 0',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              letterSpacing: '-0.01em'
            }}>
              Zona Pericolosa
            </h3>
            <p style={{
              fontSize: '1rem',
              color: '#86868b',
              margin: '0 0 1.5rem 0',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              lineHeight: '1.5'
            }}>
              Una volta eliminato, questo abbonamento non potrà essere recuperato. Tutti i dati associati verranno persi definitivamente.
            </p>
            <button
              onClick={() => setShowDeleteModal(true)}
              style={{
                padding: '12px 24px',
                fontSize: '1rem',
                fontWeight: '600',
                border: '1px solid #FF3B30',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.8)',
                color: '#FF3B30',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#FF3B30';
                e.target.style.color = 'white';
                e.target.style.borderColor = 'transparent';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                e.target.style.color = '#FF3B30';
                e.target.style.borderColor = '#FF3B30';
              }}
            >
              <span style={{ fontSize: '1.1em' }}>🗑️</span>
              Elimina abbonamento
            </button>
          </div>
        </div>
      </div>

      {/* Modale Conferma Eliminazione */}
      {showDeletePaymentModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            width: '90%',
            maxWidth: '400px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#1d1d1f',
              margin: '0 0 1rem 0'
            }}>
              Conferma eliminazione
            </h3>
            <p style={{
              fontSize: '1rem',
              color: '#86868b',
              margin: '0 0 1.5rem 0',
              lineHeight: '1.5'
            }}>
              Sei sicuro di voler eliminare questa rata?
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => setShowDeletePaymentModal(false)}
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.9375rem',
                  fontWeight: '600',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  background: 'white',
                  color: '#1d1d1f',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                }}
              >
                Annulla
              </button>
              <button
                onClick={() => {
                  handleDeletePaymentInPaymentsTab(pagamentoDaEliminare);
                  setShowDeletePaymentModal(false);
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.9375rem',
                  fontWeight: '600',
                  border: 'none',
                  borderRadius: '8px',
                  background: '#FF3B30',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#FF2D55';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FF3B30';
                }}
              >
                Elimina
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modale Eliminazione Abbonamento */}
      {showDeleteModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            width: '90%',
            maxWidth: '400px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }} className="modal-content">
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#1d1d1f',
              margin: '0 0 1rem 0'
            }} className="modal-title">
              Conferma eliminazione
            </h3>
            <p style={{
              fontSize: '1rem',
              color: '#86868b',
              margin: '0 0 1.5rem 0',
              lineHeight: '1.5'
            }}>
              Sei sicuro di voler eliminare questo abbonamento? Questa azione non può essere annullata.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'flex-end'
            }} className="modal-buttons">
              <button
                onClick={() => setShowDeleteModal(false)}
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.9375rem',
                  fontWeight: '600',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  background: 'white',
                  color: '#1d1d1f',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                className="modal-button touch-target"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                }}
              >
                Annulla
              </button>
              <button
                onClick={handleDeleteSubscription}
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.9375rem',
                  fontWeight: '600',
                  border: 'none',
                  borderRadius: '8px',
                  background: '#FF3B30',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                className="modal-button touch-target"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#FF2D55';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FF3B30';
                }}
              >
                Elimina
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modale per aggiungere/modificare una rata */}
      {showPaymentModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '400px',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)'
          }} className="modal-content">
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#1d1d1f',
              margin: '0 0 1.5rem 0'
            }} className="modal-title">
              {editingPayment ? 'Modifica rata' : 'Aggiungi rata'}
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#1d1d1f',
                  marginBottom: '0.5rem'
                }}>
                  Data pagamento
                </label>
                <input
                  type="date"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d2d2d7',
                    borderRadius: '8px',
                    fontSize: '0.9375rem',
                    color: '#1d1d1f',
                    background: 'white',
                    transition: 'all 0.2s ease'
                  }}
                  className="modal-input"
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#1d1d1f',
                  marginBottom: '0.5rem'
                }}>
                  Importo
                </label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="Inserisci l'importo"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d2d2d7',
                    borderRadius: '8px',
                    fontSize: '0.9375rem',
                    color: '#1d1d1f',
                    background: 'white',
                    transition: 'all 0.2s ease'
                  }}
                  className="modal-input"
                />
              </div>

              <div style={{
                display: 'flex',
                gap: '1rem',
                marginTop: '1rem'
              }} className="modal-buttons">
                <button
                  onClick={() => {
                    setShowPaymentModal(false);
                    setSelectedMonth('');
                    setPaymentAmount('');
                    setEditingPayment(null);
                  }}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    border: '1px solid #d2d2d7',
                    borderRadius: '8px',
                    background: 'white',
                    color: '#1d1d1f',
                    fontSize: '0.9375rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  className="modal-button touch-target"
                >
                  Annulla
                </button>
                <button
                  onClick={handlePaymentSubmit}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    border: 'none',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #007AFF, #5856D6)',
                    color: 'white',
                    fontSize: '0.9375rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 8px rgba(0, 122, 255, 0.2)'
                  }}
                  className="modal-button touch-target"
                >
                  {editingPayment ? 'Salva modifiche' : 'Aggiungi rata'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @media (max-width: 768px) {
            /* Container principale */
            .subscription-detail-container {
              padding: 1rem !important;
            }
            
            /* Header responsive */
            .subscription-header {
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 1rem !important;
              margin-bottom: 1.5rem !important;
            }
            
            .subscription-info {
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 1rem !important;
              width: 100% !important;
            }
            
            .subscription-logo {
              width: 60px !important;
              height: 60px !important;
              border-radius: 12px !important;
            }
            
            .subscription-title {
              font-size: clamp(1.5rem, 6vw, 2rem) !important;
              line-height: 1.2 !important;
            }
            
            .subscription-subtitle {
              font-size: clamp(0.875rem, 3vw, 1rem) !important;
            }
            
            /* Pulsanti azione */
            .action-buttons {
              flex-direction: column !important;
              width: 100% !important;
              gap: 0.75rem !important;
            }
            
            .action-button {
              width: 100% !important;
              justify-content: center !important;
              padding: 0.875rem 1rem !important;
              font-size: clamp(0.875rem, 3vw, 0.9375rem) !important;
            }
            
            /* Tabs di navigazione */
            .tabs-container {
              width: 100% !important;
              overflow-x: auto !important;
              padding: 0.75rem !important;
              margin-bottom: 1rem !important;
            }
            
            .tabs-scroll {
              display: flex !important;
              gap: 0.5rem !important;
              min-width: max-content !important;
            }
            
            .tab-button {
              padding: 0.75rem 1rem !important;
              font-size: clamp(0.75rem, 2.5vw, 0.875rem) !important;
              white-space: nowrap !important;
              min-width: fit-content !important;
            }
            
            /* Card principale */
            .main-card {
              border-radius: 16px !important;
              margin: 0 !important;
            }
            
            .card-content {
              padding: 1rem !important;
            }
            
            /* Grid delle statistiche */
            .stats-grid {
              grid-template-columns: 1fr !important;
              gap: 1rem !important;
              margin-bottom: 1.5rem !important;
            }
            
            .stat-card {
              padding: 1.25rem !important;
              border-radius: 12px !important;
            }
            
            .stat-title {
              font-size: clamp(0.75rem, 2.5vw, 0.875rem) !important;
            }
            
            .stat-value {
              font-size: clamp(1.5rem, 5vw, 2rem) !important;
            }
            
            /* Dettagli aggiuntivi */
            .details-container {
              grid-template-columns: 1fr !important;
              gap: 1.5rem !important;
              padding: 1.25rem !important;
            }
            
            .detail-item {
              padding: 1rem !important;
            }
            
            .detail-title {
              font-size: clamp(0.75rem, 2.5vw, 0.875rem) !important;
            }
            
            .detail-value {
              font-size: clamp(0.875rem, 3vw, 1rem) !important;
            }
            
            /* Promemoria pagamento */
            .payment-reminder {
              margin: 1rem 0 !important;
              padding: 1rem !important;
              border-radius: 12px !important;
            }
            
            .reminder-title {
              font-size: clamp(0.875rem, 3vw, 1rem) !important;
            }
            
            .reminder-text {
              font-size: clamp(0.75rem, 2.5vw, 0.875rem) !important;
            }
            
            /* Tabella pagamenti */
            .payments-table {
              overflow-x: auto !important;
              border-radius: 12px !important;
            }
            
            .payments-table table {
              min-width: 500px !important;
              font-size: clamp(0.75rem, 2.5vw, 0.875rem) !important;
            }
            
            .payments-table th,
            .payments-table td {
              padding: 0.75rem 0.5rem !important;
            }
            
            /* Tabella quote */
            .quotes-table {
              overflow-x: auto !important;
              border-radius: 12px !important;
            }
            
            .quotes-table table {
              min-width: 600px !important;
              font-size: clamp(0.75rem, 2.5vw, 0.875rem) !important;
            }
            
            .quotes-table th,
            .quotes-table td {
              padding: 0.5rem !important;
              min-width: 60px !important;
            }
            
            /* Pulsanti nelle tabelle */
            .table-button {
              padding: 0.5rem !important;
              font-size: clamp(0.75rem, 2.5vw, 0.875rem) !important;
              min-width: 44px !important;
              height: 44px !important;
            }
            
            /* Modali */
            .modal-content {
              margin: 1rem !important;
              padding: 1.5rem !important;
              border-radius: 12px !important;
              max-width: calc(100vw - 2rem) !important;
            }
            
            .modal-title {
              font-size: clamp(1.125rem, 4vw, 1.25rem) !important;
            }
            
            .modal-input {
              padding: 0.875rem !important;
              font-size: clamp(0.875rem, 3vw, 0.9375rem) !important;
            }
            
            .modal-buttons {
              flex-direction: column !important;
              gap: 0.75rem !important;
            }
            
            .modal-button {
              width: 100% !important;
              padding: 0.875rem !important;
              font-size: clamp(0.875rem, 3vw, 0.9375rem) !important;
            }
            
            /* Pulsanti di azione nelle tabelle */
            .action-table-buttons {
              flex-direction: column !important;
              gap: 0.5rem !important;
              align-items: stretch !important;
            }
            
            .action-table-button {
              width: 100% !important;
              justify-content: center !important;
              padding: 0.75rem !important;
              font-size: clamp(0.75rem, 2.5vw, 0.875rem) !important;
            }
            
            /* Gestione persone */
            .people-section {
              padding: 1rem !important;
            }
            
            .people-grid {
              grid-template-columns: 1fr !important;
              gap: 1rem !important;
            }
            
            .person-card {
              padding: 1rem !important;
              border-radius: 12px !important;
            }
            
            .person-header {
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 0.75rem !important;
            }
            
            .person-name {
              font-size: clamp(1rem, 3.5vw, 1.125rem) !important;
            }
            
            .person-total {
              font-size: clamp(1.25rem, 4vw, 1.5rem) !important;
            }
            
            /* Scroll orizzontale per tabelle */
            .table-scroll-container {
              overflow-x: auto !important;
              -webkit-overflow-scrolling: touch !important;
              border-radius: 12px !important;
              margin: 0 -1rem !important;
              padding: 0 1rem !important;
            }
            
            /* Ottimizzazioni per touch */
            .touch-target {
              min-height: 44px !important;
              min-width: 44px !important;
            }
            
            /* Spacing ottimizzato per mobile */
            .mobile-spacing {
              margin-bottom: 1rem !important;
            }
            
            .mobile-padding {
              padding: 1rem !important;
            }
          }
          
          @media (max-width: 480px) {
            /* Ottimizzazioni per schermi molto piccoli */
            .subscription-detail-container {
              padding: 0.75rem !important;
            }
            
            .subscription-title {
              font-size: clamp(1.25rem, 5vw, 1.75rem) !important;
            }
            
            .subscription-subtitle {
              font-size: clamp(0.75rem, 2.5vw, 0.875rem) !important;
            }
            
            .action-button {
              padding: 1rem !important;
              font-size: clamp(0.875rem, 3vw, 0.9375rem) !important;
            }
            
            .tab-button {
              padding: 0.875rem 0.75rem !important;
              font-size: clamp(0.75rem, 2.5vw, 0.875rem) !important;
            }
            
            .card-content {
              padding: 0.75rem !important;
            }
            
            .stat-card {
              padding: 1rem !important;
            }
            
            .details-container {
              padding: 1rem !important;
            }
            
            .modal-content {
              margin: 0.5rem !important;
              padding: 1.25rem !important;
            }
            
            /* Tabella responsive per schermi molto piccoli */
            .payments-table table,
            .quotes-table table {
              font-size: clamp(0.625rem, 2vw, 0.75rem) !important;
            }
            
            .payments-table th,
            .payments-table td,
            .quotes-table th,
            .quotes-table td {
              padding: 0.5rem 0.25rem !important;
            }
          }
          
          @media (min-width: 769px) {
            /* Mantieni il layout desktop per schermi grandi */
            .subscription-header {
              flex-direction: row !important;
              align-items: flex-start !important;
            }
            
            .subscription-info {
              flex-direction: row !important;
              align-items: center !important;
            }
            
            .action-buttons {
              flex-direction: row !important;
              width: auto !important;
            }
            
            .action-button {
              width: auto !important;
            }
            
            .stats-grid {
              grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important;
            }
            
            .details-container {
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) !important;
            }
            
            .people-grid {
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) !important;
            }
            
            .person-header {
              flex-direction: row !important;
              align-items: center !important;
            }
          }
          
          /* Animazioni per mobile */
          @media (max-width: 768px) {
            @keyframes slideInUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            .mobile-animate {
              animation: slideInUp 0.3s ease-out both;
            }
            
            .mobile-animate-delay-1 {
              animation-delay: 0.1s;
            }
            
            .mobile-animate-delay-2 {
              animation-delay: 0.2s;
            }
            
            .mobile-animate-delay-3 {
              animation-delay: 0.3s;
            }
          }
        `}
      </style>
    </Layout>
  );
}

export default SubscriptionDetail; 