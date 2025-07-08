# Nemoweb - Sito Web React

Un sito web moderno e responsive creato con React, caratterizzato da un design elegante e funzionalità complete.

## 🚀 Caratteristiche

- **Design Moderno**: Interfaccia pulita e professionale
- **Responsive**: Ottimizzato per tutti i dispositivi
- **Componenti Modulari**: Struttura organizzata e riutilizzabile
- **Animazioni Fluide**: Transizioni e hover effects
- **Form di Contatto**: Funzionale e user-friendly
- **SEO Ready**: Struttura ottimizzata per i motori di ricerca

## 📋 Sezioni del Sito

1. **Header**: Navigazione fissa con menu responsive
2. **Hero**: Sezione di benvenuto con call-to-action
3. **Features**: Presentazione dei servizi principali
4. **About**: Informazioni sull'azienda
5. **Contact**: Form di contatto e informazioni
6. **Footer**: Link utili e copyright

## 🛠️ Tecnologie Utilizzate

- React 18
- CSS3 con Flexbox e Grid
- HTML5 semantico
- JavaScript ES6+

## 📦 Installazione

1. **Clona il repository**:
   ```bash
   git clone <url-repository>
   cd nemoweb
   ```

2. **Installa le dipendenze**:
   ```bash
   npm install
   ```

3. **Avvia il server di sviluppo**:
   ```bash
   npm start
   ```

4. **Apri il browser**:
   Naviga su `http://localhost:3000`

## 🏗️ Struttura del Progetto

```
nemoweb/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Header.css
│   │   ├── Hero.js
│   │   ├── Hero.css
│   │   ├── Features.js
│   │   ├── Features.css
│   │   ├── About.js
│   │   ├── About.css
│   │   ├── Contact.js
│   │   ├── Contact.css
│   │   ├── Footer.js
│   │   └── Footer.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🎨 Personalizzazione

### Colori
I colori principali sono definiti tramite CSS custom properties. Puoi modificarli in `src/index.css`:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --accent-color: #ffd700;
}
```

### Contenuti
Modifica i testi direttamente nei componenti React:
- `src/components/Hero.js` - Titolo e sottotitolo principale
- `src/components/Features.js` - Lista dei servizi
- `src/components/About.js` - Informazioni aziendali
- `src/components/Contact.js` - Dati di contatto

## 📱 Responsive Design

Il sito è completamente responsive e si adatta a:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🚀 Build per Produzione

Per creare una versione ottimizzata per la produzione:

```bash
npm run build
```

I file ottimizzati saranno creati nella cartella `build/`.

## 📞 Supporto

Per domande o supporto, contatta:
- Email: info@nemoweb.it
- Telefono: +39 123 456 7890

## 📄 Licenza

Questo progetto è rilasciato sotto licenza MIT.

---

**Sviluppato con ❤️ in Italia** 