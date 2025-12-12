import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FileText, Mail } from 'lucide-react';

const TerminiCondizioniPage = () => {
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
              <FileText className="w-4 h-4 text-[#ff7351]" />
              <span className="text-sm font-medium">Termini e Condizioni</span>
            </div>

            <h1 className="font-bold leading-tight mb-6" style={{ fontSize: '60px' }}>
              Termini e <span className="text-[#ff7351]">Condizioni</span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed">
              Termini e condizioni d'uso del sito web di Nemo Web Agency
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-scroll className="opacity-0 translate-y-8 transition-all duration-700">
            <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Accettazione dei Termini</h2>
                <p className="leading-relaxed">
                  L'accesso e l'utilizzo di questo sito web implicano l'accettazione dei presenti termini e condizioni. 
                  Se non si è d'accordo con questi termini, si prega di non utilizzare il sito. Continuando a navigare 
                  o utilizzare il sito, si accetta di essere vincolati dai presenti termini.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Utilizzo del Sito</h2>
                <p className="leading-relaxed mb-3">
                  Il sito è destinato esclusivamente a scopi informativi e per la richiesta di preventivi e consulenze. 
                  L'utente si impegna a utilizzare il sito in modo legale e conforme a tutte le leggi e i regolamenti applicabili.
                </p>
                <p className="leading-relaxed">
                  È vietato utilizzare il sito per scopi illegali, fraudolenti o in qualsiasi modo che possa danneggiare, 
                  disabilitare, sovraccaricare o compromettere il funzionamento del sito o interferire con l'utilizzo del sito da parte di altri utenti.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Proprietà Intellettuale</h2>
                <p className="leading-relaxed mb-3">
                  Tutti i contenuti del sito, inclusi testi, immagini, loghi, design, grafica, video, audio, software e altri materiali, 
                  sono di proprietà di Nemo Web Agency o dei suoi licenzianti e sono protetti dalle leggi sul copyright, 
                  marchi di fabbrica e altre leggi sulla proprietà intellettuale.
                </p>
                <p className="leading-relaxed">
                  È vietato riprodurre, distribuire, modificare, creare opere derivate, pubblicare, eseguire, visualizzare pubblicamente 
                  o utilizzare in qualsiasi modo i contenuti del sito senza il previo consenso scritto di Nemo Web Agency.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Servizi Offerti</h2>
                <p className="leading-relaxed mb-3">
                  I servizi descritti sul sito sono soggetti a disponibilità e possono essere modificati o sospesi in qualsiasi momento 
                  senza preavviso. I prezzi e le specifiche possono essere modificati senza preavviso.
                </p>
                <p className="leading-relaxed mb-3">
                  Ogni progetto viene valutato singolarmente e il preventivo finale può differire dalle indicazioni generali presenti sul sito. 
                  I preventivi sono validi per un periodo limitato e possono essere rivisti in base alle esigenze specifiche del progetto.
                </p>
                <p className="leading-relaxed">
                  Nemo Web Agency si riserva il diritto di rifiutare qualsiasi richiesta di servizio a sua discrezione.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Limitazione di Responsabilità</h2>
                <p className="leading-relaxed mb-3">
                  Nemo Web Agency non è responsabile per eventuali danni diretti, indiretti, incidentali, consequenziali o punitivi 
                  derivanti dall'utilizzo o dall'impossibilità di utilizzare il sito.
                </p>
                <p className="leading-relaxed mb-3">
                  Il sito viene fornito "così com'è" e "come disponibile" senza garanzie di alcun tipo, esplicite o implicite, 
                  inclusa ma non limitata alle garanzie di commerciabilità, idoneità per uno scopo particolare o non violazione.
                </p>
                <p className="leading-relaxed">
                  Nemo Web Agency non garantisce che il sito sarà sempre disponibile, sicuro, privo di errori o che eventuali 
                  difetti verranno corretti.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Link a Siti di Terze Parti</h2>
                <p className="leading-relaxed">
                  Il sito può contenere link a siti web di terze parti. Questi link sono forniti solo per convenienza e 
                  Nemo Web Agency non ha controllo sul contenuto di questi siti. Non siamo responsabili per il contenuto, 
                  le politiche sulla privacy o le pratiche di qualsiasi sito di terze parti.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Modifiche ai Termini</h2>
                <p className="leading-relaxed">
                  Nemo Web Agency si riserva il diritto di modificare questi termini e condizioni in qualsiasi momento. 
                  Le modifiche entreranno in vigore dal momento della pubblicazione sul sito. 
                  È responsabilità dell'utente consultare periodicamente questi termini per rimanere informato sulle modifiche.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Risoluzione delle Controversie</h2>
                <p className="leading-relaxed mb-3">
                  Qualsiasi controversia derivante da o correlata a questi termini o all'utilizzo del sito sarà risolta 
                  attraverso negoziazione di buona fede tra le parti.
                </p>
                <p className="leading-relaxed">
                  Se non è possibile raggiungere una risoluzione attraverso la negoziazione, le controversie saranno 
                  sottoposte alla competenza esclusiva dei tribunali competenti.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">9. Legge Applicabile</h2>
                <p className="leading-relaxed">
                  Questi termini e condizioni sono governati e interpretati in conformità con le leggi italiane. 
                  Qualsiasi controversia sarà di competenza esclusiva dei tribunali italiani.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">10. Contatti</h2>
                <p className="leading-relaxed">
                  Per qualsiasi domanda o chiarimento riguardo questi termini e condizioni, è possibile contattarci all'indirizzo email: 
                  <a href="mailto:info@nemoagency.it" className="text-[#ff7351] hover:underline ml-1">
                    info@nemoagency.it
                  </a>
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
              Domande sui Termini?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Se hai domande riguardo ai nostri termini e condizioni, non esitare a contattarci.
            </p>
            <a
              href="mailto:info@nemoagency.it"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#ff7351] to-[#ff8466] text-white rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all"
            >
              <Mail className="w-5 h-5" />
              <span>Contattaci</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TerminiCondizioniPage;

