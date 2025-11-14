/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00f0ff",
        dark: "#0b0f19",
        accent: "#ff007f",
      },
      boxShadow: {
        neon: "0 0 10px #00f0ff, 0 0 20px #00f0ff, 0 0 10px #00f0ff",
        pink: "0 0 10px #ff007f, 0 0 20px #ff007f, 0 0 40px #ff007f",
      },
    },
  },
  plugins: [],
};
