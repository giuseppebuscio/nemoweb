import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useSubscriptions } from '../context/SubscriptionContext';
import { BsGrid, BsList } from 'react-icons/bs';
import './Abbonamenti.css';

function Abbonamenti() {
  const navigate = useNavigate();
  const { subscriptions, deleteSubscription, toggleSubscriptionStatus } = useSubscriptions();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [subscriptionToDelete, setSubscriptionToDelete] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' o 'list'


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

  return (
    <Layout>
      <div style={{ 
        padding: '2rem',
        background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f7 100%)',
        minHeight: '100vh',
        width: '100%'
      }}>
        <div style={{ width: '100%', maxWidth: 'none' }}>
          
          {/* Header */}
          <div style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <div>
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
                  I miei Abbonamenti
                </h1>
                <p style={{
                  fontSize: '1.125rem',
                  color: '#86868b',
                  margin: 0,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  fontWeight: '400',
                  lineHeight: '1.4'
                }}>
                  Visualizza e gestisci tutti i tuoi abbonamenti
                </p>
              </div>

              <button
                onClick={() => navigate('/aggiungi-abbonamento')}
                style={{
                  background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '0.9375rem',
                  fontWeight: '500',
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
          </div>

          {/* Main Content */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
          }}>
            {/* Header del riquadro con titolo e controlli visualizzazione */}
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

              {/* Controlli visualizzazione */}
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

            {/* Grid/List View */}
            <div className={viewMode === 'list' ? 'list-view' : 'grid-view'} style={{
              display: 'grid',
              gap: '1rem',
              gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(300px, 1fr))' : '1fr'
            }}>
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
                  <span style={{ fontSize: '2.5rem' }}>📱</span>
                  <p style={{
                    fontSize: '1.125rem',
                    color: '#86868b',
                    margin: 0,
                    textAlign: 'center',
                    fontWeight: '500'
                  }}>
                    Nessun abbonamento presente
                  </p>
                  <p style={{
                    fontSize: '0.9375rem',
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
                subscriptions.map((subscription) => (
                  <div key={subscription.id} style={{
                    opacity: subscription.isActive ? 1 : 0.6,
                    position: 'relative',
                    background: 'white',
                    borderRadius: viewMode === 'list' ? '12px' : '20px',
                    padding: viewMode === 'list' ? '1rem 1.5rem' : '1.5rem',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.2s ease',
                    display: viewMode === 'list' ? 'flex' : 'block',
                    alignItems: viewMode === 'list' ? 'center' : undefined,
                    gap: viewMode === 'list' ? '2rem' : undefined
                  }}>
                    {viewMode === 'list' ? (
                      <>
                        {/* Vista Elenco */}
                        {/* Nome e Frequenza (Sinistra) */}
                        <div style={{
                          flex: '2'
                        }}>
                          <h4 style={{
                            fontSize: '1.25rem',
                            fontWeight: '600',
                            color: '#1d1d1f',
                            margin: '0 0 0.5rem 0'
                          }}>
                            {subscription.nome}
                          </h4>
                          <p style={{
                            fontSize: '1rem',
                            color: '#86868b',
                            margin: 0,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}>
                            <span style={{ fontSize: '1.1rem' }}>🔄</span>
                            {formatFrequency(subscription)}
                          </p>
                        </div>

                        {/* Costo Totale */}
                        <div style={{
                          flex: '1',
                          display: 'flex',
                          flexDirection: 'column',
                          padding: '0.75rem',
                          background: 'rgba(0, 0, 0, 0.02)',
                          borderRadius: '12px',
                          alignItems: 'flex-start'
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

                        {/* La tua quota */}
                        <div style={{
                          flex: '1',
                          display: 'flex',
                          flexDirection: 'column',
                          padding: '0.75rem',
                          background: 'rgba(0, 122, 255, 0.05)',
                          borderRadius: '12px',
                          border: '1px solid rgba(0, 122, 255, 0.1)',
                          alignItems: 'flex-start'
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

                        {/* Pulsante Visualizza */}
                        <button
                          onClick={() => navigate(`/abbonamenti/${subscription.id}`)}
                          style={{
                            background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
                            color: 'white',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '12px',
                            border: 'none',
                            fontSize: '0.9375rem',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            flex: '0.5',
                            whiteSpace: 'nowrap'
                          }}
                          onMouseOver={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #0051D5 0%, #4644B8 100%)'}
                          onMouseOut={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)'}
                        >
                          Visualizza
                        </button>

                        {/* Switch */}
                        <div style={{
                          flex: '0.5',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggle(subscription);
                          }}
                        >
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
                      </>
                    ) : (
                      <>
                        {/* Vista Riquadri */}
                        <div style={{
                          position: 'relative',
                          zIndex: 1,
                          marginTop: '2rem'
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

                          <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.75rem',
                            marginTop: '1.25rem'
                          }}>
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: '0.75rem',
                              background: 'rgba(0, 0, 0, 0.02)',
                              borderRadius: '12px'
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
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: '0.75rem',
                              background: 'rgba(0, 122, 255, 0.05)',
                              borderRadius: '12px',
                              border: '1px solid rgba(0, 122, 255, 0.1)'
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
                          </div>

                          <button
                            onClick={() => navigate(`/abbonamenti/${subscription.id}`)}
                            style={{
                              background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
                              color: 'white',
                              padding: '0.75rem 1.5rem',
                              borderRadius: '12px',
                              border: 'none',
                              fontSize: '0.9375rem',
                              fontWeight: '500',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              width: '100%',
                              marginTop: '1.25rem'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #0051D5 0%, #4644B8 100%)'}
                            onMouseOut={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)'}
                          >
                            Visualizza
                          </button>
                        </div>

                        {/* Switch per la vista riquadri */}
                        <div style={{
                          position: 'absolute',
                          top: '1rem',
                          right: '1rem',
                          zIndex: 2
                        }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggle(subscription);
                          }}
                        >
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

                        {/* Sfondo decorativo */}
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
                      </>
                    )}
                  </div>
                ))
              )}
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
              zIndex: 1000
            }}>
              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '16px',
                maxWidth: '400px',
                width: '90%'
              }}>
                <h3 style={{
                  margin: '0 0 1rem 0',
                  fontSize: '1.25rem',
                  fontWeight: '600'
                }}>Conferma eliminazione</h3>
                <p style={{
                  margin: '0 0 1.5rem 0',
                  color: '#666'
                }}>Sei sicuro di voler eliminare questo abbonamento?</p>
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  justifyContent: 'flex-end'
                }}>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    style={{
                      padding: '0.5rem 1rem',
                      border: 'none',
                      borderRadius: '8px',
                      background: '#f5f5f7',
                      color: '#666',
                      cursor: 'pointer'
                    }}
                  >
                    Annulla
                  </button>
                  <button
                    onClick={confirmDelete}
                    style={{
                      padding: '0.5rem 1rem',
                      border: 'none',
                      borderRadius: '8px',
                      background: '#ff3b30',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    Elimina
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Abbonamenti; 