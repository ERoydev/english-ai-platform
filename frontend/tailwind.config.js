/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      xs: ['12px', '16px'],
      sm: ['14px', '20px'],
      base: ['16px', '19.5px'],
      lg: ['18px', '21.94px'],
      xl: ['20px', '24.38px'],
      '2xl': ['24px', '29.26px'],
      '3xl': ['32px', '52px'],
      '4xl': ['48px', '58px'],
      '8xl': ['96px', '106px']
    },
    extend: {
      backgroundImage: {
        'color-gradient': 'linear-gradient(to right bottom, #09031c, #0d081c, #110d1c, #14111c, #16141c, #16141c, #16141b, #16141b, #14111a, #110d19, #0d0819, #090318);',
        'testimonial-texture': "url('./src/assets/images/corporate.jpg')",
        'about-texture': "url('./src/assets/images/About/building.jpg')"
        
      },
      fontFamily: {
        palanquin: ['Palanquin', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        'bg-clr': '#e5e8e3',
        'primary': "#1c1c22",
        "secondary": "#b853cf",
        "accent": "#fff",
        "app-bg": "#040507"
      },
      boxShadow: {
        '3xl': '0 10px 40px rgba(0, 0, 0, 0.1)'
      },
      screens: {
        "wide": "1440px",
        "large-custom": "1700px",
        "md-custom": "1350px",
      },
    },
  },
  plugins: [],
}