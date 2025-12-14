import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  ArrowRight, Home, Calendar, ShoppingBag, 
  Code, Palette, Rocket, Check,
  Sparkles, Target, Layers, Brain,
  CheckCircle2, Star, Quote, Zap,
  ChevronLeft, ChevronRight, TrendingUp,
  Users, Award, Globe, Shield, Clock
} from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [animatedStats, setAnimatedStats] = useState({
    clients: 0,
    projects: 0,
    years: 0
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const portfolioRef = useRef(null);
  const heroRef = useRef(null);
  const partnersRef = useRef(null);
  const partnersWrapperRef = useRef(null);

  // Hero entrance animation
  useEffect(() => {
    setHeroVisible(true);
    if (!hasAnimated) {
      setHasAnimated(true);
      animateStats();
    }
  }, [hasAnimated]);

  // Intersection Observer for scroll animations
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

  const translations = {
    it: {
      heroBadge: 'Web Agency dal 2016',
      heroTitle: 'Creiamo il tuo',
      heroSuccess: 'successo digitale',
      heroDescription: 'Sviluppiamo soluzioni digitali innovative con design moderno e tecnologie all\'avanguardia per trasformare la tua presenza online.',
      heroButton1: 'Inizia il Tuo Progetto',
      heroButton2: 'Scopri i Servizi',
      clientsHappy: 'Clienti Felici',
      projects: 'Progetti',
      yearsExp: 'Anni Esperienza',
      soluzioni: 'Le Nostre',
      soluzioniSpan: 'oluzioni',
      soluzioniDesc: 'Offriamo servizi completi per ogni esigenza digitale, dalla vetrina al negozio online completo',
      scopriDiPiu: 'Scopri di più',
      tecnologie: 'Tecnologie',
      tecnologieSpan: 'Moderne',
      tecnologieDesc: 'Utilizziamo le tecnologie più avanzate per garantire performance e scalabilità',
      processo: 'Il Nostro',
      processoSpan: 'Processo',
      processoDesc: 'Un approccio strutturato per garantire risultati eccellenti ad ogni step',
      progetti: 'I nostri',
      progettiSpan: 'progetti',
      progettiDesc: 'Esplora alcuni dei nostri lavori più recenti e di successo',
      vediProgetto: 'Vedi Progetto',
      clienti: 'Cosa dicono i',
      clientiSpan: 'clienti',
      clientiDesc: 'La soddisfazione dei nostri clienti è la nostra migliore testimonianza',
      partner: 'I Nostri',
      partnerSpan: 'Partner',
      ctaTitle: 'Pronto a Trasformare la Tua Presenza Digitale?',
      ctaDesc: 'Contattaci oggi stesso per una consulenza gratuita e scopri come possiamo aiutare il tuo business a crescere online.',
      ctaButton1: 'Prenota una Consulenza Gratuita',
      ctaButton2: 'Scopri i Servizi'
    },
    en: {
      heroBadge: 'Web Agency since 2016',
      heroTitle: 'We create your',
      heroSuccess: 'digital success',
      heroDescription: 'We develop innovative digital solutions with modern design and cutting-edge technologies to transform your online presence.',
      heroButton1: 'Start Your Project',
      heroButton2: 'Discover Services',
      clientsHappy: 'Happy Clients',
      projects: 'Projects',
      yearsExp: 'Years Experience',
      soluzioni: 'Our',
      soluzioniSpan: 'Solutions',
      soluzioniDesc: 'We offer complete services for every digital need, from showcase to complete online store',
      scopriDiPiu: 'Learn more',
      tecnologie: 'Modern',
      tecnologieSpan: 'Technologies',
      tecnologieDesc: 'We use the most advanced technologies to ensure performance and scalability',
      processo: 'Our',
      processoSpan: 'Process',
      processoDesc: 'A structured approach to ensure excellent results at every step',
      progetti: 'Our',
      progettiSpan: 'projects',
      progettiDesc: 'Explore some of our most recent and successful works',
      vediProgetto: 'View Project',
      clienti: 'What our',
      clientiSpan: 'clients say',
      clientiDesc: 'Our clients\' satisfaction is our best testimony',
      partner: 'Our',
      partnerSpan: 'Partners',
      ctaTitle: 'Ready to Transform Your Digital Presence?',
      ctaDesc: 'Contact us today for a free consultation and discover how we can help your business grow online.',
      ctaButton1: 'Book a Free Consultation',
      ctaButton2: 'Discover Services'
    }
  };

  const t = translations[language];

  const animateStats = () => {
    const targets = { clients: 150, projects: 300, years: 8 };
    const duration = 2000;
    const steps = 60;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setAnimatedStats({
        clients: Math.floor(targets.clients * progress),
        projects: Math.floor(targets.projects * progress),
        years: Math.floor(targets.years * progress)
      });

      if (step >= steps) {
        clearInterval(timer);
        setAnimatedStats(targets);
      }
    }, duration / steps);
  };

  const services = [
    {
      icon: Home,
      title: { it: 'Siti Vetrina', en: 'Showcase Websites' },
      value: 'sito-vetrina',
      description: { 
        it: 'Siti web professionali e moderni per presentare la tua attività online. Design responsive e ottimizzato per tutti i dispositivi.',
        en: 'Professional and modern websites to present your business online. Responsive design optimized for all devices.'
      },
      features: { 
        it: ['Design Personalizzato', 'SEO Ottimizzato', 'Mobile First'],
        en: ['Custom Design', 'SEO Optimized', 'Mobile First']
      }
    },
    {
      icon: Calendar,
      title: { it: 'Siti di Prenotazione', en: 'Booking Websites' },
      value: 'sito-prenotazione',
      description: { 
        it: 'Sistemi di prenotazione online completi per ristoranti, saloni, studi medici e B&B. Gestione calendari e notifiche automatiche.',
        en: 'Complete online booking systems for restaurants, salons, medical practices and B&Bs. Calendar management and automatic notifications.'
      },
      features: { 
        it: ['Calendario Integrato', 'Notifiche Automatiche', 'Pagamenti Online'],
        en: ['Integrated Calendar', 'Automatic Notifications', 'Online Payments']
      }
    },
    {
      icon: ShoppingBag,
      title: { it: 'E-commerce', en: 'E-commerce' },
      value: 'e-commerce',
      description: { 
        it: 'Piattaforme di vendita online complete con catalogo prodotti, carrello, pagamenti sicuri e gestione ordini.',
        en: 'Complete online sales platforms with product catalog, cart, secure payments and order management.'
      },
      features: { 
        it: ['Catalogo Completo', 'Pagamenti Sicuri', 'Gestione Ordini'],
        en: ['Complete Catalog', 'Secure Payments', 'Order Management']
      }
    }
  ];

  const technologies = [
    { name: 'React', icon: Code },
    { name: 'Next.js', icon: Rocket },
    { name: 'Vue.js', icon: Sparkles },
    { name: 'Node.js', icon: Globe },
    { name: 'TypeScript', icon: Code },
    { name: 'Tailwind CSS', icon: Palette },
    { name: 'WordPress', icon: Layers },
    { name: 'Shopify', icon: ShoppingBag }
  ];

  const process = [
    {
      step: '01',
      title: { it: 'Discovery & Strategy', en: 'Discovery & Strategy' },
      description: { 
        it: 'Analizziamo le tue esigenze e obiettivi per creare una strategia personalizzata.',
        en: 'We analyze your needs and objectives to create a customized strategy.'
      },
      icon: Target
    },
    {
      step: '02',
      title: { it: 'Design & Prototyping', en: 'Design & Prototyping' },
      description: { 
        it: 'Creiamo design moderni e prototipi interattivi per visualizzare il risultato finale.',
        en: 'We create modern designs and interactive prototypes to visualize the final result.'
      },
      icon: Palette
    },
    {
      step: '03',
      title: { it: 'Development', en: 'Development' },
      description: { 
        it: 'Sviluppiamo il sito con tecnologie moderne e codice pulito e performante.',
        en: 'We develop the site with modern technologies and clean, performant code.'
      },
      icon: Code
    },
    {
      step: '04',
      title: { it: 'Launch & Optimization', en: 'Launch & Optimization' },
      description: { 
        it: 'Lanciamo il sito e ottimizziamo le performance per risultati eccellenti.',
        en: 'We launch the site and optimize performance for excellent results.'
      },
      icon: Rocket
    }
  ];

  const testimonials = [
    {
      name: 'Claudio Marfia',
      role: { it: 'CEO, Riverloop', en: 'CEO, Riverloop' },
      content: { 
        it: 'Perfetto per la nostra startup di sviluppo e formazione. Il sito riflette perfettamente la nostra identità aziendale e ci ha aiutato a presentare i nostri servizi in modo professionale.',
        en: 'Perfect for our development and training startup. The site perfectly reflects our corporate identity and helped us present our services professionally.'
      },
      rating: 5
    },
    {
      name: 'Paola Bonventre',
      role: { it: 'Bar Bonventre', en: 'Bar Bonventre' },
      content: { 
        it: 'Sito vetrina elegante e funzionale che rappresenta perfettamente l\'atmosfera del nostro bar. I clienti lo trovano facilmente e apprezzano le informazioni sempre aggiornate.',
        en: 'Elegant and functional showcase website that perfectly represents the atmosphere of our bar. Customers find it easily and appreciate the always updated information.'
      },
      rating: 5
    },
    {
      name: 'Lorenzo La Monica',
      role: { it: 'Presidente, Bonifato Alcamo Futsal', en: 'President, Bonifato Alcamo Futsal' },
      content: { 
        it: 'Il sito vetrina per la nostra squadra di futsal è fantastico! Design moderno, facile da navigare e perfetto per condividere news, risultati e informazioni con i tifosi.',
        en: 'The showcase website for our futsal team is fantastic! Modern design, easy to navigate and perfect for sharing news, results and information with fans.'
      },
      rating: 5
    }
  ];

  const portfolio = [
    {
      title: 'Accademia del Gusto',
      category: { it: 'Prenotazioni', en: 'Booking' },
      image: 'https://www.accademiated.it/wp-content/uploads/2024/12/61946.jpg',
      alt: 'Foto copertina del progetto Accademia del Gusto',
      description: { 
        it: 'Piattaforma di prenotazione per il ristorante didattico della scuola TED',
        en: 'Booking platform for the educational restaurant of the TED school'
      },
      url: 'https://accademiated.it'
    },
    {
      title: 'Riverloop',
      category: { it: 'Vetrina', en: 'Showcase' },
      image: 'https://riverloop.it/media/2025/01/1933.webp',
      alt: 'Foto copertina del progetto Riverloop',
      description: { 
        it: 'Sito vetrina moderno e professionale per startup specializzata in sviluppo software e formazione tech',
        en: 'Modern and professional showcase website for startup specialized in software development and tech training'
      },
      url: 'https://riverloop.it/'
    },
    {
      title: 'Simone Grasso Private Banker',
      category: { it: 'Vetrina', en: 'Showcase' },
      image: 'https://simonegrassopb.com/wp-content/uploads/2025/03/close-up-businesspeople-hands-discussion-business-plan-scaled.jpg',
      alt: 'Foto copertina del progetto Simone Grasso Private Banker',
      description: { 
        it: 'Sito professionale ed elegante per consulente patrimoniale e private banker',
        en: 'Professional and elegant website for wealth advisor and private banker'
      },
      url: 'https://simonegrassopb.com/'
    },
    {
      title: 'Bar Bonventre',
      category: { it: 'Vetrina', en: 'Showcase' },
      image: 'https://www.barbonventre.it/wp-content/uploads/2024/09/IMG-20240907-WA0068.jpg',
      alt: 'Foto copertina del progetto Bar Bonventre',
      description: { 
        it: 'Sito vetrina accogliente e tradizionale per bar, pasticceria e gelateria',
        en: 'Welcoming and traditional showcase website for bar, pastry shop and ice cream parlor'
      },
      url: 'https://www.barbonventre.it/'
    },
    {
      title: 'BeYou',
      category: { it: 'Prenotazioni', en: 'Booking' },
      image: 'https://www.beyou.it/wp-content/uploads/2024/12/slider1.png',
      alt: 'Foto copertina del progetto BeYou',
      description: { 
        it: 'Sistema di prenotazione per centri beauty e benessere',
        en: 'Booking system for beauty and wellness centers'
      },
      url: 'https://www.beyou.it/'
    },
    {
      title: 'Social Sail',
      category: { it: 'Prenotazioni', en: 'Booking' },
      image: 'https://socialsail.it/wp-content/uploads/2025/03/01-vacanza-alle-isole-eolie-copertina_wide.jpg',
      alt: 'Foto copertina del progetto Social Sail',
      description: { 
        it: 'Piattaforma di prenotazione per esperienze di vela in Sicilia',
        en: 'Booking platform for sailing experiences in Sicily'
      },
      url: 'https://socialsail.it/'
    },
    {
      title: 'Villa Leuke',
      category: { it: 'Vetrina', en: 'Showcase' },
      image: 'https://www.villaleuke.it/wp-content/uploads/2024/09/41dd4441-ceb9-4375-ad5f-91cad8112483.webp',
      alt: 'Foto copertina del progetto Villa Leuke',
      description: { 
        it: 'Sito vetrina per una villa a Scopello',
        en: 'Showcase website for a villa in Scopello'
      },
      url: 'https://www.villaleuke.it/'
    },
    {
      title: 'Ville Pisciotta',
      category: { it: 'Vetrina', en: 'Showcase' },
      image: 'https://www.villepisciotta.com/mirascopello/1.jpg',
      alt: 'Foto copertina del progetto Ville Pisciotta',
      description: { 
        it: 'Sito vetrina completo per due ville in Sicilia',
        en: 'Complete showcase website for two villas in Sicily'
      },
      url: 'https://villepisciotta.it'
    }
  ];

  const features = [
    {
      icon: Zap,
      title: { it: 'Velocità', en: 'Speed' },
      description: { 
        it: 'Siti ultra-veloci e ottimizzati per le performance migliori',
        en: 'Ultra-fast and optimized websites for best performance'
      }
    },
    {
      icon: Shield,
      title: { it: 'Sicurezza', en: 'Security' },
      description: { 
        it: 'Protezione avanzata e backup automatici per i tuoi dati',
        en: 'Advanced protection and automatic backups for your data'
      }
    },
    {
      icon: TrendingUp,
      title: { it: 'SEO', en: 'SEO' },
      description: { 
        it: 'Ottimizzazione per i motori di ricerca per massima visibilità',
        en: 'Search engine optimization for maximum visibility'
      }
    },
    {
      icon: Clock,
      title: { it: 'Supporto', en: 'Support' },
      description: { 
        it: 'Assistenza continua e aggiornamenti regolari',
        en: 'Continuous assistance and regular updates'
      }
    }
  ];

  const scrollPortfolio = (direction) => {
    if (portfolioRef.current) {
      const container = portfolioRef.current;
      const cards = container.querySelectorAll('[data-portfolio-card]');
      
      if (cards.length === 0) return;
      
      // Get the first card to calculate its actual width including gap
      const firstCard = cards[0];
      const secondCard = cards[1];
      
      if (!firstCard) return;
      
      // Calculate scroll amount: card width + gap (24px = gap-6)
      const cardWidth = firstCard.offsetWidth;
      const gap = secondCard ? secondCard.offsetLeft - firstCard.offsetLeft - firstCard.offsetWidth : 24;
      const scrollAmount = cardWidth + gap;
      
      // Get current scroll position
      const currentScroll = container.scrollLeft;
      
      // Calculate target scroll position
      const targetScroll = direction === 'next'
        ? currentScroll + scrollAmount
        : currentScroll - scrollAmount;
      
      // Clamp to valid range
      const maxScroll = container.scrollWidth - container.clientWidth;
      const clampedScroll = Math.max(0, Math.min(targetScroll, maxScroll));
      
      container.scrollTo({
        left: clampedScroll,
        behavior: 'smooth'
      });
    }
  };

  const partners = [
    'AccademiaDelGusto.png',
    'ales.png',
    'AndreaAsaro.png',
    'BarBonventre.png',
    'BeYou.png',
    'BonifatoCalcio.png',
    'CarlaFerroni.png',
    'DueCLimited.png',
    'FigliDItalia.png',
    'HolidaySicily.png',
    'LivingLab.png',
    'MangiareSicano.png',
    'Riverloop.png',
    'Scopeltour.png',
    'SimoneGrasso.png',
    'SocialSail.png'
  ];

  const partnerAltTexts = {
    'AccademiaDelGusto.png': 'Logo del partner Accademia del Gusto',
    'ales.png': 'Logo del partner Alessandro Accomando',
    'AndreaAsaro.png': 'Logo del partner Andrea Asaro',
    'BarBonventre.png': 'Logo del partner Bar Bonventre',
    'BeYou.png': 'Logo del partner BeYou',
    'BonifatoCalcio.png': 'Logo del partner Bonifato',
    'CarlaFerroni.png': 'Logo del partner Carla Ferroni',
    'DueCLimited.png': 'Logo del partner DueCLimited',
    'FigliDItalia.png': 'Logo del partner Figli d\'Italia',
    'HolidaySicily.png': 'Logo del partner Holiday Sicily',
    'LivingLab.png': 'Logo del partner Livinglab',
    'MangiareSicano.png': 'Logo del partner Mangiare Sicano',
    'Riverloop.png': 'Logo del partner Riverloop',
    'Scopeltour.png': 'Logo del partner Scopeltour',
    'SimoneGrasso.png': 'Logo del partner Simone Grasso',
    'SocialSail.png': 'Logo del partner Social Sail'
  };

  // Auto-scroll partners carousel (infinite left scroll using CSS transform like Swiper)
  useEffect(() => {
    const wrapper = partnersWrapperRef.current;
    if (!wrapper) return;

    let animationId;
    let currentOffset = 0;
    const partnersCount = 16; // Fixed number of partners
    
    const updateCardWidth = () => {
      const isMobile = window.innerWidth < 768; // md breakpoint
      return isMobile ? window.innerWidth / 3 : window.innerWidth / 6; // 3 cards on mobile, 6 on desktop
    };
    
    const getOneSetWidth = () => {
      const cardWidth = updateCardWidth();
      return partnersCount * cardWidth;
    };

    const animate = () => {
      const wrapper = partnersWrapperRef.current;
      if (!wrapper) {
        cancelAnimationFrame(animationId);
        return;
      }
      
      currentOffset -= 1; // Move left (negative = left direction)
      const oneSetWidth = getOneSetWidth();
      
      // Reset when we've scrolled through one complete set for seamless loop
      if (Math.abs(currentOffset) >= oneSetWidth) {
        currentOffset = 0;
      }
      
      wrapper.style.transform = `translate3d(${currentOffset}px, 0, 0)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Handle window resize
    const handleResize = () => {
      currentOffset = 0; // Reset on resize
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section - Fixed with entrance animations */}
      <section ref={heroRef} className="relative bg-gray-900 text-white pt-32 pb-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-20 right-20 w-72 h-72 bg-[#ff7351]/20 rounded-full blur-3xl transition-all duration-2000 ${heroVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></div>
          <div className={`absolute bottom-20 left-20 w-96 h-96 bg-[#ff7351]/15 rounded-full blur-3xl transition-all duration-2000 delay-300 ${heroVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-1000 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className={`inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20 transition-all duration-1000 delay-200 ${heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <Sparkles className="w-4 h-4 text-[#ff7351]" />
                <span className="text-sm font-medium">{t.heroBadge}</span>
              </div>
              
              <h1 className={`text-6xl font-extrabold leading-tight mb-6 transition-all duration-1000 delay-300 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {t.heroTitle}{' '}
                <span className="text-[#ff7351]">{t.heroSuccess}</span>
              </h1>
              
              <p className={`text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed transition-all duration-1000 delay-500 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {t.heroDescription}
              </p>
              
              <div className={`flex flex-col sm:flex-row gap-4 mb-12 transition-all duration-1000 delay-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <button
                  onClick={() => navigate('/contatti')}
                  className="group px-8 py-4 bg-[#ff7351] text-white rounded-full font-semibold hover:bg-[#ff8466] transition-all flex items-center justify-center space-x-2 shadow-lg shadow-[#ff7351]/30 hover:shadow-xl hover:shadow-[#ff7351]/40 "
                >
                  <span>{t.heroButton1}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigate('/servizi')}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-full font-semibold hover:bg-white/20 hover:border-white/50 transition-all"
                >
                  {t.heroButton2}
                </button>
              </div>
              
              {/* Stats in Hero */}
              <div className={`grid grid-cols-3 gap-8 pt-8 border-t border-white/10 transition-all duration-1000 delay-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2 text-[#ff7351]">
                    {animatedStats.clients}+
                  </div>
                  <div className="text-gray-400 text-sm font-medium">{t.clientsHappy}</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2 text-[#ff7351]">
                    {animatedStats.projects}+
                  </div>
                  <div className="text-gray-400 text-sm font-medium">{t.projects}</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2 text-[#ff7351]">
                    {animatedStats.years}+
                  </div>
                  <div className="text-gray-400 text-sm font-medium">{t.yearsExp}</div>
                </div>
              </div>
            </div>
            
            <div className={`relative flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff7351]/20 to-transparent rounded-3xl blur-2xl transform rotate-6"></div>
                <img 
                  src="/manpc.png" 
                  alt="Uomo che tiene un pc in mano" 
                  className="relative w-full max-w-lg h-auto z-10 drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  data-scroll
                  className="text-center opacity-0 translate-y-8 transition-all duration-700"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#ff7351] to-[#ff8466] rounded-2xl mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title[language]}</h3>
                  <p className="text-gray-600">{feature.description[language]}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-scroll className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="font-bold text-gray-900 mb-4" style={{ fontSize: '35px' }}>
              {t.soluzioni} <span className="text-[#ff7351]">{t.soluzioniSpan}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.soluzioniDesc}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  data-scroll
                  className="group relative bg-white p-8 rounded-2xl border border-gray-200 hover:border-[#ff7351] hover:shadow-xl transition-all duration-300 hover:-translate-y-2 opacity-0 translate-y-8"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-[#ff7351] to-[#ff8466] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#ff7351] transition-colors">
                    {service.title[language]}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description[language]}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features[language].map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-[#ff7351] mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => navigate(`/servizi#${service.value}`)}
                    className="text-[#ff7351] font-semibold hover:text-[#ff8466] inline-flex items-center space-x-2 group-hover:translate-x-2 transition-all"
                  >
                    <span>{t.scopriDiPiu}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-scroll className="text-center mb-12 opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="font-bold text-gray-900 mb-4" style={{ fontSize: '35px' }}>
              {t.tecnologie} <span className="text-[#ff7351]">{t.tecnologieSpan}</span>
            </h2>
            <p className="text-xl text-gray-600">
              {t.tecnologieDesc}
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-8 gap-6">
            {technologies.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div
                  key={index}
                  data-scroll
                  className="group flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-[#ff7351] hover:shadow-lg transition-all hover:-translate-y-1 opacity-0 translate-y-8"
                >
                  <Icon className="w-8 h-8 text-gray-700 mb-2 group-hover:text-[#ff7351] group-hover:scale-110 transition-all" />
                  <div className="text-sm font-medium text-gray-700 text-center">
                    {tech.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-scroll className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="font-bold text-gray-900 mb-4" style={{ fontSize: '35px' }}>
              {t.processo} <span className="text-[#ff7351]">{t.processoSpan}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.processoDesc}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  data-scroll
                  className="relative bg-white p-8 rounded-2xl border border-gray-200 hover:border-[#ff7351] transition-all h-full opacity-0 translate-y-8"
                >
                  <div className="text-5xl font-black text-[#ff7351]/20 mb-4">{step.step}</div>
                  
                  <div className="w-12 h-12 bg-gradient-to-r from-[#ff7351] to-[#ff8466] rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title[language]}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {step.description[language]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-scroll className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="font-bold mb-4" style={{ fontSize: '35px' }}>
              {t.progetti} <span className="text-[#ff7351]">{t.progettiSpan}</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t.progettiDesc}
            </p>
          </div>

          <div className="relative">
            <div 
              ref={portfolioRef}
              className="overflow-x-auto scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div
                className="flex gap-6 snap-x snap-mandatory"
              >
                {portfolio.map((project, index) => (
                  <div
                    key={index}
                    data-portfolio-card
                    className="snap-start flex-shrink-0 w-full md:w-[calc((100%-3rem)/3)]"
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#ff7351] hover:bg-white/10 hover:shadow-2xl hover:shadow-[#ff7351]/20 transition-all h-full">
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.alt}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <span className="inline-block px-3 py-1 bg-[#ff7351] rounded-full text-xs font-semibold">
                            {project.category[language]}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                        <p className="text-gray-400 mb-4">{project.description[language]}</p>
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#ff7351] font-semibold inline-flex items-center space-x-2 hover:text-[#ff8466] transition-colors cursor-pointer"
                        >
                          <span>{t.vediProgetto}</span>
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => scrollPortfolio('prev')}
                className="w-12 h-12 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-[#ff7351] hover:border-[#ff7351] transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => scrollPortfolio('next')}
                className="w-12 h-12 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-[#ff7351] hover:border-[#ff7351] transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-scroll className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="font-bold text-gray-900 mb-4" style={{ fontSize: '35px' }}>
              {t.clienti} <span className="text-[#ff7351]">{t.clientiSpan}</span>
            </h2>
            <p className="text-xl text-gray-600">
              {t.clientiDesc}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                data-scroll
                className="relative bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:border-[#ff7351] hover:shadow-xl transition-all opacity-0 translate-y-8"
              >
                <Quote className="w-12 h-12 text-[#ff7351]/20 mb-4" />
                
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.content[language]}"
                </p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#ff7351] to-[#ff8466] flex items-center justify-center text-white text-xl font-bold mr-4">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role[language]}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div data-scroll className="text-center opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="font-bold text-gray-900 mb-4" style={{ fontSize: '35px' }}>
              {t.partner} <span className="text-[#ff7351]">{t.partnerSpan}</span>
            </h2>
          </div>
        </div>

        <div className="relative w-full overflow-hidden">
          <div ref={partnersRef} className="relative">
            <div 
              ref={partnersWrapperRef}
              className="flex items-center"
              style={{ 
                willChange: 'transform',
                transition: 'none'
              }}
            >
              {/* Triple the partners array for seamless infinite scroll */}
              {[...partners, ...partners, ...partners].map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex items-center justify-center h-32 w-[calc(100vw/3)] md:w-[calc(100vw/6)]"
                >
                  <img
                    src={`/partner/${partner}`}
                    alt={partnerAltTexts[partner] || partner.replace('.png', '')}
                    className="max-h-20 md:max-h-20 max-w-full object-contain px-4 md:px-8 opacity-70 brightness-75"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#ff7351] to-[#ff8466] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-bold mb-6" style={{ fontSize: '35px' }}>
            {t.ctaTitle}
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            {t.ctaDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/contatti')}
              className="px-8 py-4 bg-white text-[#ff7351] rounded-full font-semibold hover:bg-gray-100 transition-all inline-flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl "
            >
              <span>{t.ctaButton1}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/servizi')}
              className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-full font-semibold hover:bg-white/10 transition-all"
            >
              {t.ctaButton2}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
