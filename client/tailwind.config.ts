// Color names: https://colors.dopely.top/color-pedia
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Black
        'dark': '#1D2023',
        'black': '#000',
        'ebony': '#303135',

        // Silver
        'dark-silver': '#717171',
        'light-silver': '#D9D9D9',

        //Gray
        'raven': '#717276',
        'txt-grey': '#909090',
        'davys-gray': '#535353',
        'stroke-gray': '#D4D4D4',
        'button-grey' : "#E5E4E9",
        'dim-gray' : '#666666',

        // Green 
        'dark-pastel-green': '#00B84B',
        'chateau-green': '#38A547',

        // White
        'white': '#FFF;',

        // Red
        'red': 'red',
        'cinnabar': '#E6474B',

        //Blue
        'neon-blue': '#534AF3',
        'blue-violet': '#993BF1',
      },
      borderRadius: {
        '20': '1.25rem',
        '10': '0.625rem'
      },
      screens: {
        lg: '1440px',
        md: '1280px',
        sm: '768px',
        xs: '360px',
      },
      spacing: {
        '15px': '15px',
      },
      gap: {
        '50px': '3.125rem'
      },
      fontSize: {
          '18px': '1.125rem',
          '25px': '1.55rem',
          '40px': '2.5rem',
          '54px': '3.375rem',
          '90px' : '5.625rem'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'city': "url('../public/bg-city.png')"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
