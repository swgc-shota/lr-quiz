/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.(ts|html)", "./*.html"],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#ffffe7",
          100: "#feffc1",
          200: "#fffd86",
          300: "#fff441",
          400: "#ffe60d",
          500: "#ffd700",
          600: "#d19e00",
          700: "#a67102",
          800: "#89580a",
          900: "#74480f",
          950: "#442604",
        },
      },
      keyframes: {
        "bounce-once": {
          "0%": { transform: "scale(0.3) translate3d(0,0,0)" },
          "50%": { transform: "scale(1.1)" },
          "75%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "bounce-once": "bounce-once 0.3s linear 1",
      },
    },
  },
  safelist: ["animate-bounce-once"],
  plugins: [],
};
