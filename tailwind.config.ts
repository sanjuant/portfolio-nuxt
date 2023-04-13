import type { Config } from 'tailwindcss'
import tailwindTypography from '@tailwindcss/typography'

export default <Partial<Config>>{
  darkMode: 'class',
  theme: {
    screens: {
      xs: '475px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [tailwindTypography],
}
