import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { useSubscriptions } from '../../context/SubscriptionContext';

function EditSubscription() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSubscription, updateSubscription } = useSubscriptions();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [currentPersonInput, setCurrentPersonInput] = useState('');
  const [subscription, setSubscription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    nome: '',
    dataInizio: '',
    frequenza: 'mensile',
    frequenzaPersonalizzata: {
      numero: '',
      unita: 'giorni'
    },
    persone: [],
    prezzo: '',
    logo: null,
    tipoPagamento: 'fisso' // 'fisso' o 'variabile'
  });

  const [logoPreview, setLogoPreview] = useState(null);
  const [logoError, setLogoError] = useState('');

  // Carica i dati dell'abbonamento
  useEffect(() => {
    const loadSubscription = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getSubscription(id);
        if (data) {
          setSubscription(data);
          setFormData({
            nome: data.nome || '',
            dataInizio: data.dataInizio || '',
            frequenza: data.frequenza || 'mensile',
            frequenzaPersonalizzata: data.frequenzaPersonalizzata || {
              numero: '',
              unita: 'giorni'
            },
            persone: data.persone || [],
            prezzo: data.prezzo || '',
            logo: data.logo || null,
            tipoPagamento: data.tipoPagamento || 'fisso'
          });
          if (data.logo) {
            setLogoPreview(data.logo);
          }
        } else {
          setError('Abbonamento non trovato');
        }
      } catch (err) {
        setError('Errore nel caricamento dell\'abbonamento');
        console.error('Errore nel caricamento dell\'abbonamento:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadSubscription();
  }, [id, getSubscription]);

  if (isLoading) {
    return (
      <Layout>
        <div style={{
          padding: '2rem',
          background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f7 100%)',
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            fontSize: '1.25rem',
            color: '#86868b'
          }}>
            Caricamento...
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !subscription) {
    return (
      <Layout>
        <div style={{
          padding: '2rem',
          background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f7 100%)',
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
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
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1d1d1f',
              margin: '0 0 1rem 0',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
            }}>
              {error || 'Abbonamento non trovato'}
            </h2>
            <button
              onClick={() => navigate('/abbonamenti')}
              style={{
                padding: '12px 24px',
                fontSize: '1rem',
                fontWeight: '600',
                border: 'none',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
              }}
            >
              Torna agli abbonamenti
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('frequenzaPersonalizzata.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        frequenzaPersonalizzata: {
          ...prev.frequenzaPersonalizzata,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      const updated = await updateSubscription(id, formData);
      if (updated) {
        navigate(`/abbonamenti/${id}`);
      } else {
        setError('Errore nell\'aggiornamento dell\'abbonamento');
      }
    } catch (err) {
      setError('Errore nell\'aggiornamento dell\'abbonamento');
      console.error('Errore nell\'aggiornamento dell\'abbonamento:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.nome.trim() && formData.dataInizio && formData.prezzo && 
    parseFloat(formData.prezzo) > 0 &&
    (formData.frequenza !== 'personalizzato' || 
     (formData.frequenzaPersonalizzata.numero && parseInt(formData.frequenzaPersonalizzata.numero) > 0));

  const prezzoTotale = parseFloat(formData.prezzo) || 0;

  const addPerson = (personName) => {
    const trimmedName = personName.trim();
    if (trimmedName && !formData.persone.includes(trimmedName)) {
      setFormData(prev => ({
        ...prev,
        persone: [...prev.persone, trimmedName]
      }));
    }
    setCurrentPersonInput('');
  };

  const removePerson = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      persone: prev.persone.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handlePersonInputKeyDown = (e) => {
    if (e.key === ',' || e.key === 'Tab') {
      e.preventDefault();
      addPerson(currentPersonInput);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      addPerson(currentPersonInput);
    } else if (e.key === 'Backspace' && currentPersonInput === '' && formData.persone.length > 0) {
      const lastPerson = formData.persone[formData.persone.length - 1];
      removePerson(formData.persone.length - 1);
      setCurrentPersonInput(lastPerson);
    }
  };

  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    navigate(`/abbonamenti/${id}`);
  };

  const continueEditing = () => {
    setShowCancelModal(false);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Verifica il formato del file
      const validFormats = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validFormats.includes(file.type)) {
        setLogoError('Impossibile caricare. Formato sbagliato');
        return;
      }

      setLogoError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
        setFormData(prev => ({
          ...prev,
          logo: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogoPreview(null);
    setLogoError('');
    setFormData(prev => ({
      ...prev,
      logo: null
    }));
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
          <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
            <h1 style={{
              fontSize: '2.75rem',
              fontWeight: '700',
              color: '#1d1d1f',
              margin: '0 0 1rem 0',
              letterSpacing: '-0.025em',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              background: 'linear-gradient(135deg, #1d1d1f 0%, #86868b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Modifica Abbonamento
            </h1>
            <p style={{
              fontSize: '1.125rem',
              color: '#86868b',
              margin: 0,
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              fontWeight: '400',
              lineHeight: '1.4'
            }}>
              Modifica i dettagli di "{subscription.nome}"
            </p>
          </div>

          {/* Form Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '2.5rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            width: '100%'
          }}>
            <form onSubmit={handleSubmit}>
              
              {/* Nome Abbonamento */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#1d1d1f',
                  marginBottom: '0.75rem',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                }}>
                  Nome dell'abbonamento <span style={{ color: '#FF3B30' }}>*</span>
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder="es. Netflix, Spotify, Adobe Creative Suite..."
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    fontSize: '1.0625rem',
                    border: '1px solid #d2d2d7',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.8)',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    outline: 'none',
                    boxSizing: 'border-box',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#007AFF';
                    e.target.style.background = 'rgba(255, 255, 255, 0.95)';
                    e.target.style.boxShadow = '0 0 0 4px rgba(0, 122, 255, 0.1)';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d2d2d7';
                    e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                    e.target.style.boxShadow = 'none';
                    e.target.style.transform = 'translateY(0)';
                  }}
                />
              </div>

              {/* Data Inizio Pagamento */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#1d1d1f',
                  marginBottom: '0.75rem',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                }}>
                  Data di inizio pagamento <span style={{ color: '#FF3B30' }}>*</span>
                </label>
                <input
                  type="date"
                  name="dataInizio"
                  value={formData.dataInizio}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    fontSize: '1.0625rem',
                    border: '1px solid #d2d2d7',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.8)',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    outline: 'none',
                    boxSizing: 'border-box',
                    colorScheme: 'light',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#007AFF';
                    e.target.style.background = 'rgba(255, 255, 255, 0.95)';
                    e.target.style.boxShadow = '0 0 0 4px rgba(0, 122, 255, 0.1)';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d2d2d7';
                    e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                    e.target.style.boxShadow = 'none';
                    e.target.style.transform = 'translateY(0)';
                  }}
                />
                <p style={{
                  fontSize: '0.875rem',
                  color: '#86868b',
                  margin: '0.75rem 0 0 0',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  fontWeight: '400'
                }}>
                  Questa sarà la data del primo addebito
                </p>
              </div>

              {/* Frequenza */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#1d1d1f',
                  marginBottom: '0.75rem',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                }}>
                  Frequenza di pagamento <span style={{ color: '#FF3B30' }}>*</span>
                </label>
                <select
                  name="frequenza"
                  value={formData.frequenza}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    fontSize: '1.0625rem',
                    border: '1px solid #d2d2d7',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.8)',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    outline: 'none',
                    boxSizing: 'border-box',
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#007AFF';
                    e.target.style.background = 'rgba(255, 255, 255, 0.95)';
                    e.target.style.boxShadow = '0 0 0 4px rgba(0, 122, 255, 0.1)';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d2d2d7';
                    e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                    e.target.style.boxShadow = 'none';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <option value="giornaliera">Ogni giorno</option>
                  <option value="settimanale">Ogni settimana</option>
                  <option value="mensile">Ogni mese</option>
                  <option value="annuale">Ogni anno</option>
                  <option value="personalizzato">Personalizzato</option>
                </select>

                {/* Campi personalizzati */}
                {formData.frequenza === 'personalizzato' && (
                  <div style={{
                    marginTop: '1.25rem',
                    padding: '1.5rem',
                    background: 'rgba(0, 122, 255, 0.06)',
                    borderRadius: '16px',
                    border: '1px solid rgba(0, 122, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)'
                  }}>
                    <p style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: '#1d1d1f',
                      margin: '0 0 1.25rem 0',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                    }}>
                      Imposta frequenza personalizzata
                    </p>
                    <div style={{
                      display: 'flex',
                      gap: '1.25rem',
                      alignItems: 'center'
                    }}>
                      <div style={{ flex: '0 0 auto' }}>
                        <span style={{
                          fontSize: '1rem',
                          color: '#1d1d1f',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                          fontWeight: '500'
                        }}>
                          Ogni
                        </span>
                      </div>
                      <div style={{ flex: '0 0 120px' }}>
                        <input
                          type="number"
                          name="frequenzaPersonalizzata.numero"
                          value={formData.frequenzaPersonalizzata.numero}
                          onChange={handleInputChange}
                          placeholder="1"
                          min="1"
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            fontSize: '1rem',
                            border: '1px solid #d2d2d7',
                            borderRadius: '10px',
                            background: 'rgba(255, 255, 255, 0.9)',
                            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            outline: 'none',
                            boxSizing: 'border-box',
                            textAlign: 'center',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#007AFF';
                            e.target.style.boxShadow = '0 0 0 3px rgba(0, 122, 255, 0.15)';
                            e.target.style.background = 'rgba(255, 255, 255, 0.95)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#d2d2d7';
                            e.target.style.boxShadow = 'none';
                            e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                          }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <select
                          name="frequenzaPersonalizzata.unita"
                          value={formData.frequenzaPersonalizzata.unita}
                          onChange={handleInputChange}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            fontSize: '1rem',
                            border: '1px solid #d2d2d7',
                            borderRadius: '10px',
                            background: 'rgba(255, 255, 255, 0.9)',
                            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            outline: 'none',
                            boxSizing: 'border-box',
                            cursor: 'pointer',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#007AFF';
                            e.target.style.boxShadow = '0 0 0 3px rgba(0, 122, 255, 0.15)';
                            e.target.style.background = 'rgba(255, 255, 255, 0.95)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#d2d2d7';
                            e.target.style.boxShadow = 'none';
                            e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                          }}
                        >
                          <option value="giorni">Giorni</option>
                          <option value="settimane">Settimane</option>
                          <option value="mesi">Mesi</option>
                          <option value="anni">Anni</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Persone Coinvolte */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#1d1d1f',
                  marginBottom: '0.75rem',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                }}>
                  Persone coinvolte
                </label>
                
                <div style={{
                  border: '1px solid #d2d2d7',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.8)',
                  padding: '12px',
                  minHeight: '52px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  alignItems: 'center',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'text',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)'
                }}
                onClick={() => document.getElementById('personInput').focus()}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#007AFF';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
                  e.currentTarget.style.boxShadow = '0 0 0 4px rgba(0, 122, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) {
                    e.currentTarget.style.borderColor = '#d2d2d7';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
                tabIndex={0}
              >
                {/* Tag delle persone */}
                {formData.persone.map((persona, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
                      color: 'white',
                      padding: '8px 12px',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      boxShadow: '0 2px 8px rgba(0, 122, 255, 0.25)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>{persona}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removePerson(index);
                      }}
                      style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        padding: '2px',
                        fontSize: '12px',
                        lineHeight: '1',
                        borderRadius: '50%',
                        width: '18px',
                        height: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                        e.target.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                        e.target.style.transform = 'scale(1)';
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
                
                {/* Input per nuova persona */}
                <input
                  id="personInput"
                  type="text"
                  value={currentPersonInput}
                  onChange={(e) => setCurrentPersonInput(e.target.value)}
                  onKeyDown={handlePersonInputKeyDown}
                  onBlur={() => {
                    if (currentPersonInput.trim()) {
                      addPerson(currentPersonInput);
                    }
                  }}
                  placeholder={formData.persone.length === 0 ? "Aggiungi persone (opzionale)" : "Aggiungi altra persona..."}
                  style={{
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: '1.0625rem',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                    flex: 1,
                    minWidth: '200px',
                    padding: '6px 0',
                    color: '#1d1d1f'
                  }}
                />
              </div>
              
              <p style={{
                fontSize: '0.875rem',
                color: '#86868b',
                margin: '0.75rem 0 0 0',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                fontWeight: '400'
              }}>
                💡 Usa virgola, TAB o Invio per aggiungere una persona. Clicca × per rimuovere.
              </p>
              </div>

              {/* Tipo di Pagamento */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#1d1d1f',
                  marginBottom: '0.75rem',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                }}>
                  Tipo di Pagamento
                </label>
                <div style={{
                  display: 'flex',
                  gap: '1rem'
                }}>
                  <label style={{
                    flex: 1,
                    padding: '1rem',
                    border: `2px solid ${formData.tipoPagamento === 'fisso' ? '#007AFF' : '#d2d2d7'}`,
                    borderRadius: '12px',
                    cursor: 'pointer',
                    background: formData.tipoPagamento === 'fisso' ? 'rgba(0, 122, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <input
                      type="radio"
                      name="tipoPagamento"
                      value="fisso"
                      checked={formData.tipoPagamento === 'fisso'}
                      onChange={handleInputChange}
                      style={{ display: 'none' }}
                    />
                    <span style={{
                      fontSize: '1.25rem',
                      color: formData.tipoPagamento === 'fisso' ? '#007AFF' : '#86868b'
                    }}>💰</span>
                    <div>
                      <div style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: formData.tipoPagamento === 'fisso' ? '#007AFF' : '#1d1d1f'
                      }}>
                        Spesa Fissa
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        color: formData.tipoPagamento === 'fisso' ? '#007AFF' : '#86868b'
                      }}>
                        Importo costante ogni mese
                      </div>
                    </div>
                  </label>

                  <label style={{
                    flex: 1,
                    padding: '1rem',
                    border: `2px solid ${formData.tipoPagamento === 'variabile' ? '#007AFF' : '#d2d2d7'}`,
                    borderRadius: '12px',
                    cursor: 'pointer',
                    background: formData.tipoPagamento === 'variabile' ? 'rgba(0, 122, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <input
                      type="radio"
                      name="tipoPagamento"
                      value="variabile"
                      checked={formData.tipoPagamento === 'variabile'}
                      onChange={handleInputChange}
                      style={{ display: 'none' }}
                    />
                    <span style={{ 
                      fontSize: '1.25rem',
                      color: formData.tipoPagamento === 'variabile' ? '#007AFF' : '#86868b'
                    }}>📊</span>
                    <div>
                      <div style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: formData.tipoPagamento === 'variabile' ? '#007AFF' : '#1d1d1f'
                      }}>
                        Spesa Variabile
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        color: formData.tipoPagamento === 'variabile' ? '#007AFF' : '#86868b'
                      }}>
                        Importo che può variare
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Prezzo */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#1d1d1f',
                  marginBottom: '0.75rem',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                    }}>
                  {formData.tipoPagamento === 'variabile' ? 'Prezzo prima rata' : 'Prezzo dell\'abbonamento'}
                </label>
                    <input
                      type="number"
                      name="prezzo"
                      value={formData.prezzo}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      style={{
                        width: '100%',
                    padding: '1rem',
                    fontSize: '1rem',
                    border: '2px solid #d2d2d7',
                        borderRadius: '12px',
                        background: 'rgba(255, 255, 255, 0.8)',
                    color: '#1d1d1f',
                    transition: 'all 0.3s ease',
                        outline: 'none',
                        boxSizing: 'border-box',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                  }}
                />
                {formData.tipoPagamento === 'variabile' && (
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#86868b',
                    margin: '0.75rem 0 0 0',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                  }}>
                    Per le spese variabili, il prezzo delle rate successive potrà essere modificato al momento del pagamento
                  </p>
                )}
                {/* Mostra calcolo costo per persona */}
                {formData.prezzo && prezzoTotale > 0 && (
                  <div style={{
                    marginTop: '1rem',
                    padding: '1rem 1.25rem',
                    background: 'linear-gradient(135deg, rgba(52, 199, 89, 0.08) 0%, rgba(52, 199, 89, 0.12) 100%)',
                    borderRadius: '12px',
                    border: '1px solid rgba(52, 199, 89, 0.2)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)'
                  }}>
                    <div style={{
                      fontSize: '0.9375rem',
                      color: '#34C759',
                      fontWeight: '600',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span style={{ fontSize: '1.125rem' }}>💰</span>
                      {formData.persone.length === 0 ? (
                        "Solo tu pagherai questo abbonamento"
                      ) : (
                        `La quota per persona sarà di €${(prezzoTotale / (formData.persone.length + 1)).toFixed(2)}`
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Logo */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#1d1d1f',
                  marginBottom: '0.75rem',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                }}>
                  Logo dell'abbonamento
                </label>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  border: '2px dashed #d2d2d7',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  background: logoPreview ? 'none' : 'rgba(255, 255, 255, 0.8)',
                  transition: 'all 0.3s ease',
                  borderColor: logoError ? '#FF3B30' : '#d2d2d7'
                }}>
                  {logoPreview ? (
                    <>
                      <img 
                        src={logoPreview} 
                        alt="Logo preview" 
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                      <button
                        type="button"
                        onClick={removeLogo}
                        style={{
                          position: 'absolute',
                          top: '4px',
                          right: '4px',
                          background: 'rgba(0, 0, 0, 0.5)',
                          border: 'none',
                          borderRadius: '50%',
                          width: '20px',
                          height: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          color: 'white',
                          fontSize: '12px',
                          padding: 0
                        }}
                      >
                        ×
                      </button>
                    </>
                  ) : (
                    <label style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp"
                        onChange={handleLogoChange}
                        style={{ display: 'none' }}
                      />
                      <span style={{ 
                        fontSize: '24px',
                        color: logoError ? '#FF3B30' : '#86868b'
                      }}>
                        +
                      </span>
                    </label>
                  )}
                </div>
                {logoError && (
                  <p style={{
                    margin: '0.5rem 0 0 0',
                    fontSize: '0.875rem',
                    color: '#FF3B30',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                  }}>
                    {logoError}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'flex-end',
                paddingTop: '2rem',
                borderTop: '1px solid rgba(0, 0, 0, 0.08)'
              }}>
                <button
                  type="button"
                  onClick={handleCancelClick}
                  style={{
                    padding: '14px 28px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    border: '1px solid #d2d2d7',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.8)',
                    color: '#86868b',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = '#007AFF';
                    e.target.style.color = '#007AFF';
                    e.target.style.background = 'rgba(255, 255, 255, 0.95)';
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = '#d2d2d7';
                    e.target.style.color = '#86868b';
                    e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  Annulla
                </button>

                <button
                  type="submit"
                  disabled={!isFormValid}
                  style={{
                    padding: '14px 32px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    border: 'none',
                    borderRadius: '12px',
                    background: isFormValid 
                      ? 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)' 
                      : 'rgba(0, 0, 0, 0.1)',
                    color: isFormValid ? 'white' : '#86868b',
                    cursor: isFormValid ? 'pointer' : 'not-allowed',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                    minWidth: '180px',
                    boxShadow: isFormValid ? '0 4px 16px rgba(0, 122, 255, 0.25)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (isFormValid) {
                      e.target.style.background = 'linear-gradient(135deg, #0051D0 0%, #4A3FBD 100%)';
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 24px rgba(0, 122, 255, 0.35)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isFormValid) {
                      e.target.style.background = 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 16px rgba(0, 122, 255, 0.25)';
                    }
                  }}
                >
                  Salva Modifiche
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal di conferma annullamento */}
      {showCancelModal && (
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
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '2.5rem',
            maxWidth: '420px',
            width: '90%',
            boxShadow: '0 16px 48px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
          }}>
            <h3 style={{
              fontSize: '1.375rem',
              fontWeight: '700',
              color: '#1d1d1f',
              margin: '0 0 1.25rem 0',
              textAlign: 'center',
              letterSpacing: '-0.01em'
            }}>
              Annulla modifiche
            </h3>
            
            <p style={{
              fontSize: '1.0625rem',
              color: '#86868b',
              margin: '0 0 2.5rem 0',
              textAlign: 'center',
              lineHeight: '1.5',
              fontWeight: '400'
            }}>
              Annullando le modifiche perderai tutti i cambiamenti non salvati. Sei sicuro di voler continuare?
            </p>

            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center'
            }}>
              <button
                onClick={continueEditing}
                style={{
                  padding: '14px 28px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  border: '1px solid #007AFF',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.8)',
                  color: '#007AFF',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 16px rgba(0, 122, 255, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                  e.target.style.color = '#007AFF';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Continua a modificare
              </button>

              <button
                onClick={confirmCancel}
                style={{
                  padding: '14px 28px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  border: 'none',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #FF3B30 0%, #D70015 100%)',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  boxShadow: '0 4px 16px rgba(255, 59, 48, 0.25)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #D70015 0%, #B8000F 100%)';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 24px rgba(255, 59, 48, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #FF3B30 0%, #D70015 100%)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 16px rgba(255, 59, 48, 0.25)';
                }}
              >
                Sì, annulla
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default EditSubscription; 