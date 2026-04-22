/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-primary': '#0373e3',
        'blue-dark': '#024588',
        'blue-light': '#e8f1fc',
        'red-destructive': '#ca2b3d',
        'gray-page': '#f8f9f9',
        'gray-secondary': '#f1f2f3',
        'gray-sidebar': '#f3f3f4',
        'gray-border': '#d5d9dc',
        'gray-muted': '#989ab0',
        'gray-medium': '#67737e',
        'gray-dark': '#151719',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        pill: '100px',
        card: '16px',
      },
    },
  },
  plugins: [],
}
