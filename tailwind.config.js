/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        primary: '#FF7351',
        secondary: '#F96AB1',
        accent: '#FFD700',
        dark: '#1d1d1f',
        light: '#86868b',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #FF7351 0%, #F96AB1 100%)',
        'gradient-secondary': 'linear-gradient(45deg, #FF7351 0%, #F96AB1 50%, #FF7351 100%)',
      },
    },
  },
  plugins: [],
}

