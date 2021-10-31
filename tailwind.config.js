module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'body': ['Sabon']

    },
    extend: {
      colors: {
        blue: {
          20: '#F8F9F9'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
