/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

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
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities(
        {
          ".custom-scrollbar": {
            /* ===== Scrollbar CSS ===== */
            /* Firefox */
            "&": {
              "scrollbar-width": "8px",
              "scrollbar-color": "#E54065 #ffffff",
            },

            /* Chrome, Edge, and Safari */
            "&::-webkit-scrollbar": {
              "width": "8px",
            },

            "&::-webkit-scrollbar-track": {
              "background": "#ffffff",
            },

            "&::-webkit-scrollbar-thumb": {
              "background-color": "#E54065",
              "border-radius": "14px",
              "border": "3px solid #ffffff",
              "&:hover": {
                "background-color": "#E54065",
                "border": "1px solid #ffffff",
              },
            },
          }
        },
        ["responsive"]
      );
    }),
  ],
}
