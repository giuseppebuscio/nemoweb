import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import {
  ArrowRight, Users, Target, Heart, Award, Rocket,
  CheckCircle2, Zap, Shield, TrendingUp, Sparkles
} from 'lucide-react';

const ChiSiamoPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const translations = {
    it: {
      heroBadge: 'La Nostra Storia',
      heroTitle: 'Chi',
      heroSpan: 'Siamo',
      heroDescription: 'Siamo Nemo Web Agency, un\'agenzia digitale specializzata nella creazione di siti web professionali, moderni e orientati ai risultati. Dal 2016 aiutiamo imprese e professionisti a crescere online.',
      missionTitle: 'La Nostra',
      missionSpan: 'Mission',
      missionDesc1: 'Il nostro obiettivo è creare siti web che non siano solo belli da vedere, ma che portino risultati concreti. Ogni progetto è studiato per rispondere alle esigenze specifiche del cliente e per raggiungere i suoi obiettivi di business.',
      missionDesc2: 'Crediamo in un approccio personalizzato: ogni attività ha le sue caratteristiche uniche e merita una soluzione su misura. Per questo lavoriamo a stretto contatto con i nostri clienti per capire le loro necessità e trasformarle in soluzioni digitali efficaci.',
      scopriServizi: 'Scopri i Servizi',
      clientiSoddisfatti: 'Clienti Soddisfatti',
      progettiCompletati: 'Progetti Completati',
      anniEsperienza: 'Anni di Esperienza',
      soddisfazioneGarantita: 'Soddisfazione Garantita',
      valoriTitle: 'I Nostri',
      valoriSpan: 'Valori',
      valoriDesc: 'I principi che guidano il nostro lavoro ogni giorno',
      teamName: 'Il Nostro Team',
      teamRole: 'Web Developers & Designers',
      teamDesc: 'Un team di professionisti esperti che lavora insieme per trasformare le tue idee in realtà digitali.',
      approccioTitle: 'Il Nostro',
      approccioSpan: 'Approccio',
      approccioDesc1: 'Lavoriamo come partner del tuo business, non come semplici fornitori. Ogni progetto inizia con un\'attenta analisi delle tue esigenze e obiettivi, seguita da un design personalizzato e uno sviluppo curato nei minimi dettagli.',
      approccioDesc2: 'Il nostro processo è trasparente: ti teniamo sempre informato sulle fasi di lavoro e siamo sempre disponibili per rispondere alle tue domande. Il successo del tuo progetto è anche il nostro successo.',
      consulenza: 'Consulenza Personalizzata',
      consulenzaDesc: 'Analizziamo le tue esigenze per creare la soluzione perfetta',
      designUnico: 'Design Unico',
      designDesc: 'Ogni sito è creato su misura per riflettere la tua identità',
      supporto: 'Supporto Continuo',
      supportoDesc: 'Siamo sempre qui per aiutarti anche dopo il lancio',
      ctaTitle: 'Inizia il Tuo Progetto con Noi',
      ctaDesc: 'Contattaci oggi stesso per una consulenza gratuita e scopri come possiamo aiutare il tuo business a crescere online.',
      ctaButton1: 'Richiedi un Preventivo',
      ctaButton2: 'Contattaci'
    },
    en: {
      heroBadge: 'Our Story',
      heroTitle: 'About',
      heroSpan: 'Us',
      heroDescription: 'We are Nemo Web Agency, a digital agency specialized in creating professional, modern and results-oriented websites. Since 2016 we help businesses and professionals grow online.',
      missionTitle: 'Our',
      missionSpan: 'Mission',
      missionDesc1: 'Our goal is to create websites that are not only beautiful to look at, but that bring concrete results. Each project is designed to meet the specific needs of the client and achieve their business objectives.',
      missionDesc2: 'We believe in a personalized approach: every business has its unique characteristics and deserves a tailor-made solution. That\'s why we work closely with our clients to understand their needs and turn them into effective digital solutions.',
      scopriServizi: 'Discover Services',
      clientiSoddisfatti: 'Satisfied Clients',
      progettiCompletati: 'Completed Projects',
      anniEsperienza: 'Years Experience',
      soddisfazioneGarantita: 'Satisfaction Guaranteed',
      valoriTitle: 'Our',
      valoriSpan: 'Values',
      valoriDesc: 'The principles that guide our work every day',
      teamName: 'Our Team',
      teamRole: 'Web Developers & Designers',
      teamDesc: 'A team of expert professionals working together to transform your ideas into digital reality.',
      approccioTitle: 'Our',
      approccioSpan: 'Approach',
      approccioDesc1: 'We work as partners of your business, not just suppliers. Each project starts with a careful analysis of your needs and objectives, followed by a personalized design and development cared for in every detail.',
      approccioDesc2: 'Our process is transparent: we always keep you informed about the work phases and we are always available to answer your questions. The success of your project is also our success.',
      consulenza: 'Personalized Consultation',
      consulenzaDesc: 'We analyze your needs to create the perfect solution',
      designUnico: 'Unique Design',
      designDesc: 'Each site is created to measure to reflect your identity',
      supporto: 'Continuous Support',
      supportoDesc: 'We are always here to help you even after launch',
      ctaTitle: 'Start Your Project with Us',
      ctaDesc: 'Contact us today for a free consultation and discover how we can help your business grow online.',
      ctaButton1: 'Request a Quote',
      ctaButton2: 'Contact Us'
    }
  };

  const t = translations[language];

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

  const values = [
    {
      icon: Heart,
      title: { it: 'Passione', en: 'Passion' },
      description: { 
        it: 'Ammiamo quello che facciamo e mettiamo il cuore in ogni progetto, dal design allo sviluppo finale.',
        en: 'We love what we do and put our heart into every project, from design to final development.'
      }
    },
    {
      icon: Target,
      title: { it: 'Obiettivi Chiari', en: 'Clear Objectives' },
      description: { 
        it: 'Lavoriamo per raggiungere risultati concreti e misurabili per il tuo business.',
        en: 'We work to achieve concrete and measurable results for your business.'
      }
    },
    {
      icon: Zap,
      title: { it: 'Innovazione', en: 'Innovation' },
      description: { 
        it: 'Utilizziamo tecnologie all\'avanguardia per creare soluzioni moderne e performanti.',
        en: 'We use cutting-edge technologies to create modern and performant solutions.'
      }
    },
    {
      icon: Shield,
      title: { it: 'Affidabilità', en: 'Reliability' },
      description: { 
        it: 'Garantiamo supporto continuo, aggiornamenti regolari e assistenza quando ne hai bisogno.',
        en: 'We guarantee continuous support, regular updates and assistance when you need it.'
      }
    }
  ];

  const team = [
    {
      name: { it: 'Il Nostro Team', en: 'Our Team' },
      role: { it: 'Web Developers & Designers', en: 'Web Developers & Designers' },
      description: { 
        it: 'Un team di professionisti esperti che lavora insieme per trasformare le tue idee in realtà digitali.',
        en: 'A team of expert professionals working together to transform your ideas into digital reality.'
      }
    }
  ];

  const stats = [
    { number: '150+', label: { it: 'Clienti Soddisfatti', en: 'Satisfied Clients' } },
    { number: '300+', label: { it: 'Progetti Completati', en: 'Completed Projects' } },
    { number: '8+', label: { it: 'Anni di Esperienza', en: 'Years Experience' } },
    { number: '100%', label: { it: 'Soddisfazione Garantita', en: 'Satisfaction Guaranteed' } }
  ];

  return (
    <div className="min-h-screen bg-white">
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
              <Sparkles className="w-4 h-4 text-[#ff7351]" />
              <span className="text-sm font-medium">{t.heroBadge}</span>
            </div>

            <h1 className="font-bold leading-tight mb-6" style={{ fontSize: '60px' }}>
              {t.heroTitle} <span className="text-[#ff7351]">{t.heroSpan}</span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {t.heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div data-scroll className="opacity-0 translate-y-8 transition-all duration-700">
              <h2 className="font-bold text-gray-900 mb-6" style={{ fontSize: '35px' }}>
                {t.missionTitle} <span className="text-[#ff7351]">{t.missionSpan}</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t.missionDesc1}
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t.missionDesc2}
              </p>
              <button
                onClick={() => navigate('/servizi')}
                className="px-8 py-4 bg-[#ff7351] text-white rounded-full font-semibold hover:bg-[#ff8466] transition-all flex items-center justify-center space-x-2 shadow-lg shadow-[#ff7351]/30 hover:shadow-xl hover:shadow-[#ff7351]/40"
              >
                <span>{t.scopriServizi}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div data-scroll className="opacity-0 translate-y-8 transition-all duration-700">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff7351]/20 to-transparent rounded-3xl blur-2xl transform rotate-6"></div>
                <div className="relative bg-gray-50 rounded-3xl p-8 border border-gray-200">
                  <div className="grid grid-cols-2 gap-6">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-4xl font-bold text-[#ff7351] mb-2">
                          {stat.number}
                        </div>
                        <div className="text-gray-600 text-sm font-medium">
                          {stat.label[language]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-scroll className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="font-bold text-gray-900 mb-4" style={{ fontSize: '35px' }}>
              {t.valoriTitle} <span className="text-[#ff7351]">{t.valoriSpan}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.valoriDesc}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  data-scroll
                  className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-[#ff7351] hover:shadow-xl transition-all duration-300 opacity-0 translate-y-8"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-[#ff7351] to-[#ff8466] rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title[language]}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description[language]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div data-scroll className="opacity-0 translate-y-8 transition-all duration-700">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff7351]/20 to-transparent rounded-3xl blur-2xl transform -rotate-6"></div>
                <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 text-white">
                  <Users className="w-16 h-16 text-[#ff7351] mb-6" />
                  <h3 className="text-3xl font-bold mb-4">{team[0].name[language]}</h3>
                  <p className="text-gray-300 mb-4">{team[0].role[language]}</p>
                  <p className="text-gray-400 leading-relaxed">
                    {team[0].description[language]}
                  </p>
                </div>
              </div>
            </div>

            <div data-scroll className="opacity-0 translate-y-8 transition-all duration-700">
              <h2 className="font-bold text-gray-900 mb-6" style={{ fontSize: '35px' }}>
                {t.approccioTitle} <span className="text-[#ff7351]">{t.approccioSpan}</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t.approccioDesc1}
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t.approccioDesc2}
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-[#ff7351] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t.consulenza}</h4>
                    <p className="text-gray-600">{t.consulenzaDesc}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-[#ff7351] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t.designUnico}</h4>
                    <p className="text-gray-600">{t.designDesc}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-[#ff7351] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t.supporto}</h4>
                    <p className="text-gray-600">{t.supportoDesc}</p>
                  </div>
                </div>
              </div>
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
              onClick={() => navigate('/richiedi-preventivo')}
              className="px-8 py-4 bg-white text-[#ff7351] rounded-full font-semibold hover:bg-gray-100 transition-all inline-flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <span>{t.ctaButton1}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/contatti')}
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

export default ChiSiamoPage;

