import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll automatico all'inizio della pagina quando cambia la route
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Questo componente non renderizza nulla
};

export default ScrollToTop;
