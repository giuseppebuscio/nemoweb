import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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
      title: 'Siti Vetrina',
      description: 'Siti web professionali e moderni per presentare la tua attività online. Design responsive e ottimizzato per tutti i dispositivi.',
      features: ['Design Personalizzato', 'SEO Ottimizzato', 'Mobile First']
    },
    {
      icon: Calendar,
      title: 'Siti di Prenotazione',
      description: 'Sistemi di prenotazione online completi per ristoranti, saloni, studi medici e B&B. Gestione calendari e notifiche automatiche.',
      features: ['Calendario Integrato', 'Notifiche Automatiche', 'Pagamenti Online']
    },
    {
      icon: ShoppingBag,
      title: 'E-commerce',
      description: 'Piattaforme di vendita online complete con catalogo prodotti, carrello, pagamenti sicuri e gestione ordini.',
      features: ['Catalogo Completo', 'Pagamenti Sicuri', 'Gestione Ordini']
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
      title: 'Discovery & Strategy',
      description: 'Analizziamo le tue esigenze e obiettivi per creare una strategia personalizzata.',
      icon: Target
    },
    {
      step: '02',
      title: 'Design & Prototyping',
      description: 'Creiamo design moderni e prototipi interattivi per visualizzare il risultato finale.',
      icon: Palette
    },
    {
      step: '03',
      title: 'Development',
      description: 'Sviluppiamo il sito con tecnologie moderne e codice pulito e performante.',
      icon: Code
    },
    {
      step: '04',
      title: 'Launch & Optimization',
      description: 'Lanciamo il sito e ottimizziamo le performance per risultati eccellenti.',
      icon: Rocket
    }
  ];

  const testimonials = [
    {
      name: 'Claudio Marfia',
      role: 'CEO, Riverloop',
      content: 'Perfetto per la nostra startup di sviluppo e formazione. Il sito riflette perfettamente la nostra identità aziendale e ci ha aiutato a presentare i nostri servizi in modo professionale.',
      rating: 5
    },
    {
      name: 'Paola Bonventre',
      role: 'Bar Bonventre',
      content: 'Sito vetrina elegante e funzionale che rappresenta perfettamente l\'atmosfera del nostro bar. I clienti lo trovano facilmente e apprezzano le informazioni sempre aggiornate.',
      rating: 5
    },
    {
      name: 'Lorenzo La Monica',
      role: 'Presidente, Bonifato Alcamo Futsal',
      content: 'Il sito vetrina per la nostra squadra di futsal è fantastico! Design moderno, facile da navigare e perfetto per condividere news, risultati e informazioni con i tifosi.',
      rating: 5
    }
  ];

  const portfolio = [
    {
      title: 'E-commerce Fashion',
      category: 'E-commerce',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
      description: 'Piattaforma completa per brand di moda con oltre 1000 prodotti'
    },
    {
      title: 'Sito Ristorante',
      category: 'Prenotazioni',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      description: 'Sistema di prenotazione integrato con menu digitale interattivo'
    },
    {
      title: 'Portfolio Aziendale',
      category: 'Vetrina',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      description: 'Sito corporate moderno con sezione portfolio e blog integrato'
    },
    {
      title: 'E-commerce Tech',
      category: 'E-commerce',
      image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800',
      description: 'E-commerce B2B per azienda tech con gestione ordini avanzata'
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Velocità',
      description: 'Siti ultra-veloci e ottimizzati per le performance migliori'
    },
    {
      icon: Shield,
      title: 'Sicurezza',
      description: 'Protezione avanzata e backup automatici per i tuoi dati'
    },
    {
      icon: TrendingUp,
      title: 'SEO',
      description: 'Ottimizzazione per i motori di ricerca per massima visibilità'
    },
    {
      icon: Clock,
      title: 'Supporto',
      description: 'Assistenza continua e aggiornamenti regolari'
    }
  ];

  const scrollPortfolio = (direction) => {
    if (portfolioRef.current) {
      const containerWidth = portfolioRef.current.clientWidth;
      const cardWidth = (containerWidth - 48) / 3; // 3 cards with 2 gaps (24px each)
      const scrollAmount = cardWidth + 24; // 1 card width + 1 gap
      
      portfolioRef.current.scrollBy({ 
        left: direction === 'next' ? scrollAmount : -scrollAmount, 
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

  // Auto-scroll partners carousel (infinite left scroll using CSS transform like Swiper)
  useEffect(() => {
    const wrapper = partnersWrapperRef.current;
    if (!wrapper) return;

    let animationId;
    let currentOffset = 0;
    const partnersCount = 16; // Fixed number of partners
    
    const updateCardWidth = () => {
      return window.innerWidth / 6; // 6 cards visible
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

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
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
                <span className="text-sm font-medium">Web Agency dal 2016</span>
              </div>
              
              <h1 className={`text-6xl font-extrabold leading-tight mb-6 transition-all duration-1000 delay-300 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                Creiamo il tuo{' '}
                <span className="text-[#ff7351]">successo digitale</span>
              </h1>
              
              <p className={`text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed transition-all duration-1000 delay-500 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                Sviluppiamo soluzioni digitali innovative con design moderno e tecnologie all'avanguardia per trasformare la tua presenza online.
              </p>
              
              <div className={`flex flex-col sm:flex-row gap-4 mb-12 transition-all duration-1000 delay-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <button
                  onClick={() => navigate('/contatti')}
                  className="group px-8 py-4 bg-[#ff7351] text-white rounded-full font-semibold hover:bg-[#ff8466] transition-all flex items-center justify-center space-x-2 shadow-lg shadow-[#ff7351]/30 hover:shadow-xl hover:shadow-[#ff7351]/40 "
                >
                  <span>Inizia il Tuo Progetto</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigate('/servizi')}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-full font-semibold hover:bg-white/20 hover:border-white/50 transition-all"
                >
                  Scopri i Servizi
                </button>
              </div>
              
              {/* Stats in Hero */}
              <div className={`grid grid-cols-3 gap-8 pt-8 border-t border-white/10 transition-all duration-1000 delay-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2 text-[#ff7351]">
                    {animatedStats.clients}+
                  </div>
                  <div className="text-gray-400 text-sm font-medium">Clienti Felici</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2 text-[#ff7351]">
                    {animatedStats.projects}+
                  </div>
                  <div className="text-gray-400 text-sm font-medium">Progetti</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2 text-[#ff7351]">
                    {animatedStats.years}+
                  </div>
                  <div className="text-gray-400 text-sm font-medium">Anni Esperienza</div>
                </div>
              </div>
            </div>
            
            <div className={`relative flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff7351]/20 to-transparent rounded-3xl blur-2xl transform rotate-6"></div>
                <img 
                  src="/manpc.png" 
                  alt="Nemo Web Agency" 
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
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
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
              Le Nostre <span className="text-[#ff7351]">Soluzioni</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Offriamo servizi completi per ogni esigenza digitale, dalla vetrina al negozio online completo
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
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-[#ff7351] mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => navigate('/servizi')}
                    className="text-[#ff7351] font-semibold hover:text-[#ff8466] inline-flex items-center space-x-2 group-hover:translate-x-2 transition-all"
                  >
                    <span>Scopri di più</span>
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
              Tecnologie <span className="text-[#ff7351]">Moderne</span>
            </h2>
            <p className="text-xl text-gray-600">
              Utilizziamo le tecnologie più avanzate per garantire performance e scalabilità
            </p>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
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
              Il Nostro <span className="text-[#ff7351]">Processo</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un approccio strutturato per garantire risultati eccellenti ad ogni step
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
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
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
              I nostri <span className="text-[#ff7351]">progetti</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Esplora alcuni dei nostri lavori più recenti e di successo
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
                    className="snap-start flex-shrink-0"
                    style={{ width: 'calc((100% - 3rem) / 3)' }}
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#ff7351] hover:bg-white/10 hover:shadow-2xl hover:shadow-[#ff7351]/20 transition-all h-full">
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <span className="inline-block px-3 py-1 bg-[#ff7351] rounded-full text-xs font-semibold">
                            {project.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                        <p className="text-gray-400 mb-4">{project.description}</p>
                        <button className="text-[#ff7351] font-semibold inline-flex items-center space-x-2 hover:text-[#ff8466] transition-colors">
                          <span>Vedi Progetto</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
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
              Cosa dicono i <span className="text-[#ff7351]">clienti</span>
            </h2>
            <p className="text-xl text-gray-600">
              La soddisfazione dei nostri clienti è la nostra migliore testimonianza
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
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#ff7351] to-[#ff8466] flex items-center justify-center text-white text-xl font-bold mr-4">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
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
              I Nostri <span className="text-[#ff7351]">Partner</span>
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
                  className="flex-shrink-0 flex items-center justify-center h-32"
                  style={{ width: 'calc(100vw / 6)' }}
                >
                  <img
                    src={`/partner/${partner}`}
                    alt={partner.replace('.png', '')}
                    className="max-h-20 max-w-full object-contain px-8 opacity-70 brightness-75"
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
            Pronto a Trasformare la Tua Presenza Digitale?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Contattaci oggi stesso per una consulenza gratuita e scopri come possiamo aiutare il tuo business a crescere online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/contatti')}
              className="px-8 py-4 bg-white text-[#ff7351] rounded-full font-semibold hover:bg-gray-100 transition-all inline-flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl "
            >
              <span>Prenota una Consulenza Gratuita</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/servizi')}
              className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-full font-semibold hover:bg-white/10 transition-all"
            >
              Scopri i Servizi
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
