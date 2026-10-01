/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FBF8F2',
          100: '#F5F0E8',
          200: '#EDE5D6',
          300: '#E2D6C1',
          400: '#D4C3A8',
        },
        sand: {
          100: '#E8DCC8',
          200: '#D9C9AC',
          300: '#C7B291',
          400: '#B89977',
        },
        taupe: {
          300: '#A89B8C',
          400: '#8C7F70',
          500: '#6F6457',
        },
        charcoal: {
          700: '#3A3633',
          800: '#2B2826',
          900: '#1C1A19',
        },
        olive: {
          300: '#7E8B6B',
          400: '#5F6E4F',
          500: '#4A5A3D',
          600: '#3A4730',
        },
        brown: {
          700: '#4A3B2E',
          800: '#36291F',
          900: '#241B14',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightish: '-0.02em',
      },
    },
  },
  plugins: [],
};
