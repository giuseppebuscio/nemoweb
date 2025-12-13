import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const PageTitle = () => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    const titles = {
      it: {
        '/': 'Home',
        '/chi-siamo': 'Chi Siamo',
        '/servizi': 'Servizi',
        '/contatti': 'Contatti',
        '/richiedi-preventivo': 'Richiedi un Preventivo',
        '/privacy': 'Privacy',
        '/cookie-policy': 'Cookie Policy',
        '/termini-condizioni': 'Termini e Condizioni'
      },
      en: {
        '/': 'Home',
        '/chi-siamo': 'About Us',
        '/servizi': 'Services',
        '/contatti': 'Contact',
        '/richiedi-preventivo': 'Request a Quote',
        '/privacy': 'Privacy',
        '/cookie-policy': 'Cookie Policy',
        '/termini-condizioni': 'Terms and Conditions'
      }
    };

    const pageTitle = titles[language]?.[location.pathname] || 'Nemo Web Agency';
    const siteName = language === 'it' ? 'Nemo Web Agency' : 'Nemo Web Agency';
    document.title = `${pageTitle} - ${siteName}`;
  }, [location, language]);

  return null;
};

export default PageTitle;


