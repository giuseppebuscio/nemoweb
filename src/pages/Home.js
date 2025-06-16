import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  // Rimuove i margini di default del body quando si è sulla home
  useEffect(() => {
    const originalBodyStyle = {
      margin: document.body.style.margin,
      padding: document.body.style.padding,
      overflow: document.body.style.overflow
    };

    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';

    // Animazione di caricamento
    setTimeout(() => setIsLoaded(true), 200);

    // Ripristina i valori originali quando si lascia la pagina
    return () => {
      document.body.style.margin = originalBodyStyle.margin;
      document.body.style.padding = originalBodyStyle.padding;
      document.body.style.overflow = originalBodyStyle.overflow;
    };
  }, []);

  const handleAccediDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(180deg, #fafafa 0%, #f5f5f7 50%, #f0f0f0 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
      margin: 0,
      padding: 0,
      overflow: 'hidden'
    }}>
      
      {/* Subtle geometric elements in Apple style */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '15%',
        width: '120px',
        height: '120px',
        background: 'rgba(0, 122, 255, 0.05)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        animation: 'float 8s ease-in-out infinite'
      }} />
      
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '20%',
        width: '80px',
        height: '80px',
        background: 'rgba(52, 199, 89, 0.06)',
        borderRadius: '20px',
        filter: 'blur(30px)',
        animation: 'float 12s ease-in-out infinite reverse'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '25%',
        left: '20%',
        width: '100px',
        height: '100px',
        background: 'rgba(255, 149, 0, 0.04)',
        borderRadius: '50%',
        filter: 'blur(35px)',
        animation: 'float 10s ease-in-out infinite'
      }} />

      {/* Main content container */}
      <div style={{
        transform: isLoaded ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
        opacity: isLoaded ? 1 : 0,
        transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        textAlign: 'center',
        maxWidth: '640px',
        width: '90%',
        padding: '0 20px'
      }}>
        
        {/* Logo in Apple style */}
        <div style={{
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 40px',
          boxShadow: '0 10px 30px rgba(0, 122, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          
          {/* Logo shine effect */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)',
            animation: 'logoShine 3s infinite',
            transform: 'rotate(45deg)'
          }} />
          
          <div style={{
            fontSize: '32px',
            fontWeight: '700',
            color: 'white',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            letterSpacing: '-1px',
            position: 'relative',
            zIndex: 2
          }}>
            MS
          </div>
        </div>

        {/* Main title */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
          fontWeight: '700',
          color: '#1d1d1f',
          margin: '0 0 16px 0',
          lineHeight: '1.1',
          letterSpacing: '-0.03em',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
        }}>
          Benvenuto su
        </h1>
        
        <h2 style={{
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
          fontWeight: '700',
          background: 'linear-gradient(90deg, #007AFF, #5856D6, #AF52DE)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          margin: '0 0 32px 0',
          lineHeight: '1.1',
          letterSpacing: '-0.03em',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
        }}>
          MagicSubs
        </h2>

        {/* Subtitle */}
        <p style={{
          fontSize: '1.25rem',
          color: '#86868b',
          fontWeight: '400',
          margin: '0 0 8px 0',
          lineHeight: '1.4',
          letterSpacing: '0.01em',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
        }}>
          Il gestionale intelligente per tutti i tuoi abbonamenti
        </p>
        
        <p style={{
          fontSize: '1.1rem',
          color: '#a1a1a6',
          fontWeight: '400',
          margin: '0 0 48px 0',
          lineHeight: '1.4',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
        }}>
          Organizza • Monitora • Gestisci
        </p>

        {/* CTA Button */}
        <button 
          onClick={handleAccediDashboard}
          style={{
            background: '#007AFF',
            color: 'white',
            border: 'none',
            padding: '16px 32px',
            fontSize: '1.05rem',
            fontWeight: '600',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0, 122, 255, 0.3)',
            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            letterSpacing: '0.01em',
            position: 'relative',
            overflow: 'hidden',
            minWidth: '200px'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#0051D0';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 25px rgba(0, 122, 255, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = '#007AFF';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 16px rgba(0, 122, 255, 0.3)';
          }}
          onMouseDown={(e) => {
            e.target.style.transform = 'translateY(0) scale(0.98)';
          }}
          onMouseUp={(e) => {
            e.target.style.transform = 'translateY(-2px) scale(1)';
          }}
        >
          Accedi alla Dashboard
        </button>

        {/* Feature indicators */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '32px',
          marginTop: '64px',
          flexWrap: 'wrap'
        }}>
          {[
            { icon: '📱', text: 'Mobile First' },
            { icon: '🔒', text: 'Sicuro' },
            { icon: '⚡', text: 'Veloce' }
          ].map((feature, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px)',
                borderRadius: '50px',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                animation: `fadeInUp 0.6s ease-out ${i * 0.1}s both`
              }}
            >
              <span style={{ fontSize: '16px' }}>{feature.icon}</span>
              <span style={{
                fontSize: '0.9rem',
                color: '#1d1d1f',
                fontWeight: '500',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
              }}>
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Apple-style CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        
        @keyframes logoShine {
          0% { transform: translateX(-100%) rotate(45deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%) rotate(45deg); opacity: 0; }
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        /* Smooth scroll and selection */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        ::selection {
          background: rgba(0, 122, 255, 0.2);
        }
        
        /* Focus states for accessibility */
        button:focus {
          outline: 2px solid #007AFF;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}

export default Home; 