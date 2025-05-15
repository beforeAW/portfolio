/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
          fontFamily: {
            'sans': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}