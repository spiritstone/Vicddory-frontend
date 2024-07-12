import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hologram-gradient':
          'linear-gradient(105deg, transparent 40%, rgba(255, 219, 112, 0.8) 45%, rgba(132, 50, 255, 0.6) 50%, transparent 54%)',
      },
      colors: {
        'red-100': '#ED2024',
        'red-90': '#EF373A',
        'red-80': '#F14D50',
        'red-70': '#F36366',
        'red-60': '#F4797C',
        'red-50': '#F58F91',
        'red-40': '#F8A6A7',
        'red-30': '#FABDBE',
        'red-20': '#FBD2D3',
        'red-10': '#FEE9EA',
      },
      keyframes: {
        expand: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--width)' },
        },
      },
      animation: {
        expand: 'expand 2s ease-out forwards',
      },
    },
  },
  variants: {
    extend: {
      backgroundImage: ['hover', 'focus'],
    },
  },
  plugins: [],
};
export default config;
