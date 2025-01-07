/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        customGreen: "#38541E",
        kheder: "#228B22", // Donnez-lui un nom, comme "customGreen"
      },
      fontFamily: {
        kohSantepheap: ["Koh Santepheap", "sans-serif"],
        kaisei: ["Kaisei Tokumin", "serif"],
        kalam: ["Kalam", "cursive"],
        kavoon: ["Kavoon", "cursive"],
        // Ajout de la police
      },
    },
  },
  plugins: [],
};
