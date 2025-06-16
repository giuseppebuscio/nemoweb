import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';

function Layout({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    // Recupera lo stato della sidebar dal localStorage se esiste
    const savedState = localStorage.getItem('sidebarCollapsed');
    return savedState ? JSON.parse(savedState) : false;
  });
  const location = useLocation();

  // Salva lo stato della sidebar nel localStorage quando cambia
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  // Non fare nulla quando cambia la route
  useEffect(() => {
    // Mantieni lo stato della sidebar invariato
  }, [location]);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #fafafa 0%, #f5f5f7 50%, #f0f0f0 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif'
    }}>
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={handleToggleSidebar} 
      />
      <div style={{ 
        flex: 1,
        marginLeft: isSidebarCollapsed ? '80px' : '280px',
        transition: 'margin-left 0.3s ease',
        position: 'relative'
      }}>
        {children}
      </div>
    </div>
  );
}

export default Layout; 