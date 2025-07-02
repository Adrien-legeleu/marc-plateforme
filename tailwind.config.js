/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        marcblue: '#2873ff',
        marcbluedark: '#255cbc',
      },
      keyframes: {
        'shiny-text': {
          '0%, 90%, 100%': {
            backgroundPosition: 'calc(-100% - var(--shiny-width)) 0',
          },
          '30%, 60%': {
            backgroundPosition: 'calc(100% + var(--shiny-width)) 0',
          },
        },
      },
      animation: {
        'shiny-text': 'shiny-text 8s infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
