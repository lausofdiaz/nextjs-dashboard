import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      fontFamily: {
        'sans': ['Poppins', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {       
        blue: {
          400: '#2589FE',
          500: '#0070F3',
          600: '#2F6FEB',
          100: '#7DB5F8',
          30: '#0284a4',
          10: '#00c2ed'
        },
        purple:{
          100: '#662483',
          50: 'rgba(102, 36, 131, 0.5);'
        },
        grey: {
          100: '#E2E2E2',
          50:'rgba(226, 226, 226, 0.5);',
          80: '#BAB9B9',
          30:'#a5a5a5'
        }, 
        black: {
          10: 'rgba(0, 0, 0, 0.1);'
        }, 
        red:{
          100: '#f53411',
          50: '#f7675e'
        },
        blanco:{
          50:'rgba(255, 255, 255, 0.1);',
        },
        gree:{
          100:'#65B89A',
          50:'#CCED95'
        }, 
        acuamarin:{
            100: '#2fc7ab',
            50: '#4cdec2'
        }, purplee:{
          100: '#a66ed3',
          50:'#c59bd5'
        }
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
