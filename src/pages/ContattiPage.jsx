import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';

const ContattiPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    }, 5000);
  };

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
              <Mail className="w-4 h-4 text-[#ff7351]" />
              <span className="text-sm font-medium">Siamo Qui per Te</span>
            </div>

            <h1 className="font-bold leading-tight mb-6" style={{ fontSize: '60px' }}>
              Contattaci
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed">
              Siamo qui per aiutarti a realizzare il tuo progetto digitale. 
              Compila il form o contattaci direttamente, ti risponderemo il prima possibile.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div data-scroll className="space-y-8 opacity-0 translate-y-8 transition-all duration-700">
              <div>
                <h2 className="font-bold text-gray-900 mb-4" style={{ fontSize: '35px' }}>
                  Informazioni di <span className="text-[#ff7351]">contatto</span>
                </h2>
                <p className="text-gray-600 text-lg">
                  Scegli il metodo di contatto che preferisci. Siamo disponibili per rispondere a tutte le tue domande.
                </p>
              </div>

              <div className="space-y-6">
                <a 
                  href="mailto:nemowebagency@gmail.com"
                  className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-[#ff7351]/5 transition-colors group border border-gray-200 hover:border-[#ff7351]"
                >
                  <div className="w-12 h-12 bg-[#ff7351]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#ff7351] group-hover:scale-110 transition-all">
                    <Mail className="w-6 h-6 text-[#ff7351] group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1 text-gray-900">Email</h3>
                    <p className="text-gray-600 group-hover:text-[#ff7351] transition-colors">
                      nemowebagency@gmail.com
                    </p>
                  </div>
                </a>

                <a 
                  href="tel:+393465745184"
                  className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-[#ff7351]/5 transition-colors group border border-gray-200 hover:border-[#ff7351]"
                >
                  <div className="w-12 h-12 bg-[#ff7351]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#ff7351] group-hover:scale-110 transition-all">
                    <Phone className="w-6 h-6 text-[#ff7351] group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1 text-gray-900">Telefono</h3>
                    <p className="text-gray-600 group-hover:text-[#ff7351] transition-colors">
                      +39 346 574 5184
                    </p>
                  </div>
                </a>

                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="w-12 h-12 bg-[#ff7351]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#ff7351]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1 text-gray-900">Zona</h3>
                    <p className="text-gray-600">
                      Serviamo clienti in tutta Italia e all'estero
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="w-12 h-12 bg-[#ff7351]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#ff7351]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-900">Orari di disponibilità</h3>
                    <div className="space-y-1 text-gray-600">
                      <p>Lunedì - Venerdì: 9:00 - 18:00</p>
                      <p>Sabato: Su appuntamento</p>
                      <p>Domenica: Chiuso</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div data-scroll className="bg-gray-50 rounded-2xl p-8 md:p-10 border border-gray-200 opacity-0 translate-y-8 transition-all duration-700">
              <h2 className="font-bold text-gray-900 mb-6" style={{ fontSize: '35px' }}>
                Invia un <span className="text-[#ff7351]">messaggio</span>
              </h2>
              
              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-900">Messaggio inviato!</p>
                    <p className="text-sm text-green-700">Ti risponderemo il prima possibile.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
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
                    Servizio di interesse
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff7351] focus:border-transparent transition-all bg-white"
                  >
                    <option value="">Seleziona un servizio</option>
                    <option value="sito-vetrina">Sito Vetrina</option>
                    <option value="sito-prenotazione">Sito di Prenotazione</option>
                    <option value="e-commerce">E-commerce</option>
                    <option value="altro">Altro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Messaggio *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff7351] focus:border-transparent transition-all resize-none bg-white"
                    placeholder="Raccontaci del tuo progetto..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-[#ff7351] to-[#ff8466] text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Invia messaggio</span>
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContattiPage;

