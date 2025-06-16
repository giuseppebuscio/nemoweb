import React from 'react';
import Layout from '../components/Layout';

function Impostazioni() {
  return (
    <Layout>
      <div style={{
        padding: '2rem',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#1d1d1f',
            margin: '0 0 2rem 0',
            letterSpacing: '-0.02em'
          }}>
            Impostazioni
          </h1>
          
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '1rem',
              opacity: '0.3'
            }}>⚙️</div>
            <h2 style={{
              color: '#1d1d1f',
              margin: '0 0 1rem 0',
              fontSize: '1.5rem',
              fontWeight: '600'
            }}>
              Configurazioni
            </h2>
            <p style={{
              color: '#86868b',
              margin: '0 0 1.5rem 0',
              fontSize: '1.1rem',
              lineHeight: '1.4'
            }}>
              Personalizza la tua esperienza con MagicSubs, configura notifiche e preferenze dell'applicazione.
            </p>
            <div style={{
              background: 'rgba(255, 149, 0, 0.1)',
              borderRadius: '12px',
              padding: '1rem',
              color: '#FF9500',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>
              🔧 Funzionalità in arrivo: pannello completo delle impostazioni
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Impostazioni; 