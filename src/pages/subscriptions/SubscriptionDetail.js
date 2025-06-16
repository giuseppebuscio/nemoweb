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
    const mesi = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
    const anno = new Date().getFullYear();
    const quotaPerMese = calcolaQuotaPerPersona();
    
    const totale = mesi.reduce((totale, mese) => {
      return totale + (hasPagato(persona, mese, anno) ? quotaPerMese : 0);
    }, 0);

    // Arrotonda all'euro superiore
    return Math.ceil(totale);
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
    setPagamentiPersone(prev => {
      const newPagamenti = { ...prev };
      // Rimuovi tutti i pagamenti della persona per ogni mese dell'anno corrente
      const mesi = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
      mesi.forEach(mese => {
        delete newPagamenti[`${persona}-${mese}-${new Date().getFullYear()}`];
      });
      return newPagamenti;
    });
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

  return (
    <Layout>
      <div style={{ 
        padding: '2rem',
        background: 'linear-gradient(135deg, #f5f5f7 0%, #ffffff 100%)',
        minHeight: '100vh',
        width: '100%'
      }}>
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
          }}>
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              alignItems: 'center'
            }}>
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
                }}>
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
                }}>
                  {subscription.nome}
                </h1>
                <p style={{
                  fontSize: '1.125rem',
                  color: '#86868b',
                  margin: 0,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  fontWeight: '400',
                  textAlign: 'left'
                }}>
                  {formatFrequency(subscription)}
                </p>
              </div>
            </div>

            {/* Pulsanti azione */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center'
            }}>
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
                onClick={() => navigate(`/abbonamenti/${id}/modifica`)}
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
          }}>
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
              >
                {capitalizeFirstLetter(tab)}
              </button>
            ))}
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
          }}>
            {/* Contenuto del tab */}
            {activeTab === 'informazioni' && (
              <div style={{ padding: '2rem' }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '2rem',
                  marginBottom: '2rem',
                  width: '100%'
                }}>
                  {/* Prezzo Totale */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(88, 86, 214, 0.1) 100%)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '1px solid rgba(0, 122, 255, 0.2)',
                    width: '100%'
                  }}>
                    <h4 style={{
                      fontSize: '0.9375rem',
                      color: '#007AFF',
                      marginBottom: '0.5rem',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em',
                      textAlign: 'left'
                    }}>Prezzo Totale</h4>
                    <p style={{
                      fontSize: '2rem',
                      color: '#1d1d1f',
                      fontWeight: '700',
                      margin: 0,
                      letterSpacing: '-0.02em',
                      textAlign: 'left'
                    }}>€{formatTotale(subscription.prezzo)}</p>
                  </div>

                  {/* Tipo di Pagamento */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(88, 86, 214, 0.1) 100%)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '1px solid rgba(0, 122, 255, 0.2)',
                    width: '100%'
                  }}>
                    <h4 style={{
                      fontSize: '0.9375rem',
                      color: '#007AFF',
                      marginBottom: '0.5rem',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em',
                      textAlign: 'left'
                    }}>
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
                  }}>
                    <h4 style={{
                      fontSize: '0.9375rem',
                      color: '#5856D6',
                      marginBottom: '0.5rem',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em',
                      textAlign: 'left'
                    }}>Quota per Persona</h4>
                    <p style={{
                      fontSize: '2rem',
                      color: '#1d1d1f',
                      fontWeight: '700',
                      margin: 0,
                      letterSpacing: '-0.02em',
                      textAlign: 'left'
                    }}>€{formatTotale(calcolaQuotaPerPersona().toFixed(2))}</p>
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
                }}>
                  {/* Frequenza */}
                  <div>
                    <h4 style={{
                      fontSize: '0.875rem',
                      color: '#86868b',
                      marginBottom: '0.5rem',
                      fontWeight: '600'
                    }}>Frequenza</h4>
                    <p style={{
                      fontSize: '1rem',
                      color: '#1d1d1f',
                      fontWeight: '500',
                      margin: 0
                    }}>{formatFrequency(subscription)}</p>
                  </div>

                  {/* Data Creazione */}
                  <div>
                    <h4 style={{
                      fontSize: '0.875rem',
                      color: '#86868b',
                      marginBottom: '0.5rem',
                      fontWeight: '600'
                    }}>Data Inizio Abbonamento</h4>
                    <p style={{
                      fontSize: '1rem',
                      color: '#1d1d1f',
                      fontWeight: '500',
                      margin: 0
                    }}>{formatData(subscription.dataInizio)}</p>
                  </div>

                  {/* Ultimo Pagamento */}
                  <div>
                    <h4 style={{
                      fontSize: '0.875rem',
                      color: '#86868b',
                      marginBottom: '0.5rem',
                      fontWeight: '600'
                    }}>Ultimo Pagamento</h4>
                    <p style={{
                      fontSize: '1rem',
                      color: '#1d1d1f',
                      fontWeight: '500',
                      margin: 0
                    }}>{getUltimoPagamento() ? formatData(getUltimoPagamento().data) : 'Nessun pagamento'}</p>
                  </div>
                </div>

                {/* Persone Coinvolte */}
                <div style={{
                  marginTop: '2rem',
                  background: 'white',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  width: '100%'
                }}>
                  <h4 style={{
                    fontSize: '0.875rem',
                    color: '#86868b',
                    marginBottom: '1rem',
                    fontWeight: '600',
                    textAlign: 'left'
                  }}>Persone Coinvolte</h4>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                    alignItems: 'flex-start'
                  }}>
                    <span style={{
                      fontSize: '0.9375rem',
                      color: '#007AFF',
                      fontWeight: '500',
                      background: 'rgba(0, 122, 255, 0.1)',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(0, 122, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span style={{ fontSize: '1.1em' }}>👤</span>
                      Tu
                    </span>
                    {subscription.persone && subscription.persone.map((persona, index) => (
                      <span key={index} style={{
                        fontSize: '0.9375rem',
                        color: '#5856D6',
                        fontWeight: '500',
                        background: 'rgba(88, 86, 214, 0.1)',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        border: '1px solid rgba(88, 86, 214, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <span style={{ fontSize: '1.1em' }}>👥</span>
                        {persona}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pagamenti' && (
              <div style={{ padding: '2rem' }}>
                {/* Cards Totali */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: '2rem'
                }}>
                  {/* Card Totale Pagamenti */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(88, 86, 214, 0.1) 100%)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '1px solid rgba(0, 122, 255, 0.2)'
                  }}>
                    <h4 style={{
                      fontSize: '0.9375rem',
                      color: '#007AFF',
                      marginBottom: '0.5rem',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em'
                    }}>Totale Pagamenti</h4>
                    <p style={{
                      fontSize: '2rem',
                      color: '#1d1d1f',
                      fontWeight: '700',
                      margin: 0,
                      letterSpacing: '-0.02em'
                    }}>€{formatTotale(calcolaTotale())}</p>
                  </div>

                  {/* Card Mesi Pagati */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(52, 199, 89, 0.1) 0%, rgba(48, 209, 88, 0.1) 100%)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '1px solid rgba(52, 199, 89, 0.2)'
                  }}>
                    <h4 style={{
                      fontSize: '0.9375rem',
                      color: '#34C759',
                      marginBottom: '0.5rem',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em'
                    }}>{subscription.frequenza === 'annuale' ? 'Anni Pagati' : 'Mesi Pagati'}</h4>
                    <p style={{
                      fontSize: '2rem',
                      color: '#1d1d1f',
                      fontWeight: '700',
                      margin: 0,
                      letterSpacing: '-0.02em'
                    }}>{pagamenti.length}</p>
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
                  }}>
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
                      }}>
                        Pagamenti mancanti
                      </h3>
                    </div>
                    <p style={{
                      fontSize: '1rem',
                      color: '#86868b',
                      margin: '0 0 1rem 0',
                      lineHeight: '1.4'
                    }}>
                      {getTestoPromemoria()}
                    </p>
                    <div style={{
                      display: 'flex',
                      gap: '1rem',
                      flexWrap: 'wrap'
                    }}>
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
                  }}>
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
                      }}>
                        Abbonamento pagato
                      </h3>
                    </div>
                    <p style={{
                      fontSize: '1rem',
                      color: '#86868b',
                      margin: 0,
                      lineHeight: '1.4'
                    }}>
                      L'abbonamento è stato pagato correttamente questo mese
                    </p>
                  </div>
                )}

                {/* Lista Pagamenti */}
                <div style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                }}>
                  <h4 style={{
                    fontSize: '0.875rem',
                    color: '#86868b',
                    marginBottom: '1.5rem',
                    fontWeight: '600'
                  }}>Storico Pagamenti</h4>
                  
                  {pagamenti.length === 0 ? (
                    <p style={{
                      fontSize: '0.9375rem',
                      color: '#86868b',
                      textAlign: 'center',
                      padding: '2rem',
                      background: 'rgba(0, 0, 0, 0.02)',
                      borderRadius: '12px',
                      margin: 0
                    }}>
                      Nessun pagamento registrato
                    </p>
                  ) : (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem'
                    }}>
                      {pagamenti.sort((a, b) => new Date(b.data) - new Date(a.data)).map((pagamento, index) => (
                        <div
                          key={pagamento.data}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '1rem',
                            background: 'rgba(0, 0, 0, 0.02)',
                            borderRadius: '12px',
                            transition: 'all 0.2s ease'
                          }}
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
                                {formatData(pagamento.data)}
                              </p>
                              <p style={{
                                fontSize: '1rem',
                                fontWeight: '600',
                                color: '#1d1d1f',
                                margin: 0
                              }}>
                                €{formatTotale(pagamento.importo)}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setPagamentoDaEliminare(pagamento);
                              setShowDeletePaymentModal(true);
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              padding: '8px',
                              cursor: 'pointer',
                              color: '#FF3B30',
                              borderRadius: '8px',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(255, 59, 48, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'none';
                            }}
                          >
                            🗑️
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'rate' && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                width: '100%'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%'
                }}>
                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: '#1d1d1f',
                    margin: 0
                  }}>
                    Rate
                  </h2>
                  <button
                    onClick={handleAddPayment}
                    style={{
                      padding: '8px 16px',
                      fontSize: '0.9375rem',
                      fontWeight: '600',
                      border: 'none',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, #007AFF, #5856D6)',
                      color: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 2px 8px rgba(0, 122, 255, 0.2)'
                    }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>+</span>
                    Aggiungi rata
                  </button>
                </div>

                {/* Cards Totali */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: '1.5rem'
                }}>
                  {/* Card Totale Pagamenti */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(88, 86, 214, 0.1) 100%)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '1px solid rgba(0, 122, 255, 0.2)'
                  }}>
                    <h4 style={{
                      fontSize: '0.9375rem',
                      color: '#007AFF',
                      marginBottom: '0.5rem',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em'
                    }}>Totale Pagamenti</h4>
                    <p style={{
                      fontSize: '2rem',
                      color: '#1d1d1f',
                      fontWeight: '700',
                      margin: 0,
                      letterSpacing: '-0.02em'
                    }}>€{formatTotale(calcolaTotale())}</p>
                  </div>

                  {/* Card Numero Rate */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(52, 199, 89, 0.1) 0%, rgba(48, 209, 88, 0.1) 100%)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '1px solid rgba(52, 199, 89, 0.2)'
                  }}>
                    <h4 style={{
                      fontSize: '0.9375rem',
                      color: '#34C759',
                      marginBottom: '0.5rem',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em'
                    }}>Rate Effettuate</h4>
                    <p style={{
                      fontSize: '2rem',
                      color: '#1d1d1f',
                      fontWeight: '700',
                      margin: 0,
                      letterSpacing: '-0.02em'
                    }}>{subscription.pagamenti?.filter(p => p.pagato).length || 0}</p>
                  </div>
                </div>

                {/* Storico Pagamenti */}
                <div style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                }}>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: '#1d1d1f',
                    margin: '0 0 1.5rem 0'
                  }}>
                    Storico pagamenti
                  </h3>

                  {subscription.pagamenti?.filter(p => p.pagato).length > 0 ? (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem'
                    }}>
                      {subscription.pagamenti
                        .filter(p => p.pagato)
                        .sort((a, b) => new Date(b.dataPagamento) - new Date(a.dataPagamento))
                        .map((pagamento, index) => (
                          <div
                            key={index}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: '1rem',
                              background: 'rgba(0, 0, 0, 0.02)',
                              borderRadius: '12px',
                              transition: 'all 0.2s ease'
                            }}
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
                                  {new Date(pagamento.dataPagamento).toLocaleDateString('it-IT', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric'
                                  })}
                                </p>
                                <p style={{
                                  fontSize: '1rem',
                                  fontWeight: '600',
                                  color: '#1d1d1f',
                                  margin: 0
                                }}>
                                  €{formatTotale(pagamento.importo)}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => handleEditPayment(pagamento)}
                              style={{
                                padding: '8px',
                                border: 'none',
                                background: 'transparent',
                                color: '#86868b',
                                cursor: 'pointer',
                                fontSize: '1.2rem',
                                transition: 'color 0.2s ease',
                                borderRadius: '8px'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
                                e.currentTarget.style.color = '#007AFF';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = '#86868b';
                              }}
                              title="Modifica rata"
                            >
                              ✏️
                            </button>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div style={{
                      padding: '3rem 2rem',
                      textAlign: 'center',
                      background: 'rgba(0, 0, 0, 0.02)',
                      borderRadius: '12px'
                    }}>
                      <div style={{
                        fontSize: '3rem',
                        marginBottom: '1rem',
                        color: '#86868b'
                      }}>
                        💸
                      </div>
                      <p style={{
                        fontSize: '1rem',
                        color: '#86868b',
                        margin: 0,
                        lineHeight: '1.5'
                      }}>
                        Nessun pagamento registrato
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'quote' && (
              <div style={{ padding: '2rem' }}>
                {/* Card Totale Quotes */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(88, 86, 214, 0.1) 100%)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: '1px solid rgba(0, 122, 255, 0.2)',
                  marginBottom: '2rem'
                }}>
                  <h4 style={{
                    fontSize: '0.9375rem',
                    color: '#007AFF',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.02em'
                  }}>Quota per Persona</h4>
                  <p style={{
                    fontSize: '2rem',
                    color: '#1d1d1f',
                    fontWeight: '700',
                    margin: 0,
                    letterSpacing: '-0.02em'
                  }}>€{calcolaQuotaPerPersona().toFixed(2)}</p>
                </div>

                {/* Lista Quote */}
                <div style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                }}>
                  <h4 style={{
                    fontSize: '0.875rem',
                    color: '#86868b',
                    marginBottom: '1.5rem',
                    fontWeight: '600'
                  }}>Partecipanti e Pagamenti Mensili</h4>

                  {subscription.persone && subscription.persone.length > 0 ? (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.5rem'
                    }}>
                      {subscription.persone.map((persona) => (
                        <div
                          key={persona}
                          style={{
                            background: 'rgba(0, 0, 0, 0.02)',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            transition: 'all 0.2s ease'
                          }}
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
                          }}>
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
                                }}>
                                  {persona}
                                </p>
                                <p style={{
                                  fontSize: '0.8125rem',
                                  color: '#86868b',
                                  margin: 0
                                }}>
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
                            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                            gap: '0.75rem',
                            marginTop: '1rem'
                          }}>
                            {Array.from({ length: 12 }, (_, index) => {
                              const mesi = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
                              const mese = mesi[index];
                              const pagato = hasPagato(persona, mese);

                              return (
                                <button
                                  key={`${persona}-${mese}`}
                                  onClick={() => togglePagamentoPersona(persona, mese)}
                                  style={{
                                    padding: '0.5rem',
                                    fontSize: '0.8125rem',
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
                                    gap: '0.25rem'
                                  }}
                                  onMouseEnter={(e) => {
                                    if (!pagato) {
                                      e.target.style.background = 'rgba(0, 0, 0, 0.05)';
                                      e.target.style.borderColor = 'rgba(0, 0, 0, 0.2)';
                                    }
                                  }}
                                  onMouseLeave={(e) => {
                                    if (!pagato) {
                                      e.target.style.background = 'transparent';
                                      e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                                    }
                                  }}
                                >
                                  {mese.slice(0, 3)}
                                  {pagato ? ' ✓' : ''}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{
                      fontSize: '0.9375rem',
                      color: '#86868b',
                      textAlign: 'center',
                      padding: '2rem',
                      background: 'rgba(0, 0, 0, 0.02)',
                      borderRadius: '12px',
                      margin: 0
                    }}>
                      Nessun partecipante aggiunto
                    </p>
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

      {/* Modal di conferma eliminazione */}
      {showDeleteModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '2rem',
            maxWidth: '420px',
            width: '90%',
            boxShadow: '0 24px 48px rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontSize: '1.375rem',
              fontWeight: '700',
              color: '#1d1d1f',
              margin: '0 0 1rem 0'
            }}>
              Elimina abbonamento
            </h3>
            <p style={{
              fontSize: '1.0625rem',
              color: '#86868b',
              margin: '0 0 2rem 0',
              lineHeight: '1.5'
            }}>
              Sei sicuro di voler eliminare l'abbonamento "{subscription.nome}"? Questa azione non può essere annullata.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: '1rem',
              width: '100%'
            }}>
              <button
                onClick={() => setShowDeleteModal(false)}
                style={{
                  padding: '12px 20px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  border: '1px solid #007AFF',
                  borderRadius: '12px',
                  background: 'transparent',
                  color: '#007AFF',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  width: '100%',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#007AFF';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#007AFF';
                }}
              >
                Annulla
              </button>
              <button
                onClick={handleDelete}
                style={{
                  padding: '12px 20px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  border: '1px solid #FF3B30',
                  borderRadius: '12px',
                  background: 'transparent',
                  color: '#FF3B30',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  width: '100%',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#FF3B30';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#FF3B30';
                }}
              >
                Elimina
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modale Elimina Pagamento */}
      {showDeletePaymentModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            borderRadius: '16px',
            padding: '2rem',
            width: '90%',
            maxWidth: '400px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.4)'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#1d1d1f',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              Elimina pagamento
            </h3>
            <p style={{
              fontSize: '1rem',
              color: '#86868b',
              marginBottom: '2rem',
              textAlign: 'center',
              lineHeight: '1.5'
            }}>
              Sei sicuro di voler eliminare questo pagamento? L'azione non può essere annullata.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
              <button
                onClick={() => setShowDeletePaymentModal(false)}
                style={{
                  flex: 2,
                  padding: '0.75rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  border: '2px solid #007AFF',
                  borderRadius: '12px',
                  background: 'transparent',
                  color: '#007AFF',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#007AFF';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#007AFF';
                }}
              >
                Annulla
              </button>
              <button
                onClick={() => {
                  handleDeletePayment(pagamentoDaEliminare);
                  setShowDeletePaymentModal(false);
                }}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  border: '2px solid #FF3B30',
                  borderRadius: '12px',
                  background: 'transparent',
                  color: '#FF3B30',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#FF3B30';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#FF3B30';
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
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#1d1d1f',
              margin: '0 0 1.5rem 0'
            }}>
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
                />
              </div>

              <div style={{
                display: 'flex',
                gap: '1rem',
                marginTop: '1rem'
              }}>
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
                >
                  {editingPayment ? 'Salva modifiche' : 'Aggiungi rata'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default SubscriptionDetail; 