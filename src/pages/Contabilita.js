import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useSubscriptions } from '../context/SubscriptionContext';
import { useNavigate } from 'react-router-dom';

function Contabilita() {
  const { subscriptions } = useSubscriptions();
  const [isLoading, setIsLoading] = useState(true);
  const [totals, setTotals] = useState({
    fixed: {
      monthly: 0,
      yearly: 0
    },
    variable: {
      monthly: 0,
      yearly: 0
    }
  });
  const [currentPageFixed, setCurrentPageFixed] = useState(0);
  const [currentPageVariable, setCurrentPageVariable] = useState(0);
  const navigate = useNavigate();

  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    const activeSubscriptions = subscriptions.filter(sub => sub.isActive);
    
    // Calcola i totali per abbonamenti a spesa fissa
    const fixedSubscriptions = activeSubscriptions.filter(sub => sub.tipoPagamento === 'fisso');
    const fixedMonthlyTotal = fixedSubscriptions.reduce((total, sub) => {
      return total + calcolaCostoMensile(sub);
    }, 0);

    // Calcola i totali per abbonamenti a spesa variabile
    const variableSubscriptions = activeSubscriptions.filter(sub => sub.tipoPagamento === 'variabile');
    const variableMonthlyTotal = variableSubscriptions.reduce((total, sub) => {
      return total + calcolaCostoMensile(sub);
    }, 0);
    
    setTotals({
      fixed: {
        monthly: parseFloat(fixedMonthlyTotal.toFixed(2)),
        yearly: parseFloat((fixedMonthlyTotal * 12).toFixed(2))
      },
      variable: {
        monthly: parseFloat(variableMonthlyTotal.toFixed(2)),
        yearly: parseFloat((variableMonthlyTotal * 12).toFixed(2))
      }
    });
    setIsLoading(false);
  }, [subscriptions]);

  // Funzione per formattare la data
  const formatData = (data) => {
    if (!data) return 'N/D';
    return new Date(data).toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Funzione per formattare la frequenza
  const formatFrequency = (subscription) => {
    if (!subscription.frequenza) return 'N/D';
    
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

  // Funzione per calcolare il costo mensile
  const calcolaCostoMensile = (subscription) => {
    const totalPeople = (subscription.persone?.length || 0) + 1;
    const prezzo = parseFloat(subscription.prezzo) / totalPeople;
    if (subscription.frequenza === 'annuale') {
      return prezzo / 12;
    }
    return prezzo;
  };

  // Funzione per calcolare il costo annuale
  const calcolaCostoAnnuale = (subscription) => {
    const costoMensile = calcolaCostoMensile(subscription);
    return costoMensile * 12;
  };

  const renderSubscriptionSection = (title, subscriptions, totals, currentPage, setCurrentPage) => {
    const totalPages = Math.ceil(subscriptions.length / ITEMS_PER_PAGE);
    const startIndex = currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentSubscriptions = subscriptions.slice(startIndex, endIndex);

    return (
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
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          <h3 style={{
            fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
            fontWeight: '700',
            color: '#1d1d1f',
            margin: 0,
            letterSpacing: '-0.01em'
          }}>{title}</h3>
          
          {totalPages > 1 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)',
              color: '#86868b',
              fontWeight: '500'
            }}>
              Pagina {currentPage + 1} di {totalPages}
            </div>
          )}
        </div>

      {subscriptions.length === 0 ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
            background: 'rgba(255, 255, 255, 0.6)',
          borderRadius: '16px',
            gap: '0.75rem',
            border: '1px solid rgba(0, 0, 0, 0.05)'
        }}>
          <span style={{
            fontSize: 'clamp(2rem, 6vw, 2.5rem)',
            color: '#86868b'
          }}>📱</span>
          <p style={{
            fontSize: 'clamp(0.875rem, 3vw, 1.125rem)',
            color: '#86868b',
            margin: 0,
            textAlign: 'center',
            fontWeight: '500'
          }}>
            Nessun abbonamento attivo
          </p>
        </div>
      ) : (
          <>
        <div style={{
              display: 'grid',
          gap: '0.75rem'
        }}>
              {currentSubscriptions.map((subscription, index) => (
            <div
              key={subscription.id}
              style={{
                    background: 'rgba(255, 255, 255, 0.6)',
                borderRadius: '16px',
                    padding: '0.875rem',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                alignItems: 'center',
                    gap: '0.75rem',
                    animation: `slideInRight 0.5s ease-out ${0.6 + index * 0.1}s both`,
                    flexWrap: 'wrap'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                    e.currentTarget.style.transform = 'translateX(8px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(0, 122, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.6)';
                    e.currentTarget.style.transform = 'translateX(0) scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.05)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
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
                    }}>
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
              <div style={{
                flex: '1',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                minWidth: 0
              }}>
                <h4 style={{
                        fontSize: 'clamp(0.875rem, 3vw, 1.125rem)',
                  fontWeight: '600',
                  color: '#1d1d1f',
                        margin: 0,
                        maxWidth: '200px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {subscription.nome.length > 25 ? `${subscription.nome.substring(0, 25)}...` : subscription.nome}
                </h4>
                    </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 300px)',
                gap: '0.75rem',
                flex: '1',
                alignItems: 'stretch',
                justifyContent: 'flex-end',
                minWidth: 0
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                      justifyContent: 'flex-start',
                      gap: '0.25rem',
                  padding: '0.625rem',
                      background: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '10px',
                      border: '1px solid rgba(0, 0, 0, 0.05)',
                      minHeight: '50px',
                      width: '300px'
                }} className="costo-abbonamento">
                  <span style={{
                        fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)',
                        color: '#86868b',
                        fontWeight: '500'
                  }}>Costo abbonamento</span>
                  <span style={{
                    fontSize: 'clamp(0.875rem, 3vw, 1rem)',
                    fontWeight: '600',
                    color: '#1d1d1f'
                  }}>€{(parseFloat(subscription.prezzo) / ((subscription.persone?.length || 0) + 1)).toFixed(2)}</span>
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                      justifyContent: 'flex-start',
                      gap: '0.25rem',
                  padding: '0.625rem',
                      background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(88, 86, 214, 0.1) 100%)',
                  borderRadius: '10px',
                      border: '1px solid rgba(0, 122, 255, 0.2)',
                      minHeight: '50px',
                      width: '300px'
                }} className="costo-mensile">
                  <span style={{
                        fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)',
                        color: '#007AFF',
                        fontWeight: '500'
                  }}>Costo mensile</span>
                  <span style={{
                    fontSize: 'clamp(0.875rem, 3vw, 1rem)',
                    fontWeight: '600',
                    color: '#007AFF'
                  }}>€{calcolaCostoMensile(subscription).toFixed(2)}</span>
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                      justifyContent: 'flex-start',
                      gap: '0.25rem',
                  padding: '0.625rem',
                      background: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '10px',
                      border: '1px solid rgba(0, 0, 0, 0.05)',
                      minHeight: '50px',
                      width: '300px'
                }} className="costo-annuale">
                  <span style={{
                        fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)',
                        color: '#86868b',
                        fontWeight: '500'
                  }}>Costo annuale</span>
                  <span style={{
                    fontSize: 'clamp(0.875rem, 3vw, 1rem)',
                    fontWeight: '600',
                    color: '#1d1d1f'
                  }}>€{calcolaCostoAnnuale(subscription).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

            {totalPages > 1 && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.75rem',
                marginTop: '1.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(0, 0, 0, 0.05)',
                flexWrap: 'wrap'
              }}>
                <button
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                  style={{
                    background: currentPage === 0 
                      ? 'rgba(0, 0, 0, 0.05)' 
                      : 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
                    color: currentPage === 0 ? '#86868b' : 'white',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '0.625rem 1.25rem',
                    fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)',
                    fontWeight: '600',
                    cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: currentPage === 0 
                      ? 'none' 
                      : '0 4px 12px rgba(0, 122, 255, 0.3)',
                    opacity: currentPage === 0 ? 0.5 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== 0) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 122, 255, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== 0) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 122, 255, 0.3)';
                    }
                  }}
                >
                  ← Precedente
                </button>

                <div style={{
                  display: 'flex',
                  gap: '0.375rem',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i)}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        border: 'none',
                        background: i === currentPage 
                          ? 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)'
                          : 'rgba(255, 255, 255, 0.8)',
                        color: i === currentPage ? 'white' : '#86868b',
                        fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: i === currentPage 
                          ? '0 2px 8px rgba(0, 122, 255, 0.3)'
                          : 'none'
                      }}
                      onMouseEnter={(e) => {
                        if (i !== currentPage) {
                          e.currentTarget.style.background = 'rgba(0, 122, 255, 0.1)';
                          e.currentTarget.style.color = '#007AFF';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (i !== currentPage) {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                          e.currentTarget.style.color = '#86868b';
                        }
                      }}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                  disabled={currentPage === totalPages - 1}
                  style={{
                    background: currentPage === totalPages - 1 
                      ? 'rgba(0, 0, 0, 0.05)' 
                      : 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
                    color: currentPage === totalPages - 1 ? '#86868b' : 'white',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '0.625rem 1.25rem',
                    fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)',
                    fontWeight: '600',
                    cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: currentPage === totalPages - 1 
                      ? 'none' 
                      : '0 4px 12px rgba(0, 122, 255, 0.3)',
                    opacity: currentPage === totalPages - 1 ? 0.5 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== totalPages - 1) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 122, 255, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== totalPages - 1) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 122, 255, 0.3)';
                    }
                  }}
                >
                  Successivo →
                </button>
              </div>
            )}
          </>
      )}
    </div>
  );
  };

  return (
    <Layout>
      <div style={{
        padding: '1rem',
        background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f7 100%)',
        minHeight: '100vh',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{ width: '100%', maxWidth: '100%' }}>
          {/* Header */}
          <div style={{
            marginBottom: '2rem',
            textAlign: 'left'
          }}>
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
          }}>
            Contabilità
          </h1>
          <p style={{
            fontSize: 'clamp(0.875rem, 3vw, 1.125rem)',
            color: '#86868b',
            margin: 0,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            fontWeight: '400',
            lineHeight: '1.4'
          }}>
              Gestisci e monitora le tue spese per abbonamenti
          </p>
        </div>

          {/* Stats Cards con design migliorato */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem',
            animation: 'fadeInUp 0.8s ease-out 0.2s both'
          }}>
            {/* Card Spese Fisse */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: '1.5rem',
              border: '1px solid rgba(0, 122, 255, 0.15)',
              boxShadow: '0 8px 32px rgba(0, 122, 255, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 16px 48px rgba(0, 122, 255, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 122, 255, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)';
            }}
            >
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(88, 86, 214, 0.1) 100%)',
                borderRadius: '50%',
                opacity: 0.6
              }} />
              <div style={{ 
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', 
                marginBottom: '0.75rem',
                filter: 'drop-shadow(0 2px 4px rgba(0, 122, 255, 0.2))'
              }}>💰</div>
              <div style={{
                fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                fontWeight: '600',
                color: '#007AFF',
                marginBottom: '0.5rem',
              }}>
                €{totals.fixed.monthly}
              </div>
              <div style={{ 
                fontSize: 'clamp(0.875rem, 2.5vw, 1rem)', 
                color: '#86868b',
                fontWeight: '400',
                letterSpacing: '0.5px'
              }}>
                Spese fisse mensili
              </div>
            </div>

            {/* Card Spese Variabili */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 149, 0, 0.15)',
              boxShadow: '0 8px 32px rgba(255, 149, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 16px 48px rgba(255, 149, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(255, 149, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)';
            }}
            >
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, rgba(255, 149, 0, 0.1) 0%, rgba(255, 123, 0, 0.1) 100%)',
                borderRadius: '50%',
                opacity: 0.6
              }} />
              <div style={{ 
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', 
                marginBottom: '0.75rem',
                filter: 'drop-shadow(0 2px 4px rgba(255, 149, 0, 0.2))'
              }}>📊</div>
              <div style={{
                fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                fontWeight: '600',
                color: '#FF9500',
                marginBottom: '0.5rem',
              }}>
                €{totals.variable.monthly}
              </div>
              <div style={{ 
                fontSize: 'clamp(0.875rem, 2.5vw, 1rem)', 
                color: '#86868b',
                fontWeight: '400',
                letterSpacing: '0.5px'
              }}>
                Spese variabili mensili
              </div>
            </div>

            {/* Card Totale Mensile */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: '1.5rem',
              border: '1px solid rgba(52, 199, 89, 0.15)',
              boxShadow: '0 8px 32px rgba(52, 199, 89, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 16px 48px rgba(52, 199, 89, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(52, 199, 89, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)';
            }}
            >
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, rgba(52, 199, 89, 0.1) 0%, rgba(48, 209, 88, 0.1) 100%)',
                borderRadius: '50%',
                opacity: 0.6
              }} />
              <div style={{ 
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', 
                marginBottom: '0.75rem',
                filter: 'drop-shadow(0 2px 4px rgba(52, 199, 89, 0.2))'
              }}>💳</div>
              <div style={{
                fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                fontWeight: '600',
                color: '#34C759',
                marginBottom: '0.5rem',
              }}>
                €{(totals.fixed.monthly + totals.variable.monthly).toFixed(2)}
              </div>
              <div style={{ 
                fontSize: 'clamp(0.875rem, 2.5vw, 1rem)', 
                color: '#86868b',
                fontWeight: '400',
                letterSpacing: '0.5px'
              }}>
                Totale mensile
              </div>
            </div>
          </div>

          {isLoading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px'
          }}>
            Caricamento...
          </div>
        ) : (
          <>
            {renderSubscriptionSection(
              'Abbonamenti a Spesa Fissa',
              subscriptions.filter(sub => sub.isActive && sub.tipoPagamento === 'fisso'),
                totals.fixed,
                currentPageFixed,
                setCurrentPageFixed
            )}
            
            {renderSubscriptionSection(
              'Abbonamenti a Spesa Variabile',
              subscriptions.filter(sub => sub.isActive && sub.tipoPagamento === 'variabile'),
                totals.variable,
                currentPageVariable,
                setCurrentPageVariable
            )}
          </>
        )}
      </div>
      </div>

      <style>
        {`
          @media (max-width: 768px) {
            .contabilita-container {
              padding: 1rem !important;
            }
            
            .subscription-card {
              padding: 0
              .875rem !important;
            }
            
            .subscription-logo {
              width: 36px !important;
              height: 36px !important;
              font-size: 1rem !important;
            }
            
            .cost-grid {
              grid-template-columns: 1fr !important;
              gap: 0.5rem !important;
            }
            
            .pagination-container {
              flex-direction: column !important;
              gap: 0.75rem !important;
            }
            
            .costo-abbonamento,
            .costo-annuale {
              display: none !important;
            }
            
            .costo-mensile {
              grid-column: 1 / -1 !important;
              max-width: 200px !important;
              margin-left: auto !important;
              margin-right: 0 !important;
            }
          }
          
          @media (max-width: 480px) {
            .contabilita-container {
              padding: 0.75rem !important;
            }
            
            .subscription-card {
              padding: 0.75rem !important;
            }
            
            .main-content {
              padding: 1rem !important;
              border-radius: 16px !important;
            }
          }
          
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
        `}
      </style>
    </Layout>
  );
}

export default Contabilita; 