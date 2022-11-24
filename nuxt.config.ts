// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@tailwindcss/typography'],
  build: {
    transpile: ['@heroicons/vue'],
  },
  runtimeConfig: {
    public: {
      strapiUrl: 'https://sanjuant-strapi.herokuapp.com',
    },
  },
  nitro: {
    preset: 'node-server',
  },
})
