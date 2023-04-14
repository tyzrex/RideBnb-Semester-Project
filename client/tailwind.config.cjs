/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}", "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'main-bg': "#FFFFFF",
        'main-fg': "#FAFAFA",
        'main-text': "#000000",
        'main-accent': "#000000",
      },
    },
  },
  plugins: [require("preline/plugin")],
}
