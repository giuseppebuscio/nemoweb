import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { useSubscriptions } from '../context/SubscriptionContext';

function Dashboard() {
  const navigate = useNavigate();
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

  // Funzione per calcolare il costo mensile di un singolo abbonamento
  const calcolaCostoMensile = (subscription) => {
    const totalPeople = (subscription.persone?.length || 0) + 1;
    const prezzo = parseFloat(subscription.prezzo) / totalPeople;
    if (subscription.frequenza === 'annuale') {
      return prezzo / 12;
    }
    return prezzo;
  };

  // Funzione per ottenere il totale mensile
  const getTotaleMensile = () => {
    return (totals.fixed.monthly + totals.variable.monthly).toFixed(2);
  };

  return (
    <Layout>
      <div style={{ 
        padding: '1rem',
        background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f7 100%)',
        minHeight: '100vh',
        width: '100%'
      }}>
        <div style={{ width: '100%' }}>
          {/* Header con animazione */}
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
              Benvenuto, <span style={{
                background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Giuseppe</span>
            </h1>
            <p style={{
              fontSize: 'clamp(0.875rem, 3vw, 1.125rem)',
              color: '#86868b',
              margin: 0,
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              fontWeight: '400',
              lineHeight: '1.4'
            }}>
              Panoramica dei tuoi abbonamenti e spese
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
            {/* Card Abbonamenti Attivi */}
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
              }}>📊</div>
              <div style={{
                fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                fontWeight: '600',
                color: '#007AFF',
                marginBottom: '0.5rem',
              }}>
                {subscriptions.filter(sub => sub.isActive).length}
              </div>
              <div style={{ 
                fontSize: 'clamp(0.875rem, 2.5vw, 1rem)', 
                color: '#86868b',
                fontWeight: '400',
                letterSpacing: '0.5px'
              }}>
                Abbonamenti attivi
              </div>
            </div>

            {/* Card Abbonamenti Totali */}
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
              }}>📝</div>
              <div style={{
                fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                fontWeight: '600',
                color: '#34C759',
                marginBottom: '0.5rem',
              }}>
                {subscriptions.length}
              </div>
              <div style={{ 
                fontSize: 'clamp(0.875rem, 2.5vw, 1rem)', 
                color: '#86868b',
                fontWeight: '400',
                letterSpacing: '0.5px'
              }}>
                Abbonamenti totali
              </div>
            </div>

            {/* Card Spesa Mensile */}
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
              }}>💰</div>
              <div style={{
                fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                fontWeight: '600',
                color: '#FF9500',
                marginBottom: '0.5rem',
              }}>
                €{getTotaleMensile()}
              </div>
              <div style={{ 
                fontSize: 'clamp(0.875rem, 2.5vw, 1rem)', 
                color: '#86868b',
                fontWeight: '400',
                letterSpacing: '0.5px'
              }}>
                Spesa mensile totale
              </div>
            </div>
          </div>

          {/* Lista abbonamenti recenti con design migliorato */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '1.5rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            animation: 'fadeInUp 0.8s ease-out 0.4s both'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{
                fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
                fontWeight: '700',
                color: '#1d1d1f',
                margin: 0,
                letterSpacing: '-0.01em'
              }}>
                Abbonamenti recenti
              </h2>
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
                  alignSelf: 'flex-start'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #0051D5 0%, #4644B8 100%)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)'}
              >
                <span style={{ fontSize: '1.1em' }}>+</span>
                Aggiungi nuovo
              </button>
            </div>
            <div style={{
              display: 'grid',
              gap: '0.75rem'
            }}>
              {subscriptions.slice(0, 5).map((subscription, index) => (
                <div
                  key={subscription.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.6)',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    animation: `slideInRight 0.5s ease-out ${0.6 + index * 0.1}s both`
                  }}
                  onClick={() => navigate(`/abbonamenti/${subscription.id}`)}
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 0 }}>
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
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: 'clamp(0.875rem, 3vw, 1.125rem)',
                        fontWeight: '600',
                        color: '#1d1d1f',
                        marginBottom: '0.25rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {subscription.nome}
                      </div>
                      <div style={{
                        fontSize: 'clamp(0.75rem, 2.5vw, 0.9375rem)',
                        color: '#86868b',
                        fontWeight: '500',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        €{subscription.prezzo} • {subscription.frequenza}
                      </div>
                    </div>
                  </div>
                  <div style={{
                    fontSize: '1.25rem',
                    color: '#007AFF',
                    fontWeight: '600',
                    transition: 'all 0.2s ease',
                    flexShrink: 0,
                    marginLeft: '0.5rem'
                  }}>
                    →
                  </div>
                </div>
              ))}
              
              {/* Pulsante "Vedi tutti" */}
              {subscriptions.length > 0 && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '1.25rem',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid rgba(0, 0, 0, 0.05)'
                }}>
                  <button
                    onClick={() => navigate('/abbonamenti')}
                    style={{
                      background: 'rgba(255, 255, 255, 0.8)',
                      color: '#007AFF',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '16px',
                      border: '1px solid rgba(0, 122, 255, 0.2)',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      boxShadow: '0 2px 8px rgba(0, 122, 255, 0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 122, 255, 0.1)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 122, 255, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 122, 255, 0.1)';
                    }}
                  >
                    Vedi tutti gli abbonamenti
                  </button>
                </div>
              )}
            </div>
          </div>

          <style>
            {`
              @media (max-width: 768px) {
                .dashboard-container {
                  padding: 1rem !important;
                }
                
                .stats-grid {
                  grid-template-columns: 1fr !important;
                  gap: 1rem !important;
                }
                
                .subscription-item {
                  padding: 0.875rem !important;
                }
                
                .subscription-logo {
                  width: 36px !important;
                  height: 36px !important;
                  font-size: 1rem !important;
                }
              }
              
              @media (max-width: 480px) {
                .dashboard-container {
                  padding: 0.75rem !important;
                }
                
                .stats-card {
                  padding: 1.25rem !important;
                  border-radius: 16px !important;
                }
                
                .subscription-item {
                  padding: 0.75rem !important;
                }
              }
              
              @keyframes slideInDown {
                from {
                  opacity: 0;
                  transform: translateY(-30px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
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
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard; 