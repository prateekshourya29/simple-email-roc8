/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "accent-color": "#E54065",
        "background-color": "#F4F5F9",
        "border-color": "#CFD2DC",
        "text-color": "#636363",
        "filter-button-color": "#E1E4EA",
        "read-background": "#F2F2F2"
      },
    },
  },
  plugins: [],
}
