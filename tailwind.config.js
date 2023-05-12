const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['resources/views/**/*.edge'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Libre Baskerville', ...defaultTheme.fontFamily.serif],
        sans: ['Nunito Sans', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('daisyui')],
}
