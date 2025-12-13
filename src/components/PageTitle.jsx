import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      '/': 'Home',
      '/chi-siamo': 'Chi Siamo',
      '/servizi': 'Servizi',
      '/contatti': 'Contatti',
      '/richiedi-preventivo': 'Richiedi un Preventivo',
      '/privacy': 'Privacy',
      '/cookie-policy': 'Cookie Policy',
      '/termini-condizioni': 'Termini e Condizioni'
    };

    const pageTitle = titles[location.pathname] || 'Nemo Web Agency';
    document.title = `${pageTitle} - Nemo Web Agency`;
  }, [location]);

  return null;
};

export default PageTitle;


