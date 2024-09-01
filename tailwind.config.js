/** @type {import('tailwindcss').Config} */
// import typography from '@tailwindcss/typography'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#222d38',
        secondary: '#151d25',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      backgroundColor: {
        'custom-gradient': 'linear-gradient(to right, #f00, #00f)',
      },
      keyframes: {
        gradientMovertl: {
          '0%': { backgroundPosition: '0%' },
          '100%': { backgroundPosition: '100%' },
        },
        gradientMoveltr: {
          '0%': { backgroundPosition: '100%' },
          '100%': { backgroundPosition: '0%' },
        },
        bookmarkshake: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'rotate(0deg)' },
          '30%': { transform: 'rotate(-10deg)' },
          '70%': { transform: 'rotate(10deg)' },
        },
        slidelink: {
          '0%': { translateY: '-100%', opacity: 0 },
          '100%': { translateY: '0', opacity: 1 },
        },
      },
      animation: {
        gradientMovertl: 'gradientMovertl 0.5s ease forwards',
        gradientMoveltr: 'gradientMoveltr 0.5s ease forwards',
        bookmarkshake: 'bookmarkshake 1s ease-in-out infinite',
        slidelink:'slidelink 1s ease-in-out'
      },
    },
  },
  plugins: [
    // typography
  ],
};
