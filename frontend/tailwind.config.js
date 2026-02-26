/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        quebec: {
          green: "#1a472a",
          gold: "#d4af37",
          red: "#c41e3a",
          dark: "#0f1419",
          card: "#1a1f2e",
        },
      },
    },
  },
  plugins: [],
};
