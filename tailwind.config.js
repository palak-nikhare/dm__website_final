/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FAF6F0',
          100: '#F5EFE6',
          200: '#EAE0D0',
          300: '#DBCBBA',
          400: '#C9B5A0',
        },
        oat: {
          50: '#FDFBF7',
          100: '#F8F3EB',
          200: '#F2E7D8',
          300: '#E6D5C0',
          400: '#D6BFA6',
          500: '#C3A586',
        },
        espresso: {
          600: '#5C4F47',
          700: '#463B34',
          800: '#342A24',
          900: '#231B15',
        },
        sand: {
          100: '#EAE0D0',
          200: '#DBCBBA',
          300: '#C7B291',
          400: '#B89977',
        },
        taupe: {
          300: '#A89B8C',
          400: '#8C7F70',
          500: '#6F6457',
        },
        charcoal: {
          700: '#3C332D',
          800: '#2C231E',
          900: '#211A16',
        },
        terracotta: {
          50: '#FAF0EB',
          100: '#F4DCCE',
          400: '#D97E63',
          500: '#C8664B',
          600: '#AF4E35',
        },
        sage: {
          50: '#F3F6F1',
          100: '#E2E9DD',
          400: '#7D9375',
          500: '#657B5D',
          600: '#4E6147',
        },
        olive: {
          300: '#7E8B6B',
          400: '#657B5D',
          500: '#4A5B3D',
          600: '#3A4730',
        },
        brown: {
          700: '#4A3B2E',
          800: '#36291F',
          900: '#231B15',
        },
        burgundy: {
          DEFAULT: '#6B3037',
          500: '#6B3037',
          600: '#58262C',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        cozy: '0 12px 32px -4px rgba(45, 30, 15, 0.06), 0 4px 12px -2px rgba(45, 30, 15, 0.03)',
        'cozy-md': '0 20px 45px -8px rgba(45, 30, 15, 0.08), 0 6px 18px -3px rgba(45, 30, 15, 0.04)',
        'cozy-lg': '0 28px 60px -12px rgba(40, 25, 10, 0.11), 0 10px 28px -4px rgba(40, 25, 10, 0.05)',
        'cozy-hover': '0 32px 70px -12px rgba(35, 20, 10, 0.15), 0 12px 32px -4px rgba(35, 20, 10, 0.08)',
      },
      borderRadius: {
        '2.5xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      letterSpacing: {
        tightish: '-0.02em',
        relaxed: '0.025em',
      },
    },
  },
  plugins: [],
};
