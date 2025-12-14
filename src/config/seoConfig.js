// Configurazione SEO per tutte le pagine del sito

export const baseUrl = 'https://www.nemoagency.it'; // Aggiorna con il tuo dominio reale

export const seoConfig = {
  default: {
    siteName: 'Nemo Web Agency',
    siteDescription: {
      it: 'Agenzia web specializzata nella creazione di siti web professionali, moderni e orientati ai risultati. Siti vetrina, e-commerce e sistemi di prenotazione dal 2016.',
      en: 'Web agency specialized in creating professional, modern and results-oriented websites. Showcase websites, e-commerce and booking systems since 2016.'
    },
    keywords: {
      it: 'web agency, siti web, sviluppo web, e-commerce, siti prenotazione, web design, Sicilia, agenzia digitale, siti vetrina, web development',
      en: 'web agency, websites, web development, e-commerce, booking websites, web design, Sicily, digital agency, showcase websites'
    },
    author: 'Nemo Web Agency',
    ogImage: `${baseUrl}/og-image.jpg`, // Crea questa immagine (1200x630px)
    twitterCard: 'summary_large_image',
    twitterSite: '@nemoagency', // Aggiorna con il tuo handle Twitter se disponibile
    locale: {
      it: 'it_IT',
      en: 'en_US'
    }
  },
  pages: {
    '/': {
      title: {
        it: 'Nemo Web Agency - Creiamo il Tuo Successo Digitale',
        en: 'Nemo Web Agency - We Create Your Digital Success'
      },
      description: {
        it: 'Sviluppiamo soluzioni digitali innovative con design moderno e tecnologie all\'avanguardia. Siti web professionali, e-commerce e sistemi di prenotazione per far crescere il tuo business online.',
        en: 'We develop innovative digital solutions with modern design and cutting-edge technologies. Professional websites, e-commerce and booking systems to grow your online business.'
      },
      keywords: {
        it: 'web agency Sicilia, siti web professionali, sviluppo siti web, agenzia digitale, e-commerce Sicilia, siti prenotazione, web design moderno, sviluppo web',
        en: 'web agency Sicily, professional websites, website development, digital agency, e-commerce Sicily, booking websites, modern web design, web development'
      },
      slug: {
        it: '',
        en: '/en'
      }
    },
    '/chi-siamo': {
      title: {
        it: 'Chi Siamo - Nemo Web Agency | La Nostra Storia',
        en: 'About Us - Nemo Web Agency | Our Story'
      },
      description: {
        it: 'Siamo Nemo Web Agency, un\'agenzia digitale specializzata nella creazione di siti web professionali dal 2016. Scopri la nostra mission, i nostri valori e il nostro team.',
        en: 'We are Nemo Web Agency, a digital agency specialized in creating professional websites since 2016. Discover our mission, our values and our team.'
      },
      keywords: {
        it: 'chi siamo nemo web agency, agenzia web Sicilia, team sviluppo web, storia agenzia digitale, mission web agency',
        en: 'about us nemo web agency, web agency Sicily, web development team, digital agency story, web agency mission'
      },
      slug: {
        it: '/chi-siamo',
        en: '/en/about-us'
      }
    },
    '/servizi': {
      title: {
        it: 'Servizi Web - Siti Vetrina, E-commerce e Prenotazione | Nemo Web Agency',
        en: 'Web Services - Showcase, E-commerce and Booking Websites | Nemo Web Agency'
      },
      description: {
        it: 'Offriamo servizi completi per ogni esigenza digitale: siti vetrina, sistemi di prenotazione ed e-commerce. Soluzioni personalizzate e moderne per il tuo business.',
        en: 'We offer complete services for every digital need: showcase websites, booking systems and e-commerce. Customized and modern solutions for your business.'
      },
      keywords: {
        it: 'servizi web, siti vetrina prezzi, e-commerce Sicilia, sistemi prenotazione online, sviluppo siti web, web design personalizzato',
        en: 'web services, showcase website prices, e-commerce Sicily, online booking systems, website development, custom web design'
      },
      slug: {
        it: '/servizi',
        en: '/en/services'
      }
    },
    '/contatti': {
      title: {
        it: 'Contatti - Richiedi una Consulenza Gratuita | Nemo Web Agency',
        en: 'Contact Us - Request a Free Consultation | Nemo Web Agency'
      },
      description: {
        it: 'Contattaci per una consulenza gratuita sul tuo progetto digitale. Siamo disponibili per rispondere a tutte le tue domande e aiutarti a realizzare la tua presenza online.',
        en: 'Contact us for a free consultation on your digital project. We are available to answer all your questions and help you create your online presence.'
      },
      keywords: {
        it: 'contatti web agency, consulenza gratuita, preventivo sito web, contattare nemo web agency',
        en: 'web agency contact, free consultation, website quote, contact nemo web agency'
      },
      slug: {
        it: '/contatti',
        en: '/en/contact'
      }
    },
    '/richiedi-preventivo': {
      title: {
        it: 'Richiedi un Preventivo - Servizi Web Professionali | Nemo Web Agency',
        en: 'Request a Quote - Professional Web Services | Nemo Web Agency'
      },
      description: {
        it: 'Richiedi un preventivo gratuito per il tuo sito web. Compila il form con i dettagli del tuo progetto e riceverai una proposta personalizzata in tempi brevi.',
        en: 'Request a free quote for your website. Fill out the form with your project details and you will receive a customized proposal quickly.'
      },
      keywords: {
        it: 'preventivo sito web, preventivo gratuito, preventivo e-commerce, preventivo sito prenotazione, richiesta preventivo',
        en: 'website quote, free quote, e-commerce quote, booking website quote, quote request'
      },
      slug: {
        it: '/richiedi-preventivo',
        en: '/en/request-quote'
      }
    },
    '/privacy': {
      title: {
        it: 'Privacy Policy - Informativa sulla Privacy | Nemo Web Agency',
        en: 'Privacy Policy - Privacy Information | Nemo Web Agency'
      },
      description: {
        it: 'Informativa sulla privacy di Nemo Web Agency. Come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali.',
        en: 'Nemo Web Agency privacy policy. How we collect, use and protect your personal data.'
      },
      keywords: {
        it: 'privacy policy, informativa privacy, trattamento dati personali, GDPR',
        en: 'privacy policy, privacy information, personal data processing, GDPR'
      },
      slug: {
        it: '/privacy',
        en: '/en/privacy'
      }
    },
    '/cookie-policy': {
      title: {
        it: 'Cookie Policy - Informativa sui Cookie | Nemo Web Agency',
        en: 'Cookie Policy - Cookie Information | Nemo Web Agency'
      },
      description: {
        it: 'Informativa sui cookie utilizzati dal sito web di Nemo Web Agency. Scopri come utilizziamo i cookie e come gestirli.',
        en: 'Information about cookies used on Nemo Web Agency website. Learn how we use cookies and how to manage them.'
      },
      keywords: {
        it: 'cookie policy, informativa cookie, gestione cookie, privacy cookie',
        en: 'cookie policy, cookie information, cookie management, cookie privacy'
      },
      slug: {
        it: '/cookie-policy',
        en: '/en/cookie-policy'
      }
    },
    '/termini-condizioni': {
      title: {
        it: 'Termini e Condizioni - Condizioni di Utilizzo | Nemo Web Agency',
        en: 'Terms and Conditions - Terms of Use | Nemo Web Agency'
      },
      description: {
        it: 'Termini e condizioni di utilizzo del sito web di Nemo Web Agency. Leggi le condizioni che regolano l\'uso dei nostri servizi.',
        en: 'Terms and conditions of use of Nemo Web Agency website. Read the conditions that govern the use of our services.'
      },
      keywords: {
        it: 'termini e condizioni, condizioni di utilizzo, termini di servizio',
        en: 'terms and conditions, terms of use, terms of service'
      },
      slug: {
        it: '/termini-condizioni',
        en: '/en/terms-conditions'
      }
    },
    '/sitemap': {
      title: {
        it: 'Sitemap - Mappa del Sito | Nemo Web Agency',
        en: 'Sitemap - Site Map | Nemo Web Agency'
      },
      description: {
        it: 'Naviga facilmente attraverso tutte le pagine del sito web di Nemo Web Agency. Mappa completa del sito con tutte le sezioni e pagine disponibili.',
        en: 'Easily navigate through all pages of Nemo Web Agency website. Complete site map with all available sections and pages.'
      },
      keywords: {
        it: 'sitemap, mappa del sito, navigazione sito, struttura sito web',
        en: 'sitemap, site map, site navigation, website structure'
      },
      slug: {
        it: '/sitemap',
        en: '/en/sitemap'
      }
    }
  }
};

// Helper function per ottenere l'URL canonico
export const getCanonicalUrl = (path, language = 'it') => {
  const pageConfig = seoConfig.pages[path] || seoConfig.pages['/'];
  const slug = pageConfig.slug?.[language] || path;
  return `${baseUrl}${slug}`;
};

// Helper function per ottenere i dati SEO di una pagina
export const getSeoData = (path, language = 'it') => {
  const pageConfig = seoConfig.pages[path] || seoConfig.pages['/'];
  return {
    title: pageConfig.title?.[language] || seoConfig.default.siteName,
    description: pageConfig.description?.[language] || seoConfig.default.siteDescription[language],
    keywords: pageConfig.keywords?.[language] || seoConfig.default.keywords[language],
    slug: pageConfig.slug?.[language] || path,
    canonical: getCanonicalUrl(path, language),
    ogImage: pageConfig.ogImage || seoConfig.default.ogImage,
    locale: seoConfig.default.locale[language]
  };
};
