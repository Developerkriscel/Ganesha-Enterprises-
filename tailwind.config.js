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
          dark: '#081a30',
          charcoal: '#0f2a4a',
          stone: '#17375e',
          muted: '#56667a',
          border: '#dbe4ee',
          'border-light': '#e6edf5',
          cream: '#f7f9fc',
          ivory: '#edf3f9',
          amber: '#1f66a8',
          gold: '#15b498',
          copper: '#15b498',
          accent: '#0f2a4a',
        }
      },
      fontFamily: {
        serif: ['Poppins', 'system-ui', 'sans-serif'],
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        widest: '0.18em',
      },
      boxShadow: {
        'premium': '0 20px 40px -15px rgba(15, 42, 74, 0.08)',
        'premium-hover': '0 30px 60px -12px rgba(15, 42, 74, 0.14)',
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}

