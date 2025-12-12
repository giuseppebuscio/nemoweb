import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  ArrowRight, CheckCircle2, Send, Home, Calendar, ShoppingBag,
  FileText, DollarSign, Clock, Sparkles
} from 'lucide-react';

const RichiediPreventivoPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    deadline: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  // Precompila il servizio se presente nell'URL
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      setFormData(prev => ({ ...prev, service: serviceParam }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        budget: '',
        deadline: '',
        message: ''
      });
    }, 5000);
  };

  const services = [
    { value: 'sito-vetrina', label: 'Sito Vetrina', icon: Home },
    { value: 'sito-prenotazione', label: 'Sito di Prenotazione', icon: Calendar },
    { value: 'e-commerce', label: 'E-commerce', icon: ShoppingBag },
    { value: 'altro', label: 'Altro', icon: FileText }
  ];

  const budgetRanges = [
    'Fino a 500€',
    '500€ - 1000€',
    '1000€ - 2000€',
    '2000€ - 5000€',
    'Oltre 5000€',
    'Da definire'
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
              <DollarSign className="w-4 h-4 text-[#ff7351]" />
              <span className="text-sm font-medium">Preventivo Gratuito</span>
            </div>

            <h1 className="font-bold leading-tight mb-6" style={{ fontSize: '60px' }}>
              Richiedi un <span className="text-[#ff7351]">Preventivo</span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Compila il form qui sotto con i dettagli del tuo progetto. Ti invieremo un preventivo personalizzato 
              in tempi rapidi, senza impegno. La consulenza è sempre gratuita.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div data-scroll className="text-center opacity-0 translate-y-8 transition-all duration-700">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#ff7351]/10 rounded-2xl mb-4">
                <Clock className="w-8 h-8 text-[#ff7351]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Risposta Rapida</h3>
              <p className="text-gray-600">Riceverai il preventivo entro 24-48 ore</p>
            </div>
            <div data-scroll className="text-center opacity-0 translate-y-8 transition-all duration-700">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#ff7351]/10 rounded-2xl mb-4">
                <DollarSign className="w-8 h-8 text-[#ff7351]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Trasparente</h3>
              <p className="text-gray-600">Prezzi chiari senza sorprese nascoste</p>
            </div>
            <div data-scroll className="text-center opacity-0 translate-y-8 transition-all duration-700">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#ff7351]/10 rounded-2xl mb-4">
                <CheckCircle2 className="w-8 h-8 text-[#ff7351]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Senza Impegno</h3>
              <p className="text-gray-600">Consulenza gratuita e preventivo dettagliato</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            {isSubmitted && (
              <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-xl flex items-start space-x-4">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-green-900 mb-1">Richiesta inviata con successo!</p>
                  <p className="text-sm text-green-700">
                    Ti contatteremo al più presto con un preventivo personalizzato. Controlla la tua email nei prossimi giorni.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome e Cognome *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff7351] focus:border-transparent transition-all bg-white"
                    placeholder="Mario Rossi"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff7351] focus:border-transparent transition-all bg-white"
                    placeholder="mario.rossi@esempio.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Telefono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff7351] focus:border-transparent transition-all bg-white"
                  placeholder="+39 123 456 7890"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo di Servizio *
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff7351] focus:border-transparent transition-all bg-white"
                >
                  <option value="">Seleziona un servizio</option>
                  {services.map((service) => (
                    <option key={service.value} value={service.value}>
                      {service.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Previsto
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff7351] focus:border-transparent transition-all bg-white"
                  >
                    <option value="">Seleziona un range</option>
                    {budgetRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
                    Scadenza Desiderata
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff7351] focus:border-transparent transition-all bg-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Raccontaci del Tuo Progetto *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff7351] focus:border-transparent transition-all resize-none bg-white"
                  placeholder="Descrivi il tuo progetto, le tue esigenze, gli obiettivi che vuoi raggiungere..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-[#ff7351] to-[#ff8466] text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center space-x-2"
              >
                <span>Invia Richiesta Preventivo</span>
                <Send className="w-5 h-5" />
              </button>
            </form>
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
            Hai Domande?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Preferisci parlarci direttamente? Contattaci via email o telefono, siamo sempre disponibili per una consulenza.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/contatti')}
              className="px-8 py-4 bg-white text-[#ff7351] rounded-full font-semibold hover:bg-gray-100 transition-all inline-flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <span>Contattaci</span>
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

export default RichiediPreventivoPage;

