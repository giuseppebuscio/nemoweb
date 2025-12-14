import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Home, Users, Briefcase, Mail, FileText, Shield, Cookie, FileCheck } from 'lucide-react';

const SitemapPage = () => {
  const { language } = useLanguage();

  const translations = {
    it: {
      title: 'Mappa del Sito',
      description: 'Naviga facilmente attraverso tutte le pagine del nostro sito web',
      sezioniPrincipali: 'Sezioni Principali',
      servizi: 'Servizi',
      informazioni: 'Informazioni',
      legale: 'Informazioni Legali',
      sitemapXml: 'Scarica la Sitemap XML',
      tornaHome: 'Torna alla Home'
    },
    en: {
      title: 'Sitemap',
      description: 'Easily navigate through all pages of our website',
      sezioniPrincipali: 'Main Sections',
      servizi: 'Services',
      informazioni: 'Information',
      legale: 'Legal Information',
      sitemapXml: 'Download XML Sitemap',
      tornaHome: 'Back to Home'
    }
  };

  const t = translations[language];

  const mainPages = [
    {
      path: '/',
      icon: Home,
      title: { it: 'Home', en: 'Home' },
      description: { 
        it: 'Pagina principale del sito con panoramica dei servizi', 
        en: 'Main page of the website with services overview' 
      }
    },
    {
      path: '/chi-siamo',
      icon: Users,
      title: { it: 'Chi Siamo', en: 'About Us' },
      description: { 
        it: 'Scopri la nostra storia, mission e valori', 
        en: 'Discover our story, mission and values' 
      }
    },
    {
      path: '/contatti',
      icon: Mail,
      title: { it: 'Contatti', en: 'Contact' },
      description: { 
        it: 'Contattaci per informazioni e preventivi', 
        en: 'Contact us for information and quotes' 
      }
    }
  ];

  const servicePages = [
    {
      path: '/servizi',
      icon: Briefcase,
      title: { it: 'Servizi', en: 'Services' },
      description: { 
        it: 'Tutti i nostri servizi web disponibili', 
        en: 'All our available web services' 
      }
    },
    {
      path: '/richiedi-preventivo',
      icon: FileText,
      title: { it: 'Richiedi Preventivo', en: 'Request Quote' },
      description: { 
        it: 'Richiedi un preventivo personalizzato per il tuo progetto', 
        en: 'Request a customized quote for your project' 
      }
    }
  ];

  const legalPages = [
    {
      path: '/privacy',
      icon: Shield,
      title: { it: 'Privacy Policy', en: 'Privacy Policy' },
      description: { 
        it: 'Informativa sulla privacy e trattamento dei dati', 
        en: 'Privacy policy and data processing information' 
      }
    },
    {
      path: '/cookie-policy',
      icon: Cookie,
      title: { it: 'Cookie Policy', en: 'Cookie Policy' },
      description: { 
        it: 'Informativa sui cookie utilizzati sul sito', 
        en: 'Information about cookies used on the website' 
      }
    },
    {
      path: '/termini-condizioni',
      icon: FileCheck,
      title: { it: 'Termini e Condizioni', en: 'Terms and Conditions' },
      description: { 
        it: 'Termini e condizioni di utilizzo del sito', 
        en: 'Terms and conditions of website use' 
      }
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-72 h-72 bg-[#ff7351]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#ff7351]/15 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-bold leading-tight mb-6" style={{ fontSize: '60px' }}>
              {t.title}
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {t.description}
            </p>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-full font-medium hover:bg-white/20 transition-all"
            >
              <FileText className="w-5 h-5 mr-2" />
              {t.sitemapXml}
            </a>
          </div>
        </div>
      </section>

      {/* Sitemap Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Sezioni Principali */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Home className="w-6 h-6 mr-2 text-[#ff7351]" />
                {t.sezioniPrincipali}
              </h2>
              <div className="space-y-4">
                {mainPages.map((page, index) => {
                  const Icon = page.icon;
                  return (
                    <Link
                      key={index}
                      to={page.path}
                      className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-[#ff7351] hover:shadow-lg transition-all group"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-[#ff7351] to-[#ff8466] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#ff7351] transition-colors">
                            {page.title[language]}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {page.description[language]}
                          </p>
                          <span className="text-xs text-[#ff7351] font-medium mt-2 inline-block">
                            {page.path}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Servizi */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Briefcase className="w-6 h-6 mr-2 text-[#ff7351]" />
                {t.servizi}
              </h2>
              <div className="space-y-4">
                {servicePages.map((page, index) => {
                  const Icon = page.icon;
                  return (
                    <Link
                      key={index}
                      to={page.path}
                      className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-[#ff7351] hover:shadow-lg transition-all group"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-[#ff7351] to-[#ff8466] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#ff7351] transition-colors">
                            {page.title[language]}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {page.description[language]}
                          </p>
                          <span className="text-xs text-[#ff7351] font-medium mt-2 inline-block">
                            {page.path}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Informazioni Legali */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="w-6 h-6 mr-2 text-[#ff7351]" />
                {t.legale}
              </h2>
              <div className="space-y-4">
                {legalPages.map((page, index) => {
                  const Icon = page.icon;
                  return (
                    <Link
                      key={index}
                      to={page.path}
                      className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-[#ff7351] hover:shadow-lg transition-all group"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-[#ff7351] to-[#ff8466] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#ff7351] transition-colors">
                            {page.title[language]}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {page.description[language]}
                          </p>
                          <span className="text-xs text-[#ff7351] font-medium mt-2 inline-block">
                            {page.path}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <Link
              to="/"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#ff7351] to-[#ff8466] text-white rounded-full font-semibold hover:shadow-lg transition-all"
            >
              <Home className="w-5 h-5 mr-2" />
              {t.tornaHome}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SitemapPage;
