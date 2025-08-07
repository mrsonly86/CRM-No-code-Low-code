/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        'primary-dark': '#4f46e5',
        'primary-light': '#818cf8',
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#6366f1",
          "primary-focus": "#4f46e5",
          "primary-content": "#ffffff",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#6366f1",
          "primary-focus": "#4f46e5",
          "primary-content": "#ffffff",
        },
      },
    ],
  },
}