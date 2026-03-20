/** @type {import('tailwindcss').Config} */
export default {

  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],

  theme: {
    extend: {

      colors: {
        primary: "#57bbff",
        accent: "#e9465f",
        yellow: "#ffe365"
      },

      fontFamily: {
        heading: ["Poppins"],
        body: ["Open Sans"]
      }

    },
  },

  plugins: [],
}