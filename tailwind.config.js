import colors from 'tailwindcss/colors'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      ...colors,
      primaryColor: '#4897F7',
      lightGreyColor: '#F8F9FA',
      middleGreyColor: '#AEB8C5',
      darkGreyColor: '#333D4F',
      whiteColor: '#FFFFFF'
    }
  },
  plugins: [],
}