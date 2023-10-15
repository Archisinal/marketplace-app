// Color names: https://colors.dopely.top/color-pedia
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        // Black
        'dark': '#1D2023',
        'black': '#000',
        'ebony': '#303135',
        'black-rus': '#191C1F',
        'vulcan': '#373A3D',

        // Silver
        'dark-silver': '#717171',
        'light-silver': '#D9D9D9',
        'white-smoke': '#EDEDED',
        "silver": '#B9B9B9',

        //Gray
        'raven': '#717276',
        'txt-gray': '#909090',
        'davys-gray': '#535353',
        'stroke-gray': '#D4D4D4',
        'button-gray' : "#E5E4E9",
        'dim-gray' : '#666666',
        'dark-gray': '#26272B',
        'dolphin': '#66666A',
        'light-gray': '#C7C7C7',

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
      boxShadow: {
        'tb-dark': '0 0 0 1px rgba(55, 58, 61, 1)',
        'tb-light': '0 0 0 1px rgba(212, 212, 212, 1)',
        'chevron': '0px 0px 10px rgba(0, 0, 0, 0.20)'
      },
      screens: {
        xlg: '1450px',
        lg: '1440px',
        md: '1280px',
        sm: '768px',
        xs: '360px',
      },
      spacing: {
        '5px': '5px',
        '15px': '15px',
        '18px': '18px',
        'mob-h-844': '27rem',
        'tab-h-832': '52rem'
      },
      width: {
        '34': '134px',
        '37': '156px',
        '42': '170px',
        '82': '348px',
        '84': '372px'
      },
      height: {
        '34': '134px'
      },
      fontSize: {
          '18px': '1.125rem',
          '25px': '1.55rem',
          '40': '2.5rem',
          '54px': '3.375rem',
          '90px' : '5.625rem'
      },
      fontFamily: {
        sans: ['var(--font-nutino)'],
      },
      backgroundImage: {
        'city': "url('../public/city1.png')"
      },
      backgroundSize: {
        '50%': '46%'
      },
      backgroundPosition: {
        '0-95': '0 95%'
      },
      gridTemplateColumns: {
        'footer-links': 'repeat(3, 150px)',
        'with-filter': '1fr 3fr'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
