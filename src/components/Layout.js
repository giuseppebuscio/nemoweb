import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { IoChevronForward } from 'react-icons/io5';

function Layout({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #fafafa 0%, #f5f5f7 50%, #f0f0f0 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif'
    }}>
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      <div style={{ 
        flex: 1,
        marginLeft: isSidebarCollapsed ? '80px' : '280px',
        transition: 'margin-left 0.3s ease',
        position: 'relative'
      }}>
        {isSidebarCollapsed && (
          <button
            onClick={() => setIsSidebarCollapsed(false)}
            style={{
              position: 'fixed',
              left: '88px',
              top: '32px',
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
              zIndex: 1000
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
            <IoChevronForward size={20} />
          </button>
        )}
        {children}
      </div>
    </div>
  );
}

export default Layout; 