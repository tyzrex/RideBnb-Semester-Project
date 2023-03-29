/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
  plugins: [require("daisyui")],
}
