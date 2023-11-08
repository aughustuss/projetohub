/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary":"#14ff00",
        "secondary":"#f6f6f6",
        "tertiary": "#000",
      },
      fontFamily:{
        
      }
    },
  },
  plugins: [],
}