import defaultTheme from 'tailwindcss/defaultTheme'

module.exports = {
  content: ["./layouts/**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Merriweather', ...defaultTheme.fontFamily.sans],
        'arab': ['Utmanic', 'Merriweather', ...defaultTheme.fontFamily.serif]
      },
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}