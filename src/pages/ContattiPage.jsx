import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { Mail, Phone, Send, CheckCircle2, Clock, AlertCircle, Loader2 } from 'lucide-react';
import { EMAILJS_CONFIG } from '../config/emailjs';

const ContattiPage = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const translations = {
    it: {
      heroBadge: 'Siamo Qui per Te',
      heroTitle: 'Contattaci',
      heroDesc: 'Siamo qui per aiutarti a realizzare il tuo progetto digitale. Compila il form o contattaci direttamente, ti risponderemo il prima possibile.',
      infoTitle: 'Informazioni di',
      infoSpan: 'contatto',
      infoDesc: 'Scegli il metodo di contatto che preferisci. Siamo disponibili per rispondere a tutte le tue domande.',
      email: 'Email',
      telefono: 'Telefono',
      orari: 'Orari di disponibilità',
      orariLunVen: 'Lunedì - Venerdì: 9:00 - 18:00',
      orariSabato: 'Sabato: Chiuso',
      orariDomenica: 'Domenica: Chiuso',
      formTitle: 'Invia un',
      formSpan: 'messaggio',
      nomeLabel: 'Nome e Cognome *',
      emailLabel: 'Email *',
      telefonoLabel: 'Telefono',
      servizioLabel: 'Servizio di interesse',
      selezionaServizio: 'Seleziona un servizio',
      messaggioLabel: 'Messaggio *',
      nomePlaceholder: 'Mario Rossi',
      emailPlaceholder: 'mario.rossi@esempio.com',
      telefonoPlaceholder: '+39 123 456 7890',
      messaggioPlaceholder: 'Raccontaci del tuo progetto...',
      inviaMessaggio: 'Invia messaggio',
      invioCorso: 'Invio in corso...',
      messaggioInviato: 'Messaggio inviato!',
      messaggioInviatoDesc: 'Ti risponderemo il prima possibile.',
      errore: 'Errore',
      erroreInvio: 'Errore nell\'invio del messaggio. Riprova più tardi o contattaci direttamente.',
      sitoVetrina: 'Sito Vetrina',
      sitoPrenotazione: 'Sito di Prenotazione',
      ecommerce: 'E-commerce',
      altro: 'Altro',
      nonFornito: 'Non fornito',
      nonSpecificato: 'Non specificato'
    },
    en: {
      heroBadge: 'We Are Here for You',
      heroTitle: 'Contact Us',
      heroDesc: 'We are here to help you realize your digital project. Fill out the form or contact us directly, we will respond as soon as possible.',
      infoTitle: 'Contact',
      infoSpan: 'Information',
      infoDesc: 'Choose the contact method you prefer. We are available to answer all your questions.',
      email: 'Email',
      telefono: 'Phone',
      orari: 'Availability Hours',
      orariLunVen: 'Monday - Friday: 9:00 AM - 6:00 PM',
      orariSabato: 'Saturday: Closed',
      orariDomenica: 'Sunday: Closed',
      formTitle: 'Send us a',
      formSpan: 'message',
      nomeLabel: 'Full Name *',
      emailLabel: 'Email *',
      telefonoLabel: 'Phone',
      servizioLabel: 'Service of Interest',
      selezionaServizio: 'Select a service',
      messaggioLabel: 'Message *',
      nomePlaceholder: 'John Doe',
      emailPlaceholder: 'john.doe@example.com',
      telefonoPlaceholder: '+1 123 456 7890',
      messaggioPlaceholder: 'Tell us about your project...',
      inviaMessaggio: 'Send Message',
      invioCorso: 'Sending...',
      messaggioInviato: 'Message Sent!',
      messaggioInviatoDesc: 'We will respond as soon as possible.',
      errore: 'Error',
      erroreInvio: 'Error sending message. Please try again later or contact us directly.',
      sitoVetrina: 'Showcase Website',
      sitoPrenotazione: 'Booking Website',
      ecommerce: 'E-commerce',
      altro: 'Other',
      nonFornito: 'Not provided',
      nonSpecificato: 'Not specified'
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
          phone: formData.phone || t.nonFornito,
          service: formData.service || t.nonSpecificato,
          budget: t.nonSpecificato,
          deadline: t.nonSpecificato,
          message: formData.message,
          to_email: 'info@nemoagency.it', // Email di destinazione
        },
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      setIsSubmitted(true);
      setIsLoading(false);
      
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
    } catch (err) {
      console.error('Errore invio email:', err);
      setError(t.erroreInvio);
      setIsLoading(false);
    }
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
              <span className="text-sm font-medium">{t.heroBadge}</span>
            </div>

            <h1 className="font-bold leading-tight mb-6" style={{ fontSize: '60px' }}>
              {t.heroTitle}
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed">
              {t.heroDesc}
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
                  {t.infoTitle} <span className="text-[#ff7351]">{t.infoSpan}</span>
                </h2>
                <p className="text-gray-600 text-lg">
                  {t.infoDesc}
                </p>
              </div>

              <div className="space-y-6">
                <a 
                  href="mailto:info@nemoagency.it"
                  className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-[#ff7351]/5 transition-colors group border border-gray-200 hover:border-[#ff7351]"
                >
                  <div className="w-12 h-12 bg-[#ff7351]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#ff7351] group-hover:scale-110 transition-all">
                    <Mail className="w-6 h-6 text-[#ff7351] group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1 text-gray-900">{t.email}</h3>
                    <p className="text-gray-600 group-hover:text-[#ff7351] transition-colors">
                      info@nemoagency.it
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
                    <h3 className="font-semibold text-lg mb-1 text-gray-900">{t.telefono}</h3>
                    <p className="text-gray-600 group-hover:text-[#ff7351] transition-colors">
                      +39 346 574 5184
                    </p>
                  </div>
                </a>

                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="w-12 h-12 bg-[#ff7351]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#ff7351]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-900">{t.orari}</h3>
                    <div className="space-y-1 text-gray-600">
                      <p>{t.orariLunVen}</p>
                      <p>{t.orariSabato}</p>
                      <p>{t.orariDomenica}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div data-scroll className="bg-gray-50 rounded-2xl p-8 md:p-10 border border-gray-200 opacity-0 translate-y-8 transition-all duration-700">
              <h2 className="font-bold text-gray-900 mb-6" style={{ fontSize: '35px' }}>
                {t.formTitle} <span className="text-[#ff7351]">{t.formSpan}</span>
              </h2>
              
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-900">{t.errore}</p>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              )}

              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-900">{t.messaggioInviato}</p>
                    <p className="text-sm text-green-700">{t.messaggioInviatoDesc}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
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
                    placeholder={t.nomePlaceholder}
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
                    placeholder={t.emailPlaceholder}
                  />
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
                    placeholder={t.telefonoPlaceholder}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff7351] focus:border-transparent transition-all bg-white"
                  >
                    <option value="">{t.selezionaServizio}</option>
                    <option value="sito-vetrina">{t.sitoVetrina}</option>
                    <option value="sito-prenotazione">{t.sitoPrenotazione}</option>
                    <option value="e-commerce">{t.ecommerce}</option>
                    <option value="altro">{t.altro}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.messaggioLabel}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
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
                      <span>{t.inviaMessaggio}</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
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

