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
  const navigate = useNavigate();

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

  const renderSubscriptionSection = (title, subscriptions, totals) => (
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
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
      marginBottom: '2rem'
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
        }}>{title}</h3>

        
      </div>
      <div style={{
          background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(88, 86, 214, 0.1) 100%)',
          borderRadius: '16px',
          padding: '1.5rem',
          border: '1px solid rgba(0, 122, 255, 0.2)',
          minWidth: '200px'
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
      {subscriptions.length === 0 ? (
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
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {subscriptions.map((subscription) => (
            <div
              key={subscription.id}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '1.25rem',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
                border: '1px solid rgba(0, 122, 255, 0.1)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <div style={{
                flex: '1',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <h4 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#1d1d1f',
                  margin: 0
                }}>
                  {subscription.nome}
                </h4>
              </div>

              <div style={{
                display: 'flex',
                gap: '1rem',
                flex: '3'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  background: 'rgba(0, 0, 0, 0.02)',
                  borderRadius: '12px',
                  flex: '1'
                }}>
                  <span style={{
                    fontSize: '0.9375rem',
                    color: '#86868b'
                  }}>Costo abbonamento</span>
                  <span style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#1d1d1f'
                  }}>€{(parseFloat(subscription.prezzo) / ((subscription.persone?.length || 0) + 1)).toFixed(2)}</span>
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  background: 'rgba(0, 122, 255, 0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(0, 122, 255, 0.1)',
                  flex: '1'
                }}>
                  <span style={{
                    fontSize: '0.9375rem',
                    color: '#007AFF'
                  }}>Costo mensile</span>
                  <span style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#007AFF'
                  }}>€{calcolaCostoMensile(subscription).toFixed(2)}</span>
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  background: 'rgba(0, 0, 0, 0.02)',
                  borderRadius: '12px',
                  flex: '1'
                }}>
                  <span style={{
                    fontSize: '0.9375rem',
                    color: '#86868b'
                  }}>Costo annuale</span>
                  <span style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#1d1d1f'
                  }}>€{calcolaCostoAnnuale(subscription).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

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
            Contabilità
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: '#86868b',
            margin: 0,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            fontWeight: '400',
            lineHeight: '1.4'
          }}>
            Monitora tutti i pagamenti
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
            {renderSubscriptionSection(
              'Abbonamenti a Spesa Fissa',
              subscriptions.filter(sub => sub.isActive && sub.tipoPagamento === 'fisso'),
              totals.fixed
            )}
            
            {renderSubscriptionSection(
              'Abbonamenti a Spesa Variabile',
              subscriptions.filter(sub => sub.isActive && sub.tipoPagamento === 'variabile'),
              totals.variable
            )}
          </>
        )}
      </div>
    </Layout>
  );
}

export default Contabilita; 