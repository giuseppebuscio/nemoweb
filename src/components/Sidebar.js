import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';

function Sidebar({ isCollapsed, onToggle }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Contabilità', path: '/contabilita', icon: '💰' },
    { name: 'I miei abbonamenti', path: '/abbonamenti', icon: '📱' }
  ];

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  return (
    <div style={{
      width: isCollapsed ? '80px' : '280px',
      height: '100vh',
      background: 'linear-gradient(180deg, #f8f9fa 0%, #f0f0f0 100%)',
      borderRight: '1px solid rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      padding: '2rem 0',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
      transition: 'width 0.3s ease',
      overflow: 'hidden',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 1000,
      boxShadow: '2px 0 10px rgba(0, 0, 0, 0.05)'
    }}>
      {/* Logo section */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isCollapsed ? 'center' : 'flex-start',
        gap: '12px',
        padding: isCollapsed ? '0 1rem' : '0 2rem',
        marginBottom: '2rem'
      }}>
        <button
          onClick={onToggle}
          style={{
            background: 'none',
            border: 'none',
            padding: '8px',
            cursor: 'pointer',
            color: '#86868b',
            fontSize: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            transition: 'all 0.2s ease',
            alignSelf: isCollapsed ? 'center' : 'flex-end',
            marginBottom: '8px',
            transform: isCollapsed ? 'rotate(180deg)' : 'none'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(0, 0, 0, 0.05)';
            e.target.style.color = '#1d1d1f';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'none';
            e.target.style.color = '#86868b';
          }}
        >
          <IoChevronBack size={20} />
        </button>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          width: '100%',
          justifyContent: isCollapsed ? 'center' : 'flex-start',
          cursor: 'pointer'
        }}
        onClick={() => handleNavigation('/')}
        >
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)',
            transition: 'transform 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
          >
            <span style={{
              fontSize: '18px',
              fontWeight: '700',
              color: 'white',
              letterSpacing: '-0.5px'
            }}>
              MS
            </span>
          </div>
          {!isCollapsed && (
            <span style={{
              fontSize: '1.2rem',
              fontWeight: '600',
              color: '#1d1d1f',
              letterSpacing: '-0.01em'
            }}>
              MagicSubs
            </span>
          )}
        </div>
      </div>

      {/* Menu section */}
      <div style={{ 
        padding: isCollapsed ? '0 1rem' : '0 2rem', 
        marginBottom: '1rem',
        height: '44px',
        display: 'flex',
        justifyContent: isCollapsed ? 'center' : 'flex-start'
      }}>
        {!isCollapsed && (
          <h3 style={{
            fontSize: '0.9rem',
            fontWeight: '600',
            color: '#86868b',
            margin: '0 0 1rem 0',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Menu
          </h3>
        )}
      </div>

      {/* Regular menu items */}
      <div style={{ 
        flex: 1, 
        padding: isCollapsed ? '0 1rem' : '0 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: isCollapsed ? 'center' : 'flex-start'
      }}>
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            style={{
              width: isCollapsed ? '44px' : '100%',
              height: isCollapsed ? '44px' : 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: isCollapsed ? '0' : '12px 16px',
              margin: '0 0 4px 0',
              background: isActive(item.path) ? 'rgba(0, 122, 255, 0.1)' : 'transparent',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '0.95rem',
              fontWeight: isActive(item.path) ? '600' : '500',
              color: isActive(item.path) ? '#007AFF' : '#1d1d1f',
              textAlign: 'left',
              transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              justifyContent: isCollapsed ? 'center' : 'flex-start'
            }}
            onMouseEnter={(e) => {
              if (!isActive(item.path)) {
                e.target.style.background = 'rgba(0, 0, 0, 0.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive(item.path)) {
                e.target.style.background = 'transparent';
              }
            }}
          >
            <span style={{ 
              fontSize: '16px',
              opacity: isActive(item.path) ? 1 : 0.7
            }}>
              {item.icon}
            </span>
            {!isCollapsed && <span>{item.name}</span>}
          </button>
        ))}
      </div>

      {/* Footer con Impostazioni */}
      <div style={{
        padding: isCollapsed ? '0 1rem' : '0 2rem',
        marginTop: '2rem',
        display: 'flex',
        justifyContent: isCollapsed ? 'center' : 'flex-start'
      }}>
        <button
          onClick={() => handleNavigation('/impostazioni')}
          style={{
            width: isCollapsed ? '44px' : '100%',
            height: isCollapsed ? '44px' : 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: isCollapsed ? '0' : '12px 16px',
            margin: '0 0 4px 0',
            background: isActive('/impostazioni') ? 'rgba(0, 122, 255, 0.1)' : 'transparent',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '0.95rem',
            fontWeight: isActive('/impostazioni') ? '600' : '500',
            color: isActive('/impostazioni') ? '#007AFF' : '#1d1d1f',
            textAlign: 'left',
            transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            justifyContent: isCollapsed ? 'center' : 'flex-start'
          }}
          onMouseEnter={(e) => {
            if (!isActive('/impostazioni')) {
              e.target.style.background = 'rgba(0, 0, 0, 0.05)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isActive('/impostazioni')) {
              e.target.style.background = 'transparent';
            }
          }}
        >
          <span style={{ fontSize: '16px' }}>⚙️</span>
          {!isCollapsed && <span>Impostazioni</span>}
        </button>
      </div>
    </div>
  );
}

export default Sidebar; 