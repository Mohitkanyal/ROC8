/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}" // Add this if using shadcn
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
