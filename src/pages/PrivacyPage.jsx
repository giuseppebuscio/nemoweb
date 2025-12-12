import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Shield, Cookie, FileText, Mail } from 'lucide-react';

const PrivacyPage = () => {
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
              <Shield className="w-4 h-4 text-[#ff7351]" />
              <span className="text-sm font-medium">Privacy & Legal</span>
            </div>

            <h1 className="font-bold leading-tight mb-6" style={{ fontSize: '60px' }}>
              Privacy, Cookie e <span className="text-[#ff7351]">Termini</span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed">
              Informativa sulla privacy, policy dei cookie e termini e condizioni d'uso del sito
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-scroll className="opacity-0 translate-y-8 transition-all duration-700">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#ff7351]/10 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#ff7351]" />
              </div>
              <h2 className="font-bold text-gray-900" style={{ fontSize: '35px' }}>
                Informativa sulla Privacy
              </h2>
            </div>

            <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Titolare del Trattamento</h3>
                <p>
                  Il titolare del trattamento dei dati personali è Nemo Web Agency. 
                  Per qualsiasi domanda relativa alla privacy, è possibile contattarci all'indirizzo email: 
                  <a href="mailto:nemowebagency@gmail.com" className="text-[#ff7351] hover:underline ml-1">
                    nemowebagency@gmail.com
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Dati Raccolti</h3>
                <p>
                  I dati personali che raccogliamo includono:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Nome e cognome</li>
                  <li>Indirizzo email</li>
                  <li>Numero di telefono (facoltativo)</li>
                  <li>Informazioni sul progetto richiesto</li>
                  <li>Dati di navigazione e cookie tecnici</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Finalità del Trattamento</h3>
                <p>
                  I dati personali vengono trattati per le seguenti finalità:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Rispondere alle richieste di informazioni e preventivi</li>
                  <li>Fornire assistenza e supporto ai clienti</li>
                  <li>Migliorare i servizi offerti</li>
                  <li>Rispettare obblighi di legge</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">4. Base Giuridica</h3>
                <p>
                  Il trattamento dei dati personali si basa sul consenso dell'interessato e sulla necessità 
                  di eseguire misure precontrattuali richieste dall'interessato stesso.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">5. Conservazione dei Dati</h3>
                <p>
                  I dati personali vengono conservati per il tempo necessario alle finalità per cui sono stati raccolti 
                  e in conformità con gli obblighi di legge. I dati utilizzati per finalità promozionali possono essere 
                  conservati fino alla revoca del consenso.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">6. Diritti dell'Interessato</h3>
                <p>
                  Ai sensi del GDPR, l'interessato ha diritto a:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Accedere ai propri dati personali</li>
                  <li>Richiedere la rettifica o la cancellazione dei dati</li>
                  <li>Opporsi al trattamento dei dati</li>
                  <li>Richiedere la limitazione del trattamento</li>
                  <li>Richiedere la portabilità dei dati</li>
                  <li>Revocare il consenso in qualsiasi momento</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">7. Comunicazione dei Dati</h3>
                <p>
                  I dati personali non vengono comunicati a terzi, salvo nei casi previsti dalla legge o quando 
                  necessario per l'erogazione dei servizi richiesti.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cookie Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-scroll className="opacity-0 translate-y-8 transition-all duration-700">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#ff7351]/10 rounded-xl flex items-center justify-center">
                <Cookie className="w-6 h-6 text-[#ff7351]" />
              </div>
              <h2 className="font-bold text-gray-900" style={{ fontSize: '35px' }}>
                Policy dei Cookie
              </h2>
            </div>

            <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Cosa sono i Cookie</h3>
                <p>
                  I cookie sono piccoli file di testo che i siti web memorizzano sul dispositivo dell'utente 
                  quando visita una pagina. Vengono utilizzati per migliorare l'esperienza di navigazione e 
                  fornire funzionalità personalizzate.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Tipi di Cookie Utilizzati</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Cookie Tecnici</h4>
                    <p>
                      Sono necessari per il funzionamento del sito e non possono essere disabilitati. 
                      Permettono la navigazione e l'utilizzo delle funzionalità base del sito.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Cookie di Prestazione</h4>
                    <p>
                      Raccolgono informazioni su come gli utenti utilizzano il sito per migliorare le prestazioni 
                      e l'esperienza utente.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Cookie di Funzionalità</h4>
                    <p>
                      Permettono al sito di ricordare le scelte dell'utente per fornire funzionalità migliorate e personalizzate.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Gestione dei Cookie</h3>
                <p>
                  È possibile gestire o disabilitare i cookie attraverso le impostazioni del proprio browser. 
                  Tuttavia, la disabilitazione di alcuni cookie potrebbe limitare la funzionalità del sito.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-scroll className="opacity-0 translate-y-8 transition-all duration-700">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#ff7351]/10 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#ff7351]" />
              </div>
              <h2 className="font-bold text-gray-900" style={{ fontSize: '35px' }}>
                Termini e Condizioni
              </h2>
            </div>

            <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Accettazione dei Termini</h3>
                <p>
                  L'accesso e l'utilizzo di questo sito web implicano l'accettazione dei presenti termini e condizioni. 
                  Se non si è d'accordo con questi termini, si prega di non utilizzare il sito.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Utilizzo del Sito</h3>
                <p>
                  Il sito è destinato esclusivamente a scopi informativi. L'utente si impegna a utilizzare il sito 
                  in modo legale e conforme a tutte le leggi e i regolamenti applicabili.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Proprietà Intellettuale</h3>
                <p>
                  Tutti i contenuti del sito, inclusi testi, immagini, loghi e design, sono di proprietà di Nemo Web Agency 
                  e sono protetti dalle leggi sul copyright e altre leggi sulla proprietà intellettuale.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">4. Servizi Offerti</h3>
                <p>
                  I servizi descritti sul sito sono soggetti a disponibilità. I prezzi e le specifiche possono essere 
                  modificati senza preavviso. Ogni progetto viene valutato singolarmente e il preventivo finale può 
                  differire dalle indicazioni generali presenti sul sito.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">5. Limitazione di Responsabilità</h3>
                <p>
                  Nemo Web Agency non è responsabile per eventuali danni derivanti dall'utilizzo o dall'impossibilità 
                  di utilizzare il sito. Il sito viene fornito "così com'è" senza garanzie di alcun tipo.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">6. Modifiche ai Termini</h3>
                <p>
                  Nemo Web Agency si riserva il diritto di modificare questi termini e condizioni in qualsiasi momento. 
                  Le modifiche entreranno in vigore dal momento della pubblicazione sul sito.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">7. Legge Applicabile</h3>
                <p>
                  Questi termini e condizioni sono governati dalla legge italiana. Qualsiasi controversia sarà di 
                  competenza esclusiva dei tribunali italiani.
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
              Domande sulla Privacy?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Se hai domande riguardo alla nostra privacy policy, ai cookie o ai termini e condizioni, 
              non esitare a contattarci.
            </p>
            <a
              href="mailto:nemowebagency@gmail.com"
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

export default PrivacyPage;

