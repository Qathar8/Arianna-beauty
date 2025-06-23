/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'rose-gold': '#d4a373',
        'rose-gold-light': '#e8c4a0',
        'rose-gold-dark': '#b8956b',
        'warm-amber': '#e5c2a4',
        'blush-pink': '#f4c2c2',
        'blush-light': '#faf0f0',
        'cream-white': '#fefefe',
        'deep-rose': '#c2185b',
        'bright-pink': '#e91e63',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};