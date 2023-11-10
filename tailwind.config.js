/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "mainBG":'#0D1117',
        "columnBG":'#161C22'
      }
    },
  },
  plugins: [],
}

