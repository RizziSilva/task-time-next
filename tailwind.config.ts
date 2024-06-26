import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app-pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'red-base': '#D65C56',
        'red-darken': '#BC4B45',
        'background-base': '#E2D9C2',
        'error-red': '#E32817',
      },
      spacing: {
        'create-user-page-height': '571px',
        'login-page-height': '352px',
      },
      lineHeight: {
        full: '100%',
      },
    },
  },
  plugins: [],
};
export default config;
