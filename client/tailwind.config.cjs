/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    "node_modules/preline/dist/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "light-hero-pattern": "url('./src/assets/lightpattern.jpg')",
        "dark-hero-pattern": "url('./src/assets/pattern.jpg')",
      },
      colors: {
        "main-bg": "#FFFFFF",
        "main-fg": "#FAFAFA",
        "main-text": "#000000",
        "main-accent": "#000000",
        "gray-accent": "#b1b5c3",
        "light-main": "#fcfcfc",
        "dark-main": "#01050e",
        "dark-secondary": "rgb(3 7 18);",
        "accent-1": "#47a1db",
        "accent-2": "#00887a",
        "accent-3": "#bbdbf0",
        "accent-4": "#7a5b72",
      },
      screens: {
        xs: "425px",
      },
    },
  },
  plugins: [require("preline/plugin")],
};
