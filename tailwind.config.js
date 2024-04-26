/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    colors: {
      bgColor: '#fffdf9',
      primary: '#F1ECC0',
      secondary: '#F1D165',
      hightColor: '#F37125',
      lowColor: '#FFF4D7',
      white: '#fff',
      black: '#000',
    },
    fontFamily: {
      titillium: ['Titillium Web', 'sans-serif'],
      poppins: ['Poppins', 'sans-serif'],
      work: ['Work Sans', 'sans-serif'],
      acme: ['Acme', 'sans-serif'],
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      dropShadow: {
        '3xl': '3px 3px 0px rgba(0, 0, 0, 1)',
        '4xl': [
          '0 35px 35px rgba(0, 0, 0, 0.25)',
          '0 45px 65px rgba(0, 0, 0, 0.15)',
        ],
      },
    },
  },
  plugins: [],
};
