/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(25, 189, 107)"
      },
      backgroundImage: {
        'carousel-1': "url('./src/assets/images/carousel-1.jpg')",
        'carousel-2': "url('./src/assets/images/carousel-2.jpg')",
      },
      screens: {
        xs: '500px'
      }
    },
  },
  plugins: [],
}

