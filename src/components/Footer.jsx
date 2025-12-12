import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/">
              <img 
                src="/Bianco-Arancio.png" 
                alt="Nemo Web Agency" 
                className="h-10 w-auto hover:opacity-80 transition-opacity cursor-pointer"
              />
            </Link>
            <p className="text-gray-400 text-sm">
              Creiamo siti web moderni e professionali per far crescere il tuo business online.
            </p>
          </div>
          
          {/* Servizi */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Servizi</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/servizi#sito-vetrina" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Siti Vetrina
                </Link>
              </li>
              <li>
                <Link to="/servizi#sito-prenotazione" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Siti Prenotazione
                </Link>
              </li>
              <li>
                <Link to="/servizi#e-commerce" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  E-commerce
                </Link>
              </li>
              <li>
                <Link to="/richiedi-preventivo" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Richiedi preventivo
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Navigazione */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Navigazione</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/servizi" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Servizi
                </Link>
              </li>
              <li>
                <Link to="/chi-siamo" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Chi Siamo
                </Link>
              </li>
              <li>
                <Link to="/contatti" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Contatti
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contatti */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contatti</h4>
            <div className="space-y-3">
              <a 
                href="mailto:info@nemoagency.it" 
                className="flex items-center space-x-2 text-gray-400 hover:text-primary transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>info@nemoagency.it</span>
              </a>
              <a 
                href="tel:+393465745184" 
                className="flex items-center space-x-2 text-gray-400 hover:text-primary transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>+39 346 574 5184</span>
              </a>
            </div>
            
            <div className="flex space-x-4 mt-6">
              <a 
                href="https://www.facebook.com/profile.php?id=61574662467359&locale=it_IT" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/nemowebagency/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/393465745184" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2025 Nemo Web Agency. Tutti i diritti riservati.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Privacy
              </Link>
              <Link to="/cookie-policy" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Cookie Policy
              </Link>
              <Link to="/termini-condizioni" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Termini e Condizioni
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

