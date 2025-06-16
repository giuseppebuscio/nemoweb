import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useSubscriptions } from '../context/SubscriptionContext';
import { useNavigate } from 'react-router-dom';

function Pagamenti() {
  const { subscriptions } = useSubscriptions();
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' o 'list'
  const [totals, setTotals] = useState({
    monthly: 0,
    yearly: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Filtra solo gli abbonamenti attivi
    const activeSubscriptions = subscriptions.filter(sub => sub.isActive);
    
    // Calcola i totali considerando la quota individuale
    const monthlyTotal = activeSubscriptions.reduce((total, sub) => {
      const totalPeople = (sub.persone?.length || 0) + 1; // +1 per includere l'utente stesso
      const individualQuota = parseFloat(sub.prezzo) / totalPeople;
      return total + individualQuota;
    }, 0);
    
    setTotals({
      monthly: Math.ceil(monthlyTotal),
      yearly: Math.ceil(monthlyTotal * 12)
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

  return (
    <Layout>
      <div style={{
        padding: '2rem',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif'
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '2.75rem',
            fontWeight: '700',
            margin: '0 0 1rem 0',
            letterSpacing: '-0.025em',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            background: 'linear-gradient(135deg, #1d1d1f 0%, #86868b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Pagamenti
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: '#86868b',
            margin: 0,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            fontWeight: '400',
            lineHeight: '1.4'
          }}>
            Monitora e gestisci tutti i tuoi pagamenti
          </p>
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
            {/* Riquadri Totali */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              {/* Totale Mensile */}
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
                }}>Spesa Mensile</h4>
                <p style={{
                  fontSize: '2rem',
                  color: '#1d1d1f',
                  fontWeight: '700',
                  margin: 0,
                  letterSpacing: '-0.02em'
                }}>€{totals.monthly}</p>
              </div>

              {/* Totale Annuale */}
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
                }}>Spesa Annuale</h4>
                <p style={{
                  fontSize: '2rem',
                  color: '#1d1d1f',
                  fontWeight: '700',
                  margin: 0,
                  letterSpacing: '-0.02em'
                }}>€{totals.yearly}</p>
              </div>
            </div>

            {/* Lista Abbonamenti */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '24px',
              padding: '2rem',
              border: '1px solid rgba(0, 122, 255, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#1d1d1f',
                  margin: 0,
                  background: 'linear-gradient(135deg, #1d1d1f 0%, #86868b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Abbonamenti Attivi</h3>

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
                      padding: '8px 16px',
                      fontSize: '0.9rem',
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
                      boxShadow: viewMode === 'grid' ? '0 2px 8px rgba(0, 122, 255, 0.25)' : 'none'
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
                    <span style={{ fontSize: '1rem' }}>⊞</span>
                    Riquadri
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    style={{
                      padding: '8px 16px',
                      fontSize: '0.9rem',
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
                      boxShadow: viewMode === 'list' ? '0 2px 8px rgba(0, 122, 255, 0.25)' : 'none'
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
                    <span style={{ fontSize: '1rem' }}>☰</span>
                    Elenco
                  </button>
                </div>
              </div>

              {subscriptions.filter(sub => sub.isActive).length === 0 ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '3rem',
                  background: 'rgba(0, 0, 0, 0.02)',
                  borderRadius: '16px',
                  gap: '1rem'
                }}>
                  <span style={{
                    fontSize: '2.5rem',
                    color: '#86868b'
                  }}>📱</span>
                  <p style={{
                    fontSize: '1.125rem',
                    color: '#86868b',
                    margin: 0,
                    textAlign: 'center',
                    fontWeight: '500'
                  }}>
                    Nessun abbonamento attivo
                  </p>
                  <p style={{
                    fontSize: '0.9375rem',
                    color: '#86868b',
                    margin: 0,
                    textAlign: 'center',
                    maxWidth: '400px',
                    lineHeight: '1.4'
                  }}>
                    Attiva i tuoi abbonamenti dalla pagina "I miei Abbonamenti" per visualizzarli qui
                  </p>
                </div>
              ) : (
                <div style={{
                  display: viewMode === 'grid' ? 'grid' : 'flex',
                  gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(300px, 1fr))' : 'none',
                  flexDirection: viewMode === 'list' ? 'column' : 'row',
                  gap: '1.5rem'
                }}>
                  {subscriptions.filter(sub => sub.isActive).map((subscription) => (
                    <div
                      key={subscription.id}
                      style={{
                        background: 'white',
                        borderRadius: viewMode === 'list' ? '16px' : '20px',
                        padding: viewMode === 'list' ? '1.25rem' : '1.5rem',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
                        border: '1px solid rgba(0, 122, 255, 0.1)',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden',
                        display: viewMode === 'list' ? 'flex' : 'block',
                        alignItems: viewMode === 'list' ? 'center' : 'stretch',
                        gap: viewMode === 'list' ? '1.5rem' : '0'
                      }}
                    >
                      {/* Sfondo decorativo solo in modalità grid */}
                      {viewMode === 'grid' && (
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          width: '150px',
                          height: '150px',
                          background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.05) 0%, rgba(88, 86, 214, 0.05) 100%)',
                          borderRadius: '0 20px 0 100%',
                          zIndex: 0
                        }} />
                      )}

                      <div style={{
                        position: 'relative',
                        zIndex: 1,
                        width: '100%',
                        display: viewMode === 'list' ? 'flex' : 'block',
                        alignItems: viewMode === 'list' ? 'center' : 'stretch',
                        justifyContent: viewMode === 'list' ? 'space-between' : 'flex-start',
                        gap: viewMode === 'list' ? '2rem' : '0'
                      }}>
                        <div style={{
                          flex: viewMode === 'list' ? '1' : 'none',
                          marginBottom: viewMode === 'list' ? '0' : '1.25rem'
                        }}>
                          <h4 style={{
                            fontSize: '1.25rem',
                            fontWeight: '600',
                            color: '#1d1d1f',
                            margin: '0 0 0.75rem 0'
                          }}>
                            {subscription.nome}
                          </h4>
                          <p style={{
                            fontSize: '1rem',
                            color: '#86868b',
                            margin: '0 0 0.5rem 0',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}>
                            <span style={{ fontSize: '1.1rem' }}>🔄</span>
                            {formatFrequency(subscription)}
                          </p>
                        </div>

                        <div style={{
                          display: 'flex',
                          flexDirection: viewMode === 'list' ? 'row' : 'column',
                          gap: viewMode === 'list' ? '2rem' : '0.75rem',
                          flex: viewMode === 'list' ? '2' : 'none'
                        }}>
                          <div style={{
                            display: 'flex',
                            flexDirection: viewMode === 'list' ? 'column' : 'row',
                            justifyContent: 'space-between',
                            alignItems: viewMode === 'list' ? 'flex-start' : 'center',
                            padding: '0.75rem',
                            background: 'rgba(0, 0, 0, 0.02)',
                            borderRadius: '12px',
                            flex: viewMode === 'list' ? '1' : 'none'
                          }}>
                            <span style={{
                              fontSize: '0.9375rem',
                              color: '#86868b'
                            }}>Costo totale</span>
                            <span style={{
                              fontSize: '1rem',
                              fontWeight: '600',
                              color: '#1d1d1f'
                            }}>€{Math.ceil(parseFloat(subscription.prezzo))}</span>
                          </div>

                          <div style={{
                            display: 'flex',
                            flexDirection: viewMode === 'list' ? 'column' : 'row',
                            justifyContent: 'space-between',
                            alignItems: viewMode === 'list' ? 'flex-start' : 'center',
                            padding: '0.75rem',
                            background: 'rgba(0, 122, 255, 0.05)',
                            borderRadius: '12px',
                            border: '1px solid rgba(0, 122, 255, 0.1)',
                            flex: viewMode === 'list' ? '1' : 'none'
                          }}>
                            <span style={{
                              fontSize: '0.9375rem',
                              color: '#007AFF'
                            }}>La tua quota</span>
                            <span style={{
                              fontSize: '1rem',
                              fontWeight: '600',
                              color: '#007AFF'
                            }}>€{Math.ceil(parseFloat(subscription.prezzo) / ((subscription.persone?.length || 0) + 1))}</span>
                          </div>

                          {viewMode === 'list' && (
                            <div style={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '0.25rem',
                              flex: '1'
                            }}>
                              <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                              }}>
                                <span style={{
                                  fontSize: '0.8125rem',
                                  color: '#86868b'
                                }}>Ultimo pagamento</span>
                                <span style={{
                                  fontSize: '0.9375rem',
                                  color: '#1d1d1f',
                                  fontWeight: '500'
                                }}>{formatData(subscription.ultimoPagamento)}</span>
                              </div>
                              <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                              }}>
                                <span style={{
                                  fontSize: '0.8125rem',
                                  color: '#86868b'
                                }}>Totale pagato</span>
                                <span style={{
                                  fontSize: '0.9375rem',
                                  color: '#1d1d1f',
                                  fontWeight: '500'
                                }}>€{Math.ceil(parseFloat(subscription.totalePagato || 0))}</span>
                              </div>
                            </div>
                          )}
                        </div>

                        {viewMode === 'grid' && (
                          <div style={{
                            marginTop: '1.25rem',
                            paddingTop: '1.25rem',
                            borderTop: '1px solid rgba(0, 0, 0, 0.05)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <div style={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '0.25rem'
                            }}>
                              <span style={{
                                fontSize: '0.8125rem',
                                color: '#86868b'
                              }}>Ultimo pagamento</span>
                              <span style={{
                                fontSize: '0.9375rem',
                                color: '#1d1d1f',
                                fontWeight: '500'
                              }}>{formatData(subscription.ultimoPagamento)}</span>
                            </div>
                            <div style={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '0.25rem',
                              alignItems: 'flex-end'
                            }}>
                              <span style={{
                                fontSize: '0.8125rem',
                                color: '#86868b'
                              }}>Totale pagato</span>
                              <span style={{
                                fontSize: '0.9375rem',
                                color: '#1d1d1f',
                                fontWeight: '500'
                              }}>€{Math.ceil(parseFloat(subscription.totalePagato || 0))}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default Pagamenti; 