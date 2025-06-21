import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';

function Layout({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    // Recupera lo stato della sidebar dal localStorage se esiste
    const savedState = localStorage.getItem('sidebarCollapsed');
    return savedState ? JSON.parse(savedState) : false;
  });
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Controlla se siamo su mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Salva lo stato della sidebar nel localStorage quando cambia
  useEffect(() => {
    if (!isMobile) {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isSidebarCollapsed));
    }
  }, [isSidebarCollapsed, isMobile]);

  // Chiudi il menu mobile quando cambia la route
  useEffect(() => {
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [location, isMobile]);

  const handleToggleSidebar = () => {
    if (isMobile) {
      setIsMobileMenuOpen(prev => !prev);
    } else {
    setIsSidebarCollapsed(prev => !prev);
    }
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #fafafa 0%, #f5f5f7 50%, #f0f0f0 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif'
    }}>
      {/* Sidebar per desktop */}
      {!isMobile && (
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={handleToggleSidebar} 
      />
      )}
      
      {/* Overlay per mobile */}
      {isMobile && isMobileMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
            animation: 'fadeIn 0.3s ease'
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar mobile */}
      {isMobile && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: isMobileMenuOpen ? 0 : '-280px',
          width: '280px',
          height: '100vh',
          zIndex: 1000,
          transition: 'left 0.3s ease',
          background: 'linear-gradient(180deg, #f8f9fa 0%, #f0f0f0 100%)',
          borderRight: '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)'
        }}>
          <Sidebar 
            isCollapsed={false} 
            onToggle={handleToggleSidebar} 
            isMobile={true}
          />
        </div>
      )}

      {/* Contenuto principale */}
      <div style={{ 
        flex: 1,
        marginLeft: isMobile ? 0 : (isSidebarCollapsed ? '80px' : '280px'),
        transition: 'margin-left 0.3s ease',
        position: 'relative'
      }}>
        {/* Header mobile con burger button */}
        {isMobile && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '60px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 1rem',
            zIndex: 998,
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
          }}>
            <button
              onClick={handleToggleSidebar}
              style={{
                background: 'none',
                border: 'none',
                padding: '8px',
                cursor: 'pointer',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(0, 0, 0, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'none';
              }}
            >
              <div style={{
                width: '20px',
                height: '2px',
                background: '#1d1d1f',
                transition: 'transform 0.3s ease'
              }} />
              <div style={{
                width: '20px',
                height: '2px',
                background: '#1d1d1f',
                transition: 'transform 0.3s ease'
              }} />
              <div style={{
                width: '20px',
                height: '2px',
                background: '#1d1d1f',
                transition: 'transform 0.3s ease'
              }} />
            </button>
            
            {/* Logo mobile */}
            <div 
              style={{
                marginLeft: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer'
              }}
              onClick={() => {
                window.location.href = '/';
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0, 122, 255, 0.3)'
              }}>
                <span style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  color: 'white',
                  letterSpacing: '-0.5px'
                }}>
                  MS
                </span>
              </div>
              <span style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: '#1d1d1f',
                letterSpacing: '-0.01em'
              }}>
                MagicSubs
              </span>
            </div>
          </div>
        )}

        {/* Contenuto con padding per mobile */}
        <div style={{
          paddingTop: isMobile ? '60px' : 0
      }}>
        {children}
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}

export default Layout; 