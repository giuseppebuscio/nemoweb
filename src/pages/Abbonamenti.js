import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useSubscriptions } from '../context/SubscriptionContext';
import { BsGrid, BsList, BsSortAlphaDown, BsSortAlphaUp, BsCurrencyEuro, BsCurrencyExchange } from 'react-icons/bs';
import './Abbonamenti.css';

function Abbonamenti() {
  const navigate = useNavigate();
  const { subscriptions, deleteSubscription, toggleSubscriptionStatus } = useSubscriptions();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [subscriptionToDelete, setSubscriptionToDelete] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' o 'list'
  const [sortBy, setSortBy] = useState('nome'); // 'nome' o 'prezzo'
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' o 'desc'
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Effetto per gestire il responsive del testo del pulsante
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Funzione per gestire il click sui pulsanti di ordinamento
  const handleSortClick = (criterion) => {
    if (sortBy === criterion) {
      // Se clicco sullo stesso criterio, cambio direzione
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Se clicco su un criterio diverso, imposto quello e direzione crescente
      setSortBy(criterion);
      setSortDirection('asc');
    }
  };

  // Funzione per ordinare gli abbonamenti
  const getSortedSubscriptions = () => {
    const sorted = [...subscriptions];
    sorted.sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === 'nome') {
        comparison = a.nome.localeCompare(b.nome, 'it', { sensitivity: 'base' });
      } else if (sortBy === 'prezzo') {
        comparison = parseFloat(a.prezzo) - parseFloat(b.prezzo);
      }
      
      // Applica la direzione dell'ordinamento
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    return sorted;
  };

  // Funzione per verificare se l'abbonamento è in pari
  const isInPari = (subscription) => {
    if (!subscription.dataInizio) return true;
    
    const oggi = new Date();
    const dataInizio = new Date(subscription.dataInizio);
    const pagamenti = subscription.payments || [];

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
    
    // Per abbonamenti annuali, controlliamo anno per anno
    if (isAnnuale) {
      while (currentDate <= oggi) {
        if (!esistePagamento(currentDate, true)) {
          return false;
        }
        currentDate.setFullYear(currentDate.getFullYear() + 1);
      }
    } else {
      // Per abbonamenti mensili, controlliamo mese per mese
      const lastMonth = new Date(oggi.getFullYear(), oggi.getMonth(), dataInizio.getDate());
      while (currentDate <= lastMonth) {
        if (!esistePagamento(currentDate, false)) {
          return false;
        }
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
    }

    return true;
  };

  const handleDeleteClick = (subscription) => {
    setSubscriptionToDelete(subscription);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (subscriptionToDelete) {
      deleteSubscription(subscriptionToDelete.id);
      setShowDeleteModal(false);
      setSubscriptionToDelete(null);
    }
  };

  // Funzione per formattare la data
  const formatData = (data) => {
    if (!data) return 'N/D';
    return new Date(data).toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

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

  const formatPrice = (price, people) => {
    const totalPrice = parseFloat(price);
    const totalPeople = people.length + 1; // +1 per l'utente stesso
    
    return `€${totalPrice.toFixed(2)} • ${totalPeople} ${totalPeople === 1 ? 'persona' : 'persone'}`;
  };

  const handleToggle = (subscription) => {
    toggleSubscriptionStatus(subscription.id);
  };

  const handleViewSubscription = (e, subscriptionId) => {
    e.stopPropagation();
    navigate(`/abbonamento/${subscriptionId}`);
  };

  // Funzione per ottenere il testo del pulsante in base alla dimensione dello schermo
  const getAddButtonText = () => {
    return isMobile ? "Nuovo" : "Aggiungi nuovo";
  };

  return (
    <Layout>
      <div style={{ 
        padding: '1rem',
        background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f7 100%)',
        minHeight: '100vh',
        width: '100%'
      }} className="main-container">
        <div style={{ width: '100%' }}>
          
          {/* Header */}
          <div style={{
            marginBottom: '2rem',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }} className="header-container">
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '1rem'
            }}>
              <div>
                <h1 style={{
                  fontSize: 'clamp(1.75rem, 5vw, 2.75rem)',
                  fontWeight: '700',
                  color: '#1d1d1f',
                  margin: '0 0 0.75rem 0',
                  letterSpacing: '-0.025em',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                  background: 'linear-gradient(135deg, #1d1d1f 0%, #86868b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }} className="header-title">
                  I miei Abbonamenti
                </h1>
                <p style={{
                  fontSize: 'clamp(0.875rem, 3vw, 1.125rem)',
                  color: '#86868b',
                  margin: 0,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  fontWeight: '400',
                  lineHeight: '1.4'
                }} className="header-subtitle">
                  Visualizza e gestisci tutti i tuoi abbonamenti
                </p>
              </div>

              {/* Pulsante Aggiungi */}
              <button
                onClick={() => navigate('/aggiungi-abbonamento')}
                style={{
                  background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
                  color: 'white',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)',
                  alignSelf: 'flex-start'
                }}
                className="add-button-mobile"
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 122, 255, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 122, 255, 0.3)';
                }}
              >
                <span style={{ fontSize: '1.1em' }}>+</span>
                <span className="add-button-text">{getAddButtonText()}</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '1.5rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            marginBottom: '1.5rem',
            animation: 'fadeInUp 0.8s ease-out 0.4s both'
          }} className="main-content">
            {/* Header del riquadro con titolo e controlli visualizzazione */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '1rem'
              }} className="controls-header">
                <h3 style={{
                  fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
                  fontWeight: '700',
                  color: '#1d1d1f',
                  margin: 0,
                  letterSpacing: '-0.01em'
                }} className="controls-title">Abbonamenti Attivi</h3>

                {/* Controlli visualizzazione */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '1rem',
                  alignItems: 'center'
                }} className="controls-container">
                  {/* Selettore ordinamento */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '0.5rem',
                    alignItems: 'center'
                  }} className="sort-selector">
                    <span style={{
                      fontSize: '0.875rem',
                      color: '#86868b',
                      fontWeight: '500',
                      textAlign: 'left',
                      whiteSpace: 'nowrap'
                    }}>
                      Ordina
                    </span>
                    <div style={{
                      display: 'flex',
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      borderRadius: '12px',
                      padding: '4px',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
                    }}>
                      <button
                        onClick={() => handleSortClick('nome')}
                        style={{
                          padding: '8px 12px',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          border: 'none',
                          borderRadius: '8px',
                          background: sortBy === 'nome' 
                            ? 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)' 
                            : 'transparent',
                          color: sortBy === 'nome' ? 'white' : '#86868b',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          boxShadow: sortBy === 'nome' ? '0 2px 8px rgba(0, 122, 255, 0.25)' : 'none',
                          flex: 1
                        }}
                        onMouseEnter={(e) => {
                          if (sortBy !== 'nome') {
                            e.target.style.color = '#007AFF';
                            e.target.style.background = 'rgba(0, 122, 255, 0.1)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (sortBy !== 'nome') {
                            e.target.style.color = '#86868b';
                            e.target.style.background = 'transparent';
                          }
                        }}
                      >
                        {sortBy === 'nome' && sortDirection === 'asc' ? (
                          <BsSortAlphaUp size={14} />
                        ) : (
                          <BsSortAlphaDown size={14} />
                        )}
                        Nome
                      </button>
                      <button
                        onClick={() => handleSortClick('prezzo')}
                        style={{
                          padding: '8px 12px',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          border: 'none',
                          borderRadius: '8px',
                          background: sortBy === 'prezzo' 
                            ? 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)' 
                            : 'transparent',
                          color: sortBy === 'prezzo' ? 'white' : '#86868b',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          boxShadow: sortBy === 'prezzo' ? '0 2px 8px rgba(0, 122, 255, 0.25)' : 'none',
                          flex: 1
                        }}
                        onMouseEnter={(e) => {
                          if (sortBy !== 'prezzo') {
                            e.target.style.color = '#007AFF';
                            e.target.style.background = 'rgba(0, 122, 255, 0.1)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (sortBy !== 'prezzo') {
                            e.target.style.color = '#86868b';
                            e.target.style.background = 'transparent';
                          }
                        }}
                      >
                        {sortBy === 'prezzo' && sortDirection === 'asc' ? (
                          <BsCurrencyExchange size={14} />
                        ) : (
                          <BsCurrencyEuro size={14} />
                        )}
                        Costo
                      </button>
                    </div>
                  </div>

                  {/* Selettore visualizzazione */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '0.5rem',
                    alignItems: 'center'
                  }} className="view-selector">
                    <span style={{
                      fontSize: '0.875rem',
                      color: '#86868b',
                      fontWeight: '500',
                      textAlign: 'left',
                      whiteSpace: 'nowrap'
                    }}>
                      Cambia vista
                    </span>
                    <div style={{
                      display: 'flex',
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      borderRadius: '12px',
                      padding: '4px',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
                    }}>
                      <button
                        onClick={() => setViewMode('grid')}
                        style={{
                          padding: '8px 12px',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          border: 'none',
                          borderRadius: '8px',
                          background: viewMode === 'grid' 
                            ? 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)' 
                            : 'transparent',
                          color: viewMode === 'grid' ? 'white' : '#86868b',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          boxShadow: viewMode === 'grid' ? '0 2px 8px rgba(0, 122, 255, 0.25)' : 'none',
                          flex: 1
                        }}
                        onMouseEnter={(e) => {
                          if (viewMode !== 'grid') {
                            e.target.style.color = '#007AFF';
                            e.target.style.background = 'rgba(0, 122, 255, 0.1)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (viewMode !== 'grid') {
                            e.target.style.color = '#86868b';
                            e.target.style.background = 'transparent';
                          }
                        }}
                      >
                        <BsGrid size={14} />
                        Griglia
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        style={{
                          padding: '8px 12px',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          border: 'none',
                          borderRadius: '8px',
                          background: viewMode === 'list' 
                            ? 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)' 
                            : 'transparent',
                          color: viewMode === 'list' ? 'white' : '#86868b',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          boxShadow: viewMode === 'list' ? '0 2px 8px rgba(0, 122, 255, 0.25)' : 'none',
                          flex: 1
                        }}
                        onMouseEnter={(e) => {
                          if (viewMode !== 'list') {
                            e.target.style.color = '#007AFF';
                            e.target.style.background = 'rgba(0, 122, 255, 0.1)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (viewMode !== 'list') {
                            e.target.style.color = '#86868b';
                            e.target.style.background = 'transparent';
                          }
                        }}
                      >
                        <BsList size={14} />
                        Lista
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lista abbonamenti */}
            <div style={{
              display: viewMode === 'grid' ? 'grid' : 'flex',
              gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fit, minmax(280px, 1fr))' : 'none',
              flexDirection: viewMode === 'list' ? 'column' : 'row',
              gap: '1rem'
            }} className="subscriptions-grid">
              {getSortedSubscriptions().length === 0 ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2rem',
                  background: 'rgba(255, 255, 255, 0.6)',
                  borderRadius: '16px',
                  gap: '1rem',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  gridColumn: '1 / -1'
                }}>
                  <span style={{
                    fontSize: 'clamp(2rem, 5vw, 2.5rem)',
                    color: '#86868b'
                  }}>📱</span>
                  <p style={{
                    fontSize: 'clamp(0.875rem, 3vw, 1.125rem)',
                    color: '#86868b',
                    margin: 0,
                    textAlign: 'center',
                    fontWeight: '500'
                  }}>
                    Nessun abbonamento presente
                  </p>
                  <p style={{
                    fontSize: 'clamp(0.75rem, 2.5vw, 0.9375rem)',
                    color: '#86868b',
                    margin: 0,
                    textAlign: 'center',
                    maxWidth: '400px',
                    lineHeight: '1.4'
                  }}>
                    Aggiungi il tuo primo abbonamento per iniziare a tenere traccia delle tue spese
                  </p>
                </div>
              ) : (
                getSortedSubscriptions().map((subscription, index) => (
                  <div
                    key={subscription.id}
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      borderRadius: '20px',
                      padding: '1.25rem',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      opacity: subscription.isActive ? 1 : 0.6
                    }}
                    className="subscription-card"
                    onClick={() => navigate(`/abbonamenti/${subscription.id}`)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
                    }}
                  >
                    {viewMode === 'list' ? (
                      <>
                        {/* Vista Lista Semplificata */}
                        <div style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',
                          padding: '1rem 0',
                          cursor: 'pointer'
                        }} className="list-view-mobile">
                          {/* Nome */}
                          <div style={{ 
                            flex: '1', 
                            minWidth: 0,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem'
                          }} className="info-container">
                            {/* Logo */}
                            <div style={{
                              width: '40px',
                              height: '40px',
                              background: subscription.logo ? 'none' : 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
                              borderRadius: '10px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1.25rem',
                              color: 'white',
                              boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)',
                              overflow: 'hidden',
                              flexShrink: 0
                            }} className="logo-container">
                              {subscription.logo ? (
                                <img 
                                  src={subscription.logo} 
                                  alt={`Logo ${subscription.nome}`}
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                  }}
                                />
                              ) : (
                                <span>💳</span>
                              )}
                            </div>
                            
                            <h4 style={{
                              fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                              fontWeight: '600',
                              color: '#1d1d1f',
                              margin: 0,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}>
                              {subscription.nome}
                            </h4>
                          </div>

                          {/* Switch */}
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0 0.25rem'
                          }} className="actions-container">
                            <div className="switch" onClick={(e) => {
                              e.stopPropagation();
                              handleToggle(subscription);
                            }}>
                              <input
                                type="checkbox"
                                checked={subscription.isActive}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  handleToggle(subscription);
                                }}
                              />
                              <span className="slider"></span>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Vista Riquadri */}
                        <div style={{
                          position: 'relative',
                          zIndex: 1
                        }} className="grid-view-mobile">
                          {/* Switch in alto */}
                          <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginBottom: '1rem'
                          }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggle(subscription);
                            }}
                          >
                            <span style={{
                              fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)',
                              color: subscription.isActive ? '#34C759' : '#86868b',
                              fontWeight: '500',
                              cursor: 'pointer'
                            }}>
                              {subscription.isActive ? 'Attivo' : 'Non attivo'}
                            </span>
                            <div className="switch">
                              <input
                                type="checkbox"
                                checked={subscription.isActive}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  handleToggle(subscription);
                                }}
                              />
                              <span className="slider"></span>
                            </div>
                          </div>

                          {/* Nome e Logo */}
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            marginBottom: '1rem'
                          }}>
                            <div style={{
                              width: '40px',
                              height: '40px',
                              background: subscription.logo ? 'none' : 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
                              borderRadius: '10px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1.25rem',
                              color: 'white',
                              boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)',
                              overflow: 'hidden',
                              flexShrink: 0
                            }} className="logo-container">
                              {subscription.logo ? (
                                <img 
                                  src={subscription.logo} 
                                  alt={`Logo ${subscription.nome}`}
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                  }}
                                />
                              ) : (
                                <span>💳</span>
                              )}
                            </div>
                            <div style={{ flex: '1', minWidth: 0 }}>
                              <h4 style={{
                                fontSize: 'clamp(0.875rem, 3vw, 1.25rem)',
                                fontWeight: '600',
                                color: '#1d1d1f',
                                margin: '0 0 0.5rem 0',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}>
                                {subscription.nome}
                              </h4>
                              <p style={{
                                fontSize: 'clamp(0.75rem, 2.5vw, 1rem)',
                                color: '#86868b',
                                margin: 0,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                              }}>
                                <span style={{ fontSize: '1rem' }}>🔄</span>
                                {formatFrequency(subscription)}
                              </p>
                            </div>
                          </div>

                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0.75rem',
                            background: 'rgba(0, 0, 0, 0.02)',
                            borderRadius: '12px',
                            marginBottom: '0.75rem'
                          }} className="cost-row cost-item">
                            <span style={{
                              fontSize: 'clamp(0.75rem, 2.5vw, 0.9375rem)',
                              color: '#86868b'
                            }}>Costo</span>
                            <span style={{
                              fontSize: 'clamp(0.875rem, 3vw, 1rem)',
                              fontWeight: '600',
                              color: '#1d1d1f'
                            }}>€{parseFloat(subscription.prezzo).toFixed(2)}</span>
                          </div>

                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0.75rem',
                            background: 'rgba(0, 122, 255, 0.05)',
                            borderRadius: '12px',
                            border: '1px solid rgba(0, 122, 255, 0.1)',
                            marginBottom: '1rem'
                          }} className="cost-row cost-item">
                            <span style={{
                              fontSize: 'clamp(0.75rem, 2.5vw, 0.9375rem)',
                              color: '#007AFF'
                            }}>Totale pagato</span>
                            <span style={{
                              fontSize: 'clamp(0.875rem, 3vw, 1rem)',
                              fontWeight: '600',
                              color: '#007AFF'
                            }}>€{subscription.tipoPagamento === 'variabile' 
                              ? (subscription.pagamenti ? subscription.pagamenti.reduce((totale, pagamento) => totale + parseFloat(pagamento.importo), 0).toFixed(2) : '0.00')
                              : (subscription.payments ? subscription.payments.reduce((acc, pagamento) => acc + parseFloat(pagamento.importo), 0).toFixed(2) : '0.00')}</span>
                          </div>

                          <button
                            onClick={() => navigate(`/abbonamenti/${subscription.id}`)}
                            style={{
                              background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
                              color: 'white',
                              padding: '0.75rem 1.25rem',
                              borderRadius: '12px',
                              border: 'none',
                              fontSize: '0.875rem',
                              fontWeight: '500',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              width: '100%',
                              boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)'
                            }}
                            className="view-button"
                            onMouseOver={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #0051D5 0%, #4644B8 100%)'}
                            onMouseOut={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)'}
                          >
                            Visualizza
                          </button>
                        </div>

                        {/* Sfondo decorativo */}
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          width: '120px',
                          height: '120px',
                          background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.05) 0%, rgba(88, 86, 214, 0.05) 100%)',
                          borderRadius: '0 20px 0 100%',
                          zIndex: 0
                        }} />
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal di conferma eliminazione */}
      {showDeleteModal && (
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
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          padding: '1rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '1.5rem',
            maxWidth: '500px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            animation: 'fadeInUp 0.3s ease-out'
          }} className="modal-content-mobile">
            <div style={{
              fontSize: 'clamp(2rem, 6vw, 3rem)',
              marginBottom: '1rem',
              filter: 'drop-shadow(0 4px 8px rgba(255, 59, 48, 0.3))'
            }} className="modal-icon">⚠️</div>
            <h3 style={{
              fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
              fontWeight: '700',
              color: '#1d1d1f',
              margin: '0 0 1rem 0',
              letterSpacing: '-0.01em'
            }} className="modal-title">
              Conferma eliminazione
            </h3>
            <p style={{
              fontSize: 'clamp(0.875rem, 3vw, 1.125rem)',
              color: '#86868b',
              margin: '0 0 1.5rem 0',
              lineHeight: '1.5'
            }} className="modal-text">
              Sei sicuro di voler eliminare l'abbonamento <strong>"{subscriptionToDelete?.nome}"</strong>? Questa azione non può essere annullata.
            </p>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }} className="modal-buttons-mobile">
              <button
                onClick={() => setShowDeleteModal(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  color: '#86868b',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Annulla
              </button>
              <button
                onClick={confirmDelete}
                style={{
                  background: 'linear-gradient(135deg, #FF3B30 0%, #FF6B6B 100%)',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 4px 12px rgba(255, 59, 48, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(255, 59, 48, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 59, 48, 0.3)';
                }}
              >
                Elimina
              </button>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @media (max-width: 768px) {
            /* Header responsive */
            .header-container {
              flex-direction: column !important;
              gap: 1rem !important;
              align-items: stretch !important;
            }
            
            /* Controlli responsive */
            .controls-container {
              flex-direction: column !important;
              gap: 1rem !important;
              align-items: stretch !important;
            }
            
            /* Selettori responsive */
            .sort-selector, .view-selector {
              flex-direction: column !important;
              gap: 0.5rem !important;
            }
            
            .sort-selector > div, .view-selector > div {
              width: 100% !important;
            }
            
            /* Griglia responsive */
            .subscriptions-grid {
              grid-template-columns: 1fr !important;
              gap: 1rem !important;
            }
            
            /* Card responsive */
            .subscription-card {
              padding: 1rem !important;
              border-radius: 16px !important;
            }
            
            /* Vista lista mobile */
            .list-view-mobile {
              flex-direction: row !important;
              gap: 0.75rem !important;
              align-items: center !important;
              justify-content: space-between !important;
              padding: 1rem 0 !important;
              cursor: pointer !important;
            }
            
            .list-view-mobile .logo-container {
              width: 40px !important;
              height: 40px !important;
              font-size: 1.25rem !important;
              flex-shrink: 0 !important;
            }
            
            .list-view-mobile .info-container {
              flex: 1 !important;
              min-width: 0 !important;
              display: flex !important;
              align-items: center !important;
              gap: 0.75rem !important;
            }
            
            .list-view-mobile .info-container h4 {
              font-size: clamp(1rem, 3vw, 1.25rem) !important;
              margin: 0 !important;
              overflow: hidden !important;
              text-overflow: ellipsis !important;
              white-space: nowrap !important;
            }
            
            .list-view-mobile .actions-container {
              flex-shrink: 0 !important;
              display: flex !important;
              align-items: center !important;
              padding: 0 0.25rem !important;
            }
            
            /* Vista griglia mobile */
            .grid-view-mobile .logo-container {
              width: 36px !important;
              height: 36px !important;
              font-size: 1rem !important;
            }
            
            .grid-view-mobile .cost-row {
              flex-direction: column !important;
              gap: 0.5rem !important;
              align-items: stretch !important;
            }
            
            .grid-view-mobile .cost-item {
              width: 100% !important;
              min-width: auto !important;
            }
            
            /* Pulsante aggiungi mobile */
            .add-button-mobile {
              justify-content: center !important;
              padding: 0.75rem 1rem !important;
              font-size: 0.875rem !important;
              border-radius: 10px !important;
              min-width: fit-content !important;
            }
            
            .add-button-text {
              display: inline !important;
            }
            
            .add-button-text::after {
              content: "Nuovo" !important;
              display: none !important;
            }
            
            /* Modal mobile */
            .modal-content-mobile {
              margin: 1rem !important;
              padding: 1.25rem !important;
              border-radius: 16px !important;
            }
            
            .modal-buttons-mobile {
              flex-direction: column !important;
              gap: 0.75rem !important;
            }
            
            .modal-buttons-mobile button {
              width: 100% !important;
              padding: 1rem !important;
              font-size: 1rem !important;
            }
          }
          
          @media (max-width: 480px) {
            /* Container principale */
            .main-container {
              padding: 0.75rem !important;
            }
            
            /* Header mobile */
            .header-title {
              font-size: 1.5rem !important;
              margin-bottom: 0.5rem !important;
            }
            
            .header-subtitle {
              font-size: 0.875rem !important;
            }
            
            /* Contenuto principale */
            .main-content {
              padding: 1rem !important;
              border-radius: 16px !important;
              margin-bottom: 1rem !important;
            }
            
            /* Card mobile */
            .subscription-card {
              padding: 0.875rem !important;
              border-radius: 12px !important;
            }
            
            /* Controlli mobile */
            .controls-header {
              flex-direction: column !important;
              gap: 0.75rem !important;
              align-items: stretch !important;
            }
            
            .controls-title {
              font-size: 1.25rem !important;
            }
            
            /* Selettori mobile */
            .sort-selector span, .view-selector span {
              font-size: 0.875rem !important;
            }
            
            .sort-selector button, .view-selector button {
              padding: 0.5rem 0.75rem !important;
              font-size: 0.75rem !important;
            }
            
            /* Vista lista mobile piccola */
            .list-view-mobile .logo-container {
              width: 36px !important;
              height: 36px !important;
              font-size: 1.1rem !important;
            }
            
            .list-view-mobile .info-container h4 {
              font-size: 1rem !important;
            }
            
            .list-view-mobile .info-container {
              gap: 0.5rem !important;
            }
            
            .list-view-mobile .cost-container,
            .list-view-mobile .total-container {
              padding: 0.5rem !important;
              min-height: 40px !important;
            }
            
            .list-view-mobile .cost-container span:first-child,
            .list-view-mobile .total-container span:first-child {
              font-size: 0.75rem !important;
            }
            
            .list-view-mobile .cost-container span:last-child,
            .list-view-mobile .total-container span:last-child {
              font-size: 0.875rem !important;
            }
            
            /* Vista griglia mobile piccola */
            .grid-view-mobile .logo-container {
              width: 32px !important;
              height: 32px !important;
              font-size: 0.9rem !important;
            }
            
            .grid-view-mobile h4 {
              font-size: 1rem !important;
            }
            
            .grid-view-mobile p {
              font-size: 0.875rem !important;
            }
            
            .grid-view-mobile .cost-row {
              padding: 0.5rem !important;
            }
            
            .grid-view-mobile .cost-row span:first-child {
              font-size: 0.75rem !important;
            }
            
            .grid-view-mobile .cost-row span:last-child {
              font-size: 0.875rem !important;
            }
            
            .grid-view-mobile .view-button {
              padding: 0.75rem 1rem !important;
              font-size: 0.875rem !important;
            }
            
            /* Switch mobile */
            .switch {
              width: 44px !important;
              height: 26px !important;
            }
            
            .slider:before {
              height: 22px !important;
              width: 22px !important;
            }
            
            input:checked + .slider:before {
              transform: translateX(18px) !important;
            }
            
            /* Modal mobile piccola */
            .modal-content-mobile {
              margin: 0.5rem !important;
              padding: 1rem !important;
            }
            
            .modal-icon {
              font-size: 2.5rem !important;
            }
            
            .modal-title {
              font-size: 1.25rem !important;
            }
            
            .modal-text {
              font-size: 0.875rem !important;
            }
            
            /* Pulsante aggiungi mobile piccola */
            .add-button-mobile {
              justify-content: center !important;
              padding: 0.625rem 0.875rem !important;
              font-size: 0.8125rem !important;
              border-radius: 8px !important;
              min-width: fit-content !important;
            }
          }
          
          @media (max-width: 360px) {
            /* Extra small devices */
            .main-container {
              padding: 0.5rem !important;
            }
            
            .main-content {
              padding: 0.75rem !important;
            }
            
            .subscription-card {
              padding: 0.75rem !important;
            }
            
            .header-title {
              font-size: 1.25rem !important;
            }
            
            .controls-title {
              font-size: 1.125rem !important;
            }
            
            .list-view-mobile .logo-container {
              width: 32px !important;
              height: 32px !important;
            }
            
            .grid-view-mobile .logo-container {
              width: 28px !important;
              height: 28px !important;
            }
            
            .modal-content-mobile {
              margin: 0.25rem !important;
              padding: 0.875rem !important;
            }
            
            .add-button-mobile {
              padding: 0.5rem 0.75rem !important;
              font-size: 0.75rem !important;
              border-radius: 6px !important;
              min-width: fit-content !important;
            }
          }
          
          /* Stili per orientamento landscape su mobile */
          @media (max-width: 768px) and (orientation: landscape) {
            .header-container {
              flex-direction: row !important;
              align-items: center !important;
            }
            
            .add-button-mobile {
              width: auto !important;
              min-width: fit-content !important;
            }
            
            .controls-header {
              flex-direction: row !important;
              align-items: center !important;
            }
            
            .sort-selector, .view-selector {
              flex-direction: row !important;
            }
          }
          
          /* Animazioni responsive */
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          /* Stili per touch devices */
          @media (hover: none) and (pointer: coarse) {
            .subscription-card:hover {
              transform: none !important;
              box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08) !important;
            }
            
            .subscription-card:active {
              transform: scale(0.98) !important;
              transition: transform 0.1s ease !important;
            }
            
            button:active {
              transform: scale(0.95) !important;
            }
            
            .list-view-mobile:active {
              background: rgba(0, 122, 255, 0.05) !important;
              border-radius: 12px !important;
              transition: background 0.1s ease !important;
            }
          }
          
          /* Effetti hover per desktop */
          @media (hover: hover) {
            .list-view-mobile:hover {
              background: rgba(0, 122, 255, 0.05) !important;
              border-radius: 12px !important;
              transition: background 0.2s ease !important;
            }
          }
        `}
      </style>
    </Layout>
  );
}

export default Abbonamenti; 