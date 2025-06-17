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
        padding: '2rem',
        background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f7 100%)',
        minHeight: '100vh',
        width: '100%'
      }}>
        <div style={{ width: '100%' }}>
          {/* Header */}
          <div style={{
            marginBottom: '2rem'
          }}>
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
              Dashboard
            </h1>
            <p style={{
              fontSize: '1.125rem',
              color: '#86868b',
              margin: 0,
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              fontWeight: '400',
              lineHeight: '1.4'
            }}>
              Panoramica dei tuoi abbonamenti e spese
            </p>
          </div>

          {/* Messaggio di Benvenuto */}
          <div style={{
            marginBottom: '2rem',
            textAlign: 'left'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '600',
              margin: 0,
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
            }}>
              Benvenuto, <span style={{
                background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Giuseppe</span>
            </h2>
          </div>

          {/* Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {/* Card Abbonamenti Attivi */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(88, 86, 214, 0.1) 100%)',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid rgba(0, 122, 255, 0.2)'
            }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>📊</div>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#1d1d1f',
                marginBottom: '0.25rem'
              }}>
                {subscriptions.filter(sub => sub.isActive).length}
              </div>
              <div style={{ fontSize: '0.9375rem', color: '#86868b' }}>
                Abbonamenti attivi
              </div>
            </div>

            {/* Card Abbonamenti Totali */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(52, 199, 89, 0.1) 0%, rgba(48, 209, 88, 0.1) 100%)',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid rgba(52, 199, 89, 0.2)'
            }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>📝</div>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#34C759',
                marginBottom: '0.25rem'
              }}>
                {subscriptions.length}
              </div>
              <div style={{ fontSize: '0.9375rem', color: '#86868b' }}>
                Abbonamenti totali
              </div>
            </div>

            {/* Card Spesa Mensile */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 149, 0, 0.1) 0%, rgba(255, 123, 0, 0.1) 100%)',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 149, 0, 0.2)'
            }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>💰</div>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#FF9500',
                marginBottom: '0.25rem'
              }}>
                €{getTotaleMensile()}
              </div>
              <div style={{ fontSize: '0.9375rem', color: '#86868b' }}>
                Spesa mensile totale
              </div>
            </div>
          </div>

          {/* Lista abbonamenti recenti */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#1d1d1f',
                margin: 0
              }}>
                Abbonamenti recenti
              </h2>
              <button
                onClick={() => navigate('/aggiungi-abbonamento')}
                style={{
                  background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '0.9375rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #0051D5 0%, #4644B8 100%)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)'}
              >
                <span style={{ fontSize: '1.2em' }}>+</span>
                Aggiungi nuovo
              </button>
            </div>
            <div style={{
              display: 'grid',
              gap: '1rem'
            }}>
              {subscriptions.slice(0, 5).map((subscription) => (
                <div
                  key={subscription.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem',
                    background: 'rgba(0, 0, 0, 0.02)',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => navigate(`/abbonamenti/${subscription.id}`)}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.04)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.02)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div>
                    <div style={{
                      fontSize: '1rem',
                      fontWeight: '500',
                      color: '#1d1d1f',
                      marginBottom: '0.25rem'
                    }}>
                      {subscription.nome}
                    </div>
                    <div style={{
                      fontSize: '0.875rem',
                      color: '#86868b'
                    }}>
                      €{subscription.prezzo} • {subscription.frequenza}
                    </div>
                  </div>
                  <div style={{
                    fontSize: '1.2em',
                    color: '#007AFF'
                  }}>
                    →
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard; 