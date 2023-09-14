import type { Config } from 'tailwindcss'

import colors from './colors.json'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
            'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      ringWidth: {
        DEFAULT: `var(${colors["theme-rounded-base"]})`,
      },
      borderRadius: {
        DEFAULT: `${colors["theme-rounded-base"]}`,
        'token': `${colors["theme-rounded-base"]}`,
      },
      colors: {
        'background': `rgb(${colors["color-background"]})`,
        'primary': `rgb(${colors["color-primary"]})`,
        'secondary': `rgb(${colors["color-secondary"]})`,
        'tertiary': `rgb(${colors["color-tertiary"]})`,
        'success': `rgb(${colors["color-success"]})`,
        'warning': `rgb(${colors["color-warning"]})`,
        'error': `rgb(var(${colors["color-error"]}))`,
      },
      textColor: {
        'normal': `rgb(${colors["color-text"]})`,
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
export default config
