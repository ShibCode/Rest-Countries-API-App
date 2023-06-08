/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["nunito"],
      },
      colors: {
        darkGray: "hsl(0, 0, 52%)",
        veryDarkBlue: "hsl(200, 15%, 8%)",
      },
      backgroundColor: {
        veryDarkBlue: "hsl(207, 26%, 17%)",
        darkBlue: "hsl(209, 23%, 22%)",
        lightWhite: "hsl(0, 0%, 98%)",
      },
    },
  },
  plugins: [],
};
