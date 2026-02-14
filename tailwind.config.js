/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tet: {
          red: '#D91E18',      // Traditional Tet Red
          gold: '#F4D03F',     // Gold for wealth
          bg: '#96281B',       // Deeper red background
          light: '#FDE3A7',    // Light cream/gold text
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

