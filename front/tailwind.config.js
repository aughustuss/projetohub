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
        "title": ["Poppins","sans-serif"],
        "body": ["Mulish","sans-serif"]
      },
      fontSize: {
        "navTitle":"28px",
        "title": "24px",
        "subTitle": "",
        "body":"",
        "subBody":"",
        "links":"16px",
        "subLinks":""
      },
    }
  },
  plugins: [],
}