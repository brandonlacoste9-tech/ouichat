/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wechat': {
          green: '#07C160',
          bg: '#EDEDED',
          dark: '#111111',
          gray: '#999999',
          light: '#F5F5F5',
        },
        'quebec': {
          blue: '#1a5490',
        }
      },
    },
  },
  plugins: [],
}
