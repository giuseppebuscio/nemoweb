import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import {
  CheckCircle2, Send, Home, Calendar, ShoppingBag,
  FileText, DollarSign, Clock, Sparkles, AlertCircle, Loader2
} from 'lucide-react';
import { EMAILJS_CONFIG } from '../config/emailjs';

const RichiediPreventivoPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Verifica che le credenziali siano configurate
      if (EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID' || 
          EMAILJS_CONFIG.TEMPLATE_ID_QUOTE === 'YOUR_TEMPLATE_ID_QUOTE' ||
          EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
        throw new Error('EmailJS non è configurato. Controlla il file src/config/emailjs.js');
      }

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID_QUOTE,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone || (language === 'it' ? 'Non fornito' : 'Not provided'),
          service: formData.service || (language === 'it' ? 'Non specificato' : 'Not specified'),
          budget: formData.budget || (language === 'it' ? 'Non specificato' : 'Not specified'),
          deadline: formData.deadline || (language === 'it' ? 'Non specificato' : 'Not specified'),
          message: formData.message,
          to_email: 'info@nemoagency.it', // Email di destinazione
        },
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      setIsSubmitted(true);
      setIsLoading(false);
      
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
    } catch (err) {
      console.error('Errore invio email:', err);
      setError(language === 'it' 
        ? 'Errore nell\'invio della richiesta. Riprova più tardi o contattaci direttamente.'
        : 'Error sending request. Please try again later or contact us directly.');
      setIsLoading(false);
    }
  };

  const translations = {
    it: {
      heroBadge: 'Preventivo Gratuito',
      heroTitle: 'Richiedi un',
      heroSpan: 'Preventivo',
      heroDesc: 'Compila il form qui sotto con i dettagli del tuo progetto. Ti invieremo un preventivo personalizzato in tempi rapidi, senza impegno. La consulenza è sempre gratuita.',
      rispostaRapida: 'Risposta Rapida',
      rispostaRapidaDesc: 'Riceverai il preventivo entro 24-48 ore',
      trasparente: 'Trasparente',
      trasparenteDesc: 'Prezzi chiari senza sorprese nascoste',
      senzaImpegno: 'Senza Impegno',
      senzaImpegnoDesc: 'Consulenza gratuita e preventivo dettagliato',
      errore: 'Errore',
      successo: 'Richiesta inviata con successo!',
      successoDesc: 'Ti contatteremo al più presto con un preventivo personalizzato. Controlla la tua email nei prossimi giorni.',
      nomeLabel: 'Nome e Cognome *',
      emailLabel: 'Email *',
      telefonoLabel: 'Telefono',
      servizioLabel: 'Tipo di Servizio *',
      selezionaServizio: 'Seleziona un servizio',
      budgetLabel: 'Budget Previsto',
      selezionaRange: 'Seleziona un range',
      deadlineLabel: 'Scadenza Progetto',
      messaggioLabel: 'Messaggio',
      messaggioPlaceholder: 'Raccontaci di più sul tuo progetto...',
      inviaRichiesta: 'Invia Richiesta',
      invioCorso: 'Invio in corso...',
      sitoVetrina: 'Sito Vetrina',
      sitoPrenotazione: 'Sito di Prenotazione',
      ecommerce: 'E-commerce',
      altro: 'Altro',
      budget1: 'Fino a 500€',
      budget2: '500€ - 1000€',
      budget3: '1000€ - 2000€',
      budget4: '2000€ - 5000€',
      budget5: 'Oltre 5000€',
      budget6: 'Da definire'
    },
    en: {
      heroBadge: 'Free Quote',
      heroTitle: 'Request a',
      heroSpan: 'Quote',
      heroDesc: 'Fill out the form below with your project details. We will send you a personalized quote quickly, with no obligation. Consultation is always free.',
      rispostaRapida: 'Quick Response',
      rispostaRapidaDesc: 'You will receive the quote within 24-48 hours',
      trasparente: 'Transparent',
      trasparenteDesc: 'Clear prices with no hidden surprises',
      senzaImpegno: 'No Obligation',
      senzaImpegnoDesc: 'Free consultation and detailed quote',
      errore: 'Error',
      successo: 'Request sent successfully!',
      successoDesc: 'We will contact you as soon as possible with a personalized quote. Check your email in the coming days.',
      nomeLabel: 'Full Name *',
      emailLabel: 'Email *',
      telefonoLabel: 'Phone',
      servizioLabel: 'Service Type *',
      selezionaServizio: 'Select a service',
      budgetLabel: 'Expected Budget',
      selezionaRange: 'Select a range',
      deadlineLabel: 'Project Deadline',
      messaggioLabel: 'Message',
      messaggioPlaceholder: 'Tell us more about your project...',
      inviaRichiesta: 'Send Request',
      invioCorso: 'Sending...',
      sitoVetrina: 'Showcase Website',
      sitoPrenotazione: 'Booking Website',
      ecommerce: 'E-commerce',
      altro: 'Other',
      budget1: 'Up to €500',
      budget2: '€500 - €1000',
      budget3: '€1000 - €2000',
      budget4: '€2000 - €5000',
      budget5: 'Over €5000',
      budget6: 'To be determined'
    }
  };

  const t = translations[language];

  const services = [
    { value: 'sito-vetrina', label: { it: 'Sito Vetrina', en: 'Showcase Website' }, icon: Home },
    { value: 'sito-prenotazione', label: { it: 'Sito di Prenotazione', en: 'Booking Website' }, icon: Calendar },
    { value: 'e-commerce', label: { it: 'E-commerce', en: 'E-commerce' }, icon: ShoppingBag },
    { value: 'altro', label: { it: 'Altro', en: 'Other' }, icon: FileText }
  ];

  const budgetRanges = [
    { it: 'Fino a 500€', en: 'Up to €500' },
    { it: '500€ - 1000€', en: '€500 - €1000' },
    { it: '1000€ - 2000€', en: '€1000 - €2000' },
    { it: '2000€ - 5000€', en: '€2000 - €5000' },
    { it: 'Oltre 5000€', en: 'Over €5000' },
    { it: 'Da definire', en: 'To be determined' }
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
              <span className="text-sm font-medium">{t.heroBadge}</span>
            </div>

            <h1 className="font-bold leading-tight mb-6" style={{ fontSize: '60px' }}>
              {t.heroTitle} <span className="text-[#ff7351]">{t.heroSpan}</span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {t.heroDesc}
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
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.rispostaRapida}</h3>
              <p className="text-gray-600">{t.rispostaRapidaDesc}</p>
            </div>
            <div data-scroll className="text-center opacity-0 translate-y-8 transition-all duration-700">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#ff7351]/10 rounded-2xl mb-4">
                <DollarSign className="w-8 h-8 text-[#ff7351]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.trasparente}</h3>
              <p className="text-gray-600">{t.trasparenteDesc}</p>
            </div>
            <div data-scroll className="text-center opacity-0 translate-y-8 transition-all duration-700">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#ff7351]/10 rounded-2xl mb-4">
                <CheckCircle2 className="w-8 h-8 text-[#ff7351]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.senzaImpegno}</h3>
              <p className="text-gray-600">{t.senzaImpegnoDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            {error && (
              <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-4">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-900 mb-1">{t.errore}</p>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            {isSubmitted && (
              <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-xl flex items-start space-x-4">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-green-900 mb-1">{t.successo}</p>
                  <p className="text-sm text-green-700">
                    {t.successoDesc}
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.nomeLabel}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff7351] focus:border-transparent transition-all bg-white"
                    placeholder={language === 'it' ? 'Mario Rossi' : 'John Doe'}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.emailLabel}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff7351] focus:border-transparent transition-all bg-white"
                    placeholder={language === 'it' ? 'mario.rossi@esempio.com' : 'john.doe@example.com'}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.telefonoLabel}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff7351] focus:border-transparent transition-all bg-white"
                  placeholder={language === 'it' ? '+39 123 456 7890' : '+1 123 456 7890'}
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.servizioLabel}
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff7351] focus:border-transparent transition-all bg-white"
                >
                  <option value="">{t.selezionaServizio}</option>
                  {services.map((service) => (
                    <option key={service.value} value={service.value}>
                      {service.label[language]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.budgetLabel}
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff7351] focus:border-transparent transition-all bg-white"
                  >
                    <option value="">{t.selezionaRange}</option>
                    {budgetRanges.map((range, index) => (
                      <option key={index} value={range[language]}>
                        {range[language]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.deadlineLabel}
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
                  {t.messaggioLabel} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff7351] focus:border-transparent transition-all resize-none bg-white"
                  placeholder={t.messaggioPlaceholder}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-8 py-4 bg-gradient-to-r from-[#ff7351] to-[#ff8466] text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{t.invioCorso}</span>
                  </>
                ) : (
                  <>
                    <span>{t.inviaRichiesta}</span>
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RichiediPreventivoPage;

