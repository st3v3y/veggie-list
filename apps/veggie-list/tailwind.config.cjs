/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    ringColor: '#57CC34',
    extend: {
      boxShadow: {
        'veggie': '0 0 10px 10px rgba(203, 213, 225, .4)',
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
