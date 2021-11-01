module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      title: ["Cahuega"],
      body: ["Garamond"],
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "F9F9F9",
    }),

    extend: {
      outline: {
        blue: "4px solid #ECECEC",
      },
      colors: {
        blue: {
          20: "#F8F9F9",
          420: "#0D1A33",
        },
        red: {
          20: "#F8F9F9",
        },
        brown: {
          20: "#666666",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
