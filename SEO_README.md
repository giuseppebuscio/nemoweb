# Guida SEO - Nemo Web Agency

## ✅ Implementazione Completata

È stata implementata una soluzione SEO completa per il sito Nemo Web Agency.

### Componenti Creati

1. **`src/components/SEO.jsx`** - Componente SEO dinamico che gestisce tutti i meta tag
2. **`src/config/seoConfig.js`** - File di configurazione con tutti i dati SEO per ogni pagina

### File Aggiornati

1. **`src/App.jsx`** - Aggiunto il componente SEO (sostituisce PageTitle)
2. **`index.html`** - Aggiornato con meta tags base, Open Graph e Twitter Cards
3. **`public/robots.txt`** - Creato per indicizzare correttamente il sito
4. **`public/sitemap.xml`** - Creato con tutte le pagine e varianti multilingua

## 📋 Cosa Include

### Meta Tags per Ogni Pagina

- ✅ **Title** - Titolo ottimizzato per ogni pagina
- ✅ **Description** - Meta description unica e ottimizzata
- ✅ **Keywords** - Parole chiave specifiche per ogni pagina
- ✅ **Canonical URL** - URL canonico per evitare contenuti duplicati
- ✅ **Robots** - Configurazione per motori di ricerca

### Open Graph (Social Sharing)

- ✅ **og:title** - Titolo per condivisioni social
- ✅ **og:description** - Descrizione per condivisioni social
- ✅ **og:image** - Immagine per condivisioni social (1200x630px consigliato)
- ✅ **og:type** - Tipo di contenuto
- ✅ **og:url** - URL canonico
- ✅ **og:locale** - Lingua della pagina

### Twitter Cards

- ✅ **twitter:card** - Tipo di card (summary_large_image)
- ✅ **twitter:title** - Titolo per Twitter
- ✅ **twitter:description** - Descrizione per Twitter
- ✅ **twitter:image** - Immagine per Twitter

### SEO Multilingua

- ✅ **Hreflang tags** - Per pagine IT e EN
- ✅ **x-default** - Lingua predefinita
- ✅ **Structured Data (JSON-LD)** - Dati strutturati per motori di ricerca

## 🔧 Configurazione Necessaria

### 1. Aggiorna il Dominio

In `src/config/seoConfig.js`, aggiorna:
```javascript
export const baseUrl = 'https://www.nemoagency.it'; // Il tuo dominio reale
```

### 2. Crea Immagine Social Sharing

Crea un'immagine Open Graph (`og-image.jpg`) di dimensioni 1200x630px e salvala in `public/og-image.jpg`.

Questa immagine verrà usata quando il sito viene condiviso su social media.

### 3. Aggiorna Informazioni Aziendali

In `src/components/SEO.jsx`, cerca e aggiorna:
- **Telefono aziendale**: `+39-XXX-XXX-XXXX` (circa riga 162)
- **Handle Twitter**: `@nemoagency` (circa riga 102) - se disponibile
- **Social Media URLs**: In `structuredData.sameAs` (circa riga 148)

### 4. Aggiorna Sitemap

Il file `public/sitemap.xml` include tutte le pagine. Ricorda di aggiornare la data `lastmod` quando pubblichi nuove versioni.

## 📊 Pagine Configurate

- ✅ Home (`/`)
- ✅ Chi Siamo (`/chi-siamo`)
- ✅ Servizi (`/servizi`)
- ✅ Contatti (`/contatti`)
- ✅ Richiedi Preventivo (`/richiedi-preventivo`)
- ✅ Privacy (`/privacy`)
- ✅ Cookie Policy (`/cookie-policy`)
- ✅ Termini e Condizioni (`/termini-condizioni`)

Ogni pagina ha:
- Titolo personalizzato (IT e EN)
- Descrizione personalizzata (IT e EN)
- Keywords specifiche (IT e EN)
- Slug/URL configurati

## 🎯 Prossimi Passi

1. **Crea l'immagine Open Graph** (1200x630px) e salvala come `public/og-image.jpg`
2. **Aggiorna il dominio** in `seoConfig.js` con il tuo dominio reale
3. **Aggiorna informazioni aziendali** (telefono, social media) nel componente SEO
4. **Testa le condivisioni social** usando [Facebook Debugger](https://developers.facebook.com/tools/debug/) e [Twitter Card Validator](https://cards-dev.twitter.com/validator)
5. **Verifica la sitemap** visitando `https://tuodominio.it/sitemap.xml`
6. **Verifica robots.txt** visitando `https://tuodominio.it/robots.txt`

## 🔍 Testing SEO

- **Google Search Console**: Aggiungi e verifica il tuo sito
- **Google Rich Results Test**: Testa i dati strutturati
- **PageSpeed Insights**: Verifica le performance
- **Lighthouse**: Test SEO integrato in Chrome DevTools

## 📝 Note Importanti

- Il componente SEO si aggiorna automaticamente quando cambi pagina o lingua
- Tutti i meta tag vengono gestiti dinamicamente
- La configurazione è centralizzata in `seoConfig.js` per facile modifica
- Gli slug sono già configurati per supportare routing multilingua futuro (`/en/*`)

## 🛠️ Personalizzazione

Per aggiungere o modificare dati SEO di una pagina, modifica `src/config/seoConfig.js` nella sezione `pages`.

Per personalizzare il comportamento del componente SEO, modifica `src/components/SEO.jsx`.
