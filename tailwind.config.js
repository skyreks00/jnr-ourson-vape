/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'electric-blue': '#35CFFF',
        'cotton-pink': '#FF7ACD',
        'dark-charcoal': '#111111',
        'soft-gray': '#D9D9D9',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'smoke': 'smoke 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #35CFFF, 0 0 10px #35CFFF' },
          '100%': { boxShadow: '0 0 20px #35CFFF, 0 0 30px #35CFFF, 0 0 40px #35CFFF' },
        },
        smoke: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0.3' },
          '50%': { opacity: '0.5' },
          '100%': { transform: 'translateY(-100px) scale(1.5)', opacity: '0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
