import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getSeoData, getCanonicalUrl, baseUrl } from '../config/seoConfig';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  type = 'website',
  noindex = false 
}) => {
  const location = useLocation();
  const { language } = useLanguage();
  const path = location.pathname;

  useEffect(() => {
    // Ottieni i dati SEO dalla configurazione
    const seoData = getSeoData(path, language);
    
    // Usa i valori passati come props o quelli dalla configurazione
    const finalTitle = title || seoData.title;
    const finalDescription = description || seoData.description;
    const finalKeywords = keywords || seoData.keywords;
    const finalImage = image || seoData.ogImage;
    const canonical = seoData.canonical;
    const locale = seoData.locale;

    const siteName = 'Nemo Web Agency';

    // Aggiorna il titolo
    document.title = finalTitle;

    // Funzione helper per aggiornare o creare meta tag
    const updateMetaTag = (property, content, isProperty = false) => {
      const selector = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`;
      let element = document.querySelector(selector);
      
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', property);
        } else {
          element.setAttribute('name', property);
        }
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Funzione helper per aggiornare o creare link tag
    const updateLinkTag = (rel, href, hreflang = null) => {
      let selector = `link[rel="${rel}"]`;
      if (hreflang) {
        selector += `[hreflang="${hreflang}"]`;
      }
      let element = document.querySelector(selector);
      
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        if (hreflang) {
          element.setAttribute('hreflang', hreflang);
        }
        document.head.appendChild(element);
      }
      
      element.setAttribute('href', href);
    };

    // Meta tags base
    updateMetaTag('description', finalDescription);
    updateMetaTag('keywords', finalKeywords);
    updateMetaTag('author', 'Nemo Web Agency');

    // Robots meta tag
    if (noindex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      updateMetaTag('robots', 'index, follow');
    }

    // Open Graph tags
    updateMetaTag('og:title', finalTitle, true);
    updateMetaTag('og:description', finalDescription, true);
    updateMetaTag('og:image', finalImage, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', canonical, true);
    updateMetaTag('og:site_name', siteName, true);
    updateMetaTag('og:locale', locale, true);

    // Note: If you implement language-based routing (e.g., /en/*), update these accordingly

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', finalTitle);
    updateMetaTag('twitter:description', finalDescription);
    updateMetaTag('twitter:image', finalImage);
    updateMetaTag('twitter:site', '@nemoagency'); // Aggiorna con il tuo handle

    // Canonical URL
    updateLinkTag('canonical', canonical);

    // Hreflang tags per SEO multilingua
    const itCanonical = getCanonicalUrl(path, 'it');
    const enCanonical = getCanonicalUrl(path, 'en');
    
    let hreflangIt = document.querySelector('link[rel="alternate"][hreflang="it"]');
    if (!hreflangIt) {
      hreflangIt = document.createElement('link');
      hreflangIt.setAttribute('rel', 'alternate');
      hreflangIt.setAttribute('hreflang', 'it');
      document.head.appendChild(hreflangIt);
    }
    hreflangIt.setAttribute('href', itCanonical);

    let hreflangEn = document.querySelector('link[rel="alternate"][hreflang="en"]');
    if (!hreflangEn) {
      hreflangEn = document.createElement('link');
      hreflangEn.setAttribute('rel', 'alternate');
      hreflangEn.setAttribute('hreflang', 'en');
      document.head.appendChild(hreflangEn);
    }
    hreflangEn.setAttribute('href', enCanonical);

    let hreflangXDefault = document.querySelector('link[rel="alternate"][hreflang="x-default"]');
    if (!hreflangXDefault) {
      hreflangXDefault = document.createElement('link');
      hreflangXDefault.setAttribute('rel', 'alternate');
      hreflangXDefault.setAttribute('hreflang', 'x-default');
      document.head.appendChild(hreflangXDefault);
    }
    hreflangXDefault.setAttribute('href', itCanonical);

    // Structured Data (JSON-LD) per Organization
    let jsonLdScript = document.querySelector('script[type="application/ld+json"][data-seo]');
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.setAttribute('type', 'application/ld+json');
      jsonLdScript.setAttribute('data-seo', 'true');
      document.head.appendChild(jsonLdScript);
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': siteName,
      'url': baseUrl,
      'logo': `${baseUrl}/logo-512x512.png`,
      'description': finalDescription,
      'sameAs': [
        // Aggiungi i tuoi social media qui
        // 'https://www.facebook.com/nemoagency',
        // 'https://www.instagram.com/nemoagency',
        // 'https://www.linkedin.com/company/nemoagency'
      ],
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+39-XXX-XXX-XXXX', // Aggiorna con il tuo numero reale
        'contactType': 'customer service',
        'availableLanguage': ['Italian', 'English']
      },
      'address': {
        '@type': 'PostalAddress',
        'addressCountry': 'IT',
        'addressRegion': 'Sicilia'
      }
    };

    // Se siamo su una pagina specifica, aggiungi anche WebSite/BreadcrumbList
    if (path !== '/') {
      structuredData['@type'] = 'WebPage';
      structuredData.name = finalTitle;
      structuredData.description = finalDescription;
      structuredData.url = canonical;
      structuredData.inLanguage = language === 'it' ? 'it-IT' : 'en-US';
      structuredData.isPartOf = {
        '@type': 'WebSite',
        'name': siteName,
        'url': baseUrl
      };
    }

    jsonLdScript.textContent = JSON.stringify(structuredData);

    // Aggiorna lang attribute sull'elemento html
    document.documentElement.lang = language === 'it' ? 'it' : 'en';

  }, [path, language, title, description, keywords, image, type, noindex]);

  return null;
};

export default SEO;
