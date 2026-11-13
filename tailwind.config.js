/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0c0d0e',
          charcoal: '#18191b',
          stone: '#27282b',
          muted: '#686a71',
          border: '#e4e2dd',
          'border-light': '#eceae5',
          cream: '#faf8f5',
          ivory: '#f4f1ea',
          amber: '#b8860b',
          gold: '#c59b27',
          copper: '#c27848',
          accent: '#1e3a8a',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Cinzel"', '"Playfair Display"', 'serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        widest: '0.18em',
      },
      boxShadow: {
        'premium': '0 20px 40px -15px rgba(0, 0, 0, 0.07)',
        'premium-hover': '0 30px 60px -12px rgba(0, 0, 0, 0.12)',
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}

