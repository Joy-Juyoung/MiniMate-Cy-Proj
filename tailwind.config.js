/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    colors: {
      bgColor: 'rgb(var(--color-bg) / <alpha-value>)',
      primary: 'rgb(var(--color-primary) / <alpha-value>)',
      secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
      blue: 'rgb(var(--color-blue) / <alpha-value>)',
      white: 'rgb(var(--color-white) / <alpha-value>)',
      ascent: {
        1: 'rgb(var(--color-ascent1) / <alpha-value>)',
        2: 'rgb(var(--color-ascent2) / <alpha-value>)',
      },
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
