import defaultTheme from 'tailwindcss/defaultTheme'

module.exports = {
  content: ["./layouts/**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Rubik', ...defaultTheme.fontFamily.sans],
      },
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}