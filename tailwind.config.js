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

  safelist: [
    'fond-bold',

    'bg-gray-700',
    'bg-red-500',
    'bg-orange-500',
    'bg-sky-900',
    'bg-emerald-500',

    'border-gray-700',
    'border-red-500',
    'border-orange-500',
    'border-sky-900',
    'border-emerald-500',

    'text-gray-700',
    'text-red-500',
    'text-orange-500',
    'text-sky-900',
    'text-emerald-500',

    'hover:bg-gray-700',
    'hover:bg-red-500',
    'hover:bg-orange-500',
    'hover:bg-sky-900',
    'hover:bg-emerald-500',

    'hover:border-gray-700',
    'hover:border-red-500',
    'hover:border-orange-500',
    'hover:border-sky-900',
    'hover:border-emerald-500',
  ],
}
