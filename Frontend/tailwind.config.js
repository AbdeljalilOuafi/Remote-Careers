/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2b0c9e',
        hover: '#7b6fc2',
        
    },
    },
  },
  plugins: [],
}