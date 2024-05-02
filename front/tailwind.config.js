/** @type {import('tailwindcss').Config} */

export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      colors: {
        "primary": "#032541",
        "primaryBlack": "#0b1215",
        "secondary": "#1b4569",
        "tertiary": "#60a5fa",
        "newWhite": "#e3e3e3",
        "newBlack": "#1f1f1f",
        "primaryBg": "#141A1F",
        "border": "#d9d9d9",
        "primaryOnHover": "#1a5415",
        "bodyColor": "#737373",
        "shadow": "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(20,26,31,1) 61%)"
      },
      fontFamily: {
        "title": ["Figtree", "sans-serif"],
        "body": ["Figtree", "sans-serif"]
      },
      fontSize: {
        "movieSlideTitle": "36px",
        "navTitle": "34px",
        "title": "28px",
        "subTitle": "20px",
        "smallDevicesTitle": "18px",
        "extraSmallTitle": "16",
        "body": "14px",
        "subBody": "12px",
        "links": "16px",
        "subLinks": "12px",
        "iconSize": "24px",
        "smallIconSize": "20px"
      },
    }
  },
  plugins: [],

}