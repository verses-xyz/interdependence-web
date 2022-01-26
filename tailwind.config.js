module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      title: ["Extended"],
      body: ["Mono"],
      mono: ["Mono"],
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "F9F9F9",
    }),

    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: "#000",
          },
        },
      },
      outline: {
        blue: "4px solid #ECECEC",
      },
      colors: {
        blue: {
          20: "#fafafa",
          420: "#0D1A33",
        },
        "kong-green": {
          700: "#2bff88",
          800: "#28f07f",
          DEFAULT: "#2bff88",
        },
        red: {
          20: "#fafafa",
        },
        gray: {
          20: "#4f4f4f",
          80: "#EBEBEB",
          120: "#666666",
          primary: "#333333",
          secondary: "#666666",
          placeholder: "#a7a7a7",
          detail: "#CCCCCC",
          wash: "#EBEBEB",
          hover: "#DBDBDB",
          bg: "#FAFAFA",
          special: "#0000FF",
        },
        truegray: {
          800: "#333333",
        },
        purple: {
          2004: "#DEADFB",
          2021: "#FFE",
        },
        "kong-black": "#050604",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
