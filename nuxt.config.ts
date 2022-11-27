// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@tailwindcss/typography'],
  build: {
    transpile: ['@heroicons/vue'],
  },
  runtimeConfig: {
    public: {
      strapiUrl: 'https://strapi.sanjuant.fr',
    },
  },
  nitro: {
    preset: 'node-server',
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Thibaut SANJUAN',
      meta: [
        { name: 'description', content: 'Je suis ingénieur en Cybersécurité avec une forte expérience en développement.' },
        { name: 'apple-mobile-web-app-title', content: 'Thibaut SANJUAN - Portfolio' },
        { name: 'application-name', content: 'Thibaut SANJUAN - Portfolio' },
        { name: 'msapplication-TileColor', content: '#da532c' },
        { name: 'theme-color', content: '#ffffff' }
      ],
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' }
      ]
    }
  }
})
