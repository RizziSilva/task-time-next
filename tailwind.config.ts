import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'background-base': '#E2D9C2',
      },
      spacing: {
        '22': '352px',
        '19': '300px',
      },
    },
  },
  plugins: [],
};
export default config;
