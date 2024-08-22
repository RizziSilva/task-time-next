import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app-pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'small-screen': { max: '1000px' },
    },
    extend: {
      zIndex: {
        '3': '3',
      },
      colors: {
        '#412a4c': '#412a4c',
        'sidebar-bg-color': '#2c1338',
        'sidebar-bg-selected': '#a04a97',
        'sidebar-bg-hover': '#412a4c',
        'sidebar-option-font-color': '#95899A',
        'background-color-darken': '#130c18',
        'background-color-light': '#1f0f29',
        'font-color': '#ebe7eb',
        'red-base': '#D65C56',
        'red-darken': '#BC4B45',
        'background-base': '#E2D9C2',
        'error-red': '#E32817',
      },
      spacing: {
        'create-user-page-height': '571px',
        'login-page-height': '352px',
        'sidebar-width': '230px',
        'sidebar-padding': '20px',
        '10px': '10px',
      },
      lineHeight: {
        full: '100%',
      },
    },
  },
  plugins: [],
};
export default config;
