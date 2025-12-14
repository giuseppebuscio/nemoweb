import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar = () => {
  const { language, changeLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [languageMenuTimeout, setLanguageMenuTimeout] = useState(null);
  const location = useLocation();

  const translations = {
    it: {
      home: 'Home',
      chiSiamo: 'Chi Siamo',
      servizi: 'Servizi',
      contatti: 'Contatti',
      richiediPreventivo: 'Richiedi un preventivo'
    },
    en: {
      home: 'Home',
      chiSiamo: 'About Us',
      servizi: 'Services',
      contatti: 'Contact',
      richiediPreventivo: 'Request a Quote'
    }
  };

  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (languageMenuTimeout) {
        clearTimeout(languageMenuTimeout);
      }
    };
  }, [languageMenuTimeout]);

  const navLinks = [
    { path: '/', labelKey: 'home' },
    { path: '/chi-siamo', labelKey: 'chiSiamo' },
    { path: '/servizi', labelKey: 'servizi' },
    { path: '/contatti', labelKey: 'contatti' },
  ];

  // Se siamo sulla home e non abbiamo scrollato, la navbar è trasparente
  const isHomePage = location.pathname === '/';
  const isTransparent = isHomePage && !isScrolled;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isTransparent 
        ? 'bg-transparent' 
        : 'bg-white/80 backdrop-blur-md shadow-lg'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            {isTransparent ? (
              <img 
                src="/Bianco-Arancio.png" 
                alt="Logo versione bianco e arancione Nemo Web Agency" 
                className="h-9 w-auto"
              />
            ) : (
              <img 
                src="/Nero-Arancio.png" 
                alt="Logo versione nero e arancione Nemo Web Agency" 
                className="h-9 w-auto"
              />
            )}
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3 py-2 text-base font-medium transition-colors ${
                  location.pathname === link.path
                    ? isTransparent ? 'text-[#ff7351]' : 'text-[#ff7351]'
                    : isTransparent ? 'text-white/90 hover:text-[#ff7351]' : 'text-gray-700 hover:text-[#ff7351]'
                }`}
              >
                {t[link.labelKey]}
                {location.pathname === link.path && !isTransparent && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary"></span>
                )}
              </Link>
            ))}
            <Link
              to="/richiedi-preventivo"
              className={`px-6 py-2.5 rounded-full font-medium text-base hover:shadow-lg  transition-all ${
                isTransparent
                  ? 'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30'
                  : 'bg-gradient-to-r from-primary to-secondary text-white'
              }`}
            >
              {t.richiediPreventivo}
            </Link>
            
            {/* Language Selector */}
            <div 
              className="relative"
              onMouseEnter={() => {
                if (languageMenuTimeout) {
                  clearTimeout(languageMenuTimeout);
                  setLanguageMenuTimeout(null);
                }
                setIsLanguageMenuOpen(true);
              }}
              onMouseLeave={() => {
                const timeout = setTimeout(() => {
                  setIsLanguageMenuOpen(false);
                }, 200);
                setLanguageMenuTimeout(timeout);
              }}
            >
              <button className={`flex items-center space-x-1 transition-colors ${
                isTransparent ? 'text-white hover:text-[#ff7351]' : 'text-gray-700 hover:text-[#ff7351]'
              }`}>
                <span className={`fi ${language === 'it' ? 'fi-it' : 'fi-gb'}`} style={{ fontSize: '1.25rem' }}></span>
              </button>
              
              {isLanguageMenuOpen && (
                <div 
                  className="absolute right-0 pt-2 w-48 bg-transparent z-50"
                  onMouseEnter={() => {
                    if (languageMenuTimeout) {
                      clearTimeout(languageMenuTimeout);
                      setLanguageMenuTimeout(null);
                    }
                  }}
                  onMouseLeave={() => {
                    const timeout = setTimeout(() => {
                      setIsLanguageMenuOpen(false);
                    }, 200);
                    setLanguageMenuTimeout(timeout);
                  }}
                >
                  <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                    <button
                      onClick={() => {
                        changeLanguage('it');
                        setIsLanguageMenuOpen(false);
                        if (languageMenuTimeout) {
                          clearTimeout(languageMenuTimeout);
                          setLanguageMenuTimeout(null);
                        }
                      }}
                      className={`w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-100 transition-colors ${
                        language === 'it' ? 'bg-[#ff7351]/10' : ''
                      }`}
                    >
                      <span className="fi fi-it" style={{ fontSize: '1.25rem' }}></span>
                      <span className="text-gray-700">Italiano</span>
                      {language === 'it' && <span className="ml-auto text-[#ff7351]">✓</span>}
                    </button>
                    <button
                      onClick={() => {
                        changeLanguage('en');
                        setIsLanguageMenuOpen(false);
                        if (languageMenuTimeout) {
                          clearTimeout(languageMenuTimeout);
                          setLanguageMenuTimeout(null);
                        }
                      }}
                      className={`w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-100 transition-colors ${
                        language === 'en' ? 'bg-[#ff7351]/10' : ''
                      }`}
                    >
                      <span className="fi fi-gb" style={{ fontSize: '1.25rem' }}></span>
                      <span className="text-gray-700">English</span>
                      {language === 'en' && <span className="ml-auto text-[#ff7351]">✓</span>}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isTransparent 
                ? 'text-white hover:bg-white/20' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 top-20 h-[calc(100vh-5rem)] shadow-lg transition-transform duration-300 z-40 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ 
          backgroundColor: '#ffffff',
          opacity: 1,
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none'
        }}
      >
        <div className="px-4 pt-6 pb-8 space-y-4 bg-white h-full overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                location.pathname === link.path
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {t[link.labelKey]}
            </Link>
          ))}
          <Link
            to="/richiedi-preventivo"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-full mt-4 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-medium text-center"
          >
            {t.richiediPreventivo}
          </Link>
          
          {/* Mobile Language Selector */}
          <div className="pt-4 border-t border-gray-200 mt-2">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  changeLanguage('it');
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-2 py-2 px-3 rounded ${
                  language === 'it' ? 'bg-[#ff7351]/20 text-[#ff7351]' : 'text-gray-700'
                }`}
              >
                <span className="fi fi-it" style={{ fontSize: '1.25rem' }}></span>
                <span>Italiano</span>
              </button>
              <button
                onClick={() => {
                  changeLanguage('en');
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-2 py-2 px-3 rounded ${
                  language === 'en' ? 'bg-[#ff7351]/20 text-[#ff7351]' : 'text-gray-700'
                }`}
              >
                <span className="fi fi-gb" style={{ fontSize: '1.25rem' }}></span>
                <span>English</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

