/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#FFC900',
          dark: '#E5B500',
          light: '#FFD633'
        },
        black: {
          DEFAULT: '#050505',
          light: '#1A1A1A',
          lighter: '#333333'
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
