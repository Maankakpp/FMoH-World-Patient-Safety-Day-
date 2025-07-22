/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        who: {
          blue: '#0072CE',
          orange: '#F58220',
          lightblue: '#00AEEF',
          darkblue: '#003366',
        },
      },
    },
  },
  plugins: [],
};
