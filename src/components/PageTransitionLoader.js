import React from 'react';
import './PageTransitionLoader.css';

const PageTransitionLoader = () => {
  return (
    <div className="page-transition-loader">
      <div className="transition-content">
        <div className="transition-logo-container">
          <img src="/Bianco-Arancio.png" alt="Logo" className="transition-logo" />
        </div>
        <div className="transition-spinner">
          <div className="transition-spinner-inner"></div>
        </div>
      </div>
    </div>
  );
};

export default PageTransitionLoader;
