import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Home, Calendar, ShoppingBag, ArrowRight, Check,
  Globe, Smartphone, CreditCard, Mail, Settings,
  BarChart, Shield, Zap, Palette, Code
} from 'lucide-react';

const ServiziPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-scroll]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Gestisce lo scroll quando si arriva con un anchor
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          const offset = 100; // Offset per la navbar
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 300);
    }
  }, []);

  const translations = {
    it: {
      heroBadge: 'Le Nostre Soluzioni',
      heroTitle: 'I nostri',
      heroSpan: 'servizi',
      heroDesc: 'Soluzioni web complete e personalizzate per far crescere il tuo business online',
      richiediPreventivo: 'Richiedi preventivo',
      includeTitle: 'Cosa include ogni',
      includeSpan: 'progetto',
      includeDesc: 'Caratteristiche standard in tutti i nostri servizi'
    },
    en: {
      heroBadge: 'Our Solutions',
      heroTitle: 'Our',
      heroSpan: 'Services',
      heroDesc: 'Complete and personalized web solutions to grow your online business',
      richiediPreventivo: 'Request quote',
      includeTitle: 'What every',
      includeSpan: 'project includes',
      includeDesc: 'Standard features in all our services'
    }
  };

  const t = translations[language];

  const services = [
    {
      icon: Home,
      title: { it: 'Siti Vetrina', en: 'Showcase Websites' },
      value: 'sito-vetrina',
      price: { it: 'da 400€', en: 'from €400' },
      description: { 
        it: 'Siti web professionali e moderni per presentare la tua attività online. Perfetti per attività locali, professionisti e artisti che vogliono una presenza digitale di qualità.',
        en: 'Professional and modern websites to present your business online. Perfect for local businesses, professionals and artists who want quality digital presence.'
      },
      features: {
        it: [
          'Design moderno e responsive',
          'Fino a 5 pagine personalizzate',
          'Modulo di contatto avanzato',
          'Ottimizzazione SEO base',
          'Pannello di gestione contenuti',
          'Supporto tecnico incluso',
          'Velocità di caricamento ottimizzata',
          'Integrazione social media'
        ],
        en: [
          'Modern and responsive design',
          'Up to 5 customized pages',
          'Advanced contact form',
          'Basic SEO optimization',
          'Content management panel',
          'Technical support included',
          'Optimized loading speed',
          'Social media integration'
        ]
      },
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80',
      alt: { it: 'Immagine che raffigura una scrivania con dei computer', en: 'Image depicting a desk with computers' }
    },
    {
      icon: Calendar,
      title: { it: 'Siti di Prenotazione', en: 'Booking Websites' },
      value: 'sito-prenotazione',
      price: { it: 'da 1200€', en: 'from €1200' },
      description: { 
        it: 'Sistemi di prenotazione online completi per ristoranti, saloni, studi medici, B&B e tutte le attività che necessitano di gestione prenotazioni.',
        en: 'Complete online booking systems for restaurants, salons, medical practices, B&Bs and all businesses that need booking management.'
      },
      features: {
        it: [
          'Sistema di calendario interattivo',
          'Gestione disponibilità in tempo reale',
          'Notifiche email automatiche',
          'Pannello amministrativo completo',
          'Integrazione con calendari esterni',
          'Sistema di conferma automatica',
          'Gestione cancellazioni',
          'Statistiche e report prenotazioni'
        ],
        en: [
          'Interactive calendar system',
          'Real-time availability management',
          'Automatic email notifications',
          'Complete administrative panel',
          'Integration with external calendars',
          'Automatic confirmation system',
          'Cancellation management',
          'Statistics and booking reports'
        ]
      },
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80',
      alt: { it: 'Immagine che raffigura un tavolo con dei computer portatili', en: 'Image depicting a table with laptops' }
    },
    {
      icon: ShoppingBag,
      title: { it: 'E-commerce', en: 'E-commerce' },
      value: 'e-commerce',
      price: { it: 'da 1600€', en: 'from €1600' },
      description: { 
        it: 'Piattaforme di vendita online complete con catalogo prodotti, sistema di pagamento sicuro, gestione ordini e spedizioni per far crescere il tuo business.',
        en: 'Complete online sales platforms with product catalog, secure payment system, order and shipping management to grow your business.'
      },
      features: {
        it: [
          'Catalogo prodotti illimitato',
          'Carrello e checkout sicuro',
          'Integrazione pagamenti (PayPal, Stripe, etc.)',
          'Gestione ordini e spedizioni',
          'Pannello amministrativo avanzato',
          'Integrazione con corrieri',
          'Sistema di gestione inventario',
          'Marketing e coupon system'
        ],
        en: [
          'Unlimited product catalog',
          'Secure cart and checkout',
          'Payment integration (PayPal, Stripe, etc.)',
          'Order and shipping management',
          'Advanced administrative panel',
          'Courier integration',
          'Inventory management system',
          'Marketing and coupon system'
        ]
      },
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
      alt: { it: 'Immagine che raffigura un uomo che vende qualcosa', en: 'Image depicting a man selling something' }
    }
  ];

  const additionalFeatures = [
    { 
      icon: Globe, 
      title: { it: 'Design Responsive', en: 'Responsive Design' }, 
      desc: { it: 'Perfetto su ogni dispositivo', en: 'Perfect on every device' } 
    },
    { 
      icon: Zap, 
      title: { it: 'Performance Ottimizzate', en: 'Optimized Performance' }, 
      desc: { it: 'Caricamento velocissimo', en: 'Very fast loading' } 
    },
    { 
      icon: Shield, 
      title: { it: 'Sicurezza Avanzata', en: 'Advanced Security' }, 
      desc: { it: 'Protezione dati garantita', en: 'Guaranteed data protection' } 
    },
    { 
      icon: BarChart, 
      title: { it: 'Analytics Integrati', en: 'Integrated Analytics' }, 
      desc: { it: 'Monitora le performance', en: 'Monitor performance' } 
    },
    { 
      icon: Settings, 
      title: { it: 'Facile da Gestire', en: 'Easy to Manage' }, 
      desc: { it: 'Pannello intuitivo', en: 'Intuitive panel' } 
    },
    { 
      icon: Palette, 
      title: { it: 'Design Personalizzato', en: 'Custom Design' }, 
      desc: { it: 'Unico come la tua attività', en: 'Unique like your business' } 
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-72 h-72 bg-[#ff7351]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#ff7351]/15 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <span className="text-sm font-medium">{t.heroBadge}</span>
            </div>

            <h1 className="font-bold leading-tight mb-6" style={{ fontSize: '60px' }}>
              {t.heroTitle} <span className="text-[#ff7351]">{t.heroSpan}</span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed">
              {t.heroDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Services Details */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={index} 
                  id={service.value}
                  data-scroll
                  className={`grid lg:grid-cols-2 gap-12 items-center opacity-0 translate-y-8 transition-all duration-700 ${!isEven ? 'lg:grid-flow-dense' : ''}`}
                  style={{ scrollMarginTop: '100px' }}
                >
                  <div className={isEven ? '' : 'lg:col-start-2'}>
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#ff7351]/10 rounded-full text-[#ff7351] font-medium mb-6">
                      <Icon className="w-5 h-5" />
                      <span>{service.title[language]}</span>
                    </div>
                    
                    <h2 className="text-4xl font-bold mb-2 text-gray-900">{service.title[language]}</h2>
                    
                    <div className="text-4xl font-bold text-[#ff7351] mb-6">{service.price[language]}</div>
                    
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">{service.description[language]}</p>
                    
                    <ul className="grid sm:grid-cols-2 gap-4 mb-8">
                      {service.features[language].map((feature, i) => (
                        <li key={i} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-[#ff7351] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button
                      onClick={() => navigate(`/richiedi-preventivo?service=${service.value}`)}
                      className="px-8 py-4 bg-gradient-to-r from-[#ff7351] to-[#ff8466] text-white rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all inline-flex items-center space-x-2"
                    >
                      <span>{t.richiediPreventivo}</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className={isEven ? '' : 'lg:col-start-1 lg:row-start-1'}>
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                      <img 
                        src={service.image} 
                        alt={service.alt[language] || service.title[language]} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-scroll className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="font-bold text-gray-900 mb-4" style={{ fontSize: '35px' }}>
              {t.includeTitle} <span className="text-[#ff7351]">{t.includeSpan}</span>
            </h2>
            <p className="text-xl text-gray-600">
              {t.includeDesc}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  data-scroll
                  className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-[#ff7351] hover:shadow-xl transition-all duration-300 opacity-0 translate-y-8"
                >
                  <div className="w-12 h-12 bg-[#ff7351]/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#ff7351]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title[language]}</h3>
                  <p className="text-gray-600">{feature.desc[language]}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#ff7351] to-[#ff8466] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-bold mb-6" style={{ fontSize: '35px' }}>
            Pronto a iniziare il tuo progetto?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Contattaci per una consulenza gratuita e ricevi un preventivo personalizzato
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/richiedi-preventivo')}
              className="px-8 py-4 bg-white text-[#ff7351] rounded-full font-semibold hover:bg-gray-100 transition-all inline-flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <span>Richiedi un Preventivo</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/contatti')}
              className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-full font-semibold hover:bg-white/10 transition-all"
            >
              Contattaci
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiziPage;

