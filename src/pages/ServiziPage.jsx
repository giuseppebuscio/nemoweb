import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  Home, Calendar, ShoppingBag, ArrowRight, Check,
  Globe, Smartphone, CreditCard, Mail, Settings,
  BarChart, Shield, Zap, Palette, Code
} from 'lucide-react';

const ServiziPage = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: Home,
      title: 'Siti Vetrina',
      price: 'da 400€',
      description: 'Siti web professionali e moderni per presentare la tua attività online. Perfetti per attività locali, professionisti e artisti che vogliono una presenza digitale di qualità.',
      features: [
        'Design moderno e responsive',
        'Fino a 5 pagine personalizzate',
        'Modulo di contatto avanzato',
        'Ottimizzazione SEO base',
        'Pannello di gestione contenuti',
        'Supporto tecnico incluso',
        'Velocità di caricamento ottimizzata',
        'Integrazione social media'
      ],
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80'
    },
    {
      icon: Calendar,
      title: 'Siti di Prenotazione',
      price: 'da 1200€',
      description: 'Sistemi di prenotazione online completi per ristoranti, saloni, studi medici, B&B e tutte le attività che necessitano di gestione prenotazioni.',
      features: [
        'Sistema di calendario interattivo',
        'Gestione disponibilità in tempo reale',
        'Notifiche email automatiche',
        'Pannello amministrativo completo',
        'Integrazione con calendari esterni',
        'Sistema di conferma automatica',
        'Gestione cancellazioni',
        'Statistiche e report prenotazioni'
      ],
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80'
    },
    {
      icon: ShoppingBag,
      title: 'E-commerce',
      price: 'da 1600€',
      description: 'Piattaforme di vendita online complete con catalogo prodotti, sistema di pagamento sicuro, gestione ordini e spedizioni per far crescere il tuo business.',
      features: [
        'Catalogo prodotti illimitato',
        'Carrello e checkout sicuro',
        'Integrazione pagamenti (PayPal, Stripe, etc.)',
        'Gestione ordini e spedizioni',
        'Pannello amministrativo avanzato',
        'Integrazione con corrieri',
        'Sistema di gestione inventario',
        'Marketing e coupon system'
      ],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80'
    }
  ];

  const additionalFeatures = [
    { icon: Globe, title: 'Design Responsive', desc: 'Perfetto su ogni dispositivo' },
    { icon: Zap, title: 'Performance Ottimizzate', desc: 'Caricamento velocissimo' },
    { icon: Shield, title: 'Sicurezza Avanzata', desc: 'Protezione dati garantita' },
    { icon: BarChart, title: 'Analytics Integrati', desc: 'Monitora le performance' },
    { icon: Settings, title: 'Facile da Gestire', desc: 'Pannello intuitivo' },
    { icon: Palette, title: 'Design Personalizzato', desc: 'Unico come la tua attività' }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              I nostri <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">servizi</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Soluzioni web complete e personalizzate per far crescere il tuo business online
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
                <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
                  <div className={isEven ? '' : 'lg:col-start-2'}>
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium mb-6">
                      <Icon className="w-5 h-5" />
                      <span>{service.title}</span>
                    </div>
                    
                    <div className="text-4xl font-bold text-primary mb-2">{service.price}</div>
                    
                    <h2 className="text-4xl font-bold mb-6">{service.title}</h2>
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">{service.description}</p>
                    
                    <ul className="grid sm:grid-cols-2 gap-4 mb-8">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button
                      onClick={() => navigate('/contatti')}
                      className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all inline-flex items-center space-x-2"
                    >
                      <span>Richiedi preventivo</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className={isEven ? '' : 'lg:col-start-1 lg:row-start-1'}>
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                      <img 
                        src={service.image} 
                        alt={service.title} 
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Cosa include ogni progetto
            </h2>
            <p className="text-xl text-gray-600">
              Caratteristiche standard in tutti i nostri servizi
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto a iniziare il tuo progetto?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Contattaci per una consulenza gratuita e ricevi un preventivo personalizzato
          </p>
          <button
            onClick={() => navigate('/contatti')}
            className="px-8 py-4 bg-white text-primary rounded-full font-semibold hover:scale-105 transition-transform inline-flex items-center space-x-2 shadow-xl"
          >
            <span>Contattaci ora</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiziPage;

