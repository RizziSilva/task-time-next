import type { Config } from 'tailwindcss';
import TailwindScrollbar from 'tailwind-scrollbar';

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
        'background-base': '#130C18',
        'background-light': '#1f0f29',
        'background-color-darken': '#130c18',
        'background-color-light': '#1f0f29',
        'icons-color': '#a789b1',
        'font-color': '#ebe7eb',
        'timer-input-font-color': '#dbcae2',
        'timer-input-placeholder-font-color': '#8e6f9b',
        'red-base': '#D65C56',
        'red-darken': '#BC4B45',
        'error-red': '#E32817',
        'snuff-font-color': '#dbcae2',
        'task-border-color': '#30163c',
        'scrollbar-color': '#a04a97',
        'task-hover': '#2e183c',
      },
      spacing: {
        'create-user-page-height': '571px',
        'login-page-height': '352px',
        'sidebar-width': '230px',
        'sidebar-padding': '20px',
        '10px': '10px',
        '50px': '50px',
      },
      lineHeight: {
        full: '100%',
      },
      transitionProperty: {
        height: 'height',
      },
      animation: {
        'task-entry': 'task-entry 0.3s ease',
      },
      keyframes: {
        'task-entry': {
          '0%': { opacity: '0.5' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [TailwindScrollbar({ nocompatible: true })],
};
export default config;
