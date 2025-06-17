import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { useSubscriptions } from '../context/SubscriptionContext';

function Dashboard() {
  const navigate = useNavigate();
  const { subscriptions } = useSubscriptions();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [subscriptions]);

  const calcolaCostoMensile = () => {
    return subscriptions.reduce((totale, sub) => {
      const costo = parseFloat(sub.prezzo) || 0;
      switch (sub.frequenza) {
        case 'settimanale':
          return totale + (costo * 4.33);
        case 'mensile':
          return totale + costo;
        case 'trimestrale':
          return totale + (costo / 3);
        case 'semestrale':
          return totale + (costo / 6);
        case 'annuale':
          return totale + (costo / 12);
        default:
          return totale + costo;
      }
    }, 0).toFixed(2);
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

          {/* Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
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
                {subscriptions.length}
              </div>
              <div style={{ fontSize: '0.9375rem', color: '#86868b' }}>
                Abbonamenti attivi
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, rgba(52, 199, 89, 0.1) 0%, rgba(48, 209, 88, 0.1) 100%)',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid rgba(52, 199, 89, 0.2)'
            }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>💰</div>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#34C759',
                marginBottom: '0.25rem'
              }}>
                €{(calcolaCostoMensile() * 12).toFixed(2)}
              </div>
              <div style={{ fontSize: '0.9375rem', color: '#86868b' }}>
                Spesa annuale stimata
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 149, 0, 0.1) 0%, rgba(255, 123, 0, 0.1) 100%)',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 149, 0, 0.2)'
            }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>⏰</div>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#FF9500',
                marginBottom: '0.25rem'
              }}>
                {subscriptions.filter(sub => {
                  const today = new Date();
                  const scadenza = new Date(sub.dataInizio);
                  const diffTime = scadenza - today;
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  return diffDays <= 7 && diffDays >= 0;
                }).length}
              </div>
              <div style={{ fontSize: '0.9375rem', color: '#86868b' }}>
                In scadenza questa settimana
              </div>
            </div>
          </div>

          {/* Aggiungi Abbonamento Button */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <button
              onClick={() => navigate('/aggiungi-abbonamento')}
              style={{
                background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '12px',
                border: 'none',
                fontSize: '1rem',
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
              Aggiungi nuovo abbonamento
            </button>
          </div>

          {/* Lista abbonamenti recenti */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(0, 0, 0, 0.05)'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#1d1d1f',
              marginBottom: '1.5rem'
            }}>
              Abbonamenti recenti
            </h2>
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