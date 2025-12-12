import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Facebook, Instagram, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <img 
              src="/Bianco-Arancio.png" 
              alt="Nemo Web Agency" 
              className="h-10 w-auto"
            />
            <p className="text-gray-400 text-sm">
              Creiamo siti web moderni e professionali per far crescere il tuo business online.
            </p>
          </div>
          
          {/* Servizi */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Servizi</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/servizi" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Siti Vetrina
                </Link>
              </li>
              <li>
                <Link to="/servizi" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Siti Prenotazione
                </Link>
              </li>
              <li>
                <Link to="/servizi" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  E-commerce
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
                href="mailto:nemowebagency@gmail.com" 
                className="flex items-center space-x-2 text-gray-400 hover:text-primary transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>nemowebagency@gmail.com</span>
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
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/nemowebagency/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2025 Nemo Web Agency. Tutti i diritti riservati.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

