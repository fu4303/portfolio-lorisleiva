const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      colors: {
        'white-50p': '#FFFFFF88',
        primary: {
          '100': defaultTheme.colors.pink['100'],
          '200': defaultTheme.colors.pink['200'],
          '300': defaultTheme.colors.pink['300'],
          '400': defaultTheme.colors.pink['400'],
          '500': '#f91f40',
          '600': defaultTheme.colors.pink['600'],
          '700': defaultTheme.colors.pink['700'],
          '800': defaultTheme.colors.pink['800'],
          '900': defaultTheme.colors.pink['900'],
        }
      },
      fontFamily: {
        sans: ['"Source Sans Pro"', ...defaultTheme.fontFamily.sans],
        serif: ['"Arkibal Serif"', ...defaultTheme.fontFamily.serif],
        content: ['Georgia', ...defaultTheme.fontFamily.sans],
      },
    },
    gradients: {
      topaz: ['30deg', '#EE7752', '#E73C7E'],
      river:   ['to right', '#23A6D5', '#23D5AB'],
    },
  },
  variants: {
    gradients: ['responsive', 'hover'],
  },
  plugins: [
    require('tailwindcss-plugins/gradients'),
  ],
  corePlugins: {
    container: false,
  }
}
