import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Cookie, Mail } from 'lucide-react';

const CookiePolicyPage = () => {
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
              <Cookie className="w-4 h-4 text-[#ff7351]" />
              <span className="text-sm font-medium">Cookie Policy</span>
            </div>

            <h1 className="font-bold leading-tight mb-6" style={{ fontSize: '60px' }}>
              Cookie <span className="text-[#ff7351]">Policy</span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed">
              Informazioni dettagliate sull'utilizzo dei cookie nel nostro sito web
            </p>
          </div>
        </div>
      </section>

      {/* Cookie Content Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-scroll className="opacity-0 translate-y-8 transition-all duration-700">
            <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Cosa sono i Cookie</h2>
                <p className="leading-relaxed">
                  I cookie sono piccoli file di testo che i siti web memorizzano sul dispositivo dell'utente 
                  quando visita una pagina. Vengono utilizzati per migliorare l'esperienza di navigazione, 
                  fornire funzionalità personalizzate e raccogliere informazioni su come gli utenti utilizzano il sito.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Tipi di Cookie Utilizzati</h2>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">Cookie Tecnici</h3>
                    <p className="leading-relaxed mb-3">
                      Sono necessari per il funzionamento del sito e non possono essere disabilitati. 
                      Permettono la navigazione e l'utilizzo delle funzionalità base del sito, come l'accesso 
                      alle aree protette o il mantenimento della sessione dell'utente.
                    </p>
                    <p className="text-sm text-gray-600 italic">
                      Questi cookie non richiedono il consenso dell'utente in quanto sono essenziali per il funzionamento del sito.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">Cookie di Prestazione</h3>
                    <p className="leading-relaxed mb-3">
                      Raccolgono informazioni anonime su come gli utenti utilizzano il sito per migliorare le prestazioni 
                      e l'esperienza utente. Questi cookie ci aiutano a capire quali pagine sono più visitate, 
                      quanto tempo gli utenti trascorrono sul sito e se ci sono problemi tecnici.
                    </p>
                    <p className="text-sm text-gray-600 italic">
                      Questi cookie raccolgono dati in forma aggregata e anonima.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">Cookie di Funzionalità</h3>
                    <p className="leading-relaxed mb-3">
                      Permettono al sito di ricordare le scelte dell'utente (come lingua, regione o preferenze di visualizzazione) 
                      per fornire funzionalità migliorate e personalizzate. Questi cookie possono anche essere utilizzati per 
                      ricordare modifiche apportate alle dimensioni del testo, font e altre parti delle pagine web personalizzabili.
                    </p>
                    <p className="text-sm text-gray-600 italic">
                      Se non accetti questi cookie, alcune funzionalità potrebbero non essere disponibili.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Gestione dei Cookie</h2>
                <p className="leading-relaxed mb-4">
                  È possibile gestire o disabilitare i cookie attraverso le impostazioni del proprio browser. 
                  Tuttavia, la disabilitazione di alcuni cookie potrebbe limitare la funzionalità del sito o 
                  impedire l'utilizzo di determinate caratteristiche.
                </p>
                <p className="leading-relaxed mb-4">
                  Per maggiori informazioni su come gestire i cookie nei principali browser:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Google Chrome:</strong> Impostazioni → Privacy e sicurezza → Cookie e altri dati dei siti</li>
                  <li><strong>Mozilla Firefox:</strong> Opzioni → Privacy e sicurezza → Cookie e dati dei siti</li>
                  <li><strong>Safari:</strong> Preferenze → Privacy → Cookie e dati dei siti web</li>
                  <li><strong>Microsoft Edge:</strong> Impostazioni → Privacy, ricerca e servizi → Cookie e autorizzazioni sito</li>
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Cookie di Terze Parti</h2>
                <p className="leading-relaxed">
                  Alcuni servizi di terze parti utilizzati sul nostro sito possono impostare i propri cookie. 
                  Questi includono servizi di analytics, social media e altri servizi esterni. Non abbiamo controllo 
                  diretto su questi cookie e ti consigliamo di consultare le rispettive policy sulla privacy di questi servizi.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Aggiornamenti alla Cookie Policy</h2>
                <p className="leading-relaxed">
                  Ci riserviamo il diritto di modificare questa Cookie Policy in qualsiasi momento. 
                  Le modifiche entreranno in vigore dal momento della pubblicazione sul sito. 
                  Ti consigliamo di consultare periodicamente questa pagina per rimanere aggiornato.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div data-scroll className="opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="font-bold text-gray-900 mb-4" style={{ fontSize: '35px' }}>
              Domande sui Cookie?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Se hai domande riguardo alla nostra cookie policy, non esitare a contattarci.
            </p>
            <a
              href="mailto:info@nemoagency.it"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#ff7351] to-[#ff8466] text-white rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all"
            >
              <Mail className="w-5 h-5" />
              <span>Contattaci via mail</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CookiePolicyPage;

