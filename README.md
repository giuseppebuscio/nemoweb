# Nemoweb - Sito Web React + Vite + Tailwind

Un sito web moderno e responsive creato con React, Vite, Tailwind CSS e Lucide React, caratterizzato da un design elegante e funzionalità complete.

## 🚀 Caratteristiche

- **Design Moderno**: Interfaccia pulita e professionale con Tailwind CSS
- **Responsive**: Ottimizzato per tutti i dispositivi
- **Performance**: Build veloce con Vite
- **Icone**: Icone moderne da Lucide React
- **Font**: Montserrat per un aspetto elegante
- **Componenti Modulari**: Struttura organizzata e riutilizzabile
- **Animazioni Fluide**: Transizioni e hover effects
- **Form di Contatto**: Funzionale e user-friendly
- **SEO Ready**: Struttura ottimizzata per i motori di ricerca

## 📋 Sezioni del Sito

1. **Home**: Hero section, servizi, prezzi, contatti
2. **Servizi**: Dettagli dei servizi offerti
3. **Chi Siamo**: Storia dell'azienda, team, valori
4. **Contatti**: Form di contatto e informazioni
5. **Richiedi Preventivo**: Form per richiedere preventivi personalizzati

## 🛠️ Tecnologie Utilizzate

- **React 18**: Framework JavaScript
- **Vite**: Build tool veloce e moderno
- **Tailwind CSS**: Framework CSS utility-first
- **Lucide React**: Libreria di icone moderne
- **React Router**: Routing per SPA
- **Font Montserrat**: Typography elegante

## 📦 Installazione

1. **Installa le dipendenze**:
   ```bash
   npm install
   ```

2. **Avvia il server di sviluppo**:
   ```bash
   npm run dev
   ```

3. **Apri il browser**:
   Naviga su `http://localhost:3000`

## 🏗️ Build per Produzione

Per creare una versione ottimizzata per la produzione:

```bash
npm run build
```

I file ottimizzati saranno creati nella cartella `dist/`.

Per visualizzare in anteprima la build:

```bash
npm run preview
```

## 📁 Struttura del Progetto

```
nemoweb/
├── public/
│   ├── index.html
│   ├── manifest.json
│   ├── *.jpg, *.png (immagini e risorse)
│   └── partner/ (loghi partner)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── LoadingScreen.jsx
│   │   ├── PageTransitionLoader.jsx
│   │   └── ScrollToTop.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── ServiziPage.jsx
│   │   ├── ChiSiamoPage.jsx
│   │   ├── ContattiPage.jsx
│   │   └── RichiediPreventivoPage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

## 🎨 Personalizzazione

### Colori

I colori principali sono definiti in `tailwind.config.js`:

```js
colors: {
  primary: '#FF7351',
  secondary: '#F96AB1',
  accent: '#FFD700',
  dark: '#1d1d1f',
  light: '#86868b',
}
```

### Font

Il font Montserrat è già configurato e caricato da Google Fonts. È definito come font principale del progetto.

### Icone

Le icone utilizzate provengono da Lucide React. Per aggiungere nuove icone:

```jsx
import { IconName } from 'lucide-react';

<IconName className="w-6 h-6" />
```

## 📱 Responsive Design

Il sito è completamente responsive e si adatta a:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)

Tailwind CSS fornisce utility class per gestire il responsive design facilmente.

## 🚀 Comandi Disponibili

- `npm run dev`: Avvia il server di sviluppo
- `npm run build`: Crea la build per produzione
- `npm run preview`: Anteprima della build di produzione

## 📞 Supporto

Per domande o supporto, contatta:
- Email: nemowebagency@gmail.com
- Telefono: +39 346 574 5184

## 📄 Licenza

Questo progetto è rilasciato sotto licenza MIT.

---

**Sviluppato con ❤️ in Italia**
